import UrlImg from "../../controllers/UrlImg";
import MateriKbm from "../../domains/MateriKbm";
import NaskahSoal from "../../domains/NaskahSoal";
import { CollectionsEdu } from "../../models/CollectionsEdu";
import { FormatTanggal } from "../../utilities/FormatTanggal";
import { replaceSoalToSel } from "../banksoal/viewBankSoal";
import PropertiNaskahSoal from "../naskahsoal/PropertiNaskahSoal";
import viewSoal from "../naskahsoal/viewSoal";
import viewArsipNaskah from "./viewArsipNaskah";

export default class ArsipNaskah{
    #orm;
    constructor(banksoal,workplace,toolbar,modal, modal1){
        this.banksoal = banksoal;
        this.workplace = workplace;
        this.toolbar =  toolbar;
        this.Modal = modal;
        this.Modal1 = modal1;
        this.#orm=[];
    }
    get user (){
        return this.banksoal.user;
    }
    get jenjang(){
        return this.banksoal.jenjang;
    }
    get isAdmin(){
        return this.banksoal.user.typeUser == 'admin';
    }
    get isGuruMapel(){
        return this.banksoal.user.typeUser == 'Guru Mapel'
    }
    get mapelAjar(){
        return this.banksoal.user.tugasUser;
    }
    get ormArsipNaskah(){
        return this.#orm;
    }
    set ormArsipNaskah(x){
        this.#orm = x;
    }
    createOrm(){
        let datanaskah = this.banksoal.banksoalservice.data.simpandesainsoal;
        let datamateri = this.banksoal.banksoalservice.data.datamateri;
        let banksoal = this.banksoal.banksoalservice.data.banksoal;
        let kurikulum = this.banksoal.ormKurikulum.data;
        let isKurmer = (this.banksoal.shortKurikulum=='kurmer');
        let owner  = this.user.idUser;
        let isAdmin = this.isAdmin;
        
        let data =new CollectionsEdu(datanaskah)
            .simpleFilter({'jenjang':this.jenjang})
            .exceptFilter({'hapus':'hapus'})
            .addProperty('datamateri',(item)=>{
                return datamateri.filter(s=>s.id_desainnaskah == item.idbaris && s.idtoken == this.jenjang);
            })
            .addProperty('propertikurikulum',(item)=>{
                let ar = []
                for(let i = 0 ; i < 50; i++){
                    let key = 'no_'+(i+1);
                    let val = item[key];
                    if(val!==''){
                        let soal = banksoal.filter(s=>s.idbaris == val);
                        // ar.push({[key]:soal})
                        if(soal[0]){
                            if(isKurmer){
                                let kurikulumitemsoal = kurikulum.filter(s=> s.idbaris == soal[0].kd);

                                if(kurikulumitemsoal.length>0){
                                    ar.push(kurikulumitemsoal[0]);
                                }

                            }else{
                                let kurikulumitemsoal = kurikulum.filter(s=> s.kd3 == soal[0].kd && s.mapel == soal[0].kodemapel);
                                
                                if(kurikulumitemsoal.length>0){
                                    ar.push(kurikulumitemsoal[0]);
                                }

                            }
                        };
                    }
                }
                // return ar;
                let finalResult = [];
                if(isKurmer){
                    finalResult = new CollectionsEdu(ar).uniqueByProperty('idbaris').data;
                }else{
                    finalResult = new CollectionsEdu(ar).uniqueByProperty('baris').data;
                }
                return finalResult;
            })
            .addProperty('tanggalnaskah',(item)=>{
                return new FormatTanggal(item.waktu2).formatFull();
            })
            .addProperty('owner',(item)=>{
                return !isAdmin?item.idguru==owner:true;
            })
            .addProperty('banksoal',(item)=>{
                let ar = [];
                for(let i = 0 ; i < 50; i++){
                    let key = 'no_'+(i+1);
                    let val = item[key];
                    if(val!==''){
                        let obj = {};
                        let soal = banksoal.filter(s=>s.idbaris == val);
                        if(soal.length>0){
                            obj.datasoal=soal[0];
                            obj.bentuksoalspesifik = soal[0].bentuksoalspesifik;
                            ar.push(obj)
                        }
                    }
                }
                return ar
            })
            .addProperty('namakurikulum',(item)=>{
                return item.kurikulum
            })
            .addProperty('kerangka',(item)=>{
                let itembanksoal = item.banksoal;
                let uniq = new CollectionsEdu(itembanksoal).uniqueByProperty('bentuksoalspesifik').selectProperties(['bentuksoalspesifik']).data;
                let result = [];
                uniq.forEach(n=>{
                    let ob = {};
                    ob.bentuksoal = n.bentuksoalspesifik;
                    ob.jumlah = itembanksoal.filter(s=>s.bentuksoalspesifik == n.bentuksoalspesifik).length;
                    result.push(ob);
                })
                return result;
            })
            .sortByProperty('waktu2','desc');
            
        this.#orm = data.data;
    }
    createOrmUs(){
        let datanaskah = this.banksoal.banksoalservice.data.simpandesainsoal;
        let datamateri = this.banksoal.banksoalservice.data.datamateri;
        let banksoal = this.banksoal.banksoalservice.data.banksoal;
        let kurikulum = this.banksoal.ormKurikulum.data;
        let isKurmer = (this.banksoal.shortKurikulum=='kurmer');
        let owner  = this.user.idUser;
        let isAdmin = this.isAdmin;
        
        let data =new CollectionsEdu(datanaskah)
            .simpleFilter({'jenjang':this.jenjang,'ujiansekolah':true})
            
            .addProperty('datamateri',(item)=>{
                return datamateri.filter(s=>s.id_desainnaskah == item.idbaris);
            })
            .addProperty('propertikurikulum',(item)=>{
                let ar = []
                for(let i = 0 ; i < 50; i++){
                    let key = 'no_'+(i+1);
                    let val = item[key];
                    if(val!==''){
                        let soal = banksoal.filter(s=>s.idbaris == val);
                        // ar.push({[key]:soal})
                        if(soal[0]){
                            if(isKurmer){
                                let kurikulumitemsoal = kurikulum.filter(s=> s.idbaris == soal[0].kd);

                                if(kurikulumitemsoal.length>0){
                                    ar.push(kurikulumitemsoal[0]);
                                }

                            }else{
                                let kurikulumitemsoal = kurikulum.filter(s=> s.kd3 == soal[0].kd && s.mapel == soal[0].kodemapel);
                                
                                if(kurikulumitemsoal.length>0){
                                    ar.push(kurikulumitemsoal[0]);
                                }

                            }
                        };
                    }
                }
                // return ar;
                let finalResult = [];
                if(isKurmer){
                    finalResult = new CollectionsEdu(ar).uniqueByProperty('idbaris').data;
                }else{
                    finalResult = new CollectionsEdu(ar).uniqueByProperty('baris').data;
                }
                return finalResult;
            })
            .addProperty('tanggalnaskah',(item)=>{
                return new FormatTanggal(item.waktu2).formatFull();
            })
            .addProperty('owner',(item)=>{
                return !isAdmin?item.idguru==owner:true;
            })
            .addProperty('banksoal',(item)=>{
                let ar = [];
                for(let i = 0 ; i < 50; i++){
                    let key = 'no_'+(i+1);
                    let val = item[key];
                    if(val!==''){
                        let obj = {};
                        let soal = banksoal.filter(s=>s.idbaris == val);
                        if(soal.length>0){
                            obj.datasoal=soal[0];
                            obj.bentuksoalspesifik = soal[0].bentuksoalspesifik;
                            ar.push(obj)
                        }
                    }
                }
                return ar
            })
            .addProperty('namakurikulum',(item)=>{
                return item.kurikulum
            })
            .addProperty('kerangka',(item)=>{
                let itembanksoal = item.banksoal;
                let uniq = new CollectionsEdu(itembanksoal).uniqueByProperty('bentuksoalspesifik').selectProperties(['bentuksoalspesifik']).data;
                let result = [];
                uniq.forEach(n=>{
                    let ob = {};
                    ob.bentuksoal = n.bentuksoalspesifik;
                    ob.jumlah = itembanksoal.filter(s=>s.bentuksoalspesifik == n.bentuksoalspesifik).length;
                    result.push(ob);
                })
                return result;
            })
            .sortByProperty('waktu2','desc');
            
        this.#orm = data.data;
    }
    async init(){
        
        this.Modal1.showHideFooter(false);

        this.createOrm();
        let data = [];
        if(this.isGuruMapel){
            data = this.ormArsipNaskah.filter(s=>s.mapel == this.mapelAjar);
        }else{
            data = this.ormArsipNaskah;
        }
        this.toolbar.innerHTML = viewArsipNaskah.toolbar(this.jenjang);
        this.workplace.innerHTML = viewArsipNaskah.htmlTabelNaskah(data);
        this.banksoal.tooltipkan();
        this.registerButtons();
    }
    async initus(){
        
        this.Modal1.showHideFooter(false);

        this.createOrmUs();
        let data = [];
        if(this.isGuruMapel){
            data = this.ormArsipNaskah.filter(s=>s.mapel == this.mapelAjar);
        }else{
            data = this.ormArsipNaskah;
        }
        this.toolbar.innerHTML = viewArsipNaskah.toolbar(this.jenjang);
        this.workplace.innerHTML = viewArsipNaskah.htmlTabelNaskah(data);
        this.banksoal.tooltipkan();
        this.registerButtons();
    }
    registerButtons(){
        let btns = document.querySelectorAll('[data-aksibytabelnaskah]');
        btns.forEach(btn=>{
            btn.onclick = ()=>{
                let idkey = btn.getAttribute('data-aksibytabelnaskah');
                let idnaskah = btn.getAttribute('data-shownaskah');
                let itemArsip = this.ormArsipNaskah.filter(s=>s.idbaris == idnaskah);
                let propertiNaskah = new PropertiNaskahSoal(this.banksoal.banksoalservice.data.banksoal);

                if(this[idkey]){
                    if(idkey=='at_editpublikasi'){
                        let idnaskahkbm = btn.getAttribute('data-shownaskahkbm');
                        let itemMateri = itemArsip[0].datamateri.filter(s=>s.idbaris == idnaskahkbm);
                        
                        
                        this[idkey](itemMateri[0])
                    }else{
                        this[idkey](itemArsip[0],propertiNaskah);
                    }
                }else{
                    console.log(idkey,'tidak ditemukan',idnaskah);
                }
            }
        })
    }
    stringToDom(string){
        const template= document.createElement('template');
        template.innerHTML = string;
        return template.content;
    }
    async at_naskah(data,propertiNaskah){
        let api = await this.banksoal.banksoalservice.showTextHTML(data.html_soal);
        let html = UrlImg.replacingImg(api);

        this.Modal1.widthOrientation(false);
        this.Modal1.settingHeder('PRATINJAU NASKAH ONLINE <br>' + data.juduldesain.toUpperCase())
        this.Modal1.showBodyHtml(viewArsipNaskah.viewModal(html));
        this.Modal1.showHideFooter(false);
        this.Modal1.show();
        this.printableModal(data.juduldesain);
        
    }
    async at_kisi(data,propertiNaskah){
        
        let api = await this.banksoal.banksoalservice.showTextHTML(data.html_soal);
        let dom = this.stringToDom(api);
        
        propertiNaskah.domNaskah = dom;
        propertiNaskah.desainFromSpreadSheet(data,this.banksoal.user);
        
        let datakisikisi = propertiNaskah.datakisikisi();
        
        this.Modal1.widthOrientation(true);
        this.Modal1.settingHeder('PRATINJAU KISI-KISI<br> ' + data.juduldesain.toUpperCase())
        this.Modal1.showBodyHtml(viewSoal.htmlkisikisi(datakisikisi.identitas,datakisikisi.generate));
        this.Modal1.showHideFooter(false);
        this.Modal1.show();
        this.printableModal(data.juduldesain);
    }
    async at_kisisoal(data,propertiNaskah){
        
        let api = await this.banksoal.banksoalservice.showTextHTML(data.html_soal);
        let dom = this.stringToDom(api);
        
        propertiNaskah.domNaskah = dom;
        propertiNaskah.desainFromSpreadSheet(data,this.banksoal.user);
        
        let datakisikisi = propertiNaskah.datakisikisi();
        
        this.Modal1.widthOrientation(true);
        this.Modal1.settingHeder('PRATINJAU KISI-KISI DAN SOAL<br> ' + data.juduldesain.toUpperCase())
        this.Modal1.showBodyHtml(viewSoal.htmlkisikisi(datakisikisi.identitas,datakisikisi.datadom.datasoal,true));
        this.Modal1.showHideFooter(false);
        this.Modal1.show();
        this.printableModal(data.juduldesain);
    }
    async at_kuncijawaban(data,propertiNaskah){
        
        let api = await this.banksoal.banksoalservice.showTextHTML(data.html_soal);
        
        let dom = this.stringToDom(api);
        
        propertiNaskah.domNaskah = dom;
        propertiNaskah.desainFromSpreadSheet(data,this.banksoal.user);
        
        let datakisikisi = propertiNaskah.datakisikisi();
        
        this.Modal1.widthOrientation(false);
        this.Modal1.settingHeder('KUNCI JAWABAN<br> ' + data.juduldesain.toUpperCase())
        this.Modal1.showBodyHtml(viewSoal.htmlkuncijawaban(datakisikisi.identitas,datakisikisi.datadom.datasoal));
        this.Modal1.showHideFooter(false);
        this.Modal1.show();
        this.printableModal(data.juduldesain);
    }
    async at_naskahoffline(data,propertiNaskah){
        
        let api = await this.banksoal.banksoalservice.showTextHTML(data.html_soal);
        let html = UrlImg.replacingImg(api);
        let dom = this.stringToDom(html);

        propertiNaskah.domNaskah = dom;
        propertiNaskah.desainFromSpreadSheet(data,this.banksoal.user);
        
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
        this.Modal1.settingHeder('NASKAH OFFLINE '+datadesain.juduldesain.toUpperCase());
        this.Modal1.showBodyHtml(viewArsipNaskah.viewModal(html.innerHTML));
        this.Modal1.show();
        this.printableModal(datadesain.juduldesain);
    }
    async at_publikasikan(data,propertiNaskah){
        let api = await this.banksoal.banksoalservice.showTextHTML(data.html_soal);
        let html = UrlImg.replacingImg(api);
        let dom = this.stringToDom(html);
        
        propertiNaskah.domNaskah = dom;
        propertiNaskah.desainFromSpreadSheet(data,this.banksoal.user);
        
        let view = this.configPublikasi(propertiNaskah,html);
        
        this.Modal1.widthOrientation(false);
        this.Modal1.settingHeder('TAMBAH PUBLIKASI<br> ' + data.juduldesain.toUpperCase())
        this.Modal1.showBodyHtml(viewArsipNaskah.viewPublikasikan(view));
        this.Modal1.showHideFooter(true);
        this.Modal1.footerModal.classList.add('justify-content-center');
        this.Modal1.footerModal.innerHTML = `<button class="btn btn-sm border-bottom border-5 border-primary neon-lite-top border-top-0 border-start-0 border-end-0 rounded-pill rounded py-0" id="btnServerPublikasi">Publikasikan</button>`;
        this.Modal1.show();
        this.configEventPraPublikasi(view,propertiNaskah);
    }
    configPublikasi(propertinaskah,html){
        let prop                = propertinaskah.datakisikisi();
        let datasoal            = prop.datadom.datasoal;
        let desain              = propertinaskah.desain;
        let domElemen           = this.ketersedianElemenNaskahHtml(desain);
        let pelaksanaan         = this.pelaksanaanNaskahHtml(desain);
        let kuncikd             = this.ObjekSebaranKDdanSoalnya(prop.generate);
        let kuncipg             = this.kuncipg(datasoal);
        let htmlkuncijawaban = viewArsipNaskah.viewTabelKunciJawabanPraPublikasi(datasoal,this.banksoal.shortKurikulum);
        let string_kuncipg = kuncipg.length>0?'_KUNCI-PG_'+kuncipg.join(','):'';

        return {
            judulnaskah         : desain.judulnaskah,
            kop                 : desain.kop,
            ketersediaan        : domElemen,
            pelaksanaan         : pelaksanaan,
            ob_kuncikd          : kuncikd,
            kuncikd             : JSON.stringify(kuncikd),
            kuncipg             : string_kuncipg,
            stringkuncikd       : '_KUNCI-KD_'+Object.keys(kuncikd).map(m => m+ ":" +kuncikd[m]).join("<||>"),
            idkurikulum         : this.banksoal.shortKurikulum,
            arrayRombel         : this.banksoal.user.koleksiRombel[this.banksoal.jenjang],
            jenjang             : this.banksoal.jenjang,
            html                : html,
            html_kuncijawaban   : htmlkuncijawaban

        }

    }
    
