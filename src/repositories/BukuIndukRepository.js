import { MakroInduk } from "../riwayat_raport/MakroInduk";
import { CallHttp } from "./CallHttp";

export default class BukuIndukRepository  extends CallHttp{
    constructor(){
        super();
        this.initialAppKey(this.currentAppKey);
        this.makroRiwayat = MakroInduk;
    }
    get idssUser(){
        return this.appscript.ss_user;
    }
    async allSiswa(){
        const param = {
            idss : this.idssUser,
            tab : 'datasiswa',
            action: 'read'
        }
        this.callWithProses();
        const data = await this.post(this.crud,param);
        this.stopProgressBar();
        return data;
    }
    async callDbInduk(ar){
        let arCreate = [];
        ar.forEach(item=>{
            let findMakro = this.makroRiwayat.find(s=>s.tapel === item);
            if(findMakro){
                let ob = {
                    idss:findMakro.idss,
                    tab:'main'
                }
                arCreate.push(ob);

            }
        })
        this.callWithProses();
        const result =  await this.readMultipleTab(arCreate);
        this.stopProgressBar();
        return result;
    }
    async readMultipleTab(ars){
        let e_param = {
            'action':'readMultipleTab',
            'source':JSON.stringify(ars),
            
        };
        return await this.post(this.crud,e_param)
    }


}