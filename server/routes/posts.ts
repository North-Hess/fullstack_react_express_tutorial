import express, { Router, Request, Response } from "express";
import { db } from "../db.js";
import { posts } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

export type Post = {
  id?: number;
  title: string;
  postText: string;
  username: string;
};

const postRouter: Router = express.Router();

postRouter.get("/", async (req: Request, res: Response) => {
  const listOfPosts: Post[] = await db.query.posts.findMany({
    with: {
      likes: true,
    },
  });
  res.json(listOfPosts);
});

postRouter.get("/byId/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, Number(id)),
  });
  res.json(post);
});

postRouter.post("/", async (req: Request, res: Response) => {
  const post: Post = req.body;
  await db.insert(posts).values(post);
  res.json(post);
});

export default postRouter;
