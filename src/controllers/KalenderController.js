import KaldikFitur from "../controller_features/kaldik/KaldikFitur";
import OrmKaldik from "../controller_features/kaldik/OrmKaldik";
import { ModalConfig } from "../entries/vendor";
import controls from "../views/controls/controls";

import Fitur from "./Fitur";

export default class KalenderController extends Fitur{
    #dbsiswa;
    #ptkalltime;
    #judulHalaman;
    constructor(app,service){
        super(app);
        this.kaldikService = service;
        this.#dbsiswa = [];
        this.#ptkalltime = [];
        this.#judulHalaman='';
        this.controlRombel(false);
    }
    async ensureLoadedRepo(){
        // if(this.App.hasLocal('dbSiswa')){

        //     // this.#dbsiswa = JSON.parse(window.localStorage.getItem('dbSiswa'));
        //     if(window.localStorage.getItem('dbSiswa')!=='undefined'){
        //         this.#dbsiswa = JSON.parse(window.localStorage.getItem('dbSiswa'));
        //     }else{
        //         let response = await this.service.repo.callSiswa();
        //         window.localStorage.setItem('dbSiswa',JSON.stringify(response.data));
        //         this.#dbsiswa = response.data;
        //     }
            
        // }else{
            
        //     let response = await this.service.repo.callSiswa();
        //     window.localStorage.setItem('dbSiswa',JSON.stringify(response.data));
        //     this.#dbsiswa = response.data;
        // }
        if(!this.App.hasLocal('ptkAlltime')){
            let response = await this.service.repo.riwayatPtk();
            
            this.App.writeLocal('ptkAlltime',JSON.stringify(response.data));
            this.#ptkalltime = response.data;
        }else{
            this.#ptkalltime = this.App.LocalJson('ptkAlltime');
        }
        await this.kaldikService.hasDb();
        
        this.init();
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
        const kaldikservice = this.kaldikService;
        const ormKaldik = new OrmKaldik(this.kaldikService.data)
        
        
        this.fiturkaldik  = new KaldikFitur(kaldikservice,ormKaldik,Modal, Modal1, this.Auth,this.App.tooltipkan).init();
        /**
         * const kaldikservice = this.absenService.kalenderService;
        const ormKaldik = new OrmKaldik(this.absenService.data.kalender)
        
        this.fitur = new AbsensiFitur(this.absenService,this.Auth,Modal, Modal1,this.App.tooltipkan,ormKaldik);
        this.fiturkaldik  = new KaldikFitur(kaldikservice,ormKaldik,Modal, Modal1, this.Auth,this.App.tooltipkan).init()
        
         */
    }

    
    settingHeaderPage(){
        let lastTitle = `<h4 class="text-center mb-3 fw-bolder tnr">Semester ${this.setApp.semester} Tahun Pelajaran ${this.setApp.tapel}</h4>`;
        // let lastTitle = `<h4 class="text-center mb-3">Tahun Pelajaran ${this.setApp.tapel}</h4>`;
        
        this.#judulHalaman = '';

        for(let i = 0 ; i < arguments.length-1; i++){
            if(i==0){
                this.#judulHalaman +=`<h3 class="text-center mb-0 fw-bold tnr">${arguments[i]}</h3>`;

            }else{
                this.#judulHalaman +=`<h4 class="text-center mb-0 fw-bold tnr">${arguments[i]}</h4>`;

            }
        }
        
        if(arguments[arguments.length-1]==true){
            this.#judulHalaman+= lastTitle;
        }
    }

    setting_kalender(){
        this.settingHeaderPage('Kalender Pendidikan',this.Auth.namaSekolah,'Tahun Pelajaran ' + this.Auth.tapel,false);
        this.fiturkaldik.headerPage = this.#judulHalaman;
        this.fiturkaldik.show_tabel_setting();
    }

    semester_1(){
        this.settingHeaderPage('Kalender Pendidikan ' + this.Auth.namaSekolah,'Tahun Pelajaran ' + this.Auth.tapel,'Semester 1',false);
        this.fiturkaldik.headerPage = this.#judulHalaman;
        this.fiturkaldik.show_kalender_pendidikan(new Date(this.Auth.tahunAwal,6,1));;
    }

