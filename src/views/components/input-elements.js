const formFloatingText = (id,label,value="",attributes=null,alwaysUpper=false)=>`<div class="form-floating mb-3"><input type="text" ${alwaysUpper?'oninput="this.value = this.value.toUpperCase();"':''} class="form-control form-control-sm" ${attributes?attributes:''} id="${id}" value="${value}" placeholder="${label}"><label for="${id}">${label}</label></div>`;
const formFloatingPassword = (id="password",label="Password",value="",attributes=null)=>`
<div class="form-floating mb-3">
                <i class="bi bi-eye-slash position-absolute top-50 end-0 me-1 translate-middle fs-3" id="showPass" role="button"></i>
                <input class="form-control form-control-sm" type="password" value="${value}" name="${id}" id="${id}" placeholder="Password" ${attributes?attributes:''} autocomplete="off">
                <label for="${id}">${label}</label>
            </div>`;
/**
  `<div class="form-floating mb-3">
  <input type="password" ${alwaysUpper?'oninput="this.value = this.value.toUpperCase();"':''} class="form-control form-control-sm" ${attributes?attributes:''}id="${id}" value="${value}" placeholder="${label}">
  <label for="${id}">${label}</label>
  </div>`;

 */

const formFloatingNumber = (id,label,value="",attributes=null,min=0, max=100)=>`<div class="form-floating mb-3"><input type="number" class="form-control form-control-sm" ${attributes?attributes:''} min="${min}" max="${max}" id="${id}" value="${value}" placeholder="${label}"><label for="${id}">${label}</label></div>`;

const formFloatingTextArea = (id,label,value="",attributes=null)=>`<div class="form-floating mb-3"><textarea type="number" class="form-control form-control-sm" ${attributes?attributes:''} id="${id}" placeholder="${label}">${value}</textarea><label for="${id}">${label}</label>
</div>`;

const formFloatingDate = (id,label,value="",attributes=null)=>`<div class="form-floating mb-3"><input type="date" class="form-control form-control-sm" ${attributes?attributes:''} value="${value}" id="${id}"><label for="${id}">${label}</label></div>`;


const formFloatingDateTime = (id,label,value="",attributes=null)=>`<div class="form-floating mb-3"><input type="datetime-local" class="form-control form-control-sm" ${attributes?attributes:''} value="${value}" id="${id}"><label for="${id}">${label}</label></div>`;

const formFloatingSelect = (id, label, arr=[{value:'',label:'Pilih Item'}],selectvalue="",attributes=null)=>{
    let ops = "";
    for(let i = 0; i < arr.length ; i++){
        ops +=`<option ${(arr[i].value==selectvalue)?'selected':''} value="${arr[i].value}">${arr[i].label}</option>`;
    }
    return `<div class="form-floating mb-3"><select class="form-select form-select-sm" id="${id}" ${attributes?attributes:''} aria-label="${label}">${ops}</select><label for="${id}">${label}</label></div>`;
};

const grupInput = (slot)=>`<div class="input-group input-group-sm mb-3">${slot}</div>`;
const grupInputFile = (idfile, attributesfile,labelfile,idInput, labelInput, valueInput="", attributeInput=null)=>{
    let html =""
    if(valueInput!==""){
        html+=`<button class="input-group-text" onclick="window.open('https://drive.google.com/file/d/${valueInput}','', 'width=720,height=600')">Preview</button>`;
        html+=`<button class="input-group-text" onclick="document.getElementById('${idInput}').value = ''">Hapus</button>`
    }
    return grupInput(`<input type="file" class="form-control d-none" id="${idfile}" ${attributesfile?attributesfile:''}>
    <label class="form-control input-group-text" for="${idInput}">${labelInput}</label>
    <input type="text" class="form-control" id="${idInput}" value="${valueInput}" disabled ${attributeInput?attributeInput:''}>
    <label class="input-group-text" for="${idfile}">${labelfile}</label>${html}
    `);
}
const grupInputFileRotate = (idfile, attributesfile,labelfile,idInput, labelInput, valueInput="", attributeInput=null)=>{
    let html =""
    if(valueInput!==""){
        html+=`<button class="input-group-text" data-uriPreview='https://drive.google.com/file/d/${valueInput}/preview' data-fokusUri="${labelInput}">Preview</button>`;
        html+=`<button class="input-group-text" onclick="document.getElementById('${idInput}').value = '';this.previousElementSibling.remove();this.remove()">Hapus</button>`
    }
    return grupInput(`<input type="file" class="form-control d-none" id="${idfile}" ${attributesfile?attributesfile:''}>
    <label class="form-control input-group-text" for="${idInput}">${labelInput}</label>
    <input type="text" class="form-control" id="${idInput}" value="${valueInput}" disabled ${attributeInput?attributeInput:''}>
    <label class="input-group-text" for="${idfile}">${labelfile}</label>${html}
    `);
}
const formInputRadio =(id, label,value="",inline=true, name="nama", attributes=null)=>`
<div class="form-check${inline?' form-check-inline':''}">
  <input class="form-check-input" value="${value}" type="radio" name="${name}" id="${id}" ${attributes?attributes:''}>
  <label class="form-check-label font14" for="${id}">${label}</label>
</div>`;
const formInputCheckbox =(id, label,value="",inline=true, name="nama",attributes=null)=>`
<div class="form-check${inline?' form-check-inline':''}">
  <input class="form-check-input" value="${value}" type="checkbox" name="${name}" id="${id}" ${attributes?attributes:''}>
  <label class="form-check-label" for="${id}">${label}</label>
</div>`;

const switchForm = (id, label,value="",classAdd=null, name="nama",attributes=null)=>`
<div class="form-check ${classAdd?classAdd:''} form-switch">
  <input class="form-check-input" type="checkbox" value="${value}" name="${name}" ${attributes?attributes:''} role="switch" id="${id}">
  <label class="form-check-label" for="${id}">${label}</label>
</div>`;

const inputsElements ={
    'floatingText':formFloatingText,
    'formFloatingPassword':formFloatingPassword,
    'floatingNumber':formFloatingNumber,
    'floatingSelect':formFloatingSelect,
    'floatingTextarea':formFloatingTextArea,
    'floatingDate':formFloatingDate,
    'grupInput':grupInput,
    'grupInputFile':grupInputFile,
    'grupInputFileRotate':grupInputFileRotate,
    'formInputCheckbox':formInputCheckbox,
    'formInputRadio':formInputRadio,
    'formFloatingDateTime':formFloatingDateTime,
    'switchForm':switchForm


};
export default inputsElements;