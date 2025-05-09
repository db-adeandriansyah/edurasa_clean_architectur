import BankSoalFacades from "./BankSoalFacades";

export default class DesainNaskahFacades extends BankSoalFacades{
    constructor(service, Auth,domain,needData,urlImg,modal){
        super(service, Auth,domain);
        this.praDesain = needData;
        this.needData = needData;
        this.UrlImg = urlImg;
        this.Modal = modal
        this.workplace = document.getElementById('printarea');
        this.printarea = document.getElementById('printarea');
        this.textEditor=null;
        this.dataDesain = {};
    }
    init(){
        
    }
    
    writeLocal(data){
        window.localStorage.setItem('draftnaskah_'+this.banksoal.jenjang,JSON.stringify(data));
    }
    createDraftNaskah(datanaskah){
        let data = {};
        data.pradesain = this.pradesain;
        data.html = datanaskah;
        this.writeLocal(data);
        alert('Draft berhasil disimpan');
    }
    showDraft(){
        let data;
        if(window.localStorage.hasOwnProperty('draftnaskah_'+this.banksoal.jenjang)){
            data = JSON.parse(window.localStorage.getItem('draftnaskah_'+this.banksoal.jenjang));
        }
        return data;
    }
}