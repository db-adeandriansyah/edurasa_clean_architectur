import { CollectionsEdu,FormatTanggal,TableProperties,tabelDom,umur } from "../../entries/vendor";
import { ttd } from "../../views/tandatangan/ttd";
export class DataKelas{
    constructor(siswaServices,Modal){
        this.sortirBy = 'pd_nama';
        this.service = siswaServices;
        this.Modal = Modal;
        this.workplace = document.getElementById('printarea');
        this.callbackFinished=null;
        this.htmlJudul = '';
    }
    set headingHTML(html){
        this.htmlJudul = html;
    }
    get headingHTML (){
        return this.htmlJudul;
    }
    accomplishedTo(cb){
        this.callbackFinished = cb;
    }
    run(rombel,method='showRombel'){
        const elementSortir = document.querySelectorAll('input[name=sorter]');
        
        if(elementSortir.length>0){
            elementSortir.forEach(element=>{
                element.onchange = (e)=>{
                    this.sortirBy = e.target.value;
                    this.workplace.innerHTML = this.htmlJudul + this[method](rombel,this.sortirBy);
                    this.propertiesTabel('.toExcel')
                    this.registeredClickedEdit('run',rombel,method);
                };
            });
            document.querySelectorAll('input[name=sorter]:checked')[0].dispatchEvent(new Event('change'));
        }
            this.registeredClickedEdit('run',rombel,method);
        
    }
    checkboxKriteriaPencarian(ptk,setApp){
        const ceks = document.querySelectorAll('[data-control]');
        const btn = document.querySelector('#btnsearch');
        const header = document.querySelectorAll('[data-header]');
        const sorter = document.querySelectorAll('input[name=sorter]');
        ceks.forEach(el=>{
            el.onchange = (e)=>{
                let attr = e.target.getAttribute('data-control');
                let elefek = document.querySelectorAll(`[data-refcontrol=${attr}]`);
                if(el.checked){
                    for(let i = 0 ; i < elefek.length; i++){
                        if(elefek[i].hasAttribute('disabled')) elefek[i].removeAttribute('disabled');
                    }
                }else{
                    for(let i = 0 ; i < elefek.length; i++){
                        if(elefek[i].hasAttribute('disabled')) return;
                        elefek[i].setAttribute('disabled','true');
                    }
                }
                
            }
        });

        btn.onclick = ()=>{
            let c = [];
            let b = [];
            let sor = "id";
            ceks.forEach(el=>{
                if(el.checked){
                    let at = el.getAttribute('data-control')
                    let cb = document.querySelector(`input[data-refcontrol=${at}]`);
                    let qS = document.querySelector(`select[data-refcontrol=${at}]`)||document.querySelector(`input[data-refcontrol=${at}]`);
                    if(cb.checked){
                        let ob = {};
                        ob[at] = qS.value;
                        b.push(ob);
                    }else{
                        let ob = {};
                        ob[at] =qS.value;
                        c.push(ob);
                    }
                }
            });
            sorter.forEach(s=>{
                if(s.checked){
                    sor = s.value;
                }
            });
            const re = c.reduce((a,b)=>({...a,...b}),{});
            const excep =b.length>0? b.reduce((a,b)=>{
                return { ...a, ...b}
            },{}):{};
            
            let thd = []
            header.forEach(h=>{
                if(h.checked){
                    let s = h.getAttribute('data-header');
                    if(s == 'addKolom'){
                        let val = document.getElementById('inputaddKolom').value;
                        thd.push([s,val]);
                    }else{
                        thd.push(s);
                    }
                }
            });
            this.createTableCari(thd,sor,re,excep,ptk,setApp);
        }
    }
    
