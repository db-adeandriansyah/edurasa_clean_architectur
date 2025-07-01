import IjazahFitur from "../controller_features/ijazah/IjazahFitur";
import IjazahFiturKurmer from "../controller_features/ijazah/IjazahFiturKurmer";
import KbmFitur from "../controller_features/kbm/KbmFitur";
import OrmMapel from "../controller_features/mapel/OrmMapel";
import viewOrmMapel from "../controller_features/mapel/viewOrmMapel";
import { StatistikRangking } from "../controller_features/rapor/StatistikRangking";
import viewRapor from "../controller_features/raport/viewRapor";
import { ImportControllerMultipleHeader } from "../controller_features/uploadCsv/ImportControllerMultipleHeader";
import { FormatTanggal, ModalConfig, TableProperties } from "../entries/vendor";
import garuda from "../img/garuda_pancasila.svg";
import tut_wuri_handayani from '../img/tut_wuri_handayani_higher_resolutions.png';
import RiwayatController from "../riwayat_raport/RiwayatController";
// import RiwayatController from "../riwayat/RiwayatController";
import kopsuratEdurasa from "../views/surat/kopsurat";
import Fitur from "./Fitur";

export default class RaporIjazahController extends Fitur{
    #judulHalaman;
    constructor(app,service){
        super(app);
        this.service = service;
        this.#judulHalaman = '';
        this.controlRombel(true);
        this.kbmFitur = null;
        this.ormMapel = null;
        this.siswa = [];
        this.reload = null;
        this.arrayReload = [];
        this.controlApi = [];
        this.dataTabMundurSatu = [];
        this.instanceOlahIjazah = null;
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
    init(){
        
        let ls_siswa = JSON.parse(window.localStorage.getItem('dbSiswa'));
        this.siswa = ls_siswa.filter(s=> s.aktif == 'aktif');
        // this.siswa = JSON.parse(window.localStorage.getItem('dbSiswa'));//ls_siswa;//.filter(s=> s.aktif == 'aktif' && s.jenjang == this.fokusJenjang);

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
        this.kbmFitur = this.makeInstance(KbmFitur, [
                this.service,
                document.getElementById('printarea'), 
                document.getElementById('maincontrol'),
                this.Auth,
                this.App.tooltipkan,
                this.siswa
            ]
        );
        this.ormMapel = this.makeInstance(OrmMapel, [
            this.kbmFitur,
            this.Modal,
            this.Modal1
        ]
        );
        this.conditionalSubemenu();
    }
    conditionalSubemenu(){
        
        if(this.ormMapel.isKurmer){
            let radios = document.querySelectorAll('[data-radiomenusidebar="kurtilas"]');
            radios.forEach(n=>n.classList.add('d-none'));
        }else{
            let radios = document.querySelectorAll('[data-radiomenusidebar="kurtilas"]');
            radios.forEach(n=>n.classList.remove('d-none'));
        }
    }
    async new_rekapraport_asli(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.arrayReload.forEach(n=>clearInterval(n));
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_kbmonline();
        
        this.ormMapel.createLabelMapel();
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        
        const mapelNonAgama = this.ormMapel.labelNonAgamaIncludeMulok;
        const sebaranblangko = this.ormMapel.sebaranDariTagihanBlangko();
        const data = this.ormMapel.collectionsSiswa.selectProperties(['id','pd_nama','sebaran_mapel','dataRapor']).data;
        const identitas = {
            'tapel'     : this.Auth.tapel,
            'semester'  : this.Auth.semester,
            'kelas'     : this.fokusRombel,
            'data'      : data,
            'labelMapel': mapelNonAgama,
            'isKurmer'  : this.ormMapel.isKurmer,
            'sebaran'   : sebaranblangko
            
        }
        
        this.workplace.innerHTML = viewRapor.tabelRekapRapor(identitas);
        let tb = new TableProperties(document.querySelector('#tabelnilairapor'));
            tb.freezeColumn([2]);
            tb.addScrollUpDown();
    }
    async new_rekapraport_asli_keterampilan(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.arrayReload.forEach(n=>clearInterval(n));
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        
        this.ormMapel.createLabelMapel();
        this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();
        
        const mapelNonAgama = this.ormMapel.labelNonAgamaIncludeMulok;
        const sebaranblangko = this.ormMapel.sebaranDariTagihanBlangko();
        const data = this.ormMapel.collectionsSiswa.data;//selectProperties(['id','pd_nama','sebaran_mapel','dataRapor','dataRapor_']).data;
        const identitas = {
            'tapel'     : this.Auth.tapel,
            'semester'  : this.Auth.semester,
            'kelas'     : this.fokusRombel,
            'data'      : data,
            'labelMapel': mapelNonAgama,
            'isKurmer'  : this.ormMapel.isKurmer,
            'sebaran'   : sebaranblangko
            
        }
        
        this.workplace.innerHTML = viewRapor.tabelRekapRaporKeterampilan(identitas);
        let tb = new TableProperties(document.querySelector('#tabelnilairapor'));
            tb.freezeColumn([2]);
            tb.addScrollUpDown();
    }
    async new_rekapraport_olahan_keterampilan(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.arrayReload.forEach(n=>clearInterval(n));
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        
        this.ormMapel.createLabelMapel();
        this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();
        
        
        const mapelNonAgama = this.ormMapel.labelNonAgamaIncludeMulok;
        const sebaranblangko = this.ormMapel.sebaranDariTagihanBlangko();
        const data = this.ormMapel.collectionsSiswa.data;//.selectProperties(['id','pd_nama','sebaran_mapel','dataRapor']).data;
        const identitas = {
            'tapel'     : this.Auth.tapel,
            'semester'  : this.Auth.semester,
            'kelas'     : this.fokusRombel,
            'data'      : data,
            'labelMapel': mapelNonAgama,
            'isKurmer'  : this.ormMapel.isKurmer,
            'sebaran'   : sebaranblangko
            
        }
        
        this.workplace.innerHTML = viewRapor.tabelRekapRaporKeterampilan(identitas,true);
        
        let arrayIndex = [3]; // start kolom3;
        let arrayImport = ['id','tokensiswa','namasiswa'];
        mapelNonAgama.forEach((colmp, i_colmp)=>{
            arrayIndex.push((i_colmp+4));
            arrayImport.push(colmp.value);
        });
        arrayImport.push('rerata');
        arrayImport.push('rangking');
        let datarangking = new StatistikRangking(data)
                    .FromTable(document.getElementById('tabelnilairapor'))
                    .fromIndexRerata(arrayIndex)
                    .calculateRerata()
                    .calculateRangking();
        datarangking.fillRerataInIndexColoumn(arrayIndex.length+3);
        datarangking.fillRangkinInIndexColoumn(arrayIndex.length+4);
        let tb = new TableProperties(document.querySelector('#tabelnilairapor'));
            tb.freezeColumn([2]);
            tb.addScrollUpDown();
            this.eventListenerRerataRangking('tabelnilairapor',arrayIndex);
            
        this.configButtonsImportExportKeterampilan('tabelnilairapor',arrayImport,data,arrayIndex,this.fokusMenu);
    }
    async new_rekapraport_olahan(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();

        const mapelNonAgama = this.ormMapel.labelNonAgamaIncludeMulok;
        const sebaranblangko = this.ormMapel.sebaranDariTagihanBlangko();
        const blangko_nilai_rapor = this.service.data['blangko_nilai_raport_'+this.fokusRombel];
        const data = this.ormMapel.collectionsSiswa.selectProperties(['id','pd_nama','sebaran_mapel','dataRapor','dataRapor_Siap']).data;
        const identitas = {
            'tapel'     : this.Auth.tapel,
            'semester'  : this.Auth.semester,
            'kelas'     : this.fokusRombel,
            'data'      : data,
            'labelMapel': mapelNonAgama,
            'isKurmer'  : this.ormMapel.isKurmer,
            'sebaran'   : sebaranblangko,
            'blangkoRapor': blangko_nilai_rapor
            
        }
        
        this.workplace.innerHTML = viewRapor.tabelRekapRapor(identitas,true);
        let arrayIndex = [3]; // start kolom3;
        let arrayImport = ['id','tokensiswa','namasiswa'];
        mapelNonAgama.forEach((colmp, i_colmp)=>{
            arrayIndex.push((i_colmp+4));
            arrayImport.push(colmp.value);
        });
        arrayImport.push('rerata');
        arrayImport.push('rangking');
        let datarangking = new StatistikRangking(data)
                    .FromTable(document.getElementById('tabelnilairapor'))
                    .fromIndexRerata(arrayIndex)
                    .calculateRerata()
                    .calculateRangking();
        datarangking.fillRerataInIndexColoumn(arrayIndex.length+3);
        datarangking.fillRangkinInIndexColoumn(arrayIndex.length+4);
        let tb = new TableProperties(document.querySelector('#tabelnilairapor'));
            tb.freezeColumn([2]);
            tb.addScrollUpDown();
        
        this.eventListenerRerataRangking('tabelnilairapor',arrayIndex);
        this.configButtonsImportExport('tabelnilairapor',arrayImport,data,arrayIndex,'new_rekapraport_olahan');
    };
    eventListenerRerataRangking(idtabel,arrayIndex){
        const domInputNumber = document.querySelectorAll('input[type="number"]');
        domInputNumber.forEach((inputan,i_inputan)=>{
            inputan.oninput = (e)=>{
                let td = e.target.parentElement;
                let tr = td.parentElement;
                /** kasar */
                let datarangking = new StatistikRangking(this.kbmFitur.siswaRombel)
                                .FromTable(document.getElementById(idtabel))
                                .fromIndexRerata(arrayIndex)
                                .calculateRerata()
                                .calculateRangking();
                datarangking.fillRerataInIndexColoumn(arrayIndex.length+3);
                datarangking.fillRangkinInIndexColoumn(arrayIndex.length+4);
                /** selesai kasar */
            }
        })
    }
    
    get predikatDefault (){
        return  [
            {
                min         : 90,
                maks         : 100,
                predikat    : 'Sangat Baik'
            },{
                min         : 80,
                maks         : 90,
                predikat    : 'Baik'
            },
            {
                min         : 70,
                maks         : 80,
                predikat    : 'Cukup'
            },  
            {
                min         : 0,
                maks        : 70,
                predikat    : 'Perlu Bimbingan'
            },
            
        ]
    }
    findPredikatByNilai (nilai){
            this.kbmFitur.refrensi_predikatraport = this.service.data['predikat_'+this.fokusJenjang];
            let array_datapredikat = this.kbmFitur.refrensi_predikatraport;
            let result = [];
            
            if(this.kbmFitur.refrensi_predikatraport.length == 0){
                array_datapredikat = this.predikatDefault;
            }
            
            if(nilai == 0){
                result = [array_datapredikat[array_datapredikat.length-1]];
            }else if(nilai >100){
                result = [array_datapredikat[0]];
            }else if(isNaN(nilai)){
                result = [array_datapredikat[array_datapredikat.length-1]];
            }else if(nilai == undefined){
                result = [array_datapredikat[array_datapredikat.length-1]];
            }else{
                result = array_datapredikat.filter(s=> s.min < nilai && s.maks >= nilai);
                if(result.length==0){
                    result = [ {
                        min         :   0,
                        maks         :  0,
                        predikat    : 'Cukup'
                    }]
                };
            }
    
            return result[0];
            //item.predikatDefault.filter(s=>s.min < parseFloat(max_onlytabtagihan) && s.max >= parseFloat(max_onlytabtagihan));
    
        
    }
    configButtonsImportExport(idtabel='tabelnilairapor',keytabel,data,arrayIndex,methodreturn){
        const btnExport = document.querySelector('[data-klik="exportExcel"]');
        const importXl = document.getElementById('importModal');
        const btnSave = document.querySelector('[data-klik="simpanserver"]')
        if(btnExport){
            btnExport.onclick = ()=>{
    
                // this.excelDom(this.workplace,'#rekap_rapor_all','Export data Nilai Pengolahan Rapor');
                // const tabel = document.getElementById(idtable);
                // const b_tabel = tabel.querySelector('tbody');
                // let dom= this.shadowTable(b_tabel);
                // let temp = document.createDocumentFragment();
                // temp.appendChild(dom);
                this.excelDom(this.workplace,'table','Export data Nilai Pengolahan Rapor');
            };
        }
        
        //const importtest = new this.immportClass(importXl,document.querySelector('#rekap_rapor_all > tbody'),['no', ...headerParent,'rerata'] );
        if(importXl){
            const listenerImport = new ImportControllerMultipleHeader(importXl,document.querySelector(`#${idtabel} > tbody`),keytabel);
            listenerImport.listnerinput();
            
            let datarangking = new StatistikRangking(data)
                        .FromTable(document.getElementById(idtabel))
                        .fromIndexRerata(arrayIndex)
                        .calculateRerata()
                        .calculateRangking();
                datarangking.fillRerataInIndexColoumn(arrayIndex.length+3);
                datarangking.fillRangkinInIndexColoumn(arrayIndex.length+4);

        }
        if(btnSave){
            btnSave.onclick = async()=>{
                let tabelbody = document.querySelector(`#${idtabel} > tbody`);
                let parent_row = [];
                
                for(let i = 0 ; i < tabelbody.rows.length ; i++){
                    let rows = tabelbody.rows[i];
                    let data = rows.querySelectorAll('[data-server]');
                    
                    let objSiswa = {}
                    data.forEach(td=>{
                        let key = td.getAttribute('data-server');
                        if(td.nodeName == 'TD'){
                            objSiswa[key] = td.innerHTML;
                        }else{
                            let predikat = this.findPredikatByNilai(parseFloat(td.value));
                            
                            objSiswa[key] = td.value;
                            objSiswa[key+'_P_PREDIKAT'] = (predikat.predikat=="Perlu Bimbingan"||predikat.predikat=="Cukup")?"Baik":predikat.predikat;

                        }
                    })
                    parent_row.push(objSiswa);

                }
                
                
                await this.service.saveNilaiRaporMasal (parent_row,this.fokusRombel,'nilai_raport_'+this.fokusRombel,'id');
            
                this[methodreturn]();
            }
        }
    };
    configButtonsImportExportKeterampilan(idtabel='tabelnilairapor',keytabel,data,arrayIndex,methodreturn){
        const btnExport = document.querySelector('[data-klik="exportExcel"]');
        const importXl = document.getElementById('importModal');
        const btnSave = document.querySelector('[data-klik="simpanserver"]')
        if(btnExport){
            btnExport.onclick = ()=>{
    
                // this.excelDom(this.workplace,'#rekap_rapor_all','Export data Nilai Pengolahan Rapor');
                // const tabel = document.getElementById(idtable);
                // const b_tabel = tabel.querySelector('tbody');
                // let dom= this.shadowTable(b_tabel);
                // let temp = document.createDocumentFragment();
                // temp.appendChild(dom);
                this.excelDom(this.workplace,'table','Export data Nilai Pengolahan Rapor');
            };
        }
        
        //const importtest = new this.immportClass(importXl,document.querySelector('#rekap_rapor_all > tbody'),['no', ...headerParent,'rerata'] );
        if(importXl){
            const listenerImport = new ImportControllerMultipleHeader(importXl,document.querySelector(`#${idtabel} > tbody`),keytabel);
            listenerImport.listnerinput();
            
            let datarangking = new StatistikRangking(data)
                        .FromTable(document.getElementById(idtabel))
                        .fromIndexRerata(arrayIndex)
                        .calculateRerata()
                        .calculateRangking();
                datarangking.fillRerataInIndexColoumn(arrayIndex.length+3);
                datarangking.fillRangkinInIndexColoumn(arrayIndex.length+4);

        }
        if(btnSave){
            btnSave.onclick = async()=>{
                let tabelbody = document.querySelector(`#${idtabel} > tbody`);
                let parent_row = [];
                
                for(let i = 0 ; i < tabelbody.rows.length ; i++){
                    let rows = tabelbody.rows[i];
                    let data = rows.querySelectorAll('[data-server]');
                    
                    let objSiswa = {}
                    data.forEach(td=>{
                        let key = td.getAttribute('data-server');
                        let mapel = td.getAttribute('data-mapel');
                        if(td.nodeName == 'TD'){
                            objSiswa[key] = td.innerHTML;
                        }else{
                            let predikat = this.findPredikatByNilai(parseFloat(td.value));
                            
                            objSiswa[key] = td.value;
                            objSiswa[mapel+'_K_PREDIKAT'] = (predikat.predikat=="Perlu Bimbingan"||predikat.predikat=="Cukup")?"Baik":predikat.predikat;

                        }
                    })
                    parent_row.push(objSiswa);

                }
                
                
                await this.service.saveNilaiRaporMasal (parent_row,this.fokusRombel,'nilai_raport_'+this.fokusRombel,'id');
            
                this[methodreturn]();
            }
        }
    };
    defineSemesterSemesterSebelumnya(angkamundur){
        let result = {};
        let controlApi =this.App.riwayatApi.filter(s=>s.api != this.App.key);
        let currentTapel = this.Auth.tapelshort;//2324
        let currentSemester = this.Auth.semester;
        let currentNamaRombel = (this.fokusRombel).match(/[A-D]/);//MENGEMBALIKAN ANGKA KELAS
        let currentJenjang = this.fokusJenjang;
        
        let pengurangJenjang = (currentTapel - controlApi[controlApi.length-angkamundur].tapel)/101;
        let jenjangMundur = currentJenjang - pengurangJenjang;
        let semesterSebelumnya = 1;
        if(this.setApp.semester == 2){
            semesterSebelumnya = angkamundur%2==0?1:angkamundur%2;
            }else{
            semesterSebelumnya = angkamundur%2==0?2:angkamundur%2;

        }
        
        result.hasData = false;
        
        if(jenjangMundur>0){
            // result.controlApi = controlApi;
            result.api = controlApi[controlApi.length-angkamundur];
            result.hasData = true;
            result.pengurangJenjang = pengurangJenjang
            result.angkamundur = angkamundur;
            result.jenjangMundur = jenjangMundur;
            result.rombelMundur =  jenjangMundur+currentNamaRombel;
            result.semesterMundur =  semesterSebelumnya;

        }

            return result;
    }
    saveToNilaiRapor(btnSave,idtabel,methodreturn,dataSet='data-server'){
        
        btnSave.onclick = async()=>{
            let tabelbody = document.querySelector(`#${idtabel} > tbody`);
            let parent_row = [];
            
            for(let i = 0 ; i < tabelbody.rows.length ; i++){
                let rows = tabelbody.rows[i];
                let data = rows.querySelectorAll(`[${dataSet}]`);
                
                let objSiswa = {}
                data.forEach(td=>{
                    let key = td.getAttribute(dataSet);
                    if(td.nodeName == 'TD'){
                        objSiswa[key] = td.innerHTML;
                    }else{
                        objSiswa[key] = td.value;

                    }
                })
                parent_row.push(objSiswa);

            }
            
            
            await this.service.saveNilaiRaporMasal (parent_row,this.fokusRombel,'nilai_raport_'+this.fokusRombel,'id');
        
            this[methodreturn]();
        }
    }
    saveToNilaiRaporK12(btnSave,idtabel,methodreturn,dataSet='data-key'){
        
        btnSave.onclick = async()=>{
            let tabelbody = document.querySelector(`#${idtabel} > tbody`);
            let parent_row = [];
            
            for(let i = 0 ; i < tabelbody.rows.length ; i++){
                let rows = tabelbody.rows[i];
                let data = rows.querySelectorAll(`[${dataSet}]`);
                
                let objSiswa = {}
                data.forEach(td=>{
                    let key = td.getAttribute(dataSet);
                    if(td.nodeName == 'TD'){
                        objSiswa[key] = td.innerHTML;
                    }else{
                        objSiswa[key] = td.value;

                    }
                })
                parent_row.push(objSiswa);

            }
            
            
            await this.service.saveNilaiRaporMasal (parent_row,this.fokusRombel,'nilai_raport_'+this.fokusRombel,'id');
            await this.service.saveNilaiRaporMasal (parent_row,this.fokusRombel,'nilai_sikap_raport_'+this.fokusRombel,'id');
        
            this[methodreturn]();
        }
    }
    saveToNilaiRaporTinggiBadan(btnSave,idtabel,methodreturn,dataSet='data-server'){
        
        btnSave.onclick = async()=>{
            let tabelbody = document.querySelector(`#${idtabel} > tbody`);
            let parent_row = [];
            
            for(let i = 0 ; i < tabelbody.rows.length ; i++){
                let rows = tabelbody.rows[i];
                let data = rows.querySelectorAll(`[${dataSet}]`);
                
                let objSiswa = {}
                data.forEach(td=>{
                    let key = td.getAttribute(dataSet);
                    if(td.nodeName == 'TD'){
                        objSiswa[key] = td.innerHTML;
                    }else{
                        objSiswa[key] = td.value;

                    }
                })
                parent_row.push(objSiswa);

            }
            
            
            await this.service.saveNilaiRaporMasal (parent_row,this.fokusRombel,'nilai_raport_'+this.fokusRombel,'id');
            await this.service.saveNilaiRaporMasal (parent_row,this.fokusRombel,'perkembangan_raport_'+this.fokusRombel,'id');
        
            this[methodreturn]();
        }
    }
    async new_rekapraport_olahan_bandingan(){
        if(this.setApp.semester == 1 && this.fokusJenjang == 1){
            this.workplace.innerHTML = "SEMESTER SEBELUMNYA UNTUK KELAS 1 TIDAK AKAN PERNAH ADA";
            return;
        }
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel);
        
        let satuSemesterSebelumnya = this.defineSemesterSemesterSebelumnya(1)
        let api = satuSemesterSebelumnya.api.api;
        let rombelMundur1 = satuSemesterSebelumnya.rombelMundur;
        let tabnilai = 'nilai_raport_'+rombelMundur1;
        let idss = 'ss_nilai_'+satuSemesterSebelumnya.jenjangMundur;
        let cekapi =this.service.repo.otherMacro(satuSemesterSebelumnya.api.api);
        let httpOtherCrud = this.service.repo.otherCrud(cekapi.exec_crud);
        let prefik = 'mundur1_';
        
        this.conditionalSubemenu();
        
        await this.kbmFitur.init_raport();
            let params = {
                'idss'  : cekapi[idss],
                'tab'   : tabnilai,
                'action': 'read'
            }
        await this.service.nilaiRaporOtherMacro(httpOtherCrud,params,prefik)
        
        this.ormMapel.createLabelMapel();
        this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();
        this.ormMapel.withNilaiSebelumnya(prefik+tabnilai,'_mundur1');
        
        const mapelNonAgama = this.ormMapel.labelNonAgamaIncludeMulok;
        const sebaranblangko = this.ormMapel.sebaranDariTagihanBlangko();
        const data = this.ormMapel.collectionsSiswa.data;
        const blangko_nilairapor = this.service.data['blangko_nilai_raport_'+this.fokusRombel];
        const identitas = {
            'tapel'     : this.Auth.tapel,
            'semester'  : this.Auth.semester,
            'kelas'     : this.fokusRombel,
            'data'      : data,
            'labelMapel': mapelNonAgama,
            'isKurmer'  : this.ormMapel.isKurmer,
            'sebaran'   : sebaranblangko,
            'semestersebelumnya':satuSemesterSebelumnya,
            'blangkoRapor':blangko_nilairapor
            
        }
        
        this.workplace.innerHTML = viewRapor.tabelRaporPerbandingan(identitas,'_mundur1');
        
        let arrayIndex = [3]; // start kolom3;
        let arrayImport = ['id','tokensiswa','namasiswa'];
        
        mapelNonAgama.forEach((colmp, i_colmp)=>{
            arrayIndex.push((i_colmp+4));
            arrayImport.push(colmp.value);
        });
        
        let tb = new TableProperties(document.querySelector('#tabelnilairapor'));
            tb.freezeColumn([2]);
            tb.addScrollUpDown();
            this.configButtonsImportExport('tabelnilairapor',arrayImport,data,arrayIndex,'new_rekapraport_olahan_bandingan');
    }
    async new_rekapraport_olahan_bandingan_keterampilan(){
        if(this.setApp.semester == 1 && this.fokusJenjang == 1){
            this.workplace.innerHTML = "SEMESTER SEBELUMNYA UNTUK KELAS 1 TIDAK AKAN PERNAH ADA";
            return;
        }
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel);
        
