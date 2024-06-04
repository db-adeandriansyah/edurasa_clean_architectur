
import { CollectionsEdu } from '../../models/CollectionsEdu';
import { EdaToExcel } from '../excel';
// import { ImportController } from './ImportController';
import { ImportControllerMultipleHeader } from './ImportControllerMultipleHeader';
import viewUploadCsv from './viewUploadCsv';

export default class UploadCsv{
    
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
        this.ormImpor = null;
    }
    createOrm(){
        let tabrespon = this.currentKbm.api_respon;
        let refrensiDesainNaskah = this.currentKbm.obj_desainnaskah;
        let key = this.currentKbm.jenistagihan+'_'+this.kbmFitur.jenjang;
        let keyresponblangko = 'blangko_'+key;
        let blangkotagihan = this.kbmFitur.service.data[keyresponblangko];
        let objek_mapelkd = this.currentKbm.objek_mapelkd;
        let tabtagihan = this.kbmFitur.service.data[key];
        let datasiswa = this.kbmFitur.siswaRombel.slice();
        let blangko_respon = this.kbmFitur.service.data['blangko_respon_'+this.kbmFitur.jenjang];
        
        this.ormImpor = new CollectionsEdu(datasiswa)
            .selectProperties(['id','pd_nama','nama_rombel','aktif'])
            .addProperty('tokensiswa',(item)=>item.id)
            .addProperty('jenistagihan',()=>this.currentKbm.jenistagihan)
            .addProperty('obj_tagihan_siswa',(item)=>{
                let result = blangkotagihan;
                //cek di ss tabtihan, kalo ada ganti result;
                let cek  = tabtagihan.filter(s=>s.tokensiswa == item.tokensiswa);
                if(cek.length>0){
                    result = cek[0];
                }
                return result;
            })
            .addProperty('currentOrmKBM',()=>this.currentKbm)
            .addProperty('datakey_keytagihan',(item)=>{
                let result = [];
                this.currentKbm.objek_mapelkd.forEach(n=>{
                    let obj = Object.assign({},n,{'skornilai':item.obj_tagihan_siswa[n.key_tagihan]??''});
                    // obj.nama = n.key_tagihan
                    // obj.nilai = item.obj_tagihan_siswa[n.key_tagihan];
                    result.push(obj);
                })
                return result;
            })
            .sortByProperty('pd_nama','asc');
            

            return this;
    }
    dataAwal(){
        const data = this.ormImpor.data;
        const kbm = this.currentKbm;
        
        this.Modal1.settingHeder('Upload Nilai KBM Tagihan '+ kbm.jenistagihan);
        this.Modal1.showBodyHtml(viewUploadCsv.viewModalExportImport(viewUploadCsv.viewTabelImport(kbm,data),true));
        this.Modal1.showHideFooter(false);
        
        if(kbm.objek_mapelkd.length>5){
            this.Modal1.widthOrientation(true);
        }else{
            this.Modal1.widthOrientation(false);

        }

    }
    show(){
        this.dataAwal();
        this.Modal1.show();
        this.printableModal(this.currentKbm.idmapel);
        this.eventListenerUpload();
    }
    eventListenerUpload(){
        const btnExportKoreksian = this.Modal1.body.querySelector("#btnExportKoreksian");
        const importModal = this.Modal1.body.querySelector("#importModal");
        const btnSaveKoreksian = this.Modal1.body.querySelector('#btnSaveKoreksian');

        btnSaveKoreksian.onclick = async()=>{
            let tabel = document.querySelector('.exportimport > tbody');
            let rows = tabel.rows;
            let data = [];
            Array.from(rows).forEach(row=>{
                let q = row.querySelectorAll('[data-import]');
                let o = {};
                q.forEach(s=>{
                    let k = s.getAttribute('data-import');
                    if(s.nodeName == 'TD'){
                        o[k] = s.innerHTML ;
                    }else{
                        o[k] = s.value;
                    }
                })
                data.push(o);
            });
            
            this.Modal1.hide();
            let arrayTab = this.kbmFitur.arrayTagihanPerJenjang;
            await this.service.kirimImportKoreksian(data,this.kbmFitur.jenjang,this.currentKbm.jenistagihan,arrayTab);
            this.kbmFitur.init_kbmonline();
            this.parent();
            this.createOrm();
            this.dataAwal();
        }
        btnExportKoreksian.onclick = ()=>{
            let cekTabel=this.Modal1.body.querySelectorAll('.exportimport');
            let title = this.currentKbm.idmapel;
            
            if(cekTabel.length==1){
                let tabelExcel = cekTabel[0];
                new EdaToExcel(tabelExcel,{
                    sheetName:'Syahandrian_Eda',
                    filename:title+'_'+new Date().getTime()
                }
                    )
            }else{
                alert('Mohon maaf, tidak ada format tabel yang cocok untuk dapat diexport ke format excel!')
            }
        }
        
        let keytabel = ['id','namasiswa','idkelas','jenistagihan','tokensiswa', ...this.currentKbm.objek_mapelkd.map(n=>n.key_tagihan)]
        const listenerImport = new ImportControllerMultipleHeader(importModal,this.Modal1.body.querySelector('.exportimport > tbody'),keytabel);
        listenerImport.listnerinput();
    }
    
    printableModal(title='Edurasa'){
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