    createTableCari(column,sor,c,b,ptk,setApp){
        const dbSiswa = this.service.allSiswa;
        const db = new CollectionsEdu(dbSiswa.slice())
            .simpleFilter(c)
            .exceptFilter(b)
            .addProperty('umur',(item)=>item.pd_tanggallahir ==""?{tahun:0,bulan:0,hari:0}:umur(new Date(item.pd_tanggallahir))['tahun'])
            .addProperty('yatim',(item)=>{
                    let ayah = item.dapo_pekerjaanayah;
                    let ibu = item.dapo_pekerjaanibu;
                    let res = ""
                    if(ayah=="Meninggal Dunia" && ibu=="Meninggal Dunia"){
                        res = 'yatim/piatu'
                    }else if(ayah=="Meninggal Dunia" && ibu !=="Meninggal Dunia"){
                    res ='yatim'
                    }else if(ayah!=="Meninggal Dunia" && ibu =="Meninggal Dunia"){
                        res ='piatu'
                    }
                    return res
            })
            .addProperty('edit',(item)=>[
                { label: '<i class="bi-pencil"></i>', id: item.id, aksi:'detail', class:'btn-sm border-0 btn-rounded-pill py-0 text-bg-info mx-1' },
            ])
            .setProperty('nis',(item)=>item==""?"":item.toString())
            .selectProperties(['id','aktif','nama_rombel','jenjang','nis','nisn','pd_nama','pd_agama','pd_alamat','pd_jk','pd_tl','pd_tanggallahir','masuk_tgl','keluar_tgl','pindah_ke','dapo_sekolahasal','pd_namaayah','pd_namaibu','nik','nokk','smp_ke','awal_kelas','kelas_keluar','umur','edit','yatim'])
            .sortByProperty(sor,'asc');
            // .data;
        const data = db.data.slice();
        if(column.length == 0) return;
        //buatKunciLabel 
        let kunciLabel = Object.assign({},this.service.valuKeySiswa,{auto:'No. Urut',umur:'Umur',yatim:'Keterangan Yatim'});
        //buat data untuk head;
        let cHead = column.slice();
        let cBody = column.slice();
        
        cHead.unshift('auto');
        let arrayHeader = []
        if(['pd_tl','pd_tanggallahir'].every((item)=>cHead.includes(item))){
            let objColumn = {};
            let tempCHead = cHead.slice();
            let indexTl = tempCHead.indexOf('pd_tl');
            
            if(cHead.includes('edit')){
                let buanginEditTTL = cHead.filter(s =>!['edit','pd_tl','pd_tanggallahir'].includes(s));
                let arri = []
                for(let i = 0; i < buanginEditTTL.length ; i++){
                    let obji = {};
                    obji.label = kunciLabel[buanginEditTTL[i]];
                    obji.atribute={rowspan:2}
                    arri.push(obji);
                };
                let objEdit = {label:'Aksi',atribute:{rowspan:2,class:'print-hide'}};
                    arri.unshift(objEdit);
                    arri.splice(indexTl,0,{label:'Tempat Tanggal Lahir',atribute:{colspan:2}});
                    objColumn.columns = arri;
                    arrayHeader.push(objColumn);
                let arr2nd = [{label:'Tempat'},{label:'Tanggal'}]
                let obj2 = {columns:arr2nd};
                    arrayHeader.push(obj2);
                
                let hasKolom = cHead.some(item=>Array.isArray(item));
                if(hasKolom){
                    let lastIndex = cHead.length - 1;
                    let kolom = cHead[lastIndex];
                        arrayHeader[0].columns.splice(lastIndex,1);

                    let count = kolom[1];
                    for(let i = 0 ; i < parseInt(count) ; i++){
                        let obj ={};
                            obj.label = "Edit Kolom";
                            obj.atribute ={rowspan:2,contenteditable:true,spellcheck:false};
                            arrayHeader[0].columns.push(obj);
                    }
                }

            }else{
                let buanginEditTTL = cHead.filter(s =>!['pd_tl','pd_tanggallahir'].includes(s));
                let arri = []
                for(let i = 0; i < buanginEditTTL.length ; i++){
                    let obji = {};
                    obji.label = kunciLabel[buanginEditTTL[i]];
                    obji.atribute={rowspan:2}
                    arri.push(obji);
                };
                // let objEdit = {label:'Aksi',atribute:{rowspan:2,class:'print-hide'}};
                // arri.unshift(objEdit);
                arri.splice(indexTl-1,0,{label:'Tempat Tanggal Lahir',atribute:{colspan:2}});
                // objColumn.columns = arri;
                let obj1 = {columns:arri};
                arrayHeader.push(obj1);
                let arr2nd = [{label:'Tempat'},{label:'Tanggal'}]
                let obj2 = {columns:arr2nd};
                arrayHeader.push(obj2);
                
                let hasKolom = cHead.some(item=>Array.isArray(item));
                if(hasKolom){
                    let lastIndex = cHead.length - 1;
                    let kolom = cHead[lastIndex];
                    arrayHeader[0].columns.splice(lastIndex,1);

                    let count = kolom[1];
                    for(let i = 0 ; i < parseInt(count) ; i++){
                        let obj ={};
                        obj.label = "Edit Kolom";
                        obj.atribute ={rowspan:2,contenteditable:true,spellcheck:false};
                        arrayHeader[0].columns.push(obj)
                    }
                }
            }
        }else{
            if(cHead.includes('edit')){
                let buanginEditTTL = cHead.filter(s =>!['edit'].includes(s));
                let arri = []
                for(let i = 0; i < buanginEditTTL.length ; i++){
                    let obji = {};
                    obji.label = kunciLabel[buanginEditTTL[i]];
                    
                    arri.push(obji);
                };
                let objEdit = {label:'Aksi',atribute:{rowspan:2,class:'print-hide'}};
                arri.unshift(objEdit);
                
                let obj1 = {columns:arri};
                arrayHeader.push(obj1);
                let hasKolom = cHead.some(item=>Array.isArray(item));
                if(hasKolom){
                    let lastIndex = cHead.length - 1;
                    let kolom = cHead[lastIndex];
                    arrayHeader[0].columns.splice(lastIndex,1);

                    let count = kolom[1];
                    for(let i = 0 ; i < parseInt(count) ; i++){
                        let obj ={};
                        obj.label = "Edit Kolom";
                        obj.atribute ={contenteditable:true,spellcheck:false};
                        arrayHeader[0].columns.push(obj)
                    }
                }
            }else{
                let buanginEditTTL = cHead;//.filter(s =>!['edit'].includes(s));
                let arri = []
                for(let i = 0; i < buanginEditTTL.length ; i++){
                    let obji = {};
                    obji.label = kunciLabel[buanginEditTTL[i]];
                    arri.push(obji);
                };
                let obj1 = {columns:arri};
                arrayHeader.push(obj1);
                let hasKolom = cHead.some(item=>Array.isArray(item));
                if(hasKolom){
                    let lastIndex = cHead.length - 1;
                    let kolom = cHead[lastIndex];
                    arrayHeader[0].columns.splice(lastIndex,1);

                    let count = kolom[1];
                    for(let i = 0 ; i < parseInt(count) ; i++){
                        let obj ={};
                        obj.label = "Edit Kolom";
                        obj.atribute ={contenteditable:true,spellcheck:false};
                        arrayHeader[0].columns.push(obj)
                    }
                }
            }
        }
        
        // buat data untuk body:
        cBody.unshift('auto');
        if(cBody.includes('edit')){
            cBody.splice(cBody.indexOf('edit'),1);
            let objEdit = {'edit':(item)=>{
                let btn="";
                if(Array.isArray(item)){
                    item.forEach(el=>{
                        btn +=`<button data-button-id="${el.id}" class="${el.class}" data-aksi="${el.aksi}">${el.label}</button>`;
                    })
                }else{
                    btn +=item;
                }
                return btn;
            }};
            cBody.splice(0,0,objEdit);
            
            
        }
        if(['pd_tl','pd_tanggallahir'].every((item)=>cBody.includes(item))){
            let tli = cBody.indexOf('pd_tl');
            let removeTl = cBody.splice(cBody.indexOf('pd_tl'),1);
            cBody.splice(tli-1,0,removeTl[0]);

            let tgli = cBody.indexOf('pd_tanggallahir');
            let removeTgli = cBody.splice(tgli,1);
            cBody.splice(tgli-1,0,removeTgli[0]);
        }
        
        let hasKolom = cBody.some(item=>Array.isArray(item));
            if(hasKolom){
                let lastIndex = cBody.length - 1;
                let kolom = cBody[lastIndex];

                cBody.splice(lastIndex,1);

                let count = kolom[1];
                for(let i = 0 ; i < parseInt(count) ; i++){
                    let fn = {};
                    fn.addKolom = ()=>"";
                    cBody.push(fn);
                }
                
            }
            
        const ldatas = new CollectionsEdu(data).setProperty('pd_jk',(item)=>item=="L"?"Laki-laki":"Perempuan")
        .updatePropertyValues(this.service.arLabel.keyTgl,(v)=>v==""?"":new FormatTanggal(v).formatMedium());
        const ldata = ldatas.data.slice();
        let configTabel = {
            tableAtribut:{
                id:'tableCari',
                class:'w3-table-all toExcel'
            },
            db:ldata,
            atributeColumn:{
                'pd_nama':{class:'text-nowrap'},
                'pd_tanggallahir':{class:'text-nowrap'},
                'edit':{class:'print-hide'},
            },
            headers:arrayHeader,
            body:cBody
        };
        let kriteria ="";
        Object.entries(c).forEach(([k,v])=>{
            kriteria+=kunciLabel[k]+'nya '+(v==""?"kosong/tidak diisi":v) +', ';
        });
        
        Object.entries(b).forEach(([k,v])=>{
            kriteria+=kunciLabel[k]+'nya selain '+( v==""?"kosong/tidak diisi":v ) + ', ';
        });
        
        let konten = `<h3 class="text-center fw-bolder mb-0" contenteditable="true" spellcheck="false">Hasil Pencarian Data Siswa</h3>`;
            konten+=`<h3 class="text-center mb-3" contenteditable="true" spellcheck="false">Dengan kriteria ${kriteria}</h3>`;
        
        let tabel = new tabelDom(configTabel);
            this.workplace.innerHTML = konten + tabel.init();
        let tb = new TableProperties(document.querySelector('#tableCari'));
            tb.addScrollUpDown();
        
        if(c.hasOwnProperty('nama_rombel') && setApp.typeUser !='Guru Mapel'){
            this.tandatangan(ptk,setApp,c['nama_rombel']);
        }

        this.registeredClickedEdit()
    }
    tandatangan(ptk,setApp,rombel){
        // const ptk= this.App.LocalJson('ptk');
        const kepsek = ptk.filter(s=>s.kelas ==="Kepala Sekolah")[0];
        
        let objekUserDefault= {
            nama_kepsek:kepsek.guru_namalengkap,//
            nip_kepsek:"NIP. "+kepsek.guru_nip,
            nama_guru:setApp.namaUser,
            nip_guru:setApp.nipUser,
            nama_sekolah:setApp.namaSekolah

        }
        
        let guru = ptk.filter(s=> s.kelas == rombel)[0];
        objekUserDefault.nama_guru = guru.guru_namalengkap;
        objekUserDefault.nip_guru = guru.guru_nip==""?"-":"NIP. "+guru.guru_nip;
        
        const select = document.getElementById('formattd');;
        select.onchange = (e)=>{
            let dom = document.querySelector(".tandatangan");
            let kanan="",kiri="",tengah="";
            kiri+=`${setApp.alamatSekolahkota}, ${new Date().toLocaleString('id-ID',{'dateStyle':'long'})}`;
            kiri+=`<br>`;
            
            let guru = ptk.filter(s=> s.kelas == rombel)[0];
            switch(e.target.value){
                case "guru":
                    kanan="";
                    tengah="";
                    kiri +=`${guru.gurukelas_gmp} ${guru.kelas}<br><br><br><br><br>`;
                    kiri +=`<u><b>${objekUserDefault.nama_guru}</b></u><br/>${objekUserDefault.nip_guru}`;
                    break;
                case "kepsek":
                    kanan="";
                    tengah="";
                    kiri +=`Kepala ${setApp.namaSekolah}<br><br><br><br><br>`;
                    kiri +=`<u><b>${objekUserDefault.nama_kepsek}</b></u><br>${objekUserDefault.nip_kepsek}`;
                    break;
                case "kepsekguru":
                    kanan +=`Mengetahui,<br/>`;
                    kanan +=`Kepala ${setApp.namaSekolah}<br><br><br><br><br>`;
                    kanan +=`<u><b>${objekUserDefault.nama_kepsek}</b></u><br>${objekUserDefault.nip_kepsek}`;
                    tengah="";
                    kiri +=`${guru.gurukelas_gmp} ${guru.kelas}<br><br><br><br><br>`;
                    kiri +=`<u><b>${objekUserDefault.nama_guru}</b></u><br/>${objekUserDefault.nip_guru}`;
                    break;
                case "ortukepsekguru":
                    kanan +=`Mengetahui,<br/>`;
                    kanan +=`Kepala ${setApp.namaSekolah}<br><br><br><br><br>`;
                    kanan +=`<u><b>${objekUserDefault.nama_kepsek}</b></u><br>${objekUserDefault.nip_kepsek}`;
                    tengah ="Orang Tua/Wali<br><br><br><br><br>_______________";
                    kiri +=`${guru.gurukelas_gmp} ${guru.kelas}<br><br><br><br><br>`;
                    kiri +=`<u><b>${objekUserDefault.nama_guru}</b></u><br/>${objekUserDefault.nip_guru}`;
                    break;
            }
            
            if(e.target.value !=='none'){
                if(dom){
                    dom.remove();
                }
                let crDom = document.createElement('div');
                crDom.setAttribute('class','tandatangan');
                crDom.innerHTML =  ttd(kanan,tengah,kiri);
                this.workplace.appendChild(crDom);
            }else{
                if(dom){
                    dom.remove();
                }
            }

        }
    }
    propertiesTabel(queryTabel){
        
        let tb = new TableProperties(document.querySelector(queryTabel));
            tb.freezeColumn([0]);
            tb.addScrollUpDown(false);
    }
    // tabelDom(arg){
    //     return new this.tabel(arg);
    // }
    
