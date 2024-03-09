// import htmlAbsen from "../../views/absen/viewAbsen";
import OrmAbsen from "./OrmAbsen";
import UrlImg from "../../controllers/UrlImg";
import OrmKaldik from "../kaldik/OrmKaldik";
import { htmldenah, tabelabsenperbulan } from "./viewAbsen";
import { TableProperties }  from "../../entries/vendor";//"../../utilities/tableProperties";

export default class AbsensiFitur{
    constructor(absenService,currentUser,Modal,Modal1){
        this.service = absenService;
        this.user = currentUser;
        this.Modal = Modal;
        this.Modal1 = Modal1;
        this.ormSiswaAbsen = null;
        this.ormKaldik = new OrmKaldik(absenService.data.kalender);
        this.workplace =document.getElementById('printarea');
        this.footerarea =document.getElementById('footerarea');
        this.maincontrol =document.getElementById('maincontrol');
        this.rombel = '1A';
        this.jenjang = 1;
    }
    
    makeInstance(devClass,param=[]){
        if(param.length==0){
            return new devClass();
        }else{
            return new devClass(...param);
        }
    }

    settingRombel(rombel){
        this.rombel = rombel;
        this.jenjang = parseInt(rombel);
        // this.ormSiswaAbsen = new OrmAbsen(this.service.data.dataAbsen,this.service.data.allsiswa,this.ormKaldik).settingKelas(rombel);
        this.ormSiswaAbsen = this.makeInstance(OrmAbsen,[
            this.service.data.dataAbsen,
            this.service.data.allsiswa,
            this.ormKaldik,
            UrlImg
            ])
            .settingKelas(rombel);
        return this;
    }
    
    fitur_hari_ini_currentRombel(){
        let datasiswa = this.ormSiswaAbsen.currentRombel;
        let img = new UrlImg(this.user.imgUser).urlImg;
        let absen = this.ormSiswaAbsen.currentRombelHariIni;
        this.show_hari_ini_currentRombel(datasiswa,img,absen);
        this.eventShowFormulirAbsen(datasiswa,absen);
    }
    
    show_hari_ini_currentRombel(datasiswa,imgUser,dataAbsen){
        // this.workplace.innerHTML = htmlAbsen.htmlDenahAbsenApi(datasiswa,this.rombel,imgUser,dataAbsen);
        this.workplace.innerHTML = htmldenah(datasiswa,this.rombel,imgUser,dataAbsen);
    }
    
    eventShowFormulirAbsen(datasiswa){
        let imgs = document.querySelectorAll('[data-imgabsen]');
        imgs.forEach(img=>{
            img.onclick = (e)=>{
                let atr = img.getAttribute('data-imgabsen');
                let tgl = img.getAttribute('data-tgl');
                let string_tgl = new Date(tgl).toLocaleString('id-ID',{dateStyle:'full'});
                let tokensiswa = atr.split('_')[0];
                let idhari = atr.split('_')[1];
                let siswa = datasiswa.filter(s=> s.id == tokensiswa)[0];
                this.Modal.settingHeder('Absensi '+siswa.pd_nama +' ('+ string_tgl+')');
                this.Modal.showBodyHtml(idhari);
                this.Modal.show();
            }
        })
    }
    
    fitur_perbulan_currentRombel(){
        this.event_perbulan_currentRombel();
        let elementBulan = document.getElementById('idselectbulanabsen');
        elementBulan.dispatchEvent(new Event('change'));
    }

    event_perbulan_currentRombel(){
        let elementBulan = document.getElementById('idselectbulanabsen');
        let checkSabtu = document.getElementById('switchsabtu');
        let checkmarking = document.getElementById('switchmarked');
        
        elementBulan.onchange = (e)=>{
            let bulan = e.target.value;
            let sabtu =document.getElementById('switchsabtu').checked;
            let marked =document.getElementById('switchmarked').checked;
            this.workplace.innerHTML = `Bulan ${bulan}<br>Sabtu = ${sabtu}<br>marked=${marked}`;
            let test =  this.ormSiswaAbsen.dataAbsenPerBulan(bulan,sabtu);
            console.log(test);
            this.show_perbulan_currentRombel(test);
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
            let test =  this.ormSiswaAbsen.dataAbsenPerBulan(bulan,sabtu);
            console.log(test);
            this.show_perbulan_currentRombel(test);
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
            let test =  this.ormSiswaAbsen.dataAbsenPerBulan(bulan,sabtu);
            console.log(test);
            this.show_perbulan_currentRombel(test);
        }
    }

    show_perbulan_currentRombel(data){
        this.workplace.innerHTML = tabelabsenperbulan(data);
        let tb = new TableProperties(document.querySelector('#tabelabsenbulanan'));
            tb.addScrollUpDown();
    }
    
}