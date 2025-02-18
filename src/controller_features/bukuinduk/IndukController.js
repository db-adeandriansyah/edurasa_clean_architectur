export default class IndukController{
    constructor(service){
        this.service = service;
        this.service.createKlapper();
    }
    async withRaport(Tapel){
        const arrayTapel = this.service.ormInduk.find(s=>s.awalanInduk===Tapel)?.tapelInduk||[];
        
        await this.service.raportInduk(arrayTapel);
        return this;

    }
    async updateProfilSiswa(ob){
        await this.service.updateProfilSiswa(ob);
        return this;
    }

}