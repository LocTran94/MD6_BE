import { Request, Response } from "express";
import UserService from "../service/UserService";
import PostService from "../service/PostService";
import PersonalService from "../service/PersonalService";

class UserController {
  private userServices;
  private postServices;
  private personalServices;

  constructor() {
    this.userServices = UserService;
    this.postServices = PostService;
    this.personalServices = PersonalService;
  }

  showMyProfile = async (req: Request, res: Response) => {
    try {
      let id = req.params;
      let response = await this.userServices.getMyProfile(id.id);
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  showVip = async (req: Request, res: Response) => {
    try {
      let response = await this.userServices.getAllVipService();
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  showSellerProfile = async (req: Request, res: Response) => {
    try {
      let id = req.params; //idPost
      let response = await this.postServices.checkSeller(id.id);
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  showProvision = async (req: Request, res: Response)=> {
    try {
      let id = req.params.id; //idUser
      let response = await this.personalServices.FindNameProvision(id)
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  changePassword = async (req: Request, res: Response) => {
    try {
      let checkOldPassword = await this.userServices.checkOldPassword(
        req.params.id,
        req.body.oldPassword
      );
      if (checkOldPassword === "User not found") {
        return res.status(200).json("User not found");
      } else if (checkOldPassword === false) {
        return res.status(200).json("Old password not true");
      } else {
        await this.userServices.changePasswordService(
          req.params.id,
          req.body.newPassword
        );
        return res.status(200).json("Success");
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      let user = await this.userServices.registerService(req.body);
      return res.status(201).json(user);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  login = async (req: Request, res: Response) => {

    try {
      let response = await this.userServices.checkUserService(req.body);
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  checkOff = async (req, res) => {
    try {
      let id = req.params.id;
      let response = await this.userServices.offlineService(id);
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  checkRequest = async (req, res) => {
    try {
      let id = req.params.id;
      let response = await this.userServices.userRequest(id);
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  checkAddVip = async (req, res) => {
    let idUser = req["decoded"].idUser;
    let id = req.params.id;
    let response = await this.userServices.changeAddVip(id, idUser);
    return res.status(200).json(response);

    // try {
    //     let idUser = req["decoded"].idUser
    //
    //     let id = req.params.id
    //     let response = await this.userServices.changeAddVip(id,idUser)
    //     return res.status(200).json(response)
    //
    // } catch (e) {
    //     res.status(500).json(e.message)
    // }
  };

  findByName = async (req, res) => {
    try {
      let name = req.params.name;
      let response = await this.userServices.findByNameService(name);
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  findByGender = async (req, res) => {
    try {
      let gender = req.params.gender;
      let response = await this.userServices.findByGenderService(gender);
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  findByBirthday = async (req, res) => {
    try {
      let yearOne = req.body.yearOne;
      let yearSecond = req.body.yearSecond;
      let response = await this.userServices.findByBirthdayService(
        yearOne,
        yearSecond
      );
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };



  findByTopSixSeller = async (req, res)=>{
    try {
      let response = await this.postServices.findByTopSixSellerService();
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }



  findByTopSixVip = async (req, res)=>{
    try {
      let response = await this.postServices.findByTopSixVipService();
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }




  findByTopTwelfthSeller = async (req, res)=>{
    try {
      let gender = req["decoded"].gender;
      let response = await this.postServices.findByTopTwelfthSellerService(gender);
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }


  findByTopFourMalesEightFemales = async (req, res)=>{
    try {

      let response = await this.postServices.findByTopFourMalesEightFemalesService();
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

}

export default new UserController();
