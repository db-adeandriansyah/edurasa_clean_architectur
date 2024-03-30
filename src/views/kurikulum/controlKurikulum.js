import inputsElements from "../components/input-elements";

export const menuPropertyKurikulum = (prop, data)=>{
    /**
     * data=[
     * {key:'K1',
     * labelkey:'Kompetensi Spiritual'
     * data:''
     * }
     * ]
     */
    let html="";
    html+=`<div class="m-2 blur rounded shadow-lg p-2">`;
        html+=`<div class="row">`;
            html+=`<h3 class="col-md-12">`;
                html+=`${prop.kurikulum}`;
            html+=`</h3>`;
            html+=`<div class="col-md-12 font12">Jenjang kelas ini menerapkan ${prop.kurikulum}</div>`;
            html+=`<div class="col-md-6 mt-2">`;
                html+=`<div class="form-floating">`;
                    html+=`<select class="form-control form-control-sm" id="selectMapelProperties">`;
                    html+=`<option value="umum" id="optionumum">Umum</option>`
                    prop.arraymapel.forEach(element => {
                        html+=`<option value="${element.value}">${element.label}</option>`
                    });
                    html+=`</select>`;
                    html+=`<label for="selectMapelProperties">Mata Pelajaran</label>`
                html+=`</div>`;
            html+=`</div>`;
            
            if(data){
                html+=`<div class="col-md-6">`;
                    html+=`<div class="input-group p-2">`;
                        html+=`<span class="input-group-text">Properti Kurikulum:</span>`
                        html+=`<div class="btn-group btn-group-sm font10" role="group" aria-label="Group Properti Kurikulum">`
                        data.properti.forEach(en=>{
                            html+=`<input type="radio" name="groupproperti" id="${en.id}" data-properti="${en.fasekelas}" class="btn-check" autocomplete="off">`;
                            html+=`<label for="${en.id}" class="btn btn-sm py-2 btn-outline-primary">${en.label}</label>`;
                        });
                        html+=`</div>`;
                    html+=`</div>`;
                html+=`</div>`;
                        
            }
            html+=`</div>`;
    html+=`</div>`;
    return html;

};
const radioPropertiKurikulum = (data)=>{
    let html = "";
    let sel = "";
    const {properti} = data;
    properti.forEach((en,indek)=>{
        
        sel+=`<input type="radio" name="groupproperti" id="${en.id}" data-properti="${en.fasekelas}" class="btn-check" ${indek==0?'checked ':''}autocomplete="off">`;
        sel+=`<label for="${en.id}" class="btn btn-sm py-2 btn-outline-primary p-1">${en.label}</label>`;
    });
    html+=`<div class="input-group p-2">`;
        html+=`<span class="input-group-text p-1">Properti Kurikulum:</span>`
        html+=`<div class="btn-group btn-group-sm font10" role="group" aria-label="Group Properti Kurikulum">`;
        html+=sel;
        html+=`</div>`;
    html+=`</div>`;
                        
    return html;
}
export const menuPropertiMapel= (data)=>{
        const {judul,arraySelect, deskripsi,ValuePertama} = data;
        let slot = radioPropertiKurikulum(data)
        let elemenselect = inputsElements.floatingSelect('idselectmapel','Pilih Mapel',arraySelect,ValuePertama);
        return `<div class="row rounded blur p-3 m-2 text-center justify-content-between">
                    <h3 class="col-md-12 text-center mb-0">${judul}</h3>
                    <p class="col-md-12 mt-0 p-0 mb-3">${deskripsi}</p>
                    <div class="col-md-6 mx-auto">${elemenselect}</div>
                    <div class="col-md-6 mx-auto font10">${slot}</div>
                </div>`; 
    
}