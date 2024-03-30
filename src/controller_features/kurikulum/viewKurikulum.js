import { tabelDom } from "../../entries/vendor"


const stringToDom = (string)=>{
    const template= document.createElement('template');
    template.innerHTML = string;
    return template.content;
}
export const viewHTMLElemenCp = (data)=>{
    
    let config = {
        tableAtribut:{
            id:'tabel_properti_kurikulum',
            class:'w3-table-all toExcel table-sm mt-5 font12',
        },
        db:data,
        
        atributeColumn:{
            'html_elemen':{class:'p-0 align-middle'},
            'html_cp_utama':{class:'p-0'},
            'html_kode_elemen':{class:'p-0 align-middle'},
            'html_aksiedit':{class:'text-center align-middle print-hide'}
            
        },
        headers:[
            {
                columns:[
                    {label:'Elemen',atribute:{style:"width:130px"}},
                    {label:'Capaian Pembelajaran (umum)'},
                    {label:'Kode Elemen',atribute:{style:"width:75px"}},
                    {label:'Aksi',atribute:{class:'print-hide'}}
                ]
            }
        ],
        body:[
            'html_elemen',
            'html_cp_utama',
            'html_kode_elemen',
            'html_aksiedit'
        ],
        footer:()=>{
            let html = "";
            html+=`<tr title="Form untuk menambahkan Properti Elemen dan CP" class="print-hide">`;
                        html+=`<td class="p-0 bg-info-subtle"><textarea data-update="elemen" data-baris="" class="form-control border-0 bg-transparent m-0 rounded-0"></textarea></td>`;
                        html+=`<td class="p-0 bg-info-subtle"><textarea data-update="cp_utama" data-baris="" class="form-control border-0 bg-transparent m-0 rounded-0"></textarea></td>`;
                        html+=`<td class="p-0 bg-info-subtle align-middle"><input type="number" min="1" data-update="kode_elemen" data-baris="" value="${data.length+1}" class="form-control border-0 bg-transparent m-0 border-0 rounded-0 text-center p-2"/></td>`;
                        html+=`<td class="text-center bg-info-subtle align-middle print-hide" title="Tambah">
                        <span class="btn btn-outline-success shadow-lg py-0" role="button"  data-aksi="tambah" data-dataproperti="" ><i class="bi bi-patch-plus"></i></span>
                        </td>`;
                    html+=`</tr>`;
            return stringToDom(html);
        }
    }
    return new tabelDom(config).init()
}
export const viewHTMLTp = (data)=>{
    
    let config = {
        tableAtribut:{
            id:'tabel_properti_kurikulum',
            class:'w3-table-all toExcel table-sm mt-5 font12',
        },
        db:data,
        
        headers:[
            {
                columns:[
                    {label:'Elemen',atribute:{style:'width:160px'}},
                    {label:'Capaian Pembelajaran',atribute:{style:'width:250px'}},
                    {label:'Tujuan Pembelajaran (Sub Elemen CP)'},
                    {label:'Aksi',atribute:{class:'print-hide'}}
                ]
            }
        ],
        body:()=>{
            let html = "";
            data.forEach((n,indeks)=>{
                html+=`<tr>`;
                if(n.tp.length == 0){
                    html+=`<td class="text-center align-middle">${n.elemen}</td>`;
                        html+=`<td class="font8">${n.cp_utama}</td>`;
                        html+=`<td class="p-0"><textarea data-update="tp" style="height:auto" placeholder="Tambahkan TP untuk Elemen/CP ini" class="form-control border-0 bg-transparent m-0 rounded-0 print-hide"></textarea></td>`;
                        html+=`<td class="text-center bg-info-subtle align-middle print-hide" title="Tambah">
                        <input type="hidden" value="${n.idbaris}" data-update="foreignkey_elemencp"/>
                                <span class="btn btn-outline-success shadow-lg py-0" role="button" data-foreignkeycp="${n.idbaris}" data-aksi="tambah" data-dataproperti="" ><i class="bi bi-patch-plus"></i></span>
                                </td>`;
                }else if(n.tp.length == 1){
                    html+=`<td class="text-center align-middle" rowspan="2">${n.elemen}</td>`;
                    html+=`<td rowspan="2">${n.cp_utama}</td>`;
                    html+=`<td class="p-0"><textarea data-update="tp" style="height:auto" placeholder="Tambahkan TP untuk Elemen/CP ini" class="form-control border-0 bg-transparent m-0 rounded-0">${n.tp[0].tp}</textarea></td>`;
                    html+=`<td class="text-center align-middle print-hide">
                                <span role="button" class="shadow-lg btn btn-outline-info p-1" data-foreignkeycp="${n.idbaris}" data-aksi="edit" data-dataproperti="${n.tp[0].idbaris}" title="Simpan Edit"><i class="bi bi-floppy"></i></span>
                                <span role="button" class="shadow-lg btn btn-outline-danger p-1" data-foreignkeycp="${n.tp[0].foreignkey_elemencp}" data-aksi="hapus" data-dataproperti="${n.tp[0].idbaris}" title="Hapus"><i class="bi bi-trash"></i></span>
                                </td>`;
                    html+=`</tr><tr>`;
                    html+=`<td class="p-0"><textarea data-update="tp" style="height:auto" placeholder="Tambahkan TP untuk Elemen/CP ini" class="form-control border-0 bg-transparent m-0 rounded-0 print-hide"></textarea></td>`;
                    html+=`<td class="text-center bg-info-subtle align-middle print-hide" title="Tambah">
                    <input type="hidden" value="${n.idbaris}" data-update="foreignkey_elemencp"/>
                            <span class="btn btn-outline-success shadow-lg py-0" role="button"  data-foreignkeycp="${n.idbaris}" data-aksi="tambah" data-dataproperti="" ><i class="bi bi-patch-plus"></i></span>
                            </td>`;
                }else{
                    html+=`<td class="text-center align-middle" rowspan="${n.tp.length+1}">${n.elemen}</td>`;
                            html+=`<td rowspan="${n.tp.length+1}">${n.cp_utama}</td>`;
                            for(let i = 0 ; i < n.tp.length; i++){
                                html+=`<td class="p-0"><textarea data-update="tp" style="height:auto" placeholder="Tambahkan TP untuk Elemen/CP ini" class="form-control border-0 bg-transparent m-0 rounded-0">${n.tp[i].tp}</textarea></td>`;
                                html+=`<td class="text-center align-middle print-hide">
                                        <span role="button" class="shadow-lg btn btn-outline-info p-1" data-foreignkeycp="${n.tp[i].foreignkey_elemencp}" data-aksi="edit" data-dataproperti="${n.tp[i].idbaris}" title="Simpan Edit"><i class="bi bi-floppy"></i></span>
                                        <span role="button" class="shadow-lg btn btn-outline-danger p-1" data-foreignkeycp="${n.idbaris}" data-aksi="hapus" data-dataproperti="${n.tp[i].idbaris}" title="Hapus"><i class="bi bi-trash"></i></span>
                                        </td>`;
                                if(i < n.tp.length - 1){
                                    html+=`</tr><tr>`
                                }
                            }
                            html+=`</tr><tr>`;
                            // html+=`<td class="text-center align-middle">${cp.elemen}</td>`;
                            // html+=`<td class="font8">${cp.cp_utama}</td>`;
                            html+=`<td class="p-0"><textarea data-update="tp" style="height:auto" placeholder="Tambahkan TP untuk Elemen/CP ini" class="form-control border-0 bg-transparent m-0 rounded-0 print-hide"></textarea></td>`;
                            html+=`<td class="text-center bg-info-subtle align-middle print-hide" title="Tambah">
                            <input type="hidden" value="${n.idbaris}" data-update="foreignkey_elemencp"/>
                                    <span class="btn btn-outline-success shadow-lg py-0" role="button"  data-foreignkeycp="${n.idbaris}" data-aksi="tambah" data-dataproperti="" ><i class="bi bi-patch-plus"></i></span>
                                    </td>`;
                }
                html+=`</tr>`;
            })
            return stringToDom(html)
        }
    }
    return new tabelDom(config).init()
}
export const viewHTMLAtp = (data,arraykelas)=>{
    
    let config = {
        tableAtribut:{
            id:'tabel_properti_kurikulum',
            class:'w3-table-all toExcel table-sm mt-5 font10',
        },
        db:data,
        
        headers:[
            {
                columns:[
                    {label:'Elemen',atribute:{style:'width:85px'}},
                    {label:'Capaian Pembelajaran (Tujuan Pembelajaran/Sub Elemen CP)',atribute:{style:'width:200px'}},
                    {label:'Alur Tujuan Pembelajaran'},
                    {label:'Diterapkan di Kelas',atribute:{style:'width:85px'}},
                    {label:'Aksi',atribute:{class:'print-hide'}}
                ]
            }
        ],
        body:()=>{
            let html = "";
            data.forEach((n,indeks)=>{
                let tp = n.tp;
                html+=`<tr>`;
                let atps = n.atp;
                if(atps.length == 0){
                    html+=`<td class="text-center align-middle">${n.elemen}</td>`;
                    html+=`<td class="p-0" onpointerover="this.querySelector('select').style.display='block';" onpointerleave="this.querySelector('select').style.display='none'">`;
                            html+=`<select data-update="foreignkey_tp" class="form-select border-0 bg-transparent" style="display:none" onchange="this.nextElementSibling.innerHTML=this.options[this.options.selectedIndex].text">`;
                            html+=`<option selected>Pilih CP</option>`;
                                tp.forEach(li=>{
                                    html+=`<option value="${li.idbaris}">${li.tp}</option>`;
                                })
                            html+=`</select>`;
                            // let cekTP = tpIndex.filter(s=>s.idbaris == atps[i].foreignkey_tp);
                            // let tpSelect = cekTP.length>0?cekTP[0].tp:'';
                            html+=`<div class="p-1"></div>`;
                        html+=`</td>`; 
                        html+=`<td class="p-0"><textarea data-update="atp" style="height:auto" placeholder="Tambahkan ATP untuk Elemen/CP ini" class="form-control border-0 bg-transparent m-0 rounded-0"></textarea></td>`
                        html+=`<td class="text-center">`;
                                arraykelas.forEach((kelas,indklas)=>{
                                    html+=`<div class="form-check form-check-inline">`;
                                    html+=`<input type="checkbox" class="form-check-input" data-update="kelas" id="penerapankelas_kelas_${kelas}_${indeks+indklas}_${indeks+indklas}_p" value="${kelas}">`;
                                    html+=`<label for="penerapankelas_kelas_${kelas}_${indeks+indklas}_${indeks+indklas}_p">${kelas}</label>`;
                                    html+=`</div>`;
                                });
                                
                        html+=`</td>`;
                        html+=`<td class="text-center bg-info-subtle align-middle print-hide" title="Tambah">
                        <input type="hidden" value="${n.idbaris}" data-update="foreignkey_elemencp"/>
                                        <span class="btn btn-outline-success shadow-lg py-0" role="button"  data-foreignkeycp="${n.idbaris}" data-aksi="tambah" data-dataproperti="" ><i class="bi bi-patch-plus"></i></span>
                                        </td>`;
                        
                }else if (atps.length == 1){
                    html+=`<td class="text-center align-middle" rowspan="2">${n.elemen}</td>`
                    html+=`<td class="p-0" onpointerover="this.querySelector('select').style.display='block';" onpointerleave="this.querySelector('select').style.display='none'">`;
                            html+=`<select data-update="foreignkey_tp" class="form-select border-0 bg-transparent" style="display:none" onchange="this.nextElementSibling.innerHTML=this.options[this.options.selectedIndex].text">`;
                            html+=`<option ${atps[0].foreignkey_tp==''?'selected':''}>Pilih CP</option>`;
                                tp.forEach(li=>{
                                    html+=`<option value="${li.idbaris}" ${li.idbaris == atps[0].foreignkey_tp?'selected':''}>${li.tp}</option>`;
                                })
                            html+=`</select>`;
                            // let cekTP = tpIndex.filter(s=>s.idbaris == atps[i].foreignkey_tp);
                            // let tpSelect = cekTP.length>0?cekTP[0].tp:'';
                            html+=`<div class="p-1">${atps[0].tp_in_atp}</div>`;
                        html+=`</td>`;  
                        html+=`<td class="p-0"><textarea data-update="atp" style="height:auto" placeholder="Tambahkan ATP untuk Elemen/CP ini" class="form-control border-0 bg-transparent m-0 rounded-0">${atps[0].atp}</textarea></td>`
                        
                        
                        html+=`<td class="text-center">`;
                        arraykelas.forEach((kelas,indklas)=>{
                            html+=`<div class="form-check form-check-inline">`;
                            
                            let atr='';
                                    if(atps[0].kelas!==""){
                                        atr = atps[0].kelas.indexOf(kelas.toString())>-1?'checked':'';
                                    }
                                html+=`<input type="checkbox" class="form-check-input" data-update="kelas" id="penerapankelas_kelas_${kelas}_${indeks+indklas}_${indeks+indklas}_${atps[0].idbaris}"
                                value="${kelas}"  ${atr}>`;
                                html+=`<label for="penerapankelas_kelas_${kelas}_${indeks+indklas}_${indeks+indklas}_${atps[0].idbaris}">${kelas}</label>`;
                            html+=`</div>`;
                        });
                        html+=`</td>`;
                        html+=`<td class="text-center align-middle print-hide">
                                
                                <span role="button" class="shadow-lg btn btn-outline-info p-1" data-foreignkeycp="${n.idbaris}" data-aksi="edit" data-dataproperti="${n.idbaris}" title="Simpan Edit"><i class="bi bi-floppy"></i></span>
                                <span role="button" class="shadow-lg btn btn-outline-danger p-1" data-foreignkeycp="${n.idbaris}" data-aksi="hapus" data-dataproperti="${n.idbaris}" title="Hapus"><i class="bi bi-trash"></i></span>
                                </td>`;

                    html+=`</tr><tr>`;
                    
                    html+=`<td class="p-0" onpointerover="this.querySelector('select').style.display='block';" onpointerleave="this.querySelector('select').style.display='none'">`;
                            html+=`<select data-update="foreignkey_tp" class="form-select border-0 bg-transparent" style="display:none" onchange="this.nextElementSibling.innerHTML=this.options[this.options.selectedIndex].text">`;
                            html+=`<option selected>Pilih CP</option>`;
                                tp.forEach(li=>{
                                    html+=`<option value="${li.idbaris}">${li.tp}</option>`;
                                })
                            html+=`</select>`;
                            // let cekTP = tpIndex.filter(s=>s.idbaris == atps[i].foreignkey_tp);
                            // let tpSelect = cekTP.length>0?cekTP[0].tp:'';
                            html+=`<div class="p-1"></div>`;
                        html+=`</td>`; 
                        html+=`<td class="p-0"><textarea data-update="atp" style="height:auto" placeholder="Tambahkan ATP untuk Elemen/CP ini" class="form-control border-0 bg-transparent m-0 rounded-0"></textarea></td>`
                        
                    
                        html+=`<td class="text-center">`;
                        arraykelas.forEach((kelas,indes)=>{
                            html+=`<div class="form-check form-check-inline">`;
                                html+=`<input type="checkbox" class="form-check-input" data-update="kelas" id="penerapankelas_kelas_${kelas}_${indeks+indes}_${indes}_p"
                                value="${kelas}" >`;
                                html+=`<label for="penerapankelas_kelas_${kelas}_${indeks+indes}_${indes}_p">${kelas}</label>`;
                            html+=`</div>`;
                        });
                        html+=`</td>`;
                        html+=`<td class="text-center bg-info-subtle align-middle print-hide" title="Tambah">
                        <input type="hidden" value="${n.idbaris}" data-update="foreignkey_elemencp"/>
                                <span class="btn btn-outline-success shadow-lg py-0" role="button"  data-foreignkeycp="${n.idbaris}" data-aksi="tambah" data-dataproperti="" ><i class="bi bi-patch-plus"></i></span>
                                </td>`;

                }else{
                    html+=`<td class="text-center align-middle" rowspan="${atps.length+1}">${n.elemen}</td>`;
                    atps.forEach((atp,i)=>{
                        html+=`<td class="p-0" onpointerover="this.querySelector('select').style.display='block';" onpointerleave="this.querySelector('select').style.display='none'">`;
                            html+=`<select data-update="foreignkey_tp" class="form-select border-0 bg-transparent" style="display:none" onchange="this.nextElementSibling.innerHTML=this.options[this.options.selectedIndex].text">`;
                            html+=`<option ${atp.foreignkey_tp==''?'selected':''}>Pilih CP</option>`;
                                tp.forEach(li=>{
                                    html+=`<option value="${li.idbaris}" ${li.idbaris == atp.foreignkey_tp?'selected':''}>${li.tp}</option>`;
                                })
                            html+=`</select>`;
                            // let cekTP = tpIndex.filter(s=>s.idbaris == atps[i].foreignkey_tp);
                            // let tpSelect = cekTP.length>0?cekTP[0].tp:'';
                            html+=`<div class="p-1">${atp.tp_in_atp}</div>`;
                        html+=`</td>`;
                        html+=`<td class="p-0"><textarea data-update="atp" style="height:auto" placeholder="Tambahkan ATP untuk Elemen/CP ini" class="form-control border-0 bg-transparent m-0 rounded-0">${atp.atp}</textarea></td>`
                        html+=`<td class="text-center">`;
                        arraykelas.forEach((kelas,indklas)=>{
                            html+=`<div class="form-check form-check-inline">`;
                            
                            let atr='';
                                    if(atp.kelas!==""){
                                        atr = atp.kelas.indexOf(kelas.toString())>-1?'checked':'';
                                    }
                                html+=`<input type="checkbox" class="form-check-input" data-update="kelas" id="penerapankelas_kelas_${kelas}_${indeks+indklas}_${indeks+indklas}_${atp.idbaris}"
                                value="${kelas}"  ${atr}>`;
                                html+=`<label for="penerapankelas_kelas_${kelas}_${indeks+indklas}_${indeks+indklas}_${atp.idbaris}">${kelas}</label>`;
                            html+=`</div>`;
                        });
                        html+=`</td>`;
                        
                        html+=`<td class="text-center align-middle print-hide">
                        <span role="button" class="shadow-lg btn btn-outline-info p-1" data-foreignkeycp="${atp.foreignkey_elemencp}" data-aksi="edit" data-dataproperti="${atp.idbaris}" title="Simpan Edit"><i class="bi bi-floppy"></i></span>
                        <span role="button" class="shadow-lg btn btn-outline-danger p-1" data-foreignkeycp="${atp.foreignkey_elemencp}" data-aksi="hapus" data-dataproperti="${atp.idbaris}" title="Hapus"><i class="bi bi-trash"></i></span>
                        </td>`;
                        if(i < atps.length-1){
                            html+=`</tr><tr>`
                        }
                    })
                    html+=`</tr><tr>`;
                    html+=`<td class="p-0" onpointerover="this.querySelector('select').style.display='block';" onpointerleave="this.querySelector('select').style.display='none'">`;
                            html+=`<select data-update="foreignkey_tp" class="form-select border-0 bg-transparent" style="display:none" onchange="this.nextElementSibling.innerHTML=this.options[this.options.selectedIndex].text">`;
                            html+=`<option selected>Pilih CP</option>`;
                                tp.forEach(li=>{
                                    html+=`<option value="${li.idbaris}">${li.tp}</option>`;
                                })
                            html+=`</select>`;
                            // let cekTP = tpIndex.filter(s=>s.idbaris == atps[i].foreignkey_tp);
                            // let tpSelect = cekTP.length>0?cekTP[0].tp:'';
                            html+=`<div class="p-1"></div>`;
                        html+=`</td>`; 
                        html+=`<td class="p-0"><textarea data-update="atp" style="height:auto" placeholder="Tambahkan ATP untuk Elemen/CP ini" class="form-control border-0 bg-transparent m-0 rounded-0"></textarea></td>`
                        html+=`<td class="text-center">`;
                                arraykelas.forEach((kelas,indes)=>{
                                    html+=`<div class="form-check form-check-inline">`;
                                        html+=`<input type="checkbox" class="form-check-input" data-update="kelas" id="penerapankelas_kelas_${kelas}_${indeks+indes}_${indes}_p"
                                        value="${kelas}" >`;
                                        html+=`<label for="penerapankelas_kelas_${kelas}_${indeks+indes}_${indes}_p">${kelas}</label>`;
                                    html+=`</div>`;
                                });
                                html+=`</td>`;
                                
                                html+=`<td class="text-center bg-info-subtle align-middle print-hide" title="Tambah">
                                <input type="hidden" value="${n.idbaris}" data-update="foreignkey_elemencp"/>
                                        <span class="btn btn-outline-success shadow-lg py-0" role="button"  data-foreignkeycp="${n.idbaris}" data-aksi="tambah" data-dataproperti="" ><i class="bi bi-patch-plus"></i></span>
                                        </td>`;
                }
                html+=`</tr>`;
            })
            return stringToDom(html)
        }
    }
    return new tabelDom(config).init()
}
export const viewHTMLk1 = (data)=>{
    let config = {
        tableAtribut:{
            id:'tabel_properti_kurikulum',
            class:'w3-table-all toExcel table-sm mt-5 font12',
        },
        db:data,
        
        atributeColumn:{
            'kd1':{class:'text-center'},
            'html_indikator_k1':{class:'p-0 align-middle'},
            'indikator':{class:'p-0'},
            'aksi':{class:'print-hide'}
            // 'html_kode_elemen':{class:'p-0 align-middle'},
            // 'html_aksiedit':{class:'text-center align-middle print-hide'}
            
        },
        headers:[
            {
                columns:[
                    {label:'No KD',atribute:{style:"width:50px"}},
                    {label:'Indikator'},
                    {label:'Diterapkan di Semester',atribute:{style:"width:100px"}},
                    {label:'Aksi',atribute:{class:'print-hide',style:"width:75px"}}
                ]
            }
        ],
        body:[
            'kd1',
            'html_indikator_k1',
            'penerapan_semester',
            'aksi',
        ],
        // footer:()=>{
        //     let html = "";
        //     html+=`<tr title="Form untuk menambahkan Properti Elemen dan CP" class="print-hide">`;
        //                 html+=`<td class="p-0 bg-info-subtle"><textarea data-update="elemen" data-baris="" class="form-control border-0 bg-transparent m-0 rounded-0"></textarea></td>`;
        //                 html+=`<td class="p-0 bg-info-subtle"><textarea data-update="cp_utama" data-baris="" class="form-control border-0 bg-transparent m-0 rounded-0"></textarea></td>`;
        //                 html+=`<td class="p-0 bg-info-subtle align-middle"><input type="number" min="1" data-update="kode_elemen" data-baris="" value="${data.length+1}" class="form-control border-0 bg-transparent m-0 border-0 rounded-0 text-center p-2"/></td>`;
        //                 html+=`<td class="text-center bg-info-subtle align-middle print-hide" title="Tambah">
        //                 <span class="btn btn-outline-success shadow-lg py-0" role="button"  data-aksi="tambah" data-dataproperti="" ><i class="bi bi-patch-plus"></i></span>
        //                 </td>`;
        //             html+=`</tr>`;
        //     return stringToDom(html);
        // }
    }
    return new tabelDom(config).init()
}
export const viewHTMLk2 = (data)=>{
    let config = {
        tableAtribut:{
            id:'tabel_properti_kurikulum',
            class:'w3-table-all toExcel table-sm mt-5 font12',
        },
        db:data,
        
        atributeColumn:{
            'kd2':{class:'text-center'},
            'html_indikator_k2':{class:'p-0 align-middle'},
            'indikator':{class:'p-0'},
            'aksi':{class:'print-hide'}
            // 'html_kode_elemen':{class:'p-0 align-middle'},
            // 'html_aksiedit':{class:'text-center align-middle print-hide'}
            
        },
        headers:[
            {
                columns:[
                    {label:'No KD',atribute:{style:"width:50px"}},
                    {label:'Indikator'},
                    {label:'Diterapkan di Semester',atribute:{style:"width:100px"}},
                    {label:'Aksi',atribute:{class:'print-hide',style:"width:75px"}}
                ]
            }
        ],
        body:[
            'kd2',
            'html_indikator_k2',
            'penerapan_semester',
            'aksi',
        ],
        // footer:()=>{
        //     let html = "";
        //     html+=`<tr title="Form untuk menambahkan Properti Elemen dan CP" class="print-hide">`;
        //                 html+=`<td class="p-0 bg-info-subtle"><textarea data-update="elemen" data-baris="" class="form-control border-0 bg-transparent m-0 rounded-0"></textarea></td>`;
        //                 html+=`<td class="p-0 bg-info-subtle"><textarea data-update="cp_utama" data-baris="" class="form-control border-0 bg-transparent m-0 rounded-0"></textarea></td>`;
        //                 html+=`<td class="p-0 bg-info-subtle align-middle"><input type="number" min="1" data-update="kode_elemen" data-baris="" value="${data.length+1}" class="form-control border-0 bg-transparent m-0 border-0 rounded-0 text-center p-2"/></td>`;
        //                 html+=`<td class="text-center bg-info-subtle align-middle print-hide" title="Tambah">
        //                 <span class="btn btn-outline-success shadow-lg py-0" role="button"  data-aksi="tambah" data-dataproperti="" ><i class="bi bi-patch-plus"></i></span>
        //                 </td>`;
        //             html+=`</tr>`;
        //     return stringToDom(html);
        // }
    }
    return new tabelDom(config).init()
}
export const viewHTMLk = (k, data)=>{
    let config = {
        tableAtribut:{
            id:'tabel_properti_kurikulum',
            class:'w3-table-all toExcel table-sm mt-5 font12',
        },
        db:data,
        
        atributeColumn:{
            ['kd'+k]:{class:'text-center'},
            ['html_indikator_k'+k]:{class:'p-0 align-middle'},
            'indikator':{class:'p-0'},
            'aksi':{class:'print-hide'}
            // 'html_kode_elemen':{class:'p-0 align-middle'},
            // 'html_aksiedit':{class:'text-center align-middle print-hide'}
            
        },
        headers:[
            {
                columns:[
                    {label:'No KD',atribute:{style:"width:50px"}},
                    {label:'Indikator'},
                    {label:'Diterapkan di Semester',atribute:{style:"width:100px"}},
                    {label:'Aksi',atribute:{class:'print-hide',style:"width:75px"}}
                ]
            }
        ],
        body:[
            'kd'+k,
            'html_indikator_k'+k,
            'penerapan_semester',
            'aksi',
        ],
        // footer:()=>{
        //     let html = "";
        //     html+=`<tr title="Form untuk menambahkan Properti Elemen dan CP" class="print-hide">`;
        //                 html+=`<td class="p-0 bg-info-subtle"><textarea data-update="elemen" data-baris="" class="form-control border-0 bg-transparent m-0 rounded-0"></textarea></td>`;
        //                 html+=`<td class="p-0 bg-info-subtle"><textarea data-update="cp_utama" data-baris="" class="form-control border-0 bg-transparent m-0 rounded-0"></textarea></td>`;
        //                 html+=`<td class="p-0 bg-info-subtle align-middle"><input type="number" min="1" data-update="kode_elemen" data-baris="" value="${data.length+1}" class="form-control border-0 bg-transparent m-0 border-0 rounded-0 text-center p-2"/></td>`;
        //                 html+=`<td class="text-center bg-info-subtle align-middle print-hide" title="Tambah">
        //                 <span class="btn btn-outline-success shadow-lg py-0" role="button"  data-aksi="tambah" data-dataproperti="" ><i class="bi bi-patch-plus"></i></span>
        //                 </td>`;
        //             html+=`</tr>`;
        //     return stringToDom(html);
        // }
    }
    return new tabelDom(config).init()
}
export const viewHTMLKKMKKTP = (data,kkmkktp)=>{
    let config = {
        tableAtribut:{
            id:'tabel_properti_kurikulum',
            class:'w3-table-all toExcel table-sm mt-5 font12',
        },
        db:data,
        
        atributeColumn:{
            'auto':{class:'text-center'},
            'kodemapel':{class:'text-center'},
            '_htmlkkm':{class:'p-0'},
            '_htmlpengayaan':{class:'p-0'},
            '_aksi':{class:'print-hide'}
            // 'html_kode_elemen':{class:'p-0 align-middle'},
            // 'html_aksiedit':{class:'text-center align-middle print-hide'}
            
        },
        headers:[
            {
                columns:[
                    {label:'No'},
                    {label:'Kode Mapel'},
                    {label:'Nama Mapel'},
                    {label:kkmkktp},
                    {label:'Pengayaan'},
                    {label:'Aksi'}
                ]
            }
        ],
        body:[
            'auto','kodemapel','_mapelteks','_htmlkkm','_htmlpengayaan','_aksi'
        ],
        // footer:()=>{
        //     let html = "";
        //     html+=`<tr title="Form untuk menambahkan Properti Elemen dan CP" class="print-hide">`;
        //                 html+=`<td class="p-0 bg-info-subtle"><textarea data-update="elemen" data-baris="" class="form-control border-0 bg-transparent m-0 rounded-0"></textarea></td>`;
        //                 html+=`<td class="p-0 bg-info-subtle"><textarea data-update="cp_utama" data-baris="" class="form-control border-0 bg-transparent m-0 rounded-0"></textarea></td>`;
        //                 html+=`<td class="p-0 bg-info-subtle align-middle"><input type="number" min="1" data-update="kode_elemen" data-baris="" value="${data.length+1}" class="form-control border-0 bg-transparent m-0 border-0 rounded-0 text-center p-2"/></td>`;
        //                 html+=`<td class="text-center bg-info-subtle align-middle print-hide" title="Tambah">
        //                 <span class="btn btn-outline-success shadow-lg py-0" role="button"  data-aksi="tambah" data-dataproperti="" ><i class="bi bi-patch-plus"></i></span>
        //                 </td>`;
        //             html+=`</tr>`;
        //     return stringToDom(html);
        // }
    }
    return new tabelDom(config).init()
}
export const htmlTaksonomiBloom = (data)=>{
    const lk = [... new Set(data.map(n=>n.levelkognitif))];

    let html ="";
    html+=`<h3 class="text-center">Taksonomi Bloom</h3>`;
    html+=`<div class="table-responsive">`;
    html+=`<table class="table table-sm table-bordered">`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th class="text-center align-middle">Level Kognitif (Kode)</th>`;
                html+=`<th class="text-center align-middle">Taksonomi Kognitif (tipe C)</th>`;
                html+=`<th class="text-center align-middle">Kata Kerja Operasional (KKO)</th>`;
                html+=`<th class="text-center align-middle">Aksi</th>`;
            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;
        lk.forEach((lk,i)=>{
            let c = data.filter(s=>s.levelkognitif == lk);
            let uniq_c = [... new Set(c.map(s=>s.tipe))];
            html+=`<tr>`;
                html+=`<td rowspan="${c.length+uniq_c.length}" class="text-center">${lk}</td>`;
                uniq_c.forEach((uc,j)=>{
                    let dataC = data.filter(s=>s.levelkognitif == lk && s.tipe== uc);
                    html+=`<td rowspan="${dataC.length+1}" class="text-center">${uc}</td>`;
                    dataC.forEach((kko,k)=>{
                        
                        // html+=`<td>${kko.kko}</td>`;
                        html+=`<td class="p-0">`;
                            html+=`<input type="text" class="form-control bg-transparent m-0 border-0" data-update="kko" value="${kko.kko}" data-ref="${kko.idbaris}"/>`;
                        html+=`</td>`;

                        html+=`<td>`;
                            html+=`<button class="btn btn-sm text-bg-info" data-aksi="edit" data-ref="${kko.idbaris}"><i class="bi-pencil"></i></button>`;
                        html+=`</td>`;
                        if(k < dataC.length-1){
                            html+=`</tr><tr>`;
                        }
                    })
                    if(j < uniq_c.length){
                        html+=`<tr>`;
                        html+=`<td class="text-bg-info p-0">`;
                            html+=`<input type="text" class="form-control bg-transparent m-0" data-update="kko" data-ref="${dataC[dataC.length-1].idbaris}"/>`;
                        html+=`</td>`;
                        html+=`<td class="text-bg-info p-0">`;
                        html+=`<button class="btn btn-sm text-bg-success" data-aksi="tambah" data-ref="${dataC[dataC.length-1].idbaris}"><i class="bi-floppy-fill"></i></button>`;
                        html+=`</td>`;
                        html+=`</tr><tr>`;
                    }

                });
            html+=`</tr>`;
        })
        
        html+=`</tbody>`;
    html+=`</table>`;
    html+=`</div>`;
    return html;
}
export const viewPropertiKurkulum = (data)=>{
    const {tipe,orm,kelasFase} = data;
    if(tipe =='properti_elemencp'){
        return viewHTMLElemenCp(orm);
    }else if(tipe == 'properti_tp'){
        return viewHTMLTp(orm);
    }else if(tipe == 'properti_atp'){
        return viewHTMLAtp(orm,kelasFase);
    }else if(tipe == 'properti_k1'){
        // return viewHTMLk1(orm);
        return viewHTMLk(1,orm);
    }else if(tipe == 'properti_k1umum'){
        // return viewHTMLk1(orm);
        return viewHTMLk('1',orm);
    }else if(tipe == 'properti_k2'){
        // return viewHTMLk2(orm);
        return viewHTMLk(2,orm);
    }else if(tipe == 'properti_k2umum'){
        // return viewHTMLk2(orm);
        return viewHTMLk('2',orm);
    }else if(tipe == 'properti_k3'){
        return viewHTMLk(3,orm);
    }else if(tipe == 'properti_k4'){
        return viewHTMLk(4,orm);
    }else if(tipe == 'properti_kkmkktp'){
        return viewHTMLKKMKKTP(orm,kelasFase);
    }else{
        return 'Fitur dalam tahap pengembangan untuk '+tipe;
    }
}