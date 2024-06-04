import UrlImg from "../../controllers/UrlImg";
import MateriKbm from "../../domains/MateriKbm";
import { FormatTanggal } from "../../utilities/FormatTanggal";
import viewArsipNaskah from "../arsipnaskah/viewArsipNaskah";
import { replaceSoalToSel } from "../banksoal/viewBankSoal";
import PropertiNaskahSoal from "../naskahsoal/PropertiNaskahSoal";
import viewSoal from "../naskahsoal/viewSoal";


export default class InfoKbmModal{
    constructor(kbmFitur,data,modal, modal1,viewOlahNilaiKBM,user,parent=null){
        this.kbmFitur = kbmFitur;
        this.service = kbmFitur.service;
        this.data = data;
        this.Modal = modal;
        this.Modal1 = modal1;
        this.viewOlahNilaiKBM = viewOlahNilaiKBM;
        this.user = user;
        this.parent = parent;
    }
    show(){
        this.awal(this.data);
        this.registerButton(this.data);
        
    }
    awal(data){
        const viewOlahNilaiKBM = this.viewOlahNilaiKBM;
        this.Modal.settingHeder('INFO KBM')
        this.Modal.widthOrientation(false);
        this.Modal.showBodyHtml(viewOlahNilaiKBM.infoKBM(data));
        this.Modal.showFooter(viewOlahNilaiKBM.buttonInfoKBM(data));
        this.Modal.footerModal.classList.remove('flex-column');
        this.Modal.show();
    }
    registerButton(data){
        const btns = this.Modal.footerModal.querySelectorAll('[data-nextaction]');
        const propertiNaskah = new PropertiNaskahSoal(this.service.data.banksoal);
        
        propertiNaskah.desain.namakurikulum = this.kbmFitur.shortKurikulum;
        propertiNaskah.desain.propertikd = this.kbmFitur.ormKurikulum.data;
        
        btns.forEach(btn=>{
            btn.onclick = async (e)=>{
                let fn = btn.getAttribute('data-nextaction');
                if(this[fn]){
                    this.Modal.hide();
                    await this[fn](data,propertiNaskah);
                }else{
                    alert(fn,'belum siap');
                }
            }
        })
    }
    async previewnaskah(data,propertinaskah){
        let api = await this.service.showTextHTML(data.idmateri);
        let html = UrlImg.replacingImg(api);

        this.Modal1.widthOrientation(false);
        this.Modal1.settingHeder('PRATINJAU NASKAH ONLINE <br>' + data.idmapel.toUpperCase())
        this.Modal1.showBodyHtml(viewArsipNaskah.viewModal(html,true));
        this.Modal1.showHideFooter(true);
        this.Modal1.show();
        this.printableModal(data.idmapel);
    }
    async previewnaskahCetak(data,propertiNaskah){
        let api = await this.service.showTextHTML(data.obj_desainnaskah[0].html_soal);
        let html = UrlImg.replacingImg(api);
        let dom = this.stringToDom(html);

        propertiNaskah.domNaskah = dom;
        propertiNaskah.desainFromSpreadSheetKBM(data,this.user);
        
        let datakisikisi = propertiNaskah.datakisikisi();
        
        
        this.templateNaskahOffline(dom,data,datakisikisi.datadom.datanaskah);
        this.Modal1.showHideFooter(false);
    }
    templateNaskahOffline(dom,datadesain, datahtml){
        let tbody = dom.querySelector('#tabelkontendesainnaskah_dariserver > tbody');
        let tr = tbody.querySelectorAll('tr');
        
        for(let i = 0 ; i < tr.length ; i++){
            let sel = tr[i].cells;
            let ref = datahtml[i];
            if(sel.length>1){
                let datareplace = {};

                datareplace.setilustrasi = ref.ilustrasi;
                
                if(ref.hasOwnProperty('tampilanpg')){
                    datareplace.tampilanpg   = ref.tampilanpg
                }else{
                    datareplace.tampilanpg   = 'vertical';
                }

                datareplace.nosoal = ref.nosoal;
                sel[1].innerHTML = replaceSoalToSel(ref.itemsoal,datareplace,false);
            }
        }
        
        let html = document.createElement('div');
        html.appendChild(dom);
        this.Modal1.widthOrientation(false);
        this.Modal1.settingHeder('NASKAH OFFLINE '+datadesain.idmapel.toUpperCase());
        this.Modal1.showBodyHtml(viewArsipNaskah.viewModal(html.innerHTML,true));
        this.Modal1.show();
        this.printableModal(datadesain.idmapel);
    }
    stringToDom(string){
        const template= document.createElement('template');
        template.innerHTML = string;
        return template.content;
    }
    
