import { tabelDom } from "../../entries/vendor";
import { koleksiRombel } from "../../routes/settingApp";
import sppdView from "../../views/surat/sppdView";


const selectRombel = (rombel='1A')=>{
    let html="";
    let datarombel = Object.values(koleksiRombel).flat(1);
    let datarombelkelas = [];
    datarombel.forEach(n=>{
        let obj = {};
        obj.value = n;
        obj.label = n;
        datarombelkelas.push(obj);
    })
    html+=sppdView.floatingSelect('suratkeluarpilihrombel','Pilih Kelas', datarombelkelas,rombel,' data-eventchangetarget="rombel" ');

    return html;
}

export const tabelSuratKeluar = (data)=>{
    const {db,judul} = data;
    let konfigTabel = {
        tableAtribut:{
            id:'tabel-suratkeluar',
            class:'w3-table-all toExcel table-sm font10',
        },
        db:db.slice(),
        atributeColumn:{
            'oleh':{class:'print-hide text-center'},
            'idbaris':{class:'print-hide text-center'},
            'aksi':{class:'print-hide text-center'},
            'aksi2':{class:'print-hide text-center'},
        },
        headers:[
            {
                columns:[
                    {label:'No Urut'},
                    {label:'Id Surat',atribute:{class:'print-hide'}},
                    {label:'Nomor Surat'},
                    {label:'Tanggal/Titimangsa Surat'},
                    {label:'Tujuan Surat'},
                    {label:'Indeks Surat'},
                    {label:'Perihal'},
                    {label:'File Yang diunggah<br>(ditandatangani & cap stempel)',atribute:{class:'print-hide'}},
                    {label:'Aksi',atribute:{class:'print-hide'}},
                    {label:'Dibuat Oleh',atribute:{class:'print-hide'}}
                ]
            }
        ],
        body:db.length>0?[
            'auto',
            'idbaris',
            'nosurat',
            'tgl_surat',
            'ditujukkankepada',
            'indekssurat',
            'detailprihal',
            'aksi',
            'aksi2',
            'oleh'
        ]:[]
    };
    let tabelSurat = new tabelDom(konfigTabel);
    return judul+tabelSurat.init();
}

export const tabelSuratMasuk = (data)=>{
    const {db,judul} = data;
    let konfigTabel = {
        tableAtribut:{
            id:'tabel-suratmasuk',
            class:'w3-table-all toExcel table-sm font10',
        },
        db:db.slice(),
        atributeColumn:{
            'oleh':{class:'print-hide text-center'},
            'idbaris':{class:'print-hide text-center'},
            'aksi':{class:'print-hide text-center'},
            'aksi2':{class:'print-hide text-center'},
        },
        headers:[
            {
                columns:[
                    {label:'No Urut'},
                    {label:'Id Surat',atribute:{class:'print-hide'}},
                    {label:'Nomor Surat'},
                    {label:'Tanggal Diterima'},
                    {label:'Tanggal Surat'},
                    {label:'Asal Surat'},
                    {label:'Indeks Surat'},
                    {label:'Perihal'},
                    {label:'Ditujukan Kepada'},
                    // {label:'File Yang diunggah<br>(ditandatangani & cap stempel)',atribute:{class:'print-hide'}},
                    {label:'File Surat',atribute:{class:'print-hide'}},
                    {label:'Dibuat Oleh',atribute:{class:'print-hide'}},
                    {label:'Aksi',atribute:{class:'print-hide'}}
                ]
            }
        ],
        body:db.length>0?[
            /**
             *  {label:'No Urut'},
                    {label:'Id Surat'},
                    {label:'Nomor Surat'},
                    {label:'Tanggal Diterima'},
                    {label:'Tanggal Surat'},
                    {label:'Asal Surat'},
                    {label:'Indeks Surat'},
                    {label:'Perihal'},
                    {label:'Ditujukan Kepada'},
             */
            'auto',
            'idbaris',
            'nosurat',
            'string_tglditerima',
            'string_tglsurat',
            'asalsurat',
            'indekssurat',
            'perihal',
            'ditujukkankepada',
            'aksi',
            'oleh',
            'aksi2'
        ]:[]
    };
    let tabelSurat = new tabelDom(konfigTabel);
    return judul+tabelSurat.init();
}

