import { Request, Response } from "express";
declare class AdminController {
    private userServices;
    constructor();
    getAllUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    lockUser: (req: any, res: any) => Promise<any>;
    remove: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAskUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAddUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    changeRoleUser: (req: any, res: any) => Promise<any>;
    changeCategoryUser: (req: any, res: any) => Promise<any>;
}
declare const _default: AdminController;
export default _default;
