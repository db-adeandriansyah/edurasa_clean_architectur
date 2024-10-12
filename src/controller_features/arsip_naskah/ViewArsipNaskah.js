
import rowCols from "../../views/components/row-cols";
import { cardMenu2 } from "../../views/sidebar/cardSidebar";
import tabs from "../../views/tabs/tab";

const viewPelaksanaanTimer = (data)=>{
    let html = "";
    html+=`<div class="form-floating mb-3">
                    <input type="datetime-local" class="form-control" data-keynaskah="idtgl" id="idtgl" value="${data.pelaksanaan.start_waktu}" placeholder="Waktu Mulai">
                    <label for="idtgl">Waktu Mulai</label>
                    </div>`;
            html+=`<div class="form-floating mb-3">
                    <input type="datetime-local" class="form-control" data-keynaskah="idtglend" id="idtglend" value="${data.pelaksanaan.end_waktu}" placeholder="Waktu Mulai">
                    <label for="idtglend">Waktu Akhir</label>
                </div>`;
            html+=`<div class="form-floating mb-3">
                    <input type="number" class="form-control" data-keynaskah="iddurasi" id="iddurasi" value="${data.pelaksanaan.durasi}" placeholder="Durasi (Menit)">
                    <label for="iddurasi">Durasi Siswa Mengerjakan (Menit dan Otomatis terisi)</label>
                </div>`;
            html+=`<input type="text" class="form-control" data-keynaskah="crtToken" id="crtToken" value="${data.pelaksanaan.crtToken}" placeholder="Token Soal" disabled>`;
            
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

const tagihanUlanganAplikasi = (data)=>{
    let tagihansemester = '';
        let tagihansemesterkurtilas = '';
        let tagihanUS = '';
        let html ="";
        if(data.semester==1){
            tagihansemester = `<div class="form-check">
                                    <input class="form-check-input" type="radio" data-keynaskah="jenistagihan" name="jenistagihan" id="naskah_pas" value="PAS">
                                    <label class="form-check-label" for="naskah_pas">SAS (semester 1)</label>
                                </div>`;
            tagihansemesterkurtilas = `<div class="form-check">
                                            <input class="form-check-input" type="radio" name="jenistagihan" id="naskah_pas" value="PAS">
                                            <label class="form-check-label" for="naskah_pas">PAS (semester 1)</label>
                                        </div>`
        }else{
            tagihansemester = `<div class="form-check">
                                    <input class="form-check-input" type="radio" data-keynaskah="jenistagihan" name="jenistagihan" id="naskah_pak" value="PAK">
                                    <label class="form-check-label" for="naskah_pak">SAT (semester 2)</label>
                                </div>`;
            tagihansemesterkurtilas = `<div class="form-check">
                                            <input class="form-check-input" type="radio" name="jenistagihan" id="naskah_pak" value="PAK">
                                            <label class="form-check-label" for="naskah_pak">PAK/UKK (semester 2)</label>
                                        </div>`;
            tagihanUS = `<div class="form-check">
                            <input class="form-check-input" type="radio" data-keynaskah="jenistagihan" name="jenistagihan" id="naskah_ustertulis" value="ustertulis">
                            <label class="form-check-label" for="naskah_ustertulis">Ujian Sekolah (Tertulis)</label>
                        </div><div class="form-check">
                            <input class="form-check-input" type="radio" data-keynaskah="jenistagihan" name="jenistagihan" id="naskah_uspraktek" value="uspraktek">
                            <label class="form-check-label" for="naskah_ustertulis">Ujian Praktek (Kelas 6)</label>
                        </div>`;
        }
        if(data.idkurikulum == 'kurmer'){
            html+=`<div class="form-check">
                        <input class="form-check-input" type="radio" data-keynaskah="jenistagihan" name="jenistagihan" id="naskah_ph" value="PH">
                        <label class="form-check-label" for="naskah_ph">Penilaian Harian</label>
                    </div><div class="form-check">
                        <input class="form-check-input" type="radio" data-keynaskah="jenistagihan" name="jenistagihan" id="naskah_pts" value="PTS">
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
const ketersediaanNaskah = (data)=>{
    let html = ""
        html+=`<p class="font10 border container">Desain Naskah ini memuat elemen naskah seperti KOP, Identitas soal, Petunjuk Umum, dan/atau Sebaran KD/ATP. Untuk dipublikasikan secara daring (online), elemen-elemen tersebut mungkin  saja tidak perlu ditampilkan untuk menghemat bandwidth/kuota di HP siswa namun itu dapat Anda atur untuk ditampilkan atau tidak. Silakan beri ceklis mana saja elemen berikut untuk ditampilkan secara online di HP siswa</p>`;
        if(data.ketersediaan.length>0){
            data.ketersediaan.forEach(n=>{
                html+=`<div class="form-check form-switch"> <input class="form-check-input" type="checkbox" role="switch" data-createhtml="naskah_${n.value}" id="${n.id}" name="elemensoal" value="${n.value}" checked> <label class="form-check-label" for="${n.id}">${n.label}</label> </div>`;
                if(n.value=='kop'){
                    html+=`<div class="form-floating">
                        <input type="text" class="form-control" data-createhtml="kopAtas" id="kopAtas" value="${data.kop}" placeholder="KOP">
                        <label for="kopAtas">KOP Atas</label>
                        </div>`;
                }
            })
        }else{
            html+=`<div class="border rounded container">Desain Naskah soal ini tidak memiliki elemen naskah selain soal saja</div>`;
        }
        return html;
}

const tableAtpForAccordion = (data)=>{
    let html ="";
    html+=`<table class="table table-bordered table-sm lh-sm">`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th class="text-center align-middle text-bg-secondary">Mapel</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary">Kode ATP</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary">Properti Kurikulum</th>`;
                html+=`<th class="text-center align-middle text-bg-secondary">Jumlah Soal</th>`;
            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;
            data.properti_kurikulum.forEach(n=>{
                html+=`<tr>`;
                    let data = n.data ;
                    let atr =  data.length>1?` rowspan="${data.length}"`:'';
                    data
                    html+=`<td${atr}>${n.tekskodemapel}</td>`;
                    data.forEach((el,i)=>{
                        html+=`<td>`;
                            html+=el.objekproperti.idbaris;
                        html+=`</td>`;
                        html+=`<td>`;
                            html+=`<b><u>`
                            html+=el.objekproperti.elemen;
                            html+=`</b></u><br>`;
                            
                            html+=el.objekproperti.atp;
                            
                        html+=`</td>`;
                        html+=`<td>`;
                            html+=el.totalsoalkdcp;
                        html+=`</td>`;
                        if(i<data.length-1){
                            html+=`</tr><tr>`;
                        }
                    })
                html+=`</tr>`;
            })
        html+=`</tbody>`;
    html+=`</table>`;
    return html;
}
const accordionPublikasi = (data)=>{
    let previewsoal = data.html;
    let ket = data.html_kuncijawaban;
    let definekd = tableAtpForAccordion(data);
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
                <div class="accordion-body" id="previewpropertyHTMLShow"><div class="font8">${definekd}</div>${ket} </div>
            </div>
        </div>`
    html+=`</div>`
    return html;
}
export default class ViewArsipNaskah{
    constructor(){

    }

    /**
     * 
     * @param {*} data  berasal dari OrmArsipNaskah
     * @returns 
     */
    static tableArsipNaskah(data){
        let html =""
        html+=`<div class="table-responsive">`;
            html+=`<table class="table table-sm table-bordered font10 border-dark">`;
                html+=`<thead>`;
                    html+=`<tr>`;
                        html+=`<th class="text-center align-middle bg-secondary-subtle text-dark">No.</th>`;
                        html+=`<th class="text-center align-middle bg-secondary-subtle text-dark">Judul</th>`;
                        html+=`<th class="text-center align-middle bg-secondary-subtle text-dark">Kelas</th>`;
                        html+=`<th class="text-center align-middle bg-secondary-subtle text-dark">Penyusun</th>`;
                        html+=`<th class="text-center align-middle bg-secondary-subtle text-dark">Tanggal Naskah</th>`;
                        html+=`<th class="text-center align-middle bg-secondary-subtle text-dark">Pratinjau</th>`;
                        html+=`<th class="text-center align-middle bg-secondary-subtle text-dark">Publikasi</th>`;
                        html+=`<th class="text-center align-middle bg-secondary-subtle text-dark">Riwayat Publikasi</th>`;
                    html+=`</tr>`;
                html+=`</thead>`;
                html+=`<tbody>`;
                if(data.length == 0){
                    html+=`<tr><td colspan="8" class="text-center">Belum ada Desain naskah soal di jenjang ini</td></tr>`;
                }else{
                    data.forEach((n,index)=>{
                        html+=`<tr>`
                            html+=`<td class="text-center">${index+1}</td>` ;
                            html+=`<td>${n.juduldesain}</td>` ;
                            html+=`<td class="text-center">${n.jenjang}</td>` ;
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
                                html+=`<button class="btn btn-sm py-0 bg-success text-white rounded-pill" data-aksibytabelnaskah="at_publikasikan" data-shownaskah="${n.idbaris}" data-bs-toggle="tooltip" data-bs-title="Tambah Publikasi!"><i class="bi bi-globe"></i></button>`;
                                if(n.owner){
                                    html+=`<button class="btn btn-sm py-0 bg-danger text-white rounded-pill" data-aksibytabelnaskah="at_hapus" data-shownaskah="${n.idbaris}" data-bs-toggle="tooltip" data-bs-title="Hapus"><i class="bi bi-trash"></i></button>`;
                                }
                            html+=`</td>`;
                            html+=`<td>`;
                                if(n.materi.countData()>0){
                                    html+=`<table class="w3-table-all font8">`;
                                        html+=`<thead>`;
                                            html+=`<tr>`;
                                                html+=`<th>No</th>`
                                                html+=`<th>ID</th>`
                                                html+=`<th>Kelas</th>`
                                                html+=`<th>Tanggal</th>`
                                                html+=`<th>Edit</th>`
                                            html+=`</tr>`;
                                        html+=`</thead>`;
                                        html+=`<tbody>`;
                                        n.materi.data.forEach((m,iM)=>{
                                                html+=`<tr>`;
                                                    html+=`<td>${iM+1}</td>`;
                                                    html+=`<td>${m.idbaris}</td>`;
                                                    html+=`<td>${m.arraykelas}</td>`;
                                                    html+=`<td>${new Date(m.idtgl).toLocaleString('id-ID',{dateStyle:'full',timeStyle:'long'})}</td>`;
                                                    html+=`<td>`;
                                                    html+=`<button class="btn btn-sm py-0 bg-info rounded-pill" data-aksibytabelnaskah="at_editpublikasi" data-shownaskahkbm="${m.idbaris}" data-shownaskah="${n.idbaris}" data-bs-toggle="tooltip" data-bs-title="Edit Publikasi"><i class="bi bi-pen-fill"></i></button>`;
                                                    if(m.owner){
                                                        html+=`<button class="btn btn-sm py-0 bg-danger rounded-pill" data-aksibytabelnaskah="at_hapuspublikasi" data-shownaskahkbm="${m.idbaris}" data-shownaskah="${n.idbaris}" data-bs-toggle="tooltip" data-bs-title="Hapus Publikasi KBM"><i class="bi bi-trash"></i></button>`;
                                                    }

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
                    });

                }
                    
                
                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;
        return html;
    }
    static viewTambahPublikasiKbm(data){
        
        let menu = [
            {
                id:'tabmodal_menu',
                title_tab:'Identitas Materi KBM',
                body_html: cardMenu2('Judul Materi KBM',`<div class="form-floating">
                    <input type="text" class="form-control" data-keynaskah="idmapel" id="idmapel" value="${data.idmapel}" placeholder="Identitas Naskah e-Lamaso">
                    <label for="idmapel">Identitas Naskah e-Lamaso</label>
                    </div>`,false)
            },
            {
                id:'tabmodal_menuketersediaan',
                title_tab:'Preview Naskah',
                body_html:ketersediaanNaskah(data)+accordionPublikasi(data)
            },
            {
                id:'tabmodal_pelaksanaanjenistagihan',
                title_tab:'Pelaksanaan dan Jenis Tagihan',
                body_html:rowCols.rowCols2(
                    cardMenu2('Waktu Pelaksanaan KBM',viewPelaksanaanTimer(data),false),
                    cardMenu2('Jenis Tagihan',tagihanUlanganAplikasi(data),false)
                )
            },
            {
                id:'tabmodal_publikasisimpan',
                title_tab:'Publikasi dan Simpan',
                body_html:rowCols.rowCols2(
                    cardMenu2('Dilaksanakan di Kelas',checkboxPilihKelas(data),false),
                    // cardMenu2('Aksi Server',`<div class="text-center">Jika Anda ingin menghapus publikasi semua kelas yang sedang melaksanakan:<br><button class="btn btn-sm text-bg-danger" id="btnServerHapustPublikasi"><i class="bi bi-trash"></i></button><hr><button class="btn btn-sm border-bottom border-5 border-primary neon-lite-top border-top-0 border-start-0 border-end-0 rounded-pill rounded" id="btnServerEditPublikasi">Simpan Perubahan</button><hr><div class="font8">Gunakan Simpan Perubahan jika Anda hanya ingin menghubah kelas yang mengikuti kbm ini</div></div>`,false)
                    cardMenu2('Aksi Server',`<div class="text-center"><button class="btn btn-sm border-bottom border-5 border-primary neon-lite-top border-top-0 border-start-0 border-end-0 rounded-pill rounded" id="btnServerPublikasi">Publikasikan</button></div>`,false)
                )
            },
            
        ];
        let menus =  tabs.MenuTab(menu);
    
        return tabs.wraperMainControl(menus);
    }
    static viewEditPublikasiKbm(data){
        let menu = [
            {
                id:'tabmodal_menu',
                title_tab:'Identitas Materi KBM',
                body_html: cardMenu2('Edit Judul Materi KBM',`<div class="form-floating">
                <input type="text" class="form-control" data-keynaskah="idmapel" id="idmapel" value="${data.idmapel}" placeholder="Identitas Naskah e-Lamaso">
                <label for="idmapel">Identitas Naskah e-Lamaso</label>
                </div>`,false),
            },
            {
                id:'tabmodal_pelaksanaanjenistagihan',
                title_tab:'Pelaksanaan dan Jenis Tagihan',
                body_html:rowCols.rowCols2(
                    cardMenu2('Edit Waktu Pelaksanaan KBM',viewPelaksanaanTimer(data),false),
                    cardMenu2('Jenis Tagihan',tagihanUlanganAplikasi(data),false)
                )
            },
            {
                id:'tabmodal_publikasisimpan',
                title_tab:'Publikasi dan Simpan',
                body_html:rowCols.rowCols2(
                    cardMenu2('Dilaksanakan di Kelas',checkboxPilihKelas(data),false),
                    cardMenu2('Aksi Server',`<div class="text-center">Jika Anda ingin menghapus publikasi semua kelas yang sedang melaksanakan:<br><button class="btn btn-sm text-bg-danger" id="btnServerHapustPublikasi"><i class="bi bi-trash"></i></button><hr><button class="btn btn-sm border-bottom border-5 border-primary neon-lite-top border-top-0 border-start-0 border-end-0 rounded-pill rounded" id="btnServerEditPublikasi">Simpan Perubahan</button><hr><div class="font8">Gunakan Simpan Perubahan jika Anda hanya ingin menghubah kelas yang mengikuti kbm ini</div></div>`,false)
                )
            },
            
        ];
        let menus =  tabs.MenuTab(menu);
    
        return tabs.wraperMainControl(menus);
    }
    static tabelIdentitasNaskah(data){
        let html = "";
        html+=`<table style="margin-left:auto;margin-right:auto;mso-para-margin-left:auto;mso-para-margin-right:auto;line-height:1rem;mso-line-height-alt:1rem; mso-line-height-rule:exactly;text-align:left !important;margin-bottom:1rem;font-family:TimesNewRoman;"><thead></thead><tbody>
                <tr>
                    <td style="padding:0 8px;border:0;vertical-align:top" contenteditable="true" spellcheck="false">Muatan Pelajaran</td>
                    <td style="width:5px;padding:0 8px;border:0;vertical-align:top">:</td>
                    <td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">${data.mapelidentitas}</td>
                </tr>
                <tr>
                    <td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">Kurikulum</td>
                    <td style="padding:0 8px;border:0">:</td>
                    <td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">${data.namakurikulum}</td>
                </tr>
                <tr>
                    <td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">Kelas</td>
                    <td style="padding:0 8px;border:0">:</td>
                    <td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">${data.kelas}</td>
                </tr>
                <tr>
                    <td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">Hari, Tanggal</td>
                    <td style="padding:0 8px;border:0">:</td>
                    <td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">${data.titimangsa}</td>
                </tr>
                <tr>
                    <td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">Waktu</td>
                    <td style="padding:0 8px;border:0">:</td>
                    <td style="padding:0 8px;border:0" contenteditable="true" spellcheck="false">${data.durasi}</td>
                </tr>
            </tbody>
        </table>
    `
    }
}