        let satuSemesterSebelumnya = this.defineSemesterSemesterSebelumnya(1)
        let api = satuSemesterSebelumnya.api.api;
        let rombelMundur1 = satuSemesterSebelumnya.rombelMundur;
        let tabnilai = 'nilai_raport_'+rombelMundur1;
        let idss = 'ss_nilai_'+satuSemesterSebelumnya.jenjangMundur;
        let cekapi =this.service.repo.otherMacro(satuSemesterSebelumnya.api.api);
        let httpOtherCrud = this.service.repo.otherCrud(cekapi.exec_crud);
        let prefik = 'mundur1_';
        
        this.conditionalSubemenu();
        
        await this.kbmFitur.init_raport();
            let params = {
                'idss'  : cekapi[idss],
                'tab'   : tabnilai,
                'action': 'read'
            }
        await this.service.nilaiRaporOtherMacro(httpOtherCrud,params,prefik)
        
        this.ormMapel.createLabelMapel();
        this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();
        this.ormMapel.withNilaiSebelumnya(prefik+tabnilai,'_mundur1');
        
        const mapelNonAgama = this.ormMapel.labelNonAgamaIncludeMulok;
        const sebaranblangko = this.ormMapel.sebaranDariTagihanBlangko();
        const data = this.ormMapel.collectionsSiswa.data;
        const blangko_nilairapor = this.service.data['blangko_nilai_raport_'+this.fokusRombel];
        const identitas = {
            'tapel'     : this.Auth.tapel,
            'semester'  : this.Auth.semester,
            'kelas'     : this.fokusRombel,
            'data'      : data,
            'labelMapel': mapelNonAgama,
            'isKurmer'  : this.ormMapel.isKurmer,
            'sebaran'   : sebaranblangko,
            'semestersebelumnya':satuSemesterSebelumnya,
            'blangkoRapor':blangko_nilairapor
            
        }
        
        this.workplace.innerHTML = viewRapor.tabelRaporPerbandingan(identitas,'_mundur1',false);
        
        let arrayIndex = [3]; // start kolom3;
        let arrayImport = ['id','tokensiswa','namasiswa'];
        
        mapelNonAgama.forEach((colmp, i_colmp)=>{
            arrayIndex.push((i_colmp+4));
            arrayImport.push(colmp.value);
        });
        
