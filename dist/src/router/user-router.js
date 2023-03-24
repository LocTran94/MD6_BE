"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controller/UserController"));
const auth_1 = require("../middleware/auth");
const order_router_1 = require("./order-router");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/register', UserController_1.default.register);
exports.userRouter.post('/login', UserController_1.default.login);
order_router_1.orderRouter.use(auth_1.auth);
exports.userRouter.get('/off/:id', UserController_1.default.checkOff);
exports.userRouter.get('/showMyProfile/:id', UserController_1.default.showMyProfile);
exports.userRouter.get('/userRequest/:id', UserController_1.default.checkRequest);
exports.userRouter.get('/showSellerProfile/:id', UserController_1.default.showSellerProfile);
exports.userRouter.put('/changePassword/:id', UserController_1.default.changePassword);
exports.userRouter.get('/findByName/:name', UserController_1.default.findByName);
exports.userRouter.get('/findByGender/:gender', UserController_1.default.findByGender);
exports.userRouter.get('/findByBirthday', UserController_1.default.findByBirthday);
exports.userRouter.put('/userAskVip/:id', auth_1.auth, UserController_1.default.checkAddVip);
exports.userRouter.get('/showVip', auth_1.auth, UserController_1.default.showVip);
//# sourceMappingURL=user-router.js.map