import IndukController from "./IndukController";

export default class TapelIndukController extends IndukController{
    constructor(service){
        super(service);
    }
    get orm(){
        
        return this.service.ormInduk;
    }
    dataByTapel(tapel){
        // return this.service.ormInduk.find(s=>s.awalanInduk===tapel);
        return this.orm.find(s=>s.awalanInduk===tapel);
    }
    async dataWithRaportByTapel(tapel){
        // return this.service.ormInduk.find(s=>s.awalanInduk===tapel);
        await this.withRaport(tapel)
        return this.orm.find(s=>s.awalanInduk===tapel);
    }
    async dataCurrentProfilSiswaByTapel(ob,tapel,id){
        await this.updateProfilSiswa(ob);
        return this.dataByTapel(tapel)?.indukurut.find(s=>s.id ==id);;

    }
    /**
     * 
     * @param {*} file 
     * @param {*} propertifile 
     * @returns data{idfile:<string>}
     */
    async uploadFile(file,propertifile){
        return await this.service.uploadFile(file,propertifile);

    }
    

}; 