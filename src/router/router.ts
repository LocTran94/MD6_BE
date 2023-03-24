import {Router} from "express";

import {userRouter} from "./user-router";
import {adminRouter} from "./admin-router";
import {postRouter} from "./post-router";
import {provisionRouter} from "./provision-router";
import {orderRouter} from "./order-router";
import {personalServiceRouter} from "./personalService-router";
import { commentRouter } from "./comment-router";


export  const router = Router()

router.use('/users',userRouter);
router.use('/admins',adminRouter);
router.use('/post',postRouter);
router.use('/provision',provisionRouter);
router.use('/order',orderRouter);
router.use('/personalService',personalServiceRouter);
router.use('/comment',commentRouter);


