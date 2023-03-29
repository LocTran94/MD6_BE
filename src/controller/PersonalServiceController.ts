import {Request, Response} from "express";

import PersonalService from "../service/PersonalService";

class PersonalServiceController {

    private personalService;


    constructor() {
        this.personalService = PersonalService;
    }


    createPersonalService = async (req: Request, res: Response) => {
        try {
            let idUser = req["decoded"].idUser
            let id = req.body.idProvision
              await this.personalService.SavePersonalService(id,idUser)
            res.status(200).json('')
        }catch (e) {
            res.status(500).json(e.message)
        }

    }

}


export default new PersonalServiceController();