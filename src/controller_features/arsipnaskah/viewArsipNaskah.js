import buttonEdu from "../../views/components/buttons";
import rowCols from "../../views/components/row-cols";
import { cardMenu, cardMenu2 } from "../../views/sidebar/cardSidebar";
import tabs from "../../views/tabs/tab";

const toolbar = (data)=>{
    let html ="";
    let info='';
    info+=`<h3 class="text-center text-uppercase">ARSIP NASKAH SOAL</h3>`
        html+=`<div class="pb-2 pt-0 mb-2 border-5 border-warning border-top-0  border-start-0 border-end-0 border-bottom accord-bg rounded container">${info}</div>`
    return html;
}
const htmlTabelNaskah = (data)=>{
    let html =""
    html+=`<div class="table-responsive">`;
        html+=`<table class="table table-sm table-bordered font10 border-dark">`;
            html+=`<thead>`;
                html+=`<tr>`;
                    html+=`<th class="text-center align-middle bg-secondary-subtle text-dark">No.</th>`;
                    html+=`<th class="text-center align-middle bg-secondary-subtle text-dark">Judul</th>`;
                    html+=`<th class="text-center align-middle bg-secondary-subtle text-dark">Kelas</th>`;
                    html+=`<th class="text-center align-middle bg-secondary-subtle text-dark">Kurikulum</th>`;
                    html+=`<th class="text-center align-middle bg-secondary-subtle text-dark">Penyusun</th>`;
                    html+=`<th class="text-center align-middle bg-secondary-subtle text-dark">Tanggal Naskah</th>`;
                    html+=`<th class="text-center align-middle bg-secondary-subtle text-dark">Pratinjau</th>`;
                    html+=`<th class="text-center align-middle bg-secondary-subtle text-dark">Publikasi</th>`;
                    html+=`<th class="text-center align-middle bg-secondary-subtle text-dark">Riwayat Publikasi</th>`;
                html+=`</tr>`;
            html+=`</thead>`;
            html+=`<tbody>`;
            data.forEach((n,index)=>{
                html+=`<tr>`
                    html+=`<td class="text-center">${index+1}</td>` ;
                    html+=`<td>${n.juduldesain}</td>` ;
                    html+=`<td class="text-center">${n.jenjang}</td>` ;
                    html+=`<td class="text-center">${n.kurikulum=='kurmer'?'Kurikulum Merdeka (Kurmer)':'Kurikulum 2013'}</td>` ;
                    html+=`<td>${n.namaguru}</td>`
                    html+=`<td>${n.tanggalnaskah}</td>`
                    html+=`<td>`
                        html+=`<button class="btn btn-sm py-0 bg-primary-subtle rounded-pill" data-aksibytabelnaskah="at_naskah" data-shownaskah="${n.idbaris}" data-bs-toggle="tooltip" data-bs-title="Lihat Naskah Soal Online"><i class="bi bi-file-earmark-medical"></i></button>`;
                        html+=`<button class="btn btn-sm py-0 bg-primary-subtle rounded-pill" data-aksibytabelnaskah="at_naskahoffline" data-shownaskah="${n.idbaris}" data-bs-toggle="tooltip" data-bs-title="Lihat Naskah Soal versi Cetak"><i class="bi bi-file-earmark-medical"></i></button>`;
                        html+=`<button class="btn btn-sm py-0 bg-success-subtle rounded-pill" data-aksibytabelnaskah="at_kisi" data-shownaskah="${n.idbaris}" data-bs-toggle="tooltip" data-bs-title="Lihat Kisi-kisi"><i class="bi bi-file-earmark-ruled"></i></button>`;
                        html+=`<button class="btn btn-sm py-0 bg-success-subtle rounded-pill" data-aksibytabelnaskah="at_kisisoal" data-shownaskah="${n.idbaris}" data-bs-toggle="tooltip" data-bs-title="Lihat Kisi-kisi dan soalnya"><i class="bi bi-file-ruled"></i></button>`;
                        html+=`<button class="btn btn-sm py-0 bg-success-subtle rounded-pill" data-aksibytabelnaskah="at_kuncijawaban" data-shownaskah="${n.idbaris}" data-bs-toggle="tooltip" data-bs-title="Lihat Kunci Jawaban"><i class="bi bi-key"></i></button>`;
                        html+=`<button class="btn btn-sm py-0 bg-info-subtle rounded-pill" data-aksibytabelnaskah="at_edit" data-shownaskah="${n.idbaris}" data-bs-toggle="tooltip" data-bs-title="Edit Naskah"><i class="bi bi-pencil-square"></i></button>`;
                    html+=`</td>`;
                    html+=`<td>`;
                        html+=`<button class="btn btn-sm py-0 bg-success text-white rounded-pill" data-aksibytabelnaskah="at_publikasikan" data-shownaskah="${n.idbaris}" data-bs-toggle="tooltip" data-bs-title="Publikasikan!"><i class="bi bi-globe"></i></button>`;
                        if(n.owner){
                            html+=`<button class="btn btn-sm py-0 bg-danger text-white rounded-pill" data-aksibytabelnaskah="at_hapus" data-shownaskah="${n.idbaris}" data-bs-toggle="tooltip" data-bs-title="Hapus"><i class="bi bi-trash"></i></button>`;
                        }
                    html+=`</td>`;
                    html+=`<td>`;
                        if(n.datamateri.length>0){
                            html+=`<table class="w3-table-all font8">`;
                                html+=`<thead>`;
                                    html+=`<tr>`;
                                        html+=`<th>No</th>`
                                        html+=`<th>Kelas</th>`
                                        html+=`<th>Tanggal</th>`
                                        html+=`<th>Edit</th>`
                                    html+=`</tr>`;
                                html+=`</thead>`;
                                html+=`<tbody>`;
                                    n.datamateri.forEach((m,iM)=>{
                                        html+=`<tr>`;
                                            html+=`<td>${iM+1}</td>`;
                                            html+=`<td>${m.arraykelas}</td>`;
                                            html+=`<td>${new Date(m.idtgl).toLocaleString('id-ID',{dateStyle:'full',timeStyle:'long'})}</td>`;
                                            html+=`<td>`;
                                            html+=`<button class="btn btn-sm py-0 bg-info rounded-pill" data-aksibytabelnaskah="at_editpublikasi" data-shownaskahkbm="${m.idbaris}" data-shownaskah="${n.idbaris}" data-bs-toggle="tooltip" data-bs-title="Edit Publikasi"><i class="bi bi-pen-fill"></i></button>`;
                                            html+=`</td>`;
                                        html+=`</tr>`;
                                    })
                                html+=`</tbody>`;
                            html+=`</table>`;
                        }else{
                            html+=`Belum Pernah dipublikasikan`;
                        }
                    html+=`</td>`;
                html+=`</tr>`   
            })
                
            
            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;
    return html;
}
const tagihanUlanganAplikasi = (data)=>{
    let tagihansemester = '';
        let tagihansemesterkurtilas = '';
        let tagihanUS = '';
        let html ="";
        if(data.semester==1){
            tagihansemester = `<div class="form-check">
                                    <input class="form-check-input" type="radio" name="jenistagihan" id="naskah_pas" value="PAS">
                                    <label class="form-check-label" for="naskah_pas">SAS (semester 1)</label>
                                </div>`;
            tagihansemesterkurtilas = `<div class="form-check">
                                            <input class="form-check-input" type="radio" name="jenistagihan" id="naskah_pas" value="PAS">
                                            <label class="form-check-label" for="naskah_pas">PAS (semester 1)</label>
                                        </div>`
        }else{
            tagihansemester = `<div class="form-check">
                                    <input class="form-check-input" type="radio" name="jenistagihan" id="naskah_pak" value="PAK">
                                    <label class="form-check-label" for="naskah_pak">SAT (semester 2)</label>
                                </div>`;
            tagihansemesterkurtilas = `<div class="form-check">
                                            <input class="form-check-input" type="radio" name="jenistagihan" id="naskah_pak" value="PAK">
                                            <label class="form-check-label" for="naskah_pak">PAK/UKK (semester 2)</label>
                                        </div>`;
            tagihanUS = `<div class="form-check">
                            <input class="form-check-input" type="radio" name="jenistagihan" id="naskah_ustertulis" value="ustertulis">
                            <label class="form-check-label" for="naskah_ustertulis">Ujian Sekolah (Tertulis)</label>
                        </div><div class="form-check">
                            <input class="form-check-input" type="radio" name="jenistagihan" id="naskah_uspraktek" value="uspraktek">
                            <label class="form-check-label" for="naskah_ustertulis">Ujian Praktek (Kelas 6)</label>
                        </div>`;
        }
        if(data.idkurikulum == 'kurmer'){
            html+=`<div class="form-check">
                        <input class="form-check-input" type="radio" name="jenistagihan" id="naskah_ph" value="PH">
                        <label class="form-check-label" for="naskah_ph">Penilaian Harian</label>
                    </div><div class="form-check">
                        <input class="form-check-input" type="radio" name="jenistagihan" id="naskah_pts" value="PTS">
                        <label class="form-check-label" for="naskah_pts">STS</label>
                    </div>
                    ${tagihansemester}
                    ${tagihanUS}`;
        }else{
            html+=`<div class="form-check">
                        <input class="form-check-input" type="radio" name="jenistagihan" id="naskah_ph" value="PH">
                        <label class="form-check-label" for="naskah_ph">Penilaian Harian</label>
                    </div><div class="form-check">
                        <input class="form-check-input" type="radio" name="jenistagihan" id="naskah_pts" value="PTS">
                        <label class="form-check-label" for="naskah_pts">PTS</label>
                    </div>
                    ${tagihansemesterkurtilas}
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="jenistagihan" id="naskah_kpraktek" value="kpraktik">
                        <label class="form-check-label" for="naskah_kpraktek">Praktek (K-13)</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="jenistagihan" id="naskah_kproyek" value="kproyek">
                        <label class="form-check-label" for="naskah_kproyek">Proyek (K-13)</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="jenistagihan" id="naskah_kproduk" value="kproduk">
                        <label class="form-check-label" for="naskah_kproduk">Produk (K-13)</label>
                    </div>${tagihanUS}`;
        }
        return html;
}
const accordionPublikasi = (data)=>{
    let previewsoal = data.html;
    let ket = data.html_kuncijawaban;
    let definekd = "koleksi KD"
    let html="";
    html+=`<div class="accordion" id="accordionExample">`;
        html+=`
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button accord-bg" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                Preview Soal di Siswa
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body" id="previewHTMLShow">${previewsoal}</div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button accord-bg" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Validasi Property Naskah (KD/TP dan Kunci Jawaban)
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body" id="previewpropertyHTMLShow">${ket} <div class="font8">${definekd}</div></div>
            </div>
        </div>`
    html+=`</div>`
    return html;
}
const viewPelaksanaanTimer = (data)=>{
    let html = "";
    html+=`<div class="form-floating mb-3">
                    <input type="datetime-local" class="form-control" id="idtgl" value="${data.pelaksanaan.start_waktu}" placeholder="Waktu Mulai">
                    <label for="idtgl">Waktu Mulai</label>
                    </div>`;
            html+=`<div class="form-floating mb-3">
                    <input type="datetime-local" class="form-control" id="idtglend" value="${data.pelaksanaan.end_waktu}" placeholder="Waktu Mulai">
                    <label for="idtglend">Waktu Akhir</label>
                </div>`;
            html+=`<div class="form-floating mb-3">
                    <input type="number" class="form-control" id="iddurasi" value="${data.pelaksanaan.durasi}" placeholder="Durasi (Menit)">
                    <label for="iddurasi">Durasi Siswa Mengerjakan (Menit dan Otomatis terisi)</label>
                </div>`;
            html+=`<input type="text" class="form-control" id="crtToken" value="${data.pelaksanaan.crtToken}" placeholder="Token Soal" disabled>`;
            
    return html;
}
const checkboxPilihKelas = (data)=>{
    let html ="";
    const arrayRombel = data.arrayRombel;
        html+=`<div class="form-check">
                    <input class="form-check-input" type="radio" name="koleksiarraykelas" value="${arrayRombel.join(',')}" id="arraykelas" checked>
                    <label class="form-check-label" for="arraykelas">Semua Rombel</label>
                </div>`;
        html+=`<div class="form-check">
                <input class="form-check-input" type="radio" name="koleksiarraykelas" value="" id="arraykelasNull">
                <label class="form-check-label" for="arraykelasNull">Rombel berikut:</label>`;
                for(let i = 0 ; i <arrayRombel.length ; i++){
                    html+=`<div class="form-check">
                            <input class="form-check-input" type="checkbox" name="rombeltertentu" value="${arrayRombel[i]}" id="arraykelas${i}"  disabled>
                            <label class="form-check-label" for="arraykelas${i}">${arrayRombel[i]}</label>
                        </div>`;
                }
            html+=`</div>`;
    return html;

}
const viewPublikasikan = (data)=>{
    let html="";
    
    html+=`<h3 class="text-center">Data Publikasi</h3>`;
    html+=`<p class="font8 border p-2">Anda akan mempublikasikan Desain Naskah Soal ini untuk dapat diakses oleh Siswa Anda. Artinya Siswa Anda dapat mengerjakan naskah soal ini dan mendapatkan hasil pengerjaan siswa Anda di database nilai.<br>Data-data berikut akan terbaca di elamaso-edurasa versi siswa dan proses pengoreksian Anda</p>`;
    
    html+=`<div class="row shadow-lg w3-small">`;
        html+=`<div class="col-md-12 border border-1 rounded">`;
            html+=`<p class="font10">Identitas Naskah yang ditampilkan:</p>`;

            html+=`<div class="form-floating">
                    <input type="text" class="form-control" id="idmapel" value="${data.judulnaskah}" placeholder="Identitas Naskah e-Lamaso">
                    <label for="idmapel">Identitas Naskah e-Lamaso</label>
                    </div>`;
            html+=`<p class="font8"><i>by default (bawaan)</i> Identitas naskah diambil dari <b>KOP/Judul Desain + Nama Mapel + Tanggal Mulai Pelaksanaan</b>, Ketika Anda mengedit identitas di atas, Anda Sebenarnya sedang menunjukkan identitas materi yang akan tampil di siswa.</p>`;
        html+=`</div>`;
        
        html+=`<div class="col-md-6 border border-1 rounded">Elemen Naskah:`;
            html+=`<p class="font10 border container">Desain Naskah ini memuat elemen naskah seperti KOP, Identitas soal, Petunjuk Umum, dan/atau Sebaran KD/ATP. Untuk dipublikasikan secara daring (online), elemen-elemen tersebut mungkin  saja tidak perlu ditampilkan untuk menghemat bandwidth/kuota di HP siswa namun itu dapat Anda atur untuk ditampilkan atau tidak. Silakan beri ceklis mana saja elemen berikut untuk ditampilkan secara online di HP siswa</p>`;
            if(data.ketersediaan.length>0){
                data.ketersediaan.forEach(n=>{
                    html+=`<div class="form-check form-switch"> <input class="form-check-input" type="checkbox" role="switch" id="${n.id}" name="elemensoal" value="${n.value}" checked> <label class="form-check-label" for="${n.id}">${n.label}</label> </div>`;
                    if(n.value=='kop'){
                        html+=`<div class="form-floating">
                            <input type="text" class="form-control" id="kopAtas" value="${data.kop}" placeholder="KOP">
                            <label for="kopAtas">KOP Atas</label>
                            </div>`;
                    }
                })
            }else{
                html+=`<div class="border rounded container">Desain Naskah soal ini tidak memiliki elemen naskah selain soal saja</div>`;
            }
        html+=`</div>`;
        html+=`<div class="col-md-6 border border-1 rounded">Pelaksanaan:`;
            html+=viewPelaksanaanTimer(data);
            html+=`<textarea class="form-control" id="preview_kuncikd" placeholder="Objek KD" disabled>${data.kuncikd}</textarea>`
                
        html+=`</div>`;

        html+=`<div class="col-md-6 border border-1 rounded">Jenis Tagihan:`;
            html+=tagihanUlanganAplikasi(data);
        html+=`</div>`;
        html+=`<div class="col-md-6 border border-1">`;
        
            html+=`<div class="border rounded px-1">`
                    html+=`Dipublikasikan untuk:`;
                    // const copyjenjang = Object.assign({},jenjangRombel)
                    // const arrayRombel = copyjenjang[jenjang];
                    html+=checkboxPilihKelas(data)
                html+=`</div>`;
            html+=`</div>`;
            html+=`<div class="col-md-12">`;
                html+=`<div class="form-floating d-none">
                            <textarea class="form-control" placeholder="HTML SOAL" id="htmlsoal">${data.html}\r\n\r\n\r\n\r\n\r\n${data.kuncipg}\r\n${data.stringkuncikd}</textarea>
                            <label for="htmlsoal">HTML SOAL</label>
                        </div>`
            html+=`</div>`;
        html+=`</div>`;
        html+=accordionPublikasi(data);
    html+=`</div>`
    return html;
}
const viewTabelKunciJawabanPraPublikasi = (data,kurikulum)=>{
    
    let html = "";
    html+=`<table class="table table-sm table-bordered border-dark font10">`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th class="text-center align-middle text-bg-secondary" style="width:20px">No. Urut</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary" style="width:20px">No. Soal</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary">Mata Pelajaran</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary">${kurikulum=='kurmer'?'ATP':'KD'}</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary">Kunci jawaban, penskoran, atau pembahasan</th>`;
            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;
            data.forEach((n,i)=>{
                html+=`<tr>`;
                    html+=`<td class="text-center">${i+1}</td>`;
                    html+=`<td class="text-center">${n.nosoal}</td>`;
                    html+=`<td class="text-center">${n.kodemapel}</td>`;
                    html+=`<td class="text-center">${kurikulum=='kurmer'?n.propertikurikulum.idbaris:n.propertikurikulum.kd3+'<hr class="m-0 p-0"/>'+n.propertikurikulum.kd4}</td>`;
                    html+=`<td>`
                        if(n.bentuksoal == 'Pilihan Ganda'){
                            html+='<b>Kunci Jawaban</b>:<br>'
                            html+=n.itemsoal.kuncijawaban;
                            html+=`<hr/>`
                        }
                        html+=`<b>Pembahasan/penskoran</b>:<br/>`;
                        html+=n.itemsoal.penskoran;
                    html+=`</td>`
                html+=`</tr>`;
            })
        html+=`</tbody>`;
    html+=`</table>`;
    return html;
}
const viewEditPublikasiKbm  = (data)=>{
    let menu = [
        {
            id:'tabmodal_menu',
            title_tab:'Identitas Materi KBM',
            body_html: cardMenu2('Edit Judul Materi KBM',`<div class="form-floating">
            <input type="text" class="form-control" id="idmapel" value="${data.idmapel}" placeholder="Identitas Naskah e-Lamaso">
            <label for="idmapel">Identitas Naskah e-Lamaso</label>
            </div>`,false),
        },
        {
            id:'tabmodal_menu1',
            title_tab:'Pelaksanaan dan Jenis Tagihan',
            body_html:rowCols.rowCols2(
                cardMenu2('Edit Waktu Pelaksanaan KBM',viewPelaksanaanTimer(data),false),
                cardMenu2('Jenis Tagihan',tagihanUlanganAplikasi(data),false)
            )
        },
        {
            id:'tabmodal_menu3',
            title_tab:'Publikasi dan Simpan',
            body_html:rowCols.rowCols2(
                cardMenu2('Dilaksanakan di Kelas',checkboxPilihKelas(data),false),
                cardMenu2('Aksi Server',`<div class="text-center">Jika Anda ingin menghapus publikasinya:<br><button class="btn btn-sm text-bg-danger" id="btnServerHapustPublikasi"><i class="bi bi-trash"></i></button><hr><button class="btn btn-sm border-bottom border-5 border-primary neon-lite-top border-top-0 border-start-0 border-end-0 rounded-pill rounded" id="btnServerEditPublikasi">Simpan Perubahan</button></div>`,false)
            )
        },
        
    ];
    let menus =  tabs.MenuTab(menu);

    return tabs.wraperMainControl(menus);
}
const viewModal = (htmlapi)=>{
    let html = '';
    html+=`<div id="print-area-modal">`;
        html+=htmlapi;
    html+='</div>';

    
    html+=`<div class="fixed-bottom text-center mb-3">`;
        html +=`<button id="btncetaknaskah" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Cetak"><i class="bi-printer"></i></button>`;
        html +=`<button id="btncetakword" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Simpan ke Ms. Word"><i class="bi-file-word"></i></button>`
        html +=`<button id="btncetakpdf" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Simpan ke pdf"><i class="bi-file-pdf"></i></button>`
    html+=`</div>`;
    return html;
}
const viewArsipNaskah ={
    'toolbar':toolbar,
    'htmlTabelNaskah':htmlTabelNaskah,
    'viewModal':viewModal,
    'viewPublikasikan':viewPublikasikan,
    'viewTabelKunciJawabanPraPublikasi':viewTabelKunciJawabanPraPublikasi,
    'viewEditPublikasiKbm':viewEditPublikasiKbm
}
export default viewArsipNaskah;