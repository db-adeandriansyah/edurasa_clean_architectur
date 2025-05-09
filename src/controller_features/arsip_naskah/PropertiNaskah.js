

import { FormatTanggal } from "../../utilities/FormatTanggal";


export default class PropertiNaskah{
    #dom;
    constructor(dbsoal){
        
        this.dbsoal = dbsoal;
        this.ormkurikulum = [];//ormkurikulum;
        this.#dom = null;
        this.owner = {};
        this.mapelAplikasi = {};
        this.desain={
            "judulnaskah"       : "",
            "kelas"             : '',
            "start_waktu"       : '',//"2024-05-14T23:11"
            "end_waktu"         : '',
            "kopsoal"           : false,
            "identitassoal"     : false,
            "tabelnilai"        : false,
            "petunjukumum"      : false,
            "mapel"             : "",
            "tekskodemapel"     : "",
            "petunjuknilai"     : false,
            "penomoransoal"     : false,
            "propertikd"        : [],
            "kerangka"          : [],//{ "bentuksoal": "Pilihan Ganda", "jumlah": "2" },
            "namakurikulum"     : "kurmer",//kurmer|kurtilas
            "mapeltema"         : [],//"PKN", "BINDO", "MTK", "SBDP", "PJOK",
            "jenjang"           : "",
            "isUN"              : false
        }
    }
    
    set domNaskah(x){
        this.dom = x;
    }   
    get domNaskah(){
        return this.dom;
    }
    // get currentMapelOnClassRoom(){
    //     let tinggiRendah = this.desain.jenjang>3?'tinggi':'rendah';;
    //     let teks = 'mapel'+this.desain.namakurikulum + tinggiRendah;;
        
    //     return  this.mapelAplikasi[teks]();
        