export const tabelSppd = (data)=>{
    const {db,judul} = data;
    let konfigTabel = {
        tableAtribut:{
            id:'tabel-suratkeluar',
            class:'w3-table-all toExcel table-sm font10',
        },
        db:db.slice(),
        atributeColumn:{
            'oleh':{class:'print-hide text-center'},
            'refrensi_suratmasuk':{class:'print-hide text-center'},
            'aksi':{class:'print-hide text-center'},
            'aksi2':{class:'print-hide text-center'},
        },
        headers:[
            {
                columns:[
                    {label:'No Urut'},
                    {label:'Nomor Surat'},
                    {label:'Tanggal Perjalanan'},
                    {label:'Lama Hari'},
                    {label:'Maksud Perjalanan'},
                    {label:'Tempat Perjalanan'},
                    {label:'PTK yang diperintah'},
                    {label:'Refrensi (Surat Undangan)'},
                    {label:'File Yang diunggah<br>(ditandatangani & cap stempel)',atribute:{class:'print-hide'}},
                    {label:'Aksi',atribute:{class:'print-hide'}},
                    {label:'Dibuat Oleh',atribute:{class:'print-hide'}}
                ]
            }
        ],
        body:db.length>0?[
            'auto',
            'nosurat',
            'tgl_surat',
            'sppd_lamahari',
            'sppd_maksudperjalanan',
            'sppd_tempatperjalanan',
            'sppd_targetperson',
            'aksi_refrensi_suratmasuk',
            'aksi',
            'aksi2',
            'oleh'
        ]:[]
    };
    let tabelSurat = new tabelDom(konfigTabel);

    return judul+tabelSurat.init();
}
export const modalPtkDiperintah = (req)=>{
    const {judul,idSuratKeluar,olehSuratKeluar, dataSppdSuratKeluar,canAcces}= req;
    let data = {
        judulmodal:`<h3 class="text-center">${judul}</h3>`,
        datasppd: dataSppdSuratKeluar,
        idbaris:idSuratKeluar,
        oleh : olehSuratKeluar
    }
    return sppdView.rekapItemsNoSuratSPPD(data,canAcces);

}

export const modalSuratSiswa = (req)=>{
    const {judul,suratkeluar,datasiswa,template,canAcces} = req;
    let data ={
        judulmodal : judul,//`<h3 class="text-center">${judul}</h3>`,
        datasiswa : datasiswa,
        template:template,
        suratkeluar:suratkeluar
    }
    return sppdView.viewModalSuratTemplate(data,canAcces)
}

export const modalViewSuratByTemplate = (data,template)=>{
    return sppdView[template](data);
}
export const viewFormulirSuratMasuk = (db={})=>{
    let dbdefault = {
        tglditerima_input:'',
        asalsurat:'',
        status:'',
        oleh:'',
        nosurat:'',
        tglsurat_input:'',
        indekssurat:'',
        idfile:''
    }
    let data = Object.assign({},dbdefault,db);
    return sppdView.viewFormulirSuratMasuk(data);
}
export const kepsekbytgl = (tgl)=>{
    return new CollectionsEdu(this.ptkall).customFilter((d)=>{
        let tglsurat = new Date(tgl).getTime();
        let awaltugas = new Date(d.start_at).getTime();
        let akhirtugas = new Date(d.end_at).getTime();
        
        return (d.jenis_ptk === 'kepsek' && awaltugas <= tglsurat && akhirtugas >= tglsurat)
    }).addProperty('akun',(item)=>{
        return this.ptk.filter(s=>s.id == item.user_id)[0];
    }).data;

}
export const modalViewSppd =(data)=>{
    return sppdView.buildPageSppd(data);
};

export const detailSppd = (data)=>{
    return sppdView.createSppd(data);
}

export const createSuratKeluar = (objek)=>{
    let dataDefault = {
        'id_nosurat':'',
        'tglsurat':'',
        'perihal': '',
        'ditujukkankepada':'',
        'indekssurat':'',
        'namatarget':'target_ptk',
        'opsipersonal':'',
        'needrefrensi':false,
        'createsppd':false,
        'needInfo':false,
        'jumlahhari':1
    }
    let dataCreate = objek?Object.assign({},dataDefault,objek):dataDefault;
    
    return sppdView.createSurat(dataCreate);
}
export const infoTambahanCreateSurat = (data)=>{
    const {alert,pesan} = data;
    let html="";
    html+=`<div class="alert alert-${alert} m-2 font12">${pesan}</div>`;
    return html;
}

