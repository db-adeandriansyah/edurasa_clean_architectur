import inputsElements from "../../views/components/input-elements";
import { cardMenu2 } from "../../views/sidebar/cardSidebar";

const showRingkasanInduk = (data)=>{
    let html ="";
    html+=`<h2 class="text-center fw-bold mb-0">Ringkasan Nomor Induk Siswa (NIS)</h2>`;
    html+=`<h3 class="text-center fw-bold mb-3">Yang Terlacak di Aplikasi Lamaso/Edurasa</h3>`;
    html+=`<div class="table-responsive">`;
        html+=`<table class="table table-sm table-bordered border-dark-subtle toExcel font14">`;
            html+=`<thead>`;
                html+=`<tr>`;
                    html+=`<th class="bg-dark-subtle text-center">No</th>`;
                    html+=`<th class="bg-dark-subtle text-center">Kode Buku Induk</th>`;
                    html+=`<th class="bg-dark-subtle text-center">Jumlah Terlacak</th>`;
                    html+=`<th class="bg-dark-subtle text-center">Jumlah Ganda</th>`;
                    html+=`<th class="bg-dark-subtle text-center">Jumlah Seharusnya</th>`;
                    html+=`<th class="bg-dark-subtle text-center">Keterangan</th>`;
                html+=`</tr>`
            html+=`</thead>`;
            html+=`<tbody>`;
                data.forEach((item,index)=>{
                    html+=`<tr>`;
                        html+=`<td class="text-center p-1">${index+1}</td>`;
                        html+=`<td class="text-center p-1">${item.awalanInduk?item.awalanInduk:'Tidak Punya NIS'}</td>`;
                        html+=`<td class="text-center p-1">${item.datainduk.length}</td>`;
                        html+=`<td class="text-center p-1">${item.nisGanda.length}</td>`;
                        html+=`<td class="text-center p-1">${item.indukurut.length}</td>`;
                        html+=`<td class="text-center p-1">${item.inValidInduk?'NIS tidak sesuai aturan':`${(item.indukurut.length - item.datainduk.length)&& item.awalanInduk?(item.indukurut.length - item.datainduk.length)+' data butuh perbaikan':''}`}</td>`;
                    html+=`</tr>`;

                })
            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;
    return html;
}
const subMenuInduk = (data)=>{
    let html ="";
    let dataInduk = "";
    data.forEach((item,index)=>{
        if(item.awalanInduk){
            dataInduk += inputsElements.formInputRadio('idtapel_'+item.awalanInduk,item.awalanInduk,item.awalanInduk,true,'radio-induk',`data-radio-induk="${item.awalanInduk}" ${index==0?'checked':''}`);
        }else{
            dataInduk += inputsElements.formInputRadio('idtapel_nonnis','Tidak Punya NIS',item.awalanInduk,true,'radio-induk',`data-radio-induk="${item.awalanInduk}" ${index==0?'checked':''}`);

        }

    })
    html+=`<div class="row justify-content-center">`;
        html+=`<div class="col-md-8">`
            html+=cardMenu2('Pilih Kategori Induk',dataInduk,false);
        html+=`</div>`
    html+=`</div>`
    return html;
}
const showRekapTapel = (data,bol)=>{
    let html ="";
    let nisDuplicate = data.nisGanda.map(n=>n.nis);
    html+=`<h2 class="text-center fw-bold mb-0">Rekapitulasi Data Siswa</h2>`;
    html+=`<h3 class="text-center fw-bold mb-3">Dengan Nomor Induk Siswa Berawalan ${data.awalanInduk}</h3>`;
    html+=`<div class="table-responsive">`;
        html+=`<table class="table table-sm table-bordered border-dark-subtle toExcel font12">`;
            html+=`<thead>`;
                html+=`<tr>`;
                    html+=`<th class="text-center align-middle bg-dark-subtle">No</th>`;
                    html+=`<th class="text-center align-middle bg-dark-subtle">No Induk</th>`;
                    html+=`<th class="text-center align-middle bg-dark-subtle">Nama Siswa</th>`;
                    html+=`<th class="text-center align-middle bg-dark-subtle">Status</th>`;
                    html+=`<th class="text-center align-middle bg-dark-subtle">Rombel Terakhir</th>`;
                    html+=`<th class="text-center align-middle bg-dark-subtle">Masuk Tanggal</th>`;
                    html+=`<th class="text-center align-middle bg-dark-subtle">Keluar Tanggal</th>`;
                    html+=`<th class="text-center align-middle bg-dark-subtle">Aksi</th>`;
                html+=`</tr>`;
            html+=`</thead>`;
            html+=`<tbody>`;
            if(bol){
                data.indukurut.forEach((item,index)=>{
                    html+=`<tr>`;
                        html+=`<td class="${nisDuplicate.includes(item.nis)?'bg-danger-subtle text-center':`${!item.founded?'text-center bg-success-subtle':'text-center'}`} p-1">${index+1}</td>`;
                        html+=`<td class="${nisDuplicate.includes(item.nis)?'bg-danger-subtle text-center':`${!item.founded?'text-center bg-success-subtle':'text-center'}`} p-1">${item.nis}</td>`;
                        html+=`<td class="${nisDuplicate.includes(item.nis)?'bg-danger-subtle':`${!item.founded?'bg-success-subtle':''}`} p-1">${item.pd_nama}</td>`;
                        html+=`<td class="${nisDuplicate.includes(item.nis)?'bg-danger-subtle text-center':`${!item.founded?'text-center bg-success-subtle':'text-center'}`} p-1">${item.aktif}</td>`;
                        html+=`<td class="${nisDuplicate.includes(item.nis)?'bg-danger-subtle text-center':`${!item.founded?'text-center bg-success-subtle':'text-center'}`} p-1">${item.nama_rombel}</td>`;
                        html+=`<td class="${nisDuplicate.includes(item.nis)?'bg-danger-subtle text-center':`${!item.founded?'text-center bg-success-subtle':'text-center'}`} p-1">${item.masuk_tgl!==""?new Date(item.masuk_tgl).toLocaleString('id-ID',{dateStyle:'long'}):""}</td>`;
                        html+=`<td class="${nisDuplicate.includes(item.nis)?'bg-danger-subtle text-center':`${!item.founded?'text-center bg-success-subtle':'text-center'}`} p-1">${item.keluar_tgl!==""?new Date(item.keluar_tgl).toLocaleString('id-ID',{dateStyle:'long'}):""}</td>`;
                        html+=`<td class="${nisDuplicate.includes(item.nis)?'bg-danger-subtle text-center':`${!item.founded?'text-center bg-success-subtle':'text-center'}`} p-1"><button class="btn btn-sm btn-primary py-0" data-modal="detailInduk" data-id="${item.id}" data-nis="${item.nis}">Detail</button></td>`;
                    html+=`</tr>`;
                })
            }else{
                data.datainduk.forEach((item,index)=>{
                    html+=`<tr>`;
                        html+=`<td class="${nisDuplicate.includes(item.nis)?'bg-danger-subtle text-center':`${!item.founded?'text-center bg-success-subtle':'text-center'}`} p-1">${index+1}</td>`;
                        html+=`<td class="${nisDuplicate.includes(item.nis)?'bg-danger-subtle text-center':`${!item.founded?'text-center bg-success-subtle':'text-center'}`} p-1">${item.nis}</td>`;
                        html+=`<td class="${nisDuplicate.includes(item.nis)?'bg-danger-subtle':`${!item.founded?'bg-success-subtle':''}`} p-1">${item.pd_nama}</td>`;
                        html+=`<td class="${nisDuplicate.includes(item.nis)?'bg-danger-subtle text-center':`${!item.founded?'text-center bg-success-subtle':'text-center'}`} p-1">${item.aktif}</td>`;
                        html+=`<td class="${nisDuplicate.includes(item.nis)?'bg-danger-subtle text-center':`${!item.founded?'text-center bg-success-subtle':'text-center'}`} p-1">${item.nama_rombel}</td>`;
                        html+=`<td class="${nisDuplicate.includes(item.nis)?'bg-danger-subtle text-center':`${!item.founded?'text-center bg-success-subtle':'text-center'}`} p-1">${item.masuk_tgl!==""?new Date(item.masuk_tgl).toLocaleString('id-ID',{dateStyle:'long'}):""}</td>`;
                        html+=`<td class="${nisDuplicate.includes(item.nis)?'bg-danger-subtle text-center':`${!item.founded?'text-center bg-success-subtle':'text-center'}`} p-1">${item.keluar_tgl!==""?new Date(item.keluar_tgl).toLocaleString('id-ID',{dateStyle:'long'}):""}</td>`;
                        html+=`<td class="${nisDuplicate.includes(item.nis)?'bg-danger-subtle text-center':`${!item.founded?'text-center bg-success-subtle':'text-center'}`} p-1"><button class="btn btn-sm btn-primary py-0" data-modal="showDetailItemInduk" data-id="${item.id}" data-nis="${item.nis}">Detail</button></td>`;
                    html+=`</tr>`;
                })
            }
            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;
    
    return html;
}
const showDetailItemInduk = (data)=>{
    let html = "";
    html+=`<div class="table-responsive">`;
        html+=`<h3 class="text-center">Identitas</h3>`;
        html+=`<table class="table table-sm font12">`;
            html+=`<tbody>`;
                html+=`<tr>`;
                    html+=`<td style="width:200px">Kelompok Buku Induk</td>`
                    html+=`<td style="width:5px">:</td>`
                    html+=`<td>${data?.awalanInduk||'Belum ditentukan'}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td style="width:200px">Nama</td>`
                    html+=`<td style="width:5px">:</td>`
                    html+=`<td>${data.pd_nama}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td style="width:200px">Status</td>`
                    html+=`<td style="width:5px">:</td>`
                    html+=`<td>${data.aktif}</td>`;
                html+=`</tr>`;
                if(data.aktif ==='non-aktif'){
                    html+=`<tr><td colspan="3" class="bg-danger-subtle p-1">Siswa dengan status non-aktif wajib ditelusuri riwayat keberadaannya.</td></tr>`
                }
                html+=`<tr>`;
                    html+=`<td style="width:200px">Kelas Terakhir</td>`
                    html+=`<td style="width:5px">:</td>`
                    html+=`<td>${data.nama_rombel}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td style="width:200px">NIS</td>`
                    html+=`<td style="width:5px">:</td>`
                    html+=`<td>${data.nis}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td style="width:200px">Masuk Tanggal</td>`
                    html+=`<td style="width:5px">:</td>`
                    html+=`<td>${data.masuk_tgl ===""?"Belum Diisi":new Date(data.masuk_tgl).toLocaleString('id-ID',{dateStyle:'long'})}</td>`;;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td style="width:200px">Keluar Tanggal</td>`
                    html+=`<td style="width:5px">:</td>`
                    html+=`<td>${data.keluar_tgl ===""?"(tidak diisi)":new Date(data.keluar_tgl).toLocaleString('id-ID',{dateStyle:'long'})}</td>`;;
                html+=`</tr>`;
                html+=`<tr><td colspan="2"></td><td>`;
                    html+=`<div class="d-flex justify-content-around">`;
                        html+=`<button class="btn btn-primary btn-sm px-1" data-modal-item="editIdentitas" data-id="${data.id}" data-nis="${data.nis}"><i class="bi-pencil"></i> Edit</button>`;
                        if(data.id!=="" ){
                            if(data.nis!==""){
                                html+=`<button class="btn btn-success btn-sm px-1" data-modal-item="cetakIdentitas" data-id="${data.id}" data-nis="${data.nis}"><i class="bi-printer-fill"></i> Cetak Identitas Induk</button>`
                            }
                        }
                    html+=`</div>`;
                html+=`</td></tr>`;
            html+=`</tbody>`;
        html+=`</table>`;
        html+=`<h3 class="text-center">Raport</h3>`;
        html+=`<table class="table table-sm font12 table-bordered">`;
            html+=`<thead>`;
                html+=`<tr>`;
                    html+=`<th class="bg-dark-subtle text-center align-middle">Tahun Pelajaran</th>`
                    html+=`<th class="bg-dark-subtle text-center align-middle">Riwayat Kelas</th>`
                    html+=`<th class="bg-dark-subtle text-center align-middle">Raport Per Semester</th>`
                    html+=`<th class="bg-dark-subtle text-center align-middle">Buku Induk</th>`
                html+=`</tr>`;
            html+=`</thead>`;
            html+=`<tbody>`;
            
            if(data.riwayatRapor){
                data.riwayatRapor.forEach((item,index)=>{
                    let semester= item.semester;
                    html+=`<tr>`
                        if(semester.length>1){
                            html+=`<td rowspan="2" class="align-middle text-center">${item.tapel}</td>`
                            html+=`<td rowspan="2" class="align-middle text-center">${item.rombel}</td>`
                            html+=`<td>`;
                                html+=`<div class="d-flex justify-content-around">`;
                                    html+=`<span>Semester ${semester[0]}</span>`;
                                    html+=`<button class="btn btn-success btn-sm px-1" data-modal-item="cetakRaport" data-id="${data.id}" data-tapel="${item.kodetapel}" data-semester="${semester[0]}"><i class="bi-printer-fill"></i> Cetak Raport</button>`;
                                html+=`</div>`;
                            html+=`</td>`;
                            html+=`<td rowspan="2" class="text-center align-middle"><button class="btn btn-sm px-1 btn-primary"  data-modal-item="cetakInduk" data-id="${data.id}" data-tapel="${item.kodetapel}" data-semester="${semester[0]}"><i class="bi-printer-fill"></i> Cetak Induk</button></td>`;
                            html+=`</tr><tr>`;
                            
                            html+=`<td>`;
                                html+=`<div class="d-flex justify-content-around">`;
                                    html+=`<span>Semester ${semester[1]}</span>`;
                                    html+=`<button class="btn btn-sm px-1 btn-success" data-modal-item="cetakRaport" data-id="${data.id}" data-tapel="${item.kodetapel}" data-semester="${semester[1]}"><i class="bi-printer-fill"></i> Cetak Raport</button>`;
                                html+=`</div>`;
                            html+=`</td>`;
                        }else{
                            html+=`<td class="align-middle text-center">${item.tapel}</td>`
                            html+=`<td class="align-middle text-center"></td>`
                            html+=`<td>`;
                                html+=`<div class="d-flex justify-content-around">`;
                                    html+=`<span>Semester ${semester[0]}</span>`;
                                    html+=`<button class="btn btn-sm px-1  btn-success" data-modal-item="cetakRaport" data-id="${data.id}" data-tapel="${item.kodetapel}" data-semester="${semester[0]}"><i class="bi-printer-fill"></i> Cetak Raport</button>`;
                                html+=`</div>`;
                            html+=`</td>`;
                            html+=`<td class="align-middle text-center"><button class="btn btn-sm px-1 btn-primary" data-modal-item="cetakInduk" data-id="${data.id}" data-tapel="${item.kodetapel}" data-semester="${semester[0]}"><i class="bi-printer-fill"></i> Cetak Induk</button></td>`;
                        }
                    html+=`</tr>`
                });
            }

            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;
    return html;
}
const showWraperInduk = (childrem,btnSave=false)=>{
    let html = "";
    html+=`<div id="area_rapor" class="table-responsive">`;
    html+=childrem;
    html+=`</div>`;
    html+=`<div id="area_kontrol" class="sticky-md-bottom text-center accord-bg print-hide rounded shadow-lg py-2 mt-5">`;
        html+=`<div class="d-flex justify-content-around">`;
        html +=`<button class="btn btn-sm py-0 btn-secondary rounded-pill button-footer" data-bs-target="#modalAuto" data-bs-toggle="modal">⇦ Kembali</button>`;
        if(btnSave){

            html+=`<button class="btn btn-sm btn-success rounded-pill button-footer" id="btnSave"><i class="bi bi-save2-fill"></i> Simpan</button>`;
        }else{
            html+=`<button class="btn btn-sm btn-success rounded-pill button-footer" id="btnPrintKelulusan"><i class="bi bi-printer-fill"></i> Print</button>`

        }
        html+=`</div>`;
    html+=`</div>`;
    return html;
}
const showIdentitasInduk = (data)=>{
    let html = "";
    html+=`<table class="table table-sm font10 lh-1 table-borderless">`;
        html+=`<thead>`;
            html+=`<tr>`;
                [...Array(72)].forEach((_,index)=>{
                    html+=`<td style="width:18px"></td>`;
                })
            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;
            html+=`<tr><td colspan="72" class="text-center fs-3 fw-bold text-uppercase">Lembar Buku Induk Register</td></tr>`;
            html+=`<tr><td colspan="72" class="text-center"><br/></td></tr>`;
            html+=`<tr>`;
                html+=`<td colspan="18">Nomor Induk Sekolah</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="40" class="border-bottom">${data.nis}</td>`;
                html+=`<td></td>`;
                html+=`<td colspan="12" class="border bg-dark-subtle text-center">No. Urut</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td colspan="18">Nomor Induk Sekolah Nasional</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="40" class="border-bottom">${data.nisn}</td>`;
                html+=`<td></td>`;
                html+=`<td colspan="12" rowspan="2" class="border text-center fs-3 align-middle">${data.lastDigit.toString().padStart(3,'0')}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td colspan="60" class="fw-bold">A. KETERANGAN SISWA</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>1.</td>`;
                html+=`<td colspan="70">Nama Peserta Didik</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>a.</td>`;
                html+=`<td colspan="15">Nama Lengkap</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.pd_nama}</td>`;
                html+=`<td></td>`;
                html+=`<td colspan="10" rowspan="7" class="border border-dark align-middle text-center">Pas Poto<br>3x4</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>b.</td>`;
                html+=`<td colspan="15">Nama Panggilan</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom"></td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>2.</td>`;
                html+=`<td colspan="16">Jenis Kelamin</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.pd_jk==""?"":`${data.pd_jk==="P"?"Perempuan":"Laki-laki"}`}</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>3.</td>`;
                html+=`<td colspan="59">Kelahiran</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>a.</td>`;
                html+=`<td colspan="15">Tempat Lahir</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.pd_tl}</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>b.</td>`;
                html+=`<td colspan="15">Tanggal Lahir</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.pd_tanggallahir==""?"":new Date(data.pd_tanggallahir).toLocaleString("id-ID",{dateStyle:'long'})}</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>4.</td>`;
                html+=`<td colspan="16">Agama</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.pd_agama}</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>5.</td>`;
                html+=`<td colspan="16">Kewarganegaraan</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_wni}</td>`;
                html+=`<td colspan="11"></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>6.</td>`;
                html+=`<td colspan="16">Anak Ke</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_anakkeberapa}</td>`;
                html+=`<td></td>`
                html+=`<td colspan="10" rowspan="7" class="border border-dark align-middle text-center">Pas Poto<br>3x4</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>7.</td>`;
                html+=`<td colspan="57">Jumlah Saudara</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>a.</td>`;
                html+=`<td colspan="15">Kandung</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_jumlahsaudarakandung}</td>`;
                html+=`<td></td>`;
                
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>b.</td>`;
                html+=`<td colspan="15">Tiri</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.jumlahsaudaratiri}</td>`;
                html+=`<td></td>`;

            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>c.</td>`;
                html+=`<td colspan="15">Angkat</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.jumlahsaudaraangkat}</td>`;
                html+=`<td></td>`;
                
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>8.</td>`;
                html+=`<td colspan="16">Bahasa Sehari-hari</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.bahasaseharihari}</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>9.</td>`;
                html+=`<td colspan="16">Golongan Darah</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.golongandarah}</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>10.</td>`;
                html+=`<td colspan="59">Alamat</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>a.</td>`;
                html+=`<td colspan="15">Jalan</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.pd_alamat}</td>`;
                html+=`<td></td>`;
                html+=`<td colspan="10" rowspan="7" class="border border-dark align-middle text-center">Pas Poto<br>3x4</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>b.</td>`;
                html+=`<td colspan="15">RT/RW</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_rt}/${data.dapo_rw}</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>c.</td>`;
                html+=`<td colspan="15">Kelurahan</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_kelurahan}</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>d.</td>`;
                html+=`<td colspan="15">Kecamatan</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_kecamatan}</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>e.</td>`;
                html+=`<td colspan="15">Kabupaten/Kota</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_kota}</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>f.</td>`;
                html+=`<td colspan="15">Provinsi</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_provinsi}</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>11.</td>`;
                html+=`<td colspan="16">Kode Pos/No.HP/Telepon</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_kodepos}/${data.pd_hp}</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>12.</td>`;
                html+=`<td colspan="16">Tinggal Bersama</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_jenistinggal}</td>`;
                html+=`<td colspan="11"></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>13.</td>`;
                html+=`<td colspan="16">Jarak Tempat Tinggal ke Sekolah</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_jarakrumahkesekolah===""?"...":data.dapo_jarakrumahkesekolah} Km.</td>`;
                html+=`<td></td>`;
                html+=`<td colspan="10" rowspan="7" class="border border-dark align-middle text-center">Pas Poto<br>3x4</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td colspan="62" class="fw-bold">B. KETERANGAN ORANG TUA /WALI PESERTA DIDIK</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>14.</td>`;
                html+=`<td colspan="59">Nama Orang Tua/Wali</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>a.</td>`;
                html+=`<td colspan="15">Ayah Kandung</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.pd_namaayah}</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>b.</td>`;
                html+=`<td colspan="15">Ibu Kandung</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.pd_namaibu}</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>c.</td>`;
                html+=`<td colspan="15">Wali</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_namawali}</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>d.</td>`;
                html+=`<td colspan="15">Hubungan Kerabat Wali</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.hubunganwali}</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>15.</td>`;
                html+=`<td colspan="59">Pendidikan</td>`;
                html+=`<td colspan="11"></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>a.</td>`;
                html+=`<td colspan="15">Pendidikan Terakhir Ayah</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_jenjangpendidikanayah}</td>`;
                html+=`<td></td>`;
                html+=`<td colspan="10" rowspan="7" class="border border-dark align-middle text-center">Pas Poto<br>3x4</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>b.</td>`;
                html+=`<td colspan="15">Pendidikan Terakhir Ibu</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_jenjangpendidikanibu}</td>`;
                html+=`<td></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>c.</td>`;
                html+=`<td colspan="15">Pendidikan Terakhir Wali</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_jenjangpendidikanwali}</td>`;
                html+=`<td></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>16.</td>`;
                html+=`<td colspan="59">Pekerjaan</td>`;
                html+=`<td></td>`;
            html+=`</tr>`;
            
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>a.</td>`;
                html+=`<td colspan="15">Pekerjaan Ayah</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_pekerjaanayah}</td>`;
                html+=`<td></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>b.</td>`;
                html+=`<td colspan="15">Pekerjaan Ibu</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_pekerjaanibu}</td>`;
                html+=`<td></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>c.</td>`;
                html+=`<td colspan="15">Pekerjaan Wali</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_pekerjaanwali}</td>`;
                html+=`<td></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td colspan="72" class="fw-bold">C. RIWAYAT PENDIDIKAN SISWA</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>17.</td>`;
                html+=`<td colspan="59">Pendidikan Sebelumnya</td>`;
                html+=`<td></td>`;
                html+=`<td colspan="10" rowspan="7" class="border border-dark align-middle text-center">Pas Poto<br>3x4</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>a.</td>`;
                html+=`<td colspan="59">Masuk Sebagai Peserta Didik Baru</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>1).</td>`;
                html+=`<td colspan="14">Asal Sekolah</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_sekolahasal}</td>`;
                html+=`<td></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>2).</td>`;
                html+=`<td colspan="14">Nama Sekolah</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.namasekolahasaltk}</td>`;
                html+=`<td></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>3).</td>`;
                html+=`<td colspan="14">No Ijazah TK/PAUD</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.noijazahtk}</td>`;
                html+=`<td></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>4).</td>`;
                html+=`<td colspan="14">Tgl Ijazah TK/PAUD</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.tanggalijazahtk==""?"":new Date(data.tanggalijazahtk).toLocaleString('id-ID',{dateStyle:'long'})}</td>`;
                html+=`<td></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>b.</td>`;
                html+=`<td colspan="59">Pindahan dari Sekolah Lain</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>1).</td>`;
                html+=`<td colspan="14">Nama Sekolah Asal</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.masuk_dari}</td>`;
                html+=`<td colspan="11"></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>2).</td>`;
                html+=`<td colspan="14">Diterima di </td>`;
                html+=`<td colspan="54"></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>a).</td>`;
                html+=`<td colspan="13">Tanggal</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.masuk_tgl===""?"":new Date(data.masuk_tgl).toLocaleString('id-ID',{dateStyle:'long'})}</td>`;
                html+=`<td colspan="11"></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>b).</td>`;
                html+=`<td colspan="13">Kelas</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.awal_kelas}</td>`;
                html+=`<td colspan="11"></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>c).</td>`;
                html+=`<td colspan="13">Semester</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.masuk_tgl===""?"":new Date(data.masuk_tgl).getMonth()>5?1:2}</td>`;
                html+=`<td colspan="11"></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td colspan="72" class="fw-bold">D. MENINGGALKAN SEKOLAH</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>18.</td>`;
                html+=`<td colspan="70">Tamat Belajar/Lulus</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>a.</td>`;
                html+=`<td colspan="15">Tanggal Lulus</td>`;
                html+=`<td>:</td>`;
                if(data.aktif === 'lulus'){
                    html+=`<td colspan="42" class="border-bottom">${data.keluar_tgl===""?"":new Date(data.keluar_tgl).toLocaleString('id-ID',{dateStyle:'long'})}</td>`;
                }else{
                    html+=`<td colspan="42" class="border-bottom"></td>`;
                }
                html+=`<td colspan="11"></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>b.</td>`;
                html+=`<td colspan="15">No. Ijazah/STTB</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.dapo_noseriijazah}</td>`;
                html+=`<td colspan="11"></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>c.</td>`;
                html+=`<td colspan="15">Melanjutkan Ke</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.smp_ke}</td>`;
                html+=`<td colspan="11"></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>19.</td>`;
                html+=`<td colspan="70">Mutasi (Pindah Sekolah)</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>a.</td>`;
                html+=`<td colspan="15">Kelas yang Ditinggalkan</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.kelas_keluar}</td>`;

                html+=`<td colspan="11"></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>b.</td>`;
                html+=`<td colspan="15">Sekolah Tujuan</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.pindah_ke}</td>`;
                html+=`<td colspan="11"></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>c.</td>`;
                html+=`<td colspan="15">Ke tingkat</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.kelas_pindah_ke_kelas}</td>`;
                html+=`<td colspan="11"></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td>20.</td>`;
                html+=`<td colspan="70">Alasan Meninggalkan Sekolah</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>a.</td>`;
                html+=`<td colspan="15">Alasan</td>`;
                html+=`<td>:</td>`;
                
                if(data.alasan_keluar ==="" && data.aktif==="lulus"){
                    html+=`<td colspan="42" class="border-bottom">Lulus</td>`;
                }else{
                    html+=`<td colspan="42" class="border-bottom">${data.alasan_keluar}</td>`;
                }
                html+=`<td colspan="11"></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td></td>`;
                html+=`<td></td>`;
                html+=`<td>b.</td>`;
                html+=`<td colspan="15">Tanggal Keluar</td>`;
                html+=`<td>:</td>`;
                html+=`<td colspan="42" class="border-bottom">${data.keluar_tgl===""?"":new Date(data.keluar_tgl).toLocaleString('id-ID',{dateStyle:'long'})}</td>`;
                html+=`<td colspan="11"></td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td colspan="72" class="fw-bold">E. PERKEMBANGAN SISWA</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td rowspan="4" colspan="2"></td>`
                html+=`<td rowspan="4" class="bg-dark-subtle border border-dark text-center align-middle">No</td>`;
                html+=`<td rowspan="4" colspan="5" class="bg-dark-subtle border border-dark text-center align-middle">Tahun Pelajaran</td>`;
                html+=`<td colspan="64" class="bg-dark-subtle text-center border border-dark align-middle">Riwayat Perkembangan</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td rowspan="3" colspan="4" class="bg-dark-subtle border border-dark text-center align-middle">Kelas</td>`;
                html+=`<td colspan="20" class="bg-dark-subtle text-center border border-dark align-middle">Fisik</td>`;
                html+=`<td colspan="40" class="bg-dark-subtle text-center border border-dark align-middle">Kesehatan</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td colspan="10" class="bg-dark-subtle border border-dark text-center align-middle">Tinggi Badan</td>`
                html+=`<td colspan="10" class="bg-dark-subtle border border-dark text-center align-middle">Berat Badan</td>`
                html+=`<td colspan="10" class="bg-dark-subtle border border-dark text-center align-middle">Pendengaran</td>`
                html+=`<td colspan="10" class="bg-dark-subtle border border-dark text-center align-middle">Penglihatan</td>`
                html+=`<td colspan="10" class="bg-dark-subtle border border-dark text-center align-middle">Gigi</td>`
                html+=`<td colspan="10" class="bg-dark-subtle border border-dark text-center align-middle">Penyakit Lainnya</td>`
            html+=`</tr>`;
            html+=`<tr>`;
                [...Array(6)].forEach((_,i)=>{
                    html+=`<td colspan="5" class="bg-dark-subtle border border-dark text-center align-middle font8">Semester 1</td>`;
                    html+=`<td colspan="5" class="bg-dark-subtle border border-dark text-center align-middle font8">Semester 2</td>`;
                });
            html+=`</tr>`;
            data.riwayatRapor.forEach((item,index)=>{
                let rapor1 = item.rapor_semester1;
                let rapor2 = item.rapor_semester2;
                html+=`<tr>`;
                    html+=`<td></td>`;
                    html+=`<td></td>`;
                    html+=`<td  class="border border-dark text-center align-middle">${index+1}</td>`;
                    html+=`<td  colspan="5" class="border border-dark text-center align-middle">${item.tapel}</td>`;
                    html+=`<td  colspan="4" class="border border-dark text-center align-middle">${rapor1?.rombel}</td>`;
                    html+=`<td  colspan="5" class="border border-dark text-center align-middle">${rapor1?.TINGGIBADAN_SEMESTER_1}</td>`;
                    html+=`<td  colspan="5" class="border border-dark text-center align-middle">${rapor2?.TINGGIBADAN_SEMESTER_2}</td>`;
                    html+=`<td  colspan="5" class="border border-dark text-center align-middle">${rapor1?.BERATBADAN_SEMESTER_1}</td>`;
                    html+=`<td  colspan="5" class="border border-dark text-center align-middle">${rapor2?.BERATBADAN_SEMESTER_2}</td>`;
                    html+=`<td  colspan="5" class="border border-dark text-center align-middle">${rapor1?.PENDENGARAN}</td>`;
                    html+=`<td  colspan="5" class="border border-dark text-center align-middle">${rapor2?.PENDENGARAN}</td>`;
                    html+=`<td  colspan="5" class="border border-dark text-center align-middle">${rapor1?.PENGLIHATAN}</td>`;
                    html+=`<td  colspan="5" class="border border-dark text-center align-middle">${rapor2?.PENGLIHATAN}</td>`;
                    html+=`<td  colspan="5" class="border border-dark text-center align-middle">${rapor1?.GIGI}</td>`;
                    html+=`<td  colspan="5" class="border border-dark text-center align-middle">${rapor2?.GIGI}</td>`;
                    html+=`<td  colspan="5" class="border border-dark text-center align-middle">${rapor1?.KESEHATANLAIN}</td>`;
                    html+=`<td  colspan="5" class="border border-dark text-center align-middle">${rapor2?.KESEHATANLAIN}</td>`;
                html+=`</tr>`;
            });
            if(data.riwayatRapor.length<6){
                let kurangberapa = 6 - data.riwayatRapor.length;
                [...Array(kurangberapa)].forEach((item,index)=>{
                    
                    html+=`<tr>`;
                        html+=`<td></td>`;
                        html+=`<td></td>`;
                        html+=`<td  class="border border-dark text-center align-middle">&nbsp;</td>`;
                        html+=`<td  colspan="5" class="border border-dark text-center align-middle"></td>`;
                        html+=`<td  colspan="4" class="border border-dark text-center align-middle"></td>`;
                        html+=`<td  colspan="5" class="border border-dark text-center align-middle"></td>`;
                        html+=`<td  colspan="5" class="border border-dark text-center align-middle"></td>`;
                        html+=`<td  colspan="5" class="border border-dark text-center align-middle"></td>`;
                        html+=`<td  colspan="5" class="border border-dark text-center align-middle"></td>`;
                        html+=`<td  colspan="5" class="border border-dark text-center align-middle"></td>`;
                        html+=`<td  colspan="5" class="border border-dark text-center align-middle"></td>`;
                        html+=`<td  colspan="5" class="border border-dark text-center align-middle"></td>`;
                        html+=`<td  colspan="5" class="border border-dark text-center align-middle"></td>`;
                        html+=`<td  colspan="5" class="border border-dark text-center align-middle"></td>`;
                        html+=`<td  colspan="5" class="border border-dark text-center align-middle"></td>`;
                        html+=`<td  colspan="5" class="border border-dark text-center align-middle"></td>`;
                        html+=`<td  colspan="5" class="border border-dark text-center align-middle"></td>`;
                    html+=`</tr>`;
                });
            }
            
            html+=`<tr>`;
                html+=`<td colspan="72" class="fw-bold">F. DOKUMEN DIGITAL</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td colspan="2"></td>`;
                html+=`<td colspan="8" class="border text-center border-dark bg-dark-subtle">Jenis/Nama Dokumen</td>`;
                html+=`<td colspan="51" class="border text-center border-dark align-middle bg-dark-subtle">Tautan (Link Unduh)</td>`;
                html+=`<td colspan="13" class="border text-center border-dark bg-dark-subtle">Keterangan</td>`;
            html+=`</tr>`;
            if(data.dok_akte!=="" && data.dok_kk!=="" && data.dok_kip!=="" && data.dok_kks && data.dok_kpspkh!==""){
                html+=`<tr><td colspan="2"></td><td colspan="70" class="border border-dark">&bnsp;</td></tr>`;
            }
            if(data.dok_akte!==""){
                html+=`<tr>`;
                    html+=`<td colspan="2"></td>`;
                    html+=`<td colspan="8" class="border border-dark p-1">Akte Kelahiran</td>`;
                    html+=`<td colspan="51" class="border border-dark p-1">`;
                    //https://drive.google.com/file/d/1qwZb8wnZVYeESLH_pwGor0GVLII16FqU/view
                        html+=`<a href="https://drive.google.com/file/d/${data.dok_akte}/view" target="_blank" class="text-decoration-none">https://drive.google.com/file/d/${data.dok_akte}/view</a>`;
                    html+=`</td>`;
                    html+=`<td colspan="13" class="border border-dark p-1"></td>`;
                html+=`</tr>`;
            }
            if(data.dok_kk!==""){
                html+=`<tr>`;
                    html+=`<td colspan="2"></td>`;
                    html+=`<td colspan="8" class="border border-dark p-1">Kartu Keluarga</td>`;
                    html+=`<td colspan="51" class="border border-dark p-1">`;
                    //https://drive.google.com/file/d/1qwZb8wnZVYeESLH_pwGor0GVLII16FqU/view
                        html+=`<a href="https://drive.google.com/file/d/${data.dok_kk}/view" target="_blank" class="text-decoration-none">https://drive.google.com/file/d/${data.dok_kk}/view</a>`;
                    html+=`</td>`;
                    html+=`<td colspan="13" class="border border-dark p-1"></td>`;
                html+=`</tr>`;
            }
            if(data.dok_kip!==""){
                html+=`<tr>`;
                    html+=`<td colspan="2"></td>`;
                    html+=`<td colspan="8" class="border border-dark p-1">Kartu Indonesia Pintar(KIP)</td>`;
                    html+=`<td colspan="51" class="border border-dark p-1">`;
                    //https://drive.google.com/file/d/1qwZb8wnZVYeESLH_pwGor0GVLII16FqU/view
                        html+=`<a href="https://drive.google.com/file/d/${data.dok_kip}/view" target="_blank" class="text-decoration-none">https://drive.google.com/file/d/${data.dok_kip}/view</a>`;
                    html+=`</td>`;
                    html+=`<td colspan="13" class="border border-dark p-1"></td>`;
                html+=`</tr>`;
            }

            if(data.dok_kks!==""){
                html+=`<tr>`;
                    html+=`<td colspan="2"></td>`;
                    html+=`<td colspan="8" class="border border-dark p-1">Kartu Keluarga Sejahtera(KKS)</td>`;
                    html+=`<td colspan="51" class="border border-dark p-1">`;
                    //https://drive.google.com/file/d/1qwZb8wnZVYeESLH_pwGor0GVLII16FqU/view
                        html+=`<a href="https://drive.google.com/file/d/${data.dok_kks}/view" target="_blank" class="text-decoration-none">https://drive.google.com/file/d/${data.dok_kks}/view</a>`;
                    html+=`</td>`;
                    html+=`<td colspan="13" class="border border-dark p-1"></td>`;
                html+=`</tr>`;
            }
            if(data.dok_kpspkh!==""){
                html+=`<tr>`;
                    html+=`<td colspan="2"></td>`;
                    html+=`<td colspan="8" class="border border-dark p-1">Program Keluarga Harapan</td>`;
                    html+=`<td colspan="51" class="border border-dark p-1">`;
                    //https://drive.google.com/file/d/1qwZb8wnZVYeESLH_pwGor0GVLII16FqU/view
                        html+=`<a href="https://drive.google.com/file/d/${data.dok_kpspkh}/view" target="_blank" class="text-decoration-none">https://drive.google.com/file/d/${data.dok_kpspkh}/view</a>`;
                    html+=`</td>`;
                    html+=`<td colspan="13" class="border border-dark p-1"></td>`;
                html+=`</tr>`;
            }

            html+=`<tr>`;
                html+=`<td colspan="72" class="fw-bold">G. CATATAN PENTING</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td colspan="2"></td>`;
                html+=`<td colspan="28" >Riwayat Kurikulum yang diikuti siswa</td>`;
                 html+=`<td colspan="42" class="border-bottom"></td>`
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td colspan="2"></td>`;
                html+=`<td colspan="10" class="border border-dark bg-dark-subtle text-center p-1">Tahun Pelajaran</td>`;
                html+=`<td colspan="5" class="border border-dark bg-dark-subtle text-center p-1">Kelas</td>`;
                html+=`<td colspan="12" class="border border-dark bg-dark-subtle text-center p-1">Nama Kurikulum</td>`;
                html+=`<td></td>`
                html+=`<td colspan="42" class="border-bottom"></td>`
            html+=`</tr>`;
            data.riwayatRapor.forEach((item,i)=>{
                html+=`<tr>`;
                    html+=`<td colspan="2"></td>`;
                    html+=`<td colspan="10" class="border p-1 border-dark text-center">${item.tapel}</td>`;
                    html+=`<td colspan="5" class="border p-1 border-dark text-center">${item.rombel}</td>`;
                    html+=`<td colspan="12" class="border p-1 border-dark text-center">${item.kurikulum}</td>`;
                    html+=`<td></td>`
                    html+=`<td colspan="42" class="border-bottom"></td>`
                html+=`</tr>`;
            });
            [...Array(5)].forEach(item=>{
                html+=`<tr><td colspan="2"></td><td colspan="70" class="border-bottom">&nbsp;</td></tr>`;
            });

        html+=`</tbody>`;
    html+=`</table>`;
    return html
}
const viewInduk = {
    'showRingkasanInduk' : showRingkasanInduk,
    'subMenuInduk' : subMenuInduk,
    'showRekapTapel' : showRekapTapel,
    'showDetailItemInduk':showDetailItemInduk,
    'showWraperInduk':showWraperInduk,
    'showIdentitasInduk':showIdentitasInduk
};
export default viewInduk;