        let tb = new TableProperties(document.querySelector('#tabelnilairapor'));
            tb.freezeColumn([2]);
            tb.addScrollUpDown();
            this.configButtonsImportExportKeterampilan('tabelnilairapor',arrayImport,data,arrayIndex,'new_rekapraport_olahan_bandingan_keterampilan');
    }
    async sampulraport(){
        
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        // this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();

        this.maincontrol.innerHTML ="";
        let st =this.setApp
        let guru = this.setApp.namaUser;
        let nipguru = this.setApp.nipUser;
        let kepsek = this.setApp.namaKepsek;
        let nipkepsek = this.setApp.nipKepsek
        
        let siswa = this.kbmFitur.siswaRombel;
        let data ={
            nss:st.nss,
            npsn:st.npsn,
            src_garuda: garuda,
            src_tut_wuri:tut_wuri_handayani,
            namasekolah:st.namaSekolah,
            alamatsekolah:st.alamatSekolah+', RT'+st.alamatSekolahRt+'/RW '+st.alamatSekolahRw,
            kodepos:st.alamatSekolahkodepos,
            alamatkelurahan:st.alamatSekolahkelurahan,
            alamatkecamatan:st.alamatSekolahkecamatan,
            alamatkota:st.alamatSekolahkota,
            alamatprovinsi:st.alamatSekolahprovinsi,
            email:st.emailSekolah,
            guru:guru,
            nipguru:nipguru,
            kepsek:kepsek,
            nipkepsek:nipkepsek,

            web:st.website
            
            
        }
        this.workplace.innerHTML = viewRapor.viewDepanRapor(data,siswa);
        this.execute_printRaportDepan(siswa,siswa)
    
    }
    execute_printRaportDepan(siswa,rekapData){
        const btnPrev = document.getElementById('btnLeft');
        const btnNext = document.getElementById('btnRight');
        const selector = document.getElementById('selectTargetSiswa');
        const btnPrint = document.getElementById('btnPrintKelulusan');
        
        let tag = 0;
        let value = 0;

        btnPrev.onclick = ()=>{
            const selector = document.getElementById('selectTargetSiswa');
            if(selector.selectedIndex == 0){
                return
            }
            selector.selectedIndex-- ;
            tag = selector.selectedIndex;
            value = selector[tag].value;
            this.isikan(value,rekapData);
        }

        btnNext.onclick = ()=>{
            const selector = document.getElementById('selectTargetSiswa');
            if(selector.selectedIndex == (siswa.length-1)){
                return
            }
            selector.selectedIndex++ ;
            tag = selector.selectedIndex;
            value = selector[tag].value
            this.isikan(value,rekapData);
        }
        
        btnPrint.onclick = ()=>{
            this.printPortraitDom(this.workplace)
        }
        
        selector.onchange = ()=>{
            tag = selector.selectedIndex;
            value = selector[tag].value
            this.isikan(value,rekapData);
        }
        
        
    }
    isikan (value,rekapData){
        let data = rekapData.filter(s=> s.id == value)[0];
        let isian = document.querySelectorAll("[data-isian]");
        isian.forEach(el=>{
            let key = el.getAttribute('data-isian');
            let val = "";
            if(key == "ttl"){
                let tempat = data.pd_tl;
                let tanggal = new FormatTanggal(data.pd_tanggallahir).formatLong();
                // let full_tanggal = tanggal.formatLong();
                val = tempat+", "+ tanggal
            }else if(key=="masuk_tgl"){
                val = data[key]==""?"":new FormatTanggal(data[key]).formatLong();
            }else if(key=="nisnisn"){
                val = data.nis +"/"+data.nisn;
            }else if(key=="pd_jk"){
                val = data[key]=="P"?"Perempuan":"Laki-laki";
            }else{
                val = data[key];
            }
            el.innerHTML = val;
        })
    }
    
    async deskripsi_predikat(){
        
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();

        const data = this.service.data['predikat_'+this.fokusJenjang];
        const identitas = {
            'jenjang':this.fokusJenjang,
            'kurikulum':this.kbmFitur.shortKurikulum,

        }
        this.workplace.innerHTML = viewRapor.html_setting_predikat(identitas,data);
        const btnSave = document.getElementById('simpanpredikat');
        btnSave.onclick = async()=>{
            
            let tabel = document.getElementById('tabel_setting_predikat').querySelector('tbody');
            let arPredikat = [];
            // tabel.rows.forEach(row=>{
            for(let i = 0 ; i < tabel.rows.length ; i++){
                    let row = tabel.rows[i];
                let obj = {};
                let tds = row.querySelectorAll('[data-key]');
                tds.forEach(td=>{
                    let key = td.getAttribute('data-key');
                    if(td.nodeName =='TD'){
                        obj[key] = td.innerHTML;
                    }else{
                        obj[key] = td.value;
                    }
                });
                arPredikat.push(obj);
            };
            
            let konf = confirm('Anda yakin?');
            
            if(!konf){
                return;
            }
            await this.service.cu_deskripsi_predikat(arPredikat,this.fokusJenjang);
            this[this.fokusMenu]();

        }
    }
    async deskripsi_asli(){
        
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        // this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();

        const selectionMapelData = this.ormMapel.labelRealMapel;
        
        const mapelNonAgama = this.ormMapel.labelNonAgamaIncludeMulok;
        const sebaranblangko = this.ormMapel.sebaranDariTagihanBlangko();
        const data = this.ormMapel.collectionsSiswa.selectProperties(['id','pd_nama','sebaran_mapel','dataRapor','dataRapor_Siap']).data;
        const identitas = {
            'tapel'     : this.Auth.tapel,
            'semester'  : this.Auth.semester,
            'kelas'     : this.fokusRombel,
            'data'      : data,
            'labelMapel': this.ormMapel.labelRealMapel,
            'isKurmer'  : this.ormMapel.isKurmer,
            'sebaran'   : sebaranblangko
            
        }
        
        this.maincontrol.innerHTML = viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="selection-mapel" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.workplace.innerHTML = viewRapor.html_setting_deskripi(identitas,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',false);
        
        const domTabel = document.getElementById('predikat_rapor')
        const selecting = document.querySelector('[data-pradesain="selection-mapel"]');
        selecting.onchange = (e)=>{
            this.workplace.innerHTML = viewRapor.html_setting_deskripi(identitas,e.target.value,false);
        }
    }
    async deskripsi_asli_keterampilan(){
        
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();

        const selectionMapelData = this.ormMapel.labelRealMapel;
        
        const mapelNonAgama = this.ormMapel.labelNonAgamaIncludeMulok;
        const sebaranblangko = this.ormMapel.sebaranDariTagihanBlangko();
        const data = this.ormMapel.collectionsSiswa.selectProperties(['id','pd_nama','sebaran_mapel','dataRapor','dataRapor_Siap']).data;
        const identitas = {
            'tapel'     : this.Auth.tapel,
            'semester'  : this.Auth.semester,
            'kelas'     : this.fokusRombel,
            'data'      : data,
            'labelMapel': this.ormMapel.labelRealMapel,
            'isKurmer'  : this.ormMapel.isKurmer,
            'sebaran'   : sebaranblangko
            
        }
        
        this.maincontrol.innerHTML = viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="selection-mapel" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        
        this.workplace.innerHTML = viewRapor.html_setting_deskripi_keterampilan(identitas,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',false);
        const selecting = document.querySelector('[data-pradesain="selection-mapel"]');
        const domTabel = document.getElementById('predikat_rapor')
        selecting.onchange = (e)=>{
            this.workplace.innerHTML = viewRapor.html_setting_deskripi_keterampilan(identitas,e.target.value,false);
        }
    }
    async deskripsi_olahan_keterampilan(){
        
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        // this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();
        
        const selectionMapelData = this.ormMapel.labelRealMapel;
        
        const mapelNonAgama = this.ormMapel.labelNonAgamaIncludeMulok;
        const sebaranblangko = this.ormMapel.sebaranDariTagihanBlangko();
        const blangkoRapor = this.service.data['blangko_nilai_raport_'+this.fokusRombel];
        const data = this.ormMapel.collectionsSiswa.selectProperties(['id','pd_nama','sebaran_mapel','dataRapor','dataRapor_Siap']).data;
        const identitas = {
            'tapel'     : this.Auth.tapel,
            'semester'  : this.Auth.semester,
            'kelas'     : this.fokusRombel,
            'data'      : data,
            'labelMapel': this.ormMapel.labelRealMapel,
            'isKurmer'  : this.ormMapel.isKurmer,
            'sebaran'   : sebaranblangko,
            'blangkoRapor':blangkoRapor
            
        }
        
        this.maincontrol.innerHTML = viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="selection-mapel" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.workplace.innerHTML = viewRapor.html_setting_deskripi_keterampilan(identitas,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',true);
        
        let mapelSelected = this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI';
        let kurikulumMapel = this.kbmFitur.ormKurikulum.data.filter(s=>s.kodemapel == mapelSelected);
        // const selectingSel = document.querySelectorAll('[data-edit]');
        
        // selectingSel.forEach(predikats=>{
        //     predikats.onchange = (e)=>{
        //         let sel = e.target.parentElement;
        //         let row = sel.parentElement;
        //         let kd_maks = row.querySelector(`[data-server="kdmaks_${mapelSelected}"]`);
        //         let kd_min = row.querySelector(`[data-server="kdmin_${mapelSelected}"]`);

        //         let predikat_maks = row.querySelector(`[data-server="predikat_kdmaks_${mapelSelected}"]`).value;
        //         let predikat_min = row.querySelector(`[data-server="predikat_kdmin_${mapelSelected}"]`).value;
                
        //         let seldeskripsi = row.querySelector(`[data-server="${mapelSelected}_P_DESKRIPSI"]`);
        //         let keying = this.ormMapel.isKurmer?'idbaris':'kd3';
        //         let cariObjekMaks = kurikulumMapel.filter(s=>s[keying]==kd_maks.innerHTML);
        //         let cariObjekMin = kurikulumMapel.filter(s=>s[keying]==kd_min.innerHTML);
        //         let objekMaks ={
        //             atp:'',
        //             indikatorkd3:''
        //         }
        //         let objekMin ={
        //             atp:'',
        //             indikatorkd3:''}
        //         if(cariObjekMaks.length>0){
        //             objekMaks = cariObjekMaks[0];
        //         }
        //         if(cariObjekMin.length>0){
        //             objekMin = cariObjekMin[0];

        //         }
        //         seldeskripsi.innerHTML = this.ormMapel.createDeskripsiRapor(
        //            {
        //             objek_maks      : objekMaks,
        //             objek_min       : objekMin,
        //             predikat_maks   : predikat_maks,
        //             predikat_min    : predikat_min
        //             } 
        //         )
        //         /**
        //          * objek_maks,objek_min,predikat_maks,predikat_min
        //          */
        //     }
        // })
        const btnSave = document.querySelector("[data-klik='simpanserver']")
        this.saveToNilaiRapor(btnSave,'olahrapor',this.fokusMenu);
        const selecting = document.querySelector('[data-pradesain="selection-mapel"]');
        selecting.onchange = (e)=>{
            this.workplace.innerHTML = viewRapor.html_setting_deskripi_keterampilan(identitas,e.target.value,true);
            let mapelSelected = e.target.value
            let kurikulumMapel = this.kbmFitur.ormKurikulum.data.filter(s=>s.kodemapel == e.target.value);
            const selectingSel = document.querySelectorAll('[data-edit]');
            selectingSel.forEach(predikats=>{
                predikats.onchange = (ee)=>{
                    let sel = ee.target.parentElement;
                    let row = sel.parentElement;
                    let kd_maks = row.querySelector(`[data-server="kdmaks_${mapelSelected}_KETERAMPILAN"]`);
                    let kd_min = row.querySelector(`[data-server="kdmin_${mapelSelected}_KETERAMPILAN"]`);

                    let predikat_maks = row.querySelector(`[data-server="predikat_kdmaks_${mapelSelected}_KETERAMPILAN"]`).value;
                    let predikat_min = row.querySelector(`[data-server="predikat_kdmin_${mapelSelected}_KETERAMPILAN"]`).value;
                    
                    let seldeskripsi = row.querySelector(`[data-server="${mapelSelected}_K_DESKRIPSI"]`);
                    let keying = this.ormMapel.isKurmer?'idbaris':'kd4';
                    let cariObjekMaks = kurikulumMapel.filter(s=>s[keying]==kd_maks.innerHTML);
                    let cariObjekMin = kurikulumMapel.filter(s=>s[keying]==kd_min.innerHTML);
                    let objekMaks ={
                        atp:'',
                        indikatorkd4:''
                    }
                    let objekMin ={
                        atp:'',
                        indikatorkd4:''}
                    if(cariObjekMaks.length>0){
                        objekMaks = cariObjekMaks[0];
                    }
                    if(cariObjekMin.length>0){
                        objekMin = cariObjekMin[0];

                    }
                    seldeskripsi.innerHTML = this.ormMapel.createDeskripsiRaporKeterampilan(
                    {
                        objek_maks      : objekMaks,
                        objek_min       : objekMin,
                        predikat_maks   : predikat_maks,
                        predikat_min    : predikat_min
                        } 
                    );

                }
            })
            const btnSave = document.querySelector("[data-klik='simpanserver']")
            this.saveToNilaiRapor(btnSave,'olahrapor',this.fokusMenu);
            let val = e.target.value;
            
        };
        selecting.dispatchEvent(new Event('change'));

    }

    async deskripsi_olahan(){
        
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        // this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();
        
        const selectionMapelData = this.ormMapel.labelRealMapel;
        
        const mapelNonAgama = this.ormMapel.labelNonAgamaIncludeMulok;
        const sebaranblangko = this.ormMapel.sebaranDariTagihanBlangko();
        const blangkoRapor = this.service.data['blangko_nilai_raport_'+this.fokusRombel];
        const data = this.ormMapel.collectionsSiswa.selectProperties(['id','pd_nama','sebaran_mapel','dataRapor','dataRapor_Siap']).data;
        const identitas = {
            'tapel'     : this.Auth.tapel,
            'semester'  : this.Auth.semester,
            'kelas'     : this.fokusRombel,
            'data'      : data,
            'labelMapel': this.ormMapel.labelRealMapel,
            'isKurmer'  : this.ormMapel.isKurmer,
            'sebaran'   : sebaranblangko,
            'blangkoRapor':blangkoRapor
            
        }
        
        this.maincontrol.innerHTML = viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="selection-mapel" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.workplace.innerHTML = viewRapor.html_setting_deskripi(identitas,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',true);
        
        let mapelSelected = this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI';
        let kurikulumMapel = this.kbmFitur.ormKurikulum.data.filter(s=>s.kodemapel == mapelSelected);
        
        const btnSave = document.querySelector("[data-klik='simpanserver']")
        this.saveToNilaiRapor(btnSave,'olahrapor',this.fokusMenu);
        const selecting = document.querySelector('[data-pradesain="selection-mapel"]');
        selecting.onchange = (e)=>{
            this.workplace.innerHTML = viewRapor.html_setting_deskripi(identitas,e.target.value,true);
            let mapelSelected = e.target.value
            let kurikulumMapel = this.kbmFitur.ormKurikulum.data.filter(s=>s.kodemapel == e.target.value);
            const selectingSel = document.querySelectorAll('[data-edit]');
            selectingSel.forEach(predikats=>{
                predikats.onchange = (ee)=>{
                    let sel = ee.target.parentElement;
                    let row = sel.parentElement;
                    let kd_maks = row.querySelector(`[data-server="kdmaks_${mapelSelected}"]`);
                    let kd_min = row.querySelector(`[data-server="kdmin_${mapelSelected}"]`);

                    let predikat_maks = row.querySelector(`[data-server="predikat_kdmaks_${mapelSelected}"]`).value;
                    let predikat_min = row.querySelector(`[data-server="predikat_kdmin_${mapelSelected}"]`).value;
                    
                    let seldeskripsi = row.querySelector(`[data-server="${mapelSelected}_P_DESKRIPSI"]`);
                    let keying = this.ormMapel.isKurmer?'idbaris':'kd3';
                    let cariObjekMaks = kurikulumMapel.filter(s=>s[keying]==kd_maks.innerHTML);
                    let cariObjekMin = kurikulumMapel.filter(s=>s[keying]==kd_min.innerHTML);
                    let objekMaks ={
                        atp:'',
                        indikatorkd3:''
                    }
                    let objekMin ={
                        atp:'',
                        indikatorkd3:''}
                    if(cariObjekMaks.length>0){
                        objekMaks = cariObjekMaks[0];
                    }
                    if(cariObjekMin.length>0){
                        objekMin = cariObjekMin[0];

                    }
                    seldeskripsi.innerHTML = this.ormMapel.createDeskripsiRapor(
                    {
                        objek_maks      : objekMaks,
                        objek_min       : objekMin,
                        predikat_maks   : predikat_maks,
                        predikat_min    : predikat_min
                        } 
                    );

                }
            })
            const btnSave = document.querySelector("[data-klik='simpanserver']")
            this.saveToNilaiRapor(btnSave,'olahrapor',this.fokusMenu);
            let val = e.target.value;
            
        };

        selecting.dispatchEvent(new Event('change'));
    }

    async tttb(){
        
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        // this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();
        let identitas = {
            'jenjang':this.fokusJenjang,
            'kurikulum':this.kbmFitur.shortKurikulum,
            'dbsiswa':this.kbmFitur.siswaRombel
        }
        let dataservice = this.service.data['perkembangan_raport_'+this.fokusRombel];
        
        this.workplace.innerHTML = viewRapor.html_edit_ttb(identitas,dataservice);
        const btnSave = document.querySelector("[data-klik='simpanserver']")
        this.saveToNilaiRaporTinggiBadan(btnSave,'setting_perkembangan',this.fokusMenu,'data-key');
    }
    async kesehatan(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        // this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();

        let identitas = {
            'jenjang':this.fokusJenjang,
            'rombel':this.fokusRombel,
            'kurikulum':this.kbmFitur.shortKurikulum,
            'semester':this.Auth.semester,
            'dbsiswa':this.kbmFitur.siswaRombel

        }
        let dataserver = this.service.data['nilai_raport_'+this.fokusRombel];
        this.workplace.innerHTML = viewRapor.html_edit_kesehatan(identitas,dataserver);
        const btnSave = document.querySelector("[data-klik='simpanserver']")
        this.saveToNilaiRapor(btnSave,'setting_perkembangan',this.fokusMenu,'data-key');
    }
    async ekskul(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        // this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();

        let identitas = {
            'jenjang':this.fokusJenjang,
            'rombel':this.fokusRombel,
            'kurikulum':this.kbmFitur.shortKurikulum,
            'semester':this.Auth.semester,
            'dbsiswa':this.kbmFitur.siswaRombel

        }
        let dataserver = this.service.data['nilai_raport_'+this.fokusRombel];
        this.workplace.innerHTML = viewRapor.html_edit_ekskul(identitas,dataserver);
        const btnSave = document.querySelector("[data-klik='simpanserver']")
        this.saveToNilaiRapor(btnSave,'setting_perkembangan',this.fokusMenu,'data-key');
    }
    async prestasi(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        // this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();

        let identitas = {
            'jenjang':this.fokusJenjang,
            'rombel':this.fokusRombel,
            'kurikulum':this.kbmFitur.shortKurikulum,
            'semester':this.Auth.semester,
            'dbsiswa':this.kbmFitur.siswaRombel
        }

        let dataserver = this.service.data['nilai_raport_'+this.fokusRombel];
        this.workplace.innerHTML = viewRapor.html_edit_prestasi(identitas,dataserver);
        const btnSave = document.querySelector("[data-klik='simpanserver']")
        this.saveToNilaiRapor(btnSave,'setting_perkembangan',this.fokusMenu,'data-key');
    }
    async saran_saran(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        // this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();

        let identitas = {
            'jenjang':this.fokusJenjang,
            'rombel':this.fokusRombel,
            'kurikulum':this.kbmFitur.shortKurikulum,
            'semester':this.Auth.semester,
            'dbsiswa':this.kbmFitur.siswaRombel
        }

        let dataserver = this.service.data['nilai_raport_'+this.fokusRombel];
        this.workplace.innerHTML = viewRapor.html_edit_saran(identitas,dataserver);
        const inputbantu = document.getElementById('inputbantu');
            inputbantu.oninput = (e)=>{
                let v = e.target.value;
                let allkey = document.querySelectorAll('[data-key]');
                allkey.forEach(elinput =>{
                    if(elinput.nodeName =='INPUT'){
                        elinput.value = v;
                    }
                })
            }
        const btnSave = document.querySelector("[data-klik='simpanserver']")
        this.saveToNilaiRapor(btnSave,'setting_perkembangan',this.fokusMenu,'data-key');
    }
    
    async ttm_rapor(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        // this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();

        let identitas = {
            'semester':this.setApp.semester,
            'tapel':this.setApp.tapel,
        }
        let dataapi = this.service.data['nilai_raport_'+this.fokusRombel];//
        let titimangsaByTabMateri = this.service.data['titimangsa_rapor'].filter(s=>s.kodetapel == this.setApp.tapelshort && s.semester == this.setApp.semester);
        let bulan = this.setApp.semester==1?11:5;
        let tahun = new Date().getFullYear();
        let ttm = dataapi.length>0?dataapi[0].TITIMANGSA_RAPORT??new Date(tahun, bulan, 28):new Date(tahun, bulan, 28);
        let ttm_id = titimangsaByTabMateri.length>0?titimangsaByTabMateri[0].idbaris:'';
        // this.ttm_rapor_semester_ini = ttm;
        let dataserver = {
            'tgl_for_input':new FormatTanggal(ttm).valueInputDate(),
            'titimangsa_teks':new FormatTanggal(ttm).formatFull()

        };
        this.workplace.innerHTML = viewRapor.html_titimangsa_rapor(identitas,dataserver);
        const btnSave = document.getElementById('simpanserver');
        const elemeninput = document.getElementById('titimangsa_rapor');
        elemeninput.onchange = (e)=>{
            let elemen = document.getElementById('text_titimangsa_teks');
            elemen.innerHTML = new FormatTanggal(e.target.value).formatFull();
        }
        btnSave.onclick = async()=>{
            const elemeninput = document.getElementById('titimangsa_rapor');
            
            /** jika belum pernah bikin tabmateri 'titimangsa_rapor', maka action-nya adalah update */
            let blangko={
                'idbaris':ttm_id,
                'kodetapel':this.setApp.tapelshort,
                'semester':this.setApp.semester,
                'tanggal':elemeninput.value
            }
            
            let parent_row = [];
            this.kbmFitur.siswaRombel.forEach(n=>{
                let ob={};
                ob.id = n.id;
                ob.namasiswa = n.pd_nama;
                ob.TITIMANGSA_RAPORT = blangko.tanggal;
                parent_row.push(ob);
            })
            await this.service.saveNilaiRaporMasal (parent_row,this.fokusRombel,'nilai_raport_'+this.fokusRombel,'id');
            this[this.fokusMenu]();
            if(titimangsaByTabMateri.length==0){
                blangko.idbaris =this.service.data['titimangsa_rapor'].length+2;
            }
            await this.service.updateTtm([blangko]);
        }
    }
    async KD1(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        // this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();
        let identitas = {
            'semester':this.setApp.semester,
            'rombel':this.fokusRombel,
            'kelas':this.fokusJenjang,
            'namasikap_title':'Spiritual',
            'namasikap_key':'spiritual',
            'tapel': this.setApp.tapel,
            'dbsiswa':this.kbmFitur.siswaRombel
        }
        let dataserver = this.service.data['nilai_sikap_raport_'+this.fokusRombel];
        let arraydeskripsi=this.service.data['k1kelas'+this.fokusJenjang].filter(s=>s.kodemapel == 'umum');
        const dataservers = {
            'data_rapor':dataserver,
            'data_deskripsi':arraydeskripsi
        }
        
        this.workplace.innerHTML = viewRapor.html_setting_kd12(identitas,dataservers);
        let tb = new TableProperties(document.getElementById('data_sikap'));
            tb.freezeColumn([2]);
            tb.addScrollUpDown(false);
        this.controlKDSikap(arraydeskripsi.map(n=>n.indikatorkd1), identitas.namasikap_key);
        
        const btnSave = document.querySelector("[data-klik='simpanserver']")
        this.saveToNilaiRaporK12(btnSave,'data_sikap',this.fokusMenu,'data-key');
    }
    async KD2(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        // this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();
        let identitas = {
            'semester':this.setApp.semester,
            'rombel':this.fokusRombel,
            'kelas':this.fokusJenjang,
            'namasikap_title':'Sosial',
            'namasikap_key':'sosial',
            'tapel': this.setApp.tapel,
            'dbsiswa':this.kbmFitur.siswaRombel
        }
        let dataserver = this.service.data['nilai_sikap_raport_'+this.fokusRombel];
        let arraydeskripsi=this.service.data['k2kelas'+this.fokusJenjang].filter(s=>s.kodemapel == 'umum');
        const dataservers = {
            'data_rapor':dataserver,
            'data_deskripsi':arraydeskripsi
        }
        this.workplace.innerHTML = viewRapor.html_setting_kd12(identitas,dataservers);
        let tb = new TableProperties(document.getElementById('data_sikap'));
            tb.freezeColumn([2]);
            tb.addScrollUpDown(false);
        this.controlKDSikap(arraydeskripsi.map(n=>n.indikatorkd2), identitas.namasikap_key);
        const btnSave = document.querySelector("[data-klik='simpanserver']")
        this.saveToNilaiRaporK12(btnSave,'data_sikap',this.fokusMenu,'data-key');
    }

    controlKDSikap(dataserver,key){
        
        let controls=document.querySelectorAll('[data-control]');
        controls.forEach(teks=>{
            teks.oninput = (e)=>{
                let keykontrol  = teks.getAttribute('data-control')
                const allinput = document.querySelectorAll(`[data-key="${keykontrol}"]`);
                allinput.forEach(inputan=>{
                    let parent = inputan.parentElement; // td;
                    let row = parent.parentElement; // row
                    let iRow = row.rowIndex;

                    inputan.value = e.target.value
                    this.deskripsiSikapByRow(dataserver,iRow,'data_sikap',key);
                });
            }
        });
        const inputan_body =document.querySelectorAll('[data-key]');
        inputan_body.forEach(inputan=>{
            inputan.oninput = (e)=>{
                let v = e.target.value;
                let parent = inputan.parentElement; // td;
                let row = parent.parentElement; // row
                let iRow = row.rowIndex;
                this.deskripsiSikapByRow(dataserver,iRow,'data_sikap',key);
            }
        })
    }
    deskripsiSikapByRow (dataserver, row,idtable,key){
        const tabel = document.getElementById(idtable);
        
        let key_id = tabel.rows[row].querySelector(`[data-key="id"]`).innerHTML;
        let namasiswa = this.kbmFitur.siswaRombel.filter(s=>s.id == key_id)[0].pd_nama;
        let inputan_array_maks = tabel.rows[row].querySelector(`[data-key="${key}_array_maks"]`).value;
        let inputan_array_min = tabel.rows[row].querySelector(`[data-key="${key}_array_min"]`).value;
        let split_maks = inputan_array_maks==""?[]:inputan_array_maks.replace(/(\s+)/,'').split(',');
        let split_min = inputan_array_min==""?[]:inputan_array_min.replace(/(\s+)/,'').split(',');
        let div_deskripsi = tabel.rows[row].querySelector(`[data-key="${key}_SIKAP_DESKRIPSI"]`);

        let teks_arraymaks = split_maks.map(n=>dataserver[n]).join(', ');
        let teks_arraymin = split_min.map(n=>dataserver[n]).join(', ');
        let final = '';
        final +=`Ananda ${namasiswa} selalu ${teks_arraymaks}, dan mulai tampak ${teks_arraymin}`;
        div_deskripsi.innerHTML = final;


    }
    
    Api_absensi(){
        // const idssAbsen = this.macro['ss_absen_'+this.fokusJenjang];
        
        // let param = {
        //         'idss':idssAbsen,
        //         'tab':'responses',
        //         filter:JSON.stringify({'kelas':this.fokusRombel}),
        //         action:'read'
        //     }
            
                
                
        // let fd = new FormData();
        // Object.entries(param).forEach(([k,v])=>{
        //     fd.append(k,v);
        // });
        // const dataDB = await this.postMethodCrudController(this.crud,fd);
        
        let dataAbsen = this.service.data['responses_'+this.fokusJenjang].filter(s=>s.id !=="");
        
        let data= [];
        this.kbmFitur.siswaRombel.forEach((db)=>{
            let ob={};
            ob.id = db.id;
            ob.namasiswa = db.pd_nama;
            if(this.setApp.semester==1){
                ob.alpa =   dataAbsen.filter(s=>s.tokensiswa == db.id && s.kehadiran=='Alpa' && s.id!=="").length;
                ob.ijin =   dataAbsen.filter(s=>s.tokensiswa == db.id && s.kehadiran=='Ijin' && s.id!=="").length;
                ob.sakit =  dataAbsen.filter(s=>s.tokensiswa == db.id && s.kehadiran=='Ijin' && s.id!=="").length;
            }else{
                let time_start = new Date(this.setApp.tahunAkhir, 0,1).getTime();
                let time_end = new Date(this.setApp.tahunAkhir, 5,30).getTime();
                ob.alpa =   dataAbsen.filter(s=>s.tokensiswa == db.id && s.kehadiran=='Alpa' && s.id!=="" &&  new Date(s.Time_Stamp).getTime()>=time_start && new Date(s.Time_Stamp).getTime()<=time_end).length;
                ob.ijin =   dataAbsen.filter(s=>s.tokensiswa == db.id && s.kehadiran=='Ijin' && s.id!=="" &&  new Date(s.Time_Stamp).getTime()>=time_start && new Date(s.Time_Stamp).getTime()<=time_end).length;
                ob.sakit =  dataAbsen.filter(s=>s.tokensiswa == db.id && s.kehadiran=='Ijin' && s.id!=="" &&  new Date(s.Time_Stamp).getTime()>=time_start && new Date(s.Time_Stamp).getTime()<=time_end).length;
            }
            data.push(ob);
        })
        return data;

    }
    async absensi(){
        
        this.maincontrol.innerHTML = viewRapor.html_control_rekap_absen();
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        // this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();

        const dataApiAbsen = this.Api_absensi();//this.service.data['responses_'+this.fokusJenjang];
        
        let identitas = {
            // 'jenjang':this.fokusJenjang,
            // 'rombel':this.fokusRombel,
            // 'kurikulum':this.kbmFitur.shortKurikulum,
            // 'semester':this.Auth.semester,
            // 'dbsiswa':this.kbmFitur.siswaRombel
            'dbsiswa':dataApiAbsen,
            'rombel':this.fokusRombel,
            'semester':this.Auth.semester,
            'tapel':this.Auth.tapel,
            'sumber':'Edurasa'
        }

        let dataserver =[];// this.service.data['nilai_raport_'+this.fokusRombel];
        this.workplace.innerHTML = viewRapor.html_tabel_rekapabsen(identitas,dataserver);
        this.listener_rekap_absensi()
        const kontrols = document.querySelectorAll('[name="sorterasli"]');
        kontrols.forEach(kontrol=>{
            kontrol.onchange=(e)=>{
                
                if(e.target.value =='asli'){
                    let identitas = {
                        'dbsiswa':dataApiAbsen,
                        'rombel':this.fokusRombel,
                        'semester':this.setApp.semester,
                        'tapel':this.setApp.tapel,
                        'sumber':'Edurasa'
                    };
                    let dataserver = []
                    this.workplace.innerHTML= viewRapor.html_tabel_rekapabsen(identitas, dataserver);;
                    this.listener_rekap_absensi();
                }else{
                    let identitas = {
                        'dbsiswa':dataApiAbsen,
                        'rombel':this.fokusRombel,
                        'semester':this.setApp.semester,
                        'tapel':this.setApp.tapel,
                        'sumber':'Raport Final'
                    };
                    let dataserver = this.service.data['rekap_absen_'+this.fokusRombel+'_semester_'+this.setApp.semester];
                    this.workplace.innerHTML= viewRapor.html_tabel_rekapabsen(identitas, dataserver);;
                    this.listener_rekap_absensi()
    
                }
            }

        })

        
        
        /** listener perkembagnan */
        
        
    /** seleesai listener perkembagnan */

    }
    listener_rekap_absensi(){
        const btnSave = document.querySelector('[data-klik="simpanserver"]');
        btnSave.onclick = async()=>{
            const tabel = document.getElementById('setting_perkembangan');
            const b_tabel = tabel.querySelector('tbody');
            let parent_row = [];
            Array.from(b_tabel.rows).forEach(tr=>{
                let data = tr.querySelectorAll('[data-key]');
                let objSiswa = {}
                data.forEach(td=>{
                    let key = td.getAttribute('data-key');
                    if(td.nodeName == 'TD'){
                        objSiswa[key] = td.innerHTML;
                    }else{
                        objSiswa[key] = td.value;

                    }
                })
                parent_row.push(objSiswa);
            });
            
            let keytab = 'rekap_absen_'+this.fokusRombel+'_semester_'+this.setApp.semester
            await this.service.saveNilaiRaporMasal (parent_row,this.fokusRombel,'nilai_raport_'+this.fokusRombel,'id');
            await this.service.saveNilaiRaporMasal (parent_row,this.fokusRombel,keytab,'id');
        
            
            this[this.fokusMenu]();
            

        }
    }
    dataSiapRapor(){
        const blangkoNilaiRapor = this.service.data['blangko_nilai_raport_'+this.fokusRombel];
        let result=[];
        let koleksimapel = this.ormMapel.labelRealMapel;
        let isKurmer = this.ormMapel.isKurmer;
        koleksimapel.forEach(val=>{
            let ob_m={};
            let m = val.value;
            ob_m.mapel =m;
            ob_m.mapel_teks =val.label;
            //punyaNilai;
            ob_m.siapNilai = blangkoNilaiRapor.hasOwnProperty(m)
            ob_m.siapPredikat = blangkoNilaiRapor.hasOwnProperty(m+"_P_DESKRIPSI")
            ob_m.nilai = ( blangkoNilaiRapor.hasOwnProperty(m) &&  blangkoNilaiRapor.hasOwnProperty(m+'_P_DESKRIPSI'));
            
            if(!isKurmer){
                ob_m.siapNilaiKeterampilan = blangkoNilaiRapor.hasOwnProperty(m+'_NILAI_KETERAMPILAN')
                ob_m.siapPredikatKeterampilan = blangkoNilaiRapor.hasOwnProperty(m+"_K_DESKRIPSI")
                ob_m.nilai = (  blangkoNilaiRapor.hasOwnProperty(m) &&  blangkoNilaiRapor.hasOwnProperty(m+'_P_DESKRIPSI') && blangkoNilaiRapor.hasOwnProperty(m+'_NILAI_KETERAMPILAN') &&  blangkoNilaiRapor.hasOwnProperty(m+'_K_DESKRIPSI'));
            }
            result.push(ob_m);
        });
        result.tinggibadan = blangkoNilaiRapor.hasOwnProperty('TINGGIBADAN_SEMESTER_'+this.setApp.semester);
        result.penyakit = blangkoNilaiRapor.hasOwnProperty('PENDENGARAN_SEMESTER_'+this.setApp.semester);
        result.ekskul = blangkoNilaiRapor.hasOwnProperty('EKSKUL_1_NAMA_SEMESTER_'+this.setApp.semester);
        result.prestasi = blangkoNilaiRapor.hasOwnProperty('PRESTASI_1_NAMA_SEMESTER_'+this.setApp.semester);
        result.saran = blangkoNilaiRapor.hasOwnProperty('SARAN_SEMESTER_'+this.setApp.semester);
        result.titimangsa = blangkoNilaiRapor.hasOwnProperty('TITIMANGSA_RAPORT');
        if(this.setApp.semester == 2){
            result.kenaikan = blangkoNilaiRapor.hasOwnProperty('KENAIKAN_KELAS');
        }
        let bool = result.map(n=>n.nilai).filter(s=>s==false).length>0;
        return {datakesiapan:result,kesimpulan:!bool}
    }
    async cetakrapor(){
        
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        // this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();
        
        let cekKesiapan  = this.dataSiapRapor();

        let alamat = this.setApp.alamatSekolah+', RT'+this.setApp.alamatSekolahRt+'/RW'+this.setApp.alamatSekolahRw+' Kel. '+this.setApp.alamatSekolahkelurahan +' Kec. ' + this.setApp.alamatSekolahkecamatan;
        let dataapi = this.service.data['nilai_raport_'+this.fokusRombel];
        let bulan = this.setApp.semester==1?11:5;
        let tahun = new Date().getFullYear();
        let ttm = dataapi.length>0?dataapi[0].TITIMANGSA_RAPORT??new Date(tahun, bulan, 28):new Date(tahun, bulan, 28);
        
        const identitas = {
            'dbsiswa' : this.kbmFitur.siswaRombel,
            'kurikulum': this.kbmFitur.shortKurikulum,
            'mapelinti': this.ormMapel.labelNonAgamaIncludeMulok,
            'semester':this.setApp.semester,
            'tapel':this.setApp.tapel,
            // 'firstSiswa':this.kbmFitur.siswaRombel[0],
            // 'datanilai': this.service.data['nilai_raport_'+this.fokusRombel].filter(s=>s.id == this.kbmFitur.siswaRombel[0].id)[0],
            'fase':this.kbmFitur.namafase,
            'alamat':alamat,
            'namasekolah':this.setApp.namaSekolah,
            'kelas':this.fokusRombel,
            'jenjang':this.fokusJenjang,
            'titimangsa':new FormatTanggal(ttm).formatLong(),
            'namauser':this.setApp.namaUser,
            'namakepsek':this.setApp.namaKepsek,
            'nipkepsek':this.setApp.nipKepsek,
            'nipuser':this.setApp.nipUser
        }
        
        
        this.workplace.innerHTML = viewRapor.html_halaman_isi_rapor(identitas); 
        //buatormdulu;
        this.listener_cetakrapor();
        
    }
    listener_cetakrapor(){
        //buatOrm 
        //formatNilai Rapor
        let dataSiap= this.service.data['nilai_raport_'+this.fokusRombel];
        let fomatRapor= this.service.data['blangko_nilai_raport_'+this.fokusRombel];
        let kkmkktp = this.service.data['kkmkktp'];
        let keyFormat = Object.keys(fomatRapor);
        Object.entries(fomatRapor).forEach(([k,v])=>{
            this.ormMapel.collectionsSiswa.addProperty(k,(item)=>{
                let find = dataSiap.filter(s=>s.id == item.id)[0];
                return find[k];
            });
            if(['PAI','PKRIS','PKATO'].includes(k)){
                
                this.ormMapel.collectionsSiswa.addProperty('kkmkktp_agama',(item)=>{
                    let result = ''
                    if(k == item.mapel_kode_agama){
                        let find = kkmkktp.filter(s=> s.jenjang == this.fokusJenjang && s.kodemapel == k);
                        if(find.length>0){
                            result = find[0].kkm;
                        }
                    }
                    return result
                }).addProperty('nilairaport_P_agama',(item)=>{
                    if(item.hasOwnProperty(k)){
                        if(k == item.mapel_kode_agama){
                            return item[k];
                        }else{
                            return ''
                        }
                    }else{
                        return '';
                    }
                }).addProperty('nilairaport_K_agama',(item)=>{
                    if(item.hasOwnProperty(k+'_NILAI_KETERAMPILAN')){
                        if(k == item.mapel_kode_agama){
                            // return item[k];
                            return item[k+'_NILAI_KETERAMPILAN'];
                        }else{
                            return ''
                        }
                    }else{
                        return '';
                    }
                }).addProperty('P_DESKRIPSI_agama',(item)=>{
                    if(item.hasOwnProperty(k+'_P_DESKRIPSI')){
                        if(k == item.mapel_kode_agama){
                            // return item[k];
                            return item[k+'_P_DESKRIPSI']
                        }else{
                            return ''
                        }
                    }else{
                        return '';
                    }
                }).addProperty('P_PREDIKAT_agama',(item)=>{
                    if(item.hasOwnProperty(k+'_P_PREDIKAT')){
                        return item[k+'_P_PREDIKAT']
                    }else{
                        return '';
                    }
                }).addProperty('K_PREDIKAT_agama',(item)=>{
                    if(item.hasOwnProperty(k+'_K_PREDIKAT')){
                        return item[k+'_K_PREDIKAT']
                    }else{
                        return '';
                    }
                }).addProperty('K_DESKRIPSI_agama',(item)=>{
                    if(item.hasOwnProperty(k+'_K_DESKRIPSI')){
                        return item[k+'_K_DESKRIPSI']
                    }else{
                        return '';
                    }
                });
                    
            
            }
            if(['PKN','BINDO','MTK','IPA','IPS','IPAS','RUPA','PJOK','BSUND','SBDP'].includes(k)){
                this.ormMapel.collectionsSiswa.addProperty('kkmkktp_'+k,(item)=>{
                    let find = kkmkktp.filter(s=> s.jenjang == this.fokusJenjang && s.kodemapel == k);
                    let result = ''
                    if(find.length>0){
                        result = find[0].kkm;
                    }
                    return result
                })
            }


        })
        let data = this.ormMapel.collectionsSiswa.data;//selectProperties(keyFormat).data;
        

        
        const selectName =document.getElementById('selectTargetSiswa');
        let tag = 0;
        selectName.onchange = (e)=>{
            tag = e.target.selectedIndex;
            let val = e.target.value;
            let current = data.filter(s=>s.id == val)[0];
            
            Object.entries(current).forEach(([k,v])=>{
                let domTarget = document.querySelector(`[data-nilairapor="${k}"]`);
                let agamasiswa = current['mapel_agama_kode'];

                if(domTarget){
                    if(k=='TITIMANGSA_RAPORT'){
                        domTarget.innerHTML = new Date(v).toLocaleString('id-ID',{dateStyle:'long'});

                    }else if(k=='mapel_agama_kode'){
                        let kodemapel = current[k];
                        domTarget.innerHTML = current[kodemapel];
                    }else if(k=='kkmkktp_agama'){
                        let result='';
                        let find = kkmkktp.filter(s=> s.jenjang == this.fokusJenjang && s.kodemapel == agamasiswa);
                        if(find.length>0){
                            result = find[0].kkm;
                        }
                        domTarget.innerHTML = result;
                    }else if(k=='nilairaport_P_agama'){
                        domTarget.innerHTML = current[agamasiswa]
                    }else if(k=='nilairaport_K_agama'){
                        domTarget.innerHTML = current[agamasiswa+'_NILAI_KETERAMPILAN']
                    }else if(k=='P_PREDIKAT_agama'){
                        domTarget.innerHTML = current[agamasiswa+'_P_PREDIKAT'];

                    }else if(k=='K_PREDIKAT_agama'){
                        domTarget.innerHTML = current[agamasiswa+'_K_PREDIKAT']
                    }else if(k=='P_DESKRIPSI_agama'){
                        domTarget.innerHTML = current[agamasiswa+'_P_DESKRIPSI']
                    }else if(k=='K_DESKRIPSI_agama'){
                        domTarget.innerHTML = current[agamasiswa+'_K_DESKRIPSI']
                    }else{
                        domTarget.innerHTML = v;

                    }
                }

            })
        }
        
        selectName.dispatchEvent(new Event('change'));
        const btnPrint = document.getElementById('btnPrintKelulusan');
        btnPrint.onclick = ()=>{
            this.printPortraitDom(this.workplace)
        }
        
        const btnRight = document.getElementById('btnRight');
        const btnLeft = document.getElementById('btnLeft');
        btnRight.onclick = ()=>{
            tag++;
            if(tag >= data.length-1){
                tag = data.length-1;
            }
            selectName.selectedIndex = tag;
            selectName.dispatchEvent(new Event('change'));
        }
        btnLeft.onclick = ()=>{
            tag--;
            if(tag<0){
                tag=0
            };
            selectName.selectedIndex = tag;
            selectName.dispatchEvent(new Event('change'));
        }

    }
    async kenaikankelas(){
        if(this.setApp.semester == 1){
            this.workplace.innerHTML = 'Hanya bisa diakses untuk semester 2';
            return;
        }
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        // this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();
        
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        // this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();

        let identitas = {
            'jenjang':this.fokusJenjang,
            'rombel':this.fokusRombel,
            'kurikulum':this.kbmFitur.shortKurikulum,
            'semester':this.Auth.semester,
            'dbsiswa':this.kbmFitur.siswaRombel
        }

        let dataserver = this.service.data['nilai_raport_'+this.fokusRombel];
        this.workplace.innerHTML = viewRapor.html_edit_kenaikan(identitas,dataserver);
        const btnSave = document.querySelector("[data-klik='simpanserver']")
        this.saveToNilaiRapor(btnSave,'setting_perkembangan',this.fokusMenu,'data-key');

    }
    sumberRefrensiOlahIjazah(){
        let _kelas5semester1 = this.defineSemesterSemesterSebelumnya(3);
        
        let _kelas5semester1_prefik     = 'kelas5semester1_';
        let _kelas5semester1_rombel     = _kelas5semester1.rombelMundur;
        let _kelas5semester1_tabnilai    ='newRekapRaport_'+_kelas5semester1.rombelMundur +'_k3_'+_kelas5semester1.rombelMundur;
        let _kelas5semester1_tabnilai2   ='newRekapRaport_'+_kelas5semester1.rombelMundur+'_k4_'+_kelas5semester1.rombelMundur;
        let _kelas5semester1_ss         = 'ss_nilai_'+_kelas5semester1.jenjangMundur;
        let _kelas5semester1_api        = this.service.repo.otherMacro(_kelas5semester1.api.api);
        let _kelas5semester1_crud       = this.service.repo.otherCrud(_kelas5semester1_api.exec_crud);
        
        let _kelas5semester2 = this.defineSemesterSemesterSebelumnya(2);
        
        let _kelas5semester2_prefik = 'kelas5semester2_';
        let _kelas5semester2_rombel     = _kelas5semester2.rombelMundur;
        let _kelas5semester2_tabnilai   =  'newRekapRaport_k3_'+_kelas5semester2.rombelMundur;
        let _kelas5semester2_tabnilai2   =  'newRekapRaport_K4_'+_kelas5semester2.rombelMundur;
        let _kelas5semester2_ss         = 'ss_nilai_'+_kelas5semester2.jenjangMundur;
        let _kelas5semester2_api        = this.service.repo.otherMacro(_kelas5semester2.api.api);
        let _kelas5semester2_crud       = this.service.repo.otherCrud(_kelas5semester2_api.exec_crud);
        let param_k5s2 = [
        ];
        let param_k5s1 = [
            {
            idss    : _kelas5semester1_api[_kelas5semester1_ss],
            tab     : _kelas5semester1_tabnilai,
            },
            {
            idss    : _kelas5semester1_api[_kelas5semester1_ss],
            tab     : _kelas5semester1_tabnilai2,
            },
            
            {
            idss    : _kelas5semester2_api[_kelas5semester2_ss],
            tab     : _kelas5semester2_tabnilai,
            },
            {
            idss    : _kelas5semester2_api[_kelas5semester2_ss],
            tab     : _kelas5semester2_tabnilai2,
            },
        ];
    }
    async dataolahijazah(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        if(this.fokusJenjang == 6 && this.setApp.semester == 1){
            this.workplace.innerHTML = 'Hanya bisa diakses di semester 2';
            return;
        }else{
            if(this.fokusJenjang!=6){
                this.workplace.innerHTML = 'Hanya bisa diakses oleh guru kelas 6';
                return;
            }
        }
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        // await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        // this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        // this.ormMapel.init();
        // this.ormMapel.ormSiswaOnlyRaporAsli();
        // this.ormMapel.withNilaiRaporSiap();
        this.maincontrol.innerHTML ="";// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="selection-mapel" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.workplace.innerHTML = this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        //
        // // panggil semua data;
        if(!this.instanceOlahIjazah){
            this.instanceOlahIjazah = new IjazahFiturKurmer(this.ormMapel, this.siswa)
        }
        await this.instanceOlahIjazah.init();
        let db = this.instanceOlahIjazah.collectionSiswa.simpleFilter({'nama_rombel':this.fokusRombel}).selectProperties(['id','pd_nama','nama_rombel','olah_ijazah','nilai_akhir_ijazah']).sortByProperty('nama_rombel','asc').data;
        
        let identitas = {
            'tapel':this.setApp.tapel,
            'judul' : 'Kelas '+this.fokusRombel,
            'mapelnon': this.ormMapel.labelNonAgamaIncludeMulok//.filter(s=>s.value!=='BING')
        }
        this.workplace.innerHTML = viewRapor.viewPengolahanIjazahBaru(db,identitas,false);
        let tb = new TableProperties(document.querySelector('#rekapijazah'));
            tb.freezeColumn([1]);
            tb.addScrollUpDown();
            
        this.maincontrol.innerHTML = viewRapor.menuIjazah('refresh','Refresh Data');// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.refreshIjazah('rekapijazah');
        
    }
    async dataolahijazah_(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        if(this.fokusJenjang == 6 && this.setApp.semester == 1){
            this.workplace.innerHTML = 'Hanya bisa diakses di semester 2';
            return;
        }else{
            if(this.fokusJenjang!=6){
                this.workplace.innerHTML = 'Hanya bisa diakses oleh guru kelas 6';
                return;
            }
        }
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        // this.maincontrol.innerHTML = 'rekap nilai asli';// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();
        this.maincontrol.innerHTML = viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="selection-mapel" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.workplace.innerHTML = this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        //
        // panggil semua data;
        
        let _kelas5semester1 = this.defineSemesterSemesterSebelumnya(3);
        
        let _kelas5semester1_prefik     = 'kelas5semester1_';
        let _kelas5semester1_rombel     = _kelas5semester1.rombelMundur;
        let _kelas5semester1_tabnilai    ='newRekapRaport_'+_kelas5semester1.rombelMundur +'_k3_'+_kelas5semester1.rombelMundur;
        let _kelas5semester1_tabnilai2   ='newRekapRaport_'+_kelas5semester1.rombelMundur+'_k4_'+_kelas5semester1.rombelMundur;
        let _kelas5semester1_ss         = 'ss_nilai_'+_kelas5semester1.jenjangMundur;
        let _kelas5semester1_api        = this.service.repo.otherMacro(_kelas5semester1.api.api);
        let _kelas5semester1_crud       = this.service.repo.otherCrud(_kelas5semester1_api.exec_crud);
        
        let param_k5s1 = [
            {
            idss    : _kelas5semester1_api[_kelas5semester1_ss],
            tab     : _kelas5semester1_tabnilai,
            },
            {
            idss    : _kelas5semester1_api[_kelas5semester1_ss],
            tab     : _kelas5semester1_tabnilai2,
            },
        ];
            


        await this.service.callMultipleOtherMacro(_kelas5semester1_crud,param_k5s1,_kelas5semester1_prefik);

        let _kelas5semester2 = this.defineSemesterSemesterSebelumnya(2);
        
        let _kelas5semester2_prefik = 'kelas5semester2_';
        let _kelas5semester2_rombel     = _kelas5semester2.rombelMundur;
        let _kelas5semester2_tabnilai   =  'newRekapRaport_k3_'+_kelas5semester2.rombelMundur;
        let _kelas5semester2_tabnilai2   =  'newRekapRaport_K4_'+_kelas5semester2.rombelMundur;
        let _kelas5semester2_ss         = 'ss_nilai_'+_kelas5semester2.jenjangMundur;
        let _kelas5semester2_api        = this.service.repo.otherMacro(_kelas5semester2.api.api);
        let _kelas5semester2_crud       = this.service.repo.otherCrud(_kelas5semester2_api.exec_crud);
        let param_k5s2 = [
            {
            idss    : _kelas5semester2_api[_kelas5semester2_ss],
            tab     : _kelas5semester2_tabnilai,
            },
            {
            idss    : _kelas5semester2_api[_kelas5semester2_ss],
            tab     : _kelas5semester2_tabnilai2,
            },
        ];
        
        await this.service.callMultipleOtherMacro(_kelas5semester2_crud,param_k5s2,_kelas5semester2_prefik);
        
        
        let _kelas6semester1 = this.defineSemesterSemesterSebelumnya(1);
        
        let _kelas6semester1_prefik = 'kelas6semester1_';
        let _kelas6semester1_rombel     = _kelas6semester1.rombelMundur;
        let _kelas6semester1_tabnilai   = 'nilai_raport_'+_kelas6semester1.rombelMundur;
        let _kelas6semester1_ss         = 'ss_nilai_'+_kelas6semester1.jenjangMundur;
        let _kelas6semester1_api        = this.service.repo.otherMacro(_kelas6semester1.api.api);
        let _kelas6semester1_crud       = this.service.repo.otherCrud(_kelas6semester1_api.exec_crud);
        let param_k6s1 = {
            idss    : _kelas6semester1_api[_kelas6semester1_ss],
            tab     : _kelas6semester1_tabnilai,
            action  : 'read'
        }
        
        await this.service.nilaiRaporOtherMacro(_kelas6semester1_crud,param_k6s1,_kelas6semester1_prefik);
        
        
        
        const ijazah = new IjazahFitur(this.service,this.ormMapel.collectionsSiswa).init();
        const testSiswa = this.ormMapel.collectionsSiswa.data;
        
        const selecting = document.querySelector('[data-pradesain="selection-mapel"]');
        selecting.onchange = (e)=>{
            let identitas = {
                fokusmapel_teks : e.target.options[e.target.selectedIndex].text,
                fokusmapel      : ['PAI','PKRIS','PKATO'].includes(e.target.value)?'AGAMA':e.target.value,
                tapel           : this.setApp.tapel
            }
            this.workplace.innerHTML = viewRapor.tabelIjazahOlah(identitas,testSiswa);
        }
        selecting.dispatchEvent(new Event('change'));
    }
    async ijazahAll(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        if(this.fokusJenjang == 6 && this.setApp.semester == 1){
            this.workplace.innerHTML = 'Hanya bisa diakses di semester 2';
            return;
        }else{
            if(this.fokusJenjang!=6){
                this.workplace.innerHTML = 'Hanya bisa diakses oleh guru kelas 6';
                return;
            }
        }
        // let cekapi =this.service.repo.otherMacro(satuSemesterSebelumnya.api.api);
        // let httpOtherCrud = this.service.repo.otherCrud(cekapi.exec_crud);
        this.conditionalSubemenu();
        this.kbmFitur.settingRombel(this.fokusRombel);
        
        if(!this.instanceOlahIjazah){
            this.instanceOlahIjazah = new IjazahFiturKurmer(this.ormMapel, this.siswa)
        }
        
        if(!this.instanceOlahIjazah){
            this.instanceOlahIjazah = new IjazahFiturKurmer(this.ormMapel, this.siswa)
        }
        await this.instanceOlahIjazah.init();
        let db = this.instanceOlahIjazah.collectionSiswa.selectProperties(['id','pd_nama','nama_rombel','olah_ijazah','nilai_akhir_ijazah']).sortByProperty('nama_rombel','asc').data;
        
        let identitas = {
            'tapel':this.setApp.tapel,
            'judul' : 'Kelas 6',
            'mapelnon': this.ormMapel.labelNonAgamaIncludeMulok//.filter(s=>s.value!=='BING')
        }
        this.workplace.innerHTML = viewRapor.viewPengolahanIjazahBaru(db,identitas,true);
        let tb = new TableProperties(document.querySelector('#rekapijazah'));
            tb.freezeColumn([1]);
            tb.addScrollUpDown();
        this.maincontrol.innerHTML = viewRapor.menuIjazah('refresh','Refresh Data');// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.refreshIjazah('rekapijazah');
        
    }
    async ijazahAll_(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        if(this.fokusJenjang == 6 && this.setApp.semester == 1){
            this.workplace.innerHTML = 'Hanya bisa diakses di semester 2';
            return;
        }else{
            if(this.fokusJenjang!=6){
                this.workplace.innerHTML = 'Hanya bisa diakses oleh guru kelas 6';
                return;
            }
        }
        // let cekapi =this.service.repo.otherMacro(satuSemesterSebelumnya.api.api);
        // let httpOtherCrud = this.service.repo.otherCrud(cekapi.exec_crud);
        this.conditionalSubemenu();
        this.kbmFitur.settingRombel(this.fokusRombel);
        await this.kbmFitur.init_raport();
        
        this.ormMapel.createLabelMapel();
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();
        this.maincontrol.innerHTML = viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.kbmFitur.labelingSelectMapel,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="selection-mapel" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        const mapelNonAgama = this.ormMapel.labelNonAgamaIncludeMulok;
        let macros_2324_s2 = this.service.repo.otherMacro('t_2324_s_2');
        let macros_2324_s1 = this.service.repo.otherMacro('t_2324_s_1');
        let macros_2223_s2 = this.service.repo.otherMacro('t_2223_s_2');
        let macros_2223_s1 = this.service.repo.otherMacro('t_2223_s_1');
        let siswa = this.siswa;
        
        //kelas 5 semester 1;
        //'newRekapRaport_'+_kelas5semester1.rombelMundur +'_k3_'+_kelas5semester1.rombelMundur;
        let crud_5_1 = this.service.repo.otherCrud(macros_2223_s1['exec_crud']);
        let param_5_1 = [
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5A_k3_5A'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5B_k3_5B'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5C_k3_5C'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5A_k4_5A'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5B_k4_5B'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5C_k4_5C'//
            },
        ];

        let crud_5_2 = this.service.repo.otherCrud(macros_2223_s2['exec_crud']);
        let param_5_2 = [
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_k3_5A'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_k3_5B'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_k3_5C'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_K4_5A'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_K4_5B'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_K4_5C'
            },
        ];
//kelas6semester1_
        let crud_6_1 = this.service.repo.otherCrud(macros_2324_s1['exec_crud']);
        let param_6_1 = [
            {
                idss : macros_2324_s1['ss_nilai_6'],
                tab :'nilai_raport_6A'
            },
            {
                idss : macros_2324_s1['ss_nilai_6'],
                tab : 'nilai_raport_6B'
            },
            {
                idss : macros_2324_s1['ss_nilai_6'],
                tab : 'nilai_raport_6C'
            }
        ]

        let crud_6_2 = this.service.repo.crud;
        let param_6_2 = [
            {
                idss : macros_2324_s2['ss_nilai_6'],
                tab : 'nilai_raport_6A'
            },
            {
                idss : macros_2324_s2['ss_nilai_6'],
                tab : 'nilai_raport_6B'
            },
            {
                idss : macros_2324_s2['ss_nilai_6'],
                tab : 'nilai_raport_6C'
            }
        ]

        await this.service.callMultipleOtherMacro(crud_5_1,param_5_1,'kelas5semester1_');
        await this.service.callMultipleOtherMacro(crud_5_2,param_5_2,'kelas5semester2_');
        await this.service.callMultipleOtherMacro(crud_6_1,param_6_1,'kelas6semester1_');
        await this.service.callMultipleOtherMacro(crud_6_2,param_6_2,'');
        let data = new IjazahFitur(this.service,siswa).allInit(this.kbmFitur.collectionClass,mapelNonAgama);
        const selecting = document.querySelector('[data-pradesain="selection-mapel"]');
        selecting.onchange = (e)=>{
            let identitas = {
                fokusmapel_teks : e.target.options[e.target.selectedIndex].text,
                fokusmapel      : ['PAI','PKRIS','PKATO'].includes(e.target.value)?'AGAMA':e.target.value,
                tapel           : this.setApp.tapel
            }
            this.workplace.innerHTML = viewRapor.tabelIjazahOlah(identitas,data,true);
        }
        selecting.dispatchEvent(new Event('change'));
    }
    async cetakskl(){
        if(this.fokusJenjang == 6 && this.setApp.semester == 1){
            this.workplace.innerHTML = 'Hanya bisa diakses di semester 2';
            return;
        }else{
            if(this.fokusJenjang!=6){
                this.workplace.innerHTML = 'Hanya bisa diakses oleh guru kelas 6';
                return;
            }
        }
        const logo=this.setApp.logoDepok,logosekolah=this.setApp.logoSekolah;
                let objKetSurat = {
                    judul:'PEMERINTAH DAERAH KOTA DEPOK',
                    judul2:'DINAS PENDIDIKAN',
                    namasekolah:this.setApp.namaSekolah,
                    alamat:'Jl. SMP Ratujaya No. 41, RT 05/RW 03, Kel. Ratujaya',
                    alamat2:'NPSN: 20228914 | Email: uptdsdnratujaya1@gmail.com, web: www.sdnratujaya1.net',
                    tapelsemester:'TAHUN PELAJARAN '+this.setApp.tapel,
                    judul3:'NASKAH SOAL',
                    alamat3:'kecamatan Cipayung'
                }
                let crDom = document.createElement('div');
                crDom.setAttribute('class','kops mb-3');
                crDom.innerHTML =  kopsuratEdurasa['versi2'](logo, objKetSurat,logosekolah);
                let htmlkop = crDom.outerHTML;
                this.workplace.innerHTML = viewRapor.skl(this.siswa.filter(s=>s.jenjang ==6),htmlkop);
                const btnPrint = document.getElementById('btnPrintKelulusan');
                const targetSiswa = document.getElementById('selectTargetSiswa');
                targetSiswa.onchange = (e)=>{
                    let datasiswa = this.siswa.filter(s=> s.id == e.target.value)[0];
                    let domskl = document.querySelectorAll('[data-skl]');
                    domskl.forEach(el=>{
                        let atr = el.getAttribute('data-skl');
                        if(atr=='pd_tanggallahir'){
                            el.innerHTML = new Date(datasiswa.pd_tanggallahir).toLocaleString('id-ID',{dateStyle:'long'});
                        }else if(atr=='index'){
                            el.innerHTML = (e.target.selectedIndex+1);
                        }else{
                            el.innerHTML = datasiswa[atr]??'';
                        }
                    })

                }
                targetSiswa.dispatchEvent(new Event('change'));
                btnPrint.onclick = ()=>{
                    this.printPortraitDom(this.workplace)
                }
    }
    async cetakskl2(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        if(this.fokusJenjang == 6 && this.setApp.semester == 1){
            this.workplace.innerHTML = 'Hanya bisa diakses di semester 2';
            return;
        }else{
            if(this.fokusJenjang!=6){
                this.workplace.innerHTML = 'Hanya bisa diakses oleh guru kelas 6';
                return;
            }
        }
        // let cekapi =this.service.repo.otherMacro(satuSemesterSebelumnya.api.api);
        // let httpOtherCrud = this.service.repo.otherCrud(cekapi.exec_crud);
        this.conditionalSubemenu();
        this.kbmFitur.settingRombel(this.fokusRombel);
        
        if(!this.instanceOlahIjazah){
            this.instanceOlahIjazah = new IjazahFiturKurmer(this.ormMapel, this.siswa)
        }
        
        if(!this.instanceOlahIjazah){
            this.instanceOlahIjazah = new IjazahFiturKurmer(this.ormMapel, this.siswa)
        }
        await this.instanceOlahIjazah.init();
        let db = this.instanceOlahIjazah.collectionSiswa.selectProperties(['id','pd_nama','pd_namaayah','pd_namaibu','nis','nisn','tempat_tanggal_lahir','nama_rombel','olah_ijazah','nilai_akhir_ijazah']).sortByProperty('nama_rombel','asc').data;
        
        const identitas = {
            'nosurat' :'036',
            'tahunsurat':'2025',
            'dasarhukum':'Berdasarkan SK Kelulusan Kepala Sekolah No. 421.2/B.2-098/SKL/RJ1/V/2025 Tanggal 28 Mei 2025',
            'tanggal_kelulusan':'2 Juni 2025'

        }
        this.workplace.innerHTML = viewRapor.skl(db,identitas,true);
        this.controlPrintSkl(db,viewRapor.viewSkl);
    }
    async cetak_transkip(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        if(this.fokusJenjang == 6 && this.setApp.semester == 1){
            this.workplace.innerHTML = 'Hanya bisa diakses di semester 2';
            return;
        }else{
            if(this.fokusJenjang!=6){
                this.workplace.innerHTML = 'Hanya bisa diakses oleh guru kelas 6';
                return;
            }
        }
        // let cekapi =this.service.repo.otherMacro(satuSemesterSebelumnya.api.api);
        // let httpOtherCrud = this.service.repo.otherCrud(cekapi.exec_crud);
        this.conditionalSubemenu();
        this.kbmFitur.settingRombel(this.fokusRombel);
        
        if(!this.instanceOlahIjazah){
            this.instanceOlahIjazah = new IjazahFiturKurmer(this.ormMapel, this.siswa)
        }
        
        if(!this.instanceOlahIjazah){
            this.instanceOlahIjazah = new IjazahFiturKurmer(this.ormMapel, this.siswa)
        }
        await this.instanceOlahIjazah.init();
        let db = this.instanceOlahIjazah.collectionSiswa.selectProperties(['id','pd_nama','nis','nisn','tempat_tanggal_lahir','nama_rombel','olah_ijazah','nilai_akhir_ijazah','no_ijazah','tanggal_kelulusan','no_surat','tanggal_transkip']).sortByProperty('nama_rombel','asc').data;
        
        const identitas = {
            'nosurat' :'036',
            'tahunsurat':'2025',
            'dasarhukum':'Berdasarkan SK Kelulusan Kepala Sekolah No. 421.2/B.2-098/SKL/RJ1/V/2025 Tanggal 28 Mei 2025',
            'tanggal_kelulusan':'23 Juni 2025'

        }
        this.workplace.innerHTML = viewRapor.sklTranskip(db,identitas,true);
        console.log('database transkip',db)
        this.controlPrintSkl(db,viewRapor.viewSklTranskip);
    }
    async transkipijazah(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        if(this.fokusJenjang == 6 && this.setApp.semester == 1){
            this.workplace.innerHTML = 'Hanya bisa diakses di semester 2';
            return;
        }else{
            if(this.fokusJenjang!=6){
                this.workplace.innerHTML = 'Hanya bisa diakses oleh guru kelas 6';
                return;
            }
        }
        // let cekapi =this.service.repo.otherMacro(satuSemesterSebelumnya.api.api);
        // let httpOtherCrud = this.service.repo.otherCrud(cekapi.exec_crud);
        this.conditionalSubemenu();
        this.kbmFitur.settingRombel(this.fokusRombel);
        
        if(!this.instanceOlahIjazah){
            this.instanceOlahIjazah = new IjazahFiturKurmer(this.ormMapel, this.siswa)
        }
        
        if(!this.instanceOlahIjazah){
            this.instanceOlahIjazah = new IjazahFiturKurmer(this.ormMapel, this.siswa)
        }
        await this.instanceOlahIjazah.init();
        let db = this.instanceOlahIjazah.collectionSiswa.selectProperties(['id','pd_nama','nis','nisn','tempat_tanggal_lahir','nama_rombel','olah_ijazah','nilai_akhir_ijazah','no_ijazah','tanggal_kelulusan','no_surat']).sortByProperty('nama_rombel','asc').data;
        
        this.workplace.innerHTML = viewRapor.EditIdentitasTranskip(db);
        this.maincontrol.innerHTML = viewRapor.menuTranskip();
        let tb = new TableProperties(document.querySelector('#tabel_transkip'));
            tb.freezeColumn([2]);
            tb.addScrollUpDown();
        const tomboltanggal = document.getElementById('id_tanggal');
        const tabel = document.getElementById('tabel_transkip').querySelector('tbody');
        const btnSave = document.getElementById('simpan_server_ijazah');
        const inputmasal = document.getElementById('id_prefix');
        const inputsurat = document.getElementById('id_nosurat');
        tomboltanggal.onchange = (e)=>{
            
            for(let i = 0 ; i < tabel.rows.length ; i++){
                tabel.rows[i].cells[6].innerHTML = new Date(e.target.value).toLocaleString('id-ID',{dateStyle:'long'});
            };
        }
        inputsurat.oninput = (e)=>{
            
            for(let i = 0 ; i < tabel.rows.length ; i++){
                tabel.rows[i].cells[7].innerHTML = `421.2/${e.target.value}/${(i+1).toString().padStart(3,'0')}/SdnRaja1/VI/2025`;
            };
            let tb = new TableProperties(document.querySelector('#tabel_transkip'));
            tb.freezeColumn([2]);
            tb.addScrollUpDown();
        }
        inputmasal.oninput = (e)=>{
            
            for(let i = 0 ; i < tabel.rows.length ; i++){
                tabel.rows[i].cells[5].innerHTML = e.target.value;
            };
            let tb = new TableProperties(document.querySelector('#tabel_transkip'));
            tb.freezeColumn([2]);
            tb.addScrollUpDown();
        }
        btnSave.onclick = async()=>{
             let arr = db;
            let mapel = arr[0].olah_ijazah.map(n=>n.title);
            let arHeader = ['id','pd_nama','nis','nisn','no_surat','tanggal_kelulusan', ...mapel,'no_ijazah','rerataijazah'];
            let arrKontent = [];
            arr.forEach(item=>{
                let data = {};
                arHeader.forEach(dbt=>{
                    if(dbt =='tanggal_kelulusan'){
                        data[dbt] = document.getElementById('id_tanggal').value;
                    }else if(dbt =='no_surat'){
                        data[dbt] = document.querySelector(`[data-nosurat="${item.id}"]`).innerHTML;
                    }else if(dbt =='rerataijazah'){

                        data[dbt] = item.nilai_akhir_ijazah.nilai??"";
                    }else if(dbt =='no_ijazah'){

                        data[dbt] = document.querySelector(`[data-noijazah="${item.id}"]`).innerHTML;
                    }else if(mapel.includes(dbt)){

                        data[dbt] = item.olah_ijazah.find(s=>s.title==dbt)?.n_rerata;
                    }else{
                        data[dbt]=item[dbt];
                    }
                    
                })
                
                arrKontent.push(data);
            });
            
            await this.service.saveNilaiRaporMasal(arrKontent,6,'nilai_ijazah_6','id');
            await this.instanceOlahIjazah.init();
        }
            
    }
    controlPrintSkl(db,cb){
        let tag = 0;
        let value = 0
        const btnPrev = document.getElementById('btnLeft');
        const btnNext = document.getElementById('btnRight');
        const btnPrint = document.getElementById('btnPrintKelulusan');
        const targetSiswa = document.getElementById('selectTargetSiswa');
        btnPrev.onclick = ()=>{
            const selector = document.getElementById('selectTargetSiswa');
            if(selector.selectedIndex == 0){
                return
            }
            selector.selectedIndex-- ;
            tag = selector.selectedIndex;
            value = selector[tag].value;
            targetSiswa.dispatchEvent(new Event('change'));
        }

        btnNext.onclick = ()=>{
            const selector = document.getElementById('selectTargetSiswa');
            if(selector.selectedIndex == (db.length-1)){
                return
            }
            selector.selectedIndex++ ;
            tag = selector.selectedIndex;
            value = selector[tag].value;
            targetSiswa.dispatchEvent(new Event('change'));
        }
        
        targetSiswa.onchange = (e)=>{
            let datasiswa = db.find(s=>s.id == e.target.value);
            let domskl = document.querySelectorAll('[data-skl]');
            domskl.forEach(el=>{
                let atr = el.getAttribute('data-skl');
                if(atr=='index'){
                    el.innerHTML = (e.target.selectedIndex+1);
                }else if(atr == 'tabelbody_skl'){
                    el.innerHTML = cb(datasiswa);
                }else if(atr == 'tanggal_kelulusan'){
                    el.innerHTML = new Date(datasiswa[atr]).toLocaleString('id-ID',{dateStyle:'long'});
                }else{
                    el.innerHTML = datasiswa[atr]??'';
                }
            })

        }
        targetSiswa.dispatchEvent(new Event('change'));
        btnPrint.onclick = ()=>{
            this.printPortraitDom(this.workplace)
        }
    }
    async cetakskl2_(){
        if(this.fokusJenjang == 6 && this.setApp.semester == 1){
            this.workplace.innerHTML = 'Hanya bisa diakses di semester 2';
            return;
        }else{
            if(this.fokusJenjang!=6){
                this.workplace.innerHTML = 'Hanya bisa diakses oleh guru kelas 6';
                return;
            }
        }
        // let cekapi =this.service.repo.otherMacro(satuSemesterSebelumnya.api.api);
        // let httpOtherCrud = this.service.repo.otherCrud(cekapi.exec_crud);
        this.conditionalSubemenu();
        this.kbmFitur.settingRombel(this.fokusRombel);
        await this.kbmFitur.init_raport();
        
        this.ormMapel.createLabelMapel();
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();
        
        const mapelNonAgama = this.ormMapel.labelNonAgamaIncludeMulok;
        let macros_2324_s2 = this.service.repo.otherMacro('t_2324_s_2');
        let macros_2324_s1 = this.service.repo.otherMacro('t_2324_s_1');
        let macros_2223_s2 = this.service.repo.otherMacro('t_2223_s_2');
        let macros_2223_s1 = this.service.repo.otherMacro('t_2223_s_1');
        let siswa = this.siswa;
        
        //kelas 5 semester 1;
        //'newRekapRaport_'+_kelas5semester1.rombelMundur +'_k3_'+_kelas5semester1.rombelMundur;
        let crud_5_1 = this.service.repo.otherCrud(macros_2223_s1['exec_crud']);
        let param_5_1 = [
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5A_k3_5A'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5B_k3_5B'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5C_k3_5C'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5A_k4_5A'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5B_k4_5B'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5C_k4_5C'//
            },
        ];

        let crud_5_2 = this.service.repo.otherCrud(macros_2223_s2['exec_crud']);
        let param_5_2 = [
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_k3_5A'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_k3_5B'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_k3_5C'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_K4_5A'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_K4_5B'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_K4_5C'
            },
        ];
//kelas6semester1_
        let crud_6_1 = this.service.repo.otherCrud(macros_2324_s1['exec_crud']);
        let param_6_1 = [
            {
                idss : macros_2324_s1['ss_nilai_6'],
                tab :'nilai_raport_6A'
            },
            {
                idss : macros_2324_s1['ss_nilai_6'],
                tab : 'nilai_raport_6B'
            },
            {
                idss : macros_2324_s1['ss_nilai_6'],
                tab : 'nilai_raport_6C'
            }
        ]

        let crud_6_2 = this.service.repo.crud;
        let param_6_2 = [
            {
                idss : macros_2324_s2['ss_nilai_6'],
                tab : 'nilai_raport_6A'
            },
            {
                idss : macros_2324_s2['ss_nilai_6'],
                tab : 'nilai_raport_6B'
            },
            {
                idss : macros_2324_s2['ss_nilai_6'],
                tab : 'nilai_raport_6C'
            }
        ]

        await this.service.callMultipleOtherMacro(crud_5_1,param_5_1,'kelas5semester1_');
        await this.service.callMultipleOtherMacro(crud_5_2,param_5_2,'kelas5semester2_');
        await this.service.callMultipleOtherMacro(crud_6_1,param_6_1,'kelas6semester1_');
        await this.service.callMultipleOtherMacro(crud_6_2,param_6_2,'');
        let data = new IjazahFitur(this.service,siswa).allInit(this.kbmFitur.collectionClass,mapelNonAgama);

        const logo=this.setApp.logoDepok,logosekolah=this.setApp.logoSekolah;
                let objKetSurat = {
                    judul:'PEMERINTAH DAERAH KOTA DEPOK',
                    judul2:'DINAS PENDIDIKAN',
                    namasekolah:this.setApp.namaSekolah,
                    alamat:'Jl. SMP Ratujaya No. 41, RT 05/RW 03, Kel. Ratujaya',
                    alamat2:'NPSN: 20228914 | Email: uptdsdnratujaya1@gmail.com, web: www.sdnratujaya1.net',
                    tapelsemester:'TAHUN PELAJARAN '+this.setApp.tapel,
                    judul3:'NASKAH SOAL',
                    alamat3:'kecamatan Cipayung'
                }
                let crDom = document.createElement('div');
                crDom.setAttribute('class','kops mb-3');
                crDom.innerHTML =  kopsuratEdurasa['versi2'](logo, objKetSurat,logosekolah);
                let htmlkop = crDom.outerHTML;
                this.workplace.innerHTML = viewRapor.skl(data,htmlkop,true);
                const btnPrint = document.getElementById('btnPrintKelulusan');
                const targetSiswa = document.getElementById('selectTargetSiswa');
                targetSiswa.onchange = (e)=>{
                    let datasiswa = this.siswa.filter(s=> s.id == e.target.value)[0];
                    let domskl = document.querySelectorAll('[data-skl]');
                    domskl.forEach(el=>{
                        let atr = el.getAttribute('data-skl');
                        if(atr=='pd_tanggallahir'){
                            el.innerHTML = new Date(datasiswa.pd_tanggallahir).toLocaleString('id-ID',{dateStyle:'long'});
                        }else if(atr=='index'){
                            el.innerHTML = (e.target.selectedIndex+1);
                        }else if(atr == 'tabelbody_skl'){
                            el.innerHTML = viewRapor.viewSkl(datasiswa.olah_ijazah);
                        }else{
                            el.innerHTML = datasiswa[atr]??'';
                        }
                    })

                }
                targetSiswa.dispatchEvent(new Event('change'));
                btnPrint.onclick = ()=>{
                    this.printPortraitDom(this.workplace)
                }
    }
    async rekapijazah(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        if(this.fokusJenjang == 6 && this.setApp.semester == 1){
            this.workplace.innerHTML = 'Hanya bisa diakses di semester 2';
            return;
        }else{
            if(this.fokusJenjang!=6){
                this.workplace.innerHTML = 'Hanya bisa diakses oleh guru kelas 6';
                return;
            }
        }
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        // await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        this.maincontrol.innerHTML = viewRapor.menuIjazah('refresh','Refresh Data');// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        // this.ormMapel.init();
        // this.ormMapel.ormSiswaOnlyRaporAsli();
        // this.ormMapel.withNilaiRaporSiap();
        // this.maincontrol.innerHTML ="";// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="selection-mapel" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.workplace.innerHTML = this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        
        //
        // // panggil semua data;
        
        if(!this.instanceOlahIjazah){
            this.instanceOlahIjazah = new IjazahFiturKurmer(this.ormMapel, this.siswa)
        }
        await this.instanceOlahIjazah.init();
        
        let db = this.instanceOlahIjazah.collectionSiswa.selectProperties(['id','pd_nama','nama_rombel','olah_ijazah','nilai_akhir_ijazah']).sortByProperty('nama_rombel','asc').data;
        let identitas = {
            'tapel':this.setApp.tapel,
            'judul' : 'Kelas '+this.fokusRombel,
            'mapelnon': this.ormMapel.labelNonAgamaIncludeMulok//.filter(s=>s.value!=='BING')
        }
        this.workplace.innerHTML = viewRapor.rekapijazahkurmer(db,identitas);
        const mapelNonAgama = this.ormMapel.labelNonAgamaIncludeMulok;
        let arrayIndex = [3]; // start kolom3;
        let arrayImport = ['id','namasiswa'];
        mapelNonAgama.forEach((colmp, i_colmp)=>{
            arrayIndex.push((i_colmp+3));
            arrayImport.push(colmp.value);
        });
        arrayImport.push('rerata');
        arrayImport.push('rangking');
        let datarangking = new StatistikRangking(db)
                    .FromTable(document.getElementById('rekapijazah'))
                    .fromIndexRerata(arrayIndex)
                    .calculateRerata()
                    .calculateRangking();
        // datarangking.fillRerataInIndexColoumn(arrayIndex.length+2);
        datarangking.fillRangkinInIndexColoumn(arrayIndex.length+4);
        this.maincontrol.innerHTML = viewRapor.menuIjazah('refresh','Refresh Data');// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.refreshIjazah('rekapijazah');
        
    }
    refreshIjazah(method){
        const btn = document.querySelector('[data-klikbutton="refresh"');
        btn.onclick = async ()=>{
            await this.instanceOlahIjazah.forceInit();
            await this[method]();

        }
    }
    async rekapijazah_(){
        if(this.fokusJenjang == 6 && this.setApp.semester == 1){
            this.workplace.innerHTML = 'Hanya bisa diakses di semester 2';
            return;
        }else{
            if(this.fokusJenjang!=6){
                this.workplace.innerHTML = 'Hanya bisa diakses oleh guru kelas 6';
                return;
            }
        }
        // let cekapi =this.service.repo.otherMacro(satuSemesterSebelumnya.api.api);
        // let httpOtherCrud = this.service.repo.otherCrud(cekapi.exec_crud);
        this.conditionalSubemenu();
        this.kbmFitur.settingRombel(this.fokusRombel);
        await this.kbmFitur.init_raport();
        
        this.ormMapel.createLabelMapel();
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();
        
        const mapelNonAgama = this.ormMapel.labelNonAgamaIncludeMulok;
        let macros_2324_s2 = this.service.repo.otherMacro('t_2324_s_2');
        let macros_2324_s1 = this.service.repo.otherMacro('t_2324_s_1');
        let macros_2223_s2 = this.service.repo.otherMacro('t_2223_s_2');
        let macros_2223_s1 = this.service.repo.otherMacro('t_2223_s_1');
        let siswa = this.siswa;
        
        //kelas 5 semester 1;
        //'newRekapRaport_'+_kelas5semester1.rombelMundur +'_k3_'+_kelas5semester1.rombelMundur;
        let crud_5_1 = this.service.repo.otherCrud(macros_2223_s1['exec_crud']);
        let param_5_1 = [
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5A_k3_5A'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5B_k3_5B'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5C_k3_5C'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5A_k4_5A'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5B_k4_5B'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5C_k4_5C'//
            },
        ];

        let crud_5_2 = this.service.repo.otherCrud(macros_2223_s2['exec_crud']);
        let param_5_2 = [
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_k3_5A'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_k3_5B'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_k3_5C'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_K4_5A'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_K4_5B'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_K4_5C'
            },
        ];
