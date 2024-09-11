export  const  cardMenu = (title='title', slotBody='hello world',showUpDown=true)=>{
    return`
<div class="card mb-3 mt-1">
    <div class="card-header d-flex justify-content-between align-items-center ${showUpDown?'':'accord-bg'} ">${title} ${showUpDown?'<span data-bs-toggle="tooltip" role="button" data-bs-title="Buka/Tutup grup menu ini">⇕</span>':''}</div>
    <div class="card-body ">
        ${slotBody}
    </div>
</div>`};
export  const  cardMenu2 = (title='title', slotBody='hello world',showUpDown=true)=>{
    return`
<div class="card mb-3 mt-1">
    <div class="card-header d-flex justify-content-between align-items-center ">${title} ${showUpDown?'<span data-bs-toggle="tooltip" role="button" data-bs-title="Buka/Tutup grup menu ini">⇕</span>':''}</div>
    <div class="card-body ">
        ${slotBody}
    </div>
</div>`};
export const radioMenu = (iterator, value, text, name="radiomenu",name2="radiomenubar")=>{
    let html = `<div class="form-check" data-radiomenusidebar="${name2}"> <input class="form-check-input" type="radio" name="${name}" value="${value}" id="radioMenu${iterator}"> <label class="form-check-label" for="radioMenu${iterator}">${text}</label> </div>`;
    return html;
}