    // } 
    set currentMapelOnClassRoom(x){
                
        this.mapelAplikasi = x;
        return this;
    }
    get currentMapelOnClassRoom(){
                
        return  this.mapelAplikasi
    }
    get titlemapel(){
        if(this.desain.mapel.indexOf('Tema ')>-1 || this.desain.mapel.indexOf('TEMA ')>-1){
            
            return this.desain.mapel;
        }else{
            return this.desain.tekskodemapel;

        }
    }
    tapelnaskah(date){ //2023/2024
        let d = new Date(date);
        let m = d.getMonth();
        let y = d.getFullYear();
        let y_awal  ='';
        let y_akhir ='';

        if(m>5){
            y_awal = y;
            y_akhir= y+1;
        }else{
            y_awal = y-1;
            y_akhir= y;
        }
        
        return y_awal+'/'+y_akhir;
    }
    semesternaskah(date,withtext=false){
        let d = new Date(date);
        let m = d.getMonth();
        
        if(m>5){
            if(withtext){
                return `1 (Ganjil)`;
            }else{
                return 1;
            }
        }else{
            if(withtext){
                return `2 (Genap)`;
            }else{
                return 1;
            }
        }
    }
    desainFromPraDesain(desain,user){
        this.desain = Object.assign({},desain);
        this.owner = user;
        this.domNaskah = document.getElementById('printarea');
        return this;
    }
    propertiByData(data){
        let result = {
            propertikd          : [],
            kerangka            : [],
            penomoransoal       : false,
        };
        let propertikd = [];
        Object.entries(data).filter(([k,v])=>k.indexOf('no_')>-1).forEach(([kk,vv])=>{
            if(data.kurikulum=='kurmer'){

            }else{

            }
        })



    }
    desainFromSpreadSheet(data,user){
        this.desain.namakurikulum = data.kurikulum;

        let datadom={
            "idbaris"           : data.idbaris,
            "kop"               : data.kop,
            "judulnaskah"       : data.juduldesain,
            "kelas"             : data.jenjang,
            "start_waktu"       : new Date(data.waktu2),//"2024-05-14T23:11"
            "end_waktu"         : new Date(data.waktu2_end),
            "kopsoal"           : this.domNaskah.querySelector('#naskah_kop')?true:false,
            "identitassoal"     : this.domNaskah.querySelector('#naskah_identitas')?true:false,
            "tabelnilai"        : this.domNaskah.querySelector('#naskah_tabelnilai')?true:false,
            "petunjukumum"      : this.domNaskah.querySelector('#naskah_petunjukumum')?true:false,
            "mapel"             : data.mapel,
            "tekskodemapel"     : this.currentMapelOnClassRoom[data.mapel],
            "petunjuknilai"     : this.domNaskah.querySelector('#naskah_sebarankd')?true:false,//naskah_sebarankd
            "penomoransoal"     : false,
            "propertikd"        : data.propertikurikulum,
            "kerangka"          : data.kerangka,//[{ "bentuksoal": "Pilihan Ganda", "jumlah": "2" }],//{ "bentuksoal": "Pilihan Ganda", "jumlah": "2" },
            "namakurikulum"     : data.namakurikulum,//kurmer|kurtilas
            "mapeltema"         : [],//"PKN", "BINDO", "MTK", "SBDP", "PJOK",
            "jenjang"           : data.jenjang,
            "isUN"              : data.ujiansekolah==''?false:data.ujiansekolah,
        }
        this.desain = Object.assign(this.desain,datadom);
        this.owner = user;
        return this;
    }
    desainFromSpreadSheetKBM(data,user){
        

        let datadom={
            // "idbaris"           : data.obj_desainnaskah[0].idbaris,
            // "kop"               : data.obj_desainnaskah[0].kop,
            // "judulnaskah"       : data.obj_desainnaskah[0].juduldesain,
            // "kelas"             : data.obj_desainnaskah[0].jenjang,
            "start_waktu"       : new Date(data.idtgl),//"2024-05-14T23:11"
            "end_waktu"         : new Date(data.idtglend),
            "kopsoal"           : this.domNaskah.querySelector('#naskah_kop')?true:false,
            "identitassoal"     : this.domNaskah.querySelector('#naskah_identitas')?true:false,
            "tabelnilai"        : this.domNaskah.querySelector('#naskah_tabelnilai')?true:false,
            "petunjukumum"      : this.domNaskah.querySelector('#naskah_petunjukumum')?true:false,
            // "mapel"             : data.obj_desainnaskah[0].mapel,
            // "tekskodemapel"     : this.currentMapelOnClassRoom[data.obj_desainnaskah[0].mapel],
            "petunjuknilai"     : this.domNaskah.querySelector('#naskah_sebarankd')?true:false,//naskah_sebarankd
            "penomoransoal"     : false,
            // "propertikd"        : data.propertikurikulum,
            // "kerangka"          : data.obj_desainnaskah[0].kerangka,//[{ "bentuksoal": "Pilihan Ganda", "jumlah": "2" }],//{ "bentuksoal": "Pilihan Ganda", "jumlah": "2" },
            "namakurikulum"     : 'kurmer',
            "mapeltema"         : [],//"PKN", "BINDO", "MTK", "SBDP", "PJOK",
            "jenjang"           : data.idtoken,
            "isUN"              : data.ujiansekolah==''?false:data.ujiansekolah,
        }
        this.desain = Object.assign(this.desain,datadom);
        this.owner = user;
        return this;
    }
    muatanPelajaranNaskah(judul){
        let muatan = '';
        let datasoaldom = this.datasoaldaridom().datasoal;
        let onlyHasSoal = datasoaldom.filter(s=>s.hassoal);
        let mapingMapel = [...new Set(onlyHasSoal.map(n=>n.kodemapel))];
        
        if(judul.indexOf('Tema ')>-1 || judul.indexOf('TEMA ')>-1){
            muatan = this.desain.mapel;
            muatan += `<br/>`;
            muatan +=mapingMapel.join(', ');
            // if(this.desain.mapeltema){
            //     muatan += this.desain.mapeltema.join(', ');
            // }else{
            //     if(parseInt(this.desain.kelas)>3){
            //         muatan+=`(PKN, BINDO, IPA, IPS, SDBP)`;
            //     }else{
            //         muatan+=`(PKN, BINDO, MTK, SBDP, PJOK)`;
            //     }
            // }
        }else{
            muatan = this.desain.tekskodemapel;
        }
        return muatan;
    }
    jumlahsoal(){
        let mapingjumlah = this.desain.kerangka.map(n=>parseInt(n.jumlah));
        return mapingjumlah.reduce((a,b)=>a+b);
    }
    jumlahsoalByDom(){
        let mapingjumlah = this.desain.kerangka.map(n=>parseInt(n.jumlah));
        return mapingjumlah.reduce((a,b)=>a+b);
    }
    rincianjumlahsoalnaskahByDom(){
        let teks = '';
        this.desain.kerangka.forEach(n=>{
            teks+=n.bentuksoal;
            teks+=' = ';
            teks+=n.jumlah;
            teks+=` soal<br/>`;
        })
        return teks;

    }
    rincianjumlahsoalnaskah(){
        let teks = '';
        this.desain.kerangka.forEach(n=>{
            teks+=n.bentuksoal;
            teks+=' = ';
            teks+=n.jumlah;
            teks+=` soal<br/>`;
        })
        return teks;

    }
    identitaskisikisi(){

        return {
            'toptitle'          : this.desain.judulnaskah,
            'mapel'             : this.titlemapel,
            'jenjang'           : 'Sekolah Dasar',
            'tapel'             : this.tapelnaskah(this.desain.start_waktu),
            'kelas_semester'    : this.desain.kelas +'/'+this.semesternaskah(this.desain.start_waktu,true),
            'kurikulum'         : this.desain.namakurikulum,//=='kurmer'?'Kurikulum Merdeka':'Kurikulum 2013',
            'muatanpelajaran'   : this.muatanPelajaranNaskah(this.desain.mapel),
            'penyusun'          : this.owner.namaUser,
            'pelaksanaan'       : new Date(this.desain.start_waktu).toLocaleString('id-ID',{dateStyle:'full'}),
            'alokasiwaktu'      : FormatTanggal.durasiMenit(this.desain.start_waktu,this.desain.end_waktu)+' Menit',
            'jumlahsoal'        : this.jumlahsoal()+' soal',
            'rincianjumlahsoal' : this.rincianjumlahsoalnaskah()
        }
    }
    datasoaldaridom(){
        let tbody =  this.domNaskah.querySelector('#tabelkontendesainnaskah_dariserver > tbody');
        let arraysoal = [];
        let arraynaskah = [];
        if(tbody){
            let tr = tbody.querySelectorAll('tr');
            for(let i =0 ; i < tr.length ; i++){
                let td =tr[i].cells;
                if(td.length>1){
                    let obj = {};
                    let sel = td[1];
                    let bentuksoal = sel.getAttribute('data-bentuksoal');
                    obj.nobybentuk = sel.getAttribute('data-nobybentuk')??false;
                    obj.bentuksoal = sel.getAttribute('data-bentuksoal')??false;
                    obj.nosoal = sel.getAttribute('data-nosoal')??false;
                    obj.hassoal = false;
                    let singleSel = {};
                        singleSel.type="konten";
                        singleSel.content = false
                        
                    if(sel.hasAttribute('data-simpanannaskahguru')){
                        let idsoal = sel.getAttribute('data-simpanannaskahguru');
                        let itemsoal = this.dbsoal.filter(s=>s.idbaris == idsoal)[0];
                        let kd = itemsoal.kd;
                        let mapel = itemsoal.kodemapel;
                        let kurikulum = {};
                        
                        if(this.desain.namakurikulum == 'kurmer'){
                            kurikulum = this.desain.propertikd.filter(s=> s.idbaris == kd)[0];
                        }else{
                            kurikulum = this.desain.propertikd.filter(s=>s.kd3  == kd && s.mapel == mapel)[0]
                        }
                        obj.nobybentuk = sel.getAttribute('data-nobybentuk');
                        obj.bentuksoal = sel.getAttribute('data-bentuksoal');
                        obj.nosoal = sel.getAttribute('data-nosoal');
                        // obj.hassoal = false;
    
                        obj.namakurikulum = this.desain.namakurikulum;
                        obj.kodemapel = mapel;
                        obj.itemsoal = itemsoal;
                        obj.td = sel.outerHTML;
                        obj.propertikurikulum = kurikulum;
                        obj.hassoal = true;
                        obj.idsoal = idsoal;
                        obj.ilustrasi = Boolean(sel.getAttribute('data-ilustrasi'));
                        obj.banyakjodoh = 0;
                        if(bentuksoal=='Menjodohkan'){
                            obj.banyakjodoh = sel.getAttribute('data-banyakjodoh');
                        }else if(bentuksoal == 'Pilihan Ganda'){
                            if(sel.hasAttribute('data-tampilanpg')){
                                obj.tampilanpg=sel.getAttribute('data-tampilanpg');
                            }else{
                                obj.tampilanpg='vertical';
                            }
                        }
                        singleSel.content = true;
                        arraynaskah.push(Object.assign({},singleSel,obj));
                    }else{
                        arraynaskah.push(Object.assign({},singleSel,obj));
                    }
    
                    if(bentuksoal){
                        arraysoal.push(obj);
                    }
    
                }else{
                    let singleSel= {};
                    singleSel.hassoal = false;
                    singleSel.type="sparator";
                    singleSel.content = td[0].innerHTML;
                    arraynaskah.push(singleSel);
    
                }
            }
        }

        return {datasoal:arraysoal,datanaskah:arraynaskah};
    }
    generateDataKisikisi(){
        let datasoaldom = this.datasoaldaridom().datasoal;
        
        let isKurmer = (this.desain.namakurikulum == 'kurmer');
        let onlyHasSoal = datasoaldom.filter(s=>s.hassoal);
        let mapingMapel = [...new Set(onlyHasSoal.map(n=>n.kodemapel))];
        let arrayResult = [];
        mapingMapel.forEach(n=>{
            
            let itemsSoalCurrentMapel = onlyHasSoal.filter(s=>s.kodemapel == n);
            let itemsKds = []; 
            let objmapel = {};
            let arraysoal = [];
            if(isKurmer){
                itemsKds =  [...new Set(itemsSoalCurrentMapel.map(n=>n.propertikurikulum.idbaris))];
                // itemsKds =  [...new Set(itemsSoalCurrentMapel.map(n=>n.propertikurikulum.foreignkey_elemencp))];
                itemsKds.forEach(id=>{
                    let objsoal = {};
                    let iSoal = itemsSoalCurrentMapel.filter(s=>s.propertikurikulum.idbaris == id && s.kodemapel == n);
                    // let iSoal = itemsSoalCurrentMapel.filter(s=>s.propertikurikulum.foreignkey_elemencp == id && s.kodemapel == n);
                    objsoal.titleproperti ='Capaian Pembelajaran';
                    objsoal.objekproperti = iSoal[0].propertikurikulum;
                    objsoal.arraysoal = iSoal;
                    objsoal.totalsoalkdcp = iSoal.length;
                    arraysoal.push(objsoal);
                });
                
            }else{
                itemsKds =  [... new Set(itemsSoalCurrentMapel.map(nn=>nn.propertikurikulum.baris))];
                
                itemsKds.forEach(id=>{
                    let objsoal = {};
                    let iSoal = itemsSoalCurrentMapel.filter(s=>s.propertikurikulum.baris == id && s.kodemapel == n);
                    
                    objsoal.titleproperti ='Kompetensi Dasar';
                    objsoal.objekproperti = iSoal[0].propertikurikulum;
                    objsoal.arraysoal = iSoal;
                    objsoal.totalsoalkdcp = iSoal.length;
                    arraysoal.push(objsoal);
                });
            }


            objmapel.kodemapel = n
            // objmapel.tekskodemapel = itemsSoalCurrentMapel[0].propertikurikulum.kodemapel_teks;
            objmapel.tekskodemapel = this.currentMapelOnClassRoom[n];
            objmapel.totalsoal = itemsSoalCurrentMapel.length;
            objmapel.data = arraysoal;
            objmapel.kurikulum = this.desain.namakurikulum;
            arrayResult.push(objmapel);

        });
        return arrayResult;
    }
    datakisikisi(){
        return {
            'identitas':this.identitaskisikisi(),
            'generate':this.generateDataKisikisi(),
            'datadom':this.datasoaldaridom()
            
        }
    }
    
