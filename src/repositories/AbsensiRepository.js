import { CallHttp } from "./CallHttp";

export default class AbsensiRepository extends CallHttp{
    #istrial;
    constructor(){
        super();
        this.initialAppKey(this.currentAppKey);
        this.#istrial = false;
    }
    
    set trial(x){
        this.#istrial = x;
    }
    
    get trial(){
        return this.#istrial;
    }
    async callSiswa(){
        let p = {
            'idss':this.appscript['ss_user'],
            'tab':'datasiswa',
            'action':'read'
        }
        return await this.post(this.crud,p);
    }
    ssKelas(jenjang){
        return this.appscript['ss_absen_'+jenjang];
    }
    async callTabAbsen(jenjang){
        let param = {
            idss:this.ssKelas(jenjang),
            tab:'responses',
            action:'read'
        }
        return await this.post(this.crud, param)
    }
    async callSingleDbKalender(){
        let param={
            idss:this.appscript['ss_kalender'],
            tab:'kalender',
            action:'read',
            filter:JSON.stringify({'hapus':''})
        }
        return await this.post(this.crud,param);
    }



}