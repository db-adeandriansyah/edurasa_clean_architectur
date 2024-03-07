// import { tabelDom } from "../../entries/vendor";
import Sppd from "../../domains/SPPD";
import  SuratKeluar  from "../../domains/SuratKeluar";
import { SuratMasuk } from "../../models/SuratMasuk";
import {default as DomainSuratMasuk}  from "../../domains/SuratMasuk";
import { FormatTanggal, TableProperties } from "../../entries/vendor";
import OrmSppd from "./OrmSppd";
import OrmSuratKeluar from "./OrmSuratKeluar";
import { boleanHtmlRefrensiSuratMasuk, checkBoxSiswa, checkBoxTargetPersonal, checkboxSppdPTK, createSuratKeluar, detailSppd, domSelectRombel, infoTambahanCreateSurat, modalPtkDiperintah, modalSuratSiswa, modalViewSppd, modalViewSuratByTemplate, tabelSppd, tabelSuratKeluar, tabelSuratMasuk, vieModalKonfirmasiSebelumCreateSppd, viewFormulirSuratMasuk, viewResultCariSuratmasuk } from "./ViewSuratFeatures";
import OrmSuratMasuk from "./OrmSuratMasuk";

export default class SuratFeature{
    #dbSuratKeluar;
    #fnFokusMenu;
    #ormSuratKeluar;
    constructor(service,modal,modal1,user,ptk,ptkall,siswa,fokusrombel){
        this.service = service;
        this.user = user; //currentUser
        this.ptk = ptk; //AllUserPTK
        this.siswa = siswa;
        this.ptkall = ptkall; //AllUserWithDetailTendik
        this.fokusrombel=fokusrombel
        this.Modal=modal;
        this.Modal1=modal1;
        this.workplace = document.getElementById('printarea');

        this.fnJudul = {};
        this.htmlJudul = '';
        this.#dbSuratKeluar = [];
        this.#fnFokusMenu = null;
        this.siswarombel = [];
        this.#ormSuratKeluar = [];
    }
    get imgLoading(){
        return `<img src="${this.user.barloading}" alt="proses loading"/>`;
    }
    get identitasKop(){
        return  {
            judul:'PEMERINTAH DAERAH KOTA DEPOK',
            judul2:'DINAS PENDIDIKAN',
            namasekolah:this.user.namaSekolah,
            alamat:'Jl. SMP Ratujaya No. 41, RT 05/RW 03, Kel. Ratujaya',
            alamat2:'NPSN: 20228914 | Email: uptdsdnratujaya1@gmail.com, web: www.sdnratujaya1.net',
            tapelsemester:'TAHUN PELAJARAN '+this.user.tapel,
            judul3:'NASKAH SOAL',
            alamat3:'kecamatan Cipayung'
        }
    }
    canUploadFileSurat(iduser){
        return (iduser == this.user.idUser || this.user.canEdit) ;
    }
    ormSuratMasuk(){
        
        const db = new OrmSuratMasuk(
            this.service.dbSuratMasuk,
            this.canUploadFileSurat,
            this.user
            );
        
        db.settingSort('desc');  
        
        return db;
    }
    ormSuratkeluar(){
        const db = new OrmSuratKeluar(
            this.service.dbSuratKeluar, 
            this.service.dbSuratMasuk, 
            this.service.dbSppd, 
            this.user,
            this.service.dbPtk,
            // this.service.dbPtk,
            this.siswa,
            this.canUploadFileSurat,
            this.ptkall
            );

        db.settingSort('desc');  

        return db;
    }
    showSuratKeluar(){
        const db = this.ormSuratkeluar() ;

        let par = db.dbSuratKeluar;

        if(arguments.length>0 && typeof(arguments[0])=='number'){
            par= db.dbSuratKeluar.filter((s,i)=> i < arguments[0]);
        }else if(arguments.length>0 && (arguments[0] instanceof Date)){
            par = db.dbSuratKeluar.filter(s=>new Date(s.tglsurat).getFullYear() ==new Date(arguments[0]).getFullYear() );
        }
        
        let data = {db:par,judul:this.htmlJudul};
        
        this.workplace.innerHTML = tabelSuratKeluar(data);

        let tb = new TableProperties(document.querySelector('#tabel-suratkeluar'));
            tb.addScrollUpDown();

        this.listenerDataShow(par,'showSuratKeluar',[...arguments]);
    }

    showSPPD(){
        const db = this.ormSuratkeluar() ;

        let par = db.dbSuratKeluar.filter(s=>s.indekssurat =='SPPD');

        if(arguments.length>0 && typeof(arguments[0])=='number'){
            par= db.dbSuratKeluar.filter((s,i)=> i <  arguments[0] && s.indekssurat =='SPPD');
        }else if(arguments.length>0 && (arguments[0] instanceof Date)){
            par = db.dbSuratKeluar.filter(s=>new Date(s.tglsurat).getFullYear() == new Date(arguments[0]).getFullYear() && s.indekssurat =='SPPD' );
        }
        
        let data = {db:par,judul:this.htmlJudul};
        
        this.workplace.innerHTML = tabelSppd(data);

        let tb = new TableProperties(document.querySelector('#tabel-suratkeluar'));
            tb.addScrollUpDown();

        this.listenerDataShow(par,'showSPPD',[...arguments]);
    }
    showSuratKeteranganAktif(){
        const db = this.ormSuratkeluar() ;

        let par = db.dbSuratKeluar.filter(s=>s.indekssurat =='Surat Keterangan Aktif');

        if(arguments.length>0 && typeof(arguments[0])=='number'){
            par= db.dbSuratKeluar.filter((s,i)=> i <  arguments[0] && s.indekssurat =='Surat Keterangan Aktif');
        }else if(arguments.length>0 && (arguments[0] instanceof Date)){
            par = db.dbSuratKeluar.filter(s=>new Date(s.tglsurat).getFullYear() == new Date(arguments[0]).getFullYear() && s.indekssurat =='Surat Keterangan Aktif' );
        }
        
        let data = {db:par,judul:this.htmlJudul};
        
        this.workplace.innerHTML = tabelSuratKeluar(data);

        let tb = new TableProperties(document.querySelector('#tabel-suratkeluar'));
            tb.addScrollUpDown();

        this.listenerDataShow(par,'showSuratKeteranganAktif',[...arguments]);
    }
    showSuratKeteranganNISN(){
        const db = this.ormSuratkeluar() ;

        let par = db.dbSuratKeluar.filter(s=>s.indekssurat =='Surat Keterangan NISN');

        if(arguments.length>0 && typeof(arguments[0])=='number'){
            par= db.dbSuratKeluar.filter((s,i)=> i <  arguments[0] && s.indekssurat =='Surat Keterangan NISN');
        }else if(arguments.length>0 && (arguments[0] instanceof Date)){
            par = db.dbSuratKeluar.filter(s=>new Date(s.tglsurat).getFullYear() == new Date(arguments[0]).getFullYear() && s.indekssurat =='Surat Keterangan NISN' );
        }
        
        let data = {db:par,judul:this.htmlJudul};
        
        this.workplace.innerHTML = tabelSuratKeluar(data);

        let tb = new TableProperties(document.querySelector('#tabel-suratkeluar'));
            tb.addScrollUpDown();

        this.listenerDataShow(par,'showSuratKeteranganNISN',[...arguments]);
    }
    showSuratKeteranganDiterima(){
        const db = this.ormSuratkeluar() ;

        let par = db.dbSuratKeluar.filter(s=>s.indekssurat =='Surat Keterangan Diterima');

        if(arguments.length>0 && typeof(arguments[0])=='number'){
            par= db.dbSuratKeluar.filter((s,i)=> i <  arguments[0] && s.indekssurat =='Surat Keterangan Diterima');
        }else if(arguments.length>0 && (arguments[0] instanceof Date)){
            par = db.dbSuratKeluar.filter(s=>new Date(s.tglsurat).getFullYear() == new Date(arguments[0]).getFullYear() && s.indekssurat =='Surat Keterangan Diterima' );
        }
        
        let data = {db:par,judul:this.htmlJudul};
        
        this.workplace.innerHTML = tabelSuratKeluar(data);

        let tb = new TableProperties(document.querySelector('#tabel-suratkeluar'));
            tb.addScrollUpDown();

        this.listenerDataShow(par,'showSuratKeteranganDiterima',[...arguments]);
    }
    
