import { tabelDom } from "../../entries/vendor";
import htmlAbsen from "../../views/absen/viewAbsen"

export const htmldenah = (data,kelas,imgguru,absen,iconhadir)=>htmlAbsen.htmlDenahAbsenApi(data,kelas,imgguru,absen,iconhadir);

export const controlAbsenByBulanan = (data)=>{
    let d = new Date();
    let y = d.getFullYear();
    let m = d.getMonth().toString().padStart(2,'0');
    let val = `${y}-${m}-01`
    let objectDefault={
        judul:'Judul',
        arrayBulan:[], 
        deskripsi:'Deskripsi Control',
        idSelectPilihBulan:'idselectbulan',
        tglValuePertama:val,
        modeCheckmark:true
    };
    let mergeObject = Object.assign({},objectDefault,data)
    return htmlAbsen.koleksiBulanAbsen(mergeObject)
}
const stringToDom=(string)=>{
    const template= document.createElement('template');
    template.innerHTML = string;
    return template.content;
}
export const tabelabsenperbulan = (data) =>{
    const {dataabsen,datakalender,judul,rekapRoot} = data;
    let mapingHeading = datakalender.map(n=>{
        let obj={};
        obj.label=n.tgl_hari;
        obj.atribute=n.atribute;
        return obj;
    });
    let html = "";
    let konfig = {
        tableAtribut:{
            id:'tabelabsenbulanan',
            class:'w3-table-all toExcel table-sm font10',
        },
        db:dataabsen,
        atributeColumn:{
            'oleh':{class:'print-hide text-center'},
            'refrensi_suratmasuk':{class:'print-hide text-center'},
            'aksi':{class:'print-hide text-center'},
            'aksi2':{class:'print-hide text-center'},
        },
        headers:[
            {
                columns:[
                    {label:'No Urut', atribute:{rowspan:2}},
                    {label:'Nama Siswa',atribute:{rowspan:2}},
                    {label:judul,atribute:{colspan:mapingHeading.length}},
                    {label:'Jumlah',atribute:{colspan:4}}
                ]
            },
            {
                columns:[
                    ...mapingHeading,
                    {label:'Hadir'},
                    {label:'Sakit'},
                    {label:'Ijin'},
                    {label:'Alpa'},
                ]
            }
        ],
        body:()=>{
            let html = ``;
            dataabsen.forEach((db,indeks) => {
                html+=`<tr>`;
                    html+=`<td class="text-center align-middle">${(indeks+1)}.</td>`;
                    html+=`<td class="text-nowrap align-middle">${db.namasiswa}</td>`;
                    let dataabsen = db.data;
                    dataabsen.forEach(abs=>{
                        let atr = '';
                        Object.entries(abs.atribute).forEach(([k,v])=>{
                            atr +=' ';
                            atr +=k;
                            atr+="='";
                            atr+=v;
                            atr+="'";
                        });
                        if(abs.title){
                            // atr+=" title='";
                            // atr+=abs.title;
                            // atr+="'";
                            atr+=` data-bs-title="${abs.title}" data-bs-toggle="tooltip"`;
                        }
                        html+=`<td${atr}>${abs.elemenImg}</td>`;
                    });
                    
                        html+=`<td class="text-center align-middle">${db.Hadir}</td>`;
                        html+=`<td class="text-center align-middle">${db.Sakit}</td>`;
                        html+=`<td class="text-center align-middle">${db.Ijin}</td>`;
                        html+=`<td class="text-center align-middle">${db.Alpa}</td>`;
                    
                html+=`</tr>`;
            });
            return stringToDom(html);
        },
        footer:()=>{
            let html ="";
            html+=`<tr>`;
                html+=`<th colspan="2">Total Hadir</th>`;
                let hC = 0;
                rekapRoot.forEach(n=>{
                    let h,i,s,a;
                    
                    s = n.Sakit;
                    i = n.Ijin;
                    a = n.Alpa
                    h = n.isLibur?'':(dataabsen.length -(s + i + a));
                    let PhC = n.isLibur?0:(dataabsen.length -(s + i + a));
                    html+=`<th class="text-center">${h}</th>`;
                    hC +=PhC;
                });
                html+=`<th class="text-center">${hC}</th>`;
                html+=`<th class="text-center bg-secondary"></th>`;
                html+=`<th class="text-center bg-secondary"></th>`;
                html+=`<th class="text-center bg-secondary"></th>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<th colspan="2">Total Sakit</th>`;
                rekapRoot.forEach(n=>{
                    html+=`<th class="text-center">${n.Sakit}</th>`
                });
                
                html+=`<th class="text-center bg-secondary"></th>`;
                html+=`<th class="text-center">${rekapRoot.map(n=>n.Sakit==""?0:n.Sakit).reduce((a,b)=>parseInt(a)+b)}</th>`;
                html+=`<th class="text-center bg-secondary"></th>`;
                html+=`<th class="text-center bg-secondary"></th>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<th colspan="2">Total Ijin</th>`;
                rekapRoot.forEach(n=>{
                    html+=`<th class="text-center">${n.Ijin}</th>`
                });
                
                html+=`<th class="text-center bg-secondary"></th>`;
                html+=`<th class="text-center bg-secondary"></th>`;
                html+=`<th class="text-center">${rekapRoot.map(n=>n.Ijin==""?0:n.Ijin).reduce((a,b)=>parseInt(a)+b)}</th>`;
                html+=`<th class="text-center bg-secondary"></th>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<th colspan="2">Total Alpa</th>`;
                rekapRoot.forEach(n=>{
                    html+=`<th class="text-center">${n.Alpa}</th>`
                });
                
                html+=`<th class="text-center bg-secondary"></th>`;
                html+=`<th class="text-center bg-secondary"></th>`;
                html+=`<th class="text-center bg-secondary"></th>`;
                html+=`<th class="text-center">${rekapRoot.map(n=>n.Alpa==""?0:n.Alpa).reduce((a,b)=>parseInt(a)+b)}</th>`;
            html+=`</tr>`;
            
            return stringToDom(html);
        }   
    }
    let tabelSurat = new tabelDom(konfig);
    html = tabelSurat.init();
    return html;
}
export const tabelabsenRekapperbulan = (data) =>{
    const {dataabsen,datakalender,judul,rekapRoot} = data;
    let hasBatas = data.datakalender.some(s=> s.hasBatas == true);
    let jumlahHariEfektif = [];
    let realHe = [];
    if(hasBatas){
        jumlahHariEfektif = datakalender.filter(s=> s.heJalan ==true);
        realHe = datakalender.filter(s=> s.he ==true);
    }else{
        jumlahHariEfektif = datakalender.filter(s=> s.he==true);

    };
        let s = rekapRoot.map(n=>n.Sakit==""?0:n.Sakit).reduce((a,b)=>parseInt(a)+b);
        let i = rekapRoot.map(n=>n.Ijin==""?0:n.Ijin).reduce((a,b)=>parseInt(a)+b);
        let a = rekapRoot.map(n=>n.Alpa==""?0:n.Alpa).reduce((a,b)=>parseInt(a)+b);
        let jumlahAbsen = (parseInt(s)+parseInt(i)+parseInt(a));
        let kali = dataabsen.length * jumlahHariEfektif.length;

        let ha = (jumlahAbsen*100/kali).toFixed(2) +' %.';
        let eha = (100-(jumlahAbsen*100/kali)).toFixed(2)+' %.';
    let html = "";
    let konfig = {
        tableAtribut:{
            id:'tabelabsenbulanan',
            class:'w3-table-all toExcel table-sm font10',
        },
        db:dataabsen,
        atributeColumn:{
            'oleh':{class:'print-hide text-center'},
            'refrensi_suratmasuk':{class:'print-hide text-center'},
            'aksi':{class:'print-hide text-center'},
            'aksi2':{class:'print-hide text-center'},
        },
        headers:[
            {
                columns:[
                    {label:'No Urut', atribute:{rowspan:2}},
                    {label:'Nama Siswa',atribute:{rowspan:2}},
                    {label:judul,atribute:{colspan:4}},
                    {label:'Jumlah Hari Efektif',atribute:{rowspan:2}},
                    {label:'Persentase Kehadiran',atribute:{rowspan:2}}
                ]
            },
            {
                columns:[
                    // ...mapingHeading,
                    {label:'Hadir'},
                    {label:'Sakit'},
                    {label:'Ijin'},
                    {label:'Alpa'},
                ]
            }
        ],
        body:()=>{
            let html = ``;
            // let jumlahHariEfektif = data.datakalender.filter(s=> s.he===true);
            dataabsen.forEach((db,indeks) => {
                html+=`<tr>`;
                    html+=`<td class="text-center align-middle">${(indeks+1)}.</td>`;
                    html+=`<td class="text-nowrap align-middle">${db.namasiswa}</td>`;
                    html+=`<td class="text-center align-middle">${db.Hadir}</td>`;
                    html+=`<td class="text-center align-middle">${db.Sakit}</td>`;
                    html+=`<td class="text-center align-middle">${db.Ijin}</td>`;
                    html+=`<td class="text-center align-middle">${db.Alpa}</td>`;
                    if(hasBatas){
                        html+=`<td class="text-center align-middle">${jumlahHariEfektif.length} dari ${realHe.length} </td>`;
                    }else{
                        html+=`<td class="text-center align-middle">${jumlahHariEfektif.length} hari</td>`;

                    }
                    let persenHadir = (db.Hadir * 100/jumlahHariEfektif.length).toFixed(2) +' %';
                    if(db.Hadir == 0){
                        persenHadir = '';
                    }
                    html+=`<td class="text-center ${db.Hadir == jumlahHariEfektif.length?'text-bg-info':''} align-middle">${persenHadir}</td>`;
                html+=`</tr>`;
            });
            return stringToDom(html);
        },
        footer:()=>{
            let html ="";
            html+=`<tr>`;
                html+=`<th colspan="2" class="text-end">Jumlah</th>`;
                let hC = 0;
                rekapRoot.forEach(n=>{
                    let h,i,s,a;
                    
                    s = n.Sakit;
                    i = n.Ijin;
                    a = n.Alpa
                    h = n.isLibur?'':(dataabsen.length -(s + i + a));
                    let PhC = n.isLibur?0:(dataabsen.length -(s + i + a));
                    // html+=`<th class="text-center">${h}</th>`;
                    hC +=PhC;
                });
                html+=`<th class="text-center">${hC}</th>`;
                html+=`<th class="text-center">${rekapRoot.map(n=>n.Sakit==""?0:n.Sakit).reduce((a,b)=>parseInt(a)+b)}</th>`;
                html+=`<th class="text-center">${rekapRoot.map(n=>n.Ijin==""?0:n.Ijin).reduce((a,b)=>parseInt(a)+b)}</th>`;
                html+=`<th class="text-center">${rekapRoot.map(n=>n.Alpa==""?0:n.Alpa).reduce((a,b)=>parseInt(a)+b)}</th>`;
                html+=`<th>${jumlahHariEfektif.length} hari.</th>`
                html+=`<th>% Absensi = ${ha}<br/>% Kehadiran = ${eha}</th>`;
            html+=`</tr>`;
            
            
            return stringToDom(html);
        }   
    }
    let tabelSurat = new tabelDom(konfig);
    html = tabelSurat.init();
    return html;
}
export const viewFormulir = (data)=>htmlAbsen.viewModalFormulirAbsen(data);

