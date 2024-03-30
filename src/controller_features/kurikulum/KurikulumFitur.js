import Elemencp from "../../domains/Elemencp";
import KompetensiSosial from "../../domains/KompetensiSosial";
import KompetensiSpiritual from "../../domains/KompetensiSpiritual";
import Tpatp from "../../domains/Tpatp";
import FaseDomain from "../../domains/faseDomain";
import properti_k3 from "../../domains//properti_k3";
import mapelkdcp_kurikulum from "../../models/mapel";
import { JenisKurikulum, faseAbjadKarakter, faseKey } from "../../routes/settingApp";
import OrmKurkulum from "./OrmKurikulum";
import { viewHTMLElemenCp, viewPropertiKurkulum } from "./viewKurikulum";


export default class KurikulumFitur{
    #rombel;
    #jenjangActive;
    #mapelAplikasi;
    #judulHalaman;
    constructor(kurikulumService,user){
        this.kurikulumService = kurikulumService;
        this.user=user;;
        this.ormKurikulum = null;;
        this.#rombel = '1A';;
        this.#jenjangActive = 1;;
        this.#mapelAplikasi = mapelkdcp_kurikulum;;
        this.#judulHalaman = '';
        this.maincontrol =document.getElementById('maincontrol');
        this.workplace =document.getElementById('printarea');
    }

    settingHeaderPage(){
        let lastTitle = `<h4 class="text-center mb-3">Semester ${this.user.semester} Tahun Pelajaran ${this.user.tapel}</h4>`;
        this.#judulHalaman = '';
        
        for(let i = 0 ; i < arguments.length-1; i++){
            this.#judulHalaman +=`<h3 class="text-center mb-0">${arguments[i]}</h3>`;
        }
        
        if(arguments[arguments.length-1]==true){
            this.#judulHalaman+= lastTitle;
        }
        // return this.#judulHalaman;
    }
    get arrayNamaFase(){
        return {
            'faseA':[1,2],
            'faseB':[3,4],
            'faseC':[5,6]
          };
    }
    get abjadFase(){
        return {
            "1":"A",
            "2":"A",
            "3":"B",
            "4":"B",
            "5":"C",
            "6":"C",
          }
    }
    set jenjang(x){
        this.#jenjangActive = x;;
    }
    
    get jenjang(){
        return this.#jenjangActive.toString();;
    }
    get shortKurikulum(){
        return JenisKurikulum[this.jenjang];;
    }
    get longKurikulum(){
        return this.shortKurikulum=='kurmer'?'Kurikulum Merdeka':'Kurikulum 2013';;
    }
    get namafase(){
        return faseKey[this.jenjang];;
    }

    get dbService(){
        return this.ormKurikulum.db;
    }

    get callKDorTP(){
        return this.shortKurikulum =='kurtilas'?'kelas'+this.jenjang:this.namafase;;
    }

    get currentMapelOnClassRoom(){
        let tinggiRendah = this.jenjang>3?'tinggi':'rendah';;
        
        let teks = 'mapel'+this.shortKurikulum + tinggiRendah;;
        return this.#mapelAplikasi[teks]();;
    }

    get labelingSelectMapel(){
        let data = [];
        Object.entries(this.currentMapelOnClassRoom).forEach(([key,value])=>{;
            let ob = {};
            ob.label = value;
            ob.value = key;
            data.push(ob);
        })
        return data;

    }
    
    get labelingPropertiKurikulum(){
        let data = [];
        if(this.shortKurikulum == 'kurmer'){;
            data = [
                {id:'properti_elemencp',label:'Elemen CP','fasekelas':'elemencp'},
                {id:'properti_tp',label:'TP','fasekelas':this.callKDorTP},
                {id:'properti_atp',label:'ATP','fasekelas':'faseTPATP'},
                {id:'properti_profilpancasila',label:'Profil Pancasila','fasekelas':'profilpancasila'},
            ];
        }else{
            data = [
                {id:'properti_k1',label:'KD1','fasekelas':'k1kelas'+this.jenjang},
                {id:'properti_k2',label:'KD2','fasekelas':'k2kelas'+this.jenjang},
                {id:'properti_k3',label:'KD3','fasekelas':this.callKDorTP},
                {id:'properti_k4',label:'KD4','fasekelas':this.callKDorTP},
                {id:'properti_k1umum',label:'KD1 Raport','fasekelas':'k1kelas'+this.jenjang},
                {id:'properti_k2umum',label:'KD2 Raport','fasekelas':'k2kelas'+this.jenjang},
            ];
        }
        return data;
    }

