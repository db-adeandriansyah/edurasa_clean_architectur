// import ImageResizer from "../utilities/ImageResizer";

export default class SoalService{
    #db;
    #paramBankSoal;
    #paramUploadFileGambar;
    #api_desainsimpansoal;
    #api_datamateri;
    constructor(repo){
        this.repo = repo;
        this.#db = {};
        this.#paramBankSoal ={idss:'',tab:''};
        this.#api_datamateri ={idss:'',tab:''};
        this.#paramUploadFileGambar ={'folder':'FOLDER'};
    }
    
    get data(){
        return this.#db;
    };
    set api_uloadgambar(x){
        this.#paramUploadFileGambar = x;
    }
    get api_uloadgambar(){
        return this.#paramUploadFileGambar;
    }
    set api_banksoal(x){
        this.#paramBankSoal = x;
    }
    get api_banksoal(){
        return this.#paramBankSoal;
    }
    get api_desainsimpansoal(){
        return this.#api_desainsimpansoal;
    }
    set api_desainsimpansoal(x){
        this.#api_desainsimpansoal = x;
    }
    set api_materi(x){
        this.#api_datamateri = x;
    }
    get api_materi (){
        return this.#api_datamateri;
    }
    /**
     * 
     * @param {*} arrayTab : <array object>
     * arrayTab dibuat oleh Observer;
     * result: data beberapa tab SpredSheet;
     * format arrayTab:
     * [
     *      {
     *          idss    : <string>,
     *          tab     : <string>,
     *          tabdb   : <string>
     *      },
     *      {
     *          idss    : <string>,
     *          tab     : <string>,
     *          tabdb   : <string>
     *      },
     *      ...
     * ]
     */
    async readMultipleTab(arrayTab){
        this.repo.callWithProses();

        const respon = await this.repo.readMultipleTab(arrayTab);
        respon.forEach(n=>{
            let tabrespon = n.info.namaTab;
            let cek = arrayTab.filter(s=> s.tab == tabrespon)[0];
            
            if(cek.tab == tabrespon && cek.tabdb == tabrespon){
                this.#db = Object.assign(this.#db, {[tabrespon]:n.data,['blangko_'+tabrespon]:n.info.objKosong});
            }else{
                this.#db = Object.assign(this.#db, {[cek.tabdb]:n.data,['blangko_'+cek.tabdb]:n.info.objKosong});
            }
        });
        
        this.repo.stopProgressBar();
    }

    async uploadGambarFromBase64(src,paramAwal){
        
        let base64 = src.replace(/^.*,/, '');
        let tipe = src.match(/^.*(?=;)/)[0];
        this.repo.callWithProses();
        let paramGambar = {
            base64:base64,
            mimeType:tipe,
            namafile:'upload_gambar_'+new Date().getTime()+'_.png'
        }
        let param = Object.assign({},paramAwal,paramGambar);
        let result = await this.repo.uploadFile(param);
        this.repo.stopProgressBar();
        return result;
    }
    async uploadGambarInputFileTextEditor(file,paramAwal){
        return new Promise((resolve,reject)=>{
            const reader = new FileReader();
            reader.onload = async(event) => {
                let result = await this.uploadGambarFromBase64(event.target.result,paramAwal);
                resolve(result);
                this.repo.stopProgressBar();
                
    
            };
            reader.onerror = er=>reject(er);
            reader.readAsDataURL(file);
            
        })
    }
    async simpanItemSoal(dataBody){
        let param=this.#paramBankSoal;
        param.formData = JSON.stringify(dataBody);
        this.repo.callWithProses();
        let n = await this.repo.simpanItemSoal(param)
        
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }

    async simpanItemSoalEdit(body){
        let param=this.#paramBankSoal;
        param.byRow = parseInt(body.idbaris);
        param.formData = JSON.stringify(body);
        this.repo.callWithProses();
        let n = await this.repo.simpanItemSoalEdit(param);
        
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    async EditDesainNaskah(body){
        let param=this.#api_desainsimpansoal;;
        param.byRow = parseInt(body.idbaris);
        param.formData = JSON.stringify(body);
        this.repo.callWithProses();
        let n = await this.repo.edit(param);
        
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    async EditKbm(body){
        let param=this.#api_datamateri;;
        param.byRow = parseInt(body.idbaris);
        param.formData = JSON.stringify(body);
        this.repo.callWithProses();
        let n = await this.repo.edit(param);
        
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    async simpanDesainNaskah(dataspreadsheet,media){
        let paramdefault = this.#api_desainsimpansoal;
        let obchange ={'html_identitas':'fileUrl', 'html_soal':'idfile'}

        this.repo.callWithProses();
        let n = await this.repo.createIncludeMedia(paramdefault,obchange,dataspreadsheet,media)
        
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    async editDesainNaskahMedia(dataspreadsheet,media){
        let paramdefault = this.#api_desainsimpansoal;
        let obchange ={'html_identitas':'fileUrl', 'html_soal':'idfile'}
        
        this.repo.callWithProses();
        let n = await this.repo.updateIncludeMedia(paramdefault,obchange,dataspreadsheet,media)
        
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    async simpanDataMateriKbm(dataspreadsheet,media){
        let paramdefault = this.#api_datamateri;
        let obchange = {'basetxt':'fileUrl', 'idmateri':'idfile'}

        this.repo.callWithProses();
        let n = await this.repo.createIncludeMediaKBM(paramdefault,obchange,dataspreadsheet,media)
        
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    async simpanImage(par){
        this.repo.callWithProses();
        const res = await this.repo.saveImage(par);
        this.repo.stopProgressBar();
        return res;
    }
    async showTextHTML(idmateri){
        this.repo.callWithProses();
        let paramUI = '?action=readTxt&idmateri='+idmateri;
        let n = await this.repo.showTextHTML(paramUI);
        this.repo.stopProgressBar();
        return n
    }
}