"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
const nodemailer = __importStar(require("nodemailer"));
class UserServices {
    constructor() {
        this.getAllUserService = async () => {
            let sql = `select *
                   from user
                   where NOT user.role = 'admin'
        `;
            let users = await this.userRepository.query(sql);
            return users;
        };
        this.getUserRequest = async () => {
            let sql = `select *
                   from user u
                   where u.ask = 'Yes'
                     and NOT u.role = 'admin'
                     and NOT u.role = 'seller'`;
            let users = await this.userRepository.query(sql);
            return users;
        };
        this.getWaitUser = async () => {
            let sql = `select *
                   from user
                   where category = 'Wait'`;
            let users = await this.userRepository.query(sql);
            return users;
        };
        this.getMyProfile = async (idUser) => {
            let users = await this.userRepository.findOneBy({ idUser: idUser });
            return users;
        };
        this.checkOldPassword = async (idUser, password) => {
            let userCheck = await this.userRepository.findOneBy({ idUser: idUser });
            if (!userCheck) {
                return "User not found";
            }
            else {
                let passwordCompare = await bcrypt_1.default.compare(password, userCheck.password);
                if (passwordCompare) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };
        this.changePasswordService = async (idUser, password) => {
            let user = await this.userRepository.findOneBy({ idUser: idUser });
            if (!user) {
                return "User not found";
            }
            else {
                user.password = await bcrypt_1.default.hash(password, 10);
                return this.userRepository.update({ idUser: idUser }, user);
            }
        };
        this.registerService = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ username: user.username });
            if (userCheck) {
                return "Username already registered";
            }
            user.password = await bcrypt_1.default.hash(user.password, 10);
            return this.userRepository.save(user);
        };
        this.checkUserService = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ gmail: user.gmail });
            if (!userCheck) {
                return "User not found";
            }
            else {
                if (userCheck.status === 'lock' || userCheck.category === 'Wait') {
                    return "your account has been locked";
                }
                else {
                    let passwordCompare = await bcrypt_1.default.compare(user.password, userCheck.password);
                    if (!passwordCompare) {
                        return "Wrong password";
                    }
                    else {
                        let payload = {
                            idUser: userCheck.idUser,
                            username: userCheck.username,
                            role: userCheck.role
                        };
                        const token = jsonwebtoken_1.default.sign(payload, auth_1.SECRET, {
                            expiresIn: 36000000
                        });
                        let userRes = {
                            idUser: userCheck.idUser,
                            username: userCheck.username,
                            role: userCheck.role,
                            avatar: userCheck.avatar,
                            token: token,
                            gmail: userCheck.gmail,
                            birthday: userCheck.birthday,
                            gender: userCheck.gender,
                            ask: userCheck.ask,
                            category: userCheck.category,
                            status: userCheck.status
                        };
                        return userRes;
                    }
                }
            }
        };
        this.offlineService = async (id) => {
            let checkUser = await this.userRepository.findOneBy({ idUser: id });
            if (!checkUser) {
                return null;
            }
            else {
                if (checkUser.status === 'active') {
                    checkUser.status = 'off';
                    await this.userRepository.save(checkUser);
                }
                else {
                    checkUser.status = 'active';
                    await this.userRepository.save(checkUser);
                }
            }
        };
        this.changeStatus = async (id) => {
            let checkUser = await this.userRepository.findOneBy({ idUser: id });
            if (!checkUser) {
                return null;
            }
            else {
                if (checkUser.status === 'active') {
                    checkUser.status = 'lock';
                    await this.userRepository.save(checkUser);
                }
                else if (checkUser.status === 'lock') {
                    checkUser.status = 'active';
                    await this.userRepository.save(checkUser);
                }
                else {
                    return 'account is offline';
                }
            }
        };
        this.changeCategory = async (id) => {
            let checkUser = await this.userRepository.findOneBy({ idUser: id });
            if (!checkUser) {
                return null;
            }
            else {
                if (checkUser.category === 'Wait') {
                    checkUser.category = 'Add';
                    await this.userRepository.save(checkUser);
                    let email = checkUser.gmail;
                    let transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: 'tranhoangloc502@gmail.com',
                            pass: 'enlixpabkfmylwhr',
                        },
                    });
                    await transporter.sendMail({
                        from: 'tranhoangloc502@gmail.com',
                        to: `${email}`,
                        subject: 'Đăng ký thành công',
                        text: 'Chúc mừng! Bạn đã đăng ký thành công.',
                    }, (error, info) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log('Email sent: ' + 'lalalalala');
                        }
                    });
                }
            }
        };
        this.removeUserService = async (id) => {
            let user = await this.userRepository.findOneBy({ idUser: id });
            if (!user) {
                return null;
            }
            return this.userRepository.delete({ idUser: id });
        };
        this.userRequest = async (id) => {
            const d = new Date();
            let year = d.getFullYear();
            let checkUser = await this.userRepository.findOneBy({ idUser: id });
            if (!checkUser) {
                return null;
            }
            else {
                if (year - checkUser.birthday.split('-')[0] > 18) {
                    if (checkUser.ask === 'No') {
                        checkUser.ask = 'Yes';
                        await this.userRepository.save(checkUser);
                    }
                }
                else {
                    return 'Bạn chưa đủ tuổi';
                }
            }
        };
        this.changeRole = async (id) => {
            let checkUser = await this.userRepository.findOneBy({ idUser: id });
            if (!checkUser) {
                return null;
            }
            else {
                const d = new Date();
                let year = d.getFullYear();
                console.log(year - checkUser.birthday.split('-')[0]);
                if (checkUser.role === 'user' && year - checkUser.birthday.split('-')[0] > 18) {
                    checkUser.role = 'seller';
                    await this.userRepository.save(checkUser);
                    return " Bạn đã đăng ký thành công";
                }
                else {
                    return 'Bạn chưa đủ tuổi';
                }
            }
        };
        this.findByNameService = async (name) => {
            let sql = `select *
                   from post p
                            join user u on p.idUser = u.idUser
                   where (u.username like '%${name}%' or p.namePost like '%${name}%')
                     and NOT u.status = 'off'
        `;
            let seller = await this.userRepository.query(sql);
            return seller;
        };
        this.findByGenderService = async (gender) => {
            let sql = `select *
                   from user u
                            join post p on u.idUser = p.idUser
                   where gender = '${gender}'
                     and NOT u.status = 'off'
        `;
            let seller = await this.userRepository.query(sql);
            return seller;
        };
        this.findByBirthdayService = async (yearOne, yearSecond) => {
            let sql = `SELECT *
                   FROM user u
                            join post p on u.idUser = p.idUser
                   where (YEAR(CURDATE()) - YEAR (birthday)) >= '${yearOne}'
                     and (YEAR(CURDATE()) - YEAR (birthday)) < '${yearSecond}'
                     and NOT u.status = 'off'
        `;
            let seller = await this.userRepository.query(sql);
            return seller;
        };
        this.findByGmailService = async (idUser) => {
            let sql = `SELECT u.gmail
                   FROM user u
                   where  u.idUser = ${idUser}`;
            let gmail = await this.userRepository.query(sql);
            return gmail;
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
}
exports.default = new UserServices();
//# sourceMappingURL=UserService.js.map