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
const viewRapor = {
    'viewDepanRapor' : viewDepanRapor
}


export default viewRapor;