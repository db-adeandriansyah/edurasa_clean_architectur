import { CollectionsEdu } from "../../models/CollectionsEdu";
// import { SuratKeluar } from "../../models/SuratKeluar";
import { FormatTanggal } from "../../utilities/FormatTanggal";

export default class OrmSuratKeluar{
    #orm;
    constructor(SuratKeluar, suratMasuk,sppd,user,ptk,siswa,canUploadFileSurat,ptkAll){
        this.suratKeluar = SuratKeluar,
        this.suratMasuk = suratMasuk
        this.sppd =sppd;
        this.user =user;
        this.ptk = ptk;
        this.ptkAll = ptkAll;
        this.siswa = siswa;
        this.canUploadFileSurat = canUploadFileSurat;
        this.#orm = [];
        this.init();
    }
    get dbSuratKeluar(){
        return this.#orm.data;
    }
    settingSort(tipeSort = 'asc',key='idbaris'){
        // this.#orm.sortByProperty('idbaris','desc');
        // /.sortByProperty('idbaris','desc')
       
        this.#orm = this.#orm.sortByProperty(key,tipeSort)
        
    }
    init(){
        this.#orm = new CollectionsEdu(this.suratKeluar.slice()).exceptFilter({'status':'hapus'})
                .setProperty('idbaris',(item)=>parseInt(item))
                .setProperty('tglsurat',(item)=>new FormatTanggal(item).valueInputDate())
                .addProperty('tgl_surat',(item)=>item==""?"":new Date(item).toLocaleString('id-ID',{'dateStyle':'full'}))
                .addProperty('sppd',(item)=>{
                    let result = []
                    if(item.indekssurat == 'SPPD'){
                        result =  this.sppd.filter(s=> s.refrensi_suratkeluar == item.idbaris);//
                                // .map(n=>Object.fromEntries([[...Object.entries(tendik.filter(t=>t.idguru == item.ptk_diperintah)[0])], ...Object.entries(n)]));
                    }
                    return result;
                })
                
                .addProperty('suratmasuk',(item)=>{
                    let result = [];
                    if(item.refrensi_suratmasuk!==""){
                        result = this.suratMasuk.filter(s=>s.idbaris == item.refrensi_suratmasuk);
                    }
                    // if(item.indekssurat == 'SPPD'){
                    //     result =  this.sppd.filter(s=> s.refrensi_suratkeluar == item.idbaris);//
                    //             // .map(n=>Object.fromEntries([[...Object.entries(tendik.filter(t=>t.idguru == item.ptk_diperintah)[0])], ...Object.entries(n)]));
                    // }
                    return result;
                })
                // .sortByProperty('idbaris','desc')
                .addProperty('detailprihal',(item)=>{
                    let html = "";
                    if(item.indekssurat == 'SPPD'){
                        html+=item.perihal;
                        html+=`<br>`;
                        html+=`PTK yang ditugaskan:`;
                        html+=`<ol>`;
                            item.sppd.forEach(n=>{
                                html+=`<li>`;
                                    let p = this.ptk.filter(s=> s.id == n.ptk_diperintah)
                                    html+= p.length>0?p[0].guru_namalengkap:'Error';
                                html+=`</li>`;
                            })
                        html+=`</ol>`;
                    }else{
                        // let model = new SuratKeluar(dv).findById(item.idbaris).configTargetSiswa(this.siswa);
                        
                        // html+=item.perihal; 
                        // html+= model.count_datatarget;
                        html+=item.perihal; 
                        html+=this.countTargetPersonal(item.target_siswa,'target_siswa');
                    }
                    return html;
                })
                .addProperty('aksi',(item)=>{
                    let html = "";
                    let filessuratkeluar = item.idfile;
                        
                    if(item.sppd.length>0){
                        item.sppd.forEach(n=>{
                            let filesppd = n.versiupload;

                            if(filesppd !== ""){
                                let link = `https://drive.google.com/file/d/${filesppd}/view?usp=drivesdk`;
                                html+=`<button class="btn btn-sm btn-success" onclick="window.open(${link},'', 'width=720,height=600')"><i class="bi-eye"></i> SPPD</button>`;
                            }else if(filesppd==""){
                                if(this.canUploadFileSurat(n.ptk_diperintah)){
                                    let p = this.ptk.filter(s=> s.id == n.ptk_diperintah);
                                    let pelaku = "";
                                    if(p.length>0){
                                        pelaku = this.ptk.filter(s=> s.id == n.ptk_diperintah)[0].guru_namalengkap;

                                    }
                                    html+=`<button data-upload="sppd" data-id="${n.idbaris}" class="btn btn-sm btn-warning m-1"><i class="bi bi-cloud-arrow-down"></i> ${pelaku}</button>`
                                }
                            }
                        });
                    }else{
                        if(filessuratkeluar !=""){
                            let link = `https://drive.google.com/file/d/${filessuratkeluar}/view?usp=drivesdk`;
                            html+=`<button class="btn btn-sm  btn-success" onclick="window.open(${link},'', 'width=720,height=600')"><i class="bi-eye"></i></button>`;
                        }else{
                            if(item.user == this.user.idUser || this.canUploadFileSurat(item.user)){
                                html+=`<button data-upload="suratkeluar" data-id="${item.idbaris}" title="upload file SPPD" class="btn btn-sm btn-warning m-1"><i class="bi bi-cloud-arrow-down"></i></button>`;
                            }
                        }
                    } 
                    return html;
                })
                .addProperty('aksi2',(item)=>{
                    let html="";

                    if(item.indekssurat =='SPPD'){
                        html+=`<button class="btn btn-sm btn-primary m-1 rounded" data-show="sppd" data-idsuratkeluar="${item.idbaris}" title="Lihat SPPD"><i class="bi bi-eye"></i></button>`;
                        if(item.sppd.length==0){
                            html+=`<button class="btn btn-sm btn-danger m-1 rounded" data-show="hapussuratkeluar" data-idsuratkeluar="${item.idbaris}" title="Hapus Surat Keluar"><i class="bi bi-trash"></i></button>`;
                        }
                    }else{
                        html+=`<button class="btn btn-sm btn-secondary m-1 rounded mx-1" data-show="${item.indekssurat==''?'tidak dikenal':item.indekssurat}" data-idsuratkeluar="${item.idbaris}" title="Lihat Surat Keluar"> <i class="bi bi-eye"></i></button>`;
                        
                        
                        if(item.user == this.user.idUser || this.canUploadFileSurat(item.user)){
                            html+=`<button class="btn btn-sm btn-danger m-1 rounded" data-show="hapussuratkeluar" data-idsuratkeluar="${item.idbaris}" title="Hapus Surat Keluar"><i class="bi bi-trash"></i></button>`;
                            // html+=`<button class="btn btn-sm btn-success m-1 rounded mx-1" data-show="editsuratkeluar" data-idsuratkeluar="${item.idbaris}" title="Edit Surat Keluar"><i class="bi bi-pencil"></i></button>`;
                        }
                    }
                    
                    
                    return html;
                })
                .addProperty('oleh',(item)=>this.ptk.filter(s=> s.id == item.user)[0].guru_namalengkap)
                .addProperty('sppd_lamahari',(item)=>item.sppd.length>0?item.sppd[0].ptk_durasisppd:'')
                .addProperty('sppd_maksudperjalanan',(item)=>item.sppd.length>0?item.sppd[0].ptk_maksudsppd:'')
                .addProperty('sppd_tempatperjalanan',(item)=>item.sppd.length>0?item.sppd[0].ptk_tempatsppd:'')
                .addProperty('sppd_targetperson',(item)=>{
                    let html ="";
                    if(item.sppd.length>0){
                        html+=`<ol>`;
                            item.sppd.forEach(n=>{
                                html+=`<li>`;
                                    let p = this.ptk.filter(s=> s.id == n.ptk_diperintah);
                                    html+= p.length>0?p[0].guru_namalengkap:'Error';
                                html+=`</li>`;
                            })
                        html+=`</ol>`;
                    }
                    return html;
                })
                .addProperty('aksi_refrensi_suratmasuk',(item)=>{
                    let html ="";
                    if(item.refrensi_suratmasuk!==""){
                        let data = this.suratMasuk.filter(s=> s.idbaris == item.refrensi_suratmasuk);

                        if(data.length>0){
                            let file = data[0].idfile;
                            if(file!==""){
                                html+=`<button class="btn btn-sm btn-outline-secondary" onclick="window.open('https://drive.google.com/file/d/${file}/view?usp=drivesdk','', 'width=720,height=600')"><i class="bi-file-word-fill"></li> Surat Undangan</li>`
                            }else{
                                html+=`file surat tidak ditemukan`;
                            }
                        }else{
                            html+=`file surat tidak ditemukan`;
                        }
                    }
                    return html;
                })
                .addProperty('tgl_surat',(item)=>item.tglsurat==""?"":new Date(item.tglsurat).toLocaleString('id-ID',{'dateStyle':'full'}))
                .addProperty('detail_target_siswa',(item)=>{
                    let arraySiswa = [];
                    let stringTargetSiswa = item.target_siswa;
                    let spliting_targetsiswa = stringTargetSiswa.toString().replace(/(\s+)/g,'').split(',');
                    if(spliting_targetsiswa.length>0){
                        let mapIntegerIds = spliting_targetsiswa.map(n=>parseInt(n));
                        mapIntegerIds.forEach(n=>{
                            let data = this.siswa.filter(s=>s.id == n);
                            arraySiswa.push(data[0]);

                        })
                    }
                    return arraySiswa;
                });
        return this;        
    }

