import { CallHttp } from "./CallHttp";

export default class KalenderRepository extends CallHttp{
    #tabkaldik;
    #istrial;
    constructor(){
        super();
        this.initialAppKey(this.currentAppKey);
        this.#tabkaldik = this.appscript['ss_kalender'];
        this.#istrial = false;
    }
    
    set trial(x){
        this.#istrial = x;
    }
    
    get trial(){
        return this.#istrial;
    }
    
    async callDb(){
        let idss = this.#tabkaldik;
        if(this.#istrial){
            idss = this.ssTrial;
        }

        let param ={
            // idss:this.#tabkaldik,
            idss:idss,
            tab:'kalender',
            action:'read',
            filter:JSON.stringify({'hapus':''})
        }
        return await this.post(this.crud, param);
    }

    async addKalender(paramReq){
        let idss = this.#tabkaldik;
        if(this.#istrial){
            idss = this.ssTrial;
        }

        let param ={
            // idss:this.#tabkaldik,
            idss:idss,
            tab:'kalender',
            action:'create',
            // 'byRow':parseInt(param.idbaris),
            'formData':JSON.stringify(paramReq),
            'autoId':'idbaris',
            filter:JSON.stringify({'hapus':''})
        }
        return await this.post(this.crud, param);
    }
    
    async editKalender(paramReq){
        let idss = this.#tabkaldik;
        if(this.#istrial){
            idss = this.ssTrial;
        }

        let param ={
            // idss:this.#tabkaldik,
            idss:idss,
            tab:'kalender',
            action:'update',
            'byRow':parseInt(paramReq.idbaris),
            'formData':JSON.stringify(paramReq),
            'autoId':'idbaris',
            filter:JSON.stringify({'hapus':''})
        }
        return await this.post(this.crud, param);
    }
}