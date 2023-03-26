"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const order_1 = require("../model/order");
const user_1 = require("../model/user");
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
                return 'No orders found';
            }
            return orders;
        };
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
                    await this.orderRepository.sendMailService(email);
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
                    if (checkOrder.statusOrder === 'Approved') {
                        checkOrder.statusOrder = 'Done';
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
    }
}
exports.default = new OrderService();
//# sourceMappingURL=OrderService.js.map