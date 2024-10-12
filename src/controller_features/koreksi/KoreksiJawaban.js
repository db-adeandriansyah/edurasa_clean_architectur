import UrlImg from "../../controllers/UrlImg";
import TabResponNilai from "../../domains/TabResponNilai";
import { CollectionsEdu } from "../../models/CollectionsEdu";
import { TableProperties } from "../../utilities/tableProperties";
import AlgoritmaNilai from "../Algoritma/AlgoritmaNilai";
import PropertiNaskahSoal from "../naskahsoal/PropertiNaskahSoal";
import LjkBantu from "./LjkBantu";
import LjkFromDomHtml from "./LjkFromDomHtml";
import viewKoreksiJawaban from "./viewKoreksiJawaban";

export default class KoreksiJawaban{
    constructor(kbmFitur,fokusDataKbm,modal, modal1,user,parent){
        this.kbmFitur = kbmFitur;
        this.service = kbmFitur.service;
        this.currentKbm = fokusDataKbm;
        this.Modal = modal;
        this.Modal1 = modal1;
        this.user = user;
        this.ormKoreksiJawaban = null;
        this.realNaskahKbm = null;
        this.parent = parent;
    }
    createOrmKoreksi(){
        //refresni'
        
        let tabrespon = this.currentKbm.api_respon;
        let refrensiDesainNaskah = this.currentKbm.obj_desainnaskah;
        let key = this.currentKbm.jenistagihan+'_'+this.kbmFitur.jenjang;
        let keyresponblangko = 'blangko_'+key;
        let blangkotagihan = this.kbmFitur.service.data[keyresponblangko];
        let objek_mapelkd = this.currentKbm.objek_mapelkd;
        let tabtagihan = this.kbmFitur.service.data[key];
        let datasiswa = this.kbmFitur.siswaRombel.slice();
        let blangko_respon = this.kbmFitur.service.data['blangko_respon_'+this.kbmFitur.jenjang];
        
        this.ormKoreksiJawaban = new CollectionsEdu(datasiswa)
            .selectProperties(['id','pd_nama','nama_rombel','aktif'])
            .addProperty('status_koreksi',(item)=>{
                let cek = tabrespon.filter(s=> s.tokensiswa == item.id);
                let string = 'Belum Dikerjakan';
                if(cek.length>0){
                    if(cek[0].action == 'gurukirimnilai'){
                        string = 'Dibantu Isi<br>Guru Mengisi Nilai';
                    }else if(cek[0].action == 'gurumengoreksicarabaru'){
                        string = 'Sudah Dikoreksi'
                    }else if(cek[0].action == 'siswakirimnilai' && this.currentKbm.soal_manual == 0){
                        string = 'Selesai (Tidak ada koreksian)'
                    }else if(cek[0].action == 'siswakirimnilai' && this.currentKbm.soal_manual >0){
                        string ='Belum dikoreksi'
                    }
                }
                return string;
            })
            .addProperty('classText',(item)=>{
                let cek = tabrespon.filter(s=> s.tokensiswa == item.id);
                let string = ' text-danger';
                if(cek.length>0){
                    if(cek[0].action == 'gurukirimnilai'){
                        string = ' text-info';
                    }else if(cek[0].action == 'gurumengoreksicarabaru'){
                        string = ' text-success';
                    }else if(cek[0].action == 'siswakirimnilai' && this.currentKbm.soal_manual == 0){
                        string = ' text-success';
                    }else if(cek[0].action == 'siswakirimnilai' && this.currentKbm.soal_manual >0){
                        string = ' text-warning';
                    }
                }
                return string;
            })
            .addProperty('kode_koreksi',(item)=>{
                let cek = tabrespon.filter(s=> s.tokensiswa == item.id);
                let string = 0;
                if(cek.length>0){
                    if(cek[0].action == 'gurukirimnilai'){
                        string = 2;//'Dibantu Isi<br>Guru Mengisi Nilai';
                    }else if(cek[0].action == 'gurumengoreksicarabaru'){
                        string = 3;//'Sudah Dikoreksi'
                    }else if(cek[0].action == 'siswakirimnilai' && this.currentKbm.soal_manual == 0){
                        string = 1;//'Selesai (Tidak ada koreksian)'
                    }else if(cek[0].action == 'siswakirimnilai' && this.currentKbm.soal_manual > 0){
                        string = 4
                    }
                }
                return string;
            })
            .addProperty('refrensi_obj_desainnaskah',()=>refrensiDesainNaskah[0])
            .addProperty('spreadsheet_obj_tabtagihan',(item)=>{
                let ceksiswa = tabtagihan.filter(s=> s.tokensiswa == item.id);
                let result  =blangkotagihan;

                if(ceksiswa.length>0){
                    result = ceksiswa[ceksiswa.length-1];
                }

                return result;
            })
            .addProperty('spreadsheet_obj_tabtagihan_blangko',(item)=> blangkotagihan)
            .addProperty('spreadsheet_array_tabrespon',(item)=>tabrespon.filter(s=>s.tokensiswa == item.id))
            .addProperty('spreadsheet_array_tabrespon_blangko',(item)=>[blangko_respon])
            .addProperty('isDuplicate_tabrespon',(item)=>item.spreadsheet_array_tabrespon.length !==0 &&item.spreadsheet_array_tabrespon.length>1)
            .addProperty('algoritma_by_spreadsheet_tabrespon',(item)=>{
                let ar = []
                let datanaskah = refrensiDesainNaskah[0].kerangka;
                
                item.spreadsheet_array_tabrespon.forEach(o=>{
                    let obj_nilaisiswa = {};
                    let arraykoleksisoal = [];

                    obj_nilaisiswa.idbaris_respon = o.idbaris;
                    obj_nilaisiswa.ljk = o.html_jawaban;
                    obj_nilaisiswa.dataspreadsheet = o;
                    
                    datanaskah.forEach((n,index)=>{
                        let obj = {};
                        let nilai_per_bentuksoal = n.datasoal.map(s=> Number(o['SKOR_'+s.nosoal]));
                        if(n.bentuksoal == 'Menjodohkan'){
                            let nosoal_menjodohkan= n.datasoal[0].nosoal;
                            nilai_per_bentuksoal = n.datasoal.map(s=> Number(o['SKOR_'+nosoal_menjodohkan]));
                        }
                        let reducing = nilai_per_bentuksoal.reduce((a,b)=>a+b);
                        let na = (reducing/n.jumlah);
                        let fna = (na*100).toFixed(2)

                        obj.bentuksoalspesifik = n.bentuksoal;
                        obj.arrayNilai = nilai_per_bentuksoal;
                        if(n.bentuksoal == 'Pilihan Ganda'){
                            obj.arrayMilaiRefrenisKerangka = n.datasoal.map(s=> Object.assign({},s,{'nilai':Number(o['SKOR_'+s.nosoal]),'PG':o['PG_'+s.nosoal]}));

                        }else if(n.bentuksoal == 'Menjodohkan'){
                            let nosoal_menjodohkan= n.datasoal[0].nosoal;
                            obj.arrayMilaiRefrenisKerangka = n.datasoal.map(s=> Object.assign({},s,{'nilai':Number(o['SKOR_'+nosoal_menjodohkan])}));

                        }else{
                            obj.arrayMilaiRefrenisKerangka = n.datasoal.map(s=> Object.assign({},s,{'nilai':Number(o['SKOR_'+s.nosoal])}));

                        }
                        obj.nilai = Number(fna);
                        arraykoleksisoal.push(obj);
                    });

                    obj_nilaisiswa.koleksisoal = arraykoleksisoal;
                    obj_nilaisiswa.algoritma = AlgoritmaNilai.calculateByTagihaFromTabRespon(this.currentKbm.objek_mapelkd,o,this.realNaskahKbm);
                    
                    ar.push(obj_nilaisiswa);
                })

                //this.currentKbm
                return ar;
            }).addProperty('algoritma_by_spreadsheet_tabrespon_blangko',(item)=>{
                let ar = []
                let datanaskah = refrensiDesainNaskah[0].kerangka;
                
                const o = blangko_respon;
                let obj_nilaisiswa = {};
                let arraykoleksisoal = [];

                obj_nilaisiswa.idbaris_respon = o.idbaris;
                obj_nilaisiswa.ljk = o.html_jawaban;
                obj_nilaisiswa.dataspreadsheet = o;
                
                datanaskah.forEach((n,index)=>{
                    let obj = {};
                    let nilai_per_bentuksoal = n.datasoal.map(s=> 0);//Number(o['SKOR_'+s.nosoal]));
                    if(n.bentuksoal == 'Menjodohkan'){
                        let nosoal_menjodohkan= n.datasoal[0].nosoal;
                        nilai_per_bentuksoal = n.datasoal.map(s=>0);// Number(o['SKOR_'+nosoal_menjodohkan]));
                    }
                    let reducing = nilai_per_bentuksoal.reduce((a,b)=>a+b);
                    let na = (reducing/n.jumlah);
                    let fna = (na*100).toFixed(2)

                    obj.bentuksoalspesifik = n.bentuksoal;
                    obj.arrayNilai = nilai_per_bentuksoal;
                    if(n.bentuksoal == 'Pilihan Ganda'){
                        obj.arrayMilaiRefrenisKerangka = n.datasoal.map(s=> Object.assign({},s,{'nilai':0,'PG':''}));

                    }else if(n.bentuksoal == 'Menjodohkan'){
                        let nosoal_menjodohkan= n.datasoal[0].nosoal;
                        obj.arrayMilaiRefrenisKerangka = n.datasoal.map(s=> Object.assign({},s,{'nilai':0}));

                    }else{
                        obj.arrayMilaiRefrenisKerangka = n.datasoal.map(s=> Object.assign({},s,{'nilai':0}));

                    }
                    obj.nilai = 0;//Number(fna);
                    arraykoleksisoal.push(obj);
                });

                obj_nilaisiswa.koleksisoal = arraykoleksisoal;
                obj_nilaisiswa.algoritma = AlgoritmaNilai.calculateByTagihaFromTabRespon(this.currentKbm.objek_mapelkd,o,this.realNaskahKbm);
                
                ar.push(obj_nilaisiswa);
                

                //this.currentKbm
                return ar;
            })
            .addProperty('algoritma_by_spreadsheet_tabtagihan',(item)=>{
                return AlgoritmaNilai.calculateByTagihaFromTabTagihan(this.currentKbm.objek_mapelkd,item.spreadsheet_obj_tabtagihan,this.realNaskahKbm)
            })
            .addProperty('algoritma_by_spreadsheet_tabtagihan_blangko',(item)=>{
                return AlgoritmaNilai.calculateByTagihaFromTabTagihan(this.currentKbm.objek_mapelkd,item.spreadsheet_obj_tabtagihan_blangko,this.realNaskahKbm)
            })
            .addProperty('buttons',(item)=>{
                let html="";
                if(item.kode_koreksi == 0){
                    html="Bantu Isi";
                }else if(item.kode_koreksi == 1){
                    html="Koreksi Ulang";
                }else if(item.kode_koreksi == 2){
                    html="Koreksi Ulang";
                }else if(item.kode_koreksi == 3){
                    html= 'Koreksi'

                }else if(item.kode_koreksi == 4){
                    html='Koreksi'
                }
                return html;
            })
            .addProperty('objek_mapelkd',()=>objek_mapelkd)
            .addProperty('refrensi_kerangkamateri_datakbm',(item)=>item.refrensi_obj_desainnaskah.kerangka.map(k=>Object.assign({},
                k,
                {
                    'soalsoal':k.datasoal.map(kk=>Object.assign({},kk,
                                                        {
                                                            'nobybentuk':this.realNaskahKbm.filter(kkk=>kkk.nosoal == kk.nosoal)[0]?this.realNaskahKbm.filter(kkk=>kkk.nosoal == kk.nosoal)[0].nobybentuk:kk.nosoal
                                                        })),
                    'hasOpsiD':k.datasoal.map(kk=>kk.datasoal).filter(kkk=>kkk.bentuksoalspesifik=='Pilihan Ganda' && kkk.opsiD!=="").length>0
                })))
            .sortByProperty('pd_nama','asc');

            return this;
    }
    dataAwal(){
        const data = this.currentKbm;
        this.Modal.widthOrientation(false);
        this.Modal.settingHeder('KOREKSI<br/>' + data.idmapel.toUpperCase())
        
        this.Modal.showBodyHtml(viewKoreksiJawaban.tabelDataKoreksian(data, this.ormKoreksiJawaban.data));
        this.Modal.showHideFooter(false);
        this.registerButtonKoreksi();
    }
    show(){
        this.dataAwal();
        this.Modal.show();
    }
    async propertiNaskah(){
        const data = this.currentKbm;
        const propertiNaskah = new PropertiNaskahSoal(this.service.data.banksoal);
        
        propertiNaskah.desain.namakurikulum = this.kbmFitur.shortKurikulum;
        propertiNaskah.desain.propertikd = this.kbmFitur.ormKurikulum.data;
        let api = await this.service.showTextHTML(data.obj_desainnaskah[0].html_soal);
        let html = UrlImg.replacingImg(api);
        let dom = this.stringToDom(html);

        propertiNaskah.domNaskah = dom;
        propertiNaskah.desainFromSpreadSheetKBM(data,this.user);
        
        let datakisikisi = propertiNaskah.datakisikisi();
        this.realNaskahKbm = datakisikisi.datadom.datasoal;
        
    }
    registerButtonKoreksi(){
        const btns = this.Modal.body.querySelectorAll('[data-eventkoreksi]');

        btns.forEach(btn=>{
            btn.onclick = ()=>{
                let method = btn.getAttribute('data-eventkoreksi');
                
                if(this[method]){
                    this[method](btn);
                }else{
                    alert('Belum tersedia');
                }
            }
        })
    }
    
