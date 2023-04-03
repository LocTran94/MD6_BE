import {AppDataSource} from "../data-source";
import {Post} from "../model/post";
import {User} from "../model/user";


class PostService {
    private postRepository
    private userRepository


    constructor() {
        this.postRepository = AppDataSource.getRepository(Post);
        this.userRepository = AppDataSource.getRepository(User);

    }


    count = async () => {
        let sql = `select count(idPost)
                   from post `
        let count = await this.postRepository.query(sql)

        return count
    }

    getAll = async (limit, offset) => {
        let sql = `select *
                   from post p
                            join user u on p.idUser = u.idUser
                   where NOT u.status = 'off' limit ${limit}
                   offset ${offset}`;
        let posts = await this.postRepository.query(sql);

        if (!posts) {
            return 'No posts found'
        }
        return posts;
    }

    findById = async (id) => {
        let sql = `select *
                   from user u
                            join post p on u.idUser = p.idUser
                   where p.idPost = ${id}`;
        let post = await this.postRepository.query(sql)
        return post;
    }
    findPostByIdUser = async (id) => {
        let sql = `select *
                   from user u
                            join post p on u.idUser = p.idUser
                   where p.idUser = ${id}`;
        let post = await this.postRepository.query(sql)
        return post;
    }


    saveService = async (post, id) => {
        let sql = `select user.role
                   from user
                   where idUser = ${id}`
        let result = await this.userRepository.query(sql)

        if (result[0].role === 'user') {
            return false
        } else {
            return this.postRepository.save(post);
        }

    };


    get12Post = async () => {
        let sql = `SELECT *
                   FROM post
                   ORDER BY date DESC limit 12`;
        return this.postRepository.query(sql)

    }


    updatePost = async (idPost, newPost) => {


        let post = await this.postRepository.findOneBy({idPost: idPost})


        if (!post) {
            return null
        }

        await this.postRepository.update({idPost: idPost}, newPost)
        return newPost.idUser;
    }


    // removePostService = async (idPost) => {
    //     let posts = await this.postRepository.findOneBy({idPost: idPost});
    //     if (!posts) {
    //         return null
    //     }
    //     await this.postRepository.delete({idPost: idPost});
    //     return posts.idUser;
    // }


    checkUserPostService = async (idUser) => {
        let sql = `select p.idPost
                   from user u
                            join post p on p.idUser = u.idUser

                   where p.idUser = ${idUser}`;
        let checkIdPost = await this.postRepository.query(sql);

        return checkIdPost[0].idPost;
    }


    checkSeller = async (idPost) => {
        let sql = `select *
                   from user u
                            join post p on p.idUser = u.idUser
                            join personal ps on ps.idPost = p.idPost
                            join provision pr on ps.idProvision = pr.idProvision

                   where p.idPost = ${idPost}`;
        let profile = await this.postRepository.query(sql);

        return profile
    }

    findPrice = async (idPost) => {
        let sql = `SELECT price
                   from post p
                   where p.idPost = ${idPost}`
        let price = await this.postRepository.query(sql)
        return price[0].price
    }


    findByTopSixSellerService = async () => {
        let sql = `select *
                   from post p
                            join user u on p.idUser = u.idUser
                   ORDER BY view DESC limit 6`
        let sellers = await this.postRepository.query(sql)
        return sellers
    }


    findByTopSixVipService = async () => {
        let sql = `select *
                   from post p
                            join user u on p.idUser = u.idUser
                   where u.role = 'Vip'
                   ORDER BY rent DESC limit 6`
        let sellers = await this.postRepository.query(sql)
        return sellers
    }


    findByTopTwelfthSellerService = async (gender) => {
        if(gender === 'nam'){
            let sql = `SELECT *
                   FROM post p
                            JOIN user u ON p.idUser = u.idUser
                   where u.gender = 'nữ'
                   ORDER BY date DESC limit 12`
            let sellers = await this.postRepository.query(sql)
            return sellers
        }else {
            let sql = `SELECT *
                   FROM post p
                            JOIN user u ON p.idUser = u.idUser
                   where u.gender = 'nam'
                   ORDER BY date DESC limit 12`
            let sellers = await this.postRepository.query(sql)
            return sellers
        }

    }





    findByTopFourMalesEightFemalesService = async () => {
        let sql1 = `select *
                   from post p
                            join user u on p.idUser = u.idUser where
                       u.gender = 'nam'
                   ORDER BY rent DESC limit 4`
        let MalesSellers = await this.postRepository.query(sql1)
        let sql2 = `select *
                   from post p
                            join user u on p.idUser = u.idUser where
                       u.gender = 'nữ'
                   ORDER BY rent DESC limit 8`
        let FemalesSellers = await this.postRepository.query(sql2)

        let sellers = {male:MalesSellers,female:FemalesSellers}
        return sellers
    }


    countViewService = async (idPost) =>{
        let post = await this.postRepository.findOneBy({ idPost: idPost})
        post.view += 1;
        await this.postRepository.save(post);
    }







}

export default new PostService();