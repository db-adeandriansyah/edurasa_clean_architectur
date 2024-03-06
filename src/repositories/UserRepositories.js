import { CallHttp } from "./CallHttp";
import ImageResizer from "../utilities/ImageResizer";


export default class UserRepositories extends CallHttp{
    #db;
    #paramlogin;
    #datalogin;
    constructor(App=null){
        super();
        this.app = App;
        this.initialAppKey(this.currentAppKey);
        this.#db = {};
        this.#paramlogin={};
        this.#datalogin=null;
        this.responMessage = null;
    }
    get authApi(){
        return this.#datalogin;
    }
    get auth(){
        return this.hasLocal('app');
    }
    get authType(){
        if(this.auth){
            return this.getValInLocal('app','akses');
        }
        return null
        
    }
    /**
     * @returns Boolean
     * @param {*} username 
     * @param {*} password 
     */
    async loginPtk(username,password){
        const param = {
            'idss':this.appscript['ss_user'],
            'action':'login',
            'username':username,
            'password':password
        };
        const parameter = this.urilogin+new URLSearchParams(param).toString();
        
        this.callWithProses()
        const result = await this.get(parameter);
        this.stopProgressBar();
        
        
        if(result.ijinkan == 'ok'){
            this.responMessage = {status:'ok'};
            this.#datalogin = result;
            this.writeLocal('app',JSON.stringify(result));
            return true;
        }else{
            this.responMessage = {status:result.ijinkan};
            return false;
        }
        


    }
    loginSiswaByToken(token){
        const param = {
            'idss':this.appscript['ss_user'],
            'action':'loginsiswa',
            'id':token
        };
        return this.responseLoginSiswa(param);
    }
    
    loginSiswaByNISN(token){
        const param = {
            'idss':this.appscript['ss_user'],
            'action':'signsiswa',
            'id':token
        };
        return this.responseLoginSiswa(param);
    }
    
    async responseLoginSiswa(param){
        
        const parameter = this.urilogin+new URLSearchParams(param).toString();
        return await this.get(parameter);
        
    }
    async callDataCarousel(){
        let p = {
            'idss':this.appscript['ss_user'],
            'action':'dataguruall',
        }
        const parameter = this.urilogin+new URLSearchParams(p).toString();
        return await this.get(parameter);
        // let p = [
        //     {}
        // ]
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
        // let p = {
        //     'idss':this.appscript['ss_user'],
        //     'action':'databaseakun',
        // }
        // const parameter = this.urilogin+new URLSearchParams(p).toString();
        // return await this.get(parameter);
        let p = {
            'idss':this.appscript['ss_user'],
            'tab':'datasiswa',
            'action':'read'
        }
        return await this.post(this.crud,p);
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
    async createOrUpdate(request){
        // let param = {
        //     idss:this.macro['ss_nilai_'+this.fokusJenjang],
        //     tab:kbm.jenistagihan,
        //     key:'tokensiswa',
        //     action:'createOrUpdate',
        //     data:JSON.stringify(data)
        // }
        let data = Object.assign(request,{action:'createOrUpdate'});
        const param = this.paramFormData(data);
        return await this.post(this.crud,param);
    }
    
    validateSiswa (dataawal){
        let objekvalidate = {};
        // let dataawal = this.LocalJson('propertisiswa');
        Object.entries(dataawal).forEach(([k,v])=>{
            if(k!==""){
                objekvalidate[k]=v;
            }else{
                console.log('k =""',k,v)
            }
        });
        return objekvalidate;
    }
    async saveUpdateSiswa(dataRequest){
        /**
         * bodyParam.append('action','edurasaSimpanEditSiswa');
            bodyParam.append('id',id);
            bodyParam.append('data',JSON.stringify(newData.data[0]));
         */
        
        let body = {
            'action':'edurasaSimpanEditSiswa',
            'idss':this.appscript['ss_user'],
            'id':parseInt(dataRequest.id),
            'data':JSON.stringify(this.validateSiswa(dataRequest))
        }
        return await this.post(this.urlUser,body)
    }
    async saveAddSiswa(request){
        
        let param = {
            action:'create',
            idss:this.appscript['ss_user'],
            // idss:this.ssTrial,
            tab:'datasiswa',
            formData:JSON.stringify(this.validateSiswa(request)),
            // createTabEmpty:1, //1 (true)|| 0 = false,
            autoId:'id',
            // stringFormat:'["data"]',
            // filter:'{"jenjang":"6"}'
        }
        return await this.post(this.crud,param);
    }

}
