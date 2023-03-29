"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const comment_1 = require("../model/comment");
class CommentService {
    constructor() {
        this.getAllCommentsService = async () => {
            let sql = `select *
                   from comment join user on comment.idUser = user.idUser `;
            let comments = await this.commentRepository.query(sql);
            if (!comments) {
                return "No comments found";
            }
            return comments;
        };
        this.saveCommentService = async (comment) => {
            await this.commentRepository.save(comment);
            return "success";
        };
        this.updateCommentService = async (idComment, newComment) => {
            let comment = await this.commentRepository.findOneBy({
                idComment: idComment,
            });
            if (!comment) {
                return null;
            }
            await this.commentRepository.update({ idComment: idComment }, newComment);
            return newComment;
        };
        this.removeCommentService = async (idComment) => {
            let comments = await this.commentRepository.findOneBy({
                idComment: idComment,
            });
            if (!comments) {
                return null;
            }
            await this.commentRepository.delete({ idComment: idComment });
            return "Successfully deleted";
        };
        this.findByIdUserComment = async (idComment) => {
            let sql = `select comment.idUser from comment where comment.idComment = ${idComment}`;
            let idUser = await this.commentRepository.query(sql);
            if (!idUser) {
                return "Can not findComment";
            }
            return idUser[0].idUser;
        };
        this.commentRepository = data_source_1.AppDataSource.getRepository(comment_1.Comment);
    }
}
exports.default = new CommentService();
//# sourceMappingURL=CommentService.js.map