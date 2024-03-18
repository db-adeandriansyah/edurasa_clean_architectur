// import UrlImg from "../../controllers/UrlImg";
import { CollectionsEdu } from "../../models/CollectionsEdu";
import { FormatTanggal } from "../../utilities/FormatTanggal";

export default class OrmAbsen{
    constructor(absen,siswa,ormkaldik,UrlImg,iconhadir){
        this.absen = absen;//new CollectionsEdu(absen);//collection
        this.siswa = new CollectionsEdu(siswa); //collection
        this.ormkaldik = ormkaldik;
        this.UrlImg = UrlImg;
        this.rombel = '1A';
        this.jenjang = 1;
        this.curr_collectionAbsenJenjang = null;
        this.currentDataIndexAbsenByJenjang = -1;
        this.idimg_Hadir = iconhadir;
        this.idimg_Ijin = '1VOdeOa_vilNTwfGWn48VK56-v5IWzibb';
        this.idimg_Alpa = '1tDBZCBhUDs9eu3o9yc7FNImjPiHXKQR7';
        this.idimg_Sakit = '10sfjLCvGjOL0kG2sabg5OBQc8s3_JmNs';
        this.sorterSiswa_key = 'pd_nama';
        this.sorterSiswa_tipe = 'asc';
    }
    // this.icons = {
    //     'Hadir':this.setApp.logo,
    //     'bySiswa':this.setApp.logo,
    //     'Ijin':'https://lh3.googleusercontent.com/d/1VOdeOa_vilNTwfGWn48VK56-v5IWzibb',
    //     'Alpa':'https://lh3.googleusercontent.com/d/1tDBZCBhUDs9eu3o9yc7FNImjPiHXKQR7',
    //     'Sakit':'https://lh3.googleusercontent.com/d/10sfjLCvGjOL0kG2sabg5OBQc8s3_JmNs'
    // };

    settingKelas(rombel){
        this.rombel = rombel;
        this.jenjang = parseInt(rombel);
        
        let currentDataAbsenByJenjang = this.absen.filter(s=> s.jenjang == this.jenjang);
        
        this.curr_collectionAbsenJenjang  = new CollectionsEdu(currentDataAbsenByJenjang[0].data)
                                            .addProperty('idfileimg',(item)=>{
                                                    return new this.UrlImg(item.fileContent).urlImg
                                            });
        
        this.currentDataIndexAbsenByJenjang = this.absen.findIndex(s=> s.jenjang == this.jenjang);

        return this;
    }

