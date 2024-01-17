import { macro } from "../models/macro";


export class CallHttp{
    #spreadsheet;
    #tab;
    #findScript;
    #data;
    #apitapel;
    #macro;
    constructor(){
        this.#macro= macro;
        // this.appscript = this.currentAppKey;
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
        const parameter = this.paramFormData(param);
        const f = await fetch(uri,{body:parameter,method:'post'});
        const t = await f.json();
        return t;
    }
    
}