    showSuratKeteranganPindahSekolah(){
        const db = this.ormSuratkeluar() ;

        let par = db.dbSuratKeluar.filter(s=>s.indekssurat =='Surat Keterangan Pindah');

        if(arguments.length>0 && typeof(arguments[0])=='number'){
            par= db.dbSuratKeluar.filter((s,i)=> i <  arguments[0] && s.indekssurat =='Surat Keterangan Pindah');
        }else if(arguments.length>0 && (arguments[0] instanceof Date)){
            par = db.dbSuratKeluar.filter(s=>new Date(s.tglsurat).getFullYear() == new Date(arguments[0]).getFullYear() && s.indekssurat =='Surat Keterangan Pindah' );
        }
        
        let data = {db:par,judul:this.htmlJudul};
        
        this.workplace.innerHTML = tabelSuratKeluar(data);

        let tb = new TableProperties(document.querySelector('#tabel-suratkeluar'));
            tb.addScrollUpDown();

        this.listenerDataShow(par,'showSuratKeteranganPindahSekolah',[...arguments]);
    }
    showSuratMasuk(){
        const db = this.ormSuratMasuk();

        let par = db.dbSuratMasuk;

        if(arguments.length>0 && typeof(arguments[0])=='number'){
            par= db.dbSuratMasuk.filter((s,i)=> i < arguments[0]);
        }else if(arguments.length>0 && (arguments[0] instanceof Date)){
            par = db.dbSuratMasuk.filter(s=>new Date(s.tglsurat).getFullYear() ==new Date(arguments[0]).getFullYear() );
        }
        
        let data = {db:par,judul:this.htmlJudul};
        this.workplace.innerHTML = tabelSuratMasuk(data);
        
        let tb = new TableProperties(document.querySelector('#tabel-suratmasuk'));
            tb.addScrollUpDown();

        this.listenerDataShow(par,'showSuratMasuk',[...arguments]);
    }
    listenerDataShow(db,firstmethod,arg){
        const btns = document.querySelectorAll('[data-show]');
        
        btns.forEach(btn=>{
            btn.onclick = (e)=> {
                let atr = btn.getAttribute('data-show');
                let idsuratkeluar = btn.getAttribute('data-idsuratkeluar');
                let camelCase_atr = atr.replace(/(\s+)/g,'_');
                let camelCase_atr_lower = camelCase_atr.toLocaleLowerCase();
                let metod = 'lds_'+camelCase_atr_lower;
                let arraySuratTemplate = ['Surat Keterangan Aktif','Surat Keterangan NISN','Surat Keterangan Diterima','Surat Keterangan Pindah']
                
                if(this[metod]){
                    //untuk method yang dibuatkan methodnya
                    this[metod](db,idsuratkeluar,firstmethod,arg)
                }else if(arraySuratTemplate.includes(atr)){
                    this.surat_keterangan_siswa_template(db,idsuratkeluar,atr,firstmethod,arg)
                    
                }else{
                    alert('belum tersedia untuk '+ metod +'\r'+ atr)
                }
            };
        });

        const btnCreate = document.getElementById('btn_new_surat');
        if(btnCreate){
            btnCreate.onclick = (e)=> this.createSurat(firstmethod,arg);
        }
    }
    createSurat(firstmethod,arg){
        let method = 'new_'+firstmethod;
        if(this[method]){
            this[method](firstmethod,arg);
        }else{
            alert('belum dibuatkan method : ' + method);
        }

    }
    new_showSuratKeluar(firstmethod,arg){
        let  view = this.formulirSuratKeluar({'addUpload':true,'addTarget':false});
        this.Modal.settingHeder('Tambah Surat Keluar');
        this.Modal.showBodySaveButton(view);
        this.Modal.show();
        document.getElementById('indekssurat').removeAttribute('disabled');
        let data = {
            idNamaFile:'indekssurat',
            propertiImageController:{
                folder:'Surat Keluar',
                subfolder:'Lainnya',
                // namafile:'Surat_Masuk_Lainnya_'+(new Date().getTime())+'_'+files.name
            }
        }
        this.eventFormulirSuratKeluar('Modal')
        this.eventBuatSuratMasukInModal(data);
        const btnSave = document.getElementById('btn-modal-savebutton');
        btnSave.onclick = async()=>{
            let data = this.autoDetectedForm('data-formulircreate','name="checkboxpersonal"','target_ptk');
            let c = Object.values(data).filter(s=>s!=="").length;
            
            if(c<=5){
                alert('Input tidak boleh kosong!');
                return ;
            }
            let conf = confirm('Anda yakin?');
            if(!conf) return;
            
            let dataUpdateSuratkeluar = new SuratKeluar(data).sanitize().data;
            dataUpdateSuratkeluar.oleh = this.user.namaUser;
            dataUpdateSuratkeluar.user = this.user.idUser;
            
            await this.service.saveSuratKeluar(dataUpdateSuratkeluar);
            this.Modal.toggle();
            this[firstmethod](...arg);
            
        }
    }
    new_showSPPD(firstmethod,arg){
        let pilihanKetersediaanSuratMasukSPPD = vieModalKonfirmasiSebelumCreateSppd();
        this.Modal.settingHeder('Dasar SPPD (surat undangan sudah didata di surat masuk)')
        this.Modal.showBodyHtml(pilihanKetersediaanSuratMasukSPPD);
        this.Modal.showHideFooter(false);
        this.Modal.show();
        let btns = document.querySelectorAll('[data-aksibeforesppd]');
        btns.forEach(btn=>{
            btn.onclick = ()=>{
                let atr = btn.getAttribute('data-aksibeforesppd');
                if(atr == 'buatsuratmasuk'){
                    let data = {
                        tglditerima_input:new FormatTanggal(new Date()).valueInputDate(),
                        asalsurat:'',
                        status:'diarsipkan',
                        oleh:this.user.namaUser,
                        nosurat:'',
                        tglsurat_input:new FormatTanggal(new Date()).valueInputDate(),
                        indekssurat:'SPPD',
                        idfile:'',
                        idNamaFile:'indekssuratsuratmasuk',
                        propertiImageController:{
                                folder:'Surat Masuk',
                                subfolder:'SPPD',
                                // namafile:'Surat_Masuk_Lainnya_'+(new Date().getTime())+'_'+files.name
                            }
                        
                    }
                    let view = viewFormulirSuratMasuk(data);
                    this.Modal.settingHeder('Tambah Surat Masuk');
                    this.Modal.showBodyNextStep(view);
                    document.getElementById('indekssuratsuratmasuk').setAttribute('disabled',true);
                    this.eventBuatSuratMasukInModal(data);
                    this.Modal.show();
                    const btnSave = document.getElementById('btn-modal-nextstep');
                    btnSave.onclick = async()=>{
                        let dataCek = this.autoDetectedForm('data-kirimsuratmasuk');
                        let c = Object.values(dataCek).filter(s=>s=="").length;
    
                        if(c>0){
                            alert('Input tidak boleh kosong!');
                            return ;
                        }
    
                        let conf = confirm('Anda yakin?');
                        if(!conf) return;
                        this.Modal1.settingHeder('Memproses Surat Keluar');
                        this.Modal1.showBodyHtml(this.imgLoading+' memproses...');
                        this.Modal1.show();
                        this.Modal.toggle();
                       
                        let dataMerge = Object.assign({},data,dataCek);
                        let dataUpdateSuratmasuk = new DomainSuratMasuk(dataMerge).sanitize().data;
                        dataUpdateSuratmasuk.oleh = this.user.namaUser;
                        dataUpdateSuratmasuk.user = this.user.idUser;
    
                        
                        await this.service.saveSuratMasuk(dataUpdateSuratmasuk);
                        let sppdUpdate = this.service.dbSuratMasuk;
                        let datasuratmasuk = sppdUpdate[sppdUpdate.length-1];
                        let dataDefault = {
                            refrensi_suratmasuk:datasuratmasuk.idbaris,
                            tglsurat:new FormatTanggal(new Date(datasuratmasuk.tglsurat)).valueInputDate(),
                            idNamaFile:'indekssurat',
                            tujuansurat:'',
                            ditujukkankepada:'',
                            idnosurat:'',
                            nosurat:'',
                            suratmasuk:[datasuratmasuk],
                            createsppd:true,
                            needrefrensi:true,
                            namatarget:'target_ptk',
                            arraypersonal : this.service.dbPtk.filter(s=>s.aktif == 'aktif'),
                            propertiImageController:{
                                folder:'Surat Keluar',
                                subfolder:'SPPD',
                                // namafile:'Surat_Masuk_Lainnya_'+(new Date().getTime())+'_'+files.name
                            }
                        }
                        let datas = Object.assign({},dataMerge,datasuratmasuk,dataDefault);
                        let  view = this.formulirSuratKeluar(datas);
                        this.Modal1.settingHeder('Data SPPD');
                        this.Modal1.showBodySaveButton(view);
                        document.getElementById('modal_carisuratmasuk').setAttribute('disabled',true)
                        
                        this.eventFormulirSuratKeluar('Modal1')
                        this.eventBuatSuratMasukInModal(data);
                        this.Modal1.show();
                        
                        const btnSaveSuratSPPD = document.getElementById('btn-modal-savebutton');
                        btnSaveSuratSPPD.onclick = async()=>{
                            let dataSuratKeluar = this.autoDetectedFormWithMultiple('data-formulircreate','name="checkboxpersonal"','target_ptk');
                            let c = Object.values(dataSuratKeluar).filter(s=>s!=="").length;
                            
                            if(c<=5){
                                alert('Input tidak boleh kosong!');
                                return ;
                            }
                        
                            let conf = confirm('Anda yakin?');
                        
                            if(!conf) return;
                            
                            let dataUpdateSuratkeluar = new SuratKeluar(dataSuratKeluar).sanitize().data;
                            dataUpdateSuratkeluar.oleh = this.user.namaUser;
                            dataUpdateSuratkeluar.user = this.user.idUser;
                            this.Modal1.toggle();
                            this.Modal.settingHeder('Proses...');
                            this.Modal.showBodyHtml(this.imgLoading +'Memproses surat keluar...')
                            this.Modal.show();
                        
                            await this.service.saveSuratKeluar(dataUpdateSuratkeluar);
                        
                            let db = this.ormSuratkeluar().dbSuratKeluar;
                            let last = db[0]; //data pertama karena di urutkan dari terakhir
                            let combine = Object.assign({},dataSuratKeluar,last);
                            let datasppd = this.persiapanKirimSppd(combine);
                        
                            this.Modal.showBodyHtml('Mengupdate SPPD ...' +this.imgLoading);
                        
                            await this.service.createOrUpdateMultipleSppd(datasppd);
                            this.Modal.settingHeder('Selesai');
                            this.Modal.showBodyHtml('Proses berhasil');
                            this.Modal.toggle();
                            this[firstmethod](...arg);
                        }
                    }
                }else{
                    let sppdUpdate = this.service.dbSuratMasuk;
                    let datasuratmasuk = sppdUpdate[sppdUpdate.length-1];
                    let dataDefault = {
                            refrensi_suratmasuk:datasuratmasuk.idbaris,
                            tglsurat:new FormatTanggal(new Date(datasuratmasuk.tglsurat)).valueInputDate(),
                            idNamaFile:'indekssurat',
                            tujuansurat:'',
                            ditujukkankepada:'',
                            idnosurat:'',
                            nosurat:'',
                            suratmasuk:[datasuratmasuk],
                            createsppd:true,
                            needrefrensi:true,
                            namatarget:'target_ptk',
                            needInfo:true,
                            arraypersonal : this.service.dbPtk.filter(s=>s.aktif == 'aktif'),
                            propertiImageController:{
                                folder:'Surat Keluar',
                                subfolder:'SPPD',
                                // namafile:'Surat_Masuk_Lainnya_'+(new Date().getTime())+'_'+files.name
                            }
                        }
                    let datas = Object.assign({},datasuratmasuk,dataDefault);
                    let  view = this.formulirSuratKeluar(datas);
                    
                    this.Modal1.settingHeder('Data SPPD Telah Buat Surat Masuk');
                    this.Modal1.showBodySaveButton(view);
                    this.eventFormulirSuratKeluar('Modal1');
                    this.eventBuatSuratMasukInModal(datas);
                    this.eventCariSuratMasuk(datas.refrensi_suratmasuk);
                    let pesan ={
                        alert:'danger',
                        pesan:'Anda memilih telah membuat/mendaftar surat undangan SPPD sebelumnya, Anda harus memilih surat Undangan tersebut sebagai dasar rujukan SPPD.'
                    }
                    this.pesanModalFormulir(pesan)
                    this.Modal1.show();
                    this.Modal.toggle();
                    const btnSaveSuratSPPD = document.getElementById('btn-modal-savebutton');
                    btnSaveSuratSPPD.onclick = async()=>{
                        let dataSuratKeluar = this.autoDetectedFormWithMultiple('data-formulircreate','name="checkboxpersonal"','target_ptk');
                        let c = Object.values(dataSuratKeluar).filter(s=>s!=="").length;
                        
                        if(c<=5){
                            alert('Input tidak boleh kosong!');
                            return ;
                        }
                    
                        let conf = confirm('Anda yakin?');
                    
                        if(!conf) return;
                        
                        let dataUpdateSuratkeluar = new SuratKeluar(dataSuratKeluar).sanitize().data;
                        dataUpdateSuratkeluar.oleh = this.user.namaUser;
                        dataUpdateSuratkeluar.user = this.user.idUser;
                        this.Modal1.toggle();
                        this.Modal.settingHeder('Proses...');
                        this.Modal.showBodyHtml(this.imgLoading +'Memproses surat keluar...')
                        this.Modal.show();
                    
                        await this.service.saveSuratKeluar(dataUpdateSuratkeluar);
                    
                        let db = this.ormSuratkeluar().dbSuratKeluar;
                        let last = db[0]; //data pertama karena di urutkan dari terakhir
                        let combine = Object.assign({},dataSuratKeluar,last);
                        let datasppd = this.persiapanKirimSppd(combine);
                    
                        this.Modal.showBodyHtml('Mengupdate SPPD ...' +this.imgLoading);
                    
                        await this.service.createOrUpdateMultipleSppd(datasppd);
                        this.Modal.settingHeder('Selesai');
                        this.Modal.showBodyHtml('Proses berhasil');
                        this.Modal.toggle();
                        this[firstmethod](...arg);
                    }
                }
            }
        });
        
    }
    new_showSuratKeteranganAktif(firstmethod,arg){
        let opsipersonal={
                label:'ceklis semua',
                value:'all',
                id:'show-siswa-all'
            }
            
        let  view = this.formulirSuratKeluar({'namatarget':'target_siswa','opsipersonal':opsipersonal,'indekssurat':'Surat Keterangan Aktif'});
        this.Modal.settingHeder('Tambah Surat Keterangan Aktif');
        this.Modal.showBodySaveButton(view);
        this.eventFormulirSuratKeluar('Modal');
        this.eventShowTargetSuratSiswa([]);
        const btnSave = document.getElementById('btn-modal-savebutton');
        btnSave.onclick = async()=>{
            let data = this.autoDetectedFormWithMultiple('data-formulircreate','name="checkboxpersonal"','target_siswa');
            let c = Object.values(data).filter(s=>s!=="").length;
            
            if(c<=5){
                alert('Input tidak boleh kosong!');
                return ;
            }
            let conf = confirm('Anda yakin?');
            if(!conf) return;
            
            let dataUpdateSuratkeluar = new SuratKeluar(data).sanitize().data;
            dataUpdateSuratkeluar.oleh = this.user.namaUser;
            dataUpdateSuratkeluar.user = this.user.idUser;
            
            await this.service.saveSuratKeluar(dataUpdateSuratkeluar);
            this.Modal.toggle();
            this[firstmethod](...arg);
            
        }
        
        this.Modal.show();
    }

