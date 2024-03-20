import inputsElements from "../components/input-elements";

const koleksiBulanAbsen = (data) =>{
    const {judul,arrayBulan, deskripsi,idSelectPilihBulan,tglValuePertama,modeCheckmark} = data;
    let elemenselect = inputsElements.floatingSelect(idSelectPilihBulan,judul,arrayBulan,tglValuePertama);
    let modeTampilan = modeSabtuLibur(modeCheckmark)
    return `<div class="rounded blur p-3 m-2 text-center"> <h3 class="text-center mb-0">${judul}</h3> <p class="mt-0 p-0 mb-3">${deskripsi}</p> <div class="col-md-5 mx-auto">${elemenselect}</div>${modeTampilan}</div>`; 
};
const koleksiSemester= (data) =>{
    const {judul,arrayBulan, deskripsi,idSelectPilihBulan,tglValuePertama,modeCheckmark} = data;
    let elemenselect = inputsElements.floatingSelect(idSelectPilihBulan,judul,arrayBulan,tglValuePertama);
    // let modeTampilan = modeSabtuLibur(modeCheckmark)
    return `<div class="rounded blur p-3 m-2 text-center"> <h3 class="text-center mb-0">${judul}</h3> <p class="mt-0 p-0 mb-3">${deskripsi}</p> <div class="col-md-5 mx-auto">${elemenselect}</div></div>`; 
};
const koleksiSemesterGrafik= (data) =>{
    const {judul,arrayBulan, deskripsi,idSelectPilihBulan,tglValuePertama,modeCheckmark} = data;
    let elemenselect = inputsElements.floatingSelect(idSelectPilihBulan,judul,arrayBulan,tglValuePertama);
    let modeTampilan = modeShowHadir(false);

    return `<div class="rounded blur p-3 m-2 text-center"> <h3 class="text-center mb-0">${judul}</h3> <p class="mt-0 p-0 mb-3">${deskripsi}</p> <div class="col-md-5 mx-auto">${elemenselect}</div>${modeTampilan}${grafikMode()}</div>`; 
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
const modeShowHadir = ()=>{
    return `<div class="row my-3 rounded-pill justify-content-center">
                <div class="col-md-4 border rounded accord-bg">
                    <div class="input-group">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="switchsabtu">
                            <label class="form-check-label" for="switchsabtu">Hari Sabtu Libur</label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="switchhadir">
                            <label class="form-check-label" for="switchhadir">Keterangan Hadir</label>
                        </div>
                        
                    </div>
                </div>
            </div>`;
}
const sorterDataSiswa = (withJenjang=true)=>{
    let included = "";
    if(withJenjang){
        included = ` <input type="radio" class="btn-check" name="sorter" id="sorterByNamaRombel" value="nama_rombel" autocomplete="off"> <label class="btn btn-outline-danger" for="sorterByNamaRombel">Kelas</label> </div>`

    }
    return `<div class="border border-warning shadow-lg p-1 text-center rounded">Urutkan Data berdasarkan: 
                <div class="btn-group btn-group-sm"> 
                    <input type="radio" class="btn-check" name="sorter" id="sorterById" value="id" autocomplete="off"> 
                    <label class="btn btn-outline-danger" for="sorterById">ID</label> 
                    <input type="radio" class="btn-check" name="sorter" id="sorterByPdNama" value="pd_nama" autocomplete="off" checked="true"> 
                    <label class="btn btn-outline-danger text-nowrap" for="sorterByPdNama">Nama Siswa</label> 
                    <input type="radio" class="btn-check" name="sorter" id="sorterByNis" value="nis" autocomplete="off"> 
                    <label class="btn btn-outline-danger" for="sorterByNis">NIS</label>
                    ${included}
                </div>
            </div>`;
}

const grafikMode = ()=>{
    return `<div class="border border-warning shadow-lg p-1 text-center rounded">Tampilan Grafik: 
    <div class="btn-group btn-group-sm">
        <input type="radio" class="btn-check" name="modegrafik" id="modegrafikByColumnChart" value="ColumnChart" autocomplete="off" checked="true">
        <label class="btn btn-outline-danger" for="modegrafikByColumnChart">Column Chart</label>
        <input type="radio" class="btn-check" name="modegrafik" id="modegrafikByComboChart" value="ComboChart" autocomplete="off">
        <label class="btn btn-outline-danger text-nowrap" for="modegrafikByComboChart">Combo Chart</label>
        <input type="radio" class="btn-check" name="modegrafik" id="modegrafikByPieChart" value="PieChart" data-pie="false" autocomplete="off">
        <label class="btn btn-outline-danger" for="modegrafikByPieChart">Pie Chart</label>
        <input type="radio" class="btn-check" name="modegrafik" id="modegrafikByPieChart_donut" value="PieChart_hole" data-pie="true" autocomplete="off">
        <label class="btn btn-outline-danger" for="modegrafikByPieChart_donut">Donut Chart</label>
    </div>`;
}
const controls = {
    'koleksiBulanAbsen':koleksiBulanAbsen,
    'sorterDataSiswa':sorterDataSiswa,
    'koleksiSemester':koleksiSemester,
    'grafikMode':grafikMode,
    'modeSabtuLibur':modeSabtuLibur,
    'koleksiSemesterGrafik':koleksiSemesterGrafik
}
export default controls;