
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


    count=async ()=>{
        let sql=`select count(idPost) from post `
        let count=await this.postRepository.query(sql)

        return count
    }

    getAll = async (limit,offset) => {
        let sql = `select *
                   from post p
                            join user u on p.idUser = u.idUser
                   where NOT u.status = 'off' limit ${limit} offset ${offset}`;
        let posts = await this.postRepository.query(sql);
        console.log(posts)
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


    saveService = async (post) => {

        return this.postRepository.save(post);
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


    removePostService = async (idPost) => {
        let posts = await this.postRepository.findOneBy({idPost: idPost});
        if (!posts) {
            return null
        }
        await this.postRepository.delete({idPost: idPost});
        return posts.idUser;
    }


    checkUserPostService = async (idUser, idPost) => {
        let sql = `select u.idUser
                   from user u
                            join post p on p.idUser = u.idUser

                   where p.idPost = ${idPost}`;
        let checkIdUser = await this.postRepository.query(sql);


        if (checkIdUser[0].idUser === idUser) {
            return true;
        }
        return false;
    }


    checkSeller = async (idPost) => {
        let sql = `select *
                   from user u
                            join post p on p.idUser = u.idUser

                   where p.idPost = ${idPost}`;
        let profile = await this.postRepository.query(sql);

        // let users = await this.userRepository.findOneBy({idUser: idUser[0].idUser});

        return profile
    }

    findPrice = async (idPost)=>{
        let sql = `SELECT price from post p where p.idPost = ${idPost}`
        let price = await this.postRepository.query(sql)
        return price[0].price

    }


}

export default new PostService();