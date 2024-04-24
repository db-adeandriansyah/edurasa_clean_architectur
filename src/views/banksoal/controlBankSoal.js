import inputsElements from "../components/input-elements";
import rowCols from "../components/row-cols";
import { cardMenu } from "../sidebar/cardSidebar";

const wraperMainControl = (info='')=>`<div class="p-2 my-2 border-5 border-warning border-top-0  border-start-0 border-end-0 border-bottom accord-bg rounded container">${info}</div>`;

/**
 * 
 * @param {
 * id:'number',
 * title_tab:'string',
 * body_html:'string'
 *  } sampel 
 * @returns 
 */
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

const controlBuatItemSoal = (data)=>{
    let araymenu = data.araymenu;
    // let items = itemTabs(araymenu);
    let menus =  MenuTab(araymenu);
    let teksInfo =`<h3 class="text-center text-uppercase">BUAT ITEM SOAL ${data.shortKurikulum}</h3>`;
            teksInfo += `<div class="text-center font12">Saat ini Anda berada di jenjang kelas ${data.jenjang} yang menerapkan <span class="bg-warning">${data.longKurikulum}</span>.</div>`;
        teksInfo+=menus;
    return wraperMainControl(teksInfo);
}
const cardMapel = (arg)=>{
    return rowCols.rows('mt-1 justify-content-center',
        rowCols.cols('col-md-6',
            cardMenu('Mata Pelajaran',inputsElements.floatingSelect(arg[0],arg[1],arg[2],arg[3],arg[4]))
        ) 
    ) 
}
const menuPilihBentukSoal = (data)=>{
    let html = "";
    html+=`<table class="w3-table-all table-sm table-bordered border-dark-subtle font10">`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th>Bentuk Soal</th>`;
                html+=`<th>Cara Koreksi</th>`;
            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;
            data.forEach((element,indeks) => {
                html+=`<tr>`;
                    html+=`<td>`;
                        html+=inputsElements.formInputRadio(element.id,element.teks,element.value,true,'bentuksoalspesifik',` data-editorinput="${element.editorinput}" data-pradesain="bentuksoal" ${indeks==0?'checked':''}`)
                    html+=`</td>`;
                    html+=`<td>`;
                        html+=element.carakoreksi
                    html+=`</td>`;
                html+=`</tr>`;
            });
        html+=`</tbody>`;
            
    html+=`</table>`;
    return rowCols.rows('mt-1 justify-content-center',
    rowCols.cols('col-md-6',
        cardMenu('Bentuk Soal',html)
    ) 
) 
}
const menuPilihPropertiKurikulum = (tipekurikulum, data)=>{
    let html ="";
    let titleCard = 'Properti '+tipekurikulum;
    if(tipekurikulum == 'kurmer'){
        console.log(data)
        titleCard+=` (${data[0].kodemapel_teks})`;
    };
    html+=`<table class="w3-table-all table-sm table-bordered border-dark-subtle font10">`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th>Pilih</th>`;
                if(tipekurikulum == 'kurtilas'){
                    html+=`<th>Mapel</th>`
                    html+=`<th>Indikator Kompetensi</th>`
                }else{
                    html+=`<th colspan="2">Alur Tujuan Pembelajaran (ATP)</th>`;
                }
            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;
            data.forEach((n,indeks)=>{
                html+=`<tr>`;
                if(tipekurikulum=='kurtilas'){
                    html+=`<td>`;
                        html+=`<input type="radio" data-pradesain="kd" id="propertikd_${indeks}" name="radio_pradesain_kurikulum" value="${n.kd3}"  ${indeks==0?'checked':''}/>`
                    html+=`</td>`;
                    html+=`<td>`;
                        html+=n.kodemapel;
                    html+=`</td>`;
                    
                    html+=`<td>`;
                        html+=`<label role="button" for="propertikd_${indeks}">`;
                        html+=n.kd3+' ';
                        html+=n.indikatorkd3;
                        html+=`<hr class="my-0"/>`;
                        html+=n.kd4+' ';
                        html+=n.indikatorkd4;
                        html+=`</label>`;
                    html+=`</td>`;
                    
                }else{
                    
                    html+=`<td>`;
                        html+=`<input type="radio" data-pradesain="kd" id="propertikd_${indeks}" name="radio_pradesain_kurikulum" value="${n.idbaris}"  ${indeks==0?'checked':''}/>`
                    html+=`</td>`;
                    html+=`<td>`;
                        html+=`<label role="button" for="propertikd_${indeks}">`;
                            html+=n.atp;
                        html+=`</label>`;
                    html+=`</td>`;

                }
                html+=`</tr>`;
            })
        html+=`</tbody>`;
    html+=`</table>`;
    return rowCols.rows('mt-1 justify-content-center',
    rowCols.cols('col-md-8',
        cardMenu(titleCard,html)
        )
    )
}
const switchRadioModeCreateSoal = ()=>{
    return `<div class="border border-warning shadow-lg p-1 text-center rounded">Pilih Mode Cara Membuat Item Soal : 
        <div class="btn-group btn-group-sm"> 
            <input type="radio" class="btn-check" data-pradesain="mode" name="mode" id="modeByCopast" value="bycopast" autocomplete="off" checked> 
            <label class="btn btn-outline-danger" for="modeByCopast">Copy Paste</label> 
            <input type="radio" class="btn-check" data-pradesain="mode" name="mode" id="modeByFormuir" value="formulir" autocomplete="off"> 
            <label class="btn btn-outline-danger" for="modeByFormuir">Formulir</label> 
        </div>
    </div>`
}
const viewAccordion =()=>{
    let html="";
    html+=`<div class="accordion font12" id="accordion_propertiesPreview">`;
                
                html+=`<div class="accordion-item">`;
                    html+=`<div class="accordion-header">`;
                        html+=`<button class="accordion-button bg-secondary-subtle"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse-previewSoal"
                            aria-expanded="true"
                            aria-control="collapse-previewSoal"
                        >`;
                            html+=`Preview Soal Yang Anda buat (No Soal Preview dicontohkan dengan nomor 1)`
                        html+=`</button>`
                    html+=`</div>`
                    html+=`<div id="collapse-previewSoal" class="accordion-collapse collapse show" data-bs-parent="#accordion_propertiesPreview">`;
                        html+=`<div class="accordion-body" id="sorotUpdate_tampilansoal">`;
                            html+=`DISINI AKAN MUNCUL TAMPILAN SOAL YANG ANDA SOROT (BLOK)`;
                        html+=`</div>`;
                    html+=`</div>`
                html+=`</div>`;
                
                // html+=`<div class="accordion-item">`;
                //     html+=`<div class="accordion-header">`;
                //         html+=`<button class="accordion-button collapsed bg-secondary-subtle"
                //             type="button"
                //             data-bs-toggle="collapse"
                //             data-bs-target="#collapse-propertiSoalServer"
                //             aria-control="collapse-propertiSoalServer"
                //             aria-expanded="false"
                //         >`;
                //             html+=`Properti Item Soal Wajib`;
                //         html+=`</button>`
                //     html+=`</div>`
                //     html+=`<div id="collapse-propertiSoalServer" class="accordion-collapse collapse" data-bs-parent="#accordion_propertiesPreview">`;
                //         html+=`<div class="accordion-body" id="sorotUpdate_propertisoal">`;
                //             html+=`DISINI AKAN MUNCUL PROPERTI SOAL`;
                //         html+=`</div>`;
                //     html+=`</div>`
                // html+=`</div>`;
                
                // html+=`<div class="accordion-item">`;
                //     html+=`<div class="accordion-header">`;
                //         html+=`<button class="accordion-button collapsed bg-secondary-subtle border-bottom"
                //             type="button"
                //             data-bs-toggle="collapse"
                //             data-bs-target="#collapse-propertiSoalServerConsole"
                //             aria-control="collapse-propertiSoalServerConsole"
                //             aria-expanded="false"
                //         >`;
                //             html+=`Console Properti Item Soal`;
                //         html+=`</button>`
                //     html+=`</div>`
                //     html+=`<div id="collapse-propertiSoalServerConsole" class="accordion-collapse collapse" data-bs-parent="#accordion_propertiesPreview">`;
                //         html+=`<div class="accordion-body" id="sorotUpdate_propertisoalconsole">`;
                //         html+=`</div>`;
                //     html+=`</div>`
                // html+=`</div>`;
                
            html+=`</div>`;
    return html;
}
const templateCreatePerItemBankSoal = ()=>{
    return `<div id="divTextEditor"></div><div id="realtimeInputTextEditor">${viewAccordion()}</div>
            <div class="col-md-12 mt-2 text-center" id="wraperTombolSimpanResetSoalBaru" style="display: block;"><button id="resetItemSoal" class="btn btn-sm py-0 accord-bg border-bottom border-danger rounded-pill border-start-0 border-end-0 border-top-0 mx-2">Reset</button><button id="simpanItemSoal" class="btn btn-sm py-0 accord-bg border-bottom border-danger rounded-pill border-start-0 border-end-0 border-top-0 mx-2">Simpan</button></div>`;
}

const controlbanksoal = {
    'wrapermenu'                    : wraperMainControl,
    'controlBuatItemSoal'           : controlBuatItemSoal,
    'selectelemen'                  : cardMapel,
    'menuPilihBentukSoal'           : menuPilihBentukSoal,
    'menuPilihPropertiKurikulum'    : menuPilihPropertiKurikulum,
    'switchRadioModeCreateSoal'     : switchRadioModeCreateSoal,
    'templateCreatePerItemBankSoal' : templateCreatePerItemBankSoal
}

export default controlbanksoal;