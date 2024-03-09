import inputsElements from "../components/input-elements";

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
const controls = {
    'koleksiBulanAbsen':koleksiBulanAbsen
}
export default controls;