    dataAbsenPerBulan(bulan, tagsabtu,tagEmot){
        let data = [];
        let kaldikbulanini = this.ormkaldik.dataTanggalan(bulan,tagsabtu);
        let floatNow = parseInt(new FormatTanggal(new Date()).stringYYYYMMDD());
        let judul = new FormatTanggal(bulan).MMMM() + ' '+ new FormatTanggal(bulan).YYYY();
        
            let rekapCountHadir = 0;
            let rekapCountSakit = 0;
            let rekapCountIjin  = 0;
            let rekapCountAlpa  = 0;
        this.datasiswaPadaBulanTertentu(bulan).forEach(siswa => {
                let obj={};
                obj.tokensiswa = siswa.id;
                obj.namasiswa = siswa.pd_nama;

                let arKaldik = [];
                let arIds = [];
                let rekap = [];
                let countHadir=0;
                let countIjin=0;
                let countSakit=0;
                let countAlpa=0;

            kaldikbulanini.forEach(n=>{
                let strkey = siswa.id  +'_'+n.keytgl;
                let floatTgl = parseInt(new FormatTanggal(new Date(n.tgl)).stringYYYYMMDD());
                let kehadiransiswa = this.curr_collectionAbsenJenjang.simpleFilter({'id':n.keytgl,'tokensiswa':siswa.id}).data;
                let objekkehadiran = {};
                let objekkehadiran_rekap = {};
                

                objekkehadiran.id = strkey;
                objekkehadiran.keytgl = n.keytgl;
                objekkehadiran_rekap.keytgl = n.keytgl;
                // objekkehadiran_rekap.token = siswa.id;
                // objekkehadiran_rekap.id = strkey;
                objekkehadiran.data = kehadiransiswa;
                let cekSiswaDiTglIni = this.cekUntilDate(siswa,n.tgl)
                objekkehadiran.statusDiTglIni = cekSiswaDiTglIni;
                
                if(!cekSiswaDiTglIni){
                    objekkehadiran.elemenImg="";
                }else{
                    if(floatNow < floatTgl){
                        objekkehadiran.elemenImg="";
    
                    }else{
                        if(kehadiransiswa.length == 0){
                            //dianggap hadir
                            objekkehadiran.elemenImg="";
                            if(!n.libur && n.he){
                                if(tagEmot){
                                    objekkehadiran.elemenImg=`&checkmark;`
                                }else{
                                    objekkehadiran.elemenImg=`<img data-imgabsen="${strkey}" data-edit="0" data-tgl="${n.tgl}" class="imgabsensiswa" src="${this.idimg_Hadir}" alt="hadir by default" style="width:20px; height:20px;cursor:pointer;object-fit: contain;"/><br>Hadir`
                                }
                                countHadir++;
                            };
                        }else {
                            let last_kehadiransiswa = kehadiransiswa[kehadiransiswa.length-1];
                            objekkehadiran.elemenImg="";
                            if(!n.libur && n.he){
                                if(tagEmot){
                                    objekkehadiran.elemenImg=`<span class="text-bg-${last_kehadiransiswa.kehadiran=='Hadir'?'dark':'danger'} p-1">${last_kehadiransiswa.kehadiran.substring(0,1)}</span>`;
                                }else{
                                    objekkehadiran.elemenImg=`<img data-imgabsen="${strkey}" data-edit="${last_kehadiransiswa.idbaris}" data-tgl="${n.tgl}" class="imgabsensiswa"  src="${last_kehadiransiswa.idfileimg}" alt="${last_kehadiransiswa.kehadiran}"  style="width:20px; height:20px;cursor:pointer;object-fit: contain;"/><br>${last_kehadiransiswa.kehadiran}`;
                                }

                                if(last_kehadiransiswa.kehadiran=='Hadir') countHadir++;
                                if(last_kehadiransiswa.kehadiran=='Sakit') countSakit++;
                                if(last_kehadiransiswa.kehadiran=='Ijin') countIjin++;
                                if(last_kehadiransiswa.kehadiran=='Alpa') countAlpa++;

                                
                            }
                        }
                    }

                }
                
                objekkehadiran_rekap.totalHadir = countHadir;
                objekkehadiran_rekap.totalSakit = countSakit;
                objekkehadiran_rekap.totalIjin = countIjin;
                objekkehadiran_rekap.totalAlpa = countAlpa;
                
                objekkehadiran.totalHadir = countHadir;
                objekkehadiran.totalSakit = countSakit;
                objekkehadiran.totalIjin = countIjin;
                objekkehadiran.totalAlpa = countAlpa;
                arKaldik.push(Object.assign({},objekkehadiran,n));
                arIds.push(objekkehadiran);
                rekap.push(objekkehadiran_rekap)

            });
            
            obj.data = arKaldik;
            obj.data_rekap=rekap;

            obj.Hadir = countHadir;
            obj.Sakit = countSakit;
            obj.Ijin = countIjin;
            obj.Alpa = countAlpa;

            rekapCountHadir = countHadir;
            rekapCountSakit = countSakit;
            rekapCountIjin  = countIjin;
            rekapCountAlpa  = countAlpa;

            data.push(obj);
        });
        let rekapRoot =[];
        
        kaldikbulanini.forEach(n=>{
            let floatTgl = parseInt(new FormatTanggal(new Date(n.tgl)).stringYYYYMMDD());
            let objekrekap={};
            objekrekap.id = n.keytgl;
            objekrekap.string =  n.tgl;
            objekrekap.atribute = n.atribute;
            objekrekap.title = n.title;
            objekrekap.hariefektif = n.he;
            objekrekap.hariefektifjalan = n.heJalan;
            objekrekap.hasbatas = n.hasBatas;
            /**
             * obj.he = tagHe;
            obj.heJalan = tagHeJalan;
            obj.hasBatas =hasBatas
            obj.heb = tagHeb;
             */
            // objekrekap.isLibur= this.cekboolean(n.libur);
            objekrekap.isLibur= n.libur;
            objekrekap.isHe= n.he;

            objekrekap.Alpa = this.curr_collectionAbsenJenjang.simpleFilter({'id':n.keytgl,'kehadiran':'Alpa'}).exceptFilter({'hapus':''}).countData();
            objekrekap.Ijin = this.curr_collectionAbsenJenjang.simpleFilter({'id':n.keytgl,'kehadiran':'Ijin'}).exceptFilter({'hapus':''}).countData();
            objekrekap.Sakit = this.curr_collectionAbsenJenjang.simpleFilter({'id':n.keytgl,'kehadiran':'Sakit'}).exceptFilter({'hapus':''}).countData();
            if(floatNow < floatTgl){
                objekrekap.isLibur=true;
                objekrekap.isHe=false;
                objekrekap.Alpa = "";
                objekrekap.Ijin = "";
                objekrekap.Sakit = "";
                
            }else{
                if(!n.libur && n.he){
                    objekrekap.Alpa = this.curr_collectionAbsenJenjang.simpleFilter({'id':n.keytgl,'kehadiran':'Alpa',kelas:this.rombel}).exceptFilter({'hapus':''}).countData();
                    objekrekap.Ijin = this.curr_collectionAbsenJenjang.simpleFilter({'id':n.keytgl,'kehadiran':'Ijin',kelas:this.rombel}).exceptFilter({'hapus':''}).countData();
                    objekrekap.Sakit = this.curr_collectionAbsenJenjang.simpleFilter({'id':n.keytgl,'kehadiran':'Sakit',kelas:this.rombel}).exceptFilter({'hapus':''}).countData();
                    
                }else{
                    objekrekap.Alpa = "";
                    objekrekap.Ijin = "";
                    objekrekap.Sakit = ""
                };
            }
            rekapRoot.push(objekrekap);
            
            
        })

        return {dataabsen:data,datakalender:kaldikbulanini,judul:judul,tgl:bulan,rekapRoot:rekapRoot};
    }
    dataAbsenPerSemester(bulanSemester,tagsabtu){
        let dataSiswa = this.currentRombel;
        let dataTanggalSemester = this.ormkaldik.dataSemesteran(bulanSemester, tagsabtu).filter(s=>s.he ==true);
        let dataResult = [];
        // let curDataAbsTest = this.curr_collectionAbsenJenjang.simpleFilter({kelas:this.rombel}).data;//.simpleFilter({'tokensiswa':db.id,'id':idTgl}).data;
        
        dataSiswa.forEach(db=>{
            let obj = {};
            obj.id  = db.id;
            obj.pd_nama = db.pd_nama;
            let arTag = [];
            let rekapHadir = 0;
            let rekapSakit = 0;
            let rekapIjin = 0 ;
            let rekapAlpa  = 0;
            dataTanggalSemester.forEach(t=>{
                let idTgl = new FormatTanggal(t.tgl).idStringAbsen();
                let curDataAbs = this.curr_collectionAbsenJenjang.data.filter(s=>s.id==idTgl && s.tokensiswa == db.id);
                if(curDataAbs.length>0){
                    if(curDataAbs[0].kehadiran == 'Hadir'){
                        rekapHadir++;
                    }else if(curDataAbs[0].kehadiran == 'Sakit'){
                        rekapSakit++;
                    }else if(curDataAbs[0].kehadiran == 'Ijin'){
                        rekapIjin++;
                    }else if(curDataAbs[0].kehadiran == 'Alpa'){
                        rekapAlpa++;
                    }
                    
                }
                arTag.push(t);
            });
            obj.idTgl = arTag;
            // obj.curDataAbs = curDataAbs;
            let abs =  (dataTanggalSemester.length -(rekapAlpa+rekapSakit+rekapIjin));
            let cPer = (abs*100/dataTanggalSemester.length).toFixed(2)+'%'
            obj.rekapAlpa = rekapAlpa;
            obj.rekapSakit = rekapSakit;
            obj.rekapIjin = rekapIjin;
            obj.rekapHadir = abs;//(dataTanggalSemester.length -(rekapAlpa+rekapSakit+rekapIjin));//rekapHadir;
            obj.hariEfektif = dataTanggalSemester.length;
            obj.persenKehadiran = cPer;
            dataResult.push(obj);
            
        })
        return dataResult

    }
    datasiswaPadaBulanTertentu(tgl){;
        let d = new Date(tgl);
        let last = new FormatTanggal(tgl).lastTgl();
        let m = d.getMonth();
        let y = d.getFullYear();
        let tglAwal = new Date(y,m,1);
        let tglAkhir = new Date(y,m,last);
        let startTimestamp = parseInt(new FormatTanggal(tglAwal).stringYYYYMMDD());
        let endTimestamp = parseInt(new FormatTanggal(tglAkhir).stringYYYYMMDD());
        let siswa = this.siswa.customFilter((item)=>{
            let itemStartDate = item.masuk_tgl ==""?0: parseInt(new FormatTanggal(item.masuk_tgl).stringYYYYMMDD());
            let itemEndDate = item.keluar_tgl == ""?parseInt(new FormatTanggal(new Date(new Date().setFullYear(y+1))).stringYYYYMMDD()):parseInt(new FormatTanggal(item.keluar_tgl).stringYYYYMMDD());
        
            return (
                        (
                            (startTimestamp >= itemStartDate && startTimestamp <= itemEndDate) ||
                            (endTimestamp >= itemStartDate && endTimestamp <= itemEndDate) ||
                            (itemStartDate >= startTimestamp && itemStartDate <= endTimestamp) ||
                            (itemEndDate >= startTimestamp && itemEndDate <= endTimestamp)
                        ) && item.nama_rombel == this.rombel 
                    )
                        

        }).sortByProperty(this.sorterSiswa_key,this.sorterSiswa_tipe).data;
        
        return siswa;

    }
    sortirSiswaByKey(key,typesort='desc'){
        
        this.sorterSiswa_key = key
        this.sorterSiswa_tipe = typesort
    
        return this;
    }
    get currentRombel(){
        return this.siswa.simpleFilter({'nama_rombel':this.rombel,'aktif':'aktif'}).sortByProperty(this.sorterSiswa_key,this.sorterSiswa_tipe).data;
    }
    loopingSemester_dataAbsenPerBulan(bulanawal, tagsabtu,tagEmot){
        let first = new Date(bulanawal)
        let last = new Date(bulanawal);
        last.setMonth(last.getMonth()+6);
        last.setDate(0);
        
        const dataKalender = [];
        // detectedKaldik = [];
        let currentDate = first;
    
        while (currentDate <= last) {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();// + 1;
            const date = currentDate.getDate();
            const day = currentDate.getDay();
            let bulan = new Date(year,month,date);
            let cekdata = this.dataAbsenPerBulan(bulan, tagsabtu,tagEmot);
            dataKalender.push(cekdata);
            currentDate.setMonth(currentDate.getMonth() + 1);
        };
        return dataKalender;
    }
    siswaUntilDate(refStartDate){
        
        return this.siswa.simpleFilter({'nama_rombel':this.rombel}).sortByProperty(this.sorterSiswa_key,this.sorterSiswa_tipe).data.filter(s=>{
            let checkIn     = s.masuk_tgl ==""?0:parseInt(new FormatTanggal(s.masuk_tgl).stringYYYYMMDD());
            let checkOut    = s.keluar_tgl ==""?parseInt(new FormatTanggal(new Date()).stringYYYYMMDD())+1000000:parseInt(new FormatTanggal(s.keluar_tgl).stringYYYYMMDD());
            let r1    = parseInt(new FormatTanggal(refStartDate).stringYYYYMMDD()); //R1
            
            return (checkIn <= r1 && checkOut >r1)
        })
    }
    filterDataByBetweenDate(startDate, endDate, data) {
        const filteredData = data.filter(item => {
        const itemStartDate = new Date(item.masuk_tgl).getTime();
        const itemEndDate = new Date(item.keluar_tgl).getTime();
        const startTimestamp = new Date(startDate).getTime();
        const endTimestamp = new Date(endDate).getTime();
    
        return (startTimestamp >= itemStartDate && startTimestamp <= itemEndDate) ||
            (endTimestamp >= itemStartDate && endTimestamp <= itemEndDate) ||
            (itemStartDate >= startTimestamp && itemStartDate <= endTimestamp) ||
            (itemEndDate >= startTimestamp && itemEndDate <= endTimestamp);
        });
        
        return filteredData;
    }
    cekUntilDate(s,refStartDate){
        
        // return Object.entries(data).filter(([s,k])=>{
            let checkIn     = s.masuk_tgl ==""?0:parseInt(new FormatTanggal(s.masuk_tgl).stringYYYYMMDD());
            let checkOut    = s.keluar_tgl ==""?parseInt(new FormatTanggal(new Date()).stringYYYYMMDD())+1000000:parseInt(new FormatTanggal(s.keluar_tgl).stringYYYYMMDD());
            let r1    = parseInt(new FormatTanggal(refStartDate).stringYYYYMMDD()); //R1
            
            return (checkIn <= r1 && checkOut >=r1)
        // })
    }
    cekboolean(bol){
        if(typeof bol === 'boolean'){
            return bol;
        }else if(typeof bol == 'string'  || bol instanceof String){
            if(bol == 'TRUE' || bol =='true'){
                return true;
            }else{
                return false;
            }
        };
        
    }
    siswaByBetweenCheckinCheckout(refStartDate, refEndDate){
        return this.siswa.simpleFilter({'nama_rombel':this.rombel}).sortByProperty(this.sorterSiswa_key,this.sorterSiswa_tipe).data.filter(s=>{
            let checkIn     = s.masuk_tgl ==""?0:parseInt(new FormatTanggal(s.masuk_tgl).stringYYYYMMDD());
            let checkOut    = s.keluar_tgl ==""?parseInt(new FormatTanggal(new Date()).stringYYYYMMDD())+1:parseInt(new FormatTanggal(s.keluar_tgl).stringYYYYMMDD());

            let r1    = parseInt(new FormatTanggal(refStartDate).stringYYYYMMDD()); //R1
            let r2      = parseInt(new FormatTanggal(refEndDate).stringYYYYMMDD());//R2
            return  (checkIn < r1 && checkOut == r1)||
                    (checkIn < r1 && checkOut >= r2)||
                    (checkIn >=r1 && checkIn <= r2 && checkOut >= r2) ||
                    (checkIn >=r1 && checkIn <= r2 && checkOut <= r2) 
        })
    }
    
    get kodehariini(){
        return new FormatTanggal(new Date()).idStringAbsen();
    }
    
    get tesSiswarombel(){
        return this.siswa.siswaRombel;
    }

    get currentRombelHariIni(){
        
        return this.curr_collectionAbsenJenjang.simpleFilter({'kelas':this.rombel,id:this.kodehariini}).data ;//this.siswa.simpleFilter({'nama_rombel':this.rombel,'aktif':'aktif'}).data;
    }

}