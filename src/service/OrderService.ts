import {AppDataSource} from "../data-source";
import {Orders} from "../model/order";


class OrderService {
    private orderRepository

    constructor() {
        this.orderRepository = AppDataSource.getRepository(Orders)
    }

    getAllOrdersInSellerService = async (id) => {
        let sql = `select *
                   from orders o
                            join post p on o.idPost = p.idPost
                            join user u on p.idUser = u.idUser
                   where o.idPost = ${id} `
        let orders = await this.orderRepository.query(sql)
        if (!orders) {
            return 'No orders found'
        }
        return orders;
    }


    getAllOrdersInUserService = async (id) => {
        let sql = `select *
                   from orders o
                            join post p on o.idPost = p.idPost
                            join user u on p.idUser = u.idUser
                   where o.idUser = ${id}`
        let orders = await this.orderRepository.query(sql)
        if (!orders) {
            return 'No orders found'
        }
        return orders;

    }


    saveOrder = async (order) => {
        return await this.orderRepository.save(order)
    }


    changeStatusOrder = async (id) => {
        let checkOrder = await this.orderRepository.findOneBy({idOrder: id})
        if (!checkOrder) {
            return null
        } else {
            if (checkOrder.status === 'Wait') {
                checkOrder.status = 'Approved'
                await this.orderRepository.save(checkOrder)


            }
        }

    }


    getOrderInDay = async (id, startTime,endTime) => {
        let sql = `select *
                   from orders o
                            join post p on o.idPost = p.idPost
                            join user u on p.idUser = u.idUser
                           
                   where o.idPost = ${id}
                     and  '${startTime}' <= o.endTime and o.endTime <= '${endTime}'
                     `

        let orders = await this.orderRepository.query(sql);

        if (orders.length === 0) {
            return true
        } else {
            return false
        }
    }




    subtractionDate = async (startTime, endTime) => {

        let sql = `select DATEDIFF( '${endTime}','${startTime}' ) as date`
        let time =  await this.orderRepository.query(sql)

        return time[0].date
    }

    //
    //
    // checkTimeService = async (startTime) => {
    //
    //     let sql = `select DATEDIFF( '${startTime}',now() ) as date`
    //     let time =  await this.orderRepository.query(sql)
    //     return time[0].date
    // }










}
export default new OrderService()