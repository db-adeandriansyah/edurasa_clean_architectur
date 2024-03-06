import { tabelDom,CollectionsEdu,FormatTanggal,TableProperties } from "../../entries/vendor";
import { SuratKeluar } from "../../models/SuratKeluar";
import {default as DomainSuratKeluar} from "../../domains/SuratKeluar";
import sppdView from "../../views/surat/sppdView";
import Sppd from "../../domains/SPPD";
import { SuratMasuk } from "../../models/SuratMasuk";
import { SuratMasuk as DomainSuratMasuk } from "../../domains/SuratMasuk";

export default class ControlSuratFeatures{
    #dbSuratKeluar;
    #fnFokusMenu;
    constructor(service,modal,modal1,user,ptk,ptkall,siswa,fokusrombel){
        this.service = service;
        this.user = user;
        this.ptk = ptk;
        this.siswa = siswa;
        this.ptkall = ptkall;
        this.fokusrombel=fokusrombel
        this.Modal=modal;
        this.Modal1=modal1;
        this.tabel = tabelDom;
        this.workplace = document.getElementById('printarea');
        this.fnJudul = {};
        this.htmlJudul = '';
        this.#dbSuratKeluar = [];
        this.#fnFokusMenu = null;
        this.siswarombel = [];
        this.initsiswarombel();
    }
    initsiswarombel(){
        let fokuskelas = this.splitingFokusRombel;
        
        if(fokuskelas.length == 1){
            this.siswarombel = this.siswa.filter(s=> s.nama_rombel == this.fokusrombel);
        }else{
            this.siswarombel = this.siswa.filter(s=> s.nama_rombel == this.splitingFokusRombel[0]);
        }
    }
    set fokusmenu(x){
        this.#fnFokusMenu = x;
    }
    get fokusmenu(){
        return this.#fnFokusMenu;
    }
    set dbSuratKeluar(x){
        this.#dbSuratKeluar = x;
    }
    get dbSuratKeluar(){
        return this.#dbSuratKeluar;
    }
    
    async initInheritance(par ='suratkeluar'){
        await this.service.callSuratKeluar();
        
        const btnShowSuratKeluar = document.getElementById('btnshow-suratkeluar');
        const btnBuatSurat = document.getElementById('btncreate_suratketerangan');
        const btnShowSuratAktif = document.getElementById('btnshow-suratketeranganaktif');
        
        if(btnShowSuratKeluar){
            btnShowSuratKeluar.onclick = ()=>{
                let h ="";
                h+=`<h3 class="text-center">Data Surat Keluar</h3>`;
                h+=`<h4 class="text-center mb-5">Diurutkan dari data terakhir dibuat</h4>`;
                this.fnCreateDbSuratKeluar();
                
                const db = this.dbSuratKeluar.filter((_,index)=> index<25);
                this.htmlJudul= h;
                this.showSuratKeluar(25);
            };
            if(par ==='suratkeluar') btnShowSuratKeluar.dispatchEvent(new Event('click'));
        }
        if(btnShowSuratAktif){
            btnShowSuratAktif.onclick = ()=> {
                let h ="";
                let atr = btnShowSuratAktif.getAttribute('data-create');
                h+=`<h3 class="text-center">Daftar ${atr}</h3>`;
                this.fnCreateDbSuratKeluar();
                const db = this.dbSuratKeluar.filter((s,index)=> s.indekssurat == atr);
                
                this.htmlJudul= h;
                this.showSuratKeluar(atr);
            };
        }
        
        if(btnBuatSurat){
            btnBuatSurat.onclick = (e)=>{
                let title = e.target.getAttribute('data-create');
                let target = e.target.getAttribute('data-targetsurat');
                this.buatSurat(title,target);
            };
        }
    }

    canUploadFileSurat(iduser){
        return (iduser == this.user.idUser || this.user.canEdit) ;
    }
    
