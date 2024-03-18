import iconhadir from "../../img/hadir.png";
import OrmAbsen from "./OrmAbsen";
import UrlImg from "../../controllers/UrlImg";
import { htmldenah, tabelabsenRekapperbulan, tabelabsenperbulan, templatingCardSingle, templatingCardSingleLarge, viewFormulir, viewTableAbsenPerbulanWithCalculation, viewTableRekapAbsenPerSemesterWithCalculation, viewTableRekapAbsenPerbulanWithCalculation, viewTableRekapSemester, viewTableRootAbsenPerbulanWithCalculation } from "./viewAbsen";
import { TableProperties }  from "../../entries/vendor";
import AbsensiSiswa from "../../domains/AbsensiSiswa";
import GrafikChart from "../grafik/GrafikChart";
// import { modeLulus } from "../modal/mode-tab-scroll";
// import charts from 'charts'
export default class AbsensiFitur{
    constructor(absenService,currentUser,Modal,Modal1,tooltipkan,OrmKaldik){
        this.service = absenService;
        this.user = currentUser;
        this.Modal = Modal;
        this.Modal1 = Modal1;
        this.tooltipkan = tooltipkan;
        this.ormSiswaAbsen = null;
        this.ormKaldik = OrmKaldik;//new OrmKaldik(absenService.data.kalender);
        this.workplace =document.getElementById('printarea');
        this.footerarea =document.getElementById('footerarea');
        this.maincontrol =document.getElementById('maincontrol');
        this.rombel = '1A';
        this.jenjang = 1;
        this.headerPage='';
        this.idimg_Ijin = '1VOdeOa_vilNTwfGWn48VK56-v5IWzibb';
        this.idimg_Alpa = '1tDBZCBhUDs9eu3o9yc7FNImjPiHXKQR7';
        this.idimg_Sakit = '10sfjLCvGjOL0kG2sabg5OBQc8s3_JmNs';
    }
    
    makeInstance(devClass,param=[]){
        if(param.length==0){
            return new devClass();
        }else{
            return new devClass(...param);
        }
    }
    instansOrm(){
        this.ormSiswaAbsen = this.makeInstance(OrmAbsen,[
            this.service.data.dataAbsen,
            this.service.data.allsiswa,
            this.ormKaldik,
            UrlImg,
            iconhadir,
            this.idimg_Ijin,
            this.idimg_Alpa,
            this.idimg_Sakit
            ]);
        return this;
    }
    settingRombel(rombel){
        this.rombel = rombel;
        this.jenjang = parseInt(rombel);
        
        this.instansOrm().ormSiswaAbsen.settingKelas(rombel);
        return this;
    }
    
    fitur_hari_ini_currentRombel(){
        let datasiswa = this.ormSiswaAbsen.currentRombel;
        let img = new UrlImg(this.user.imgUser).urlImg;
        let absen = this.ormSiswaAbsen.currentRombelHariIni;
        this.show_hari_ini_currentRombel(datasiswa,img,absen);
        this.eventShowFormulirAbsen(datasiswa,'fitur_hari_ini_currentRombel');
    }
    
    show_hari_ini_currentRombel(datasiswa,imgUser,dataAbsen){
        this.workplace.innerHTML = htmldenah(datasiswa,this.rombel,imgUser,dataAbsen,iconhadir);
    }
    
    eventShowFormulirAbsen(datasiswa,metod){
        let imgs = document.querySelectorAll('[data-imgabsen]');
        imgs.forEach(img=>{
            img.onclick = (e)=>{

                let atr = img.getAttribute('data-imgabsen');
                let tgl = img.getAttribute('data-tgl');
                
                let editable = parseInt(img.getAttribute('data-edit'));
                let string_tgl = new Date(tgl).toLocaleString('id-ID',{dateStyle:'full'});
                let tokensiswa = atr.split('_')[0];
                let idhari = atr.split('_')[1];
                let siswa = datasiswa.filter(s=> s.id == tokensiswa)[0];
                let dataAbsenByJenjang = this.ormSiswaAbsen.curr_collectionAbsenJenjang.data;
                let dataAbsenForFormulir = [];
                if(Boolean(editable)){  
                    let findAbsen = dataAbsenByJenjang.filter(s=> s.idbaris == editable);
                    dataAbsenForFormulir = findAbsen[findAbsen.length-1];
                }
                const dataformulir = {
                            currentSrcImg : e.target.src,
                            siswa: siswa,
                            modeedit:Boolean(editable),
                            dataabsen:dataAbsenForFormulir
                        } 
                this.Modal.settingHeder('Absensi '+siswa.pd_nama +' ('+ string_tgl+')');
                this.Modal.showBodyHtml(viewFormulir(dataformulir));
                this.Modal.showHideFooter(false);
                this.listenerFormulirAbsen(dataAbsenForFormulir,siswa,tgl,idhari,metod,'Modal');
                this.Modal.show();
            }
        })
    }
    