    configEventPraPublikasi(desainAwal,dataSimpanNaskah){
        let desainperubahan = Object.assign({},desainAwal);
        let tabmateri = new MateriKbm({});
        let elemennaskah = document.querySelectorAll('input[name="elemensoal"]');
        let elementagihan = document.querySelectorAll('input[name="jenistagihan"]');
        let timer = document.querySelectorAll('input[type="datetime-local"]');
        let pilihkelas = document.querySelectorAll('input[name="koleksiarraykelas"]');
        let pilihkelastertentu = document.querySelectorAll('input[name="rombeltertentu"]');
        let btnFinal = document.getElementById('btnServerPublikasi');
        let previewNaskah = document.getElementById('previewHTMLShow');
        let htmlsoal =document.getElementById('htmlsoal');
        // let idmateri_judul =document.getElementById('idmapel');
        let isKop = desainAwal.ketersediaan.filter(s=>s.id == 'ketersediaan_kop').length>0;
        
        //first checked;
        elementagihan[0].checked = true;
        tabmateri.addItem('id_desainnaskah',dataSimpanNaskah.desain.idbaris);
        tabmateri.addItem('idtoken',dataSimpanNaskah.desain.jenjang);
        tabmateri.addItem('action','materibaru');
        tabmateri.addItem('idaksessiswa','sekali');
        // tabmateri.addItem('idmateri',idmateri_judul.value);
        tabmateri.addItem('idSekolah',this.banksoal.user.namaSekolah);
        tabmateri.addItem('dibuatoleh',this.banksoal.user.namaUser);
        tabmateri.addItem('pembuatpertama',this.banksoal.user.namaUser);
        tabmateri.addItem('versi','baru');
        tabmateri.addItem('kuncikd',desainperubahan.kuncikd);
        tabmateri.addItem('arraykelas',desainperubahan.arrayRombel.join(','));
        //cek kerangka soal;
        
        let count=0;
        let countPG = 0;
        let countEssay = 0
        dataSimpanNaskah.desain.kerangka.forEach(n=>{
            tabmateri.addItem(n.bentuksoal,n.jumlah);
            count+=n.jumlah;
            if(n.bentuksoal == 'Piihan Ganda'){
                countPG +=n.jumlah;
            }else if(n.bentuksoal == 'Isian' || n.bentuksoal == 'Essay'){
                countEssay +=n.jumlah;
            }
        });
        if(countPG>0){
            tabmateri.addItem('jumlahpg',countPG);
        }
        if(countEssay>0){
            tabmateri.addItem('jumlahessay',countEssay);
        }

        if(isKop){
            let tabel = previewNaskah.querySelector('#naskah_kop');
            let dominput = document.getElementById('kopAtas');
            dominput.oninput = (e)=>{
                tabel.rows[0].cells[1].querySelector('h3').innerHTML = e.target.value;
                htmlsoal.value= previewNaskah.innerHTML+`\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n${desainperubahan.kuncipg} \r\n${desainperubahan.stringkuncikd}`;
            }
        }

        elemennaskah.forEach(n=>{
            n.onchange = (e)=>{
                let val = e.target.value;
                if(n.checked){
                    
                    previewNaskah.querySelector('#naskah_'+val).style.display="block";
                    htmlsoal.value= previewNaskah.innerHTMLinnerHTML+`\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n${desainperubahan.kuncipg} \r\n${desainperubahan.stringkuncikd}`;;
                }else{
                    
                    previewNaskah.querySelector('#naskah_'+val).style.display="none";
                    htmlsoal.value= previewNaskah.innerHTML+`\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n${desainperubahan.kuncipg} \r\n${desainperubahan.stringkuncikd}`;
                }

            }
        });

        timer.forEach(n=>{
            n.oninput=(e)=>{
                let timer_awal = document.getElementById('idtgl');
                let timer_akhir = document.getElementById('idtglend');
                let target_timer = document.getElementById('iddurasi');
                let target_crtToken = document.getElementById('crtToken');

                target_timer.value  = FormatTanggal.durasiMenit(timer_awal.value,timer_akhir.value);
                target_crtToken.value = new FormatTanggal(timer_awal.value).idStringAbsen();
                tabmateri.addItem('idtgl',timer_awal.value);
                tabmateri.addItem('idtglend',timer_akhir.value);
                tabmateri.addItem('iddurasi',target_timer.value);

                if(desainAwal.ketersediaan.filter(s=>s.label == 'identitas').length>0){
                    let tabel = document.getElementById('naskah_identitas').querySelector('table');
                    tabel.rows[3].cells[2].innerHTML = new FormatTanggal(timer_awal.value).formatFull();
                    tabel.rows[4].cells[2].innerHTML = new FormatTanggal(timer_awal.value).timeShort() +' - '+ new FormatTanggal(timer_akhir.value).timeShort() +' ('+ FormatTanggal.durasiMenit(timer_awal.value,timer_akhir.value)+ ' Menit)';
                };
                htmlsoal.value= previewNaskah.innerHTML+`\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n${desainperubahan.kuncipg} \r\n${desainperubahan.stringkuncikd}`;
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
                    tabmateri.addItem('arraykelas',desainperubahan.arrayRombel.join(','));
                }else{
                    pilihkelastertentu.forEach(t=>{
                        t.checked = true;
                        t.removeAttribute('disabled');
                    });
                    tabmateri.addItem('arraykelas',desainperubahan.arrayRombel.join(','));
                    pilihkelastertentu.forEach(n=>{
                        n.onchange = (e)=>{
                            let doms = document.querySelectorAll('input[name="rombeltertentu"]:checked');
                            let ar = Array.from(doms).map(n=>n.value);
                            if(ar.length==0){
                                tabmateri.addItem('arraykelas',desainperubahan.arrayRombel.join(','));
                            }else{
                                tabmateri.addItem('arraykelas',ar.join(','));
                            }
                        }
                    })

                }
            }
        });

