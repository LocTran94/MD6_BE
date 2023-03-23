declare class PostService {
    private provisionRepository;
    constructor();
    getPrice: (id: any) => Promise<any>;
    getAllProvisionService: () => Promise<any>;
}
declare const _default: PostService;
export default _default;
