"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const OrderController_1 = __importDefault(require("../controller/OrderController"));
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.use(auth_1.auth);
exports.orderRouter.get('/getAllOrdersInSeller/:id', OrderController_1.default.getAllOrdersInSeller);
exports.orderRouter.get('/getAllOrdersInUser/:id', OrderController_1.default.getAllOrdersInUser);
exports.orderRouter.get('/getAllOrders', OrderController_1.default.getAllOrdersInAdmin);
exports.orderRouter.post('/add', OrderController_1.default.addOrder);
exports.orderRouter.get('/changeStatusOrder/:id', OrderController_1.default.changeStatusOrder);
exports.orderRouter.get('/changeStatusOrderInUser/:id', OrderController_1.default.changeStatusOrderInUserController);
//# sourceMappingURL=order-router.js.map