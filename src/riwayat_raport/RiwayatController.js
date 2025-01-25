import RepoRiwayat from "./RepoRiwayat";
import RiwayatService from "./RiwayatService";
import viewRiwayat from "./RiwayatView";

export default class RiwayatController{
    
    constructor(app,service,targetKey,currentRombel){
        this.app = app;
        this.service = service;
        this.repo = service.repo;
        this.requestKey = targetKey;
        this.currentRombel = currentRombel
        this.provider = null;
    }
    init(){
        const repo = new RepoRiwayat(this.repo,this.app.key,this.requestKey,this.currentRombel);
        this.provider = new RiwayatService(repo,this.service);
        
        return this;
    }
    get findMakroInduk(){
        return this.provider.findMakroInduk
    }
    async showRekap(){
        const p = await this.provider.showRekapRaport();
        const {riwayat,
                siswaCurrentRombel,        
                fitur,      
                siswaSesuaiSaatIni,       
                siswaSesuaiSaatIni_notFound,        
                siswaSaatIni_notFound_diTapelTarget} = p
        let html = {
            fitur : fitur,
            page    : viewRiwayat.rekapRaportRiwayat(siswaSesuaiSaatIni,riwayat,siswaSesuaiSaatIni_notFound,siswaSaatIni_notFound_diTapelTarget)
        }
        return html
    }
    async showRaportRiwayat(dom, print){
        const p = await this.provider.showRekapRaport();
        const {riwayat,
            siswaCurrentRombel,        
            fitur,      
            siswaSesuaiSaatIni,       
            siswaSesuaiSaatIni_notFound,        
            siswaSaatIni_notFound_diTapelTarget} = p;

        dom.innerHTML = viewRiwayat.html_raport_riwayat(siswaSesuaiSaatIni[0],siswaCurrentRombel);
        
        const domTarget = document.getElementById('area_rapor');
        
        this.listener_cetak((val)=>{
            let dataPertama = siswaSesuaiSaatIni.find(s=>s.tokensiswa == val);
            let kurikulum = dataPertama?.kurikulum || false;
            if(kurikulum){
                domTarget.innerHTML = viewRiwayat['kontenRaport'+kurikulum](dataPertama,riwayat);
            }else{
                domTarget.innerHTML = `<h2 class="text-center fw-bold fs1 text-danger">Tidak ditemukan</h2>`;
            }
        },siswaCurrentRombel,siswaSesuaiSaatIni);
        
        const btnPrint = document.getElementById('btnPrintKelulusan');
        btnPrint.onclick = ()=>{
            print(dom)
        }

    }
    async showInduk(dom,print){
        const dbInduk =await this.provider.showInduk();const {riwayat,
            siswaCurrentRombel,        
            fitur,      
            siswaSesuaiSaatIni,  
            siswaSesuaiSaatIni_1,
            siswaSesuaiSaatIni_2,     
            siswaSesuaiSaatIni_notFound,        
            siswaSaatIni_notFound_diTapelTarget} = dbInduk;

        dom.innerHTML = viewRiwayat.html_raport_riwayat(siswaSesuaiSaatIni[0],siswaCurrentRombel);
        
        const domTarget = document.getElementById('area_rapor');
        
        this.listener_cetak((val)=>{
            let dataPertama = siswaSesuaiSaatIni_1.find(s=>s.tokensiswa == val);
            let dataKedua = siswaSesuaiSaatIni_2.find(s=>s.tokensiswa == val);
            let kurikulum = dataPertama?.kurikulum || false;
            
            if(kurikulum){
                domTarget.innerHTML = viewRiwayat['kontenInduk'+kurikulum](dataPertama,riwayat,dataKedua);
                
                
            }else{
                domTarget.innerHTML = `<h2 class="text-center fw-bold fs1 text-danger">Tidak ditemukan</h2>`;

            }
        },siswaCurrentRombel,siswaSesuaiSaatIni);
        
        const btnPrint = document.getElementById('btnPrintKelulusan');
        btnPrint.onclick = ()=>{
            print(dom)
        }
    }
    listener_cetak(callFunction,siswaCurrentRombel){
        const selectName =document.getElementById('selectTargetSiswa');
        const btnRight = document.getElementById('btnRight');
        const btnLeft = document.getElementById('btnLeft');
        
        let tag = 0;
        selectName.onchange = (e)=>{
            tag = e.target.selectedIndex;
            let val = e.target.value;
            
            callFunction(val);
            // let html = "";
            // html+=dataPertama?.rombel||'-?-';
            // html+=`<br/>`;
            // html+=dataPertama?.nama||'-?-';
            // html+=`<br/>`
            // html+=dataPertama?.kurikulum||'-?-';
            // targetDom.innerHTML = html;


        }
        selectName.dispatchEvent(new Event('change'));
        btnRight.onclick = ()=>{
            tag++;
            if(tag >= siswaCurrentRombel.length-1){
                tag = siswaCurrentRombel.length-1;
            }
            selectName.selectedIndex = tag;
            selectName.dispatchEvent(new Event('change'));
        };
        btnLeft.onclick = ()=>{
            tag--;
            if(tag<0){
                tag=0
            };
            selectName.selectedIndex = tag;
            selectName.dispatchEvent(new Event('change'));
        }
    }
}