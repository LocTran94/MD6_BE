import { AppDataSource } from "../data-source";
import { Comment } from "../model/comment";

class CommentService {
  private commentRepository;

  constructor() {
    this.commentRepository = AppDataSource.getRepository(Comment);
  }

  getAllCommentsService = async (id) => {
    let sql = `select *
                   from comment join user on comment.idUser = user.idUser where comment.idPost = ${id}`;
    let comments = await this.commentRepository.query(sql);
    if (!comments) {
      return "No comments found";
    }
    return comments;
  };

  saveCommentService = async (comment) => {
    await this.commentRepository.save(comment);
    return "success";
  };

  updateCommentService = async (idComment, newComment) => {
    let comment = await this.commentRepository.findOneBy({
      idComment: idComment,
    });
    if (!comment) {
      return null;
    }
    await this.commentRepository.update({ idComment: idComment }, newComment);
    return newComment;
  };

  removeCommentService = async (idComment) => {
    let comments = await this.commentRepository.findOneBy({
      idComment: idComment,
    });
    if (!comments) {
      return null;
    }
    await this.commentRepository.delete({ idComment: idComment });
    return "Successfully deleted";
  };

  findByIdUserComment = async (idComment) => {
    let sql = `select comment.idUser from comment where comment.idComment = ${idComment}`;
    let idUser = await this.commentRepository.query(sql);
    if (!idUser) {
      return "Can not findComment";
    }
    return idUser[0].idUser;
  };
}

export default new CommentService();
