const SuratFeature = await import("../controller_features/surat/SuratFeatures").then(module=>  module.default  );
import { ModalConfig} from "../entries/vendor";
import { filteringSuratKeluarByTahun } from "../views/surat/controlSurat";
import Fitur from "./Fitur";

export class ArsipSuratController extends Fitur{
    #dbsiswa;
    #ptkalltime;
    #dBOrm;
    #judulHalaman;
    constructor(app,service){
        super(app);
        this.service = service;
        this.#dbsiswa;
        this.#ptkalltime;
        this.Modal = {};
        this.Modal1 = {}
        this.#dBOrm = [];
        this.#judulHalaman = '';
        this.controlRombel();
    }
    async ensureLoadedRepo(){
        if(this.App.hasLocal('dbSiswa')){

            // this.#dbsiswa = JSON.parse(window.localStorage.getItem('dbSiswa'));
            if(window.localStorage.getItem('dbSiswa')!=='undefined'){
                this.#dbsiswa = JSON.parse(window.localStorage.getItem('dbSiswa'));
            }else{
                let response = await this.service.repo.callSiswa();
                window.localStorage.setItem('dbSiswa',JSON.stringify(response.data));
                this.#dbsiswa = response.data;
            }
            
        }else{
            
            let response = await this.service.repo.callSiswa();
            window.localStorage.setItem('dbSiswa',JSON.stringify(response.data));
            this.#dbsiswa = response.data;
        }
        if(!this.App.hasLocal('ptkAlltime')){
            let response = await this.service.repo.riwayatPtk();
            
            this.App.writeLocal('ptkAlltime',JSON.stringify(response.data));
            this.#ptkalltime = response.data;
        }else{
            this.#ptkalltime = this.App.LocalJson('ptkAlltime');
        }
        await this.init();
    }
    async init(){
        
        this.Modal = this.makeInstance(ModalConfig,['#modalAuto',{'backdrop':'static','keyboard':false}]);
        this.Modal1 = this.makeInstance(ModalConfig,['#modalAuto2',{'backdrop':'static','keyboard':false},{
            'printLandscapeDom' : this.printLandscapeDom, // paramaeter (dom)
            'printPortraitDom'  : this.printPortraitDom, //parameter (dom)
            'wordLandscapeDom'  : this.wordLandscapeDom,// parameterL(title="edurasa",dom)
            'wordPortraitDom'   : this.wordPortraitDom, //parameter (title,dom);
            'pdfLandscapeDom'   : this.pdfLandscapeDom,
            'pdfPortraitDom'    : this.pdfPortraitDom,
            'excelDom'          : this.excelDom// parameter(dom,queryTabel,title='Export Excel')
        }]);
        
        await this.service.callDbAllSurat();
        this.suratFitur = new SuratFeature(
            this.service,
            this.Modal,
            this.Modal1,
            // tabelDom,
            this.Auth,
            this.App.LocalJson('ptk'),
            this.#ptkalltime,
            JSON.parse(window.localStorage.getItem('dbSiswa')),
            this.fokusRombel
        )
        
    }
    settingHeaderPage(){
        let lastTitle = `<h4 class="text-center mb-3">Semester ${this.setApp.semester} Tahun Pelajaran ${this.setApp.tapel}</h4>`;
        this.#judulHalaman = '';
        
        for(let i = 0 ; i < arguments.length-1; i++){
            this.#judulHalaman +=`<h3 class="text-center mb-0">${arguments[i]}</h3>`;
        }
        
        if(arguments[arguments.length-1]==true){
            this.#judulHalaman+= lastTitle;
        }
        // return this.#judulHalaman;
    }

    surat_keluar(){
        this.settingHeaderPage('Daftar Surat Keluar',false);
        this.maincontrol.innerHTML = filteringSuratKeluarByTahun(this.service.dbSuratKeluar,true,'Surat Keluar')
        this.suratFitur.htmlJudul = this.#judulHalaman;
        this.suratFitur.showSuratKeluar();
        this.listenerFilter_suratKeluar('showSuratKeluar');
        // this.listenerFilter_suratKeluar('surat_keluar');
    }

    listenerFilter_suratKeluar(fiturmethod){
        const sele = document.getElementById('selectControlSuratKeluarTapel');
        let judulsebelumnya = this.#judulHalaman;
        sele.onchange = (e)=>{
            if(e.target.value ==""){
                this.settingHeaderPage(judulsebelumnya, false);
                this.suratFitur.htmlJudul = this.#judulHalaman;
                this.suratFitur[fiturmethod]();
                
                return;
            }
                this.settingHeaderPage(judulsebelumnya,'Tahun '+e.target.value, false);
                this.suratFitur.htmlJudul = this.#judulHalaman;
                this.suratFitur[fiturmethod](new Date(e.target.value,1,1));
        }
    }
        
    surat_masuk(){
        this.settingHeaderPage('Daftar Surat Masuk',false);
        this.suratFitur.htmlJudul = this.#judulHalaman;
        this.maincontrol.innerHTML = filteringSuratKeluarByTahun(this.service.dbSuratKeluar,true,'Surat Masuk')
        this.listenerFilter_suratKeluar('showSuratMasuk')
        this.suratFitur.showSuratMasuk();
    }
    
    sppd(){
        this.settingHeaderPage('Daftar Surat Perintah Perjalanan Dinas','SPPD',false);
        this.maincontrol.innerHTML = filteringSuratKeluarByTahun(this.service.dbSuratKeluar,true,'SPPD')
        this.suratFitur.htmlJudul = this.#judulHalaman;
        this.suratFitur.showSPPD();
        this.listenerFilter_suratKeluar('showSPPD')
    }

    sk(){
        this.settingHeaderPage('Daftar Surat Keterangan Aktif',false);
        this.maincontrol.innerHTML = filteringSuratKeluarByTahun(this.service.dbSuratKeluar,true,'Surat Keterangan Aktif')
        this.suratFitur.htmlJudul = this.#judulHalaman;
        this.suratFitur.showSuratKeteranganAktif();
        this.listenerFilter_suratKeluar('showSuratKeteranganAktif');
    }
    
    sk_NISN(){
        this.settingHeaderPage('Daftar Surat Keterangan NISN',false);
        this.maincontrol.innerHTML = filteringSuratKeluarByTahun(this.service.dbSuratKeluar,true,'Surat Keterangan NISN')
        this.suratFitur.htmlJudul = this.#judulHalaman;
        this.suratFitur.showSuratKeteranganNISN();
        this.listenerFilter_suratKeluar('showSuratKeteranganNISN');
    }
    
    sk_diterimasekolah(){
        this.settingHeaderPage('Daftar Surat Keterangan Telah Diterima di sekolah',false);
        this.maincontrol.innerHTML = filteringSuratKeluarByTahun(this.service.dbSuratKeluar,true,'Surat Keterangan Diterima')
        this.suratFitur.htmlJudul = this.#judulHalaman;
        this.suratFitur.showSuratKeteranganDiterima();
        this.listenerFilter_suratKeluar('showSuratKeteranganDiterima');
    } 
    sk_pindah(){
        this.settingHeaderPage('Daftar Surat Keterangan Pindah sekolah',false);
        this.maincontrol.innerHTML = filteringSuratKeluarByTahun(this.service.dbSuratKeluar,true,'Surat Pindah Sekolah')
        this.suratFitur.htmlJudul = this.#judulHalaman;
        this.suratFitur.showSuratKeteranganPindahSekolah();
        this.listenerFilter_suratKeluar('showSuratKeteranganPindahSekolah');
    }
}