    settingJenjang(x){
        this.jenjang = x;;
        return this;;
    }
    async isExist(tabs){
        if(!this.kurikulumService.data.hasOwnProperty(tabs)){;
            await this.kurikulumService.callDb(tabs);;
        }
        return this;;
    }
    async firstCall(){
        await this.isExist(this.callKDorTP);
        return this;
    }
    async settingOrm(){
        
        await this.isExist(this.callKDorTP);;
        this.ormKurikulum = new OrmKurkulum(this.kurikulumService.data,this.jenjang);;
        return this;;
    }

    async fitur_item_kurikulum(){
        
        this.event_item_kurikulum();
        let radio = document.querySelector('[name="groupproperti"]:checked');
        radio.dispatchEvent(new Event('change'));
    }
    
    event_item_kurikulum(){
        let mapel = document.getElementById('idselectmapel');
        let radio = document.querySelectorAll('[name="groupproperti"]');
        let v = {
            mapel:mapel.value,
            teks:mapel.options[mapel.selectedIndex].text,
            properti:radio[0].dataset.properti,
            prop:radio[0].dataset.properti,
            idelemen : radio[0].id
        }
        
        mapel.onchange = async(e)=>{
            v.mapel = e.target.value;
            v.teks=e.target.options[e.target.selectedIndex].text;
            await this.show_item_kurikulum(v);
        
        };
        radio.forEach(n=>{
            n.onchange = async(e)=>{
                if(n.checked){
                    v.properti = n.dataset.properti;
                    v.prop = n.dataset.properti;
                    v.idelemen = n.id;
                    if(n.id.indexOf('umum')>-1){
                        mapel.parentElement.classList.add('invisible');
                    }else{
                        mapel.parentElement.classList.remove('invisible');

                    }
                    await this.show_item_kurikulum(v)
                }
            }
        })

    }
    titleByProperti(v){
        const {properti,teks,idelemen,abjadfase} = v;
        let title = 'Belum Ditentukan';
        let title2 = teks;
        let title3 = ''
        if(idelemen == 'properti_elemencp'){
            title = 'Capaian Pembelajaran Fase '+abjadfase;
            title3  = 'Kelas ' + this.arrayNamaFase[this.namafase].join(' dan ');
        }else if(idelemen =='properti_tp'){
            title = 'Tujuan Pembelajaran Fase '+abjadfase;
            title3  = 'Kelas ' + this.arrayNamaFase[this.namafase].join(' dan ');
        }else if(idelemen == 'properti_atp'){
            title = 'Alur Tujuan Pembelajaran Fase '+abjadfase;
            title3  = 'Kelas ' + this.arrayNamaFase[this.namafase].join(' dan ');
        }else if(idelemen == "properti_profilpancasila"){
            title = 'Profil Pancasila';
            title3  = 'Kelas ' + this.arrayNamaFase[this.namafase].join(' dan ');
        }else if(idelemen == "properti_k1"){
            title = 'Kompetensi Dasar Sikap Spiritual (K1)';
            title3  = 'Kelas ' + this.jenjang;
        }else if(idelemen == "properti_k1umum"){
            title = 'Kompetensi Dasar Sikap Spiritual Raport (K1)';
            title2= 'Kompetensi Umum (Digunakan untuk deskripsi Raport)'
            title3  = 'Kelas ' + this.jenjang;
        }else if(idelemen == "properti_k2umum"){
            title = 'Kompetensi Dasar Sikap Sosial Raport (K1)';
            title2= 'Kompetensi Umum (Digunakan untuk deskripsi Raport)'
            title3  = 'Kelas ' + this.jenjang;
        }else if(idelemen == "properti_k2"){
            title = 'Kompetensi Dasar Sikap Sosial (K2)';
            title3  = 'Kelas ' + this.jenjang;
        }else if(idelemen == "properti_k3"){
            title = 'Kompetensi Dasar Pengetahuan (K3)';
            title3  = 'Kelas ' + this.jenjang;
        }else if(idelemen == "properti_k4"){
            title = 'Kompetensi Dasar Keterampilan (K4)';
            title3  = 'Kelas ' + this.jenjang;
        }

        this.settingHeaderPage(title,title2,title3,false);
    }
    async show_item_kurikulum(v){
        v.abjadfase =this.abjadFase[this.jenjang];//this.namafase.replace('fase','');
        
        this.titleByProperti(v);
        this.workplace.innerHTML = this.#judulHalaman;
        
        await this.isExist(v.properti);
        await this.settingOrm();
        
        if(this.ormKurikulum[v.idelemen]){
            // let orm = this.ormKurikulum[v.idelemen](v);
            let orm = [];
            if(this.shortKurikulum == 'kurmer'){
                orm = this.ormKurikulum['properti_atp'](v);
            }else{
                orm = this.ormKurikulum[v.idelemen](v);
            }
            let ob = {
                tipe:v.idelemen,
                orm:orm,
                kurikulum:this.shortKurikulum,
                prop:v.prop,
                kelasFase:this.arrayNamaFase[this.namafase],
                mapel:v.mapel

            }
            
            this.workplace.innerHTML = this.#judulHalaman + viewPropertiKurkulum(ob);
            this.listener_item_kurikulum(ob);
        }else{
            this.workplace.innerHTML = 'Dalam Tahap Pengembangan';
        }
        
    }
    sanitizingProperti(tab,data,tipe=''){
        
        if(tab == 'elemencp'){
            return new Elemencp(data).sanitize().data;
        }else if(tab=='faseTPATP'){
            return new Tpatp(data).sanitize().data;
        }else if(tab =='faseA'){
            
            return new FaseDomain(data).sanitize().data;
        }else if(tab=='faseB'){
            return new FaseDomain(data).sanitize().data;
        }else if(tab=='faseC'){
            return new FaseDomain(data).sanitize().data;
        }else if(tab.indexOf('k1kelas')>-1){
            // return [
            //     // {tab:tab,data:data}
            //     return data;
            // ];
            return new KompetensiSpiritual(data).sanitize().data;
        }else if(tab.indexOf('k2kelas')>-1){
            
            return new KompetensiSosial(data).sanitize().data
        }else{
            if(tipe == 'properti_k3'){
                return new properti_k3(data).sanitize().data;
            }
        }
    }
    sanitizingPropertiTambah(tab,data){
        let nextExecutable = true;
        if(tab == 'elemencp'){
            if(data.elemen == '' || data.cp_utama == '' || data.kode_elemen == ''){
                nextExecutable = false
            }
            let result =  new Elemencp(data)
                    .addItem('fase',this.abjadFase[this.jenjang])
                    .sanitize().data;
            return {data:result,nextExecutable:nextExecutable};
        }else if(tab=='faseTPATP'){
            if(data.kelas == ''|| data.foreignkey_tp == 'Pilih CP' || data.kelas == ''){
                nextExecutable = false;
            }
            data.kelas = Array.isArray(data.kelas)?data.kelas.join(','):'';
            let result =  new Tpatp(data).sanitize().data;
            return {data:result,nextExecutable:nextExecutable};
        }else if(tab=='faseA'){
            if(data.tp == ''){
                nextExecutable = false;
            }
            let result =  new FaseDomain(data).sanitize().data;
            return {data:result,nextExecutable:nextExecutable}
        }else if(tab=='faseB'){
            if(data.tp == ''){
                nextExecutable = false;
            }
            let result =  new FaseDomain(data).sanitize().data;
            return {data:result,nextExecutable:nextExecutable}
        }else if(tab=='faseC'){
            if(data.tp == ''){
                nextExecutable = false;
            }
            let result =  new FaseDomain(data).sanitize().data;
            return {data:result,nextExecutable:nextExecutable}
        }else if(tab.indexOf('k1kelas')>-1){
            return [
                {tab:k1,data:data}
            ];
        }else if(tab.indexOf('k2kelas')>-1){
            return [
                {tab:k2,data:data}
            ];
        }else{
            return ['kelas kurtilas']
        }
    }
    listener_item_kurikulum(v){
        
        const {tipe, orm,prop,mapel} = v;
        const textareaAutoFit = document.querySelectorAll('textarea');
        textareaAutoFit.forEach(tx=>{
            tx.style.height = tx.scrollHeight +'px';
        });
        
        // if(tipe == 'properti_atp'){
            const dataaksi =document.querySelectorAll('[data-aksi]');
            let tahan = true;
            dataaksi.forEach(btn=>{
                btn.onclick=async()=>{
                    if(!tahan){
                        alert('Tunggu sedang proses')
                        return;
                    }
                    
                    if(btn.getAttribute('data-aksi')=='edit'){
                        let row = btn.closest('tr');
                        let lrow = btn.getAttribute('data-dataproperti');
                        let objekAsal = this.kurikulumService.data[prop].filter(s=> s.idbaris == lrow)[0];
                        let formulir = row.querySelectorAll('[data-update]');
                        let objekUpdate = {};
                        let kelasCeklis = [];
                        if(this.shortKurikulum=='kurtilas'){
                            objekUpdate.semester1=0;
                            objekUpdate.semester2=0;
                            if(prop == 'kelas3'|| prop == 'kelas6'){
                                objekAsal = this.kurikulumService.data[prop].filter(s=> s.baris == lrow)[0];
                            }
                        }
                        formulir.forEach(el=>{
                            let key = el.getAttribute('data-update');
                            if(el.nodeName == "TEXTAREA"){
                                objekUpdate[key] = el.value.replace(/(\r|\n|\r\n|\n\n)/gm,' ');
                            }else if(el.nodeName=="INPUT" && el.type == 'number'){
                                objekUpdate[key] = el.value;
                            }else if(el.nodeName=="INPUT" && el.type == 'checkbox'){
                                if(el.checked){
                                    kelasCeklis.push(el.value);
                                    if(key.indexOf('semester')>-1){
                                        objekUpdate[key] = 1;

                                    }else{
                                        objekUpdate[key] = kelasCeklis;

                                    }
                                }
                            }else{
                                objekUpdate[key] = el.value;
                            }
                        });
                        if(this.shortKurikulum=='kurtilas'){

                            objekUpdate.kelas = this.jenjang;
                        }else{

                            objekUpdate.kelas = kelasCeklis.join(',')
                        }
                        
                        const objekMerge = Object.assign({},objekAsal,objekUpdate);
                        const objekKirim = this.sanitizingProperti(prop,objekMerge,tipe);//new Tpatp(objekMerge).sanitize().data;
                        
                        let konfirmasi = confirm('Anda yakin?');
                        if(!konfirmasi) return;

                        tahan=false;
                        
                        if(this.kurikulumService[`update_${prop}`]){
                            await this.kurikulumService[`update_${prop}`](objekKirim);
                        }else{
                            console.log('method update belum ada untuk = ' + prop);
                        }
                        
                        tahan=true;
                        
                        this.fitur_item_kurikulum();
                    }else if(btn.getAttribute('data-aksi')=='hapus'){
                        let lrow = btn.getAttribute('data-dataproperti');
                        let objekAsal = this.kurikulumService.data[prop].filter(s=> s.idbaris == lrow)[0];
                        
                        if(objekAsal.banksoalids > 0){
                            alert(`Anda tidak bisa menghapus properti kurikulum ini karena ada ${objekAsal.banksoalids} item Bank Soal yang telah menautkan properti ini.`);
                            return;
                        }
                        let objekMerge = Object.assign({},objekAsal)
                        const objekKirim = this.sanitizingProperti(prop,objekMerge);//new Tpatp(objekMerge).sanitize().data;
                        
                        let konfirmasi = confirm('Anda yakin?');
                        if(!konfirmasi) return;

                        tahan=false;
                        
                        if(this.kurikulumService[`hapus_${prop}`]){
                            await this.kurikulumService[`hapus_${prop}`](objekKirim);
                        }else{
                            console.log('method hapus belum ada untuk ='+prop)
                        }
                        
                        tahan=true;
                        this.fitur_item_kurikulum();
                    }else{
                        let row = btn.closest('tr');
                        let formulir = row.querySelectorAll('[data-update]');
                        let objekUpdate = {};
                        objekUpdate.kodemapel = mapel;
                        let kelasCeklis=[]
                        formulir.forEach(el=>{
                            let key = el.getAttribute('data-update');
                            
                            if(el.nodeName == "TEXTAREA"){
                                objekUpdate[key] = el.value.replace(/(\r|\n|\r\n|\n\n)/gm,' ');
                            }else if(el.nodeName=="INPUT" && el.type == 'number'){
                                objekUpdate[key] = el.value;
                            }else if(el.nodeName=="INPUT" && el.type == 'checkbox'){
                                if(el.checked){
                                    kelasCeklis.push(el.value);
                                    objekUpdate[key] = kelasCeklis;
                                }
                            }else{
                                objekUpdate[key] = el.value;
                            }
                        });
                        
                        let objectMerge = Object.assign({},this.kurikulumService.data['blangko_'+prop],objekUpdate)
                        const objekKirim = this.sanitizingPropertiTambah(prop,objectMerge);
                        
                        if(!objekKirim.nextExecutable){
                            alert('Isian harus lengkap/terisi semua!');
                            return false;
                        }
                        
                        let konfirmasi = confirm('Anda yakin?');
                        if(!konfirmasi) return;
                        if(this.kurikulumService[`tambah_${prop}`]){
                            await this.kurikulumService[`tambah_${prop}`](objekKirim.data);
                        }else{
                            console.log('method tambah belum ada untuk ='+prop)
                        }
                        this.fitur_item_kurikulum();
                        // const objekKirim = Object.assign({},blangko_faseTPATP,objekUpdate);
                        // tahan=false;
                        // await this.actionServerKumer('tambah','faseTPATP',objekKirim,0);
                        // tahan=true;
                    }
                }
            })
        

    }


}