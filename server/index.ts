import express, { Express } from "express";
import postRouter from "./routes/posts.js";
import commentsRouter from "./routes/comments.js";
import usersRouter from "./routes/users.js";
import likesRouter from "./routes/likes.js";
import cors from "cors";

const app: Express = express();
app.use(express.json());

const options = {
  origin: "http://localhost:3000",
};
app.use(cors(options));

// Routers
app.use("/posts", postRouter);
app.use("/comments", commentsRouter);
app.use("/auth", usersRouter);
app.use("/likes", likesRouter);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
