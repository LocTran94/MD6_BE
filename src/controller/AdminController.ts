import { Request, Response } from "express";
import UserService from "../service/UserService";

class AdminController {
  private userServices;

  constructor() {
    this.userServices = UserService;
  }

  getAllUser = async (req: Request, res: Response) => {
    try {
      let response = await this.userServices.getAllUserService();
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  lockUser = async (req, res) => {
    try {
      let id = req.params.id;
      let response = await this.userServices.changeStatus(id);
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      let id = req.params.idUser;
      let user = await this.userServices.removeUserService(id);
      return res.status(200).json(user);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  getAskUser = async (req: Request, res: Response) => {
    try {
      let response = await this.userServices.getUserRequest();
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  getAddVip = async (req: Request, res: Response) => {
    try {
      let response = await this.userServices.getAddVipService();
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  getAddUser = async (req: Request, res: Response) => {
    try {
      let response = await this.userServices.getWaitUser();
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  changeRoleUser = async (req, res) => {
    try {
      let id = req.params.id;
      let response = await this.userServices.changeRole(id);
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  changeSellerToVip = async (req, res) => {
    try {
      let id = req.params.id;

      let response = await this.userServices.changeSeller(id);
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  changeCategoryUser = async (req, res) => {
    try {
      let id = req.params.id;
      let response = await this.userServices.changeCategory(id);

      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
}

export default new AdminController();