    fnCreateDbSuratKeluar(){
        const dv =this.service.dbSuratKeluar.slice();
        this.ptk = this.service.dbPtk;
        this.dbSuratKeluar = new CollectionsEdu(dv).exceptFilter({'status':'hapus'})
                .setProperty('idbaris',(item)=>parseInt(item))
                .setProperty('tglsurat',(item)=>new FormatTanggal(item).valueInputDate())
                .addProperty('tgl_surat',(item)=>item==""?"":new Date(item).toLocaleString('id-ID',{'dateStyle':'full'}))
                .addProperty('sppd',(item)=>{
                    let result = []
                    if(item.indekssurat == 'SPPD'){
                        result =  this.service.dbSppd.filter(s=> s.refrensi_suratkeluar == item.idbaris);//
                                // .map(n=>Object.fromEntries([[...Object.entries(tendik.filter(t=>t.idguru == item.ptk_diperintah)[0])], ...Object.entries(n)]));
                    }
                    return result;
                })
                .sortByProperty('idbaris','desc')
                .addProperty('detailprihal',(item)=>{
                    let html = "";
                    if(item.indekssurat == 'SPPD'){
                        html+=item.perihal;
                        html+=`<br>`;
                        html+=`PTK yang ditugaskan:`;
                        html+=`<ol>`;
                            item.sppd.forEach(n=>{
                                html+=`<li>`;
                                    let p = this.ptk.filter(s=> s.id == n.ptk_diperintah)
                                    html+= p.length>0?p[0].guru_namalengkap:'Error';
                                html+=`</li>`;
                            })
                        html+=`</ol>`;
                    }else{
                        let model = new SuratKeluar(dv).findById(item.idbaris).configTargetSiswa(this.siswa);
                        
                        html+=item.perihal; 
                        html+= model.count_datatarget;
                    }
                    return html;
                })
                .addProperty('aksi',(item)=>{
                    let html = "";
                    let filessuratkeluar = item.idfile;
                        
                    if(item.sppd.length>0){
                        item.sppd.forEach(n=>{
                            let filesppd = n.versiupload;

                            if(filesppd !== ""){
                                let link = `https://drive.google.com/file/d/${filesppd}/view?usp=drivesdk`;
                                html+=`<button class="btn btn-sm btn-success" onclick="window.open(${link},'', 'width=720,height=600')"><i class="bi-eye"></i> SPPD</button>`;
                            }else if(filesppd==""){
                                if(this.canUploadFileSurat(n.ptk_diperintah)){
                                    let p = this.ptk.filter(s=> s.id == n.ptk_diperintah);
                                    let pelaku = "";
                                    if(p.length>0){
                                        pelaku = this.ptk.filter(s=> s.id == n.ptk_diperintah)[0].guru_namalengkap;

                                    }
                                    html+=`<button data-upload="sppd" data-id="${n.idbaris}" class="btn btn-sm btn-warning m-1"><i class="bi bi-cloud-arrow-down"></i> ${pelaku}</button>`
                                }
                            }
                        });
                    }else{
                        if(filessuratkeluar !=""){
                            let link = `https://drive.google.com/file/d/${filessuratkeluar}/view?usp=drivesdk`;
                            html+=`<button class="btn btn-sm  btn-success" onclick="window.open(${link},'', 'width=720,height=600')"><i class="bi-eye"></i></button>`;
                        }else{
                            if(item.user == this.user.idUser || this.canUploadFileSurat(item.user)){
                                html+=`<button data-upload="suratkeluar" data-id="${item.idbaris}" title="upload file SPPD" class="btn btn-sm btn-warning m-1"><i class="bi bi-cloud-arrow-down"></i></button>`;
                            }
                        }
                    } 
                    return html;
                })
                .addProperty('aksi2',(item)=>{
                    let html="";

                    if(item.indekssurat =='SPPD'){
                        html+=`<button class="btn btn-sm btn-primary m-1 rounded" data-show="sppd" data-idsuratkeluar="${item.idbaris}" title="Lihat SPPD"><i class="bi bi-eye"></i></button>`;
                        if(item.sppd.length==0){
                            html+=`<button class="btn btn-sm btn-danger m-1 rounded" data-show="hapussuratkeluar" data-idsuratkeluar="${item.idbaris}" title="Hapus Surat Keluar"><i class="bi bi-trash"></i></button>`;
                        }
                    }else{
                        html+=`<button class="btn btn-sm btn-secondary m-1 rounded mx-1" data-show="${item.indekssurat==''?'tidak dikenal':item.indekssurat}" data-idsuratkeluar="${item.idbaris}" title="Lihat Surat Keluar"> <i class="bi bi-eye"></i></button>`;
                        
                        
                        if(item.user == this.user.idUser || this.canUploadFileSurat(item.user)){
                            html+=`<button class="btn btn-sm btn-danger m-1 rounded" data-show="hapussuratkeluar" data-idsuratkeluar="${item.idbaris}" title="Hapus Surat Keluar"><i class="bi bi-trash"></i></button>`;
                            html+=`<button class="btn btn-sm btn-success m-1 rounded mx-1" data-show="editsuratkeluar" data-idsuratkeluar="${item.idbaris}" title="Edit Surat Keluar"><i class="bi bi-pencil"></i></button>`;
                        }
                    }
                    
                    
                    return html;
                })
                .addProperty('oleh',(item)=>this.ptk.filter(s=> s.id == item.user)[0].guru_namalengkap)
                .addProperty('sppd_lamahari',(item)=>item.sppd.length>0?item.sppd[0].ptk_durasisppd:'')
                .addProperty('sppd_maksudperjalanan',(item)=>item.sppd.length>0?item.sppd[0].ptk_maksudsppd:'')
                .addProperty('sppd_tempatperjalanan',(item)=>item.sppd.length>0?item.sppd[0].ptk_tempatsppd:'')
                .addProperty('sppd_targetperson',(item)=>{
                    let html ="";
                    if(item.sppd.length>0){
                        html+=`<ol>`;
                            item.sppd.forEach(n=>{
                                html+=`<li>`;
                                    let p = this.ptk.filter(s=> s.id == n.ptk_diperintah);
                                    html+= p.length>0?p[0].guru_namalengkap:'Error';
                                html+=`</li>`;
                            })
                        html+=`</ol>`;
                    }
                    return html;
                })
                .addProperty('refrensi_suratmasuk',(item)=>{
                    let html ="";
                    if(item.refrensi_suratmasuk!==""){
                        let data = this.service.dbSuratMasuk.filter(s=> s.idbaris == item.refrensi_suratmasuk);

                        if(data.length>0){
                            
                            let file = data[0].idfile;
                            if(file!==""){
                                html+=`<button class="btn btn-sm btn-outline-secondary" onclick="window.open('https://drive.google.com/file/d/${file}/view?usp=drivesdk','', 'width=720,height=600')"><i class="bi-file-word-fill"></li> Surat Undangan</li>`
                            }else{
                                html+=`file surat tidak ditemukan`;
                            }
                        }else{
                            html+=`file surat tidak ditemukan`;
                        }
                    }
                    return html;
                })
                .addProperty('tgl_surat',(item)=>item.tglsurat==""?"":new Date(item.tglsurat).toLocaleString('id-ID',{'dateStyle':'full'}))
                .data;
                
    }
    
