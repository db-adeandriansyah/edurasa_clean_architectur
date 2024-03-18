import { PrintCetak,EdaToExcel,print2WordGlobal } from "../entries/vendor";
import { Controller } from "./Controller";
import {html2pdf} from "../entries/pdfku";
import { ttd } from "../views/tandatangan/ttd";
import kopsuratEdurasa from "../views/surat/kopsurat";
import { Offcanvas } from "bootstrap";


export default class Fitur extends Controller{
    
    constructor(app){
        super(app);
        this.KelasAmpuRadios = document.querySelectorAll('input[name="kelasampu"]');
        this.SidebarRadios = this.menus;
        this.btnPdfLandscape = document.getElementById('btnpdflandscape');
        this.btnPdfPortrait = document.getElementById('btnpdfportrait');
        this.btn_printPortrait = document.getElementById('btnprintportrait');
        this.btn_printLandscape = document.getElementById('btnprintlandscape');
        this.btn_wordPortrait = document.getElementById('btnwordportrait');
        this.btn_wordPLandscape = document.getElementById('btnwordlandscape');
        this.btnExcel = document.getElementById('btnExcel');
        this.koleksiBulanAplikasi = [];
        this.ttdControl = document.getElementById('formattd');
        this.kopsControl = document.getElementById('formatkop');
        
        this.createFirstArgumen();
    }
    createFirstArgumen(){
        if(this.KelasAmpuRadios.length>0){
            this.KelasAmpuRadios[0].checked = true;
            this.fokusRombel = this.KelasAmpuRadios[0].value;
            this.SidebarRadios[0].checked = true;
        }else{
            this.SidebarRadios[0].checked = true;
            this.fokusRombel = this.setApp.kelasAmpu;
        }
        this.btn_printPortrait.onclick =()=> this.printPortrait();
        this.btn_printLandscape.onclick =()=> this.printLandscape();
        this.btn_wordPLandscape.onclick =()=> this.wordLandscape();
        this.btn_wordPortrait.onclick =()=>  this.wordPortrait();
        this.btnPdfPortrait.onclick = ()=>this.pdfPortrait();
        this.btnPdfLandscape.onclick = ()=>this.pdfLandscape();
        this.btnExcel.onclick = ()=>this.excelFirst();
        this.bulanAplikasi();
        this.fokusMenu = document.querySelectorAll('input[name=menusidebar]:checked')[0].value;
    }
    excelFirst(){
        let cekTabel=this.workplace.querySelectorAll('table.toExcel');
        if(cekTabel.length==1){
            let tabelExcel = cekTabel[0];
            new EdaToExcel(tabelExcel,{
                sheetName:this.fokusMenu,
                filename:this.fokusMenu+'_'+new Date().getTime()
            }
                )
        }else{
            alert('Mohon maaf, tidak ada format tabel yang cocok untuk dapat diexport ke format excel!')
        }
        
    }
    excelDom(dom,queryTabel,title='Export Excel'){
        let cekTabel=dom.querySelectorAll(queryTabel);
        if(cekTabel.length==1){
            let tabelExcel = cekTabel[0];
            new EdaToExcel(tabelExcel,{
                sheetName:'Syahandrian_Eda',
                filename:title+'_'+new Date().getTime()
            }
                )
        }else{
            alert('Mohon maaf, tidak ada format tabel yang cocok untuk dapat diexport ke format excel!')
        }
        
    }
    printLandscapeDom(dom){
        const print = new PrintCetak();
        //const cekheadlink = print.head.querySelectorAll('link');
        const cekheadstyle = print.head.querySelectorAll('style');
        
        const content = dom.cloneNode(true);
        print.windDom.body.innerHTML = "";//content.replace('w3-animate-zoom','');
        print.windDom.body.appendChild(content);
        
        if(cekheadstyle.length>=1){
            cekheadstyle.forEach(el=>el.remove());
        }
        let create = document.createElement('style');
        let text = document.createTextNode(`@media print { html,body{margin:0;padding:0} .print-hide{display:none!important} @page {size: landscape;} }`);
        create.appendChild(text);
        print.windDom.head.appendChild(create);
        
        window.frames["iframeprint"].focus();
        
        window.frames["iframeprint"].print();
    }
    printLandscape(){
        const print = new PrintCetak();
        //const cekheadlink = print.head.querySelectorAll('link');
        const cekheadstyle = print.head.querySelectorAll('style');
        
        const content = this.workplace.cloneNode(true);
        print.windDom.body.innerHTML = "";//content.replace('w3-animate-zoom','');
        print.windDom.body.appendChild(content);
        
        if(cekheadstyle.length>=1){
            cekheadstyle.forEach(el=>el.remove());
        }
        let create = document.createElement('style');
        let text = document.createTextNode(`@media print { html,body{margin:0;padding:0} .print-hide{display:none!important} @page {size: landscape;} }`);
        create.appendChild(text);
        print.windDom.head.appendChild(create);
        
        window.frames["iframeprint"].focus();
        
        window.frames["iframeprint"].print();
    }
    printPortrait(){
        const print = new PrintCetak();
            // const cekheadlink = print.head.querySelectorAll('link');
            const cekheadstyle = print.head.querySelectorAll('style');
            // print.head.innerHTML.replaceAll('landscape','portrait');
            // print.windDom.body.innerHTML = content.replace('w3-animate-zoom','');
            
            // const contentss = this.workplace.innerHTML;
            // const contents = contentss.replace('w3-animate-zoom','');
            // const content= this.htmlToElements(contents);
            const content = this.workplace.cloneNode(true);
            print.windDom.body.innerHTML = "";//content.replace('w3-animate-zoom','');
            print.windDom.body.appendChild(content);
            
            
            if(cekheadstyle.length>=1){
                cekheadstyle.forEach(el=>el.remove());
            }
            let create = document.createElement('style');
            let text = document.createTextNode(`@media print { html,body{margin:0;padding:0} .print-hide{display:none!important} @page { size: portrait; } }`);
            create.appendChild(text);
            print.windDom.head.appendChild(create);
            
            
            window.frames["iframeprint"].focus();
            window.frames["iframeprint"].print();
    }
   