    registeredClickedEdit(){
        const Modal = this.Modal;
        const actModal = document.querySelectorAll('[data-aksi=detail]');
        
        actModal.forEach(el=>{
            el.onclick = ()=>{
                let id = el.getAttribute('data-button-id');
                let objekSiswa = this.service.findSiswaById(id);
                let html = this.service.showFormatDetailSiswaInModal(id, Modal.createView.modalEditSiswa);
                let btn = `Setiap perubahan akan disimpan setelah Anda menekan tombol ini<br><button class="btn btn-sm btn-success" id="btnSimpanUpdateDbSiswa">Simpan Perubahan</button>`;
                
                Modal.settingHeder(objekSiswa.pd_nama);
                Modal.showBody(html);
                Modal.showFooter(btn)
                Modal.configService(this.service);
                Modal.eventModal(objekSiswa,()=>{
                    if(arguments.length > 0){
                        let parameters = [...arguments].filter((s,index)=> index>0)
                
                        this[arguments[0]](...parameters);
                    }else{
                        const btn = document.querySelector('#btnsearch');
                        btn.dispatchEvent(new Event('click'));
                    }
                });
                Modal.show();
            }
        })
    }
    registeredNewSiswa(){
        const tambah = document.querySelectorAll('[data-aksi="tambahsiswa"]');
        const Modal = this.Modal;
        const keyDb = this.service.objekKeyKosongDbSiswa();
        tambah.forEach(el=>{
            el.onclick = (e)=>{
                let data = el.getAttribute('data-rombel');
                // let id = el.getAttribute('data-button-id');
                // let objekSiswa = this.service.findSiswaById(id);
                // let html = this.service.showFormatDetailSiswaInModal(id, Modal.createView.modalEditSiswa);
                let btn = `Setiap perubahan akan disimpan setelah Anda menekan tombol ini<br><button class="btn btn-sm btn-success" id="btnSimpanUpdateDbSiswa">Simpan Perubahan</button>`;
                
                let html=""
                if(data == 'custom'){
                    Modal.settingHeder("Tambah Siswa Untuk Rombel Lain");
                    html = Modal.createView.modalTambahSiswa('',this.service.arLabel)
                    
                }else{
                    Modal.settingHeder("Tambah Siswa Untuk kelas "+ data);
                    html =Modal.createView.modalTambahSiswa(data,this.service.arLabel)
                    
                }
                Modal.showBody(html);
                Modal.showFooter(btn)
                Modal.configService(this.service);
                Modal.eventModalAddNew(arguments[0]);
                Modal.show();
            }
        })
    }
    
