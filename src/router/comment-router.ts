import { Router } from "express";
import { auth } from "../middleware/auth";
import CommentController from "../controller/CommentController";

export const commentRouter = Router();
commentRouter.use(auth);
commentRouter.get("/:id", CommentController.getAllComments);
commentRouter.post("/add", CommentController.createComment);
commentRouter.put("/editComment/:idComment", CommentController.editComment);
commentRouter.delete(
  "/deleteComment/:idComment",
  CommentController.removeComment
);
