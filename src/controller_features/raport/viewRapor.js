//import controlbanksoal from "../../views/banksoal/controlBankSoal";
import buttonEdu from "../../views/components/buttons";
import inputsElements from "../../views/components/input-elements";
import rowCols from "../../views/components/row-cols";
import { cardMenu } from "../../views/sidebar/cardSidebar";

const controlHTMLPrint = (siswa) =>{
    let html="";
        html+=`<div class="sticky-md-bottom text-center accord-bg print-hide rounded shadow-lg py-2">`;
            html+=`<div class="row justify-content-center">`;
                
                html+=`<div class="col-6">`;
                    html+=`<div class="input-group input-group-sm">`;
                        html+=`<button class="btn btn-sm btn-outline-primary" type="button" id="btnLeft">&#8612;</button>`;
                        html+=`<select class="form-select form-select-sm" id="selectTargetSiswa">`;
                            for(let i = 0 ; i < siswa.length; i++){
                                html+=`<option value="${siswa[i].id}">${siswa[i].pd_nama}</option>`;
                            }
                        html+=`</select>`;
                        html+=`<button class="btn btn-sm btn-outline-primary" type="button" id="btnRight">&#8614;</button>`;
                    html+=`</div>`;
                    html+=`</div>`;
                    html+=`<button class="btn btn-sm neon-lite border-bottom border-5 border-warning rounded-pill py-1 px-2 col-lg-1 col-2" id="btnPrintKelulusan">PRINT</button>`;
            html+=`</div>`
        html+=`</div>`;
    return html;
}
const viewDepanRapor = (data,siswa)=>{
    let html="";
    html+=`<div id="areaPrint">`;
        //FIRST PAGE
       
        // html+=`<div class="clearfix">&nbsp</div>`;
        html+=`<div style="min-height:98vh!important;break-inside: avoid;" class="border  mb-2 d-flex flex-column justify-content-around px-2">`;
        html+=`<div class="text-center my-3">`;
                html+=`<img src="${data.src_garuda}" style="width:80px;height:80px">`
            html+=`</div>`;
            html+=`<h3 class="text-center mt-3 pt-3 mb-0 fw-bolder">`;
                html+=`BUKU RAPORT<br>UTPD SDN RATUJAYA 1`
            html+=`</h3>`;
            html+=`<small class="text-center mb-4">`;
                html+=`NOMOR STATIS SEKOLAH (NSS):${data.nss} `;
                html+=`NOMOR POKOK SEKOLAH NASIONAL (NPSN):${data.npsn} `;
            html+=`</small>`;
            html+=`<div class="ms-auto me-auto text-center" style="height:305px">`;
                html+=`<img src="${data.src_tut_wuri}"  class="print-hide" style="width:300px;">`
            html+=`</div>`;

            html+=`<div class="border border-1 border-dark row mt-5 mb-2 mx-5 fs-5">`;
                html+=`<div class="col-3 d-flex">`;
                    html+=`<div>Nama siswa</div>`;
                    html+=`<div class="ms-auto">:</div>`;
                html+=`</div>`;
                html+=`<div class="col-9 fw-bold" data-isian="pd_nama">Loerm Epsum Dollor Sit</div>`;
            html+=`</div>`;

            html+=`<div class="border border-1 border-dark row mx-5 fs-5">`;
                html+=`<div class="col-3 d-flex">`;
                    html+=`<div>NIS/NISN</div>`;
                    html+=`<div class="ms-auto">:</div>`;
                html+=`</div>`;
                html+=`<div class="col-9 fw-bold" data-isian="nisnisn">1234567890</div>`;
            html+=`</div>`;
            html+=`<div class="mt-5 mb-0 pt-5 fw-bolder fs-4 px-5 text-center">`;
                html+="KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI<br>"
                html+=`REPUBLIK INDONESIA`
            html+=`</div>`;
        html+=`</div>`;
        //Halaman 2
        html+=`<div style="min-height:98vh!important;break-inside: avoid;" class="border  mb-2 d-flex flex-column justify-content-around px-2">`;
        html+=`<h4 class="fw-bold text-center">RAPORT PESERTA DIDIK<br>JENJANG SEKOLAH DASAR</h4>`;
            html+=`<table class="mt-3 table table-borderless lh-lg">`;
                html+=`<tbody>`;
                    html+=`<tr>`;
                        html+=`<td class="d-flex text-uppercase text-nowrap">`;
                            html+=`nama sekolah`;
                            html+=`<span class="ms-auto">:</span>`;
                        html+=`</td>`;
                        html+=`<td>${data.namasekolah}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="d-flex text-uppercase text-nowrap">`;
                            html+=`NOMOR POKOK SEKOLAH NASIONAL`;
                            html+=`<span class="ms-auto">:</span>`;
                        html+=`</td>`;
                        html+=`<td>${data.npsn}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="d-flex text-uppercase text-nowrap">`;
                            html+=`NOMOR STATISTIK SEKOLAH`;
                            html+=`<span class="ms-auto">:</span>`;
                        html+=`</td>`;
                        html+=`<td>${data.nss}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="d-flex text-uppercase text-nowrap">`;
                            html+=`Alamat Sekolah`;
                            html+=`<span class="ms-auto">:</span>`;
                        html+=`</td>`;
                        html+=`<td>${data.alamatsekolah}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="d-flex text-uppercase text-nowrap">`;
                            html+=`No Telepon`;
                            html+=`<span class="ms-auto">:</span>`;
                        html+=`</td>`;
                        html+=`<td>-</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="d-flex text-uppercase text-nowrap">`;
                            html+=`Kode Pos`;
                            html+=`<span class="ms-auto">:</span>`;
                        html+=`</td>`;
                        html+=`<td>${data.kodepos}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="d-flex text-uppercase text-nowrap">`;
                            html+=`Kelurahan`;
                            html+=`<span class="ms-auto">:</span>`;
                        html+=`</td>`;
                        html+=`<td>${data.alamatkelurahan}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="d-flex text-uppercase text-nowrap">`;
                            html+=`Kecamatan`;
                            html+=`<span class="ms-auto">:</span>`;
                        html+=`</td>`;
                        html+=`<td>${data.alamatkecamatan}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="d-flex text-uppercase text-nowrap">`;
                            html+=`Kota/Kabupaten`;
                            html+=`<span class="ms-auto">:</span>`;
                        html+=`</td>`;
                        html+=`<td>${data.alamatkota}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="d-flex text-uppercase text-nowrap">`;
                            html+=`Provinsi`;
                            html+=`<span class="ms-auto">:</span>`;
                        html+=`</td>`;
                        html+=`<td>${data.alamatprovinsi}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="d-flex text-uppercase text-nowrap">`;
                            html+=`Website`;
                            html+=`<span class="ms-auto">:</span>`;
                        html+=`</td>`;
                        html+=`<td>${data.web}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="d-flex text-uppercase text-nowrap">`;
                            html+=`Email`;
                            html+=`<span class="ms-auto">:</span>`;
                        html+=`</td>`;
                        html+=`<td>${data.email}</td>`;
                    html+=`</tr>`;
                html+=`</tbody>`;
            html+=`</table>`;
            html+=`<div style="height:100px"> &nbsp;</div>`
        html+=`</div>`;
        //Halaman 3
        html+=`<div style="min-height:98vh!important;break-inside: avoid;" class="border  mb-2 d-flex flex-column justify-content-around px-2">`;
        html+=`<h4 class="fw-bold text-center">RAPORT PESERTA DIDIK<br>JENJANG SEKOLAH DASAR</h4>`;
            html+=`<table class="table table-borderless">`;
                html+=`<tbody>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex">1. Nama Peserta Didik (Lengkap) <span class="ms-auto">:</span></td>`;
                        html+=`<td data-isian="pd_nama" style="width:400px">Lorem Ipsum</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex">2. Nomor Induk Siswa <span class="ms-auto">:</span></td>`;
                        html+=`<td data-isian="nis"></td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex">3. Nomor Induk Siswa Nasional <span class="ms-auto">:</span></td>`;
                        html+=`<td data-isian="nisn"></td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex">4. Tempat, tanggal lahir <span class="ms-auto">:</span></td>`;
                        html+=`<td data-isian="ttl"></td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex">5. Jenis Kelamin <span class="ms-auto">:</span></td>`;
                        html+=`<td data-isian="pd_jk"></td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex">6. Agama <span class="ms-auto">:</span></td>`;
                        html+=`<td data-isian="pd_agama"></td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex">6. Alamat <span class="ms-auto">:</span></td>`;
                        html+=`<td data-isian="pd_alamat"></td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex">7. No. Telepon Rumah <span class="ms-auto">:</span></td>`;
                        html+=`<td></td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex">8. Sekolah Asal <span class="ms-auto">:</span></td>`;
                        html+=`<td data-isian="dapo_sekolahasal"></td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex" colspan="2">9. Diterima di sekolah ini:</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex ps-4">a. Di Kelas <span class="ms-auto">:</span></td>`;
                        html+=`<td data-isian="awal_kelas"></td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex ps-4">b. Pada tanggal <span class="ms-auto">:</span></td>`;
                        html+=`<td data-isian="masuk_tgl"></td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex" colspan="2">10. Nama Orang Tua:</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex ps-4">a. Ayah <span class="ms-auto">:</span></td>`;
                        html+=`<td data-isian="pd_namaayah"></td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex ps-4">b. Ibu <span class="ms-auto">:</span></td>`;
                        html+=`<td data-isian="pd_namaibu"></td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex" colspan="2">11. Pekerjaan Orang Tua:</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex ps-4">a. Ayah <span class="ms-auto">:</span></td>`;
                        html+=`<td data-isian="dapo_pekerjaanayah"></td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex ps-4">b. Ibu <span class="ms-auto">:</span></td>`;
                        html+=`<td data-isian="dapo_pekerjaanibu"></td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex" colspan="2">12. Wali Murid:</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex ps-4">a. nama <span class="ms-auto">:</span></td>`;
                        html+=`<td data-isian="dapo_namawali"></td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex ps-4">b. pekerjaan <span class="ms-auto">:</span></td>`;
                        html+=`<td data-isian="dapo_pekerjaanwali"></td>`;
                    html+=`</tr>`;
                    html+=`<tr><td colspan="2" style="height:50px"></td></tr>`;
                    
                    html+=`<tr>`;
                        html+=`<td class="text-nowrap d-flex ps-4"><div class="ms-auto border border-1 border-dark me-2" style="width:3cm;height:4cm"></div></td>`;
                        html+=`<td><div class="d-flex flex-column align-items-center text-center justify-content-between pe-5" style="height:4cm">`;
                            html+=`<p class="mb-0 me-5">${data.alamatkota}, <span data-isian="masuk_tgl"></span><br>Kepala ${data.namasekolah}</p>`;
                            html+=`<p class="mb-0 me-5"><u><b>${data.kepsek}</b></u><br>${data.nipkepsek}</p>`
                        html+=`</div></td>`;
                    html+=`</tr>`;
                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;
    html+=`</div>`;
    html+=controlHTMLPrint(siswa);
    return html;
}
const tabelDataRapo = (sebaran,mapelNonAgama, data,modeInput)=>{
    let html ="";
    html+=`<table class="table table-sm table-bordered border-dark font12 toExcel" id="tabelnilairapor">`;
        html+=`<thead>`;
            //baris 1
            html+=`<tr>`;
                html+=`<th rowspan="3" style="width:20px" class="text-center align-middle text-bg-secondary">No</th>`;
                html+=`<th rowspan="3" style="width:20px" class="text-center align-middle text-bg-secondary">ID</th>`;
                html+=`<th rowspan="3" class="text-center align-middle text-bg-secondary">Nama Siswa</th>`;
                let kolomMapel = (mapelNonAgama.length+1);
                let properti_mapel_cek = sebaran.filter(s=> s.kodemapel == 'PAI');
                let teksKkm_cek = properti_mapel_cek[0]?properti_mapel_cek[0].ket_kkmkktp:'KKMKKTP'
                html+=`<th colspan="${kolomMapel}" class="text-center align-middle text-bg-secondary">Mata Pelajaran/${teksKkm_cek}</th>`;
                html+=`<th rowspan="3" style="width:30px" class="text-center align-middle text-bg-secondary">Rerata</th>`;
                html+=`<th rowspan="3" style="width:20px" class="text-center align-middle text-bg-secondary">Rangking</th>`;
            html+=`</tr>`;
            //baris 2, data mapelnya;
            html+=`<tr>`;
                html+=`<th class="text-center align-middle text-bg-secondary">Pendidikan Agama</th>`;
                mapelNonAgama.forEach(element => {
                    html+=`<th class="text-center align-middle text-bg-secondary">${element.label}</th>`;
                    
                });
            html+=`</tr>`;
            //baris 3, data KKM mapelnya;
            html+=`<tr>`;
                let properti_mapel = sebaran.filter(s=> s.kodemapel == 'PAI');
                let teksKkm = properti_mapel[0]?properti_mapel[0].ket_kkmkktp:'KKMKKTP'
                let teksKkm_nilai = properti_mapel[0]?properti_mapel[0].kkm:'72';
                html+=`<th class="text-center align-middle text-bg-secondary">${teksKkm_nilai}</th>`;
                mapelNonAgama.forEach(element => {
                    
                    properti_mapel = sebaran.filter(s=> s.kodemapel == element.value);
                    teksKkm = properti_mapel[0]?properti_mapel[0].ket_kkmkktp:'KKM';
                    teksKkm_nilai = properti_mapel[0]?properti_mapel[0].kkm:'72';
                    
                    html+=`<th class="text-center align-middle text-bg-secondary" style="min-width:80px">${teksKkm_nilai}</th>`;
                    
                });
            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;
        data.forEach((siswa, i_siswa)=>{
            html+=`<tr>`;
                html+=`<td class="text-center" data-key="id">${i_siswa+1}</td>`;
                html+=`<td class="text-center" data-server="id" data-key="tokensiswa">${siswa.id}</td>`;
                html+=`<td class="text-nowrap text-bg-light" data-server="namasiswa" data-key="namasiswa">${siswa.pd_nama}</td>`;
                if(modeInput){
                    const datarapr = siswa.dataRapor_Siap;
                    let count = 0;
                    datarapr.forEach(rapor=>{
                        let kodemapel = rapor.kodemapel;
                        
                        count+=rapor[kodemapel];
                        if(['PKRIS','PKATO'].includes(rapor.kodemapel)){
                            if(rapor.hasData){
                                html+=`<td class="text-center bg-info-subtle p-0" title="${rapor.kodemapel} (${rapor.kkmkktp_nilai})">`;
                                    html+=`<input type="number" class="bg-transparent m-0 border-0 text-center form-control" data-server="${kodemapel}" data-key="${kodemapel}" value="${rapor[kodemapel]}"/>`;
                                html+=`</td>`;

                            }else{
                                html+=`<td class="text-center text-bg-warning p-0" title="${rapor.kodemapel} (${rapor.kkmkktp_nilai})">`;
                                    html+=`<input type="number" class="bg-transparent m-0 border-0 text-center form-control" data-server="${kodemapel}" data-key="${kodemapel}" value="${rapor[kodemapel]}"/>`;
                                html+=`</td>`;

                            }
                            
                        }else{
                            if(rapor.hasData){
                                html+=`<td class="text-center p-0" title="${rapor.kodemapel} (${rapor.kkmkktp_nilai})">`;
                                    html+=`<input type="number" class="bg-transparent m-0 border-0 text-center form-control" data-server="${kodemapel}" data-key="${kodemapel}" value="${rapor[kodemapel]}"/>`;
                                html+=`</td>`;
                            }else{
                                html+=`<td class="text-center text-bg-warning p-0" title="${rapor.kodemapel} (${rapor.kkmkktp_nilai})">`;
                                    html+=`<input type="number" class="bg-transparent m-0 border-0 text-center form-control" data-server="${kodemapel}" data-key="${kodemapel}" value="${rapor[kodemapel]}"/>`;
                                html+=`</td>`;
                            }
                        }
                    });
                    let rerata = (count/datarapr.length).toFixed(2)
                    html+=`<td class="text-center">${rerata}</td>`;
                    html+=`<td class="text-center"></td>`;
                    
                    

                }else{
                    const datarapr = siswa.dataRapor;
                    let count = 0;
                    datarapr.forEach(rapor=>{
                        count+=rapor.raporAsli_nilai;
                        if(['PKRIS','PKATO'].includes(rapor.kodemapel)){
                            html+=`<td class="text-center text-bg-info" title="${rapor.kodemapel}" data-kodemapel="${rapor.kodemapel}">${rapor.raporAsli_nilai}</td>`;
                            
                        }else{
                            html+=`<td class="text-center" title="${rapor.kodemapel}" data-kodemapel="${rapor.kodemapel}">${rapor.raporAsli_nilai}</td>`;
                        }
                    });
                    let rerata = (count/datarapr.length).toFixed(2)
                    html+=`<td class="text-center" data-key="rerata" data-keyvalue="${rerata}">${rerata}</td>`;
                    html+=`<td class="text-center" data-key="rangking" data-keyvalue=""></td>`;

                }

            html+=`</tr>`;
        })
        html+=`</tbody>`;
    html+=`</table>`;
    return html;
}
const tabelDataRapoKeterampilan = (sebaran,mapelNonAgama, data,modeInput)=>{
    let html ="";
    html+=`<table class="table table-sm table-bordered border-dark font12 toExcel" id="tabelnilairapor">`;
        html+=`<thead>`;
            //baris 1
            html+=`<tr>`;
                html+=`<th rowspan="3" style="width:20px" class="text-center align-middle text-bg-secondary">No</th>`;
                html+=`<th rowspan="3" style="width:20px" class="text-center align-middle text-bg-secondary">ID</th>`;
                html+=`<th rowspan="3" class="text-center align-middle text-bg-secondary">Nama Siswa</th>`;
                let kolomMapel = (mapelNonAgama.length+1);
                let properti_mapel_cek = sebaran.filter(s=> s.kodemapel == 'PAI');
                let teksKkm_cek = properti_mapel_cek[0]?properti_mapel_cek[0].ket_kkmkktp:'KKMKKTP'
                html+=`<th colspan="${kolomMapel}" class="text-center align-middle text-bg-secondary">Mata Pelajaran/${teksKkm_cek}</th>`;
                html+=`<th rowspan="3" style="width:30px" class="text-center align-middle text-bg-secondary">Rerata</th>`;
                html+=`<th rowspan="3" style="width:20px" class="text-center align-middle text-bg-secondary">Rangking</th>`;
            html+=`</tr>`;
            //baris 2, data mapelnya;
            html+=`<tr>`;
                html+=`<th class="text-center align-middle text-bg-secondary">Pendidikan Agama</th>`;
                mapelNonAgama.forEach(element => {
                    html+=`<th class="text-center align-middle text-bg-secondary">${element.label}</th>`;
                    
                });
            html+=`</tr>`;
            //baris 3, data KKM mapelnya;
            html+=`<tr>`;
                let properti_mapel = sebaran.filter(s=> s.kodemapel == 'PAI');
                let teksKkm = properti_mapel[0]?properti_mapel[0].ket_kkmkktp:'KKMKKTP'
                let teksKkm_nilai = properti_mapel[0]?properti_mapel[0].kkm:'72';
                html+=`<th class="text-center align-middle text-bg-secondary">${teksKkm_nilai}</th>`;
                mapelNonAgama.forEach(element => {
                    
                    properti_mapel = sebaran.filter(s=> s.kodemapel == element.value);
                    teksKkm = properti_mapel[0]?properti_mapel[0].ket_kkmkktp:'KKM';
                    teksKkm_nilai = properti_mapel[0]?properti_mapel[0].kkm:'72';
                    
                    html+=`<th class="text-center align-middle text-bg-secondary" style="min-width:80px">${teksKkm_nilai}</th>`;
                    
                });
            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;
        data.forEach((siswa, i_siswa)=>{
            html+=`<tr>`;
                html+=`<td class="text-center" data-key="id">${i_siswa+1}</td>`;
                html+=`<td class="text-center" data-server="id" data-key="tokensiswa">${siswa.id}</td>`;
                html+=`<td class="text-nowrap text-bg-light" data-server="namasiswa" data-key="namasiswa">${siswa.pd_nama}</td>`;
                if(modeInput){
                    const datarapr = siswa.dataRapor_Siap;
                    let count = 0;
                    datarapr.forEach(rapor=>{
                        let kodemapel = rapor.kodemapel;
                        
                        count+=rapor[kodemapel];
                        if(['PKRIS','PKATO'].includes(rapor.kodemapel)){
                            if(rapor.hasData){
                                html+=`<td class="text-center bg-info-subtle p-0" title="${rapor.kodemapel} (${rapor.kkmkktp_nilai})">`;
                                    html+=`<input type="number" class="bg-transparent m-0 border-0 text-center form-control" data-mapel="${kodemapel}"  data-server="${kodemapel}_NILAI_KETERAMPILAN" data-key="${kodemapel}_NILAI_KETERAMPILAN" value="${rapor[kodemapel+'_NILAI_KETERAMPILAN']}"/>`;
                                html+=`</td>`;

                            }else{
                                html+=`<td class="text-center text-bg-warning p-0" title="${rapor.kodemapel} (${rapor.kkmkktp_nilai})">`;
                                    html+=`<input type="number" class="bg-transparent m-0 border-0 text-center form-control" data-mapel="${kodemapel}"  data-server="${kodemapel}_NILAI_KETERAMPILAN" data-key="${kodemapel}_NILAI_KETERAMPILAN'" value="${rapor[kodemapel+'_NILAI_KETERAMPILAN']}"/>`;
                                html+=`</td>`;

                            }
                            
                        }else{
                            if(rapor.hasData){
                                html+=`<td class="text-center p-0" title="${rapor.kodemapel} (${rapor.kkmkktp_nilai})">`;
                                    html+=`<input type="number" class="bg-transparent m-0 border-0 text-center form-control" data-mapel="${kodemapel}"  data-server="${kodemapel}_NILAI_KETERAMPILAN" data-key="${kodemapel}_NILAI_KETERAMPILAN" value="${rapor[kodemapel+'_NILAI_KETERAMPILAN']}"/>`;
                                html+=`</td>`;
                            }else{
                                html+=`<td class="text-center text-bg-warning p-0" title="${rapor.kodemapel} (${rapor.kkmkktp_nilai})">`;
                                    html+=`<input type="number" class="bg-transparent m-0 border-0 text-center form-control" data-mapel="${kodemapel}"  data-server="${kodemapel}_NILAI_KETERAMPILAN" data-key="${kodemapel}_NILAI_KETERAMPILAN" value="${rapor[kodemapel+'_NILAI_KETERAMPILAN']}"/>`;
                                html+=`</td>`;
                            }
                        }
                    });
                    let rerata = (count/datarapr.length).toFixed(2)
                    html+=`<td class="text-center">${rerata}</td>`;
                    html+=`<td class="text-center"></td>`;
                    
                    

                }else{
                    const datarapr = siswa.dataRapor;
                    let count = 0;
                    datarapr.forEach(rapor=>{
                        count+=rapor.raporAsli_nilai;
                        if(['PKRIS','PKATO'].includes(rapor.kodemapel)){
                            html+=`<td class="text-center text-bg-info" title="${rapor.kodemapel}" data-kodemapel="${rapor.kodemapel}">${rapor.keterampilan_raporAsli_nilai}</td>`;
                            
                        }else{
                            html+=`<td class="text-center" title="${rapor.kodemapel}" data-kodemapel="${rapor.kodemapel}">${rapor.keterampilan_raporAsli_nilai}</td>`;
                        }
                    });
                    let rerata = (count/datarapr.length).toFixed(2)
                    html+=`<td class="text-center" data-key="rerata" data-keyvalue="${rerata}">${rerata}</td>`;
                    html+=`<td class="text-center" data-key="rangking" data-keyvalue=""></td>`;

                }

            html+=`</tr>`;
        })
        html+=`</tbody>`;
    html+=`</table>`;
    return html;
}
const tabelDataRapoPerbandingan = (sebaran,mapelNonAgama, data,namamundur)=>{
    let html ="";
    html+=`<table class="table table-sm table-bordered border-dark font12 toExcel" id="tabelnilairapor">`;
        html+=`<thead>`;
            //baris 1
            html+=`<tr>`;
                html+=`<th rowspan="3" style="width:20px" class="text-center align-middle text-bg-secondary">No</th>`;
                html+=`<th rowspan="3" style="width:20px" class="text-center align-middle text-bg-secondary">ID</th>`;
                html+=`<th rowspan="3" class="text-center align-middle text-bg-secondary">Nama Siswa</th>`;
                let kolomMapel = (mapelNonAgama.length+1)*2;
                let properti_mapel_cek = sebaran.filter(s=> s.kodemapel == 'PAI');
                let teksKkm_cek = properti_mapel_cek[0]?properti_mapel_cek[0].ket_kkmkktp:'KKMKKTP'
                html+=`<th colspan="${kolomMapel}" class="text-center align-middle text-bg-secondary">Mata Pelajaran/${teksKkm_cek}</th>`;
                // html+=`<th rowspan="3" style="width:30px" class="text-center align-middle text-bg-secondary">Rerata</th>`;
                // html+=`<th rowspan="3" style="width:20px" class="text-center align-middle text-bg-secondary">Rangking</th>`;
            html+=`</tr>`;
            //baris 2, data mapelnya;
            html+=`<tr>`;
                html+=`<th colspan="2" class="text-center align-middle text-bg-secondary">Pendidikan Agama</th>`;
                mapelNonAgama.forEach(element => {
                    html+=`<th colspan="2" class="text-center align-middle text-bg-secondary">${element.label}</th>`;
                    
                });
            html+=`</tr>`;
            //baris 3, data KKM mapelnya;
            html+=`<tr>`;
                let properti_mapel = sebaran.filter(s=> s.kodemapel == 'PAI');
                // let teksKkm = properti_mapel[0]?properti_mapel[0].ket_kkmkktp:'KKMKKTP'
                // let teksKkm_nilai = properti_mapel[0]?properti_mapel[0].kkm:'72';
                html+=`<th class="text-center align-middle text-bg-secondary">Sebelumnya</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary">Sekarang</th>`;
                mapelNonAgama.forEach(element => {
                    
                    // properti_mapel = sebaran.filter(s=> s.kodemapel == element.value);
                    // teksKkm = properti_mapel[0]?properti_mapel[0].ket_kkmkktp:'KKM';
                    // teksKkm_nilai = properti_mapel[0]?properti_mapel[0].kkm:'72';
                    
                    html+=`<th class="text-center align-middle text-bg-secondary" style="min-width:80px">Sebelumnya</th>`;
                    html+=`<th class="text-center align-middle text-bg-secondary" style="min-width:80px">Sekarang</th>`;
                    
                });
            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;
        data.forEach((siswa, i_siswa)=>{
            html+=`<tr>`;
                html+=`<td class="text-center" data-key="id">${i_siswa+1}</td>`;
                html+=`<td class="text-center" data-server="id" data-key="tokensiswa">${siswa.id}</td>`;
                html+=`<td class="text-nowrap text-bg-light" data-server="namasiswa" data-key="namasiswa">${siswa.pd_nama}</td>`;
                
                    const datarapr = siswa.dataRapor_Siap_Plus_Sebelumnya;
                    let count = 0;
                    datarapr.forEach(rapor=>{
                        let kodemapel = rapor.kodemapel;
                        
                        count+=rapor[kodemapel];
                        if(['PKRIS','PKATO'].includes(rapor.kodemapel)){
                            if(rapor['hasData']){
                                html+=`<td class="text-center align-middle bg-info" title="Nilai Rapor Sebelumnya">${rapor[kodemapel+namamundur]}</td>`;
                                html+=`<td class="text-center bg-info-subtle p-0" title="${rapor.kodemapel} (${rapor.kkmkktp_nilai})">`;
                                    html+=`<input type="number" class="bg-transparent m-0 border-0 text-center form-control" data-server="${kodemapel}" data-key="${kodemapel}" value="${rapor[kodemapel]}"/>`;
                                html+=`</td>`;

                            }else{
                                html+=`<td class="text-center align-middle bg-info" title="Nilai Rapor Sebelumnya">${rapor[kodemapel+namamundur]}</td>`;
                                html+=`<td class="text-center text-bg-warning p-0" title="${rapor.kodemapel} (${rapor.kkmkktp_nilai})">`;
                                    html+=`<input type="number" class="bg-transparent m-0 border-0 text-center form-control" data-server="${kodemapel}" data-key="${kodemapel}" value="${rapor[kodemapel]}"/>`;
                                html+=`</td>`;

                            }
                            
                        }else{
                            if(rapor['hasData']){
                                html+=`<td class="text-center align-middle bg-info" title="Nilai Rapor Sebelumnya">${rapor[kodemapel+namamundur]}</td>`;
                                html+=`<td class="text-center p-0" title="${rapor.kodemapel} (${rapor.kkmkktp_nilai})">`;
                                    html+=`<input type="number" class="bg-transparent m-0 border-0 text-center form-control" data-server="${kodemapel}" data-key="${kodemapel}" value="${rapor[kodemapel]}"/>`;
                                html+=`</td>`;
                            }else{
                                html+=`<td class="text-center align-middle bg-info" title="Nilai Rapor Sebelumnya">${rapor[kodemapel+namamundur]}</td>`;
                                html+=`<td class="text-center text-bg-warning p-0" title="${rapor.kodemapel} (${rapor.kkmkktp_nilai})">`;
                                    html+=`<input type="number" class="bg-transparent m-0 border-0 text-center form-control" data-server="${kodemapel}" data-key="${kodemapel}" value="${rapor[kodemapel]}"/>`;
                                html+=`</td>`;
                            }
                        }
                    });
                    // let rerata = (count/datarapr.length).toFixed(2)
                    // html+=`<td class="text-center">${rerata}</td>`;
                    // html+=`<td class="text-center"></td>`;
                    
                    

                

            html+=`</tr>`;
        })
        html+=`</tbody>`;
    html+=`</table>`;
    return html;
}
const tabelDataRapoPerbandinganKeterampilan = (sebaran,mapelNonAgama, data,namamundur)=>{
    let html ="";
    html+=`<table class="table table-sm table-bordered border-dark font12 toExcel" id="tabelnilairapor">`;
        html+=`<thead>`;
            //baris 1
            html+=`<tr>`;
                html+=`<th rowspan="3" style="width:20px" class="text-center align-middle text-bg-secondary">No</th>`;
                html+=`<th rowspan="3" style="width:20px" class="text-center align-middle text-bg-secondary">ID</th>`;
                html+=`<th rowspan="3" class="text-center align-middle text-bg-secondary">Nama Siswa</th>`;
                let kolomMapel = (mapelNonAgama.length+1)*2;
                let properti_mapel_cek = sebaran.filter(s=> s.kodemapel == 'PAI');
                let teksKkm_cek = properti_mapel_cek[0]?properti_mapel_cek[0].ket_kkmkktp:'KKMKKTP'
                html+=`<th colspan="${kolomMapel}" class="text-center align-middle text-bg-secondary">Mata Pelajaran/${teksKkm_cek}</th>`;
                // html+=`<th rowspan="3" style="width:30px" class="text-center align-middle text-bg-secondary">Rerata</th>`;
                // html+=`<th rowspan="3" style="width:20px" class="text-center align-middle text-bg-secondary">Rangking</th>`;
            html+=`</tr>`;
            //baris 2, data mapelnya;
            html+=`<tr>`;
                html+=`<th colspan="2" class="text-center align-middle text-bg-secondary">Pendidikan Agama</th>`;
                mapelNonAgama.forEach(element => {
                    html+=`<th colspan="2" class="text-center align-middle text-bg-secondary">${element.label}</th>`;
                    
                });
            html+=`</tr>`;
            //baris 3, data KKM mapelnya;
            html+=`<tr>`;
                let properti_mapel = sebaran.filter(s=> s.kodemapel == 'PAI');
                // let teksKkm = properti_mapel[0]?properti_mapel[0].ket_kkmkktp:'KKMKKTP'
                // let teksKkm_nilai = properti_mapel[0]?properti_mapel[0].kkm:'72';
                html+=`<th class="text-center align-middle text-bg-secondary">Sebelumnya</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary">Sekarang</th>`;
                mapelNonAgama.forEach(element => {
                    
                    // properti_mapel = sebaran.filter(s=> s.kodemapel == element.value);
                    // teksKkm = properti_mapel[0]?properti_mapel[0].ket_kkmkktp:'KKM';
                    // teksKkm_nilai = properti_mapel[0]?properti_mapel[0].kkm:'72';
                    
                    html+=`<th class="text-center align-middle text-bg-secondary" style="min-width:80px">Sebelumnya</th>`;
                    html+=`<th class="text-center align-middle text-bg-secondary" style="min-width:80px">Sekarang</th>`;
                    
                });
            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;
        data.forEach((siswa, i_siswa)=>{
            html+=`<tr>`;
                html+=`<td class="text-center" data-key="id">${i_siswa+1}</td>`;
                html+=`<td class="text-center" data-server="id" data-key="tokensiswa">${siswa.id}</td>`;
                html+=`<td class="text-nowrap text-bg-light" data-server="namasiswa" data-key="namasiswa">${siswa.pd_nama}</td>`;
                
                    const datarapr = siswa.dataRapor_Siap_Plus_Sebelumnya;
                    let count = 0;
                    datarapr.forEach(rapor=>{
                        let kodemapel = rapor.kodemapel;
                        
                        count+=rapor[kodemapel];
                        if(['PKRIS','PKATO'].includes(rapor.kodemapel)){
                            if(rapor['hasData']){
                                html+=`<td class="text-center align-middle bg-info" title="Nilai Rapor Sebelumnya">${rapor[kodemapel+'_NILAI_KETERAMPILAN'+namamundur]}</td>`;
                                html+=`<td class="text-center bg-info-subtle p-0" title="${rapor.kodemapel} (${rapor.kkmkktp_nilai})">`;
                                    html+=`<input type="number" class="bg-transparent m-0 border-0 text-center form-control" data-server="${kodemapel}_NILAI_KETERAMPILAN" data-mapel="${kodemapel}" data-key="${kodemapel}_NILAI_KETERAMPILAN" value="${rapor[kodemapel+'_NILAI_KETERAMPILAN']}"/>`;
                                html+=`</td>`;

                            }else{
                                html+=`<td class="text-center align-middle bg-info" title="Nilai Rapor Sebelumnya">${rapor[kodemapel+'_NILAI_KETERAMPILAN'+namamundur]}</td>`;
                                html+=`<td class="text-center text-bg-warning p-0" title="${rapor.kodemapel} (${rapor.kkmkktp_nilai})">`;
                                    html+=`<input type="number" class="bg-transparent m-0 border-0 text-center form-control" data-server="${kodemapel}_NILAI_KETERAMPILAN" data-mapel="${kodemapel}"  data-key="${kodemapel}_NILAI_KETERAMPILAN" value="${rapor[kodemapel+'_NILAI_KETERAMPILAN']}"/>`;
                                html+=`</td>`;

                            }
                            
                        }else{
                            if(rapor['hasData']){
                                html+=`<td class="text-center align-middle bg-info" title="Nilai Rapor Sebelumnya">${rapor[kodemapel+'_NILAI_KETERAMPILAN'+namamundur]}</td>`;
                                html+=`<td class="text-center p-0" title="${rapor.kodemapel} (${rapor.kkmkktp_nilai})">`;
                                    html+=`<input type="number" class="bg-transparent m-0 border-0 text-center form-control" data-mapel="${kodemapel}" data-mapel="${kodemapel}"   data-server="${kodemapel}_NILAI_KETERAMPILAN" data-key="${kodemapel}_NILAI_KETERAMPILAN" value="${rapor[kodemapel+'_NILAI_KETERAMPILAN']}"/>`;
                                html+=`</td>`;
                            }else{
                                html+=`<td class="text-center align-middle bg-info" title="Nilai Rapor Sebelumnya">${rapor[kodemapel+'_NILAI_KETERAMPILAN'+namamundur]}</td>`;
                                html+=`<td class="text-center text-bg-warning p-0" title="${rapor.kodemapel} (${rapor.kkmkktp_nilai})">`;
                                    html+=`<input type="number" class="bg-transparent m-0 border-0 text-center form-control" data-mapel="${kodemapel}" data-mapel="${kodemapel}"   data-server="${kodemapel}_NILAI_KETERAMPILAN" data-key="${kodemapel}_NILAI_KETERAMPILAN" value="${rapor[kodemapel+'_NILAI_KETERAMPILAN']}"/>`;
                                html+=`</td>`;
                            }
                        }
                    });
                    // let rerata = (count/datarapr.length).toFixed(2)
                    // html+=`<td class="text-center">${rerata}</td>`;
                    // html+=`<td class="text-center"></td>`;
                    
                    

                

            html+=`</tr>`;
        })
        html+=`</tbody>`;
    html+=`</table>`;
    return html;
}
const tabelRekapRapor = (data,input=false)=>{
    let html = "";
    if(input){
        html+=`<div id="areaprint">`;
            html+=`<h3 class="text-center mb-0">Rekapitulasi Raport Sementara</h3>`;
            html+=`<h4 class="text-center mb-0">Kelas ${data.kelas} Semester ${data.semester}</h4>`;
            html+=`<h4 class="text-center mb-3">Tahun Pelajaran ${data.tapel}</h4>`;
            html+=`<div class="table-responsive">`;
                html+=tabelDataRapo(data.sebaran,data.labelMapel,data.data,input);
            html+=`</div>`;
        html+=`</div>`;
        html+=`<div class="sticky-md-bottom text-center accord-bg print-hide rounded shadow-lg py-2"><button class="btn btn-sm text-bg-danger mx-1 d-none" data-klik="kembalikannilaiasli">Nilai Asli</button><button class="btn btn-sm text-bg-warning mx-1" data-klik="exportExcel">Export</button><label for="importModal" class="btn btn-sm text-bg-secondary mx-1">Import</label><input type="file" class="d-none" id="importModal" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"><button class="btn btn-sm text-bg-success mx-1" data-klik="simpanserver">Simpan Server</button></div>`;
    }else{
        html+=`<h3 class="text-center mb-0">Rekapitulasi Raport Sementara</h3>`;
        html+=`<h4 class="text-center mb-0">Kelas ${data.kelas} Semester ${data.semester}</h4>`;
        html+=`<h4 class="text-center mb-3">Tahun Pelajaran ${data.tapel}</h4>`;
        html+=`<div class="table-responsive">`;
            html+=tabelDataRapo(data.sebaran,data.labelMapel,data.data,input);
        html+=`</div>`;

    }
    return html;
}
const tabelRekapRaporKeterampilan = (data,input=false)=>{
    let html = "";
    if(input){
        html+=`<div id="areaprint">`;
            html+=`<h3 class="text-center mb-0">Rekapitulasi Raport Sementara Keterampilan</h3>`;
            html+=`<h4 class="text-center mb-0">Kelas ${data.kelas} Semester ${data.semester}</h4>`;
            html+=`<h4 class="text-center mb-3">Tahun Pelajaran ${data.tapel}</h4>`;
            html+=`<div class="table-responsive">`;
                html+=tabelDataRapoKeterampilan(data.sebaran,data.labelMapel,data.data,input);
            html+=`</div>`;
        html+=`</div>`;
        html+=`<div class="sticky-md-bottom text-center accord-bg print-hide rounded shadow-lg py-2"><button class="btn btn-sm text-bg-danger mx-1 d-none" data-klik="kembalikannilaiasli">Nilai Asli</button><button class="btn btn-sm text-bg-warning mx-1" data-klik="exportExcel">Export</button><label for="importModal" class="btn btn-sm text-bg-secondary mx-1">Import</label><input type="file" class="d-none" id="importModal" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"><button class="btn btn-sm text-bg-success mx-1" data-klik="simpanserver">Simpan Server</button></div>`;
    }else{
        html+=`<h3 class="text-center mb-0">Rekapitulasi Raport Sementara Keterampilan</h3>`;
        html+=`<h4 class="text-center mb-0">Kelas ${data.kelas} Semester ${data.semester}</h4>`;
        html+=`<h4 class="text-center mb-3">Tahun Pelajaran ${data.tapel}</h4>`;
        html+=`<div class="table-responsive">`;
            html+=tabelDataRapoKeterampilan(data.sebaran,data.labelMapel,data.data,input);
        html+=`</div>`;

    }
    return html;
}
const tabelRaporPerbandingan =(data,namamundur,pengetahuan=true)=>{
    let html = "";
    html+=`<div id="areaprint">`;
            html+=`<h3 class="text-center mb-0">Perbandingan Nilai dengan Semester Sebelumnya</h3>`;
            html+=`<h4 class="text-center mb-0">(Sebelumnya Kelas ${data.semestersebelumnya.rombelMundur} Semester ${data.semestersebelumnya.semesterMundur} Tapel ${data.semestersebelumnya.api.label})</h4>`
            html+=`<h3 class="text-center mb-0">dengan</h3>`;
            html+=`<h4 class="text-center mb-3">(Sekarang Kelas ${data.kelas} Semester ${data.semester} Tapel ${data.tapel}</h4>`;
            html+=`<div class="table-responsive">`;
                if(pengetahuan){
                    html+=tabelDataRapoPerbandingan(data.sebaran,data.labelMapel,data.data,namamundur);
                    
                    }else{
                    html+=tabelDataRapoPerbandinganKeterampilan(data.sebaran,data.labelMapel,data.data,namamundur);

                }
            html+=`</div>`;
        html+=`</div>`;
        html+=`<div class="sticky-md-bottom text-center accord-bg print-hide rounded shadow-lg py-2"><button class="btn btn-sm text-bg-success mx-1" data-klik="simpanserver">Simpan Server</button></div>`;
    
    return html;
}

