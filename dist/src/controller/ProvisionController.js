"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProvisionService_1 = __importDefault(require("../service/ProvisionService"));
class ProvisionController {
    constructor() {
        this.getAllProvision = async (req, res) => {
            try {
                let response = await this.provisionServices.getAllProvisionService();
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.provisionServices = ProvisionService_1.default;
    }
}
exports.default = new ProvisionController();
//# sourceMappingURL=ProvisionController.js.map