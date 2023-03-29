"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const personal_1 = require("../model/personal");
const user_1 = require("../model/user");
class PersonalService {
    constructor() {
        this.SavePersonalService = async (personalService, idUser) => {
            for (let i = 0; i < personalService.length; i++) {
                let sql = `select u.role ,u.idUser
                   from user u where u.idUser = ${idUser}`;
                let result = await this.userRepository.query(sql);
                if (result[0].role === 'user') {
                    return false;
                }
                else {
                    let personal = {
                        idProvision: personalService[i],
                        idUser: result[0].idUser
                    };
                    let a = await this.personalRepository.save(personal);
                }
            }
        };
        this.FindNameProvision = async (id) => {
            let sql = `select provisionName from provision p join personal pe on p.idProvision = pe.idProvision
                     where pe.idUser = ${id}`;
            let result = await this.personalRepository.query(sql);
            return result;
        };
        this.personalRepository = data_source_1.AppDataSource.getRepository(personal_1.Personal);
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
}
exports.default = new PersonalService();
//# sourceMappingURL=PersonalService.js.map