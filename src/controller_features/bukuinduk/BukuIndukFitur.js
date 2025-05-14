import viewRiwayat from "../../riwayat_raport/RiwayatView.js";
import Pagination from "../pagination/Pagination.js";
import viewInduk from "./BukuIndukView.js";
import KlaperController from "./KlaperController.js";
import TapelIndukController from "./TapelIndukController.js";



export default class BukuIndukFitur{
    constructor(app,service,submenu,workplace,modal, modal2){
        this.service = service;
        this.App = app;
        this.submenu = submenu;
        this.workplace = workplace;
        this.Modal1 = modal;
        this.Modal2 = modal2;
        this.KlaperInduk = new KlaperController(service);
        this.DokumenInduk = new KlaperController(service);
        this.TapelInduk = new TapelIndukController(service);
    }
    showSetingInduk(){
        this.workplace.innerHTML = viewInduk.showRingkasanInduk(this.service.ormInduk);
        this.workplace.innerHTML = viewInduk.showRingkasanInduk(this.TapelInduk.orm);
        return this;
    }
    showKlapper(){
        this.service.createKlapper();
        const ormKlapper = this.service.ormKlapper;
        this.workplace.innerHTML ="Klapper";
        this.submenu.innerHTML = viewInduk.subMenuKlapper(ormKlapper);
        this.listenerSelectMenu((v)=>{
            const judul = `<h2 class="text-center text-uppercase mb-3 fw-bold tnr">BUKU KLAPER<br/>${this.App.UserApp.namaSekolah}<br/>Abjad "${v}"</h2>`;
            
            const data = ormKlapper.find(s=>s.abjad === v)?.dataKlapper||[];
            new Pagination(data).init({
                'title':judul,
                'workplace':this.workplace,
                'showPerPage': 50,
                'viewFunction':viewInduk.viewKlaper,
                'overflowingColumn':[0,1,2,3,4,5]

            }).buildHtml();
        });
        
        return this;
    }
    async showKlapperAngkatan(){
        this.submenu.innerHTML = viewInduk.subMenuKlaperAngkatan(this.service.ormInduk);
        const wraperSelectAbjad = document.getElementById('selectMenuAbjad');
        this.listenerRadioMenu((tapel)=>{
            if(tapel==='false'){
                tapel=false;    
            }
            
            this.workplace.innerHTML = "Memproses ....";
            const detail = this.service.ormInduk.find(s=>s.awalanInduk===tapel);
            const koleksiabjad = detail?.klaperAngkatan ||[];
            const dataopsi = [];
            koleksiabjad.forEach(item=>{
                dataopsi.push({
                    label:`${item.abjad} (${item.dataKlaperAngkatan.length} data)`,
                    value:item.abjad
                });
            });
            wraperSelectAbjad.innerHTML = viewInduk.selectAbjad(dataopsi);
            this.listenerSelectMenu((v)=>{
                const judul = `<h2 class="text-center text-uppercase mb-3 fw-bold tnr">BUKU KLAPER<br/>${this.App.UserApp.namaSekolah}<br/>Tahun Pelajaran ${detail.tahunpelajaran}<br/>Abjad "${v}"</h2>`;
                const data = detail.klaperAngkatan.find(s=>s.abjad === v)?.dataKlaperAngkatan||[];
                
                new Pagination(data).init({
                    'title':judul,
                    'workplace':this.workplace,
                    'showPerPage': 50,
                    'viewFunction':viewInduk.viewKlaper,
                    'overflowingColumn':[0,1,2,3,4,5]
    
                }).buildHtml();
            });
            
        })
    }
    
