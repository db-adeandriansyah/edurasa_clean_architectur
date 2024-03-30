import OrmKaldik from '../controller_features/kaldik/OrmKaldik';
// import AbsensiFitur from "../controller_features/absensi/AbsensiFitur";
// import KaldikFitur from "../controller_features/kaldik/KaldikFitur";
const AbsensiFitur=import( "../controller_features/absensi/AbsensiFitur").then(module=>  module.default  );;
const KaldikFitur =import("../controller_features/kaldik/KaldikFitur").then(module=>  module.default  );;
import { ModalConfig } from "../entries/vendor";
import controls from "../views/controls/controls";

import Fitur from "./Fitur";

export default class AbsensiController extends Fitur{
    #judulHalaman;
    #dbsiswa;
    constructor(app,service){
        super(app);
        this.absenService = service;
        this.#judulHalaman = '';//html
        this.#dbsiswa = []
        this.controlRombel();
        this.fitur =null;
        this.fiturkaldik = null;
        
    }
    
    init(){
        let Modal = this.makeInstance(ModalConfig,['#modalAuto',{'backdrop':'static','keyboard':false}]);
        let Modal1 = this.makeInstance(ModalConfig,['#modalAuto2',{'backdrop':'static','keyboard':false},{
            'printLandscapeDom' : this.printLandscapeDom, // paramaeter (dom)
            'printPortraitDom'  : this.printPortraitDom, //parameter (dom)
            'wordLandscapeDom'  : this.wordLandscapeDom,// parameterL(title="edurasa",dom)
            'wordPortraitDom'   : this.wordPortraitDom, //parameter (title,dom);
            'pdfLandscapeDom'   : this.pdfLandscapeDom,
            'pdfPortraitDom'    : this.pdfPortraitDom,
            'excelDom'          : this.excelDom// parameter(dom,queryTabel,title='Export Excel')
        }]);
        const kaldikservice = this.absenService.kalenderService;
        const ormKaldik = new OrmKaldik(this.absenService.data.kalender)
        
        this.fitur = new AbsensiFitur(this.absenService,this.Auth,Modal, Modal1,this.App.tooltipkan,ormKaldik);
        this.fiturkaldik  = new KaldikFitur(kaldikservice,ormKaldik,Modal, Modal1, this.Auth,this.App.tooltipkan).init()
        .addRelationalFitur(this.fitur);
    }
    
    settingHeaderPage(){
        let lastTitle = `<h4 class="text-center mb-3">Semester ${this.setApp.semester} Tahun Pelajaran ${this.setApp.tapel}</h4>`;
        // let lastTitle = `<h4 class="text-center mb-3">Tahun Pelajaran ${this.setApp.tapel}</h4>`;
        
        this.#judulHalaman = '';

        for(let i = 0 ; i < arguments.length-1; i++){
            this.#judulHalaman +=`<h3 class="text-center mb-0">${arguments[i]}</h3>`;
        }
        
        if(arguments[arguments.length-1]==true){
            this.#judulHalaman+= lastTitle;
        }
    }
    settingHeaderPageByTgl(refTgl){

    }

    controlFilterAbsen(data,addControlSiswa = true){
        let d = new Date();
        let y = d.getFullYear();
        let n = d.getMonth()+1;
        let m = n.toString().padStart(2,'0');
        let val = `${y}-${m}-01`;
        let dataDefault={
            judul:'Judul',
            arrayBulan:this.koleksiBulanAplikasi, 
            deskripsi:'Deskripsi Control',
            idSelectPilihBulan:'idselectbulanabsen',
            tglValuePertama:val,
            modeCheckmark:true
        };
        let datacontrol = Object.assign({},dataDefault,data);
        let htmlcontrol = controls.koleksiBulanAbsen(datacontrol);
        if(addControlSiswa){
            htmlcontrol+=controls.sorterDataSiswa(false);

        }
        
        this.maincontrol.innerHTML = htmlcontrol
    }

    async hari_ini(){
        await this.absenService.dataAbsen(this.fokusRombel);
        
        this.fitur.settingRombel(this.fokusRombel).fitur_hari_ini_currentRombel();
    }
    