const html_setting_predikat = (identitas, dataserver)=>{
    let html="";
    html+=`<h3 class="text-center mb-0">Pengaturan Predikat Nilai</h3>`;
    html+=`<h4 class="text-center mb-0">Jenjang Kelas ${identitas.jenjang}</h4>`;
    html+=`<h4 class="text-center mb-3">${identitas.kurikulum=='kurmer'?'Kurikulum Merdeka':'Kurikulum 2013'}</h4>`;
    html+=`<table class="w3-table-all font10 toExcel" id="tabel_setting_predikat">`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th>No/id</th>`;
                html+=`<th>Predikat</th>`;
                html+=`<th>Batas terendah (>)</th>`;
                html+=`<th>Batas tertinggi (≤)</th>`;
            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;
            if(dataserver.length == 0){
                //sangat baik
                html+=`<tr class="text-bg-warning">`;
                    html+=`<td data-key="id">1</td>`;
                    html+=`<td class="p-0"><input type="text" class="form-control text-center m-0 border-0 bg-transparent" data-key="predikat" value="Sangat Baik"/></td>`;
                    html+=`<td class="p-0"><input type="number" class="form-control text-center m-0 border-0 bg-transparent" data-key="min" value="90"/></td>`;
                    html+=`<td class="p-0"><input type="number" class="form-control text-center m-0 border-0 bg-transparent" data-key="maks" value="100"/></td>`;
                html+=`</tr>`;
                //baik
                html+=`<tr class="text-bg-warning">`;
                    html+=`<td data-key="id">2</td>`;
                    html+=`<td class="p-0"><input type="text" class="form-control text-center m-0 border-0 bg-transparent" data-key="predikat" value="Baik"/></td>`;
                    html+=`<td class="p-0"><input type="number" class="form-control text-center m-0 border-0 bg-transparent" data-key="min" value="80"/></td>`;
                    html+=`<td class="p-0"><input type="number" class="form-control text-center m-0 border-0 bg-transparent" data-key="maks" value="90"/></td>`;
                html+=`</tr>`;
                //Cukup
                html+=`<tr class="text-bg-warning">`;
                    html+=`<td data-key="id">3</td>`;
                    html+=`<td class="p-0"><input type="text" class="form-control text-center m-0 border-0 bg-transparent" data-key="predikat" value="Cukup"/></td>`;
                    html+=`<td class="p-0"><input type="number" class="form-control text-center m-0 border-0 bg-transparent" data-key="min" value="70"/></td>`;
                    html+=`<td class="p-0"><input type="number" class="form-control text-center m-0 border-0 bg-transparent" data-key="maks" value="80"/></td>`;
                html+=`</tr>`;
                //Perlu Bimbingan
                html+=`<tr class="text-bg-warning">`;
                    html+=`<td data-key="id">4</td>`;
                    html+=`<td class="p-0"><input type="text" class="form-control text-center m-0 border-0 bg-transparent" data-key="predikat" value="Perlu Bimbingan"/></td>`;
                    html+=`<td class="p-0"><input type="number" class="form-control text-center m-0 border-0 bg-transparent" data-key="min" value="0"/></td>`;
                    html+=`<td class="p-0"><input type="number" class="form-control text-center m-0 border-0 bg-transparent" data-key="maks" value="70"/></td>`;
                html+=`</tr>`;

            }else{
                //sangat baik
                dataserver.forEach((db,i_db)=>{
                    html+=`<tr>`;
                        html+=`<td data-key="id">${db.id}</td>`;
                        html+=`<td class="p-0"><input type="text" class="form-control text-center m-0 border-0 bg-transparent" data-key="predikat" value="${db.predikat}"/></td>`;
                        html+=`<td class="p-0"><input type="number" class="form-control text-center m-0 border-0 bg-transparent" data-key="min" value="${db.min}"/></td>`;
                        html+=`<td class="p-0"><input type="number" class="form-control text-center m-0 border-0 bg-transparent" data-key="maks" value="${db.maks}"/></td>`;
                    html+=`</tr>`;

                })
                // //baik
                // html+=`<tr class="text-bg-warning">`;
                //     html+=`<td data-key="id">1</td>`;
                //     html+=`<td class="m-0"><input type="text" class="form-control m-0 border-0 bg-transparent" data-key="predikat" value="Baik"/></td>`;
                //     html+=`<td class="m-0"><input type="number" class="form-control m-0 border-0 bg-transparent" data-key="min" value="80"/></td>`;
                //     html+=`<td class="m-0"><input type="number" class="form-control m-0 border-0 bg-transparent" data-key="maks" value="90"/></td>`;
                // html+=`</tr>`;
                // //Cukup
                // html+=`<tr class="text-bg-warning">`;
                //     html+=`<td data-key="id">1</td>`;
                //     html+=`<td class="m-0"><input type="text" class="form-control m-0 border-0 bg-transparent" data-key="predikat" value="Cukup"/></td>`;
                //     html+=`<td class="m-0"><input type="number" class="form-control m-0 border-0 bg-transparent" data-key="min" value="70"/></td>`;
                //     html+=`<td class="m-0"><input type="number" class="form-control m-0 border-0 bg-transparent" data-key="maks" value="80"/></td>`;
                // html+=`</tr>`;
                // //Perlu Bimbingan
                // html+=`<tr class="text-bg-warning">`;
                //     html+=`<td data-key="id">1</td>`;
                //     html+=`<td class="m-0"><input type="text" class="form-control m-0 border-0 bg-transparent" data-key="predikat" value="Perlu Bimbingan"/></td>`;
                //     html+=`<td class="m-0"><input type="number" class="form-control m-0 border-0 bg-transparent" data-key="min" value="0"/></td>`;
                //     html+=`<td class="m-0"><input type="number" class="form-control m-0 border-0 bg-transparent" data-key="maks" value="70"/></td>`;
                // html+=`</tr>`;

            }

        html+=`</tbody>`;
        html+=`<tfoot>`;
            html+=`<th colspan="4" class="text-center">`;
                html+=`<button class="btn btn-sm btn-success rounded" id="simpanpredikat">Simpan</button>`;
            html+=`</th>`;
        html+=`</tfoot>`;
        
    html+=`</table>`;
    html+=`<small>Jika tabel berwarna kuning, artinya predikat bawaan aplikasi. Jika tidak, maka diambil dari data server yang telah Anda/teman Anda atur</small>`;
    return html;
}
const selectioning_html_predikat = (data)=>{
    const {
        key,
        val
    } = data;
    let html="";
    html+=`<select data-edit="${key}" data-server="${key}" class="form-select form-select-sm bg-transparent border-0">`;
        html+=`<option ${val==""?"selected ":""}value="">Belum Memilih</option>`;
        html+=`<option ${val=="Sangat Baik"?"selected ":""}value="Sangat Baik">Sangat Baik</option>`;
        html+=`<option ${val=="Baik"?"selected ":""}value="Baik">Baik</option>`;
        html+=`<option ${val=="Cukup"?"selected ":""}value="Cukup">Cukup</option>`;
        html+=`<option ${val=="Perlu Bimbingan"?"selected ":""}value="Perlu Bimbingan">Perlu Bimbingan</option>`;
    html+=`</select>`;
    return html;
}
const tabel_setting_predikat = (data,fokusMapel,editable=false)=>{
    let html = "";
    html+=`<table class="table table-sm table-bordered border-dark font10" id="olahrapor">`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th rowspan="2" class="text-center align-middle text-bg-secondary broder-light" style="width:20px">No</th>`
                html+=`<th rowspan="2" class="text-center align-middle text-bg-secondary broder-light" style="width:20px">ID</th>`
                html+=`<th rowspan="2" class="text-center align-middle text-bg-secondary broder-light">Nama Siswa</th>`;
                html+=`<th rowspan="2" class="text-center align-middle text-bg-secondary broder-light">Nilai Rapor</th>`;
                if(!data.isKurmer){
                    html+=`<th rowspan="2" class="text-center align-middle text-bg-secondary broder-light" style="width:100px">Predikat Nilai Rapor</th>`;

                }
                html+=`<th colspan="2" class="text-center align-middle text-bg-secondary broder-light">Maksimum</th>`;
                html+=`<th colspan="2" class="text-center align-middle text-bg-secondary broder-light">Minimum</th>`;
                html+=`<th rowspan="2" class="text-center align-middle text-bg-secondary broder-light">Deskripsi</th>`;
            html+=`</tr>`;
            html+=`<tr>`;
            if(data.isKurmer){
                html+=`<th class="text-center align-middle text-bg-secondary broder-light">ATP</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary broder-light" style="width:100px">Predikat</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary broder-light">ATP</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary broder-light" style="width:100px">Predikat</th>`;

            }else{
                html+=`<th class="text-center align-middle text-bg-secondary broder-light">KD</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary broder-light" style="width:100px">Predikat</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary broder-light" style="width:100px">KD</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary broder-light" style="width:100px">Predikat</th>`;

            }
            html+=`</tr>`;

        html+=`</thead>`;
        html+=`<tbody>`;
        //let datamapel
        let dbs = data.data;
        dbs.forEach((siswa,i_siswa)=>{
            html+=`<tr>`;
                html+=`<td class="text-center">${i_siswa+1}</td>`;
                html+=`<td class="text-center" data-server="id">${siswa.id}</td>`;
                html+=`<td class="text-nowrap"  data-server="namasiswa">${siswa.pd_nama}</td>`;
                let db = siswa.dataRapor_Siap.filter(s=>s.kodemapel == fokusMapel);
                if(db.length>0){
                    html+=`<td class="text-center">${db[0][fokusMapel]}</td>`;
                    if(editable){ /// ada input select;

                        if(data.isKurmer){
                            //kdMaks
                            html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`kdmaks_${fokusMapel}`)?'':'text-bg-warning'}" data-server="kdmaks_${fokusMapel}">${db[0]['kdmaks_'+fokusMapel].idbaris??db[0]['kdmaks_'+fokusMapel]}</td>`;
                            html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`predikat_kdmaks_${fokusMapel}`)?'':'text-bg-warning'} p-0">`;
                                html+=selectioning_html_predikat({
                                key:'predikat_kdmaks_'+fokusMapel,
                                val:db[0]['predikat_kdmaks_'+fokusMapel]
                                })
                            html+=`</td>`;
                            html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`kdmin_${fokusMapel}`)?'':'text-bg-warning'}" data-server="kdmin_${fokusMapel}">${db[0]['kdmin_'+fokusMapel].idbaris??db[0]['kdmin_'+fokusMapel]}</td>`;
                            html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`predikat_kdmin_${fokusMapel}`)?'':'text-bg-warning'} p-0">`;
                                html+=selectioning_html_predikat({
                                key:'predikat_kdmin_'+fokusMapel,
                                val:db[0]['predikat_kdmin_'+fokusMapel]
                                })
                            html+=`</td>`;
                                
                            
                        }else{
                            //kdMaks
                            // html+=`<td class="text-center ${data.hasData?'':'text-bg-warning'}" data-server="${fokusMapel}_P_PREDIKAT">${db[0][fokusMapel+'_P_PREDIKAT']}</td>`;
                            html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`${fokusMapel}_P_PREDIKAT`)?'':'text-bg-warning'}">`
                                // html+=`data-server="kdmaks_${fokusMapel}">${db[0]['kdmaks_'+fokusMapel].kd3}</td>`;
                                html+=selectioning_html_predikat({
                                    key:fokusMapel+'_P_PREDIKAT',
                                    val:db[0][fokusMapel+'_P_PREDIKAT']
                                    })
                            html+=`</td>`;
                            html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`kdmaks_${fokusMapel}`)?'':'text-bg-warning'}" data-server="kdmaks_${fokusMapel}">${db[0]['kdmaks_'+fokusMapel].kd3??db[0]['kdmaks_'+fokusMapel]}</td>`;
                            html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`predikat_kdmaks_${fokusMapel}`)?'':'text-bg-warning'} p-0">`;
                                html+=selectioning_html_predikat({
                                key:'predikat_kdmaks_'+fokusMapel,
                                val:db[0]['predikat_kdmaks_'+fokusMapel]
                                })
                            html+=`</td>`;
                            html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`kdmin_${fokusMapel}`)?'':'text-bg-warning'}" data-server="kdmin_${fokusMapel}">${db[0]['kdmin_'+fokusMapel].kd3??db[0]['kdmin_'+fokusMapel]}</td>`;
                            html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`predikat_kdmin_${fokusMapel}`)?'':'text-bg-warning'} p-0">`;
                                html+=selectioning_html_predikat({
                                key:'predikat_kdmin_'+fokusMapel,
                                val:db[0]['predikat_kdmin_'+fokusMapel]
                                })
                            html+=`</td>`;
                            
    
                        }
                        // html+=`<td class="text-center">${db[0][fokusMapel+'_P_DESKRIPSI']}</td>`;
                        html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`${fokusMapel}_P_DESKRIPSI`)?'':'text-bg-warning'}" data-server="${fokusMapel}_P_DESKRIPSI">${db[0][fokusMapel+'_P_DESKRIPSI']}</td>`;
                    }else{
                        if(data.isKurmer){
                            html+=`<td class="text-center">${db[0]['kdmaks_'+fokusMapel].idbaris}</td>`;
                            html+=`<td class="text-center">${db[0]['predikat_kdmaks_'+fokusMapel]}</td>`;
                            html+=`<td class="text-center">${db[0]['kdmin_'+fokusMapel].idbaris}</td>`;
                            html+=`<td class="text-center">${db[0]['predikat_kdmin_'+fokusMapel]}</td>`;
                            
                        }else{
                            
                            html+=`<td class="text-center">${db[0][fokusMapel+'_P_PREDIKAT']}</td>`;
                            
                            html+=`<td class="text-center">${db[0]['kdmaks_'+fokusMapel].kd3}</td>`;
                            html+=`<td class="text-center">${db[0]['predikat_kdmaks_'+fokusMapel]}</td>`;
                            html+=`<td class="text-center">${db[0]['kdmin_'+fokusMapel].kd3}</td>`;
                            html+=`<td class="text-center">${db[0]['predikat_kdmin_'+fokusMapel]}</td>`;
                            
    
                        }
                        html+=`<td class="text-center">${db[0][fokusMapel+'_P_DESKRIPSI']}</td>`;
                    }

                    
                }else{
                    if(data.isKurmer){
                        html+=`<td colspan="6">Tidak ada data</td>`;

                    }else{
                        html+=`<td colspan="7">Tidak ada data</td>`;

                    }
                }
                html+=`</tr>`;


        })

        html+=`</tbody>`;
    html+=`</table>`;
    return html;
}
const tabel_setting_predikat_keterampilan = (data,fokusMapel,editable=false)=>{
    let html = "";
    html+=`<table class="table table-sm table-bordered border-dark font10" id="olahrapor">`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th rowspan="2" class="text-center align-middle text-bg-secondary broder-light" style="width:20px">No</th>`
                html+=`<th rowspan="2" class="text-center align-middle text-bg-secondary broder-light" style="width:20px">ID</th>`
                html+=`<th rowspan="2" class="text-center align-middle text-bg-secondary broder-light">Nama Siswa</th>`;
                html+=`<th rowspan="2" class="text-center align-middle text-bg-secondary broder-light">Nilai Rapor</th>`;
                if(!data.isKurmer){
                    html+=`<th rowspan="2" class="text-center align-middle text-bg-secondary broder-light" style="width:100px">Predikat Nilai Rapor</th>`;

                }
                html+=`<th colspan="2" class="text-center align-middle text-bg-secondary broder-light">Maksimum</th>`;
                html+=`<th colspan="2" class="text-center align-middle text-bg-secondary broder-light">Minimum</th>`;
                html+=`<th rowspan="2" class="text-center align-middle text-bg-secondary broder-light">Deskripsi</th>`;
            html+=`</tr>`;
            html+=`<tr>`;
            if(data.isKurmer){
                html+=`<th class="text-center align-middle text-bg-secondary broder-light">ATP</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary broder-light" style="width:100px">Predikat</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary broder-light">ATP</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary broder-light" style="width:100px">Predikat</th>`;

            }else{
                html+=`<th class="text-center align-middle text-bg-secondary broder-light">KD</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary broder-light" style="width:100px">Predikat</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary broder-light" style="width:100px">KD</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary broder-light" style="width:100px">Predikat</th>`;

            }
            html+=`</tr>`;

        html+=`</thead>`;
        html+=`<tbody>`;
        //let datamapel
        let dbs = data.data;
        dbs.forEach((siswa,i_siswa)=>{
            html+=`<tr>`;
                html+=`<td class="text-center">${i_siswa+1}</td>`;
                html+=`<td class="text-center" data-server="id">${siswa.id}</td>`;
                html+=`<td class="text-nowrap"  data-server="namasiswa">${siswa.pd_nama}</td>`;
                let db = siswa.dataRapor_Siap.filter(s=>s.kodemapel == fokusMapel);
                if(db.length>0){
                    html+=`<td class="text-center">${db[0][fokusMapel+'_NILAI_KETERAMPILAN']}</td>`;
                    if(editable){ /// ada input select;

                        if(data.isKurmer){
                            //kdMaks
                            html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`kdmaks_${fokusMapel}`)?'':'text-bg-warning'}" data-server="kdmaks_${fokusMapel}">${db[0]['kdmaks_'+fokusMapel].idbaris??db[0]['kdmaks_'+fokusMapel]}</td>`;
                            html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`predikat_kdmaks_${fokusMapel}`)?'':'text-bg-warning'} p-0">`;
                                html+=selectioning_html_predikat({
                                key:'predikat_kdmaks_'+fokusMapel,
                                val:db[0]['predikat_kdmaks_'+fokusMapel]
                                })
                            html+=`</td>`;
                            html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`kdmin_${fokusMapel}`)?'':'text-bg-warning'}" data-server="kdmin_${fokusMapel}">${db[0]['kdmin_'+fokusMapel].idbaris??db[0]['kdmin_'+fokusMapel]}</td>`;
                            html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`predikat_kdmin_${fokusMapel}`)?'':'text-bg-warning'} p-0">`;
                                html+=selectioning_html_predikat({
                                key:'predikat_kdmin_'+fokusMapel,
                                val:db[0]['predikat_kdmin_'+fokusMapel]
                                })
                            html+=`</td>`;
                                
                            
                        }else{
                            //kdMaks
                            // html+=`<td class="text-center ${data.hasData?'':'text-bg-warning'}" data-server="${fokusMapel}_P_PREDIKAT">${db[0][fokusMapel+'_P_PREDIKAT']}</td>`;
                            html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`${fokusMapel}_K_PREDIKAT`)?'':'text-bg-warning'}">`
                                // html+=`data-server="kdmaks_${fokusMapel}">${db[0]['kdmaks_'+fokusMapel].kd3}</td>`;
                                html+=selectioning_html_predikat({
                                    key:fokusMapel+'_K_PREDIKAT',
                                    val:db[0][fokusMapel+'_K_PREDIKAT']
                                    })
                            html+=`</td>`;
                            html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`kdmaks_${fokusMapel}_KETERAMPILAN`)?'':'text-bg-warning'}" data-server="kdmaks_${fokusMapel}_KETERAMPILAN">${db[0]['kdmaks_'+fokusMapel+'_KETERAMPILAN'].kd4??db[0]['kdmaks_'+fokusMapel+'_KETERAMPILAN']}</td>`;
                            html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`predikat_kdmaks_${fokusMapel}_KETERAMPILAN`)?'':'text-bg-warning'} p-0">`;
                                html+=selectioning_html_predikat({
                                key:'predikat_kdmaks_'+fokusMapel+'_KETERAMPILAN',
                                val:db[0]['predikat_kdmaks_'+fokusMapel+'_KETERAMPILAN']
                                })
                            html+=`</td>`;
                            html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`kdmin_${fokusMapel}_KETERAMPILAN`)?'':'text-bg-warning'}" data-server="kdmin_${fokusMapel}_KETERAMPILAN">${db[0]['kdmin_'+fokusMapel+'_KETERAMPILAN'].kd4??db[0]['kdmin_'+fokusMapel+'_KETERAMPILAN']}</td>`;
                            html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`predikat_kdmin_${fokusMapel}_KETERAMPILAN`)?'':'text-bg-warning'} p-0">`;
                                html+=selectioning_html_predikat({
                                key:'predikat_kdmin_'+fokusMapel+'_KETERAMPILAN',
                                val:db[0]['predikat_kdmin_'+fokusMapel+'_KETERAMPILAN']
                                })
                            html+=`</td>`;
                            
    
                        }
                        // html+=`<td class="text-center">${db[0][fokusMapel+'_P_DESKRIPSI']}</td>`;
                        html+=`<td class="text-center ${cekhasproperti(data.blangkoRapor,`${fokusMapel}_K_DESKRIPSI`)?'':'text-bg-warning'}" data-server="${fokusMapel}_K_DESKRIPSI">${db[0][fokusMapel+'_K_DESKRIPSI']}</td>`;
                    }else{
                        if(data.isKurmer){
                            html+=`<td class="text-center">${db[0]['kdmaks_'+fokusMapel].idbaris}</td>`;
                            html+=`<td class="text-center">${db[0]['predikat_kdmaks_'+fokusMapel]}</td>`;
                            html+=`<td class="text-center">${db[0]['kdmin_'+fokusMapel].idbaris}</td>`;
                            html+=`<td class="text-center">${db[0]['predikat_kdmin_'+fokusMapel]}</td>`;
                            
                        }else{
                            
                            html+=`<td class="text-center">${db[0][fokusMapel+'_K_PREDIKAT']}</td>`;
                            
                            html+=`<td class="text-center">${db[0]['kdmaks_'+fokusMapel+'_KETERAMPILAN']['kd4']??db[0]['kdmaks_'+fokusMapel+'_KETERAMPILAN']}</td>`;
                            html+=`<td class="text-center">${db[0]['predikat_kdmaks_'+fokusMapel+'_KETERAMPILAN']}</td>`;
                            html+=`<td class="text-center">${db[0]['kdmin_'+fokusMapel+'_KETERAMPILAN']['kd4']??db[0]['kdmin_'+fokusMapel+'_KETERAMPILAN']}</td>`;
                            html+=`<td class="text-center">${db[0]['predikat_kdmin_'+fokusMapel+'_KETERAMPILAN']}</td>`;
                            
    
                        }
                        html+=`<td class="text-center">${db[0][fokusMapel+'_K_DESKRIPSI']}</td>`;
                    }

                    
                }else{
                    if(data.isKurmer){
                        html+=`<td colspan="6">Tidak ada data</td>`;

                    }else{
                        html+=`<td colspan="7">Tidak ada data</td>`;

                    }
                }
                html+=`</tr>`;


        })

        html+=`</tbody>`;
    html+=`</table>`;
    return html;
}
const html_setting_deskripi =(data,fokusMapel,withEditable=false)=>{
    let html = "";
    let labelmapel = data.labelMapel.filter(s=>s.value == fokusMapel)[0];
    if(withEditable){
        html+=`<div id="areaprint">`;
            html+=`<h3 class="text-center mb-0">Pengaturan Deskripsi Rapor</h3>`;
            html+=`<h3 class="text-center mb-0">${labelmapel.label}</h3>`;
            html+=`<h4 class="text-center mb-0">Kelas ${data.kelas} Semester ${data.semester}</h4>`;
            html+=`<h4 class="text-center mb-3">Tahun Pelajaran ${data.tapel}</h4>`;
            html+=`<div class="table-responsive" id="predikat_rapor">`;
                html+=tabel_setting_predikat(data,fokusMapel,true);
            html+=`</div>`;
        html+=`</div>`;
        html+=`<div class="sticky-md-bottom text-center accord-bg print-hide rounded shadow-lg py-2"><button class="btn btn-sm text-bg-success mx-1" data-klik="simpanserver">Simpan Server</button></div>`
        
    }else{

        html+=`<h3 class="text-center mb-0">Pengaturan Deskripsi Rapor</h3>`;
        html+=`<h3 class="text-center mb-0">${labelmapel.label}</h3>`;
        html+=`<h4 class="text-center mb-0">Kelas ${data.kelas} Semester ${data.semester}</h4>`;
        html+=`<h4 class="text-center mb-3">Tahun Pelajaran ${data.tapel}</h4>`;
        html+=`<div class="table-responsive" id="predikat_rapor">`;
            html+=tabel_setting_predikat(data,fokusMapel,false);
        html+=`</div>`;
    }

    
    return html;
}
const html_setting_deskripi_keterampilan =(data,fokusMapel,withEditable=false)=>{
    let html = "";
    let labelmapel = data.labelMapel.filter(s=>s.value == fokusMapel)[0];
    if(withEditable){
        html+=`<div id="areaprint">`;
            html+=`<h3 class="text-center mb-0">Pengaturan Deskripsi Rapor Keterampilan</h3>`;
            html+=`<h3 class="text-center mb-0">${labelmapel.label}</h3>`;
            html+=`<h4 class="text-center mb-0">Kelas ${data.kelas} Semester ${data.semester}</h4>`;
            html+=`<h4 class="text-center mb-3">Tahun Pelajaran ${data.tapel}</h4>`;
            html+=`<div class="table-responsive" id="predikat_rapor">`;
                html+=tabel_setting_predikat_keterampilan(data,fokusMapel,true);
            html+=`</div>`;
        html+=`</div>`;
        html+=`<div class="sticky-md-bottom text-center accord-bg print-hide rounded shadow-lg py-2"><button class="btn btn-sm text-bg-success mx-1" data-klik="simpanserver">Simpan Server</button></div>`
        
    }else{

        html+=`<h3 class="text-center mb-0">Pengaturan Deskripsi Rapor</h3>`;
        html+=`<h3 class="text-center mb-0">${labelmapel.label}</h3>`;
        html+=`<h4 class="text-center mb-0">Kelas ${data.kelas} Semester ${data.semester}</h4>`;
        html+=`<h4 class="text-center mb-3">Tahun Pelajaran ${data.tapel}</h4>`;
        html+=`<div class="table-responsive" id="predikat_rapor">`;
            html+=tabel_setting_predikat_keterampilan(data,fokusMapel,false);
        html+=`</div>`;
    }

    
    return html;
}