export const viewTableAbsenPerbulanWithCalculation = (headerPage,user,data)=>{
    let semester = new Date(data.tgl).getMonth()>5?1:2;
        let jumlahHariEfektif = data.datakalender.filter(s=> s.he===true);
        let s = data.rekapRoot.map(n=>n.Sakit==""?0:n.Sakit).reduce((a,b)=>parseInt(a)+b);
        let i = data.rekapRoot.map(n=>n.Ijin==""?0:n.Ijin).reduce((a,b)=>parseInt(a)+b);
        let a = data.rekapRoot.map(n=>n.Alpa==""?0:n.Alpa).reduce((a,b)=>parseInt(a)+b);
        let jumlahAbsen = (parseInt(s)+parseInt(i)+parseInt(a));
        let kali = data.dataabsen.length * jumlahHariEfektif.length;
        let ha = (jumlahAbsen*100/kali).toFixed(2) +' %.';
        let eha = (100-(jumlahAbsen*100/kali)).toFixed(2)+' %.';
        let v = headerPage;
            v+=`<h4 class="text-center mb-3">Semester ${semester} Tahun Pelajaran ${user.tapel}</h4>`
            v+=`<h4 class="text-center mt-0 mb-5">Bulan ${data.judul}</h4>`;
            v+=tabelabsenperbulan(data);
            
            v+=`<div class="row">`;
            v+=`<div class="col-6 col-md-5 font10">Keterangan:<div id="keterangankalenderabsen"></div></div>`;
            v+=`<div class="col-6 col-md-7 font10">Jumlah Hari Efektif: ${jumlahHariEfektif.length} hari`
                v+=`<table class="table table-borderless font8 border">`;
                    v+=`<tr>`;
                        v+=`<td class="align-middle" rowspan="2">% Absensi</td>`;
                        v+=`<td class="align-middle" rowspan="2">=</td>`;
                        v+=`<td class="border-bottom border-2 border-top-0 border-start-0 border-end-0">Jumlah Absensi (S, I, A)</td>`;
                        v+=`<td class="align-middle" rowspan="2">x 100%</td>`;
                        v+=`<td class="align-middle" rowspan="2">=</td>`;
                        v+=`<td class="align-middle" rowspan="2">...</td>`;
                    v+=`</tr>`;
                    v+=`<tr><td>Jumlah Siswa x Jumlah Hari Efektif</td></tr>`
                v+=`</table>`;
                v+=`<table class="table table-borderless font8 border">`;
                    v+=`<tr>`;
                        v+=`<td class="align-middle" rowspan="2">% Absensi</td>`;
                        v+=`<td class="align-middle" rowspan="2">=</td>`;
                        v+=`<td class="border-bottom border-2 border-dark border-top-0 text-center border-start-0 border-end-0">${s}+${i}+${a}</td>`;
                        v+=`<td class="align-middle" rowspan="2">x 100%</td>`;
                        v+=`<td class="align-middle" rowspan="2">=</td>`;
                        v+=`<td class="border-bottom border-2 border-dark border-top-0 border-start-0 border-end-0">${jumlahAbsen}</td>`;
                        v+=`<td class="align-middle" rowspan="2">x 100%</td>`;
                        v+=`<td class="align-middle" rowspan="2">=</td>`;
                        v+=`<td class="align-middle" rowspan="2">${ha}</td>`;
                    v+=`</tr>`;
                    v+=`<tr><td class="text-center">${data.dataabsen.length} x ${jumlahHariEfektif.length}</td><td class="text-center">${kali}</td></tr>`
                v+=`</table>`;
                v+=`<table class="table table-borderless font8 border">`;
                    v+=`<tr>`;
                        v+=`<td class="align-middle" rowspan="2">% Kehadiran = ${eha}</td>`;
                    v+=`</tr>`
                v+=`</table>`;
            v+=`</div>`;
            
            v+=`</div>`;
            return v;
}