    showJenjang(rombel,sortirBy){
        
        let data = this.service.showSiswaAnggotaJenjang(rombel,sortirBy);
        const set_tabel = {
            tableAtribut:{
                class:'w3-table-all toExcel table-sm',
                id:'table_jenjang'
            },
            db:data,
            headers:[
                {
                    columns:[
                        {label:'Penomoran',atribute:{colspan:7}},
                        {label:'Nama Siswa',atribute:{rowspan:2}},
                        {label:'Jenis Kelamin',atribute:{rowspan:2}},
                        {label:'Agama',atribute:{rowspan:2}},
                        {label:'Tempat Tanggal Lahir',atribute:{colspan:2}},
                    ]
                },{
                    columns:[
                        {label:'Urut'},
                        {label:'Aksi'},
                        {label:'NIS'},
                        {label:'NISN'},
                        {label:'NIK'},
                        {label:'No. KK'},
                        {label:'Kelas'},
                        {label:'Tempat'},
                        {label:'Tanggal'},
                    ]
                }
            ],
            atributeColumn:{
                'nisn':{class:'bg-info-subtle'},
                'pd_nama':{class:'text-nowrap'},
                'pd_tanggallahir':{class:'text-nowrap'},
                'buttons':{class:'print-hide'},
            },
            body:['auto',{'buttons':(item)=>{
                let btn="";
                item.forEach(el=>{
                    btn +=`<button data-button-id="${el.id}" class="${el.class}" data-aksi="${el.aksi}">${el.label}</button>`;
                })
                return btn;
            }},'nis','nisn','nik','nokk','nama_rombel','pd_nama','pd_jk','pd_agama','pd_tl','pd_tanggallahir']//.concat(Object.keys(this.fokusRombel[0]))
        };
        let tabel = new tabelDom(set_tabel);
        return tabel.init();        
    }
    
