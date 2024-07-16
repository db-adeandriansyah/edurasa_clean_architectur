import Fitur from "./Fitur";
import { ModalConfig,CollectionsEdu } from "../entries/vendor";
import OrmKurikulumSoal from "../controller_features/banksoal/OrmKurikulumSoal";
import { controlFiturBuatPerItemSoal } from "../controller_features/banksoal/viewBankSoal";
import BankSoalFacades from "../facades/BankSoalFacades";
import DcBankSoal from "../data_controllers/DcBankSoal";
import SoalDomain from "../domains/SoalDomain";
import viewDesainNaskah from "../controller_features/naskahsoal/viewDesainNaskah";
import DesainNaskahFacades from "../facades/DesainNaskahFacades";


export default class BankSoalControllers extends Fitur{
    #judulHalaman;
    constructor(app,banksoalService){
        super(app);
        this.service = banksoalService;
        this.facade = null;
        this.dataController = null;
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
        this.dataController = this.makeInstance(DcBankSoal,[
            this.service,
            this.App.faseKey,
            this.App.JenisKurikulum,
            CollectionsEdu,
            OrmKurikulumSoal
        ]);
        this.service.api_banksoal = this.dataController.api_banksoal;
    }
    async item_soal(){
        //Observer
        this.dataController.settingRombel(this.fokusRombel);
        // panggil data dari spreadSheet
        await this.dataController.needData(this.fokusMenu);
        //definisikan semua halyang dibutuhkan fitur item_soal
        let needData = {
            'shortKurikulum'        : this.dataController.shortKurikulum,
            'longKurikulum'         : this.dataController.longKurikulum,
            'jenjang'               : this.fokusJenjang,//this.dataController.jenjang,
            'koleksimapel'          : this.dataController.currentMapelOnClassRoom,
            'isGuruMapel'           : this.Auth.typeUser == 'Guru Mapel',
            'mapelAjar'             : this.Auth.tugasUser,
            'koleksibentuksoal'     : this.dataController.koleksiBentukSoal,
            '_htmlkoleksimapel'     : this.dataController.labelingSelectMapel,
            'kurikulum'             : this.dataController.ormKurikulum,
            //data untuk desain itemsoal
            'taksonomibloom'        : this.dataController.taksonomibloom,
            'namakurikulum'         : this.dataController.shortKurikulum,
            'ormkurikulum'          : this.dataController.ormKurikulum.data,
            // 'jenjang'               : this.fokusJenjang, //sudah ditentukan sebelumnya
            'oleh'                  : this.Auth.namaUser,
            'idguru'                : this.Auth.idUser,
            'paramUploadGambar'     : this.dataController.paramUploadGambar,
            'paramTabBanksoal'      : this.dataController.api_banksoal

        };
        //definisikan juga tempat folder di Drive, data diatur oleh Observer;
        this.service.api_uloadgambar = this.dataController.paramUploadGambar;

        //view;
        //tampilkan kontrol untuk membuat pradesaian soal;
        this.maincontrol.innerHTML = controlFiturBuatPerItemSoal(needData);
        
        //facadeFitur;
        //aktifkan semua aksi-aksi keselurhan;
        const aksi = new BankSoalFacades(this.service, this.Auth, SoalDomain, needData, this.urlImg);
        //aktifkan aksi dari data kontrol kemudian diterapkan di masing-masing editor.
        //kontrol menghasilkan data desain dari item soal yang akan dibuat;
        aksi.registerEventToolBar('data-pradesain');
        
    }
    async desain_naskah(){

        //Observer
        this.dataController.settingRombel(this.fokusRombel);
        await this.dataController.needData(this.fokusMenu);
        let needData = {
            'shortKurikulum'        : this.dataController.shortKurikulum,
            'longKurikulum'         : this.dataController.longKurikulum,
            'jenjang'               : this.fokusJenjang,//this.dataController.jenjang,
            'koleksimapel'          : this.dataController.currentMapelOnClassRoom,
            'isGuruMapel'           : this.Auth.typeUser == 'Guru Mapel',
            'mapelAjar'             : this.Auth.tugasUser,
            'koleksibentuksoal'     : this.dataController.koleksiBentukSoal,
            '_htmlkoleksimapel'     : this.dataController.labelingSelectMapel,
            'kurikulum'             : this.dataController.ormKurikulum,
            //data untuk desain itemsoal
            'taksonomibloom'        : this.dataController.taksonomibloom,
            'namakurikulum'         : this.dataController.shortKurikulum,
            'ormkurikulum'          : this.dataController.ormKurikulum.data,
            // 'jenjang'               : this.fokusJenjang, //sudah ditentukan sebelumnya
            'oleh'                  : this.Auth.namaUser,
            'idguru'                : this.Auth.idUser,
            'paramUploadGambar'     : this.dataController.paramUploadGambar,
            'paramTabBanksoal'      : this.dataController.api_banksoal,
            //////////////////////////////////////
            'koleksiBentukSoal'     : this.dataController.koleksiBentukSoal,
            'koleksibentuksoal'     : this.dataController.koleksiBentukSoal,
            // 'shortKurikulum':this.dataController.shortKurikulum,
            // 'longKurikulum':this.dataController.longKurikulum,
            // 'jenjang':this.dataController.jenjang,
            // 'koleksimapel'          : this.dataController.currentMapelOnClassRoom,
            'koleksirombel'            : this.Auth.koleksiRombel,
            // 'isGuruMapel':this.Auth.typeUser == 'Guru Mapel',
            // 'mapelAjar'              : this.Auth.tugasUser,
            // '_htmlkoleksimapel'      : this.dataController.labelingSelectMapel,
            '_htmlkoleksimapelWithTema' :this.dataController.labelingSelectMapelWithTema,
            // 'kurikulum'                 : this.dataController.ormKurikulum,
            'draft'                     : this.App.hasLocal('draftnaskah_'+this.fokusJenjang)?this.App.LocalJsonNonEncoded('draftnaskah_'+this.fokusJenjang):null,

        }
        
        //view;
        this.maincontrol.innerHTML = viewDesainNaskah.toolbar(needData);

        
        //facadeFitur;
        const aksi = new DesainNaskahFacades(this.service, this.Auth, SoalDomain,needData, this.urlImg, this.Modal);
        
        /**
            aksi.registerEventsToolbar(needData);
            aksi.regiseterEventFooterbar();
         */

    }
}