    new_showSuratKeteranganNISN(firstmethod,arg){
        let opsipersonal={
            label:'ceklis semua',
            value:'all',
            id:'show-siswa-all'
        }
        
    let  view = this.formulirSuratKeluar({'namatarget':'target_siswa','opsipersonal':opsipersonal,'indekssurat':'Surat Keterangan NISN'});
    this.Modal.settingHeder('Tambah Surat Keterangan NISN');
    this.Modal.showBodySaveButton(view);
    this.eventFormulirSuratKeluar('Modal');
    this.eventShowTargetSuratSiswa([]);
    const btnSave = document.getElementById('btn-modal-savebutton');
    btnSave.onclick = async()=>{
        let data = this.autoDetectedFormWithMultiple('data-formulircreate','name="checkboxpersonal"','target_siswa');
        let c = Object.values(data).filter(s=>s!=="").length;
        
        if(c<=5){
            alert('Input tidak boleh kosong!');
            return ;
        }
        let conf = confirm('Anda yakin?');
        if(!conf) return;
        
        let dataUpdateSuratkeluar = new SuratKeluar(data).sanitize().data;
        dataUpdateSuratkeluar.oleh = this.user.namaUser;
        dataUpdateSuratkeluar.user = this.user.idUser;
        
        await this.service.saveSuratKeluar(dataUpdateSuratkeluar);
        this.Modal.toggle();
        this[firstmethod](...arg);
        
    }
    
    this.Modal.show();
    }
    
