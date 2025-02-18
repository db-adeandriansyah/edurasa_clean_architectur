import IndukController from "./IndukController";

export default class DokumenIndukController extends IndukController{
    constructor(service){
        super(service);
    }
    get orm(){
        return this.service.ormInduk;
    }

};