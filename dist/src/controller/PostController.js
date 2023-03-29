"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostService_1 = __importDefault(require("../service/PostService"));
const PostService_2 = __importDefault(require("../service/PostService"));
class PostController {
    constructor() {
        this.getAllPosts = async (req, res) => {
            try {
                let limit = 20;
                let offset = 0;
                let page = 1;
                if (req.query.page) {
                    page = +req.query.page;
                    offset = (+page - 1) * limit;
                }
                let totalPost = await PostService_2.default.count();
                const count = parseInt(totalPost[0]["count(idPost)"]);
                let totalPage = Math.ceil(count / limit);
                let posts = await PostService_2.default.getAll(limit, offset);
                let data;
                let orders;
                if (req["decoded"]) {
                    data = [posts, orders];
                }
                else {
                }
                res.status(200).json(posts);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getAllPosts2 = async (req, res) => {
            try {
                let limit = 12;
                let offset = 0;
                let page = 1;
                if (req.query.page) {
                    page = +req.query.page;
                    offset = (+page - 1) * limit;
                }
                let totalPost = await PostService_2.default.count();
                const count = parseInt(totalPost[0]["count(idFood)"]);
                let totalPage = Math.ceil(count / limit);
                let posts = await PostService_2.default.getAll(limit, offset);
                let data;
                let orders;
                if (req["decoded"]) {
                    data = [posts, orders];
                }
                else {
                }
                res.status(200).json(posts);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.createPost = async (req, res) => {
            try {
                let id = req.body.idUser;
                let posts = await this.postService.saveService(req.body, id);
                res.status(200).json(posts);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.editPost = async (req, res) => {
            try {
                let idUser = req.params.idUser;
                let idUserTocken = req["decoded"].idUser;
                let idPost = await this.postService.checkUserPostService(idUser);
                if (idUser == idUserTocken && req["decoded"].role === "seller") {
                    let post = await this.postService.updatePost(idPost, req.body);
                    res.status(200).json(post);
                }
                else {
                    res.status(401).json("invalid");
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getLimitPost = async (req, res) => {
            try {
                let posts = await this.postService.get12Post();
                res.status(200).json(posts);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findByIdPost = async (req, res) => {
            try {
                let idUser = req.params.idUser;
                let post = await PostService_2.default.findPostByIdUser(idUser);
                res.status(200).json(post);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findByIdUser = async (req, res) => {
            try {
                let idUser = req.params.id;
                let post = await PostService_2.default.findPostByIdUser(idUser);
                res.status(200).json(post);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.postService = PostService_1.default;
    }
}
exports.default = new PostController();
//# sourceMappingURL=PostController.js.map