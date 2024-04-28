import express, { Router, Request, Response } from "express";
import { db } from "../db.js";
import { comments } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";
import { validateToken, UserRequest } from "../middlewares/AuthMiddleware.js";
import { JwtPayload } from "jsonwebtoken";

type PostComment = {
  id?: number;
  commentBody: string;
  postId: number | null;
  username: string;
};

const commentsRouter: Router = express.Router();

commentsRouter.get("/:postId", async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const postComments: PostComment[] = await db.query.comments.findMany({
    where: eq(comments.postId, Number(postId)),
  });
  res.json(postComments);
});

commentsRouter.post(
  "/",
  validateToken,
  async (req: UserRequest, res: Response) => {
    const comment = req.body;
    const username = req.username as JwtPayload;
    try {
      comment.username = username.username;
      await db.insert(comments).values(comment);
      res.statusCode = 200;
      res.json(comment);
    } catch (error) {
      console.log(error);
      res.json({ error: error });
    }
  },
);

commentsRouter.delete(
  "/:commentId",
  validateToken,
  async (req: UserRequest, res: Response) => {
    const commentId = Number(req.params.commentId);
    try {
      await db.delete(comments).where(eq(comments.id, commentId));
      res.statusCode = 200;
      res.json("SUCCESS");
    } catch (error) {
      console.log(error);
      res.json({ error: error });
    }
  },
);

export default commentsRouter;
