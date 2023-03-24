"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const PostController_1 = __importDefault(require("../controller/PostController"));
exports.postRouter = (0, express_1.Router)();
exports.postRouter.use(auth_1.auth);
exports.postRouter.get('', PostController_1.default.getAllPosts);
exports.postRouter.get('/getAllPost2', PostController_1.default.getAllPosts2);
exports.postRouter.post('/add', PostController_1.default.createPost);
exports.postRouter.put('/edit/:idUser', PostController_1.default.editPost);
exports.postRouter.get('/showPosts', PostController_1.default.getLimitPost);
exports.postRouter.get('/findById/:id', PostController_1.default.findByIdPost);
//# sourceMappingURL=post-router.js.map