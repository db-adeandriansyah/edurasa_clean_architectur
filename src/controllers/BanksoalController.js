import Fitur from "./Fitur";
import {  ModalConfig } from "../entries/vendor";
import DesainNaskahSoal from "../controller_features/naskahsoal/DesainNaskahSoal";
import ArsipNaskah from "../controller_features/arsipnaskah/ArsipNaskah";
const BanksoalFitur = await import("../controller_features/banksoal/BanksoalFitur").then(module=>  module.default  );

export default class BanksoalController extends Fitur{
    #judulHalaman;
    constructor(app,banksoalService){
        super(app);
        
        this.banksoalService = banksoalService;
        this.banksoalFitur = null;
        this.#judulHalaman="";
        this.controlRombel(false);
        this.Modal = null;
        this.Modal1 = null;
        
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
        this.banksoalFitur = this.makeInstance(BanksoalFitur,
            [
                this.banksoalService,
                document.getElementById('printarea'), 
                document.getElementById('maincontrol'),
                this.Auth,
                this.App.tooltipkan
            ]
        );
        
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
    async item_soal(){
        this.footerarea.innerHTML = "";
        this.banksoalFitur.rombel = this.fokusRombel;
        await this.banksoalFitur.settingJenjang(this.fokusJenjang).settingKurikulum().init();
        this.banksoalFitur.fitur_item_soal();
        
    }
    async desain_naskah(){
        this.footerarea.innerHTML = `<div class="sticky-md-bottom accord-bg text-center my-3 py-2 print-hide">
        <button class="btn btn-sm text-bg-primary border-bottom border-5 border-warning border-start-0 border-top-0 border-end-0 rounded-pill py-1 px-3" id="btnLihatKisikisiDesain">Lihat Kisi-kisi</button>
        <button class="btn btn-sm text-bg-warning border-bottom border-5 border-warning border-start-0 border-top-0 border-end-0 rounded-pill py-1 px-3" id="btnLihatKisikisiDesainView">Lihat Kisi-kisi dan Soal</button>
        <button class="btn btn-sm text-bg-success border-bottom border-5 border-warning border-start-0 border-top-0 border-end-0 rounded-pill py-1 px-3" id="btnLihatKunciJawaban">Lihat Kunci Jawaban</button>
        <button class="btn btn-sm text-bg-info border-bottom border-5 border-warning border-start-0 border-top-0 border-end-0 rounded-pill py-1 px-3" id="btnSimpanServerDesain">Simpan Server</button>
        <button class="btn btn-sm text-bg-dark border-bottom border-5 border-warning border-start-0 border-top-0 border-end-0 rounded-pill py-1 px-3" id="btnSimpanDraft">Simpan Draft</button>
        </div>`;
        this.banksoalFitur.rombel = this.fokusRombel;
        await this.banksoalFitur.settingJenjang(this.fokusJenjang).settingDesain().init();
        let dn = this.makeInstance(DesainNaskahSoal,[
            this.banksoalFitur,
            document.getElementById('printarea'), 
            document.getElementById('maincontrol'),
            this.Modal,
            this.Modal1
        ]);
        dn.createTool();
        dn.init();
        
    }
    async arsip_naskah(){
        this.footerarea.innerHTML = "";
        this.banksoalFitur.rombel = this.fokusRombel;
        this.banksoalFitur.settingJenjang(this.fokusJenjang);
        this.banksoalFitur.settingArsipNaskah();;
        
        await this.banksoalFitur.init();
        
        let dn = this.makeInstance(ArsipNaskah,[
            this.banksoalFitur,
            document.getElementById('printarea'),
            document.getElementById('maincontrol'), 
            this.Modal,
            this.Modal1
        ]);
        dn.init();
        
        
    }
    async arsip_naskah_us(){
        this.footerarea.innerHTML = "";
        this.banksoalFitur.settingJenjang(6);
        this.banksoalFitur.settingArsipNaskah();;
        
        await this.banksoalFitur.init();
        
        let dn = this.makeInstance(ArsipNaskah,[
            this.banksoalFitur,
            document.getElementById('printarea'),
            document.getElementById('maincontrol'), 
            this.Modal,
            this.Modal1
        ]);
        dn.initus();
        
        
    }
}