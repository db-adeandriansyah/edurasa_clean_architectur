
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
                // html+=`<img src="https://lh3.googleusercontent.com/d/${imgguru}" style="object-fit:contain;width:65px;height:70px" class="rounded d-none d-md-inline-block">`;
                // html+=`<img src="${imgguru.replace('https://drive.google.com/uc?export=view&id=','https://lh3.googleusercontent.com/d/')}" width="65" height="70" style="object-fit:cover" class="rounded">`;
                html+=`<img src=${imgguru}" width="65" height="70" style="object-fit:cover" class="rounded">`;
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
                        html+=`<img data-imgabsen="${fordata}" data-tgl="${dateInput}" class="imgabsensiswa" src="../../img/lamaso.webp" width="40" height="40" style="object-fit:contain">`;
                    }else{
                        html+=`<img data-imgabsen="${fordata}" data-tgl="${dateInput}" class="imgabsensiswa" src="${absensiswa[(absensiswa.length-1)].idfileimg}" width="40" height="40" style="object-fit:contain">`;
                    }
                }else{
                    html+=`<div class="col-3 col-md-3 w3-tiny meja-siswa d-flex flex-column align-items-center justify-content-between position-relative">`;
                    html+=`<img data-imgabsen="${fordata}" data-tgl="${dateInput}" class="imgabsensiswa" src="${iconhadir}" width="40" height="40" style="object-fit:contain">`;
                }
                    html+=`<p class="font10 text-center">${data[i].pd_nama}</p>`;
                    html+=`<div class="overlay" role="button">`;
                    if(absensiswa.length>0){
                        if(absensiswa[(absensiswa.length-1)].fileContent==""){
                            html+=`<img data-imgabsen="${fordata}" data-tgl="${dateInput}" class="imgabsensiswa" src="../../img/lamaso.webp" width="40" height="40" style="object-fit:contain">`;
                        }else{
                            html+=`<img data-imgabsen="${fordata}" data-tgl="${dateInput}" class="imgabsensiswa" src="${absensiswa[(absensiswa.length-1)].idfileimg}" width="70" height="70" style="object-fit:contain">`;
                        }
                        html+=absensiswa[(absensiswa.length-1)].kehadiran;
                    }else{
                        html+=`<img data-imgabsen="${fordata}" data-tgl="${dateInput}" class="imgabsensiswa" src="${iconhadir}" width="70" height="70"  style="object-fit:contain">`;
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

const htmlAbsen = {
    'htmlDenahAbsenApi':htmlDenahAbsenApi,
    'koleksiBulanAbsen':koleksiBulanAbsen
}

export default htmlAbsen;