declare class PersonalService {
    private personalRepository;
    private userRepository;
    constructor();
    SavePersonalService: (personalService: any, idUser: any) => Promise<boolean>;
    FindNameProvision: (id: any) => Promise<any>;
}
declare const _default: PersonalService;
export default _default;