    /**
     * 
     * @param {*} targetPersonal string
     * @returns html string
     * refrensi param target_siswa || target_ptk
     */
    countTargetPersonal(data,targetPersonal){
        let html = "<br>Atas nama:";

        if(targetPersonal =='target_siswa'){
            if(data !== ''){
                let arrayData = data.toString().replace(/(\s+)/g,'').split(',');
                if(arrayData.length == 0){
                    html = '';
                }else if(arrayData.length>0 && arrayData.length <5){
                    
                    html+=`<ol>`;
                        arrayData.forEach(n=>{
                            let siswa = this.siswa.filter(s=> s.id == n)[0];
                            html+=`<li>${siswa.pd_nama}</li>`;
                        })
                    html+=`</ol>`;
                }else if(arrayData.length>5){
                    html+=`<ol>`;
                        arrayData.forEach((n,indeks)=>{
                            if(indeks<5){
                                let siswa = this.siswa.filter(s=> s.id == n)[0];
                                html+=`<li>${siswa.pd_nama}</li>`;
                            }
                        });
                        html+=`<li>...</li>`;
                        html+=`<li>...dan ${arrayData.length-5} lagi.</li>`;
                    html+=`</ol>`;
                } 
            }else{
                html="";
            }
        }
        return html;
    }
    static kepsekbytgl(ptk,ptkall,tgl){
        return new CollectionsEdu(ptkall).customFilter((d)=>{
                let tglsurat = new Date(tgl).getTime();
                let awaltugas = new Date(d.start_at).getTime();
                let akhirtugas = new Date(d.end_at).getTime();
                    
                return (d.jenis_ptk === 'kepsek' && awaltugas <= tglsurat && akhirtugas >= tglsurat)
            }).addProperty('akun',(item)=>{
                return ptk.filter(s=>s.id == item.user_id)[0];
            }).data;
        
        
    }
}