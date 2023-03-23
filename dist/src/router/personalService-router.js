"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalServiceRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const PersonalServiceController_1 = __importDefault(require("../controller/PersonalServiceController"));
exports.personalServiceRouter = (0, express_1.Router)();
exports.personalServiceRouter.use(auth_1.auth);
exports.personalServiceRouter.post('/add', PersonalServiceController_1.default.createPersonalService);
//# sourceMappingURL=personalService-router.js.map