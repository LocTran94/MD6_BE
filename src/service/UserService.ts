import {User} from "../model/user";
import {AppDataSource} from "../data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {SECRET} from "../middleware/auth";
import * as nodemailer from "nodemailer";

class UserServices {
    private userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    getAllUserService = async () => {
        let sql = `select *
                   from user
                   where NOT user.role = 'admin'
        `;
        let users = await this.userRepository.query(sql);
        return users;
    };

    getUserRequest = async () => {
        let sql = `select *
                   from user u
                   where u.ask = 'Yes'
                     and NOT u.role = 'admin'
                     and NOT u.role = 'seller'
                     and NOT u.role = 'Vip'`;
        let users = await this.userRepository.query(sql);
        return users;
    };

    getWaitUser = async () => {
        let sql = `select *
                   from user
                   where category = 'Wait'`;
        let users = await this.userRepository.query(sql);
        return users;
    };

    getAddVipService = async () => {
        let sql = `select *
                   from user u
                   where addVip = 'Yes'
                     and NOT u.role = 'Vip'`;
        let users = await this.userRepository.query(sql);
        return users;
    };

    getAllVipService = async () => {
        let sql = `select *
                   from user
                   where role = 'Vip'`;
        let users = await this.userRepository.query(sql);
        return users;
    };

    getMyProfile = async (idUser) => {
        let users = await this.userRepository.findOneBy({idUser: idUser});
        return users;
    };

    checkOldPassword = async (idUser, password) => {
        let userCheck = await this.userRepository.findOneBy({idUser: idUser});
        if (!userCheck) {
            return "User not found";
        } else {
            let passwordCompare = await bcrypt.compare(password, userCheck.password);
            if (passwordCompare) {
                return true;
            } else {
                return false;
            }
        }
    };

    changePasswordService = async (idUser, password) => {
        let user = await this.userRepository.findOneBy({idUser: idUser});
        if (!user) {
            return "User not found";
        } else {
            user.password = await bcrypt.hash(password, 10);
            return this.userRepository.update({idUser: idUser}, user);
        }
    };

    registerService = async (user) => {
        let userCheck = await this.userRepository.findOneBy({
            username: user.username,
        });
        if (userCheck) {
            return "Username already registered";
        }
        user.password = await bcrypt.hash(user.password, 10);
        return this.userRepository.save(user);
    };

