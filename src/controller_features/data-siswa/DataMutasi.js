import { CollectionsEdu, FormatTanggal } from "../../entries/vendor";

export class DataMutasi{
    constructor(siswaServices,createTabel,TabelProperties,view){
        this.service = siswaServices;
        this.tabel = createTabel;
        this.TabelProperties = TabelProperties;
        this.view = view;
        this.workplace = document.getElementById('printarea');
        this.htmlJudul = '';
    }
    set headingHTML(html){
        this.htmlJudul = html;
    }
    get headingHTML (){
        return this.htmlJudul;
    }
    tabelDom(arg){
        return new this.tabel(arg);
    }
    init(rombel,tapel){
        const select = document.getElementById('pilihBulanMutasi');
        select.onchange = (e)=>{
            this.kontenMutasiLaporan(e.target.value,rombel,tapel);
        };
        select.dispatchEvent(new Event('change'));
    }
    stringToDom(string){
        const template= document.createElement('template');
        template.innerHTML = string;
        return template.content;
    }
    kontenMutasiLaporan(v,fokusRombel,tapel){
        let db = this.service.allSiswa.slice();
        let dbKelas = new CollectionsEdu(db).simpleFilter({'nama_rombel':fokusRombel}).data;
        let firstDate = new Date(v);
        let thAwal = new Date(v);
        let y = firstDate.getFullYear();
        let m = firstDate.getMonth();//(firstDate.getMonth()+1).toString().padStart(2,'0');
        let semesterTeks = firstDate.getMonth() <6?'2 (Genap)':'1 (Ganjil)';
        let endDate =  new FormatTanggal(v).lastTgl();
        let thAkhir = new Date(y,m,endDate)
        let dbOlah = dbKelas;//.slice();
        let dbMasuk;
        
        if(m == 6){
            let dbJuli = this.service.siswaByBetweenCheckinCheckout(dbOlah,thAwal,thAkhir);

            dbMasuk = new CollectionsEdu(dbJuli)
                    .selectProperties(['masuk_tgl','nis','nisn','pd_nama','pd_jk','dapo_sekolahasal','awal_kelas','keluar_tgl'])
                    .updatePropertyValues(this.service.arLabel.keyTgl,(v)=>v==""?"":new FormatTanggal(v).formatLong());
        }else{
            let dbNonJuli = this.service.siswaCheckin(dbOlah,thAwal,thAkhir);
            dbMasuk = new CollectionsEdu(dbNonJuli)
                    .selectProperties(['masuk_tgl','nis','nisn','pd_nama','pd_jk','dapo_sekolahasal','awal_kelas','keluar_tgl'])
                    .updatePropertyValues(this.service.arLabel.keyTgl,(v)=>v==""?"":new FormatTanggal(v).formatLong());
        }
        
        let arrayBodyMasuk =[];
        if(dbMasuk.countData()==0){
            arrayBodyMasuk=()=>{
                
                let html =`<tr><td style="border:.5pt solid #ddd;height:150px;text-align:center;vertical-align:middle" colspan="9"> <div style="-ms-transform: rotate(-45deg);transform: rotate(-35deg);font-size:28px;font-weight:bold;background-color:#ffeee;display:inline-block">N I H I L</div></td></tr>`;
                return this.stringToDom(html);
            }
        }else{
            if(new Date(v).getMonth() == 6){
                if(parseInt(fokusRombel) == 1){
                    arrayBodyMasuk = ['auto','masuk_tgl','nis','nisn','pd_nama','pd_jk','dapo_sekolahasal','awal_kelas',{'nis':(item)=>'Peserta Didik Baru' }];
                }else{
                    arrayBodyMasuk = [
                        'auto',
                        'masuk_tgl',
                        'nis',
                        'nisn',
                        'pd_nama',
                        'pd_jk',
                        'dapo_sekolahasal',
                        'awal_kelas',
                        { 'nis':(item)=>{
                            if(item.toString().slice(4,6)=='01'){
                                return 'Siswa Asal naik kelas'
                            }else if(item.toString().slice(4,6)==parseInt(fokusRombel).toString().padStart(2,0)){
                                return 'Siswa Pindahan'
                            }else{
                                return 'Siswa Pindahan naik kelas'
                            }
                        } 
                        }
                    ];
                }
                
            }else{
                arrayBodyMasuk = ['auto','masuk_tgl','nis','nisn','pd_nama','pd_jk','dapo_sekolahasal','awal_kelas',{'nis':(item)=>'' }]
            }

        }
        let dbKeluarf = this.service.siswaCheckOut(dbOlah,thAwal,thAkhir);
        let dbKeluar = new CollectionsEdu(dbKeluarf)
            .setProperty('aktif','pd_nama','nis','nisn','db_sekolahasal','pd_jk','kelas_keluar','alasan_keluar','pindah_ke')
            .updatePropertyValues(this.service.arLabel.keyTgl,(v)=>v==""?"":new FormatTanggal(v).formatLong());
            let bodyMutasiKeluar;
        if(dbKeluar.countData()==0){
            bodyMutasiKeluar =()=>{
                
                let html =`<tr><td style="border:.5pt solid #ddd;height:150px;text-align:center;vertical-align:middle" colspan="9"> <div style="-ms-transform: rotate(-45deg);transform: rotate(-35deg);font-size:28px;font-weight:bold;background-color:#ffeee;display:inline-block">N I H I L</div></td></tr>`;
                return this.stringToDom(html);
            }
        }else{
            bodyMutasiKeluar = ['auto','keluar_tgl','nis','nisn','pd_nama','pd_jk','kelas_keluar','alasan_keluar']
        }
        let konfigMasuk ={
            tableAtribut:{
                class:"w3-table-all font8"
            },
            db:dbMasuk.data.slice(),
            headers:[
                {
                    columns:[
                        {label:'M U T A S I &nbsp; &nbsp; M A S U K',atribute:{colspan:9}}
                    ]
                },
                {
                    columns:[
                        {label:'No.'},
                        {label:'Masuk Tanggal'},
                        {label:'No. Induk Siswa'},
                        {label:'NISN'},
                        {label:'Nama Siswa'},
                        {label:'L/P'},
                        {label:'Asal Sekolah'},
                        {label:'Diterima di Kelas'},
                        {label:'Keterangan'},
                    ]
                },
            ],
            body:arrayBodyMasuk
        }
        let konfigKeluar ={
                tableAtribut:{
                    class:"w3-table-all font8"
                },
                db:dbKeluar.data.slice(),
                headers:[
                    {
                        columns:[
                            {label:'M U T A S I &nbsp; &nbsp; KELUAR',atribute:{colspan:9}}
                        ]
                    },
                    {
                        columns:[
                            {label:'No.'},
                            {label:'Keluar Tanggal'},
                            {label:'No. Induk Siswa'},
                            {label:'NISN'},
                            {label:'Nama Siswa'},
                            {label:'L/P'},
                            {label:'Kelas di kelas'},
                            {label:'Alasan'},
                            
                        ]
                    },
                ],
                body:bodyMutasiKeluar
            };

        const tabelMasuk = this.tabelDom(konfigMasuk).init();
        const tabelKeluar = this.tabelDom(konfigKeluar).init();
        let bulanlalu = new Date(v);
        
        bulanlalu.setDate(1);
        bulanlalu.setDate(bulanlalu.getDate()-1);
        
        let keadaanAwal = this.service.siswaUntilDate(dbOlah,bulanlalu);
        let tek = 'keadaan Awal='+keadaanAwal.length;//+dbMasuk.countData();
            tek += '<br>masuk='+ this.service.siswaCheckin(dbOlah,thAwal, thAkhir).length;
            tek += '<br>keluar='+ this.service.siswaCheckOut(dbOlah,thAwal, thAkhir).length;
            tek += '<br>akhir='+ this.service.siswaUntilDate(dbOlah,thAkhir).length;
        let inMutasi = this.service.siswaCheckin(dbOlah,thAwal, thAkhir);
        let outMutasi = this.service.siswaCheckOut(dbOlah, thAwal, thAkhir);
        let final = this.service.siswaUntilDate(dbOlah, thAkhir);
        let awalPCount = keadaanAwal.filter(s=> s.pd_jk=="P").length;
        let awalLCount = keadaanAwal.filter(s=> s.pd_jk=="L").length;
        let awalTCount = keadaanAwal.length;
        let inPCount = inMutasi.filter(s=>s.pd_jk == 'P').length;
        let inLCount = inMutasi.filter(s=>s.pd_jk == 'L').length;
        let inTCount = inMutasi.length;
        let outPCount = outMutasi.filter(s=>s.pd_jk == 'P').length;
        let outLCount = outMutasi.filter(s=>s.pd_jk == 'L').length;
        let outTCount = outMutasi.length;
        let finalPCount = final.filter(s=>s.pd_jk == 'P').length;
        let finalLCount = final.filter(s=>s.pd_jk == 'L').length;
        let finalTCount = final.length;
        let dbCustom = [
            {
                awall:awalLCount,
                awalp:awalPCount,
                awalt:awalTCount,
                inL : inLCount,
                inP : inPCount,
                inT : inTCount,
                outL:outLCount,
                outP:outPCount,
                outT:outTCount,
                finalL:finalLCount,
                finalP:finalPCount,
                finalT:finalTCount,
            }
        ];
        let konfigRekap = {
            tableAtribut:{
                class:'w3-table-all font8'
            },

            db:dbCustom,
            headers:[
                {
                    columns:[
                        {label:'Rekapitulasi Mutasi Siswa '+new FormatTanggal(v).MMMM()+' '+ new FormatTanggal(v).YYYY(),atribute:{colspan:12}}
                    ]
                },
                {
                    columns:[
                        {label:'Keadaan Awal',atribute:{colspan:3}},
                        {label:'Masuk',atribute:{colspan:3}},
                        {label:'Keluar',atribute:{colspan:3}},
                        {label:'Keadaan Akhir',atribute:{colspan:3}},
                    ]
                },
                {
                    columns:[
                        {label:'L'},
                        {label:'P'},
                        {label:'Jumlah'},
                        {label:'L'},
                        {label:'P'},
                        {label:'Jumlah'},
                        {label:'L'},
                        {label:'P'},
                        {label:'Jumlah'},
                        {label:'L'},
                        {label:'P'},
                        {label:'Jumlah'},
                        
                    ]
                },
            ],
            atributeColumn:Object.keys(dbCustom[0]).map(n=>({[n]:{class:'text-center fs-3 fw-bolder'}})).reduce((a,b)=>({...a,...b}),{}),
            body:Object.keys(dbCustom[0])


        }
        const tabelRekap = this.tabelDom(konfigRekap).init()
        const identitas ={
            nama_rombel:fokusRombel,
            bulan:new FormatTanggal(v).MMMM()+' '+ new FormatTanggal(v).YYYY(),
            tapel:tapel,
            semester:semesterTeks
        }

        this.workplace.innerHTML = this.view.kontenLaporanMutasi(identitas, tabelMasuk, tabelKeluar,tabelRekap);
    }
    dbSiswaAntaraDuaTgl(tglAwal,tglAkhir,itemStart='masuk_tgl',itemEnd='keluar_tgl'){
        const db = this.service.allSiswa.slice();
        return new CollectionsEdu(db).customFilter(item=>{
            let refStart   = parseInt( new FormatTanggal(tglAwal).stringYYYYMMDD());
            let refEnd     = parseInt( new FormatTanggal(tglAkhir).stringYYYYMMDD());

            let checkIn = item[itemStart] ==""?0:parseInt( new FormatTanggal(item[itemStart]).stringYYYYMMDD());
            let checkOut = item[itemEnd] ==""?parseInt( new FormatTanggal(tglAkhir).stringYYYYMMDD()):parseInt( new FormatTanggal(item.keluar_tgl_tgl).stringYYYYMMDD());
            return (checkIn <= refStart) && (checkOut >=refEnd);
        })
    }
    dbSiswaHinggaTgl(tglAwal,tglAkhir,itemStart='masuk_tgl',itemEnd='keluar_tgl'){
        const db = this.service.allSiswa.slice();
        return new CollectionsEdu(db).customFilter(item=>{
            let refStart   = parseInt( new FormatTanggal(tglAwal).stringYYYYMMDD());
            let refEnd     = parseInt( new FormatTanggal(tglAkhir).stringYYYYMMDD());
            let checkIn = item[itemStart] ==""?0:parseInt( new FormatTanggal(item[itemStart]).stringYYYYMMDD());
            let checkOut = item[itemEnd] ==""?parseInt( new FormatTanggal(tglAkhir).stringYYYYMMDD())+1:parseInt( new FormatTanggal(item.keluar_tgl_tgl).stringYYYYMMDD());
            
            return (checkIn <= refStart) && (checkOut >=refEnd);
            
        })
    }
}