    listenerFormulirAbsen(dataformulir,siswa,tgl,idhari,metod,modal){
        const radios = document.querySelectorAll('[name="kehadiran"]');
        const idFileAbsen = document.getElementById('idFileUpload');
        const elemenImg = document.getElementById('gambarpreview');
        const btnUploadpoto = document.getElementById('uploadpoto');
        const btnSimpanPerubahan = document.getElementById('simpanPerubahan');
        
        radios.forEach(n=>{
            n.onchange = (e)=>{
                
                if(n.checked){
                    let test = this['idimg_'+e.target.value];
                    
                    if(!Array.isArray(dataformulir)){
                        if(e.target.value == dataformulir.kehadiran){
                            idFileAbsen.value = dataformulir.fileContent;
                            elemenImg.src = dataformulir.idfileimg;
                        }else{
                            idFileAbsen.value = test??'';
                            elemenImg.src = test?new UrlImg(test).urlImg:iconhadir;
                        }
                    }else{
                        idFileAbsen.value = test??'';
                        elemenImg.src = test?new UrlImg(test).urlImg:iconhadir;
                    }

                }
            }
        });
        
        btnUploadpoto.onchange = (e)=>{
            let file = e.target.files;
            let propertiImage={
                subfolder:'Kelas '+this.rombel,
                namafile: 'id_siswa_'+siswa.id+'_idhari_'+idhari
            }
            if(file){
                // let ff=e.target.files[0]
                this.service.repo.uploadGambarAbsen(file[0],propertiImage,(idfile)=>{
                    idFileAbsen.value = idfile;
                    elemenImg.src = new UrlImg(idfile).urlImg;
                },{})
            }
        };

        btnSimpanPerubahan.onclick = async()=>{
            let kehadiranInput = document.querySelector('[name="kehadiran"]:checked');
            let idfileInput = document.getElementById('idFileUpload');
            
            let conf = confirm('Anda yakin?');

            if(!conf) return;
            
            if(!Array.isArray(dataformulir)){
                let dataupdate = {
                    'kehadiran':kehadiranInput.value,
                    'fileContent':idfileInput.value,
                    'Time_Stamp':new Date(tgl),
                    'action':'guruNgabsensiSiswaEdurasa'
                }
            
                if(idfileInput.value == ""){
                    let cnf = confirm('Anda akan membuat siswa ini hadir secara default bawaan aplikasi.\r\n \r\n Apa Anda ingin mengganti poto/gambar siswanya');
            
                    if(cnf){
                        return;
                    }else{
                        dataupdate.id='';
                        dataupdate.tokensiswa='';
                    }
                }
                
                let datagenerate = Object.assign({},dataformulir,dataupdate)
                let objekupdate = new AbsensiSiswa(datagenerate).sanitize().data;

                this[modal].toggle()
                
                await this.service.SimpanAbsen(this.jenjang,objekupdate,'update');
                
                this.instansOrm();//
                this.ormSiswaAbsen.settingKelas(this.rombel);
                this[metod].call(this);
                
            }else{
                if(idfileInput.value == ""){
                    confirm('Anda akan membuat siswa ini hadir secara default bawaan aplikasi.\r\n \r\n Apa Anda ingin mengganti poto/gambar siswanya?');
                    this[modal].toggle();
                    return;
                }

                let dataupdate = {
                    'kehadiran':kehadiranInput.value,
                    'fileContent':idfileInput.value,
                    'tokensiswa':siswa.id,
                    'kelas':siswa.nama_rombel,
                    'name':siswa.pd_nama,
                    'id':idhari,
                    'Time_Stamp':new Date(tgl),
                    'action':'guruNgabsensiSiswaEdurasa'
                }
                let objekkirimbaru = new AbsensiSiswa(dataupdate).sanitize().data;
                
                this[modal].toggle();
                await this.service.SimpanAbsen(this.jenjang,objekkirimbaru);
                
                this.instansOrm();
                this.ormSiswaAbsen.settingKelas(this.rombel);;
                this[metod].call(this);
            }
        }
    }