function cekhasproperti(data, look_up_properti){
    return data.hasOwnProperty(look_up_properti)
}
const html_edit_ttb = (identitas, dataserver)=>{
    let sekarang = new Date();
    let bulan = sekarang.getMonth();
    let semesteraktif =bulan>5?1:2;
        
    let html="";
    html+=`<h3 class="text-center mb-0">Pengaturan Tinggi dan Berat Badan</h3>`;
    html+=`<h4 class="text-center mb-0">Jenjang Kelas ${identitas.jenjang}</h4>`;
    html+=`<h4 class="text-center mb-3">${identitas.kurikulum=='kurmer'?'Kurikulum Merdeka':'Kurikulum 2013'}</h4>`;
    html+=`<div class="table-responsive">`;
    html+=`<table class="w3-table-all font12 toExcel" id="setting_perkembangan">`;
        html+=`<thead>`;
            // html+=`<tr class="d-none">`;
            //     html+=`<td>no</td>`
            //     html+=`<td>id</td>`
            //     html+=`<td>namasiswa</td>`
            //     html+=`<td>tinggibadan_1</td>`
            //     html+=`<td>beratbadan_1</td>`
            //     html+=`<td>tinggibadan_2</td>`
            //     html+=`<td>beratbadan_2</td>`
            // html+=`</tr>`;
            html+=`<tr>`;
                html+=`<th rowspan="3">No</th>`;
                html+=`<th rowspan="3">ID</th>`;
                html+=`<th rowspan="3">Nama Siswa</th>`;
                html+=`<th colspan="4">Data Perkembangan Fisik</th>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<th colspan="2" ${(semesteraktif!=1)?'class="text-bg-danger"':""}>Semester 1</th>`;
                html+=`<th colspan="2" ${(semesteraktif!=2)?'class="text-bg-danger"':""}>Semester 2</th>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<th ${(semesteraktif!=1)?'class="text-bg-danger"':""}>Tinggi Badan</th>`;
                html+=`<th ${(semesteraktif!=1)?'class="text-bg-danger"':""}>Berat Badan</th>`;
                html+=`<th ${(semesteraktif!=2)?'class="text-bg-danger"':""}>Tinggi Badan</th>`;
                html+=`<th ${(semesteraktif!=2)?'class="text-bg-danger"':""}>Berat Badan</th>`;
            html+=`</tr>`;

        html+=`</thead>`;
        html+=`<tbody>`;
        identitas.dbsiswa.forEach((db,i_db)=>{
            let dbserver = dataserver.filter(s=>s.id == db.id);
            html+=`<tr>`;
                html+=`<td class="text-center">${(i_db+1)}</td>`;
                html+=`<td class="text-center" data-key="id">${db.id}</td>`;
                html+=`<td class="text-nowrap" data-key="namasiswa">${db.pd_nama}</td>`;
                if(dbserver.length>0 && cekhasproperti(dbserver[0],'TINGGIBADAN_SEMESTER_1')){
                    html+=`<td class="p-0">`;
                        html+=`<input type="number" ${(semesteraktif!=1)?'disabled':""} class="form-control m-0 border-0 bg-transparent text-center" data-key="TINGGIBADAN_SEMESTER_1" value="${dbserver[0]['TINGGIBADAN_SEMESTER_1']}"/>`;
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="number" ${(semesteraktif!=1)?'disabled':""} class="form-control m-0 border-0 bg-transparent text-center" data-key="TINGGIBADAN_SEMESTER_1" value=""/>`;
                    html+=`</td>`;

                }
                if(dbserver.length>0 && cekhasproperti(dbserver[0],'BERATBADAN_SEMESTER_1')){
                    html+=`<td class="p-0">`;
                        html+=`<input type="number" ${(semesteraktif!=1)?'disabled':""} class="form-control m-0 border-0 bg-transparent text-center" data-key="BERATBADAN_SEMESTER_1" value="${dbserver[0]['BERATBADAN_SEMESTER_1']}"/>`;
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="number" ${(semesteraktif!=1)?'disabled':""}  class="form-control m-0 border-0 bg-transparent text-center" data-key="BERATBADAN_SEMESTER_1" value=""/>`;
                    html+=`</td>`;
                }

                if(dbserver.length>0 && cekhasproperti(dbserver[0],'TINGGIBADAN_SEMESTER_2')){
                    html+=`<td class="p-0">`;
                        html+=`<input type="number" ${(semesteraktif!=2)?'disabled':""} class="form-control m-0 border-0 bg-transparent text-center" data-key="TINGGIBADAN_SEMESTER_2" value="${dbserver[0]['TINGGIBADAN_SEMESTER_2']}"/>`;
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="number" ${(semesteraktif!=2)?'disabled':""}  class="form-control m-0 border-0 bg-transparent text-center" data-key="TINGGIBADAN_SEMESTER_2" value=""/>`;
                    html+=`</td>`;

                }
                if(dbserver.length>0 && cekhasproperti(dbserver[0],'BERATBADAN_SEMESTER_2')){
                    html+=`<td class="p-0">`;
                        html+=`<input type="number" ${(semesteraktif!=2)?'disabled':""}  class="form-control m-0 border-0 bg-transparent text-center" data-key="BERATBADAN_SEMESTER_2" value="${dbserver[0]['BERATBADAN_SEMESTER_2']}"/>`;
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="number" ${(semesteraktif!=2)?'disabled':""} class="form-control m-0 border-0 bg-transparent text-center" data-key="BERATBADAN_SEMESTER_2" value=""/>`;
                    html+=`</td>`;
                }


            html+=`</tr>`;
        })

        html+=`</tbody>`;
    html+=`</table>`;
    html+=`</div>`;
    html+=`<div class="sticky-md-bottom text-center accord-bg print-hide rounded shadow-lg py-2">`;
         // html+=`<button class="btn btn-sm text-bg-info mx-1" data-klik="next">KKM-kan</button>`;
        // html+=`<button class="btn btn-sm text-bg-warning mx-1" data-klik="exportExcel">Export</button>`;
        // html+=`<label for="importModal" class="btn btn-sm text-bg-secondary mx-1">Import</label>`;
        // html+=`<input type="file" class="d-none" id="importModal" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>`
        html+=`<button class="btn btn-sm text-bg-success mx-1" data-klik="simpanserver">Simpan Server</button>`;
        html+=`</div>`
    return html
}

const html_edit_kesehatan = (identitas, dataserver)=>{
    let html="";
    html+=`<h3 class="text-center mb-0">Pengaturan Data Perkembangan Kesehatan</h3>`;
    html+=`<h4 class="text-center mb-0">Kelas ${identitas.rombel}</h4>`;
    html+=`<h4 class="text-center mb-3">${identitas.kurikulum=='kurmer'?'Kurikulum Merdeka':'Kurikulum 2013'}</h4>`;
    html+=`<div class="table-responsive">`;
    html+=`<table class="w3-table-all font12 toExcel" id="setting_perkembangan">`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th>No</th>`
                html+=`<th>ID</th>`
                html+=`<th>Nama Siswa</th>`;
                html+=`<th>Pendengaran</th>`;
                html+=`<th>Penglihatan</th>`;
                html+=`<th>Gigi</th>`;
                html+=`<th>Lainnya</th>`;
            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;
        identitas.dbsiswa.forEach((db,i_db)=>{
            let dbserver = dataserver.filter(s=>s.id == db.id);
            html+=`<tr>`;
                html+=`<td class="text-center">${(i_db+1)}</td>`;
                html+=`<td class="text-center" data-key="id">${db.id}</td>`;
                html+=`<td class="text-nowrap" data-key="namasiswa">${db.pd_nama}</td>`;
                if(dbserver.length>0 && cekhasproperti(dbserver[0],'PENDENGARAN_SEMESTER_'+identitas.semester)){
                    html+=`<td class="p-0">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'PENDENGARAN_SEMESTER_'+identitas.semester}" value="${dbserver[0]['PENDENGARAN_SEMESTER_'+identitas.semester]}"/>`
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'PENDENGARAN_SEMESTER_'+identitas.semester}" value=""/>`
                    html+=`</td>`;
                }

                if(dbserver.length>0 && cekhasproperti(dbserver[0],'PENGLIHATAN_SEMESTER_'+identitas.semester)){
                    html+=`<td class="p-0">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'PENGLIHATAN_SEMESTER_'+identitas.semester}" value="${dbserver[0]['PENGLIHATAN_SEMESTER_'+identitas.semester]}"/>`
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'PENGLIHATAN_SEMESTER_'+identitas.semester}" value=""/>`
                    html+=`</td>`;
                }

                if(dbserver.length>0 && cekhasproperti(dbserver[0],'GIGI_SEMESTER_'+identitas.semester)){
                    html+=`<td class="p-0">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'GIGI_SEMESTER_'+identitas.semester}" value="${dbserver[0]['GIGI_SEMESTER_'+identitas.semester]}"/>`
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'GIGI_SEMESTER_'+identitas.semester}" value=""/>`
                    html+=`</td>`;
                }
                if(dbserver.length>0 && cekhasproperti(dbserver[0],'KESEHATANLAINNYA_SEMESTER_'+identitas.semester)){
                    html+=`<td class="p-0">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'KESEHATANLAINNYA_SEMESTER_'+identitas.semester}" value="${dbserver[0]['KESEHATANLAINNYA_SEMESTER_'+identitas.semester]}"/>`
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'KESEHATANLAINNYA_SEMESTER_'+identitas.semester}" value=""/>`
                    html+=`</td>`;
                }

            html+=`</tr>`;
        })
        html+=`</tbody>`;
    html+=`</table>`;
    html+=`</div>`;
    html+=`<div class="sticky-md-bottom text-center accord-bg print-hide rounded shadow-lg py-2">`;
        html+=`<button class="btn btn-sm text-bg-success mx-1" data-klik="simpanserver">Simpan Server</button>`;
    html+=`</div>`
    return html;
}

const html_edit_ekskul = (identitas, dataserver)=>{
    let html="";
    html+=`<h3 class="text-center mb-0">Pengaturan Data Ekstrakurikuler Siswa</h3>`;
    html+=`<h4 class="text-center mb-0">Kelas ${identitas.rombel}</h4>`;
    html+=`<h4 class="text-center mb-3">${identitas.kurikulum=='kurmer'?'Kurikulum Merdeka':'Kurikulum 2013'}</h4>`;
    html+=`<div class="table-responsive">`;
    html+=`<table class="w3-table-all font10 toExcel" id="setting_perkembangan">`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th rowspan="3">No</th>`
                html+=`<th rowspan="3">ID</th>`
                html+=`<th rowspan="3">Nama Siswa</th>`;
                html+=`<th colspan="6">E k s t r a k u r i k u l e r</th>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<th colspan="3">Ekskul Wajib</th>`;
                html+=`<th colspan="3">Ekskul Pilihan</th>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<th class="text-nowrap">Nama Ekskul</th>`
                html+=`<th class="text-nowrap">Nilai</th>`
                html+=`<th class="text-nowrap">Keterangan</th>`
                html+=`<th class="text-nowrap">Nama Ekskul</th>`
                html+=`<th class="text-nowrap">Nilai</th>`
                html+=`<th class="text-nowrap">Keterangan</th>`
            html+=`</tr>`;
            
        html+=`</thead>`;
        html+=`<tbody>`;
        identitas.dbsiswa.forEach((db,i_db)=>{
            let dbserver = dataserver.filter(s=>s.id == db.id);
            html+=`<tr>`;
                html+=`<td class="text-center">${(i_db+1)}</td>`;
                html+=`<td class="text-center" data-key="id">${db.id}</td>`;
                html+=`<td class="text-nowrap" data-key="namasiswa">${db.pd_nama}</td>`;
                if(dbserver.length>0 && cekhasproperti(dbserver[0],'EKSKUL_1_NAMA_SEMESTER_'+identitas.semester)){
                    html+=`<td class="p-0">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'EKSKUL_1_NAMA_SEMESTER_'+identitas.semester}" value="${dbserver[0]['EKSKUL_1_NAMA_SEMESTER_'+identitas.semester]}"/>`
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'EKSKUL_1_NAMA_SEMESTER_'+identitas.semester}" value="Pramuka"/>`
                    html+=`</td>`;
                }

                if(dbserver.length>0 && cekhasproperti(dbserver[0],'EKSKUL_1_NILAI_SEMESTER_'+identitas.semester)){
                    html+=`<td class="p-0">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'EKSKUL_1_NILAI_SEMESTER_'+identitas.semester}" value="${dbserver[0]['EKSKUL_1_NILAI_SEMESTER_'+identitas.semester]}"/>`
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'EKSKUL_1_NILAI_SEMESTER_'+identitas.semester}" value="Baik"/>`
                    html+=`</td>`;
                }

                if(dbserver.length>0 && cekhasproperti(dbserver[0],'EKSKUL_1_KETERANGAN_SEMESTER_'+identitas.semester)){
                    html+=`<td class="p-0">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'EKSKUL_1_KETERANGAN_SEMESTER_'+identitas.semester}" value="${dbserver[0]['EKSKUL_1_KETERANGAN_SEMESTER_'+identitas.semester]}"/>`
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'EKSKUL_1_KETERANGAN_SEMESTER_'+identitas.semester}" value=""/>`
                    html+=`</td>`;
                }
                
                if(dbserver.length>0 && cekhasproperti(dbserver[0],'EKSKUL_2_NAMA_SEMESTER_'+identitas.semester)){
                    html+=`<td class="p-0">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'EKSKUL_2_NAMA_SEMESTER_'+identitas.semester}" value="${dbserver[0]['EKSKUL_2_NAMA_SEMESTER_'+identitas.semester]}"/>`
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'EKSKUL_2_NAMA_SEMESTER_'+identitas.semester}" value=""/>`
                    html+=`</td>`;
                }

                if(dbserver.length>0 && cekhasproperti(dbserver[0],'EKSKUL_2_NILAI_SEMESTER_'+identitas.semester)){
                    html+=`<td class="p-0">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'EKSKUL_2_NILAI_SEMESTER_'+identitas.semester}" value="${dbserver[0]['EKSKUL_2_NILAI_SEMESTER_'+identitas.semester]}"/>`
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'EKSKUL_2_NILAI_SEMESTER_'+identitas.semester}" value=""/>`
                    html+=`</td>`;
                }

                if(dbserver.length>0 && cekhasproperti(dbserver[0],'EKSKUL_2_KETERANGAN_SEMESTER_'+identitas.semester)){
                    html+=`<td class="p-0">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'EKSKUL_2_KETERANGAN_SEMESTER_'+identitas.semester}" value="${dbserver[0]['EKSKUL_2_KETERANGAN_SEMESTER_'+identitas.semester]}"/>`
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'EKSKUL_2_KETERANGAN_SEMESTER_'+identitas.semester}" value=""/>`
                    html+=`</td>`;
                }
                

            html+=`</tr>`;
        })
        html+=`</tbody>`;
    html+=`</table>`;
    html+=`</div>`;
    html+=`<div class="sticky-md-bottom text-center accord-bg print-hide rounded shadow-lg py-2">`;
        html+=`<button class="btn btn-sm text-bg-success mx-1" data-klik="simpanserver">Simpan Server</button>`;
    html+=`</div>`
    return html;
}

