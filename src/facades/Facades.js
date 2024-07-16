export default class Facades{
    #_rombel;
    #_jenjang
    constructor(service, Auth,domain){
        this.service = service;
        this.user = Auth;
        this.domain = domain; ///class
    }
    
}