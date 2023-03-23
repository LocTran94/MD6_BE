import {Router} from "express";
import {auth} from "../middleware/auth";
import OrderController from "../controller/OrderController";


export const orderRouter = Router();
orderRouter.use(auth)
orderRouter.get('/getAllOrdersInSeller/:id',OrderController.getAllOrdersInSeller )
orderRouter.get('/getAllOrdersInUser/:id',OrderController.getAllOrdersInUser)
orderRouter.post('/add',OrderController.addOrder)
