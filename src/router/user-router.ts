import {Router} from "express";

import UserController from "../controller/UserController";



export const userRouter = Router();
userRouter.post('/register',UserController.register)

userRouter.post('/login',UserController.login)
userRouter.get('/off/:id', UserController.checkOff)
userRouter.get('/showMyProfile/:id', UserController.showMyProfile)
userRouter.get('/userRequest/:id', UserController.checkRequest)
userRouter.get('/showSellerProfile/:id', UserController.showSellerProfile)
userRouter.put('/changePassword/:id', UserController.changePassword)
userRouter.get('/findByName/:name', UserController.findByName) // tag 14 tìm kiếm theo username hoặc namePost
userRouter.get('/findByGender/:gender', UserController.findByGender) // tag 14 tìm kiếm theo giới tính
userRouter.get('/findByBirthday', UserController.findByBirthday) // tag 14 tìm kiếm theo độ tuổi
 // tag 14 tìm kiếm theo độ tuổi

