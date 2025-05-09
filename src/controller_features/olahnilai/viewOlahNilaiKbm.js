import inputsElements from "../../views/components/input-elements";
import { cardMenu2 } from "../../views/sidebar/cardSidebar";
import tabs from "../../views/tabs/tab";

const viewTableKBM = (identitas, data)=>{
    let html = "";
    html+=`<h3 class="text-center mb-0">DATA KBM DI KELAS ANDA</h3>`;
    html+=`<h3 class="text-center mb-0">KELAS ${identitas.rombel}</h3>`;
    html+=`<h3 class="text-center mb-0">${identitas.kurikulum}</h3>`;
    html+=`<div class="font8 print-hide text-center text-danger">Data akan diupdate tiap 3 menit</div>`;
    html+=`<div class="table-responsive mt-3">`;
        html+=`<table class="table table-sm table-bordered border-dark font10">`;
            html+=`<thead>`;
                html+=`<tr>`;
                    html+=`<th class="text-bg-secondary text-center align-middle" style="width:30px">No</th>`;
                    html+=`<th class="text-bg-secondary text-center align-middle">ID KBM</th>`;
                    html+=`<th class="text-bg-secondary text-center align-middle">Identitas KBM</th>`;
                    html+=`<th class="text-bg-secondary text-center align-middle">Jenis Tagihan</th>`;
                    html+=`<th class="text-bg-secondary text-center align-middle">Pelaksanaan</th>`;
                    html+=`<th class="text-bg-secondary text-center align-middle">Properti Kurikulum</th>`;
                    html+=`<th class="text-bg-secondary text-center align-middle">Rombel</th>`;
                    html+=`<th class="text-bg-secondary text-center align-middle">Jumlah Peserta Didik</th>`;
                    html+=`<th class="text-bg-secondary text-center align-middle">Jumlah Soal</th>`;
                    html+=`<th class="text-bg-secondary text-center align-middle" style="width:50px">Aksi</th>`;
                    
                html+=`</tr>`;
            html+=`</thead>`;
            html+=`<tbody>`;
                data.forEach((n,i)=>{
                    html+=`<tr>`;
                        html+=`<td class="text-center">${i+1}</td>`;
                        html+=`<td class="text-center">${n.idbaris}</td>`;
                        html+=`<td>${n.idmapel}</td>`;
                        html+=`<td class="text-center">${n.cast_jenistagihan}</td>`;
                        html+=`<td>${n.pelaksanaan}</td>`;
                        html+=`<td class="text-center">`;
                            let arraykd = n.objek_mapelkd;
                            arraykd.forEach(m=>{
                                html+=m.mapel;
                                html+=' = ';
                                html+=m.kd;
                                html+=`<br/>`
                            })
                        html+=`</td>`;
                        html+=`<td class="text-center">${n.arraykelas}</td>`;
                        html+=`<td class="text-center">${n.api_respon.length} Siswa`;
                        if(n.hasResponDuplicate){
                            html+=`<br/><span class="font8 text-danger">Terindikasi duplikasi Respon, Cek Koreksi Nilai Siswa!</span>`
                        }
                        html+=`</td>`;
                        html+=`<td class="text-nowrap">`;
                            html+=(n.soal_otomatis + n.soal_manual);
                            html+=` Soal<hr class="mb-0 p-0"/>`;
                            html+=n.soal_otomatis +' soal<br/>';
                            html+=n.soal_manual +' soal perlu pengoreksian<br/>';
                        html+=`</td>`;
                        html+=`<td class="text-center">`;
                            html+=`<button class="btn btn-sm py-0 text-bg-info m-1" data-bs-toggle="tooltip" data-bs-title="Lihat Detail" data-aksi="info" data-id="${n.idbaris}"><i class="bi-info"></i></button>`;
                            html+=`<button class="btn btn-sm py-0 text-bg-secondary m-1" data-bs-toggle="tooltip" data-bs-title="Koreksi Nilai Siswa" data-aksi="koreksi" data-id="${n.idbaris}"><i class="bi-pencil"></i></button>`;
                            html+=`<button class="btn btn-sm py-0 text-bg-success m-1" data-bs-toggle="tooltip" data-bs-title="Upload Nilai KBM ini" data-aksi="uploadnilai" data-id="${n.idbaris}"><i class="bi-upload"></i></button>`;
                            html+=`<button class="btn btn-sm py-0 text-bg-primary m-1" data-bs-toggle="tooltip" data-bs-title="Analisis Soal" data-aksi="analisisnilai" data-id="${n.idbaris}"><i class="bi-graph-up"></i></button>`;
                            html+=`<button class="btn btn-sm py-0 text-bg-warning m-1" data-bs-toggle="tooltip" data-bs-title="Edit Publikasi" data-aksi="editpublikasi" data-id="${n.idbaris}"><i class="bi-gear"></i></button>`;
                        html+=`</td>`;
                    html+=`</tr>`;
                })
            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;
    return html;
}
const infoKBM = (data)=>{
    let html ="";
    html+=`<div class="table-responsive">`;
        html+=`<table class="table table-sm table-borderless font14">`;
            html+=`<tr>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end text-end col-md-6">Judul Naskah</td>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end-0 text-start-0">${data.idmapel}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end text-end col-md-6">Jenis Tagihan</td>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end-0 text-start-0">${data.jenistagihan}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end text-end col-md-6">Waktu Mulai</td>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end-0 text-start-0">${new Date(data.idtgl).toLocaleString('id-ID',{dateStyle:'full',timeStyle:'long'})}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end text-end col-md-6">Waktu Akhir</td>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end-0 text-start-0">${new Date(data.idtglend).toLocaleString('id-ID',{dateStyle:'full',timeStyle:'long'})}</td>`;
            html+=`</tr>`;
            html+=`<tr ${data.isFromDesain?"":"class='text-bg-warning'"}>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end text-end col-md-6">Dibuat dari Desain Naskah</td>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end-0 text-start-0">${data.isFromDesain?'YA':'TIDAK'}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end text-end col-md-6">Durasi Waktu Siswa Mengerjakan</td>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end-0 text-start-0">${data.iddurasi} Menit</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end text-end col-md-6">Rombel Yang Mengikuti</td>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end-0 text-start-0">${data.arraykelas}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end text-end col-md-6">Pengoreksian Otomatis (PG, PG Kompleks,Benar-salah)</td>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end-0 text-start-0">${data.soal_otomatis} Soal</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end text-end col-md-6">Pengoreksian Manual (Isian, Essay, Menjodohkan, Menulis Rapih)</td>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end-0 text-start-0">${data.soal_manual} Soal</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end text-end col-md-6">Diikuti oleh siswa saat ini</td>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end-0 text-start-0">${data.api_respon.length} Siswa</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end text-end col-md-6">Dipublikasikan Oleh</td>`;
                html+=`<td class="border-bottom border-dark-subtle border-start-0 border-top-0 border-end-0 text-start-0">${data.dibuatoleh}</td>`;
            html+=`</tr>`;
        html+=`</table>`;
    html+=`</div>`;
    return html;
}
const buttonInfoKBM = (data)=>{
    let html="";
    if(data.isFromDesain){
        html+=`<button class="btn btn-sm btn-secondary py-0 m-1"
                    data-nextaction="previewnaskahCetak" 
                    data-idnaskah="${data.idbaris}">Naskah Soal versi Cetak</button>
                <button class="btn btn-sm btn-warning py-0 m-1"
                    data-nextaction="kisikisi" data-idnaskah="${data.idbaris}">Kisi-Kisi Soal</button>
                <button class="btn btn-sm btn-success py-0 m-1"
                    data-nextaction="kuncijawaban" data-idnaskah="${data.idbaris}">Kunci Jawaban</button>`
    }
    html+=`<button class="btn btn-sm btn-info py-0 m-1"
            data-nextaction="previewnaskah" 
            data-idnaskah="${data.idbaris}">Naskah Soal Online</button>`
    return html;
}
const viewMainControlInfo = ()=>{
    let html = "";
    html+=`<h3 class="text-center">Data KBM Anda</h3>`;
    html+=`<div class="row justify-content-center">`;
        html+=`<div class="col-md-10">`;
            html+=cardMenu2('Reload Handler',
            `<p class="font12">Di fitur ini, dibelakang layar akan mereload data tiap 3 menit sekali. Hal ini akan mengambil bandwidth quota internet Anda. Tujuan mereload data adalah untuk mendapatkan 
            data terupdate tiap 3 menit. Akan tetapi, Anda dapat menghentikan update tersebut dengan menonaktifkan tombol di bawah ini. Matikan jika memang saat ini Anda tidak sedang menunggu respon jawaban siswa (hari ini tidak ada KBM yang sedang berlangsung).</p><div class="mt-5">`
            +
            inputsElements.switchForm('btnreloadhendler','Reload Handler','','','reloadhandler_name',' checked')
            +`</div>`
            ,false)
        html+=`</div>`
    html+=`</div>`;
    return tabs.wraperMainControl(html);
}
const viewOlahNilaiKBM = {
    'viewTableKBM':viewTableKBM,
    'infoKBM':infoKBM,
    'buttonInfoKBM':buttonInfoKBM,
    'viewMainControlInfo':viewMainControlInfo
}
export default viewOlahNilaiKBM;