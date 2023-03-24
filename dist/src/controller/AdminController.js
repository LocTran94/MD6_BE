"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../service/UserService"));
class AdminController {
    constructor() {
        this.getAllUser = async (req, res) => {
            try {
                let response = await this.userServices.getAllUserService();
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.lockUser = async (req, res) => {
            try {
                let id = req.params.id;
                let response = await this.userServices.changeStatus(id);
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.remove = async (req, res) => {
            try {
                let id = req.params.idUser;
                let user = await this.userServices.removeUserService(id);
                return res.status(200).json(user);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getAskUser = async (req, res) => {
            try {
                let response = await this.userServices.getUserRequest();
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getAddVip = async (req, res) => {
            try {
                let response = await this.userServices.getAddVipService();
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getAddUser = async (req, res) => {
            try {
                let response = await this.userServices.getWaitUser();
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.changeRoleUser = async (req, res) => {
            try {
                let id = req.params.id;
                let response = await this.userServices.changeRole(id);
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.changeSellerToVip = async (req, res) => {
            try {
                let id = req.params.id;
                let response = await this.userServices.changeSeller(id);
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.changeCategoryUser = async (req, res) => {
            try {
                let id = req.params.id;
                let response = await this.userServices.changeCategory(id);
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.userServices = UserService_1.default;
    }
}
exports.default = new AdminController();
//# sourceMappingURL=AdminController.js.map