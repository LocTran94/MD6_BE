import { Request, Response } from "express";
import OrderService from "../service/OrderService";
import PostService from "../service/PostService";

class OrderController {
  private oderService;
  private postService;

  constructor() {
    this.oderService = OrderService;
    this.postService = PostService;
  }

  getAllOrdersInSeller = async (request: Request, response: Response) => {
    try {
      let idUser = request.params.id;

      let orders = await this.oderService.getAllOrdersInSellerService(idUser);

      response.status(200).json(orders);
    } catch (error) {
      response.status(500).json(error.message);
    }
  };

  getAllOrdersInAdmin = async (request: Request, response: Response) => {
    try {
      let orders = await this.oderService.getAllOrders();
      response.status(200).json(orders);
    } catch (error) {
      response.status(500).json(error.message);
    }
  };

  getAllOrdersInUser = async (request: Request, response: Response) => {
    try {
      let idPost = request.params.id;
      let orders = await this.oderService.getAllOrdersInUserService(idPost);
      response.status(200).json(orders);
    } catch (error) {
      response.status(500).json(error.message);
    }
  };

  addOrder = async (request: Request, response: Response) => {
    try {
      let order = request.body;

      let x = new Date(order.endTime);
      let y = new Date(order.startTime);
      order.dateOfOrder = new Date();

      let time = await this.oderService.subtractionDate(
        order.startTime,
        order.endTime
      ); // tính ngày chênh lệnh

      let checkOrder = await this.oderService.getOrderInDay(
        order.idPost,
        order.startTime,
        order.endTime
      );

      let price = await this.postService.findPrice(order.idPost);

      if (time >= 0) {
        if (checkOrder == false) {
          response.status(200).json("Bạn chưa thể thuê dịch vụ");
        } else {
          if (y > order.dateOfOrder) {

            order.total = (time * 24 + (x.getHours() - y.getHours())) * price;
            order = await this.oderService.saveOrder(order);
            response.status(200).json(order);
          } else if (y == order.dateOfOrder) {
            if (y.getHours() >= order.dateOfOrder.getHours()) {
              order.total =
                (time * 24 * price + x.getHours() - y.getHours()) * price;
              order = await this.oderService.saveOrder(order);
              response.status(200).json(order);
            } else {
              response.status(200).json("hãy chọn lại thời gian bắt đầu thuê");
            }
          } else {
            response.status(200).json("hãy chọn lại thời gian bắt đầu thuê");
          }
        }
      } else {
        response.status(200).json("hãy chọn lại thời gian bắt đầu thuê");
      }
    } catch (error) {
      response.status(500).json(error.message);
    }
  };

  changeStatusOrder = async (req, res) => {
    try {
      let id = req.params.id;
      let response = await this.oderService.changeStatusOrderService(id);
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  changeStatusOrderInUserController = async (req, res) => {
    try {
      let idUser = req["decoded"].idUser;
      let id = req.params.id;
      let response = await this.oderService.changeStatusOrderInUser(id, idUser);
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
}

export default new OrderController();
