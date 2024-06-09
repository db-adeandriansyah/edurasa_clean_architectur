import ArsipNaskah from "../controller_features/arsipnaskah/ArsipNaskah";
import CreateKbmFromDesignOrArsip from "../controller_features/kbm/CreateKbmFromDesignOrArsip";
import KbmFitur from "../controller_features/kbm/KbmFitur";
import OrmMapel from "../controller_features/mapel/OrmMapel";
import viewOrmMapel from "../controller_features/mapel/viewOrmMapel";
import DesainNaskahSoal from "../controller_features/naskahsoal/DesainNaskahSoal";
import OlahNilaiKbm from "../controller_features/olahnilai/OlahNilaiKbm";
import viewRapor from "../controller_features/raport/viewRapor";
import { FormatTanggal, ModalConfig } from "../entries/vendor";
import garuda from "../img/garuda_pancasila.svg";
// import garuda from "../img/gar"
import tut_wuri_handayani from '../img/tut_wuri_handayani_higher_resolutions.png';

import Fitur from "./Fitur";

export default class KbmController extends Fitur{
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
    }
    async kbm_online(){
        await this.kbmFitur.settingRombel(this.fokusRombel).init_kbmonline();
        
        const olahNilaiKbm = new OlahNilaiKbm(this.kbmFitur, this.Modal, this.Modal1, this.Auth,this.App.tooltipkan,this.kbm_online);
        olahNilaiKbm.createTableData();
        
        const switchReload = document.getElementById('btnreloadhendler');
        switchReload.onchange = (e)=>{
            if(e.target.checked){
                
                this.reload = setInterval(async()=>{
                    let loadedApi = this.kbmFitur.arrayTagihanPerJenjang;
                    await this.service.callPropertiMultipleWithPrefik(loadedApi);
                    this.kbmFitur.init_kbmonline();
                    olahNilaiKbm.createTableData();
                    
                },30000);
                this.arrayReload.push(this.reload);
            }else{
                this.arrayReload.forEach(n=>clearInterval(n));
                
            }
        }
        this.reload = setInterval(async()=>{
            
            let loadedApi = this.kbmFitur.arrayTagihanPerJenjang;
            await this.service.callPropertiMultipleWithPrefik(loadedApi);
            this.kbmFitur.init_kbmonline();
            olahNilaiKbm.createTableData();
        },30000);
        this.arrayReload.push(this.reload);
        
    }
    async new_harian(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.arrayReload.forEach(n=>clearInterval(n));
        await this.kbmFitur.settingRombel(this.fokusRombel).init_kbmonline();
        this.ormMapel.createLabelMapel();
        this.maincontrol.innerHTML = viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="groupBy_PH_nilai" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        console.log(this.ormMapel.collectionsSiswa)
        this.ormMapel.selectingMapel('groupBy_PH_nilai');
    }
    
    async new_tengahsemester(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.arrayReload.forEach(n=>clearInterval(n));
        await this.kbmFitur.settingRombel(this.fokusRombel).init_kbmonline();
        // this.ormMapel.createLabelMapel().createNilaiMapelonCurrentSiswaRombel().init()
        this.ormMapel.createLabelMapel();
        this.maincontrol.innerHTML = viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="groupBy_PTS_nilai" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.selectingMapel('groupBy_PTS_nilai');
    }
    async new_akhirsemester(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.arrayReload.forEach(n=>clearInterval(n));
        await this.kbmFitur.settingRombel(this.fokusRombel).init_kbmonline();
        // this.ormMapel.createLabelMapel().createNilaiMapelonCurrentSiswaRombel().init()
        this.ormMapel.createLabelMapel();
        this.maincontrol.innerHTML = viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="groupBy_PASPAK_nilai" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.selectingMapel('groupBy_PASPAK_nilai');
    }
    async new_rekapraport(){
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.arrayReload.forEach(n=>clearInterval(n));
        await this.kbmFitur.settingRombel(this.fokusRombel).init_kbmonline();
        // this.ormMapel.createLabelMapel().createNilaiMapelonCurrentSiswaRombel().init()
        this.ormMapel.createLabelMapel();
        this.maincontrol.innerHTML = viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.init();
        this.ormMapel.selectingMapelRapor();
        console.log(this.ormMapel.collectionsSiswa.data)
    }
    async new_rekapraportketerampilan(){
        
        this.workplace.innerHTML = `<img src="${this.Auth.barloading}" class="w3-tiny"/>`;
        this.arrayReload.forEach(n=>clearInterval(n));
        this.kbmFitur.settingRombel(this.fokusRombel)
        await this.kbmFitur.init_kbmonline();
        // this.ormMapel.createLabelMapel().createNilaiMapelonCurrentSiswaRombel().init()
        this.ormMapel.createLabelMapel();
        this.ormMapel.init();
        
            if(this.ormMapel.isKurmer){
                this.workplace.innerHTML = "HANYA UNTUK KURIKULUM 2013";
                return;
            }
        this.maincontrol.innerHTML = viewOrmMapel.cardMapel(['pilihmapel','Pilih Mapel',this.ormMapel.labelRealMapel ,this.kbmFitur.isGuruMapel?this.kbmFitur.mapelAjar:'PAI',` data-pradesain="rapor_sementara" ${this.kbmFitur.isGuruMapel?'disabled':''}`]);
        this.ormMapel.selectingMapelRaporKeterampilan();
        console.log(this.ormMapel.collectionsSiswa.data)
    }
    sampulraport(){
        this.arrayReload.forEach(n=>clearInterval(n));
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
    async kbm_create(){
        this.arrayReload.forEach(n=>clearInterval(n));
        this.workplace.innerHTML = 'Untuk Saat ini, gunakan fitur Bank Soal untuk membuat KBM';
        //test arsip naskah;
        this.footerarea.innerHTML = "";
        this.kbmFitur.rombel = this.fokusRombel;
        this.kbmFitur.settingJenjang(this.fokusJenjang);
        this.kbmFitur.settingArsipNaskah();;
        
        await this.kbmFitur.init();
        
        let arsipNaskah = this.makeInstance(ArsipNaskah,[
            this.kbmFitur,
            document.getElementById('printarea'),
            document.getElementById('maincontrol'), 
            this.Modal,
            this.Modal1
        ]);
        let desainNaskah = this.makeInstance(DesainNaskahSoal,[
            this.kbmFitur,
            document.getElementById('printarea'), 
            document.getElementById('maincontrol'),
            this.Modal,
            this.Modal1
        ]);
        let kbmCreateClass = this.makeInstance(CreateKbmFromDesignOrArsip,[
            this.kbmFitur,
            arsipNaskah,
            desainNaskah
        ]);
        
        // kbmCreateClass.DesainNaskah.createTool();
        // kbmCreateClass.DesainNaskah.init();
    }
    
}