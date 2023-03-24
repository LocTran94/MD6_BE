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
                let limit = 8;
                let offset = 0;
                let page = 1;
                if (req.query.page) {
                    page = +req.query.page;
                    offset = (+page - 1) * limit;
                }
                let totalPost = await PostService_2.default.count();
                const count = parseInt(totalPost[0]['count(idPost)']);
                let totalPage = Math.ceil(count / limit);
                let posts = await PostService_2.default.getAll(limit, offset);
                let data;
                let orders;
                if (req["decoded"]) {
                    data = [posts, orders];
                }
                else {
                }
                res.status(200).json({
                    posts: posts,
                    currentPage: page,
                    totalPage: totalPage
                });
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getAllPosts2 = async (req, res) => {
            try {
                let limit = 6;
                let offset = 0;
                let page = 1;
                if (req.query.page) {
                    page = +req.query.page;
                    offset = (+page - 1) * limit;
                }
                let totalPost = await PostService_2.default.count();
                const count = parseInt(totalPost[0]['count(idFood)']);
                let totalPage = Math.ceil(count / limit);
                let posts = await PostService_2.default.getAll(limit, offset);
                let data;
                let orders;
                if (req["decoded"]) {
                    data = [posts, orders];
                }
                else {
                }
                res.status(200).json({
                    posts: posts,
                    currentPage: page,
                    totalPage: totalPage
                });
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
                console.log(111111111, idUser);
                let idUserTocken = req["decoded"].idUser;
                console.log(2222222222, idUserTocken);
                let idPost = await this.postService.checkUserPostService(idUser);
                console.log(3333333333, idPost);
                console.log(444444444, req["decoded"].role);
                if ((idUser == idUserTocken) && (req["decoded"].role === 'seller')) {
                    let post = await this.postService.updatePost(idPost, req.body);
                    res.status(200).json(post);
                }
                else {
                    res.status(401).json('invalid');
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
                let idPost = req.params.id;
                let post = await PostService_2.default.findById(idPost);
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