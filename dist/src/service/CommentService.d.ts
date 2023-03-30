declare class CommentService {
    private commentRepository;
    constructor();
    getAllCommentsService: (id: any) => Promise<any>;
    saveCommentService: (comment: any) => Promise<string>;
    updateCommentService: (idComment: any, newComment: any) => Promise<any>;
    removeCommentService: (idComment: any) => Promise<string>;
    findByIdUserComment: (idComment: any) => Promise<any>;
}
declare const _default: CommentService;
export default _default;