    checkUserService = async (user) => {
        let userCheck = await this.userRepository.findOneBy({gmail: user.gmail});
        if (!userCheck) {
            return "User not found";
        } else {
            if (userCheck.status === "lock" || userCheck.category === "Wait") {
                return "your account has been locked";
            } else {
                let passwordCompare = await bcrypt.compare(
                    user.password,
                    userCheck.password
                );
                if (!passwordCompare) {
                    return "Wrong password";
                } else {
                    let payload = {
                        idUser: userCheck.idUser,
                        username: userCheck.username,
                        role: userCheck.role,
                        gender: userCheck.gender
                    };
                    const token = jwt.sign(payload, SECRET, {
                        expiresIn: 36000000,
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
                        status: userCheck.status,
                    };
                    return userRes;
                }
            }
        }
    };

    offlineService = async (id) => {
        let checkUser = await this.userRepository.findOneBy({idUser: id});
        if (!checkUser) {
            return null;
        } else {
            if (checkUser.status === "active") {
                checkUser.status = "off";
                await this.userRepository.save(checkUser);
            } else {
                checkUser.status = "active";
                await this.userRepository.save(checkUser);
            }
        }
    };

    changeStatus = async (id) => {
        let checkUser = await this.userRepository.findOneBy({idUser: id});
        if (!checkUser) {
            return null;
        } else {
            if (checkUser.status === "active") {
                checkUser.status = "lock";
                await this.userRepository.save(checkUser);
            } else if (checkUser.status === "lock") {
                checkUser.status = "active";
                await this.userRepository.save(checkUser);
            } else {
                return "account is offline";
            }
        }
    };

    changeAddVip = async (id, idUser) => {
        let checkSeller = await this.userRepository.findOneBy({idUser: id});

        if (!checkSeller) {
            return null;
        } else {
            if (checkSeller.role != "seller" && id === idUser) {
                return false;
            } else {
                if (checkSeller.addVip === "No") {
                    checkSeller.addVip = "Yes";
                    await this.userRepository.save(checkSeller);
                }
            }
        }
    };

    changeCategory = async (id) => {
        let checkUser = await this.userRepository.findOneBy({idUser: id});
        if (!checkUser) {
            return null;
        } else {
            if (checkUser.category === "Wait") {
                checkUser.category = "Add";
                await this.userRepository.save(checkUser);

                let email = checkUser.gmail;
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "tranhoangloc502@gmail.com", // Địa chỉ email của bạn
                        pass: "enlixpabkfmylwhr", // Mật khẩu của bạn
                    },
                });

                // // Gửi email
                await transporter.sendMail(
                    {
                        from: "tranhoangloc502@gmail.com", // Địa chỉ email của bạn
                        to: `${email}`, // Địa chỉ email của người nhận
                        subject: "Đăng ký thành công",
                        text: "Chúc mừng! Bạn đã đăng ký thành công.",
                    },
                    (error, info) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log("Email sent: " + "lalalalala");
                        }
                    }
                );
            }
        }
    };

    removeUserService = async (id) => {
        let user = await this.userRepository.findOneBy({idUser: id});
        if (!user) {
            return null;
        }
        return this.userRepository.delete({idUser: id});
    };

    userRequest = async (id) => {
        const d = new Date();
        let year = d.getFullYear();
        let checkUser = await this.userRepository.findOneBy({idUser: id});
        if (!checkUser) {
            return null;
        } else {
            if (year - checkUser.birthday.split("-")[0] > 18) {
                if (checkUser.ask === "No") {
                    checkUser.ask = "Yes";
                    await this.userRepository.save(checkUser);
                }
            } else {
                return "Bạn chưa đủ tuổi";
            }
        }
    };

    changeRole = async (id) => {
        let checkUser = await this.userRepository.findOneBy({idUser: id});
        if (!checkUser) {
            return null;
        } else {
            const d = new Date();
            let year = d.getFullYear();

            if (
                checkUser.role === "user" &&
                year - checkUser.birthday.split("-")[0] > 18
            ) {
                checkUser.role = "seller";
                await this.userRepository.save(checkUser);
                return " Bạn đã đăng ký thành công";
            } else {
                return "Bạn chưa đủ tuổi";
            }
        }
    };

    changeSeller = async (id) => {
        let checkUser = await this.userRepository.findOneBy({idUser: id});

        if (!checkUser) {
            return null;
        } else {
            if (checkUser.role == "seller") {
                checkUser.role = "Vip";
                await this.userRepository.save(checkUser);
                return "Bạn đã duyệt thành công";
            } else {
                return false;
            }
        }
    };

    findByNameService = async (name) => {
        let sql = `select *
                   from post p
                            join user u on p.idUser = u.idUser
                   where (u.username like '%${name}%' or p.namePost like '%${name}%')
                     and NOT u.status = 'off'
        `;
        let seller = await this.userRepository.query(sql);
        return seller;
    };

    findByGenderService = async (gender) => {
        let sql = `select *
                   from user u
                            join post p on u.idUser = p.idUser
                   where gender = '${gender}'
                     and NOT u.status = 'off'
        `;
        let seller = await this.userRepository.query(sql);
        return seller;
    };

    findByBirthdayService = async (yearOne, yearSecond) => {
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

    findByGmailService = async (idUser) => {
        let sql = `SELECT u.gmail
                   FROM user u
                   where u.idUser = ${idUser}`;
        let gmail = await this.userRepository.query(sql);
        return gmail;
    };
}

export default new UserServices();
