import AbsensiFitur from "../controller_features/absensi/AbsensiFitur";
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
        
        this.fitur = new AbsensiFitur(this.absenService,this.Auth,Modal, Modal1);
        
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
    }

    controlFilterAbsen(data){
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
        
        // this.maincontrol.innerHTML = htmlAbsen.koleksiBulanAbsen(datacontrol);
        this.maincontrol.innerHTML = controls.koleksiBulanAbsen(datacontrol);

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

        await this.absenService.dataAbsen(this.fokusRombel);
        
        this.fitur.settingRombel(this.fokusRombel).fitur_perbulan_currentRombel();
    }
    
}