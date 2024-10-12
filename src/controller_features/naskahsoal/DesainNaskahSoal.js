import NaskahSoal from "../../domains/NaskahSoal";
import { FormatTanggal } from "../../utilities/FormatTanggal";
import { TableProperties } from "../../utilities/tableProperties";
import kopsuratEdurasa from "../../views/surat/kopsurat";
import { previewBentukSoal, previewSoalWithProperty, propertiItemSoal, replaceSoalToSel } from "../banksoal/viewBankSoal";
import { FormulirBankSoal } from "../editor/FormulirBankSoal";
import EventReplaceSoal from "./EventReplaceSoal";
import PropertiNaskahSoal from "./PropertiNaskahSoal";
// import { controlFiturBuatPerItemSoal } from "../banksoal/viewBankSoal";
import viewDesainNaskah from "./viewDesainNaskah";
import viewSoal from "./viewSoal";

export default class DesainNaskahSoal{
    constructor(banksoal,printarea,toolarea,modal, modal1){
        this.banksoal = banksoal;
        this.printarea = printarea;
        this.toolarea = toolarea;
        this.Modal = modal;
        this.Modal1 = modal1;
        this.workplace = document.getElementById('printarea');
        this.pradesain={};
        this.datadesain={};
        this.areaedit = null;
    }
    createTool(){
        
        let datamenu = {
            'koleksiBentukSoal':this.banksoal.koleksiBentukSoal,
            'shortKurikulum':this.banksoal.shortKurikulum,
            'longKurikulum':this.banksoal.longKurikulum,
            'jenjang':this.banksoal.jenjang,
            'koleksimapel':this.banksoal.currentMapelOnClassRoom,
            'koleksirombel':this.banksoal.user.koleksiRombel,
            'isGuruMapel':this.banksoal.user.typeUser == 'Guru Mapel',
            'mapelAjar':this.banksoal.user.tugasUser,
            'koleksibentuksoal':this.banksoal.koleksiBentukSoal,
            '_htmlkoleksimapel':this.banksoal.labelingSelectMapel,
            '_htmlkoleksimapelWithTema':this.banksoal.labelingSelectMapelWithTema,
            'kurikulum':this.banksoal.ormKurikulum,
            'draft':this.showDraft()
        };
        
        this.toolarea.innerHTML = viewDesainNaskah.toolbar(datamenu);
        this.printarea.innerHTML = 'Silakan atur desain naskah template dulu, kemudian klik tombol "Buat Template Naskah" pada tab menu Finishing.'
    }
    writeLocal(data){
        window.localStorage.setItem('draftnaskah_'+this.banksoal.jenjang,JSON.stringify(data));
    }
    createDraftNaskah(datanaskah){
        let data = {};
        data.pradesain = this.pradesain;
        data.html = datanaskah;
        this.writeLocal(data);
        alert('Draft berhasil disimpan');
    }
    showDraft(){
        let data;
        if(window.localStorage.hasOwnProperty('draftnaskah_'+this.banksoal.jenjang)){
            data = JSON.parse(window.localStorage.getItem('draftnaskah_'+this.banksoal.jenjang));
        }
        return data;
    }
    async init(){
        let dbarray = [{
            'idss': this.banksoal.banksoalservice.repo.ss_banksoal_must_call,
            'tab':'banksoal',
        },
        {
            'idss': this.banksoal.banksoalservice.repo.ss_banksoal_must_call,
            'tab':'simpandesainsoal',
        }];
        // cek dulu = 
        let letCall = dbarray.filter(n=>!this.banksoal.banksoalservice.isExist(n.tab));
        
        if(letCall.length>0){
            
            await this.banksoal.banksoalservice.callPropertiMultiple(letCall);
            
        }

        // this.registerListenerDurasi();
        // this.registerListnerPropertiKurikulum();
        this.Modal.widthOrientation(true);
        this.Modal1.widthOrientation(true);
        this.Modal1.showHideFooter(false);
        this.Modal.body.classList.add('p-0');
        this.registerListenerElemenPraDesain();
        this.registrasiListenerKerangka();
        this.registrasiTemplate();
        this.registrasiBtnFinal();
        
    }
    registerListenerElemenPraDesain(){
        let elemen_pradesain = document.querySelectorAll('[data-pradesain]');
        let targetInput = document.querySelector('#durasi');
        let data = {};
        elemen_pradesain.forEach(n=>{
            
            n.onchange = (e)=>{
                if(n.getAttribute('data-pradesain')=='mapel'){
                    this.registerListnerPropertiKurikulum();
                }
                data = this.updatepradesain();
                this.pradesain = Object.assign(this.pradesain,data);
                targetInput.value =  FormatTanggal.durasiMenit(data.start_waktu,data.end_waktu);
            }
            
        });
        this.registerListnerPropertiKurikulum();
        document.querySelector('#selectmapel').dispatchEvent(new Event('change'));
    }
    updatepradesain(){
        let elemen_pradesain = document.querySelectorAll('[data-pradesain]');
        let data = {};
        elemen_pradesain.forEach(n=>{
            if(n.type=='checkbox'){
                if(n.checked){
                    data[n.getAttribute('data-pradesain')] = true;
                }else{
                    data[n.getAttribute('data-pradesain')] = false;
                }
            }else if(n.type == 'radio'){
                if(n.checked){
                    data[n.getAttribute('data-pradesain')] = n.value;
                }
            }else if(n.type=='select-one'){
                data[n.getAttribute('data-pradesain')]=n.value;
                
                
                data['tekskodemapel']=this.banksoal.currentMapelOnClassRoom[n.value];
            }else{
                data[n.getAttribute('data-pradesain')] = n.value;

            }
        });
        return data;
    }
    
