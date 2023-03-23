declare class PostService {
    private personalServiceRepository;
    private userRepository;
    constructor();
    SavePersonalService: (personalService: any, idPost: any) => Promise<any>;
}
declare const _default: PostService;
export default _default;