//kelas6semester1_
        let crud_6_1 = this.service.repo.otherCrud(macros_2324_s1['exec_crud']);
        let param_6_1 = [
            {
                idss : macros_2324_s1['ss_nilai_6'],
                tab :'nilai_raport_6A'
            },
            {
                idss : macros_2324_s1['ss_nilai_6'],
                tab : 'nilai_raport_6B'
            },
            {
                idss : macros_2324_s1['ss_nilai_6'],
                tab : 'nilai_raport_6C'
            }
        ]

        let crud_6_2 = this.service.repo.crud;
        let param_6_2 = [
            {
                idss : macros_2324_s2['ss_nilai_6'],
                tab : 'nilai_raport_6A'
            },
            {
                idss : macros_2324_s2['ss_nilai_6'],
                tab : 'nilai_raport_6B'
            },
            {
                idss : macros_2324_s2['ss_nilai_6'],
                tab : 'nilai_raport_6C'
            }
        ]

        await this.service.callMultipleOtherMacro(crud_5_1,param_5_1,'kelas5semester1_');
        await this.service.callMultipleOtherMacro(crud_5_2,param_5_2,'kelas5semester2_');
        await this.service.callMultipleOtherMacro(crud_6_1,param_6_1,'kelas6semester1_');
        await this.service.callMultipleOtherMacro(crud_6_2,param_6_2,'');
        let data = new IjazahFitur(this.service,siswa).allInit(this.kbmFitur.collectionClass,mapelNonAgama);

        this.workplace.innerHTML = viewRapor.rekapIjazah(data);
        let arrayIndex = [2]; // start kolom3;
        let arrayImport = ['id','namasiswa'];
        mapelNonAgama.forEach((colmp, i_colmp)=>{
            arrayIndex.push((i_colmp+3));
            arrayImport.push(colmp.value);
        });
        arrayImport.push('rerata');
        arrayImport.push('rangking');
        let datarangking = new StatistikRangking(data)
                    .FromTable(document.getElementById('rekapijazah'))
                    .fromIndexRerata(arrayIndex)
                    .calculateRerata()
                    .calculateRangking();
        datarangking.fillRerataInIndexColoumn(arrayIndex.length+2);
        datarangking.fillRangkinInIndexColoumn(arrayIndex.length+3);
        let tb = new TableProperties(document.querySelector('#rekapijazah'));
            tb.freezeColumn([1]);
            tb.addScrollUpDown();
        
    }
    async rapor5semester(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        if(this.fokusJenjang == 6 && this.setApp.semester == 1){
            this.workplace.innerHTML = 'Hanya bisa diakses di semester 2';
            return;
        }else{
            if(this.fokusJenjang!=6){
                this.workplace.innerHTML = 'Hanya bisa diakses oleh guru kelas 6';
                return;
            }
        }
        // let cekapi =this.service.repo.otherMacro(satuSemesterSebelumnya.api.api);
        // let httpOtherCrud = this.service.repo.otherCrud(cekapi.exec_crud);
        this.conditionalSubemenu();
        this.kbmFitur.settingRombel(this.fokusRombel);
        
        if(!this.instanceOlahIjazah){
            this.instanceOlahIjazah = new IjazahFiturKurmer(this.ormMapel, this.siswa)
        }
        
        if(!this.instanceOlahIjazah){
            this.instanceOlahIjazah = new IjazahFiturKurmer(this.ormMapel, this.siswa)
        }
        await this.instanceOlahIjazah.init();
        let db = this.instanceOlahIjazah.collectionSiswa.selectProperties(['id','pd_nama','nama_rombel','nilai_5_semester','rerata_akhir_5_semester','is_pindahan']).sortByProperty('nama_rombel','asc').data;
        
        const identitas = {
            'judul':'Sebagai Nilai Prestasi Siswa',
            'tapel':this.setApp.tapel,
        }
        this.workplace.innerHTML = viewRapor.viewRapor5Semester(db,identitas,true);
        let tb = new TableProperties(document.querySelector('#rekapijazah'));
            tb.freezeColumn([1]);
            tb.addScrollUpDown();

    }
    async loadIjazahIfNeeded(){
        
        // let cekapi =this.service.repo.otherMacro(satuSemesterSebelumnya.api.api);
        // let httpOtherCrud = this.service.repo.otherCrud(cekapi.exec_crud);
        
        const mapelNonAgama = this.ormMapel.labelNonAgamaIncludeMulok;
        let macros_2324_s2 = this.service.repo.otherMacro('t_2324_s_2');
        let macros_2324_s1 = this.service.repo.otherMacro('t_2324_s_1');
        let macros_2223_s2 = this.service.repo.otherMacro('t_2223_s_2');
        let macros_2223_s1 = this.service.repo.otherMacro('t_2223_s_1');
        let siswa = this.siswa;
        
        //kelas 5 semester 1;
        //'newRekapRaport_'+_kelas5semester1.rombelMundur +'_k3_'+_kelas5semester1.rombelMundur;
        let crud_5_1 = this.service.repo.otherCrud(macros_2223_s1['exec_crud']);
        let param_5_1 = [
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5A_k3_5A'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5B_k3_5B'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5C_k3_5C'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5A_k4_5A'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5B_k4_5B'//
            },
            {
                idss: macros_2223_s1['ss_nilai_5'],
                tab :'newRekapRaport_5C_k4_5C'//
            },
        ];

        let crud_5_2 = this.service.repo.otherCrud(macros_2223_s2['exec_crud']);
        let param_5_2 = [
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_k3_5A'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_k3_5B'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_k3_5C'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_K4_5A'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_K4_5B'
            },
            {
                idss: macros_2223_s2['ss_nilai_5'],
                tab :'newRekapRaport_K4_5C'
            },
        ];
