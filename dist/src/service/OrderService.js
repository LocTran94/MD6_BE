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
class OrderService {
    constructor() {
        this.getAllOrdersInSellerService = async (id) => {
            let sql = `select *
                   from orders o
                            join post p on o.idPost = p.idPost
                            join user u on p.idUser = u.idUser
                   where o.idPost = ${id} `;
            let orders = await this.orderRepository.query(sql);
            if (!orders) {
                return 'No orders found';
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
                return 'No orders found';
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
            let email = user.gmail;
            if (!checkOrder) {
                return null;
            }
            else {
                if (checkOrder.statusOrder === 'Wait') {
                    checkOrder.statusOrder = 'Approved';
                    await this.orderRepository.save(checkOrder);
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
                        subject: 'Mua thành công',
                        text: 'Đơn hàng của bạn đã được nhận',
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
        this.getOrderInDay = async (id, startTime, endTime) => {
            let sql = `select *
                   from orders o
                            join post p on o.idPost = p.idPost
                            join user u on p.idUser = u.idUser
                           
                   where o.idPost = ${id}
                     and  ('${startTime}' <= o.endTime and o.endTime <= '${endTime}')
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
    }
}
exports.default = new OrderService();
//# sourceMappingURL=OrderService.js.map