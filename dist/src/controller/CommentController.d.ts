import { Request, Response } from "express";
declare class CommentController {
    private commentService;
    constructor();
    getAllComments: (req: Request, res: Response) => Promise<void>;
    createComment: (req: Request, res: Response) => Promise<void>;
    editComment: (req: Request, res: Response) => Promise<void>;
    removeComment: (req: Request, res: Response) => Promise<void>;
}
declare const _default: CommentController;
export default _default;
