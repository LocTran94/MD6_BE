import {Router} from "express";

import {auth} from "../middleware/auth";
import PersonalServiceController from "../controller/PersonalServiceController";



export const personalServiceRouter = Router();
personalServiceRouter.use(auth)
personalServiceRouter.post('/add',PersonalServiceController.createPersonalService)
