"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const provision_1 = require("../model/provision");
class PostService {
    constructor() {
        this.getPrice = async (id) => {
            let sql = `select price
                   from provision pr
                   where pr.idProvision = ${id}`;
            let price = await this.provisionRepository.query(sql);
            return price[0].price;
        };
        this.getAllProvisionService = async () => {
            let sql = `select *
                   from provision`;
            let provisions = await this.provisionRepository.query(sql);
            if (!provisions) {
                return 'No posts found';
            }
            return provisions;
        };
        this.provisionRepository = data_source_1.AppDataSource.getRepository(provision_1.Provision);
    }
}
exports.default = new PostService();
//# sourceMappingURL=ProvisionService.js.map