    semester_2(){
        this.settingHeaderPage('Kalender Pendidikan ' + this.Auth.namaSekolah,'Tahun Pelajaran ' + this.Auth.tapel,'Semester 2',false);
        this.fiturkaldik.headerPage = this.#judulHalaman;
        this.fiturkaldik.show_kalender_pendidikan(new Date(this.Auth.tahunAkhir,0,1));;
    }
    per_tahun(){
        this.settingHeaderPage('Kalender Pendidikan ' + this.Auth.namaSekolah,'Tahun Pelajaran ' + this.Auth.tapel,false);
        this.fiturkaldik.headerPage = this.#judulHalaman;
        this.fiturkaldik.show_kalender_pendidikanTahun(new Date(this.Auth.tahunAwal,6,1));;
    }
    he_semester_1(){
        this.maincontrol.innerHTML = controls.modeSabtuLibur(false);
        this.settingHeaderPage('Jumlah hari Efektif ','Kalender Pendidikan ' + this.Auth.namaSekolah,'Tahun Pelajaran ' + this.Auth.tapel,'Semester 1',false);
        this.fiturkaldik.headerPage = this.#judulHalaman;
        this.fiturkaldik.show_hari_efektif(new Date(this.Auth.tahunAwal,6,1));;
    }
    he_semester_2(){
        this.maincontrol.innerHTML = controls.modeSabtuLibur(false);
        this.settingHeaderPage('Jumlah hari Efektif ','Kalender Pendidikan ' + this.Auth.namaSekolah,'Tahun Pelajaran ' + this.Auth.tapel,'Semester 2',false);
        this.fiturkaldik.headerPage = this.#judulHalaman;
        this.fiturkaldik.show_hari_efektif(new Date(this.Auth.tahunAkhir,0,1));;
    }
    heb_semester_1(){
        this.maincontrol.innerHTML = controls.modeSabtuLibur(false);
        this.settingHeaderPage('Jumlah hari Efektif Belajar ','Kalender Pendidikan ' + this.Auth.namaSekolah,'Tahun Pelajaran ' + this.Auth.tapel,'Semester 1',false);
        this.fiturkaldik.headerPage = this.#judulHalaman;
        this.fiturkaldik.show_hari_efektif_belajar(new Date(this.Auth.tahunAwal,6,1));;
    }
    heb_semester_2(){
        this.maincontrol.innerHTML = controls.modeSabtuLibur(false);
        this.settingHeaderPage('Jumlah hari Efektif Belajar','Kalender Pendidikan ' + this.Auth.namaSekolah,'Tahun Pelajaran ' + this.Auth.tapel,'Semester 2',false);
        this.fiturkaldik.headerPage = this.#judulHalaman;
        this.fiturkaldik.show_hari_efektif_belajar(new Date(this.Auth.tahunAkhir,0,1));;
    }
    jeb_semester_1(){
        this.maincontrol.innerHTML = controls.modeSabtuLibur(false);
        this.settingHeaderPage('Jumlah Jam Efektif Belajar ','Kalender Pendidikan ' + this.Auth.namaSekolah,'Tahun Pelajaran ' + this.Auth.tapel,'Semester 1',false);
        this.fiturkaldik.headerPage = this.#judulHalaman;
        this.fiturkaldik.show_jam_efektif_belajar(new Date(this.Auth.tahunAwal,6,1));;
    }
    jeb_semester_2(){
        this.maincontrol.innerHTML = controls.modeSabtuLibur(false);
        this.settingHeaderPage('Jumlah Jam Efektif Belajar','Kalender Pendidikan ' + this.Auth.namaSekolah,'Tahun Pelajaran ' + this.Auth.tapel,'Semester 2',false);
        this.fiturkaldik.headerPage = this.#judulHalaman;
        this.fiturkaldik.show_jam_efektif_belajar(new Date(this.Auth.tahunAkhir,0,1));;
    }
    
}