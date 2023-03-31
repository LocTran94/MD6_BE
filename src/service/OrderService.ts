import { AppDataSource } from "../data-source";
import { Orders } from "../model/order";
import * as nodemailer from "nodemailer";
import { User } from "../model/user";
import {Post } from "../model/post";

class OrderService {
  private orderRepository;
  private userRepository;
  private postRepository;

  constructor() {
    this.orderRepository = AppDataSource.getRepository(Orders);
    this.userRepository = AppDataSource.getRepository(User);
    this.postRepository = AppDataSource.getRepository(Post);
  }

  getAllOrders = async () => {
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

  getAllOrdersInSellerService = async (id) => {
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

  getAllOrdersInUserService = async (id) => {
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

  saveOrder = async (order) => {
    return await this.orderRepository.save(order);
  };

  changeStatusOrderService = async (id) => {
    let checkOrder = await this.orderRepository.findOneBy({ idOrder: id });
    let idUser = checkOrder.idUser;
    let user = await this.userRepository.findOneBy({ idUser: idUser });
    let post = await this.postRepository.findOneBy({ idUser: idUser})
    let email = user.gmail;

    if (!checkOrder) {
      return null;
    } else {
      if (checkOrder.statusOrder === "Wait") {
        checkOrder.statusOrder = "Approved";

        post.view += 1;
        await this.postRepository.save(post);
        console.log(22222222222222,post.view);

        await this.orderRepository.save(checkOrder);

        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "tranhoangloc502@gmail.com", // Địa chỉ email của bạn
            pass: "enlixpabkfmylwhr", // Mật khẩu của bạn
          },
        });

        await transporter.sendMail(
          {
            from: "tranhoangloc502@gmail.com", // Địa chỉ email của bạn
            to: `${email}`, // Địa chỉ email của người nhận
            subject: "Mua thành công",
            text: "Đơn hàng của bạn đã được nhận",
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

  changeStatusOrderInUser = async (id, idUser) => {
    let checkOrder = await this.orderRepository.findOneBy({ idOrder: id });
    let idUserInOrder = checkOrder.idUser;

    if (!checkOrder) {
      return null;
    } else {
      if (idUserInOrder != idUser) {
        return false;
      } else {
        if (checkOrder.statusOrder === "Approved") {
          checkOrder.statusOrder = "Done";
          await this.orderRepository.save(checkOrder);
        } else {
          return false;
        }
      }
    }
  };

  getOrderInDay = async (id, startTime, endTime) => {
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
    } else {
      return false;
    }
  };

  subtractionDate = async (startTime, endTime) => {
    let sql = `select DATEDIFF( '${endTime}','${startTime}' ) as date`;
    let time = await this.orderRepository.query(sql);
    return time[0].date;
  };
}

export default new OrderService();