    new_showSuratKeteranganDiterima(firstmethod,arg){
        let opsipersonal={
            label:'ceklis semua',
            value:'all',
            id:'show-siswa-all'
        }
        
    let  view = this.formulirSuratKeluar({'needInfo':true,'namatarget':'target_siswa','opsipersonal':opsipersonal,'indekssurat':'Surat Keterangan Diterima'});
    let dataPindahan = this.siswa.filter(s=> s.aktif == 'aktif' && s.dapo_sekolahasal !=="");
    this.Modal.settingHeder('Tambah Surat Keterangan Telah Diterima Di Sekolah');
    this.Modal.showBodySaveButton(view);
    this.eventFormulirSuratKeluar('Modal');

    this.eventShowTargetSiswaPindahan('masuk');
    const pesan = {
        alert:'warning',
        pesan:'Untuk dapat membuat surat keterangan diterima, pastikan data siswa yang akan dibuatkan surat ini telah diedit dan diisi data sekolah asalnya.'
    };
    this.pesanModalFormulir(pesan);
    // const tempatPesan =document.getElementById('infopembuatansuratkeluar');
    // tempatPesan.innerHTML = infoTambahanCreateSurat(pesan);

    const btnSave = document.getElementById('btn-modal-savebutton');
    btnSave.onclick = async()=>{
        let data = this.autoDetectedFormWithMultiple('data-formulircreate','name="checkboxpersonal"','target_siswa');
        let c = Object.values(data).filter(s=>s!=="").length;
        
        if(c<=5){
            alert('Input tidak boleh kosong!');
            return ;
        }
        let conf = confirm('Anda yakin?');
        if(!conf) return;
        
        let dataUpdateSuratkeluar = new SuratKeluar(data).sanitize().data;
        dataUpdateSuratkeluar.oleh = this.user.namaUser;
        dataUpdateSuratkeluar.user = this.user.idUser;
        
        await this.service.saveSuratKeluar(dataUpdateSuratkeluar);
        this.Modal.toggle();
        this[firstmethod](...arg);
        
    }
    
    this.Modal.show();
    }
    
    pesanModalFormulir(pesanReq){
        const tempatPesan =document.getElementById('infopembuatansuratkeluar');
        const pesan = {
            alert:'warning',
            pesan:'masukkan teks'
        };
        let merge = Object.assign({},pesan, pesanReq)
        tempatPesan.innerHTML = infoTambahanCreateSurat(merge);

    }
    new_showSuratKeteranganPindahSekolah(firstmethod,arg){
        let opsipersonal={
            label:'ceklis semua',
            value:'all',
            id:'show-siswa-all'
        }
        
    let  view = this.formulirSuratKeluar({'needInfo':true,'namatarget':'target_siswa','opsipersonal':opsipersonal,'indekssurat':'Surat Keterangan Pindah'});
    let dataPindahan = this.siswa.filter(s=> s.aktif == 'aktif' && s.dapo_sekolahasal !=="");
    this.Modal.settingHeder('Tambah Surat Keterangan Pindah Sekolah');
    this.Modal.showBodySaveButton(view);
    this.eventFormulirSuratKeluar('Modal');

    this.eventShowTargetSiswaPindahan('keluar');
    
    const tempatPesan =document.getElementById('infopembuatansuratkeluar');
    const pesan = {
        alert:'warning',
        pesan:'Untuk dapat membuat surat keterangan pindah, pastikan data siswa yang akan dibuatkan surat ini telah diedit dan dan berstatus pindah'
    };
    tempatPesan.innerHTML = infoTambahanCreateSurat(pesan);

    const btnSave = document.getElementById('btn-modal-savebutton');
    btnSave.onclick = async()=>{
        let data = this.autoDetectedFormWithMultiple('data-formulircreate','name="checkboxpersonal"','target_siswa');
        let c = Object.values(data).filter(s=>s!=="").length;
        
        if(c<=5){
            alert('Input tidak boleh kosong!');
            return ;
        }
        let conf = confirm('Anda yakin?');
        if(!conf) return;
        
        let dataUpdateSuratkeluar = new SuratKeluar(data).sanitize().data;
        dataUpdateSuratkeluar.oleh = this.user.namaUser;
        dataUpdateSuratkeluar.user = this.user.idUser;
        
        await this.service.saveSuratKeluar(dataUpdateSuratkeluar);
        this.Modal.toggle();
        this[firstmethod](...arg);
        
    }
    
    this.Modal.show();
    }
    
