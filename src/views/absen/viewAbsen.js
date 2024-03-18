
import inputsElements from "../components/input-elements";
const htmlDenahAbsenApi = (data,kelas,imgguru,absen,iconhadir)=>{
    let days = new Date();
    let m = (days.getMonth()+1).toString().padStart(2,'0');
    let y = days.getFullYear();
    let d = days.getDate();
    let dd = d.toString().padStart(2,'0');
    let keydate = d+''+m+''+y;
    let dateInput = y+'-'+m+'-'+dd;
    let html =`<div class="row pt-3 mb-4 mx-3">`;
            html+=`<div class="col papantulis glow"><p contenteditable="true" spellcheck="false" class="fs-5 mb-0">Daftar Absensi</p>Kelas ${kelas} <p style="font-size:16px;background-color:#A86536;padding:5px">${new Date().toLocaleString('id-ID',{'dateStyle':'full'})}</p></div>`;
            html+=`<div class="col-4 col-md-4 meja-guru d-flex flex-column align-items-center">`;
                html+=`<img src="${imgguru}" width="65" height="70" style="object-fit:cover" class="rounded">`;
                html+=`<p class="text-bg-dark">Guru Kelas</p>`
            html+=`</div>`;
        html+=`</div>`
        html+=`<div class="row g-2 mx-3">`
        for(let i = 0 ; i < data.length ; i++){
                let tokensiswa = data[i].id;
                let fordata = tokensiswa+'_'+keydate;
                let absensiswa = absen.filter(s=> s.tokensiswa == tokensiswa);
                
                if(absensiswa.length>0){
                    
                    if(absensiswa[(absensiswa.length-1)].kehadiran=="Hadir"){
                        html+=`<div class="col-3 col-md-3 w3-tiny meja-siswa d-flex flex-column align-items-center justify-content-between position-relative">`;
                    }else{
                        html+=`<div class="col-3 col-md-3 w3-tiny meja-siswanon d-flex flex-column align-items-center justify-content-between position-relative">`;
                    }

                    if(absensiswa[(absensiswa.length-1)].fileContent==""){
                        html+=`<img data-imgabsen="${fordata}" data-tgl="${dateInput}" data-edit="${absensiswa[(absensiswa.length-1)].idbaris}" class="imgabsensiswa" src="../../img/lamaso.webp" width="40" height="40" style="object-fit:contain">`;
                    }else{
                        html+=`<img data-imgabsen="${fordata}" data-tgl="${dateInput}" data-edit="${absensiswa[(absensiswa.length-1)].idbaris}" class="imgabsensiswa" src="${absensiswa[(absensiswa.length-1)].idfileimg}" width="40" height="40" style="object-fit:contain">`;
                    }
                
                }else{
                    html+=`<div class="col-3 col-md-3 w3-tiny meja-siswa d-flex flex-column align-items-center justify-content-between position-relative">`;
                    html+=`<img data-imgabsen="${fordata}" data-tgl="${dateInput}" data-edit="0" class="imgabsensiswa" src="${iconhadir}" width="40" height="40" style="object-fit:contain">`;
                }
                    html+=`<p class="font10 text-center">${data[i].pd_nama}</p>`;
                    html+=`<div class="overlay" role="button">`;
                    if(absensiswa.length>0){
                        if(absensiswa[(absensiswa.length-1)].fileContent==""){
                            html+=`<img data-imgabsen="${fordata}" data-tgl="${dateInput}" data-edit="${absensiswa[(absensiswa.length-1)].idbaris}" class="imgabsensiswa" src="../../img/lamaso.webp" width="40" height="40" style="object-fit:contain">`;
                        }else{
                            html+=`<img data-imgabsen="${fordata}" data-tgl="${dateInput}" data-edit="${absensiswa[(absensiswa.length-1)].idbaris}" class="imgabsensiswa" src="${absensiswa[(absensiswa.length-1)].idfileimg}" width="70" height="70" style="object-fit:contain">`;
                        }
                        html+=absensiswa[(absensiswa.length-1)].kehadiran;
                    }else{
                        html+=`<img data-imgabsen="${fordata}" data-tgl="${dateInput}" data-edit="0" class="imgabsensiswa" src="${iconhadir}" width="70" height="70"  style="object-fit:contain">`;
                        html+=`Hadir (by Default)`;
                    }

                    html+=`</div>`;
                html+=`</div>`;
            
        }
        html+=`</div>`;
    return html;
}
const koleksiBulanAbsen = (data) =>{
    const {judul,arrayBulan, deskripsi,idSelectPilihBulan,tglValuePertama,modeCheckmark} = data;
    let elemenselect = inputsElements.floatingSelect(idSelectPilihBulan,judul,arrayBulan,tglValuePertama);
    let modeTampilan = modeSabtuLibur(modeCheckmark)
    return `<div class="rounded blur p-3 m-2 text-center"> <h3 class="text-center mb-0">${judul}</h3> <p class="mt-0 p-0 mb-3">${deskripsi}</p> <div class="col-md-5 mx-auto">${elemenselect}</div>${modeTampilan}</div>`; 
};
const modeCheckmark = ()=>`<div class="form-check form-switch"> <input class="form-check-input" type="checkbox" role="switch" id="switchmarked"> <label class="form-check-label" for="switchmarked">Mode Marked</label> </div>`

