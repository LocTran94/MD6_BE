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
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const order_1 = require("../model/order");
const nodemailer = __importStar(require("nodemailer"));
const user_1 = require("../model/user");
const post_1 = require("../model/post");
class OrderService {
    constructor() {
        this.getAllOrders = async () => {
            let sql = `select *
                   from orders o
                            join post p on o.idPost = p.idPost
                            join user u on p.idUser = u.idUser
                    `;
            let orders = await this.orderRepository.query(sql);
            if (!orders) {
                return "No orders found";
            }
            return orders;
        };
        this.getAllOrdersInSellerService = async (id) => {
            let sql = `select *
                   from orders o
                            join post p on o.idPost = p.idPost
                            join user u on p.idUser = u.idUser
                   where p.idUser = ${id} `;
            let orders = await this.orderRepository.query(sql);
            if (!orders) {
                return "No orders found";
            }
            return orders;
        };
        this.getAllOrdersInUserService = async (id) => {
            let sql = `select *
                   from orders o
                            join post p on o.idPost = p.idPost
                            join user u on p.idUser = u.idUser
                   where o.idUser = ${id}`;
            let orders = await this.orderRepository.query(sql);
            if (!orders) {
                return "No orders found";
            }
            return orders;
        };
        this.saveOrder = async (order) => {
            return await this.orderRepository.save(order);
        };
        this.changeStatusOrderService = async (id) => {
            let checkOrder = await this.orderRepository.findOneBy({ idOrder: id });
            let idUser = checkOrder.idUser;
            let user = await this.userRepository.findOneBy({ idUser: idUser });
            let post = await this.postRepository.findOneBy({ idUser: idUser });
            console.log(1111111111111111, post);
            let email = user.gmail;
            if (!checkOrder) {
                return null;
            }
            else {
                if (checkOrder.statusOrder === "Wait") {
                    checkOrder.statusOrder = "Approved";
                    post.view += 1;
                    await this.postRepository.save(post);
                    console.log(22222222222222, post.view);
                    await this.orderRepository.save(checkOrder);
                    let transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: "tranhoangloc502@gmail.com",
                            pass: "enlixpabkfmylwhr",
                        },
                    });
                    await transporter.sendMail({
                        from: "tranhoangloc502@gmail.com",
                        to: `${email}`,
                        subject: "Mua thành công",
                        text: "Đơn hàng của bạn đã được nhận",
                    }, (error, info) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log("Email sent: " + "lalalalala");
                        }
                    });
                }
            }
        };
        this.changeStatusOrderInUser = async (id, idUser) => {
            let checkOrder = await this.orderRepository.findOneBy({ idOrder: id });
            let idUserInOrder = checkOrder.idUser;
            if (!checkOrder) {
                return null;
            }
            else {
                if (idUserInOrder != idUser) {
                    return false;
                }
                else {
                    if (checkOrder.statusOrder === "Approved") {
                        checkOrder.statusOrder = "Done";
                        await this.orderRepository.save(checkOrder);
                    }
                    else {
                        return false;
                    }
                }
            }
        };
        this.getOrderInDay = async (id, startTime, endTime) => {
            let sql = `select *
                   from orders o
                            join post p on o.idPost = p.idPost
                            join user u on p.idUser = u.idUser

                   where o.idPost = ${id}
                       and ('${startTime}' <= o.endTime and o.endTime <= '${endTime}')
                      or ('${startTime}' <= o.startTime and o.startTime <= '${endTime}')
        `;
            let orders = await this.orderRepository.query(sql);
            if (orders.length === 0) {
                return true;
            }
            else {
                return false;
            }
        };
        this.subtractionDate = async (startTime, endTime) => {
            let sql = `select DATEDIFF( '${endTime}','${startTime}' ) as date`;
            let time = await this.orderRepository.query(sql);
            return time[0].date;
        };
        this.orderRepository = data_source_1.AppDataSource.getRepository(order_1.Orders);
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
        this.postRepository = data_source_1.AppDataSource.getRepository(post_1.Post);
    }
}
exports.default = new OrderService();
//# sourceMappingURL=OrderService.js.map