    new_showSuratMasuk(firstmethod,arg){
        let data = {
            tglditerima_input:new FormatTanggal(new Date()).valueInputDate(),
            asalsurat:'',
            status:'diarsipkan',
            oleh:this.user.namaUser,
            nosurat:'',
            tglsurat_input:new FormatTanggal(new Date()).valueInputDate(),
            indekssurat:'Surat Keterangan Lainnya',
            idfile:'',
            idNamaFile:'indekssuratsuratmasuk',
            propertiImageController:{
                    folder:'Surat Masuk',
                    subfolder:'Lainnya',
                    // namafile:'Surat_Masuk_Lainnya_'+(new Date().getTime())+'_'+files.name
                }
            
        }
        this.eventSuratMasuk(firstmethod,arg,data);

    }
    eventSuratMasuk(firstmethod,arg,data,tipeAction='save'){
        let view = viewFormulirSuratMasuk(data);
        if(tipeAction=='save'){
            this.Modal.settingHeder('Tambah Surat Masuk');
        }else{
            this.Modal.settingHeder('Edit Surat Masuk');

        }
        this.Modal.showBodySaveButton(view);
        this.eventBuatSuratMasukInModal(data)
        this.Modal.show();
        const btnSave = document.getElementById('btn-modal-savebutton');
        btnSave.onclick = async()=>{
            let dataCek = this.autoDetectedForm('data-kirimsuratmasuk');
            let c = Object.values(dataCek).filter(s=>s=="").length;

            if(c>0){
                alert('Input tidak boleh kosong!');
                return ;
            }
            let conf = confirm('Anda yakin?');
            if(!conf) return;
            let dataMerge = Object.assign({},data,dataCek);
            let dataUpdateSuratmasuk = new DomainSuratMasuk(dataMerge).sanitize().data;
            dataUpdateSuratmasuk.oleh = this.user.namaUser;
            dataUpdateSuratmasuk.user = this.user.idUser;

            if(tipeAction=='save'){
                await this.service.saveSuratMasuk(dataUpdateSuratmasuk);
            }else if(tipeAction == 'edit'){
                await this.service.updateSuratMasuk(dataUpdateSuratmasuk);
                
            }else if(tipeAction == 'hapus'){
                dataUpdateSuratmasuk.status = 'hapus';
                await this.service.updateSuratMasuk(dataUpdateSuratmasuk);

            }

            this.Modal.toggle();
            this[firstmethod](...arg);
        }
    }
    lds_sppd(db,id,firstmethod,arg){
        let ormSuratkeluar = db.filter(s=>s.idbaris == id)[0];
        
        if(ormSuratkeluar.sppd){
            let sppdItem = new OrmSppd(
                            ormSuratkeluar.sppd,
                            this.service.dbTendik,
                            this.ptkall,
                            this.ptk,
                            this.user,
                        );
            let permision = ormSuratkeluar.user == this.user.idUser || this.user.canEdit ;
            let data = {
                judul:'PTK yang diperintah untuk kegiatan:<br>'+ormSuratkeluar.perihal,
                dataSppdSuratKeluar: sppdItem.data,
                idSuratKeluar: ormSuratkeluar.idbaris,
                olehSuratKeluar: ormSuratkeluar.oleh,
                canAcces:permision
            }
            let viewModal = modalPtkDiperintah(data);
            
            this.Modal.settingHeder('Daftar SPPD');
            this.Modal.showBodyHtml(viewModal);
            this.Modal.showHideFooter(false);
            this.Modal.show();
            
            const btnActions = document.querySelectorAll('[data-showsppd]');
            btnActions.forEach(btn=>{
                btn.onclick = async()=>{
                    let tipeShow = btn.getAttribute('data-showsppd');
                    let idSppd = btn.getAttribute('data-idsppd');
                    let idSuratKeluar = btn.getAttribute('data-idsuratkeluar');
                    let currentSppdPerson = sppdItem.data.filter(s=>s.idbaris == idSppd)[0];
                    
                    if(tipeShow == 'show'){
                        let datamodal = {
                            sppd:currentSppdPerson,
                            suratkeluar:ormSuratkeluar,
                            logoSekolah:this.user.logoSekolah,
                            logokotadepok:this.user.logoDepok,
                            identitas:this.identitasKop
                        }
                        
                        this.showSppdInNextModal(datamodal,'Modal1');
                    }else if(tipeShow == 'edit'){
                        this.showDetailSppd(currentSppdPerson);
                        this.SppdWithEnableEdited();

                        const btnSave = document.getElementById('btn-modal-action');
                        btnSave.onclick = async()=>{
                            let conf = confirm('Anda yakin?');
                            if(!conf) return;
                            let data = this.autoDetectedForm('data-kirim');
                            let datamerge = Object.assign({},currentSppdPerson,data);
                            let dataUpdateSppd = new Sppd(datamerge).sanitize().data;
                            
                            this.Modal1.showBodyHtml('... sedang Proses Kirim, tunggu');

                            await this.service.updateSppd(dataUpdateSppd);

                            db = this.ormSuratkeluar().dbSuratKeluar;

                            this.lds_sppd(db,id);
                            this.Modal1.toggle();
                            this.Modal.show();
                        };
                        
                    }else if(tipeShow == 'hapus'){
                        let conf = confirm('Anda yakin?');
                        if(!conf) return;
                        
                        let objek = new Sppd(currentSppdPerson).sanitize().data;
                        objek.hapus = 'hapus';
                        
                        await this.service.updateSppd(objek);

                        db = this.ormSuratkeluar().dbSuratKeluar;
                        this.lds_sppd(db,id,firstmethod,arg);
                        this[firstmethod](...arg)
                        

                    }else if(tipeShow == 'edit_all'){
                        this.formulirSuratKeluarSppd(ormSuratkeluar,'Modal1');
                        
                        //switchOn
                        const switchOn = document.getElementById('show-ptk-all');
                        switchOn.dispatchEvent(new Event('change'));

                        const btnSave = document.getElementById('btn-modal-action');
                        btnSave.onclick = async()=>{
                            let conf = confirm('Anda yakin?');
                            if(!conf) return;
                            let data = this.autoDetectedFormWithMultiple('data-formulircreate','name="checkboxpersonal"','target_ptk');
                            let datamerge = Object.assign({},ormSuratkeluar,data);
                            let dataUpdateSuratkeluar = new SuratKeluar(datamerge).sanitize().data;
                            let datasppd = this.persiapanKirimSppd(datamerge);
                            
                            this.Modal1.showBodyHtml('Mengupdate Surat Keluar ...' + this.imgLoading);
                            
                            await this.service.updateSuratKeluar(dataUpdateSuratkeluar);

                            this.Modal1.showBodyHtml('Mengupdate SPPD ...' +this.imgLoading);
                            await this.service.createOrUpdateMultipleSppd(datasppd)
                            db = this.ormSuratkeluar().dbSuratKeluar;
                            this.lds_sppd(db,id,firstmethod,arg);
                            this[firstmethod](...arg);
                            this.Modal.show();
                            this.Modal1.toggle();
                        };
                    }
                }
            })
        }else{
            alert('Tidak ditemukan SPPD');
        }
        
    }

    lds_edit_suratmasuk(db,id,firstmethod,arg){
        let objeksurat = db.filter(s=>s.idbaris == id)[0];
        
        let datadefault = {
            oleh:this.user.namaUser,
            idNamaFile:'indekssuratsuratmasuk',
            propertiImageController:{
                    folder:'Surat Masuk',
                    subfolder:'Lainnya',
                    // namafile:'Surat_Masuk_Lainnya_'+(new Date().getTime())+'_'+files.name
                }
            
        }
        let data = Object.assign({},datadefault,objeksurat);
        this.eventSuratMasuk(firstmethod,arg,data,'edit');
        document.querySelector('[data-fokusuri="File Surat"]').dispatchEvent(new Event('click'));
    }
    async lds_hapus_suratmasuk(db,id,firstmethod,arg){
        let conf = confirm('Anda yakin?');
        if(!conf) return;
        let objek = db.filter(s=>s.idbaris == id)[0];
        let dataUpdateSuratmasuk = new DomainSuratMasuk(objek).sanitize().data;
        dataUpdateSuratmasuk.status ='hapus';
        await this.service.updateSuratMasuk(dataUpdateSuratmasuk);
        this[firstmethod](...arg);
    }

    async lds_hapussuratkeluar(db,id,firstmethod,arg){
        let conf = confirm('Anda yakin akan menghapus surat ini?');

        if(!conf) return;

        let currentSuratKeluar = db.filter(s=>s.idbaris == id)[0];
        let suratkeluarmodel = new SuratKeluar(currentSuratKeluar).sanitize().data;
            suratkeluarmodel.status = 'hapus';
        
        await this.service.updateSuratKeluar(suratkeluarmodel)
        this[firstmethod](...arg);
    }

    
    eventBuatSuratMasukInModal(data){
       
        const uploadBtn = document.querySelectorAll('[data-uploaddokumen]');
        
        uploadBtn.forEach(el=>{
            el.onchange = async(e)=>{
                const inputIndekssurat = document.getElementById(data.idNamaFile);
                
                if(inputIndekssurat.value ==""){
                    alert('Data isian harus lengkap!');
                    
                    e.preventDefault();
                    e.stopPropagation()
                    return;
                }
                let files = e.target.files[0];
                let parent = e.target.parentElement;
                let domPreview = parent.querySelector('[data-uripreview]');
                let fokuslabel = e.target.getAttribute('data-labelname');
                let idTarget = e.target.getAttribute('data-uploaddokumen');
                let inputTarget = document.getElementById('frm-'+idTarget);
                
                if(files){
                    let inputIndekssurat = document.getElementById(data.idNamaFile);
                    let snakeCaseInput = inputIndekssurat.value.replace(/(\s+)/g,'_');
                    let propertiImageController = Object.assign({},{
                       namafile:snakeCaseInput+'_'+(new Date().getTime())+'_'+files.name
                    },data.propertiImageController)
                    await this.service.saveDokumenSurat(files,propertiImageController,(idfile)=>{
                        inputTarget.value = idfile;
                    
                        if(!domPreview){
                            this.updateUploadResponse(parent,idfile,'frm-'+idTarget,fokuslabel);
                            this.eventBuatSuratMasukInModal(data);
                            document.querySelectorAll('[data-uriPreview]')[0].dispatchEvent(new Event('click'));
                        }else{
                            domPreview.setAttribute('data-uriPreview',`https://drive.google.com/file/d/${idfile}/preview`);
                        }
                    });
                }
            }
        })

        const allPreviewUpload = document.querySelectorAll('[data-uriPreview]');
        allPreviewUpload.forEach(el=>{
            el.onclick = (e)=>{
                let keterangan = e.target.getAttribute('data-fokusUri');
                let url = e.target.getAttribute('data-uriPreview');
                let btn = document.getElementById('btn_rotate');
                btn.innerHTML = "Rotate "+ keterangan;
                let iframing = document.getElementById('iframePreviewUpload');
                iframing.src = url;
                iframing.onload = (e)=>{
                    let countr = 0;
                    btn.onclick = ()=>{
                        if(countr == 360){
                            countr = 0;
                        }else{
                            countr +=90;
                        }
                        iframing.setAttribute('style',`transform: rotate(${countr}deg);`);
                    }

                };
            }
        });

    }
    updateUploadResponse(targetdom,idfile,idInput,labelInput){
        // let html = "";
        //     html+=`<button class="input-group-text" data-uriPreview='https://drive.google.com/file/d/${idfile}/preview' data-fokusUri="${labelInput}">Preview</button>`;
        //     html+=`<button class="input-group-text" onclick="document.getElementById('${idInput}').value = ''">Hapus</button>`
        // return html;
        let btn = document.createElement('button');
            btn.setAttribute('class','input-group-text');
            btn.setAttribute('data-uriPreview',`https://drive.google.com/file/d/${idfile}/preview`);
            btn.setAttribute('data-fokusUri',`${labelInput}`);
            btn.innerHTML = "Preview";
            targetdom.appendChild(btn);
    
            btn = document.createElement('button');
            btn.setAttribute('class','input-group-text');
            btn.setAttribute('onclick',`document.getElementById('${idInput}').value = '';this.previousElementSibling.remove();this.remove()`);
            btn.innerHTML = "Hapus";
            targetdom.appendChild(btn);
    }
    
