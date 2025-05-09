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

const viewModalExportImport = (htmlapi,btnsave=true)=>{
    let html = '';
    html+=`<div id="print-area-modal">`;
        html+=htmlapi;
    html+='</div>';

    
    html+=`<div class="fixed-bottom text-center mb-3">`;
    
        // html +=`<button id="btnback" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Kembali"><i class="bi-arrow-return-left"></i> Kembali</button>`;
        html +=`<button id="btncetaknaskah" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Cetak"><i class="bi-printer"></i> Cetak</button>`;
        html +=`<button id="btncetakword" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Simpan ke Ms. Word"><i class="bi-file-word"></i> Ms. Word</button>`;
        html +=`<button id="btncetakpdf" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Simpan ke pdf"><i class="bi-file-pdf"></i> Pdf</button>`;

        if(btnsave){
            html +=`<button id="btnExportKoreksian" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 bg-color1 rounded-pill rounded py-0" title="Export Ke Ms.Excel"><i class="bi-file-excel"></i> Export</button>`;
            html +=`<label for="importModal" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 anim-bg-gradient rounded-pill rounded py-0" title="Import dari File Export"><i class="bi-file-excel"></i> Import</label>`;
            html +=`<button id="btnSaveKoreksian" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-transisi-unscrolled rounded-pill rounded py-0" title="Simpan ke pdf"><i class="bi-floppy"></i> Simpan Server</button>`;
            // html+=`<label class="btn btn-sm border-bottom border-5 border-dark border-top-0 border-start-0 border-end-0 text-bg-success rounded-pill" for="importModal">Import</label>`;
            html+=`<input type="file" class="d-none" id="importModal" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>`
    
            // html +=`<button id="btnPreviewLJK" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-transisi-unscrolled rounded-pill rounded py-0" title="Preview LJK Update"><i class="bi-floppy"></i> Preview LJK</button>`;
        }

    html+=`</div>`;
    return html;
}
const tabelModalImport = (identitas, data)=>{
    const {objek_mapelkd} = identitas;
    let html ="";
    html+=`<div class="table-responsive">`;
        html+=`<table class="table table-sm table-bordered border-dark font10 exportimport">`;
            html+=`<thead>`;
                html+=`<tr>`; 
                    html+=`<th class="text-center  border-white text-bg-secondary align-middle" style="width:20px">No</th>
                            <th class="text-center border-white text-bg-secondary align-middle">Nama Siswa</th>
                            <th class="text-center border-white text-bg-secondary align-middle">Kelas</th>
                            <th class="text-center border-white text-bg-secondary align-middle">Jenis Tagihan</th>
                            <th class="text-center border-white text-bg-secondary align-middle">Token Siswa</th>`;
                    objek_mapelkd.forEach(n=>{
                        html+=`<th class="text-center border-white text-bg-secondary align-middle">${n.mapel}<br>${n.kd}</th>`;
                    })
                html+=`</tr>`;
            html+=`</thead>`;
            html+=`<tbody>`;
            data.forEach((n,i)=>{
                html+=`<tr>`;
                    html+=`<td class="text-center" data-key="id">${i+1}</td>`;
                    html+=`<td class="text-nowrap" data-import="namasiswa" data-key="namasiswa">${n.pd_nama}</td>`;
                    html+=`<td class="text-center" data-import="idkelas" data-key="idkelas">${n.nama_rombel}</td>`;
                    html+=`<td class="text-center" data-import="jenistagihan" data-key="jenistagihan">${n.jenistagihan}</td>`;
                    html+=`<td class="text-center" data-import="tokensiswa" data-key="tokensiswa">${n.id}</td>`;
                    let kuncikd = n.datakey_keytagihan;
                    kuncikd.forEach(m=>{
                        html+=`<td class="p-0">`;
                            html+=`<input data-import="${m.key_tagihan}" data-key="${m.key_tagihan}" value="${m.skornilai}" class="form-control font8 bg-transparent m-0 border-0 text-center" type="number"/>`;
                        html+=`</td>`;
                    })
                html+=`</tr>`;
            })
            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;
    return html;
}
const viewTabelImport = (identitas,data)=>{
    let html = "";
    html+=tabelIdentitasModal(identitas);
    html+=tabelModalImport(identitas,data);
    return html;
}
const viewUploadCsv = {
    'viewTabelImport':viewTabelImport,
    'viewModalExportImport':viewModalExportImport
}
export default viewUploadCsv;