import { CallHttp } from "./CallHttp";

export default class KalenderRepository extends CallHttp{
    #tabkaldik;
    constructor(){
        super();
        this.initialAppKey(this.currentAppKey);
        this.#tabkaldik = this.appscript['ss_kalender'];
    }
    
    
    async callDb(){
        let param ={
            idss:this.#tabkaldik,
            tab:'kalender',
            action:'read',
            filter:JSON.stringify({'hapus':''})
        }
        return await this.post(this.crud, param);
    }
}