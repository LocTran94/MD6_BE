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
userRouter.get('/showPersonal/:id', UserController.showProvision)
userRouter.put('/changePassword/:id', UserController.changePassword)
userRouter.get('/findByName/:name', UserController.findByName)
userRouter.get('/findByGender/:gender', UserController.findByGender)
userRouter.get('/findByBirthday/:year', UserController.findByBirthday)
userRouter.put('/userAskVip/:id' ,auth,UserController.checkAddVip)
userRouter.get('/showVip' ,auth,UserController.showVip)
userRouter.get('/showSixSeller' ,UserController.findByTopSixSeller)
userRouter.get('/showSixVip' ,UserController.findByTopSixVip)
userRouter.get('/showTwelfthSeller',auth ,UserController.findByTopTwelfthSeller)
userRouter.get('/showTopFourMalesEightFemales' ,UserController.findByTopFourMalesEightFemales)


