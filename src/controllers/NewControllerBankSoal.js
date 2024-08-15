import Fitur from "./Fitur";
// const ToolbarCreateItemSoal = await import('../controller_features/itemsoal/ToolbarCreate.js').then(module=>module.default) /* webpackPrefetch: true */ ;
// const ToolbarCreateItemSoalimport('../controller_features/itemsoal/ToolbarCreate.js');

export default class NewControllerBankSoal extends Fitur{
    
    constructor(app,banksoalService){
        super(app);
        this.service = banksoalService;
        this.facade = null;
        this.dataController = null;
        this.controlRombel(false);
        this.Modal = null;
        this.Modal1 = null;
        this.fnc_mapelByJenjang = null;
    }
    get paramMapelCurrentJenjang (){
        let tinggiRendah = this.fokusJenjang>3?'tinggi':'rendah';;
        return 'mapel'+this.App.JenisKurikulum[this.fokusJenjang]+ tinggiRendah;;
    }

    init(nameClassesFunctions){
        const {ModalConfig,mapelkdcp_kurikulum,ParameterAppScript,OrmKurikulumSoal} = nameClassesFunctions;
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
        
        console.log(this.App,this.App.faseKey)
        this.fnc_mapelByJenjang = mapelkdcp_kurikulum;
        this.parameterAppScript = this.makeInstance(ParameterAppScript,[this.service.repo, this.App.faseKey]);
        // this.ormKurikulumSoal = this.makeInstance(OrmKurikulumSoal,[])
    }
    fn_parameterMustSended(paramHasCalled){
        return paramHasCalled.filter(s=>!this.service.data.hasOwnProperty(s.tabdb));
    }
    async item_soal(){
        this.parameterAppScript.fokusJenjang = this.fokusJenjang;
        
        //data yang dibutuhkan
        //data statik
        this.database['koleksimapel'] =  this.fnc_mapelByJenjang[this.paramMapelCurrentJenjang]();
        Object.assign(this.service.data, this.database);

        const arrayTab = this.parameterAppScript[this.fokusMenu]();
        const arrayReduce = this.fn_parameterMustSended(arrayTab);
        
        
        if(arrayReduce.length>0){
            await this.service.readMultipleTab(arrayReduce)
        }
        
        // Object.assign(this.database, this.service.data);
        // console.log(this.service.data);
        //tampilkan kontrol
        /** 
         * untuk bisa menampilkan kontrol, butuh data sebagai berikut:
         * - koleksimapel;
         * - kurikulumnya, OrmKurikulum;
         * - pilihan teks editor
         */
        
        const ToolbarCreateItemSoal = await import('../controller_features/itemsoal/ToolbarCreate.js').then(module=>module.default);
        const toolbar = new ToolbarCreateItemSoal(this.service.data.koleksimapel,'orm');
        console.log(toolbar, toolbar.test);
        //listener kontrol
        /**
         * setiap kontrol yang dipilih User mempunyai event/listener. Misalnya saat milih Mapel, maka 
         * properti kurikulum yang ditampilkan juga sesuai dengan mapel, dan lain-lain.
         * 
         */

        //akhir/finish dari kontrol toolbar
        /**
         * akhir dari finish kontrol adalah mengharapkan data pradesain. Yaitu data mengenai properti
         * dari soal yang akan dibuat; 
         * contoh data pradesain menentukan aksi dan data yang harus ditampilkan di kontrol selanjutnya
         */

        //selanjutnya ke kontrol create item soal dari teks editor, formulir, canvas, dll.
        /**
         * semua jenis teks editor untuk membuat item soal pada dasarnya membutuhkan data pradesain yang
         * sama;
         */
    }
    desain_naskah(){
        console.log('test memanggil Modal Bootstrap');
        this.Modal.show();
    }
}