const html_edit_prestasi = (identitas, dataserver)=>{
    let html="";
    html+=`<h3 class="text-center mb-0">Pengaturan Data Prestasi Siswa</h3>`;
    html+=`<h4 class="text-center mb-0">Kelas ${identitas.rombel}</h4>`;
    html+=`<h4 class="text-center mb-3">${identitas.kurikulum=='kurmer'?'Kurikulum Merdeka':'Kurikulum 2013'}</h4>`;
    html+=`<div class="table-responsive">`;
    html+=`<table class="w3-table-all font10 toExcel" id="setting_perkembangan">`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th rowspan="3">No</th>`
                html+=`<th rowspan="3">ID</th>`
                html+=`<th rowspan="3">Nama Siswa</th>`;
                html+=`<th colspan="6">Prestasi Siswa</th>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<th colspan="2">Prestasi ke-1</th>`;
                html+=`<th colspan="2">Prestasi ke-2</th>`;
                html+=`<th colspan="2">Prestasi ke-3</th>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<th class="text-nowrap">Jenis Prestasi</th>`
                html+=`<th class="text-nowrap">Keterangan</th>`
                html+=`<th class="text-nowrap">Jenis Prestasi</th>`
                html+=`<th class="text-nowrap">Keterangan</th>`
                html+=`<th class="text-nowrap">Jenis Prestasi</th>`
                html+=`<th class="text-nowrap">Keterangan</th>`
            html+=`</tr>`;
            
        html+=`</thead>`;
        html+=`<tbody>`;
        identitas.dbsiswa.forEach((db,i_db)=>{
            let dbserver = dataserver.filter(s=>s.id == db.id);
            html+=`<tr>`;
                html+=`<td class="text-center">${(i_db+1)}</td>`;
                html+=`<td class="text-center" data-key="id">${db.id}</td>`;
                html+=`<td class="text-nowrap" data-key="namasiswa">${db.pd_nama}</td>`;
                if(dbserver.length>0 && cekhasproperti(dbserver[0],'PRESTASI_1_NAMA_SEMESTER_'+identitas.semester)){
                    html+=`<td class="p-0">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'PRESTASI_1_NAMA_SEMESTER_'+identitas.semester}" value="${dbserver[0]['PRESTASI_1_NAMA_SEMESTER_'+identitas.semester]}"/>`
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'PRESTASI_1_NAMA_SEMESTER_'+identitas.semester}" value=""/>`
                    html+=`</td>`;
                }

                if(dbserver.length>0 && cekhasproperti(dbserver[0],'PRESTASI_1_KETERANGAN_SEMESTER_'+identitas.semester)){
                    html+=`<td class="p-0">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'PRESTASI_1_KETERANGAN_SEMESTER_'+identitas.semester}" value="${dbserver[0]['PRESTASI_1_KETERANGAN_SEMESTER_'+identitas.semester]}"/>`
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'PRESTASI_1_KETERANGAN_SEMESTER_'+identitas.semester}" value=""/>`
                    html+=`</td>`;
                }
                // PRESTASI KE DUA
                if(dbserver.length>0 && cekhasproperti(dbserver[0],'PRESTASI_2_NAMA_SEMESTER_'+identitas.semester)){
                    html+=`<td class="p-0">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'PRESTASI_2_NAMA_SEMESTER_'+identitas.semester}" value="${dbserver[0]['PRESTASI_2_NAMA_SEMESTER_'+identitas.semester]}"/>`
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'PRESTASI_2_NAMA_SEMESTER_'+identitas.semester}" value=""/>`
                    html+=`</td>`;
                }
                
                if(dbserver.length>0 && cekhasproperti(dbserver[0],'PRESTASI_2_KETERANGAN_SEMESTER_'+identitas.semester)){
                    html+=`<td class="p-0">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'PRESTASI_2_KETERANGAN_SEMESTER_'+identitas.semester}" value="${dbserver[0]['PRESTASI_2_KETERANGAN_SEMESTER_'+identitas.semester]}"/>`
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'PRESTASI_2_KETERANGAN_SEMESTER_'+identitas.semester}" value=""/>`
                    html+=`</td>`;
                }

                if(dbserver.length>0 && cekhasproperti(dbserver[0],'PRESTASI_3_NAMA_SEMESTER_'+identitas.semester)){
                    html+=`<td class="p-0">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'PRESTASI_3_NAMA_SEMESTER_'+identitas.semester}" value="${dbserver[0]['PRESTASI_3_NAMA_SEMESTER_'+identitas.semester]}"/>`
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'PRESTASI_3_NAMA_SEMESTER_'+identitas.semester}" value=""/>`
                    html+=`</td>`;
                }

                if(dbserver.length>0 && cekhasproperti(dbserver[0],'PRESTASI_3_KETERANGAN_SEMESTER_'+identitas.semester)){
                    html+=`<td class="p-0">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'PRESTASI_3_KETERANGAN_SEMESTER_'+identitas.semester}" value="${dbserver[0]['PRESTASI_3_KETERANGAN_SEMESTER_'+identitas.semester]}"/>`
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'PRESTASI_3_KETERANGAN_SEMESTER_'+identitas.semester}" value=""/>`
                    html+=`</td>`;
                }
                

            html+=`</tr>`;
        })
        html+=`</tbody>`;
    html+=`</table>`;
    html+=`</div>`;
    html+=`<div class="sticky-md-bottom text-center accord-bg print-hide rounded shadow-lg py-2">`;
        html+=`<button class="btn btn-sm text-bg-success mx-1" data-klik="simpanserver">Simpan Server</button>`;
    html+=`</div>`
    return html;
}
const html_edit_kenaikan = (identitas, dataserver)=>{
    let html="";
    html+=`<h3 class="text-center mb-0">Pengaturan Kenaikan Kelas</h3>`;
    html+=`<h4 class="text-center mb-0">Kelas ${identitas.rombel}</h4>`;
    html+=`<h4 class="text-center mb-3">${identitas.kurikulum=='kurmer'?'Kurikulum Merdeka':'Kurikulum 2013'}</h4>`;
    html+=`<div class="table-responsive">`;
    html+=`<table class="w3-table-all font10 toExcel" id="setting_perkembangan">`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th>No</th>`
                html+=`<th>ID</th>`
                html+=`<th>Nama Siswa</th>`;
                html+=`<th>Kenaikan/Kelulusan</th>`;
                html+=`<th>Kelas Selanjutnya</th>`;
            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;
        identitas.dbsiswa.forEach((db,i_db)=>{
            let dbserver = dataserver.filter(s=>s.id == db.id);
            html+=`<tr>`;
                html+=`<td class="text-center">${(i_db+1)}</td>`;
                html+=`<td class="text-center" data-key="id">${db.id}</td>`;
                html+=`<td class="text-nowrap" data-key="namasiswa">${db.pd_nama}</td>`;
                if(dbserver.length>0 && cekhasproperti(dbserver[0],'KENAIKAN_KELAS')){
                    html+=`<td class="p-0">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="KENAIKAN_KELAS" value="${dbserver[0]['KENAIKAN_KELAS']}"/>`;
                    html+=`</td>`;
                    html+=`<td class="p-0">`;
                        html+=`<input type="number" class="form-control m-0 border-0 text-center bg-transparent" data-key="NAIKTINGGAL_KELAS_DI" value="${dbserver[0]['NAIKTINGGAL_KELAS_DI']}"/>`;
                    html+=`</td>`;
                }else{
                    if(identitas.jenjang==6){
                        html+=`<td class="p-0 text-bg-warning">`;
                            html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="KENAIKAN_KELAS" value="Lulus"/>`
                        html+=`</td>`;
                        html+=`<td class="p-0">`;
                            html+=`<input type="number" class="form-control m-0 border-0 text-center bg-transparent" data-key="NAIKTINGGAL_KELAS_DI" value="${parseInt(identitas.jenjang)+1}"/>`;
                        html+=`</td>`;
                        
                    }else{
                        html+=`<td class="p-0 text-bg-warning">`;
                            html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="KENAIKAN_KELAS" value="Naik Kelas"/>`
                        html+=`</td>`;
                        html+=`<td class="p-0">`;
                            html+=`<input type="number" class="form-control m-0 border-0 text-center bg-transparent" data-key="NAIKTINGGAL_KELAS_DI" value="${parseInt(identitas.jenjang)+1}"/>`;
                        html+=`</td>`;

                    }
                }

            html+=`</tr>`;
        })
        html+=`</tbody>`;
    html+=`</table>`;
    html+=`</div>`;
    html+=`<div class="sticky-md-bottom text-center accord-bg print-hide rounded shadow-lg py-2">`;
        html+=`<button class="btn btn-sm text-bg-success mx-1" data-klik="simpanserver">Simpan Server</button>`;
    html+=`</div>`
    return html;
}

const html_edit_saran = (identitas, dataserver)=>{
    let html="";
    html+=`<h3 class="text-center mb-0">Pengaturan Data Saran-saran Hasil Belajar Siswa</h3>`;
    html+=`<h4 class="text-center mb-0">Kelas ${identitas.rombel}</h4>`;
    html+=`<h4 class="text-center mb-3">${identitas.kurikulum=='kurmer'?'Kurikulum Merdeka':'Kurikulum 2013'}</h4>`;
    html+=`<div class="table-responsive">`;
    html+=`<table class="w3-table-all font10 toExcel" id="setting_perkembangan">`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th rowspan="2">No</th>`
                html+=`<th rowspan="2">ID</th>`
                html+=`<th rowspan="2">Nama Siswa</th>`;
                html+=`<th style="min-width:380px">Saran Guru Kepada Siswa</th>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<th class="p-0"><input type="text" class="form-control border-0 m-0 bg-transparent" placeholder="ketik di sini untuk mengetik saran keseluruhan" id="inputbantu"/></th>`;
            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;
        identitas.dbsiswa.forEach((db,i_db)=>{
            let dbserver = dataserver.filter(s=>s.id == db.id);
            html+=`<tr>`;
                html+=`<td class="text-center">${(i_db+1)}</td>`;
                html+=`<td class="text-center" data-key="id">${db.id}</td>`;
                html+=`<td class="text-nowrap" data-key="namasiswa">${db.pd_nama}</td>`;
                if(dbserver.length>0 && cekhasproperti(dbserver[0],'SARAN_SEMESTER_'+identitas.semester)){
                    html+=`<td class="p-0">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'SARAN_SEMESTER_'+identitas.semester}" value="${dbserver[0]['SARAN_SEMESTER_'+identitas.semester]}"/>`
                    html+=`</td>`;
                }else{
                    html+=`<td class="p-0 text-bg-warning">`;
                        html+=`<input type="text" class="form-control m-0 border-0 text-center bg-transparent" data-key="${'SARAN_SEMESTER_'+identitas.semester}" value=""/>`
                    html+=`</td>`;
                }


            html+=`</tr>`;
        })
        html+=`</tbody>`;
    html+=`</table>`;
    html+=`</div>`;
    html+=`<div class="sticky-md-bottom text-center accord-bg print-hide rounded shadow-lg py-2">`;
        html+=`<button class="btn btn-sm text-bg-success mx-1" data-klik="simpanserver">Simpan Server</button>`;
    html+=`</div>`
    return html;
}

const html_control_rekap_absen = ()=>{
    let html="";
    html+=`<div class="row mt-3 justify-content-center">`;
        html+=`<div class="col-md-6">`;
            html+=`<div class="card">`;
                html+=`<div class="card-header">Sumber data Rekap Absen</div>`;
                html+=`<div class="card-body p-5 text-center">`;
                    html+=`<div class="btn-group btn-group-sm">
                    <input type="radio" class="btn-check" name="sorterasli" id="dataasli" value="asli" autocomplete="off" checked> 
                    <label class="btn btn-outline-danger" for="dataasli">Absensi Edurasa</label>
                    <input type="radio" class="btn-check" name="sorterasli" id="dataolahan" value="olahan" autocomplete="off"> 
                    <label class="btn btn-outline-danger" for="dataolahan">Rekapitulasi Absen Rapor</label>
                    </div>`
                html+=`</div>`;
            html+=`</div>`;
        html+=`</div>`;
    html+=`</div>`;
    return html;
}

const html_control_riwayat_raport = (semester=true)=>{
    let html="";
    html+=`<div class="row mt-3 justify-content-center">`;
        html+=`<div class="col-md-6">`;
            html+=`<div class="card">`;
                html+=`<div class="card-header">Fitur</div>`;
                html+=`<div class="card-body py-5 text-center">`;
                    html+=`<div class="btn-group btn-group-sm">
                    <input type="radio" class="btn-check" name="sorterasli" id="rekapriwayatraport" value="rekap" autocomplete="off" checked> 
                    <label class="btn btn-outline-danger" for="rekapriwayatraport">Rekap Raport</label>
                    <input type="radio" class="btn-check" name="sorterasli" id="cetakriwayatrapor" value="raport" autocomplete="off"> 
                    <label class="btn btn-outline-danger align-middle" for="cetakriwayatrapor">Cetak Raport</label>`;
                    if(semester) {
                        html+=`<input type="radio" class="btn-check" name="sorterasli" id="cetakinduk" value="induk" autocomplete="off"> 
                        <label class="btn btn-outline-danger align-middle" for="cetakinduk">Cetak Induk</label> `
                    }
                html+=`</div></div>`;
            html+=`</div>`;
        html+=`</div>`;
        html+=`<div class="col-md-8">`;
            html+=`<div class="card">`;
                html+=`<div class="card-header">Keterangan</div>`;
                html+=`<div class="card-body" id="deskripsifitur">`;
                html+=`</div>`;
            html+=`</div>`;
        html+=`</div>`;
    html+=`</div>`;
    return html;
}

const html_tabel_rekapabsen = (identitas, dataserver)=>{
    let dbsiswa = identitas.dbsiswa;
    
    let html="";
    html+=`<h3 class="text-center mb-0">Rekapitulasi Absensi ${identitas.sumber}</h3>`;
    html+=`<h4 class="text-center mb-0">Kelas ${identitas.rombel}</h4>`;
    html+=`<h4 class="text-center mb-3">Semester ${identitas.semester} Tahun Pelajaran ${identitas.tapel}</h4>`;
    html+=`<div class="table-responsive">`;
        html+=`<table class="w3-table-all font10 toExcel" id="setting_perkembangan">`;
            html+=`<thead>`;
                html+=`<tr>`;
                    html+=`<th rowspan="2">NO</th>`;
                    html+=`<th rowspan="2">ID</th>`;
                    html+=`<th rowspan="2">Nama Siswa</th>`;
                    html+=`<th colspan="3">Jumlah Absensi</th>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<th>Sakit</th>`;
                    html+=`<th>Ijin</th>`;
                    html+=`<th>Alpa</th>`;
                html+=`</tr>`;

            html+=`</thead>`;
            html+=`<tbody>`;
            if(identitas.sumber == 'Edurasa'){
                dbsiswa.forEach((db,i_db)=>{
                    html+=`<tr>`;
                        html+=`<td class="text-center">${(i_db+1)}</td>`
                        html+=`<td class="text-center" data-key="id">${db.id}</td>`;
                        html+=`<td class="text-nowrap" data-key="namasiswa">${db.namasiswa}</td>`;
                        html+=`<td class="p-0"><input data-key="sakit" type="number" class="form-control m-0 border-0 bg-transparent text-center" value="${db.sakit}"/></td>`;
                        html+=`<td class="p-0"><input data-key="ijin" type="number" class="form-control m-0 border-0 bg-transparent text-center" value="${db.ijin}"/></td>`;
                        html+=`<td class="p-0"><input data-key="alpa" type="number" class="form-control m-0 border-0 bg-transparent text-center" value="${db.alpa}"/></td>`;
                    html+=`</tr>`;
                })
            }else{
                if(dataserver.length == 0){
                    dbsiswa.forEach((db,i_db)=>{
                        html+=`<tr class="text-bg-warning">`;
                            html+=`<td class="text-center">${(i_db+1)}</td>`
                            html+=`<td class="text-center" data-key="id">${db.id}</td>`;
                            html+=`<td class="text-nowrap" data-key="namasiswa">${db.namasiswa}</td>`;
                            html+=`<td class="p-0"><input data-key="sakit" type="number" class="form-control m-0 border-0 bg-transparent text-center" value="${db.sakit}"/></td>`;
                            html+=`<td class="p-0"><input data-key="ijin" type="number" class="form-control m-0 border-0 bg-transparent text-center" value="${db.ijin}"/></td>`;
                            html+=`<td class="p-0"><input data-key="alpa" type="number" class="form-control m-0 border-0 bg-transparent text-center" value="${db.alpa}"/></td>`;
                        html+=`</tr>`;
                    })
                }else{
                    dataserver.forEach((db,i_db)=>{
                        html+=`<tr>`;
                            html+=`<td class="text-center">${(i_db+1)}</td>`
                            html+=`<td class="text-center" data-key="id">${db.id}</td>`;
                            html+=`<td class="text-nowrap" data-key="namasiswa">${db.namasiswa}</td>`;
                            html+=`<td class="p-0"><input data-key="sakit" type="number" class="form-control m-0 border-0 bg-transparent text-center" value="${db.sakit}"/></td>`;
                            html+=`<td class="p-0"><input data-key="ijin" type="number" class="form-control m-0 border-0 bg-transparent text-center" value="${db.ijin}"/></td>`;
                            html+=`<td class="p-0"><input data-key="alpa" type="number" class="form-control m-0 border-0 bg-transparent text-center" value="${db.alpa}"/></td>`;
                        html+=`</tr>`;
                    })

                }
            };
            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;
    html+=`<div class="sticky-md-bottom text-center accord-bg print-hide rounded shadow-lg py-2">`;
        html+=`<button class="btn btn-sm text-bg-success mx-1" data-klik="simpanserver">Simpan Server</button>`;
    html+=`</div>`
    return html;
}

