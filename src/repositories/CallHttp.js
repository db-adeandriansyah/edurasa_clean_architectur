import { ProsesBar } from "./proses-bar";

let macro= {},keyvalusiswa={};
await import("./../models/macro.json").then(({default:Module})=>{
    macro = Module
});
await import("./../models/formatSiswa.json").then(({default:Module})=>{
    keyvalusiswa = Module
});

export class CallHttp{
    #spreadsheet;
    #tab;
    #findScript;
    #data;
    #keyvaluesiswa;
    #apitapel;
    #macro;
    constructor(){
        this.#macro= macro;
        this.#keyvaluesiswa = keyvalusiswa
        this.animationProgress = null;
        this.ssTrial = '1VdqHgZ67-TqOwXe3Am-_rhpCsNG10hpmGS91rHvkN6g';
        this.domProgres = document.querySelector('.prog-animation');
    }
    get valuKeySiswa(){
        return this.#keyvaluesiswa;
    }
    csrf(){ //boolean
        let access = false;
        if((window.location.hostname ==='localhost' && (window.location.port ==='3055'||window.location.port ==='5500'))|| window.location.hostname==='edurasa.com'|| window.location.hostname==='versibaru.edurasa.com'){
            access = true;
        };
        return access;
    }
    callWithProses(){
        this.animationProgress = new ProsesBar(0);
        
    }
    stopProgressBar(){
        this.animationProgress.stopProses;
        this.animationProgress = null;
    }
    set appscript(x){
        this.#apitapel = this.#macro[x];
    }
    get appscript(){
        return this.#apitapel;
    }
    set ss(x){
        this.#spreadsheet = x;
    }
    get ss(){
        return this.#spreadsheet;
    }
    set tab(x){
        this.#tab = x;
    }
    get tab(){
        return this.#tab;
    }
    get currentAppKey(){
        let sekarang = new Date();
        let bulan = sekarang.getMonth();
        let semester = bulan>5?1:2;
        let thAwal = semester==1?sekarang.getFullYear():sekarang.getFullYear()-1;
        let thAkhir =semester==1?sekarang.getFullYear()+1:sekarang.getFullYear();
        let tahunAwal = thAwal.toString();
        let tahunAkhir = thAkhir.toString();
        return 't_'+tahunAwal.slice(2,4)+tahunAkhir.slice(2,4)+'_s_'+semester;
    }
    get crud (){
        return `https://script.google.com/macros/s/${this.appscript['exec_crud']}/exec`; 
    }
    get urilogin (){
        return `https://script.google.com/macros/s/${this.appscript['exec_user']}/exec?`; 
    }
    get urlUser(){
        return `https://script.google.com/macros/s/${this.appscript['exec_user']}/exec`; 
    }
    initialAppKey(appkey = this.currentAppKey){
        const codeCurrent = appkey
        this.appscript = codeCurrent;
    }
    paramFormData(param){
        let fd = new FormData();
            Object.entries(param).forEach(([k,v])=>{
                fd.append(k,v);
            });
        return fd;
    }
    async post(uri,param){
        // if(!this.csrf()) return;
        const parameter = this.paramFormData(param);
        const f = await fetch(uri,{body:parameter,method:'post'});
        const t = await f.json();
        return t;
    }
    async postAuto(param){
        /**
         * ==========paramter wajib:========
         * idss: (string) (required)
         * tab: (string) (required)
         * data_resource = (array-object)|| object; (required);
         * key = (string)() // (required); // key dengan nilai '' atau null selalu menjadi data record baru; hati-hati!
         * 
         * === parameter opsional ==============
         * ~~stringFormat~~ = (array) /// semua sudah dalam format string, kecual ada yang dalam bentuk tanggal;
         * autoId = (string) //  salah satu item bersumber dari key dta_resource; (nulllable)
         * media = (object) // objek dengan key di bawah parameter (nullable);
         * array_timestamp = (array) // (nullable)
         * 
         * ========== parameter media untuk param/objek tunggal
         * // is_plain_text = 1 //(interger) (boolean),
            // ideditrespon:'keybaru' // (string) digunakan untuk mengganti/replace key record dengan id media
            // media: {
                folder:'folder tes',
                subfolder:'subfolder',
                namafile:'test aja dulu',
                base64:'Hello World',
                mimeType:'text/plain',
                }
            }
        * 
        *        
        */
        
            //let default
        let paramDefault = {
            'action':'postAutomatically',
            'idss':this.ssTrial,
            'tab':'TRIAL',
            'data_resource':JSON.stringify([]),//data_resource = (array-object)|| object; (required);
            'key':'idbaris',
            'autoId':'idbaris'

        }
        let mergeParam = Object.assign({},paramDefault,param);
        return await this.post(this.crud,mergeParam);
    }
    async get(param){
        // if(!this.csrf()) return;
        
        const f = await fetch(param);
        const t = await f.json();
        return t;
    }
    async saveImage(param){
        
        const parameter = this.paramFormData(param);
        const f = await fetch(this.crud,{body:parameter,method:'post'});
        const t = await f.json();
        return t;
    }
    //localStorage
    writeLocal (key,val){
        window.localStorage.setItem(key, window.btoa(val));
    }
    clearLocal(key){
        window.localStorage.removeItem(key);
    } 
    clearLocalAll(){
        window.localStorage.clear();
    }
    //getValueInLocalByName:
    LocalJson(nama){
        return JSON.parse(window.atob(window.localStorage.getItem(nama)));
    } 
    getValInLocal(namelocal,key){
        return this.LocalJson(namelocal)[key];
    
    }
    hasLocal(key){
        return window.localStorage.hasOwnProperty(key);
            
    }
    
}