/** @deprecated */
export default class DesainNaskahSoalController{
    #jenjang;
    #hapus
    constructor(arsipnaskah){
        /** ormArsipNaskah / orm tab Simpandesainsoal */
        this.arsipnaskah = arsipnaskah;
        this.#hapus = '';
        this.instansiasi = null;
    }
    selectJenjang(jenjang){
        this.#jenjang = jenjang;
        return this;

    }
    showHapus(bolean){
        if(bolean){
            this.#hapus = 'hapus';
        }else{
            this.#hapus = "";
        }
        return this;
    }
    renderTable(dom=document.getElementById('printarea')){
        const data = this.arsipnaskah.simpleFilter({'jenjang':this.#jenjang,'hapus':this.#hapus}).data; 
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
                                html+=`<button class="btn btn-sm py-0 bg-success text-white rounded-pill" data-aksibytabelnaskah="at_publikasikan" data-shownaskah="${n.idbaris}" data-bs-toggle="tooltip" data-bs-title="Publikasikan!"><i class="bi bi-globe"></i></button>`;
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
                                                html+=`<th>Kelas</th>`
                                                html+=`<th>Tanggal</th>`
                                                html+=`<th>Edit</th>`
                                            html+=`</tr>`;
                                        html+=`</thead>`;
                                        html+=`<tbody>`;
                                        n.materi.data.forEach((m,iM)=>{
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
                    });

                }
                    
                
                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;

        
        dom.innerHTML = html;
        this.init();
        return this;
    }
    instansiasiClass(instansiasi){
        this.instansiasi =instansiasi;
        return this;
    }
    eventKlik(){
        const btns = document.querySelectorAll('[data-aksibytabelnaskah]');
        btns.forEach(btn=>{
            btn.onclick = ()=>{
                let namaMethod = btn.getAttribute('data-aksibytabelnaskah') ;
                let iddesainnaskah = btn.dataset['shownaskah'];
                let hasIdKbmElemen = btn.dataset['shownaskahkbm']??false;
                let objDesainNaskah = this.arsipnaskah.simpleFilter({'idbaris':iddesainnaskah}).data[0];
                let arrayKbm = objDesainNaskah.materi.simpleFilter({'idbaris':hasIdKbmElemen}).data;
                
                let test = { aksi                   : namaMethod,
                                idsimpandesainsoal  : btn.dataset['shownaskah']??false,
                                idkbm               : btn.dataset['shownaskahkbm']??false,
                                desainnaskahsoal    : objDesainNaskah,
                                arrayKbm            : arrayKbm
                            };
                this.callback(test);
            }
        })
    }
    init(){
        
        const {tooltip} = this.instansiasi;
        tooltip();
        this.eventKlik();
    }
    runtime(cb){
        this.callback = cb;
        return this;
    }
}