    fitur_perbulan_currentRombel(){
        
        this.event_perbulan_currentRombel();
        this.eventSorterDataSiswa('fitur_perbulan_currentRombel');

        let elementBulan = document.getElementById('idselectbulanabsen');

        elementBulan.dispatchEvent(new Event('change'));
    }
    fitur_rekap_siswa_bulanan_currentRombel(){
        
        this.event_rekap_siswa_bulanan_currentRombel();
        this.eventSorterDataSiswa('fitur_rekap_siswa_bulanan_currentRombel');

        let elementBulan = document.getElementById('idselectbulanabsen');

        elementBulan.dispatchEvent(new Event('change'));
    }

    eventSorterDataSiswa(methodCurrent){
        const radiosSorter = document.querySelectorAll('[name="sorter"]');

        radiosSorter.forEach(n=>{
            n.onchange = (e)=>{
                if(n.checked){
                    let v = e.target.value;
                    this.ormSiswaAbsen.sortirSiswaByKey(v,'asc');
                    this[methodCurrent]()
                }
            }
        })
    }
    

    event_perbulan_currentRombel(){
        let elementBulan = document.getElementById('idselectbulanabsen');
        let checkSabtu = document.getElementById('switchsabtu');
        let checkmarking = document.getElementById('switchmarked');
        let datasiswa = this.ormSiswaAbsen.currentRombel;
        elementBulan.onchange = (e)=>{
            let bulan = e.target.value;
            let sabtu =document.getElementById('switchsabtu').checked;
            let marked =document.getElementById('switchmarked').checked;
            let data =  this.ormSiswaAbsen.dataAbsenPerBulan(bulan,sabtu,marked);
            
            
            this.workplace.innerHTML = `Bulan ${bulan}<br>Sabtu = ${sabtu}<br>marked=${marked}`;
            
            this.show_perbulan_currentRombel(data);
            this.eventShowFormulirAbsen(datasiswa,'fitur_perbulan_currentRombel');
        }
        
        checkSabtu.onchange = (e)=>{
            let bulan = document.getElementById('idselectbulanabsen').value;
            let marked =document.getElementById('switchmarked').checked;
            let sabtu = true;// e.target.value;

            if(e.target.checked){
                sabtu = true
            }else{
                sabtu=false;
            }
            
            this.workplace.innerHTML = `Bulan ${bulan}<br>Sabtu = ${sabtu}<br>marked=${marked}`;
            let data =  this.ormSiswaAbsen.dataAbsenPerBulan(bulan,sabtu,marked);
            
            this.show_perbulan_currentRombel(data);
            this.eventShowFormulirAbsen(datasiswa,'fitur_perbulan_currentRombel');
        }
        
        checkmarking.onchange = (e)=>{
            let bulan = document.getElementById('idselectbulanabsen').value;
            let sabtu =document.getElementById('switchsabtu').checked;
            let marked = true;//e.target.value;
            if(e.target.checked){
                marked = true;
            }else{
                marked = false;
            }
            
            this.workplace.innerHTML = `Bulan ${bulan}<br>Sabtu = ${sabtu}<br>marked=${marked}`;
            
            let data =  this.ormSiswaAbsen.dataAbsenPerBulan(bulan,sabtu,marked);
            
            this.show_perbulan_currentRombel(data);
            this.eventShowFormulirAbsen(datasiswa,'fitur_perbulan_currentRombel');
        }
        
        
    }

