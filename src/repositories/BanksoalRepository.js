import { CallHttp } from "./CallHttp";

export default class BanksoalRepository extends CallHttp{
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
    get ss_kurikulum(){
        return this.appscript['ss_materi'];
    }
    get ss_kurikulum_must_call(){
        return this.trial?this.ssTrial:this.ss_kurikulum;
    }
    async callPropertiMultiple(ars){
        let e_param = {
            'action':'readMultipleTab',
            'source':JSON.stringify(ars),
            
        };
        return await this.post(this.crud,e_param)
    }
    async simpanItemSoal(arg,mode='create'){
        let idss='';
        let tab='';
        if(this.#istrial){
            idss=this.ssTrial;
            tab="banksoaltest_";
        }else{
            idss=this.appscript['ss_kalender'];
            tab="banksoal";

        }

        let para={
            'action':mode,
            'tab':tab,
            'idss':idss,
            'formData':JSON.stringify(arg),
            'createTabEmpty':1,
            'autoId':'idbaris',
        }
        return await this.post(this.crud,para)
    }
}