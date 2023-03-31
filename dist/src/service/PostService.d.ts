declare class PostService {
    private postRepository;
    private userRepository;
    constructor();
    count: () => Promise<any>;
    getAll: (limit: any, offset: any) => Promise<any>;
    findById: (id: any) => Promise<any>;
    findPostByIdUser: (id: any) => Promise<any>;
    saveService: (post: any, id: any) => Promise<any>;
    get12Post: () => Promise<any>;
    updatePost: (idPost: any, newPost: any) => Promise<any>;
    checkUserPostService: (idUser: any) => Promise<any>;
    checkSeller: (idPost: any) => Promise<any>;
    findPrice: (idPost: any) => Promise<any>;
    findByTopSixSellerService: () => Promise<any>;
    findByTopSixVipService: () => Promise<any>;
    findByTopTwelfthSellerService: (gender: any) => Promise<any>;
    findByTopFourMalesEightFemalesService: () => Promise<{
        male: any;
        female: any;
    }>;
    countViewService: (idPost: any) => Promise<void>;
}
declare const _default: PostService;
export default _default;
