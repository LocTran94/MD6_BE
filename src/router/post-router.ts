import {Router} from "express";

import {auth} from "../middleware/auth";
import PostController from "../controller/PostController";

export const postRouter = Router();
postRouter.use(auth)

postRouter.get('', PostController.getAllPosts)// phân trang theo combonent 1
postRouter.get('/getAllPost2', PostController.getAllPosts2)// phân trang theo combonent 2
postRouter.post('/add', PostController.createPost)
// postRouter.delete('/remove/:idPost', PostController.removePost)
postRouter.put('/edit/:idUser', PostController.editPost)
postRouter.get('/showPosts', PostController.getLimitPost)
postRouter.get('/findById/:id', PostController.findByIdPost)
postRouter.get('/findPostByIdUser/:id', PostController.findByIdUser)
postRouter.get('/countView/:id', PostController.countView)


