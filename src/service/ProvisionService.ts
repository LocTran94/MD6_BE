import {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {Provision} from "../model/provision";


class PostService {
    private provisionRepository

    constructor() {
        this.provisionRepository = AppDataSource.getRepository(Provision);
    }


    // getPrice = async (id) => {
    //     let sql = `select price
    //                from provision pr
    //                where pr.idProvision = ${id}`
    //     let price = await this.provisionRepository.query(sql)
    //     return price[0].price
    // }

    getAllProvisionService = async () => {
        let sql = `select *
                   from provision`;
        let provisions = await this.provisionRepository.query(sql);
        if (!provisions) {
            return 'No posts found'
        }
        return provisions;
    }

}

export default new PostService();