    surat_keterangan_siswa_template(db,id,template,firstmethod,arg){
        let snakeCaseTemplate = template.replace(/(\s+)/g,'_');
        let ormSuratkeluar = db.filter(s=>s.idbaris == id)[0];
        let permision = ormSuratkeluar.user == this.user.idUser || this.user.canEdit ;
        let data = {
            judul:template,
            suratkeluar:ormSuratkeluar,
            datasiswa:ormSuratkeluar.detail_target_siswa,
            template:snakeCaseTemplate,
            canAcces:permision

        };
        let viewModal = modalSuratSiswa(data);
        this.Modal.settingHeder(template);
        this.Modal.showBodyHtml(viewModal);
        this.Modal.showHideFooter(false);
        this.Modal.show();
        
        const btns = document.querySelectorAll('[data-tipetarget]');
        
        btns.forEach(btn=>{
            let atr = btn.getAttribute('data-tipetarget');
            btn.onclick = async()=>{
                let teks = "";
                let idsiswa = btn.getAttribute('data-targetperson');
                let datasiswa = this.siswa.filter(s=>s.id == idsiswa)[0];
                let datamodal = {
                    suratkeluar:ormSuratkeluar,
                    identitas:this.identitasKop,
                    logoSekolah:this.user.logoSekolah,
                    logokotadepok:this.user.logoDepok,
                    targettipeperson:'siswa',
                    targetperson:datasiswa,
                    kepsekbytgl:OrmSuratKeluar.kepsekbytgl(this.service.dbPtk, this.ptkall, ormSuratkeluar.tglsurat),
                    targetpersonlampiran :ormSuratkeluar.detail_target_siswa
                }
                let ob = {
                    toggleTo:'#modalAuto',
                    title:'SPPD'
                };

                if(atr=='show'){
                    this.Modal1.settingHeder('Format Lampiran '+template);
                    ob.html = modalViewSuratByTemplate(datamodal,snakeCaseTemplate+'_lampiran');
                    
                    this.Modal1.showBodyPrintable(ob);
                }else if(atr == 'show_id'){
                    ob.html = modalViewSuratByTemplate(datamodal,snakeCaseTemplate)
                    
                    this.Modal1.settingHeder(template +` (${datasiswa.pd_nama})`);
                    this.Modal1.showBodyPrintable(ob);
                }else if(atr == 'show_edit'){
                    let objmodal = Object.assign({},ormSuratkeluar,{'opsipersonal':{
                        label:'Semua',
                        value:'all',
                        id:'show-siswa-all'
                    }})

                    ob.html = this.formulirSuratKeluar(objmodal);
                    this.Modal1.showBodyPreviousStep(ob.html);
                    this.Modal1.settingHeder('Edit '+template);
                    this.eventFormulirSuratKeluar('Modal1');
                    this.eventShowTargetSuratSiswa(ormSuratkeluar.detail_target_siswa)
                    this.backButtonModal1();

                    const btnSave = document.getElementById('btn-modal-action');
                    btnSave.onclick = async()=>{

                        let conf = confirm('Anda yakin?');
                        if(!conf) return;
                        
                        let data = this.autoDetectedFormWithMultiple('data-formulircreate','name="checkboxpersonal"','target_siswa');
                        let datamerge = Object.assign({},ormSuratkeluar,data);
                        let dataUpdateSuratkeluar = new SuratKeluar(datamerge).sanitize().data;
                        
                        this.Modal1.showBodyHtml('Mengupdate Surat Keluar ...' + this.imgLoading);
                        await this.service.updateSuratKeluar(dataUpdateSuratkeluar);
                        
                        db = this.ormSuratkeluar().dbSuratKeluar;

                        this[firstmethod](...arg);
                        this.surat_keterangan_siswa_template(db,id,template,firstmethod,arg);
                        this.Modal.show();
                        this.Modal1.toggle();
                        };
                }else if(atr = 'delete_id'){
                    let conf = confirm('Anda yakin?');
                    if(!conf) return;
                    ob.html = atr;
                    this.Modal1.settingHeder('Hapus '+template +` (${datasiswa.pd_nama})`);
                    this.Modal1.showBodyHtml('Proses Menghapus...');
                }else{
                    ob.html = 'tidak dikenal'
                }
                
                this.Modal1.show();
                this.Modal.toggle();
            }
        })
    }

    formulirSuratKeluar(objek){
        let dataDefault = {
            'needrefrensi':false,
            'buttonaddrefrensi':false,
            'addUpload':false,
            'addTarget':true,
            'opsipersonal':{
                label:'',
                value:'all',
                id:'show-ptk-all'
            }
        }
        let dataCreate = objek?Object.assign({},dataDefault,objek):dataDefault;
        return createSuratKeluar(dataCreate);
    }

    rerataLamaHariSppdDariSuratKeluar(datasppd_suratkeluar){
        let mapinglamahari = datasppd_suratkeluar.map(n=> parseInt(n.ptk_durasisppd));
        return Math.max(...mapinglamahari);
    }

    formulirSuratKeluarSppd(ormSuratkeluar,tipeModal='Modal1'){
        let data = Object.assign({},ormSuratkeluar,{needrefrensi:true});
        let lamahari = this.rerataLamaHariSppdDariSuratKeluar(ormSuratkeluar.sppd);

        data.createsppd = true;
        data.jumlahhari = lamahari;
        data.opsipersonal={
            label:'ceklis semua',
            value:'all',
            id:'show-ptk-all'
        }
        data.arraypersonal = this.service.dbPtk;//.filter(s=>s.aktif == 'aktif');
        let view  =this.formulirSuratKeluar(data);
        
        this[tipeModal].settingHeder('Detail SPPD');

        if(tipeModal=='Modal1'){ 
            // untuk kasus edit sppd
            this[tipeModal].showBodyPreviousStep(view);
            this[tipeModal].show();
            this.Modal.toggle()
            this.backButtonModal1();
        }else{
            //tambah sppd
            data.buttonaddrefrensi = true;
            view  =this.formulirSuratKeluar(data);
            this[tipeModal].showBodySaveButton(view);
            this[tipeModal].show();
            // this.Modal1.toggle()
        }
        let dataPtk = ormSuratkeluar.sppd.map(n=> n.namaptk).map(n=>parseInt(n.id));
        this.eventFormulirSuratKeluar(tipeModal);
        this.eventShowPtkYangDitugaskan(dataPtk);
        this.eventCariSuratMasuk(ormSuratkeluar.refrensi_suratmasuk);
    }
    
