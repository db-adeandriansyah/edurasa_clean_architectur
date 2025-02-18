import IndukController from "./IndukController";

export default class KlaperController extends IndukController{
    constructor(service){
        super(service);
        
    }
    get orm(){
        return this.service.ormKlapper;
    }
    
    klaperAngkatan(tapel){
        return this.service.ormInduk.find(s=>s.awalanInduk===tapel)?.klaperAngkatan ||[];
    }
};