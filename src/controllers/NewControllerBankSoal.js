import Fitur from "./Fitur";
import controlbanksoal from "../views/banksoal/controlBankSoal.js";
import viewDesainNaskah from "../controller_features/naskahsoal/viewDesainNaskah.js";
import { koleksiBentukSoal } from "../controller_features/itemsoal/KoleksiBentukSoal.js";
import viewSoal from "../controller_features/naskahsoal/viewSoal.js";
const OrmKurikulumSoal = await import("../controller_features/ORM/OrmKurikulumSoal.js").then(m=>m.default);
// import OrmKurikulumSoal       from "../controller_features/ORM/OrmKurikulumSoal.js";

const ToolbarCreateDesainNaskah     = await import(/* webpackChunkName: "ToolbarCreateDesainNaskah" */"../controller_features/desainnaskah/ToolbarCreateDesainNaskah.js").then(m=>m.default);
const BuildHtmlNaskah               = await import(/* webpackChunkName: "BuildHtmlNaskah" */"../controller_features/desainnaskah/BuildHtmlNaskah.js").then(m=>m.default);
const ClickableNaskah               = await import(/* webpackChunkName: "ClickableNaskah" */"../controller_features/desainnaskah/ClickableNaskah.js").then(m=>m.default);
const ControlSoalReplacing          = await import(/* webpackChunkName: "ControlSoalReplacing" */"../controller_features/desainnaskah/ControlSoalReplacing.js").then(m=>m.default);
const PaginationAvailableSoal       = await import(/* webpackChunkName: "PaginationAvailableSoal" */"../controller_features/desainnaskah/PaginationAvailableSoal.js").then(m=>m.default);
const ReplacingSoalToSel            = await import(/* webpackChunkName: "ReplacingSoalToSel" */"../controller_features/desainnaskah/ReplacingSoalToSel.js").then(m=>m.default);
const ValidatorDesainNaskah         = await import(/* webpackChunkName: "ValidatorDesainNaskah" */"../controller_features/desainnaskah/ValidatorDesainNaskah.js").then(m=>m.default);

