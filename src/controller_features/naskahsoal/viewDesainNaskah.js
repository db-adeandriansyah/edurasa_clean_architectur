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
    htmlmenukelas+=inputsElements.formInputRadio('kelas'+jenjang,'Kelas '+jenjang,jenjang,true,'arraykelas',' data-pradesain="kelas"');
    menukelas.forEach(n=>{
        htmlmenukelas+=inputsElements.formInputRadio('kelas'+n,'Kelas '+n,n,true,'arraykelas',' data-pradesain="kelas"');
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
                cardMenu('Durasi (otomatis)',inputsElements.floatingNumber('durasi','Durasi (Menit)',0,' disabled',0,),false)
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
    const {_htmlkoleksimapel,_htmlkoleksimapelWithTema,shortKurikulum,jenjang} = data;
    let htmlmapel = "";
    let judulsebaran = 'ATP'
    if(shortKurikulum == 'kurmer'){
        htmlmapel+=inputsElements.floatingSelect('selectmapel','Pilih Mata Pelajaran',_htmlkoleksimapel,'',' data-pradesain="mapel"')
        
    }else{
        judulsebaran = 'KD'
        htmlmapel+=inputsElements.floatingSelect('selectmapel','Pilih Mata Pelajaran',_htmlkoleksimapelWithTema,'PAI',' data-pradesain="mapel"')
        
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

const tabelPropertiKurikulum = (kurikulum,orm)=>{
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
                        html+=`<th class="text-center text-bg-secondary">Kompetensi Dasar</th>`
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
                        html+=`</tr>`;
                    })
                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;
    }
    return html;
}
const menuDraft = ()=>{
    return rowCols.rows('mb-2 justify-content-center',
        rowCols.cols('col-md-6 shadow-lg rounded',
            'TIDAK ADA DRAFT YANG ANDA SIMPAN'
        )
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
                body_html:menuDraft()
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
const tabelPropertikurikulummodal = (data)=>{
    const {propertikd,namakurikulum} = data;
    console.log('prop',propertikd,namakurikulum);
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
                            html+=`<td><label for="selectedPropertiKDbaru_${countElemen[0].idbaris}"> ${countElemen[0].atp}</td>`;
                            html+=`<td><input type="radio" name="selectedPropertiKDbaru" id="selectedPropertiKDbaru_${countElemen[0].idbaris}" value="${countElemen[0].idbaris}"/></td>`;
                        }else{
                            html+=`<td class="text-wrap" rowspan="${countElemen.length}">${elemen}</td>`;
                            for(let i = 0 ; i < countElemen.length ; i++){
                                    html+=`<td><label for="selectedPropertiKDbaru_${countElemen[i].idbaris}"> ${countElemen[i].atp}</td>`;
                                    html+=`<td><input type="radio" name="selectedPropertiKDbaru" id="selectedPropertiKDbaru_${countElemen[i].idbaris}" value="${countElemen[i].idbaris}"/></td>`;
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
                    html+=`<td><label for="selectedPropertiKDbaru_${countElemen[0].baris}">${countElemen[0].kd3}. ${countElemen[0].indikatorkd3}</td>`;
                    html+=`<td><input type="radio" name="selectedPropertiKDbaru" id="selectedPropertiKDbaru_${countElemen[0].baris}" value="${countElemen[0].baris}"/></td>`;
                }else{
                    html+=`<td class="text-wrap" rowspan="${countElemen.length}">${elemen}</td>`;
                    for(let i = 0 ; i < countElemen.length ; i++){
                        html+=`<td><label for="selectedPropertiKDbaru_${countElemen[i].baris}">${countElemen[i].kd3}. ${countElemen[i].indikatorkd3}</td>`;
                        html+=`<td><input type="radio" name="selectedPropertiKDbaru" id="selectedPropertiKDbaru_${countElemen[i].baris}" value="${countElemen[i].baris}"/></td>`;
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
const viewModalSetSoal = (data)=>{
    
    console.log(data);
    let menu = [
        {
            id:'tabmodal_menu1',
            title_tab:'Koleksi Soal',
            body_html:rowCols.rows('mb-2',
                rowCols.cols('col-md-3',
                    cardMenu2('test','kolom pertama',false)
                )
                +
                rowCols.cols('col-md-9',
                    cardMenu2('test2','pagination soal dan previewnya',false)
                )
            )
        },
        {
            id:'tabmodal_menu2',
            title_tab:'Buat Soal',
            body_html:rowCols.rows('mb-2',
                rowCols.cols('col-md-3', cardMenu2('Properti Kurikulum',tabelPropertikurikulummodal(data),false))+
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
            body_html:'Edit Soal'
        }
    
    ];
    let menus =  tabs.MenuTab(menu);

    return tabs.wraperMainControl(menus);
}
const viewDesainNaskah = {
    'toolbar':toolbarDesainNaskah,
    'tabelPropertiKurikulum':tabelPropertiKurikulum,
    'modalSoal':viewModalSetSoal,
    'editorsoalbaru':templateCreatePerItemBankSoal
}
export default viewDesainNaskah;