    stringToDom(string){
        const template= document.createElement('template');
        template.innerHTML = string;
        return template.content;
    }
    async ljk(btn){
        let id = btn.getAttribute('data-idsiswa');
        let idRespon = btn.getAttribute('data-idtabrespon');
        let html_ljk = btn.getAttribute('data-htmlljk');
        let dataOrm = this.ormKoreksiJawaban.data.filter(s=> s.id == id)[0];
        
        this.Modal.hide();
        this.Modal1.widthOrientation(true);
        this.Modal1.showHideFooter(false);
        this.Modal1.showBodyHtml(`<div class="d-flex justify-content-center align-content-center vh-100"><img src="${this.kbmFitur.user.barloading}" class="w3-tiny" alt=""/></div>`);
        this.Modal1.show();
        let api = await this.service.showTextHTML(html_ljk);
        let html = UrlImg.replacingImg(api);
        let dom = this.stringToDom(html);
        
        console.log(dom)
        let ljk = new LjkFromDomHtml(dom,dataOrm,idRespon,this.currentKbm);
        let dataview = ljk.dataViewHtmlLjk();
        let identitas = dataview.identitas;
        let datasoal = dataview.dataLJK;
        
        this.Modal1.settingHeder('LJK <br>');
        this.Modal1.showBodyHtml(viewKoreksiJawaban.viewModal1Printable(viewKoreksiJawaban.viewLjk(identitas,datasoal,false),false));
        
        this.printableModal(dataOrm.idmapel);
    }

