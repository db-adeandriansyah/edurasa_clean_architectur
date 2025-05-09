import InfoKbmModal from "../kbm/InfoKbmModal";
//const InfoKbmModal =import("../kbm/InfoKbmModal").then(module=>  module.default  );;
import KoreksiJawaban from "../koreksi/KoreksiJawaban"
import UploadCsv from "../uploadCsv/UploadCsv";
import analisisSoal from "./AnalisisSoal";
import viewAnalisisSoal from "./viewAnalisisSoal";
import viewOlahNilaiKBM from "./viewOlahNilaiKbm";

export default class OlahNilaiKbm{
    constructor(service,modal, modal1,user,tooltip,parent=null){
        this.kbmFitur = service;
        this.Modal = modal;
        this.Modal1 = modal1;
        this.user = user;
        this.tooltipkan = tooltip;
        this.printarea = document.getElementById('printarea');
        this.parent = parent;
        this.createInfo();
    }
    createInfo(){
        const dv  = document.getElementById('maincontrol');
        dv.innerHTML = viewOlahNilaiKBM.viewMainControlInfo();

    }
    createTableData(){
        let identitas = {
            rombel:this.kbmFitur.rombel,
            kurikulum:this.kbmFitur.longKurikulum
        }
        
        this.printarea.innerHTML = viewOlahNilaiKBM.viewTableKBM(identitas, this.kbmFitur.ormKBM.data);
        this.tooltipkan();
        this.configButtonsKbm()
    }
    configButtonsKbm(){
        let btns = document.querySelectorAll('[data-aksi]');
        btns.forEach(btn=>{
            btn.onclick =(e)=>{
                let fn = btn.getAttribute('data-aksi');
                let id = btn.getAttribute('data-id');
                if(this[fn]){
                    this[fn](id)
                }else{
                    console.log('Method belum dibuat/tidak berfungsi, ', fn)
                }
            }
        })
    }
    info(id){
        const data = this.kbmFitur.ormKBM.data.filter(s=> s.idbaris == id)[0];
        //import viewOlahNilaiKBM from "./viewOlahNilaiKbm";
        
        
        new InfoKbmModal(this.kbmFitur,data,this.Modal,this.Modal1,viewOlahNilaiKBM,this.user).show();

    }
    async koreksi(id){
        const data = this.kbmFitur.ormKBM.data.filter(s=> s.idbaris == id)[0];
        
        let koreksian = new KoreksiJawaban(this.kbmFitur,data,this.Modal, this.Modal1,this.user,this.createTableData.bind(this));
        
        await koreksian.propertiNaskah();
        
        koreksian.createOrmKoreksi().show();
    }
    async uploadnilai(id){
        const data = this.kbmFitur.ormKBM.data.filter(s=> s.idbaris == id)[0];
        
        let koreksian = new UploadCsv(this.kbmFitur,data,this.Modal, this.Modal1,this.user,this.createTableData.bind(this));
            koreksian.createOrm().show();
            

        
    }
    analisisnilai(id){
        console.log('analisis nilai',id);
        // const data = this.kbmFitur.ormKBM.data.filter(s=> s.idbaris == id)[0];
        // console.log(data);
        // console.log('siswa',this.kbmFitur.siswa);
        // console.log('rombel',this.kbmFitur.rombel);
        new analisisSoal(this.kbmFitur).user(this.user).data(id).show(this.Modal);

    }
    editpublikasi(id){
        
        const data = this.kbmFitur.ormKBM.data.filter(s=> s.idbaris == id)[0];
        //import viewOlahNilaiKBM from "./viewOlahNilaiKbm";
        
        
        new InfoKbmModal(this.kbmFitur,data,this.Modal,this.Modal1,viewOlahNilaiKBM,this.user,this.createTableData.bind(this)).showSettingPublikasi();
    }
}