    async perbulan(){
        this.controlFilterAbsen({
            judul:'Pilih Bulan',
            deskripsi:'Pilih Bulan untuk menampilkan data kehadiran dalam bulan terpilih.',
            modeCheckmark:true
        });
        this.settingHeaderPage('Daftar Hadir Siswa Kelas '+this.fokusRombel,false);
        await this.absenService.dataAbsen(this.fokusRombel);
        this.fitur.headerPage = this.#judulHalaman;
        this.fitur.settingRombel(this.fokusRombel).fitur_perbulan_currentRombel();
    }
    async rekap_siswa_bulanan(){
        this.controlFilterAbsen({
            judul:'Pilih Bulan',
            deskripsi:'Pilih Bulan untuk menampilkan data kehadiran dalam bulan terpilih.',
            modeCheckmark:false
        },false);
        this.settingHeaderPage('REKAPITULASI KEHADIRAN SISWA KELAS '+this.fokusRombel,false);
        await this.absenService.dataAbsen(this.fokusRombel);
        this.fitur.headerPage = this.#judulHalaman;
        this.fitur.settingRombel(this.fokusRombel).fitur_rekap_siswa_bulanan_currentRombel();
        
    }
    settingkaldik(){
        this.settingHeaderPage('Kalender Pendidikan',this.Auth.namaSekolah,'Tahun Pelajaran ' + this.Auth.tapel,false);
        this.fiturkaldik.headerPage = this.#judulHalaman;
        this.fiturkaldik.show_tabel_setting();
    }
    async rekap_siswa_semester(){
        await this.absenService.dataAbsen(this.fokusRombel);
        // this.settingHeaderPage('REKAPITULASI KEHADIRAN TIAP SEMESTER '+this.fokusRombel,false);
        let d = new Date();
        let y = d.getFullYear();
        let n = d.getMonth()+1;
        let m = y==this.Auth.tahunAwal == y?'07':'01';
        let val = `${y}-${m}-01`;
        let dataDefault={
            judul:'Pilih Semester',
            arrayBulan:this.semesterAplikasi(), 
            deskripsi:'Pilih Semester untuk menampilkan data kehadiran dalam bulan terpilih.',
            idSelectPilihBulan:'idselectsemester',
            tglValuePertama:val,
            modeCheckmark:false
        };
        let datacontrol = Object.assign({},dataDefault);
        let htmlcontrol = controls.koleksiBulanAbsen(datacontrol);
        // let htmlcontrol = controls.koleksiSemester(datacontrol);
        
        
        this.maincontrol.innerHTML = htmlcontrol;
        // this.fitur.headerPage = this.#judulHalaman;
        this.fitur.settingRombel(this.fokusRombel).fitur_rekap_siswa_semester();
    }
    
    async rekap_sia_bulanan(){
        await this.absenService.dataAbsen(this.fokusRombel);
        let d = new Date();
        let y = d.getFullYear();
        let n = d.getMonth()+1;
        let m = String(n).padStart(2,'0');//y==this.Auth.tahunAwal == y?'07':'01';
        let val = `${y}-${m}-01`;
        let dataDefault={
            judul:'Pilih Bulan',
            arrayBulan:this.koleksiBulanAplikasi, 
            deskripsi:'Pilih Bulan untuk menampilkan data kehadiran dalam bulan terpilih.',
            idSelectPilihBulan:'idselectbulanabsen',
            tglValuePertama:val,
            modeCheckmark:false
        };
        let datacontrol = Object.assign({},dataDefault);
        let htmlcontrol = controls.koleksiBulanAbsen(datacontrol);
        // let htmlcontrol = controls.koleksiSemester(datacontrol);
        
        
        this.maincontrol.innerHTML = htmlcontrol;
        // this.fitur.headerPage = this.#judulHalaman;
        this.fitur.settingRombel(this.fokusRombel).fitur_rekap_sia_bulanan();
    }
    
    async grafik_rekap_sia_bulanan(){
        
        await this.absenService.dataAbsen(this.fokusRombel);
        let d = new Date();
        let y = d.getFullYear();
        let n = d.getMonth()+1;
        let m = String(n).padStart(2,'0');//y==this.Auth.tahunAwal == y?'07':'01';
        let val = `${y}-${m}-01`;
        let dataDefault={
            judul:'Pilih Bulan',
            arrayBulan:this.koleksiBulanAplikasi, 
            deskripsi:'Pilih Bulan untuk menampilkan data Grafik yang ingin ditampilkan',
            idSelectPilihBulan:'idselectbulanabsen',
            tglValuePertama:val,
            modeCheckmark:false
        };
        let datacontrol = Object.assign({},dataDefault);
        let htmlcontrol = controls.koleksiBulanAbsen(datacontrol);
            htmlcontrol+=controls.grafikMode();

        this.maincontrol.innerHTML = htmlcontrol;
        this.settingHeaderPage('Grafik Absensi Kelas '+this.fokusRombel,false)
        this.fitur.headerPage = this.#judulHalaman;
        this.fitur.settingRombel(this.fokusRombel).fitur_grafik_bulanan();
        
    }

    async grafik_rekap_sia_semester(){
        await this.absenService.dataAbsen(this.fokusRombel);
        // this.settingHeaderPage('REKAPITULASI KEHADIRAN TIAP SEMESTER '+this.fokusRombel,false);
        let d = new Date();
        let y = d.getFullYear();
        let n = d.getMonth()+1;
        let m = y==this.Auth.tahunAwal == y?'07':'01';
        let val = `${y}-${m}-01`;
        let dataDefault={
            judul:'Pilih Semester',
            arrayBulan:this.semesterAplikasi(), 
            deskripsi:'Pilih Semester untuk menampilkan data kehadiran dalam bulan terpilih.',
            idSelectPilihBulan:'idselectsemester',
            tglValuePertama:val,
            modeCheckmark:false
        };
        let datacontrol = Object.assign({},dataDefault);
        let htmlcontrol = controls.koleksiSemesterGrafik(datacontrol);

        this.maincontrol.innerHTML = htmlcontrol;
        this.fitur.settingRombel(this.fokusRombel).fitur_grafik_rekap_sia_semester();
    }


}