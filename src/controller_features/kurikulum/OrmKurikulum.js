import { CollectionsEdu } from "../../models/CollectionsEdu";


export default class OrmKurkulum{
    #jenjangKurikulum;
    #kurikulumService;
    #collection;
    constructor(dataService,jenjang){
        this.#kurikulumService = dataService;
        this.#jenjangKurikulum = jenjang;
        this.#collection=null;

    }
    set jenjang(x){
        this.#jenjangKurikulum = x;
    }
    get jenjang(){
        return this.#jenjangKurikulum;
    }
    get db(){
        return this.#kurikulumService;
    }

    properti_elemencp(data){
        return new CollectionsEdu(this.#kurikulumService.elemencp)
        .simpleFilter({fase:data.abjadfase,kodemapel:data.mapel})
        // .uniqueByProperty('kodemapel')
        .exceptFilter({elemen:''})
        .addProperty('html_elemen',(n)=>`<textarea data-update="elemen" data-baris="${n.idbaris}" class="form-control border-0 bg-transparent m-0 rounded-0">${n.elemen}</textarea>`)
        .addProperty('html_cp_utama',(n)=>`<textarea data-update="cp_utama" style="height:auto" data-baris="${n.idbaris}" class="form-control border-0 bg-transparent m-0 rounded-0">${n.cp_utama}</textarea>`)
        .addProperty('html_kode_elemen',(n)=>`<input type="number" min="1" data-update="kode_elemen" data-baris="${n.idbaris}" class="form-control border-0 bg-transparent m-0 border-0 rounded-0 text-center p-2" value="${n.kode_elemen}"/>`)
        .addProperty('html_aksiedit',(n)=>`<span role="button" class="shadow-lg btn btn-outline-info p-1" data-aksi="edit" data-dataproperti="${n.idbaris}" title="Simpan Edit"><i class="bi bi-floppy"></i></span> <span role="button" class="shadow-lg btn btn-outline-danger p-1" data-aksi="hapus" data-dataproperti="${n.idbaris}" title="Hapus"><i class="bi bi-trash"></i></span>`)
        .sortByProperty('kode_elemen')
        .data;
    }
    properti_tp(data){
        let elemen = this.properti_elemencp(data);
        let tpatp = this.#kurikulumService.faseTPATP;
        let banksoal = this.#kurikulumService.banksoal
        return new CollectionsEdu(elemen)
                .addProperty('tp',(n)=> {
                    return new CollectionsEdu(this.#kurikulumService[data.properti])//.filter(s=> s.foreignkey_elemencp == n.idbaris && s.tp !=="").map(b=>b.tp)
                        .simpleFilter({foreignkey_elemencp:n.idbaris})
                        .exceptFilter({tp:''})
                        .addProperty('elemen',()=>n.elemen)
                        .addProperty('cp_utama',()=>n.cp_utama)
                        .addProperty('atp',(item_tp)=>{
                            return new CollectionsEdu(tpatp)
                                .simpleFilter({foreignkey_elemencp:n.idbaris, foreignkey_tp:item_tp.idbaris})
                                
                                .addProperty('banksoalids',(u)=>{
                                    return banksoal.filter(s=> s.kd == u.idbaris).length;
                                })
                                .addProperty('Arrbanksoalids',(u)=>{
                                    return banksoal.filter(s=> s.kd == u.idbaris);//.length;
                                })
                                .selectProperties(['idbaris','atp','foreignkey_tp','kelas','banksoalids'])
                                .data;
                                })
                        .addProperty('banksoalids',(n)=>{
                            let countSoal =  n.atp.map(soal=> soal.banksoalids).filter(s=> s>0);//.length
                            let reduceCountSoal = 0;
                            if(countSoal.length>0){
                                reduceCountSoal = countSoal.reduce((a,b)=>parseInt(a)+parseInt(b));
                            };
                            return reduceCountSoal;
                            // return n.atp.map(soal=> soal.banksoalids).filter(s=> s>0);//.length;
                        })
                                
                        .selectProperties(['idbaris','elemen','cp_utama','tp','atp','foreignkey_elemencp','banksoalids'])
                        .data
                })
                
                .data;

    }
    properti_atp(data){
        
        data.properti = 'fase'+data.abjadfase;
        let elemen = this.properti_tp(data);
        let tpatp = this.#kurikulumService.faseTPATP;
        let banksoal = this.#kurikulumService.banksoal
        return new CollectionsEdu(elemen)
            .addProperty('atp',(n)=>{
                let datatp = n.tp.map(t=>parseInt(t.idbaris));
                let co_elemen = n.elemen;
                return new CollectionsEdu(tpatp)
                    .customFilter((a)=>{
                        return a.foreignkey_elemencp == n.idbaris && datatp.includes(parseInt(a.foreignkey_tp)) && a.apt!=="";
                    })
                    .addProperty('tp_in_atp',(b)=>{
                        return n.tp.filter(s=>s.idbaris == b.foreignkey_tp)[0].tp;
                    })
                    .addProperty('banksoalids',(u)=>{
                        return banksoal.filter(s=> s.kd == u.idbaris).length;
                    })
                    .addProperty('Arrbanksoalids',(u)=>{
                        return banksoal.filter(s=> s.kd == u.idbaris);//.length;
                    })
                    .setProperty('kelas',(a)=>{
                        return String(a).replace(/(\s+)/,'').split(',');
                    })
                    .sortByProperty('foreignkey_tp','asc')
                    .selectProperties(['idbaris','foreignkey_tp','tp_in_atp','atp','kelas','banksoalids','Arrbanksoalids'])
                    .data;
                    })
            
            .addProperty('banksoalids',(n)=>{
                let countSoal =  n.atp.map(soal=> soal.banksoalids).filter(s=> s>0);//.length
                let reduceCountSoal = 0;
                if(countSoal.length>0){
                    reduceCountSoal = countSoal.reduce((a,b)=>parseInt(a)+parseInt(b));
                };
                return reduceCountSoal;
                // return n.atp.map(soal=> soal.banksoalids).filter(s=> s>0);//.length;
            })
            // .selectProperties(['elemen','cp_utama','tp','atp','idbaris'])
            .data;
    }

    properti_k1(v){
        let namaTab = v.properti;//'k1kelas'+this.jenjang;
        let data = this.#kurikulumService[namaTab]
        
        return new CollectionsEdu(data)
                .simpleFilter({kodemapel:v.mapel})
                .exceptFilter({indikatorkd1:''})
                .addProperty('html_indikator_k1',(n)=>{
                    return `<textarea class="form-control border-0 bg-transparent m-0 rounded-0" data-update="indikatorkd1"  id="indikatorkd1_${n.kd1.split('.').join('_')}">${n.indikatorkd1}</textarea>`;
                })
                .addProperty('html_penerapan_semester1',(n)=>{
                    let tabel = ""
                        tabel+=`<div class="form-check form-check-inline">`;
                            tabel+=`<input type="checkbox" class="form-check-input" data-kompetensisemster="1" data-nokd="${n.kd1}" id="semester1_kd_${n.kd1.split('.').join('_')}">`;
                            tabel+=`<label for="semester1_kd_${n.kd1.split('.').join('_')}">1</label>`;
                        tabel+=`</div>`;
                        return tabel
                })
                .addProperty('html_penerapan_semester2',(n)=>{
                    let tabel = ""
                        tabel+=`<div class="form-check form-check-inline">`;
                            tabel+=`<input type="checkbox" class="form-check-input" data-kompetensisemster="2" data-update="semester1" value="${n.kd1}" data-nokd="${n.kd1}" id="semester2_kd_${n.kd1.split('.').join('_')}">`;
                            tabel+=`<label for="semester2_kd_${n.kd1.split('.').join('_')}">2</label>`;
                        tabel+=`</div>`;
                        return tabel
                })
                .addProperty('penerapan_semester',(n)=>{
                    let tabel = ""
                        tabel+=`<div class="form-check form-check-inline">`;
                            tabel+=`<input type="checkbox" class="form-check-input" data-kompetensisemster="1" ${Boolean(n.semester1)?'checked':''} data-update="semester1" value="${n.kd1}" data-nokd="${n.kd1}" id="semester1_kd_${n.kd1.split('.').join('_')}">`;
                            tabel+=`<label for="semester1_kd_${n.kd1.split('.').join('_')}">1</label>`;
                        tabel+=`</div>`;
                        tabel+=`<div class="form-check form-check-inline">`;
                            tabel+=`<input type="checkbox" class="form-check-input" data-kompetensisemster="2" ${Boolean(n.semester2)?'checked':''} data-update="semester2" value="${n.kd1}" data-nokd="${n.kd1}" id="semester2_kd_${n.kd1.split('.').join('_')}">`;
                            tabel+=`<label for="semester2_kd_${n.kd1.split('.').join('_')}">2</label>`;
                        tabel+=`</div>`;
                        return tabel;
                })
                .addProperty('aksi',(n)=>{
                    return `<span role="button" class="shadow-lg btn btn-outline-info p-1" data-aksi="edit" data-dataproperti="${n.idbaris}" title="Simpan Edit"><i class="bi bi-floppy"></i></span>
                    <span role="button" class="shadow-lg btn btn-outline-danger p-1" data-aksi="hapus" data-dataproperti="${n.idbaris}" title="Hapus"><i class="bi bi-trash"></i></span>
                    `;
                })
                .sortByProperty('kd1','asc')
                .data;
    }
    properti_k2(v){
        let namaTab = v.properti;//'k1kelas'+this.jenjang;
        let data = this.#kurikulumService[namaTab]
        
        return new CollectionsEdu(data)
                .simpleFilter({kodemapel:v.mapel})
                .exceptFilter({indikatorkd2:''})
                .addProperty('html_indikator_k2',(n)=>{
                    return `<textarea class="form-control border-0 bg-transparent m-0 rounded-0" data-update="indikatorkd2"  id="indikatorkd2_${n.kd2.split('.').join('_')}">${n.indikatorkd2}</textarea>`;
                })
                .addProperty('penerapan_semester',(n)=>{
                    let tabel = ""
                        tabel+=`<div class="form-check form-check-inline">`;
                            tabel+=`<input type="checkbox" class="form-check-input" data-kompetensisemster="1" ${Boolean(n.semester1)?'checked':''} data-update="semester1" value="${n.kd2}" data-nokd="${n.kd2}" id="semester1_kd_${n.kd2.split('.').join('_')}">`;
                            tabel+=`<label for="semester1_kd_${n.kd2.split('.').join('_')}">1</label>`;
                        tabel+=`</div>`;
                        tabel+=`<div class="form-check form-check-inline">`;
                            tabel+=`<input type="checkbox" class="form-check-input" data-kompetensisemster="2" ${Boolean(n.semester2)?'checked':''} data-update="semester2" value="${n.kd2}" data-nokd="${n.kd2}" id="semester2_kd_${n.kd2.split('.').join('_')}">`;
                            tabel+=`<label for="semester2_kd_${n.kd2.split('.').join('_')}">2</label>`;
                        tabel+=`</div>`;
                        return tabel;
                })
                .addProperty('aksi',(n)=>{
                    return `<span role="button" class="shadow-lg btn btn-outline-info p-1" data-aksi="edit" data-dataproperti="${n.idbaris}" title="Simpan Edit"><i class="bi bi-floppy"></i></span>
                    <span role="button" class="shadow-lg btn btn-outline-danger p-1" data-aksi="hapus" data-dataproperti="${n.idbaris}" title="Hapus"><i class="bi bi-trash"></i></span>
                    `;
                })
                .sortByProperty('kd2','asc')
                .data;
    }
    properti_k1umum(v){
        let namaTab = v.properti;//'k1kelas'+this.jenjang;
        let data = this.#kurikulumService[namaTab]
        
        return new CollectionsEdu(data)
                .simpleFilter({kodemapel:'umum'})
                .exceptFilter({indikatorkd1:''})
                .addProperty('html_indikator_k1',(n)=>{
                    return `<textarea class="form-control border-0 bg-transparent m-0 rounded-0" data-update="indikatorkd1"  id="indikatorkd1_${n.kd1.split('.').join('_')}">${n.indikatorkd1}</textarea>`;
                })
                .addProperty('html_penerapan_semester1',(n)=>{
                    let tabel = ""
                        tabel+=`<div class="form-check form-check-inline">`;
                            tabel+=`<input type="checkbox" class="form-check-input" data-kompetensisemster="1" data-nokd="${n.kd1}" id="semester1_kd_${n.kd1.split('.').join('_')}">`;
                            tabel+=`<label for="semester1_kd_${n.kd1.split('.').join('_')}">1</label>`;
                        tabel+=`</div>`;
                        return tabel
                })
                .addProperty('html_penerapan_semester2',(n)=>{
                    let tabel = ""
                        tabel+=`<div class="form-check form-check-inline">`;
                            tabel+=`<input type="checkbox" class="form-check-input" data-kompetensisemster="2" data-update="semester1" value="${n.kd1}" data-nokd="${n.kd1}" id="semester2_kd_${n.kd1.split('.').join('_')}">`;
                            tabel+=`<label for="semester2_kd_${n.kd1.split('.').join('_')}">2</label>`;
                        tabel+=`</div>`;
                        return tabel
                })
                .addProperty('penerapan_semester',(n)=>{
                    let tabel = ""
                        tabel+=`<div class="form-check form-check-inline">`;
                            tabel+=`<input type="checkbox" class="form-check-input" data-kompetensisemster="1" ${Boolean(n.semester1)?'checked':''} data-update="semester1" value="${n.kd1}" data-nokd="${n.kd1}" id="semester1_kd_${n.kd1.split('.').join('_')}">`;
                            tabel+=`<label for="semester1_kd_${n.kd1.split('.').join('_')}">1</label>`;
                        tabel+=`</div>`;
                        tabel+=`<div class="form-check form-check-inline">`;
                            tabel+=`<input type="checkbox" class="form-check-input" data-kompetensisemster="2" ${Boolean(n.semester2)?'checked':''} data-update="semester2" value="${n.kd1}" data-nokd="${n.kd1}" id="semester2_kd_${n.kd1.split('.').join('_')}">`;
                            tabel+=`<label for="semester2_kd_${n.kd1.split('.').join('_')}">2</label>`;
                        tabel+=`</div>`;
                        return tabel;
                })
                .addProperty('aksi',(n)=>{
                    return `<span role="button" class="shadow-lg btn btn-outline-info p-1" data-aksi="edit" data-dataproperti="${n.idbaris}" title="Simpan Edit"><i class="bi bi-floppy"></i></span>
                    <span role="button" class="shadow-lg btn btn-outline-danger p-1" data-aksi="hapus" data-dataproperti="${n.idbaris}" title="Hapus"><i class="bi bi-trash"></i></span>
                    `;
                })
                .sortByProperty('kd1','asc')
                .data;
    }
    properti_k2umum(v){
        let namaTab = v.properti;//'k1kelas'+this.jenjang;
        let data = this.#kurikulumService[namaTab]
        
        return new CollectionsEdu(data)
                .simpleFilter({kodemapel:'umum'})
                .exceptFilter({indikatorkd2:''})
                .addProperty('html_indikator_k2',(n)=>{
                    return `<textarea class="form-control border-0 bg-transparent m-0 rounded-0" data-update="indikatorkd2"  id="indikatorkd2_${n.kd2.split('.').join('_')}">${n.indikatorkd2}</textarea>`;
                })
                .addProperty('penerapan_semester',(n)=>{
                    let tabel = ""
                        tabel+=`<div class="form-check form-check-inline">`;
                            tabel+=`<input type="checkbox" class="form-check-input" data-kompetensisemster="1" ${Boolean(n.semester1)?'checked':''} data-update="semester1" value="${n.kd2}" data-nokd="${n.kd2}" id="semester1_kd_${n.kd2.split('.').join('_')}">`;
                            tabel+=`<label for="semester1_kd_${n.kd2.split('.').join('_')}">1</label>`;
                        tabel+=`</div>`;
                        tabel+=`<div class="form-check form-check-inline">`;
                            tabel+=`<input type="checkbox" class="form-check-input" data-kompetensisemster="2" ${Boolean(n.semester2)?'checked':''} data-update="semester2" value="${n.kd2}" data-nokd="${n.kd2}" id="semester2_kd_${n.kd2.split('.').join('_')}">`;
                            tabel+=`<label for="semester2_kd_${n.kd2.split('.').join('_')}">2</label>`;
                        tabel+=`</div>`;
                        return tabel;
                })
                .addProperty('aksi',(n)=>{
                    return `<span role="button" class="shadow-lg btn btn-outline-info p-1" data-aksi="edit" data-dataproperti="${n.idbaris}" title="Simpan Edit"><i class="bi bi-floppy"></i></span>
                    <span role="button" class="shadow-lg btn btn-outline-danger p-1" data-aksi="hapus" data-dataproperti="${n.idbaris}" title="Hapus"><i class="bi bi-trash"></i></span>
                    `;
                })
                .sortByProperty('kd2','asc')
                .data;
    }
    properti_k3(v){
        let namaTab = v.properti;//'k1kelas'+this.jenjang;
        let data = this.#kurikulumService[namaTab]
        
        return new CollectionsEdu(data)
                .simpleFilter({mapel:v.mapel})
                .exceptFilter({indikatorkd3:''})
                .addProperty('html_indikator_k3',(n)=>{
                    return `<textarea class="form-control border-0 bg-transparent m-0 rounded-0" data-update="indikatorkd3"  id="indikatorkd3_${n.kd3.split('.').join('_')}">${n.indikatorkd3}</textarea>`;
                })
                .addProperty('penerapan_semester',(n)=>{
                    let tabel = ""
                        tabel+=`<div class="form-check form-check-inline">`;
                            tabel+=`<input type="checkbox" class="form-check-input" data-kompetensisemster="1" ${Boolean(n.semester1)?'checked':''} data-update="semester1" value="${n.kd3}" data-nokd="${n.kd3}" id="semester1_kd_${n.kd3.split('.').join('_')}">`;
                            tabel+=`<label for="semester1_kd_${n.kd3.split('.').join('_')}">1</label>`;
                        tabel+=`</div>`;
                        tabel+=`<div class="form-check form-check-inline">`;
                            tabel+=`<input type="checkbox" class="form-check-input" data-kompetensisemster="2" ${Boolean(n.semester2)?'checked':''} data-update="semester2" value="${n.kd3}" data-nokd="${n.kd3}" id="semester2_kd_${n.kd3.split('.').join('_')}">`;
                            tabel+=`<label for="semester2_kd_${n.kd3.split('.').join('_')}">2</label>`;
                        tabel+=`</div>`;
                        return tabel;
                })
                .addProperty('aksi',(n)=>{
                    return `<span role="button" class="shadow-lg btn btn-outline-info p-1" data-aksi="edit" data-dataproperti="${n.baris}" title="Simpan Edit"><i class="bi bi-floppy"></i></span>
                    <span role="button" class="shadow-lg btn btn-outline-danger p-1" data-aksi="hapus" data-dataproperti="${n.baris}" title="Hapus"><i class="bi bi-trash"></i></span>
                    `;
                })
                .sortByProperty('kd3','asc')
                .data;
    }
    
    properti_k4(v){
        let namaTab = v.properti;//'k1kelas'+this.jenjang;
        let data = this.#kurikulumService[namaTab]
        
        return new CollectionsEdu(data)
                .simpleFilter({mapel:v.mapel})
                .exceptFilter({indikatorkd4:''})
                .addProperty('html_indikator_k4',(n)=>{
                    return `<textarea class="form-control border-0 bg-transparent m-0 rounded-0" data-update="indikatorkd4"  id="indikatorkd4_${n.kd4.split('.').join('_')}">${n.indikatorkd4}</textarea>`;
                })
                .addProperty('penerapan_semester',(n)=>{
                    let tabel = ""
                        tabel+=`<div class="form-check form-check-inline">`;
                            tabel+=`<input type="checkbox" class="form-check-input" data-kompetensisemster="1" ${Boolean(n.semester1)?'checked':''} data-update="semester1" value="${n.kd4}" data-nokd="${n.kd4}" id="semester1_kd_${n.kd4.split('.').join('_')}">`;
                            tabel+=`<label for="semester1_kd_${n.kd4.split('.').join('_')}">1</label>`;
                        tabel+=`</div>`;
                        tabel+=`<div class="form-check form-check-inline">`;
                            tabel+=`<input type="checkbox" class="form-check-input" data-kompetensisemster="2" ${Boolean(n.semester2)?'checked':''} data-update="semester2" value="${n.kd4}" data-nokd="${n.kd4}" id="semester2_kd_${n.kd4.split('.').join('_')}">`;
                            tabel+=`<label for="semester2_kd_${n.kd4.split('.').join('_')}">2</label>`;
                        tabel+=`</div>`;
                        return tabel;
                })
                .addProperty('aksi',(n)=>{
                    return `<span role="button" class="shadow-lg btn btn-outline-info p-1" data-aksi="edit" data-dataproperti="${n.idbaris}" title="Simpan Edit"><i class="bi bi-floppy"></i></span>
                    <span role="button" class="shadow-lg btn btn-outline-danger p-1" data-aksi="hapus" data-dataproperti="${n.idbaris}" title="Hapus"><i class="bi bi-trash"></i></span>
                    `;
                })
                .sortByProperty('kd4','asc')
                .data;
    }
    
    get faseA(){
        let dbElemen = this.#kurikulumService.elemencp;
        
    }
    
    
    
}