    event_rekap_siswa_bulanan_currentRombel(){
        let elementBulan = document.getElementById('idselectbulanabsen');
        let checkSabtu = document.getElementById('switchsabtu');
        
        let datasiswa = this.ormSiswaAbsen.currentRombel;
        elementBulan.onchange = (e)=>{
            let bulan = e.target.value;
            let sabtu =document.getElementById('switchsabtu').checked;
            
            this.workplace.innerHTML = `Bulan ${bulan}<br>Sabtu = ${sabtu}<br>marked=false`;
            let data =  this.ormSiswaAbsen.dataAbsenPerBulan(bulan,sabtu,false);
            
            this.show_rekap_siswa_bulanan_currentRombel(data);
            this.eventShowFormulirAbsen(datasiswa,'fitur_perbulan_currentRombel');
        }
        
        checkSabtu.onchange = (e)=>{
            let bulan = document.getElementById('idselectbulanabsen').value;
            let marked =false;
            let sabtu = true;// e.target.value;

            if(e.target.checked){
                sabtu = true
            }else{
                sabtu=false;
            }
            
            this.workplace.innerHTML = `Bulan ${bulan}<br>Sabtu = ${sabtu}<br>marked=${marked}`;
            
            let data =  this.ormSiswaAbsen.dataAbsenPerBulan(bulan,sabtu,marked);
            
            this.show_rekap_siswa_bulanan_currentRombel(data);
            this.eventShowFormulirAbsen(datasiswa,'fitur_perbulan_currentRombel');
        }
        
    }
    event_rekap_sia_bulanan(){
        let elementBulan = document.getElementById('idselectbulanabsen');
        let checkSabtu = document.getElementById('switchsabtu');
        
        let datasiswa = this.ormSiswaAbsen.currentRombel;
        elementBulan.onchange = (e)=>{
            let bulan = e.target.value;
            let sabtu =document.getElementById('switchsabtu').checked;
            
            this.workplace.innerHTML = `Bulan ${bulan}<br>Sabtu = ${sabtu}<br>marked=false`;
            let data =  this.ormSiswaAbsen.dataAbsenPerBulan(bulan,sabtu,false);
            
            this.show_rekap_sia_bulanan(data);
            // this.eventShowFormulirAbsen(datasiswa,'fitur_perbulan_currentRombel');
        }
        
        checkSabtu.onchange = (e)=>{
            let bulan = document.getElementById('idselectbulanabsen').value;
            let marked =false;
            let sabtu = true;// e.target.value;

            if(e.target.checked){
                sabtu = true
            }else{
                sabtu=false;
            }
            
            this.workplace.innerHTML = `Bulan ${bulan}<br>Sabtu = ${sabtu}<br>marked=${marked}`;
            
            let data =  this.ormSiswaAbsen.dataAbsenPerBulan(bulan,sabtu,marked);
            
            this.show_rekap_sia_bulanan(data);
            // this.eventShowFormulirAbsen(datasiswa,'fitur_perbulan_currentRombel');
        }
        
    }

    show_perbulan_currentRombel(data){
        
        let v = viewTableAbsenPerbulanWithCalculation(this.headerPage,this.user,data);
        this.workplace.innerHTML = v;
        let doms = document.getElementById('keterangankalenderabsen');
        this.ormKaldik.addKeteranganOnKalender(doms,data.tgl);
        let tb = new TableProperties(document.querySelector('#tabelabsenbulanan'));
            tb.freezeColumn([1]);
            tb.addScrollUpDown();
        this.tooltipkan();
    }
    
    show_perbulan_currentRombel(data){
        
        let v = viewTableAbsenPerbulanWithCalculation(this.headerPage,this.user,data);
        this.workplace.innerHTML = v;
        let doms = document.getElementById('keterangankalenderabsen');
        this.ormKaldik.addKeteranganOnKalender(doms,data.tgl);
        let tb = new TableProperties(document.querySelector('#tabelabsenbulanan'));
            tb.freezeColumn([1]);
            tb.addScrollUpDown();
        this.tooltipkan();
    }
    
    show_rekap_siswa_bulanan_currentRombel(data){
        let v = viewTableRekapAbsenPerbulanWithCalculation(this.headerPage,this.user,data);
        this.workplace.innerHTML = v;
    }

    fitur_rekap_siswa_semester(){
        let elementBulan = document.getElementById('idselectsemester');
        elementBulan.onchange = (e)=>{
            let titleHeader =e.target.options[e.target.selectedIndex].text;
            let marked = document.getElementById('switchsabtu');
            let dataAbsen = this.ormSiswaAbsen.dataAbsenPerSemester(new Date(e.target.value), marked.checked);
            
            this.workplace.innerHTML = viewTableRekapAbsenPerSemesterWithCalculation(titleHeader,this.rombel,this.user,dataAbsen);
        }
        let chekmarked = document.getElementById('switchsabtu');
        chekmarked.onchange = (e)=>{
            let elementBulan = document.getElementById('idselectsemester');
            let titleHeader = elementBulan.options[elementBulan.selectedIndex].text;
            let marked = e.target.checked;
            let dataAbsen = this.ormSiswaAbsen.dataAbsenPerSemester(new Date(elementBulan.value), marked);
            
            this.workplace.innerHTML = viewTableRekapAbsenPerSemesterWithCalculation(titleHeader,this.rombel,this.user,dataAbsen);
            
        }
        elementBulan.dispatchEvent(new Event('change'));
    }
    
