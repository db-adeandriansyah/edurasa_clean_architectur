import ImageResizer from "../utilities/ImageResizer";
import { CallHttp } from "./CallHttp";

export class RepositorySurat extends CallHttp{
    #istrial;
    constructor(){
        super();
        this.initialAppKey(this.currentAppKey);
        this.#istrial = false
        
    }
    set trial(x){
        this.#istrial = x;
    }
    get trial(){
        return this.#istrial;
    }
    async riwayatPtk(){
        let p = {
            'idss':this.appscript['ss_user'],
            'tab':'ptk_alltime',
            'action':'read',
        }
        
        return await this.post(this.crud,p);
    }

    async callSiswa(){
        let p = {
            'idss':this.appscript['ss_user'],
            'tab':'datasiswa',
            'action':'read'
        }
        return await this.post(this.crud,p);
    }
    async readSuratMasuk(){
        let idss = this.trial?this.ssTrial: this.appscript['ss_kepsek'];

        let param ={
            // 'idss':this.appscript['ss_kepsek'],
            // 'idss':this.ssTrial,
            'idss':idss,
            'action':'read',
            'tab':'suratmasuk',
            'filter':JSON.stringify({'status':'diarsipkan'})
        }
        return await this.post(this.crud,param);
    }

    async readSuratKeluar(){
        let idss = this.trial?this.ssTrial: this.appscript['ss_kepsek']
        let param ={
            // 'idss':this.appscript['ss_kepsek'],
            // 'idss':this.ssTrial,
            'idss':idss,
            'tab':'suratkeluar',
            'action':'read'
        }
        return await this.post(this.crud,param);
    }
    
    async readDbAll(){
        let idss = this.trial?this.ssTrial:this.appscript['ss_kepsek'];
        let source =[
            {
                // 'idss':this.appscript['ss_kepsek'],
                // 'idss':this.ssTrial,
                'idss':idss,
                'tab':'suratkeluar',
                'filter':JSON.stringify({'status':''})
            },
            {
                // 'idss':this.appscript['ss_kepsek'],
                // 'idss':this.ssTrial,
                'idss':idss,
                'tab':'suratmasuk',
                'filter':JSON.stringify({'status':'diarsipkan'})
            },
            {
                // 'idss':this.appscript['ss_kepsek'],
                // 'idss':this.ssTrial,
                'idss':idss,
                'tab':'sppd',
                'filter':JSON.stringify({'hapus':''})
            },
            {
                'idss':this.appscript['ss_kepsek'],
                // 'idss':this.ssTrial,
                'tab':'tendik',
            },
            {
                'idss':this.appscript['ss_user'],
                'tab':'user',
            }
        ];
        
        let param={
            source:JSON.stringify(source),
            action:'readMultipleTab'
        }
        return await this.post(this.crud,param);
    }
    
    async saveSuratKeluar(bodyParam){
        let idss = this.trial?this.ssTrial:this.appscript['ss_kepsek'];
        let param = {
            // 'idss':this.appscript['ss_kepsek'],
            // 'idss':this.ssTrial,
            'idss':idss,
            'tab':'suratkeluar',
            'action':'create',
            'formData':JSON.stringify(bodyParam),
            'autoId':'idbaris',
            'stringFormat':JSON.stringify(['id_nosurat','target_ptk', 'target_siswa']),
            'filter':JSON.stringify({'status':''})
        }
        return await this.post(this.crud, param);
    }
    async saveSuratMasuk(bodyParam){
        let idss = this.trial?this.ssTrial:this.appscript['ss_kepsek'];
        let param = {
            'idss':idss,
            // 'idss':this.ssTrial,
            // 'idss':this.appscript['ss_kepsek'],
            'tab':'suratmasuk',
            'action':'create',
            'formData':JSON.stringify(bodyParam),
            'autoId':'idbaris',
            // 'stringFormat':JSON.stringify(['id_nosurat','target_ptk', 'target_siswa']),
            'filter':JSON.stringify({'status':'diarsipkan'})
        }
        return await this.post(this.crud, param);
    }
    async updateSuratKeluar(row,bodyParam){
        let idss = this.trial?this.ssTrial:this.appscript['ss_kepsek'];
        let param = {
            // 'idss':this.ssTrial,
            'idss':idss,
            // 'idss':this.appscript['ss_kepsek'],
            'tab':'suratkeluar',
            'action':'update',
            'byRow':parseInt(row),
            'formData':JSON.stringify(bodyParam),
            'autoId':'idbaris',
            'stringFormat':JSON.stringify(['id_nosurat','target_ptk', 'target_siswa']),
            'filter':JSON.stringify({'status':''})
        }
        return await this.post(this.crud, param);
    }
    async updateSuratMasuk(row,bodyParam){
        let idss = this.trial?this.ssTrial:this.appscript['ss_kepsek'];
        let param = {
            // 'idss':this.ssTrial,
            'idss':idss,
            // 'idss':this.appscript['ss_kepsek'],
            'tab':'suratmasuk',
            'action':'update',
            'byRow':parseInt(row),
            'formData':JSON.stringify(bodyParam),
            'autoId':'idbaris',
            // 'stringFormat':JSON.stringify(['id_nosurat','target_ptk', 'target_siswa']),
            'filter':JSON.stringify({'status':'diarsipkan'})
        }
        return await this.post(this.crud, param);
    }
    async updateSppd(row,bodyParam){
        let idss = this.trial?this.ssTrial:this.appscript['ss_kepsek'];
        let param = {
            'idss':idss,
            // 'idss':this.ssTrial,
            // 'idss':this.appscript['ss_kepsek'],
            'tab':'sppd',
            'action':'update',
            'byRow':parseInt(row),
            'formData':JSON.stringify(bodyParam),
            'autoId':'idbaris',
            'stringFormat':JSON.stringify(['id_nosurat','target_ptk', 'target_siswa']),
            'filter':JSON.stringify({'hapus':''})
        }
        return await this.post(this.crud, param);
    }
    async createOrUpdateMultipleSppd(param){
        let idss = this.trial?this.ssTrial:this.appscript['ss_kepsek'];
        let paramDefault = {
            'action':'postAutomatically',
            'idss':idss,
            // 'idss':this.ssTrial,
            // 'idss':this.appscript['ss_kepsek'],
            'tab':'sppd',
            'data_resource':JSON.stringify(param),
            'key':'idbaris',
            'filter':JSON.stringify({'hapus':''})
         

        }
        
        let testResult = await this.postAuto(paramDefault)
        return testResult ;
    }
    uploadGambar(files,propertiImage,callback,options={}){
        let defaultPropertiImage={
            folder:'UPLOAD GAMBAR',
            // subFolder:'',
            // subFolder:'',
        }
        let defaultSetting = {
            width:Infinity,
            length:Infinity,
            keepSize:true,
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