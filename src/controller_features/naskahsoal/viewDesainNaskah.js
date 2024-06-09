import buttonEdu from "../../views/components/buttons";
import inputsElements from "../../views/components/input-elements";
import rowCols from "../../views/components/row-cols";
import { cardMenu, cardMenu2 } from "../../views/sidebar/cardSidebar";
import tabs from "../../views/tabs/tab";
const convertToDateTimeLocalString = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    return `${year}-${month}-${day}T${hours}:${minutes}:00`;
  }
const menuIdentitasNaskah = (data)=>{
    const {jenjang,koleksirombel} = data;
    let menukelas = koleksirombel[jenjang];
    // menukelas.unshift(jenjang)
    let htmlmenukelas='';
    htmlmenukelas+=inputsElements.formInputRadio('kelas'+jenjang,'Kelas '+jenjang,jenjang,true,'arraykelas',' data-pradesain="kelas" checked');
    menukelas.forEach((n,i)=>{
        htmlmenukelas+=inputsElements.formInputRadio('kelas'+n,'Kelas '+n,n,true,'arraykelas',` data-pradesain="kelas"`);
    });
    
    let html="";
        html+=rowCols.rows('m-2',
            rowCols.cols('col-md-8',
                cardMenu('Judul Naskah',
                    inputsElements.floatingText('judulnaskah','Judul Naskah','',' data-pradesain="judulnaskah"',true)
                ,false) 
            )
            +
        rowCols.cols('col-md-4',
                cardMenu('Pilih Kelas Tampilan Naskah',htmlmenukelas,false)
                
                
                
            )
            +rowCols.cols('col-md-4',
                cardMenu('Waktu Mulai',
                    inputsElements.formFloatingDateTime('start_waktu','Waktu Mulai',convertToDateTimeLocalString(new Date()),' data-pradesain="start_waktu"'),
                false)
            )
            +rowCols.cols('col-md-4',
                cardMenu('Waktu Akhir',
                    inputsElements.formFloatingDateTime('end_waktu','Waktu Mulai',convertToDateTimeLocalString(new Date()),' data-pradesain="end_waktu"'),
                false)
            )+
            rowCols.cols('col-md-4',
                cardMenu('Durasi (otomatis)',inputsElements.floatingNumber('durasi','Durasi (Menit)',0,' data-pradesain="durasi" disabled',0,),false)
            )+
            rowCols.cols('col-md-12',
                    cardMenu('Tampilan di Naskah',
                    inputsElements.formInputCheckbox('kopsoal','Tampilkan KOP di naskah?','',true,'kopsoal',' data-pradesain="kopsoal"')
                    +
                    inputsElements.formInputCheckbox('identitassoal','Tampilkan Identitas di naskah?','',true,'identitassoal',' data-pradesain="identitassoal"')
                    +
                    inputsElements.formInputCheckbox('tabelnilai','Tampilkan Kolom Nilai di naskah?','',true,'tabelnilai',' data-pradesain="tabelnilai"')
                    +
                    inputsElements.formInputCheckbox('petunjukumum','Tampilkan Petunjuk Umum di naskah?','',true,'petunjukumum',' data-pradesain="petunjukumum"')
                ,false  
                )
            )
        )
    return html;
};

