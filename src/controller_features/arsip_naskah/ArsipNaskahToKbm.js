import { durasiMenit, FormatTanggal } from "../../utilities/FormatTanggal";
import viewArsipNaskah from "../arsipnaskah/viewArsipNaskah";
import ViewArsipNaskah from "./ViewArsipNaskah";

export default class ArsipNaskahToKbm{
    constructor(){
        this.propertiNaskah = {};
        this.Auth = null;
        this.callback = null;

        /** datasheet arsip naskah / tab: simpandesainsoal ss: kalender */
        this.datasheet = {};

        /** dom kontrol pembuat data kbm */
        this.domControl = null;
        this.datakbm = {
            Time_Stamp:new Date(),
            idtoken:1,
            idaksessiswa:'sekali',
            versi:'baru',
            kurikulum:'kurmer',
            action:'materibaru'
        }
    }
    auth(auth){
        this.Auth = auth;
        this.datakbm['pembuatpertama'] = auth.namaUser;
        this.datakbm['dibuatoleh'] = auth.namaUser;
        this.datakbm['idSekolah'] = auth.namaSekolah;
        this.datakbm['idpendaftar'] = auth.idUser;
        return this;
    }
    fromInstansiasiPropertiNaskah(x){
        this.propertiNaskah = x;
        return this;
    }
    desainFromSimpanDesainSoal(datasheet){
        this.datasheet = datasheet;
        
        return this;
    }
    jenjang(x){
        this.fokusJenjang = x;
        this.datakbm['idkelas'] = x;
        this.datakbm['idtoken'] = x;
        return this;
    }
    get koleksiRombel(){
        return this.Auth.koleksiRombel[this.fokusJenjang];
        
    }
    get semester(){
        return this.Auth.semester;
    }
    
    htmlTxt(t){
        this.html = t;
        return this;
    }