    showTapelInduk(){
        
        this.submenu.innerHTML = viewInduk.subMenuInduk(this.TapelInduk.orm);
        // this.submenu.innerHTML = viewInduk.subMenuInduk(this.service.ormInduk);
        this.listenerRadioMenu(async (tapel)=>{
            if(tapel==='false'){
                tapel=false;    
            }
            
            this.workplace.innerHTML = "Memproses ....";
            const detailAfter = await this.TapelInduk.dataWithRaportByTapel(tapel);
            const testdetailAfter = await this.TapelInduk.dataByTapel(tapel);
            this.workplace.innerHTML = viewInduk.showRekapTapel(detailAfter,tapel);
            this.listenerModal((dataset)=>this.showDetailItemInduk(dataset,tapel,detailAfter));
        });
        
    }
    showDokumenSiswa(){
        
        this.submenu.innerHTML = viewInduk.subMenuInduk(this.service.ormInduk);
        this.listenerRadioMenu(async (tapel)=>{
            if(tapel==='false'){
                tapel=false;    
            }
            
            this.workplace.innerHTML = "On proses ....";
            const detail = this.service.ormInduk.find(s=>s.awalanInduk===tapel);
            
            this.workplace.innerHTML = viewInduk.showTabelDokumen(detail.datainduk);
            const tabel = document.querySelector('table.toExcel');
            const TableProperties = await import("../../entries/vendor.js").then(n=>n.TableProperties)
            const tp = new TableProperties(tabel)
            tp.freezeColumn([3,4],[3,4])

            tp.addScrollUpDown();
            this.listenerModal((dataset)=>{
                let siswa = detail.datainduk.find(s=>s.id == dataset.id);
                this.showDokumenLulusan(siswa,'showDokumenSiswa')
            });
        });
        
    }
    showDetailItemInduk(dataset,tapel,detail){
        
            this.Modal1.widthOrientation(false);
            this.Modal1.settingHeder('Detail Buku Induk');
            this.Modal1.showHideFooter(false);
            
            if(tapel){
                const itemdetail = detail.indukurut.find(s=>s.id ==dataset.id);
                this.Modal1.showBodyHtml(viewInduk.showDetailItemInduk(itemdetail));
                this.listenerModalinModal((dataset)=>this[dataset['modalItem']](dataset,itemdetail));
                
            }else{
                const itemdetail = detail.datainduk.find(s=>s.id ==dataset.id);
                this.Modal1.showBodyHtml(viewInduk.showDetailItemInduk(itemdetail));
                this.listenerModalinModal((dataset)=>this[dataset['modalItem']](dataset,itemdetail));
                // modal.showBodyHtml(detail.data.find(s=>s.id ==dataset.id)?.pd_nama||dataset.nis);
            }
            this.Modal1.show();
            
        
    }
    editIdentitas(dataset,detail){
        this.Modal1.hide();
        this.Modal2.widthOrientation(false);
        this.Modal2.settingHeder('Edit Identitas Data Induk');
        this.Modal2.showHideFooter(false);
        this.Modal2.showBodyHtml(viewInduk.showWraperInduk(viewInduk.showEditIdentitasInduk(detail),true));
        this.Modal2.show();
        viewInduk.createRowByActivation(detail.aktif);
        const select = document.querySelector('[data-keyedit="aktif"]');
        select.onchange = (e)=> viewInduk.createRowByActivation(e.target.value);
        const btnSave = document.getElementById('btnSave');
        // const btnUploads = document.querySelectorAll('[data-upload]')
        if(btnSave){
            btnSave.onclick = async()=>{
                const elementData = this.Modal2.body.querySelectorAll('[data-keyedit]');
                let ob= Object.assign({},detail);
                elementData.forEach((item)=>{
                    ob[item.dataset.keyedit] = item.value;
                    
                });
                this.Modal2.showBodyHtml(`<img src="${this.App.UserApp.barloading}" /> Memproses...`);
                const detailAfter = await this.TapelInduk.dataCurrentProfilSiswaByTapel(ob,dataset.tapel,dataset.id);
                this.Modal2.hide();
                this.Modal1.showBodyHtml(viewInduk.showDetailItemInduk(detailAfter));
                this.listenerModalinModal((dataset)=>this[dataset['modalItem']](dataset,detailAfter));
                this.Modal1.show();
                document.querySelector(`[data-radio-induk="${dataset.tapel}"]`).checked = true;
                document.querySelector(`[data-radio-induk="${dataset.tapel}"]`).dispatchEvent(new Event('change'));
            };
        }
    }
    showIjazahAngkatan(){
        
        this.submenu.innerHTML = viewInduk.subTahunLulus(this.service.dataIjazahAngkatan);
        this.listenerRadioMenu(async (v)=>{
            const data = this.service.dataIjazahAngkatan.find(s=>s.tahunLulus == v);
            const TableProperties = await import("../../entries/vendor.js").then(n=>n.TableProperties);
            
            this.workplace.innerHTML = viewRiwayat.showRekapIjazah(data);
            
            const tabel = document.querySelector('table.toExcel');
            const tp = new TableProperties(tabel)
            tp.freezeColumn([0,1,2,3,4,5])
            tp.addScrollUpDown();
            this.listenerModal((dataset)=>{
                
                let siswa = data.dataLulusan.find(s=>s.id == dataset.id);
                this.showDokumenLulusan(siswa,'showIjazahAngkatan');
            });
        });
    }
    showDokumenLulusan(siswa,nextMethod){
        
        this.Modal1.showHideFooter(false);
        this.Modal1.widthOrientation(false);
        this.Modal1.settingHeder(`Dokumen Digital ${siswa.pd_nama} (${siswa.id}/${siswa.nama_rombel})`);
        this.Modal1.showBodyHtml(viewInduk.showTambahDokumenModal(siswa));
        this.listenerModalinModal((dataset)=>this[dataset['modalItem']](dataset,siswa,nextMethod));
        this.Modal1.show();
        const uploads = document.querySelectorAll('[data-upload]');
        uploads.forEach(btninput=>{
            if(btninput.type==='file'||btninput.type==='FILE'){
                btninput.onchange = async(e)=>{
                    let file = e.target.files[0];
                    let elemenUpload = e.target.dataset.upload;
                    let sel = document.getElementById('preview_'+elemenUpload);
                    let propertifile = {namafile:`${siswa.id} ${siswa.pd_nama}`,subfolder:elemenUpload}
                    if(sel){
                        sel.innerHTML = `<img src="${this.App.UserApp.barloading}" />`;
                    }
                    

                    if(file){
                        await this.service.updateProfileSiswaWithMainMedia(siswa,file,{[elemenUpload]:'idfile'})
                        const afterUpdate = this.service.db.siswa.find(s=>s.id == siswa.id);
                        sel.innerHTML = afterUpdate?.[elemenUpload];
                        this[nextMethod](afterUpdate,nextMethod);
                        document.querySelector(`[data-radio-induk="${siswa.awalanInduk}"]`).checked=true;
                        document.querySelector(`[data-radio-induk="${siswa.awalanInduk}"]`).dispatchEvent(new Event('change'));
                    }
                    }
                
            }else{
                btninput.onclick = async(e)=>{
                    let conf = confirm('Anda yakin ingin menghapus ini?');
                    const dokhapus = btninput.dataset.btnhapus;
                    // let elemenUpload = dokhapus;//e.target.dataset.upload;
                    let sel = document.getElementById('preview_'+dokhapus);
                    // let propertifile = {namafile:`${siswa.id} ${siswa.pd_nama}`,subfolder:elemenUpload}
                    if(sel){
                        sel.innerHTML = `<img src="${this.App.UserApp.barloading}" />`;
                    }
                    
                    const siswaUpdate = Object.assign({},siswa, {[dokhapus]:''})
                    if(!conf) return;
                    await this.service.updateProfilSiswa(siswaUpdate);
                        const afterUpdate = this.service.db.siswa.find(s=>s.id == siswa.id);
                        sel.innerHTML = '';//afterUpdate?.[elemenUpload];
                        this.Modal1.hide();
                        this[nextMethod](afterUpdate,nextMethod);
                        document.querySelector(`[data-radio-induk="${siswa.awalanInduk}"]`).checked = true;
                        document.querySelector(`[data-radio-induk="${siswa.awalanInduk}"]`).dispatchEvent(new Event('change'));
                }
            }
        })
    }
    cetakIdentitas(dataset,detail){
        this.Modal1.hide();
        this.Modal2.widthOrientation(false);
        this.Modal2.settingHeder('Cetak Identitas Induk');
        this.Modal2.showHideFooter(false);
        this.Modal2.showBodyHtml(viewInduk.showWraperInduk(viewInduk.showIdentitasInduk(detail,this.App.UserApp.logoSekolah),false,true));
        
        this.Modal2.show();
        const btnPrint = document.getElementById('btnPrintKelulusan');
        if(btnPrint){
            btnPrint.onclick = ()=>{
                this.Modal2.control.printPortraitDom(this.Modal2.body)
            }
        }
    }
    cetakIjazah(dataset,detail){
        let cekfile = detail.dokumen.find(s=>s.jenis_dokumen==='ijazah');
        if(cekfile){
            this.Modal1.hide();
            this.Modal2.show();
            this.Modal2.showHideFooter(false);
            this.Modal2.settingHeder(`Preview Scan Ijazah`);
            this.Modal2.showBodyHtml(viewInduk.showWraperInduk(viewInduk.showMediaToHTML(cekfile),false,false));
        }else{
            alert('Scan Ijazah tidak ditemukan');
        }
    }
    uploadDokumenTambahanDokumenSiswa(dataset,detail,nextMethod){
        this.Modal2.showHideFooter(false);
        this.Modal1.hide();
        this.Modal2.widthOrientation(false);
        this.Modal2.settingHeder(`Upload File Tambahan ${detail.pd_nama} (${detail.nama_rombel})` );
        this.Modal2.showBodyHtml(viewInduk.showWraperInduk(viewInduk.showCrudFileTambahan(detail),true,false));
        this.Modal2.show();
        
        const controls = document.querySelectorAll('[data-kontrolfile]');
        
        const btn = document.getElementById('btnAdd');
        const dataColections = document.querySelectorAll('[data-keydokumen]');
        const datacek = {
            keterangan:'',
            jenis_dokumen:''
        };
        dataColections.forEach(formcontrol=>{
            formcontrol.oninput = (e)=>{
                datacek[e.target.dataset.keydokumen]=e.target.value;
            }
        });
        btn.onclick = ()=>{
            if(datacek.keterangan !=="" && datacek.jenis_dokumen !=="" && Object.keys(datacek).length>=2){
                document.querySelector('[data-kontrolfile="addFile"]').click();
            }else{
                alert('Mohon lengkapi jenis dan keterangan dokumen sebelum menunggah file.');
            }
        }
        controls.forEach(control=>{
            if(control.type=='file'||control.type=="FILE"){
                control.onchange = async (e)=>{
                    let file = e.target.files[0];
                    if(file){
                        viewInduk.addRowTableDynamic(this.App.UserApp.barloading);

                        let extension=file.name.split('.').pop();
                        dataColections.forEach(formcontrol=>{
                            datacek[formcontrol.dataset.keydokumen]=formcontrol.value;
                            
                        });
                        datacek.type=extension;
                        await this.service.updateDokumenTambahanSiswa(file,datacek,{subfolder:detail.pd_nama, namafile:datacek.keterangan+'.'+extension})
                        // const detailAfter = this.service.ormInduk.find(s=>s.awalanInduk===dataset.tapel);
                        // this.showTapelInduk();
                        // await this.service.init();
                        this.Modal2.hide();
                        // //
                        this[nextMethod]();
                        
                        document.querySelector(`[data-radio-induk="${dataset.tapel}"]`).checked = true;
                        document.querySelector(`[data-radio-induk="${dataset.tapel}"]`).dispatchEvent(new Event('change'));
                        this.Modal2.hide();
                    }
                }
            }else{
                control.onclick = async (e)=>{
                    const konfirmasi = confirm('Anda yakin akan menghapus dokumen ini? Data terhapus tidak bisa dikembalikan lagi.');
                    if(!konfirmasi) return;
                    const datafile = detail.dokumen?.find(s=>s.idbaris == e.target.dataset.idDokumen);
                    datafile.tokensiswa="";
                    await this.service.hapusDokumenTambahan(datafile);
                    // const detailAfter = this.service.ormInduk.find(s=>s.awalanInduk===dataset.tapel);
                    //     this.showTapelInduk();
                    this[nextMethod]();
                        document.querySelector(`[data-radio-induk="${dataset.tapel}"]`).checked = true;
                        document.querySelector(`[data-radio-induk="${dataset.tapel}"]`).dispatchEvent(new Event('change'));
                    //     const itemdetail = detailAfter.indukurut.find(s=>s.id ==dataset.id);
                    //     this.uploadDokumenTambahan(dataset,itemdetail);
                    //     this.Modal1.showBodyHtml(viewInduk.showDetailItemInduk(itemdetail));
                    //     this.listenerModalinModal((dataset)=>this[dataset['modalItem']](dataset,itemdetail));
                    this.Modal2.hide();
                }
            }
        });
    }
    cetakInduk(dataset,detail){
        const {riwayatRapor} = detail;
        const fokusRaport = riwayatRapor.find(s=>s.kodetapel == dataset.tapel);//?.['rapor_semester'+dataset.semester];
        const targetKurikulum = fokusRaport?.['rapor_semester'+dataset.semester]?.kurikulum||false;
        const riwayatAsli = this.service.repo.makroRiwayat.find(s=>s.tapel == dataset.tapel);
        
        const riwayat = {
            target:{
                rombel:fokusRaport?.['rapor_semester'+dataset.semester]?.rombel,
                jenjang :parseInt(fokusRaport?.['rapor_semester'+dataset.semester]?.rombel),
                tapel:fokusRaport?.tapel,
                semester:dataset.semester,
                kurikulum:targetKurikulum,
                kode_tapel:fokusRaport?.kodetapel,
                // idss : idSs,
                // mapel: koleksiMapel,
                mapelsiswa:(kelas)=>riwayatAsli['kelas_'+kelas+'_mapel']
            }
        }
        this.Modal2.showHideFooter(false);
        this.Modal1.hide();
        this.Modal2.widthOrientation(false);
        this.Modal2.settingHeder(`Cetak Buku Induk Tapel ${riwayatAsli.tapel} semester ${dataset.semester}`);
        this.Modal2.showBodyHtml(viewInduk.showWraperInduk('Cetak Buku Induk:'+detail.pd_nama+' tidak ditemukan'));
        if(targetKurikulum){
            // this.Modal2.showBodyHtml(viewRiwayat['kontenRaport'+targetKurikulum](fokusRaport?.['rapor_semester'+dataset.semester],riwayat));
            this.Modal2.showBodyHtml(viewInduk.showWraperInduk(viewRiwayat['kontenInduk'+targetKurikulum](fokusRaport?.['rapor_semester1'],riwayat,fokusRaport?.['rapor_semester2'])));
        }
        this.Modal2.show();
        const btnPrint = document.getElementById('btnPrintKelulusan');
        if(btnPrint){
            btnPrint.onclick = ()=>{
                this.Modal2.control.printPortraitDom(this.Modal2.body)
            }
        }
    }
    cetakRaport(dataset,detail){
        const {riwayatRapor} = detail;
        const fokusRaport = riwayatRapor.find(s=>s.kodetapel == dataset.tapel);//?.['rapor_semester'+dataset.semester];
        const targetKurikulum = fokusRaport?.['rapor_semester'+dataset.semester]?.kurikulum||false;
        const riwayatAsli = this.service.repo.makroRiwayat.find(s=>s.tapel == dataset.tapel);
        const riwayat = {
            target:{
                rombel:fokusRaport?.['rapor_semester'+dataset.semester]?.rombel,
                jenjang :parseInt(fokusRaport?.['rapor_semester'+dataset.semester]?.rombel),
                tapel:fokusRaport?.tapel,
                semester:dataset.semester,
                kurikulum:targetKurikulum,
                kode_tapel:fokusRaport?.kodetapel,
                // idss : idSs,
                // mapel: koleksiMapel,
                mapelsiswa:(kelas)=>riwayatAsli['kelas_'+kelas+'_mapel']
            }
        }
        
        this.Modal1.hide();
        this.Modal2.widthOrientation(false);
        this.Modal2.showHideFooter(false);
        this.Modal2.settingHeder(`Cetak Buku Raport Tapel ${riwayatAsli.tapel} semester ${dataset.semester}`);
        this.Modal2.showBodyHtml('Cetak Buku Raport:'+detail.pd_nama+' tidak ditemukan');
        
        if(targetKurikulum){
            this.Modal2.showBodyHtml(viewInduk.showWraperInduk(viewRiwayat['kontenRaport'+targetKurikulum](fokusRaport?.['rapor_semester'+dataset.semester],riwayat)));
        }
        this.Modal2.show();
        const btnPrint = document.getElementById('btnPrintKelulusan');
        if(btnPrint){
            btnPrint.onclick = ()=>{
                this.Modal2.control.printPortraitDom(this.Modal2.body);
            }
        }
    }
    listenerRadioMenu(cb){
        const radios = document.querySelectorAll('[data-radio-induk]');
        radios.forEach(radio=>{
            radio.onchange = (e)=>{
                if(radio.checked){
                    cb(e.target.value)
                }
            }
        });
        radios[0].dispatchEvent(new Event('change'));
    }
    listenerSelectMenu(cb){
        const radios = document.querySelectorAll('[data-radio-select]');
        radios.forEach(radio=>{
            radio.onchange = (e)=>{
                cb(e.target.value)
            }
        });
        radios[0].dispatchEvent(new Event('change'));
    }
    listenerModal(cb){
        const buttons = document.querySelectorAll('[data-modal]');
        buttons.forEach(btn=>{
            btn.onclick = (e)=>{
                cb(btn.dataset)
            }
        })
    }
    listenerModalinModal(cb){
        const buttons = document.querySelectorAll('[data-modal-item]');
        buttons.forEach(btn=>{
            btn.onclick = (e)=>{
                // cb(e.target.dataset);
                cb(btn.dataset);
            }
        })
    }
}