//kelas6semester1_
        let crud_6_1 = this.service.repo.otherCrud(macros_2324_s1['exec_crud']);
        let param_6_1 = [
            {
                idss : macros_2324_s1['ss_nilai_6'],
                tab :'nilai_raport_6A'
            },
            {
                idss : macros_2324_s1['ss_nilai_6'],
                tab : 'nilai_raport_6B'
            },
            {
                idss : macros_2324_s1['ss_nilai_6'],
                tab : 'nilai_raport_6C'
            }
        ]

        let crud_6_2 = this.service.repo.crud;
        let param_6_2 = [
            {
                idss : macros_2324_s2['ss_nilai_6'],
                tab : 'nilai_raport_6A'
            },
            {
                idss : macros_2324_s2['ss_nilai_6'],
                tab : 'nilai_raport_6B'
            },
            {
                idss : macros_2324_s2['ss_nilai_6'],
                tab : 'nilai_raport_6C'
            }
        ]

        await this.service.callMultipleOtherMacro(crud_5_1,param_5_1,'kelas5semester1_');
        await this.service.callMultipleOtherMacro(crud_5_2,param_5_2,'kelas5semester2_');
        await this.service.callMultipleOtherMacro(crud_6_1,param_6_1,'kelas6semester1_');
        await this.service.callMultipleOtherMacro(crud_6_2,param_6_2,'');
        return new IjazahFitur(this.service,siswa).allInit(this.kbmFitur.collectionClass,mapelNonAgama);
        
    }
    async cetakijazah(){
        if(this.fokusJenjang == 6 && this.setApp.semester == 1){
            this.workplace.innerHTML = 'Hanya bisa diakses di semester 2';
            return;
        }else{
            if(this.fokusJenjang!=6){
                this.workplace.innerHTML = 'Hanya bisa diakses oleh guru kelas 6';
                return;
            }
        }
        this.kbmFitur.settingRombel(this.fokusRombel);
        this.conditionalSubemenu();
        await this.kbmFitur.init_raport();
        
        this.ormMapel.createLabelMapel();
        this.ormMapel.init();
        this.ormMapel.ormSiswaOnlyRaporAsli();
        this.ormMapel.withNilaiRaporSiap();
        this.maincontrol.innerHTML = viewOrmMapel.tombolCetakIjazah();

        let  dataserverijazah = this.service.data['nilai_ijazah_6'];
        const btnPrint = document.getElementById('idprintijazah');
        const btnDetail= document.getElementById('iddetailijazah');
        btnPrint.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        btnDetail.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        let data = await this.loadIjazahIfNeeded();
        
        
        let siswa = this.siswa.filter(s=>s.jenjang == 6);
        let isFromServere = true;
        if(!dataserverijazah){
            isFromServere = false;
            await this.service.nilai_ijazah();
            dataserverijazah = this.service.data['nilai_ijazah_6'];
        }

        this.workplace.innerHTML = viewRapor.rekapIjazahPraCtak(data, dataserverijazah);
        
        let tb = new TableProperties(document.querySelector('#rekapijazah'));
            tb.freezeColumn([2]);
            tb.addScrollUpDown();
        btnPrint.innerHTML = `Surat Pernyataan`;
        btnDetail.innerHTML = `Detail Ijazah`;
        btnDetail.onclick = ()=>{
            let tag = 0;
            this.Modal.settingHeder('Panduan Penulisan Ijazah');
            this.Modal.widthOrientation(true);
            this.Modal.bodyScorallabel(true);
            let id = data[tag];
            let dataserver = dataserverijazah.filter(s=> s.id == id.id)[0]
            this.Modal.showBodyHtml(viewRapor.guidesIjazah(data[tag],dataserver,tag));
            // this.Modal.showBodyHtml(viewRapor.guidesIjazah(data[tag],dataserverijazah[tag]));
            
            this.Modal.showFooter(viewRapor.controlHTMLPrint(data));
            this.Modal.show();
            let selectEl = document.getElementById('selectTargetSiswa')
            selectEl.onchange = (e)=>{
                tag = e.target.selectedIndex;
                
                let id = data[tag];
                let dataserver = dataserverijazah.filter(s=> s.id == id.id)[0]
                this.Modal.showBodyHtml(viewRapor.guidesIjazah(data[tag],dataserver,tag));
                // this.Modal.showBodyHtml(viewRapor.guidesIjazah(data[tag],dataserverijazah[tag]));
            }
            document.getElementById('btnRight').onclick=()=>{
                tag++;
                if(tag >=data.length-1){
                    tag = data.length-1;
                }
                selectEl.selectedIndex = tag;
                selectEl.dispatchEvent(new Event('change'));
                // this.Modal.showBodyHtml(viewRapor.suratPernyataanKebenaranIjazah(data[tag],dataserverijazah[tag]));
            }
            document.getElementById('btnLeft').onclick=()=>{
                tag--;
                if(tag<0){
                    tag = data.length-1;
                }
                
                selectEl.selectedIndex = tag;
                selectEl.dispatchEvent(new Event('change'));
                // this.Modal.showBodyHtml(viewRapor.suratPernyataanKebenaranIjazah(data[tag],dataserverijazah[tag]));
            }

            document.getElementById('btnPrintKelulusan').onclick=()=>{
                this.printLandscapeDom(this.Modal.body)

            }
        }
        btnPrint.onclick = ()=>{
            let tag = 0;
            this.Modal.settingHeder('Surat Pernyataan');
            this.Modal.widthOrientation(false);
            this.Modal.bodyScorallabel(true);
            
            let id = data[tag];
            let dataserver = dataserverijazah.filter(s=> s.id == id.id)[0]
            this.Modal.showBodyHtml(viewRapor.suratPernyataanKebenaranIjazah(data[tag],dataserver));
            // this.Modal.showBodyHtml(viewRapor.suratPernyataanKebenaranIjazah(data[tag],dataserverijazah[tag]));
            
            this.Modal.showFooter(viewRapor.controlHTMLPrint(data));
            this.Modal.show();
            let selectEl = document.getElementById('selectTargetSiswa')
            selectEl.onchange = (e)=>{
                tag = e.target.selectedIndex;
                
            let id = data[tag];
            let dataserver = dataserverijazah.filter(s=> s.id == id.id)[0]
            this.Modal.showBodyHtml(viewRapor.suratPernyataanKebenaranIjazah(data[tag],dataserver));
                // this.Modal.showBodyHtml(viewRapor.suratPernyataanKebenaranIjazah(data[tag],dataserverijazah[tag]));
            }
            document.getElementById('btnRight').onclick=()=>{
                tag++;
                if(tag >=data.length-1){
                    tag = data.length-1;
                }
                selectEl.selectedIndex = tag;
                selectEl.dispatchEvent(new Event('change'));
                // this.Modal.showBodyHtml(viewRapor.suratPernyataanKebenaranIjazah(data[tag],dataserverijazah[tag]));
            }
            document.getElementById('btnLeft').onclick=()=>{
                tag--;
                if(tag<0){
                    tag = data.length-1;
                }
                
                selectEl.selectedIndex = tag;
                selectEl.dispatchEvent(new Event('change'));
                // this.Modal.showBodyHtml(viewRapor.suratPernyataanKebenaranIjazah(data[tag],dataserverijazah[tag]));
            }

            document.getElementById('btnPrintKelulusan').onclick=()=>{
                this.printPortraitDom(this.Modal.body)

            }
        };

        const btnEdit= document.querySelectorAll('[data-editijazah]');
        btnEdit.forEach(btn=>{
            btn.onclick = (e)=>{
                let id = btn.getAttribute('data-editijazah');
                let currentDataSiswa = data.filter(s=> s.id == id)[0];
                let idbarisserver = data.findIndex(s=> s.id== id);
                let currentDataserverijazah = dataserverijazah.filter(s=> s.id == id)[0]
                this.Modal.settingHeder('Detail Ijazah '+ currentDataSiswa.pd_nama);
                
                this.Modal.showBodyHtml(viewRapor.editDetailSiswaIjazahModal(currentDataSiswa,currentDataserverijazah));
                this.Modal.widthOrientation(false);
                this.Modal.showHideFooter(false);
                this.Modal.show();
                const btnSimpan = document.getElementById('simpan_ortu_di_ijazah');
                btnSimpan.onclick = async ()=>{
                    
                    let namaortu = document.getElementById('update_ortu_di_ijazah');
                    let updatayah = namaortu.value
                    let dataAssign = Object.assign({},currentDataserverijazah,{'ortu_di_ijazah':updatayah});
                    let con=confirm('Anda yakin?');
                    if(!con) return;
                    this.Modal.hide();

                    
                    await this.service.editItemIjazah(dataAssign);
                    dataserverijazah = this.service.data['nilai_ijazah_6'];
                    this.updateCetakIjazah(data,dataserverijazah)
                                        
                }
            }
        })
    }
    async sknr(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        if(this.fokusJenjang == 6 && this.setApp.semester == 1){
            this.workplace.innerHTML = 'Hanya bisa diakses di semester 2';
            return;
        }else{
            if(this.fokusJenjang!=6){
                this.workplace.innerHTML = 'Hanya bisa diakses oleh guru kelas 6';
                return;
            }
        }
        this.kbmFitur.settingRombel(this.fokusRombel)
        this.conditionalSubemenu();
        // await this.kbmFitur.init_raport();
        this.ormMapel.createLabelMapel();
        // this.maincontrol.innerHTML = viewRapor.menuIjazah('refresh','Refresh Data');// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        // this.ormMapel.init();
        // this.ormMapel.ormSiswaOnlyRaporAsli();
        // this.ormMapel.withNilaiRaporSiap();
        // this.maincontrol.innerHTML ="";// viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="selection-mapel" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.workplace.innerHTML = this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        
        //
        // // panggil semua data;
        
        if(!this.instanceOlahIjazah){
            this.instanceOlahIjazah = new IjazahFiturKurmer(this.ormMapel, this.siswa)
        }
        await this.instanceOlahIjazah.init();
        //selectProperties(['id','pd_nama','nama_rombel','olah_ijazah','nilai_akhir_ijazah'])
        let db = this.instanceOlahIjazah.collectionSiswa.selectProperties(['id','pd_nama','nis','tempat_tanggal_lahir','nisn','nama_rombel','nilai_5_semester','rerata_akhir_5_semester']).sortByProperty('nama_rombel','asc').data;
        
        
        const identitas = {
            'nosurat' :'037',
            'tapel':this.setApp.tapel,
            'tahunsurat':'2025',
            'dasarhukum':'Berdasarkan SK Kelulusan Kepala Sekolah No. 421.2/B.2-098/SKL/RJ1/V/2025 Tanggal 28 Mei 2025',
            'tanggal_kelulusan':'2 Juni 2025'

        }
        this.workplace.innerHTML = viewRapor.sknr(db,identitas,true);
        this.controlPrintSkl(db,viewRapor.sknr_fill);
    }
    updateCetakIjazah(data,dataserverijazah){
        this.workplace.innerHTML = viewRapor.rekapIjazahPraCtak(data, dataserverijazah);
        
        let tb = new TableProperties(document.querySelector('#rekapijazah'));
            tb.freezeColumn([2]);
            tb.addScrollUpDown();
        const btnEdit= document.querySelectorAll('[data-editijazah]');
        btnEdit.forEach(btn=>{
            btn.onclick = (e)=>{
                let id = btn.getAttribute('data-editijazah');
                let currentDataSiswa = data.filter(s=> s.id == id)[0];
                let idbarisserver = dataserverijazah.findIndex(s=> s.id== id);
                let currentDataserverijazah = dataserverijazah.filter(s=> s.id == id)[0]
                this.Modal.settingHeder('Detail Ijazah '+ currentDataSiswa.pd_nama);
                this.Modal.showBodyHtml(viewRapor.editDetailSiswaIjazahModal(currentDataSiswa,currentDataserverijazah));
                this.Modal.widthOrientation(false);
                this.Modal.showHideFooter(false);
                this.Modal.show();
                const btnSimpan = document.getElementById('simpan_ortu_di_ijazah');
                btnSimpan.onclick = async()=>{
                    // this.service.editItemIjazah()
                    let namaortu = document.getElementById('update_ortu_di_ijazah');
                    let updatayah = namaortu.value
                    let dataAssign = Object.assign({},currentDataserverijazah,{'ortu_di_ijazah':updatayah});
                    let con=confirm('Anda yakin?');
                    
                    if(!con) return;
                    this.Modal.hide();

                    
                    await this.service.editItemIjazah(dataAssign);
                    dataserverijazah = this.service.data['nilai_ijazah_6'];
                    this.updateCetakIjazah(data,dataserverijazah)
                    
                }
            }
        })
    }
    
    t_2425_s_1(){
        this.maincontrol.innerHTML = viewRapor.html_control_riwayat_raport(true);
        this.workplace.innerHTML = '';
        
        const kontrol = new RiwayatController(this.App,this.service,this.fokusMenu,this.fokusRombel).init();
        
        const options = document.querySelectorAll('input[name=sorterasli]');
        const divKeterangan = document.getElementById('deskripsifitur');
        
        options.forEach((opsi)=>{
            opsi.onchange = async (e)=>{
                if(e.target.value === 'rekap'){
                    let html = await kontrol.showRekap();
                    
                    divKeterangan.innerHTML =  html.fitur;
                    this.workplace.innerHTML = html.page
                }else if(e.target.value === 'raport'){
                    divKeterangan.innerHTML = `Anda Saat ini memillih fitur <b class='text-blue'>Cetak Raport</b> di Tapel ${kontrol.findMakroInduk.target.tapel} Semester ${kontrol.findMakroInduk.target.semester}<br/>Daftar siswa berdasarkan data kelas Anda di Tapel Saat ini.`;
                    
                    this.workplace.innerHTML =  'Mohon Tunggu ...';
                    await kontrol.showRaportRiwayat(this.workplace, this.printPortraitDom);
                }else if(e.target.value === 'induk'){
                    divKeterangan.innerHTML = "Anda Saat ini memillih fitur <b class='text-blue'>Cetak Buku Induk</b> di Tapel 2024/2025 Semester 1";
                    this.workplace.innerHTML =  '';
                    await kontrol.showInduk(this.workplace, this.printPortraitDom);
                    let tb = new TableProperties(document.querySelector('.toExcel'));
                    if(tb){
                        tb.addScrollUpDown();
                    }
                }
                

            }
        })
        options[0].dispatchEvent(new Event('change'));
        
    }
    
    t_2324_s_2(){
        this.maincontrol.innerHTML = viewRapor.html_control_riwayat_raport(true);
        this.workplace.innerHTML =  '';
        
        const kontrol = new RiwayatController(this.App,this.service,this.fokusMenu,this.fokusRombel).init();
        
        const options = document.querySelectorAll('input[name=sorterasli]');
        const divKeterangan = document.getElementById('deskripsifitur');
        
        options.forEach((opsi)=>{
            opsi.onchange = async (e)=>{
                if(e.target.value === 'rekap'){
                    let html = await kontrol.showRekap();
                    
                    divKeterangan.innerHTML =  html.fitur;
                    this.workplace.innerHTML = html.page;
                }else if(e.target.value === 'raport'){
                    divKeterangan.innerHTML = `Anda Saat ini memillih fitur <b class='text-blue'>Cetak Raport</b> di Tapel ${kontrol.findMakroInduk.target.tapel} Semester ${kontrol.findMakroInduk.target.semester}<br/>Daftar siswa berdasarkan data kelas Anda di Tapel Saat ini.`;
                    
                    this.workplace.innerHTML =  'Mohon Tunggu ...';
                    await kontrol.showRaportRiwayat(this.workplace, this.printPortraitDom);
                }else if(e.target.value === 'induk'){
                    divKeterangan.innerHTML = "Anda Saat ini memillih fitur <b class='text-blue'>Cetak Buku Induk</b> di Tapel 2024/2025 Semester 1";
                    this.workplace.innerHTML =  '';
                    await kontrol.showInduk(this.workplace, this.printPortraitDom);
                    let tb = new TableProperties(document.querySelector('.toExcel'));
                    if(tb){
                        tb.addScrollUpDown();
                    }
                }
                

            }
        })
        options[0].dispatchEvent(new Event('change'));
        
    }
    t_2324_s_1(){
        this.maincontrol.innerHTML = viewRapor.html_control_riwayat_raport(true);
        this.workplace.innerHTML =  '';
        
        const kontrol = new RiwayatController(this.App,this.service,this.fokusMenu,this.fokusRombel);
        
        const options = document.querySelectorAll('input[name=sorterasli]');
        const divKeterangan = document.getElementById('deskripsifitur');
        
        options.forEach((opsi)=>{
            opsi.onchange = async (e)=>{
                if(e.target.value === 'rekap'){
                    let html = await kontrol.init().showRekap();
                    
                    divKeterangan.innerHTML =  html.fitur;
                    this.workplace.innerHTML = html.page
                }else if(e.target.value === 'raport'){
                    divKeterangan.innerHTML = `Anda Saat ini memillih fitur <b class='text-blue'>Cetak Raport</b> di Tapel ${kontrol.findMakroInduk.target.tapel} Semester ${kontrol.findMakroInduk.target.semester}<br/>Daftar siswa berdasarkan data kelas Anda di Tapel Saat ini.`;
                    
                    this.workplace.innerHTML =  'Mohon Tunggu ...';
                    await kontrol.showRaportRiwayat(this.workplace, this.printPortraitDom);
                }else if(e.target.value === 'induk'){
                    divKeterangan.innerHTML = "Anda Saat ini memillih fitur <b class='text-blue'>Cetak Buku Induk</b> di Tapel 2024/2025 Semester 1";
                    this.workplace.innerHTML =  '';
                    await kontrol.showInduk(this.workplace, this.printPortraitDom);
                    let tb = new TableProperties(document.querySelector('.toExcel'));
                    if(tb){
                        tb.addScrollUpDown();
                    }
                }
                

            }
        })
        options[0].dispatchEvent(new Event('change'));
        
    }
    
    t_2223_s_2(){
        this.maincontrol.innerHTML = viewRapor.html_control_riwayat_raport(true);
        this.workplace.innerHTML =  '';
        
        const kontrol = new RiwayatController(this.App,this.service,this.fokusMenu,this.fokusRombel);
        
        const options = document.querySelectorAll('input[name=sorterasli]');
        const divKeterangan = document.getElementById('deskripsifitur');
        
        options.forEach((opsi)=>{
            opsi.onchange = async (e)=>{
                if(e.target.value === 'rekap'){
                    let html = await kontrol.init().showRekap();
                    
                    divKeterangan.innerHTML =  html.fitur;
                    this.workplace.innerHTML = html.page
                }else if(e.target.value === 'raport'){
                    divKeterangan.innerHTML = `Anda Saat ini memillih fitur <b class='text-blue'>Cetak Raport</b> di Tapel ${kontrol.findMakroInduk.target.tapel} Semester ${kontrol.findMakroInduk.target.semester}<br/>Daftar siswa berdasarkan data kelas Anda di Tapel Saat ini.`;
                    
                    this.workplace.innerHTML =  'Mohon Tunggu ...';
                    await kontrol.showRaportRiwayat(this.workplace, this.printPortraitDom);
                }else if(e.target.value === 'induk'){
                    divKeterangan.innerHTML = "Anda Saat ini memillih fitur <b class='text-blue'>Cetak Buku Induk</b> di Tapel 2024/2025 Semester 1";
                    this.workplace.innerHTML =  '';
                    await kontrol.showInduk(this.workplace, this.printPortraitDom);
                    let tb = new TableProperties(document.querySelector('.toExcel'));
                    if(tb){
                        tb.addScrollUpDown();
                    }
                }
                

            }
        })
        options[0].dispatchEvent(new Event('change'));
        
    }
    
    t_2223_s_1(){
        this.maincontrol.innerHTML = viewRapor.html_control_riwayat_raport(true);
        this.workplace.innerHTML =  '';
        
        const kontrol = new RiwayatController(this.App,this.service,this.fokusMenu,this.fokusRombel);
        
        const options = document.querySelectorAll('input[name=sorterasli]');
        const divKeterangan = document.getElementById('deskripsifitur');
        
        options.forEach((opsi)=>{
            opsi.onchange = async (e)=>{
                if(e.target.value === 'rekap'){
                    let html = await kontrol.init().showRekap();
                    
                    divKeterangan.innerHTML =  html.fitur;
                    this.workplace.innerHTML = html.page
                }else if(e.target.value === 'raport'){
                    divKeterangan.innerHTML = `Anda Saat ini memillih fitur <b class='text-blue'>Cetak Raport</b> di Tapel ${kontrol.findMakroInduk.target.tapel} Semester ${kontrol.findMakroInduk.target.semester}<br/>Daftar siswa berdasarkan data kelas Anda di Tapel Saat ini.`;
                    
                    this.workplace.innerHTML =  'Mohon Tunggu ...';
                    await kontrol.showRaportRiwayat(this.workplace, this.printPortraitDom);
                }else if(e.target.value === 'induk'){
                    divKeterangan.innerHTML = "Anda Saat ini memillih fitur <b class='text-blue'>Cetak Buku Induk</b> di Tapel 2024/2025 Semester 1";
                    this.workplace.innerHTML =  '';
                    await kontrol.showInduk(this.workplace, this.printPortraitDom);
                    let tb = new TableProperties(document.querySelector('.toExcel'));
                    if(tb){
                        tb.addScrollUpDown();
                    }
                }
                

            }
        })
        options[0].dispatchEvent(new Event('change'));
        
    }
    
    t_2122_s_2(){
        this.maincontrol.innerHTML = viewRapor.html_control_riwayat_raport(true);
        this.workplace.innerHTML =  '';
        
        const kontrol = new RiwayatController(this.App,this.service,this.fokusMenu,this.fokusRombel);
        
        const options = document.querySelectorAll('input[name=sorterasli]');
        const divKeterangan = document.getElementById('deskripsifitur');
        
        options.forEach((opsi)=>{
            opsi.onchange = async (e)=>{
                if(e.target.value === 'rekap'){
                    let html = await kontrol.init().showRekap();
                    
                    divKeterangan.innerHTML =  html.fitur;
                    this.workplace.innerHTML = html.page
                }else if(e.target.value === 'raport'){
                    divKeterangan.innerHTML = `Anda Saat ini memillih fitur <b class='text-blue'>Cetak Raport</b> di Tapel ${kontrol.findMakroInduk.target.tapel} Semester ${kontrol.findMakroInduk.target.semester}<br/>Daftar siswa berdasarkan data kelas Anda di Tapel Saat ini.`;
                    
                    this.workplace.innerHTML =  'Mohon Tunggu ...';
                    await kontrol.showRaportRiwayat(this.workplace, this.printPortraitDom);
                }else if(e.target.value === 'induk'){
                    divKeterangan.innerHTML = "Anda Saat ini memillih fitur <b class='text-blue'>Cetak Buku Induk</b> di Tapel 2024/2025 Semester 1";
                    this.workplace.innerHTML =  '';
                    await kontrol.showInduk(this.workplace, this.printPortraitDom);
                    let tb = new TableProperties(document.querySelector('.toExcel'));
                    if(tb){
                        tb.addScrollUpDown();
                    }
                }
                

            }
        })
        options[0].dispatchEvent(new Event('change'));
        
    }
    
    t_2122_s_1(){
        this.maincontrol.innerHTML = viewRapor.html_control_riwayat_raport(true);
        this.workplace.innerHTML =  '';
        
        const kontrol = new RiwayatController(this.App,this.service,this.fokusMenu,this.fokusRombel);
        
        const options = document.querySelectorAll('input[name=sorterasli]');
        const divKeterangan = document.getElementById('deskripsifitur');
        
        options.forEach((opsi)=>{
            opsi.onchange = async (e)=>{
                if(e.target.value === 'rekap'){
                    let html = await kontrol.init().showRekap();
                    
                    divKeterangan.innerHTML =  html.fitur;
                    this.workplace.innerHTML = html.page
                }else if(e.target.value === 'raport'){
                    divKeterangan.innerHTML = `Anda Saat ini memillih fitur <b class='text-blue'>Cetak Raport</b> di Tapel ${kontrol.findMakroInduk.target.tapel} Semester ${kontrol.findMakroInduk.target.semester}<br/>Daftar siswa berdasarkan data kelas Anda di Tapel Saat ini.`;
                    
                    this.workplace.innerHTML =  'Mohon Tunggu ...';
                    await kontrol.showRaportRiwayat(this.workplace, this.printPortraitDom);
                }else if(e.target.value === 'induk'){
                    divKeterangan.innerHTML = "Anda Saat ini memillih fitur <b class='text-blue'>Cetak Buku Induk</b> di Tapel 2024/2025 Semester 1";
                    this.workplace.innerHTML =  '';
                    await kontrol.showInduk(this.workplace, this.printPortraitDom);
                    let tb = new TableProperties(document.querySelector('.toExcel'));
                    if(tb){
                        tb.addScrollUpDown();
                    }
                }
                

            }
        })
        options[0].dispatchEvent(new Event('change'));
        
    }
    t_2021_s_2(){
        this.maincontrol.innerHTML = viewRapor.html_control_riwayat_raport(true);
        this.workplace.innerHTML =  '';
        
        const kontrol = new RiwayatController(this.App,this.service,this.fokusMenu,this.fokusRombel);
        
        const options = document.querySelectorAll('input[name=sorterasli]');
        const divKeterangan = document.getElementById('deskripsifitur');
        
        options.forEach((opsi)=>{
            opsi.onchange = async (e)=>{
                if(e.target.value === 'rekap'){
                    let html = await kontrol.init().showRekap();
                    
                    divKeterangan.innerHTML =  html.fitur;
                    this.workplace.innerHTML = html.page
                }else if(e.target.value === 'raport'){
                    divKeterangan.innerHTML = `Anda Saat ini memillih fitur <b class='text-blue'>Cetak Raport</b> di Tapel ${kontrol.findMakroInduk.target.tapel} Semester ${kontrol.findMakroInduk.target.semester}<br/>Daftar siswa berdasarkan data kelas Anda di Tapel Saat ini.`;
                    
                    this.workplace.innerHTML =  'Mohon Tunggu ...';
                    await kontrol.showRaportRiwayat(this.workplace, this.printPortraitDom);
                }else if(e.target.value === 'induk'){
                    divKeterangan.innerHTML = "Anda Saat ini memillih fitur <b class='text-blue'>Cetak Buku Induk</b> di Tapel 2024/2025 Semester 1";
                    this.workplace.innerHTML =  '';
                    await kontrol.showInduk(this.workplace, this.printPortraitDom);
                    let tb = new TableProperties(document.querySelector('.toExcel'));
                    if(tb){
                        tb.addScrollUpDown();
                    }
                }
                

            }
        })
        options[0].dispatchEvent(new Event('change'));
        
    }
    
    t_2021_s_1(){
        this.maincontrol.innerHTML = viewRapor.html_control_riwayat_raport(true);
        this.workplace.innerHTML =  '';
        
        const kontrol = new RiwayatController(this.App,this.service,this.fokusMenu,this.fokusRombel);
        
        const options = document.querySelectorAll('input[name=sorterasli]');
        const divKeterangan = document.getElementById('deskripsifitur');
        
        options.forEach((opsi)=>{
            opsi.onchange = async (e)=>{
                if(e.target.value === 'rekap'){
                    let html = await kontrol.init().showRekap();
                    
                    divKeterangan.innerHTML =  html.fitur;
                    this.workplace.innerHTML = html.page
                }else if(e.target.value === 'raport'){
                    divKeterangan.innerHTML = `Anda Saat ini memillih fitur <b class='text-blue'>Cetak Raport</b> di Tapel ${kontrol.findMakroInduk.target.tapel} Semester ${kontrol.findMakroInduk.target.semester}<br/>Daftar siswa berdasarkan data kelas Anda di Tapel Saat ini.`;
                    
                    this.workplace.innerHTML =  'Mohon Tunggu ...';
                    await kontrol.showRaportRiwayat(this.workplace, this.printPortraitDom);
                }else if(e.target.value === 'induk'){
                    divKeterangan.innerHTML = "Anda Saat ini memillih fitur <b class='text-blue'>Cetak Buku Induk</b> di Tapel 2024/2025 Semester 1";
                    this.workplace.innerHTML =  '';
                    await kontrol.showInduk(this.workplace, this.printPortraitDom);
                    let tb = new TableProperties(document.querySelector('.toExcel'));
                    if(tb){
                        tb.addScrollUpDown();
                    }
                }
                

            }
        })
        options[0].dispatchEvent(new Event('change'));
        
    }
    t_1920_s_2(){
        this.maincontrol.innerHTML = viewRapor.html_control_riwayat_raport(true);
        this.workplace.innerHTML =  '';
        
        const kontrol = new RiwayatController(this.App,this.service,this.fokusMenu,this.fokusRombel);
        
        const options = document.querySelectorAll('input[name=sorterasli]');
        const divKeterangan = document.getElementById('deskripsifitur');
        
        options.forEach((opsi)=>{
            opsi.onchange = async (e)=>{
                if(e.target.value === 'rekap'){
                    let html = await kontrol.init().showRekap();
                    
                    divKeterangan.innerHTML =  html.fitur;
                    this.workplace.innerHTML = html.page
                }else if(e.target.value === 'raport'){
                    divKeterangan.innerHTML = `Anda Saat ini memillih fitur <b class='text-blue'>Cetak Raport</b> di Tapel ${kontrol.findMakroInduk.target.tapel} Semester ${kontrol.findMakroInduk.target.semester}<br/>Daftar siswa berdasarkan data kelas Anda di Tapel Saat ini.`;
                    
                    this.workplace.innerHTML =  'Mohon Tunggu ...';
                    await kontrol.showRaportRiwayat(this.workplace, this.printPortraitDom);
                }else if(e.target.value === 'induk'){
                    divKeterangan.innerHTML = "Anda Saat ini memillih fitur <b class='text-blue'>Cetak Buku Induk</b> di Tapel 2024/2025 Semester 1";
                    this.workplace.innerHTML =  '';
                    await kontrol.showInduk(this.workplace, this.printPortraitDom);
                    let tb = new TableProperties(document.querySelector('.toExcel'));
                    if(tb){
                        tb.addScrollUpDown();
                    }
                }
                

            }
        })
        options[0].dispatchEvent(new Event('change'));
        
    }
    
    t_1920_s_1(){
        this.maincontrol.innerHTML = viewRapor.html_control_riwayat_raport(true);
        this.workplace.innerHTML =  '';
        
        const kontrol = new RiwayatController(this.App,this.service,this.fokusMenu,this.fokusRombel);
        
        const options = document.querySelectorAll('input[name=sorterasli]');
        const divKeterangan = document.getElementById('deskripsifitur');
        
        options.forEach((opsi)=>{
            opsi.onchange = async (e)=>{
                if(e.target.value === 'rekap'){
                    let html = await kontrol.init().showRekap();
                    
                    divKeterangan.innerHTML =  html.fitur;
                    this.workplace.innerHTML = html.page
                }else if(e.target.value === 'raport'){
                    divKeterangan.innerHTML = `Anda Saat ini memillih fitur <b class='text-blue'>Cetak Raport</b> di Tapel ${kontrol.findMakroInduk.target.tapel} Semester ${kontrol.findMakroInduk.target.semester}<br/>Daftar siswa berdasarkan data kelas Anda di Tapel Saat ini.`;
                    
                    this.workplace.innerHTML =  'Mohon Tunggu ...';
                    await kontrol.showRaportRiwayat(this.workplace, this.printPortraitDom);
                }else if(e.target.value === 'induk'){
                    divKeterangan.innerHTML = "Anda Saat ini memillih fitur <b class='text-blue'>Cetak Buku Induk</b> di Tapel 2024/2025 Semester 1";
                    this.workplace.innerHTML =  '';
                    await kontrol.showInduk(this.workplace, this.printPortraitDom);
                    let tb = new TableProperties(document.querySelector('.toExcel'));
                    if(tb){
                        tb.addScrollUpDown();
                    }
                }
                

            }
        })
        options[0].dispatchEvent(new Event('change'));
        
    }
    t_1819_s_2(){
        this.maincontrol.innerHTML = viewRapor.html_control_riwayat_raport(true);
        this.workplace.innerHTML =  '';
        
        const kontrol = new RiwayatController(this.App,this.service,this.fokusMenu,this.fokusRombel);
        
        const options = document.querySelectorAll('input[name=sorterasli]');
        const divKeterangan = document.getElementById('deskripsifitur');
        
        options.forEach((opsi)=>{
            opsi.onchange = async (e)=>{
                if(e.target.value === 'rekap'){
                    let html = await kontrol.init().showRekap();
                    
                    divKeterangan.innerHTML =  html.fitur;
                    this.workplace.innerHTML = html.page
                }else if(e.target.value === 'raport'){
                    divKeterangan.innerHTML = `Anda Saat ini memillih fitur <b class='text-blue'>Cetak Raport</b> di Tapel ${kontrol.findMakroInduk.target.tapel} Semester ${kontrol.findMakroInduk.target.semester}<br/>Daftar siswa berdasarkan data kelas Anda di Tapel Saat ini.`;
                    
                    this.workplace.innerHTML =  'Mohon Tunggu ...';
                    await kontrol.showRaportRiwayat(this.workplace, this.printPortraitDom);
                }else if(e.target.value === 'induk'){
                    divKeterangan.innerHTML = "Anda Saat ini memillih fitur <b class='text-blue'>Cetak Buku Induk</b> di Tapel 2024/2025 Semester 1";
                    this.workplace.innerHTML =  '';
                    await kontrol.showInduk(this.workplace, this.printPortraitDom);
                    let tb = new TableProperties(document.querySelector('.toExcel'));
                    if(tb){
                        tb.addScrollUpDown();
                    }
                }
                

            }
        })
        options[0].dispatchEvent(new Event('change'));
        
    }
    
    t_1819_s_1(){
        this.maincontrol.innerHTML = viewRapor.html_control_riwayat_raport(true);
        this.workplace.innerHTML =  '';
        
        const kontrol = new RiwayatController(this.App,this.service,this.fokusMenu,this.fokusRombel);
        
        const options = document.querySelectorAll('input[name=sorterasli]');
        const divKeterangan = document.getElementById('deskripsifitur');
        
        options.forEach((opsi)=>{
            opsi.onchange = async (e)=>{
                if(e.target.value === 'rekap'){
                    let html = await kontrol.init().showRekap();
                    
                    divKeterangan.innerHTML =  html.fitur;
                    this.workplace.innerHTML = html.page
                }else if(e.target.value === 'raport'){
                    divKeterangan.innerHTML = `Anda Saat ini memillih fitur <b class='text-blue'>Cetak Raport</b> di Tapel ${kontrol.findMakroInduk.target.tapel} Semester ${kontrol.findMakroInduk.target.semester}<br/>Daftar siswa berdasarkan data kelas Anda di Tapel Saat ini.`;
                    
                    this.workplace.innerHTML =  'Mohon Tunggu ...';
                    await kontrol.showRaportRiwayat(this.workplace, this.printPortraitDom);
                }else if(e.target.value === 'induk'){
                    divKeterangan.innerHTML = "Anda Saat ini memillih fitur <b class='text-blue'>Cetak Buku Induk</b> di Tapel 2024/2025 Semester 1";
                    this.workplace.innerHTML =  '';
                    await kontrol.showInduk(this.workplace, this.printPortraitDom);
                    let tb = new TableProperties(document.querySelector('.toExcel'));
                    if(tb){
                        tb.addScrollUpDown();
                    }
                }
                

            }
        })
        options[0].dispatchEvent(new Event('change'));
        
    }
    
   
}