const menuPilihMapel = (data)=>{
    const {_htmlkoleksimapel,_htmlkoleksimapelWithTema,shortKurikulum,jenjang,isGuruMapel,mapelAjar} = data;
    let htmlmapel = "";
    let judulsebaran = 'ATP'
    if(shortKurikulum == 'kurmer'){
        htmlmapel+=inputsElements.floatingSelect('selectmapel','Pilih Mata Pelajaran',_htmlkoleksimapel,isGuruMapel?mapelAjar:'',` data-pradesain="mapel" ${isGuruMapel?'disabled':''}`)
        
    }else{
        judulsebaran = 'KD'
        htmlmapel+=inputsElements.floatingSelect('selectmapel','Pilih Mata Pelajaran',_htmlkoleksimapelWithTema,isGuruMapel?mapelAjar:'',` data-pradesain="mapel" ${isGuruMapel?'disabled':''}`)
        
    }
    let html = "";
    html+=rowCols.rows('mb-2',
        rowCols.cols('col-md-6',
            cardMenu('Pilih Mata Pelajaran',htmlmapel,false)
        )+
        rowCols.cols('col-md-6',
            cardMenu(`Perlu Ditampilkan Sebaran ${judulsebaran}?`,
                inputsElements.formInputCheckbox('petunjuknilai','Tampilkan Sebaran '+judulsebaran,'',true,'petunjuknilai',' data-pradesain="petunjuknilai"'),false
            )
        )
        +
        rowCols.cols('col-md-12',
            cardMenu('Properti Kurikulum',
                `<div class="border p-1 rounded font8" id="tableKDTemplateDesain">TABEL PROPERTI</div>`,false

            )
        )

    )
    html+=''
    return html;
}
const menuKerangkaNaskah=(data)=>{
    const {koleksiBentukSoal} = data;
    let arraybentuksoal = [];
    let inputhtml = "";
    let inputitem = "";
    koleksiBentukSoal.forEach(n=>{
        let ob = {};
        
        ob.label = n.bentuksoalspesifik;
        ob.value = n.bentuksoalspesifik;
        arraybentuksoal.push(ob);
        inputitem+=rowCols.cols('col-md-6 font10',
            inputsElements.floatingNumber(n.id,n.teks,'',` data-desain="${n.value}" data-jumlahsoal="${n.value}"`)
        )
    })
    inputhtml+=cardMenu('Jumlah Soal',rowCols.rows('mb-2', inputitem ),false) ;
    
        
    return rowCols.rows('mb-2 justify-content-center',
        rowCols.cols('col-md-7',inputhtml+`<div class="form-check form-switch font10">
        <input class="form-check-input" type="checkbox" role="switch" id="penomoransoal" data-pradesain="penomoransoal" value="penomoransoal" checked="">
        <label class="form-check-label font10" for="penomoransoal">Nomor soal kembali ke nomor 1 tiap Kelompok Petunjuk</label>
        </div>`
        )+
        rowCols.cols('col-md-4 border rounded p-1',
            cardMenu('Kerangka Bentuk Soal Naskah',`<div id="kerangkanaskahpreview"></div>`,
            false)
        )
        // rowCols.cols('col-md-5',
        //     cardMenu('Pilih Jumlah dan Bentuk Soal',
        //         inputsElements.grupInput(
        //             inputsElements.floatingSelect('pilihdesainbentuksoal','Bentuk Soal',arraybentuksoal,'Pilihan Ganda','data-kerangkanaskah="bentuksoal"')
        //             +
        //             inputsElements.floatingNumber('pilihjumlahsoal','Jumlah','','data-kerangkadesain="jumlahsoal"')
                    
                    
        //         )
        //         +buttonEdu.primary('id="buatkerangka"','Tambahkan Kerangka')
        //         +buttonEdu.secondary('id="resetkerangka"','Reset Ulang')
        //         +`<div class="form-check form-switch font10 border-top mt-2">
        //             <input class="form-check-input" type="checkbox" role="switch" id="penomoransoal" data-pradesain="penomoransoal" value="penomoransoal" checked>
        //             <label class="form-check-label font10" for="penomoransoal">Nomor soal kembali ke nomor 1 tiap Kelompok Petunjuk</label>
        //             </div>`,false
        //     )
        // )
        // +
        // rowCols.cols('md-12',
        //     cardMenu('Kerangka Bentuk Soal Naskah',`<div id="kerangkanaskahpreview"></div>`,false)
        // )
    )
}

const menuFinishing=()=>{
    return rowCols.rows('mb-2 justify-content-center',
        rowCols.cols('col-md-6 border p-2 text-center',
            buttonEdu.primary('id="btncreatetemplate"','Buat Template Naskah')
        )
    )
};