const html_halaman_isi_rapor = (identitas)=>{
    const dbsiswa = identitas.dbsiswa;
    const semester = identitas.semester;
    const tapel = identitas.tapel;
    
    // const siswapertama = identitas.firstSiswa; 
    const mapelnonagama = identitas.mapelinti;
    const kurmer = identitas.kurikulum == 'kurmer';
    const namafase = identitas.fase;
    const alamat = identitas.alamat;
    const namasekolah = identitas.namasekolah;
    
    let html="";
    html+=`<div id="area_rapor" class="tnr table-responsive">`;
        html+=`<table class="toExcel font14" style="line-height:1;border-collapse:collapse;border-spacing:0;width:99.5%">`;
            html+=`<thead>`;
                html+=`<tr>`;
                    html+=`<th>&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th>&nbsp;</th>`;
                html+=`</tr>`;
            html+=`</thead>`;
            html+=`<tbody>`;
                html+=`<tr><td colspan="36" class="fw-bolder text-center" style="font-size:16px!important">RAPOR DAN PROFIL PESERTA DIDIK</td></tr>`;
                html+=`<tr><td colspan="36"><br/><br/><br/></td></tr>`;
                // html+=`<tr><td colspan="24"><br/></td></tr>`;
                html+=`<tr>`;
                    html+=`<td></td>`;
                    html+=`<td colspan="6">Nama Siswa</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="18" data-firstsiswa="pd_nama" data-nilairapor="pd_nama">Nama Siswa</td>`
                    html+=`<td colspan="5">Kelas</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="4" data-firstsiswa="nama_rombel" data-nilairapor="nama_rombel"></td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td></td>`;
                    html+=`<td colspan="6">No. Induk/NISN</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="18"><span data-firstsiswa="nis" data-nilairapor="nis"></span>/<span data-firstsiswa="nisn"  data-nilairapor="nisn"></span></td>`;
                    if(kurmer){
                        html+=`<td colspan="5">Fase</td>`;
                        html+=`<td>:</td>`;
                        html+=`<td colspan="4" data-propertikelas="fase">${namafase}</td>`;
                    }else{
                        html+=`<td colspan="5">Semester</td>`;
                        html+=`<td>:</td>`;
                        html+=`<td colspan="4" data-propertikelas="semester">${semester}</td>`;
                    }
                html+=`</tr>`;

                html+=`<tr>`;
                    html+=`<td></td>`;
                    html+=`<td colspan="6">Nama Sekolah</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="18" data-propertikelas="namasekolah">${namasekolah}</td>`;
                    if(kurmer){
                        html+=`<td colspan="5">Semester</td>`;
                        html+=`<td>:</td>`;
                        html+=`<td colspan="4" data-propertikelas="semester">${semester}</td>`;
                    }else{
                        html+=`<td colspan="5">Tahun Pelajaran</td>`;
                        html+=`<td>:</td>`;
                        html+=`<td colspan="4" data-propertikelas="tapel">${tapel}</td>`;
                    }
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td></td>`;
                    html+=`<td colspan="6">Alamat</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="18" data-propertikelas="alamat">${alamat}</td>`;
                    if(kurmer){
                        html+=`<td colspan="5">Tahun Pelajaran</td>`;
                        html+=`<td>:</td>`;
                        html+=`<td colspan="4" data-propertikelas="tapel">${tapel}</td>`;
                    }else{
                        html+=`<td colspan="5"></td>`;
                        html+=`<td></td>`;
                        html+=`<td colspan="4"></td>`;
                    }
                html+=`</tr>`;
            html+=`<tr><td colspan="36" style="border-bottom:2px double black"><br/></td></tr>`;
            html+=`<tr><td colspan="36"><br/></td></tr>`;
            if(kurmer){
/** Kurmer */            
                //header
                html+=`<tr><td colspan="36" class="fw-bold">A. Nilai dan Capaian Kompetensi</td></tr>`;
                html+=`<tr>`
                    html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="2">No.</td>`;
                    html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="12">Mata Pelajaran</td>`;
                    html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="3">Nilai Akhir</td>`;
                    html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="19">Capaian Pembelajaran</td>`;
                html+=`</tr>`;
                /// mapel agama;
                html+=`<tr><td colspan="36" class="border p-1 border-dark bg-secondary-subtle">A. Muatan Nasional</td></tr>`;

                html+=`<tr>`;
                    html+=`<td rowspan="2" class="border p-1 text-center border-dark" colspan="2">1.</td>`;
                    html+=`<td class="border p-1 border-dark" colspan="34">Pendidikan Agama dan Budi Pekerti</td>`;
                html+=`</tr>`;
                
                html+=`<tr>`
                    html+=`<td class="border p-1 border-dark" colspan="12" data-firstsiswa="pd_agama" data-keyrapor="agama" data-nilairapor="mapel_agama_kode_teks">`;
                        html+='MAPEL AGAMA SESUAI SISWA ini'
                    html+=`</td>`;
                    // html+=`<td rowspan="2"  class="border p-1 text-center border-dark" colspan="3" data-firstsiswa="pd_agama" data-keyrapor="nilai">Nilai Akhir</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3" data-firstsiswa="pd_agama" data-keyrapor="nilai" data-nilairapor="nilairaport_P_agama">Nilai Akhir</td>`;
                    html+=`<td class="border p-1 border-dark"  id="AGAMA_deskripsi_maks" colspan="19" data-firstsiswa="pd_agama" data-nilairapor="P_DESKRIPSI_agama">Deskripsi maks</td>`;
                // html+=`</tr>`;
                // html+=`<tr>`;
                //     html+=`<td class="border p-1 border-dark" id="AGAMA_deskripsi_min" colspan="19" data-firstsiswa="pd_agama" data-keyrapor="deskripsi_min">Deskripsi min</td>`;
                html+=`</tr>`;
                //mapel selain agama dan mulok
                // Object.entries(mapelnonagama).forEach(([kodemapel, teksmapel],indek)=>{
                mapelnonagama.forEach((m,indek)=>{
                    let kodemapel = m.value, teksmapel = m.label;
                    
                    if(!['BSUND','BING'].includes(kodemapel) ){
                        html+=`<tr>`
                            html+=`<td class="border p-1 text-center border-dark" colspan="2">${(indek+2)}.</td>`;
                            html+=`<td  class="border p-1 border-dark" colspan="12">`;
                                html+=teksmapel
                            html+=`</td>`;
                            html+=`<td class="border p-1 text-center border-dark" colspan="3" data-nilairapor="${kodemapel}">Nilai Akhir</td>`;
                            html+=`<td class="border p-1 border-dark" id="${kodemapel}_deskripsi_maks" data-nilairapor="${kodemapel}_P_DESKRIPSI" colspan="19">Deskripsi maks</td>`;
                        html+=`</tr>`;
                            
                        // html+=`<tr>`;
                        //     html+=`<td class="border p-1 border-dark" id="${kodemapel}_deskripsi_min" colspan="19">Deskripsi min</td>`;
                        // html+=`</tr>`;
                    }
                });
                
                html+=`<tr><td colspan="36" class="border p-1 border-dark bg-secondary-subtle">B. Muatan Lokal</td></tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">${(mapelnonagama.length+1)}.</td>`;
                    html+=`<td class="border p-1 border-dark" colspan="34">Muatan Lokal Wajib</td>`;
                html+=`</tr>`;
                //bsund
                html+=`<tr>`
                    html+=`<td class="border p-1 text-end border-dark" colspan="2">a.</td>`;
                    html+=`<td  class="border p-1 border-dark" colspan="12">`;
                        html+=mapelnonagama.filter(s=> s.value == 'BSUND')[0].label;
                    html+=`</td>`;
                    html+=`<td  class="border p-1 text-center border-dark" colspan="3" data-nilairapor="BSUND">Nilai Akhir</td>`;
                    html+=`<td class="border p-1 border-dark" data-nilairapor="BSUND_P_DESKRIPSI" colspan="19"></td>`;
                html+=`</tr>`;
                // html+=`<tr>`;
                //     html+=`<td class="border p-1 border-dark" id="BSUND_deskripsi_min" colspan="19">Deskripsi min</td>`;
                // html+=`</tr>`;

                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">${(mapelnonagama.length+2)}.</td>`;
                    html+=`<td class="border p-1 border-dark" colspan="34">Muatan Lokal Pilihan</td>`;
                html+=`</tr>`;
                //mulok pilihan
                html+=`<tr>`    
                    html+=`<td class="border p-1 text-end border-dark" colspan="2">b.</td>`;
                    html+=`<td  class="border p-1 border-dark" colspan="12">`;
                        html+=mapelnonagama.filter(s=> s.value == 'BING')[0]?mapelnonagama.filter(s=> s.value == 'BING')[0].label:"";
                    html+=`</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3"  data-nilairapor="BING"></td>`;
                    html+=`<td class="border p-1 text-center border-dark" data-nilairapor="BING_P_DESKRIPSI" colspan="19"></td>`;
                html+=`</tr>`;
                // html+=`<tr>`;
                //     html+=`<td class="border p-1 text-center border-dark" colspan="19"></td>`;
                // html+=`</tr>`;
                /** B. Ekstrakurikuler */
                                
                html+=`<tr><td colspan="36"><br/></td></tr>`;
                html+=`<tr><td colspan="36" class="fw-bold">B. Ekstrakurikuler</td></tr>`;
                //ekskul1
                html+=`<tr>`
                    html+=`<td colspan="2"  class="border p-1 text-center border-dark bg-secondary-subtle">No.</td>`;
                    html+=`<td colspan="12" class="border p-1 text-center border-dark bg-secondary-subtle">Kegiatan Ekstrakurikuler</td>`;
                    html+=`<td colspan="3"  class="border p-1 text-center border-dark bg-secondary-subtle">Nilai</td>`;
                    html+=`<td colspan="15" class="border p-1 text-center border-dark bg-secondary-subtle">Keterangan</td>`;
                    html+=`<td colspan="4"></td>`;
                html+=`</tr>`
                html+=`<tr>`
                    html+=`<td colspan="2"  class="border p-1 text-center border-dark">1.</td>`;
                    html+=`<td colspan="12" class="border p-1 border-dark" data-nilairapor="EKSKUL_1_NAMA_SEMESTER_${semester}"></td>`;
                    html+=`<td colspan="3"  class="border p-1 border-dark" data-nilairapor="EKSKUL_1_NILAI_SEMESTER_${semester}"></td>`;
                    html+=`<td colspan="15" class="border p-1 border-dark" data-nilairapor="EKSKUL_1_KETERANGAN_SEMESTER_${semester}"></td>`;
                    html+=`<td colspan="4"></td>`;
                html+=`</tr>`
                html+=`<tr>`
                    html+=`<td colspan="2"  class="border p-1 text-center border-dark">2.</td>`;
                    html+=`<td colspan="12" class="border p-1 border-dark" data-nilairapor="EKSKUL_2_NAMA_SEMESTER_${semester}"></td>`;
                    html+=`<td colspan="3"  class="border p-1 border-dark" data-nilairapor="EKSKUL_2_NILAI_SEMESTER_${semester}"></td>`;
                    html+=`<td colspan="15" class="border p-1 border-dark" data-nilairapor="EKSKUL_2_KETERANGAN_SEMESTER_${semester}"></td>`;
                    html+=`<td colspan="4"></td>`;
                html+=`</tr>`;
                
                /** C. Tinggi dan Berat Badan */
                
                html+=`<tr><td colspan="36"><br/></td></tr>`;
                html+=`<tr><td colspan="36" class="fw-bold">C. Perkembangan Fisik (Tinggi dan Berat Badan)</td></tr>`;
                html+=`<tr>`
                    html+=`<td rowspan="2" colspan="2"  class="border p-1 text-center border-dark bg-secondary-subtle">No.</td>`;
                    html+=`<td rowspan="2" colspan="7" class="border p-1 text-center border-dark bg-secondary-subtle">Aspek yang diukur</td>`;
                    html+=`<td colspan="4"  class="border p-1 text-center border-dark bg-secondary-subtle">Semester</td>`;
                    html+=`<td colspan="23"></td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark bg-secondary-subtle">1</td>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark bg-secondary-subtle">2</td>`;
                    html+=`<td colspan="23"></td>`;
                html+=`</tr>`;

                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">1.</td>`;
                    html+=`<td colspan="7" class="border p-1 border-dark">Tinggi Badan (cm)</td>`;
                    html+=`<td colspan="2" class="border p-1 border-dark" data-nilairapor="TINGGIBADAN_SEMESTER_1"></td>`;
                    html+=`<td colspan="2" class="border p-1 border-dark" data-nilairapor="TINGGIBADAN_SEMESTER_2"></td>`;
                    html+=`<td colspan="23"></td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">2.</td>`;
                    html+=`<td colspan="7" class="border p-1 border-dark">Berat Badan (kg)</td>`;
                    html+=`<td colspan="2" class="border p-1 border-dark"  data-nilairapor="BERATBADAN_SEMESTER_1"></td>`;
                    html+=`<td colspan="2" class="border p-1 border-dark"  data-nilairapor="BERATBADAN_SEMESTER_2"></td>`;
                    html+=`<td colspan="23"></td>`;
                html+=`</tr>`;
                /** D. Kondisi Kesehatan*/
                
                html+=`<tr><td colspan="36" class="fw-bold"><br/></td></tr>`;
                html+=`<tr><td colspan="36" class="fw-bold">D. Perkembangan Kondisi Kesehatan</td></tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark bg-secondary-subtle">No.</td>`
                    html+=`<td colspan="7" class="border p-1 text-center border-dark bg-secondary-subtle">Aspek Fisik</td>`
                    html+=`<td colspan="23" class="border p-1 text-center border-dark bg-secondary-subtle">Keterangan</td>`
                    html+=`<td colspan="4"></td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2"  class="border p-1 text-center border-dark">1.</td>`
                    html+=`<td colspan="7"  class="border p-1 border-dark">Penglihatan</td>`
                    html+=`<td colspan="23" class="border p-1 border-dark"  data-nilairapor="PENGLIHATAN_SEMESTER_${semester}"></td>`
                    html+=`<td colspan="4"></td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">2.</td>`
                    html+=`<td colspan="7" class="border p-1 border-dark">Pendengaran</td>`
                    html+=`<td colspan="23" class="border p-1 border-dark" data-nilairapor="PENDENGARAN_SEMESTER_${semester}"></td>`
                    html+=`<td colspan="4"></td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">3.</td>`
                    html+=`<td colspan="7" class="border p-1 border-dark">Gigi</td>`
                    html+=`<td colspan="23" class="border p-1 border-dark" data-nilairapor="GIGI_SEMESTER_${semester}"></td>`
                    html+=`<td colspan="4"></td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">4.</td>`
                    html+=`<td colspan="7" class="border p-1 border-dark">Penyakit Lainnya</td>`
                    html+=`<td colspan="23" class="border p-1 border-dark" data-nilairapor="PENYAKITLAINNYA_SEMESTER_${semester}"></td>`
                    html+=`<td colspan="4"></td>`
                html+=`</tr>`;

                //Prestasi

                html+=`<tr><td colspan="36" class="fw-bold"><br/></td></tr>`;
                html+=`<tr><td colspan="36" class="fw-bold">E. Prestasi</td></tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark bg-secondary-subtle">No.</td>`
                    html+=`<td colspan="7" class="border p-1 text-center border-dark bg-secondary-subtle">Prestasi</td>`
                    html+=`<td colspan="23" class="border p-1 text-center border-dark bg-secondary-subtle">Keterangan</td>`
                    html+=`<td colspan="4"></td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2"  class="border p-1 text-center border-dark">1.</td>`
                    html+=`<td colspan="7"  class="border p-1 border-dark" data-nilairapor="PRESTASI_1_NAMA_SEMESTER_${semester}"></td>`
                    html+=`<td colspan="23" class="border p-1 border-dark"  data-nilairapor="PRESTASI_1_KETERANGAN_SEMESTER_${semester}"></td>`
                    html+=`<td colspan="4"></td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">2.</td>`
                    html+=`<td colspan="7" class="border p-1 border-dark" data-nilairapor="PRESTASI_2_NAMA_SEMESTER_${semester}"></td>`
                    html+=`<td colspan="23" class="border p-1 border-dark" data-nilairapor="PRESTASI_2_KETERANGAN_SEMESTER_${semester}"></td>`
                    html+=`<td colspan="4"></td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">3.</td>`
                    html+=`<td colspan="7" class="border p-1 border-dark"  data-nilairapor="PRESTASI_3_NAMA_SEMESTER_${semester}"></td>`
                    html+=`<td colspan="23" class="border p-1 border-dark"  data-nilairapor="PRESTASI_3_KETERANGAN_SEMESTER_${semester}"></td>`
                    html+=`<td colspan="4"></td>`
                html+=`</tr>`;
                
                html+=`<tr><td colspan="36" class="fw-bold"><br/></td></tr>`;
                html+=`<tr><td colspan="36" class="fw-bold">F. Saran-saran</td></tr>`;
                html+=`<tr>`
                    html+=`<td></td>`
                    html+=`<td  style="min-height:300px" colspan="31" class="border p-1 border-dark text-center" data-nilairapor="SARAN_SEMESTER_${semester}"></td>`
                    html+=`<td colspan="4"></td>`
                html+=`</tr>`
                
                html+=`<tr><td colspan="36" class="fw-bold"><br/></td></tr>`;
                html+=`<tr><td colspan="36" class="fw-bold">G. Kehadiran<br/></td></tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="6" class="border-start border-top border-bottom-0 border-end-0 p-1 border-dark">Sakit</td>`;
                    html+=`<td class="border-start-0 border-top border-bottom-0 border-end-0 p-1 border-dark">:</td>`
                    html+=`<td colspan="3" class="border-start-0 border-top border-bottom-0 border-end p-1 border-dark" data-nilairapor="sakit"></td>`;
                    html+=`<td colspan="24"></td>`
                html+=`<tr>`;
                html+=`<tr>`;
                    // html+=`<td colspan="3"></td>`
                    html+=`<td colspan="6" class="border-start border-top-0 border-bottom-0 border-end-0 p-1 border-dark">Ijin</td>`;
                    html+=`<td class="border-start-0 border-top-0 border-bottom-0 border-end-0 p-1 border-dark">:</td>`
                    html+=`<td colspan="3" class="border-start-0 border-top-0 border-bottom-0 border-end p-1 border-dark" data-nilairapor="ijin"></td>`;
                    html+=`<td colspan="24"></td>`
                html+=`<tr>`;
                html+=`<tr>`;
                    // html+=`<td colspan="3"></td>`
                    html+=`<td colspan="6" class="border-start border-top-0 border-bottom border-end-0 p-1 border-dark">Tanpa Keterangan</td>`;
                    html+=`<td class="border-start-0 border-top-0 border-bottom border-end-0 p-1 border-dark">:</td>`
                    html+=`<td colspan="3" class="border-start-0 border-top-0 border-bottom border-end p-1 border-dark" data-nilairapor="alpa"></td>`;
                    html+=`<td colspan="24"></td>`
                html+=`<tr>`;
                        if(semester == 2){
                        html+=`<tr><td colspan="36"><br/><br/><br/></td></tr>`;
                        html+=`<tr><td colspan="3"></td>`;
                            html+=`<td colspan="30" class="fw-bold">`;
                                html+=`Berdasarkan pencapaian kompetensi selama menempuh pembelajaran, peserta didik atas nama:`
                                html+=`<h4 class="text-center fw-bold" data-nilairapor="namasiswa">{namaiswa}</h4>`;
                                html+=`dengan ini dinyatakan:`
                                if(identitas.jenjang == 6){
                                    html+=`<h3 class="text-center fw-bold"><span data-nilairapor="KENAIKAN_KELAS"></span></h3>`;

                                }else{
                                    html+=`<h3 class="text-center fw-bold"><span data-nilairapor="KENAIKAN_KELAS"></span> <span data-nilairapor="NAIKTINGGAL_KELAS_DI"></span></h3>`;

                                }
                            
                            html+=`</td>`;
                        html+=`<td colspan="3"></td></tr>`;
                        
                        html+=`<tr><td colspan="36" class="fw-bold"><br/><br/><br/><br/></td></tr>`;
                        html+=`<tr>`;
                            html+=`<td colspan="12" class="text-center p-1 align-bottom">________________</td>`;
                            html+=`<td colspan="12" class="text-center p-1">`;
                            html+=`</td>`;
                            html+=`<td colspan="12" class="text-center p-1 align-top">`;
                            html+=`Depok, <span data-propertikelas="titimangsa" data-nilairapor="TITIMANGSA_RAPORT">${identitas.titimangsa}</span><br>`;
                            html+=`Guru Kelas ${identitas.kelas}`;
                            html+=`<br><br><br><br><br><br>`;
                            html+=`<u><b data-propertikelas="namaguru">${identitas.namauser}</b></u><br>`;
                            html+=`<span data-propertikelas="nipguru">${identitas.nipuser}</span>`;
                            html+=`</td>`;
                        html+=`</tr>`
                        // html+=`<tr><td colspan="36" class="fw-bold"><br/><br/><br/><br/></td></tr>`;
                        html+=`<tr>`;
                            html+=`<td colspan="12"></td>`
                            html+=`<td colspan="12" class="align-top text-center">`;
                                
                            html+=`Mengetahui,<br>`;
                            html+=`Kepala UPTD ${identitas.namasekolah}`;

                            html+=`<br><br><br><br><br>`;
                            html+=`<u><b data-propertikelas="namakepsek">${identitas.namakepsek}</b></u><br>`;
                            html+=`<span data-propertikelas="nipkepsek">${identitas.nipkepsek}</span>`
                            html+=`</td>`;
                            html+=`<td colspan="12"></td>`
                        html+=`<tr>`;

                }else{
                        html+=`<tr><td colspan="36" class="fw-bold"><br/><br/></td></tr>`;
                        html+=`<tr>`;
                            html+=`<td colspan="18" class="text-center p-1">Mengetahui,<br>Orang tua/Wali<br><br><br><br><br>_______________</td>`;
                            html+=`<td colspan="18" class="text-center p-1">`;
                                html+=`Depok, <span data-propertikelas="titimangsa">${identitas.titimangsa}</span><br>`;
                                html+=`Guru Kelas ${identitas.kelas}`;
                                html+=`<br><br><br><br><br>`;
                                html+=`<u><b data-propertikelas="namaguru">${identitas.namauser}</b></u><br>`;
                                html+=`<span data-propertikelas="nipguru">${identitas.nipuser}</span>`
                            html+=`</td>`;
                        html+=`</tr>`
                }

/** Selesai Kurmer */            
            }else{
/** Kurtilas */            
            //header
            html+=`<tr><td colspan="36" class="fw-bold">A. Sikap</td></tr>`;
            html+=`<tr><td></td><td colspan="35">1. Spiritual</td></tr>`;
            html+=`<tr>`;
                html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="4">Predikat</td>`;
                html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="32">Deskripsi</td>`;
            html+=`<tr>`;
            html+=`<tr>`;
                html+=`<td class="border p-1 text-center border-dark" colspan="4" data-nilairapor="spiritual_PREDIKAT"></td>`;
                html+=`<td class="border p-1 text-center border-dark" colspan="32" style="min-height:100px" data-nilairapor="spiritual_SIKAP_DESKRIPSI"></td>`;
            html+=`<tr>`;

            html+=`<tr><td></td><td colspan="35">2. Sosial</td></tr>`;
            html+=`<tr>`;
                html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="4">Predikat</td>`;
                html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="32">Deskripsi</td>`;
            html+=`<tr>`;
            html+=`<tr>`;
                html+=`<td class="border p-1 text-center border-dark" colspan="4" data-nilairapor="sosial_PREDIKAT"></td>`;
                html+=`<td class="border p-1 text-center border-dark" colspan="32" style="min-height:100px" data-nilairapor="sosial_SIKAP_DESKRIPSI"></td>`;
            html+=`<tr>`;
            
            html+=`<tr><td colspan="36" class="fw-bold"><br/></td></tr>`;
            html+=`<tr><td colspan="36" class="fw-bold">B. Pengetahuan Dan Keterampilan</td></tr>`;
            html+=`<tr>`
                html+=`<td rowspan="2" class="border p-1 text-center border-dark bg-secondary-subtle" colspan="2">No.</td>`;
                html+=`<td rowspan="2" class="border p-1 text-center border-dark bg-secondary-subtle" colspan="8">Mata Pelajaran</td>`;
                html+=`<td rowspan="2" class="border p-1 text-center border-dark bg-secondary-subtle" colspan="2">KKM</td>`;
                html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="12">Kompetensi Pengetahuan</td>`;
                html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="12">Kompetensi Keterampilan</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                
                html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="2">Nilai</td>`
                html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="2">Predikat</td>`
                html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="8">Deskripsi</td>`
            
                html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="2">Nilai</td>`
                html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="2">Predikat</td>`
                html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="8">Deskripsi</td>`
            html+=`</tr>`;
            /// mapel agama;
                html+=`<tr><td colspan="36" class="border p-1 border-dark bg-secondary-subtle">A. Muatan Nasional</td></tr>`;
                html+=`<tr>`;
                    html+=`<td rowspan="2" class="border p-1 text-center border-dark" colspan="2">1.</td>`;
                    html+=`<td class="border p-1 border-dark" colspan="34">Pendidikan Agama dan Budi Pekerti</td>`;
                html+=`</tr>`;
                
                html+=`<tr>`
                    html+=`<td class="border p-1 border-dark" colspan="8" data-firstsiswa="pd_agama" data-keyrapor="agama" data-nilairapor="mapel_agama_kode_teks">`;
                        html+='MAPEL AGAMA SESUAI SISWA ini'
                    html+=`</td>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark" data-kkm="PAI" data-nilairapor="kkmkktp_agama"></td>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark" data-firstsiswa="pd_agama" data-keyrapor="nilai" data-nilairapor="nilairaport_P_agama"></td>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark" data-firstsiswa="pd_agama" data-keyrapor="P_PREDIKAT" data-nilairapor="P_PREDIKAT_agama"></td>`;
                    html+=`<td class="border p-1 border-dark font10"  id="AGAMA_deskripsi_maks" colspan="8" data-firstsiswa="pd_agama" data-nilairapor="P_DESKRIPSI_agama" data-keyrapor="P_DESKRIPSI"></td>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark" data-firstsiswa="pd_agama" data-keyrapor="nilai_keterampilan" data-nilairapor="nilairaport_K_agama"></td>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark" data-firstsiswa="pd_agama" data-keyrapor="K_PREDIKAT" data-nilairapor="K_PREDIKAT_agama"></td>`;
                    html+=`<td class="border p-1 border-dark font10"  id="AGAMA_deskripsi_maks" colspan="8" data-firstsiswa="pd_agama" data-keyrapor="K_DESKRIPSI" data-nilairapor="K_DESKRIPSI_agama"></td>`;
                html+=`</tr>`;
                mapelnonagama.forEach((m,indek)=>{
                    let kodemapel = m.value, teksmapel = m.label;
                    if(kodemapel!=='BSUND'){
                        html+=`<tr>`
                            html+=`<td class="border p-1 text-center border-dark" colspan="2">${(indek+2)}.</td>`;
                            html+=`<td class="border p-1 border-dark" colspan="8">`;
                                html+=teksmapel;
                            html+=`</td>`;
                            html+=`<td class="border p-1 text-center border-dark" colspan="2" data-kkm="${kodemapel}" data-nilairapor="kkmkktp_${kodemapel}"></td>`;
                            html+=`<td class="border p-1 text-center border-dark" colspan="2" data-nilairapor="${kodemapel}"></td>`;
                            html+=`<td class="border p-1 text-center border-dark" colspan="2" data-nilairapor="${kodemapel}_P_PREDIKAT"></td>`;
                            html+=`<td class="border p-1 border-dark font10" data-nilairapor="${kodemapel}_P_DESKRIPSI" colspan="8"></td>`;
                            html+=`<td class="border p-1 text-center border-dark" colspan="2" data-nilairapor="${kodemapel}_NILAI_KETERAMPILAN"></td>`;
                            html+=`<td class="border p-1 text-center border-dark" colspan="2" data-nilairapor="${kodemapel}_K_PREDIKAT"></td>`;
                            html+=`<td class="border p-1 border-dark font10" data-nilairapor="${kodemapel}_K_DESKRIPSI" colspan="8"></td>`;
                        html+=`</tr>`;
                    }
                    
                });

                html+=`<tr><td colspan="36" class="border p-1 border-dark bg-secondary-subtle">B. Muatan Lokal</td></tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">${(mapelnonagama.length+1)}.</td>`;
                    html+=`<td class="border p-1 border-dark" colspan="34">Muatan Lokal Wajib</td>`;
                html+=`</tr>`;

                html+=`<tr>`
                    html+=`<td class="border p-1 text-center border-dark text-end" colspan="2">a.</td>`;
                    html+=`<td class="border p-1 border-dark" colspan="8">`;
                        html+=mapelnonagama.filter(s=>s.value=='BSUND')[0].label;
                    html+=`</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="2" data-kkm="BSUND" data-nilairapor="kkmkktp_BSUND"></td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="2" data-nilairapor="BSUND"></td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="2" data-nilairapor="BSUND_P_PREDIKAT"></td>`;
                    html+=`<td class="border p-1 border-dark font10" data-nilairapor="BSUND_P_DESKRIPSI" colspan="8"></td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="2" data-nilairapor="BSUND_NILAI_KETERAMPILAN"></td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="2" data-nilairapor="BSUND_K_PREDIKAT"></td>`;
                    html+=`<td class="border p-1 border-dark font10" data-nilairapor="BSUND_K_DESKRIPSI" colspan="8"></td>`;
                html+=`</tr>`;
                
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">${mapelnonagama.length+2}.</td>`;
                    html+=`<td class="border p-1 border-dark" colspan="34">Muatan Lokal Pilihan</td>`;
                html+=`</tr>`;

                html+=`<tr>`
                    html+=`<td class="border p-1 text-center border-dark text-end" colspan="2">b.</td>`;
                    html+=`<td class="border p-1 border-dark" colspan="8">`;
                        // html+='Muatan Lokal Pilihan'
                    html+=`</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="2"></td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="2"></td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="2"></td>`;
                    html+=`<td class="border p-1 border-dark font8" colspan="8"></td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="2"></td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="2"></td>`;
                    html+=`<td class="border p-1 border-dark font8" colspan="8"></td>`;
                html+=`</tr>`;


/** Selesai Kurtilas */
            /** B. Ekstrakurikuler */
            
            html+=`<tr><td colspan="36"><br/></td></tr>`;
            html+=`<tr><td colspan="36" class="fw-bold">C. Ekstrakurikuler</td></tr>`;
            //ekskul1
            html+=`<tr>`
                html+=`<td colspan="2"  class="border p-1 text-center border-dark bg-secondary-subtle">No.</td>`;
                html+=`<td colspan="12" class="border p-1 text-center border-dark bg-secondary-subtle">Kegiatan Ekstrakurikuler</td>`;
                html+=`<td colspan="3"  class="border p-1 text-center border-dark bg-secondary-subtle">Nilai</td>`;
                html+=`<td colspan="15" class="border p-1 text-center border-dark bg-secondary-subtle">Keterangan</td>`;
                html+=`<td colspan="4"></td>`;
            html+=`</tr>`
            html+=`<tr>`
                html+=`<td colspan="2"  class="border p-1 text-center border-dark">1.</td>`;
                html+=`<td colspan="12" class="border p-1 border-dark" data-nilairapor="EKSKUL_1_NAMA_SEMESTER_${semester}"></td>`;
                html+=`<td colspan="3"  class="border p-1 border-dark" data-nilairapor="EKSKUL_1_NILAI_SEMESTER_${semester}"></td>`;
                html+=`<td colspan="15" class="border p-1 border-dark" data-nilairapor="EKSKUL_1_KETERANGAN_SEMESTER_${semester}"></td>`;
                html+=`<td colspan="4"></td>`;
            html+=`</tr>`
            html+=`<tr>`
                html+=`<td colspan="2"  class="border p-1 text-center border-dark">2.</td>`;
                html+=`<td colspan="12" class="border p-1 border-dark" data-nilairapor="EKSKUL_2_NAMA_SEMESTER_${semester}"></td>`;
                html+=`<td colspan="3"  class="border p-1 border-dark" data-nilairapor="EKSKUL_2_NILAI_SEMESTER_${semester}"></td>`;
                html+=`<td colspan="15" class="border p-1 border-dark" data-nilairapor="EKSKUL_2_KETERANGAN_SEMESTER_${semester}"></td>`;
                html+=`<td colspan="4"></td>`;
            html+=`</tr>`;
            
            /** C. Tinggi dan Berat Badan */
            
            html+=`<tr><td colspan="36"><br/></td></tr>`;
            html+=`<tr><td colspan="36" class="fw-bold">D. Perkembangan Fisik (Tinggi dan Berat Badan)</td></tr>`;
            html+=`<tr>`
                html+=`<td rowspan="2" colspan="2"  class="border p-1 text-center border-dark bg-secondary-subtle">No.</td>`;
                html+=`<td rowspan="2" colspan="7" class="border p-1 text-center border-dark bg-secondary-subtle">Aspek yang diukur</td>`;
                html+=`<td colspan="4"  class="border p-1 text-center border-dark bg-secondary-subtle">Semester</td>`;
                html+=`<td colspan="23"></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td colspan="2" class="border p-1 text-center border-dark bg-secondary-subtle">1</td>`;
                html+=`<td colspan="2" class="border p-1 text-center border-dark bg-secondary-subtle">2</td>`;
                html+=`<td colspan="23"></td>`;
            html+=`</tr>`;

            html+=`<tr>`;
                html+=`<td colspan="2" class="border p-1 text-center border-dark">1.</td>`;
                html+=`<td colspan="7" class="border p-1 border-dark">Tinggi Badan (cm)</td>`;
                html+=`<td colspan="2" class="border p-1 border-dark" data-nilairapor="TINGGIBADAN_SEMESTER_1"></td>`;
                html+=`<td colspan="2" class="border p-1 border-dark" data-nilairapor="TINGGIBADAN_SEMESTER_2"></td>`;
                html+=`<td colspan="23"></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td colspan="2" class="border p-1 text-center border-dark">2.</td>`;
                html+=`<td colspan="7" class="border p-1 border-dark">Berat Badan (kg)</td>`;
                html+=`<td colspan="2" class="border p-1 border-dark"  data-nilairapor="BERATBADAN_SEMESTER_1"></td>`;
                html+=`<td colspan="2" class="border p-1 border-dark"  data-nilairapor="BERATBADAN_SEMESTER_2"></td>`;
                html+=`<td colspan="23"></td>`;
            html+=`</tr>`;
            /** D. Kondisi Kesehatan*/
            
            html+=`<tr><td colspan="36" class="fw-bold"><br/></td></tr>`;
            html+=`<tr><td colspan="36" class="fw-bold">E. Perkembangan Kondisi Kesehatan</td></tr>`;
            html+=`<tr>`;
                html+=`<td colspan="2" class="border p-1 text-center border-dark bg-secondary-subtle">No.</td>`
                html+=`<td colspan="7" class="border p-1 text-center border-dark bg-secondary-subtle">Aspek Fisik</td>`
                html+=`<td colspan="23" class="border p-1 text-center border-dark bg-secondary-subtle">Keterangan</td>`
                html+=`<td colspan="4"></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td colspan="2"  class="border p-1 text-center border-dark">1.</td>`
                html+=`<td colspan="7"  class="border p-1 border-dark">Penglihatan</td>`
                html+=`<td colspan="23" class="border p-1 border-dark"  data-nilairapor="PENGLIHATAN_SEMESTER_${semester}"></td>`
                html+=`<td colspan="4"></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td colspan="2" class="border p-1 text-center border-dark">2.</td>`
                html+=`<td colspan="7" class="border p-1 border-dark">Pendengaran</td>`
                html+=`<td colspan="23" class="border p-1 border-dark" data-nilairapor="PENDENGARAN_SEMESTER_${semester}"></td>`
                html+=`<td colspan="4"></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td colspan="2" class="border p-1 text-center border-dark">3.</td>`
                html+=`<td colspan="7" class="border p-1 border-dark">Gigi</td>`
                html+=`<td colspan="23" class="border p-1 border-dark" data-nilairapor="GIGI_SEMESTER_${semester}"></td>`
                html+=`<td colspan="4"></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td colspan="2" class="border p-1 text-center border-dark">4.</td>`
                html+=`<td colspan="7" class="border p-1 border-dark">Penyakit Lainnya</td>`
                html+=`<td colspan="23" class="border p-1 border-dark" data-nilairapor="PENYAKITLAINNYA_SEMESTER_${semester}"></td>`
                html+=`<td colspan="4"></td>`
            html+=`</tr>`;

            //Prestasi

            html+=`<tr><td colspan="36" class="fw-bold"><br/></td></tr>`;
            html+=`<tr><td colspan="36" class="fw-bold">F. Prestasi</td></tr>`;
            html+=`<tr>`;
                html+=`<td colspan="2" class="border p-1 text-center border-dark bg-secondary-subtle">No.</td>`
                html+=`<td colspan="7" class="border p-1 text-center border-dark bg-secondary-subtle">Prestasi</td>`
                html+=`<td colspan="23" class="border p-1 text-center border-dark bg-secondary-subtle">Keterangan</td>`
                html+=`<td colspan="4"></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td colspan="2"  class="border p-1 text-center border-dark">1.</td>`
                html+=`<td colspan="7"  class="border p-1 border-dark" data-nilairapor="PRESTASI_1_NAMA_SEMESTER_${semester}"></td>`
                html+=`<td colspan="23" class="border p-1 border-dark"  data-nilairapor="PRESTASI_1_KETERANGAN_SEMESTER_${semester}"></td>`
                html+=`<td colspan="4"></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td colspan="2" class="border p-1 text-center border-dark">2.</td>`
                html+=`<td colspan="7" class="border p-1 border-dark" data-nilairapor="PRESTASI_2_NAMA_SEMESTER_${semester}"></td>`
                html+=`<td colspan="23" class="border p-1 border-dark" data-nilairapor="PRESTASI_2_KETERANGAN_SEMESTER_${semester}"></td>`
                html+=`<td colspan="4"></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td colspan="2" class="border p-1 text-center border-dark">3.</td>`
                html+=`<td colspan="7" class="border p-1 border-dark"  data-nilairapor="PRESTASI_3_NAMA_SEMESTER_${semester}"></td>`
                html+=`<td colspan="23" class="border p-1 border-dark"  data-nilairapor="PRESTASI_3_KETERANGAN_SEMESTER_${semester}"></td>`
                html+=`<td colspan="4"></td>`
            html+=`</tr>`;
            
            html+=`<tr><td colspan="36" class="fw-bold"><br/></td></tr>`;
            html+=`<tr><td colspan="36" class="fw-bold">G. Saran-saran</td></tr>`;
            html+=`<tr>`
                html+=`<td></td>`
                html+=`<td  style="min-height:300px" colspan="31" class="border p-1 border-dark text-center" data-nilairapor="SARAN_SEMESTER_${semester}"></td>`
                html+=`<td colspan="4"></td>`
            html+=`</tr>`
            
            html+=`<tr><td colspan="36" class="fw-bold"><br/></td></tr>`;
            html+=`<tr><td colspan="36" class="fw-bold">H. Kehadiran<br/></td></tr>`;
            html+=`<tr>`;
                html+=`<td colspan="6" class="border-start border-top border-bottom-0 border-end-0 p-1 border-dark">Sakit</td>`;
                html+=`<td class="border-start-0 border-top border-bottom-0 border-end-0 p-1 border-dark">:</td>`
                html+=`<td colspan="3" class="border-start-0 border-top border-bottom-0 border-end p-1 border-dark" data-nilairapor="sakit"></td>`;
                html+=`<td colspan="24"></td>`
            html+=`<tr>`;
            html+=`<tr>`;
                // html+=`<td colspan="3"></td>`
                html+=`<td colspan="6" class="border-start border-top-0 border-bottom-0 border-end-0 p-1 border-dark">Ijin</td>`;
                html+=`<td class="border-start-0 border-top-0 border-bottom-0 border-end-0 p-1 border-dark">:</td>`
                html+=`<td colspan="3" class="border-start-0 border-top-0 border-bottom-0 border-end p-1 border-dark" data-nilairapor="ijin"></td>`;
                html+=`<td colspan="24"></td>`
            html+=`<tr>`;
            html+=`<tr>`;
                // html+=`<td colspan="3"></td>`
                html+=`<td colspan="6" class="border-start border-top-0 border-bottom border-end-0 p-1 border-dark">Tanpa Keterangan</td>`;
                html+=`<td class="border-start-0 border-top-0 border-bottom border-end-0 p-1 border-dark">:</td>`
                html+=`<td colspan="3" class="border-start-0 border-top-0 border-bottom border-end p-1 border-dark" data-nilairapor="alpa"></td>`;
                html+=`<td colspan="24"></td>`
            html+=`<tr>`;
                if(semester == 2){
                    html+=`<tr><td colspan="36"><br/><br/><br/></td></tr>`;
                    html+=`<tr><td colspan="3"></td>`;
                        html+=`<td colspan="30" class="fw-bold">`;
                            html+=`Berdasarkan pencapaian kompetensi selama menempuh pembelajaran, peserta didik atas nama:`
                            html+=`<h4 class="text-center fw-bold" data-nilairapor="namasiswa">{namaiswa}</h4>`;
                            html+=`dengan ini dinyatakan:`;
                            if(identitas.jenjang == 6){
                                html+=`<h3 class="text-center fw-bold"><span data-nilairapor="KENAIKAN_KELAS"></span></h3>`;

                            }else{
                                html+=`<h3 class="text-center fw-bold"><span data-nilairapor="KENAIKAN_KELAS"></span> <span data-nilairapor="NAIKTINGGAL_KELAS_DI"></span></h3>`;

                            }
                        
                        html+=`</td>`;
                    html+=`<td colspan="3"></td></tr>`;
                    
                    html+=`<tr><td colspan="36" class="fw-bold"><br/><br/><br/><br/></td></tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="12" class="text-center p-1 align-bottom">________________</td>`;
                        html+=`<td colspan="12" class="text-center p-1">`;
                        html+=`</td>`;
                        html+=`<td colspan="12" class="text-center p-1 align-top">`;
                        html+=`Depok, <span data-propertikelas="titimangsa" data-nilairapor="TITIMANGSA_RAPORT">${identitas.titimangsa}</span><br>`;
                        html+=`Guru Kelas ${identitas.kelas}`;
                        html+=`<br><br><br><br><br><br>`;
                        html+=`<u><b data-propertikelas="namaguru">${identitas.namauser}</b></u><br>`;
                        html+=`<span data-propertikelas="nipguru">${identitas.nipuser}</span>`;
                        html+=`</td>`;
                    html+=`</tr>`
                    // html+=`<tr><td colspan="36" class="fw-bold"><br/><br/><br/><br/></td></tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="12"></td>`
                        html+=`<td colspan="12" class="align-top text-center">`;
                            
                        html+=`Mengetahui,<br>`;
                        html+=`Kepala UPTD ${identitas.namasekolah}`;

                        html+=`<br><br><br><br><br>`;
                        html+=`<u><b data-propertikelas="namakepsek">${identitas.namakepsek}</b></u><br>`;
                        html+=`<span data-propertikelas="nipkepsek">${identitas.nipkepsek}</span>`
                        html+=`</td>`;
                        html+=`<td colspan="12"></td>`
                    html+=`<tr>`;
                }else{
                    html+=`<tr><td colspan="36" class="fw-bold"><br/><br/></td></tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="18" class="text-center p-1">Mengetahui,<br>Orang tua/Wali<br><br><br><br><br>_______________</td>`;
                        html+=`<td colspan="18" class="text-center p-1">`;
                            html+=`Depok, <span data-propertikelas="titimangsa">${identitas.titimangsa}</span><br>`;
                            html+=`Guru Kelas ${identitas.kelas}`;
                            html+=`<br><br><br><br><br>`;
                            html+=`<u><b data-propertikelas="namaguru">${identitas.namauser}</b></u><br>`;
                            html+=`<span data-propertikelas="nipguru">${identitas.nipuser}</span>`
                        html+=`</td>`;
                    html+=`</tr>`
                }


            }
                        
                
            html+=`</tbody>`;
                    
        html+=`</table>`;
    html+=`</div>`;
    html+=`<div id="area_kontrol" class="sticky-md-bottom text-center accord-bg print-hide rounded shadow-lg py-2 mt-5">`;
        html+=`<div class="row justify-content-center">`;
            html+=`<div class="col-6">`;
                html+=`<div class="input-group input-group-sm">`;
                    html+=`<button class="btn btn-sm btn-outline-primary" type="button" id="btnLeft">↤</button>`;
                        html+=`<select class="form-select form-select-sm" id="selectTargetSiswa">`;
                            dbsiswa.forEach((db,i_db)=>{
                                html+=`<option value="${db.id}">${db.pd_nama}</option>`;
                            })
                        html+=`</select>`;
                    html+=`<button class="btn btn-sm btn-outline-primary" type="button" id="btnRight">↦</button>`
                html+=`</div>`;
                html+=`<button class="btn btn-sm btn-success" id="btnPrintKelulusan">Print</button>`
            html+=`</div>`;
        html+=`</div>`;
    html+=`</div>`;
    return html;
}

