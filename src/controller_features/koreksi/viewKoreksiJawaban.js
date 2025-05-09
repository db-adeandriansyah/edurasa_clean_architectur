import buttonEdu from "../../views/components/buttons";
import { cardMenu2 } from "../../views/sidebar/cardSidebar";

const tabelIdentitasModal = (identitas)=>{
    let html="";
    html+=`<table class="table table-sm w3-small">`;
            html+=`<tbody>`;
                html+=`<tr>`;
                    //kolom1
                    html+=`<td class="text-nowrap">Identitas KBM</td>`;
                    html+=`<td style="width:5px">:</td>`;
                    html+=`<td>${identitas.idmapel}</td>`;
                    //kolom2
                    html+=`<td>ID KBM</td>`;
                    html+=`<td style="width:5px">:</td>`;
                    html+=`<td>${identitas.idbaris}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    //kolom1
                    html+=`<td class="text-nowrap">Jenis Tagihan</td>`;
                    html+=`<td style="width:5px">:</td>`;
                    html+=`<td>${identitas.jenistagihan}</td>`;
                    //kolom2
                    html+=`<td class="text-nowrap">Pelaksanaan</td>`;
                    html+=`<td style="width:5px">:</td>`;
                    html+=`<td class="text-nowrap">${identitas.pelaksanaan}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    //kolom1
                    html+=`<td class="text-nowrap">Muatan Pelajaran</td>`;
                    html+=`<td style="width:5px">:</td>`;
                    html+=`<td>${identitas.kodeteks_mapel}</td>`;
                    //kolom2
                    html+=`<td class="text-nowrap">Kompetensi Yang Diukur</td>`;
                    html+=`<td style="width:5px">:</td>`;
                    html+=`<td class="text-nowrap">`;
                        identitas.objek_mapelkd.forEach(n=>{
                            html+=n.mapel
                            html+=' = '
                            html+=n.kd;
                            html+=`<br/>`
                        })
                    html+=`</td>`;
                html+=`</tr>`;
            html+=`</tbody>`;
    html+=`</table>`;
    return html;
}
const tabelDataKoreksian = (identitas,data)=>{
    
    let html="";
        html+=tabelIdentitasModal(identitas);
        html+=`<div class="table-responsive">`;
            html+=`<table class="table table-sm table-bordered border-dark font12">`;
                html+=`<thead>`;
                    html+=`<tr>`;
                        html+=`<th class="text-center text-bg-secondary align-middle">No. Urut</th>`;
                        html+=`<th class="text-center text-bg-secondary align-middle">Nama Siswa</th>`;
                        html+=`<th class="text-center text-bg-secondary align-middle">Status Koreksian</th>`;
                        html+=`<th class="text-center text-bg-secondary align-middle">Nilai Diketahui Siswa</th>`;
                        html+=`<th class="text-center text-bg-secondary align-middle">Nilai Tagihan ${identitas.jenistagihan}</th>`;
                        html+=`<th class="text-center text-bg-secondary align-middle" style="width:120px">Aksi</th>`;
                    html+=`</tr>`;
                html+=`</thead>`;
                html+=`<tbody>`;
                    data.forEach((n,i)=>{
                        if(data.id == 856){
                            console.log(n.algoritma_by_spreadsheet_tabrespon);
                        }
                        html+=`<tr>`;
                            html+=`<td class="text-center">${i+1}</td>`;
                            html+=`<td>${n.pd_nama}</td>`;
                            html+=`<td class="text-center${n.classText}">${n.status_koreksi}</td>`;
                            html+=`<td>`;
                                if(n.algoritma_by_spreadsheet_tabrespon.length>0){
                                    if(n.algoritma_by_spreadsheet_tabrespon.length == 1){
                                        let l = n.algoritma_by_spreadsheet_tabrespon[0].koleksisoal;
                                        html+=`<table class="table table-sm font8 lh-1">`;
                                        html+=`<tr><th class="text-center text-bg-secondary">Tipe</th><th class="text-center text-bg-secondary">Skor</th></tr>`;
                                            l.forEach(ljk=>{
                                                html+=`<tr>`;
                                                    html+=`<td>`;
                                                        html+=ljk.bentuksoalspesifik;
                                                    html+=`</td><td>`;
                                                        html+=ljk.nilai;
                                                    html+=`</td>`;
                                                html+=`</tr>`;
                                            });
                                        html+=`</table>`;
                                    }else{
                                        html+=`<table class="table table-sm table-bordered border-secondary font8">`;
                                            html+=`<thead>`;
                                                html+=`<tr class="text-center">`;
                                                    html+=`<th colspan="2" class="text-center" title="LJK terindikasi duplikat, pilih ljk mana yang akan digunakan. Secara default, aplikasi akan mengambil LJK yang terakhir">TERDAPAT LJK DUPLIKASI</th>`;
                                                html+=`</tr>`;
                                            html+=`</thead>`;
                                            n.algoritma_by_spreadsheet_tabrespon.forEach(ljk=>{
                                                if(data.id == 856){
                                                    console.log(ljk);
                                                }
                                                html+=`<thead>`;
                                                        html+=`<tr class="text-center">`;
                                                                // html+=`<th colspan="2" class="text-center text-bg-secondary" title="LJK terindikasi duplikat, pilih ljk mana yang akan digunakan. Secara default, aplikasi akan mengambil LJK yang terakhir">${ljk.dataspreadsheet.html_jawaban}</th>`;
                                                                html+=`<th colspan="2" class="text-center text-bg-secondary border border-light" title="LJK terindikasi duplikat, pilih ljk mana yang akan digunakan. Secara default, aplikasi akan mengambil LJK yang terakhir">ID LJK =  ${ljk.idbaris_respon}</th>`;
                                                        html+=`</tr>`;
                                                                
                                                        html+=`<tr>`;
                                                            html+=`<th class="text-center text-bg-secondary border-light">Bentuk Soal</th>`;
                                                            html+=`<th class="text-center text-bg-secondary border-light">Skor</th>`;
                                                        html+=`</tr>`;
        
                                                    html+=`</thead>`;
                                                    html+=`<tbody>`;
                                                        ljk.koleksisoal.forEach(lb=>{
                                                            html+=`<tr>`;
                                                                html+=`<td>${lb.bentuksoalspesifik}`;
                                                                html+=`<td>${lb.nilai}`;
                                                            html+=`</tr>`;
                                                        })  
                                                        
                                                        html+=`</tbody>`;
                                                })

                                        html+=`</table>`;
                                    }
                                }else{
                                    html+='';
                                }
                            html+=`</td>`;
                            html+=`<td>`;
                                html+=`<table class="table table-sm lh-1 font8">`;
                                    html+=`<tr>`;
                                        html+=`<th class="text-center text-bg-secondary">Mapel</th>`;
                                        html+=`<th class="text-center text-bg-secondary">KD</th>`;
                                        html+=`<th class="text-center text-bg-secondary">Nilai</th>`;
                                    html+=`</tr>`;
                                n.algoritma_by_spreadsheet_tabtagihan.forEach(s=>{
                                    html+=`<tr>`;
                                        html+=`<td>${s.kodemapel}</td>`;
                                        html+=`<td class="text-center">${s.kd}</td>`;
                                        html+=`<td class="text-center">${s.nilai_tabtagihan}</td>`;
                                    html+=`</tr>`;
                                });
                                html+=`</table>`;
                            html+=`</td>`;
                            html+=`<td class="text-center">`;

                                if(n.kode_koreksi == 0){
                                    html+=buttonEdu.primary(` data-eventkoreksi="ljkbantuisi" data-idsiswa="${n.id}" data-idtabrespon="" data-htmlljk="" `,
                                                `<i class="bi bi-pencil"></i> Bantu Isi`);
                                    
                                }else{
                                    if(n.algoritma_by_spreadsheet_tabrespon.length>1){
                                        //terdapat duplikasi

                                        n.algoritma_by_spreadsheet_tabrespon.forEach(databuton=>{
                                            html+=cardMenu2('ID LJK = '+databuton.idbaris_respon,
                                                buttonEdu.primary(` data-eventkoreksi="ljk" data-idsiswa="${n.id}" data-idtabrespon="${databuton.idbaris_respon}" data-htmlljk="${databuton.ljk}" `,
                                                        `<i class="bi bi-file-earmark"></i> LJK`)
                                                +buttonEdu.secondary(`data-eventkoreksi="koreksi" data-idsiswa="${n.id}" data-idtabrespon="${databuton.idbaris_respon}" data-htmlljk="${databuton.ljk}"`,
                                                        `<i class="bi bi-pencil"></i> Koreksi`)
                                                +buttonEdu.third(` data-eventkoreksi="hapus" data-idsiswa="${n.id}" data-idtabrespon="${databuton.idbaris_respon}" data-htmlljk="${databuton.ljk}"`,
                                                        `<i class="bi bi-trash"></i> Hapus`),false

                                            );

                                        });


    
                                    }else{
                                        let databuton = n.algoritma_by_spreadsheet_tabrespon[0]
                                        html+=buttonEdu.primary(` data-eventkoreksi="ljk" data-idsiswa="${n.id}" data-idtabrespon="${databuton.idbaris_respon}" data-htmlljk="${databuton.ljk}" `,
                                                `<i class="bi bi-file-earmark"></i> LJK`);
                                        html+=buttonEdu.secondary(`data-eventkoreksi="koreksi" data-idsiswa="${n.id}" data-idtabrespon="${databuton.idbaris_respon}" data-htmlljk="${databuton.ljk}"`,
                                                `<i class="bi bi-pencil"></i> ${n.buttons}`);
                                        html+=buttonEdu.third(` data-eventkoreksi="hapus" data-idsiswa="${n.id}" data-idtabrespon="${databuton.idbaris_respon}" data-htmlljk="${databuton.ljk}"`,
                                                `<i class="bi bi-trash"></i> Hapus`);
                                        //LJK
                                        // html+=`<button data-eventkoreksi="ljk" data-idsiswa="${n.id}" data-idtabrespon="${databuton.idbaris_respon}" data-htmlljk="${databuton.ljk}" class="btn btn-info font8 p-1 mx-1 rounded border-bottom border-5 border-dark border-top border-start-0 border-end-0">`;
                                        //     html+=`<i class="bi bi-file-earmark"></i> LJK`
                                        // html+=`</button>`;
                                        // //koreksi ulang
                                        // html+=`<button data-eventkoreksi="koreksiulang" data-idsiswa="${n.id}" data-idtabrespon="${databuton.idbaris_respon}" data-htmlljk="${databuton.ljk}" class="btn btn-success p-1 mx-1 font8 rounded border-bottom border-5 border-dark border-top border-start-0 border-end-0">`;
                                        //     html+=`<i class="bi bi-pencil"></i> ${n.buttons}`;
                                        // html+=`</button>`;
                                        // //hapus
                                        // html+=`<button data-eventkoreksi="hapus" data-idsiswa="${n.id}" data-idtabrespon="${databuton.idbaris_respon}" data-htmlljk="${databuton.ljk}" class="btn btn-danger p-1 mx-1 rounded border-bottom border-5 border-dark border-top border-start-0 border-end-0">`;
                                        //     html+=`<i class="bi bi-trash"></i> Hapus`
                                        // html+=`</button>`;
                                    }
                                }

                                
                            html+=`</td>`;
                        html+=`</tr>`;
                    })
                html+=`</tbody>`;
            html+=`</table>`;

        html+=`</div>`;
    return html;
}
const identitasljk = (identitas)=>{
    let html ="";
    html+=`<h3 class="text-uppercase text-center fw-bolder tnr">LEMBAR JAWABAN EDURASA SISWA</h3>`
    html+=`<table class="table table-sm lh-1 table-borderless mt-3 tnr">`;
        html+=`<tr>`;
            //kolom1;
            html+=`<td>Nama Siswa</td>`;
            html+=`<td style="width:15px">:</td>`;
            html+=`<td class="text-nowrap">${identitas.namasiswa}</td>`;
            html+=`<td class="text-nowrap">Identitas Materi</td>`;
            html+=`<td style="width:15px">:</td>`;
            html+=`<td>${identitas.identitasmateri}</td>`;
        html+=`</tr>`;
        html+=`<tr>`;
            html+=`<td>Kelas</td>`;
            html+=`<td style="width:15px">:</td>`;
            html+=`<td>${identitas.kelas}</td>`;
            html+=`<td class="text-nowrap">Jenis Tagihan</td>`;
            html+=`<td style="width:15px">:</td>`;
            html+=`<td>${identitas.jenistagihan}</td>`;
        html+=`</tr>`;
        html+=`<tr>`;
            html+=`<td class="text-nowrap">Mulai Dikerjakan pada</td>`;
            html+=`<td style="width:15px">:</td>`;
            html+=`<td id="selwaktumulai">${identitas.waktustart_siswa}</td>`;
            html+=`<td>Pelaksanaan</td>`;
            html+=`<td style="width:15px">:</td>`;
            html+=`<td>${identitas.pelaksanaan}</td>`;
        html+=`</tr>`;
        html+=`<tr>`;
            html+=`<td>Selesai dikerjakan pada</td>`;
            html+=`<td style="width:15px">:</td>`;
            html+=`<td id="hasilakhirwaktu">${identitas.waktuakhir_siswa}</td>`;
            html+=`<td class="text-nowrap">Kompetensi yang diukur</td>`;
            html+=`<td style="width:15px">:</td>`;
            html+=`<td>`;
                identitas.mapel_kd.forEach(n=>{
                    html+=n.mapel;
                    html+=' = ';
                    html+=n.kd;
                    html+='<br/>'
                })
            html+=`</td>`;
        html+=`</tr>`;

    html+=`</table>`;
    return html;
}
const viewIsianPG = (kerangka,data,modekoreksi)=>{
    let html="";
    html+=`<table data-tabel="Pilihan Ganda" style="border-collapse:separate;width:100%;font-size:12px;border-bottom:.5pt solid #eee" id="tabelconfigpgbantuisiljk">`;
    html+=`<thead data-selhapus="hapus">`;
        html+=`<tr>`;
            html+=`<th style="width:20px">No.</th>`;
            // html+=`<th style="width:20px">No. Naskah</th>`;
            html+=`<th colspan="${kerangka.hasOpsiD?4:3}" class="text-center">Opsi Jawaban</th>`;
            if(modekoreksi){
                html+=`<th class="text-center">Kunci Jawaban</th>`;
                html+=`<th class="text-center">PG Terpilih</th>`;
                html+=`<th class="text-center">Skor Nilai</th>`;
            }
        html+=`</tr>`;
    html+=`</thead>`;
    html+=`<tbody>`;
    
    let jawabansiswa = data.tabresponsiswa;
    
        if(modekoreksi){ //mode koreksi
            if(kerangka.hasOpsiD){ // jika opsi sampai D
                kerangka.soalsoal.forEach(n=>{
                    html+=`<tr>`;
                    html+=`<td>${n.nosoal}</td>`;
                    //html+=`<td>${n.nobybentuk}</td>`;
                    html+=`<td class="border-bottom border-2 ${jawabansiswa['PG_'+n.nosoal]=='A'?'text-bg-info w3-green ':''}border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">A</td>`;
                    html+=`<td class="border-bottom border-2 ${jawabansiswa['PG_'+n.nosoal]=='B'?'text-bg-info w3-green ':''}border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">B</td>`;
                    html+=`<td class="border-bottom border-2 ${jawabansiswa['PG_'+n.nosoal]=='C'?'text-bg-info w3-green ':''}border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">C</td>`;
                    html+=`<td class="border-bottom border-2 ${jawabansiswa['PG_'+n.nosoal]=='D'?'text-bg-info w3-green ':''}border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">D</td>`;
                    html+=`<td data-selhapus="hapus" class="border text-center">${n.datasoal.kuncijawaban}</td>`;
                    html+=`<td data-selhapus="hapus" class="border"><input class="font12 form-control bg-transparent my-0 border-0" type="text" data-update="PG_${n.nosoal}" value="${jawabansiswa['PG_'+n.nosoal]}" disabled></td>`;
                    html+=`<td data-selhapus="hapus" class="border"><input class="font12 form-control bg-transparent my-0 border-0 p-0 text-center" type="number" data-update="SKOR_${n.nosoal}" value="${jawabansiswa['SKOR_'+n.nosoal]}" disabled></td>`;
                    html+=`</tr>`;
                });

            }else{
                kerangka.soalsoal.forEach(n=>{
                    html+=`<tr>`;
                    html+=`<td>${n.nosoal}</td>`;
                    //html+=`<td>${n.nobybentuk}</td>`;
                    html+=`<td class="border-bottom border-2 ${jawabansiswa['PG_'+n.nosoal]=='A'?'text-bg-info w3-green ':''}border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">A</td>`;
                    html+=`<td class="border-bottom border-2 ${jawabansiswa['PG_'+n.nosoal]=='B'?'text-bg-info w3-green ':''}border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">B</td>`;
                    html+=`<td class="border-bottom border-2 ${jawabansiswa['PG_'+n.nosoal]=='C'?'text-bg-info w3-green ':''}border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">C</td>`;
                    html+=`<td data-selhapus="hapus" class="border text-center">${n.datasoal.kuncijawaban}</td>`;
                    html+=`<td data-selhapus="hapus" class="border"><input class="font12 form-control bg-transparent my-0 border-0" type="text" data-update="PG_${n.nosoal}" value="${jawabansiswa['PG_'+n.nosoal]}" disabled></td>`;
                    html+=`<td data-selhapus="hapus" class="border"><input class="font12 form-control bg-transparent my-0 border-0 p-0 text-center" type="number" data-update="SKOR_${n.nosoal}" value="${jawabansiswa['SKOR_'+n.nosoal]}" disabled></td>`;
                    html+=`</tr>`;
                    
                });
            }

        }else{
            if(kerangka.hasOpsiD){
                kerangka.soalsoal.forEach(n=>{
                    html+=`<tr>`;
                    html+=`<td>${n.nosoal}</td>`;
                    //html+=`<td>${n.nobybentuk}</td>`;
                    html+=`<td class="border-bottom border-2 ${jawabansiswa['PG_'+n.nosoal]=='A'?'text-bg-info w3-green ':''}border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">A</td>`;
                    html+=`<td class="border-bottom border-2 ${jawabansiswa['PG_'+n.nosoal]=='B'?'text-bg-info w3-green ':''}border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">B</td>`;
                    html+=`<td class="border-bottom border-2 ${jawabansiswa['PG_'+n.nosoal]=='C'?'text-bg-info w3-green ':''}border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">C</td>`;
                    html+=`<td class="border-bottom border-2 ${jawabansiswa['PG_'+n.nosoal]=='D'?'text-bg-info w3-green ':''}border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">D</td>`;
                    html+=`</tr>`;
                });

            }else{
                kerangka.soalsoal.forEach(n=>{
                    html+=`<tr>`;
                    html+=`<td>${n.nosoal}</td>`;
                    //html+=`<td>${n.nobybentuk}</td>`;
                    html+=`<td class="border-bottom border-2 ${jawabansiswa['PG_'+n.nosoal]=='A'?'text-bg-info w3-green ':''}border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">A</td>`;
                    html+=`<td class="border-bottom border-2 ${jawabansiswa['PG_'+n.nosoal]=='B'?'text-bg-info w3-green ':''}border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">B</td>`;
                    html+=`<td class="border-bottom border-2 ${jawabansiswa['PG_'+n.nosoal]=='C'?'text-bg-info w3-green ':''}border-start-0 border-end-0 border-black rounded border-top text-center py-2 px-3">C</td>`;
                    html+=`</tr>`;
                    
                });
            }

        }
        html+=`</tbody>`;
    html+=`</table>`;
    
    return cardMenu2('Pilihan Ganda',html,false);
}
const soalDanJawabanIsianSiswa = (n,data,mode)=>{
    
    let html = "";
    let dataLJK = data.dataJawabanInput;
    let refrensi_nilai = data.tabresponsiswa;
    let nilai_current_nosoal = refrensi_nilai['SKOR_'+n.nosoal];
    let nilai = nilai_current_nosoal==""?"":(nilai_current_nosoal*100);

    html+=`<b>Pertanyaan:</b><br>`
    html+=n.datasoal.ilustrasi==""?"":+n.datasoal.ilustrasi+'<br>';
    html+=n.datasoal.pertanyaan;
    let jawabanIsianSiswa = dataLJK.filter(s=>s.nosoal == n.nosoal);
    if(jawabanIsianSiswa.length==0){
        html+=`<br><b>Jawaban Siswa:</b><br><i><b class="text-danger">Siswa tidak Menjawab nomor soal ini atau Jawaban di lembar cetak!</b></i>`;
    }else{
        html+='<br>'
        html+= jawabanIsianSiswa[0].htmljawaban;
    }
    if(mode){
        html+=`<div id="untuklj${n.nosoal}" class="koleksilj" style="border:1px solid red;padding:5px;background-color:#eeeeff" data-refrensinilai="${n.nosoal}">${nilai}</div>`
    }else{
        html+=`<div id="untuklj${n.nosoal}" class="koleksilj" style="border:1px solid red;padding:5px;background-color:#eeeeff" data-refrensinilai="${n.nosoal}">${nilai}</div>`
    }


    return html;
}
const viewIsianManual = (kerangka, data, modekoreksi)=>{
    let html="";
    
    html+=`<div class="p-1 rounded shadow-lg mb-2 ljksiswa_essay">`;
        if(kerangka.bentuksoal=='Menjodohkan'){
            let soal = kerangka.soalsoal[0];
            html+=`<ol style="list-style-type:decimal" start="${soal.nosoal}">`;  
                html+=`<li>`;
                html+=`<div class="text-bg-info container">(No. Soal Naskah: ${soal.nobybentuk})</div>`;
                if(modekoreksi){
                    html+=`<button class="btn btn-sm bg-warning-subtle font10" tabindex="-1" onclick="this.nextElementSibling.classList.toggle('d-none');">Lihat Soal dan Jawaban Siswa</button>`
                    html+=`<div class="">`;
                        html+=soalDanJawabanIsianSiswa(soal,data,true);
                    html+=`</div>`;
                    html+=`<div data-selhapus="hapus" class="shadow-lg rounded p-1 bg-light border"><b class="text-success fw-bold">Pembahasan/Penskoran:</b><br>${soal.datasoal.penskoran}</div>`;
                    html+=`<input class="form-control bg-transparent" type="number" data-update="SKOR_${soal.nosoal}" value="${data.tabresponsiswa['SKOR_'+soal.nosoal]!==''?(parseFloat(data.tabresponsiswa['SKOR_'+soal.nosoal])*100):''}"/>`;
                    html+=`<span class="font10">Skala: 0 - 100</span>`
                }else{
                    html+=`<div>`;
                        html+=soalDanJawabanIsianSiswa(soal, data,modekoreksi);
                    html+=`</div>`;
                }
                html+=`</li>`;
            html+=`</ol>`;
        }else{
            kerangka.soalsoal.forEach((soal,isoal)=>{
                html+=`<ol style="list-style-type:decimal" start="${soal.nosoal}">`;  
                    html+=`<li>`;
                    html+=`<div class="text-bg-info container">(No. Soal Naskah: ${soal.nobybentuk})</div>`;
                    if(modekoreksi){
                        html+=`<button class="btn btn-sm bg-warning-subtle font10" tabindex="-1" onclick="this.nextElementSibling.classList.toggle('d-none');">Lihat Soal dan Jawaban Siswa</button>`
                        html+=`<div class="">`;
                            html+=soalDanJawabanIsianSiswa(soal,data,modekoreksi);
                        html+=`</div>`;
                        html+=`<div data-selhapus="hapus" class="shadow-lg rounded p-1 bg-light border"><b class="text-success fw-bold">Pembahasan/Penskoran:</b><br>${soal.datasoal.penskoran}</div>`;
                        html+=`<input class="form-control bg-transparent" type="number" data-update="SKOR_${soal.nosoal}" value="${data.tabresponsiswa['SKOR_'+soal.nosoal]!==''?(parseFloat(data.tabresponsiswa['SKOR_'+soal.nosoal])*100):''}"/>`;
                        html+=`<span class="font10">Skala: 0 - 100</span>`
                    }else{
                        html+=`<div>`;
                            html+=soalDanJawabanIsianSiswa(soal, data,modekoreksi);
                        html+=`</div>`;
                    }
                    html+=`</li>`;
                html+=`</ol>`;
            })
        }

    html+=`</div>`;
    return cardMenu2(kerangka.bentuksoal,html,false);
}
const viewIsianLjkMenurutTagihan =(tipetagihan,kerangka,modekokreksi = false,data)=>{
    let html="";
    if(tipetagihan == 'Pilihan Ganda'){ // tipetagihan otomatis
        html+=viewIsianPG(kerangka,data,modekokreksi)
    }else{
        // html+=cardMenu2(tipetagihan,'data soal',false);
        html+=viewIsianManual(kerangka,data,modekokreksi)
    }
    return html;
}
const view_nilai_peralgoritma = (data)=>{
    const {nilai_per_algoritma,namaKurikulum} = data;
    let html = "";
    html+=`<table class="w3-table-all lh-1 font10 col-sm-8 mx-auto">`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th>Mata Pelajaran</th>`;
                if(namaKurikulum == 'kurmer'){
                    html+=`<th>Properti Kurikulum (Elemen/ATP)</th>`;
                }else{
                    html+=`<th>Properti Kurikulum (KD-3)</th>`;
                }
                html+=`<th>No. Soal</th>`;
                html+=`<th>Nilai Akhir</th>`;
            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;
            nilai_per_algoritma.forEach(n=>{
                let datakd = n.data;
                let namakurikulum = n.namakurikulum;
                html+=`<tr>`;
                    if(n.jumlahkd>1){
                        html+=`<td rowspan="${n.jumlahkd}">${n.kodemapel_teks}</td>`;
                        datakd.forEach((kd,i_kd)=>{
                            html+=`<td>`;
                                if(namakurikulum=='kurmer'){
                                    html+=`<b>${kd.kd_object.elemen}</b><hr class="m-0 p-0"/>`;
                                    html+=kd.kd_object.atp;
                                }else{
                                    if(['kpraktik','kproduk','kproyek','uspraktek'].includes(kd.jenistagihan)){
                                        html+=`<b>${kd.kd_object.kd4}. </b>${kd.kd_object.indikatorkd4}`;
                                    }else{
                                        html+=`<b>${kd.kd_object.kd3}. </b>${kd.kd_object.indikatorkd3}`;

                                    }

                                }
                            html+=`</td>`;
                            html+=`<td>${kd.nosoal.join(', ')}</td>`;
                            html+=`<td>${kd.nilai_respon}</td>`;
                            if(i_kd < datakd.length-1){
                                html+=`</tr><tr>`
                            }
                        })
                    }else{
                        let kd = datakd[0];
                        
                        html+=`<td>${n.kodemapel_teks}</td>`;
                        html+=`<td>`;
                            if(namakurikulum=='kurmer'){
                                html+=`<b>${kd.kd_object.elemen}</b><hr class="m-0 p-0"/>`;
                                html+=kd.kd_object.atp;
                            }else{
                                if(['kpraktik','kproduk','kproyek','uspraktek'].includes(kd.jenistagihan)){
                                    html+=`<b>${kd.kd_object.kd4}. </b>${kd.kd_object.indikatorkd4}`;
                                }else{
                                    html+=`<b>${kd.kd_object.kd3}. </b>${kd.kd_object.indikatorkd3}`;

                                }

                            }
                        html+=`</td>`;
                        html+=`<td>${kd.nosoal.join(', ')}</td>`;
                        html+=`<td>${kd.nilai_respon}</td>`;

                    }
                    
                html+=`</tr>`;
            })

        html+=`</tbody>`;

    html+=`</table>`;
    return html;
}
const view_nilai_perbentuksoal = (data)=>{
    let html = "";
    const {nilai_pertagihan} = data;
        html+=`<div class="row row-cols-md-4 g-2">`;
            nilai_pertagihan.forEach(m=>{
                html+=`<div class="col">`;
                    html+=cardMenu2(m.bentuksoalspesifik,`<div class="d-flex justify-content-center align-align-items-center font16 fw-bold">${m.nilai}</div>`,false);
                html+=`</div>`;
            });
        html+=`</div>`;
    return html;
}
const viewLJK = (identitas,data,modekoreksi=false)=>{
    
    let html = "";
    html+=`<div class="row rounded table-responsive tnr justify-content-center w3-row">`;
        html+=`<div class="col-12 l12">`;
            html+=identitasljk(identitas);
        html+=`</div>`;
        if(data.hasOtomatis && data.hasManual){
            html+=`<div class="col-md-4">`;
                data.kerangka.forEach(n=>{
                    if(['Pilihan Ganda','PG Kompleks','BenarSalah'].includes(n.bentuksoal)){
                        html+=viewIsianLjkMenurutTagihan(n.bentuksoal,n,modekoreksi,data)
                    }
                })
            html+=`</div>`;
            html+=`<div class="col-md-8">`;
                data.kerangka.forEach(n=>{
                    if(['Isian','Essay','Menjodohkan','Menulis Rapih'].includes(n.bentuksoal)){
                        html+=viewIsianLjkMenurutTagihan(n.bentuksoal,n,modekoreksi,data)
                    }
                });
                // if(!modekoreksi){
                // }
                html+=cardMenu2('Nilai Bentuk Soal',
                        `<div id="view_nilai_perbentuksoal">`+
                            view_nilai_perbentuksoal(data)+
                        `</div>`
                    ,false);
                html+=cardMenu2('Nilai Kompetensi',
                        `<div id="view_nilai_peralgoritma">`+
                            view_nilai_peralgoritma(data)+`
                        </div>`
                    ,false);
            html+=`</div>`;
        }else {
            if(modekoreksi){
                data.kerangka.forEach(n=>{

                    if(['Pilihan Ganda','PG Kompleks','BenarSalah'].includes(n.bentuksoal)){
                        html+=`<div class="col-4">`;
                    }else{
                        html+=`<div class="col-6">`;
                    }
                            html+=viewIsianLjkMenurutTagihan(n.bentuksoal,n,modekoreksi,data)
                        html+=`</div>`;
                        
                });
                html+=`<div class="col-6">`;
                    html+=cardMenu2('Nilai Bentuk Soal',
                            `<div id="view_nilai_perbentuksoal">`+
                                view_nilai_perbentuksoal(data)+
                            `</div>`
                        ,false);
                    html+=cardMenu2('Nilai Kompetensi',
                            `<div id="view_nilai_peralgoritma">`+
                                view_nilai_peralgoritma(data)+`
                            </div>`
                        ,false);
                html+=`</div>`;
            }else{
                
                data.kerangka.forEach(n=>{
                    if(['Pilihan Ganda','PG Kompleks','BenarSalah'].includes(n.bentuksoal)){
                        html+=`<div class="col-4">`;
                    }else{
                        html+=`<div class="col-6">`;

                    }
                        html+=viewIsianLjkMenurutTagihan(n.bentuksoal,n,modekoreksi,data)
                        html+=`</div>`;
                })
                
                html+=`<div class="col-6">`;
                    html+=cardMenu2('Nilai Bentuk Soal',
                            `<div id="view_nilai_perbentuksoal">`+
                                view_nilai_perbentuksoal(data)+
                            `</div>`
                        ,false);
                    html+=cardMenu2('Nilai Kompetensi',
                            `<div id="view_nilai_perbentuksoal">`+
                                view_nilai_peralgoritma(data)+`
                            </div>`
                        ,false);
                html+=`</div>`;

            }
        }
        
    html+=`</div>`;
    return html;
}
const viewModal1Printable = (htmlapi,btnsave=false)=>{
    let html = '';
    html+=`<div id="print-area-modal">`;
        html+=htmlapi;
    html+='</div>';

    
    html+=`<div class="fixed-bottom text-center mb-3">`;
    
        html +=`<button id="btnback" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Kembali"><i class="bi-arrow-return-left"></i> Kembali</button>`;
        html +=`<button id="btncetaknaskah" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Cetak"><i class="bi-printer"></i> Cetak</button>`;
        html +=`<button id="btncetakword" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Simpan ke Ms. Word"><i class="bi-file-word"></i> Ms. Word</button>`;
        html +=`<button id="btncetakpdf" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Simpan ke pdf"><i class="bi-file-pdf"></i> Pdf</button>`;

        if(btnsave){
            html +=`<button id="btnSaveKoreksian" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-transisi-unscrolled rounded-pill rounded py-0" title="Simpan ke Server"><i class="bi-floppy"></i> Simpan Server</button>`;
            // html +=`<button id="btnPreviewLJK" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-transisi-unscrolled rounded-pill rounded py-0" title="Preview LJK Update"><i class="bi-floppy"></i> Preview LJK</button>`;
        }

    html+=`</div>`;
    return html;
}
const viewKonfirmasiHapus = (data)=>{
    let html = "";
    html+=`<div class="alert alert-warning">`;
        html+=`<h4 class="text-center">Anda yakin akan menghapus Item ini?</h4>`;
        html+=`<p class="font14 text-center">Item LJK ini akan dihapus dan tidak ditampilkan di LJK milik siswa. Akan tetapi, rekapitulasi tagihan ${data.jenistagihan} tidak berubah.</p>`;
        html+=`<p class="font14 text-center">Gunakan Fitur Upload Nilai KBM jika Anda ingin mengedit nilai Tagihany terhapus, atau Anda bantu isi kembali.</p>`;
        html+=`<div class="d-flex justify-content-center align-items-center" style="height:300px">`
            html+=buttonEdu.primary('id="btnhapus"','Hapus');
        html+=`</div>`;
    html+=`</div>`;
    return html;
}
const viewKoreksiJawaban = {
    'tabelDataKoreksian':tabelDataKoreksian,
    'viewLjk':viewLJK,
    'viewModal1Printable':viewModal1Printable,
    'view_nilai_perbentuksoal':view_nilai_perbentuksoal,
    'view_nilai_peralgoritma':view_nilai_peralgoritma,
    'viewKonfirmasiHapus':viewKonfirmasiHapus
};
export default viewKoreksiJawaban;
