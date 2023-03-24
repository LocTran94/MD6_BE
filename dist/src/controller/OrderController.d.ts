import { Request, Response } from "express";
declare class OrderController {
    private oderService;
    private postService;
    constructor();
    getAllOrdersInSeller: (request: Request, response: Response) => Promise<void>;
    getAllOrdersInAdmin: (request: Request, response: Response) => Promise<void>;
    getAllOrdersInUser: (request: Request, response: Response) => Promise<void>;
    addOrder: (request: Request, response: Response) => Promise<"hãy chọn lại thời gian bắt đầu thuê" | "hãy chọn lại ngày bắt đầu thuê">;
    changeStatusOrder: (req: any, res: any) => Promise<any>;
    changeStatusOrderInUserController: (req: any, res: any) => Promise<any>;
}
declare const _default: OrderController;
export default _default;
