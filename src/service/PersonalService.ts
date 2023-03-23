import {AppDataSource} from "../data-source";
import {Personal} from "../model/personal";
import {User} from "../model/user";


class PersonalService {
    private personalServiceRepository
    private userRepository

    constructor() {
        this.personalServiceRepository = AppDataSource.getRepository(Personal);
        this.userRepository = AppDataSource.getRepository(User);
    }


    SavePersonalService = async (personalService, idPost) => {
        let sql = `select u.role
                   from post p
                            join user u on p.idUser = u.idUser
                   where p.idPost = ${idPost}`
        let result = await this.userRepository.query(sql)
        if (result[0].role=== 'user'){
            return false
        }else {
            return this.personalServiceRepository.save(personalService);
        }

    }


}

export default new PersonalService();