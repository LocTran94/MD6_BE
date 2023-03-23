import { Request, Response } from "express";
declare class ProvisionController {
    private provisionServices;
    constructor();
    getAllProvision: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: ProvisionController;
export default _default;
