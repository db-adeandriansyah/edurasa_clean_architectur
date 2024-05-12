import { FormatTanggal } from "../../utilities/FormatTanggal";
import { TableProperties } from "../../utilities/tableProperties";
import kopsuratEdurasa from "../../views/surat/kopsurat";
import { previewSoalWithProperty } from "../banksoal/viewBankSoal";
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
            'kurikulum':this.banksoal.ormKurikulum
        }
        this.toolarea.innerHTML = viewDesainNaskah.toolbar(datamenu);
        this.printarea.innerHTML = 'Silakan atur desain naskah template dulu, kemudian klik tombol "Buat Template Naskah" pada tab menu Finishing.'
    }
    init(){
        // this.registerListenerDurasi();
        // this.registerListnerPropertiKurikulum();
        this.Modal.widthOrientation(true);
        this.Modal.body.classList.add('p-0');
        /**
         * this.Modal.settingHeder('Absensi '+siswa.pd_nama +' ('+ string_tgl+')');
                this.Modal.showBodyHtml(viewFormulir(dataformulir));
                this.Modal.showHideFooter(false);
                this.listenerFormulirAbsen(dataAbsenForFormulir,siswa,tgl,idhari,metod,'Modal');
                this.Modal.show();
         */
        this.registerListenerElemenPraDesain();
        this.registrasiListenerKerangka();
        this.registrasiTemplate();
        console.log(this.banksoal.user);
    }
    registerListenerElemenPraDesain(){
        let elemen_pradesain = document.querySelectorAll('[data-pradesain]');
        let targetInput = document.querySelector('#durasi');
        let data = {};
        elemen_pradesain.forEach(n=>{
            console.log(n);
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
        document.querySelector('#selectmapel').click();//dispatchEvent(new Event('change'));
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
                console.log(this.pradesain);
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
    registerListnerPropertiKurikulum(){
        let controlMapel = document.querySelector('#selectmapel');
        let targetView = document.querySelector('#tableKDTemplateDesain');
        let orm = this.banksoal.ormKurikulum.data;
        let tipekurikulum = this.banksoal.shortKurikulum;
        let mapelTema = [];
        if(this.banksoal.jenjang>3){
            mapelTema = ['PKN','BINDO','MTK','SBDP','PJOK'];
        }else{
            mapelTema = ['PKN','BINDO','IPA','IPS','SBDP'];

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
            
            targetView.innerHTML = viewDesainNaskah.tabelPropertiKurikulum(tipekurikulum,filterOrm);
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
                    }
                
                }
                
                this.pradesain['kerangka']=ar;
                console.log(this.pradesain);
            }
        })
    }
    registrasiTemplate(){
        let btn = document.getElementById('btncreatetemplate');
        btn.onclick = ()=>{
            this.pradesain = Object.assign({},this.pradesain,this.updatepradesain(),{namakurikulum:this.banksoal.shortKurikulum});
            const {tabelnilai,petunjukumum,kerangka,kopsoal,judulnaskah,petunjuknilai,propertikd,penomoransoal}=this.pradesain;
            if( !kerangka ||  !propertikd) {
                alert('Pra desain belum lengkap. Silakan lengkapi!');
                return;
            }
            console.log(this.pradesain);
            let html = "";
            
            if(kopsoal) html+=this.kopNaskah(judulnaskah);
            
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
    }
    registerKlikIsiDesainNaskah(){
        const tabel = document.getElementById('tabelkontendesainnaskah_dariserver');
        tabel.onclick = (e)=>{
            let dataklik = TableProperties.propertiesByClick(e.target);
            let bentuksoalBySel = dataklik.cells.getAttribute('data-bentuksoal');
            console.log(this.banksoal.ormKurikulum.data);
            console.log('this.pradesain',this.pradesain);
            console.log('datakilik',dataklik)
            this.Modal.settingHeder('Data Soal '+bentuksoalBySel);
            this.Modal.showBodyHtml(viewDesainNaskah.modalSoal(this.pradesain));
            this.Modal.showHideFooter(false);
            if (document.querySelectorAll('input[name="selectedPropertiKDbaru"]')[0]) document.querySelectorAll('input[name="selectedPropertiKDbaru"]')[0].checked = true;
            this.configSoalbaru(bentuksoalBySel);
            this.Modal.show();
            console.log(dataklik);
            console.log(this.pradesain);
        }
    }
    configSoalbaru(bentuksoal){
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
                mode:'bycopast',
                namakurikulum:this.banksoal.shortKurikulum,
                oleh:this.banksoal.user.namaUser,
                ormkurikulum:this.banksoal.ormKurikulum.data,
            };
            console.log('dataeditor',dataeditor);
            this.banksoal.createTextEditorModal(dataeditor).addService(this.banksoal.banksoalservice).addRespons(this.respontekseditor).init();
            // console.log(texteditor);
        }
    }
    respontekseditor(test){
        console.log(test);
        let teksInptu = document.getElementById('sorotUpdate_tampilansoal');
        
        teksInptu.innerHTML = previewSoalWithProperty(test);
    }
}