    showRombel(rombel,sortirBy){
        
        let data = this.service.showSiswaAnggotaRombel(rombel,sortirBy)
        const set_tabel = {
            tableAtribut:{
                class:'w3-table-all toExcel table-sm'
            },
            db:data,
            headers:[
                {
                    columns:[
                        {label:'Penomoran',atribute:{colspan:3}},
                        // {label:'<div class="d-flex flex-column align-items-stretch"><span class="align-self-end">⇑</span>Nama Siswa</div>',atribute:{rowspan:2}},
                        {label:'Nama Siswa',atribute:{rowspan:2}},
                        {label:'Jenis Kelamin',atribute:{rowspan:2}},
                        {label:'Agama',atribute:{rowspan:2}},
                        {label:'Tempat Tanggal Lahir',atribute:{colspan:2}},
                        {label:'Aksi',atribute:{rowspan:2,class:'print-hide'}},
                    ]
                },{
                    columns:[
                        {label:'Urut'},
                        {label:'NIS'},
                        {label:'NISN'},
                        {label:'Tempat'},
                        {label:'Tanggal'},
                    ]
                }
            ],
            atributeColumn:{
                'nisn':{class:'bg-info-subtle'},
                'pd_nama':{class:'text-nowrap'},
                'pd_tanggallahir':{class:'text-nowrap'},
                'buttons':{class:'print-hide'},
            },
            body:['auto','nis','nisn','pd_nama','pd_jk','pd_agama','pd_tl','pd_tanggallahir',{'buttons':(item)=>{
                let btn="";
                item.forEach(el=>{
                    btn +=`<button data-button-id="${el.id}" class="${el.class}" data-aksi="${el.aksi}">${el.label}</button>`;
                })
                return btn;
            }}]
        };
        let tabel = new tabelDom(set_tabel);
        return tabel.init();        
    }

    koleksiTapelBukuInduk(){
        return new CollectionsEdu(this.service.allSiswa)
            .customFilter((item)=> item.nis !="")
            .addProperty('awalanInduk',(item)=>{
                return '20'+item.nis.toString().slice(0,2)+'/20'+item.nis.toString().slice(2,4)
            })
            .selectProperties(['awalanInduk'])
            .uniqueByProperty('awalanInduk')
            .sortByProperty('awalanInduk','desc').data;
    }
    