        elementagihan.forEach(n=>{
            n.onchange = (e)=>{
                if(n.checked){
                    tabmateri.addItem('jenistagihan',e.target.value);
                }
            }
        })

        btnFinal.onclick = async ()=>{
            let elementagihan = document.querySelectorAll('input[name="jenistagihan"]:checked');
            let previewNaskah = document.getElementById('previewHTMLShow');
            let timer_awal = document.getElementById('idtgl');
            let timer_akhir = document.getElementById('idtglend');
            let target_timer = document.getElementById('iddurasi');
            let target_crtToken = document.getElementById('crtToken');
            let idmateri_judul = document.getElementById('idmapel');

            target_timer.value  = FormatTanggal.durasiMenit(timer_awal.value,timer_akhir.value);
            target_crtToken.value = new FormatTanggal(timer_awal.value).idStringAbsen();

            tabmateri.addItem('jenistagihan',elementagihan[0].value);
            tabmateri.addItem('idtgl',timer_awal.value);
            tabmateri.addItem('idtglend',timer_akhir.value);
            tabmateri.addItem('iddurasi',target_timer.value);
            tabmateri.addItem('idmapel',idmateri_judul.value);
            tabmateri.addItem('idkelas',this.banksoal.rombel);
            
            
            let par = tabmateri.sanitize().data;
            let media =  previewNaskah.innerHTML+`\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n${desainperubahan.kuncipg} \r\n${desainperubahan.stringkuncikd}`;;
            
            this.Modal1.showHideFooter(false);
            this.Modal1.hide();
            
            await this.banksoal.banksoalservice.simpanDataMateriKbm(par,media);
            this.init();
        }

    }
    kuncipg(datasoal){
        // let datasoal = propertiNaskah.datadom.datasoal;
        
        return datasoal.filter(s=> s.bentuksoal == 'Pilihan Ganda').map(n=>n.nosoal+n.itemsoal.kuncijawaban);
        
    }
    ObjekSebaranKDdanSoalnya(propertiNaskah){
        let kisikisiByNaskah = propertiNaskah;//.datakisikisi().generate;
        let result = {};
        kisikisiByNaskah.forEach(n=>{
            let mapel = n.kodemapel; //kodemapel
            let kd = n.data; // array;
            kd.forEach(kd=>{
                let mapel_kd = mapel;
                let propertikurikulum = kd.objekproperti;
                if(n.kurikulum == 'kurmer'){
                    mapel_kd = mapel+'_'+propertikurikulum.idbaris;
                }
                result[mapel_kd] = kd.arraysoal.map(n=>n.nosoal);
            })

        })
        return result;
    }
    pelaksanaanNaskahHtml(desain){
        let pelaksanaan = {
            'start_waktu':new FormatTanggal(desain.start_waktu).stringForDateTimeLocal(),
            'end_waktu':new FormatTanggal(desain.end_waktu).stringForDateTimeLocal(),
            'durasi':FormatTanggal.durasiMenit(desain.start_waktu,desain.end_waktu),
            'crtToken':new FormatTanggal(desain.start_waktu).idStringAbsen()
        }
        return pelaksanaan;
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
    ketersedianElemenNaskahHtml(desain){
        const {kopsoal,identitassoal,petunjukumum,petunjuknilai,tabelnilai,namakurikulum}=desain;
        let domElemen = [];
        
        if(kopsoal){
            domElemen.push({'label':'KOP Surat (Tapel bisa saja beda,cek preview untuk edit naskah!)','id':'ketersediaan_kop','value':'kop'});
        }
        
        if(identitassoal){
            domElemen.push({'label':'identitas','id':'ketersediaan_identitas','value':'identitas'});
        }
        
        
        if(petunjukumum){
            domElemen.push({'label':'petunjukumum','id':'ketersediaan_petunjukumum','value':'petunjukumum'});
        }
        // let sebarankd = doms.getElementById('naskah_sebarankd');
        if(petunjuknilai){
            if(namakurikulum == 'kurmer'){
                domElemen.push({'label':'Sebaran ATP','id':'ketersediaan_sebarankd','value':'sebarankd'});
            }else{
                domElemen.push({'label':'Sebaran KD','id':'ketersediaan_sebarankd','value':'sebarankd'});
            }
        }
        
        if(tabelnilai){
            // if(namakurikulum == 'kurmer'){
            //     domElemen.push({'label':'Kolom Nilai','id':'ketersediaan_tabelnilai','value':'tabelnilai'});
            // }else{
            //     domElemen.push({'label':'Kolom Nilai','id':'ketersediaan_tabelnilai','value':'tabelnilai'});
            // }
            domElemen.push({'label':'Kolom Nilai','id':'ketersediaan_tabelnilai','value':'tabelnilai'});
        }
        return domElemen;
    }
    async at_hapus(data,naskahProperti){
        let konfirmasi = confirm('Anda yakin akan menghapus Naskah Soal ini? Riwayat publikasi Anda tidak akan terpengaruh meskipun Anda menghapus desain Naskah Soal ini.');
        
        if(!konfirmasi) return;
        
        let redata = new NaskahSoal({});
        let key = redata.protected;
        
        key.forEach(n=>{
            redata.addItem(n, data[n]);
        });
        redata.addItem('hapus','hapus');
        let bodyparam = redata.sanitize().data;
        
        await this.banksoal.banksoalservice.hapusSimpananDesainNaskah(bodyparam);
        this.init();
    }
    
    at_editpublikasi(datamateri){
        //view tampilan di modal
        let pelaksanaan = this.checkBoxRadioPelaksanaanKBM(datamateri);
        let arrayRombel = this.banksoal.user.koleksiRombel[this.jenjang];
        let view = Object.assign({},datamateri,{semester:this.banksoal.user.semester},{idkurikulum:this.banksoal.shortKurikulum},{pelaksanaan:pelaksanaan},{arrayRombel:arrayRombel});
        
        this.Modal1.showHideFooter(false);
        this.Modal1.widthOrientation(false);
        this.Modal1.body.classList.add('p-0');
        this.Modal1.settingHeder('EDIT PUBLIKASI KBM<br/>'+datamateri.idmapel);
        this.Modal1.showBodyHtml(viewArsipNaskah.viewEditPublikasiKbm(view));
        this.Modal1.show();
        //config event;
        this.firstEventEditPublikasi(view);
        this.listener_editpublikasi(view);
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
            
            await this.banksoal.banksoalservice.simpanEditMateriKbm(tabmateri.data);
            this.init();
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
            
            await this.banksoal.banksoalservice.simpanEditMateriKbm(tabmateri.data);
            this.init();
        };
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