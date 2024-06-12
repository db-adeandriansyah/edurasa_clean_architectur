import { ModalConfig } from "../entries/vendor";
import BankSoalFacades from "../facades/BankSoalFacades";
import Fitur from "./Fitur";

export default class BankSoalControllers extends Fitur{
    #judulHalaman;
    constructor(app,banksoalService){
        super(app);
        this.service = banksoalService;
        this.facade = null;
        this.#judulHalaman="";
        this.controlRombel(false);
        this.Modal = null;
        this.Modal1 = null;
    }
    init(){
        this.Modal = this.makeInstance(ModalConfig,['#modalAuto',{'backdrop':'static','keyboard':false}]);
        this.Modal1 = this.makeInstance(ModalConfig,['#modalAuto2',{'backdrop':'static','keyboard':false},{
            'printLandscapeDom' : this.printLandscapeDom, 
            'printPortraitDom'  : this.printPortraitDom,  
            'wordLandscapeDom'  : this.wordLandscapeDom,  
            'wordPortraitDom'   : this.wordPortraitDom,   
            'pdfLandscapeDom'   : this.pdfLandscapeDom,            
            'pdfPortraitDom'    : this.pdfPortraitDom,            
            'excelDom'          : this.excelDom           
        }]);
        this.facade = this.makeInstance(BankSoalFacades,[
            this.App,
            this.service,
            this.database
        ])
    }
    async item_soal(){
        this.cekLog('test',this.facade.itemSoal());
        // this.footerarea.innerHTML = "";
        // this.banksoalFitur.rombel = this.fokusRombel;
        // await this.banksoalFitur.settingJenjang(this.fokusJenjang).settingKurikulum().init();
        // this.banksoalFitur.fitur_item_soal();
        
    }
}