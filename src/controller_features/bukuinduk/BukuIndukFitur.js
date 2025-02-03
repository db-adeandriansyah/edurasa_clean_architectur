import viewRiwayat from "../../riwayat_raport/RiwayatView";
import viewInduk from "./BukuIndukView";

export default class BukuIndukFitur{
    constructor(app,service,submenu,workplace,modal, modal2){
        this.service = service;
        this.App = app;
        this.submenu = submenu;
        this.workplace = workplace;
        this.Modal1 = modal;
        this.Modal2 = modal2;
    }
    showSetingInduk(){
        this.workplace.innerHTML = viewInduk.showRingkasanInduk(this.service.ormInduk);
        return this;
    }
    async showKlapper(){
        this.service.createKlapper();
        const ormKlapper = this.service.ormKlapper;
        this.workplace.innerHTML ="Klapper";
        this.submenu.innerHTML = viewInduk.subMenuKlapper(ormKlapper);
        this.listenerSelectMenu((v)=>{
            console.log(ormKlapper.find(s=>s.abjad === v))
        });
        
        return this;
    }
    showTapelInduk(){
        
        this.submenu.innerHTML = viewInduk.subMenuInduk(this.service.ormInduk);
        this.listenerRadioMenu(async (tapel)=>{
            if(tapel==='false'){
                tapel=false;    
            }
            
            this.workplace.innerHTML = "Memproses ....";
            const detail = this.service.ormInduk.find(s=>s.awalanInduk===tapel);
            await this.service.raportInduk(detail.tapelInduk);
            const detailAfter = this.service.ormInduk.find(s=>s.awalanInduk===tapel);
            
            this.workplace.innerHTML = viewInduk.showRekapTapel(detailAfter,tapel);
            this.listenerModal((dataset)=>this.showDetailItemInduk(dataset,tapel,detailAfter));
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
        const btnUploads = document.querySelectorAll('[data-upload]')
        if(btnSave){
            btnSave.onclick = async()=>{
                const elementData = this.Modal2.body.querySelectorAll('[data-keyedit]');
                let ob= {};
                elementData.forEach((item)=>{
                    ob[item.dataset.keyedit] = item.value;
                    
                });
                this.Modal2.showBodyHtml(`<img src="${this.App.UserApp.barloading}" /> Memproses...`)
                await this.service.updateProfilSiswa(ob);
                this.Modal2.hide();
                //
                const detailAfter = this.service.ormInduk.find(s=>s.awalanInduk===dataset.tapel);
                this.showTapelInduk();
                
                const itemdetail = detailAfter.indukurut.find(s=>s.id ==dataset.id);
                this.Modal1.showBodyHtml(viewInduk.showDetailItemInduk(itemdetail));
                this.listenerModalinModal((dataset)=>this[dataset['modalItem']](dataset,itemdetail));
                this.Modal1.show()
            }
            btnUploads.forEach(upload=>{
                upload.onchange = async (e)=>{
                    let file = e.target.files[0];
                    let elemenUpload = e.target.dataset.upload;
                    let sel = document.getElementById('preview_'+elemenUpload);
                    let propertifile = {namafile:`${detail.id} ${detail.pd_nama}`,subfolder:elemenUpload}
                    if(sel){
                        sel.innerHTML = `<img src="${this.App.UserApp.barloading}" />`;
                    }
                    

                    if(file){
                        const data = await this.service.uploadFile(file,propertifile);
                        
                        sel.innerHTML = data.idfile;
                        document.querySelector(`[data-keyedit="${elemenUpload}"]`).value = data.idfile;
                        document.querySelector(`[data-btnhapus="${elemenUpload}"]`).classList.remove('d-none');
                    }
                    
                }
            })
        }
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
            this.Modal2.showBodyHtml(viewInduk.showWraperInduk(viewInduk.showMediaToHTML(cekfile),false,true));
        }else{
            alert('Scan Ijazah tidak ditemukan');
        }
    }
    uploadDokumenTambahan(dataset,detail){
        this.Modal2.showHideFooter(false);
        this.Modal1.hide();
        this.Modal2.widthOrientation(false);
        this.Modal2.settingHeder(`Upload File Tambahan`);
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
                        
                        const detailAfter = this.service.ormInduk.find(s=>s.awalanInduk===dataset.tapel);
                        this.showTapelInduk();
                        
                        const itemdetail = detailAfter.indukurut.find(s=>s.id ==dataset.id);
                        this.uploadDokumenTambahan(dataset,itemdetail);
                        this.Modal1.showBodyHtml(viewInduk.showDetailItemInduk(itemdetail));
                        this.listenerModalinModal((dataset)=>this[dataset['modalItem']](dataset,itemdetail));
                        // this.Modal1.show()
                    }
                }
            }else{
                control.onclick = async (e)=>{
                    const konfirmasi = confirm('Anda yakin akan menghapus dokumen ini? Data terhapus tidak bisa dikembalikan lagi.');
                    if(!konfirmasi) return;
                    const datafile = detail.dokumen?.find(s=>s.idbaris == e.target.dataset.idDokumen);
                    datafile.tokensiswa="";
                    await this.service.hapusDokumenTambahan(datafile);
                    const detailAfter = this.service.ormInduk.find(s=>s.awalanInduk===dataset.tapel);
                        this.showTapelInduk();
                        
                        const itemdetail = detailAfter.indukurut.find(s=>s.id ==dataset.id);
                        this.uploadDokumenTambahan(dataset,itemdetail);
                        this.Modal1.showBodyHtml(viewInduk.showDetailItemInduk(itemdetail));
                        this.listenerModalinModal((dataset)=>this[dataset['modalItem']](dataset,itemdetail));
                }
            }
        })
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
        console.log('fokusRapor', fokusRaport)
        console.log('fokusRapor riwya 1t', fokusRaport.rapor_semester1);
        console.log('fokusRapor riwyat titimangsa semester1', fokusRaport.rapor_semester1.TITIMANGSA_RAPORT);
        console.log('fokusRapor riwyat titimangsa semester2', fokusRaport.rapor_semester2.TITIMANGSA_RAPORT);
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
        const radios = document.querySelectorAll('[data-radio-induk]');
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
                cb(e.target.dataset);
            }
        })
    }
    listenerModalinModal(cb){
        const buttons = document.querySelectorAll('[data-modal-item]');
        buttons.forEach(btn=>{
            btn.onclick = (e)=>{
                cb(e.target.dataset);
            }
        })
    }
}