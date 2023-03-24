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


    SavePersonalService = async (personalService, idPost,idUser) => {

        for (let i = 0; i < personalService.length; i++ ){
            let sql = `select u.role ,u.idUser
                   from post p
                            join user u on p.idUser = u.idUser
                   where p.idPost = ${idPost}`
            let result = await this.userRepository.query(sql)
            if (result[0].role=== 'user'){
                return false
            }else {
                if (result[0].idUser != idUser){
                    return false
                }
                let personal = {
                    idProvision: personalService[i],
                    idPost: idPost
                }
            let a = await this.personalServiceRepository.save(personal);
            }
        }

    }


}

export default new PersonalService();