    showSuratKeluar(countShow='all'){
        
        this.ptk = this.service.dbPtk;
        const dbS = this.dbSuratKeluar;
        let db = [];
        if(countShow=='all'){
            db = dbS;
        }else if(typeof(countShow)=='number'){
            db = dbS.filter((_,index)=>index < countShow)
        }else{
            db = dbS.filter((s,index)=>s.indekssurat === countShow)
        }
        let konfigTabel = {
                tableAtribut:{
                    id:'tabel-suratkeluar',
                    class:'w3-table-all toExcel table-sm font10',
                },
                db:db.slice(),
                atributeColumn:{
                    'oleh':{class:'print-hide text-center'},
                    'aksi':{class:'print-hide text-center'},
                    'aksi2':{class:'print-hide text-center'},
                },
                headers:[
                    {
                        columns:[
                            {label:'No Urut'},
                            {label:'Id Surat'},
                            {label:'Nomor Surat'},
                            {label:'Tanggal/Titimangsa Surat'},
                            {label:'Tujuan Surat'},
                            {label:'Indeks Surat'},
                            {label:'Perihal'},
                            {label:'File Yang diunggah<br>(ditandatangani & cap stempel)',atribute:{class:'print-hide'}},
                            {label:'Aksi',atribute:{class:'print-hide'}},
                            {label:'Dibuat Oleh',atribute:{class:'print-hide'}}
                        ]
                    }
                ],
                body:db.length>0?[
                    'auto',
                    'idbaris',
                    'nosurat',
                    'tgl_surat',
                    'ditujukkankepada',
                    'indekssurat',
                    'detailprihal',
                    'aksi',
                    'aksi2',
                    'oleh'
                ]:[]
            };
        let tabelSurat = new tabelDom(konfigTabel);
        
        this.workplace.innerHTML = this.htmlJudul+tabelSurat.init();
        let tb = new TableProperties(document.getElementById('tabel-suratkeluar'));
        tb.addScrollUpDown();
        this.settingControl();
    }
    
    showTabelSPPD(){
        
        const db = this.dbSuratKeluar.filter(s=> s.indekssurat == 'SPPD');
        console.log(this.dbSuratKeluar);
        let konfigTabel = {
            tableAtribut:{
                id:'tabel-suratkeluar',
                class:'w3-table-all toExcel table-sm font10',
            },
            db:db.slice(),
            atributeColumn:{
                'oleh':{class:'print-hide text-center'},
                'refrensi_suratmasuk':{class:'print-hide text-center'},
                'aksi':{class:'print-hide text-center'},
                'aksi2':{class:'print-hide text-center'},
            },
            headers:[
                {
                    columns:[
                        {label:'No Urut'},
                        {label:'Nomor Surat'},
                        {label:'Tanggal Perjalanan'},
                        {label:'Lama Hari'},
                        {label:'Maksud Perjalanan'},
                        {label:'Tempat Perjalanan'},
                        {label:'PTK yang diperintah'},
                        {label:'Refrensi (Surat Undangan)'},
                        {label:'File Yang diunggah<br>(ditandatangani & cap stempel)',atribute:{class:'print-hide'}},
                        {label:'Aksi',atribute:{class:'print-hide'}},
                        {label:'Dibuat Oleh',atribute:{class:'print-hide'}}
                    ]
                }
            ],
            body:db.length>0?[
                'auto',
                'nosurat',
                'tgl_surat',
                'sppd_lamahari',
                'sppd_maksudperjalanan',
                'sppd_tempatperjalanan',
                'sppd_targetperson',
                'refrensi_suratmasuk',
                'aksi',
                'aksi2',
                'oleh'
            ]:[]
        };
    let tabelSurat = new tabelDom(konfigTabel);
    
    this.workplace.innerHTML = this.htmlJudul+tabelSurat.init();
    let tb = new TableProperties(document.getElementById('tabel-suratkeluar'));
    tb.addScrollUpDown();
    this.settingControl();
    }
    settingControl(){
        const btnShow = document.querySelectorAll('[data-show]');
        btnShow.forEach(btn=>{
            btn.onclick = async ()=>{
                let tipe = btn.getAttribute('data-show');
                let idsurat = btn.getAttribute('data-idsuratkeluar');
                if(tipe == 'sppd'){
                    this.showSPPDfromIdSuratKeluar(idsurat);
                    this.Modal.show()
                }else if(tipe == 'hapussuratkeluar'){
                    let conf = confirm('Anda yakin ingin menghapus surat keluar ini?');
                    if(!conf) return;
                    let caridata = new SuratKeluar(this.dbSuratKeluar).findById(idsurat).data;
                    let datasurat = new DomainSuratKeluar(caridata).sanitize().data;
                    datasurat.status = 'hapus';
                    
                    await this.service.updateSuratKeluar(datasurat);
                    this.fnCreateDbSuratKeluar();
                    this.fokusmenu();
                }else if(tipe == 'editsuratkeluar'){
                    this.editSurat(tipe,idsurat,'');
                }else{
                    this.showSuratKeluarByType(tipe,idsurat)
                }
            }
        })
    }

    showSuratKeluarByType(tipe,idsurat){
        let model = new SuratKeluar(this.dbSuratKeluar)
                .findById(idsurat)
                .configTargetSiswa(this.siswa);
                
        let datashow = {
            judulmodal      : tipe,
            targetpersonal  : model.data_target,
            data            : model.data,
            tipetarget      : model.targetname??'Data Lampiran',
            tekscount       : model.count_datatarget
        };
        
        let html = sppdView.rekapItemsSuratKeluarByTemplate(datashow);
        this.Modal.settingHeder('Daftar ' + tipe);
        this.Modal.showBodyHtml(html);
        this.Modal.showHideFooter(false);
        this.showSuratKeluarTemplating();
        this.Modal.show();
    }
    