const html_titimangsa_rapor = (identitas,dataserver)=>{
    let html="";
        html+=`<h3 class="text-center mb-0">Titimangsa Rapor</h3>`;
        html+=`<h3 class="text-center mb-3">Semester ${identitas.semester} Tahun Pelajaran ${identitas.tapel}</h3>`;
        html+=`<div class="row mt-1 justify-content-center">`;
            html+=`<div class="col-md-7">`;
                html+=`<div class="card">`;
                    html+=`<div class="card-header text-center">Pengaturan Titimangsa Rapor</div>`;
                    html+=`<div class="card-body">`;
                        html+=`<div class="form-floating">`;
                            html+=`<input type="date" class="form-control" id="titimangsa_rapor" value="${dataserver.tgl_for_input}"/>`;
                            html+=`<label for="titimangsa_rapor">Pengaturan Titimangsa</label>`;
                        html+=`</div>`;
                        html+=`<div class="mt-2 shadow-lg rounded p-3">`;
                            html+=`<h4 class="text-center">Titimangsa Raport Saat ini</h3>`;
                            html+=`<h2 class="text-center fw-bold" id="text_titimangsa_teks">${dataserver.titimangsa_teks}</h2>`;
                        html+=`</div>`;
                    html+=`</div>`;
                    html+=`<div class="mt-3 text-center bg-secondary-subtle py-3">`;
                        html+=`<button class="btn btn-sm btn-success" id="simpanserver">Simpan Perubahan</button>`;
    
                    html+=`</div>`;
                html+=`</div>`;
            html+=`</div>`;
        html+=`</div>`

    return html;
}