// import PropertiNaskahSoal from "../controller_features/naskahsoal/PropertiNaskahSoal.js" /* webpackChunkName: "PropertiNaskahSoal" */;
import FormulirEditItemSoal from "../controller_features/itemsoal/FormulirEditItemSoal.js"/* webpackChunkName: "FormulirEditItemSoal" */;
import OrmBankSoal from "../controller_features/ORM/OrmBankSoal.js";
import OrmArsipNaskah from "../controller_features/ORM/OrmArsipNaskah.js";
import viewArsipNaskah from "../controller_features/arsipnaskah/viewArsipNaskah.js";
// import DesainNaskahSoalController from "../controller_features/arsip_naskah/DesainNaskahController.js";
import { stringToDom } from "../views/components/doms.js";
import ArsipNaskahController from "../controller_features/arsip_naskah/ArsipNaskahController.js";
import PropertiNaskah from "../controller_features/arsip_naskah/PropertiNaskah.js";
import ArsipNaskahToKbm from "../controller_features/arsip_naskah/ArsipNaskahToKbm.js";
import ValidatorKbmDatamateri from "../controller_features/arsip_naskah/ValidatorKbmDatamateri.js";
import CreateNaskahSoal from "../controller_features/arsip_naskah/CreateNaskahSoal.js";
import { durasiHari, durasiMenit } from "../utilities/FormatTanggal.js";
// import NaskahSoal from "../domains/NaskahSoal.js";

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
        this.devedencyInjection = {};
    }
    get paramMapelCurrentJenjang (){
        let tinggiRendah = this.fokusJenjang>2?'tinggi':'rendah';;
        return 'mapel'+this.App.JenisKurikulum[this.fokusJenjang]+ tinggiRendah;;
    }
    get currentFaseKey(){
        return this.App.faseKey[this.fokusJenjang];
    }
    get currentFaseName(){
        return this.App.faseNameTeks[this.fokusJenjang]
    }
    init(nameClassesFunctions){
        const { ModalConfig,
                mapelkdcp_kurikulum,
                ParameterAppScript,
                CollectionsEdu,
                ToolbarCreateItemSoal,
                ValidatorItemSoal,
                EditorCreateItemSoal
            } = nameClassesFunctions;
        this.devedencyInjection = nameClassesFunctions;
        //instansiasi dari class yang dikirim;
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
        this.parameterAppScript = this.makeInstance(ParameterAppScript,[this.service.repo, this.App.faseKey]);
        
        //variabel

        this.fnc_mapelByJenjang = mapelkdcp_kurikulum;
        
        // class untuk kebutuhan diinstansiasi buat itemsoal;
        this.classCollectionsEdu    = CollectionsEdu;
        // this.OrmKurikulumSoal       = OrmKurikulumSoal,
        this.ToolbarCreateItemSoal  = ToolbarCreateItemSoal,
        this.ValidatorItemSoal      = ValidatorItemSoal,
        this.EditorCreateItemSoal   = EditorCreateItemSoal

        
        //paramater untuk dikirimkan ke appscript;
        this.service.api_desainsimpansoal = this.parameterAppScript.api_desainsimpansoal;
        this.service.api_banksoal = this.parameterAppScript.api_banksoal;
        this.service.api_materi = this.parameterAppScript.api_datamateri;
        
    }
    fn_parameterMustSended(paramHasCalled){
        return paramHasCalled.filter(s=>!this.service.data.hasOwnProperty(s.tabdb));
    }
    
    async item_soal(){
        this.parameterAppScript.fokusJenjang = this.fokusJenjang;
        
        const arrayTab = this.parameterAppScript[this.fokusMenu]();
        const arrayReduce = this.fn_parameterMustSended(arrayTab);

        //data yang dibutuhkan
        Object.assign(this.service.data, {
            koleksimapel: this.fnc_mapelByJenjang[this.paramMapelCurrentJenjang]()
            });
        
        
        if(arrayReduce.length>0){
            await this.service.readMultipleTab(arrayReduce);
        }
        
        //tampilkan kontrol
        /** 
         * untuk bisa menampilkan kontrol, butuh data sebagai berikut:
         * - koleksimapel;
         * - kurikulumnya, OrmKurikulum;
         * - pilihan teks editor
         */

        const orm                       = new OrmKurikulumSoal (this.classCollectionsEdu ,this.service.data, this.currentFaseKey,this.fokusJenjang);
        const toolbar                   = new this.ToolbarCreateItemSoal(orm);
        
        
        toolbar.user(this.Auth)
            .jenjang(this.fokusJenjang)
            .bentuksoal(koleksiBentukSoal)
            .taksonomibloom(this.service.data.taksonomibloom)
            .view(controlbanksoal)
            .renderHTMLTo(this.maincontrol)
            .selectorDataElement()
            .paramUploadMedia({folder:'Gambar Media Soal'})
            .runtime((praproperti)=>{
                new this.EditorCreateItemSoal()
                    .praDesain(praproperti)
                    .workplace(this.workplace)
                    .urlImg(this.urlImg)
                    .service(this.service)
                    .auth(this.Auth)
                    .view(controlbanksoal)
                    .build()
                    .runtime((data)=>{
                        const save = document.getElementById('simpanItemSoal');
                        const reset = document.getElementById('resetItemSoal');
                        
                        save.onclick = async()=>{
                            save.classList.add('d-none');
                            let req = new this.ValidatorItemSoal(data);
                            req.init();
                            if(req.validatingRequest()){
                                let cek = await req.domain();
                                
                                await this.service.simpanItemSoal(cek);
                                save.classList.remove('d-none');
                                data.reset();
                            }else{
                                save.classList.remove('d-none');

                                let teks = "Item soal belum siap, silakan lengkapi bagian berikut:\n";
                                let datainvladi = req.arrayKeyInvalid();

                                datainvladi.forEach(n=>{
                                    teks+=n;
                                    teks+="\n";
                                })
                                alert(teks);
                            }
                        };
                        reset.onclick = ()=>{
                            if(save.classList.contains('d-none')){
                                save.classList.remove('d-none');
                            };
                            
                            data.reset();
                            
                        }
                    });
            })
            .execute();
    }
    async desain_naskah(){
        //tentukan parameter AppScript karena pengaruh rombel/jenjang;
        this.parameterAppScript.fokusJenjang = this.fokusJenjang;
        
        // buat paramater database yang akan dipanggil, filter db yang telah dipanggil agar tidak usah dipanggil lagi
        const arrayTab = this.parameterAppScript[this.fokusMenu]();
        const arrayReduce = this.fn_parameterMustSended(arrayTab);
        
        //tiap kelas memiliki mapel yang berbeda. Misalnya mapel IPAS ada hanya di kelas tinggi
        Object.assign(this.service.data, {
            koleksimapel: this.fnc_mapelByJenjang[this.paramMapelCurrentJenjang]()
            });
        
        //jika ada database yang belum dipanggil, maka panggil;
        if(arrayReduce.length>0){
            await this.service.readMultipleTab(arrayReduce);
        }

        //data yang dibutuhkan untuk desain naskah secara umum;
        const orm               = new OrmKurikulumSoal(this.classCollectionsEdu ,this.service.data, this.currentFaseKey,this.fokusJenjang);
        const toolbar           = new ToolbarCreateDesainNaskah(orm);

        /** @constructor CollectionsEdu */
        let banksoal            = this.makeInstance(this.classCollectionsEdu,[this.service.data.banksoal])
                                    .simpleFilter({'jenjang':this.fokusJenjang})
                                    .setProperty('ilustrasi',(item)=>this.replacingImage(item))
                                    .setProperty('pertanyaan',(item)=>this.replacingImage(item))
                                    .setProperty('opsiA',(item)=>this.replacingImage(item))
                                    .setProperty('opsiB',(item)=>this.replacingImage(item))
                                    .setProperty('opsiC',(item)=>this.replacingImage(item))
                                    .setProperty('opsiD',(item)=>this.replacingImage(item))
                                    .setProperty('penskoran',(item)=>this.replacingImage(item));

        //Buat instansiasi PropertiNaskahSoal (singleton pattern di method controller ini)
        let instancesPropertiNaskah = this.makeInstance(PropertiNaskah,[banksoal.data]);
        instancesPropertiNaskah.currentMapelOnClassRoom = this.service.data.koleksimapel;
            
        //setting modal secara default. Terutama modal yang berkaitan dengan cetak
        this.Modal1.showHideFooter(false);
        this.Modal1.body.classList.remove('p-0');


        /**
         * membuat toolbar desain naskah dan setiap event-event di element form-nya
         * method event dijalankan secara realtime, dan diteruskan menjadi callback
         * pada method 'runtime'
         */
        toolbar.user(this.Auth) 
            .service(this.service)
            .jenjang(this.fokusJenjang)
            .view(viewDesainNaskah)
            .bentuksoal(koleksiBentukSoal)
            .dbbanksoal(banksoal.simpleFilter({'jenjang':this.fokusJenjang,'hapus':''}).data)
            .renderHTMLTo(this.maincontrol)
            .registerListenerElemenPraDesain()
            .registrasiListenerKerangka()
            .registrasiDraft()   
            .runtime((pradesain)=>{
                
                const create = new CreateNaskahSoal()
                    .user(this.Auth)
                    .modal(this.Modal)
                    .areakerja(this.workplace)
                    .methodControllers({
                        'makeInstance': this.makeInstance,
                        'replacingImage':this.replacingImage,
                        'urlimg'    :this.urlImg
                    })
                    .injectOrm({
                        orm:orm,
                        banksoal:banksoal,
                        instancesPropertiNaskah:instancesPropertiNaskah
                    })
                    .injectClass({
                        'BuildHtmlNaskah'           :BuildHtmlNaskah,
                        'ClickableNaskah'           :ClickableNaskah,
                        'ControlSoalReplacing'      :ControlSoalReplacing,
                        'PaginationAvailableSoal'   :PaginationAvailableSoal,
                        'ReplacingSoalToSel'        :ReplacingSoalToSel,
                        'ToolbarCreateItemSoal'     :this.ToolbarCreateItemSoal,
                        'EditorCreateItemSoal'      :this.EditorCreateItemSoal,
                        'PropertiNaskah'            :PropertiNaskah,
                        'ValidatorItemSoal'          :this.ValidatorItemSoal,
                        'FormulirEditItemSoal'      :FormulirEditItemSoal,
                        'classCollectionsEdu'         :this.classCollectionsEdu
                    })
                    .serv(this.service)
                    .kelas(this.fokusJenjang)
                    .injectViews({
                        viewDesainNaskah:viewDesainNaskah,
                        koleksiBentukSoal:koleksiBentukSoal,
                        controlbanksoal:controlbanksoal
                    })
                    .init(pradesain);
                    
                /**
                 * registered btns final
                 */
                const btnKisiKisi = document.getElementById("btnLihatKisikisiDesain");
                const btnKisiKisiView = document.getElementById("btnLihatKisikisiDesainView");
                const kuncijawaban = document.getElementById("btnLihatKunciJawaban");
                const simpanserverDesain = document.getElementById("btnSimpanServerDesain");
                const btnSimpanDraft = document.getElementById("btnSimpanDraft");
                
                if(pradesain.kerangka.length == 0 || pradesain.judulnaskah =="") return;
                btnKisiKisi.onclick = ()=>{
                    instancesPropertiNaskah = create.newInstancePropertiNaskah;
                    let data = instancesPropertiNaskah.desainFromPraDesain(pradesain,this.Auth).datakisikisi();
                        
                        this.Modal1.widthOrientation(true);
                        this.Modal1.settingHeder('KISI-KISI ' + pradesain.judulnaskah.toUpperCase());
                        this.Modal1.showBodyHtml(viewSoal.htmlkisikisi(data.identitas,data.generate));
                        this.Modal1.show();
                        //registrasikan tombol print pada modal1;
                        this.printableModal1(pradesain.judulnaskah);
                        
                }
                btnKisiKisiView.onclick = ()=>{
                    this.Modal1.widthOrientation(true);
                    instancesPropertiNaskah = create.newInstancePropertiNaskah;
                    let data = instancesPropertiNaskah.desainFromPraDesain(pradesain,this.Auth).datakisikisi();
                    
                    this.Modal1.settingHeder('KISI-KISI DAN SOAL ' + pradesain.judulnaskah.toUpperCase())
                    this.Modal1.showBodyHtml(viewSoal.htmlkisikisi(data.identitas,data.datadom.datasoal,true));
                    this.Modal1.show();
                    //registrasikan tombol print pada modal1;
                    this.printableModal1(pradesain.judulnaskah);
                }
                kuncijawaban.onclick = ()=>{
                    this.Modal1.widthOrientation(false);
                    instancesPropertiNaskah = create.newInstancePropertiNaskah;
                    let data = instancesPropertiNaskah.desainFromPraDesain(pradesain,this.Auth).datakisikisi();
                    
                    
                    this.Modal1.settingHeder('KUNCI JAWABAN NASKAH ' + pradesain.judulnaskah.toUpperCase())
                    this.Modal1.showBodyHtml(viewSoal.htmlkuncijawaban(data.identitas,data.datadom.datasoal));
                    this.Modal1.show();
                    //registrasikan tombol print pada modal1;
                    this.printableModal1(pradesain.judulnaskah);
                }
                btnSimpanDraft.onclick = ()=>{
                    instancesPropertiNaskah = create.newInstancePropertiNaskah;
                    let data = instancesPropertiNaskah.desainFromPraDesain(pradesain,this.Auth).datakisikisi();
                    let html = data.datadom.datanaskah;
                    let datalocal = {
                        pradesain:pradesain,
                        html:html
                    };
                    window.localStorage.setItem('draftnaskah_'+this.fokusJenjang,JSON.stringify(datalocal));
                    alert('Draft berhasil disimpan');
        
                }
                
                simpanserverDesain.classList.remove('d-none');
                simpanserverDesain.onclick = async()=>{
                    simpanserverDesain.classList.add('d-none');
                    instancesPropertiNaskah = create.newInstancePropertiNaskah;
                    let datanaskah = instancesPropertiNaskah.desainFromPraDesain(pradesain,this.Auth).datakisikisi();
                    let cek = new ValidatorDesainNaskah().pradesainNaskah(pradesain).auth(this.Auth).fromDesainNaskah(datanaskah).init();
                    
                    if(!cek.bolValid){
                        alert(cek.massageInvalid);
                        simpanserverDesain.classList.remove('d-none');
                        return;
                    }
                    
                    const dataspreadsheet = await cek.domain();
                    const html = this.workplace.innerHTML;//this.workplace.cloneNode(true).innerHTML;
                    await this.service.simpanDesainNaskah(dataspreadsheet,html);

                    
                    //response
                    this.workplace.innerHTML = 'Berhasil';
                    document.querySelector('.elementdraft').innerHTML = 'Tidak ada Draft Naskah yang Anda disimpan di Perangkat ini.';
                    
                    //hapus draft
                    window.localStorage.removeItem('draftnaskah_'+this.fokusJenjang);

                    //nonaktifkan fungsi buttons di footer;
                    btnKisiKisi.onclick = null;
                    btnKisiKisiView.onclick = null;
                    kuncijawaban.onclick = null;
                    btnSimpanDraft.onclick = null;
                    
                }
            
            }).execute();
    }
    async arsip_naskah(){
        //tentukan parameter AppScript karena pengaruh rombel/jenjang;
        this.parameterAppScript.fokusJenjang = this.fokusJenjang;
        
        // buat paramater database yang akan dipanggil, filter db yang telah dipanggil agar tidak usah dipanggil lagi
        const arrayTab = this.parameterAppScript[this.fokusMenu]();
        const arrayReduce = this.fn_parameterMustSended(arrayTab);
        
        //tiap kelas memiliki mapel yang berbeda. Misalnya mapel IPAS ada hanya di kelas tinggi
        Object.assign(this.service.data, {
            koleksimapel: this.fnc_mapelByJenjang[this.paramMapelCurrentJenjang]()
            });
        
        //jika ada database yang belum dipanggil, maka panggil;
        if(arrayReduce.length>0){
            await this.service.readMultipleTab(arrayReduce);
        }
        
        const ormKurikulum              = new OrmKurikulumSoal(this.classCollectionsEdu ,this.service.data, this.currentFaseKey,this.fokusJenjang);
        
        /** Orm Bank Soal */
        const ormBankSoal = new OrmBankSoal(this.classCollectionsEdu, this.replacingImage)
                                .parent(this.service.data.banksoal)
                                .init();
        ormBankSoal.withOrm('kurikulum',ormKurikulum.collections,'kd','idbaris');

        let instancesPropertiNaskah = this.makeInstance(PropertiNaskah,[ormBankSoal.data]);
        instancesPropertiNaskah.currentMapelOnClassRoom = this.service.data.koleksimapel;
        /** Orm Naskah */
        const ormDesainNaskah = new OrmArsipNaskah(this.classCollectionsEdu, this.replacingImage)
                                .parent(this.service.data.simpandesainsoal)
                                .init()
                                .withOrmSpecificQuery('materi', new this.classCollectionsEdu(this.service.data.datamateri),{'id_desainnaskah':'idbaris','idtoken':'jenjang',})
                                .isOwner(this.Auth)
                                .settingOwnerToSpecificOrm('materi')
                                .relationNoSoal(ormBankSoal.collections)
                                
                                
        
        /** view */
        let htmlApi = {};
        new ArsipNaskahController(ormDesainNaskah.collections)
            .selectJenjang(this.fokusJenjang)
            .instansiasiClass({tooltip:this.App.tooltipkan})
            .renderTable()
            .runtime(async (data)=>{
                const {aksi,desainnaskahsoal,arrayKbm} = data;
                let idTxtSimpanDesain = desainnaskahsoal.html_soal;
                
                document.getElementById('footerarea').innerHTML  =""
                if(aksi == 'at_naskah'){
                    if(!htmlApi.hasOwnProperty(idTxtSimpanDesain)){
                        htmlApi[idTxtSimpanDesain] = await this.service.showTextHTML(idTxtSimpanDesain)
                    }
                    
                    
                    let html = this.replacingImage(htmlApi[idTxtSimpanDesain]);
                        this.Modal1.body.classList.remove('p-0');
                        this.Modal1.widthOrientation(false);
                        this.Modal1.settingHeder('PRATINJAU NASKAH ONLINE <br>' + desainnaskahsoal.juduldesain.toUpperCase())
                        this.Modal1.showBodyHtml(viewArsipNaskah.viewModal(html));
                        this.Modal1.showHideFooter(false);
                        this.Modal1.show();
                        this.printableModal1(desainnaskahsoal.juduldesain);
                }else if(aksi=='at_kisi'){
                    if(!htmlApi.hasOwnProperty(idTxtSimpanDesain)){
                        htmlApi[idTxtSimpanDesain] = await this.service.showTextHTML(idTxtSimpanDesain)
                    }
                    
                    let api = htmlApi[idTxtSimpanDesain]
                    let dom = stringToDom(api);
                    
                    /** querySelector elemen dom untuk mendeteksi keberadaan properti naskah */
                    instancesPropertiNaskah.domNaskah = dom;
                    instancesPropertiNaskah.desainFromSpreadSheet(desainnaskahsoal,this.Auth);
                    
                    /**
                     * @return Array Objects
                     * <description>
                     * {datadom :<Array>[<object>{datasoal:<Array>[<object>{noByBentuk:<string>'Pilihan Ganda', noSoal:<number>1}]}],
                     *  generate : <Array Object>,
                     *  identitas: Object}
                     * 
                     */
                    let datakisikisi = instancesPropertiNaskah.datakisikisi();
                    
                    this.Modal1.body.classList.remove('p-0');
                    this.Modal1.widthOrientation(true);
                    this.Modal1.settingHeder('PRATINJAU KISI-KISI<br> ' + desainnaskahsoal.juduldesain.toUpperCase())
                    this.Modal1.showBodyHtml(viewSoal.htmlkisikisi(datakisikisi.identitas,datakisikisi.generate));
                    this.Modal1.showHideFooter(false);
                    this.Modal1.show();
                    this.printableModal1(desainnaskahsoal.juduldesain);
                }else if(aksi=='at_kisisoal'){
                    if(!htmlApi.hasOwnProperty(idTxtSimpanDesain)){
                        htmlApi[idTxtSimpanDesain] = await this.service.showTextHTML(idTxtSimpanDesain)
                    }
                    
                    let dom = stringToDom(htmlApi[idTxtSimpanDesain]);
                    
                    instancesPropertiNaskah.domNaskah = dom;
                    instancesPropertiNaskah.desainFromSpreadSheet(desainnaskahsoal,this.Auth);
                    
                    let datakisikisi =instancesPropertiNaskah.datakisikisi();
                    
                    this.Modal1.body.classList.remove('p-0');
                    this.Modal1.widthOrientation(true);
                    this.Modal1.settingHeder('PRATINJAU KISI-KISI<br> ' + desainnaskahsoal.juduldesain.toUpperCase())
                    this.Modal1.showBodyHtml(viewSoal.htmlkisikisi(datakisikisi.identitas,datakisikisi.datadom.datasoal,true))
                    this.Modal1.showHideFooter(false);
                    this.Modal1.show();
                    this.printableModal1(desainnaskahsoal.juduldesain);
                }else if(aksi=='at_kuncijawaban'){
                    if(!htmlApi.hasOwnProperty(idTxtSimpanDesain)){
                        htmlApi[idTxtSimpanDesain] = await this.service.showTextHTML(idTxtSimpanDesain)
                    }
                    let dom = stringToDom(htmlApi[idTxtSimpanDesain]);
                    
                    instancesPropertiNaskah.domNaskah = dom;
                    instancesPropertiNaskah.desainFromSpreadSheet(desainnaskahsoal,this.Auth);
                    
                    let datakisikisi =instancesPropertiNaskah.datakisikisi();
                    
                    this.Modal1.body.classList.remove('p-0');
                    this.Modal1.widthOrientation(false);
                    this.Modal1.settingHeder('KUNCI JAWABAN<br> ' + desainnaskahsoal.juduldesain.toUpperCase())
                    this.Modal1.showBodyHtml(viewSoal.htmlkuncijawaban(datakisikisi.identitas,datakisikisi.datadom.datasoal));
                    this.Modal1.showHideFooter(false);
                    this.Modal1.show();
                    this.printableModal1(desainnaskahsoal.juduldesain);
                }else if(aksi=='at_naskahoffline'){
                    if(!htmlApi.hasOwnProperty(idTxtSimpanDesain)){
                        htmlApi[idTxtSimpanDesain] = await this.service.showTextHTML(idTxtSimpanDesain);
                        
                    }
                    
                    let dom = stringToDom(htmlApi[idTxtSimpanDesain]);
                    
                    instancesPropertiNaskah.domNaskah = dom;
                    instancesPropertiNaskah.desainFromSpreadSheet(desainnaskahsoal,this.Auth);
                    
                    let datakisikisi =instancesPropertiNaskah.datakisikisi();
                    let view = viewSoal.templateNaskahOffline(dom,datakisikisi.datadom.datanaskah);
                    
                    this.Modal1.body.classList.remove('p-0');
                    this.Modal1.showHideFooter(false);
                    this.Modal1.widthOrientation(false);
                    this.Modal1.settingHeder('NASKAH OFFLINE '+desainnaskahsoal.juduldesain.toUpperCase());
                    this.Modal1.showBodyHtml(viewArsipNaskah.viewModal(view));
                    this.Modal1.show();
                    this.printableModal1(desainnaskahsoal.juduldesain);
                }else if(aksi=='at_publikasikan'){
                    if(!htmlApi.hasOwnProperty(idTxtSimpanDesain)){
                        htmlApi[idTxtSimpanDesain] = await this.service.showTextHTML(idTxtSimpanDesain)
                    }

                    let api = this.replacingImage(htmlApi[idTxtSimpanDesain]);
                    let dom = stringToDom(api);
                    
                    instancesPropertiNaskah.domNaskah = dom;
                    // instancesPropertiNaskah.desainFromSpreadSheet(desainnaskahsoal,this.Auth);
                    
                    new ArsipNaskahToKbm()
                        .fromInstansiasiPropertiNaskah(instancesPropertiNaskah)
                        .auth(this.Auth)
                        .desainFromSimpanDesainSoal(desainnaskahsoal)
                        .jenjang(this.fokusJenjang)
                        .htmlTxt(api)
                        .ControlAddPublicationNaskahTo(this.Modal1.body)
                        .runtime((datakbm)=>{
                            
                            const btnSave = document.getElementById('btnServerPublikasi');
                            btnSave.onclick =async()=>{
                                btnSave.classList.add('d-none');
                                
                                let media = datakbm.htmlsoal;
                                let ss = new ValidatorKbmDatamateri().paramaterClass(datakbm);
                                let entiti = await ss.domain();
                                await this.service.simpanDataMateriKbm(entiti,media);
                                btnSave.classList.remove('d-none');
                                this.Modal1.hide();
                                this.arsip_naskah();
                            }
                        })
                        .execute();
                    this.Modal1.body.classList.add('p-0');
                    this.Modal1.widthOrientation(false);
                    this.Modal1.settingHeder('TAMBAH PUBLIKASI<br> ' + desainnaskahsoal.juduldesain.toUpperCase())
                    this.Modal1.showHideFooter(false);
                    
                    this.Modal1.show();
                
                }else if(aksi=='at_editpublikasi'){
                    idTxtSimpanDesain = arrayKbm[0].idmateri;
                    
                    if(!htmlApi.hasOwnProperty(idTxtSimpanDesain)){
                        htmlApi[idTxtSimpanDesain] = await this.service.showTextHTML(idTxtSimpanDesain)
                    }

                    let api = this.replacingImage(htmlApi[idTxtSimpanDesain]);
                    let dom = stringToDom(api);
                    
                    instancesPropertiNaskah.domNaskah = dom;
                    // instancesPropertiNaskah.desainFromSpreadSheet(desainnaskahsoal,this.Auth);
                    
                    new ArsipNaskahToKbm()
                        .fromInstansiasiPropertiNaskah(instancesPropertiNaskah)
                        .auth(this.Auth)
                        .desainFromSimpanDesainSoal(arrayKbm[0])
                        .jenjang(this.fokusJenjang)
                        .htmlTxt(api)
                        .ControlEditPublicationKbmNaskahTo(this.Modal1.body)
                        .runtime((datakbm)=>{
                            const btnSave = document.getElementById('btnServerEditPublikasi');
                            const btnHapus = document.getElementById('btnServerHapustPublikasi');
                            
                            btnSave.onclick =async()=>{
                                let arraykelas = datakbm.arraykelas =='';
                                if(arraykelas){
                                    let konf = confirm('Anda mengedit dengan menghilangkan kelas/rombel yang akan melaksanakan KBM dari naskah ini. KBM tidak akan tampil di kelas manapun (kecuali Anda sengaja untuk menghapus KBM dari naskah ini). Lanjutkan?');
                                    if(!konf) return;
                                    
                                }
                                btnSave.classList.add('d-none');
                                btnHapus.classList.add('d-none');
                                this.Modal1.hide();
                                
                                let ss = new ValidatorKbmDatamateri().paramaterClass(datakbm);
                                let entiti = await ss.domain();
                                await this.service.EditKbm(entiti);
                                btnSave.classList.remove('d-none');
                                btnHapus.classList.remove('d-none');
                                this.arsip_naskah();
                            }
                            btnHapus.onclick =async()=>{
                                let conf = confirm('Anda yakin akan menghapus KBM di seluruh kelas yang mengikuti?');
                                if(!conf) return;
                                btnSave.classList.add('d-none');
                                btnHapus.classList.add('d-none');
                                this.Modal1.hide();
                                datakbm.idtoken = '';
                                datakbm.crtToken = '';

                                let ss = new ValidatorKbmDatamateri().paramaterClass(datakbm);
                                let entiti = await ss.domain();
                                await this.service.EditKbm(entiti);
                                btnSave.classList.remove('d-none');
                                btnHapus.classList.remove('d-none');
                                this.arsip_naskah();
                            }
                        }).executeEdit();
                    this.Modal1.body.classList.add('p-0');
                    this.Modal1.widthOrientation(false);
                    this.Modal1.settingHeder('TAMBAH PUBLIKASI<br> ' + desainnaskahsoal.juduldesain.toUpperCase())
                    this.Modal1.showHideFooter(false);
                    
                    this.Modal1.show();
                
                }else if(aksi == 'at_hapus'){
                    let hasMateriKbm = desainnaskahsoal.materi.countData() === 0;
                    let konfir = ''
                    konfir+='Anda yakin akan menghapus Arsip Desain naskah ini?';
                    
                    if(!hasMateriKbm){
                        konfir+='\n\r Naskah ini telah Anda jadikan konten KBM yang telah Anda/teman sejawat Anda publikasikan.'
                        // alert('Anda tidak bisa mengedit naskah ini karena telah dijadikan refrensi Naskah KBM yang akan Anda/kelas laksanakan. Fitur ini berlaku untuk mengedit Arsip Naskah ketika belum dipublikasikan.\n\r\nAnda masih tetap bisa mengedit naskah KBM di fitur KBM');
                        
                    };
                    let conf = confirm(konfir);
                    if(!conf) return;
                    let datahapsu = Object.assign({},desainnaskahsoal,{hapus:'hapus'});
                    const formBody = await new ValidatorDesainNaskah().domainSpreadsheetNaskah(datahapsu);
                    
                    await this.service.EditDesainNaskah(formBody);
                    this.arsip_naskah();
                }else if(aksi == 'at_edit'){
                    let hasMateriKbm = desainnaskahsoal.materi.countData() === 0;
                    
                    if(!hasMateriKbm){
                        alert('Anda tidak bisa mengedit naskah ini karena telah dijadikan refrensi Naskah KBM yang akan Anda/kelas laksanakan. Fitur ini berlaku untuk mengedit Arsip Naskah ketika belum dipublikasikan.\n\r\nAnda masih tetap bisa mengedit naskah KBM di fitur KBM');
                        return;
                    };
                    if(!htmlApi.hasOwnProperty(idTxtSimpanDesain)){
                        htmlApi[idTxtSimpanDesain] = await this.service.showTextHTML(idTxtSimpanDesain)
                    }
                    let api = htmlApi[idTxtSimpanDesain]
                    let dom = stringToDom(api);
                    
                    instancesPropertiNaskah.domNaskah = dom;
                    instancesPropertiNaskah.desainFromSpreadSheet(desainnaskahsoal,this.Auth);
                    let kerangkadom =instancesPropertiNaskah.datasoaldaridom();
                    
                    let durasi = durasiMenit(new Date(desainnaskahsoal.waktu2), new Date(desainnaskahsoal.waktu2_end))
                    let pradesain = Object.assign({},instancesPropertiNaskah.desain,{
                        durasi:durasi,
                        judulnaskah:desainnaskahsoal.kop,
                        html:kerangkadom.datanaskah
                        // kerangka:
                    });
                    
                    document.getElementById('footerarea').innerHTML  = viewDesainNaskah.tombolCreateDesainEdit();
                    const create = new CreateNaskahSoal()
                    .user(this.Auth)
                    .modal(this.Modal)
                    .areakerja(this.workplace)
                    .methodControllers({
                        'makeInstance': this.makeInstance,
                        'replacingImage':this.replacingImage,
                        'urlimg'    :this.urlImg
                    })
                    .injectOrm({
                        orm:ormKurikulum,
                        banksoal:ormBankSoal.collections,
                        instancesPropertiNaskah:instancesPropertiNaskah
                    })
                    .injectClass({
                        'BuildHtmlNaskah'           :BuildHtmlNaskah,
                        'ClickableNaskah'           :ClickableNaskah,
                        'ControlSoalReplacing'      :ControlSoalReplacing,
                        'PaginationAvailableSoal'   :PaginationAvailableSoal,
                        'ReplacingSoalToSel'        :ReplacingSoalToSel,
                        'ToolbarCreateItemSoal'     :this.ToolbarCreateItemSoal,
                        'EditorCreateItemSoal'      :this.EditorCreateItemSoal,
                        'PropertiNaskah'            :PropertiNaskah,
                        'ValidatorItemSoal'          :this.ValidatorItemSoal,
                        'FormulirEditItemSoal'      :FormulirEditItemSoal,
                        'classCollectionsEdu'         :this.classCollectionsEdu
                    })
                    .serv(this.service)
                    .kelas(this.fokusJenjang)
                    .injectViews({
                        viewDesainNaskah:viewDesainNaskah,
                        koleksiBentukSoal:koleksiBentukSoal,
                        controlbanksoal:controlbanksoal
                    })
                    .init(pradesain);
                    const btnkembali = document.getElementById("kembalikearsipnaskah");
                    const btnKisiKisi = document.getElementById("btnLihatKisikisiDesain");
                    const btnKisiKisiView = document.getElementById("btnLihatKisikisiDesainView");
                    const kuncijawaban = document.getElementById("btnLihatKunciJawaban");
                    const simpanserverDesain = document.getElementById("btnSimpanServerDesain");
                    const btnSimpanDraft = document.getElementById("btnSimpanDraft");
                    
                    btnkembali.onclick = async()=>await this.arsip_naskah()
                    if(pradesain.kerangka.length == 0 || pradesain.judulnaskah =="") return;
                    this.Modal1.body.classList.remove('p-0')
                    btnKisiKisi.onclick = ()=>{
                        instancesPropertiNaskah = create.newInstancePropertiNaskah;
                        let data = instancesPropertiNaskah.desainFromPraDesain(pradesain,this.Auth).datakisikisi();
                            this.Modal1.widthOrientation(true);
                            this.Modal1.settingHeder('KISI-KISI ' + pradesain.judulnaskah.toUpperCase());
                            this.Modal1.showBodyHtml(viewSoal.htmlkisikisi(data.identitas,data.generate));
                            this.Modal1.show();
                            this.printableModal1(pradesain.judulnaskah);
                    }
                    btnKisiKisiView.onclick = ()=>{
                        this.Modal1.widthOrientation(true);
                        instancesPropertiNaskah = create.newInstancePropertiNaskah;
                        let data = instancesPropertiNaskah.desainFromPraDesain(pradesain,this.Auth).datakisikisi();

                        this.Modal1.settingHeder('KISI-KISI DAN SOAL ' + pradesain.judulnaskah.toUpperCase())
                        this.Modal1.showBodyHtml(viewSoal.htmlkisikisi(data.identitas,data.datadom.datasoal,true));
                        this.Modal1.show();
                        this.printableModal1(pradesain.judulnaskah);
                    }
                    kuncijawaban.onclick = ()=>{
                        this.Modal1.widthOrientation(false);
                        instancesPropertiNaskah = create.newInstancePropertiNaskah;
                        let data = instancesPropertiNaskah.desainFromPraDesain(pradesain,this.Auth).datakisikisi();
                        
                        this.Modal1.settingHeder('KUNCI JAWABAN NASKAH ' + pradesain.judulnaskah.toUpperCase())
                        this.Modal1.showBodyHtml(viewSoal.htmlkuncijawaban(data.identitas,data.datadom.datasoal));
                        this.Modal1.show();

                        //registrasikan tombol print pada modal1;
                        this.printableModal1(pradesain.judulnaskah);
                    }
                    btnSimpanDraft.onclick = ()=>{
                        instancesPropertiNaskah = create.newInstancePropertiNaskah;
                        let data = instancesPropertiNaskah.desainFromPraDesain(pradesain,this.Auth).datakisikisi();
                        let html = data.datadom.datanaskah;
                        let datalocal = {
                            pradesain:pradesain,
                            html:html
                        };
                        window.localStorage.setItem('draftnaskah_'+this.fokusJenjang,JSON.stringify(datalocal));
                        alert('Draft berhasil disimpan');
                    }
                    
                    simpanserverDesain.classList.remove('d-none');
                    simpanserverDesain.onclick = async()=>{
                        simpanserverDesain.classList.add('d-none');
                        
                        instancesPropertiNaskah = create.newInstancePropertiNaskah;
                    let datanaskah = instancesPropertiNaskah.desainFromPraDesain(pradesain,this.Auth).datakisikisi();
                    let cek = new ValidatorDesainNaskah().pradesainNaskah(pradesain).auth(this.Auth).fromDesainNaskah(datanaskah).init();
                    
                    if(!cek.bolValid){
                        alert(cek.massageInvalid);
                        simpanserverDesain.classList.remove('d-none');
                        return;
                    }
                    
                    const dataspreadsheet = await cek.domain();
                        let gab = Object.assign({},desainnaskahsoal, dataspreadsheet)
                        
                        const html = this.workplace.innerHTML;//this.workplace.cloneNode(true).innerHTML;
                        
                        await this.service.editDesainNaskahMedia(gab,html);

                        //response
                        this.workplace.innerHTML = 'Berhasil';
                        
                        window.localStorage.removeItem('draftnaskah_'+this.fokusJenjang);

                        //nonaktifkan fungsi buttons di footer;
                        btnKisiKisi.onclick = null;
                        btnKisiKisiView.onclick = null;
                        kuncijawaban.onclick = null;
                        btnSimpanDraft.onclick = null;
                        document.getElementById('footerarea').innerHTML  =""
                        this.arsip_naskah()
                    }

                }else if(aksi== 'at_hapuspublikasi'){
                    let kon = confirm('Anda yakin?');
                    if(!kon) return;
                    const datakbm = arrayKbm[0];
                    datakbm.idtoken='';
                    datakbm.idkelas='';
                    datakbm.id_desainnaskah='';
                    let ss = new ValidatorKbmDatamateri().paramaterClass(datakbm);
                            let entiti = await ss.domain();
                            await this.service.EditKbm(entiti);
                            this.arsip_naskah();
                }
            })
    }
}