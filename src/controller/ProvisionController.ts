import {Request, Response} from "express";

import ProvisionService from "../service/ProvisionService";

class ProvisionController {

    private provisionServices;


    constructor() {
        this.provisionServices = ProvisionService;
    }

    getAllProvision = async (req: Request, res: Response) => {
        try {
            let response = await this.provisionServices.getAllProvisionService();
            return res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

}


export default new ProvisionController();