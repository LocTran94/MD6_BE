"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const admin_1 = require("../middleware/admin");
const auth_1 = require("../middleware/auth");
const AdminController_1 = __importDefault(require("../controller/AdminController"));
exports.adminRouter = (0, express_1.Router)();
exports.adminRouter.use(auth_1.auth);
exports.adminRouter.get('', admin_1.adminAuth, AdminController_1.default.getAllUser);
exports.adminRouter.get('/lock/:id', AdminController_1.default.lockUser);
exports.adminRouter.delete('/:id', AdminController_1.default.remove);
exports.adminRouter.get('/checkAsk', AdminController_1.default.getAskUser);
exports.adminRouter.get('/changeRole/:id', AdminController_1.default.changeRoleUser);
exports.adminRouter.get('/AddUser', AdminController_1.default.getAddUser);
exports.adminRouter.get('/changeCategory/:id', AdminController_1.default.changeCategoryUser);
exports.adminRouter.get('/getAddVip', AdminController_1.default.getAddVip);
exports.adminRouter.get('/changeSellerToVip/:id', AdminController_1.default.changeSellerToVip);
//# sourceMappingURL=admin-router.js.map