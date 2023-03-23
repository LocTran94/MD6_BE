import {Request, Response} from "express";

import PersonalService from "../service/PersonalService";

class PersonalServiceController {

    private personalService;


    constructor() {
        this.personalService = PersonalService;
    }


    createPersonalService = async (req: Request, res: Response) => {
        try {
            let idPost = req.body.idPost
            let personalService = await this.personalService.SavePersonalService(req.body,idPost)
            res.status(200).json(personalService)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }

}


export default new PersonalServiceController();