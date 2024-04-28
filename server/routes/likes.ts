import express, { Router, Request, Response } from "express";
import { db } from "../db.js";
import { likes } from "../drizzle/schema.js";
import { eq, and } from "drizzle-orm";
import { UserRequest, validateToken } from "../middlewares/AuthMiddleware.js";
import { JwtPayload } from "jsonwebtoken";
import { UniqueConstraint } from "drizzle-orm/sqlite-core";

const likesRouter: Router = express.Router();

likesRouter.post(
  "/",
  validateToken,
  async (req: UserRequest, res: Response) => {
    const { postId } = req.body;
    const authPayload = req.username as JwtPayload;
    try {
      const like = { postId: postId, username: authPayload.username };
      await db.insert(likes).values(like);
      res.json({ liked: true });
    } catch (error: any) {
      if (error.code === "SQLITE_CONSTRAINT")
        try {
          await db
            .delete(likes)
            .where(
              and(
                eq(likes.postId, postId),
                eq(likes.username, authPayload.username),
              ),
            );
          res.json({ liked: false });
        } catch (error: any) {
          res.json({ error: error });
        }
      else {
        res.json({ error: error });
      }
    }
  },
);

export default likesRouter;
