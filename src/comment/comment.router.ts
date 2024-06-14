import { Hono } from "hono";
import { commentsController, getComment, createCommentController, updateCommentController, deleteCommentController, searchCommentsController } from "./comment.controller";
import { bothuserres } from "../middleware/bearAuth";

export const commentsRouter = new Hono();

commentsRouter.get("/",  bothuserres, commentsController);
commentsRouter.get("/:id",  bothuserres, getComment);
commentsRouter.post("/", createCommentController);
commentsRouter.put("/:id",  bothuserres, updateCommentController);
commentsRouter.delete("/:id",  bothuserres, deleteCommentController);
commentsRouter.get("/search",  bothuserres, searchCommentsController);