    showSuratKeluarTemplating(){
        const btns = document.querySelectorAll('[data-showsuratkeluartemplate]');
        btns.forEach(btn=>{
            btn.onclick = (e)=>{
                let template = btn.getAttribute('data-showsuratkeluartemplate');
                let tipeperson = btn.getAttribute('data-tipetarget');
                let idperson = btn.getAttribute('data-targetperson');
                let idSuratKeluar = btn.getAttribute('data-idsuratkeluar');
                let objekSurat = new SuratKeluar(this.dbSuratKeluar).findById(idSuratKeluar).configTargetSiswa(this[tipeperson]);
                let objekTarget = objekSurat.data_target.filter(s=> s.id == idperson)[0];
                let kepsek = new CollectionsEdu(this.ptkall).customFilter((d)=>{
                                let tglsurat = new Date(objekSurat.data.tglsurat).getTime();
                                let awaltugas = new Date(d.start_at).getTime();
                                let akhirtugas = new Date(d.end_at).getTime();
                                
                                return (d.jenis_ptk === 'kepsek' && awaltugas <= tglsurat && akhirtugas >= tglsurat)
                            }).addProperty('akun',(item)=>{
                                return this.ptk.filter(s=>s.id == item.user_id)[0];
                            }).data;
                let data = {
                    logokotadepok: this.user.logoDepok,
                    idsurat:idSuratKeluar,
                    suratkeluar:objekSurat.data,
                    targetperson:objekTarget,
                    targetpersonlampiran:objekSurat.data_target,
                    targettipeperson:tipeperson,
                    logoSekolah:this.user.logoSekolah,
                    tapel :this.user.tapel,
                    kepsekbytgl:kepsek,
                    identitas:{
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
                
                let templating = template.replace(/(\s+)/g,'_');
                
                let html = ""
                if(idperson == 'lampiran'){
                    this.Modal1.settingHeder(template);
                }else{
                    this.Modal1.settingHeder(template+' : ' + (tipeperson =='siswa'?data.targetperson.pd_nama:data.targetperson.guru_namalengkap));
                }
                html = sppdView[templating](data);
                let ob = {html:html,toggleTo:'#modalAuto',title:template};

                this.Modal1.showBodyPrintable(ob);
                this.Modal1.widthOrientation(false);
                this.Modal.toggle();
                this.Modal1.toggle();
            }
        })
    }

    showSPPDfromIdSuratKeluar(idsuratkeluar){
        let objekpersonal = this.dbSuratKeluar.filter(s=> s.idbaris == idsuratkeluar);
        let data = {
            judulmodal:`<h3 class="text-center">Data SPPD No surat ini</h3>`,
            datasppd:new CollectionsEdu(objekpersonal[0].sppd)
                    .addProperty('namaptk',(item)=>this.ptk.filter(s=>s.id == item.ptk_diperintah)[0])
                    .addProperty('tendik',(item)=>this.service.dbTendik.filter(s=>s.idguru == item.ptk_diperintah)[0])
                    .addProperty('tglend',(item)=>{
                        let d = new Date(item.ptk_starttgl);
                        d.setDate(d.getDate()+(parseInt(item.ptk_durasisppd)-1));
                        return d;
                    })
                    .addProperty('kepsekbytgl',(item)=>{
                        return this.ptkall.filter(d=>{
                                let tglsurat = new Date(item.ptk_starttgl).getTime();
                                let awaltugas = new Date(d.start_at).getTime();
                                let akhirtugas = new Date(d.end_at).getTime();
                                return (d.jenis_ptk === 'kepsek' && awaltugas <= tglsurat && akhirtugas >= tglsurat)
                            })
                    })
                    .addProperty('canEdit',(item)=>item.ptk_diperintah == this.user.idUser)
                    .data,
            idbaris:objekpersonal[0].idbaris,
            oleh : objekpersonal[0].user
        };
        let canAccess = (objekpersonal[0].user == this.user.idUser || this.user.canEdit);
        let html = sppdView.rekapItemsNoSuratSPPD(data,canAccess);

        this.Modal.settingHeder('Daftar SPPD');
        this.Modal.showBodyHtml(html);
        this.Modal.showHideFooter(false);
        this.upgradeShowSppdFromTableSurat();
    }
    
    upgradeShowSppdFromTableSurat(){
        let btns = document.querySelectorAll('[data-showsppd]');
        btns.forEach(btn=>{
            btn.onclick = async()=>{
                let tipeAction = btn.getAttribute('data-showsppd');
                let data_id = btn.getAttribute('data-idsppd');
                let data_suratkeluar = btn.getAttribute('data-idsuratkeluar');
                let objeksppd = this.service.dbSuratKeluar.filter(s=> s.idbaris == data_suratkeluar)[0];
                
                if(tipeAction === 'show'){
                    this.showSPPD(data_id, data_suratkeluar);
                }else if(tipeAction =='edit_all'){
                    this.editSurat('SPPD', data_suratkeluar,data_id)
                }else if(tipeAction == 'hapus'){
                    let confi = confirm('Anda yakin ingin menghapus ini?');

                    if(!confi) return;
                    
                    let datasppd = objeksppd.sppd.filter(s=>s.idbaris == data_id)[0];
                    let datamodel = new Sppd(datasppd).sanitize().data;
                        datamodel.hapus = 'hapus';

                    await this.service.updateSppd(datamodel);
                    
                    this.fnCreateDbSuratKeluar();
                    this.showSPPDfromIdSuratKeluar(data_suratkeluar);
                    this.fokusmenu();
                }else{
                    this.showFormulirDetailSppd(objeksppd.sppd.filter(s=>s.idbaris == data_id)[0])
                }
                
            }
        })
    }
    
    showSPPD(data_id,data_suratkeluar){
        
                let objekspppd = this.service.dbSppd.filter(s=> s.idbaris == data_id);
                let objeksuratkeluar = this.service.dbSuratKeluar.filter(s=> s.idbaris == data_suratkeluar);
                let data = {
                    logokotadepok: this.user.logoDepok,
                    idsppd:data_id,
                    idsurat:data_suratkeluar,
                    suratkeluar:objeksuratkeluar[0],
                    sppd:objekspppd[0],
                    logoSekolah:this.user.logoSekolah,
                    identitas:{
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
                let html = sppdView.buildPageSppd(data);
                let ob = {html:html,toggleTo:'#modalAuto',title:'SPPD'};

                this.Modal1.settingHeder('SPPD : ' + data.sppd.namaptk.guru_namalengkap);
                this.Modal1.showBodyPrintable(ob);
                this.Modal1.widthOrientation(false);
                this.Modal.toggle();
                this.Modal1.toggle();
    }
    
    showSuratKeluarUntukSppd(title,objeksuratkeluar,buatApaEdit='Buat'){
        let target = "target_ptk"
        let head = buatApaEdit +' ' +title;
        let namatarget = 'PTK';
        let arrayTarget = {
                        label:'',
                        value:'all',
                        id:'show-ptk-all'
                    };
        let dataDefault = {
            'id_nosurat':'',
            'tglsurat': new FormatTanggal(new Date()).valueInputDate(),
            'perihal': 'SPPD',
            'ditujukkankepada':'Pihak yang berkepentingan',
            'indekssurat':title,
            'namatarget':namatarget,
            'opsipersonal':arrayTarget,
            'needrefrensi':true
        }
        
        if(buatApaEdit == 'Edit'){
            let assignData = Object.assign({},dataDefault,objeksuratkeluar);
            console.log(assignData)
            let html = sppdView.createSurat(assignData);
            this.Modal1.settingHeder(head);
            this.Modal1.showBodyPreviousStep(html)
            this.Modal1.showHideFooter(false);
            this.eventFormulirCreate(title,target);
            this.Modal1.show();
            this.Modal.toggle();
            
            let switchOn = document.getElementById('show-ptk-all');
            switchOn.checked = true;
            switchOn.dispatchEvent(new Event('change'));
    
            let checkboxptk = document.querySelectorAll('[name="checkboxpersonal"]');
            let itemsPTK = assignData.sppd.map(n=>n.ptk_diperintah);

            checkboxptk.forEach(ckb=>{
                if(itemsPTK.includes(ckb.value)){
                    ckb.checked = true;
                    ckb.setAttribute('disabled',true);
                }
            });

            let back = document.getElementById('btn-modal-previousstep');
            back.onclick = () =>{
                this.Modal.show();
                this.Modal1.toggle();
            }

            const btnSave = document.getElementById('btn-modal-action');
            btnSave.onclick = async ()=>{
                let conf = confirm('Anda yakin data yang dikirim sudah benar?');
                if(!conf) return;
                let request = this.prasiapKirimSuratKeluar('target_ptk');
                let combine = Object.assign({},objeksuratkeluar,request);
                let datasppd = this.persiapanKirimSppd(combine);
                let sendRequest = new DomainSuratKeluar(combine).sanitize().data;
                
                await this.service.updateSuratKeluar(sendRequest);
                await this.service.createOrUpdateMultipleSppd(datasppd)
                
                this.fnCreateDbSuratKeluar();
                this.showSPPDfromIdSuratKeluar(combine.idbaris);
                this.fokusmenu();
            }
        }else{

        }
    }
    
    showFormulirDetailSppd(objeksppd){
        let html = "";
            html+=sppdView.createSppd(objeksppd)
        
        this.Modal1.settingHeder(objeksppd.namaptk.guru_namalengkap)
        this.Modal1.showBodyPreviousStep(html)
        this.Modal1.show();
        
        let back = document.getElementById('btn-modal-previousstep');
        back.onclick = () =>{
            this.Modal.show();
            this.Modal1.toggle();
            
        }
        
        let formIsian = document.querySelectorAll('[data-kirim]');
        formIsian.forEach(n=>{
            let atr = n.getAttribute('data-kirim');
            if(['ptk_maksudsppd','ptk_tempatsppd'].includes(atr)){
                n.setAttribute('disabled',true);
            }
        })

        const btnSave = document.getElementById('btn-modal-action');
        btnSave.onclick = async()=>{
            let data = this.requestEditSppd();
            let datasppd = Object.assign({},objeksppd,data);
            let datamodel = new Sppd(datasppd).sanitize().data;
            
            await this.service.updateSppd(datamodel);
            
            this.fnCreateDbSuratKeluar();
            this.showSPPDfromIdSuratKeluar(objeksppd.refrensi_suratkeluar);
            this.fokusmenu();
        }

        this.Modal.toggle();
    }
    
    requestEditSppd(){
        let data = {};
        let srcelemen = document.querySelectorAll('[data-kirim]');
        srcelemen.forEach(n=>{
            let atr = n.getAttribute('data-kirim');
            data[atr] =n.value;
        })
        return data;
    }
    
    editSurat(title,idsuratkeluar,idptk){
        
        let objeksuratkeluar = this.service.dbSuratKeluar.filter(s=> s.idbaris == idsuratkeluar)[0];
        if(title=="SPPD"){
            this.showSuratKeluarUntukSppd(title,objeksuratkeluar,'Edit');
        }else{
            let jtitle=objeksuratkeluar.indekssurat;
            this.showFormulirCreate('Edit',jtitle,'target_siswa');
            this.eventFormulirCreate(jtitle,'target_siswa');
            this.eventBuatNoSurat();
            this.eventFormulirEdit(objeksuratkeluar)
            this.Modal.show()
            const btnSave = document.getElementById('btnSimpanUpdateSurat');
            btnSave.onclick = ()=> {
                let confir = confirm('Anda yakin sudah benar?');
                if(!confir) return;
                
                this.postEditCreateSurat('target_siswa',objeksuratkeluar)
            };
        }
    }

    eventFormulirEdit(datasurat){
        const inputDataSend = document.querySelectorAll('[data-formulircreate]');
        inputDataSend.forEach(n=>{
            let atr = n.getAttribute('data-formulircreate');
            if(datasurat[atr]){
                n.value = datasurat[atr];
            };
            
            if(datasurat.target_siswa !=''){
                const stage = document.getElementById('stage-pilih-personal');
                const wraperselect = document.getElementById('wrapersuratkeluarpilihrombel');
                stage.innerHTML = '';

                let itemsSiswa = datasurat.target_siswa.split(',');
                let data = {};
                    data.tipetarget = 'target_siswa';
                    data.arraypersonal = this.siswa.filter(s=>itemsSiswa.map(n=>parseInt(n)).includes(parseInt(s.id)));
                    
                stage.innerHTML += sppdView.checkBoxTargetPersonal(data,true);

                let switchOn = document.getElementById('show-siswa-all');
                switchOn.onchange = ()=>{
                    wraperselect.innerHTML= sppdView.selectRombel(this.splitingFokusRombel[0]);
                    const select = document.getElementById('suratkeluarpilihrombel');
                    if(select){
                        select.onchange = (e) => {
                            data.arraypersonal = this.siswa.filter(s=>itemsSiswa.map(n=>parseInt(n)).includes(parseInt(s.id)));
                            stage.innerHTML = sppdView.checkBoxTargetPersonal(data,true);
                            
                            data.arraypersonal = this.siswa.filter(s=> !itemsSiswa.map(n=>parseInt(n)).includes(parseInt(s.id)) && s.nama_rombel == e.target.value  && s.aktif == 'aktif');
                            stage.innerHTML += sppdView.checkBoxTargetPersonal(data);
                        };
                        select.value = this.splitingFokusRombel[0];
                        select.dispatchEvent(new Event('change'));
                    }
                }
            }
        });
    }
    eventCariSuratMasuk(){
        const inputan = document.getElementById('modal_carisuratmasuk');
        const stageInputan = document.getElementById('modal_result_carisuratmasuk');
        inputan.oninput = (e)=>{
            let data = new SuratMasuk(this.service.dbSuratMasuk).findByValue(e.target.value);
            
            let dom = document.getElementById('refrensi_suratmasuk');
            dom.value = "";
            
            stageInputan.innerHTML = sppdView.viewResultCariSuratmasuk(data);
            
            let radios = document.querySelectorAll('input[name="pilih_hasil_cari_suramasuk"]');
            radios.forEach(n=>{
                n.onchange = (e)=>dom.value = e.target.value;
            })
        }
    }
    eventBuatSuratMasukInModal(data){
       
        const uploadBtn = document.querySelectorAll('[data-uploaddokumen]');
        uploadBtn.forEach(el=>{
            el.onchange = async(e)=>{
                let files = e.target.files[0];
                let parent = e.target.parentElement;
                let domPreview = parent.querySelector('[data-uripreview]');
                let fokuslabel = e.target.getAttribute('data-labelname');
                let idTarget = e.target.getAttribute('data-uploaddokumen');
                let inputTarget = document.getElementById('frm-'+idTarget);
                
                if(files){
                    let propertiImageController ={
                        folder:'Surat Masuk',
                        subfolder:'Refrensi SPPD',
                        namafile:data.indekssurat+'_'+(new Date().getTime())+'_'+files.name
                    }
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
    buatSurat(title,target){
        this.Modal.settingHeder('Buat '+title);
        if(title=="SPPD"){
            this.showFormulirCreate('Buat',title,target,
                        {
                            'perihal':'Ketikkan Maksud Perjalanan',
                            'ditujukkankepada':'Ketikkan Tempat Tujuan Dinas',
                            'needrefrensi':true
                        }
                    );
            this.eventFormulirCreate(title,target);
            this.eventBuatNoSurat();
            this.eventCariSuratMasuk();

            let switchOn = document.getElementById('show-ptk-all');
            switchOn.checked = true;
            switchOn.dispatchEvent(new Event('change'));
            
            this.Modal.show();
            
            let addSuratMasuk = document.getElementById("btn-add-suratmasuk");
            addSuratMasuk.onclick = ()=>{
                this.Modal.toggle();
                let data = new DomainSuratMasuk();
                data.addItem('tglditerima_input' , new FormatTanggal().valueInputDate());
                data.addItem('tglsurat_input' , new FormatTanggal().valueInputDate());
                data.addItem('nosurat',"");
                data.addItem('asalsurat',"");
                data.addItem('perihal',"");
                data.addItem('indekssurat',"Dasar Perjalanan Dinas");
                data.addItem('ditujukkankepada' , "");
                data.addItem('status',"diarsipkan");
                data.addItem('oleh',this.user.namaUser);
                
                let htmlcreate = sppdView.viewFormulirSuratMasuk(data.data);
                
                this.Modal1.settingHeder('Refrensi Surat Masuk');
                this.Modal1.showBodyPreviousStep(htmlcreate);
                this.Modal1.show();
                this.eventBuatSuratMasukInModal(data)

                let back = document.getElementById('btn-modal-previousstep');
                back.onclick = () =>{
                    this.Modal.show();
                    this.Modal1.toggle();
                }
                let saveSuratmasuk = document.getElementById('btn-modal-action');
                saveSuratmasuk.onclick = async()=>{
                    let inputs = document.querySelectorAll('[data-kirimsuratmasuk]');
                    // let val = [];
                    let tahan = 0;
                    let obj = {};
                    inputs.forEach(n=>{
                        let atr = n.getAttribute('data-kirimsuratmasuk');
                        obj[atr] = n.value;
                        // val.push(obj);
                        if(n.value == ''){
                            tahan++;
                        }
                    });
                    console.log(this.service.dbSuratMasuk.length,this.service.dbSuratMasuk);
                    if(tahan){
                        alert('Harus diisi semua');
                        return;
                    }
                    console.log('tahan',tahan,Boolean(tahan))
                    
                    let suratmasuk = new DomainSuratMasuk(obj).sanitize().data;
                    console.log(suratmasuk);
                    await this.service.saveSuratMasuk(suratmasuk)
                    // console.log(this.service.dbSuratMasuk.length,this.service.dbSuratMasuk);
                    this.fnCreateDbSuratKeluar();
                    console.log(this.service.dbSuratMasuk[this.service.dbSuratMasuk.length-1]);
                    document.getElementById('refrensi_suratmasuk').value = this.service.dbSuratMasuk[this.service.dbSuratMasuk.length-1].idbaris;
                    this.Modal.show();
                    this.Modal1.toggle();
                    

                }
            }
            let next = document.getElementById('btn-modal-nextstep');
            next.onclick = async()=>{
                let conf = confirm('Anda yakin?');
                if(!conf) return;

                this.Modal1.showBodyHtml('tunggu sebentar');
                this.Modal1.show();
                this.Modal.toggle();
                let request = this.prasiapKirimSuratKeluar('target_ptk');
                let combine = Object.assign({},request);
                let sendRequest = new DomainSuratKeluar(combine).sanitize().data;
                // await this.service.saveSuratKeluar(sendRequest);
                // this.fnCreateDbSuratKeluar();
                // let datasppd = this.persiapanKirimSppd(combine);
                console.log('request',request);
                console.log('sendRequest',sendRequest)
                // console.log('datasppd',datasppd)
                
                // await this.service.updateSuratKeluar(sendRequest);
                // await this.service.createOrUpdateMultipleSppd(datasppd)
                
                // 
                // this.showSPPDfromIdSuratKeluar(combine.idbaris);
                // this.fokusmenu();
            
            }
            
        }else{
            
            this.showFormulirCreate('Buat',title,target);
            this.eventFormulirCreate(title,target);
            this.Modal.show();
            this.eventBuatNoSurat()
            
            const btnSave = document.getElementById('btnSimpanUpdateSurat');
            btnSave.onclick = ()=> this.simpanCreateSurat(target)
        }
    }
    
    showFormulirCreate(prefik,title,target,objek=null){
        let head =prefik+" " +title;
        let arrayTarget = {};
        let namatarget = '';
        let btnsave = `<button class="btn btn-sm btn-success" id="btnSimpanUpdateSurat">Simpan Server</button>`;

        if(target=='target_siswa'){
            namatarget = 'Siswa';
            arrayTarget =  {
                label:'',
                value:'all',
                id:'show-siswa-all'
            }
        }else{
            namatarget = 'PTK';
            arrayTarget = {
                        label:'',
                        value:'all',
                        id:'show-ptk-all'
                    };
            
        }

        let dataDefault = {
            'id_nosurat':'',
            'tglsurat': new FormatTanggal(new Date()).valueInputDate(),
            'perihal': 'Surat Keterangan Siswa',
            'ditujukkankepada':'Pihak yang berkepentingan',
            'indekssurat':title,
            'namatarget':namatarget,
            'opsipersonal':arrayTarget,
            'needrefrensi':false

        }
        let dataCreate = objek?Object.assign({},dataDefault,objek):dataDefault;
        let html = sppdView.createSurat(dataCreate);

        console.log(title)
        this.Modal.settingHeder(head);
        if(title == 'SPPD'){
            this.Modal.showBodySaveButton(html);
        }else{
            this.Modal.showBodyHtml(html);
            this.Modal.showFooter(btnsave);
        }
    }
    
    eventFormulirCreate(title,target){
        if(title=="Surat Keterangan Aktif"){
            let radioaktif = document.querySelector('[name="klasifikasisurat"][value="422.6"]');
            radioaktif.checked = true;
            radioaktif.dispatchEvent(new Event('change'));
        }else if(title == "Surat Keterangan NISN"){
            let radioaktif = document.querySelector('[name="klasifikasisurat"][value="422.7"]');
            radioaktif.checked = true;
            radioaktif.dispatchEvent(new Event('change'));
        }
        //input formulircreat
        const inputDataSend = document.querySelectorAll('[data-formulircreate]');
        const radioKlasifikasi = document.querySelectorAll('input[name="klasifikasisurat"]');
        const stage = document.getElementById('stage-pilih-personal');

        inputDataSend.forEach(n=>{
            let atribute = n.getAttribute('data-formulircreate');
            //event buat nomor surat otomatis:
            if(['id_nosurat','tglsurat'].includes(atribute)){
                n.oninput = ()=> this.eventBuatNoSurat()
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
        
        const radioTargetPersonal = document.querySelector('input[name="createsuratpilihtarget"]');
        radioTargetPersonal.onchange = (e)=>{
            if(radioTargetPersonal.checked == true){
                this.eventShowPersonalTarget(target);
            }else{
                document.getElementById('wrapersuratkeluarpilihrombel').innerHTML = "";
                stage.innerHTML = `Untuk Semua ${target=="target_siswa"?`Siswa (${this.splitingFokusRombel[0]})`:'PTK'}<br>Silakan pilih satu/sebagian ${target=="target_siswa"?'Siswa':'PTK'} untuk melihat siapa saja yang akan dibuatkan surat`;
            }
        }
        
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

    get splitingFokusRombel(){
        return  this.fokusrombel.replace(/(\s+)/g).split(',');
    }

    eventShowPersonalTarget(target){
        const stage = document.getElementById('stage-pilih-personal');
        let data = {
            'tipetarget':target
        };
        
        if(target == 'target_siswa'){
            data.arraypersonal = this.siswa.filter(s=>s.nama_rombel == this.splitingFokusRombel[0] && s.aktif == 'aktif');
            
            stage.innerHTML = sppdView.checkBoxTargetPersonal(data);
            
            if(this.user.canEdit){
                document.getElementById('wrapersuratkeluarpilihrombel').innerHTML=sppdView.selectRombel(this.splitingFokusRombel[0]);
                const select = document.getElementById('suratkeluarpilihrombel');
                if(select){
                    select.onchange = (e) => {
                        data.arraypersonal = this.siswa.filter(s=>s.nama_rombel == e.target.value  && s.aktif == 'aktif');
                        stage.innerHTML = sppdView.checkBoxTargetPersonal(data);
                    };
                }
            }

        }else{
            data.arraypersonal = this.ptk.filter(s=>s.aktif == 'aktif');
            stage.innerHTML = sppdView.checkBoxTargetPersonal(data)
        }
    }
    persiapanKirimSppd(suratkeluar){
        let arrayData = [];
        const {target_ptk, sppd} = suratkeluar;
        
        target_ptk.split(',').forEach(n=>{
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

    prasiapKirimSuratKeluar(target){
        let data = {};
        let person = [];
        let stringPerson = '';
        const inputRefrensi = document.querySelectorAll('[data-formulircreate]');
        const inputanTarget = document.querySelectorAll('input[name="checkboxpersonal"]:checked');

        inputRefrensi.forEach(n=>{
            let atr = n.getAttribute('data-formulircreate');
            data[atr] = n.value;
        });

        if(inputanTarget.length == 0){
            person = this.siswarombel.map(n=>n.id);
            stringPerson = person.join(',');
            data[target] = stringPerson;
        }else{
            inputanTarget.forEach(n=>{
                if(n.checked){
                    person.push(n.value)
                }
            });
            stringPerson = person.join(',');
            data[target] = stringPerson;
        }
        
        data.user = this.user.idUser;
        data.oleh = this.user.namaUser;
        return data
    }
    
    async simpanCreateSurat(target){
        // datainput
        let data = {};
        let person = [];
        let stringPerson = '';
        const inputRefrensi = document.querySelectorAll('[data-formulircreate]');
        const inputanTarget = document.querySelectorAll('input[name="checkboxpersonal"]:checked');

        inputRefrensi.forEach(n=>{
            let atr = n.getAttribute('data-formulircreate');
            data[atr] = n.value;
        });

        if(inputanTarget.length == 0){
            person = this.siswarombel.map(n=>n.id);
            stringPerson = person.join(',');
            data[target] = stringPerson;
        }else{
            inputanTarget.forEach(n=>{
                if(n.checked){
                    person.push(n.value)
                }
            });

            stringPerson = person.join(',');
            data[target] = stringPerson;
        }
        
        data.user = this.user.idUser;
        data.oleh = this.user.namaUser;

        await this.service.saveSuratKeluar(data);

        this.Modal.hide();

        const btnShowSuratKeluar = document.getElementById('btnshow-suratkeluar');
        if(btnShowSuratKeluar){
            this.initInheritance('surat_keluar');
            btnShowSuratKeluar.dispatchEvent(new Event('click'));
        }
    }

    async postEditCreateSurat(target,objek){
        // datainput
        let data = {};
        let person = [];
        let stringPerson = '';
        const inputRefrensi = document.querySelectorAll('[data-formulircreate]');
        const inputanTarget = document.querySelectorAll('input[name="checkboxpersonal"]:checked');

        inputRefrensi.forEach(n=>{
            let atr = n.getAttribute('data-formulircreate');
            data[atr] = n.value;
        });

        if(inputanTarget.length == 0){
            person = this.siswarombel.map(n=>n.id);
            stringPerson = person.join(',');
            data[target] = stringPerson;
        }else{
            inputanTarget.forEach(n=>{
                if(n.checked){
                    person.push(n.value)
                }
            });
            stringPerson = person.join(',');
            data[target] = stringPerson;
        }

        data.oleh = this.user.namaUser;
        let dataCombine = Object.assign({},objek,data);
        let datakirim = new DomainSuratKeluar(dataCombine).sanitize().data;
        let confir = confirm('Anda yakin data sudah benar');
        if(!confir) return;

        this.Modal.hide();

        await this.service.updateSuratKeluar(datakirim);// (datakirim);
        this.fnCreateDbSuratKeluar();
        this.fokusmenu();
        // const btnShowSuratKeluar = document.getElementById('btnshow-suratkeluar');
        // this.initInheritance('surat_keluar');
        // btnShowSuratKeluar.dispatchEvent(new Event('click'));

    }

    dispatchBtnSPPD(dom){
        dom.onclick = ()=>this.buatSurat('SPPD','target_ptk');
    }
}