    ControlAddPublicationNaskahTo(DOMTarget){
        this.propertiNaskah.desainFromSpreadSheet(this.datasheet,this.Auth);
        this.domControl = DOMTarget;
        let prop                = this.propertiNaskah.datasoaldaridom();
        let datasoal            = prop.datasoal;
        let desain              = this.propertiNaskah.desain;
        let domElemen           = this.propertiNaskah.ketersedianElemenNaskahHtml();
        let pelaksanaan         = this.propertiNaskah.pelaksanaanNaskahHtml();
        let properti_kurikulum  = this.propertiNaskah.generateDataKisikisi();
        let kuncikd             = this.propertiNaskah.ObjekSebaranKDdanSoalnya();
        let kuncipg             = this.propertiNaskah.kuncipg(datasoal);
        let string_kuncipg      = kuncipg.length>0?'_KUNCI-PG_'+kuncipg.join(','):'';
        let htmlkuncijawaban    = viewArsipNaskah.viewTabelKunciJawabanPraPublikasi(datasoal,'kurmer');
        let view = {
            idmapel             : desain.judulnaskah,
            kop                 : desain.kop,
            ketersediaan        : domElemen,
            pelaksanaan         : pelaksanaan,
            ob_kuncikd          : kuncikd,
            properti_kurikulum  : properti_kurikulum,
            kuncikd             : JSON.stringify(kuncikd),
            stringkuncikd       : '_KUNCI-KD_'+Object.keys(kuncikd).map(m => m+ ":" +kuncikd[m]).join("<||>"),
            kuncipg             : string_kuncipg,
            idkurikulum         : 'kurmer',
            arrayRombel         : this.koleksiRombel,
            jenjang             : this.fokusJenjang,
            semester            : this.semester,
            html                : this.html,
            html_kuncijawaban   : htmlkuncijawaban

        }
        this.datakbm['kuncikd'] = JSON.stringify(kuncikd);
        //render view di modal
        DOMTarget.innerHTML = ViewArsipNaskah.viewTambahPublikasiKbm(view);

        return this;
    }
    ControlEditPublicationKbmNaskahTo(DOMTarget){
        this.datakbm = Object.assign({},this.datakbm,this.datasheet);
        this.datakbm['dibuatoleh'] = this.Auth.namaUser;
        this.propertiNaskah.desainFromSpreadSheetKBM(this.datasheet,this.Auth);
        this.domControl = DOMTarget;
        
        // let prop                = this.propertiNaskah.datasoaldaridom();
        // let datasoal            = prop.datasoal;
        // let desain              = this.propertiNaskah.desain;
        // let domElemen           = this.propertiNaskah.ketersedianElemenNaskahHtml();
        let pelaksanaan         = this.propertiNaskah.pelaksanaanNaskahHtml();
        // let properti_kurikulum  = this.propertiNaskah.generateDataKisikisi();
        // let kuncikd             = this.propertiNaskah.ObjekSebaranKDdanSoalnya();
        // let kuncipg             = this.propertiNaskah.kuncipg(datasoal);
        // let string_kuncipg      = kuncipg.length>0?'_KUNCI-PG_'+kuncipg.join(','):'';
        // let htmlkuncijawaban    = viewArsipNaskah.viewTabelKunciJawabanPraPublikasi(datasoal,'kurmer');
        let view = {
            idmapel             : this.datasheet.idmapel,
            // kop                 : desain.kop,
            // ketersediaan        : domElemen,
            pelaksanaan         : pelaksanaan,
            // ob_kuncikd          : kuncikd,
            // properti_kurikulum  : properti_kurikulum,
            // kuncikd             : JSON.P(kuncikd),
            // stringkuncikd       : '_KUNCI-KD_'+Object.keys(kuncikd).map(m => m+ ":" +kuncikd[m]).join("<||>"),
            // kuncipg             : string_kuncipg,
            idkurikulum         : 'kurmer',
            // namakurikulum         : 'kurmer',
            arrayRombel         : this.koleksiRombel,
            jenjang             : this.fokusJenjang,
            semester            : this.semester,
            // html                : this.html,
            // html_kuncijawaban   : htmlkuncijawaban

        }
        DOMTarget.innerHTML = ViewArsipNaskah.viewEditPublikasiKbm(view);

        return this;
    }
    runtime(fn){
        this.callback = fn;
        return this;
    }
    /** @info Eksekusi untuk modal dengan sumber data dari tab simpandesainsoal ke kbm */
    execute(){
        const DOMTarget = this.domControl;
        let prop                = this.propertiNaskah.datasoaldaridom();
        let datasoal            = prop.datasoal;
        let kuncikd             = this.propertiNaskah.ObjekSebaranKDdanSoalnya();
        let kuncipg             = this.propertiNaskah.kuncipg(datasoal);
        let string_kuncipg      = kuncipg.length>0?'_KUNCI-PG_'+kuncipg.join(','):'';
        let stringkuncikd           = '_KUNCI-KD_'+Object.keys(kuncikd).map(m => m+ ":" +kuncikd[m]).join("<||>");
        

        this.datasheet.kerangka.forEach(n=>{
            this.datakbm[n.bentuksoal] = n.jumlahsoal;
        });
        this.datakbm['arraykelas'] = this.koleksiRombel.join(',');
        this.datakbm['jumlahpg'] = this.datasheet.kerangka.filter(s=>s.bentuksoal == 'Pilihan Ganda').length>0?this.datasheet.kerangka.filter(s=>s.bentuksoal == 'Pilihan Ganda').map(n=>n.jumlah).reduce((a,b)=>a+parseInt(b)):'';
        this.datakbm['jumlahessay'] = this.datasheet.kerangka.filter(s=>s.bentuksoal !== 'Pilihan Ganda').length>0?this.datasheet.kerangka.filter(s=>s.bentuksoal !== 'Pilihan Ganda').map(n=>n.jumlah).reduce((a,b)=>a+parseInt(b)):'';
        this.datakbm['id_desainnaskah'] = this.datasheet.idbaris;
        
        // 
        //listener/event utama
        DOMTarget.querySelectorAll('input[data-keynaskah]').forEach(el=>{
            if(el.type == 'radio' || el.type == 'checkbox'){
                if(el.checked){
                    this.datakbm[el.getAttribute('data-keynaskah')] = el.value;
                }
            }else{
                this.datakbm[el.getAttribute('data-keynaskah')] = el.value;
            }

            // let forbiddenTglAwal = new Date(DOMTarget.querySelector('[data-key="idtgl"]').value).getTime() < new Date().getTime();
            // if(forbiddenTglAwal){
            //     DOMTarget.querySelector('[data-key="idtgl"]').setAttribute('disabled',true);
            // }
            el.onchange = (e)=>{
                this.datakbm[e.target.getAttribute('data-keynaskah')] = e.target.value;
                if(e.target.type == 'datetime-local'){
                    let inputawal = DOMTarget.querySelector('[data-keynaskah="idtgl"]').value;
                    let inputakhir = DOMTarget.querySelector('[data-keynaskah="idtglend"]').value;
                    let menit = durasiMenit(new Date(inputawal),new Date(inputakhir));
                    let crtToken = new FormatTanggal(inputawal).idStringAbsen();
                    // let forbiddenTglAwal = new Date(inputawal).getTime() < new Date().getTime();
                    // if(forbiddenTglAwal){
                    //     DOMTarget.querySelector('[data-key="idtgl"]').setAttribute('disabled',true);
                    // }
                    this.datakbm['iddurasi'] = menit;
                    this.datakbm['crtToken'] = crtToken;

                    DOMTarget.querySelector('[data-keynaskah="iddurasi"]').value = menit;
                    DOMTarget.querySelector('[data-keynaskah="crtToken"]').value = crtToken;
                    
                    let seltanggal = DOMTarget.querySelector('#naskah_identitas > table > tbody > tr:nth-child(4) > td:nth-child(3)');
                    if(seltanggal){
                        seltanggal.innerHTML = new Date(inputawal).toLocaleString('id-ID',{dateStyle:'full'});
                        let pukul = '';
                        pukul += new Date(inputawal).toLocaleString('id-ID',{timeStyle:'short'});
                        pukul += '-';
                        pukul += new Date(inputakhir).toLocaleString('id-ID',{timeStyle:'short'});
                        pukul += ' (';
                        pukul+= DOMTarget.querySelector('[data-keynaskah="iddurasi"]').value;
                        pukul += ' Menit)';
                        DOMTarget.querySelector('#naskah_identitas > table > tbody > tr:nth-child(5) > td:nth-child(3)').innerHTML = pukul;
                    }

                }else if(e.target.type=='number'){
                    let inputawal = DOMTarget.querySelector('[data-keynaskah="idtgl"]').value;
                    let inputakhir = DOMTarget.querySelector('[data-keynaskah="idtglend"]').value;
                    let seltanggal = DOMTarget.querySelector('#naskah_identitas > table > tbody > tr:nth-child(4) > td:nth-child(3)');
                    
                    if(seltanggal){
                        seltanggal.innerHTML = new Date(inputakhir).toLocaleString('id-ID',{dateStyle:'full'});
                        let pukul = '';
                        pukul += new Date(inputawal).toLocaleString('id-ID',{timeStyle:'short'});
                        pukul += '-';
                        pukul += new Date(inputakhir).toLocaleString('id-ID',{timeStyle:'short'});
                        pukul += ' (';
                        pukul+= e.target.value;
                        pukul += ' Menit)';
                        DOMTarget.querySelector('#naskah_identitas > table > tbody > tr:nth-child(5) > td:nth-child(3)').innerHTML = pukul;
                    }
                }
                this.callback(this.datakbm)
            }
        });
        
        //listener/event perubahan publikasi kelas
        let koleksiarraykelas = DOMTarget.querySelectorAll('input[name="koleksiarraykelas"]');//
        let koleksikelastertentu = DOMTarget.querySelectorAll('input[name="rombeltertentu"]');//
        koleksiarraykelas.forEach(n=>{
            n.onchange = ()=>{
                if(n.checked){
                    if( n.value == ""){
                        koleksikelastertentu.forEach(nn=>{
                            nn.removeAttribute('disabled');
                            nn.onchange = ()=>{
                                let ar = []
                                DOMTarget.querySelectorAll('input[name="rombeltertentu"]:checked').forEach(nc=>{
                                    ar.push(nc.value);
                                });
                                this.datakbm['arraykelas'] = ar.join(',');
                                this.callback(this.datakbm);
                            }
                        });
                        this.datakbm['arraykelas'] = this.koleksiRombel.join(',');
                        this.callback(this.datakbm);
                    }else{
                        koleksikelastertentu.forEach(nn=>{
                            nn.setAttribute('disabled',true);
                            nn.checked=true;;
                        });
                        this.datakbm['arraykelas'] = this.koleksiRombel.join(',');
                        this.callback(this.datakbm);
                    }
                }
            }
        });

        //listner/event perubahan html;
        let koleksiCreateHtml = DOMTarget.querySelectorAll('[data-createHtml]');
        
        koleksiCreateHtml.forEach(prop=>{
            let key = prop.getAttribute('data-createHtml');
            
            prop.onchange = ()=>{
                if(prop.type =='checkbox'){
                    if(prop.checked){
                        DOMTarget.querySelector(`#${key}`).style.display = 'block';
                    }else{
                        DOMTarget.querySelector(`#${key}`).style.display = 'none';
                    }
                }else{
                    if(key=='kopAtas'){
                        //#naskah_kop > tbody > tr > td:nth-child(1)
                        let tabel = DOMTarget.querySelector(`#naskah_kop > tbody > tr > td:nth-child(2) > h3`);
                        tabel.innerHTML = prop.value;
                    }
                }
                let divHtml = DOMTarget.querySelector('#previewHTMLShow');
                this.datakbm['htmlsoal']= divHtml.innerHTML+`\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n${string_kuncipg} \r\n${stringkuncikd}`;
                this.callback(this.datakbm);
            }
        })
        let divHtml = DOMTarget.querySelector('#previewHTMLShow');
        this.datakbm['htmlsoal']= divHtml.innerHTML+`\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n${string_kuncipg} \r\n${stringkuncikd}`;
                
        DOMTarget.querySelectorAll('input[data-keynaskah="jenistagihan"]')[0].checked = true;
        DOMTarget.querySelectorAll('input[data-keynaskah="jenistagihan"]')[0].dispatchEvent(new Event('change'));
    }
    executeEdit(){
        const DOMTarget = this.domControl;
        //isikan
        let compare = this.koleksiRombel.length === this.datasheet.arraykelas.split(',').length;
        if(!compare){
            this.domControl.querySelector('#arraykelasNull').checked = true;
            let kelastertentu = this.domControl.querySelectorAll('[name="rombeltertentu"]');
            kelastertentu.forEach(n=>{
                n.removeAttribute('disabled');
                if(this.datasheet.arraykelas.split(',').includes(n.value)) n.checked = true;
            })
        }

        this.domControl.querySelector(`input[name=jenistagihan][value=${this.datasheet.jenistagihan}]`).checked = true;

        //listener/event utama
        DOMTarget.querySelectorAll('input[data-keynaskah]').forEach(el=>{
            if(el.type == 'radio' || el.type == 'checkbox'){
                if(el.checked){
                    this.datakbm[el.getAttribute('data-keynaskah')] = el.value;
                }
            }else{
                this.datakbm[el.getAttribute('data-keynaskah')] = el.value;
            }

            let forbiddenTglAwal = new Date(DOMTarget.querySelector('[data-keynaskah="idtgl"]').value).getTime() < new Date().getTime();
            if(forbiddenTglAwal){
                DOMTarget.querySelector('[data-keynaskah="idtgl"]').setAttribute('disabled',true);
            }
            el.onchange = (e)=>{
                this.datakbm[e.target.getAttribute('data-keynaskah')] = e.target.value;
                if(e.target.type == 'datetime-local'){
                    let inputawal = DOMTarget.querySelector('[data-keynaskah="idtgl"]').value;
                    let inputakhir = DOMTarget.querySelector('[data-keynaskah="idtglend"]').value;
                    let menit = durasiMenit(new Date(inputawal),new Date(inputakhir));
                    let crtToken = new FormatTanggal(inputawal).idStringAbsen();
                    // let forbiddenTglAwal = new Date(inputawal).getTime() < new Date().getTime();
                    // if(forbiddenTglAwal){
                    //     DOMTarget.querySelector('[data-key="idtgl"]').setAttribute('disabled',true);
                    // }
                    this.datakbm['iddurasi'] = menit;
                    this.datakbm['crtToken'] = crtToken;

                    DOMTarget.querySelector('[data-keynaskah="iddurasi"]').value = menit;
                    DOMTarget.querySelector('[data-keynaskah="crtToken"]').value = crtToken;
                    
                    // let seltanggal = DOMTarget.querySelector('#naskah_identitas > table > tbody > tr:nth-child(4) > td:nth-child(3)');
                    // if(seltanggal){
                    //     seltanggal.innerHTML = new Date(inputawal).toLocaleString('id-ID',{dateStyle:'full'});
                    //     let pukul = '';
                    //     pukul += new Date(inputawal).toLocaleString('id-ID',{timeStyle:'short'});
                    //     pukul += '-';
                    //     pukul += new Date(inputakhir).toLocaleString('id-ID',{timeStyle:'short'});
                    //     pukul += ' (';
                    //     pukul+= DOMTarget.querySelector('[data-keynaskah="iddurasi"]').value;
                    //     pukul += ' Menit)';
                    //     DOMTarget.querySelector('#naskah_identitas > table > tbody > tr:nth-child(5) > td:nth-child(3)').innerHTML = pukul;
                    // }

                }
                // else if(e.target.type=='number'){
                //     let inputawal = DOMTarget.querySelector('[data-keynaskah="idtgl"]').value;
                //     let inputakhir = DOMTarget.querySelector('[data-keynaskah="idtglend"]').value;
                    
                //     this.datakbm['iddurasi'] = e.target.value;
                //     // let seltanggal = DOMTarget.querySelector('#naskah_identitas > table > tbody > tr:nth-child(4) > td:nth-child(3)');
                //     // if(seltanggal){
                //     //     seltanggal.innerHTML = new Date(inputakhir).toLocaleString('id-ID',{dateStyle:'full'});
                //     //     let pukul = '';
                //     //     pukul += new Date(inputawal).toLocaleString('id-ID',{timeStyle:'short'});
                //     //     pukul += '-';
                //     //     pukul += new Date(inputakhir).toLocaleString('id-ID',{timeStyle:'short'});
                //     //     pukul += ' (';
                //     //     pukul+= e.target.value;
                //     //     pukul += ' Menit)';
                //     //     DOMTarget.querySelector('#naskah_identitas > table > tbody > tr:nth-child(5) > td:nth-child(3)').innerHTML = pukul;
                //     // }
                // }
                this.callback(this.datakbm)
            }
        });
        
        //listener/event perubahan publikasi kelas
        let koleksiarraykelas = DOMTarget.querySelectorAll('input[name="koleksiarraykelas"]');//
        let koleksikelastertentu = DOMTarget.querySelectorAll('input[name="rombeltertentu"]');//
        koleksiarraykelas.forEach(n=>{
            n.onchange = ()=>{
                if(n.checked){
                    if( n.value == ""){
                        koleksikelastertentu.forEach(nn=>{
                            nn.removeAttribute('disabled');
                            nn.onchange = ()=>{
                                let ar = []
                                DOMTarget.querySelectorAll('input[name="rombeltertentu"]:checked').forEach(nc=>{
                                    ar.push(nc.value);
                                });
                                this.datakbm['arraykelas'] = ar.join(',');
                                this.callback(this.datakbm);
                            }
                        });
                        this.datakbm['arraykelas'] = this.koleksiRombel.join(',');
                        this.callback(this.datakbm);
                    }else{
                        koleksikelastertentu.forEach(nn=>{
                            nn.setAttribute('disabled',true);
                            nn.checked=true;;
                        });
                        this.datakbm['arraykelas'] = this.koleksiRombel.join(',');
                        this.callback(this.datakbm);
                    }
                }
            }
        });

    }

}