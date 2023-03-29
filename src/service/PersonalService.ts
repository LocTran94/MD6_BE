import {AppDataSource} from "../data-source";
import {Personal} from "../model/personal";
import {User} from "../model/user";


class PersonalService {
    private personalRepository
    private userRepository

    constructor() {
        this.personalRepository = AppDataSource.getRepository(Personal);
        this.userRepository = AppDataSource.getRepository(User);
    }


    SavePersonalService = async (personalService,idUser) => {

        for (let i = 0; i < personalService.length; i++ ){
            let sql = `select u.role ,u.idUser
                   from user u where u.idUser = ${idUser}`
            let result = await this.userRepository.query(sql)
            if (result[0].role=== 'user'){
                return false
            }else {

                let personal = {
                    idProvision: personalService[i],
                    idUser: result[0].idUser
                }
            let a = await this.personalRepository.save(personal);
            }
        }

    }


    FindNameProvision = async (id)=>{
        let sql = `select provisionName from provision p join personal pe on p.idProvision = pe.idProvision
                     where pe.idUser = ${id}`
        let result = await this.personalRepository.query(sql)
        return result
    }




}

export default new PersonalService();