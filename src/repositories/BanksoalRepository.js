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
    get ss_banksoal_must_call(){
        return this.trial?this.ssTrial:this.appscript['ss_kalender'];
    }
    get ss_materi(){
        return this.trial?this.ssTrial:this.appscript['ss_materi'];
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
            tab="banksoal";
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
            stringFormat:JSON.stringify(["jenjang","kd","opsiA","opsiB","opsiC","opsiD"]),
        }

        if(mode == 'update'){
            para['byRow']=parseInt(arg.idbaris);
        }
        
        return await this.post(this.crud,para)
    }
    async saveImage(param){
        return this.post(this.crud,param)
    }
    async simpanDesanNaskah(par,media){
        let idss='';
        let obchange ={'html_identitas':'fileUrl', 'html_soal':'idfile'}
        if(this.#istrial){
            idss=this.ssTrial;
        }else{
            idss=this.appscript['ss_kalender'];
        }

        let para={
            action:'createIncludeMedia',
            spreadsheet:JSON.stringify({
                idss:idss,
                tab:'simpandesainsoal',
                formData:JSON.stringify(par),
                autoId:'idbaris',
                //stringFormat:'["data"]',
                //filter:'{"jenjang":"6"}',
        
                //if create:
                createTabEmpty:1, //1 (true)|| 0 = false,

            }),
            media:JSON.stringify({
                folder      :'HTML Desain Naskah',
                subfolder   :'kelas_'+media.jenjang,
                'namafile'    :'naskah_'+new Date().getTime(),
                'base64'      : media.html,
                'mimeType'    :'text/plain',
            }),
            singleTypeMedia:1, //singleTypeMedia seperti: txt, csv, 
            changeIdFormData:JSON.stringify(obchange)
        }

        
        return await this.post(this.crud,para)
    }
    async hapusSimpananDesainNaskah(arg){
        let idss='';
        let tab="simpandesainsoal";
        if(this.#istrial){
            idss=this.ssTrial;
        }else{
            idss=this.appscript['ss_kalender'];
        }

        let para={
            'action':'update',
            'tab':tab,
            'idss':idss,
            'formData':JSON.stringify(arg),
            // 'createTabEmpty':1,
            'autoId':'idbaris',
            'byRow':parseInt(arg.idbaris)
            // stringFormat:JSON.stringify(["jenjang","kd","opsiA","opsiB","opsiC","opsiD"]),
        }

        return await this.post(this.crud,para);
    }

    async simpanDataMateriKbm(par,media){
        let idss='';
        let obchange = {'basetxt':'fileUrl', 'idmateri':'idfile'}
        // if(this.#istrial){
        //     idss=this.ssTrial;
        // }else{
        //     idss=this.appscript['ss_datamateri'];
        // }
        let param = {
            action:'createIncludeMedia',
            spreadsheet:JSON.stringify({
                idss:this.ss_materi,
                tab:'datamateri',
                formData:JSON.stringify(par),
                autoId:'idbaris',
                stringFormat:'["crtToken"]',
                
                // filter:JSON.stringify({'hapus':''}),
        
                //if create:
                createTabEmpty:1, //1 (true)|| 0 = false,

            }),
            media:JSON.stringify({
                folder      :'Konten Materi',
                subfolder   :'Kelas '+par.idtoken,
                'namafile'    :'naskahsoal_'+new Date().getTime(),
                'base64'      : media,
                'mimeType'    :'text/plain',
            }),
            singleTypeMedia:1, //singleTypeMedia seperti: txt, csv, 
            changeIdFormData:JSON.stringify(obchange)
        } 
        return await this.post(this.crud,param)
    }

    async simpanEditMateriKbm(arg){
        
        let idss='';
        let tab="datamateri";
        if(this.#istrial){
            idss=this.ssTrial;
        }else{
            idss=this.appscript['ss_kalender'];
        }

        let para={
            'action':'update',
            'tab':tab,
            'idss':idss,
            'formData':JSON.stringify(arg),
            // 'createTabEmpty':1,
            'autoId':'idbaris',
            'byRow':parseInt(arg.idbaris),
            stringFormat:JSON.stringify(["crtToken"]),
        }

        return await this.post(this.crud,para);
    }
    async showTextHTML(paramUI){
        return await this.get(this.crud+paramUI);
    }
}