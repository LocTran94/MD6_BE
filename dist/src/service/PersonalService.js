"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const personal_1 = require("../model/personal");
const user_1 = require("../model/user");
class PersonalService {
    constructor() {
        this.SavePersonalService = async (personalService, idPost) => {
            let sql = `select u.role
                   from post p
                            join user u on p.idUser = u.idUser
                   where p.idPost = ${idPost}`;
            let result = await this.userRepository.query(sql);
            if (result[0].role === 'user') {
                return false;
            }
            else {
                return this.personalServiceRepository.save(personalService);
            }
        };
        this.personalServiceRepository = data_source_1.AppDataSource.getRepository(personal_1.Personal);
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
}
exports.default = new PersonalService();
//# sourceMappingURL=PersonalService.js.map