    eventSelectMutasi(tipe='masuk'){
        const select = document.getElementById('tapelmutasimasuk');
        select.onchange = (e)=>{
            this.kontenMutasi(e.target.value,tipe);
        };
        select.dispatchEvent(new Event('change'));
    }
    kontenMutasi(tapel,tipemutasi){
        let split = tapel.split('/');
        let thAwal = new Date(parseInt(split[0]),6,1);
        let thAkhir = new Date(parseInt(split[1]),5,30);
        let dataTabel = [];
        let header = [];
        let body=[]
        let configTabel = {
            tableAtribut:{
                id:'tableMutasi',
                class:'w3-table-all font10 toExcel',
                
            },
            db:[],
            atributeColumn:{
                'aktif':{class:'print-hide'},
                'pd_nama':{class:'text-nowrap'},
                'masuk_tgl':{class:'text-nowrap'},
                'edit':{class:'print-hide'},
                
            },
            headers:[],
            body:[]
        }
        
        if(tipemutasi == 'masuk'){
            dataTabel = new CollectionsEdu(this.service.allSiswa)
                .customFilter((item)=>parseInt(new FormatTanggal(thAwal).stringYYYYMMDD()) <= parseInt(new FormatTanggal(item.masuk_tgl).stringYYYYMMDD()) && parseInt(new FormatTanggal(thAkhir).stringYYYYMMDD()) >= parseInt(new FormatTanggal(item.masuk_tgl).stringYYYYMMDD()))
                .addProperty('edit',(item)=>[
                        { 
                            label: '<i class="bi-pencil"></i>', 
                            id: item.id, 
                            aksi:'detail', 
                            class:'btn-sm border-0 btn-rounded-pill py-0 text-bg-info mx-1' 
                        },
                    ])
                .setProperty('pd_jk',(item)=>item=="L"?"Laki-laki":"Perempuan")
                .updatePropertyValues(this.service.arLabel.keyTgl,(v)=>v==""?"":new FormatTanggal(v).formatMedium())
                .data;
            header = [
                {columns:[
                    {label:'Aksi',atribute:{class:'print-hide'}},
                    {label:'Status',atribute:{class:'print-hide'}},
                    {label:'No'},
                    {label:'NIS'},
                    {label:'NISN'},
                    {label:'Nama Siswa'},
                    {label:'Gender'},
                    {label:'Kelas Saat Ini'},
                    {label:'Masuk Tanggal'},
                    {label:'Asal Sekolah<br><small>(SD Asal)</small>'},
                    {label:'Diterima di Kelas'},
                    {label:'Keterangan<br>(Tanggal jika Pindah/lulus)'},
                ]}
            ];
            body = [
                {'edit':(item)=>{
                    let btn="";
                    if(Array.isArray(item)){
                        item.forEach(el=>{
                            btn +=`<button data-button-id="${el.id}" class="${el.class}" data-aksi="${el.aksi}">${el.label}</button>`;
                        })
                    }else{
                        btn +=item;
                    }
                    return btn;
                }},
                'aktif',
                'auto',
                'nis',
                'nisn',
                'pd_nama',
                'pd_jk',
                'nama_rombel',
                'masuk_tgl',
                'dapo_sekolahasal',
                'awal_kelas',
                'keluar_tgl',
            ];
        }else{
            dataTabel = new CollectionsEdu(this.service.allSiswa).customFilter((item)=>{
                        return (parseInt(new FormatTanggal(thAwal).stringYYYYMMDD()) <= parseInt(new FormatTanggal(item.keluar_tgl).stringYYYYMMDD()) && parseInt(new FormatTanggal(thAkhir).stringYYYYMMDD()) >= parseInt(new FormatTanggal(item.keluar_tgl).stringYYYYMMDD()));// || item.aktif == 'pindah'
                    })
                .addProperty('edit',(item)=>[
                        { 
                            label: '<i class="bi-pencil"></i>', 
                            id: item.id, 
                            aksi:'detail', 
                            class:'btn-sm border-0 btn-rounded-pill py-0 text-bg-info mx-1' 
                        },
                    ])
                .setProperty('pd_jk',(item)=>item=="L"?"Laki-laki":"Perempuan")
                .updatePropertyValues(this.service.arLabel.keyTgl,(v)=>v==""?"":new FormatTanggal(v).formatMedium())
                .data;

            header = [
                {columns:[
                    {label:'Aksi',atribute:{class:'print-hide'}},
                    {label:'Status',atribute:{class:'print-hide'}},
                    {label:'No'},
                    {label:'NIS'},
                    {label:'NISN'},
                    {label:'Nama Siswa'},
                    {label:'Gender'},
                    {label:'Kelas Saat keluar'},
                    {label:'Tanggal Keluar'},
                    {label:'Alasan'},
                    
                ]}
            ];
            body = [
                {'edit':(item)=>{
                    let btn="";
                    if(Array.isArray(item)){
                        item.forEach(el=>{
                            btn +=`<button data-button-id="${el.id}" class="${el.class}" data-aksi="${el.aksi}">${el.label}</button>`;
                        })
                    }else{
                        btn +=item;
                    }
                    return btn;
                }},
                'aktif',
                'auto',
                'nis',
                'nisn',
                'pd_nama',
                'pd_jk',
                'kelas_keluar',
                'keluar_tgl',
                'alasan_keluar',
                
            ];

        };
        let finalConfig = Object.assign({},configTabel,{db:dataTabel,headers:header,body:body});
        let konten = `<h3 class="text-center fw-bolder mb-0" contenteditable="true" spellcheck="false">Rekapitulasi Mutasi ${tipemutasi}</h3>`;
        konten+=`<h3 class="text-center mb-3" contenteditable="true" spellcheck="false">Selama Tahun Pelajaran ${tapel}</h3>`;

        let tabel = new tabelDom(finalConfig);
        this.workplace.innerHTML =konten+ tabel.init();
        let tb = new TableProperties(document.getElementById('tableMutasi'));
        tb.addScrollUpDown();
        this.registeredClickedEdit('kontenMutasi',tapel, tipemutasi);
    
    }
    stringToDom(string){
        const template= document.createElement('template');
        template.innerHTML = string;
        return template.content;
    }
    umurStatistik(Rombel){
        const db = new CollectionsEdu(this.service.allSiswa)
                    .simpleFilter({'aktif':'aktif'})
                    .selectProperties(['nama_rombel','pd_jk','pd_tanggallahir','pd_nama'])
                    .addProperty('umur',(item)=>item.pd_tanggallahir ==""?{years:0,months:0,days:0}:umur(new Date(item.pd_tanggallahir)))
                    .setProperty('pd_tanggallahir',(item)=>new FormatTanggal(item).formatMedium())
                    ;
        const data = db.data.slice();
        // const Rombel = this.koleksiRombel;
        const koleksiUmur = ['≦6','7-12','≧13'];
        const config = {
            tableAtribut: {
                class:'w3-table-all toExcel',
                id:'idtable',
            },
            db:db.data,
            headers:[
                {columns:[
                        {label:'Kelas dan Rombel',atribute:{rowspan:2, colspan:2, style:'width:100px'}},
                        {label:'Kelompok Umur',atribute:{colspan:9}},
                        {label:'Total',atribute:{rowspan:3, class:'bg-info-subtle'}},
                        
                    ]
                },
                {columns:[
                    
                    {label:'≤6 Tahun',atribute:{colspan:3}},
                    {label:'7 s.d 12 Tahun',atribute:{colspan:3}},
                    {label:'≧13 Tahun',atribute:{colspan:3}},
                    ]
                },
                {columns:[
                    {label:'Jenjang'}, {label:'Kelas'}, {label:'L'}, {label:'P'}, {label:'J'}, {label:'L'}, {label:'P'}, {label:'J'}, {label:'L'}, {label:'P'}, {label:'J'},
                ]}


            ],
            // body:['auto','nama_rombel','pd_tanggallahir','umur.tahun'],
            body:()=>{
                let html="";
                for(let r in Rombel){
                    html+=`<tr>`;
                    
                    let values = Rombel[r]
                    html+=`<td rowspan="${values.length}" class="text-center align-middle">${r}</td>`;
                    for (let [index, value] of values.entries()){
                        html+=`<td>${value}</td>`;
                        koleksiUmur.forEach(el=>{
                            let le,pe,to;
                            if(el=="≦6"){
                                le = new CollectionsEdu(data)
                                    .customFilter((item)=>item.umur.tahun<=6 && item.pd_jk == "L" && item.nama_rombel==value)
                                    .countData();
                                pe = new CollectionsEdu(data)
                                    .customFilter((item)=>item.umur.tahun<=6 && item.pd_jk == "P" && item.nama_rombel==value)
                                    .countData();
                                to = new CollectionsEdu(data)
                                    .customFilter((item)=>item.umur.tahun<=6 && item.nama_rombel==value)
                                    .countData();
        
                            }else if(el == '≧13'){
                                le = new CollectionsEdu(data)
                                    .customFilter((item)=>item.umur.tahun>=13 && item.pd_jk == "L" && item.nama_rombel==value)
                                    .countData();
                                pe = new CollectionsEdu(data)
                                    .customFilter((item)=>item.umur.tahun>=13 && item.pd_jk == "P" && item.nama_rombel==value)
                                    .countData();
                                to = new CollectionsEdu(data)
                                    .customFilter((item)=>item.umur.tahun>=13 && item.nama_rombel==value)
                                    .countData();
                            }else{
                                le = new CollectionsEdu(data)
                                .customFilter((item)=>item.umur.tahun>=7 && item.umur.tahun<=12 && item.pd_jk == "L" && item.nama_rombel==value)
                                    .countData();
                                pe = new CollectionsEdu(data)
                                    .customFilter((item)=>item.umur.tahun>=7 && item.umur.tahun<=12 && item.pd_jk == "P" && item.nama_rombel==value)
                                    .countData();
                                to = new CollectionsEdu(data)
                                    .customFilter((item)=>item.umur.tahun>=7 &&item.umur.tahun<=12 && item.nama_rombel==value)
                                    .countData();
                            }
        
                
                            let lelaki = le==0?"-":le;
                            let perempuan = pe==0?"-":pe;
                            let total = to==0?"-":to;
                            html+=`<td class="text-center">${lelaki}</td><td class="text-center">${perempuan}</td><td class="bg-info-subtle text-center">${total}</td>`;
                        });
                        let totalkelas=new CollectionsEdu(data).simpleFilter({nama_rombel:value}).countData();
                        html+=`<td class="text-center">${totalkelas}</td>`
                        if(index === values.length -1){
                            html+=`</tr>`;
                        }else{
                            html+=`</tr><tr>`;
                        }
                    }
        
                }
                // let template =document.createElement('template');
                // template.innerHTML = html;
                // return template.content;
                return this.stringToDom(html);
            },
            footer:()=>{
                let html=""
                html+=`<tr>`;
                html+=`<th class="text-end" colspan="2">Jumlah</th>`;
                        let le = new CollectionsEdu(data).customFilter((item)=>item.umur.tahun<=6 && item.pd_jk == "L").countData();
                        let pe = new CollectionsEdu(data).customFilter((item)=>item.umur.tahun<=6 && item.pd_jk == "P").countData();
                        let to= new CollectionsEdu(data).customFilter((item)=>item.umur.tahun<=6).countData();
                        let lelaki = le==0?"-":le;
                        let perempuan = pe==0?"-":pe;
                        let total = to==0?"-":to;
                        let toto = new CollectionsEdu(data)
                        .customFilter((item)=>item.umur.tahun>=7 &&item.umur.tahun<=12 && item.pd_jk=="L")
                        .countData();
                        let totope = new CollectionsEdu(data)
                        .customFilter((item)=>item.umur.tahun>=7 &&item.umur.tahun<=12 && item.pd_jk=="P")
                        .countData();
                        let totopel = new CollectionsEdu(data)
                        .customFilter((item)=>item.umur.tahun>=7 &&item.umur.tahun<=12)
                        .countData();
                        
                    let totos = new CollectionsEdu(data)
                        .customFilter((item)=>item.umur.tahun>=13 && item.pd_jk=="L")
                        .countData();
                    let totopes = new CollectionsEdu(data)
                        .customFilter((item)=>item.umur.tahun>=13 && item.pd_jk=="P")
                        .countData();
                    let totopels = new CollectionsEdu(data)
                        .customFilter((item)=>item.umur.tahun>=13)
                        .countData();
                        
                html+=`<td class="text-center">${lelaki}</td><td class="text-center">${perempuan}</td><td class="text-center">${total}</td>`;
                html+=`<td class="text-center">${toto==0?"-":toto}</td><td class="text-center">${totope==0?"-":totope}</td><td class="text-center">${totopel==0?"-":totopel}</td>`;
                html+=`<td class="text-center">${totos==0?"-":totos}</td><td class="text-center">${totopes==0?"-":totopes}</td><td class="text-center">${totopels==0?"-":totopels}</td>`;
                html+=`<td class="text-center text-bg-warning">${data.length}</td>`
                html+=`</tr>`;
                // let template =document.createElement('template');
                // template.innerHTML = html;
                // return template.content;
                return this.stringToDom(html);
            }
        };

    let tabel = new tabelDom(config);
    let h = this.htmlJudul;
    let datainvalid = new CollectionsEdu(data)
                .customFilter((item)=>item.pd_jk == "" ||item.pd_tanggallahir == "")
                // .selectProperties(['nama_rombel','pd_nama,','pd_jk','pd_tanggallahir'])
                .sortByProperty('nama_rombel','asc');
    let objtabl = {
        tableAtribut:{
            class:'w3-table-all col-md-6 mt-5 print-hide',
            style:'font-size:10px'
            
        },
        db:datainvalid.data,
        headers:[
            {
                columns:[
                    {label:'Data siswa yang tidak terisi Jenis Kelamin dan/atau Tanggal Lahirnya',atribute:{colspan:5}}
                    ]
            },{
                columns:[
                    {label:'No.',atribute:{style:'width:15px'}},
                    {label:'Nama'},
                    {label:'Kelas'},
                    {label:'Jenis Kelamin'},
                    {label:'Tanggal Lahir'},
                ]
            }
        ],
        body:['auto','pd_nama','nama_rombel',{'pd_jk':(item)=>item==""?"Belum Terisi":"Sudah Terisi"},'pd_tanggallahir']
    }
        let tabelkosong = new tabelDom(objtabl);
        let tesini = tabelkosong.init();
        this.workplace.innerHTML = h + tabel.init() + (datainvalid.countData()>0?tesini:"");
    }
    agamaStatistik(Rombel){
        const koleksiAgama = this.service.arLabel.agama.filter(s=> s.value !=="").map(n=>n.value);
        const dataInstans = new CollectionsEdu(this.service.allSiswa)
                .simpleFilter({'aktif':'aktif'})
                .selectProperties(['nama_rombel','pd_jk','pd_agama','pd_nama'])
                .sortByProperty('nama_rombel');
        
        const data = dataInstans.data.slice();
        
        const configstatistik = {
            tableAtribut:{
                class:"w3-table-all toExcel"
            },
            
            headers:[
                {columns:[
                    {label:'Jenjang dan Kelas', atribute:{colspan:2, rowspan:2}},
                    {label:'Agama yang dianut Siswa',atribute:{colspan:(koleksiAgama.length*3)}}
                ]},
                {columns: koleksiAgama.map(m=>({'label':m,'atribute':{'colspan':3}}))},
                {columns: [{label:'Kelas'},{label:'Rombel'}].concat(koleksiAgama.map(m=>([{'label':'L'},{'label':'P'},{'label':'J'}])).flat())},
            ],
            body:()=>{
                let html="";
                for(let r in Rombel){
                    html+=`<tr>`;
                    
                    let values = Rombel[r]
                    html+=`<td rowspan="${values.length}" class="text-center align-middle">${r}</td>`;
                    for (let [index, value] of values.entries()){
                        html+=`<td>${value}</td>`;
                        koleksiAgama.forEach(el=>{
                            let le = new CollectionsEdu(data).simpleFilter({'pd_agama':el, 'pd_jk':"L",'nama_rombel':value}).countData();
                            let pe = new CollectionsEdu(data).simpleFilter({'pd_agama':el, 'pd_jk':"P",'nama_rombel':value}).countData();
                            let to = new CollectionsEdu(data).simpleFilter({'pd_agama':el, 'nama_rombel':value}).countData();
                            let lelaki = le==0?"-":le;
                            let perempuan = pe==0?"-":pe;
                            let total = to==0?"-":to;
                            html+=`<td>${lelaki}</td><td>${perempuan}</td><td class="bg-info-subtle">${total}</td>`;
                        });
                        if(index === values.length -1){
                            html+=`</tr>`;
                        }else{
                            html+=`</tr><tr>`;
                        }
                    }
        
                }
                return this.stringToDom(html);
            },
            footer:()=>{
                let html =`<tr>`;
                html+=`<th class="text-end" colspan="2">Jumlah</th>`;
                
                koleksiAgama.forEach(el=>{
                        let le = new CollectionsEdu(data).simpleFilter({'pd_agama':el, 'pd_jk':"L"}).countData();
                        let pe = new CollectionsEdu(data).simpleFilter({'pd_agama':el, 'pd_jk':"P"}).countData();
                        let to= new CollectionsEdu(data).simpleFilter({'pd_agama':el}).countData();
                        let lelaki = le==0?"-":le;
                        let perempuan = pe==0?"-":pe;
                        let total = to==0?"-":to;
                    html+=`<td>${lelaki}</td><td>${perempuan}</td><td>${total}</td>`;
                });
                html+=`</tr>`;
                return this.stringToDom(html);
            }

        }
        let tabel = new tabelDom(configstatistik) ;//
        
        let datainvalid = new CollectionsEdu(data)
                .customFilter((item)=>item.pd_jk == "" ||item.pd_agama == "")
                // .selectProperties(['nama_rombel','pd_nama,','pd_jk','pd_tanggallahir'])
                .sortByProperty('nama_rombel','asc');
    let objtabl = {
        tableAtribut:{
            class:'w3-table-all col-md-6 mt-5 print-hide',
            style:'font-size:10px'
            
        },
        db:datainvalid.data,
        headers:[
            {
                columns:[
                    {label:'Data siswa yang tidak terisi Jenis Kelamin dan/atau Agamanya',atribute:{colspan:5}}
                    ]
            },{
                columns:[
                    {label:'No.',atribute:{style:'width:15px'}},
                    {label:'Nama'},
                    {label:'Kelas'},
                    {label:'Jenis Kelamin'},
                    {label:'Agama'},
                ]
            }
        ],
        body:['auto','pd_nama','nama_rombel',{'pd_jk':(item)=>item==""?"Belum Terisi":item},{'pd_agama':(item)=>item==""?"Belum Terisi":item}]
    }
        let tabelkosong = new tabelDom(objtabl);// 
        let tesini = tabelkosong.init();
        this.workplace.innerHTML = this.htmlJudul + tabel.init() +(datainvalid.countData()>0?tesini:"");
    }

};