    async kuncijawaban(data,propertiNaskah){
        
        let api = await this.service.showTextHTML(data.idmateri);
        
        let dom = this.stringToDom(api);
        
        propertiNaskah.domNaskah = dom;
        propertiNaskah.desainFromSpreadSheetKBM(data,this.user);
        
        let datakisikisi = propertiNaskah.datakisikisi();
        
        this.Modal1.widthOrientation(false);
        this.Modal1.settingHeder('KUNCI JAWABAN<br> ' + data.idmapel.toUpperCase())
        this.Modal1.showBodyHtml(viewSoal.htmlkuncijawabanModal1(datakisikisi.identitas,datakisikisi.datadom.datasoal));
        this.Modal1.showHideFooter(false);
        this.Modal1.show();
        this.printableModal(data.idmapel);
    }
    async kisikisi(data,propertiNaskah){
        // let api = await this.service.showTextHTML(data.obj_desainnaskah[0].html_soal);
        let api = await this.service.showTextHTML(data.obj_desainnaskah[0].html_soal);
        let dom = this.stringToDom(api);
        
        propertiNaskah.domNaskah = dom;
        propertiNaskah.desainFromSpreadSheetKBM(data,this.user);
        
        let datakisikisi = propertiNaskah.datakisikisi();
        this.Modal1.widthOrientation(true);
        this.Modal1.settingHeder('PRATINJAU KISI-KISI<br> ' + data.idmapel.toUpperCase())
        this.Modal1.showBodyHtml(viewSoal.htmlkisikisiModal1(datakisikisi.identitas,datakisikisi.datadom.datasoal,true));
        this.Modal1.showHideFooter(false);
        this.Modal1.show();
        this.printableModal(data.idmapel);
    }
    printableModal(title){
        const print = this.Modal1.body.querySelector("#btncetaknaskah");
        const word  = this.Modal1.body.querySelector("#btncetakword");
        const pdf   = this.Modal1.body.querySelector("#btncetakpdf");
        const back = this.Modal1.body.querySelector('#btnback');
        
        back.onclick = ()=>{
            this.Modal1.hide();
            this.Modal.show();
        }
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
    showSettingPublikasi(){
        
        const datamateri= this.data;
        let pelaksanaan = this.checkBoxRadioPelaksanaanKBM(datamateri);
        let arrayRombel = this.kbmFitur.user.koleksiRombel[this.kbmFitur.jenjang];
        let view = Object.assign({},datamateri,{semester:this.kbmFitur.user.semester},{idkurikulum:this.kbmFitur.shortKurikulum},{pelaksanaan:pelaksanaan},{arrayRombel:arrayRombel});
        
        this.Modal1.showHideFooter(false);
        this.Modal1.widthOrientation(false);
        this.Modal1.body.classList.add('p-0');
        this.Modal1.settingHeder('EDIT PUBLIKASI KBM<br/>'+datamateri.idmapel);
        this.Modal1.showBodyHtml(viewArsipNaskah.viewEditPublikasiKbm(view));
        //config event;
        this.firstEventEditPublikasi(view);
        this.listener_editpublikasi(view);
        this.Modal1.show();
    }
    firstEventEditPublikasi(view){
        //idtgl;
        if(new Date(view.idtgl).getTime()<new Date().getTime()){
            this.Modal1.body.querySelector('#idtgl').setAttribute('disabled',true);
        }
        //arrayrombel;
        let realRombel = view.arrayRombel;
        let kbmRombel = view.arraykelas.split(',');
        let compare = realRombel.length  === kbmRombel.length;
        
        if(!compare){
            this.Modal1.body.querySelector('#arraykelasNull').checked = true;
            let kelastertentu = this.Modal1.body.querySelectorAll('[name="rombeltertentu"]');
            kelastertentu.forEach(n=>{
                n.removeAttribute('disabled');
                if(kbmRombel.includes(n.value)) n.checked = true;
            })
        }
        
        this.Modal1.body.querySelector(`input[name=jenistagihan][value=${view.jenistagihan}]`).checked = true;
    }
    listener_editpublikasi(view){
        let timer = document.querySelectorAll('input[type="datetime-local"]');
        let tabmateri = new MateriKbm(view);
        let pilihkelas = this.Modal1.body.querySelectorAll('input[name="koleksiarraykelas"]');
        let pilihkelastertentu = this.Modal1.body.querySelectorAll('input[name="rombeltertentu"]');
        let btnSave = this.Modal1.body.querySelector('#btnServerEditPublikasi');
        let btnHapus = this.Modal1.body.querySelector('#btnServerHapustPublikasi');
        
        let timer_awal = document.getElementById('idtgl');
        let timer_akhir = document.getElementById('idtglend');
        let target_timer = document.getElementById('iddurasi');
        
        tabmateri.addItem('idtgl',timer_awal.value);
        tabmateri.addItem('idtglend',timer_akhir.value);
        tabmateri.addItem('iddurasi',target_timer.value);

        timer.forEach(n=>{
            n.oninput=(e)=>{
                let id = n.getAttribute('id');
                let timer_awal = document.getElementById('idtgl');
                let timer_akhir = document.getElementById('idtglend');
                let target_timer = document.getElementById('iddurasi');
                let target_crtToken = document.getElementById('crtToken');

                target_timer.value  = FormatTanggal.durasiMenit(timer_awal.value,timer_akhir.value);
                target_crtToken.value = new FormatTanggal(timer_awal.value).idStringAbsen();
                tabmateri.addItem('idtgl',timer_awal.value);
                tabmateri.addItem('idtglend',timer_akhir.value);
                tabmateri.addItem('iddurasi',target_timer.value);
            }
        });

        pilihkelas.forEach(n=>{
            n.onchange = (e)=>{
                let atr = n.getAttribute('id');
                if(n.checked && atr == 'arraykelas'){
                    pilihkelastertentu.forEach(t=>{
                        t.checked = false;
                        t.setAttribute('disabled',true)
                    });
                    tabmateri.addItem('arraykelas',view.arrayRombel.join(','));
                }else{
                    pilihkelastertentu.forEach(t=>{
                        t.checked = true;
                        t.removeAttribute('disabled');
                    });
                    tabmateri.addItem('arraykelas',view.arrayRombel.join(','));
                    pilihkelastertentu.forEach(n=>{
                        n.onchange = (e)=>{
                            let doms = document.querySelectorAll('input[name="rombeltertentu"]:checked');
                            let ar = Array.from(doms).map(n=>n.value);
                            if(ar.length==0){
                                tabmateri.addItem('arraykelas',view.arrayRombel.join(','));
                            }else{
                                tabmateri.addItem('arraykelas',ar.join(','));
                            }
                        }
                    })

                }
            }
        });

        btnSave.onclick = async()=>{
            let inputIdMapel = this.Modal1.body.querySelector('#idmapel');
            let radioTagihan = this.Modal1.body.querySelectorAll('input[name="jenistagihan"]:checked');

            tabmateri.addItem('idmapel',inputIdMapel.value);
            tabmateri.addItem('jenistagihan',radioTagihan[0].value);
            tabmateri.sanitize();

            this.Modal1.hide();
            
            await this.kbmFitur.service.simpanEditMateriKbm(tabmateri.data);
            this.kbmFitur.init_kbmonline();
            this.parent();
            
            // this.createOrmKoreksi();
            // this.dataAwal();
        };
        btnHapus.onclick = async()=>{
            let inputIdMapel = this.Modal1.body.querySelector('#idmapel');
            let radioTagihan = this.Modal1.body.querySelectorAll('input[name="jenistagihan"]:checked');
            
            tabmateri.addItem('hapus','hapus');
            tabmateri.addItem('idtoken',0);
            tabmateri.addItem('idmapel',inputIdMapel.value);
            tabmateri.addItem('jenistagihan',radioTagihan[0].value);
            tabmateri.sanitize();
            
            this.Modal1.hide();
            
            await this.kbmFitur.service.simpanEditMateriKbm(tabmateri.data);
            this.parent();
        };
    }

    checkBoxRadioPelaksanaanKBM(desain){
        let pelaksanaan = {
            'start_waktu':new FormatTanggal(desain.idtgl).stringForDateTimeLocal(),
            'end_waktu':new FormatTanggal(desain.idtglend).stringForDateTimeLocal(),
            'durasi':FormatTanggal.durasiMenit(desain.idtgl,desain.idtglend),
            'crtToken':new FormatTanggal(desain.idtgl).idStringAbsen()
        }
        return pelaksanaan;
    }

}