export const viewTableRootAbsenPerbulanWithCalculation = (headerPage,user,data)=>{
    let semester = new Date(data.tgl).getMonth()>5?1:2;
        let jumlahHariEfektif = data.datakalender.filter(s=> s.he===true);
        let s = data.rekapRoot.map(n=>n.Sakit==""?0:n.Sakit).reduce((a,b)=>parseInt(a)+b);
        let i = data.rekapRoot.map(n=>n.Ijin==""?0:n.Ijin).reduce((a,b)=>parseInt(a)+b);
        let a = data.rekapRoot.map(n=>n.Alpa==""?0:n.Alpa).reduce((a,b)=>parseInt(a)+b);
        let jumlahAbsen = (parseInt(s)+parseInt(i)+parseInt(a));
        let kali = data.dataabsen.length * jumlahHariEfektif.length;
        let ha = (jumlahAbsen*100/kali).toFixed(2) +' %.';
        let eha = (100-(jumlahAbsen*100/kali)).toFixed(2)+' %.';
        let v = headerPage;
            v+=`<h4 class="text-center mb-3">Semester ${semester} Tahun Pelajaran ${user.tapel}</h4>`
            v+=`<h4 class="text-center mt-0 mb-5">Bulan ${data.judul}</h4>`;
            v+=tabelabsenperbulanRoot(data);
            
            v+=`<div class="row">`;
            v+=`<div class="col-6 col-md-5 font10">Keterangan:<div id="keterangankalenderabsen"></div></div>`;
            v+=`<div class="col-6 col-md-7 font10">Jumlah Hari Efektif: ${jumlahHariEfektif.length} hari`
                v+=`<table class="table table-borderless font8 border">`;
                    v+=`<tr>`;
                        v+=`<td class="align-middle" rowspan="2">% Absensi</td>`;
                        v+=`<td class="align-middle" rowspan="2">=</td>`;
                        v+=`<td class="border-bottom border-2 border-top-0 border-start-0 border-end-0">Jumlah Absensi (S, I, A)</td>`;
                        v+=`<td class="align-middle" rowspan="2">x 100%</td>`;
                        v+=`<td class="align-middle" rowspan="2">=</td>`;
                        v+=`<td class="align-middle" rowspan="2">...</td>`;
                    v+=`</tr>`;
                    v+=`<tr><td>Jumlah Siswa x Jumlah Hari Efektif</td></tr>`
                v+=`</table>`;
                v+=`<table class="table table-borderless font8 border">`;
                    v+=`<tr>`;
                        v+=`<td class="align-middle" rowspan="2">% Absensi</td>`;
                        v+=`<td class="align-middle" rowspan="2">=</td>`;
                        v+=`<td class="border-bottom border-2 border-dark border-top-0 text-center border-start-0 border-end-0">${s}+${i}+${a}</td>`;
                        v+=`<td class="align-middle" rowspan="2">x 100%</td>`;
                        v+=`<td class="align-middle" rowspan="2">=</td>`;
                        v+=`<td class="border-bottom border-2 border-dark border-top-0 border-start-0 border-end-0">${jumlahAbsen}</td>`;
                        v+=`<td class="align-middle" rowspan="2">x 100%</td>`;
                        v+=`<td class="align-middle" rowspan="2">=</td>`;
                        v+=`<td class="align-middle" rowspan="2">${ha}</td>`;
                    v+=`</tr>`;
                    v+=`<tr><td class="text-center">${data.dataabsen.length} x ${jumlahHariEfektif.length}</td><td class="text-center">${kali}</td></tr>`
                v+=`</table>`;
                v+=`<table class="table table-borderless font8 border">`;
                    v+=`<tr>`;
                        v+=`<td class="align-middle" rowspan="2">% Kehadiran = ${eha}</td>`;
                    v+=`</tr>`
                v+=`</table>`;
            v+=`</div>`;
            
            v+=`</div>`;
            return v;
}

