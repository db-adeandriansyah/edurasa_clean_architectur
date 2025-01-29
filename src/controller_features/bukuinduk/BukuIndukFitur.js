import viewRiwayat from "../../riwayat_raport/RiwayatView";
import viewInduk from "./BukuIndukView";

export default class BukuIndukFitur{
    constructor(service,submenu,workplace,modal, modal2){
        this.service = service;
        this.submenu = submenu;
        this.workplace = workplace;
        this.Modal1 = modal;
        this.Modal2 = modal2;
    }
    showSetingInduk(){
        this.workplace.innerHTML = viewInduk.showRingkasanInduk(this.service.ormInduk);
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
        // this.Modal2.showHideFooter(false);
        this.Modal2.showBodyHtml('cetak identitas:'+detail.pd_nama)
        this.Modal2.show();
        
    }
    cetakIdentitas(dataset,detail){
        console.log('dataset cetakIdentitas',dataset);
        console.log('detail cetakIdentitas',detail);
        
        this.Modal1.hide();
        this.Modal2.widthOrientation(false);
        this.Modal2.settingHeder('Cetak Identitas Induk');
        this.Modal2.showHideFooter(false);
        
        this.Modal2.showBodyHtml(viewInduk.showWraperInduk(viewInduk.showIdentitasInduk(detail),false));
        
        this.Modal2.show();
        const btnPrint = document.getElementById('btnPrintKelulusan');
        if(btnPrint){
            btnPrint.onclick = ()=>{
                this.Modal2.control.printPortraitDom(this.Modal2.body)
            }
        }
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
        this.Modal2.showBodyHtml('Cetak Buku Induk:'+detail.pd_nama+' tidak ditemukan');
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