import { Request, Response } from "express";
declare class UserController {
    private userServices;
    private postServices;
    constructor();
    showMyProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    showVip: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    showSellerProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    changePassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    checkOff: (req: any, res: any) => Promise<any>;
    checkRequest: (req: any, res: any) => Promise<any>;
    checkAddVip: (req: any, res: any) => Promise<any>;
    findByName: (req: any, res: any) => Promise<any>;
    findByGender: (req: any, res: any) => Promise<any>;
    findByBirthday: (req: any, res: any) => Promise<any>;
}
declare const _default: UserController;
export default _default;
