import { CallHttp } from "./CallHttp";

export default class SoalRepository extends CallHttp{
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

    /**
     * 
     * @param {*} param <object>
     * format:
     *  {
     *      action      : 'uploadFile',
     *      folder      : <string | mandatory>,
     *      subfolder   : <string | opsional>,
     *      namaFile    : <string>,
     *      base64      : <string base64>,
     *      mimeType    : <string>
     *  }
     *  
     * 
     * @param {*} crud <optional>, default: this.crud;
     */
    async uploadFile(param, crud=this.crud){
        let parameter = Object.assign({},param, {action:'uploadFile'});
        return await this.post(crud,parameter);
    }

    /**
     * 
     * @param {*} param 
     * param berformat{
            'tab':tab,
            'idss':idss,
            'formData':JSON.stringify(data),
            'createTabEmpty':1,
            'autoId':'idbaris',
            stringFormat:JSON.stringify(["jenjang","kd","opsiA","opsiB","opsiC","opsiD"]),
        }
     * @param {*} crud 
     * @returns 
     */
    async create(param,crud=this.crud){

        let parameter = Object.assign({},param, {action:'create'});
        return await this.post(crud,parameter);
    }

    /**
     * 
     * @param {*} param 
     * @param {*} crud 
     * @returns 
     */
    async update(param,crud=this.crud){
        
        let parameter = Object.assign({},param, {action:'uploadFile'});
        return await this.post(crud,parameter);
    }
    async simpanItemSoal(body){
        let param = {
            'createTabEmpty':1,
            'autoId':'idbaris',
            stringFormat:JSON.stringify(["jenjang","kd","opsiA","opsiB","opsiC","opsiD"]),
        };
        let params = Object.assign({},param,body);
        return await this.create(params);
    }
}