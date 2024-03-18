import ImageResizer from "../utilities/ImageResizer";
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
        let idss='';
        let tab='';
        if(this.#istrial){
            idss=this.ssTrial;
            tab="responses_"+jenjang;
        }else{
            idss=this.ssKelas(jenjang);
            tab='responses';
        }

        let param = {
            // idss:this.ssKelas(jenjang),
            // tab:'responses',
            idss:idss,
            tab:tab,
            action:'read'
        }
        return await this.post(this.crud, param)
    }
    async SimpanAbsen(jenjang,param,mode='create'){
        let idss='';
        let tab='';
        if(this.#istrial){
            idss=this.ssTrial;
            tab="responses_"+jenjang;
        }else{
            idss=this.ssKelas(jenjang);
            tab='responses';
        }

        let paramDefault = {
            // idss:this.ssKelas(jenjang),
            // tab:'responses',
            idss:idss,
            tab:tab,
            action:mode,
            'byRow':parseInt(param.idbaris),
            'formData':JSON.stringify(param),
            'autoId':'idbaris',
            
        }
        // let paramMerge = Object.assign({},paramDefault,param);
        return await this.post(this.crud, paramDefault);
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

    uploadGambarAbsen(files,propertiImage,callback,options={}){
        let defaultPropertiImage={
            folder:'Files Absensi Siswa',
            // subFolder:'',
            // subFolder:'',
        }
        let defaultSetting = {
            width:300,
            length:Infinity,
            keepSize:false,
        }
        let setting = Object.assign({},defaultSetting,options);
        let properti = Object.assign({},defaultPropertiImage,propertiImage);
        
        let imgReduce = new ImageResizer (
                setting.width,
                setting.length,
                setting.keepSize
            );
        imgReduce.resizeImageToDataURL(files, async (mimeType, dataURL) => {
            let params = Object.assign({
                    action:'uploadFile',
                    "base64":dataURL.replace(/^.*,/, ''),//.replace(/^.*,/, '');
                    "mimeType":mimeType,//dataURL.match(/^.*(?=;)/)[0],//
            },properti);
        
                this.callWithProses();
                let calldb = await this.saveImage(params);
                
                this.stopProgressBar();
                callback(calldb.idfile);
            });
    }


}