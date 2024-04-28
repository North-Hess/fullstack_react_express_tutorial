import express, { Router, Request, Response } from "express";
import { users } from "../drizzle/schema.js";
import { hash, compare } from "bcrypt";
import { db } from "../db.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { UserRequest, validateToken } from "../middlewares/AuthMiddleware.js";

export type User = {
  username: string;
  password: string;
  id?: number;
};

const usersRouter: Router = express.Router();

usersRouter.post("/", async (req: Request, res: Response) => {
  const { username, password }: User = req.body;
  const hashed = await hash(password, 10);
  await db.insert(users).values({
    username,
    password: hashed,
  });
  res.json("SUCCESS");
});

usersRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password }: User = req.body;

  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (!user) {
    res.json({ error: "User Doesn't Exist" });
    return;
  }
  const match = await compare(password, user.password);
  if (!match) {
    res.json({ error: "Wrong username and password combination" });
    return;
  }
  const accessToken = jwt.sign(
    { username: user.username, id: user.id },
    "importantsecret",
  );
  res.json({ token: accessToken, username: user.username, id: user.id });
});

usersRouter.get(
  "/validate",
  validateToken,
  (req: UserRequest, res: Response) => {
    res.json(req.username);
  },
);

export default usersRouter;