    printPortraitDom(dom){
        const print = new PrintCetak();
            // const cekheadlink = print.head.querySelectorAll('link');
            const cekheadstyle = print.head.querySelectorAll('style');
            // print.head.innerHTML.replaceAll('landscape','portrait');
            // print.windDom.body.innerHTML = content.replace('w3-animate-zoom','');
            
            // const contentss = this.workplace.innerHTML;
            // const contents = contentss.replace('w3-animate-zoom','');
            // const content= this.htmlToElements(contents);
            const content = dom.cloneNode(true);
            print.windDom.body.innerHTML = "";//content.replace('w3-animate-zoom','');
            print.windDom.body.appendChild(content);
            
            
            if(cekheadstyle.length>=1){
                cekheadstyle.forEach(el=>el.remove());
            }
            let create = document.createElement('style');
            let text = document.createTextNode(`@media print { html,body{margin:0;padding:0} .print-hide{display:none!important} @page { size: portrait; } }`);
            create.appendChild(text);
            print.windDom.head.appendChild(create);
            
            
            window.frames["iframeprint"].focus();
            window.frames["iframeprint"].print();
    }
    wordLandscapeDom(title="edurasa",dom){
        if(title=='edurasa') title = this.fokusMenu;
        new print2WordGlobal(dom,title,'landscape');
    }
    wordLandscape(title="edurasa"){
        if(title=='edurasa') title = this.fokusMenu;
        new print2WordGlobal(this.workplace,title,'landscape');
    }
    wordPortrait(title="edurasa"){
        if(title=='edurasa') title = this.fokusMenu;
        new print2WordGlobal(this.workplace,title,'portrait');
    }
    wordPortraitDom(title="edurasa",dom){
        if(title=='edurasa') title = this.fokusMenu;
        new print2WordGlobal(dom,title,'portrait');
    }
    pdfLandscape(){
        var opt = {
            margin:       0,
            filename:     this.fokusMenu+'_'+new Date().getTime()+'.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 1 ,logging:false},
            jsPDF:        { unit: 'in', format: 'A4', orientation: 'landscape' }
          };
           
          // New Promise-based usage:
        //   let html2pdf;

        //     import("html2pdf.js/src").then(module => {
        //         html2pdf = module.default;
        //     });
          html2pdf().from(this.workplace).set(opt).save();
    }
    pdfLandscapeDom(dom,title){
        var opt = {
            margin:       0,
            filename:     title+'_'+new Date().getTime()+'.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 1 ,logging:false},
            jsPDF:        { unit: 'in', format: 'A4', orientation: 'landscape' }
        };
          // New Promise-based usage:
        //   let html2pdf;

        //     import("html2pdf.js/src").then(module => {
        //         html2pdf = module.default;
        //     });
        html2pdf().from(dom).set(opt).save();
    }
    pdfPortrait(){
        var opt = {
            margin:       0,
            filename:     this.fokusMenu+'_'+new Date().getTime()+'.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 ,logging:false},
            jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' }
          };
           
          // New Promise-based usage:
        //   let html2pdf;

        //     import("html2pdf.js/src").then(module => {
        //         html2pdf = module.default;
        //     });

          html2pdf().from(this.workplace).set(opt).save();
    }
    pdfPortraitDom(dom,title){
        var opt = {
            margin:       0,
            filename:     title+'_'+new Date().getTime()+'.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 ,logging:false},
            jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' }
          };
           
          // New Promise-based usage:
        //   let html2pdf;

        //     import("html2pdf.js/src").then(module => {
        //         html2pdf = module.default;
        //     });
          html2pdf().from(dom).set(opt).save();
    }
    addKops(){
        const select = this.kopsControl;
        select.onchange = (e)=>{
            let dom = document.querySelector(".kops");
            if(e.target.value !=='none'){
                if(dom){
                    dom.remove();
                }
                
                const logo=this.setApp.logoDepok,logosekolah=this.setApp.logoSekolah;
                let objKetSurat = {
                    judul:'PEMERINTAH DAERAH KOTA DEPOK',
                    judul2:'DINAS PENDIDIKAN',
                    namasekolah:this.setApp.namaSekolah,
                    alamat:'Jl. SMP Ratujaya No. 41, RT 05/RW 03, Kel. Ratujaya',
                    alamat2:'NPSN: 20228914 | Email: uptdsdnratujaya1@gmail.com, web: www.sdnratujaya1.net',
                    tapelsemester:'TAHUN PELAJARAN '+this.setApp.tapel,
                    judul3:'NASKAH SOAL',
                    alamat3:'kecamatan Cipayung'
                }
                let crDom = document.createElement('div');
                crDom.setAttribute('class','kops mb-3');
                crDom.innerHTML =  kopsuratEdurasa[e.target.value](logo, objKetSurat,logosekolah);
                // this.workplace.appendChild(crDom);
                this.workplace.insertBefore(crDom,this.workplace.firstChild);
            }else{
                if(dom){
                    dom.remove();
                }
            }

        }
    }
    tandatangan(impersonate=true){
        const ptk= this.App.LocalJson('ptk');
        const kepsek = ptk.filter(s=>s.kelas ==="Kepala Sekolah")[0];
        
        let objekUserDefault= {
            nama_kepsek:kepsek.guru_namalengkap,//
            nip_kepsek:"NIP. "+kepsek.guru_nip,
            nama_guru:this.setApp.namaUser,
            nip_guru:this.setApp.nipUser,
            nama_sekolah:this.setApp.namaSekolah

        }
        if(impersonate){
            if(['admin','Kepala Sekolah','Staff'].includes(this.setApp.jabatanUser)){
                let guru = ptk.filter(s=> s.kelas == this.fokusRombel)[0];
                objekUserDefault.nama_guru = guru.guru_namalengkap;
                objekUserDefault.nip_guru = guru.guru_nip==""?"-":"NIP. "+guru.guru_nip;
            };
        }
        const select = this.ttdControl;
        select.onchange = (e)=>{
            let dom = document.querySelector(".tandatangan");
            let kanan="",kiri="",tengah="";
            kiri+=`${this.setApp.alamatSekolahkota}, ${new Date().toLocaleString('id-ID',{'dateStyle':'long'})}`;
            kiri+=`<br>`;
            
            let guru = ptk.filter(s=> s.kelas == this.fokusRombel)[0];
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
                    kiri +=`Kepala ${this.setApp.namaSekolah}<br><br><br><br><br>`;
                    kiri +=`<u><b>${objekUserDefault.nama_kepsek}</b></u><br>${objekUserDefault.nip_kepsek}`;
                    break;
                case "kepsekguru":
                    kanan +=`Mengetahui,<br/>`;
                    kanan +=`Kepala ${this.setApp.namaSekolah}<br><br><br><br><br>`;
                    kanan +=`<u><b>${objekUserDefault.nama_kepsek}</b></u><br>${objekUserDefault.nip_kepsek}`;
                    tengah="";
                    kiri +=`${guru.gurukelas_gmp} ${guru.kelas}<br><br><br><br><br>`;
                    kiri +=`<u><b>${objekUserDefault.nama_guru}</b></u><br/>${objekUserDefault.nip_guru}`;
                    break;
                case "ortukepsekguru":
                    kanan +=`Mengetahui,<br/>`;
                    kanan +=`Kepala ${this.setApp.namaSekolah}<br><br><br><br><br>`;
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
    exec_fitur(impersonate=true){
        const btn = this.menus;
        const initCanvasElement = new Offcanvas(document.getElementById('offcanvassidebar'))
        
        btn.forEach(el=>{
            el.onclick = (e)=>{
                this.tandatangan(impersonate);
                this.kopsControl.selectedIndex=0;
                this.addKops();
                
                if(this[e.target.value]){
                    this.maincontrol.innerHTML="";
                    this.workplace.innerHTML="Area Kerja Anda";
                    this.fokusMenu = e.target.value;
                    this[e.target.value]();
                    this.ttdControl.dispatchEvent(new Event('change'));
                    // this.kopsControl.dispatchEvent(new Event('change'));
                    document.getElementById('header').scrollIntoView();
                    initCanvasElement.hide();
                }else{
                    let infoEnvironment = process.env.NODE_ENV ==='development'?`[${e.target.value}]`:"";
                    alert('Belum tersedia, tunggu update terbarunya '+ infoEnvironment);
                    e.preventDefault();
                }
            }
        });

        btn[0].dispatchEvent(new Event('click'))
    }

    controlRombel(impersonate=true){//method_custom
        const btns = document.querySelectorAll('input[name="kelasampu"]');
        btns.forEach(el=>{
            el.onclick = (e)=>{
                const initCanvasElement = Offcanvas.getOrCreateInstance('#offcanvassidebar');//new Offcanvas(document.getElementById('offcanvassidebar'))
                
                this.kopsControl.selectedIndex=0;
                this.ttdControl.selectedIndex=0;
                this.maincontrol.innerHTML="";
                this.addKops();
                this.tandatangan(impersonate);

                this.fokusRombel = e.target.value;
                if(this[this.fokusMenu]){
                    
                    this[this.fokusMenu]();
                    this.ttdControl.dispatchEvent(new Event('change'));
                    initCanvasElement.hide();
                    // this.kopsControl.dispatchEvent(new Event('change'));
                    document.getElementById('header').scrollIntoView();
                    
                }else{
                    let infoEnvironment = process.env.NODE_ENV ==='development'?`[${e.target.value}]`:"";
                    alert('Belum tersedia, tunggu update terbarunya fokusRombel'+ infoEnvironment);
                    e.preventDefault();
                    
                }
            }
        });
    }
    
    bulanAplikasi(){
        if(this.koleksiBulanAplikasi.length ===0){
            let bulanAwal = new Date(this.setApp.tahunAwal,6,1);
            let bulanAkhir = new Date(this.setApp.tahunAkhir, 5,30);
            let arrayBulan = this.arrayBulan(bulanAwal, bulanAkhir);
            // let y = new Date().getFullYear();
            // let m0 = (new Date().getMonth()+1).toString().padStart(2,'0');
            this.koleksiBulanAplikasi = arrayBulan.map(n=>({label:new Date(n).toLocaleString('id-ID',{'month':'long'})+' '+new Date(n).toLocaleString('id-ID',{'year':'numeric'}),value:n}));
        }
        
    }
    semesterAplikasi(){
        
            let bulanAwal = new Date(this.setApp.tahunAwal,6,1);
            let m_bulanawal = bulanAwal.getMonth()+1;
            let y_bulanawal = bulanAwal.getFullYear();
            
            let bulanAkhir = new Date(this.setApp.tahunAkhir, 0,1);
            let m_bulanakhir = bulanAkhir.getMonth()+1;
            let y_bulanakhir = bulanAkhir.getFullYear();

            let f_semester1 = `${y_bulanawal}-${String(m_bulanawal).padStart(2,'0')}-01`;
            let f_semester2 = `${y_bulanakhir}-${String(m_bulanakhir).padStart(2,'0')}-01`;
            


            return [
                {
                    label:'Semester 1',
                    value: f_semester1
                },
                {
                    label:'Semester 2',
                    value: f_semester2
                },

            ]
            // let arrayBulan = this.arrayBulan(bulanAwal, bulanAkhir);
            // let y = new Date().getFullYear();
            // let m0 = (new Date().getMonth()+1).toString().padStart(2,'0');
            // this.koleksiBulanAplikasi = arrayBulan.map(n=>({label:new Date(n).toLocaleString('id-ID',{'month':'long'})+' '+new Date(n).toLocaleString('id-ID',{'year':'numeric'}),value:n}));
        
        
    }
    arrayBulan(bulanAwal, bulanAkhir){
        const startDate = new Date(bulanAwal);
        const endDate = new Date(bulanAkhir);
        const monthArray = [];
        
        let currentDate = startDate;
        
        while (currentDate <= endDate) {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            
            monthArray.push(`${year}-${month.toString().padStart(2, '0')}-01`);
            
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
        return monthArray;
    }
}