const modeSabtuLibur = (withMarked=true)=>{
    return `<div class="row my-3 rounded-pill justify-content-center" id="propertiesbulanini">
                <div class="col-md-3 border rounded accord-bg">
                    <div class="input-group">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="switchsabtu">
                            <label class="form-check-label" for="switchsabtu">Hari Sabtu Libur</label>
                        </div>
                        ${withMarked?modeCheckmark():""}
                    </div>
                </div>
            </div>`;
}

const viewModalFormulirAbsen = (data)=>{
    const {currentSrcImg,siswa,modeedit,dataabsen} =data
    let html = "";
    html+=`<div class="row">`;
        html+=`<div class="col-md-4 text-center border-end">`;
            html+=`<img id="gambarpreview" src="${currentSrcImg}" width="200" height="235" style="object-fit: contain">`;
            html+=`<h4 class="text-center fs-5">${siswa.pd_nama}</h4>`;
        html+=`</div>`;
        html+=`<div class="col-md-4 border-end">`;
            if(modeedit){
                html+=`<p>Kehadiran Sudah Terisi</p>`;
                    html+=`<table class="table table-striped w3-tiny">`;
                        html+=`<tr>`;
                            html+=`<td>Id</td><td>: ${dataabsen.idbaris}</td></tr><tr>`;
                            html+=`<td>Hari dan Tanggal</td><td>: ${new Date(dataabsen.Time_Stamp).toLocaleString('id-ID',{'dateStyle':'full'})}</td></tr><tr>`;
                            html+=`<td>Waktu</td><td>: Pukul ${new Date(dataabsen.Time_Stamp).toLocaleString('id-ID',{'timeStyle':'medium'})} WIB</td></tr><tr>`;
                            html+=`<td>Keterangan</td><td>: ${dataabsen.kehadiran}</td></tr><tr>`;
                            html+=`<td>Oleh</td><td>: ${dataabsen.action=="siswaabsensiswa"?"Siswa Sendiri":"Guru"}</td></tr><tr>`;
                        html+=`</tr>`;
                    html+=`</table>`;
            }else{
                html+=`<p>Kehadiran dianggap Hadir</p>`
            }
        html+=`</div>`;
        html+=`<div class="col-md-4">`;
        let AbsensiException =['Hadir','Ijin','Sakit','Alpa'];//.filter(s=> s!==dataabsen.kehadiran);
            
            html+=`Ubah Presensi Kehadiran:<br>`;
            for(let i = 0 ; i < AbsensiException.length;i++){
                html+=`<div class="form-check form-check-sm">
                    <input class="form-check-input" type="radio" name="kehadiran" id="kehadiran${i}" value="${AbsensiException[i]}" ${(!dataabsen.kehadiran)&& AbsensiException[i]=='Hadir'?'checked':(dataabsen.kehadiran==AbsensiException[i])?'checked':''}>
                    <label class="form-check-label" for="kehadiran${i}">${AbsensiException[i]} ${(!dataabsen.kehadiran)&& AbsensiException[i]=='Hadir'?'by Default':''}
                    </label>
                </div>`;
            };
            // html+=`<div class="form-check form-switch">
            //             <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckFormulirAbsen">
            //             <label class="form-check-label" for="flexSwitchCheckFormulirAbsen">Ganti Poto</label>
            // <button id="hapuslabelUpload" class="btn btn-sm py-0 btn-danger rounded-pill border-warning border-start-0 border-end-0 border-top-0 border-bottom border-4"><i class="bi-trash"></i> Hapus</button>
            //         </div>`;
            html+=`<div class="border-top my-1 pt-2">
                        <div class="d-flex justify-content-center mb-1">
                            <label for="uploadpoto" id="labelUpload" class="btn btn-sm py-0 btn-info rounded-pill border-danger border-start-0 border-end-0 border-top-0 border-bottom border-4"><i class="bi-camera"></i> Ganti Poto</label>
                        </div>
                            <input type="file" data-idtoken="${siswa.id}" class="d-none" id="uploadpoto" accept="image/*" capture="environment">
                            <input id="idFileUpload" placeholder="id File Upload" value="${dataabsen.fileContent??''}" type="text" class="form-control font10" disabled>   
                            </div>`;
            html+=`<div class="border-top my-3 pt-2 d-flex justify-content-evenly px-1">
                    <button id="simpanPerubahan" class="btn btn-sm py-0 btn-success rounded-pill border-info border-start-0 border-end-0 border-top-0 border-bottom border-4"><i class="bi-floppy"></i> Simpan</button>
                    <button id="batal"  data-bs-dismiss="modal" aria-label="Close" class="btn btn-sm btn-closes py-0 btn-danger rounded-pill border-success border-start-0 border-end-0 border-top-0 border-bottom border-4"><i class="bi-x-square"></i> Batal</button>
                    
            </div>`;
        html+=`</div>`;
    html+=`</div>`;
    return html;
}
const htmlAbsen = {
    'htmlDenahAbsenApi':htmlDenahAbsenApi,
    'koleksiBulanAbsen':koleksiBulanAbsen,
    'viewModalFormulirAbsen':viewModalFormulirAbsen
}

export default htmlAbsen;