const tabelPropertiKurikulum = (kurikulum,orm,banksoal,jenjang,koleksibentuksoal)=>{
    let html='';
    
    if(kurikulum == 'kurmer'){
        html+=`<div class="table-responsive">`
            html+=`<table class="table table-sm table-bordered font10">`;
                html+=`<thead>`;
                    html+=`<tr>`;
                        html+=`<th class="text-bg-secondary lh-sm text-center align-middle" style="width:20px">`;
                            html+=`Pilih Semua`;
                            html+=`<input type="checkbox" id="pilihallceklis" title="Pilih Semua">`;
                        html+=`</th>`;
                        html+=`<th colspan="2" class="text-center text-bg-secondary align-middle">`;
                            html+=`Elemen & Capaian Pembelajaran (CP)`;
                        html+=`</th>`;
                        html+=`<th class="text-center text-bg-secondary align-middle">Alur Tujuan Pembelajaran (ATP)</th>`
                        html+=`<th class="text-center text-bg-secondary align-middle" style="width:100px">Total Soal</th>`;
                    html+=`</tr>`;
                html+=`</thead>`;
                html+=`<tbody>`;
                    orm.forEach((data,index)=>{
                        html+=`<tr>`;
                            html+=`<td>`;
                                html+=`<input type="checkbox" data-desain="atp" name="atpmodal" id="radioatpmoda${data.idbaris}" value="${data.idbaris}">`
                            html+=`</td>`;
                            html+=`<td>`;
                                html+=`${index+1}`
                            html+=`</td>`;
                            html+=`<td>`;
                                html+=`<b>${data.elemen}</b><br/>`;
                                html+=data.tp;
                            html+=`</td>`;
                            html+=`<td>`;
                                html+=data.atp;
                            html+=`</td>`;
                            let totalsoal = banksoal.filter(s=>s.kd == data.idbaris && s.jenjang == jenjang);
                            
                            html+=`<td>`;
                                koleksibentuksoal.forEach(k=>{
                                    let count = totalsoal.filter(s=> s.bentuksoalspesifik == k.bentuksoalspesifik).length;
                                    html+=`<div class="d-flex justify-content-between border-bottom"><span>${k.bentuksoalspesifik}</span><span>${count}</span></div>`;
                                })
                            html+=`</td>`;
                        html+=`</tr>`;

                    })
                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;
    }else{
        html+=`<div class="table-responsive">`
            html+=`<table class="table table-sm table-bordered font10">`;
                html+=`<thead>`;
                    html+=`<tr>`;
                        html+=`<th class="text-bg-secondary lh-sm text-center align-middle" style="width:20px">`;
                            html+=`Pilih Semua`;
                            html+=`<input type="checkbox" id="pilihallceklis" title="Pilih Semua">`;
                        html+=`</th>`;
                        html+=`<th class="text-center text-bg-secondary align-middle">`;
                            html+=`Kode Mapel`;
                        html+=`</th>`;
                        html+=`<th class="text-center text-bg-secondary align-middle">`;
                            html+=`KD`;
                        html+=`</th>`;
                        html+=`<th class="text-center text-bg-secondary align-middle">Kompetensi Dasar</th>`;
                        html+=`<th class="text-center text-bg-secondary align-middle" style="width:100px">Total Soal</th>`;
                    html+=`</tr>`;
                html+=`</thead>`;
                html+=`<tbody>`;
                    orm.forEach((data,index)=>{
                        html+=`<tr>`;
                            html+=`<td>`;
                                html+=`<input type="checkbox" data-desain="kd3" name="kd3modal" id="radiokd3modal${data.mapel}${data.kd3}" value="${data.baris}">`
                            html+=`</td>`;
                            html+=`<td>`;
                                html+=data.mapel
                            html+=`</td>`;
                            html+=`<td>`;
                                html+=data.kd3;
                                html+=`<hr class="m-0 p-0"/>`;
                                html+=data.kd4
                            html+=`</td>`;
                            html+=`<td>`;
                                html+=`<label for="radiokd3modal${data.mapel}${data.kd3}">`;
                                    html+=data.indikatorkd3;
                                    html+=`<hr class="m-0 p-0"/>`;
                                    html+=data.indikatorkd4;
                                html+=`</label>`;
                            html+=`</td>`;
                            
                            let totalsoal = banksoal.filter(s=>s.kd == data.kd3 && s.kodemapel == data.mapel && s.jenjang == jenjang);
                            
                            html+=`<td>`;
                                koleksibentuksoal.forEach(k=>{
                                    let count = totalsoal.filter(s=> s.bentuksoalspesifik == k.bentuksoalspesifik).length;
                                    html+=`<div class="d-flex justify-content-between border-bottom"><span>${k.bentuksoalspesifik}</span><span>${count}</span></div>`;
                                })
                            html+=`</td>`;
                        html+=`</tr>`;
                    })
                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;
    }
    return html;
}
const menuDraftItem = (draft)=>{
    let html = "";
    html+=`<div class="shadow-lg elementdraft">`;
    if(draft){
        html+=`<table class="table table-sm table-borderless font12">`;
            html+=`<tr>`;
                html+=`<td>Data Judul</td>`;
                html+=`<td>${draft.pradesain.judulnaskah}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td>Bentuk Soal</td>`;
                html+=`<td>${draft.pradesain.kerangka.map(n=>n.bentuksoal).join(', ')}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td>Kelengkapan</td>`
            let datadom = draft.html;
            let totalsel = datadom.filter(s=>s.type=='konten');
            let belumlengkap = totalsel.filter(s=> !s.hassoal)
            let sudahlengkap = totalsel.filter(s=> s.hassoal)
                html+=`<td>`;
                    html+=`<div class="d-flex justify-content-between">`;
                    html+='<span>Belum Diisi</span>'
                    html+=`<span>${belumlengkap.length} soal/klik</span>`;
                    html+=`</div>`;
                    html+=`<div class="d-flex justify-content-between">`;
                    html+='<span>Sudah Diisi</span>'
                    html+=`<span>${sudahlengkap.length} soal/klik</span>`;
                    html+=`</div>`;
                html+=`</td>`;
            html+=`</tr>`;
    
        html+=`</table>`;
        html+=`<div class="mt-5 text-center">`;
            html+=buttonEdu.primary(' id="btndraft"','Mulai Desain');
        html+=`</div>`;
    }else{
        html +="Tidak ada Draft Naskah yang Anda disimpan di Perangkat ini."
    }
    html+=`</div>`
        return cardMenu2('Data Draft',html,false);
}
const menuDraft = (draft)=>{
    let html = menuDraftItem(draft);
    return rowCols.rows('mb-2 justify-content-center',
        rowCols.cols('col-md-6 shadow-lg rounded',html)
    )
}
const toolbarDesainNaskah = (data)=>{
    
    const {jenjang,longKurikulum,shortKurikulum}=data;
    let menu = [
            {
                id:'tab_menu1',
                title_tab:'Identitas Naskah',
                body_html:menuIdentitasNaskah(data)
            },
            {
                id:'tab_menu2',
                title_tab:'Properti Mapel',
                body_html:menuPilihMapel(data)
            },
            {
                id:'tab_menu3',
                title_tab:'Kerangka Naskah',
                body_html:menuKerangkaNaskah(data)
            },
            {
                id:'tab_menu4',
                title_tab:'Finishing',
                body_html:menuFinishing()
            },
            {
                id:'tab_menu5',
                title_tab:'Draft',
                body_html:menuDraft(data.draft)
            }
        
        ];
    let menus =  tabs.MenuTab(menu);
    let teksInfo =`<h3 class="text-center text-uppercase">Desain naskah soal kelas ${jenjang}</h3>`;
            teksInfo += `<div class="text-center font12">Saat ini Anda berada di jenjang yang menerapkan <span class="bg-warning">${longKurikulum}</span>.</div>`;
        teksInfo+=menus;
    return tabs.wraperMainControl(teksInfo);
}

