import { Request, Response } from "express";
declare class PersonalServiceController {
    private personalService;
    constructor();
    createPersonalService: (req: Request, res: Response) => Promise<void>;
}
declare const _default: PersonalServiceController;
export default _default;