export const vieModalKonfirmasiSebelumCreateSppd = ()=>{
    let html="";
    html+=`Sebelum Anda membuat SPPD, Anda sebaiknya membuat data surat masuk terlebih dahulu sebagai dasar dari kegiatan perjalanan dinas Anda.`;
    html+=`<div class="d-flex justify-content-evenly font10 p-1 border shadow-lg m-1">`;
        html+=`<button data-aksibeforesppd="buatsuratmasuk" class="btn btn-warning border-4 border-danger rounded-pill border-start-0 border-end-0 border-top-0 border-bottom">Belum dibuat di Surat Masuk</button>`;
        html+=`<button data-aksibeforesppd="buatsuratkeluar" class="btn btn-success border-4 border-dark rounded-pill border-start-0 border-end-0 border-top-0 border-bottom">Sudah dibuat di Surat Masuk</button>`;
    html+=`</div>`;
    return html;
}
export const viewResultCariSuratmasuk = (data,checked)=>{
    return sppdView.viewResultCariSuratmasuk(data,checked);
};
export const boleanHtmlRefrensiSuratMasuk = (data)=>{
    let pesanfilesuratmasuk = "Id Surat masuk dapat Anda lihat di menu Surat Masuk sebagai surat Undangan atau dasar pelaksanaan perjalanan dinas.";
    if(data !==""){
                // `<div id="cekfilesuratmasuk" class="font10 text-center text-danger alert alert-info"></div>`;
                // pesanfilesuratmasuk=`<div id="cekfilesuratmasuk" class="font10 text-center alert-info text-succes">`;
                    pesanfilesuratmasuk =`File Surat Refrensi terdeteksi<br>`;
                    pesanfilesuratmasuk+=`<button onclick="window.open('https://drive.google.com/file/d/${data}/view?usp=drivesdk','', 'width=720,height=600')"" class="btn btn-sm border-4 text-bg-warning border-bottom border-start-0 border-top-0 border-end-0 rounded-pill"><i class="bi-eye"></i> Lihat Surat</button>`;
                // pesanfilesuratmasuk +=`</div>`;
            }
    return pesanfilesuratmasuk;
}
export const checkBoxTargetPersonal = (data,addclass=false)=>{
    let itemPersonal = "";
    if(data.tipetarget == 'target_siswa'){
        data.arraypersonal.forEach((n, indeks)=>{
            itemPersonal +=sppdView.formInputCheckbox('personal_'+data.tipetarget+'_'+indeks+'_'+new Date().getTime(), n.pd_nama +`${addclass?` (Kelas ${n.nama_rombel})`:''}`,n.id,false,'checkboxpersonal',addclass?' checked ':'');
        })
    }else{
        data.arraypersonal.forEach((n, indeks)=>{
            itemPersonal +=sppdView.formInputCheckbox('personal_'+data.tipetarget+'_'+indeks+new Date().getTime(),n.guru_namalengkap,n.id,false,'checkboxpersonal');
        })
    }
    return itemPersonal;
}

export const selectRombelNonFloating = (kelas)=>{
    let datarombel = Object.values(koleksiRombel).flat(1);
    let html = "";
    
    html+=`<select class="form-control" id="select_rombel_nonfloating">`;
    
    datarombel.forEach(n=>{
        if(kelas == n){
            html+=`<option value="${n}" selected>${n}</option>`;

        }else{
            html+=`<option value="${n}">${n}</option>`;
        }
    })
    
    html+=`</select>`
    
    return html
}
export const domSelectRombel = (rombeldefault)=>{
    let html = "";
    html+=`<div class="input-group input-group-sm mb-3">`;
        html+=`<div class="input-group-text">Pilih Kelas</div>`;
        html+=selectRombelNonFloating(rombeldefault);
        html+=`<button class="input-group-text btn btn-success btn-sm" id="tambahtargetpersonalsiswa">Tambahkan</button>`;
    html+=`</div>`;
    return html;
}
export const checkBoxSiswa = (dataAll,boleanChecked=false,disabling=false)=>{
    let itemPersonal = "";
    dataAll.forEach((n, indeks)=>{
        itemPersonal +=sppdView.formInputCheckbox('personal_'+n.id+indeks+new Date().getTime(),n.pd_nama +' ('+n.nama_rombel+')',n.id,false,'checkboxpersonal',(boleanChecked?' checked ':'')+(disabling?' disabled ':''));
    });
    return itemPersonal;
}
export const checkboxSppdPTK = (dataAll, boleanChecked=false, disabling=false)=>{
    let itemPersonal = "";
    dataAll.forEach((n, indeks)=>{
        itemPersonal +=sppdView.formInputCheckbox('personal_'+n.id+indeks+new Date().getTime(),n.guru_namalengkap,n.id,false,'checkboxpersonal',(boleanChecked?' checked ':'')+(disabling?' disabled ':''));
    });
    return itemPersonal;
}