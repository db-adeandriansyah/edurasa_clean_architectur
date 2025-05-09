const wraperMainControl = (info='')=>`<div class="pb-2 pt-0 mb-2 border-5 border-warning border-top-0  border-start-0 border-end-0 border-bottom accord-bg rounded container">${info}</div>`;
const itemTabs =  (sampel)=>{
    
    let html = "";
    let body = ""
    for(let i = 0 ; i < sampel.length; i++){
        html+=`<button class="nav-link ${i==0?'active':''} text-nowrap" id="${sampel[i].id}" data-bs-toggle="tab" data-bs-target="#${sampel[i].id}_tab" type="button" role="tab" aria-controls="${sampel[i].id}_tab" aria-selected="false" tabindex="-1">${sampel[i].title_tab}</button>`;
        body+=`<div class="tab-pane ${i==0?'active show':''} fade" id="${sampel[i].id}_tab"  role="tabpanel" aria-labelledby="${sampel[i].id}_tab" tabindex="0">${sampel[i].body_html}</div>`;
    }
    return {header:`<div class="nav nav-tabs nav-sm overflow-y-hidden pt-2 pb-0 px-2 scrol-modal-tab flex-nowrap" >${html}</div>`,tabkonten:body}
}
const MenuTab = (x)=>{
    //   if(x==undefined) x = sampel;
        let data = itemTabs(x);

    return `<div class="modehead neon-lite-transisi scrolled rounded-top sticky-top">${data.header}</div>
    <div class="tab-content blur-box shadow-lg">${data.tabkonten}
    </div>
    `    
}
const tabs={
    'MenuTab':MenuTab,
    'itemTabs':itemTabs,
    'wraperMainControl':wraperMainControl
}
export default tabs;