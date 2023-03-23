"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PersonalService_1 = __importDefault(require("../service/PersonalService"));
class PersonalServiceController {
    constructor() {
        this.createPersonalService = async (req, res) => {
            try {
                let idUser = req["decoded"].idUser;
                let idPost = req.body.idPost;
                let personalService = await this.personalService.SavePersonalService(req.body, idPost, idUser);
                res.status(200).json(personalService);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.personalService = PersonalService_1.default;
    }
}
exports.default = new PersonalServiceController();
//# sourceMappingURL=PersonalServiceController.js.map