export const tabelabsenperbulanRoot = (data) =>{
    const {dataabsen,datakalender,judul,rekapRoot} = data;
    let mapingHeading = datakalender.map(n=>{
        let obj={};
        obj.label=n.tgl_hari;
        obj.atribute=n.atribute;
        return obj;
    });
    let html = "";
    let konfig = {
        tableAtribut:{
            id:'tabelabsenbulanan',
            class:'w3-table-all toExcel table-sm font10',
        },
        db:dataabsen,
        atributeColumn:{
            'oleh':{class:'print-hide text-center'},
            'refrensi_suratmasuk':{class:'print-hide text-center'},
            'aksi':{class:'print-hide text-center'},
            'aksi2':{class:'print-hide text-center'},
        },
        headers:[
            {
                columns:[
                    {label:'Keterangan', atribute:{rowspan:2}},
                    // {label:'Nama Siswa',atribute:{rowspan:2}},
                    {label:judul,atribute:{colspan:mapingHeading.length}},
                    {label:'Jumlah',atribute:{rowspan:2}}
                ]
            },
            {
                columns:[
                    ...mapingHeading,
                    
                    
                ]
            }
        ],
        body:()=>{
            let html = ``;
            let htmlHadir = "";
            let htmlSakit = "";
            let htmlIjin = "";
            let htmlAlpa ="";
            let hC = 0
            rekapRoot.forEach((db,indeks) => {
                let h,i,s,a;
                    
                    s = db.Sakit;
                    i = db.Ijin;
                    a = db.Alpa
                    h = db.isLibur?'':(dataabsen.length -(s + i + a));
                    let PhC =db.isLibur?0:(dataabsen.length -(s + i + a));
                    // html+=`<th class="text-center">${h}</th>`;
                    hC +=PhC;

                        let atr = '';
                        Object.entries(db.atribute).forEach(([k,v])=>{
                            atr +=' ';
                            atr +=k;
                            atr+="='";
                            atr+=v;
                            atr+="'";
                        });
                        if(db.title){
                            // atr+=" title='";
                            // atr+=abs.title;
                            // atr+="'";
                            atr+=` data-bs-title="${db.title}" data-bs-toggle="tooltip"`;
                        }
                htmlHadir+=`<td ${atr} class="text-center align-middle">${h}</td>`;
                htmlSakit+=`<td ${atr} class="text-center align-middle">${s}</td>`;
                htmlIjin+=`<td ${atr} class="text-center align-middle">${i}</td>`;
                htmlAlpa+=`<td ${atr} class="text-center align-middle">${a}</td>`;
            });
            
            html+=`<tr><td class="text-end">Total Hadir</td>${htmlHadir}<td class="text-center">${hC}</td></tr>`;
            html+=`<tr><td class="text-end">Total Sakit</td>${htmlSakit}<td class="text-center">${rekapRoot.map(n=>n.Sakit==""?0:n.Sakit).reduce((a,b)=>parseInt(a)+b)}</td></tr>`;
            html+=`<tr><td class="text-end">Total Ijin</td>${htmlIjin}<td class="text-center">${rekapRoot.map(n=>n.Ijin==""?0:n.Ijin).reduce((a,b)=>parseInt(a)+b)}</td></tr>`;
            html+=`<tr><td class="text-end">Total Alpa</td>${htmlAlpa}<td class="text-center">${rekapRoot.map(n=>n.Alpa==""?0:n.Alpa).reduce((a,b)=>parseInt(a)+b)}</td></tr>`;
            return stringToDom(html);
        },  
    }
    let tabelSurat = new tabelDom(konfig);
    html = tabelSurat.init();
    return html;
}

