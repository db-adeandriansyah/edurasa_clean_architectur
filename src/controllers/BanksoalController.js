import Fitur from "./Fitur";
import {  ModalConfig } from "../entries/vendor";
import DesainNaskahSoal from "../controller_features/naskahsoal/DesainNaskahSoal";
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
        await this.banksoalFitur.settingJenjang(this.fokusJenjang).init();
        
        this.banksoalFitur.fitur_item_soal();
        
    }
    async desain_naskah(){
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
        console.log(this.banksoalFitur.banksoalservice);
    }
}