import {Router} from "express";

import UserController from "../controller/UserController";
import {auth} from "../middleware/auth";
import {orderRouter} from "./order-router";



export const userRouter = Router();
userRouter.post('/register',UserController.register)

userRouter.post('/login',UserController.login)
orderRouter.use(auth)
userRouter.get('/off/:id', UserController.checkOff)
userRouter.get('/showMyProfile/:id', UserController.showMyProfile)
userRouter.get('/userRequest/:id', UserController.checkRequest)
userRouter.get('/showSellerProfile/:id', UserController.showSellerProfile)
userRouter.put('/changePassword/:id', UserController.changePassword)
userRouter.get('/findByName/:name', UserController.findByName) // tag 14 tìm kiếm theo username hoặc namePost
userRouter.get('/findByGender/:gender', UserController.findByGender) // tag 14 tìm kiếm theo giới tính
userRouter.get('/findByBirthday', UserController.findByBirthday) // tag 14 tìm kiếm theo độ tuổi
userRouter.put('/userAskVip/:id' ,auth,UserController.checkAddVip)// thay đổi role để thành vip
userRouter.get('/showVip' ,auth,UserController.showVip)// show các tài khoản Vip


