"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const order_1 = require("../model/order");
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
            console.log(1111111111111, checkOrder);
            if (!checkOrder) {
                return null;
            }
            else {
                if (checkOrder.statusOrder === 'Wait') {
                    checkOrder.statusOrder = 'Approved';
                    await this.orderRepository.save(checkOrder);
                }
            }
        };
        this.getOrderInDay = async (id, startTime, endTime) => {
            let sql = `select *
                   from orders o
                            join post p on o.idPost = p.idPost
                            join user u on p.idUser = u.idUser
                           
                   where o.idPost = ${id}
                     and  '${startTime}' <= o.endTime and o.endTime <= '${endTime}'
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
    }
}
exports.default = new OrderService();
//# sourceMappingURL=OrderService.js.map