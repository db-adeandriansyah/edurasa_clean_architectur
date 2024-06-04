export default class LjkFromDomHtml{
    constructor(dom,dataOrmKurtilas,idbarisTabRespon,objCurrentKBM){
        this.dom= dom;
        this.orm = dataOrmKurtilas;
        this.datakbm = objCurrentKBM
        this.idbarisTabRespon = idbarisTabRespon;

    }
    get div_ljksiswa_pg(){
        return this.dom.querySelector('.ljksiswa_pg');
    }
    get div_ljksiswa_essay(){
        return this.dom.querySelectorAll('.ljksiswa_essay');
    }
    get td_selwaktumulai(){
        return this.dom.querySelector('#selwaktumulai');
    }
    get td_selakhirwaktu(){
        //<td id="hasilakhirwaktu">Tgl 20/05/2024 Pkl. 08:47:21</td>
        return this.dom.querySelector('#hasilakhirwaktu');
    }
    get data_tabtagihan(){
        return this.orm.spreadsheet_obj_tabtagihan;
    }
    data_essay(){
        let ol_koreksi = this.div_ljksiswa_essay;
        let data = [];
        
        ol_koreksi.forEach(div=>{
            //cari elemen ol;
            let ols = div.querySelectorAll('ol[start]');
            ols.forEach(ol=>{
                let nosoal = ol.getAttribute('start');
                let obj = {};
                let htmljawaban = "";

                //cek regex;
                const regex = /<b style="color:blue">Jawaban:<\/b>[\s\S]*?(?=<div id=)/;
                const match = ol.innerHTML.match(regex);
                let regexs = [];

                if (match) {
                    htmljawaban = match[0];
                    regexs = match;
                } 
                
                    
                obj.nosoal =nosoal;
                obj.html= ol.innerHTML;
                obj.htmljawaban = htmljawaban;
                // obj.regex = regexs;
                data.push(obj);
            })
        })
        return data
        
    }
    titleLJK(){
        let data = {};
        data.namasiswa = this.orm.pd_nama;
        data.kelas = this.orm.nama_rombel;
        data.waktustart_siswa = (this.td_selwaktumulai)?this.td_selwaktumulai.innerHTML:'';
        data.waktuakhir_siswa = (this.td_selwaktumulai)?this.td_selakhirwaktu.innerHTML:'';
        data.identitasmateri = this.datakbm.idmapel;
        data.jenistagihan = this.datakbm.jenistagihan;
        data.pelaksanaan = this.datakbm.pelaksanaan;
        data.pelaksanaanakhir = this.orm.pelaksanaanakhir;
        data.mapel_kd = this.orm.objek_mapelkd;
        return data;
    }
    get namaKurikulum(){
        return this.datakbm.namakurikulum;
    }
    get hasSoalOtomtatis(){
        return this.datakbm.soal_otomatis>0;
    }
    get hasSoalManual(){
        return this.datakbm.soal_manual>0;
    }
    get objekTabResponSiswa(){
        return this.orm.spreadsheet_array_tabrespon.filter(s=>s.idbaris == this.idbarisTabRespon)[0];
    }
    get algoritmaTabRespon(){
        return this.orm.algoritma_by_spreadsheet_tabrespon.filter(s=>s.idbaris_respon == this.idbarisTabRespon)[0];
    }
    get nilai_per_algoritma(){
        let data = [];
        let algoritma = this.algoritmaTabRespon.algoritma;
        let uniqe = algoritma.map(n=>n.kodemapel).filter((x,i,a)=> a.indexOf(x)==i);
        uniqe.forEach(kodemapel=>{
            let obj = {};
            let filterAlgoritmaByMapel = algoritma.filter(s=> s.kodemapel == kodemapel);
            
            obj.kodemapel = kodemapel;
            obj.kodemapel_teks = filterAlgoritmaByMapel[filterAlgoritmaByMapel.length-1].kodemapel_teks;
            obj.jumlahkd = filterAlgoritmaByMapel.length;
            obj.data = filterAlgoritmaByMapel;
            obj.namakurikulum = this.namaKurikulum;
            data.push(obj);
            
        })
        return data;
    }
    datasoal(){
        let cek = {
            hasOtomatis:this.hasSoalOtomtatis,
            hasManual:this.hasSoalManual,
            dataJawabanInput: this.data_essay(),
            kerangka:this.orm.refrensi_kerangkamateri_datakbm,
            tabresponsiswa:this.objekTabResponSiswa,
            namaKurikulum:this.namaKurikulum,
            nilai_per_algoritma:this.nilai_per_algoritma,
            nilai_pertagihan:this.algoritmaTabRespon.koleksisoal,
            tab_tagihan:this.orm.spreadsheet_obj_tabtagihan
        }
        return cek;
    }
    dataViewHtmlLjk(){
        return {
            'identitas':this.titleLJK(),
            'dataLJK' :this.datasoal(),
        }
    }
}