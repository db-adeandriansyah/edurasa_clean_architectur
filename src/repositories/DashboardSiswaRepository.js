import { CallHttp } from "./CallHttp";
import ImageResizer from "../utilities/ImageResizer";
export default class DashboardSiswaRepository extends CallHttp{
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
    uploadGambarAbsen(files,propertiImage,callback,options={}){
        let defaultPropertiImage={
            folder:'Files Absensi 2425',
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
    
    async callSiswa(){
        let p = {
            'idss':this.appscript['ss_user'],
            'tab':'datasiswa',
            'action':'read'
        }
        return await this.post(this.crud,p);
    }
    async showTextHTML(paramUI){
        return await this.get(this.crud+paramUI);
    }
    ss_nilai_jenjang(idss){
        this.paramidss = idss;
        return this;
        
    }
    async kirimSingleNilaiLJK(tabrespon,tabtagihan,mediaHTML,create=1){
        let idss = this.paramidss;
        let tagihan = tabtagihan.jenistagihan;
        let rombel = tabrespon.idkelas;
        let param = {
            // idss:'1VdqHgZ67-TqOwXe3Am-_rhpCsNG10hpmGS91rHvkN6g',
            idss: idss,
            tab:    tagihan,
            autoId:'idbaris',
            action:'kirimnilai',
            datarespon:JSON.stringify(tabrespon),
            datatabutama:JSON.stringify(tabtagihan),
            creatorupdate_respon:create, //1 = create, 0 = update;
            ideditrespon:'html_jawaban',
            media:JSON.stringify({
                folder      :'Koleksi LJK Siswa 2324',
                subfolder   : rombel,
                namafile    :'id_kbm_'+tabrespon.matericode+'_idsiswa_'+tabrespon.tokensiswa+'_'+new Date().getTime(),
                base64      : mediaHTML,
                mimeType    :'text/plain',
            })
        }
        return await this.post(this.crud,param)
    }

}