    eventFormulirSuratKeluar(modal){
        //input formulircreat
        const inputDataSend = document.querySelectorAll('[data-formulircreate]');
        const radioKlasifikasi = document.querySelectorAll('input[name="klasifikasisurat"]');
        const stage = document.getElementById('stage-pilih-personal');
        let span = this[modal].body.querySelectorAll('.card-header>span[data-bs-toggle]');
        
        span.forEach(el=>{
            el.onclick = (e)=>{
                let span = e.target;
                let div = span.closest('div');
                let sbiling = div.nextElementSibling;
                div.classList.toggle('accord-bg');
                sbiling.classList.toggle('d-none');
                if(span.innerHTML == '⇓'){
                    span.innerHTML = '⇑';
                }else{
                    span.innerHTML = '⇓';
                }
            }
        });
        span[0].click();
        inputDataSend.forEach(n=>{
            let atribute = n.getAttribute('data-formulircreate');
            //event buat nomor surat otomatis:
            if(['id_nosurat','tglsurat'].includes(atribute)){
                n.oninput = ()=> this.eventBuatNoSurat();
            }

            if(atribute == 'perihal'){
                n.oninput = (e)=>{
                    if(parseInt(n.style.height)< n.scrollHeight){
                        n.style.height = (n.scrollHeight+10) + 'px';
                    }else if(n.style.height==''){
                        n.style.height = (n.scrollHeight) + 'px';
                    }
                }
            }
        });

        radioKlasifikasi.forEach(n=>{
            n.onchange = (e)=>{
                let inputanmanual = document.querySelector('[data-noklasifikasiinput="input manual"]');
                if(e.target.value == 'input manual'){
                    
                    if(inputanmanual.hasAttribute('disabled')){
                        inputanmanual.removeAttribute('disabled');
                    }
                    
                    inputanmanual.oninput = ()=>this.eventBuatNoSurat()
                }else{
                    if(!inputanmanual.hasAttribute('disabled')){
                        inputanmanual.setAttribute('disabled',true);
                    }
                    
                    this.eventBuatNoSurat();
                }
            }
        })
    }
    
    eventBuatNoSurat(){
        let klasifikasisurat = document.querySelector('input[name="klasifikasisurat"]:checked').value;
        let klasifikasi = klasifikasisurat==='input manual'?document.querySelector('[data-noklasifikasiinput="input manual"]').value:klasifikasisurat;
        let tgl = document.querySelector('[data-formulircreate="tglsurat"]');
        let romawi = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'][new Date(tgl.value).getMonth()]
        let kodesurat = document.querySelector('[data-formulircreate="id_nosurat"]');
        let teks = "";
        let inputChangge = document.querySelector('[data-formulircreate="nosurat"]');

        teks = `${klasifikasi}/${kodesurat.value}-SDN RAJA1/${romawi}/${new Date(tgl.value).getFullYear()}`;
        inputChangge.value = teks;
    }
    eventShowTargetSuratSiswa(databefore){
        const stage = document.getElementById('stage-pilih-personal');
        const control = document.getElementById('wrapersuratkeluarpilihrombel');
        const switchOn = document.getElementById('show-siswa-all');
        
        control.innerHTML = domSelectRombel('1A');
        const btnTambah = document.getElementById('tambahtargetpersonalsiswa');
        //data pertama;
        let view = checkBoxSiswa(databefore,true,false);
        stage.innerHTML = view;
        

        btnTambah.onclick =()=>{
            let selectValue = document.getElementById('select_rombel_nonfloating').value;
            let radiosChecked = document.querySelectorAll('[name="checkboxpersonal"]:checked');
            let idsHasChecked = [];
            let objHasChecked = [];
            radiosChecked.forEach(n=>{
                idsHasChecked.push(parseInt(n.value));
                let siswa = this.siswa.filter(s=>s.id == n.value)[0];
                objHasChecked.push(siswa);
            })

            let datasiswaBySelect = this.siswa.filter(s=>s.nama_rombel == selectValue && s.aktif =='aktif' && !idsHasChecked.includes(parseInt(s.id)) );
            let html ="";
            html+=checkBoxSiswa(objHasChecked,true,false);
            html+=checkBoxSiswa(datasiswaBySelect,false,false);

            stage.innerHTML = html;
            const radioTargetPersonal = document.querySelector('input[name="createsuratpilihtarget"]');
            radioTargetPersonal.onchange = (e)=>{
                if(radioTargetPersonal.checked){
                    let cbx = document.querySelectorAll('[name="checkboxpersonal"]');
                    cbx.forEach(n=>{
                        n.checked = true;
                    });
                    cbx.forEach(n=>{
                        n.onchange = ()=>{
                            if(!n.checked){
                                radioTargetPersonal.checked = false;
                            }
                        }
                    })
                }else{
                    let cbx = document.querySelectorAll('[name="checkboxpersonal"]');
                    cbx.forEach(n=>{
                        n.checked = false;
                    })
                }
            }
        }
    }
    eventShowTargetSiswaPindahan(mutasi='masuk'){
        const stage = document.getElementById('stage-pilih-personal');
        const control = document.getElementById('wrapersuratkeluarpilihrombel');
        const switchOn = document.getElementById('show-siswa-all');
        
        // control.innerHTML = domSelectRombel('1A');
        // const btnTambah = document.getElementById('tambahtargetpersonalsiswa');
        
        //data pertama;
        let dataBefore = [];
        if(mutasi == 'masuk'){
            dataBefore = this.siswa.filter(s=> s.aktif == 'aktif' && s.dapo_sekolahasal !=="");
        }else if(mutasi == 'keluar'){
            dataBefore = this.siswa.filter(s=> s.aktif=='pindah');
        }

        let view = checkBoxSiswa(dataBefore,false,false);
        stage.innerHTML = view;
       

        // btnTambah.onclick =()=>{
        //     let selectValue = document.getElementById('select_rombel_nonfloating').value;
        //     let radiosChecked = document.querySelectorAll('[name="checkboxpersonal"]:checked');
        //     let idsHasChecked = [];
        //     let objHasChecked = [];
        //     radiosChecked.forEach(n=>{
        //         idsHasChecked.push(parseInt(n.value));
        //         let siswa = this.siswa.filter(s=>s.id == n.value)[0];
        //         objHasChecked.push(siswa);
        //     })

        //     let datasiswaBySelect = this.siswa.filter(s=>s.nama_rombel == selectValue && s.aktif =='aktif' && !idsHasChecked.includes(parseInt(s.id)) );
        //     let html ="";
        //     html+=checkBoxSiswa(objHasChecked,true,false);
        //     html+=checkBoxSiswa(datasiswaBySelect,false,false);

        //     stage.innerHTML = html;
            const radioTargetPersonal = document.querySelector('input[name="createsuratpilihtarget"]');
            radioTargetPersonal.onchange = (e)=>{
                if(radioTargetPersonal.checked){
                    let cbx = document.querySelectorAll('[name="checkboxpersonal"]');
                    cbx.forEach(n=>{
                        n.checked = true;
                    });
                    cbx.forEach(n=>{
                        n.onchange = ()=>{
                            if(!n.checked){
                                radioTargetPersonal.checked = false;
                            }
                        }
                    })
                }else{
                    let cbx = document.querySelectorAll('[name="checkboxpersonal"]');
                    cbx.forEach(n=>{
                        n.checked = false;
                    })
                }
            }
        // }
    }

    eventShowPtkYangDitugaskan(dataBefore){
        const stage = document.getElementById('stage-pilih-personal');
        const switchOn = document.getElementById('show-ptk-all');
        document.getElementById('wrapersuratkeluarpilihrombel').innerHTML = "";

        let arrayClean = [];
        let arrayIncluded = [];
        
        this.service.dbPtk.forEach(n=>{
            let objClean = {};
            let objIncludes = {};
            if(dataBefore.includes(parseInt(n.id))){
                objIncludes.id = n.id;
                objIncludes.guru_namalengkap = n.guru_namalengkap;
                arrayIncluded.push(objIncludes);
            }else{
                if(n.aktif == 'aktif'){
                    objClean.id = n.id;
                    objClean.guru_namalengkap = n.guru_namalengkap;
                    arrayClean.push(objClean);
                }

            }
        })
        const radioTargetPersonal = document.querySelector('input[name="createsuratpilihtarget"]');
        radioTargetPersonal.onchange = (e)=>{
            if(radioTargetPersonal.checked == true){
                let html = checkboxSppdPTK(arrayIncluded,true,true);
                html+=checkboxSppdPTK(arrayClean,true);
                
                stage.innerHTML = html;
                
                const optionsMarked = document.querySelectorAll('[name="checkboxpersonal"]');
                optionsMarked.forEach(n=>{
                    n.onchange = (e)=>{
                        if(!n.checked){
                            switchOn.checked = false;
                        }
                    }
                })
            }else{
                
                let html = checkboxSppdPTK(arrayIncluded,true,true);
                html+=checkboxSppdPTK(arrayClean,false)
                stage.innerHTML = html;
            }
        }

    }
    