const viewAccordion =()=>{
    let html="";
    html+=`<div class="accordion font10" id="accordion_propertiesPreview">`;
                
                html+=`<div class="accordion-item">`;
                    html+=`<div class="accordion-header">`;
                        html+=`<button class="accordion-button bg-secondary-subtle"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse-previewSoal"
                            aria-expanded="false"
                            aria-control="collapse-previewSoal"
                        >`;
                            html+=`Preview Soal Yang Anda buat (No Soal Preview dicontohkan dengan nomor 1)`
                        html+=`</button>`
                    html+=`</div>`
                    html+=`<div id="collapse-previewSoal" class="accordion-collapse collapse" data-bs-parent="#accordion_propertiesPreview">`;
                        html+=`<div class="accordion-body" id="sorotUpdate_tampilansoal">`;
                            // html+=`DISINI AKAN MUNCUL TAMPILAN SOAL YANG ANDA SOROT (BLOK)`;
                        html+=`</div>`;
                    html+=`</div>`
                html+=`</div>`;
                
            html+=`</div>`;
    return html;
}
const templateCreatePerItemBankSoal = ()=>{
    return `<div id="divTextEditor"></div><div id="realtimeInputTextEditor">${viewAccordion()}</div>
            <div class="col-md-12 mt-2 text-center" id="wraperTombolSimpanResetSoalBaru" style="display: block;"><button id="resetItemSoal" class="btn btn-sm py-0 accord-bg border-bottom border-danger rounded-pill border-start-0 border-end-0 border-top-0 mx-2">Reset</button><button id="simpanItemSoal" class="btn btn-sm py-0 accord-bg border-bottom border-danger rounded-pill border-start-0 border-end-0 border-top-0 mx-2">Simpan</button></div>`;
}
const tabelPropertikurikulummodal = (prefikid,data)=>{
    const {propertikd,namakurikulum} = data;
    let html ="";
    if(namakurikulum == 'kurmer'){

        html+=`<table class="w3-table-all font8">`;
                html+=`<tr><th class="text-center align-middle">Elemen</th><th class="text-center align-middle">ATP</th><th class="text-center align-middle">Pilih</th></tr>`;
                let elemenUnique =  [...new Set(propertikd.map(n=> n.elemen))];
                elemenUnique.forEach(elemen=>{
                        html+=`<tr>`;
                        let countElemen = propertikd.filter(s=> s.elemen == elemen);
                        if(countElemen.length == 1){
                            html+=`<td class="text-wrap">${elemen}</td>`;
                            html+=`<td><label for="${prefikid}_${countElemen[0].idbaris}"> ${countElemen[0].atp}</td>`;
                            html+=`<td><input type="radio" name="${prefikid}" id="${prefikid}_${countElemen[0].idbaris}" value="${countElemen[0].idbaris}"/></td>`;
                        }else{
                            html+=`<td class="text-wrap" rowspan="${countElemen.length}">${elemen}</td>`;
                            for(let i = 0 ; i < countElemen.length ; i++){
                                    html+=`<td><label for="${prefikid}_${countElemen[i].idbaris}"> ${countElemen[i].atp}</td>`;
                                    html+=`<td><input type="radio" name="${prefikid}" id="${prefikid}_${countElemen[i].idbaris}" value="${countElemen[i].idbaris}"/></td>`;
                                if(i < countElemen.length-1){
                                    html+=`</tr><tr>`;
                                }
                            }
                        }
                        html+=`</tr>`;
                    });
                html+=`</table>`;
    }else{
        html+=`<table class="w3-table-all font8">`;
        html+=`<tr><th class="text-center align-middle">Kode Mapel</th><th class="text-center align-middle">Indikator KD3</th><th class="text-center align-middle">Pilih</th></tr>`;
        let mapelUnique =  [...new Set(propertikd.map(n=> n.mapel))];
        mapelUnique.forEach(elemen=>{
                html+=`<tr>`;
                let countElemen = propertikd.filter(s=> s.mapel == elemen);
                if(countElemen.length == 1){
                    html+=`<td class="text-wrap">${elemen}</td>`;
                    html+=`<td><label for="${prefikid}_${countElemen[0].baris}">${countElemen[0].kd3}. ${countElemen[0].indikatorkd3}</td>`;
                    html+=`<td><input type="radio" name="${prefikid}" id="${prefikid}_${countElemen[0].baris}" value="${countElemen[0].baris}"/></td>`;
                }else{
                    html+=`<td class="text-wrap" rowspan="${countElemen.length}">${elemen}</td>`;
                    for(let i = 0 ; i < countElemen.length ; i++){
                        html+=`<td><label for="${prefikid}_${countElemen[i].baris}">${countElemen[i].kd3}. ${countElemen[i].indikatorkd3}</td>`;
                        html+=`<td><input type="radio" name="${prefikid}" id="${prefikid}_${countElemen[i].baris}" value="${countElemen[i].baris}"/></td>`;
                        if(i < countElemen.length-1){
                            html+=`</tr><tr>`;
                        }
                    }
                }
                html+=`</tr>`;
            });
        html+=`</table>`;
    }
    return html;
}
const previewBankSoal = (data,bentuksoal)=>{
    
    let html ="";
    let isPG = (bentuksoal == 'Pilihan Ganda');
    let dd = `<div id="divformatOpsi" style="font-size:8px;text-align:center">
        Tampilan Opsi:<br>
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" class="btn-check" name="btnradiotampilanopsi" id="vertical" autocomplete="off" checked=""> 
            <label class="btn btn-outline-primary w3-tiny" for="vertical">Vertikal</label>
            <input type="radio" class="btn-check" name="btnradiotampilanopsi" id="kubik" autocomplete="off"> 
            <label class="btn btn-outline-primary w3-tiny" for="kubik">Kubik</label>
            <input type="radio" class="btn-check" name="btnradiotampilanopsi" id="horizontal" autocomplete="off"> 
            <label class="btn btn-outline-primary w3-tiny" for="horizontal">Horizontal</label>
        </div>
    </div>`
    html+=`<div class="card mb-2 mt-1 font14">
                        <div class="card-header d-flex justify-content-between align-items-center mb-3 pb-0 accord-bg">
                        <h5>Pratinjau</h5>
                            <div class="text-center py-2 w-75" id="controlItemSoal">
                                <div class="rounded">
                                    <button class="mbs_awal btn btn-sm anim-bg-gradient">Awal</button>
                                    <button class="mbs_prev btn btn-sm anim-bg-gradient">Sebelumnya</button>
                                    <span class="mbs_infohalaman border px-2 pb-2 pt-0">1 dari xx</span> 
                                    <button class="mbs_next btn btn-sm anim-bg-gradient">Selanjutnya</button> 
                                    <button class="mbs_akhir btn btn-sm anim-bg-gradient">Akhir</button> 
                                    <input type="text" class="mbs_valuecari py-0 form-control mt-1" placeholder="ketikkan kata kunci"> 
                                </div>
                                ${isPG?dd:''}
                            </div>
                        </div>
                        <div class="card-body position-relative">
                            <div id="editsoalini" class="position-absolute top-0 end-0 p-2 translate-middle border rounded-pill btn btn-light" role="button" title="Edit Soal ini">Edit</div>
                            <div id="previewItemSoalPagination" class="border p-2">previewItemSoalPagination</div>
                            <div id="propertiItemSoalPaginationJawaban" class="border p-2">Jawaban/Pembahasan/Penskoran:</div>
                        </div>
                    </div>`
    return html;
}
const viewModalSetSoal = (data,bentuksoal)=>{
    
    let menu = [
        {
            id:'tabmodal_menu1',
            title_tab:'Koleksi Soal',
            body_html:rowCols.rows('mb-2',
                rowCols.cols('col-md-3',
                    cardMenu2('Properti Kurikulum',tabelPropertikurikulummodal('selectedPropertiKD',data),false)
                )
                +
                rowCols.cols('col-md-9',
                    previewBankSoal(data,bentuksoal)
                )+
                rowCols.cols('col-md-12 text-center my-3',
                    `<button class='btn btn-sm anim-bg-gradient border-5 border-warning border-start-0 border-bottom border-top-0 border-end-0 rounded-pill' id="terapkan_replacewithout">Terapkan Tanpa Ilustrasi</button>
                    <button class='btn btn-sm anim-bg-gradient border-5 border-warning border-start-0 border-bottom border-top-0 border-end-0 rounded-pill' id="terapkan_replace">Terapkan</button>`
                )
            )
        },
        {
            id:'tabmodal_menu2',
            title_tab:'Buat Soal',
            body_html:rowCols.rows('mb-2',
                rowCols.cols('col-md-3', cardMenu2('Properti Kurikulum',tabelPropertikurikulummodal('selectedPropertiKDbaru',data),false))+
                rowCols.cols('col-md-9',
                    templateCreatePerItemBankSoal()
                )

            )
        },
        {
            id:'tabmodal_menu3',
            title_tab:'Sisipkan',
            body_html:'Sisipkan Keterangan'
        },
        {
            id:'tabmodal_menu4',
            title_tab:'Edit Soal',
            body_html:rowCols.rows('mb-2 justify-content-center',
                rowCols.cols('col-md-8',
                    cardMenu2('Edit Soal',`<div id="editsoaleditorwraper"></div>`,false)
                )+
                rowCols.cols('col-md-4',
                    cardMenu2('Data',`<div id="previewdata"></div>`,false)
                )+
                rowCols.cols('col-md-6',
                    cardMenu('Preview Soal',
                    `<div id="previewsoaledit"></div>`,false

                    )
                )+
                rowCols.cols('col-md-12 text-center',
                    `<button class='btn d-none btn-sm anim-bg-gradient border-5 border-warning border-start-0 border-bottom border-top-0 border-end-0 rounded-pill' id="terapkan_replaceedit">Terapkan</button>`
                )

            )
        }
    
    ];
    let menus =  tabs.MenuTab(menu);

    return tabs.wraperMainControl(menus);
};
const tombolCreateDesainFinal = ()=>{
    let html="";
    html+=`<div class="sticky-md-bottom accord-bg text-center my-3 py-2 print-hide">
    <button class="btn btn-sm anim-bg-gradient border-bottom border-5 border-warning border-start-0 border-top-0 border-end-0 rounded-pill py-1 px-3" id="btnLihatKisikisiDesain">Lihat Kisi-kisi</button>
    <button class="btn btn-sm anim-bg-gradient border-bottom border-5 border-warning border-start-0 border-top-0 border-end-0 rounded-pill py-1 px-3" id="btnLihatKisikisiDesainView">Lihat Kisi-kisi dan Soal</button>
    <button class="btn btn-sm anim-bg-gradient border-bottom border-5 border-warning border-start-0 border-top-0 border-end-0 rounded-pill py-1 px-3" id="btnLihatKunciJawaban">Lihat Kunci Jawaban</button>
    <button class="btn btn-sm anim-bg-gradient border-bottom border-5 border-warning border-start-0 border-top-0 border-end-0 rounded-pill py-1 px-3" id="btnSimpanServerDesain">Simpan Server</button>
    </div>`;
    return html;
}
const viewDesainNaskah = {
    'toolbar':toolbarDesainNaskah,
    'tabelPropertiKurikulum':tabelPropertiKurikulum,
    'modalSoal':viewModalSetSoal,
    'editorsoalbaru':templateCreatePerItemBankSoal
}
export default viewDesainNaskah;