    async ljkbantuisi(btn){
        let id = btn.getAttribute('data-idsiswa');
        let idRespon = btn.getAttribute('data-idtabrespon');
        let dataOrm = this.ormKoreksiJawaban.data.filter(s=> s.id == id)[0];

        this.Modal.hide();
        this.Modal1.widthOrientation(true);
        this.Modal1.showHideFooter(false);
        this.Modal1.showBodyHtml(`<div class="d-flex justify-content-center align-content-center vh-100"><img src="${this.kbmFitur.user.barloading}" class="w3-tiny" alt=""/></div>`);
        this.Modal1.show();
        
        let ljk = new LjkBantu(dataOrm,idRespon,this.currentKbm);
        let dataview = ljk.dataViewHtmlLjk();
        let identitas = dataview.identitas;
        let datasoal = dataview.dataLJK;
        
        this.Modal1.settingHeder('BANTU ISI LJK <br>');
        this.Modal1.showBodyHtml(viewKoreksiJawaban.viewModal1Printable(viewKoreksiJawaban.viewLjk(identitas,datasoal,true),true));
        
        this.printableModal(dataOrm.idmapel);
        this.eventKoreksi(true,datasoal,identitas,dataOrm)
    }

    async koreksi(btn){
        let id = btn.getAttribute('data-idsiswa');
        let idRespon = btn.getAttribute('data-idtabrespon');
        let html_ljk = btn.getAttribute('data-htmlljk');
        let dataOrm = this.ormKoreksiJawaban.data.filter(s=> s.id == id)[0];
        
        this.Modal.hide();
        this.Modal1.widthOrientation(true);
        this.Modal1.showHideFooter(false);
        this.Modal1.showBodyHtml(`<div class="d-flex justify-content-center align-content-center vh-100"><img src="${this.kbmFitur.user.barloading}" class="w3-tiny" alt=""/></div>`);
        this.Modal1.show();

        let api = await this.service.showTextHTML(html_ljk);
        let html = UrlImg.replacingImg(api);
        let dom = this.stringToDom(html);
        
        
        let ljk = new LjkFromDomHtml(dom,dataOrm,idRespon,this.currentKbm);
        let dataview = ljk.dataViewHtmlLjk();
        let identitas = dataview.identitas;
        let datasoal = dataview.dataLJK;
        
        this.Modal1.settingHeder('KOREKSI LJK <br>');
        this.Modal1.showBodyHtml(viewKoreksiJawaban.viewModal1Printable(viewKoreksiJawaban.viewLjk(identitas,datasoal,true),true));
        
        this.printableModal(dataOrm.idmapel);
        this.eventKoreksi(false,datasoal,identitas,dataOrm)

    }
    eventKoreksi(modebaru=false,dataLjk,identitas,currentSiswa){
        let tabelPG = this.Modal1.body.querySelector('#tabelconfigpgbantuisiljk');
        let btnSave = this.Modal1.body.querySelector('#btnSaveKoreksian');
        let btnPreview = this.Modal1.body.querySelector('#btnPreviewLJK');
        if(tabelPG){
            this.listenerEventKoreksiPG(tabelPG,dataLjk)
        };
        
        let inputs = this.Modal1.body.querySelectorAll('input[data-update]');
        inputs.forEach(input=>{
            input.oninput = (e)=>{
                if(e.target.value>100){
                    alert('Nilai tidak boleh dari 100');
                    input.value = 100;
                    return;
                };
                if(e.target.value !==""){
                    this.eventUpdateAlgoritma(dataLjk,this.updateChangSkorLJK());
                }

            }

        })
        btnSave.onclick = async()=>{
            let data = this.updateChangSkorLJK();
            let tabresponAsal = dataLjk.tabresponsiswa;
            let tabtagihanAsal = dataLjk.tab_tagihan;
            let tabtagihanUpdate = Object.assign({},tabtagihanAsal);
            let tabresponUpdate = Object.assign({},tabresponAsal, data);
            let obj_kuncikd = {};
            const redesign_nilai_pertagihan = this.fn_algoritma_by_tabrespon(dataLjk.kerangka,[tabresponUpdate]);
            
            redesign_nilai_pertagihan[0].algoritma.forEach(n=>{
                tabtagihanUpdate[n.key_tagihan] = n.nilai_respon;
                obj_kuncikd[n.mapel_kd] = n.nilai_respon;
            });
            let soalOtomatis = redesign_nilai_pertagihan[0].koleksisoal.filter(s=>['Pilihan Ganda','PG Kompleks','BenarSalah'].includes(s.bentuksoalspesifik)).map(n=>n.nilai);
            let soalManual = redesign_nilai_pertagihan[0].koleksisoal.filter(s=>['Isian','Essay','Menjodohkan','Menulis Rapih'].includes(s.bentuksoalspesifik)).map(n=>n.nilai);
            let nilaiPG = "";
            let nilaiEssay = "";
            
            if(soalOtomatis.length>0){
                let reducing = soalOtomatis.reduce((a, b)=>a+b);
                let na = (reducing/soalOtomatis.length).toFixed(2);
                nilaiPG = na;
            }
            if(soalManual.length>0){
                let reducing = soalManual.reduce((a, b)=>a+b);
                let na = (reducing/soalManual.length).toFixed(2);
                nilaiEssay = na;
            }

            tabresponUpdate.nilaikd = JSON.stringify(obj_kuncikd);
            tabresponUpdate.action="gurumengoreksicarabaru";
            tabresponUpdate.nilaiEssay = nilaiEssay;
            tabresponUpdate.nilaiPG = nilaiPG

            if(modebaru){
                
                //tabrespon
                tabresponUpdate.action="gurukirimnilai";
                tabresponUpdate.crtToken=this.currentKbm.crtToken;
                tabresponUpdate.jenistagihan = this.currentKbm.jenistagihan;
                tabresponUpdate.emailguru = this.user.emailguru;
                tabresponUpdate.idkelas = currentSiswa.nama_rombel;
                tabresponUpdate.idmapel = this.currentKbm.idmapel;
                tabresponUpdate.idsekolah = this.user.namaSekolah;
                tabresponUpdate.idtoken = parseInt(currentSiswa.nama_rombel);
                tabresponUpdate.kodeunik = this.currentKbm.jenistagihan+'_'+this.currentKbm.crtToken;
                tabresponUpdate.matericode = this.currentKbm.idbaris;
                tabresponUpdate.namasiswa = currentSiswa.pd_nama;
                tabresponUpdate.tokensiswa = currentSiswa.id;

                //tabtagihan

                tabtagihanUpdate.tokensiswa = currentSiswa.id;
                tabtagihanUpdate.jenistagihan = this.currentKbm.jenistagihan;
                tabtagihanUpdate.namasiswa = currentSiswa.pd_nama;
            }
            
            let dataLjkCopy = Object.assign({},dataLjk);
                dataLjkCopy.nilai_per_algoritma = this.fn_unique_algoritma(redesign_nilai_pertagihan[0].algoritma);
                dataLjkCopy.nilai_pertagihan = redesign_nilai_pertagihan[0].koleksisoal;
                dataLjkCopy.tab_tagihan = tabtagihanUpdate;
                dataLjkCopy.tabresponsiswa = tabresponUpdate;
            
            let mediaHTML = viewKoreksiJawaban.viewLjk(identitas,dataLjkCopy,false)
            let arrayTab = this.kbmFitur.arrayTagihanPerJenjang;
            
            this.Modal1.hide();
            this.Modal.show();
            this.Modal.showBodyHtml('Sedang mengirim ..., Mohon tunggu!');
            let datasanitze = new TabResponNilai(tabresponUpdate).sanitize().data;
            // await this.service.kirimSingleNilaiLJK(tabresponUpdate,tabtagihanUpdate,mediaHTML,modebaru?1:0,arrayTab);
            await this.service.kirimSingleNilaiLJK(datasanitze,tabtagihanUpdate,mediaHTML,modebaru?1:0,arrayTab);
            
            this.kbmFitur.init_kbmonline();
            this.parent();
            this.createOrmKoreksi();
            this.dataAwal();
        }
        if(btnPreview){
            btnPreview.onclick = ()=>{
                let data = this.updateChangSkorLJK();
                let tabresponAsal = dataLjk.tabresponsiswa;
                let tabtagihanAsal = dataLjk.tab_tagihan;
                let tabtagihanUpdate = Object.assign({},tabtagihanAsal);
                let tabresponUpdate = Object.assign({},tabresponAsal, data);
                let obj_kuncikd = {};
                const redesign_nilai_pertagihan = this.fn_algoritma_by_tabrespon(dataLjk.kerangka,[tabresponUpdate]);
                
                redesign_nilai_pertagihan[0].algoritma.forEach(n=>{
                    tabtagihanUpdate[n.key_tagihan] = n.nilai_respon;
                    obj_kuncikd[n.mapel_kd] = n.nilai_respon;
                });

                tabresponUpdate.nilaikd = JSON.stringify(obj_kuncikd);
                let dataLjkCopy = Object.assign({},dataLjk);
                dataLjkCopy.nilai_per_algoritma = this.fn_unique_algoritma(redesign_nilai_pertagihan[0].algoritma);
                dataLjkCopy.nilai_pertagihan = redesign_nilai_pertagihan[0].koleksisoal;
                dataLjkCopy.tab_tagihan = tabtagihanUpdate;
                dataLjkCopy.tabresponsiswa = tabresponUpdate;
                
                this.Modal1.showBodyHtml(viewKoreksiJawaban.viewLjk(identitas,dataLjkCopy,false));
                
            }
        }
    }
    eventUpdateAlgoritma(dataLjk,data){
        
        let tabresponAsal = dataLjk.tabresponsiswa;
        let tabresponUpdate = Object.assign({},tabresponAsal, data);
        
        this.updateSkorByBentukSoal(dataLjk,tabresponUpdate);
    }
    updateSkorByBentukSoal(dataLjk,dataTabResponUpdate){
        
        const redesign_nilai_pertagihan = this.fn_algoritma_by_tabrespon(dataLjk.kerangka,[dataTabResponUpdate]);
        const wraperDivUpdateBentukSoal = this.Modal1.body.querySelector('#view_nilai_perbentuksoal');
        const wraperDivUpdateKompetensi = this.Modal1.body.querySelector('#view_nilai_peralgoritma');

        wraperDivUpdateBentukSoal.innerHTML = viewKoreksiJawaban.view_nilai_perbentuksoal({'nilai_pertagihan':redesign_nilai_pertagihan[0].koleksisoal});
        wraperDivUpdateKompetensi.innerHTML = viewKoreksiJawaban.view_nilai_peralgoritma(
                    {
                        'nilai_per_algoritma':this.fn_unique_algoritma(redesign_nilai_pertagihan[0].algoritma),
                        'namaKurikulum':this.kbmFitur.shortKurikulum
                    });
    }
    fn_algoritma_by_tabrespon(datanaskah,arrayTabrespon){
        // let datanaskah = refrensiDesainNaskah[0].kerangka;
        let ar = []
        
        // item.spreadsheet_array_tabrespon.forEach(o=>{
        arrayTabrespon.forEach(o=>{
            let obj_nilaisiswa = {};
            let arraykoleksisoal = [];

            obj_nilaisiswa.idbaris_respon = o.idbaris;
            obj_nilaisiswa.ljk = o.html_jawaban;
            obj_nilaisiswa.dataspreadsheet = o;
            
            datanaskah.forEach((n,index)=>{
                let obj = {};
                let nilai_per_bentuksoal = n.datasoal.map(s=> Number(o['SKOR_'+s.nosoal]));
                if(n.bentuksoal == 'Menjodohkan'){
                    let nosoal_menjodohkan= n.datasoal[0].nosoal;
                    nilai_per_bentuksoal = n.datasoal.map(s=> Number(o['SKOR_'+nosoal_menjodohkan]));
                }
                let reducing = nilai_per_bentuksoal.reduce((a,b)=>a+b);
                let na = (reducing/n.jumlah);
                let fna = (na*100).toFixed(2)

                obj.bentuksoalspesifik = n.bentuksoal;
                obj.arrayNilai = nilai_per_bentuksoal;
                if(n.bentuksoal == 'Pilihan Ganda'){
                    obj.arrayMilaiRefrenisKerangka = n.datasoal.map(s=> Object.assign({},s,{'nilai':Number(o['SKOR_'+s.nosoal]),'PG':o['PG_'+s.nosoal]}));

                }else if(n.bentuksoal == 'Menjodohkan'){
                    let nosoal_menjodohkan= n.datasoal[0].nosoal;
                    obj.arrayMilaiRefrenisKerangka = n.datasoal.map(s=> Object.assign({},s,{'nilai':Number(o['SKOR_'+nosoal_menjodohkan])}));

                }else{
                    obj.arrayMilaiRefrenisKerangka = n.datasoal.map(s=> Object.assign({},s,{'nilai':Number(o['SKOR_'+s.nosoal])}));

                }
                obj.nilai = Number(fna);
                arraykoleksisoal.push(obj);
            });

            obj_nilaisiswa.koleksisoal = arraykoleksisoal;
            obj_nilaisiswa.algoritma = AlgoritmaNilai.calculateByTagihaFromTabRespon(this.currentKbm.objek_mapelkd,o,this.realNaskahKbm);
            
            ar.push(obj_nilaisiswa);
        })

        //this.currentKbm
        return ar;
    }
    fn_unique_algoritma(algoritma){
        let data = [];
        // let algoritma = this.algoritmaTabRespon.algoritma;
        let uniqe = algoritma.map(n=>n.kodemapel).filter((x,i,a)=> a.indexOf(x)==i);
        uniqe.forEach(kodemapel=>{
            let obj = {};
            let filterAlgoritmaByMapel = algoritma.filter(s=> s.kodemapel == kodemapel);
            
            obj.kodemapel = kodemapel;
            obj.kodemapel_teks = filterAlgoritmaByMapel[filterAlgoritmaByMapel.length-1].kodemapel_teks;
            obj.jumlahkd = filterAlgoritmaByMapel.length;
            obj.data = filterAlgoritmaByMapel;
            obj.namakurikulum = this.kbmFitur.shortKurikulum;
            data.push(obj);
            
        })
        return data;
    }
    listenerEventKoreksiPG(tabel,dataLjk){
        let kerangkaPG = dataLjk.kerangka.filter(s=> s.bentuksoal == 'Pilihan Ganda')[0];
        let hasPG = kerangkaPG.hasOpsiD;
        let kuncijawaban = kerangkaPG.soalsoal.map(n=>Object.assign({},{'nosoal':n.nosoal,'kuncijawaban':n.datasoal.kuncijawaban}));
        let avoidNextIndexCell = hasPG?5:4;
        tabel.onclick = (e) =>{
            let dataklik = TableProperties.propertiesByClick(e.target);
            let nosoaltabel = dataklik.rows.cells[0].innerHTML;
            
            if(dataklik.cells.cellIndex>0 && dataklik.cells.cellIndex < avoidNextIndexCell){
                for(let n = 0; n < dataklik.rows.cells.length; n++){
                    dataklik.rows.cells[n].classList.remove('text-bg-info','w3-green');
                };
                dataklik.cells.classList.add('text-bg-info','w3-green');
                //target
                dataklik.rows.querySelector('input[data-update^=PG]').value = dataklik.cells.innerHTML;
                //nilai;
                let nilai = 0;
                let cariKunci = kuncijawaban.filter(s=>s.nosoal == nosoaltabel);
                if(cariKunci.length>0){
                    if(cariKunci[0].kuncijawaban == dataklik.cells.innerHTML){
                        nilai =1
                    }
                }
                dataklik.rows.querySelector('input[data-update^=SKOR]').value = nilai;;
                this.eventUpdateAlgoritma(dataLjk,this.updateChangSkorLJK());
            }

        }
    }
    updateChangSkorLJK(){
        let inputs = this.Modal1.body.querySelectorAll('input[data-update]');
        let data = {}
        inputs.forEach(input=>{
            let key = input.getAttribute('data-update');
            
            if(input.type == 'number'){
                if(input.value>1){
                    data[key] = Number(input.value/100);
                }else{
                    data[key] = Number(input.value);
                }
            }else{
                data[key] = input.value;


            }

        });
        
        
        return data;
    }
    async hapus(btn){
        let id = btn.getAttribute('data-idsiswa');
        let idRespon = btn.getAttribute('data-idtabrespon');
        let dataOrm = this.ormKoreksiJawaban.data.filter(s=> s.id == id)[0];
        let tabrespon = dataOrm.spreadsheet_array_tabrespon.filter(s=>s.idbaris == idRespon)[0];
        
        this.Modal.hide();
        this.Modal1.settingHeder('HAPUS LJK <br> ID = '+tabrespon.idbaris);
        this.Modal1.showHideFooter(false);
        this.Modal1.showBodyHtml(viewKoreksiJawaban.viewModal1Printable(viewKoreksiJawaban.viewKonfirmasiHapus(tabrespon),false));
        this.Modal1.show();
        this.printableModal(dataOrm.idmapel);
        // this.eventKoreksi(false,datasoal,identitas,dataOrm)
        const btnHapus = this.Modal1.body.querySelector('#btnhapus');
        btnHapus.onclick = async (e)=>{
            this.Modal.showBodyHtml('Sedang mengirim ..., Mohon tunggu!');
            this.Modal.show();
            this.Modal1.hide();
            let arrayTab = this.kbmFitur.arrayTagihanPerJenjang;
            let editDataTabRespon = new TabResponNilai(tabrespon)
                                .addItem('action','gurumenghapus')
                                .addItem('jenistagihan','')
                                .addItem('matericode','')
                                .addItem('crtToken','')
                                .addItem('nilaiPG','')
                                .addItem('kodeunik','')
                                .sanitize()
                                .data;
        
            await this.service.editLJKTabRespon(editDataTabRespon,arrayTab);
            
            this.kbmFitur.init_kbmonline();
            this.parent();
            this.createOrmKoreksi();
            this.dataAwal();
        }
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
}