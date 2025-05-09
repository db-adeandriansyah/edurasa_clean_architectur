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
        
        let parameter = Object.assign({},param, {action:'update'});
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
    async simpanItemSoalEdit(body){
        let param = {
            'autoId':'idbaris',
            stringFormat:JSON.stringify(["jenjang","kd","opsiA","opsiB","opsiC","opsiD"]),
        };
        let params = Object.assign({},param,body);
        return await this.update(params);
    }
    async edit(body){
        let param = {
            'autoId':'idbaris',
        };
        let params = Object.assign({},param,body);
        return await this.update(params);
    }
    async saveImage(param){
        return this.post(this.crud,param)
    }
    async createIncludeMedia(param,obchange,body,media){
        let para={
            action:'createIncludeMedia',
            spreadsheet:JSON.stringify({
                idss:param.idss,
                tab:param.tab,
                formData:JSON.stringify(body),
                autoId:'idbaris',
                //stringFormat:'["data"]',
                //filter:'{"jenjang":"6"}',
        
                //if create:
                createTabEmpty:1, //1 (true)|| 0 = false,

            }),
            media:JSON.stringify({
                folder      :'HTML Desain Naskah',
                subfolder   :'kelas_'+body.jenjang,
                'namafile'    :'naskah_id_'+new Date().getTime(),
                'base64'      : media,
                'mimeType'    :'text/plain',
            }),
            singleTypeMedia:1, //singleTypeMedia seperti: txt, csv, 
            changeIdFormData:JSON.stringify(obchange)
        }

        // let params = Object.assign({},para,body);
        return await this.post(this.crud,para);
    }
    async updateIncludeMedia(param,obchange,body,media){
        let para={
            action:'updateIncludeMedia',
            spreadsheet:JSON.stringify({
                idss:param.idss,
                tab:param.tab,
                formData:JSON.stringify(body),
                autoId:'idbaris',
                byRow:body.idbaris,
                //stringFormat:'["data"]',
                //filter:'{"jenjang":"6"}',
        
                //if create:
                createTabEmpty:1, //1 (true)|| 0 = false,

            }),
            byRow:body.idbaris,
            media:JSON.stringify({
                folder      :'HTML Desain Naskah',
                subfolder   :'kelas_'+body.jenjang,
                'namafile'    :'naskah_id_'+new Date().getTime(),
                'base64'      : media,
                'mimeType'    :'text/plain',
            }),
            singleTypeMedia:1, //singleTypeMedia seperti: txt, csv, 
            changeIdFormData:JSON.stringify(obchange)
        }

        // let params = Object.assign({},para,body);
        return await this.post(this.crud,para);
    }
    async createIncludeMediaKBM(param,obchange,body,media){
        let para={
            action:'createIncludeMedia',
            spreadsheet:JSON.stringify({
                idss:param.idss,
                tab:param.tab,
                formData:JSON.stringify(body),
                autoId:'idbaris',
                stringFormat:JSON.stringify(["crtToken"]),
                //filter:'{"jenjang":"6"}',
        
                //if create:
                createTabEmpty:1, //1 (true)|| 0 = false,

            }),
            media:JSON.stringify({
                // folder      :'HTML Desain Naskah',
                // subfolder   :'kelas_'+body.jenjang,
                // 'namafile'    :'naskah_id_'+new Date().getTime(),
                folder      :'Konten Materi',
                subfolder   :'Kelas '+body.idtoken,
                'namafile'    :'naskahkbm_id_'+body.idbaris+'_'+new Date().getTime(),
                'base64'      : media,
                'mimeType'    :'text/plain',
            }),
            singleTypeMedia:1, //singleTypeMedia seperti: txt, csv, 
            changeIdFormData:JSON.stringify(obchange)
        }

        // let params = Object.assign({},para,body);
        return await this.post(this.crud,para);
    }
    async showTextHTML(paramUI){
        return await this.get(this.crud+paramUI);
    }
}