"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const personalService_1 = require("../model/personalService");
const user_1 = require("../model/user");
class PostService {
    constructor() {
        this.SavePersonalService = async (personalService, idPost) => {
            let sql = `select u.role
                   from post p
                            join user u on p.idUser = u.idUser
                   where p.idPost = ${idPost}`;
            let result = await this.userRepository.query(sql);
            console.log(11111111111, result);
            return this.personalServiceRepository.save(personalService);
        };
        this.personalServiceRepository = data_source_1.AppDataSource.getRepository(personalService_1.PersonalService);
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
}
exports.default = new PostService();
//# sourceMappingURL=Personal.js.map