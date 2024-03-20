import { CollectionsEdu } from "../../models/CollectionsEdu";
import { FormatTanggal } from "../../utilities/FormatTanggal";

export default class OrmKaldik{
    constructor(dbkaldik){
        this.kaldik = new CollectionsEdu(dbkaldik); // array objek data tab kalender;
        this.namahari = [ 'Mg','Sn','Sl','Rb','Km','Jm','Sb']
    }
    init(){
        this.kaldik = this.kaldik
            .sortByProperty('start_tgl','asc')
            // .setProperty('strat_tgl',(item)=>new FormatTanggal(item.start_tgl).valueInputDate())
            // .setProperty('str_tgl',(item)=>new FormatTanggal(item.start_tgl).valueInputDate())
            .addProperty('mulai',(item)=>new FormatTanggal(item.start_tgl).formatMedium())
            .addProperty('akhir',(item)=>new FormatTanggal(item.end_tgl).formatMedium())
            .addProperty('teks_libur',(item)=>this.cekboolean(item.libur)?'YA':'TIDAK')
            .addProperty('teks_he',(item)=>this.cekboolean(item.he)?'YA':'TIDAK')
            .addProperty('teks_heb',(item)=>this.cekboolean(item.heb)?'YA':'TIDAK')
            .addProperty('html_contohwarna',(item)=>`<div style="background-color:${item['background-color']};color:${item.color}" class="container border rounded-pill">Tgl</div>`)
            .addProperty('aksi',(item)=>{
                let html ="";
                html+=`<button data-id="${item.idbaris}" class="btn btn-sm text-bg-warning me-1 font10 py-0" data-aksi="edit" data-bs-title="Edit tanggal" data-bs-toggle="tooltip"><i class="bi-pencil"></i></button>`;
                //<button id="48" class="btn btn-sm text-bg-danger me-1 font10 py-0" data-aksi="hapus" data-bs-title="Hapus" data-bs-toggle="tooltip"><i class="bi-trash"></i></button>
                html+=`<button data-id="${item.idbaris}" class="btn btn-sm text-bg-danger me-1 font10 py-0" data-aksi="hapus" data-bs-title="Hapus" data-bs-toggle="tooltip"><i class="bi-trash"></i></button>`;
                return html;
            })
            .addProperty('durasi',(item)=>{
                return FormatTanggal.durasi(item.start_tgl, item.end_tgl);
            })
            .addProperty('valueinput_strt_tgl',(item)=>new FormatTanggal(item.start_tgl).valueInputDate())
            .addProperty('keterangan_tanggal',(item)=>{
                let teks = "";
                
                let awal = new Date(item.start_tgl);
                let awal_tgl = awal.getDate();
                let awal_bulan = awal.getMonth();
                let awal_bulan_teks = new Intl.DateTimeFormat( 'id-ID', { month:'short'}).format(awal);

                let awal_tahun= awal.getFullYear();
                let akhir = new Date(item.end_tgl);
                let akhir_tgl = akhir.getDate();
                let akhir_bulan = akhir.getMonth();
                let akhir_bulan_teks = new Intl.DateTimeFormat( 'id-ID', { month:'short'}).format(akhir);
                
                let akhir_tahun = akhir.getFullYear();
                if(item.durasi >1){
                    if(akhir_tahun == awal_tahun){
                        if(awal_bulan == akhir_bulan){
                            teks = awal_tgl;
                            teks+='-';
                            teks+= akhir_tgl;
                            teks += ' ';
                            teks +=awal_bulan_teks;
                            teks += ' ';
                            teks+= akhir_tahun;
                        }else{
                            teks = awal_tgl ;
                            teks +=` ${awal_bulan_teks} s/d ${akhir_tgl} ${akhir_bulan_teks} ${akhir_tahun}`; 


                        }
                    }else{
                        teks =  new FormatTanggal(item.start_tgl).formatShort();
                        teks+=` s/d `;
                        teks +=  new FormatTanggal(item.end_tgl).formatShort();
                    
                    }
                }else{
                    teks = new FormatTanggal(item.start_tgl).formatMedium();
                }
                return teks;
            })
            // .addProperty('float_tgl',(item)=>parseInt(new FormatTanggal(item.start_tgl).stringYYYYMMDD()))
            // .sortByProperty('float_tgl','asc');
        return this;

    }
    reInstansiance(dbkaldik){
        let instans = new OrmKaldik(dbkaldik).init();
        return instans;
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

    dataTanggalan(namabulan,tagSabtu=false){ // '2024-01-01'
        let date = new Date(namabulan);
        let m = date.getMonth();
        let y = date.getFullYear();
        let countDayInMonth = new FormatTanggal(namabulan).lastTgl();
        let floatNow = parseInt(new FormatTanggal(new Date()).stringYYYYMMDD());
        let data = [];
        [...Array(countDayInMonth)].forEach((_,index)=>{
            let d = new Date(y,m,(index+1));
            let hari = d.getDay();
            let floatTgl = parseInt(new FormatTanggal(d).stringYYYYMMDD());
            let obj = {};

            obj.tgl_hari = `${(index+1)}<br>${this.namahari[hari]}`;
            obj.tgl = new FormatTanggal(d).valueInputDate();
            obj.keytgl = new FormatTanggal(d).idStringAbsen();
            obj.atribute ={class:'text-capitalize'};
            let tagHe=true, tagHeb=true, tagLibur = false;
            let tagHeJalan = true;
            if(hari == 0 ||(hari == 6 && tagSabtu)){
                obj.atribute={class:'text-bg-danger text-capitalize'};
                tagHe=false;
                tagHeJalan=false
                tagHeb = false;
                tagLibur = true;
            }
            obj.title = false;
            // let cek = this.kaldik.data.filter((item)=>{
            //         const startDate = new Date(item.start_tgl).getTime();
            //         const endDate = new Date(item.end_tgl).getTime();
            //         const target = d.getTime();
            //         return target >= startDate && target <= endDate;
            // });
            let cek = this.isExist(d);
            if(cek.length>0){
                if(cek.length ==1){
                    let bg = `background-color:${cek[0]['background-color']};color:${cek[0].color}!important`;
                    obj.atribute={'style':bg,class:'text-capitalize'};
                    obj.title = cek[0].keterangan;
                    tagHe = this.cekboolean(cek[0].he);
                    tagHeJalan = this.cekboolean(cek[0].he);
                    tagHeb = this.cekboolean(cek[0].heb);
                    tagLibur = this.cekboolean(cek[0].libur);
                    
                }else{
                    let color = [];
                    let title = [];
                    let arHe = [], arHeb=[], arLibur=[];
                    cek.forEach(it=> {
                        color.push(it['background-color']);
                        title.push(it.keterangan);
                        arHe.push(this.cekboolean(it.he))
                        arHeb.push(this.cekboolean(it.heb))
                        arLibur.push(this.cekboolean(it.libur))
                    });
                    obj.arHe = arHe;
                    obj.arHeb = arHeb;
                    obj.arLibur = arLibur;
                    obj.title = title.join(', ');
                    tagHe = arLibur.some(n=>n===true)?false:arHe.some(s=>s==true);
                    tagHeJalan = arLibur.some(n=>n===true)?false:arHe.some(s=>s==true);;
                    tagHeb = arLibur.some(n=>n===true)?false:arHeb.some(s=>s==true);;
                    tagLibur = arLibur.some(n=>n===true);
                    let bg = `background:linear-gradient(-45deg,${color.join(',')});color:red`;
                    obj.atribute={'style':bg,class:'text-capitalize'};
                }
            }

            //hapus semua atribut jika tanggal belum terjadi;
            let hasBatas = false;
            if(floatNow < floatTgl){
                obj.atribute = {style:'background-color:#ddd',class:'text-capitalize'};
                tagHeJalan = false;
                hasBatas = true;
            }
            obj.he = tagHe;
            obj.heJalan = tagHeJalan;
            obj.hasBatas =hasBatas
            obj.heb = tagHeb;
            obj.libur = tagLibur;
            data.push(obj);
        });
        return data;
    }

    dataSemesteran(bulanawal,tagsabtu = false){
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
            const bulan  = this.internationalDate(currentDate);
            const date = currentDate.getDate();
            const day = currentDate.getDay();
            
            let isHe = true;
            let isHeb = true;
            let isLibur = false;
            let atribute ={class:'fw-bolder'};
            let tgl = currentDate;
            let title = false;
            if(day==0 || (day == 6 && tagsabtu )){
                atribute={class:'text-bg-danger text-center'};
                isHe = false
                isHeb = false
                isLibur = true
            }
            
            
            const isExist = this.isExist(currentDate);
            if(isExist.length>0){
                if(isExist.length == 1){
                    let bg = `background-color:${isExist[0]['background-color']};color:${isExist[0].color}!important`;
                    atribute={'style':bg,class:'text-capitalize'};
                    title = isExist[0].keterangan;
                    isHe = isExist[0].he;
                    isHeb = isExist[0].heb;
                    isLibur = isExist[0].libur;
                }else{
                    let color = [];
                    let titleArr = [];
                    
                    isExist.forEach(it=> {
                        color.push(it['background-color']);
                        titleArr.push(it.keterangan);
                    });
                    let bg = `background:linear-gradient(-45deg,${color.join(',')});color:red`;
                    atribute={'style':bg,class:'text-capitalize'};
                    title = titleArr.join(',');
                    isHe = isExist.some(s=>s.libur)?false:isExist.some(n=>n.he);
                    isHeb = isExist.some(s=>s.libur)?false:isExist.some(n=>n.heb);
                    isLibur = isExist.some(s=>s.libur)?true:false;
                }                
            } 
                

                // detectedKaldik.push(this.isExist(currentDate))
            
            
            // monthArray.push(`${year}-${month.toString().padStart(2, '0')}-${String(date).padStart(2,'0')}`);
            let obj = {
                atribute:atribute,
                title:title,
                tgl:new Date(year, month,date),
                he:isHe,
                bulan:bulan,
                tahun:year,
                heb:isHeb,
                libur:isLibur
            }
            dataKalender.push(obj)
            // currentDate.setMonth(currentDate.getMonth() + 1);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dataKalender;
    }

    dataKalenderSemester(bulanawal,tagSabtu=false){
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
            let bulan = this.internationalDate(currentDate);
            let dataCurrent = this.dataTanggalan(currentDate,tagSabtu);
            let obj = {
                'bulan':bulan,
                'tahun':year,
                'data':dataCurrent
            }
            dataKalender.push(obj);
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
        return dataKalender;
    }
    get data(){
        // this.kaldik.addProperty('testambah',(item)=>`item tambah dari idbaris = ${item.idbaris}`);
        return this.kaldik.data;
    }
    dataKeteranganKaldik(){
        // this.kaldik.addProperty('testambah',(item)=>`item tambah dari idbaris = ${item.idbaris}`);
        return this.kaldik.data;
    }
    cekData(){
        return this.kaldik.data
    }
    isExist(tgl){
        return this.kaldik.data.filter((item)=>{
            let d = new Date(tgl);
                const startDate = new Date(item.start_tgl).getTime();
                const endDate = new Date(item.end_tgl).getTime();
                const target = d.getTime();
                return target >= startDate && target <= endDate;
        });
    }
    isLibur(tgl){
        let result = false;
        let d = new Date(tgl).getDay();
        if(d == 0){
            result = true;
        }
        let cek = this.isExist(tgl);
        if(cek.length==1){
            result = this.cekboolean(cek[0].libur);
        }else if(cek.length>1){
            let arHe = [], arHeb=[], arLibur=[];
                cek.forEach(it=> {
                    arHe.push(this.cekboolean(it.he))
                    arHeb.push(this.cekboolean(it.heb))
                    arLibur.push(this.cekboolean(it.libur))
                });
                result = arLibur.some(n=>n===true);
        }
        return result
    }
    internationalDate(date){
        return new Intl.DateTimeFormat(
            'id-ID',
            { month:'long'}).format(date)
    }
    
    addKeteranganOnKalender(element,dateTgl){
        let div = document.createElement('div');
        let prefikId = element.getAttribute('id');
        div.setAttribute('id',prefikId+'_keterangankaldik');
        div.classList.add('font8');
        div.classList.add('border');
        div.classList.add('p-2');

        //list
        this.listKeteranganPerBulan(div,dateTgl);

        element.appendChild(div);
        return this
    }
    listKeteranganPerBulan(parent,dateTgl){
        // let tabel = document.querySelector('.'+classTable);
        // let dateTgl = tabel.getAttribute('data-date');
        let d = new Date(dateTgl);
        let Y = d.getFullYear();
        let Mi = d.getMonth();
        let M = (Mi+1)
        let lastTgl = new FormatTanggal(d).lastTgl();
        let awal = new Date(Y,Mi,1);
        let akhir = new Date(Y,Mi,lastTgl);
        let  dataBetween = this.filterDataByBetweenDate(awal,akhir);
        let parentList = document.createElement('ul');
        parentList.classList.add('list-group','list-group-flush');
        dataBetween.forEach(n=>{
            let li = document.createElement('li');
            li.classList.add('list-group-item','p-0');

            let konten = document.createElement('div');
            konten.classList.add('d-flex','justify-content-between');

            let teksketerangan = document.createElement('span');
                teksketerangan.innerHTML = n.keterangan;
            konten.appendChild(teksketerangan);
                teksketerangan = document.createElement('span');
                teksketerangan.innerHTML = n.keterangan_tanggal;
            konten.appendChild(teksketerangan);

            li.appendChild(konten);
            parentList.appendChild(li);

        })
        parent.appendChild(parentList);
    }
    filterDataByBetweenDate(startDate, endDate) {
        const filteredData = this.data.filter(item => {
            const itemStartDate = new Date(item.start_tgl).getTime();
            const itemEndDate = new Date(item.end_tgl).getTime();
            const startTimestamp = new Date(startDate).getTime();
            const endTimestamp = new Date(endDate).getTime();
        
            return (startTimestamp >= itemStartDate && startTimestamp <= itemEndDate) ||
                (endTimestamp >= itemStartDate && endTimestamp <= itemEndDate) ||
                (itemStartDate >= startTimestamp && itemStartDate <= endTimestamp) ||
                (itemEndDate >= startTimestamp && itemEndDate <= endTimestamp);
        });
        
        return filteredData;
    }
    dataHariEfektifPerSemester(thAwal,sabtu=false){
        let data = this.dataSemesteran(thAwal,sabtu);
        
        let test = Object.groupBy(data,({bulan})=>bulan);
        
        let tahun = new Date(thAwal).getFullYear();
        let newData = [];
        Object.entries(test).forEach(([k,v])=>{
            let jumlah = v.filter(s=>new Date(s.tgl).getDay()!=0 && s.he == true).length;
            let jumlahTanpaSabtu = v.filter(s=>new Date(s.tgl).getDay()!=0 && new Date(s.tgl).getDay()!=6 && s.he == true).length;
            let senin = v.filter(s=> new Date(s.tgl).getDay()==1 && s.he == true).length;
            let selasa = v.filter(s=> new Date(s.tgl).getDay()==2 && s.he == true).length;
            let rabu = v.filter(s=> new Date(s.tgl).getDay()==3 && s.he == true).length;
            let kamis = v.filter(s=> new Date(s.tgl).getDay()==4 && s.he == true).length;
            let jumat = v.filter(s=> new Date(s.tgl).getDay()==5 && s.he == true).length;
            let sabtu = v.filter(s=> new Date(s.tgl).getDay()==6 && s.he == true).length;

            let jumlah_heb = v.filter(s=>new Date(s.tgl).getDay()!=0 && s.heb == true).length;
            let jumlahTanpaSabtu_heb = v.filter(s=>new Date(s.tgl).getDay()!=0 && new Date(s.tgl).getDay()!=6 && s.heb == true).length;
            
            
            let senin_heb = v.filter(s=> new Date(s.tgl).getDay()==1 && s.heb == true).length;
            let selasa_heb = v.filter(s=> new Date(s.tgl).getDay()==2 && s.heb == true).length;
            let rabu_heb = v.filter(s=> new Date(s.tgl).getDay()==3 && s.heb == true).length;
            let kamis_heb = v.filter(s=> new Date(s.tgl).getDay()==4 && s.heb == true).length;
            let jumat_heb = v.filter(s=> new Date(s.tgl).getDay()==5 && s.heb == true).length;
            let sabtu_heb = v.filter(s=> new Date(s.tgl).getDay()==6 && s.heb == true).length;
            
            let ob = {
                'bulan':k,
                'bulan_tahun':k+' '+tahun,
                'jumlah':jumlah,
                'jumlah_heb':jumlah_heb,
                'jumlah_jeb':jumlah_heb*7,
                'jumlahTanpaSabtu':jumlahTanpaSabtu,
                'jumlahTanpaSabtu_heb':jumlahTanpaSabtu_heb,
                'jumlahTanpaSabtu_jeb':jumlahTanpaSabtu_heb*7,
                'senin':senin,
                'selasa':selasa,
                'rabu':rabu,
                'kamis':kamis,
                'jumat':jumat,
                'sabtu':sabtu,

                'senin_heb':senin_heb,
                'selasa_heb':selasa_heb,
                'rabu_heb':rabu_heb,
                'kamis_heb':kamis_heb,
                'jumat_heb':jumat_heb,
                'sabtu_heb':sabtu_heb,

                'senin_jeb':senin_heb*7,
                'selasa_jeb':selasa_heb*7,
                'rabu_jeb':rabu_heb*7,
                'kamis_jeb':kamis_heb*7,
                'jumat_jeb':jumat_heb*7,
                'sabtu_jeb':sabtu_heb*7
            }
            newData.push(ob);
        });
        return newData;

    }
}