    registerCheckMarkKompetensi(tipekurikulum,orm){
        let checker = null;
        let key = 'idbaris';
        let data = [];

        if(tipekurikulum == 'kurmer'){
            checker = document.querySelectorAll('input[name="atpmodal"]')
        }else{
            key = 'baris';
            checker  = document.querySelectorAll('input[name="kd3modal"]')
        }
        
        checker.forEach((n)=>{
            n.onchange = (e)=>{
                if(n.checked){
                    let ormItem = orm.filter(s=> s[key]== e.target.value);
                    data.push(ormItem[0]);
                }else{
                    let indek = data.findIndex(s=>s[key]==e.target.value);
                    data.splice(indek,1);
                }
                
                this.pradesain['propertikd'] = data;
                
            }
        })
    }
    stringToDom(string){
        const template= document.createElement('template');
        template.innerHTML = string;
        return template.content;
    }
    kopNaskah(judul){
        const logo=this.banksoal.user.logoDepok,logosekolah=this.banksoal.user.logoSekolah;
                let objKetSurat = {
                    judul:'PEMERINTAH DAERAH KOTA DEPOK',
                    judul2:'DINAS PENDIDIKAN',
                    namasekolah:this.banksoal.user.namaSekolah,
                    alamat:'Jl. SMP Ratujaya No. 41, RT 05/RW 03, Kel. Ratujaya',
                    alamat2:'NPSN: 20228914 | Email: uptdsdnratujaya1@gmail.com, web: www.sdnratujaya1.net',
                    tapelsemester:'TAHUN PELAJARAN '+this.banksoal.user.tapel,
                    judul3:judul,
                    alamat3:'kecamatan Cipayung'
                }
                let crDom = document.createElement('div');
                crDom.setAttribute('class','kops mb-3');
                crDom.innerHTML =  kopsuratEdurasa['versi3'](logo, objKetSurat,logosekolah);
                // this.workplace.appendChild(crDom);
                // this.workplace.insertBefore(crDom,this.workplace.firstChild);
                return crDom.outerHTML;
    }
    return_mapelTema (){
        let mapelTema = [];
        if(this.banksoal.jenjang>3){
            mapelTema = ['PKN','BINDO','IPA','IPS','SBDP'];
        }else{
            mapelTema = ['PKN','BINDO','MTK','SBDP','PJOK'];

        }
        return mapelTema;
    }
    registerListnerPropertiKurikulum(){
        let controlMapel = document.querySelector('#selectmapel');
        let targetView = document.querySelector('#tableKDTemplateDesain');
        let orm = this.banksoal.ormKurikulum.data;
        let tipekurikulum = this.banksoal.shortKurikulum;
        let mapelTema = [];
        if(this.banksoal.jenjang>3){
            mapelTema = ['PKN','BINDO','IPA','IPS','SBDP'];
        }else{
            mapelTema = ['PKN','BINDO','MTK','SBDP','PJOK'];

        }
        controlMapel.onchange = (e)=> {
            let filterOrm = [];
            if(tipekurikulum == 'kurmer'){
                filterOrm = orm.filter(s=> s.kodemapel == e.target.value).sort((a,b)=>a.foreignkey_elemencp - b.foreignkey_elemencp);
            }else{
                if(e.target.value.indexOf('Tema ')>-1){

                    filterOrm = orm.filter(s=>mapelTema.includes(s.mapel));
                }else{
                    filterOrm = orm.filter(s=>s.mapel == e.target.value);
                }
            }
            
            targetView.innerHTML = viewDesainNaskah.tabelPropertiKurikulum(
                                        tipekurikulum,
                                        filterOrm,
                                        this.banksoal.banksoalservice.data.banksoal,
                                        this.banksoal.jenjang,
                                        this.banksoal.koleksiBentukSoal
                                    );
            this.registerCheckMarkKompetensi(tipekurikulum,filterOrm);
        }
        
    }
    registrasiListenerKerangka(){
        let jumlahsoal = document.querySelectorAll('[data-jumlahsoal]');
        let wraper = document.getElementById('kerangkanaskahpreview');
        let ar =[];
        jumlahsoal.forEach(n=>{
            n.onblur = (e)=>{
                let id = n.getAttribute('data-desain');
                
                
                if(e.target.value == ''| e.target.value == 0){
                    let cekdom = wraper.querySelector(`[data-urutanbentuksoal="${id}"]`);
                    let arraycekdom = Array.from(wraper.querySelectorAll('[data-urutanbentuksoal]'));
                    let index = arraycekdom.indexOf(cekdom);
                
                    if(cekdom){
                        cekdom.remove();
                        ar.splice(index,1);
                    }
                }else{
                    let cekdom = wraper.querySelector(`[data-urutanbentuksoal="${id}"]`);
                    
                    if(!cekdom){
                        let addingthis = this.stringToDom(`<div class="border p-2 fw-bolder my-2 font10 d-flex justify-content-between" draggable="true" data-urutanbentuksoal="${id}" style="cursor:move;user-select:none"><span>${id}</span><span>${e.target.value} soal</span></div>`)
                        wraper.appendChild(addingthis);
                        let ob = {
                            'bentuksoal':id,
                            'jumlah':e.target.value
                        }
                        ar.push(ob);
                        cekdom = wraper.querySelector(`[data-urutanbentuksoal="${id}"]`);
                    }else{
                        cekdom = wraper.querySelector(`[data-urutanbentuksoal="${id}"]`);
                        cekdom.innerHTML = `<span>${id}</span><span>${e.target.value} soal</span>`;
                        let cekAr = ar.findIndex(s=>s.bentuksoal == id);
                        let ob = {
                            'bentuksoal':id,
                            'jumlah':e.target.value
                        }
                        ar.splice(cekAr,1,ob);

                    }
                
                }
                
                this.pradesain['kerangka']=ar;
                
            }
        })
    }
    registrasiTemplate(){
        let btn = document.getElementById('btncreatetemplate');
        btn.onclick = ()=>{
            this.pradesain = Object.assign({},this.pradesain,this.updatepradesain(),{namakurikulum:this.banksoal.shortKurikulum,mapeltema:this.return_mapelTema(),jenjang:this.banksoal.jenjang});
            const {tabelnilai,petunjukumum,kerangka,kopsoal,identitassoal,judulnaskah,petunjuknilai,propertikd,penomoransoal}=this.pradesain;
            if( !kerangka ||  !propertikd) {
                alert('Pra desain belum lengkap. Silakan lengkapi!');
                return;
            }
            
            let html = "";
            
            if(kopsoal) html+=this.kopNaskah(judulnaskah);
            if(identitassoal) {
                let mapel =this.pradesain.tekskodemapel;
                if(this.pradesain.mapel.indexOf('Tema ')>-1 && this.pradesain.mapel.indexOf('TEMA ')>-1){
                    mapel = this.pradesain.mapel;
                    mapel+=`<br>`;
                    mapel+=this.pradesain.mapelTema.join(', ');
                }
                
                let elemendurasi = document.getElementById('durasi');
                let teksend = new Intl.DateTimeFormat('id-ID', {
                                hour: "numeric",
                                minute: "numeric",
                                timeZoneName: "short",
                            }).format(new Date(this.pradesain.end_waktu));
                let teks_start = new Intl.DateTimeFormat('id-ID', {
                                    hour: "numeric",
                                    minute: "numeric",
                                    // timeZoneName: "short",
                                }).format(new Date(this.pradesain.start_waktu));
                let durasi = `${teks_start}-${teksend} (${elemendurasi.value} Menit)`;
                let dataidentitas={
                    'mapelidentitas':mapel,
                    'namakurikulum':this.banksoal.longKurikulum,
                    'kelas':this.pradesain.kelas,
                    'titimangsa':new Intl.DateTimeFormat('id-ID', {
                                dateStyle: 'full',
                            }).format(new Date(this.pradesain.start_waktu)),
                    'durasi':durasi
                };

                html+=viewSoal.viewIdentitas(dataidentitas)
            };
            if(tabelnilai) html+= viewSoal.tabelNilai();
            
            let tag = 1;
            
            if(petunjukumum) {
                html+=`<ol type="A" style="margin:0;" class="tnr" id="naskah_petunjukumum" class="tnr">`
                    html+=`<li value="${tag}" style="padding-left:0.7em;text-transform:uppercase;font-weight:bold">PETUNJUK UMUM`
                        html+=viewSoal.petunjukUmum(kerangka)
                    html+=`</li>`
                html+=`</ol>`
                tag++; 
            };
            
            if(petunjuknilai){
                let datasebaran = {
                    kelompokBentuksoal:kerangka.map(n=> n.bentuksoal),
                    propertiKurikulum:propertikd,
                    kurikulumbanksoal:this.banksoal.shortKurikulum
                }
                html+=`<ol type="A" style="margin:0;" class="tnr" id="naskah_sebarankd" class="tnr">`
                    html+=`<li value="${tag}" style="padding-left:0.7em;font-weight:bold">PETUNJUK PENILAIAN`
                        html+=viewSoal.sebarankd(datasebaran)   
                    html+=`</li>`
                html+=`</ol>`
                
                tag++; 
            }
            
            if(kerangka.length>0){
                html+=`<ol type="A" style="margin:0;" class="tnr">`
                    html+=`<li value="${tag}" style="padding-left:0.7em;font-weight:bold">PETUNJUK KHUSUS</li>`;
                html+=`</ol>`;
                let dataisian = {
                    kerangka:kerangka,
                    penomoransoal:penomoransoal
                }
                html+=viewSoal.isiNaskahSoal(dataisian);
            }

            this.workplace.innerHTML = html;
            this.registerKlikIsiDesainNaskah()
        };
        this.registrasiTemplateDraft();
    }
    registrasiTemplateDraft(){
        let btn = document.getElementById('btndraft');
        if(btn){
            btn.onclick = ()=>{
                let datadraft = this.showDraft();
                this.pradesain = datadraft.pradesain;
                const {tabelnilai,petunjukumum,kerangka,kopsoal,identitassoal,judulnaskah,petunjuknilai,propertikd,penomoransoal}=this.pradesain;
                if( !kerangka ||  !propertikd) {
                    alert('Pra desain belum lengkap. Silakan lengkapi!');
                    return;
                }
                
                let html = "";
                
                if(kopsoal) html+=this.kopNaskah(judulnaskah);
                if(identitassoal) {
                    let mapel =this.pradesain.tekskodemapel;
                    if(this.pradesain.mapel.indexOf('Tema ')>-1 && this.pradesain.mapel.indexOf('TEMA ')>-1){
                        mapel = this.pradesain.mapel;
                        mapel+=`<br>`;
                        mapel+=this.pradesain.mapelTema.join(', ');
                    }
                    
                    let elemendurasi = document.getElementById('durasi');
                    let teksend = new Intl.DateTimeFormat('id-ID', {
                                    hour: "numeric",
                                    minute: "numeric",
                                    timeZoneName: "short",
                                }).format(new Date(this.pradesain.end_waktu));
                    let teks_start = new Intl.DateTimeFormat('id-ID', {
                                        hour: "numeric",
                                        minute: "numeric",
                                        // timeZoneName: "short",
                                    }).format(new Date(this.pradesain.start_waktu));
                    let durasi = `${teks_start}-${teksend} (${elemendurasi.value} Menit)`;
                    let dataidentitas={
                        'mapelidentitas':mapel,
                        'namakurikulum':this.banksoal.longKurikulum,
                        'kelas':this.pradesain.kelas,
                        'titimangsa':new Intl.DateTimeFormat('id-ID', {
                                    dateStyle: 'full',
                                }).format(new Date(this.pradesain.start_waktu)),
                        'durasi':durasi
                    };
    
                    html+=viewSoal.viewIdentitas(dataidentitas)
                };
                if(tabelnilai) html+= viewSoal.tabelNilai();
                
                let tag = 1;
                
                if(petunjukumum) {
                    html+=`<ol type="A" style="margin:0;" class="tnr" id="naskah_petunjukumum" class="tnr">`
                        html+=`<li value="${tag}" style="padding-left:0.7em;text-transform:uppercase;font-weight:bold">PETUNJUK UMUM`
                            html+=viewSoal.petunjukUmum(kerangka)
                        html+=`</li>`
                    html+=`</ol>`
                    tag++; 
                };
                
                if(petunjuknilai){
                    let datasebaran = {
                        kelompokBentuksoal:kerangka.map(n=> n.bentuksoal),
                        propertiKurikulum:propertikd,
                        kurikulumbanksoal:this.banksoal.shortKurikulum
                    }
                    html+=`<ol type="A" style="margin:0;" class="tnr" id="naskah_sebarankd" class="tnr">`
                        html+=`<li value="${tag}" style="padding-left:0.7em;font-weight:bold">PETUNJUK PENILAIAN`
                            html+=viewSoal.sebarankd(datasebaran)   
                        html+=`</li>`
                    html+=`</ol>`
                    
                    tag++; 
                }
                
                if(kerangka.length>0){
                    html+=`<ol type="A" style="margin:0;" class="tnr">`
                        html+=`<li value="${tag}" style="padding-left:0.7em;font-weight:bold">PETUNJUK KHUSUS</li>`;
                    html+=`</ol>`;
                    let dataisian = {
                        kerangka:datadraft.html,
                        penomoransoal:penomoransoal
                    }
                    html+=viewSoal.viewIsiNaskahSoalDraft(dataisian);
                }
    
                this.workplace.innerHTML = html;
                this.registerKlikIsiDesainNaskah();
            };

        }
    }
    registerKlikIsiDesainNaskah(){
        
        const tabel = document.getElementById('tabelkontendesainnaskah_dariserver');
        tabel.onclick = (e)=>{
            let dataklik = TableProperties.propertiesByClick(e.target);
            let bentuksoalBySel = dataklik.cells.getAttribute('data-bentuksoal');
            
            this.Modal.settingHeder('Data Soal '+bentuksoalBySel);
            this.Modal.showBodyHtml(viewDesainNaskah.modalSoal(this.pradesain,bentuksoalBySel));
            this.Modal.showHideFooter(false);
            
            if (document.querySelectorAll('input[name="selectedPropertiKD"]')[0]) document.querySelectorAll('input[name="selectedPropertiKD"]')[0].checked = true;
            if (document.querySelectorAll('input[name="selectedPropertiKDbaru"]')[0]) document.querySelectorAll('input[name="selectedPropertiKDbaru"]')[0].checked = true;
            
            this.configSoalbaru(bentuksoalBySel,dataklik.cells);
            this.configSoalEdit(dataklik,bentuksoalBySel);
            this.configSoalReplace(dataklik.cells);
            if(bentuksoalBySel){
                this.Modal.show();
            }
            
        }
    }
    configSoalEdit(dataklik,bentuksoal){
        
        let dataeditor = {
            bentuksoal:bentuksoal,
            editor:'formulir',
            idguru:this.banksoal.user.idUser,
            jenjang:this.banksoal.jenjang,
            //tergantunt radio;
            kd:this.Modal.body.querySelector('input[name="selectedPropertiKDbaru"]:checked').value,
            kodemapel:this.pradesain.mapel,
            tekskodemapel:this.pradesain.tekskodemapel,
            //selesai tergantung
            mode:'modal',
            namakurikulum:this.banksoal.shortKurikulum,
            oleh:this.banksoal.user.namaUser,
            ormkurikulum:this.banksoal.ormKurikulum.data,
            domTarget:dataklik.cells,
            Modal:this.Modal
        };
        let areaedit = new FormulirBankSoal(dataeditor, this.banksoal.banksoalservice);
        areaedit.div = document.getElementById('editsoaleditorwraper');
        areaedit.imageLoading = this.banksoal.user.barloading;
        areaedit.createFormEdit();
        areaedit.addRespons(this.respontekseditorModal);
        areaedit.init()

    }
    configSoalReplace(sel){
        const  eventReplaceSoal = new EventReplaceSoal(
                                        sel,
                                        this.banksoal,
                                        this.pradesain,
                                        this.Modal,
                                        this.eventKlikReplacingItemSoal
                                    );
        eventReplaceSoal.init();
        
        
    }
    eventKlikReplacingItemSoal(data){
        
        let propsNaskah = new PropertiNaskahSoal(data.banksoalservice.banksoalservice.data.banksoal);
        // let propsNaskah = new PropertiNaskahSoal(this.banksoal.banksoalservice.data.banksoal);
        let propKisikisi = propsNaskah.desainFromPraDesain(data.pradesain,data.banksoalservice.user).datakisikisi();
        let kisikisi = propKisikisi.generate;
        
        kisikisi.forEach(n=>{
            let key = n.kodemapel;
            let mapel_kd = key;
            let mapingKd =[];
                if(n.kurikulum == 'kurmer'){
                    mapingKd  = n.data.map(n=>Object.assign({},{kd:n.objekproperti.idbaris,soal:n.arraysoal}));
                    
                }else{
                    mapingKd  = n.data.map(n=>Object.assign({},{kd:n.objekproperti.kd3,soal:n.arraysoal}));
                } 
                mapingKd.forEach(k=>{
                    let soal = k.soal;
                    let maping_jenistagihan = soal.map(j=>j.bentuksoal);
                    let addkd = k.kd;
                    maping_jenistagihan.forEach(l=>{
                        let mapell_kd_2 = mapel_kd+'_'+addkd+'_'+l;
                        let arraynosoal = soal.filter(s=>s.bentuksoal == l).map(soals=>parseInt(soals.nobybentuk)).sort();
                        
                        document.querySelector(`[data-koleksisoal="${mapell_kd_2}"]`).innerHTML = arraynosoal.join(',')
                        

                    })
                })
        });
        

    }
    configSoalbaru(bentuksoal,domTarget){
        if(['Pilihan Ganda','Isian','Essay'].includes(bentuksoal)){
            let dataeditor = {
                bentuksoal:bentuksoal,
                editor:'editor',
                idguru:this.banksoal.user.idUser,
                jenjang:this.banksoal.jenjang,
                //tergantunt radio;
                kd:this.Modal.body.querySelector('input[name="selectedPropertiKDbaru"]:checked').value,
                kodemapel:this.pradesain.mapel,
                tekskodemapel:this.pradesain.tekskodemapel,
                //selesai tergantung
                mode:'modal',
                namakurikulum:this.banksoal.shortKurikulum,
                oleh:this.banksoal.user.namaUser,
                ormkurikulum:this.banksoal.ormKurikulum.data,
                domTarget:domTarget,
                Modal:this.Modal,
                pradesainawal:this.pradesain
            };
            
            let diinitin = this.banksoal.createTextEditorModal(dataeditor).addService(this.banksoal.banksoalservice).addRespons(this.respontekseditor);
            diinitin.init();
            
        };

    }
    respontekseditor(test){
        
        let teksInptu = document.getElementById('sorotUpdate_tampilansoal');
        
        teksInptu.innerHTML = previewSoalWithProperty(test);
        let simpan = document.getElementById('simpanItemSoal');
        
        simpan.onclick = async()=>{
            let bol = true ;
            if(test.bentuksoal === 'Pilihan Ganda'){
                let cek = Object.keys(test).filter(k=>['indikatorsoal','pertanyaan','opsiA','opsiB','opsiC','materi','levelkognitif','ruanglingkup','kuncijawaban','penskoran'].includes(k))
                if(cek.length !==10){
                    bol = false;
                }
            }else{
                let cek = Object.keys(test).filter(k=>['indikatorsoal','pertanyaan','materi','levelkognitif','ruanglingkup','penskoran'].includes(k))
                if(cek.length !==6){
                    bol = false;
                }
                
            }
            if(!bol) {
                alert('Ada yang belum dipilih');
                return;
            }

            this.praDesain.Modal.hide();
            await this.service.simpanItemSoal(test);
            let data = this.service.data.banksoal;
            
            let last = data.length;
            let itemsoal = data[last-1];
            
            let domTarget = this.praDesain.domTarget;
            let nosoal=domTarget.getAttribute('data-nosoal')
            let datareplace = {
                setilustrasi:true,
                tampilanpg:'vertical',
                nosoal:domTarget.getAttribute('data-nosoal')
            }
            domTarget.innerHTML = replaceSoalToSel(itemsoal,datareplace);
            domTarget.setAttribute('data-simpanannaskahguru',itemsoal.idbaris);
            domTarget.setAttribute('data-ilustrasi',true);
    
            if(itemsoal.bentuksoalspesifik == 'Pilihan Ganda'){
                domTarget.setAttribute('class','calcnosoal');
            }else if(itemsoal.bentuksoalspesifik == 'Isian'){
                domTarget.setAttribute('class','soalessay');
                domTarget.setAttribute('id','essay'+nosoal);
            }else if(itemsoal.bentuksoalspesifik == 'Essay'){
                domTarget.setAttribute('class','soalessay');
                domTarget.setAttribute('id','essay'+nosoal);
            }else if(itemsoal.bentuksoalspesifik == 'Menjodohkan'){
                domTarget.setAttribute('data-banyakjodoh',itemsoal.jumlahsoalmenjodohkan);

            }

            
        }
    }
    respontekseditorModal(test){

        let teksInptu = document.getElementById('previewdata');
        let preview = document.getElementById('previewsoaledit');
        
        teksInptu.innerHTML = propertiItemSoal(test);
        preview.innerHTML = previewBentukSoal(test,false);
        let simpan = document.getElementById('terapkan_replaceedit');
        let inputan = document.querySelectorAll('[data-keyformulir]');
            inputan.forEach(n=>{
                let key = n.getAttribute('data-keyformulir');
                if(n.nodeName == 'TD'){
                    this.request = Object.assign(this.request,{[key]:n.innerHTML})
                }else{
                    this.request = Object.assign(this.request,{[key]:n.value})

                } 
                
            });
        simpan.onclick = async()=>{
            let bol = true ;
            
            if(test.bentuksoal === 'Pilihan Ganda'){
                let cek = Object.keys(test).filter(k=>['indikatorsoal','pertanyaan','opsiA','opsiB','opsiC','materi','levelkognitif','ruanglingkup','kuncijawaban','penskoran'].includes(k))
                
                if(cek.length !==10){
                    bol = false;
                }
            }else{
                let cek = Object.keys(test).filter(k=>['indikatorsoal','pertanyaan','materi','levelkognitif','ruanglingkup','penskoran'].includes(k))
                
                if(cek.length !==6){
                    bol = false;
                }
                
            }

            if(!bol) {
                alert('Ada yang belum dipilih');
                return;
            }

            this.datadesain.Modal.hide();
            await this.service.simpanItemSoalEdit(test);
            let data = this.service.data.banksoal;
            
            let last = parseInt(test.idbaris);
            let itemsoal = data[last-2];

            let domTarget = this.datadesain.domTarget;
            let nosoal=domTarget.getAttribute('data-nosoal')
            let datareplace = {
                setilustrasi:true,
                tampilanpg:'vertical',
                nosoal:domTarget.getAttribute('data-nosoal')
            }
            domTarget.innerHTML = replaceSoalToSel(itemsoal,datareplace);
            domTarget.setAttribute('data-simpanannaskahguru',itemsoal.idbaris);
            domTarget.setAttribute('data-ilustrasi',true);
    
            if(itemsoal.bentuksoalspesifik == 'Pilihan Ganda'){
                domTarget.setAttribute('class','calcnosoal');
            }else if(itemsoal.bentuksoalspesifik == 'Isian'){
                domTarget.setAttribute('class','soalessay');
                domTarget.setAttribute('id','essay'+nosoal);
            }else if(itemsoal.bentuksoalspesifik == 'Essay'){
                domTarget.setAttribute('class','soalessay');
                domTarget.setAttribute('id','essay'+nosoal);
            }else if(itemsoal.bentuksoalspesifik == 'Menjodohkan'){
                domTarget.setAttribute('data-banyakjodoh',itemsoal.jumlahsoalmenjodohkan);

            }

            
        }
    }
    registrasiBtnFinal(){
        const btnKisiKisi = document.getElementById("btnLihatKisikisiDesain");
        const btnKisiKisiView = document.getElementById("btnLihatKisikisiDesainView");
        const kuncijawaban = document.getElementById("btnLihatKunciJawaban");
        const simpanserverDesain = document.getElementById("btnSimpanServerDesain");
        const btnSimpanDraft = document.getElementById("btnSimpanDraft");
        
        let propsNaskah = new PropertiNaskahSoal(this.banksoal.banksoalservice.data.banksoal);
        btnKisiKisi.onclick = ()=>{
            if(Object.keys(this.pradesain).length==0){
                alert('Belum Siap, silakan desain naskah Anda.');
                return;
            }
            let data = propsNaskah.desainFromPraDesain(this.pradesain,this.banksoal.user).datakisikisi();
            
            this.Modal1.widthOrientation(true);
            this.Modal1.settingHeder('KISI-KISI ' + this.pradesain.judulnaskah.toUpperCase());
            this.Modal1.showBodyHtml(viewSoal.htmlkisikisi(data.identitas,data.generate));
            this.Modal1.show();
            this.printableModal(this.pradesain.judulnaskah);
        };
        
        btnKisiKisiView.onclick = ()=>{
            if(Object.keys(this.pradesain).length==0){
                alert('Belum Siap, silakan desain naskah Anda.');
                return;
            }
            this.Modal1.widthOrientation(true);
            let data = propsNaskah.desainFromPraDesain(this.pradesain,this.banksoal.user).datakisikisi();
            
            
            this.Modal1.settingHeder('KISI-KISI DAN SOAL ' + this.pradesain.judulnaskah.toUpperCase())
            this.Modal1.showBodyHtml(viewSoal.htmlkisikisi(data.identitas,data.datadom.datasoal,true));
            this.Modal1.show();
            this.printableModal(this.pradesain.judulnaskah);
        }
        
        kuncijawaban.onclick = ()=>{
            if(Object.keys(this.pradesain).length==0){
                alert('Belum Siap, silakan desain naskah Anda.');
                return;
            }
            
            this.Modal1.widthOrientation(false);
            let data = propsNaskah.desainFromPraDesain(this.pradesain,this.banksoal.user).datakisikisi();
            
            
            this.Modal1.settingHeder('KUNCI JAWABAN NASKAH ' + this.pradesain.judulnaskah.toUpperCase())
            this.Modal1.showBodyHtml(viewSoal.htmlkuncijawaban(data.identitas,data.datadom.datasoal));
            this.Modal1.show();
            this.printableModal(this.pradesain.judulnaskah);
        }
        
        simpanserverDesain.onclick = async()=>{
            if(Object.keys(this.pradesain).length==0){
                alert('Belum Siap, silakan desain naskah Anda.');
                return;
            }
            
            let datanaskah = propsNaskah.desainFromPraDesain(this.pradesain,this.banksoal.user).datakisikisi();
            let soal = datanaskah.datadom.datasoal;
            let hasFalse = soal .filter(s=>!s.hassoal);
            let soalSortir = soal.sort((a,b)=> parseInt(a.nosoal)-parseInt(b.nosoal));
            
            if(hasFalse.length>0){
                alert('Ada soal yang belum selesai, sebaiknya Anda simpan draft.');
                return;
            }
            let data = new NaskahSoal({});
            let konten= document.querySelector('#printarea');
            let cloneContent = konten.cloneNode(true);
            let idmateri = cloneContent.innerHTML;
            

            data.addItem('idguru',this.banksoal.user.idUser);
            data.addItem('namaguru',this.banksoal.user.namaUser);
            data.addItem('juduldesain',this.pradesain.judulnaskah+' '+this.pradesain.mapel + ' ' + new FormatTanggal(this.pradesain.start_waktu).formatFull());
            data.addItem('mapel',this.pradesain.mapel);
            data.addItem('jenjang',this.pradesain.jenjang);
            data.addItem('kop',this.pradesain.judulnaskah);
            data.addItem('waktu2',this.pradesain.start_waktu)
            data.addItem('waktu2_end',this.pradesain.end_waktu);
            data.addItem('versiedurasa',true);
            data.addItem('kurikulum',this.pradesain.namakurikulum);
            soalSortir.forEach(n=>{
                let idsoal = n.itemsoal.idbaris;
                let key = 'no_'+n.nosoal;
                data.addItem(key,idsoal);
            })
            data.sanitize();

            let par = data.data;
            let media = {
                html:idmateri,
                jenjang:this.banksoal.jenjang
            }
            await this.banksoal.banksoalservice.simpanDesanNaskah(par,media);
            document.querySelector('#printarea').innerHTML = 'Berhasil';
            document.querySelector('.elementdraft').innerHTML = 'Tidak ada Draft Naskah yang Anda disimpan di Perangkat ini.';

            this.removeDraft();
        }
        btnSimpanDraft.onclick = ()=>{
            if(Object.keys(this.pradesain).length==0){
                alert('Belum Siap, silakan desain naskah Anda.');
                return;
            }
            
            let data = propsNaskah.desainFromPraDesain(this.pradesain,this.banksoal.user).datakisikisi();
            this.createDraftNaskah(data.datadom.datanaskah);

        }

    }
    removeDraft(){
        window.localStorage.removeItem('draftnaskah_'+this.banksoal.jenjang);
    }
    printableModal(title){
        const print = this.Modal1.body.querySelector("#btncetaknaskah");
        const word  = this.Modal1.body.querySelector("#btncetakword");
        const pdf   = this.Modal1.body.querySelector("#btncetakpdf");
        
        print.onclick = ()=>{
            let dom = document.getElementById('print-area-modal');
            if(this.Modal1.orientation=='portrait'){
                this.Modal1.control.printPortraitDom(dom);
            }else{
                this.Modal1.control.printLandscapeDom(dom);
            }
        }
        
        word.onclick = ()=>{
            let dom = document.getElementById('print-area-modal');
            if(this.Modal1.orientation=='portrait'){
                this.Modal1.control.wordPortraitDom(title,dom);
            }else{
                this.Modal1.control.wordLandscapeDom(title,dom);
            }
        }



        pdf.onclick = ()=>{
            let dom = document.getElementById('print-area-modal');
            if(this.Modal1.orientation=='portrait'){
                this.Modal1.control.pdfPortraitDom(dom,title);
            }else{
                this.Modal1.control.pdfLandscapeDom(dom,title);
            }
        }

    }
}