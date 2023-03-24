"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const post_1 = require("../model/post");
const user_1 = require("../model/user");
class PostService {
    constructor() {
        this.count = async () => {
            let sql = `select count(idPost) from post `;
            let count = await this.postRepository.query(sql);
            return count;
        };
        this.getAll = async (limit, offset) => {
            let sql = `select *
                   from post p
                            join user u on p.idUser = u.idUser
                   where NOT u.status = 'off' limit ${limit} offset ${offset}`;
            let posts = await this.postRepository.query(sql);
            console.log(posts);
            if (!posts) {
                return 'No posts found';
            }
            return posts;
        };
        this.findById = async (id) => {
            let sql = `select *
                   from user u
                            join post p on u.idUser = p.idUser
                   where p.idPost = ${id}`;
            let post = await this.postRepository.query(sql);
            return post;
        };
        this.saveService = async (post, id) => {
            let sql = `select user.role from user where idUser = ${id}`;
            let result = await this.userRepository.query(sql);
            if (result[0].role === 'user') {
                return false;
            }
            else {
                return this.postRepository.save(post);
            }
        };
        this.get12Post = async () => {
            let sql = `SELECT *
                   FROM post
                   ORDER BY date DESC limit 12`;
            return this.postRepository.query(sql);
        };
        this.updatePost = async (idPost, newPost) => {
            let post = await this.postRepository.findOneBy({ idPost: idPost });
            if (!post) {
                return null;
            }
            await this.postRepository.update({ idPost: idPost }, newPost);
            return newPost.idUser;
        };
        this.checkUserPostService = async (idUser) => {
            let sql = `select p.idPost
                   from user u
                            join post p on p.idUser = u.idUser

                   where p.idUser = ${idUser}`;
            let checkIdPost = await this.postRepository.query(sql);
            return checkIdPost[0].idPost;
        };
        this.checkSeller = async (idPost) => {
            let sql = `select *
                   from user u
                            join post p on p.idUser = u.idUser
                            join personal ps on ps.idPost = p.idPost
                            join provision pr on ps.idProvision = pr.idProvision

                   where p.idPost = ${idPost}`;
            let profile = await this.postRepository.query(sql);
            return profile;
        };
        this.findPrice = async (idPost) => {
            let sql = `SELECT price from post p where p.idPost = ${idPost}`;
            let price = await this.postRepository.query(sql);
            return price[0].price;
        };
        this.postRepository = data_source_1.AppDataSource.getRepository(post_1.Post);
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
}
exports.default = new PostService();
//# sourceMappingURL=PostService.js.map