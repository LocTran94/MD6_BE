import {Router} from "express";
import {auth} from "../middleware/auth";
import OrderController from "../controller/OrderController";
import adminController from "../controller/AdminController";
import {adminRouter} from "./admin-router";


export const orderRouter = Router();
orderRouter.use(auth)
orderRouter.get('/getAllOrdersInSeller/:id',OrderController.getAllOrdersInSeller )
orderRouter.get('/getAllOrdersInUser/:id',OrderController.getAllOrdersInUser)
orderRouter.get('/getAllOrders',OrderController.getAllOrdersInAdmin)// done tag 31 và 32
orderRouter.post('/add',OrderController.addOrder)
orderRouter.get('/changeStatusOrder/:id',OrderController.changeStatusOrder)// đổi trạng thái order thành approval
orderRouter.get('/changeStatusOrderInUser/:id',OrderController.changeStatusOrderInUserController)// đổi trạng thái order thành Done
