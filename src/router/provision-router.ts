import {Router} from "express";

import {auth} from "../middleware/auth";
import ProvisionController from "../controller/ProvisionController";


export const provisionRouter = Router();
provisionRouter.use(auth)

provisionRouter.get('',ProvisionController.getAllProvision)