    eventCariSuratMasuk(hasId){
        const inputan = document.getElementById('modal_carisuratmasuk');
        const stageInputan = document.getElementById('modal_result_carisuratmasuk');
        
        let view = ""
        if(hasId){
            let hasAdded = this.service.dbSuratMasuk.filter(s=> s.idbaris == hasId);
            view +=viewResultCariSuratmasuk(hasAdded,true)
        }

        inputan.oninput = (e)=>{
            let data = new SuratMasuk(this.service.dbSuratMasuk).findByValue(e.target.value);
            
            let dom = document.getElementById('refrensi_suratmasuk');
            dom.value = "";
            
            stageInputan.innerHTML = view + viewResultCariSuratmasuk(data);
            
            let radios = document.querySelectorAll('input[name="pilih_hasil_cari_suramasuk"]');
            const cekfilesuratmasuk = document.getElementById('cekfilesuratmasuk');
            cekfilesuratmasuk.innerHTML = boleanHtmlRefrensiSuratMasuk('');
            cekfilesuratmasuk.classList.remove('alert-success','alert-info');
            cekfilesuratmasuk.classList.add('alert-danger');
            radios.forEach(n=>{
                n.onchange = (e)=>{
                    dom.value = e.target.value;
                    
                    let atr = n.getAttribute('data-resulcaritidfile');
                    cekfilesuratmasuk.innerHTML = boleanHtmlRefrensiSuratMasuk(atr);
                    
                    if(atr==""){
                        cekfilesuratmasuk.classList.remove('alert-success','alert-info');
                        cekfilesuratmasuk.classList.add('alert-danger');
                    }else{
                        cekfilesuratmasuk.classList.remove('alert-danger','alert-info');
                        cekfilesuratmasuk.classList.add('alert-success');
                    }
                }
            });
            if(radios[0] && radios[0].checked){
                radios[0].dispatchEvent(new Event('change'));
            }
        }
    }
    
    eventShowPersonalTarget(target){
        const stage = document.getElementById('stage-pilih-personal');
        let data = {
            'tipetarget':target
        };
        
        if(target == 'target_siswa'){
            data.arraypersonal = this.siswa.filter(s=>s.nama_rombel == this.splitingFokusRombel[0] && s.aktif == 'aktif');
            
            stage.innerHTML = checkBoxTargetPersonal(data);
            
            if(this.user.canEdit){
                document.getElementById('wrapersuratkeluarpilihrombel').innerHTML=selectRombel(this.splitingFokusRombel[0]);
                const select = document.getElementById('suratkeluarpilihrombel');
                if(select){
                    select.onchange = (e) => {
                        data.arraypersonal = this.siswa.filter(s=>s.nama_rombel == e.target.value  && s.aktif == 'aktif');
                        stage.innerHTML =checkBoxTargetPersonal(data);
                    };
                }
            }

        }else{
            data.arraypersonal = this.service.dbPtk.filter(s=>s.aktif == 'aktif');
            stage.innerHTML = checkBoxTargetPersonal(data)
        }
    }
    autoDetectedForm(dataset){
        let query = `[${dataset}]`;
        let dataKirim = document.querySelectorAll(query);
        let obj = {};
        
        dataKirim.forEach(n=>{
            let atr = n.getAttribute(dataset);
            obj[atr] = n.value;
        });
        return obj;
    }
    
    autoDetectedFormWithMultiple(dataset,datasetOption,key='target_ptk'){
        let obj = this.autoDetectedForm(dataset);
        let query = `[${datasetOption}]:checked`;
        let dataKirim = document.querySelectorAll(query);
        let ar = [];
        
        dataKirim.forEach(n=>{
            ar.push(n.value);
        });
        
        obj[key] = ar.join(', ');
        
        return obj;
    }
    
    persiapanKirimSppd(suratkeluar){
        let arrayData = [];
        const {target_ptk, sppd} = suratkeluar;
        
        target_ptk.toString().replace(/(\s+)/g,'').split(',').forEach(n=>{
            let cariSppd = sppd.filter(s=>s.ptk_diperintah == n);
            if(cariSppd.length>0){
                let obj = cariSppd[0]
                let itemSppd =  new Sppd(obj);
                itemSppd.addItem('ptk_maksudsppd',suratkeluar.perihal);
                itemSppd.addItem('ptk_tempatsppd',suratkeluar.ditujukkankepada);
                itemSppd.addItem('ptk_starttgl',suratkeluar.tglsurat);
                itemSppd.addItem('ptk_nosppd',suratkeluar.nosurat);
                itemSppd.addItem('refrensi_suratkeluar',suratkeluar.idbaris);
                itemSppd.sanitize();

                arrayData.push(itemSppd.data);
            }else{
                let ptk = this.ptk.filter(s=>s.id == n)[0];
                let tendik = this.service.dbTendik.filter(s=>s.idguru == n);
                let golruang = tendik.length>0?tendik[0].golonganruang:'';
                let tambahan = new Sppd();
                
                tambahan.addItem('idbaris','');
                tambahan.addItem('ptk_diperintah',n);
                tambahan.addItem('ptk_golongan',golruang);
                tambahan.addItem('ptk_jabatan',ptk.gurukelas_gmp);
                tambahan.addItem('ptk_maksudsppd',suratkeluar.perihal);
                tambahan.addItem('ptk_tempatsppd',suratkeluar.ditujukkankepada);
                tambahan.addItem('ptk_starttgl',suratkeluar.tglsurat);
                tambahan.addItem('ptk_durasisppd',1);
                tambahan.addItem('ptk_nosppd',suratkeluar.nosurat);
                tambahan.addItem('resume','');
                tambahan.addItem('arsip_nosppd','');
                tambahan.addItem('versiupload','');
                tambahan.addItem('refrensi_suratkeluar',suratkeluar.idbaris);
                tambahan.addItem('hapus');
                tambahan.sanitize();
                arrayData.push(tambahan.data);
            }
        })
        return arrayData;
    }

    showSppdInNextModal(data,modal='Modal1'){
        let viewSppd = modalViewSppd(data);
        let nextListenerModal = modal=='Modal'?'#modalAuto1':'#modalAuto';
        let ob = {
            html:viewSppd,
            toggleTo:nextListenerModal,
            title:'SPPD'
        };

        this[modal].settingHeder('SPPD : ' + data.sppd.namaptk.guru_namalengkap);
        this[modal].showBodyPrintable(ob);
        this[modal].show();
        
        if(modal == 'Modal1'){
            this.Modal.toggle();
        }else{
            this.Modal1.toggle();
        }
    }

    showDetailSppd(objeksppd){
        this.Modal1.settingHeder('Detail : '+objeksppd.namaptk.guru_namalengkap)
        this.Modal1.showBodyPreviousStep(detailSppd(objeksppd));
        this.Modal1.show();
        this.Modal.toggle();
        this.backButtonModal1();
    }

    backButtonModal1(){
        const btn = document.getElementById('btn-modal-previousstep');
        btn.onclick = ()=> {
            this.Modal.show();
            this.Modal1.toggle();
        }
    }

    SppdWithEnableEdited(){
        let dataKirim = document.querySelectorAll('[data-kirim]');
        let enable = ['ptk_durasisppd','ptk_jabatan'];
        dataKirim.forEach(n=>{
            let atr = n.getAttribute('data-kirim')
            
            if(enable.includes(atr)){
                    if(n.hasAttribute('disabled')) n.removeAttribute('disabled');
            }else{
                n.setAttribute('disabled',true);
            }
            
        })
    }

}