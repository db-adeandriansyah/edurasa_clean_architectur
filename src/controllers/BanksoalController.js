import Fitur from "./Fitur";
import {  ModalConfig } from "../entries/vendor";
const BanksoalFitur = await import("../controller_features/banksoal/BanksoalFitur").then(module=>  module.default  );

export default class BanksoalController extends Fitur{
    #judulHalaman;
    constructor(app,banksoalService){
        super(app);
        
        this.banksoalService = banksoalService;
        this.banksoalFitur = null;
        this.#judulHalaman="";
        this.controlRombel(false);
        
    }
    async init(){
        console.log('init cek jenjang', this.fokusJenjang);
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
        this.banksoalFitur = this.makeInstance(BanksoalFitur,[this.banksoalService,Modal, Modal1,this.Auth,this.App.tooltipkan]);
        
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
        // console.log(this.banksoalFitur.currentMapelOnClassRoom);
        await this.banksoalFitur.settingJenjang(this.fokusJenjang).init();//.settingKurikulum().callMultipe()
        this.banksoalFitur.fitur_item_soal()
        // console.log(this.banksoalFitur.labelingSelectMapel);
        
        // console.log(this.banksoalFitur.banksoalservice.data);
        // console.log(this.banksoalFitur.ormKurikulum.simpleFilter({'kodemapel':'PKN'}).data);
        // console.log(this.banksoalFitur.ormKurikulum.data.filter(s=>s.kodemapel == 'PAI'))
        
        // console.log(this.banksoalFitur.ormKurikulum instanceof CollectionsEdu)
        // console.log(this.banksoalService.data);
        // console.log(this.banksoalFitur.arrayTest)
        // console.log(this.banksoalFitur.jenjang);
        // console.log(this.banksoalFitur.shortKurikulum);
        // console.log(this.banksoalFitur.longKurikulum);
        // console.log(this.banksoalFitur.namafase);
        // console.log(this.banksoalFitur.callKDorTP);
        // console.log(this.banksoalFitur.callKDorTP);

        
        // console.log(this.kurikulumFitur.kurikulumService.data);
        // console.log(this.kurikulumFitur.ormKurikulum.properti_elemencp({'mapel':'',}));
    }
}