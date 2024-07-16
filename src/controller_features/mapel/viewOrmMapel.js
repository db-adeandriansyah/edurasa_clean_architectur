import buttonEdu from "../../views/components/buttons";
import inputsElements from "../../views/components/input-elements";
import rowCols from "../../views/components/row-cols";
import { cardMenu2 } from "../../views/sidebar/cardSidebar";

const titleMapel = (identitas)=>{
    let html="";
    html+=`<h3 class="text-center tnr mb-0 fw-bold">${identitas.title}</h3>`;
    html+=`<h4 class="text-center tnr mb-0">${identitas.mapelteks}</h4>`;
    html+=`<h4 class="text-center tnr mb-0">Tahun Pelajaran ${identitas.tapel} Semester ${identitas.semester}</h4>`;
    html+=`<h4 class="text-center tnr mb-5">Kelas ${identitas.rombel}</h4>`;
    return html;
}
const sebaranKdTagihan = (sebarankd)=>{
    let html = "";
    html+=`<table class="table table-sm table-bordered border-dark font8">`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th class="text-center align-middle">Kode Elemen</th>`;
                html+=`<th class="text-center align-middle">Elemen</th>`;
                html+=`<th class="text-center align-middle">Kode TP</th>`;
                html+=`<th class="text-center align-middle">Tujuan Pembelajaran</th>`;
                html+=`<th class="text-center align-middle">Kode ATP</th>`;
                html+=`<th class="text-center align-middle">Alur Tujuan Pembelajaran</th>`;
                html+=`<th class="text-center align-middle">Kegiatan Assesmen</th>`;
            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;
        if(sebarankd.length==0){
            html+=`<tr><td class="text-center">Tidak ada data</td></tr>`;
        }else{
            sebarankd.forEach(n=>{
                let rowspan_col12 = n.colspan_baris1;
                rowspan_col12.forEach(n2=>{
                    html+=`<tr>`;
                    
                    if(n2 == 1){
                        html+=`<td>`;

                    }else{
                        html+=`<td rowspan="${n2}">`;

                    }
                    html+=`</tr>`;
                })
            })
        }

        html+=`</tbody>`;
    html+=`</table>`;
    return html;
}
const sebaranKdTagihanKurtilas = (sebarankd)=>{
    let html = "";
    html+=`<table class="table table-sm table-bordered border-dark font8">`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th class="text-center align-middle">Kode Elemen</th>`;
                html+=`<th class="text-center align-middle">Elemen</th>`;
                html+=`<th class="text-center align-middle">Kode TP</th>`;
                html+=`<th class="text-center align-middle">Tujuan Pembelajaran</th>`;
                html+=`<th class="text-center align-middle">Kode ATP</th>`;
                html+=`<th class="text-center align-middle">Alur Tujuan Pembelajaran</th>`;
                html+=`<th class="text-center align-middle">Kegiatan Assesmen</th>`;
            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;
        if(sebarankd.length==0){
            html+=`<tr><td class="text-center">Tidak ada data</td></tr>`;
        }else{

        }

        html+=`</tbody>`;
    html+=`</table>`;
    return html;
}
const viewRekapPH = (identitas, desain,data,sebarankd)=>{
    let html= titleMapel(identitas);
    html+=`<div class="table-responsive">`;
        html+=`<table class="table table-sm table-bordered border-dark tnr font12" id="tabelnilaiasli">`;
            html+=`<thead>`;
            if(Object.keys(desain).length == 0){
                        html+=`<tr>`;
                            html+=`<th rowspan="4" class="text-center text-bg-secondary border-light align-middle" style="width:20px">No. Urut</th>`
                            html+=`<th rowspan="4" class="text-center text-bg-secondary border-light align-middle" style="width:20px">Token Siswa</th>`
                            html+=`<th rowspan="4" class="text-center text-bg-secondary border-light align-middle">Nama Siswa</th>`;
                            html+=`<th class="text-center text-bg-secondary border-light">Elemen</th>`
                            html+=`<th rowspan="4" class="align-middle text-center text-bg-secondary border-light">Rerata</th>`
                        html+=`</tr>`;
                        html+=`<tr><td class="text-center align-middle text-bg-secondary border-light">TP</td></tr>`;
                        html+=`<tr><td class="text-center align-middle text-bg-secondary border-light">ATP</td></tr>`;
                        html+=`<tr><td class="text-center align-middle text-bg-secondary border-light">KBM</td></tr>`;
                
            }else{
                html+=`<tr>`;
                    html+=`<th rowspan="4" class="text-center text-bg-secondary border-light align-middle" style="width:20px">No. Urut</th>`
                    html+=`<th rowspan="4" class="text-center text-bg-secondary border-light align-middle" style="width:20px">Token Siswa</th>`
                    html+=`<th rowspan="4" class="text-center text-bg-secondary border-light align-middle">Nama Siswa</th>`;
                    
                        desain.baris1_colspan.forEach((colspan,index)=>{
                            if(colspan == 1){
                                html+=`<th class="text-center text-bg-secondary border-light" title="kode Elemen">${desain.baris1_kode[index]}</th>`
    
                            }else{
                                html+=`<th colspan="${colspan}" class="text-center text-bg-secondary border-light" title="Kode Elemen">${desain.baris1_kode[index]}</th>`
                            }
    
                        })
                    
                    html+=`<th rowspan="4" class="align-middle text-center text-bg-secondary border-light">Rerata</th>`
                html+=`</tr>`;
                html+=`<tr>`;
                desain.baris2_colspan.forEach((colspan2,index2)=>{
                    if(colspan2==1){
                        html+=`<th class="text-center text-bg-secondary border-light" title="Kode TP">${desain.baris2_kode[index2]}</th>`;
                    }else{
                        html+=`<th colspan="${colspan2}" class="text-center text-bg-secondary border-light" title="kode TP">${desain.baris2_kode[index2]}</th>`;

                    }
                })
                html+=`</tr>`;
                html+=`<tr>`;
                    desain.baris3_colspan.forEach((colspan3,index3)=>{
                        if(colspan3 == 1){
                            html+=`<th class="text-center text-bg-secondary border-light" title="kode_ATP">${desain.baris3_data[index3].kode}</th>`;
                            
                        }else{
                            html+=`<th colspan="${colspan3}" class="text-center text-bg-secondary border-light"  title="kode_ATP">${desain.baris3_data[index3].kode}</th>`;
    
                        }
                        
                    }) 
                    html+=`</tr>`;
                
                html+=`<tr>`;
                desain.baris4_data.forEach(data=>{
                    html+=`<th class="text-center text-bg-secondary border-light" title="kode_KBM">`;
                            html+=`<button class="btn btn-sm py-0 text-bg-info m-1" data-bs-toggle="tooltip" data-bs-title="Lihat Detail Kbm id=${data.idkbm}" data-aksi="info" data-id="${data.idkbm}"><i class="bi-info"></i></button>`;
                            html+=`<button class="btn btn-sm py-0 text-bg-success m-1" data-bs-toggle="tooltip" data-bs-title="Upload Nilai KBM ini" data-aksi="uploadnilai" data-id="${data.idkbm}"><i class="bi-upload"></i></button>`;
                            html+=`<button class="btn btn-sm py-0 text-bg-warning m-1" data-bs-toggle="tooltip" data-bs-title="Edit Publikasi" data-aksi="editpublikasi" data-id="${data.idkbm}"><i class="bi-gear"></i></button>`;
                    html+=`</th>`;
                })
                // html+=`<th class="text-center text-bg-secondary border-light"></th>`;
                html+=`</tr>`;
                

            }
            html+=`</thead>`;
            html+=`<tbody>`;
                data.forEach((siswa,index)=>{
                    html+=`<tr>`;
                        html+=`<td class="text-center">${index+1}</td>`;
                        html+=`<td class="text-center">${siswa.id}</td>`;
                        html+=`<td class="text-nowrap text-bg-light">${siswa.pd_nama}</td>`;

                        
                        if(Object.keys(desain).length>0){
                            let sebaranmapelAsal = siswa.sebaran_mapel.filter(s=>s.kodemapel == identitas.kodemapel);
                            let nol = 0
                            desain.baris4_data.forEach(data=>{
                                let sebaranmapel = sebaranmapelAsal[0][identitas.jenistagihan];
                                let nilai = sebaranmapel.filter(s=> s.key_tagihan == data.key_tagihan);
                                
                                html+=`<td class="text-center" data-keyimport="${data.key_tagihan}">${nilai[0].nilai?nilai[0].nilai:''}</td>`;
                                nol +=nilai[0].nilai?Number(nilai[0].nilai):0;
                            })
                            //total
                            let rerata = Number((nol/desain.baris4_data.length).toFixed(2));
                            html+=`<td class="text-center">${rerata}</td>`;

                        }else{
                            html+=`<td></td>`
                            html+=`<td></td>`
                        }

                    html+=`</tr>`;

                })
            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;
    // html+=sebaranKdTagihan(sebarankd);
    return html;
}
const viewRekapKurtilas= (identitas, desain,data,sebarankd)=>{
    let html= titleMapel(identitas);
    html+=`<div class="table-responsive">`;
        html+=`<table class="table table-sm table-bordered border-dark tnr font12" id="tabelnilaiasli">`;
            html+=`<thead>`;
            if(Object.keys(desain).length == 0){
                    
                        html+=`<tr>`;
                            html+=`<th rowspan="3" class="text-center text-bg-secondary border-light align-middle" style="width:20px">No. Urut</th>`
                            html+=`<th rowspan="3" class="text-center text-bg-secondary border-light align-middle" style="width:20px">Token Siswa</th>`
                            html+=`<th rowspan="3" class="text-center text-bg-secondary border-light align-middle">Nama Siswa</th>`;
                            html+=`<th class="text-center text-bg-secondary border-light">Kompetensi Dasar</th>`
                            html+=`<th rowspan="3" class="align-middle text-center text-bg-secondary border-light">Rerata</th>`
                        html+=`</tr>`;
                        html+=`<tr><td class="text-center align-middle text-bg-secondary border-light">KD</td></tr>`;
                        html+=`<tr><td class="text-center align-middle text-bg-secondary border-light">KBM</td></tr>`;

                    
            }else{
                html+=`<tr>`;
                    html+=`<th rowspan="3" class="text-center text-bg-secondary border-light align-middle" style="width:20px">No. Urut</th>`
                    html+=`<th rowspan="3" class="text-center text-bg-secondary border-light align-middle" style="width:20px">Token Siswa</th>`
                    html+=`<th rowspan="3" class="text-center text-bg-secondary border-light align-middle">Nama Siswa</th>`;
                    let colspanAll = desain.baris1_colspan.reduce((a,b)=>parseInt(a)+b)
                    html+=`<th colspan="${colspanAll}" class="text-center text-bg-secondary border-light">Kompetensi Dasar</th>`
                    html+=`<th rowspan="3" class="align-middle text-center text-bg-secondary border-light">Rerata</th>`
                html+=`</tr>`;
                html+=`<tr>`;
                
                desain.baris1_colspan.forEach((colspan,index)=>{
                    if(colspan == 1){
                        html+=`<th class="text-center text-bg-secondary border-light" title="kode Elemen">${desain.baris1_data[index]}</th>`
                        
                    }else{
                        html+=`<th colspan="${colspan}" class="text-center text-bg-secondary border-light" title="Kode Elemen">${desain.baris1_data[index]}</th>`
                    }
                    
                });
                html+=`</tr>`;
                html+=`<tr>`;
                desain.baris2_data.forEach(data=>{
                    html+=`<th class="text-center text-bg-secondary border-light" title="kode_KBM">`;
                            html+=`<button class="btn btn-sm py-0 text-bg-info m-1" data-bs-toggle="tooltip" data-bs-title="Lihat Detail id=${data.idkbm}" data-aksi="info" data-id="${data.idkbm}"><i class="bi-info"></i></button>`;
                            html+=`<button class="btn btn-sm py-0 text-bg-success m-1" data-bs-toggle="tooltip" data-bs-title="Upload Nilai KBM ini" data-aksi="uploadnilai" data-id="${data.idkbm}"><i class="bi-upload"></i></button>`;
                            html+=`<button class="btn btn-sm py-0 text-bg-warning m-1" data-bs-toggle="tooltip" data-bs-title="Edit Publikasi" data-aksi="editpublikasi" data-id="${data.idkbm}"><i class="bi-gear"></i></button>`;
                    html+=`</th>`;
                    
                })
                // html+=`<th class="text-center text-bg-secondary border-light"></th>`;
                html+=`</tr>`;
                

            }
            html+=`</thead>`;
            html+=`<tbody>`;
                data.forEach((siswa,index)=>{
                    html+=`<tr>`;
                        html+=`<td class="text-center">${index+1}</td>`;
                        html+=`<td class="text-center">${siswa.id}</td>`;
                        html+=`<td class="text-nowrap text-bg-light">${siswa.pd_nama}</td>`;

                        
                        if(Object.keys(desain).length>0){
                            let sebaranmapelAsal = siswa.sebaran_mapel.filter(s=>s.kodemapel == identitas.kodemapel);
                            let nol = 0;
                            desain.baris2_data.forEach(data=>{
                                let sebaranmapel = sebaranmapelAsal[0][identitas.jenistagihan];
                                let nilai = sebaranmapel.filter(s=> s.key_tagihan == data.key_tagihan)
                                html+=`<td class="text-center" data-keyimport="${data.key_tagihan}">${nilai[0].nilai??''}</td>`;
                                nol +=nilai.length>0?Number(nilai[0].nilai):0;
                            })
                            //total
                            let rerata = Number((nol/desain.baris2_data.length).toFixed(2));
                            html+=`<td class="text-center">${rerata}</td>`;

                        }else{
                            html+=`<td></td>`;
                            html+=`<td>rerata</td>`
                        }

                    html+=`</tr>`;

                })
            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;
    // html+=sebaranKdTagihanKurtilas(sebarankd);
    return html;
}
const cardMapel = (arg)=>{
    return rowCols.rows('mt-1 justify-content-center',
        rowCols.cols('col-md-6',
            cardMenu2('Mata Pelajaran',inputsElements.floatingSelect(arg[0],arg[1],arg[2],arg[3],arg[4]),false)
        ) 
    ) 
}
const tombolCetakIjazah =()=>{
    return rowCols.rows('mt-1 justify-content-center',
        rowCols.cols('col-md-6 text-center',
            `<div class="shadow-lg border p-4 rounded">`+buttonEdu.primary('id="iddetailijazah"','Detail Ijazah')+buttonEdu.primary('id="idprintijazah"','Cetak Ijazah')+`</div>`
        ) 
    ) 
}
const createKolomRaporSementaraKurtilas = (sebaran)=>{
    let arrayColsKd = [];
    let arrayColsKd_data = [];
    let arrayColsTagihan =[];
    let arrayColsTagihan_data =[];

    let arrayKbmIsian = [];
    let arrayBaris2= [];
    let arrayBaris3 = [];
    let totalKolom = 0;
    let result = {};

    sebaran.forEach(n=>{
        let ob_n = {};
        let baris4 = {};
        let totalkdPh = n.dataKbmPh.length == 0?2:n.dataKbmPh.length+1;
        let totalkdPts = n.dataKbmPts.length == 0?2:n.dataKbmPts.length+1;
        let totalkdPaspak = n.dataKbmPaspak.length == 0?2:n.dataKbmPaspak.length+1;
        let baris2 = {};
        let baris3 = {};
        baris3.kolomPh = totalkdPh;
        baris3.kolomPts = totalkdPts;
        baris3.kolomPaspak = totalkdPaspak;
        arrayBaris3.push(baris3);

        baris2.kolomArray = [(totalkdPh+totalkdPts+totalkdPaspak),1];
        baris2.data = [n.kode_kd,'NKD'];
        arrayBaris2.push(baris2);

        baris4.kbm_ph = n.dataKbmPh;
        baris4.nph = n.nilaiph;
        baris4.kbm_pts = n.dataKbmPts;
        baris4.npts = n.nilaipts;
        baris4.kbm_paspak = n.dataKbmPaspak;
        baris4.npaspak = n.nilaipaspak;
        baris4.nkd = n.nilaiKd;
        arrayKbmIsian.push(baris4)
        



        ob_n.kode_kd = n.kode_kd;
        ob_n.kolomtotal_kd = (totalkdPh+totalkdPts+totalkdPaspak);
        ob_n.kolomtotal_kd_addNilaikd = (totalkdPh+totalkdPts+totalkdPaspak) + 1;

        // arrayColsKd.push((totalkdPh+totalkdPts+totalkdPaspak));
        // arrayColsKd_data.push(n.kode_kd);
        // arrayColsKd_data.push('NKD');

        // arrayColsTagihan.push(totalkdPh.length);
        // arrayColsKd.push('NKD');
        // arrayColsTagihan.push(1);
        // arrayColsTagihan.push(totalkdPts.length);
        // arrayColsKd_data.push(n.kode_kd);
        // arrayColsTagihan.push(1);
        // arrayColsKd_data.push('NKD');
        // arrayColsTagihan.push(totalkdPaspak.length);
        // arrayColsKd_data.push(n.kode_kd);
        // arrayColsTagihan.push(1);
        // arrayColsKd_data.push('NKD');

        totalKolom += ((totalkdPh+totalkdPts+totalkdPaspak) + 1);
    });
    result.baris1_col = totalKolom; //number
    result.baris1_data = 'Kompetensi Dasar Pengetahuan';
    result.baris2_data = arrayBaris2;
    // result.baris2_col = arrayColsKd;
    // result.baris2_data = arrayColsKd_data;
    result.baris3_data = arrayBaris3;
    result.baris4_data = arrayKbmIsian;
    return result;
}
const tabelRaportSementara = (identitas, data)=>{
    
}
const viewRekapRaporSementara = (identitas,sebaran, data)=>{
    let html="";
    let refrensi = {};
    html+= titleMapel(identitas);
    html+=`<div class="table-responsive">`;
        html+=`<table class="table table-sm table-bordered border-dark tnr font12" id="tabelnilaiasli">`;
            html+=`<thead>`;
            if(identitas.isKurmer){
                const {dataPH, dataPTS, dataPASPAK} = sebaran;
                html+=`<tr>`;
                    html+=`<th rowspan="3" class="text-center align-middle text-bg-secondary" style="width:20px">No</th>`
                    html+=`<th rowspan="3" class="text-center align-middle text-bg-secondary" style="width:20px">Token Siswa</th>`
                    html+=`<th rowspan="3" class="text-center align-middle text-bg-secondary">Nama Siswa</th>`;

                    if(dataPH.length == 0){
                        html+=`<th class="text-center align-middle text-bg-secondary">Sumatif Harian</th>`
                    }else{
                        html+=`<th colspan="${dataPH.length}" class="text-center align-middle text-bg-secondary">Sumatif Harian</th>`
                    }

                    html+=`<th rowspan="3" class="text-center align-middle text-bg-secondary">Sumatif Tengah Semester</th>`
                    html+=`<th rowspan="3" class="text-center align-middle text-bg-secondary">Sumatif Akhir Semester</th>`
                    html+=`<th rowspan="3" class="text-center align-middle text-bg-secondary">CP Tertinggi</th>`
                    html+=`<th rowspan="3" class="text-center align-middle text-bg-secondary">CP Terendah</th>`
                    html+=`<th rowspan="3" class="text-center align-middle text-bg-secondary">Nilai Rapor</th>`
                html+=`</tr>`;
                html+=`<tr>`;
                if(dataPH.length == 0){
                    html+=`<th class="text-center align-middle text-bg-secondary">Kode ATP</th>`
                }else{
                    html+=`<th colspan="${dataPH.length}" class="text-center align-middle text-bg-secondary">Kode ATP</th>`
                }
                html+=`</tr>`;
                html+=`<tr>`;
                    if(dataPH.length == 0){
                        html+=`<th class="text-center align-middle text-bg-secondary" title="kode ATP"></th>`
                    }else{
                        dataPH.forEach(atp=>{
                            html+=`<th class="text-center align-middle text-bg-secondary" title="kode ATP">${atp.kd}</th>`
                        })
                    }


                html+=`</tr>`;
            }else{  
                refrensi = createKolomRaporSementaraKurtilas(sebaran);
                html+=`<tr>`;
                    html+=`<th rowspan="4" class="text-center align-middle text-bg-secondary" style="width:20px">No</th>`
                    html+=`<th rowspan="4" class="text-center align-middle text-bg-secondary" style="width:20px">Token Siswa</th>`
                    html+=`<th rowspan="4" class="text-center align-middle text-bg-secondary">Nama Siswa</th>`;
                    if(refrensi.baris1_col == 0){
                        html+=`<th class="text-center align-middle text-bg-secondary">${refrensi.baris1_data}</th>`;

                    }else{
                        html+=`<th colspan="${refrensi.baris1_col}" class="text-center align-middle text-bg-secondary">${refrensi.baris1_data}</th>`;

                    }
                    html+=`<th rowspan="4" class="text-center align-middle text-bg-secondary">KD Tertinggi</th>`;
                    html+=`<th rowspan="4" class="text-center align-middle text-bg-secondary">KD Terendah</th>`;
                    html+=`<th rowspan="4" class="text-center align-middle text-bg-secondary">Nilai Rapor</th>`;
                    
                html+=`</tr>`;
                html+=`<tr>`;
                    refrensi.baris2_data.forEach(col=>{
                        let kolom = col.kolomArray;
                        let data = col.data;
                        kolom.forEach((item,i_item)=>{

                            if(item == 1){
                                if(data[i_item]=='NKD'){
                                    html+=`<th rowspan="3" class="text-center align-middle text-bg-success">${data[i_item]}</th>`;

                                }else{
                                    html+=`<th class="text-center align-middle text-bg-secondary">${data[i_item]}</th>`;

                                }

                            }else{
                                html+=`<th colspan="${item}" class="text-center align-middle text-bg-secondary">${data[i_item]}</th>`;
                            }

                        })

                    })
                    
                html+=`</tr>`;
                html+=`<tr>`;
                refrensi.baris3_data.forEach(n=>{
                    const {kolomPh, kolomPts, kolomPaspak} = n;
                    html+=`<th colspan="${kolomPh}" class="text-center align-middle text-bg-secondary">PH</th>`;
                    html+=`<th colspan="${kolomPts}" class="text-center align-middle text-bg-secondary">PTS</th>`;
                    html+=`<th colspan="${kolomPaspak}" class="text-center align-middle text-bg-secondary">PAS/K</th>`;

                })
                html+=`</tr>`;
                html+=`<tr>`;
                    // html+=`<th colspan="${refrensi.baris1_col}"></th>`;
                    refrensi.baris4_data.forEach(kd=>{
                        const {kbm_ph, kbm_pts, kbm_paspak, nph, npts, npaspak, nkd} = kd;
                        if(kbm_ph.length == 0){
                            html+=`<th class="text-center align-middle text-bg-warning">??</td>`
                            html+=`<th class="text-center align-middle text-bg-warning">NPH</td>`
                        }else{
                            kbm_ph.forEach(item=>{
                                html+=`<th class="text-center align-middle text-bg-secondary" title="id KBM">${item.idkbm}</td>`;
                            })
                            html+=`<th class="text-center align-middle text-bg-secondary">NPH</td>`
                            
                        }
                        if(kbm_pts.length == 0){
                            html+=`<th class="text-center align-middle text-bg-warning">??</td>`
                            html+=`<th class="text-center align-middle text-bg-warning">NPTS</td>`
                        }else{
                            kbm_pts.forEach(item=>{
                                html+=`<th class="text-center align-middle text-bg-secondary" title="id KBM">${item.idkbm}</td>`;
                            })
                            html+=`<th class="text-center align-middle text-bg-secondary">NPTS</td>`
                            
                        }
                        if(kbm_paspak.length == 0){
                            html+=`<th class="text-center align-middle text-bg-warning">??</td>`
                            html+=`<th class="text-center align-middle text-bg-warning">NPAS/K</td>`
                        }else{
                            kbm_paspak.forEach(item=>{
                                html+=`<th class="text-center align-middle text-bg-secondary" title="id KBM">${item.idkbm}</td>`;
                            })
                            html+=`<th class="text-center align-middle text-bg-secondary">NPAS/K</td>`
                            
                        }
                        
                        // html+=`<th class="text-center align-middle text-bg-success">NKD</td>`
                    })
                html+=`</tr>`;
            }
            html+=`</thead>`;
            html+=`<tbody>`;
            
            data.forEach((siswa,i_siswa)=>{
                html+=`<tr>`;
                    html+=`<td class="text-center">${i_siswa+1}</td>`;
                    html+=`<td class="text-center">${siswa.id}</td>`;
                    html+=`<td class="text-nowrap text-bg-light">${siswa.pd_nama}</td>`;
                    if(identitas.isKurmer){
                        let datamapel = siswa.sebaran_mapel.filter(s=>s.kodemapel == identitas.kodemapel)[0];
                        const {dataPH, dataPTS, dataPASPAK,kdMaks_objek, kdMin_objek,niai_rapor} = datamapel.raporAsli_olah;
                                                
                        if(dataPH.length == 0){
                            html+=`<td class="text-center"</td>`
                        }else{
                            dataPH.forEach(atp=>{
                                
                                html+=`<td class="text-center">${atp.niai_kd}</td>`
                            })
                        }
                        if(dataPTS.length == 0){
                            html+=`<td class="text-center"></td>`
                        }else{
                            let mapingnilai = dataPTS.map(n=> n.niai_kd);
                            let total = mapingnilai.reduce((a,b)=>a+b)
                            let rerata = Number((total/dataPTS.length).toFixed(2))
                            html+=`<td class="text-center">${rerata}</td>`;
                            
                        };
                        if(dataPASPAK.length == 0){
                            html+=`<td class="text-center"></td>`;
                        }else{
                            let mapingnilai = dataPASPAK.map(n=> n.niai_kd);
                            let total = mapingnilai.reduce((a,b)=>a+b);
                            let rerata = Number((total/dataPASPAK.length).toFixed(2));
                            html+=`<td class="text-center">${rerata}</td>`
                            
                        };
                        html+=`<td class="text-center">${kdMaks_objek.idbaris}</td>`
                        html+=`<td class="text-center">${kdMin_objek.idbaris}</td>`
                        html+=`<td class="text-center">${niai_rapor}</td>`
                    }else{
                        let siswa_olah = siswa.sebaran_mapel.filter(s=>s.kodemapel == identitas.kodemapel)[0];
                        let dataolah = siswa_olah.raporAsli_olah;
                        if(dataolah.length==0){
                            // [...Array(refrensi.baris1_col)].forEach(n=>{
                            //     html+=`<td></td>`
                            // })
                            html+=`<td></td>`

                        }else{
                            dataolah.forEach(kd=>{
                                const {dataKbmPh, dataKbmPts, dataKbmPaspak,nilaiph, nilaipts, nilaipaspak, nilaiKd}=kd;
                                if(dataKbmPh.length ==0){
                                    html+=`<td></td>`;
                                    html+=`<td></td>`;
                                }else{
                                    dataKbmPh.forEach(nkd=>{
                                        if(nkd.nilai){
                                            html+=`<td class="text-center">${nkd.nilai}</td>`;

                                        }else{
                                            html+=`<td></td>`;

                                        }
                                    })

                                    html+=`<td class="text-center">${nilaiph}</td>`;
                                }
                                if(dataKbmPts.length ==0){
                                    html+=`<td></td>`;
                                    html+=`<td></td>`;
                                }else{
                                    dataKbmPts.forEach(nkd=>{
                                        if(nkd.nilai){
                                            html+=`<td class="text-center">${nkd.nilai}</td>`;

                                        }else{
                                            html+=`<td></td>`;

                                        }
                                    })

                                    html+=`<td class="text-center">${nilaipts}</td>`;
                                }
                                if(dataKbmPaspak.length ==0){
                                    html+=`<td></td>`;
                                    html+=`<td></td>`;
                                }else{
                                    dataKbmPaspak.forEach(nkd=>{
                                        if(nkd.nilai){
                                            html+=`<td class="text-center">${nkd.nilai}</td>`;

                                        }else{
                                            html+=`<td></td>`;

                                        }
                                    })

                                    html+=`<td class="text-center">${nilaipaspak}</td>`;
                                }
                                html+=`<td class="text-center text-bg-success">${nilaiKd}</td>`;

                            })
                        }

                        html+=`<td class="text-center">${siswa_olah.predikatMaks_objek.kd3}</td>`
                        html+=`<td class="text-center">${siswa_olah.predikatMin_objek.kd3}</td>`
                        html+=`<td class="text-center">${siswa_olah.nilaiRapor_asli??""}</td>`
                    }
                html+=`</tr>`;
            })
            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;
    return html;
}
const viewRekapRaporSementaraKeterampilan = (identitas,sebaran, data)=>{
    let html="";
    let refrensi = {};
    html+= titleMapel(identitas);
    html+=`<div class="table-responsive">`;
        html+=`<table class="table table-sm table-bordered border-dark tnr font12" id="tabelnilaiasli">`;
            html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th rowspan="3" class="text-center align-middle text-bg-secondary" style="width:20px">No</th>`
                html+=`<th rowspan="3" class="text-center align-middle text-bg-secondary" style="width:20px">Token Siswa</th>`
                html+=`<th rowspan="3" class="text-center align-middle text-bg-secondary">Nama Siswa</th>`
                if(sebaran.length==0){
                    html+=`<th colspan="3" class="text-center align-middle text-bg-secondary" style="width:20px">Kompetensi Dasar Keterampilan</th>`
                    
                }else{
                    let datakd = sebaran[0];
                    let totalPraktek= datakd.dataPraktek.length==0?1:datakd.dataPraktek.length;
                    let totalProduk = datakd.dataProduk.length==0?1:datakd.dataProduk.length;
                    let totalProyek = datakd.dataProyek.length==0?1:datakd.dataProyek.length;
                    let total = (totalPraktek+totalProduk+totalProyek)
                    if(total == 0){
                        html+=`<th colspan="3" class="text-center align-middle text-bg-secondary">Kompetensi Dasar Keterampilan</th>`

                    }else{
                        html+=`<th colspan="${total}" class="text-center align-middle text-bg-secondary">Kompetensi Dasar Keterampilan</th>`

                    }

                }
                 html+=`<th rowspan="3" class="text-center align-middle text-bg-secondary">KD Tertinggi</th>`
                 html+=`<th rowspan="3" class="text-center align-middle text-bg-secondary">KD Terendah</th>`
                 html+=`<th rowspan="3" class="text-center align-middle text-bg-secondary">Nilai Raport</th>`
            html+=`</tr>`;
            html+=`<tr>`;
            if(sebaran.length==0){
                html+=`<th  class="text-center align-middle text-bg-secondary">Praktek</th>`
                html+=`<th class="text-center align-middle text-bg-secondary">Produk</th>`
                html+=`<th class="text-center align-middle text-bg-secondary">Proyek</th>`
            }else{
                let datakd = sebaran[0];
                let totalPraktek= datakd.dataPraktek.length;
                let totalProduk = datakd.dataProduk.length;
                let totalProyek = datakd.dataProyek.length;
                let total = (totalPraktek+totalProduk+totalProyek)
                    if(totalPraktek==0){
                        html+=`<th class="text-center align-middle text-bg-secondary">Praktek</th>`

                    }else{
                        html+=`<th colspan="${totalPraktek}" class="text-center align-middle text-bg-secondary">Praktek</th>`
                    }

                    if(totalProduk == 0){

                        html+=`<th class="text-center align-middle text-bg-secondary">Produk</th>`
                    }else{
                        html+=`<th colspan="${totalProduk}" class="text-center align-middle text-bg-secondary">Produk</th>`

                    }

                    if(totalProyek==0){

                        html+=`<th class="text-center align-middle text-bg-secondary">Proyek</th>`
                    }else{
                        html+=`<th colspan="${totalProyek}" class="text-center align-middle text-bg-secondary">Proyek</th>`

                    }



            }
                
            html+=`</tr>`;
            html+=`<tr>`;
            if(sebaran.length==0){
                html+=`<th class="text-bg-secondary"></th>`
                html+=`<th class="text-bg-secondary"></th>`
                html+=`<th class="text-bg-secondary"></th>`
            }else{
                let datakd = sebaran[0];
                    let totalPraktek= datakd.dataPraktek.length;
                    let totalProduk = datakd.dataProduk.length;
                    let totalProyek = datakd.dataProyek.length;
                        if(totalPraktek==0){
                            html+=`<th class="text-center align-middle text-bg-secondary"></th>`
                        }else{
                            datakd.dataPraktek.forEach(p=>{
                                html+=`<th class="text-center align-middle text-bg-secondary">${p.idkbm}</th>`
                            });
                        }

                        
                        if(totalProduk==0){
                            html+=`<th class="text-center align-middle text-bg-secondary"></th>`
                        }else{
                            datakd.dataProduk.forEach(p=>{
                                html+=`<th class="text-center align-middle text-bg-secondary">${p.idkbm}</th>`
                
                            });
                        }
                        
                        if(totalProyek==0){
                            html+=`<th class="text-center align-middle text-bg-secondary"></th>`
                        }else{
                            datakd.dataProyek.forEach(p=>{
                                html+=`<th class="text-center align-middle text-bg-secondary">${p.idkbm}</th>`
                
                            });
                        }
                            
            }
            html+=`</tr>`;
            html+=`</thead>`;
            html+=`<tbody>`;
            
            data.forEach((siswa,i_siswa)=>{
                html+=`<tr>`;
                    html+=`<td class="text-center">${i_siswa+1}</td>`;
                    html+=`<td class="text-center">${siswa.id}</td>`;
                    html+=`<td class="text-nowrap text-bg-light">${siswa.pd_nama}</td>`;
                        let siswa_olah = siswa.sebaran_mapel.filter(s=>s.kodemapel == identitas.kodemapel)[0];
                        let dataolah = siswa_olah.keterampilan_raporAsli_olah;
                        if(dataolah.length==0){
                            // [...Array(refrensi.baris1_col)].forEach(n=>{
                            //     html+=`<td></td>`
                            // })
                            html+=`<td></td>`
                            html+=`<td></td>`
                            html+=`<td></td>`

                        }else{
                            let datakd = dataolah[0];
                            
                            if(datakd.dataPraktek.length == 0){
                                html+=`<td class="text-center align-middle"></td>`
                            }else{
                                datakd.dataPraktek.forEach(p=>{
                                    html+=`<td class="text-center align-middle">${p.nilai}</td>`
                                    });
                            }
                    
                            if(datakd.dataProduk.length == 0){
                                html+=`<td class="text-center align-middle"></td>`

                            }else{
                                datakd.dataProduk.forEach(p=>{
                                    html+=`<td class="text-center align-middle">${p.nilai}</td>`
                    
                                });
                            }

                            if(datakd.dataProyek.length ==0){

                                html+=`<td class="text-center align-middle"></td>`
                            }else{
                                datakd.dataProyek.forEach(p=>{
                                    html+=`<td class="text-center align-middle">${p.nilai}</td>`
                    
                                });

                            }
                        }

                        html+=`<td class="text-center">${siswa_olah.keterampilan_predikatMaks_objek.kd4}</td>`
                        html+=`<td class="text-center">${siswa_olah.keterampilan_predikatMin_objek.kd4}</td>`
                        html+=`<td class="text-center">${siswa_olah.keterampilan_nilaiRapor_asli??""}</td>`
                    
                html+=`</tr>`;
            })
            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;
    return html;
}
const viewOrmMapel = {
    'cardMapel'                 : cardMapel,
    'viewRekap'                 : viewRekapPH,
    'viewRekapKurtilas'         : viewRekapKurtilas,
    'viewRekapRaporSementara'   : viewRekapRaporSementara,
    'viewRekapRaporSementaraKeterampilan' : viewRekapRaporSementaraKeterampilan,
    'tombolCetakIjazah'         : tombolCetakIjazah

}
export default viewOrmMapel;