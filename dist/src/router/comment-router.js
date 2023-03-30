"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const CommentController_1 = __importDefault(require("../controller/CommentController"));
exports.commentRouter = (0, express_1.Router)();
exports.commentRouter.use(auth_1.auth);
exports.commentRouter.get("/:id", CommentController_1.default.getAllComments);
exports.commentRouter.post("/add", CommentController_1.default.createComment);
exports.commentRouter.put("/editComment/:idComment", CommentController_1.default.editComment);
exports.commentRouter.delete("/deleteComment/:idComment", CommentController_1.default.removeComment);
//# sourceMappingURL=comment-router.js.map