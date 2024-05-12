import { stringToDom } from "../../views/components/doms";
const tdFormulir = (item)=>{
    let html ="";
    html+=`<tr>`;
        html+=`<td class="text-end border-bottom border-top-0 border-end border-start-0">${item.title}</td>`;
        html+=`<td contenteditable="true"  class="vw-100 text-start border-bottom border-top-0 border-end-0 border-start-0" data-keyformulir="${item.key}"></td>`;
        html+=`<td>`;
            html+=`<input class="form-check-input" type="checkbox" role="switch" onchange="(this.checked)?document.querySelector('[data-keyformulir=${item.key}]').textContent= document.querySelector('[data-keyformulir=${item.key}]').innerHTML:document.querySelector('[data-keyformulir=${item.key}]').innerHTML=document.querySelector('[data-keyformulir=${item.key}]').textContent">`;
        html+=`</td>`;
    html+=`</tr>`;
    return html;
}
const selectFormulir = (item)=>{
    let html ="";
    html+=`<tr>`;
        html+=`<td class="text-end border-bottom border-top-0 border-end border-start-0">${item.title}</td>`;
        html+=`<td colspan="2" class="vw-100 text-start border-bottom border-top-0 border-end-0 border-start-0">`;
            html+=`<select class="form-select form-select-sm border-0" data-keyformulir="${item.key}">`;
            item.aray.forEach(n=>{
                html+=`<option value="${n.key}">${n.title}</option>`;
            })

            html+=`</select>`;
        html+=`</td>`
        
    html+=`</tr>`;
    return html;
}
const html_table_formulir = (data,lingkupmateri)=>{
    let currLingkupMateri = lingkupmateri.filter(s=> s.kodemapel == data.kodemapel);
    let ar = [
        {key:'ilustrasi',title:'Ilustrasi'},
        {key:'pertanyaan',title:'Pertanyaan'},
    ];
    let opsi = [
        {key:'opsiA',title:'Opsi A'},
        {key:'opsiB',title:'Opsi B'},
        {key:'opsiC',title:'Opsi C'},
        {key:'opsiD',title:'Opsi D'},
    ];
    let keyopsi = [
        {key:'A',title:'A'},
        {key:'B',title:'B'},
        {key:'C',title:'C'},
        {key:'D',title:'D'},
    ];
    let opsijawaban = [
        {key:'kuncijawaban',title:'Kunci Jawaban',aray:keyopsi}
    ]
    let arWajib = [
        {key:'penskoran',title:'Pembahasan'},
        {key:'indikatorsoal',title:'Indikator Soal'},
        {key:'materi',title:'Materi Pokok'},
    ];
    let level=[
        {key:'L1',title:'L1/LK1/Pengetahuan Pemahaman'},
        {key:'L2',title:'L2/LK2/Aplikasi'},
        {key:'L3',title:'L3/LK3/Penalaran'},
    ]
    let arSelect = [
        {key:'levelkognitif',title:'Level Kognitif',aray:level},
        {key:'ruanglingkup',title:'Lingkup Materi',aray:currLingkupMateri.map(n=>({'key':n.lingkupmateri, 'title':n.lingkupmateri}))},
    ]
    let html = "";
    html+=`<div class="tabel-responsive" id="wrapertabel">`;
        html+=`<table class="table table-sm">`;
            html+=`<thead>`;
                html+=`<tr>`;
                    html+=`<th style="width:180px">Properti</th>`;
                    html+=`<th colspan="2">Value Edit</th>`
                html+=`</tr>`;
            html+=`</thead>`;
            html+=`<tbody>`;
            ar.forEach(n=>{
                html+=tdFormulir(n);
            });
            if(data.bentuksoal == 'Pilihan Ganda'){
                opsi.forEach(n=>{
                    html+=tdFormulir(n)
                });
                opsijawaban.forEach(n=>{
                    html+=selectFormulir(n);
                })
            }
            arWajib.forEach(n=>{
                html+=tdFormulir(n);
            });
            arSelect.forEach(n=>{
                html+=selectFormulir(n);
            })

                // html+=`<tr>`;
                //     html+=`<td class="text-end border-bottom border-top-0 border-end border-start-0">Pertanyaan</td>`;
                //     html+=`<td contenteditable="true"  class="vw-100 text-start border-bottom border-top-0 border-end-0 border-start-0" data-keyformulir="pertanyaan"></td>`;
                //     html+=`<td>`;
                //         html+=`<input class="form-check-input" type="checkbox" role="switch" onchange="(this.checked)?document.querySelector('[data-keyformulir=pertanyaan]').textContent= document.querySelector('[data-keyformulir=pertanyaan]').innerHTML:document.querySelector('[data-keyformulir=pertanyaan]').innerHTML=document.querySelector('[data-keyformulir=pertanyaan]').textContent">`;
                //     html+=`</td>`;
                // html+=`</tr>`;

            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;
    return stringToDom(html);
}
const html_contextmenu_table_formulir = ()=>{
    let html = `<ul class="list-group position-absolute" style="display:none"  id="contextMenuDivEditorEditing">
    <li  data-divEditor="pecahan" role="button" class="bg-secondary-subtle list-group-item d-flex font10 justify-content-between align-items-center border-bottom border-white"><span>Pecahan</span> <div class="p-0 mx-1 d-inline-flex flex-column align-items-center font10" title="pecahan"><span class="border-bottom border-dark">⬚</span><span>⬚</span></div> </li> 
    <li  data-divEditor="akarkuadrat" role="button" class="bg-secondary-subtle list-group-item d-flex font10 justify-content-between border-bottom border-white"> <span>Akar Kuadrat</span> <span class="p-0 mx-1" title="Akar Kuadrat">√</span> </li> 
    <li  data-divEditor="akarkubik" role="button" class="bg-secondary-subtle list-group-item d-flex font10 justify-content-between border-bottom border-white"> <span>Akar Kubik</span> <span class="p-0 mx-1" title="Buat Tabel">∛</span> </li> 
    <li data-divEditor="cekLK" role="button"  class="bg-secondary-subtle list-group-item font10">KKO (Level Kognitif)</li>
    <li data-divEditor="batal" role="button"  class="bg-secondary-subtle list-group-item font10">Batalkan(Keluar)</li>
</ul>`;
return stringToDom(html);
}
const viewFormulirBankSoal = {
    'html_table_formulir':html_table_formulir,
    'html_contextmenu_table_formulir':html_contextmenu_table_formulir
}

export default viewFormulirBankSoal;