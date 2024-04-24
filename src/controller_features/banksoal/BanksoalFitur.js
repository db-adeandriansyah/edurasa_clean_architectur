import mapelkdcp_kurikulum from "../../models/mapel";
import { JenisKurikulum, faseKey } from "../../routes/settingApp";
import { FormatTanggal } from "../../utilities/FormatTanggal";
import controlbanksoal from "../../views/banksoal/controlBankSoal";
import CustomTextEditor from "../editor/CustomTextEditor";
import TextEditorEdurasa from "../editor/TextEditorEdurasa";
// import { createTemplatePerItemBankSoal } from "../editor/viewTextEditorEdurasa";
import OrmKurikulumSoal from "./OrmKurikulumSoal";
import { controlFiturBuatPerItemSoal, previewBentukSoal, previewSoalPilihanGandaWithProperty, previewSoalWithProperty } from "./viewBankSoal";

export default class BanksoalFitur{
    #jenjangActive;
    #judulHalaman;
    #mapelAplikasi;
    constructor(banksoalserv,Modal, Modal1,currentUser,tooltipkan){
        this.banksoalservice = banksoalserv;
        this.Modal = Modal;
        this.Modal1 = Modal1;
        this.user = currentUser;
        this.tooltipkan = tooltipkan;
        this.workplace =document.getElementById('printarea');
        this.footerarea =document.getElementById('footerarea');
        this.maincontrol =document.getElementById('maincontrol');
        this.#judulHalaman = '';
        this.#jenjangActive = 1;
        // this.relationalFitur = null;
        this.ormKurikulum = null;
        this.#mapelAplikasi=mapelkdcp_kurikulum;
        this.ar = [];
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


    get callKDorTP(){
        return this.shortKurikulum =='kurtilas'?'kelas'+this.jenjang:this.namafase;;
    }
    temakurtilas(tinggirendah){
        let ar = [];
        if(tinggirendah == 'tinggi'){
            ar ={
                'Tema 1':'Tema 1',
                'Tema 2':'Tema 2',
                'Tema 3':'Tema 3',
                'Tema 4':'Tema 4',
                'Tema 5':'Tema 5',
                'Tema 6':'Tema 6',
                'Tema 7':'Tema 7',
                'Tema 8':'Tema 8',
                'Tema 9':'Tema 9'
            }
            
        }else{

            ar ={
                'Tema 1':'Tema 1',
                'Tema 2':'Tema 2',
                'Tema 3':'Tema 3',
                'Tema 4':'Tema 4',
                'Tema 5':'Tema 5',
                'Tema 6':'Tema 6',
                'Tema 7':'Tema 7',
                'Tema 8':'Tema 8',
            }
            
        }
        return ar;
    }
    get tinggirendahjenjang(){
        return this.jenjang>3?'tinggi':'rendah';;
    }
    get currentMapelOnClassRoomWithTema(){
        let tinggiRendah = this.jenjang>3?'tinggi':'rendah';;
        let teks = 'mapel'+this.shortKurikulum + tinggiRendah;;
        let dataAsal = {};
        let mapelReal =  this.#mapelAplikasi[teks]();
        if(this.shortKurikulum == 'kurtilas'){
            let mapeling = this.temakurtilas(tinggiRendah)
            dataAsal = Object.assign({},mapeling,mapelReal);
        }else{
            dataAsal = mapelReal;
        }
        return dataAsal;
    }
    get currentMapelOnClassRoom(){
        let tinggiRendah = this.jenjang>3?'tinggi':'rendah';;
        let teks = 'mapel'+this.shortKurikulum + tinggiRendah;;
        let dataAsal = {};
        return  this.#mapelAplikasi[teks]();
        
    }

    get labelingSelectMapel(){
        let data = [];
        // let mapelReal = this.currentMapelOnClassRoom;
        let dataAsal = this.currentMapelOnClassRoom;
        
        Object.entries(dataAsal).forEach(([key,value])=>{;
            let ob = {};
            ob.label = value;
            ob.value = key;
            data.push(ob);
        })
        return data;

    }
    get labelingSelectMapelWithTema(){
        let data = [];
        // let mapelReal = this.currentMapelOnClassRoom;
        let dataAsal = this.currentMapelOnClassRoomWithTema;
        
        Object.entries(dataAsal).forEach(([key,value])=>{;
            let ob = {};
            ob.label = value;
            ob.value = key;
            data.push(ob);
        })
        return data;

    }
    get arrayTest(){
        return this.ar;
    }
    get koleksiBentukSoal(){
        return [
            {
                id:'fc_pg',
                bentuksoalspesifik:'Pilihan Ganda',
                bentuksoal:'Pilihan Ganda',
                editorinput:'editor',
                teks:'Pilihan Ganda (PG)',
                value:'Pilihan Ganda',
                otomatis:true,
                carakoreksi:'Otomatis',
                
            },
            {
                id:'fc_isian',
                bentuksoalspesifik:'Isian',
                bentuksoal:'Isian',
                editorinput:'editor',
                teks:'Isian Singkat',
                value:'Isian',
                otomatis:false,
                carakoreksi:'Manual'
            },
            {
                id:'fc_essay',
                bentuksoalspesifik:'Essay',
                bentuksoal:'Isian',
                editorinput:'editor',
                teks:'Essay',
                value:'Essay',
                otomatis:false,
                carakoreksi:'Manual'
            },
            {
                id:'fc_pgkomplek',
                bentuksoalspesifik:'Essay',
                bentuksoal:'Isian',
                editorinput:'editorpgkompleks',
                teks:'PG Kompleks',
                value:'PG Kompleks',
                otomatis:true,
                carakoreksi:'Otomatis'
            },
            {
                id:'fc_benarsalah',
                bentuksoalspesifik:'BenarSalah',
                bentuksoal:'BenarSalah',
                editorinput:'editorbenarsalah',
                teks:'Benar Salah',
                value:'BenarSalah',
                otomatis:true,
                carakoreksi:'Otomatis'
            },
            {
                id:'fc_menjodohkan',
                bentuksoalspesifik:'Menjodohkan',
                bentuksoal:'Menjodohkan',
                editorinput:'canvas',
                teks:'Menjodohkan',
                value:'Menjodohkan',
                otomatis:false,
                carakoreksi:'Manual'
            },
            
        ]
    }
    get kurikulumAktif(){
        return {
            nama:this.shortKurikulum,
            properti:''
        }
    }
    settingJenjang(x){
        // this.jenjang = x;;
        this.#jenjangActive = x;
        return this;;
    }
    settingKurikulum(){
        let ar = [
                    {
                        'idss': this.banksoalservice.repo.ss_kurikulum_must_call,
                        'tab':this.callKDorTP,
                    },
                    {
                        'idss': this.banksoalservice.repo.ss_kurikulum_must_call,
                        'tab':'taksonomibloom',
                    },
                    {
                        'idss': this.banksoalservice.repo.ss_kurikulum_must_call,
                        'tab':'kkmkktp',
                    },
                    {
                        'idss': this.banksoalservice.repo.ss_kurikulum_must_call,
                        'tab':'lingkupmateri',
                    },
                ];
        if(this.shortKurikulum == 'kurmer'){
            let arTambahan = [
                {
                    'idss': this.banksoalservice.repo.ss_kurikulum_must_call,
                    'tab':'faseTPATP',
                },
                {
                    'idss': this.banksoalservice.repo.ss_kurikulum_must_call,
                    'tab':'elemencp',
                }
            ];
            ar.push(...arTambahan);
        }
        ar = ar.filter(n=>!this.banksoalservice.isExist(n.tab));
        this.ar = ar;
        return this;
    }
    async callMultipe(){
        if(this.ar.length>0){
            await this.banksoalservice.callPropertiMultiple(this.ar);
        }

        return this;
    }
    async init(){
        await this.settingKurikulum().callMultipe();
        this.ormKurikulum = new OrmKurikulumSoal(this.banksoalservice,this.#jenjangActive,this.currentMapelOnClassRoom).settingKurikulum(this.shortKurikulum).init().collection;
        
        return this;
    }
    
    fitur_item_soal(){
        
        let teksInfo =`<h3 class="text-center text-uppercase">BUAT ITEM SOAL ${this.shortKurikulum}</h3>`;
            teksInfo += `<div class="text-center font12">Saat ini Anda berada di jenjang kelas ${this.jenjang} yang menerapkan <span class="bg-warning">${this.longKurikulum}</span>.</div>`;
        let needData = {
            'shortKurikulum':this.shortKurikulum,
            'longKurikulum':this.longKurikulum,
            'jenjang':this.jenjang,
            'koleksimapel':this.currentMapelOnClassRoom,
            'isGuruMapel':this.user.typeUser == 'Guru Mapel',
            'mapelAjar':this.user.tugasUser,
            'koleksibentuksoal':this.koleksiBentukSoal,
            '_htmlkoleksimapel':this.labelingSelectMapel,
            'kurikulum':this.ormKurikulum
        }
        console.log(needData);
        this.maincontrol.innerHTML = controlFiturBuatPerItemSoal(needData);//controlbanksoal.wrapermenu(teksInfo);
        this.workplace.innerHTML = "";//controlbanksoal.templateCreatePerItemBankSoal();
        this.listener_fitur_item_soal(needData);
        
    }
    cek_fitur_pradesain(){
        let elemencek = document.querySelectorAll('[data-pradesain]');
        let datadesain = {'namakurikulum':this.shortKurikulum,'ormkurikulum':this.ormKurikulum.data,jenjang:this.jenjang,oleh:this.user.namaUser,idguru:this.user.idUser};
        elemencek.forEach(el=>{
            if(el.type == 'radio' && el.checked){
                datadesain[el.getAttribute('data-pradesain')]=el.value;

                if(el.getAttribute('data-pradesain') == 'bentuksoal'){
                    datadesain.editor=el.getAttribute('data-editorinput')
                }

                
            }else if(el.type=='select-one'){
                datadesain[el.getAttribute('data-pradesain')]=el.value;
                
                console.log(this.currentMapelOnClassRoom)
                datadesain['tekskodemapel']=this.currentMapelOnClassRoom[el.value];
            }
        });
        return datadesain;
    }
    listener_fitur_item_soal(){
        let elemencek = document.querySelectorAll('[data-pradesain]');
        
        elemencek.forEach(el=>{
            el.onchange = (e)=>{
                let pradesain = this.cek_fitur_pradesain();
                
                if(pradesain.mode =='bycopast' && pradesain.editor == 'editor'){
                    console.log('mode pradesain', pradesain.mode)
                    this.workplace.innerHTML = controlbanksoal.templateCreatePerItemBankSoal();
                    this.createTextEditor(pradesain);
                }else{
                    this.workplace.innerHTML = controlbanksoal.templateCreatePerItemBankSoal();
                }
            }
        });
        elemencek[0].dispatchEvent(new Event('change'));

    }
    createTextEditorBankSoal(parentSelector='#divTextEditor',idiframe='iframeTextEditor',contectMenu = 'PG'){
        let testWrap = new CustomTextEditor(
            {
                'parentSelector':parentSelector,
                'id':idiframe,
                'useFor':'banksoal',
                'crudSendImage':this.crudSendImage,
                'imageResize' : this.imageResize,
                'folderImage':'GAMBAR MATERI SOAL',
                // selectorControlItemContext:'controlContext',
                // elementOutputTypeValue:document.getElementById('ren2')
            });
        testWrap.initWraper(true);
    }
    createTextEditor(){
        const TE = new TextEditorEdurasa(this.cek_fitur_pradesain(),'#divTextEditor').addService(this.banksoalservice).addRespons(this.respontekseditor).init();
        console.log(TE.service.data.taksonomibloom);
    }
    respontekseditor(test){
        
        let teksInptu = document.getElementById('sorotUpdate_tampilansoal');
        console.log(test);
        teksInptu.innerHTML = previewSoalWithProperty(test);//test.pertanyaan?test.pertanyaan:'belum ada data';
        let simpan = document.getElementById('simpanItemSoal');
        let reset = document.getElementById('resetItemSoal');
        simpan.onclick = async()=>{
            console.log(test);

            console.log(this.service.simpanItemSoal);
            let bol = true ;
            if(test.bentuksoal === 'Pilihan Ganda'){
                let cek = Object.keys(test).filter(k=>['indikatorsoal','pertanyaan','opsiA','opsiB','opsiC','materi','levelkognitif','ruanglingkup','kuncijawaban','penskoran'].includes(k))
                if(cek.length !==10){
                    bol = false;
                }
            }else{
                let cek = Object.keys(test).filter(k=>['indikatorsoal','pertanyaan','materi','levelkognitif','ruanglingkup','penskoran'].includes(k))
                if(cek.length !==9){
                    bol = false;
                }
            }
            if(!bol) {
                alert('Ada yang belum dipilih');
                return;
            }
            await this.service.simpanItemSoal(test);
            console.log(this.service.data);
        }
        reset.onclick = ()=>{
            Object.entries(test).forEach(([k,v])=> {
                if(!['bentuksoal','bentuksoalspesifik','jenjang','kd','tekskd','kodemapel','oleh'].includes(k) ){
                    delete test[k];
                }
                
            });
            console.log(test);
        }
    }
    



}