    fitur_rekap_sia_bulanan(){
        this.event_rekap_sia_bulanan();
        this.eventSorterDataSiswa('fitur_rekap_sia_bulanan');

        let elementBulan = document.getElementById('idselectbulanabsen');

        elementBulan.dispatchEvent(new Event('change'));
    }
    show_rekap_sia_bulanan(data){
        let h = `<h3 class="text-center mb-0">Rekapitulasi Absensi (Sakit, Ijin, Alpa) Kelas ${this.rombel}</h3>`;
        let v = viewTableRootAbsenPerbulanWithCalculation(h,this.user,data);
        
        this.workplace.innerHTML = v;
        
        let doms = document.getElementById('keterangankalenderabsen');
        
        this.ormKaldik.addKeteranganOnKalender(doms,data.tgl);
        
        let tb = new TableProperties(document.querySelector('#tabelabsenbulanan'));
            tb.freezeColumn([1]);
            tb.addScrollUpDown();
        
            this.tooltipkan();

    }
    fitur_grafik_bulanan(){
        let elementBulan = document.getElementById('idselectbulanabsen');
        elementBulan.onchange = (e)=>{
            let titleHeader =e.target.options[e.target.selectedIndex].text;
            let marked = document.getElementById('switchsabtu');
            let modegrafik = document.querySelector('[name="modegrafik"]:checked');

            this.workplace.innerHTML = templatingCardSingle(this.headerPage,titleHeader);
            this.event_grafik_bulanan(e.target.value,marked.checked,modegrafik.value)
        }
        let chekmarked = document.getElementById('switchsabtu');
        chekmarked.onchange = (e)=>{
            let elementBulan = document.getElementById('idselectbulanabsen');
            let titleHeader = elementBulan.options[elementBulan.selectedIndex].text;
            let marked = e.target.checked;
            
            let modegrafik = document.querySelector('[name="modegrafik"]:checked');
            this.workplace.innerHTML = templatingCardSingle(this.headerPage,titleHeader);
            this.event_grafik_bulanan(elementBulan.value,marked,modegrafik.value)
        }
        let kontrolGrafik = document.querySelectorAll('[name="modegrafik"]');
        kontrolGrafik.forEach(n=>{
            n.onchange = (e)=>{
                if(n.checked){
                    let elementBulan = document.getElementById('idselectbulanabsen');
                    let marked = document.getElementById('switchsabtu');
                    let titleHeader = elementBulan.options[elementBulan.selectedIndex].text;

                    this.workplace.innerHTML = templatingCardSingle(this.headerPage,titleHeader);
                    this.event_grafik_bulanan(elementBulan.value,marked.checked,e.target.value)
                }
            }
        })
        elementBulan.dispatchEvent(new Event('change'));
    }
    event_grafik_bulanan(tgl,sabtu,modegrafik){
        let data = this.ormSiswaAbsen.dataAbsenPerBulan(new Date(tgl),sabtu,false);
        let jumlahHariEfektif = data.rekapRoot.filter(s=> s.hariefektif == true);
        const {rekapRoot,dataabsen} = data;

        let hC = 0;
        rekapRoot.forEach(n=>{
            let h,i,s,a;
            
            s = n.Sakit;
            i = n.Ijin;
            a = n.Alpa
            h = n.isLibur?'':(dataabsen.length -(s + i + a));
            let PhC = n.isLibur?0:(dataabsen.length -(s + i + a));
            // html+=`<th class="text-center">${h}</th>`;
            hC +=PhC;
        });
        let sakit = rekapRoot.map(n=>n.Sakit==""?0:n.Sakit).reduce((a,b)=>parseInt(a)+b);
        let ijin = rekapRoot.map(n=>n.Ijin==""?0:n.Ijin).reduce((a,b)=>parseInt(a)+b);
        let alpa = rekapRoot.map(n=>n.Alpa==""?0:n.Alpa).reduce((a,b)=>parseInt(a)+b);
        let persenHadir = ((hC/(jumlahHariEfektif.length * this.ormSiswaAbsen.currentRombel.length))*100).toFixed(2);
        let persenSakit = ((sakit/(jumlahHariEfektif.length * this.ormSiswaAbsen.currentRombel.length))*100).toFixed(2);
        let persenIjin = ((ijin/(jumlahHariEfektif.length * this.ormSiswaAbsen.currentRombel.length))*100).toFixed(2);
        let persenAlpa = ((alpa/(jumlahHariEfektif.length * this.ormSiswaAbsen.currentRombel.length))*100).toFixed(2);
        let buatHadir = [
            ['Kehadiran','Persentase',{ role: 'style' },{ role: 'annotation' } ],
            ['Hadir',parseFloat(persenHadir),'#66CDAA',parseFloat(persenHadir)+'%'],
            ['Sakit',parseFloat(persenSakit),'#FF00FF',parseFloat(persenSakit)+'%'],
            ['Ijin',parseFloat(persenIjin),'#F0E68C',parseFloat(persenIjin)+'%'],
            ['Alpa',parseFloat(persenAlpa),'#DC143C',parseFloat(persenAlpa)+'%']
        ];
        let options = {
            title: 'Data Kehadiran',
            // chartArea: {width: '80%'},
            // colors: ['#66CDAA', '#FF00FF', '#F0E68C','#DC143C',  '#B22222'],
            hAxis: {
                title: 'Kehadiran',
                
                minValue: 0, maxValue: 100,
                format: 'percent'
            },
            vAxis: {
                title: 'Persentase',
                scaleType: 'log',
                
            },
            
            animation:{
                duration: 1000,
                easing: 'out',
            },
            legend:{
                    position: 'labeled', 
                    textStyle: {color: 'blue', fontSize: 10
                }
            }
        };
        let container = document.getElementById('canvasgrafik');
        
        new GrafikChart().execFinalIn(buatHadir,options,container,modegrafik);;//.executeInThisDom(container);;//
        
    }
    fitur_grafik_rekap_sia_semester(){
        this.headerPage = '<h3 class="text-center mb-0">Grafik Absensi Persemester</h3>'
        let elementBulan = document.getElementById('idselectsemester');
        elementBulan.onchange = (e)=>{
            let titleHeader =e.target.options[e.target.selectedIndex].text;
            let marked = document.getElementById('switchsabtu');
            let modegrafik = document.querySelector('[name="modegrafik"]:checked');
            let tanpahadir = document.getElementById('switchhadir');
            let dataAbsen = this.ormSiswaAbsen.loopingSemester_dataAbsenPerBulan(new Date(e.target.value), marked);
            this.workplace.innerHTML = templatingCardSingleLarge(this.headerPage,titleHeader);
            this.event_grafik_rekap_sia_semester(dataAbsen,e.target.value,marked.checked,modegrafik.value,tanpahadir.checked)
        }
        let chekmarked = document.getElementById('switchsabtu');
        chekmarked.onchange = (e)=>{
            let elementBulan = document.getElementById('idselectsemester');
            let titleHeader = elementBulan.options[elementBulan.selectedIndex].text;
            let marked = e.target.checked;
            let tanpahadir = document.getElementById('switchhadir');
            let modegrafik = document.querySelector('[name="modegrafik"]:checked');
            let dataAbsen = this.ormSiswaAbsen.loopingSemester_dataAbsenPerBulan(new Date(elementBulan.value), marked);
            this.workplace.innerHTML = templatingCardSingleLarge(this.headerPage,titleHeader);
            this.event_grafik_rekap_sia_semester(dataAbsen,elementBulan.value,marked,modegrafik.value,tanpahadir.checked)
        }
        let tanpahadir = document.getElementById('switchhadir');
        tanpahadir.onchange = (e)=>{
            let elementBulan = document.getElementById('idselectsemester');
            let titleHeader = elementBulan.options[elementBulan.selectedIndex].text;
            let marked =  document.getElementById('switchsabtu');
            let tanpahadir = e.target.checked;
            let modegrafik = document.querySelector('[name="modegrafik"]:checked');
            let dataAbsen = this.ormSiswaAbsen.loopingSemester_dataAbsenPerBulan(new Date(elementBulan.value), marked);
            this.workplace.innerHTML = templatingCardSingleLarge(this.headerPage,titleHeader);
            this.event_grafik_rekap_sia_semester(dataAbsen,elementBulan.value,marked.checked,modegrafik.value,tanpahadir)
        }
        let kontrolGrafik = document.querySelectorAll('[name="modegrafik"]');
        kontrolGrafik.forEach(n=>{
            n.onchange = (e)=>{
                if(n.checked){
                    let elementBulan = document.getElementById('idselectsemester');
                    let marked = document.getElementById('switchsabtu');
                    let titleHeader = elementBulan.options[elementBulan.selectedIndex].text;
                    let tanpahadir = document.getElementById('switchhadir');
                    let dataAbsen = this.ormSiswaAbsen.loopingSemester_dataAbsenPerBulan(new Date(elementBulan.value), marked);
                    this.workplace.innerHTML = templatingCardSingleLarge(this.headerPage,titleHeader);
                    this.event_grafik_rekap_sia_semester(dataAbsen,elementBulan.value,marked.checked,e.target.value,tanpahadir.checked)
                }
            }
        });
        elementBulan.dispatchEvent(new Event('change'));
    }
    event_grafik_rekap_sia_semester(){
        
        let sumberdata = arguments[0];
        let includeHadir = arguments[4];
        let serviceData = [
            ['Bulan','Sakit',{role:'style'},{role:'annotation'},'Ijin',{role:'style'},{role:'annotation'},'Alpa',{role:'style'},{role:'annotation'}]

        ];
        if(includeHadir){
            serviceData = [
                ['Bulan','Hadir',{role:'style'},{role:'annotation'},'Sakit',{role:'style'},{role:'annotation'},'Ijin',{role:'style'},{role:'annotation'},'Alpa',{role:'style'},{role:'annotation'}]
    
            ];
        }
        
        sumberdata.forEach(n=>{
            let part_n = [];
            //judul;
            part_n.push(n.judul);
            //jumlahhariefektif
            let cHe = n.rekapRoot.filter(s=>s.hariefektif == true).length;
            //jumlahSiswa ;
            let cSiswa = n.dataabsen.length;
            let pembagi = (cHe * cSiswa);
            //sakit;
            let cS = n.rekapRoot.map(n=> n.Sakit == ''?0:n.Sakit).reduce((a,b)=>parseInt(a)+parseInt(b));
            //ijin;
            let cI = n.rekapRoot.map(n=> n.Ijin == ''?0:n.Ijin).reduce((a,b)=>parseInt(a)+parseInt(b));
            //alpa;
            let cA = n.rekapRoot.map(n=> n.Alpa == ''?0:n.Alpa).reduce((a,b)=>parseInt(a)+parseInt(b));
            //hadir;
            let cH = pembagi - (cS+cI+cA);
            
            let pH = Number(((cH/pembagi)*100).toFixed(2));// +'%';
            let pS = Number(((cS/pembagi)*100).toFixed(2));// +'%';
            let pI = Number(((cI/pembagi)*100).toFixed(2));// +'%';
            let pA = Number(((cA/pembagi)*100).toFixed(2));// +'%';
            if(includeHadir){
                part_n.push(pH);
                part_n.push('green');
                part_n.push(pH+'%');
            }
            //sakit
            part_n.push(pS);
            part_n.push('yellow');
            part_n.push(pS+'%');
            
            part_n.push(pI);
            part_n.push('orange');
            part_n.push(pI+'%');
            
            part_n.push(pA);
            part_n.push('red');
            part_n.push(pA+'%');// part_n.push(cHe);
            // part_n.push((cS+cI+cA));
            // part_n.push(n.rekapRoot);
            serviceData.push(part_n)
            //sakit;

        });
        
        let options = {
            title: 'Data Kehadiran',
            // chartArea: {width: '80%'},
            // colors: ['#66CDAA', '#FF00FF', '#F0E68C','#DC143C',  '#B22222'],
            hAxis: {
                title: 'Kehadiran',
                
                minValue: 0, maxValue: 100,
                format: 'percent'
            },
            vAxis: {
                title: 'Persentase',
                scaleType: 'log',
                
            },
            
            animation:{
                duration: 1000,
                easing: 'out',
            },
            legend:{
                    position: 'labeled', 
                    textStyle: {color: 'blue', fontSize: 8
                }
            }
        };
        let container = document.getElementById('canvasgrafik');
        
        new GrafikChart().execFinalIn(serviceData,options,container,arguments[3]);;//.executeInThisDom(container);;//
        
    }
}