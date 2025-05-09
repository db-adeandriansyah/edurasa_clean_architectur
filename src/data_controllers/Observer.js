import mapelkdcp_kurikulum from "../models/mapel";

export default class Observer{
    #_rombel;
    #_jenjang;
    #mapelAplikasi;
    constructor(service,faseKey,JenisKurikulum){
        this.service = service;
        this.faseKey = faseKey;
        this.JenisKurikulum = JenisKurikulum;
        
        this.#_jenjang=1;
        this.#_rombel ='1A';
        this.#mapelAplikasi=mapelkdcp_kurikulum;
        
    }
    settingRombel(rombel){
        this.jenjang = rombel;
        this.rombel = rombel;
    }
    get shortKurikulum(){
        return this.JenisKurikulum[this.jenjang.toString()];
    }
    get longKurikulum(){
        return this.shortKurikulum=='kurmer'?'Kurikulum Merdeka':'Kurikulum 2013';
    }
    get namaFase(){
        return this.faseKey[this.jenjang.toString()];
    }
    set rombel(x){
        this.#_rombel = x;
    }
    get rombel(){
        return this.#_rombel;
    }
    set jenjang(x){
        this.#_jenjang = parseInt(x)
    }
    get jenjang(){
        return this.#_jenjang;
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
                bentuksoalspesifik:'PG Kompleks',
                bentuksoal:'PG Kompleks',
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
            },{
                id:'fc_menulisrapih',
                bentuksoalspesifik:'Menulis Rapih',
                bentuksoal:'Menulis Rapih',
                editorinput:'none',
                teks:'Menulis Rapih',
                value:'Menulis Rapih',
                otomatis:false,
                carakoreksi:'Manual'
            },
            
        ]
    }
    cekServerExist(namaTab){
        return this.service.data.hasOwnProperty(namaTab)
    }
    createParamTab(idss,tabServer,tabDb){
        return {
            'idss'  : idss,
            'tab'   : tabServer,
            'tabdb' : tabDb
        }
    }
    makroRepo(){
        return this.service.repo.appscript;
    }
    valueRepo(key){
        return this.service.repo.trial?this.service.repo.ssTrial:this.service.repo.appscript[key];
    }
    ss_nilai(){
        return this.service.repo.trial?this.service.repo.ssTrial:this.valueRepo('ss_nilai_'+this.jenjang)
    }
    ss_absen(){
        return this.service.repo.trial?this.service.repo.ssTrial:this.valueRepo('ss_absen_'+this.jenjang)
    }
    cekTrial(){
        return this.service.repo.trial;
    }
    get api_banksoal(){
        return this.createParamTab(this.valueRepo('ss_kalender'),'banksoal','banksoal')

    }
    get api_desainnaskah(){
        return this.createParamTab(this.valueRepo('ss_kalender'),'simpandesainsoal','simpandesainsoal');

    }
    get api_taksonomibloom(){
        return this.createParamTab(this.valueRepo('ss_materi'),'taksonomibloom','taksonomibloom')
    }
    get api_kkmkktp(){
        return this.createParamTab(this.valueRepo('ss_materi'),'kkmkktp','kkmkktp')
    }
    get api_lingkupmateri(){
        return this.createParamTab(this.valueRepo('ss_materi'),'lingkupmateri','lingkupmateri')
    }
    get api_faseTPATP(){
        return this.createParamTab(this.valueRepo('ss_materi'),'faseTPATP','faseTPATP')
    }
    get api_elemencp(){
        return this.createParamTab(this.valueRepo('ss_materi'),'elemencp','elemencp')
    }
    get api_kdOrTp(){
        if(this.shortKurikulum == 'kurmer'){
            return this.createParamTab(this.valueRepo('ss_materi'),this.namaFase,this.namaFase)
        }else{
            return this.createParamTab(this.valueRepo('ss_materi'),'kelas'+this.jenjang,'kelas'+this.jenjang);
        }
    }

}