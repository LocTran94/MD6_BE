declare class UserServices {
    private userRepository;
    constructor();
    getAllUserService: () => Promise<any>;
    getUserRequest: () => Promise<any>;
    getWaitUser: () => Promise<any>;
    getMyProfile: (idUser: any) => Promise<any>;
    checkOldPassword: (idUser: any, password: any) => Promise<boolean | "User not found">;
    changePasswordService: (idUser: any, password: any) => Promise<any>;
    registerService: (user: any) => Promise<any>;
    checkUserService: (user: any) => Promise<"User not found" | "your account has been locked" | "Wrong password" | {
        idUser: any;
        username: any;
        role: any;
        avatar: any;
        token: string;
        gmail: any;
        birthday: any;
        gender: any;
        ask: any;
        category: any;
        status: any;
    }>;
    offlineService: (id: any) => Promise<any>;
    changeStatus: (id: any) => Promise<string>;
    changeCategory: (id: any) => Promise<any>;
    removeUserService: (id: any) => Promise<any>;
    userRequest: (id: any) => Promise<string>;
    changeRole: (id: any) => Promise<"Bạn chưa đủ tuổi" | " Bạn đã đăng ký thành công">;
    findByNameService: (name: any) => Promise<any>;
    findByGenderService: (gender: any) => Promise<any>;
    findByBirthdayService: (yearOne: any, yearSecond: any) => Promise<any>;
    findByGmailService: (idUser: any) => Promise<any>;
}
declare const _default: UserServices;
export default _default;
