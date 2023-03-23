"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.provisionRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const ProvisionController_1 = __importDefault(require("../controller/ProvisionController"));
exports.provisionRouter = (0, express_1.Router)();
exports.provisionRouter.use(auth_1.auth);
exports.provisionRouter.get('', ProvisionController_1.default.getAllProvision);
//# sourceMappingURL=provision-router.js.map