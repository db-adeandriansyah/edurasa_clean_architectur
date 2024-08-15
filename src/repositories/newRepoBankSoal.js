import { CallHttp } from "./CallHttp";

export default class RepoBankSoal extends CallHttp{
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
    async readMultipleTab(ars,crud=this.crud){
        let e_param = {
            'action':'readMultipleTab',
            'source':JSON.stringify(ars),
        };
        
        return await this.post(crud,e_param)
    }
}