declare class OrderService {
    private orderRepository;
    constructor();
    getAllOrdersInSellerService: (id: any) => Promise<any>;
    getAllOrdersInUserService: (id: any) => Promise<any>;
    saveOrder: (order: any) => Promise<any>;
    changeStatusOrder: (id: any) => Promise<any>;
    getOrderInDay: (id: any, startTime: any, endTime: any) => Promise<boolean>;
    subtractionDate: (startTime: any, endTime: any) => Promise<any>;
}
declare const _default: OrderService;
export default _default;