import {Message} from '../model/Message';
import {User} from '../model/User';
import {AppDataSource} from "../data-source";
import {Request} from "express";

export class MessageService {
    private messageRepository;

    constructor() {
        this.messageRepository = AppDataSource.getRepository(Message)
    }

// lưu tin nhắn vào db



    sendMessage = async (message)=>{
        const messages = new Message()
        messages.content = message.content
        messages.idUser = message.idUser
        messages.idPost = message.idPost

      return  await this.messageRepository.save(message);

    }




// lấy ra tin nhắn giữ 2 người
    getMessages = async (idPost,idUser) => {

            let sql = `select content, dateOfMessage, IdUser 
                       from message join user on message.idUser = user.idUser
                       where idPost = '${idPost}' and idUser = '${idUser}'
                       order by (time) ASC`
            return await this.messageRepository.query(sql)

    }

}