export const viewTableRekapAbsenPerbulanWithCalculation = (headerPage,user,data)=>{
    let semester = new Date(data.tgl).getMonth()>5?1:2;
        
        let v = headerPage;
            v+=`<h4 class="text-center mb-3">Semester ${semester} Tahun Pelajaran ${user.tapel}</h4>`
            v+=`<h4 class="text-center mt-0 mb-5">Bulan ${data.judul}</h4>`;
            v+=tabelabsenRekapperbulan(data);
            
            return v;
}
export const viewTableRekapAbsenPerSemesterWithCalculation = (headerPage,rombel,user,data)=>{
    // let semester = new Date(data.tgl).getMonth()>5?1:2;
        
        let v=`<h3 class="text-center mb-0">Rekapitulasi Kehadiran Kelas ${rombel}</h3>`;
            v+=`<h4 class="text-center mb-3">Tahun Pelajaran ${user.tapel}</h4>`
            v+=`<h4 class="text-center mb-3">${headerPage}</h4>`
            v+=viewTableRekapSemester(data);
            
            
            return v;
}

export const viewTableRekapSemester = (data)=>{
    let konfig = {
        tableAtribut:{
            id:'tabelabsenbulanan',
            class:'w3-table-all toExcel table-sm font10',
        },
        db:data,
        atributeColumn:{
            'rekapHadir':{class:'text-center'},
            'rekapSakit':{class:'text-center'},
            'rekapIjin':{class:'text-center'},
            'rekapAlpa':{class:'text-center'},
            'hariEfektif':{class:'text-center'},
            'persenKehadiran':{class:'text-center'},
            
        },
        headers:[
            {
                columns:[
                    {label:'No Urut', atribute:{rowspan:2}},
                    {label:'Nama Siswa',atribute:{rowspan:2}},
                    {label:'Kehadiran',atribute:{colspan:4}},
                    {label:'Jumlah Hari Efektif',atribute:{rowspan:2}},
                    {label:'Persentase Kehadiran',atribute:{rowspan:2}}
                ]
            },
            {
                columns:[
                    // ...mapingHeading,
                    {label:'Hadir'},
                    {label:'Sakit'},
                    {label:'Ijin'},
                    {label:'Alpa'},
                ]
            }
        ],
        body:[
            'auto',
            'pd_nama',
            'rekapHadir',
            'rekapSakit',
            'rekapIjin',
            'rekapAlpa',
            'hariEfektif',
            'persenKehadiran'
            

        ]
    };
    let tabelSurat = new tabelDom(konfig);
    let html = tabelSurat.init();
    return html;
}

export const templatingCardSingle = (title,subtitle)=>{
    return `${title}<h4 class="text-center mb-3 mt-0">Bulan ${subtitle}</h4><div class="row justify-content-center"><div id="canvasgrafik" class="col-8 my-5 shadow-lg rounded" style="min-height:250px">tes</div></div>`
}
export const templatingCardSingleLarge = (title,subtitle)=>{
    return `${title}<h4 class="text-center mb-3 mt-0">${subtitle}</h4><div class="row justify-content-center"><div id="canvasgrafik" class="col-11 my-5 shadow-lg rounded" style="min-height:250px">tes</div></div>`
}