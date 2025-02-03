import BukuIndukFitur from "../controller_features/bukuinduk/BukuIndukFitur";
import { ModalConfig } from "../entries/vendor";
import Fitur from "./Fitur";

export default class BukuIndukController extends Fitur{
    constructor(app,service){
        super(app);
        this.service = service;
        this.fitur = null;
    }
    async init(){
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
        
        
        await this.service.init();
        this.fitur = new BukuIndukFitur(this.App,this.service,this.maincontrol,this.workplace,this.Modal,this.Modal1);
    }
    async setting_induk(){
        this.fitur.showSetingInduk();
        
    } 
    async tapel_induk(){
        this.fitur.showTapelInduk();
    }
    klaper_induk(){
        this.fitur.showKlapper();
    }
    klaper_angkatan(){
        this.fitur.showKlapperAngkatan()
    }
}