const html_setting_kd12 = (identitas, dataservers) =>{
    const dataserver = dataservers['data_rapor'];
    const dataserver_deskripsi = dataservers['data_deskripsi'];
    let html="";
    html+=`<h3 class="mb-0 text-center">Pengaturan Nilai Sikap ${identitas.namasikap_title}</h3>`;
    html+=`<h3 class="mb-0 text-center">Kelas ${identitas.rombel} Semester ${identitas.semester}</h3>`;
    html+=`<h3 class="mb-3 text-center">Tahun Pelajaran ${identitas.tapel}</h3>`;
    html+=`<div class="table-responsive">`;
    html+=`<table class="w3-table-all font10 toExcel" id="data_sikap">`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th rowspan="3">No</th>`;
                html+=`<th rowspan="3">ID</th>`;
                html+=`<th rowspan="3">Nama Siswa</th>`;
                html+=`<th colspan="3">Sikap ${identitas.namasikap_title}</th>`;
                html+=`<th rowspan="3" class="text-nowrap">Ilustrasi Deskripsi Sikap ${identitas.namasikap_title}</th>`;
                
            html+=`</tr><tr>`;
                html+=`<th>Predikat Sikap<br>Ketikkan Predikat: Sangat Baik, Baik, dll.</th>`;
                html+=`<th>Koleksi Sikap Maksimum<br>Masukkan angka 0 sampai ${(dataserver_deskripsi.length-1)} dan pisahkan dengan koma</th>`;
                html+=`<th>Koleksi Sikap Minimum<br>Masukkan angka 0 sampai ${(dataserver_deskripsi.length-1)} dan pisahkan dengan koma</th>`;
             html+=`</tr><tr>`;
                html+=`<th class="p-0" style="min-width:170px"><input type="text" class="form-control border-0 bg-transparent m-0" placeholder="Ketikkan Predikat: Sangat Baik, Baik, dll." data-control="${identitas.namasikap_key}_PREDIKAT"/></th>`;
                html+=`<th class="p-0" style="min-width:170px"><input type="text" class="form-control border-0 bg-transparent m-0" placeholder="Masukkan angka 0 sampai ${(dataserver_deskripsi.length-1)} dan pisahkan dengan koma" data-control="${identitas.namasikap_key}_array_maks" data-target=""/></th>`;
                html+=`<th class="p-0" style="min-width:170px"><input type="text" class="form-control border-0 bg-transparent m-0" placeholder="Masukkan angka 0 sampai ${(dataserver_deskripsi.length-1)} dan pisahkan dengan koma" data-control="${identitas.namasikap_key}_array_min" data-target=""/></th>`;
            html+=`</tr>`;
                
        html+=`</thead>`;
        html+=`<tbody>`;
            identitas.dbsiswa.forEach((db, i_db)=>{
                html+=`<tr>`;
                    html+=`<td class="text-center">${(i_db+1)}</td>`;
                    html+=`<td class="text-center" data-key="id">${db.id}</td>`;
                    html+=`<td class="text-nowrap" data-key="namasiswa">${db.pd_nama}</td>`;
                    if(dataserver.length==0){
                        html+=`<td class="p-0 text-bg-warning"><input data-key="${identitas.namasikap_key}_PREDIKAT" value="" type="text" class="form-control m-0 bg-transparent border-0"></td>`
                        html+=`<td class="p-0 text-bg-warning"><input data-key="${identitas.namasikap_key}_array_maks" value="" type="text" class="form-control m-0 bg-transparent border-0"></td>`
                        html+=`<td class="p-0 text-bg-warning"><input data-key="${identitas.namasikap_key}_array_min" value="" type="text" class="form-control m-0 bg-transparent border-0"></td>`
                        html+=`<td class="p-0 text-bg-warning" data-key="${identitas.namasikap_key}_SIKAP_DESKRIPSI"></td>`;
                    }else{
                        let db_sikap = dataserver.filter(s=>s.id == db.id);
                        
                        if(db_sikap.length >0){
                            html+=`<td class="p-0"><input data-key="${identitas.namasikap_key}_PREDIKAT"    value="${db_sikap[0][identitas.namasikap_key+'_PREDIKAT']}" type="text" class="form-control m-0 bg-transparent border-0"></td>`
                            html+=`<td class="p-0"><input data-key="${identitas.namasikap_key}_array_maks"  value="${db_sikap[0][identitas.namasikap_key+'_array_maks']}" type="text" class="form-control m-0 bg-transparent border-0"></td>`
                            html+=`<td class="p-0"><input data-key="${identitas.namasikap_key}_array_min"   value="${db_sikap[0][identitas.namasikap_key+'_array_min']}" type="text" class="form-control m-0 bg-transparent border-0"></td>`
                            html+=`<td class="p-0" data-key="${identitas.namasikap_key}_SIKAP_DESKRIPSI">${db_sikap[0][identitas.namasikap_key+'_SIKAP_DESKRIPSI']}</td>`;
                        }else{
                            html+=`<td class="p-0 text-bg-warning"><input data-key="${identitas.namasikap_key}_PREDIKAT" value="" type="text" class="form-control m-0 bg-transparent border-0"></td>`
                            html+=`<td class="p-0 text-bg-warning"><input data-key="${identitas.namasikap_key}_array_maks" value="" type="text" class="form-control m-0 bg-transparent border-0"></td>`
                            html+=`<td class="p-0 text-bg-warning"><input data-key="${identitas.namasikap_key}_array_min" value="" type="text" class="form-control m-0 bg-transparent border-0"></td>`
                            html+=`<td class="p-0 text-bg-warning" data-key="${identitas.namasikap_key}_SIKAP_DESKRIPSI"></td>`;

                        }
                    

                    }
                html+=`</tr>`;
            })
        html+=`</tbody>`;
    html+=`</table>`;
    html+=`</div>`;
    html+=`<div class="sticky-md-bottom text-center accord-bg print-hide rounded shadow-lg py-2">`;
        html+=`<button class="btn btn-sm text-bg-success mx-1" data-klik="simpanserver">Simpan Server</button>`;
    html+=`</div>`
    return html;
}

const tabelDataRapoIjazah = (fokusmapel, db,withClass=false)=>{
    let html="";
    
    html+=`<table class="table table-sm table-bordered bordere-dark font12">`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th rowspan="4" class="text-center align-middle text-bg-secondary" style="width:20px">No</td>`;
                html+=`<th rowspan="4" class="text-center align-middle text-bg-secondary" style="width:20px">Token Siswa</td>`;
                html+=`<th rowspan="4" class="text-center align-middle text-bg-secondary">Nama Siswa</td>`;
                if(withClass){
                    html+=`<th rowspan="4" class="text-center align-middle text-bg-secondary">Kelas</td>`;

                }
                
                html+=`<th colspan="12" class="text-center align-middle text-bg-secondary">Data Tiap Kelas</td>`;
                html+=`<th rowspan="4" class="text-center align-middle text-bg-secondary">Nilai Ijazah</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<th colspan="6" class="text-center align-middle text-bg-secondary">Kelas 5</th>`;
                html+=`<th colspan="6" class="text-center align-middle text-bg-secondary">Kelas 6</th>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<th colspan="3" class="text-center align-middle text-bg-secondary">Semester 1</th>`;
                html+=`<th colspan="3" class="text-center align-middle text-bg-secondary">Semester 2</th>`;
                html+=`<th colspan="3" class="text-center align-middle text-bg-secondary">Semester 1</th>`;
                html+=`<th colspan="3" class="text-center align-middle text-bg-secondary">Semester 2</th>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<th class="text-center align-middle text-bg-secondary">KD 3</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary">KD 4</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary">Rerata</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary">KD 3</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary">KD 4</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary">Rerata</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary">KD 3</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary">KD 4</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary">Rerata</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary">KD 3</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary">KD 4</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary">Rerata</th>`;
            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;

            db.forEach((siswa,i_siswa)=>{
                html+=`<tr>`;
                    html+=`<td class="text-center">${i_siswa+1}</td>`;
                    html+=`<td class="text-center">${siswa.id}</td>`;
                    html+=`<td class="text-nowrap">${siswa.pd_nama}</td>`;
                    if(withClass){
                        
                        html+=`<td class="text-nowrap">${siswa.nama_rombel}</td>`;
                    }
                    let mapelfokus = siswa.olah_ijazah.filter(s=>s.kodemapel_umum ==fokusmapel);
                    if(mapelfokus.length>0){
                        let data = mapelfokus[0];
                        html+=`<td class="text-center">${data.k5s1_k3_nilai}</td>`;
                        html+=`<td class="text-center">${data.k5s1_k4_nilai}</td>`;
                        html+=`<td class="text-center">${data.k5s1_rerata}</td>`;
                        html+=`<td class="text-center">${data.k5s2_k3_nilai}</td>`;
                        html+=`<td class="text-center">${data.k5s2_k4_nilai}</td>`;
                        html+=`<td class="text-center">${data.k5s2_rerata}</td>`;
                        html+=`<td class="text-center">${data.k6s1_k3_nilai}</td>`;
                        html+=`<td class="text-center">${data.k6s1_k4_nilai}</td>`;
                        html+=`<td class="text-center">${data.k6s1_rerata}</td>`;
                        html+=`<td class="text-center">${data.k6s2_k3_nilai}</td>`;
                        html+=`<td class="text-center">${data.k6s2_k4_nilai}</td>`;
                        html+=`<td class="text-center">${data.k6s2_rerata}</td>`;
                        html+=`<td class="text-center">${data.nilai_ijazah}</td>`;
                    }
                html+=`</tr>`;
        })

        html+=`</tbody>`;
    html+=`</table>`;
    return html;
}
const tabelIjazahOlah = (data,db,all)=>{
    
    let html = "";
    html+=`<h3 class="text-center mb-0">Pengolahan Nilai Ijazah</h3>`;
    html+=`<h4 class="text-center mb-0">${data.fokusmapel_teks}</h4>`;
    html+=`<h4 class="text-center mb-3">Tahun Pelajaran ${data.tapel}</h4>`;
    html+=`<div class="table-responsive">`;
        html+=tabelDataRapoIjazah(data.fokusmapel, db,all);
    html+=`</div>`;
    return html;
}
const viewSkl =(data)=>{
    let html="";
    let nilai = data.olah_ijazah;
    nilai.forEach((mp,i)=>{
        html+=`<tr>`;
            html+=`<td class="text-center">${(i+1)}</td>`
            html+=`<td class="text-start">${mp.mapel}</td>`
            html+=`<td class="text-center">${mp.n_rerata}</td>`
        html+=`</tr>`;
    });
    
        html+=`<tr>`;
            html+=`<td class="text-center" colspan="2">Rata-rata</td>`;
            html+=`<td class="text-center">${data.nilai_akhir_ijazah.nilai}</td>`
        html+=`</tr>`;
    return html;
}
const viewSkl2324 = (data)=>{
    let html="";
    html+=`<tr><td colspan="3">Kelompok A</td></tr>`;
    data.filter(s=>['AGAMA','PKN','BINDO','MTK','IPA','IPS'].includes(s.kodemapel_umum)).forEach((n,i)=>{
        html+=`<tr>`;
            html+=`<td class="text-center">${i+1}</td>`;
            html+=`<td>${n.kodemapel_umum_teks}</td>`;
            html+=`<td class="text-center">${(n.nilai_ijazah).toFixed(2)}</td>`
        html+=`</tr>`;
    });
    html+=`<tr><td colspan="3">Kelompok B</td></tr>`;
    data.filter(s=>['SBDP','PJOK'].includes(s.kodemapel_umum)).forEach((n,i)=>{
        html+=`<tr>`;
            html+=`<td class="text-center">${i+1}</td>`;
            html+=`<td>${n.kodemapel_umum_teks}</td>`;
            html+=`<td class="text-center">${(n.nilai_ijazah).toFixed(2)}</td>`
        html+=`</tr>`;
    });
    data.filter(s=>s.kodemapel_umum =='BSUND').forEach((n,i)=>{
        html+=`<tr>`;
            html+=`<td class="text-center" rowspan="3">3</td>`;
            html+=`<td colspan="2">Muatan Lokal</td>`
        html+=`</tr>`;
        html+=`<tr>`;
            html+=`<td>a. ${n.kodemapel_umum_teks}</td>`;
            html+=`<td class="text-center">${(n.nilai_ijazah).toFixed(2)}</td>`
        html+=`</tr>`;
        html+=`<tr>`;
            html+=`<td>b.</td>`;
            html+=`<td class="text-center"></td>`
        html+=`</tr>`;
    });
    let total = data.map(n=> n.nilai_ijazah).reduce((a,b)=>a+b);
    let rerata = (total/data.length).toFixed(2);
    html+=`<tr><td colspan="2" class="text-center">Rata-rata</td><td class="text-center">${rerata}</td></tr>`;
    return html;
}
const skl2324 = (data,htmlkop,withnilai=false)=>{
    let html="";
    html+=`<div id="areaprint" class="tnr p-2">`;
        html+=htmlkop
        html+=`<h3 class="mb-0 mt-4 text-center fw-bold text-uppercase text-decoration-underline">SURAT KETERANGAN KELULUSAN</h3>`;
        html+=`<h5 class="mb-4 text-center">No.: 421.2/030.<span data-skl="index"></span>/SDNRAJA1/VI/2024</h5>`;
        html+=`<p>Kepala SD Negeri Ratujaya 1 selaku penyelenggara Penilaian Sumatif Akhir Jenjang Tahun Pelajaran 2023/2024 berdasarkan:</p>`;
        html+=`<ol>`
            html+=`<li>Ketuntasan dari seluruh program pembelajaran pada Kurikulum 2013</li>`;
            html+=`<li>Kriteria kelulusan dari satuan pendidikan sesuai dengan peraturan perundang-undangan</li>`
            html+=`<li>Rapat Pleno Dewan Guru tentang Kelulusan pada tanggal 4 Juni 2024</li>`
        html+=`</ol>`
        html+=`<p>menerangkan bahwa:</p>`;
        html+=`<div class="table-responsive">`;
            html+=`<table class="table table-sm table-borderless lh-1">`;
                html+=`<tr>`;
                    html+=`<td>Nama</td><td style="width:10px">:</td>`;
                    html+=`<td data-skl="pd_nama"></td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td class="text-nowrap">Tempat dan Tanggal Lahir</td><td style="width:10px">:</td>`;
                    html+=`<td><span data-skl="pd_tl"></span>, <span data-skl="pd_tanggallahir"></span></td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td class="text-nowrap">Nama Orang Tua/wali</td><td style="width:10px">:</td>`;
                    html+=`<td><span data-skl="pd_namaayah"></span>/<span data-skl="pd_namaibu"></span></td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>Nomor Induk Siswa</td><td style="width:10px">:</td>`;
                    html+=`<td data-skl="nis"></td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>Nomor Induk Siswa Nasional</td><td style="width:10px">:</td>`;
                    html+=`<td data-skl="nisn"></td>`;
                html+=`</tr>`;
            html+=`</table>`;
        html+=`</div>`;
        html+=`<p>dinyatakan</p>`;
        // html+=`<div class="row justify-content-center">`;
        //     html+=`<div class="col-4 fs-1 text-center align-middle border fw-bolder shadow-lg rounded p-3">L U L U S</div>`
        // html+=`</div>`
        html+=`<div style="padding:2px 15px;text-align:center;font-weight:900;font-size:28px">---LULUS /<s>TIDAK LULUS</s>---</div>`
        if(withnilai){
            html+= `<p>Dengan nilai sebagai berikut:</p>`;
            html+=`<table class="table table-sm table-bordered border-dark llh-1">`;
                html+=`<thead>`;
                    html+=`<tr>`;
                        html+=`<th class="text-center align-middle" style="width:30px">No</th>`;
                        html+=`<th class="text-center align-middle">Mata Pelajaran</th>`;
                        html+=`<th class="text-center align-middle" style="width:120px">Nilai</th>`;
                    html+=`</tr>`;
                html+=`</thead>`;
                html+=`<tbody data-skl="tabelbody_skl">`;
                html+=`</tbody>`;
            html+=`</table>`;

        }
        html+=`<div class="row mt-5 justify-content-end">`;
            html+=`<div class="col-6">`;
                html+=`<table class="table table-sm table-borderless lh-1">`;
                    html+=`<tr>`;
                        html+=`<td>Ditetapkan di</td>`;
                        html+=`<td>: Depok</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td>Pada Tanggal</td>`;
                        html+=`<td>: 10 Juni 2024</td>`;
                    html+=`</tr>`;
                    html+=`<tr><td colspan="2">Kepala UPTD SDN Ratujaya 1</td></tr>`
                    html+=`<tr><td></td><td><br/><br/><br/><br/><br/></td></tr>`
                    html+=`<tr><td colspan="2" class="text-center fw-bold"><u>Yoce Magdalena, S.Pd.SD</u></td></tr>`
                    html+=`<tr><td colspan="2" class="text-center">NIP. 19730720 200003 2 005</td></tr>`
                html+=`</table>`;
            html+=`</div>`;
        html+=`</div>`
        
    html+=`</div>`;
    html+=controlHTMLPrint(data);
    return html;
}
const sklTranskip = (data,identitas,withnilai=false)=>{
    let html="";
    html+=`<div id="areaprint" class="tnr p-2">`;
        html+=`<h3 class="mb-0 mt-4 text-center fw-bold text-uppercase text-decoration-underline">TRANSKIP NILAI</h3>`;
        html+=`<p class="mb-4 text-center">Nomor :<span data-skl="no_surat"></span></p>`;
        
        
        html+=`<div class="table-responsive">`;
            html+=`<table class="table table-sm table-borderless lh-1">`;
                html+=`<tr>`;
                    html+=`<td style="width:250px">Satuan Pendidikan</td><td style="width:10px">:</td>`;
                    html+=`<td>SD Negeri Ratujaya 1 - Kec. Cipayung - Kota Depok</td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>Nomor Pokok Sekolah Nasional</td><td style="width:10px">:</td>`;
                    html+=`<td>20228914</td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>Nama Lengkap</td><td style="width:10px">:</td>`;
                    html+=`<td data-skl="pd_nama"></td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td class="text-nowrap">Tempat,Tanggal Lahir</td><td style="width:10px">:</td>`;
                    html+=`<td><span data-skl="tempat_tanggal_lahir"></span></span></td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>Nomor Induk Siswa Nasional</td><td style="width:10px">:</td>`;
                    html+=`<td data-skl="nisn"></td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>Nomor Ijazah</td><td style="width:10px">:</td>`;
                    html+=`<td data-skl="no_ijazah"></td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>Tanggal Kelulusan</td><td style="width:10px">:</td>`;
                    html+=`<td data-skl="tanggal_kelulusan"></td>`;
                html+=`</tr>`;
            html+=`</table>`;
        html+=`</div>`;
        
        if(withnilai){
            html+=`<table class="table table-sm table-bordered border-dark llh-1">`;
                html+=`<thead>`;
                    html+=`<tr>`;
                        html+=`<th class="text-center align-middle" style="width:30px">No</th>`;
                        html+=`<th class="text-center align-middle">Mata Pelajaran</th>`;
                        html+=`<th class="text-center align-middle" style="width:120px">Nilai</th>`;
                    html+=`</tr>`;
                html+=`</thead>`;
                html+=`<tbody data-skl="tabelbody_skl">`;
                html+=`</tbody>`;
            html+=`</table>`;

        }
        html+=`<div class="row mt-5 justify-content-end">`;
            html+=`<div class="col-6">`;
                html+=`<table class="table table-sm table-borderless lh-1">`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="text-center">Kota Depok, <span data-skl="tanggal_kelulusan"></span></td>`;
                    html+=`</tr>`;
                    html+=`<tr><td colspan="2" class="text-center">Kepala UPTD SDN Ratujaya 1</td></tr>`
                    html+=`<tr><td></td><td><br/><br/><br/><br/><br/></td></tr>`
                    html+=`<tr><td colspan="2" class="text-center fw-bold"><u>Yoce Magdalena, S.Pd.SD</u></td></tr>`
                    html+=`<tr><td colspan="2" class="text-center">NIP. 19730720 200003 2 005</td></tr>`
                html+=`</table>`;
            html+=`</div>`;
        html+=`</div>`
        
    html+=`</div>`;
    html+=controlHTMLPrint(data);
    return html;
}
const skl = (data,identitas,withnilai=false)=>{
    let html="";
    html+=`<div id="areaprint" class="tnr p-2">`;
        html+=`<h3 class="mb-0 mt-4 text-center fw-bold text-uppercase text-decoration-underline">SURAT KETERANGAN KELULUSAN</h3>`;
        html+=`<h5 class="mb-4 text-center">No.: 421.2/${identitas.nosurat}.<span data-skl="index"></span>/SDNRAJA1/VI/${identitas.tahunsurat}</h5>`;
        html+=`<p>Kepala SD Negeri Ratujaya 1 selaku penyelenggara Penilaian Sumatif Akhir Jenjang Tahun Pelajaran 2023/2024 berdasarkan:</p>`;
        html+=`<ol>`
            html+=`<li>Ketuntasan dari seluruh program pembelajaran pada Kurikulum Nasional yang ditetapkan dan dijalankan di sekolah</li>`;
            html+=`<li>Kriteria kelulusan dari satuan pendidikan sesuai dengan peraturan perundang-undangan</li>`
            html+=`<li>${identitas.dasarhukum}</li>`
        html+=`</ol>`
        html+=`<p>menerangkan bahwa:</p>`;
        html+=`<div class="table-responsive">`;
            html+=`<table class="table table-sm table-borderless lh-1">`;
                html+=`<tr>`;
                    html+=`<td style="width:250px">Nama</td><td style="width:10px">:</td>`;
                    html+=`<td data-skl="pd_nama"></td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td class="text-nowrap">Tempat dan Tanggal Lahir</td><td style="width:10px">:</td>`;
                    html+=`<td><span data-skl="tempat_tanggal_lahir"></span></span></td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td class="text-nowrap">Nama Orang Tua/wali</td><td style="width:10px">:</td>`;
                    html+=`<td><span data-skl="pd_namaayah"></span> / <span data-skl="pd_namaibu"></span></td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>Nomor Induk Siswa</td><td style="width:10px">:</td>`;
                    html+=`<td data-skl="nis"></td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>Nomor Induk Siswa Nasional</td><td style="width:10px">:</td>`;
                    html+=`<td data-skl="nisn"></td>`;
                html+=`</tr>`;
            html+=`</table>`;
        html+=`</div>`;
        html+=`<p>dinyatakan</p>`;
        // html+=`<div class="row justify-content-center">`;
            html+=`<div class="col-4 fs-1 text-center align-middle border fw-bolder shadow-lg rounded p-3">L U L U S</div>`
        // html+=`</div>`
        html+=`<div style="padding:2px 15px;text-align:center;font-weight:900;font-size:28px">---LULUS /<s>TIDAK LULUS</s>---</div>`
        if(withnilai){
            html+= `<p>Dengan nilai sebagai berikut:</p>`;
            html+=`<table class="table table-sm table-bordered border-dark llh-1">`;
                html+=`<thead>`;
                    html+=`<tr>`;
                        html+=`<th class="text-center align-middle" style="width:30px">No</th>`;
                        html+=`<th class="text-center align-middle">Mata Pelajaran</th>`;
                        html+=`<th class="text-center align-middle" style="width:120px">Nilai</th>`;
                    html+=`</tr>`;
                html+=`</thead>`;
                html+=`<tbody data-skl="tabelbody_skl">`;
                html+=`</tbody>`;
            html+=`</table>`;

        }
        html+=`<div class="row mt-5 justify-content-end">`;
            html+=`<div class="col-6">`;
                html+=`<table class="table table-sm table-borderless lh-1">`;
                    html+=`<tr>`;
                        html+=`<td>Ditetapkan di</td>`;
                        html+=`<td>: Depok</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td>Pada Tanggal</td>`;
                        html+=`<td>: ${identitas.tanggal_kelulusan}</td>`;
                    html+=`</tr>`;
                    html+=`<tr><td colspan="2">Kepala UPTD SDN Ratujaya 1</td></tr>`
                    html+=`<tr><td></td><td><br/><br/><br/><br/><br/></td></tr>`
                    html+=`<tr><td colspan="2" class="text-start fw-bold"><u>Yoce Magdalena, S.Pd.SD</u></td></tr>`
                    html+=`<tr><td colspan="2" class="text-start">NIP. 19730720 200003 2 005</td></tr>`
                html+=`</table>`;
            html+=`</div>`;
        html+=`</div>`
        
    html+=`</div>`;
    html+=controlHTMLPrint(data);
    return html;
}
const sknr = (data,identitas,withnilai=false)=>{
    let html="";
    html+=`<div id="areaprint" class="tnr p-2">`;
        html+=`<h3 class="mb-0 mt-4 text-center fw-bold text-uppercase text-decoration-underline">SURAT KETERANGAN NILAI RAPORT</h3>`;
        html+=`<h5 class="mb-4 text-center">No.: 421.2/${identitas.nosurat}.<span data-skl="index"></span>/SDNRAJA1/VI/${identitas.tahunsurat}</h5>`;
        html+=`<p>Yang bertanda tangan di bawah ini, Kepala UPTD SDN Ratujaya 1 menerangkan bahwa:</p>`;
        
        html+=`<div class="table-responsive">`;
            html+=`<table class="table table-sm table-borderless lh-1">`;
                html+=`<tr>`;
                    html+=`<td style="width:250px">Nama</td><td style="width:10px">:</td>`;
                    html+=`<td data-skl="pd_nama"></td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td class="text-nowrap">Tempat dan Tanggal Lahir</td><td style="width:10px">:</td>`;
                    html+=`<td><span data-skl="tempat_tanggal_lahir"></span></span></td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>Nomor Induk Siswa</td><td style="width:10px">:</td>`;
                    html+=`<td data-skl="nis"></td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>Nomor Induk Siswa Nasional</td><td style="width:10px">:</td>`;
                    html+=`<td data-skl="nisn"></td>`;
                html+=`</tr>`;
            html+=`</table>`;
        html+=`</div>`;
        html+=`<p>Adalah <b>benar</b> nama tersebut adalah siswa SDN Ratujaya 1 dan telah menyelesaikan seluruh proses pendidikan yang diselenggarakan hingga pada Tahun Pelajaran ${identitas.tapel}.</p>`;
        html+=`<p>Serta memiliki daftar nilai raport berikut:</p>`
        if(withnilai){
            html+=`<table class="table table-sm table-bordered border-dark lh-1">`;
                html+=`<thead>`;
                    html+=`<tr>`;
                        html+=`<th rowspan="3" class="text-center align-middle" style="width:30px">No</th>`;
                        html+=`<th rowspan="3" class="text-center align-middle">Mata Pelajaran</th>`;
                        html+=`<th colspan="5" class="text-center align-middle">Nilai Raport</th>`;
                        html+=`<th rowspan="3" class="text-center align-middle" style="width:120px">Rerata</th>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<th class="text-center" colspan="2">Kelas 4</th>`
                        html+=`<th class="text-center" colspan="2">Kelas 5</th>`
                        html+=`<th class="text-center">Kelas 6</th>`
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<th class="text-center">1</th>`;
                        html+=`<th class="text-center">2</th>`;
                        html+=`<th class="text-center">1</th>`;
                        html+=`<th class="text-center">2</th>`;
                        html+=`<th class="text-center">1</th>`;
                    html+=`</tr>`;
                html+=`</thead>`;
                html+=`<tbody data-skl="tabelbody_skl">`;
                html+=`</tbody>`;
            html+=`</table>`;

        }
        html+=`<p>Demikian Surat Keterangan Nilai Raport ini dibuat agar dapat dipergunakan sebagaimana mestinya.</p>`
        html+=`<div class="row mt-5 justify-content-end">`;
            html+=`<div class="col-6">`;
                html+=`<table class="table table-sm table-borderless lh-1">`;
                    html+=`<tr><td colspan="2">Kota Depok, ${identitas.tanggal_kelulusan}</td>`;
                    html+=`<tr><td colspan="2">Kepala UPTD SDN Ratujaya 1</td></tr>`
                    html+=`<tr><td></td><td><br/><br/><br/><br/><br/></td></tr>`
                    html+=`<tr><td colspan="2" class="text-start fw-bold"><u>Yoce Magdalena, S.Pd.SD</u></td></tr>`
                    html+=`<tr><td colspan="2" class="text-start">NIP. 19730720 200003 2 005</td></tr>`
                html+=`</table>`;
            html+=`</div>`;
        html+=`</div>`
        
    html+=`</div>`;
    html+=controlHTMLPrint(data);
    return html;
}
const sknr_fill = (data)=>{
    let html="";
    let rapor = data.nilai_5_semester;
    let akhir = data.rerata_akhir_5_semester;
    rapor.forEach((mp,i)=>{
        html+=`<tr>`;
            html+=`<td class="text-center">${(i+1)}</td>`;
            html+=`<td class="text-nowrap">${mp.mapel}</td>`
            html+=`<td class="text-nowrap text-center">${Math.round(mp.n_k4_s1).toFixed(0)}</td>`
            html+=`<td class="text-nowrap text-center">${Math.round(mp.n_k4_s2).toFixed(0)}</td>`
            html+=`<td class="text-nowrap text-center">${Math.round(mp.n_k5_s1).toFixed(0)}</td>`
            html+=`<td class="text-nowrap text-center">${Math.round(mp.n_k5_s2).toFixed(0)}</td>`
            html+=`<td class="text-nowrap text-center">${Math.round(mp.n_k6_s1).toFixed(0)}</td>`
            html+=`<td class="text-nowrap text-center">${mp.n_rerata}</td>`
        html+=`</tr>`;
    });
    html+=`<tr>`;
        html+=`<td colspan="7" class="text-center">Rata-rata</td>`;
        html+=`<td class="text-center">${akhir.nilai}</td>`;
    html+=`</tr>`;
    return html;   
}
const TranskipIjzah = (data,identitas,withnilai=false)=>{
    let html="";
    html+=`<div id="areaprint" class="tnr p-2">`;
        html+=`<h3 class="mb-0 mt-4 text-center fw-bold text-uppercase text-decoration-underline">SURAT KETERANGAN KELULUSAN</h3>`;
        html+=`<h5 class="mb-4 text-center">No.: 421.2/${identitas.nosurat}.<span data-skl="index"></span>/SdnRaja1/VI/${identitas.tahunsurat}</h5>`;
        html+=`<p>Kepala SD Negeri Ratujaya 1 selaku penyelenggara Penilaian Sumatif Akhir Jenjang Tahun Pelajaran 2023/2024 berdasarkan:</p>`;
        html+=`<ol>`
            html+=`<li>Ketuntasan dari seluruh program pembelajaran pada Kurikulum Nasional yang ditetapkan dan dijalankan di sekolah</li>`;
            html+=`<li>Kriteria kelulusan dari satuan pendidikan sesuai dengan peraturan perundang-undangan</li>`
            html+=`<li>${identitas.dasarhukum}</li>`
        html+=`</ol>`
        html+=`<p>menerangkan bahwa:</p>`;
        html+=`<div class="table-responsive">`;
            html+=`<table class="table table-sm table-borderless lh-1">`;
                html+=`<tr>`;
                    html+=`<td style="width:230px">Nama</td><td style="width:10px">:</td>`;
                    html+=`<td data-skl="pd_nama"></td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td class="text-nowrap">Tempat dan Tanggal Lahir</td><td style="width:10px">:</td>`;
                    html+=`<td><span data-skl="tempat_tanggal_lahir"></span></span></td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td class="text-nowrap">Nama Orang Tua/wali</td><td style="width:10px">:</td>`;
                    html+=`<td><span data-skl="pd_namaayah"></span> / <span data-skl="pd_namaibu"></span></td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>Nomor Induk Siswa</td><td style="width:10px">:</td>`;
                    html+=`<td data-skl="nis"></td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>Nomor Induk Siswa Nasional</td><td style="width:10px">:</td>`;
                    html+=`<td data-skl="nisn"></td>`;
                html+=`</tr>`;
            html+=`</table>`;
        html+=`</div>`;
        html+=`<p>dinyatakan</p>`;
        // html+=`<div class="row justify-content-center">`;
        //     html+=`<div class="col-4 fs-1 text-center align-middle border fw-bolder shadow-lg rounded p-3">L U L U S</div>`
        // html+=`</div>`
        html+=`<div style="padding:2px 15px;text-align:center;font-weight:900;font-size:28px">---LULUS /<s>TIDAK LULUS</s>---</div>`
        if(withnilai){
            html+= `<p>Dengan nilai sebagai berikut:</p>`;
            html+=`<table class="table table-sm table-bordered border-dark llh-1">`;
                html+=`<thead>`;
                    html+=`<tr>`;
                        html+=`<th class="text-center align-middle" style="width:30px">No</th>`;
                        html+=`<th class="text-center align-middle">Mata Pelajaran</th>`;
                        html+=`<th class="text-center align-middle" style="width:120px">Nilai</th>`;
                    html+=`</tr>`;
                html+=`</thead>`;
                html+=`<tbody data-skl="tabelbody_skl">`;
                html+=`</tbody>`;
            html+=`</table>`;

        }
        html+=`<div class="row mt-5 justify-content-end">`;
            html+=`<div class="col-6">`;
                html+=`<table class="table table-sm table-borderless lh-1">`;
                    html+=`<tr>`;
                        html+=`<td>Ditetapkan di</td>`;
                        html+=`<td>: Depok</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td>Pada Tanggal</td>`;
                        html+=`<td>: ${identitas.tanggal_kelulusan}</td>`;
                    html+=`</tr>`;
                    html+=`<tr><td colspan="2">Kepala UPTD SDN Ratujaya 1</td></tr>`
                    html+=`<tr><td></td><td><br/><br/><br/><br/><br/></td></tr>`
                    html+=`<tr><td colspan="2" class="text-start fw-bold"><u>Yoce Magdalena, S.Pd.SD</u></td></tr>`
                    html+=`<tr><td colspan="2" class="text-start">NIP. 19730720 200003 2 005</td></tr>`
                html+=`</table>`;
            html+=`</div>`;
        html+=`</div>`
        
    html+=`</div>`;
    html+=controlHTMLPrint(data);
    return html;
}
const rekapIjazah =(data,idtabel="")=>{
    let html = "";
    html+=`<h3 class="text-center mb-3">Rekapitulasi Nilai Ijazah</h3>`;
    html+=`<div class="table-responsive">`;
        html+=`<table class="table table-sm table-bordered border-dark lh-1 font10 toExcel" id="rekapijazah${idtabel}">`;
            html+=`<thead>`;
                html+=`<tr>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle" style="width:29px">No</th>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle">Nama Siswa</th>`;
                    html+=`<th colspan="9" class="text-center text-bg-secondary align-middle">Nilai Mata Pelajaran</th>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle">Nilai Ijazah</th>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle">Rangking</th>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<th class="text-center text-bg-secondary align-middle">Agama</th>`
                    html+=`<th class="text-center text-bg-secondary align-middle">Pkn</th>`
                    html+=`<th class="text-center text-bg-secondary align-middle">Bahasa Indonesia</th>`
                    html+=`<th class="text-center text-bg-secondary align-middle">Matematika</th>`
                    html+=`<th class="text-center text-bg-secondary align-middle">IPA</th>`
                    html+=`<th class="text-center text-bg-secondary align-middle">IPS</th>`
                    html+=`<th class="text-center text-bg-secondary align-middle">SBdP</th>`
                    html+=`<th class="text-center text-bg-secondary align-middle">PJOK</th>`
                    html+=`<th class="text-center text-bg-secondary align-middle">BSUND</th>`
                html+=`</tr>`;
            html+=`</thead>`;
            html+=`<tbody>`;
            data.forEach((siswa,i)=>{
                html+=`<tr>`;
                    html+=`<td class="text-center">${i+1}</td>`;
                    html+=`<td class="text-nowrap">${siswa.pd_nama}</td>`;
                    let nilai = siswa.olah_ijazah;
                    nilai.forEach(mp=>{
                        html+=`<td class="text-center" title="${mp.kodemapel_umum}">${mp.nilai_ijazah}</td>`;
                    });
                    let total = nilai.map(n=> n.nilai_ijazah).reduce((a,b)=>a+b);
                    let rerata = (total/nilai.length).toFixed(2);
                    html+=`<td class="text-center">${rerata}</td>`;
                    html+=`<td class="text-center"></td>`;
                        
                html+=`</tr>`;
            })
            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;
    return html;
}
function titleCase(str){
    return str.replace(
        /\w\S*/g,
        function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      );
}
const noSeriIjazah = (index)=>{
    let noawal = 706259;
    return `DN-02/D-SD/K13/24/0${(noawal+index)}`
}
const rekapIjazahPraCtak =(data,dataserver)=>{
    
    let html = "";
    html+=`<h3 class="text-center mb-3">Data Cetak Ijazah </h3>`;
    html+=`<div class="table-responsive">`;
        html+=`<table class="table table-sm table-bordered border-dark lh-1 font8 toExcel" id="rekapijazah">`;
            html+=`<thead>`;
                html+=`<tr>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle" style="width:29px">No</th>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle">-</th>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle">ID</th>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle">Rombel</th>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle">Nama Siswa</th>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle">TTL</th>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle">Nama Orang Tua</th>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle">NIS</th>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle">NISN</th>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle">No Seri Ijazah</th>`;
                    html+=`<th colspan="9" class="text-center text-bg-secondary align-middle">Nilai Mata Pelajaran</th>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle">Nilai Ijazah</th>`;
                    
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<th class="text-center text-bg-secondary align-middle">Agama</th>`
                    html+=`<th class="text-center text-bg-secondary align-middle">PKn</th>`
                    html+=`<th class="text-center text-bg-secondary align-middle">BIND</th>`
                    html+=`<th class="text-center text-bg-secondary align-middle">MTK</th>`
                    html+=`<th class="text-center text-bg-secondary align-middle">IPA</th>`
                    html+=`<th class="text-center text-bg-secondary align-middle">IPS</th>`
                    html+=`<th class="text-center text-bg-secondary align-middle">SBdP</th>`
                    html+=`<th class="text-center text-bg-secondary align-middle">PJOK</th>`
                    html+=`<th class="text-center text-bg-secondary align-middle">BSUND</th>`
                html+=`</tr>`;
            html+=`</thead>`;
            html+=`<tbody>`;
            data.forEach((siswa,i)=>{
                html+=`<tr>`;
                    html+=`<td class="text-center">${i+1}</td>`;
                    html+=`<td class="text-center">${buttonEdu.primary(`data-editijazah="${siswa.id}"`,'<i class="bi bi-pencil"></i>')}</td>`;
                    html+=`<td class="text-nowrap">${siswa.id}</td>`;
                    html+=`<td class="text-nowrap">${siswa.nama_rombel}</td>`;
                    html+=`<td class="text-nowrap">${siswa.pd_nama}</td>`;
                    html+=`<td class="text-nowrap">${titleCase(siswa.pd_tl)}, ${new Date(siswa.pd_tanggallahir).toLocaleDateString('id-ID',{dateStyle:'long'})}</td>`;
                    
                    if(dataserver.length>0){
                        let curDataServer = dataserver.filter(s=> s.id == siswa.id)[0];
                        if(siswa.dok_akte==""){

                            html+=`<td class="text-bg-warning text-nowrap">${curDataServer.ortu_di_ijazah}</td>`;
                        }else{
                            html+=`<td class="text-bg-info text-nowrap">${curDataServer.ortu_di_ijazah}</td>`;

                        }
                    }else{
                        
                        html+=`<td class="text-nowrap">${siswa.pd_namaayah}</td>`;
                    }

                    html+=`<td class="text-center">${siswa.nis}</td>`;
                    html+=`<td class="text-center">${siswa.nisn}</td>`;
                    html+=`<td class="text-nowrap">${noSeriIjazah(i)}</td>`;
                    let nilai = siswa.olah_ijazah;
                    nilai.forEach(mp=>{
                        html+=`<td class="text-center" title="${mp.kodemapel_umum}">${mp.nilai_ijazah}</td>`;
                    });
                    let total = nilai.map(n=> n.nilai_ijazah).reduce((a,b)=>a+b);
                    let rerata = (total/nilai.length).toFixed(2);
                    html+=`<td class="text-center">${rerata}</td>`; 
                    
                        
                html+=`</tr>`;
            })
            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;
    return html;
}
const halamanDepanIjazah = (db, dbIjazah,bol=false)=>{
    let html ="";
    if(bol){

        html+=`<div class="col-6 px-5 lh-sm" style="background-image:url(https://lh3.googleusercontent.com/d/1qcpzq9ABBR8WVMXOk38AEiKN8KRj6YH-);background-repeat: no-repeat;background-size: 100% 100%">`;
    }else{
        html+=`<div class="px-5 lh-sm border-5">`;

    }
                html+=`<p class="text-center fs-4 fw-bold mt-5 pt-5">KEMENTRIAN DAN KEBUDAYAAN REPUBLIK INDONESIA</p>`;
                html+=`<h3 class="text-center fw-bold">I J A Z A H</h3>`;
                html+=`<p class="text-center mt-2 mb-0">SEKOLAH DASAR</p>`;
                html+=`<p class="text-center">TAHUN PELAJARAN 2023/2024</p>`;
                html+=`<p class="mt-5">Yang bertanda tangan di bawah ini, Kepala <b class="text-decoration-underline"> UPTD Sekolah Dasar Negeri Ratujaya 1</b></p>`;
                html+=`<p>Nomor Pokok Sekolah Nasional <b class="text-decoration-underline d-inline-block"> 20228914</b></p>`;
                html+=`<p>Kabupaten/Kota <b class="text-decoration-underline"> Depok</b></p>`;
                html+=`<p class="mb-3">Provinsi <b class="text-decoration-underline"> Jawa Barat</b> menerangkan bahwa:</p>`;
                html+=`<table class="table table-borderless w3-small">`;
                    html+=`<tbody>`;
                        html+=`<tr>`;
                            html+=`<td>nama</td><td>:</td>`;
                            html+=`<td class="text-nowrap fw-bold" data-isian="namasiswa">${db.pd_nama}</td>`;
                        html+=`</tr>`;
                        html+=`<tr>`;
                            html+=`<td class="text-nowrap">tempat dan tanggal lahir</td><td>:</td>`;
                            html+=`<td class="text-nowrap fw-bold" data-isian="ttl">${titleCase(db.pd_tl)}, ${new Date(db.pd_tanggallahir).toLocaleString('id-ID',{dateStyle:'long'})}</td>`;
                        html+=`</tr>`;
                        html+=`<tr>`;
                            html+=`<td class="text-nowrap">nama Orang tua/Walli</td><td>:</td>`;
                            html+=`<td class="text-nowrap text-capitalize fw-bold" data-isian="ortusiswa">${titleCase(dbIjazah.ortu_di_ijazah)}</td>`;
                        html+=`</tr>`;
                        html+=`<tr>`;
                            html+=`<td class="text-nowrap">Nomor Induk Siswa</td><td>:</td>`;
                            html+=`<td class="text-nowrap fw-bold" data-isian="nis">${db.nis}</td>`;
                        html+=`</tr>`;
                        html+=`<tr>`;
                            html+=`<td class="text-nowrap">Nomor Induk Siswa Nasional</td><td>:</td>`;
                            html+=`<td class="text-nowrap fw-bold" data-isian="nisn">${db.nisn}</td>`;
                        html+=`</tr>`;
                    html+=`</tbody>`;
                html+=`</table>`;
                html+=`<h2 class="text-center fs-1 mt-3">L U L U S</h2>`;
                html+=`<p>Berdasarkan keputusan kepala <b>UPTD Sekolah Dasar Negeri Ratujaya 1 </p><p>nomor. 421.2/029/SDNRAJA1/VI/2024</b></p>`;
                html+=`<div class="row">`;
                    html+=`<div class="col-6">`;
                        html+=`<div class="d-flex justify-content-center py-3 ps-5">`
                            html+=`<div class="border border-1 text-bg-secondary rounded shadow-lg text-center d-flex flex-column justify-content-center" style="width:90px;height:120px">Poto</div>`;
                        html+=`</div>`;
                    html+=`</div>`;
                    html+=`<div class="col-6 text-center">`;
                        html+=`<b class="text-decoration-underline">Kota Depok, 26 Juni </b>2024<br>`;
                        html+=`<p>Kepala Sekolah</p><br>`;
                        html+=`<p class="mt-5 text-decoration-underline mb-0">Yoce Magdalena, S.Pd.SD</p>`;
                        html+=`<p>NIP. 19730720 200003 2 005</p>`
                    html+=`</div>`;
                html+=`</div>`;
                html+=`<div class="text-center mt-4 mb-4"></div>`;
            html+=`</div>`;
    return html;
}
const suratPernyataanKebenaranIjazah = (db, dbIjazah)=>{
    let html="";
    html+=`<div class="p-2" style="min-height:98vh!important;break-inside: avoid;">`;
        html+=`<h3 class="text-center fw-bold mb-5">SURAT PERNYATAAN</h3>`;
        html+=`<p> Yang bertanda tangan di bawah ini:</p>`;
        html+=`<table class="table table-sm lh1 table-borderless">`;
            html+=`<tr>`;
                html+=`<td>Nama Orang Tua/Wali</td>`;
                html+=`<td style="width:30px">:</td>`;
                html+=`<td class="text-nowrap border-bottom"></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td>Status (lingkari jawaban)</td>`;
                html+=`<td style="width:30px">:</td>`;
                html+=`<td class="text-nowrap border-bottom">Orang Tua Kandung/Orang Tua Angkat/Wali</td>`;
            html+=`</tr>`;
        html+=`</table>`;
        html+=`<p>menyatakan bahwa data berikut yang akan dituliskan di lembar ijazah: </p>`;
        
        html+=`<table class="table table-sm lh1 table-borderless">`;
            html+=`<tr>`;
                html+=`<td>Nama Siswa</td>`;
                html+=`<td style="width:30px">:</td>`;
                html+=`<td class="text-nowrap border-bottom">${db.pd_nama}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td>Tempat, Tanggal Lahir</td>`;
                html+=`<td style="width:30px">:</td>`;
                html+=`<td class="text-nowrap border-bottom">${titleCase(db.pd_tl)}, ${new Date(db.pd_tanggallahir).toLocaleString('id-ID',{dateStyle:'long'})}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td>Nama Orang tua</td>`;
                html+=`<td style="width:30px">:</td>`;
                html+=`<td class="text-nowrap border-bottom">${dbIjazah.ortu_di_ijazah}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td>Nomor Induk Sekolah</td>`;
                html+=`<td style="width:30px">:</td>`;
                html+=`<td class="text-nowrap border-bottom">${db.nis}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td>Nomor Induk Sekolah Siswa Nasional</td>`;
                html+=`<td style="width:30px">:</td>`;
                html+=`<td class="text-nowrap border-bottom">${db.nisn}</td>`;
            html+=`</tr>`;
        html+=`</table>`;
        html+=`<p>adalah <b>BENAR dan SESUAI</b> dengan dokumen Akta Kelahiran. </p><p>Adapun Saya lampirkan dokumen Akta Kelahiran atau bukti dokumen untuk memperkuat kebenaran tersebut. Serta Surat Pernyatan ini dapat dijadikan dasar hukum validasi kebenaran data penulisan ijazah oleh pihak UPTD SDN Ratujaya 1.</p>`
        html+=`<br><br><br>`;
        html+=`<div class="row justify-content-end">`;
            html+=`<div class="col-6 text-center">`;
                html+=`Yang membuat Pernyataan,`
                html+=`<br><br><br><br><br>`;
                html+=`<p class="border-bottom"></p>`
            html+=`</div>`;
        html+=`</div>`
    html+=`</div>`;
    html+=`<div class="border p-0" style="min-height:98vh!important;break-inside: avoid;">`;
        html+=halamanDepanIjazah(db,dbIjazah);
    html+=`</div>`
    return html;
};
const guidesIjazah = (db, dbIjazah,index)=>{
    let html = "";
    html+=`<div class="row">`;
    html+=halamanDepanIjazah(db,dbIjazah,true);
        html+=`<div class="col-6 border">`;
        
        html+=`<h4 class="text-center mb-0 fw-bold">DAFTAR NILAI</h4>`;
        html+=`<h5 class="text-center mb-0">SEKOLAH DASAR</h5>`;
        html+=`<h6 class="text-center mb-5">TAHUN PELAJARAN 2023/2024</h6>`;
        html+=`<table class="table table-sm table-borderless font12">`;
            html+=`<tr>`;
                html+=`<td style="width:170px">Nama</td>`;
                html+=`<td style="width:10px">:</td>`;
                html+=`<td>${db.pd_nama}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td>Tempat dan Tanggal Lahir</td>`;
                html+=`<td>:</tdx>`;
                html+=`<td>${titleCase(db.pd_tl)}, ${new Date(db.pd_tanggallahir).toLocaleString('id-ID',{dateStyle:'long'})}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td>Nomor Induk Siswa</td>`;
                html+=`<td>:</tdx>`;
                html+=`<td>${db.nis}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td>Nomor Induk Siswa Nasional</td>`;
                html+=`<td>:</tdx>`;
                html+=`<td>${db.nisn}</td>`;
            html+=`</tr>`;
        html+=`</table>`;
        html+=`<table class="table table-sm table-bordered border-dark lh-1">`;
                html+=`<thead>`;
                    html+=`<tr>`;
                        html+=`<th class="text-center align-middle" style="width:30px">No</th>`;
                        html+=`<th class="text-center align-middle">Mata Pelajaran</th>`;
                        html+=`<th class="text-center align-middle" style="width:120px">Nilai</th>`;
                    html+=`</tr>`;
                html+=`</thead>`;
                html+=`<tbody data-skl="tabelbody_skl">`;
                    html+=viewSkl(db.olah_ijazah)
                html+=`</tbody>`;
            html+=`</table>`;
            ///tandatangan
            html+=`<div class="row">`;
                    html+=`<div class="col-6">`;
                        html+=`<div class="d-flex justify-content-center py-3 ps-5">`
                            // html+=`<div class="border border-1 text-bg-secondary rounded shadow-lg text-center d-flex flex-column justify-content-center" style="width:90px;height:120px">Poto</div>`;
                        html+=`</div>`;
                    html+=`</div>`;
                    html+=`<div class="col-6 text-center">`;
                        html+=`<b class="text-decoration-underline">Kota Depok, 26 Juni </b>2024<br>`;
                        html+=`<p>Kepala Sekolah</p><br>`;
                        html+=`<p class="mt-5 text-decoration-underline mb-0">Yoce Magdalena, S.Pd.SD</p>`;
                        html+=`<p>NIP. 19730720 200003 2 005</p>`
                    html+=`</div>`;
                html+=`</div>`;
            ///tandatangan
            html+=`<p class="text-center">${noSeriIjazah(index)}</p>`
        html+=`</div>`;

    html+=`</div>`
    return html;
}
const dataRealSiswa = (data)=>{
    let html ="";
    html+=`<table class="table table-sm font10">`;
        html+=`<tr>`;
            html+=`<td>Nama Siswa</td>`;
            html+=`<td style="width:20px">:</td>`;
            html+=`<td class="text-nowrap">${data.pd_nama}</td>`;
        html+=`</tr>`;
        html+=`<tr>`;
            html+=`<td>Tempat, Tanggal Lahir</td>`;
            html+=`<td style="width:20px">:</td>`;
            html+=`<td class="text-nowrap">${data.pd_tl}, ${new Date(data.pd_tanggallahir).toLocaleString('id-ID',{dateStyle:'long'})}</td>`;
        html+=`</tr>`;
        html+=`<tr>`;
            html+=`<td>NIS</td>`;
            html+=`<td style="width:20px">:</td>`;
            html+=`<td class="text-nowrap">${data.nis}</td>`;
        html+=`</tr>`;
        html+=`<tr>`;
            html+=`<td>NISN</td>`;
            html+=`<td style="width:20px">:</td>`;
            html+=`<td class="text-nowrap">${data.nisn}</td>`;
        html+=`</tr>`;
        html+=`<tr><td colspan="3" class="text-center">Perubahan data ini hanya bisa dilakukan di Menu Data Siswa</td></tr>`
    html+=`</table>`
    return html;
}
const editDetailSiswaIjazahModal = (data,dataserver)=>{
    let html= "";
    let akte = data.dok_akte==""?"Akte Tidak Ada":`<div class="containerIframe"> <iframe id="iframePreviewUpload" src="https://drive.google.com/file/d/${data.dok_akte}/preview"></iframe> </div>`;
    html+= rowCols.rows('justify-content-center',
            rowCols.cols('col-md-6',
                cardMenu('Identitas Pribadi Siswa',
                    dataRealSiswa(data),false
                )
                
            )
            +
            rowCols.cols('col-md-6',akte)
            +rowCols.cols('col-md-6 text-center',
                cardMenu('Nama Orang Tua di Ijazah',
                            inputsElements.floatingText('update_ortu_di_ijazah','Nama ',dataserver.ortu_di_ijazah)
                            +buttonEdu.primary('id="simpan_ortu_di_ijazah"','Simpan Nama Ortu')
                            ,false
                        )

            )

    )
    return html;
}
const tabelCek = (arrayObjek)=>{
    let html = "";
    html+=`<div class="overflow-x-scroll">`;
        html+=`<table class="table table-sm">`;
            html+=`<thead>`;
                html+=`<tr>`;
                    Object.keys(arrayObjek[0]).forEach(n=>{
                        html+=`<th>${n}</th>`
                    })
                html+=`</tr>`
            html+=`</thead>`;
            html+=`<tbody>`;
                    arrayObjek.forEach(n=>{
                        html+=`<tr>`
                        
                        Object.keys(n).forEach(m=>{
                            html+=`<td class="text-nowrap">${n[m]}</td>`
                        })
                        html+=`</tr>`
                    })
            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;
    return html;
}
const viewPengolahanIjazahBaru = (db,data,showClassroom=false)=>{
    let html = "";
    html+=`<h3 class="text-center mb-0">Pengolahan Nilai Ijazah</h3>`;
    html+=`<h3 class="text-center mb-0">${data.judul??data.judul}</h3>`;
    html+=`<h4 class="text-center mb-3">Tahun Pelajaran ${data.tapel}</h4>`;
    html+=`<div class="table-responsive">`;
     html+=`<table class="table table-sm table-bordered border-dark lh-1 font10 toExcel" id="rekapijazah">`;;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th rowspan="4" class="text-center align-middle text-bg-secondary" style="width:20px">No</td>`;
                html+=`<th rowspan="4" class="text-center align-middle text-bg-secondary">Nama Siswa</td>`;
                if(showClassroom) html+=`<th rowspan="4" class="text-center align-middle text-bg-secondary">Kelas</td>`;
                html+=`<th colspan="45" class="text-center align-middle text-bg-secondary">Mata Pelajaran</td>`;
                html+=`<th rowspan="4" class="text-center align-middle text-bg-secondary">Nilai Ijazah</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<th colspan="5" class="text-center align-middle text-bg-secondary">Pendidikan Agama</th>`;
                data.mapelnon.forEach(n=>{
                    html+=`<th colspan="5" class="text-center align-middle text-bg-secondary">${n.label}</th>`;
                })
            html+=`</tr>`;
            html+=`<tr>`;
            [...Array(9)].forEach(item=>{
                [5,6].forEach(k=>{
                    html+=`<th colspan="2" class="text-center align-middle text-bg-secondary">Kelas ${k}</th>`;
                })
                html+=`<th rowspan="2" class="text-center align-middle text-bg-secondary">Rerata</th>`;

            })
            html+=`</tr>`;
            html+=`<tr>`;
            [...Array(9)].forEach(item=>{
                [1,2,1,2].forEach(k=>{
                    html+=`<th class="text-center align-middle text-bg-secondary">semester ${k}</th>`;
                    
                })

            });
            html+=`</tr>`;
            
        html+=`</thead>`;
        html+=`<tbody>`;
        db.forEach((dbs,i)=>{
            let olahijazah = dbs.olah_ijazah;
            html+=`<tr>`;
                html+=`<td class="border border-secondary-subtle text-center">${(i+1)}</td>`;
                html+=`<td class="border border-secondary-subtle bg-white text-nowrap">${(dbs.pd_nama)}</td>`;
                if(showClassroom) html+=`<td class="border border-secondary-subtle bg-white text-center">${(dbs.nama_rombel)}</td>`;
                //agama;
                olahijazah.filter(s=>s.kategori =='Agama').forEach(agama=>{
                    html+=`<td class="border border-secondary-subtle text-center">${Number(agama.n_k5_s1).toFixed(0)}</td>`;
                    html+=`<td class="border border-secondary-subtle text-center">${Number(agama.n_k5_s2).toFixed(0)}</td>`;
                    html+=`<td class="border border-secondary-subtle text-center">${Number(agama.n_k6_s1).toFixed(0)}</td>`;
                    html+=`<td class="border border-secondary-subtle text-center">${Number(agama.n_k6_s2).toFixed(0)}</td>`;
                    html+=`<td class="border border-secondary-subtle text-center bg-primary-subtle">${(agama.n_rerata)}</td>`;
                })
                //nonAgama;
                olahijazah.filter(s=>s.kategori !=='Agama').forEach(mp=>{
                    html+=`<td class="border border-secondary-subtle text-center">${mp.n_k5_s1==""?"":Number(mp.n_k5_s1).toFixed(0)}</td>`;
                    html+=`<td class="border border-secondary-subtle text-center">${mp.n_k5_s2==""?"":Number(mp.n_k5_s2).toFixed(0)}</td>`;
                    html+=`<td class="border border-secondary-subtle text-center">${mp.n_k6_s1==""?"":Number(mp.n_k6_s1).toFixed(0)}</td>`;
                    html+=`<td class="border border-secondary-subtle text-center">${mp.n_k6_s2==""?"":Number(mp.n_k6_s2).toFixed(0)}</td>`;
                    html+=`<td class="border border-secondary-subtle text-center bg-primary-subtle">${(mp.n_rerata)}</td>`;
                })
                html+=`<td class="border border-secondary-subtle text-center">${dbs.nilai_akhir_ijazah.nilai}</td>`
            html+=`</tr>`;
        })
        html+=`</tbody>`;
    html+='</table>';

    html+=`</div>`;
    return html;
}
const viewRapor5Semester = (db,data,showClassroom=false)=>{
    let mapel = db[0].nilai_5_semester;
    let html = "";
    html+=`<h3 class="text-center mb-0">Rekapitulasi Nilai Rapor 5 Semester</h3>`;
    html+=`<h3 class="text-center mb-0">${data.judul??data.judul}</h3>`;
    html+=`<h4 class="text-center mb-3">Tahun Pelajaran ${data.tapel}</h4>`;
    html+=`<div class="table-responsive">`;
     html+=`<table class="table table-sm table-bordered border-dark lh-1 font10 toExcel" id="rekapijazah">`;;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th rowspan="4" class="text-center align-middle text-bg-secondary" style="width:20px">No</td>`;
                html+=`<th rowspan="4" class="text-center align-middle text-bg-secondary">Nama Siswa</td>`;
                if(showClassroom) html+=`<th rowspan="4" class="text-center align-middle text-bg-secondary">Kelas</td>`;
                //mapelnya [agama, pkn, bindo, mtk, ipas]
                // @mapel butuh 6 kolom
                // jadi 6 x 5 = 30
                html+=`<th colspan="30" class="text-center align-middle text-bg-secondary">Mata Pelajaran</td>`;
                html+=`<th rowspan="4" class="text-center align-middle text-bg-secondary">Rerata Akhir</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                mapel.forEach(n=>{
                    html+=`<th colspan="6" class="text-center align-middle text-bg-secondary">${n.mapel}</th>`;
                })
            html+=`</tr>`;
            html+=`<tr>`;
            mapel.forEach(item=>{
                [4,5,6].forEach(k=>{
                    html+=`<th ${k==6?"":`colspan="2"`} class="text-center align-middle text-bg-secondary">Kelas ${k}</th>`;
                })
                html+=`<th rowspan="2" class="text-center align-middle text-bg-secondary">Rerata</th>`;

            })
            html+=`</tr>`;
            html+=`<tr>`;
            mapel.forEach(item=>{
                [1,2,1,2,1].forEach(k=>{
                    html+=`<th class="text-center align-middle text-bg-secondary">${k}</th>`;
                    
                })

            });
            html+=`</tr>`;
            
        html+=`</thead>`;
        html+=`<tbody>`;
        db.forEach((dbs,i)=>{
            let nilai = dbs.nilai_5_semester;
            html+=`<tr>`;
                html+=`<td class="border border-secondary-subtle text-center">${(i+1)}</td>`;
                html+=`<td class="border border-secondary-subtle bg-white text-nowrap">${(dbs.pd_nama)}</td>`;
                if(showClassroom) html+=`<td class="border border-secondary-subtle bg-white text-center">${(dbs.nama_rombel)}</td>`;
                //agama;
                nilai.filter(s=>s.kategori =='Agama').forEach(agama=>{
                    html+=`<td class="border border-secondary-subtle text-center">${agama.n_k4_s1==""?"":Number(agama.n_k4_s1).toFixed(0)}</td>`;
                    html+=`<td class="border border-secondary-subtle text-center">${agama.n_k4_s2==""?"":Number(agama.n_k4_s2).toFixed(0)}</td>`;
                    html+=`<td class="border border-secondary-subtle text-center">${agama.n_k5_s1==""?"":Number(agama.n_k5_s1).toFixed(0)}</td>`;
                    html+=`<td class="border border-secondary-subtle text-center">${agama.n_k5_s2==""?"":Number(agama.n_k5_s2).toFixed(0)}</td>`;
                    html+=`<td class="border border-secondary-subtle text-center">${agama.n_k6_s1==""?"":Number(agama.n_k6_s1).toFixed(0)}</td>`;
                    html+=`<td class="border border-secondary-subtle text-center bg-primary-subtle">${(agama?.n_rerata)}</td>`;
                })
                //nonAgama;
                nilai.filter(s=>s.kategori !=='Agama').forEach(mp=>{
                    html+=`<td class="border border-secondary-subtle text-center">${mp.n_k4_s1==""?"":Number(mp.n_k4_s1).toFixed(0)}</td>`;
                    html+=`<td class="border border-secondary-subtle text-center">${mp.n_k4_s2==""?"":Number(mp.n_k4_s2).toFixed(0)}</td>`;
                    html+=`<td class="border border-secondary-subtle text-center">${mp.n_k5_s1==""?"":Number(mp.n_k5_s1).toFixed(0)}</td>`;
                    html+=`<td class="border border-secondary-subtle text-center">${mp.n_k5_s2==""?"":Number(mp.n_k5_s2).toFixed(0)}</td>`;
                    html+=`<td class="border border-secondary-subtle text-center">${mp.n_k6_s1==""?"":Number(mp.n_k6_s1).toFixed(0)}</td>`;
                    html+=`<td class="border border-secondary-subtle text-center bg-primary-subtle">${(mp?.n_rerata)}</td>`;
                })
                html+=`<td class="border border-secondary-subtle text-center">${dbs.rerata_akhir_5_semester.nilai}</td>`
            html+=`</tr>`;
        })
        html+=`</tbody>`;
    html+='</table>';

    html+=`</div>`;
    html+=`<div class="font10 table-responsive">`;
        html+=`<h3 class="text-center">Siswa yang terindikasi sebagai siswa pindahan</h3>`;
        html+=`<table class="table table-sm table-bordered">`;
            html+=`<thead>`;
                html+=`<tr>`;
                    html+=`<th class="text-center text-bg-secondary">No</th>`
                    html+=`<th class="text-center text-bg-secondary">Nama</th>`
                    html+=`<th class="text-center text-bg-secondary">NIS</th>`
                    html+=`<th class="text-center text-bg-secondary">Masuk Tanggal</th>`
                    html+=`<th class="text-center text-bg-secondary">Asal Sekolah</th>`
                html+=`</tr>`;
            html+=`</thead>`;
            html+=`<tbody>`;
            db.filter(s=>s.is_pindahan).forEach((item,i)=>{
                html+=`<tr>`;
                    html+=`<td class="text-center">${(i+1)}</td>`;
                    html+=`<td class="text-nowrap">${(item.pd_nama)}</td>`;
                    html+=`<td class="text-center">${(item.is_pindahan.nis)}</td>`;
                    html+=`<td class="text-center">${(item.is_pindahan.masuk_tgl==""?"":new Date(item.is_pindahan.masuk_tgl).toLocaleString('id-ID',{dateStyle:'long'}))}</td>`;
                    html+=`<td class="text-center">${item.is_pindahan.sekolah_asal}</td>`;
                html+=`</tr>`;
            })
            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;

    return html;
}
const rekapijazahkurmer = (db, identitas)=>{
    let html = "";
    const mapel = db[0].olah_ijazah.map(n=>n.title);
    html+=`<h3 class="text-center mb-0">Rekapitulasi Nilai Ijazah</h3>`;
    html+=`<h3 class="text-center mb-3">Tahun Pelajaran ${identitas.tapel}</h3>`;
    html+=`<div class="table-responsive">`;
        html+=`<table class="table table-sm table-bordered border-dark lh-1 font10 toExcel" id="rekapijazah">`;
            html+=`<thead>`;
                html+=`<tr>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle" style="width:29px">No</th>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle">Nama Siswa</th>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle">Kelas</th>`;
                    html+=`<th colspan="9" class="text-center text-bg-secondary align-middle">Nilai Mata Pelajaran</th>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle">Nilai Ijazah</th>`;
                    html+=`<th rowspan="2" class="text-center text-bg-secondary align-middle">Rangking</th>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    mapel.forEach(n=>{
                        html+=`<th class="text-center text-bg-secondary align-middle">${n}</th>`
                    })
                html+=`</tr>`;
            html+=`</thead>`;
            html+=`<tbody>`;
                    db.forEach((item,i)=>{
                        html+=`<tr>`;
                            html+=`<td class="text-center">${(i+1)}</td>`;
                            html+=`<td class="text-nowrap">${(item.pd_nama)}</td>`;
                            html+=`<td class="text-center">${(item.nama_rombel)}</td>`;
                            let nilai = item.olah_ijazah;
                            mapel.forEach(mp=>{
                                let n = nilai.find(s=>s.title == mp)?.n_rerata;
                                html+=`<td class="text-center">${(n)}</td>`;
                            });
                            html+=`<td class="text-center">${item.nilai_akhir_ijazah.nilai}</td>`;
                            html+=`<td class="text-center"></td>`;
                        html+=`</tr>`;
                    })
            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;

    return html;
}
const menuIjazah = (dataklik,title)=>{
    let html="";
    html+= rowCols.rows('justify-content-center',
            rowCols.cols('col-md-6',
                cardMenu('Menu',
                    `<button class="btn btn-primary rounded-fill" data-klikbutton="${dataklik}">${title}</button>`,
                    false 
                )
                
            )
        )
        return html;
}
const menuTranskip = ()=>{
    let html ="";
    html+=`<div class="row justify-content-center">`;
                
                html+=`<div class="col-6 p-2">`;
                html+=cardMenu('Input Masal',
                    inputsElements.floatingDate('id_tanggal','Tanggal Kelulusan','2025-06-02')
                    +
                    inputsElements.floatingText('id_prefix','Prefix No Ijasah (15 Digit)','1-11-2025-000')
                    +
                    inputsElements.floatingText('id_nosurat','No Surat','038')
                    
                    ,false
                );
                html+=`</div>`;
            html+=`</div>`;
    return html;
}
const EditIdentitasTranskip = (db) =>{
    let html ="";
        html+=`<div id="olahasal" class="table-responsive">`;
        html+=`<h2 class="text-center fw-bold mb-3">Data Identitas Transkip Ijazah</h2>`;
            html+=`Data Sekolah`;
            html+=`<table class="table table-sm table-borderless lh-1 font14 mb-3">`;
                html+=`<tbody>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowarp" style="width:100px">Satuan Pendidikan</td><td style="width:5px">:</td>`;
                        html+=`<td style="width:100px">SDN Ratujaya 1</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="text-nowarp">Nomor Pokok Sekolah Nasional</td><td>:</td>`;
                        html+=`<td>20228914</td>`;
                    html+=`</tr>`;
                html+=`</tbody>`;
            html+=`</table>`;
            html+=`</div><div class="table-responsive">`
            html+=`<table class="table table-sm table-bordered font12" id="tabel_transkip">`;
                html+=`<thead>`;
                    html+=`<tr>`;
                        html+=`<th class="text-center align-middle text-bg-secondary">No</th>`
                        html+=`<th class="text-center print-hide align-middle text-bg-secondary">Id</th>`
                        html+=`<th class="text-center text-bg-secondary">Nama Lengkap</th>`
                        html+=`<th class="text-center align-middle text-bg-secondary">Tempat Tanggal Lahir</th>`
                        html+=`<th class="text-center text-bg-secondary">Nomor Induk Siswa Nasional</th>`
                        html+=`<th class="text-center text-bg-secondary">Nomor Ijazah</th>`
                        html+=`<th class="text-center text-bg-secondary">Tanggal Kelulusan</th>`;
                        html+=`<th class="text-center text-bg-secondary">No Surat Transkip</th>`;
                    html+=`</tr>`;
                html+=`</thead>`;  
                html+=`<tbody>`;
                    db.forEach((item,i)=>{
                        html+=`<tr>`;
                            html+=`<td class="text-center">${(i+1)}</td>`;
                            html+=`<td class="text-center print-hide">${item.id}</td>`;
                            html+=`<td class="text-nowrap">${item.pd_nama}</td>`;
                            html+=`<td class="text-nowrap">${item.tempat_tanggal_lahir}</td>`;
                            html+=`<td class="text-center ${item.nisn.length!==10?'text-bg-warning':''}">${item.nisn}</td>`;
                            html+=`<td class="text-nowrap" data-noijazah="${item.id}" contenteditable="true">${item.no_ijazah}</td>`;
                            html+=`<td class="text-nowrap">${item.tanggal_kelulusan!==''?new Date(item.tanggal_kelulusan).toLocaleString('id-ID',{dateStyle:'long'}):''}</td>`;
                            html+=`<td class="text-nowarp" data-nosurat="${item.id}">${item.no_surat}</td>`;
                        html+=`</tr>`;
                    })  
                html+=`</tbody>`;  
            html+=`</table>`;
        html+=`</div>`;
        html+=`<div class="sticky-md-bottom text-center accord-bg print-hide rounded shadow-lg py-2">`;
        html+=`<button class="btn btn-sm btn-primary" id="simpan_server_ijazah">Simpan</button> <p class="font10">Cetak Transkip berdasarkan penyimpanan data ini, pastikan Anda menyimpannya ketika data nilai raport diupdate! Untuk data pribadi seperti nama, ttl, nisn edit di fitur datasiswa</p> `
                
        html+=`</div>`;
        return html;
}
const viewRapor = {
    'viewDepanRapor'            : viewDepanRapor,
    'tabelRekapRapor'           : tabelRekapRapor,
    'tabelRaporPerbandingan'    : tabelRaporPerbandingan,
    'html_setting_predikat'     : html_setting_predikat,
    'html_setting_deskripi'     : html_setting_deskripi,
    'tabel_setting_predikat'    : tabel_setting_predikat,
    'html_edit_ttb'             : html_edit_ttb,
    'html_edit_kesehatan'       : html_edit_kesehatan,
    'html_edit_ekskul'          : html_edit_ekskul,
    'html_edit_prestasi'          : html_edit_prestasi,
    'html_edit_saran'          : html_edit_saran,
    'html_control_rekap_absen'  : html_control_rekap_absen,
    'html_tabel_rekapabsen'     : html_tabel_rekapabsen,
    'html_titimangsa_rapor'     : html_titimangsa_rapor,
    'html_edit_kenaikan'     : html_edit_kenaikan,
    'html_halaman_isi_rapor'    : html_halaman_isi_rapor,
    'html_setting_kd12'         : html_setting_kd12,
    'tabelRekapRaporKeterampilan' : tabelRekapRaporKeterampilan,
    'html_setting_deskripi_keterampilan': html_setting_deskripi_keterampilan,
    'tabelIjazahOlah'           : tabelIjazahOlah,
    'skl'                       : skl,
    'viewSkl'                   : viewSkl,
    'rekapIjazah'               : rekapIjazah,
    'rekapIjazahPraCtak'        : rekapIjazahPraCtak,
    'editDetailSiswaIjazahModal': editDetailSiswaIjazahModal,
    'suratPernyataanKebenaranIjazah':suratPernyataanKebenaranIjazah,
    'controlHTMLPrint'          :controlHTMLPrint,
    'guidesIjazah'              :guidesIjazah,
    'html_control_riwayat_raport'   :html_control_riwayat_raport,
    'tabelCek'                  :tabelCek,
    'viewPengolahanIjazahBaru' : viewPengolahanIjazahBaru,
    'rekapijazahkurmer':rekapijazahkurmer,
    'viewRapor5Semester':viewRapor5Semester,
    'menuIjazah':menuIjazah,
    'EditIdentitasTranskip':EditIdentitasTranskip,
    'menuTranskip':menuTranskip,
    'sklTranskip':sklTranskip,
    'sknr':sknr,
    'sknr_fill':sknr_fill


}


export default viewRapor;