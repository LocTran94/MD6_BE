import { Request, Response } from "express";

import PostService from "../service/PostService";
import postService from "../service/PostService";

class PostController {
  private postService;

  constructor() {
    this.postService = PostService;
  }

  getAllPosts = async (req: Request, res: Response) => {
    try {
      let limit = 20;
      let offset = 0;
      let page = 1;
      if (req.query.page) {
        page = +req.query.page;
        offset = (+page - 1) * limit;
      }
      let totalPost = await postService.count();
      const count = parseInt(totalPost[0]["count(idPost)"]);
      let totalPage = Math.ceil(count / limit);

      let posts = await postService.getAll(limit, offset);
      let data;
      let orders;

      if (req["decoded"]) {
        data = [posts, orders];
      } else {
        // data = [posts];
      }
      res.status(200).json(posts);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  getAllPosts2 = async (req: Request, res: Response) => {
    try {
      let limit = 12;
      let offset = 0;
      let page = 1;
      if (req.query.page) {
        page = +req.query.page;
        offset = (+page - 1) * limit;
      }
      let totalPost = await postService.count();
      const count = parseInt(totalPost[0]["count(idFood)"]);
      let totalPage = Math.ceil(count / limit);
      let posts = await postService.getAll(limit, offset);
      let data;
      let orders;

      if (req["decoded"]) {
        data = [posts, orders];
      } else {
        // data = [posts];
      }
      res.status(200).json(posts);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  createPost = async (req: Request, res: Response) => {
    try {
      let id = req.body.idUser;
      let posts = await this.postService.saveService(req.body, id);
      res.status(200).json(posts);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  editPost = async (req: Request, res: Response) => {
    try {
      let idUser = req.params.idUser;
      let idUserTocken = req["decoded"].idUser;
      let idPost = await this.postService.checkUserPostService(idUser);
      if (idUser == idUserTocken && req["decoded"].role === "seller") {
        let post = await this.postService.updatePost(idPost, req.body);
        res.status(200).json(post);
      } else {
        res.status(401).json("invalid");
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  // removePost = async (req: Request, res: Response) => {
  //     try {
  //         let idPost = req.params.idPost;
  //
  //         let idUser = req["decoded"].idUser;
  //
  //         let check = await this.postService.checkUser1(idUser, idPost);
  //
  //
  //         if (check === true && (req["decoded"].role === 'seller')) {
  //             let songs = await this.postService.removePostService(idPost);
  //             res.status(200).json(songs);
  //         } else {
  //             res.status(401).json('invalid');
  //         }
  //     } catch (e) {
  //         res.status(500).json(e.message)
  //     }
  //
  // }

  getLimitPost = async (req: Request, res: Response) => {
    try {
      let posts = await this.postService.get12Post();
      res.status(200).json(posts);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  findByIdPost = async (req: Request, res: Response) => {
    try {
      let idUser = req.params.idUser;
      let post = await postService.findPostByIdUser(idUser);
      res.status(200).json(post);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  findByIdUser = async (req: Request, res: Response) => {
    try {
      let idUser = req.params.id;
      let post = await postService.findPostByIdUser(idUser);
      res.status(200).json(post);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };


  countView = async (req, res) => {
    try {
      let idPost = req.params.id;
      let post = await postService.countViewService(idPost);
      res.status(200).json(post);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new PostController();