    ketersedianElemenNaskahHtml(){
        const {kopsoal,identitassoal,petunjukumum,petunjuknilai,tabelnilai,namakurikulum}=this.desain;
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
    pelaksanaanNaskahHtml(){
        const desain = this.desain;
        let pelaksanaan = {
            'start_waktu':new FormatTanggal(desain.start_waktu).stringForDateTimeLocal(),
            'end_waktu':new FormatTanggal(desain.end_waktu).stringForDateTimeLocal(),
            'durasi':FormatTanggal.durasiMenit(desain.start_waktu,desain.end_waktu),
            'crtToken':new FormatTanggal(desain.start_waktu).idStringAbsen()
        }
        return pelaksanaan;
    }
    ObjekSebaranKDdanSoalnya(){
        let kisikisiByNaskah = this.generateDataKisikisi();//.datakisikisi().generate;
        let result = {};
        kisikisiByNaskah.forEach(n=>{
            let mapel = n.kodemapel; //kodemapel
            let kd = n.data; // array;
            
            kd.forEach(kd=>{
                let mapel_kd = mapel;
                let propertikurikulum = kd.objekproperti;
                    mapel_kd = mapel+'_'+propertikurikulum.idbaris;
                
                result[mapel_kd] = kd.arraysoal.map(n=>n.nosoal);
            })

        })
        return result;
    }
    kuncipg(datasoal){
       
        return datasoal.filter(s=> s.bentuksoal == 'Pilihan Ganda').map(n=>n.nosoal+n.itemsoal.kuncijawaban);

    }
        
}