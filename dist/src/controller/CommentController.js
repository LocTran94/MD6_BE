"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommentService_1 = __importDefault(require("../service/CommentService"));
class CommentController {
    constructor() {
        this.getAllComments = async (req, res) => {
            try {
                let id = req.params.id;
                let comments = await this.commentService.getAllCommentsService(id);
                res.status(200).json(comments);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.createComment = async (req, res) => {
            try {
                let comment = req.body;
                let idUser = req["decoded"].idUser;
                comment.idUser = idUser;
                await this.commentService.saveCommentService(comment);
                res.status(200).json(comment);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.editComment = async (req, res) => {
            try {
                let idUserToken = req["decoded"].idUser;
                let idComment = req.params.idComment;
                let idUser = await this.commentService.findByIdUserComment(idComment);
                if (idUser == idUserToken) {
                    let comment = await this.commentService.updateCommentService(idComment, req.body);
                    res.status(200).json(comment);
                }
                else {
                    res.status(401).json('invalid');
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.removeComment = async (req, res) => {
            try {
                let idComment = req.params.idComment;
                let idUserToken = req["decoded"].idUser;
                let idUser = await this.commentService.findByIdUserComment(idComment);
                if (idUser == idUserToken) {
                    let notification = await this.commentService.removeCommentService(idComment);
                    res.status(200).json(notification);
                }
                else {
                    res.status(401).json('invalid');
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.commentService = CommentService_1.default;
    }
}
exports.default = new CommentController();
//# sourceMappingURL=CommentController.js.map