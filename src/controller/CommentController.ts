import {Request, Response} from "express";
import CommentService from "../service/CommentService";


class CommentController {
    private commentService;


    constructor() {
        this.commentService = CommentService;

    }

    getAllComments = async (req: Request, res: Response) => {
        try {
            let id = req.params.id

            let comments = await this.commentService.getAllCommentsService(id);

            res.status(200).json(comments);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    createComment = async (req: Request, res: Response) => {
        try {
            let comment = req.body
            let idUser = req["decoded"].idUser;
            comment.idUser = idUser;
            await this.commentService.saveCommentService(comment)
            res.status(200).json(comment)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }

    editComment = async (req: Request, res: Response) => {

        try {
            let idUserToken = req["decoded"].idUser;
            let idComment = req.params.idComment;
            let idUser = await this.commentService.findByIdUserComment(idComment);
            if (idUser == idUserToken) {
                let comment = await this.commentService.updateCommentService(idComment, req.body);
                res.status(200).json(comment);
            } else {
                res.status(401).json('invalid');
            }
        } catch (e) {
            res.status(500).json(e.message)
        }

    }


    removeComment = async (req: Request, res: Response) => {
        try {
            let idComment = req.params.idComment;
            let idUserToken = req["decoded"].idUser;
            let idUser = await this.commentService.findByIdUserComment(idComment)


            if (idUser == idUserToken) {
                let notification = await this.commentService.removeCommentService(idComment);
                res.status(200).json(notification);
            } else {
                res.status(401).json('invalid');
            }
        } catch (e) {
            res.status(500).json(e.message)
        }

    }


}

export default new CommentController();