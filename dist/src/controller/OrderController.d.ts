import { Request, Response } from "express";
declare class OrderController {
    private oderService;
    private postService;
    constructor();
    getAllOrdersInSeller: (request: Request, response: Response) => Promise<void>;
    getAllOrdersInUser: (request: Request, response: Response) => Promise<void>;
    addOrder: (request: Request, response: Response) => Promise<void>;
}
declare const _default: OrderController;
export default _default;
