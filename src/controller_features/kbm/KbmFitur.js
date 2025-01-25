import { CollectionsEdu } from "../../models/CollectionsEdu";
import mapelkdcp_kurikulum from "../../models/mapel";
import { JenisKurikulum, faseKey } from "../../routes/settingApp";
import { FormatTanggal } from "../../utilities/FormatTanggal";
import BanksoalFitur from "../banksoal/BanksoalFitur";
import OrmKurikulumSoal from "../banksoal/OrmKurikulumSoal";

export default class KbmFitur extends BanksoalFitur{
    #mapelAplikasi;
    constructor(service,printarea,maincontrol,user,tooltip,siswa){
        super(service,printarea,maincontrol,user,tooltip)
        this.service = service;
        this.printarea = printarea;
        this.maincontrol = maincontrol;
        this.user = user;
        this.siswa = siswa;
        this.neededApi = [];
        this.#mapelAplikasi=mapelkdcp_kurikulum;
        this.jenjang = 1;
        this.rombel = '1A';
        this.ormKurikulum =[];
        this.ormKBM =[];
        this.ormDesainNaskah = [];
        this.ormTagihanBySiswa = null;
        this.refrensi_predikatraport = [];
    }
    settingRombel(rombel){
        this.jenjang = parseInt(rombel);
        this.rombel =rombel;
        this.service.jenjang = parseInt(rombel);
        return this;
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
        return this.jenjang>2?'tinggi':'rendah';;
    }
    get currentMapelOnClassRoomWithTema(){
        let tinggiRendah = this.jenjang>2?'tinggi':'rendah';;
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
        let tinggiRendah = this.jenjang>2?'tinggi':'rendah';;
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

    get arrayKurikulum (){
        let ar = [
                    {
                        'idss': this.service.repo.ss_kurikulum_must_call,
                        'tab':this.callKDorTP,
                        'tabdb':this.callKDorTP
                    },
                    {
                        'idss': this.service.repo.ss_kurikulum_must_call,
                        'tab':'taksonomibloom',
                        'tabdb':'taksonomibloom',
                    },
                    {
                        'idss': this.service.repo.ss_kurikulum_must_call,
                        'tab':'kkmkktp',
                        'tabdb':'kkmkktp',
                    },
                    {
                        'idss': this.service.repo.ss_kurikulum_must_call,
                        'tab':'lingkupmateri',
                        'tabdb':'lingkupmateri',
                    },
                ];
        if(this.shortKurikulum == 'kurmer'){
            let arTambahan = [
                {
                    'idss': this.service.repo.ss_kurikulum_must_call,
                    'tab':'faseTPATP',
                    'tabdb':'faseTPATP',
                },
                {
                    'idss': this.service.repo.ss_kurikulum_must_call,
                    'tab':'elemencp',
                    'tabdb':'elemencp',
                }
            ];
            ar.push(...arTambahan);
        }   ;
        return ar;
    }
    get arrayBankSoal(){
        let ar = [
            {
                'idss': this.service.repo.ss_banksoal_must_call,
                'tab':'banksoal',
                'tabdb':'banksoal',
            },
            {
                'idss': this.service.repo.ss_banksoal_must_call,
                'tab':'simpandesainsoal',
                'tabdb':'simpandesainsoal',
            }]
        return ar;
    }
    get arrayDataMateri(){
        
        let ar = [ 
            {
                'idss':  this.service.repo.ss_kurikulum_must_call,
                'tab':'datamateri',
                'tabdb':'datamateri',
            },
            {
                'idss':  this.service.repo.ss_kurikulum_must_call,
                'tab':'predikat_'+this.jenjang,
                'tabdb':'predikat_'+this.jenjang,
            },
        ];
    return ar;
    }
    get arrayTagihan(){
        let ar = ['PH','PTS','PAS','kpraktik','kproyek','kproduk'];
        if(this.user.semester == 2){
            if(this.jenjang == 6){
                ar = ['PH','PTS','PAK','kpraktik','kproyek','kproduk','ustertulis','uspraktek'];
            }else{
                ar = ['PH','PTS','PAK','PAS','kpraktik','kproyek','kproduk']
            }

        }
        return ar;
    }
    get arrayTabTagihan(){
        return ['respon',...this.arrayTagihan];
    }
    get arrayTagihanPerJenjang(){
        let tagihan =this.arrayTabTagihan;
        let ar = [];

        tagihan.forEach(n=>{
            let ob ={};
            ob.idss = this.service.spreadsheet_nilai;
            ob.tab = n;
            ob.tabdb = n+'_'+this.jenjang;//
            ar.push(ob);
        })
        return ar;
    }
    get arraySsRapor(){
        let ttm = {
            'idss': this.service.repo.ss_kurikulum_must_call ,//this.service.spreadsheet_nilai,
            'tab':'titimangsa_rapor',
            'tabdb':'titimangsa_rapor'
        };
        let absensiasli = {
            'idss':  this.service.repo.ss_Absensi(this.jenjang),
            'tab':'responses',
            'tabdb':'responses_'+this.jenjang
        };
        if(this.jenjang == 6){

            ttm = {
                'idss':  this.service.repo.ss_kurikulum_must_call ,//this.service.spreadsheet_nilai,
                'tab':'titimangsa_rapor',   
                'tabdb':'titimangsa_rapor'
            }
        }
        return [
            ttm,
            {
                idss:this.service.spreadsheet_nilai,
                tab: 'nilai_raport_'+this.rombel,
                tabdb: 'nilai_raport_'+this.rombel
            },            {
                idss:this.service.repo.ss_kurikulum_must_call,
                tab: 'k1kelas'+this.jenjang,
                tabdb: 'k1kelas'+this.jenjang,
            },{
                idss:this.service.spreadsheet_nilai,
                tab: 'nilai_sikap_raport_'+this.rombel,
                tabdb: 'nilai_sikap_raport_'+this.rombel,
            },{
                idss:this.service.repo.ss_kurikulum_must_call,
                tab: 'k2kelas'+this.jenjang,
                tabdb: 'k2kelas'+this.jenjang,
            },
            {
                idss:this.service.spreadsheet_nilai,
                //'tab':'rekap_absen_'+this.fokusRombel+'_semester_'+this.setApp.semester
                tab: 'rekap_absen_'+this.rombel+'_semester_'+this.user.semester,
                tabdb: 'rekap_absen_'+this.rombel+'_semester_'+this.user.semester,
            },
            {
                idss:this.service.spreadsheet_nilai,
                tab: 'rekap_absen_'+this.rombel+'_semester_'+this.jenjang,
                tabdb:'rekap_absen_'+this.rombel+'_semester_'+this.jenjang,
            },
            absensiasli,
            {
                idss:this.service.spreadsheet_nilai,
                // //
                // 'tab':'perkembangan_raport_'+this.fokusRombel
                tab: 'perkembangan_raport_'+this.rombel,
                tabdb: 'perkembangan_raport_'+this.rombel
            },
            
    ]
    }
    get siswaRombel(){
        return this.siswa.filter(s=> s.nama_rombel== this.rombel)
    }
    get isAdmin(){
        return this.user.typeUser == 'admin';
    }
    get isGuruMapel(){
        return this.user.typeUser == 'Guru Mapel'
    }
    get mapelAjar(){
        return this.user.tugasUser;
    }
    async callApiNeeded(){
        let kurikulumapi   = this.arrayKurikulum;
        let datamateri  = this.arrayDataMateri;
        let tagihanapi  = this.arrayTagihanPerJenjang;
        let banksoal    = this.arrayBankSoal;
        let api = [...kurikulumapi, ...datamateri,...tagihanapi,...banksoal];
        let loadedApi = api.filter(s=>!this.service.isExist(s.tabdb));
        if(loadedApi.length>0){
            await this.service.callPropertiMultipleWithPrefik(loadedApi);
        }
    }
    async init_kbmonline(){
        //data yang dibutuhkan
        let kurikulumapi   = this.arrayKurikulum;
        let datamateri  = this.arrayDataMateri;
        let tagihanapi  = this.arrayTagihanPerJenjang;
        let banksoal    = this.arrayBankSoal;
        let api = [...kurikulumapi, ...datamateri,...tagihanapi,...banksoal];
        let loadedApi = api.filter(s=>!this.service.isExist(s.tabdb));
        if(loadedApi.length>0){
            await this.service.callPropertiMultipleWithPrefik(loadedApi);
        }
        

            // let totallkey_nosoal = Object.keys(this.service.data.simpandesainsoal[0]).length - 20;
            
            this.ormKurikulum = new OrmKurikulumSoal(this.service,this.jenjang,this.currentMapelOnClassRoom).settingKurikulum(this.shortKurikulum).init().collection;
            
            let apibanksoal = this.service.data.banksoal;
            let apiblanko = this.service.data.blangko_banksoal;
            let apidatamateri = this.service.data.datamateri;
            let kurikulum = this.ormKurikulum.data;
            let isKurmer = (this.service.shortKurikulum=='kurmer');
            let isAdmin = this.isAdmin;
            let owner = this.user.idUser; 
            
            this.ormDesainNaskah = new CollectionsEdu(this.service.data.simpandesainsoal)
                            // .addProperty('datamateri',(item)=>{
                            //     return apidatamateri.filter(s=>s.id_desainnaskah == item.idbaris);
                            // })
                            .addProperty('propertikurikulum',(item)=>{
                                let ar = []
                                for(let i = 0 ; i < 50; i++){
                                    let key = 'no_'+(i+1);
                                    let val = item[key];
                                    if(val!==''){
                                        let soal = apibanksoal.filter(s=>s.idbaris == val);
                                        // ar.push({[key]:soal})
                                        if(soal[0]){
                                            if(isKurmer){
                                                let kurikulumitemsoal = kurikulum.filter(s=> s.idbaris == soal[0].kd);

                                                if(kurikulumitemsoal.length>0){
                                                    ar.push(kurikulumitemsoal[0]);
                                                }

                                            }else{
                                                let kurikulumitemsoal = kurikulum.filter(s=> s.kd3 == soal[0].kd && s.mapel == soal[0].kodemapel);
                                                
                                                if(kurikulumitemsoal.length>0){
                                                    ar.push(kurikulumitemsoal[0]);
                                                }

                                            }
                                        };
                                    }
                                }
                                // return ar;
                                let finalResult = [];
                                if(isKurmer){
                                    finalResult = new CollectionsEdu(ar).uniqueByProperty('idbaris').data;
                                }else{
                                    finalResult = new CollectionsEdu(ar).uniqueByProperty('baris').data;
                                }
                                return finalResult;
                            })
                            .addProperty('tanggalnaskah',(item)=>{
                                return new FormatTanggal(item.waktu2).formatFull();
                            })
                            .addProperty('owner',(item)=>{
                                return !isAdmin?item.idguru==owner:true;
                            })
                            .addProperty('banksoal',(item)=>{
                                let ar = [];
                                for(let i = 0 ; i < 50; i++){
                                    let key = 'no_'+(i+1);
                                    let val = item[key];
                                    if(val!==''){
                                        let obj = {};
                                        let soal = apibanksoal.filter(s=>s.idbaris == val);
                                        if(soal.length>0){
                                            obj.datasoal=soal[0];
                                            obj.bentuksoalspesifik = soal[0].bentuksoalspesifik;
                                            obj.nosoal = (i+1);
                                            ar.push(obj)
                                        }
                                    }
                                }
                                return ar
                            })
                            .addProperty('namakurikulum',(item)=>{
                                return item.kurikulum
                            })
                            .addProperty('kerangka',(item)=>{
                                let itembanksoal = item.banksoal;
                                let uniq = new CollectionsEdu(itembanksoal).uniqueByProperty('bentuksoalspesifik').selectProperties(['bentuksoalspesifik']).data;
                                let result = [];
                                uniq.forEach(n=>{
                                    let ob = {};
                                    let filtersoal = itembanksoal.filter(s=>s.bentuksoalspesifik == n.bentuksoalspesifik);
                                    ob.bentuksoal = n.bentuksoalspesifik;
                                    ob.jumlah = filtersoal.length;
                                    ob.datasoal = filtersoal;//.map(n=>Object.fromEntries(Object.entries(n).map()));
                                    result.push(ob);
                                })
                                return result;
                            })
                            .sortByProperty('waktu2','desc');
                for(let i = 0 ; i < 50 ; i++){
                    let keybanksoal = 'banksoal_'+(i+1);
                    this.ormDesainNaskah.addProperty(keybanksoal,(item)=>{
                        if(item['no_'+(i+1)]!==""){
                            let filter_api =  apibanksoal.filter(s=>s.idbaris == item['no_'+(i+1)])
                            if(filter_api.length>0){
                                return filter_api[0];
                            }else{
                                return apiblanko;
                            }
                        }
                        return "";
                    })
                }
                    
            
        
        
        const api_datamateri = this.service.data.datamateri.slice();
        const api_tabrespon = this.service.data['respon_'+this.jenjang];
        const jenjang = this.jenjang;
        const rombel = this.rombel;
        const kurikulumAkitif = this.shortKurikulum;
        const siswaRombel = this.siswaRombel;
        const intIdSiswaRombel = siswaRombel.map(n=> parseInt(n.id));
        const orm_desainnaskah = this.ormDesainNaskah;
        
        this.ormKBM = new CollectionsEdu(api_datamateri)
            .simpleFilter({'idtoken':jenjang})
            .customFilter((item)=>item.arraykelas.indexOf(rombel)>-1)
            .customFilter((item)=>this.isGuruMapel?item.kuncikd.indexOf(this.mapelAjar)>-1:true)
            .addProperty('objek_kuncikd',(item)=>JSON.parse(item.kuncikd))
            .addProperty('namakurikulum',()=>kurikulumAkitif)
            .addProperty('isFromDesain',(item)=>item.id_desainnaskah !=="")
            .addProperty('api_respon',(item)=>{
                let ar = [];
                if(item.isFromDesain){
                    let respon_jenjang = this.service.data['respon_'+this.jenjang];
                    // ar = respon_jenjang.filter(s=> s.matericode == item.idbaris && s.crtToken.toString().indexOf('dihapus')==-1 && intIdSiswaRombel.includes(parseInt(s.tokensiswa)));
                    ar = respon_jenjang.filter(s=> s.matericode == item.idbaris && s.crtToken == item.crtToken && intIdSiswaRombel.includes(parseInt(s.tokensiswa)));
                }
                return ar;
            })
            .addProperty('hasResponDuplicate',(item)=>(item.api_respon.length!==0 && item.api_respon.length > intIdSiswaRombel.length))
            .addProperty('cast_jenistagihan',(item)=>{
                let string = item.jenistagihan;
                if(item.jenistagihan =='PH') string = 'Penilaian Harian';
                if(item.jenistagihan == 'PTS' && kurikulumAkitif =='kurmer') string = 'STS';
                if(item.jenistagihan == 'PAS' && kurikulumAkitif == 'kurmer') string ='SAS';
                if(item.jenistagihan == 'PAK' && kurikulumAkitif == 'kurmer') string ='SAS';
                return string;
            })
            .addProperty('pelaksanaan',(item)=>new Date(item.idtgl).toLocaleString('id-ID',{dateStyle:'full',timeStyle:'long'}))
            .addProperty('pelaksanaanakhir',(item)=>new Date(item.idtglend).toLocaleString('id-ID',{dateStyle:'full',timeStyle:'long'}))
            .addProperty('soal_otomatis',(item)=>{
                let count = 0;
                
                if(item['Pilihan Ganda']!==""){
                    count+=item['Pilihan Ganda'];
                };
                
                if(item.hasOwnProperty('PG Kompleks')){
                    if(item['PG Kompleks']!==""){
                        count+=item['PG Kompleks'];
                    };
                }

                if(item.hasOwnProperty('BenarSalah')){
                    if(item['BenarSalah']!==""){
                        count+=item['BenarSalah'];
                    };
                    
                }
                return count;
            }).addProperty('soal_manual',(item)=>{
                let count = 0;
                
                if(item['Isian']!==""){
                    count+=item['Isian'];
                };
                if(item['Essay']!==""){
                    count+=item['Essay'];
                };
                if(item['Menjodohkan']!==""){
                    count+=item['Menjodohkan'];
                };
                
                if(item.hasOwnProperty('Menulis Rapih')){
                    if(item['Menulis Rapih']!==""){
                        count+=item['Menulis Rapih'];
                    };
                }
                return count;
            })
            .addProperty('obj_desainnaskah',(item)=>{
                let ar =[];
                if(item.isFromDesain){
                    ar = orm_desainnaskah.simpleFilter({'idbaris':item.id_desainnaskah}).data;

                };
                return ar;
            })
            .addProperty('objek_mapelkd',(item)=>Object.keys(item.objek_kuncikd).map(n=>{
                
                return Object.assign({},{
                    'mapel'             : n.split('_')[0],
                    'mapelteks'         : this.currentMapelOnClassRoom[n.split('_')[0]],
                    'kd'                : n.split('_')[1],
                    'atp'               : n.split('_')[1],
                    'tp'                : (kurikulumAkitif=='kurmer')?this.ormKurikulum.data.filter(s=> s.idbaris==n.split('_')[1])[0].foreignkey_tp:this.ormKurikulum.data.filter(s=> s.mapel == n.split('_')[0] && (s.kd3 == n.split('_')[1]||s.kd4 == n.split('_')[1])),
                    'elemen'            : (kurikulumAkitif=='kurmer')?this.ormKurikulum.data.filter(s=> s.idbaris==n.split('_')[1])[0].foreignkey_elemencp:this.ormKurikulum.data.filter(s=> s.mapel == n.split('_')[0] && (s.kd3 == n.split('_')[1]||s.kd4 == n.split('_')[1])),
                    'kurikulum'         : kurikulumAkitif,
                    'idkbm'             : item.idbaris,
                    'crtToken'          : item.crtToken,
                    'jenistagihan'      : item.jenistagihan,
                    'no_soal'           : item.objek_kuncikd[n],
                    'no_soal_banksoal'  : item.objek_kuncikd[n].length>0?item.objek_kuncikd[n].map(bs=>Object.assign({},{'nosoal':bs,'datasoal':item.obj_desainnaskah[0]['banksoal_'+bs]})):[],
                    'key_tagihan'       : item.idbaris+'_'+item.jenistagihan+'_'+item.crtToken+'_'+n,
                    'mapel_kd'          : n,
                    'objek_kd'          : (kurikulumAkitif=='kurmer')?this.ormKurikulum.data.filter(s=> s.idbaris==n.split('_')[1]):this.ormKurikulum.data.filter(s=> s.mapel == n.split('_')[0] && (s.kd3 == n.split('_')[1]||s.kd4 == n.split('_')[1])),
                })
            })
        )
            .addProperty('mapel_desain',(item)=>item.obj_desainnaskah[0].mapel)
            .addProperty('kodeteks_mapel',(item)=>{
                let teksmapel = "";
                if(item.mapel_desain.indexOf('Tema ')>-1 || item.mapel_desain.indexOf('TEMA ')>-1){
                    teksmapel = item.mapel_desain+'<br>'+item.objek_mapelkd.map(mp=>mp.mapelteks).filter((x,i,a)=>a.indexOf(x)==i).join(',<br/>');
                    
                }else{
                    teksmapel = this.currentMapelOnClassRoom[item.mapel_desain];
                }
                return teksmapel;
            })
            .sortByProperty('idtgl','desc');
            

    }
    async init_raport(){
        //data yang dibutuhkan
        let kurikulumapi   = this.arrayKurikulum;
        let datamateri  = this.arrayDataMateri;
        let tagihanapi  = this.arrayTagihanPerJenjang;
        let banksoal    = this.arrayBankSoal;
        let spreadsheetTabRapor = this.arraySsRapor;
        let api = [...kurikulumapi, ...datamateri,...tagihanapi,...banksoal,...spreadsheetTabRapor];
        let loadedApi = api.filter(s=>!this.service.isExist(s.tabdb));
        if(loadedApi.length>0){
            await this.service.callPropertiMultipleWithPrefik(loadedApi);
        }
        

            // let totallkey_nosoal = Object.keys(this.service.data.simpandesainsoal[0]).length - 20;
            
            this.ormKurikulum = new OrmKurikulumSoal(this.service,this.jenjang,this.currentMapelOnClassRoom).settingKurikulum(this.shortKurikulum).init().collection;
            
            let apibanksoal = this.service.data.banksoal;
            let apiblanko = this.service.data.blangko_banksoal;
            let apidatamateri = this.service.data.datamateri;
            let kurikulum = this.ormKurikulum.data;
            let isKurmer = (this.service.shortKurikulum=='kurmer');
            let isAdmin = this.isAdmin;
            let owner = this.user.idUser; 
            
            this.ormDesainNaskah = new CollectionsEdu(this.service.data.simpandesainsoal)
                            // .addProperty('datamateri',(item)=>{
                            //     return apidatamateri.filter(s=>s.id_desainnaskah == item.idbaris);
                            // })
                            .addProperty('propertikurikulum',(item)=>{
                                let ar = []
                                for(let i = 0 ; i < 50; i++){
                                    let key = 'no_'+(i+1);
                                    let val = item[key];
                                    if(val!==''){
                                        let soal = apibanksoal.filter(s=>s.idbaris == val);
                                        // ar.push({[key]:soal})
                                        if(soal[0]){
                                            if(isKurmer){
                                                let kurikulumitemsoal = kurikulum.filter(s=> s.idbaris == soal[0].kd);

                                                if(kurikulumitemsoal.length>0){
                                                    ar.push(kurikulumitemsoal[0]);
                                                }

                                            }else{
                                                let kurikulumitemsoal = kurikulum.filter(s=> s.kd3 == soal[0].kd && s.mapel == soal[0].kodemapel);
                                                
                                                if(kurikulumitemsoal.length>0){
                                                    ar.push(kurikulumitemsoal[0]);
                                                }

                                            }
                                        };
                                    }
                                }
                                // return ar;
                                let finalResult = [];
                                if(isKurmer){
                                    finalResult = new CollectionsEdu(ar).uniqueByProperty('idbaris').data;
                                }else{
                                    finalResult = new CollectionsEdu(ar).uniqueByProperty('baris').data;
                                }
                                return finalResult;
                            })
                            .addProperty('tanggalnaskah',(item)=>{
                                return new FormatTanggal(item.waktu2).formatFull();
                            })
                            .addProperty('owner',(item)=>{
                                return !isAdmin?item.idguru==owner:true;
                            })
                            .addProperty('banksoal',(item)=>{
                                let ar = [];
                                for(let i = 0 ; i < 50; i++){
                                    let key = 'no_'+(i+1);
                                    let val = item[key];
                                    if(val!==''){
                                        let obj = {};
                                        let soal = apibanksoal.filter(s=>s.idbaris == val);
                                        if(soal.length>0){
                                            obj.datasoal=soal[0];
                                            obj.bentuksoalspesifik = soal[0].bentuksoalspesifik;
                                            obj.nosoal = (i+1);
                                            ar.push(obj)
                                        }
                                    }
                                }
                                return ar
                            })
                            .addProperty('namakurikulum',(item)=>{
                                return item.kurikulum
                            })
                            .addProperty('kerangka',(item)=>{
                                let itembanksoal = item.banksoal;
                                let uniq = new CollectionsEdu(itembanksoal).uniqueByProperty('bentuksoalspesifik').selectProperties(['bentuksoalspesifik']).data;
                                let result = [];
                                uniq.forEach(n=>{
                                    let ob = {};
                                    let filtersoal = itembanksoal.filter(s=>s.bentuksoalspesifik == n.bentuksoalspesifik);
                                    ob.bentuksoal = n.bentuksoalspesifik;
                                    ob.jumlah = filtersoal.length;
                                    ob.datasoal = filtersoal;//.map(n=>Object.fromEntries(Object.entries(n).map()));
                                    result.push(ob);
                                })
                                return result;
                            })
                            .sortByProperty('waktu2','desc');
                for(let i = 0 ; i < 50 ; i++){
                    let keybanksoal = 'banksoal_'+(i+1);
                    this.ormDesainNaskah.addProperty(keybanksoal,(item)=>{
                        if(item['no_'+(i+1)]!==""){
                            let filter_api =  apibanksoal.filter(s=>s.idbaris == item['no_'+(i+1)])
                            if(filter_api.length>0){
                                return filter_api[0];
                            }else{
                                return apiblanko;
                            }
                        }
                        return "";
                    })
                }
                    
            
        
        
        const api_datamateri = this.service.data.datamateri.slice();
        const api_tabrespon = this.service.data['respon_'+this.jenjang];
        const jenjang = this.jenjang;
        const rombel = this.rombel;
        const kurikulumAkitif = this.shortKurikulum;
        const siswaRombel = this.siswaRombel;
        const intIdSiswaRombel = siswaRombel.map(n=> parseInt(n.id));
        const orm_desainnaskah = this.ormDesainNaskah;
        
        this.ormKBM = new CollectionsEdu(api_datamateri)
            .simpleFilter({'idtoken':jenjang})
            .customFilter((item)=>item.arraykelas.indexOf(rombel)>-1)
            .customFilter((item)=>this.isGuruMapel?item.kuncikd.indexOf(this.mapelAjar)>-1:true)
            .addProperty('objek_kuncikd',(item)=>JSON.parse(item.kuncikd))
            .addProperty('namakurikulum',()=>kurikulumAkitif)
            .addProperty('isFromDesain',(item)=>item.id_desainnaskah !=="")
            .addProperty('api_respon',(item)=>{
                let ar = [];
                if(item.isFromDesain){
                    let respon_jenjang = this.service.data['respon_'+this.jenjang];
                    // ar = respon_jenjang.filter(s=> s.matericode == item.idbaris && s.crtToken.toString().indexOf('dihapus')==-1 && intIdSiswaRombel.includes(parseInt(s.tokensiswa)));
                    ar = respon_jenjang.filter(s=> s.matericode == item.idbaris && s.crtToken == item.crtToken && intIdSiswaRombel.includes(parseInt(s.tokensiswa)));
                }
                return ar;
            })
            .addProperty('hasResponDuplicate',(item)=>(item.api_respon.length!==0 && item.api_respon.length > intIdSiswaRombel.length))
            .addProperty('cast_jenistagihan',(item)=>{
                let string = item.jenistagihan;
                if(item.jenistagihan =='PH') string = 'Penilaian Harian';
                if(item.jenistagihan == 'PTS' && kurikulumAkitif =='kurmer') string = 'STS';
                if(item.jenistagihan == 'PAS' && kurikulumAkitif == 'kurmer') string ='SAS';
                if(item.jenistagihan == 'PAK' && kurikulumAkitif == 'kurmer') string ='SAS';
                return string;
            })
            .addProperty('pelaksanaan',(item)=>new Date(item.idtgl).toLocaleString('id-ID',{dateStyle:'full',timeStyle:'long'}))
            .addProperty('pelaksanaanakhir',(item)=>new Date(item.idtglend).toLocaleString('id-ID',{dateStyle:'full',timeStyle:'long'}))
            .addProperty('soal_otomatis',(item)=>{
                let count = 0;
                
                if(item['Pilihan Ganda']!==""){
                    count+=item['Pilihan Ganda'];
                };
                
                if(item.hasOwnProperty('PG Kompleks')){
                    if(item['PG Kompleks']!==""){
                        count+=item['PG Kompleks'];
                    };
                }

                if(item.hasOwnProperty('BenarSalah')){
                    if(item['BenarSalah']!==""){
                        count+=item['BenarSalah'];
                    };
                    
                }
                return count;
            }).addProperty('soal_manual',(item)=>{
                let count = 0;
                
                if(item['Isian']!==""){
                    count+=item['Isian'];
                };
                if(item['Essay']!==""){
                    count+=item['Essay'];
                };
                if(item['Menjodohkan']!==""){
                    count+=item['Menjodohkan'];
                };
                
                if(item.hasOwnProperty('Menulis Rapih')){
                    if(item['Menulis Rapih']!==""){
                        count+=item['Menulis Rapih'];
                    };
                }
                return count;
            })
            .addProperty('obj_desainnaskah',(item)=>{
                let ar =[];
                if(item.isFromDesain){
                    ar = orm_desainnaskah.simpleFilter({'idbaris':item.id_desainnaskah}).data;

                };
                return ar;
            })
            .addProperty('objek_mapelkd',(item)=>Object.keys(item.objek_kuncikd).map(n=>Object.assign({},{
                'mapel'             : n.split('_')[0],
                'mapelteks'         : this.currentMapelOnClassRoom[n.split('_')[0]],
                'kd'                : n.split('_')[1],
                'atp'               : n.split('_')[1],
                'tp'                : (kurikulumAkitif=='kurmer')?this.ormKurikulum.data.filter(s=> s.idbaris==n.split('_')[1])[0].foreignkey_tp:this.ormKurikulum.data.filter(s=> s.mapel == n.split('_')[0] && (s.kd3 == n.split('_')[1]||s.kd4 == n.split('_')[1])),
                'elemen'            : (kurikulumAkitif=='kurmer')?this.ormKurikulum.data.filter(s=> s.idbaris==n.split('_')[1])[0].foreignkey_elemencp:this.ormKurikulum.data.filter(s=> s.mapel == n.split('_')[0] && (s.kd3 == n.split('_')[1]||s.kd4 == n.split('_')[1])),
                'kurikulum'         : kurikulumAkitif,
                'idkbm'             : item.idbaris,
                'crtToken'          : item.crtToken,
                'jenistagihan'      : item.jenistagihan,
                'no_soal'           : item.objek_kuncikd[n],
                'no_soal_banksoal'  : item.objek_kuncikd[n].length>0?item.objek_kuncikd[n].map(bs=>Object.assign({},{'nosoal':bs,'datasoal':item.obj_desainnaskah[0]['banksoal_'+bs]})):[],
                'key_tagihan'       : item.idbaris+'_'+item.jenistagihan+'_'+item.crtToken+'_'+n,
                'mapel_kd'          : n,
                'objek_kd'          : (kurikulumAkitif=='kurmer')?this.ormKurikulum.data.filter(s=> s.idbaris==n.split('_')[1]):this.ormKurikulum.data.filter(s=> s.mapel == n.split('_')[0] && (s.kd3 == n.split('_')[1]||s.kd4 == n.split('_')[1])),
            })))
            .addProperty('mapel_desain',(item)=>item.obj_desainnaskah[0].mapel)
            .addProperty('kodeteks_mapel',(item)=>{
                let teksmapel = "";
                if(item.mapel_desain.indexOf('Tema ')>-1 || item.mapel_desain.indexOf('TEMA ')>-1){
                    teksmapel = item.mapel_desain+'<br>'+item.objek_mapelkd.map(mp=>mp.mapelteks).filter((x,i,a)=>a.indexOf(x)==i).join(',<br/>');
                    
                }else{
                    teksmapel = this.currentMapelOnClassRoom[item.mapel_desain];
                }
                return teksmapel;
            })
            .sortByProperty('idtgl','desc');
            

    }
    get predikatDefault (){
        return  [
            {
                min         : 90,
                maks         : 100,
                predikat    : 'Sangat Baik'
            },{
                min         : 80,
                maks         : 90,
                predikat    : 'Baik'
            },
            {
                min         : 70,
                maks         : 80,
                predikat    : 'Cukup'
            },  
            {
                min         : 0,
                maks        : 70,
                predikat    : 'Perlu Bimbingan'
            },
            
        ]
    }
    findPredikatByNilai (nilai){
        let array_datapredikat = this.refrensi_predikatraport;
        let result = [];
        
        if(this.refrensi_predikatraport.length == 0){
            array_datapredikat = this.predikatDefault;
        }
        
        if(nilai == 0){
            result = [array_datapredikat[array_datapredikat.length-1]];
        }else if(nilai >100){
            result = [array_datapredikat[0]];
        }else if(isNaN(nilai)){
            result = [array_datapredikat[array_datapredikat.length-1]];
        }else if(nilai == undefined){
            result = [array_datapredikat[array_datapredikat.length-1]];
        }else{
            result = array_datapredikat.filter(s=> s.min < nilai && s.maks >= nilai);
            if(result.length==0){
                result = [ {
                    min         :   0,
                    maks         :  0,
                    predikat    : 'Cukup'
                }]
            };
        }

        return result[0];
        //item.predikatDefault.filter(s=>s.min < parseFloat(max_onlytabtagihan) && s.max >= parseFloat(max_onlytabtagihan));

    }
    collectionClass(arg){
        return new CollectionsEdu(arg)
    }
    createOrmPerTagihan(){
        let datasiswaCurrentRombel = this.siswaRombel.slice();
        let arrayAgama = new CollectionsEdu(datasiswaCurrentRombel).selectProperties(['pd_agama']).uniqueByProperty('pd_agama').data;
        let mapelNasional = Object.fromEntries(Object.entries(this.currentMapelOnClassRoom).filter(([k,v])=>!['PAI','PKRIS','PKATO','BSUND','BING'].includes(k)));
        let mapelNasionalDanMulok = Object.fromEntries(Object.entries(this.currentMapelOnClassRoom).filter(([k,v])=>!['PAI','PKRIS','PKATO'].includes(k)));
        let definisiMapelSiswa = {
            'ISLAM':{
                        kodemapel:'PAI',
                        mapelteks:this.currentMapelOnClassRoom['PAI']
                    },
            'KRISTEN':{
                        kodemapel:'PKRIS',
                        mapelteks:this.currentMapelOnClassRoom['PKRIS']
                    },
                    
            'KATHOLIK':{
                        kodemapel:'PKATO',
                        mapelteks:this.currentMapelOnClassRoom['PKATO']
                    },
                    
            'KATOLIK':{
                        kodemapel:'PKATO',
                        mapelteks:this.currentMapelOnClassRoom['PKATO']
                    },
            'KHATOLIK':{
                        kodemapel:'PKATO',
                        mapelteks:this.currentMapelOnClassRoom['PKATO']
                    },
                    
        }
        const blangkoRespon = this.service.data['blangko_respon_'+this.jenjang]; 
        const isSemesterGanjil = (this.user.semester == 1);
        const isSemesterGenap = (this.user.semester == 2);
        const ormKurikulum = this.ormKurikulum.data;
        const isKurmer = this.shortKurikulum == 'kurmer';
        this.ormTagihanBySiswa = null;
        this.ormTagihanBySiswa = new CollectionsEdu(datasiswaCurrentRombel)
                .selectProperties(['id','pd_nama','pd_agama','nama_rombel','jenjang','pd_tanggallahir','pd_tl','nis','nisn'])
                .setProperty('pd_agama',(item)=>item==""?'ISLAM':item)
                .addProperty('obj_definisiMapelAgamaSiswa',(item)=>definisiMapelSiswa[item.pd_agama])
                .addProperty('kode_mapelAgamaSiswa',(item)=>item.obj_definisiMapelAgamaSiswa.kodemapel)
                .addProperty('kodeteks_mapelAgamaSiswa',(item)=>item.obj_definisiMapelAgamaSiswa.mapelteks)
                .addProperty('mapelTanpaAgama',()=>mapelNasionalDanMulok)
                .addProperty('mapelNasional',()=>mapelNasional)
                .addProperty('obj_mapelCurrentSiswa',(item)=>Object.assign({},item.mapelTanpaAgama,{[item.kode_mapelAgamaSiswa]:item.kodeteks_mapelAgamaSiswa}))
                .addProperty('kbm_PH',(item)=>{
                    let jenistagihan = 'PH';
                    let data = [];
                    let oArray =this.ormKBM.data.filter(s=>s.jenistagihan == jenistagihan);
                    let dataTabTaghan = this.service.data[jenistagihan+'_'+this.jenjang]; //array
                    let dataTabTaghan_blangko = this.service.data['blangko_'+jenistagihan+'_'+this.jenjang]; //objek
                    let dataTabResponKbm_blangko = this.service.data['blangko_respon_'+this.jenjang];
                    
                    //filter data tabtagihan sesaui namasiswa ini;
                    let filter_tabtagihan_CurrentSiswa = dataTabTaghan.filter(s=>s.tokensiswa == item.id);
                    let tabtagihan_CurrentSiswa = dataTabTaghan_blangko; //objek tagihan
                    if(filter_tabtagihan_CurrentSiswa.length>0){
                        tabtagihan_CurrentSiswa = filter_tabtagihan_CurrentSiswa[filter_tabtagihan_CurrentSiswa.length-1];
                    }

                    let result = {};

                    result.datakbm_datamateri = oArray;
                    // result.blangko_datakbm_datamateri = dataTabTaghan_blangko;
                    result.blangko_tagihan = dataTabTaghan_blangko;
                    result.datatab_tagihan = dataTabTaghan;
                    result.has_tabtagihan = filter_tabtagihan_CurrentSiswa.length>0;
                    result.objek_tabtagihan_CurrentSiswa = tabtagihan_CurrentSiswa;
                    oArray.forEach(n=>{
                        //properti kbm-nya:
                        let obj_perkbm = {};
                        let mapel_kd = n.objek_mapelkd;
                        

                        
                        let nilai_kbm_siswa_ini = n.api_respon.filter(s=> s.tokensiswa == item.id);
                        let objek_kbm_siswa_ini = dataTabResponKbm_blangko;
                        if(nilai_kbm_siswa_ini.length>0){
                            objek_kbm_siswa_ini = nilai_kbm_siswa_ini[nilai_kbm_siswa_ini.length-1];
                        }

                        //data per mapel kd;
                        let datapermapelkd = [];
                        mapel_kd.forEach(mapelkd=>{
                            let ob_mapelkd={};
                            let arraynosoal = mapelkd.no_soal;
                            let arrayObjeknosoal = mapelkd.no_soal_banksoal;
                            let key_tagihan = mapelkd.key_tagihan;
                            let kodemapel = mapelkd.mapel;
                            let kodemapel_teks = mapelkd.mapelteks;
                            let nilai_kbm = '';
                            let nilai_tagihan = '';

                            //buat nilai tagihan;
                            //cek dulu apa objeknya punya key == key_tagihan atau tidak;
                            let cek_tabtagihan_has_key_tagihan = Object.keys(tabtagihan_CurrentSiswa).filter(s=>s == key_tagihan);
                            if(cek_tabtagihan_has_key_tagihan.length>0){
                                nilai_tagihan = tabtagihan_CurrentSiswa[key_tagihan];
                            }

                            //buat nilai kbm
                            // diambil dari arraySoal KBM dan tabRespon;
                            // buat array nilai dari objek_kbm_siswa_ini dengan cara maping arrayObjectnosoal;
                            let arraynilaikbm_dariarrayobjek = [];
                            let nosoalAwalArrayObjek = arrayObjeknosoal[0].nosoal;
                            arrayObjeknosoal.forEach(arO=>{
                                let nilai = ''
                                if(arO.datasoal.bentuksoalspesifik=='Menjodohkan'){
                                    nilai = Number(objek_kbm_siswa_ini['SKOR_'+nosoalAwalArrayObjek]);

                                }else{
                                    nilai = Number(objek_kbm_siswa_ini['SKOR_'+arO.nosoal]);
                                }
                                arraynilaikbm_dariarrayobjek.push(nilai);
                            });

                            let reducing = arraynilaikbm_dariarrayobjek.reduce((a,b)=>a+b);
                            let na = (reducing/arraynilaikbm_dariarrayobjek.length);
                            let fna = (na*100).toFixed(2);
                            
                            nilai_kbm = fna;

                            ob_mapelkd.key_tagihan      = key_tagihan;
                            ob_mapelkd.kd               = mapelkd.kd;
                            ob_mapelkd.jenistagihan     = mapelkd.jenistagihan;
                            ob_mapelkd.propertikurikulum = mapelkd
                            ob_mapelkd.objek_kbm        = n;
                            ob_mapelkd.kodemapel        = kodemapel;
                            ob_mapelkd.kodemapel_teks   = kodemapel_teks;
                            ob_mapelkd.nilai_kbm        = nilai_kbm;
                            ob_mapelkd.nilai_tagihan    = nilai_tagihan;
                            ob_mapelkd.array_nilaikbm   = arraynilaikbm_dariarrayobjek;
                            ob_mapelkd.array_nosoal_di_kbm = arraynosoal;
                            datapermapelkd.push(ob_mapelkd);

                        })
                        
                        //isikan objek;
                        obj_perkbm.idkbm = n.idbaris;
                        obj_perkbm.judulkbm = n.idmapel;
                        obj_perkbm.mapel_kd = mapel_kd;
                        // obj_perkbm.respon_datasiswa_di_kbm_ini= nilai_kbm_siswa_ini;//array;

                        obj_perkbm.hasRespon = nilai_kbm_siswa_ini.length>0;
                        obj_perkbm.obj_datasiswa_di_kbm_ini= objek_kbm_siswa_ini;//array;
                        obj_perkbm.datanilai = datapermapelkd;

                        data.push(obj_perkbm);  
                    });
                    result.dataFromKBM = data;
                    return result;
                })
                .addProperty('kbm_PTS',(item)=>{
                    let jenistagihan = 'PTS';
                    let data = [];
                    let oArray =this.ormKBM.data.filter(s=>s.jenistagihan == jenistagihan);
                    let dataTabTaghan = this.service.data[jenistagihan+'_'+this.jenjang]; //array
                    let dataTabTaghan_blangko = this.service.data['blangko_'+jenistagihan+'_'+this.jenjang]; //objek
                    let dataTabResponKbm_blangko = this.service.data['blangko_respon_'+this.jenjang];
                    
                    //filter data tabtagihan sesaui namasiswa ini;
                    let filter_tabtagihan_CurrentSiswa = dataTabTaghan.filter(s=>s.tokensiswa == item.id);
                    let tabtagihan_CurrentSiswa = dataTabTaghan_blangko; //objek tagihan
                    if(filter_tabtagihan_CurrentSiswa.length>0){
                        tabtagihan_CurrentSiswa = filter_tabtagihan_CurrentSiswa[filter_tabtagihan_CurrentSiswa.length-1];
                    }

                    
                    

                    let result = {};
                    result.datakbm_datamateri = oArray;
                    // result.blangko_datakbm_datamateri = dataTabTaghan_blangko;
                    result.blangko_tagihan = dataTabTaghan_blangko;
                    result.datatab_tagihan = dataTabTaghan;
                    result.has_tabtagihan = filter_tabtagihan_CurrentSiswa.length>0;
                    result.objek_tabtagihan_CurrentSiswa = tabtagihan_CurrentSiswa;
                    oArray.forEach(n=>{
                        //properti kbm-nya:
                        let obj_perkbm = {};
                        let mapel_kd = n.objek_mapelkd;
                        

                        
                        let nilai_kbm_siswa_ini = n.api_respon.filter(s=> s.tokensiswa == item.id);
                        let objek_kbm_siswa_ini = dataTabResponKbm_blangko;
                        if(nilai_kbm_siswa_ini.length>0){
                            objek_kbm_siswa_ini = nilai_kbm_siswa_ini[nilai_kbm_siswa_ini.length-1];
                        }

                        //data per mapel kd;
                        let datapermapelkd = [];
                        mapel_kd.forEach(mapelkd=>{
                            let ob_mapelkd={};
                            let arraynosoal = mapelkd.no_soal;
                            let arrayObjeknosoal = mapelkd.no_soal_banksoal;
                            let key_tagihan = mapelkd.key_tagihan;
                            let kodemapel = mapelkd.mapel;
                            let kodemapel_teks = mapelkd.mapelteks;
                            let nilai_kbm = '';
                            let nilai_tagihan = '';

                            //buat nilai tagihan;
                            //cek dulu apa objeknya punya key == key_tagihan atau tidak;
                            let cek_tabtagihan_has_key_tagihan = Object.keys(tabtagihan_CurrentSiswa).filter(s=>s == key_tagihan);
                            if(cek_tabtagihan_has_key_tagihan.length>0){
                                nilai_tagihan = tabtagihan_CurrentSiswa[key_tagihan];
                            }

                            //buat nilai kbm
                            // diambil dari arraySoal KBM dan tabRespon;
                            // buat array nilai dari objek_kbm_siswa_ini dengan cara maping arrayObjectnosoal;
                            let arraynilaikbm_dariarrayobjek = [];
                            let nosoalAwalArrayObjek = arrayObjeknosoal[0].nosoal;
                            arrayObjeknosoal.forEach(arO=>{
                                let nilai = ''
                                if(arO.datasoal.bentuksoalspesifik=='Menjodohkan'){
                                    nilai = Number(objek_kbm_siswa_ini['SKOR_'+nosoalAwalArrayObjek]);

                                }else{
                                    nilai = Number(objek_kbm_siswa_ini['SKOR_'+arO.nosoal]);
                                }
                                arraynilaikbm_dariarrayobjek.push(nilai);
                            });

                            let reducing = arraynilaikbm_dariarrayobjek.reduce((a,b)=>a+b);
                            let na = (reducing/arraynilaikbm_dariarrayobjek.length);
                            let fna = (na*100).toFixed(2);
                            nilai_kbm = fna;
                            
                            ob_mapelkd.key_tagihan      = key_tagihan;
                            ob_mapelkd.kodemapel        = kodemapel;
                            ob_mapelkd.kd               = mapelkd.kd;
                            ob_mapelkd.jenistagihan     = mapelkd.jenistagihan;
                            ob_mapelkd.objek_kbm        = n;
                            ob_mapelkd.propertikurikulum = mapelkd
                            ob_mapelkd.kodemapel_teks   = kodemapel_teks;
                            ob_mapelkd.nilai_kbm        = nilai_kbm;
                            ob_mapelkd.nilai_tagihan    = nilai_tagihan;
                            ob_mapelkd.array_nilaikbm   = arraynilaikbm_dariarrayobjek;
                            ob_mapelkd.array_nosoal_di_kbm = arraynosoal;
                            datapermapelkd.push(ob_mapelkd);

                        })
                        
                        //isikan objek;
                        obj_perkbm.idkbm = n.idbaris;
                        obj_perkbm.judulkbm = n.idmapel;
                        obj_perkbm.mapel_kd = mapel_kd;
                        // obj_perkbm.respon_datasiswa_di_kbm_ini= nilai_kbm_siswa_ini;//array;

                        obj_perkbm.hasRespon = nilai_kbm_siswa_ini.length>0;
                        obj_perkbm.obj_datasiswa_di_kbm_ini= objek_kbm_siswa_ini;//array;
                        obj_perkbm.datanilai = datapermapelkd;

                        data.push(obj_perkbm);  
                    });
                    result.dataFromKBM = data;
                    return result;
                })
                .addProperty('kbm_PAS',(item)=>{
                    let jenistagihan = 'PAS';
                    let data = [];
                    if(isSemesterGenap) return data;
                    let oArray =this.ormKBM.data.filter(s=>s.jenistagihan == jenistagihan);
                    let dataTabTaghan = this.service.data[jenistagihan+'_'+this.jenjang]; //array
                    let dataTabTaghan_blangko = this.service.data['blangko_'+jenistagihan+'_'+this.jenjang]; //objek
                    let dataTabResponKbm_blangko = this.service.data['blangko_respon_'+this.jenjang];
                    
                    //filter data tabtagihan sesaui namasiswa ini;
                    let filter_tabtagihan_CurrentSiswa = dataTabTaghan.filter(s=>s.tokensiswa == item.id);
                    let tabtagihan_CurrentSiswa = dataTabTaghan_blangko; //objek tagihan
                    if(filter_tabtagihan_CurrentSiswa.length>0){
                        tabtagihan_CurrentSiswa = filter_tabtagihan_CurrentSiswa[filter_tabtagihan_CurrentSiswa.length-1];
                    }

                    
                    

                    let result = {};
                    result.datakbm_datamateri = oArray;
                    // result.blangko_datakbm_datamateri = dataTabTaghan_blangko;
                    result.blangko_tagihan = dataTabTaghan_blangko;
                    result.datatab_tagihan = dataTabTaghan;
                    result.has_tabtagihan = filter_tabtagihan_CurrentSiswa.length>0;
                    result.objek_tabtagihan_CurrentSiswa = tabtagihan_CurrentSiswa;
                    oArray.forEach(n=>{
                        //properti kbm-nya:
                        let obj_perkbm = {};
                        let mapel_kd = n.objek_mapelkd;
                        

                        
                        let nilai_kbm_siswa_ini = n.api_respon.filter(s=> s.tokensiswa == item.id);
                        let objek_kbm_siswa_ini = dataTabResponKbm_blangko;
                        if(nilai_kbm_siswa_ini.length>0){
                            objek_kbm_siswa_ini = nilai_kbm_siswa_ini[nilai_kbm_siswa_ini.length-1];
                        }

                        //data per mapel kd;
                        let datapermapelkd = [];
                        mapel_kd.forEach(mapelkd=>{
                            let ob_mapelkd={};
                            let arraynosoal = mapelkd.no_soal;
                            let arrayObjeknosoal = mapelkd.no_soal_banksoal;
                            let key_tagihan = mapelkd.key_tagihan;
                            let kodemapel = mapelkd.mapel;
                            let kodemapel_teks = mapelkd.mapelteks;
                            let nilai_kbm = '';
                            let nilai_tagihan = '';

                            //buat nilai tagihan;
                            //cek dulu apa objeknya punya key == key_tagihan atau tidak;
                            let cek_tabtagihan_has_key_tagihan = Object.keys(tabtagihan_CurrentSiswa).filter(s=>s == key_tagihan);
                            if(cek_tabtagihan_has_key_tagihan.length>0){
                                nilai_tagihan = tabtagihan_CurrentSiswa[key_tagihan];
                            }

                            //buat nilai kbm
                            // diambil dari arraySoal KBM dan tabRespon;
                            // buat array nilai dari objek_kbm_siswa_ini dengan cara maping arrayObjectnosoal;
                            let arraynilaikbm_dariarrayobjek = [];
                            let nosoalAwalArrayObjek = arrayObjeknosoal[0].nosoal;
                            arrayObjeknosoal.forEach(arO=>{
                                let nilai = ''
                                if(arO.datasoal.bentuksoalspesifik=='Menjodohkan'){
                                    nilai = Number(objek_kbm_siswa_ini['SKOR_'+nosoalAwalArrayObjek]);

                                }else{
                                    nilai = Number(objek_kbm_siswa_ini['SKOR_'+arO.nosoal]);
                                }
                                arraynilaikbm_dariarrayobjek.push(nilai);
                            });

                            let reducing = arraynilaikbm_dariarrayobjek.reduce((a,b)=>a+b);
                            let na = (reducing/arraynilaikbm_dariarrayobjek.length);
                            let fna = (na*100).toFixed(2);
                            nilai_kbm = fna;
                            
                            ob_mapelkd.key_tagihan      = key_tagihan;
                            ob_mapelkd.kodemapel        = kodemapel;
                            ob_mapelkd.kd               = mapelkd.kd;
                            ob_mapelkd.jenistagihan = mapelkd.jenistagihan;
                            ob_mapelkd.objek_kbm        = n;
                            ob_mapelkd.propertikurikulum = mapelkd
                            ob_mapelkd.kodemapel_teks   = kodemapel_teks;
                            ob_mapelkd.nilai_kbm        = nilai_kbm;
                            ob_mapelkd.nilai_tagihan    = nilai_tagihan;
                            ob_mapelkd.array_nilaikbm   = arraynilaikbm_dariarrayobjek;
                            ob_mapelkd.array_nosoal_di_kbm = arraynosoal;
                            datapermapelkd.push(ob_mapelkd);

                        })
                        
                        //isikan objek;
                        obj_perkbm.idkbm = n.idbaris;
                        obj_perkbm.judulkbm = n.idmapel;
                        obj_perkbm.mapel_kd = mapel_kd;
                        // obj_perkbm.respon_datasiswa_di_kbm_ini= nilai_kbm_siswa_ini;//array;

                        obj_perkbm.hasRespon = nilai_kbm_siswa_ini.length>0;
                        obj_perkbm.obj_datasiswa_di_kbm_ini= objek_kbm_siswa_ini;//array;
                        obj_perkbm.datanilai = datapermapelkd;

                        data.push(obj_perkbm);  
                    });
                    result.dataFromKBM = data;
                    return result;
                })
                .addProperty('kbm_PAK',(item)=>{
                    let jenistagihan = 'PAK';
                    let data = [];
                    if(isSemesterGanjil) return data;
                    let oArray =this.ormKBM.data.filter(s=>s.jenistagihan == jenistagihan);
                    let dataTabTaghan = this.service.data[jenistagihan+'_'+this.jenjang]; //array
                    let dataTabTaghan_blangko = this.service.data['blangko_'+jenistagihan+'_'+this.jenjang]; //objek
                    let dataTabResponKbm_blangko = this.service.data['blangko_respon_'+this.jenjang];
                    
                    //filter data tabtagihan sesaui namasiswa ini;
                    let filter_tabtagihan_CurrentSiswa = dataTabTaghan.filter(s=>s.tokensiswa == item.id);
                    let tabtagihan_CurrentSiswa = dataTabTaghan_blangko; //objek tagihan
                    if(filter_tabtagihan_CurrentSiswa.length>0){
                        tabtagihan_CurrentSiswa = filter_tabtagihan_CurrentSiswa[filter_tabtagihan_CurrentSiswa.length-1];
                    }

                    
                    

                    let result = {};
                    result.datakbm_datamateri = oArray;
                    // result.blangko_datakbm_datamateri = dataTabTaghan_blangko;
                    result.blangko_tagihan = dataTabTaghan_blangko;
                    result.datatab_tagihan = dataTabTaghan;
                    result.has_tabtagihan = filter_tabtagihan_CurrentSiswa.length>0;
                    result.objek_tabtagihan_CurrentSiswa = tabtagihan_CurrentSiswa;
                    oArray.forEach(n=>{
                        //properti kbm-nya:
                        let obj_perkbm = {};
                        let mapel_kd = n.objek_mapelkd;
                        

                        
                        let nilai_kbm_siswa_ini = n.api_respon.filter(s=> s.tokensiswa == item.id);
                        let objek_kbm_siswa_ini = dataTabResponKbm_blangko;
                        if(nilai_kbm_siswa_ini.length>0){
                            objek_kbm_siswa_ini = nilai_kbm_siswa_ini[nilai_kbm_siswa_ini.length-1];
                        }

                        //data per mapel kd;
                        let datapermapelkd = [];
                        mapel_kd.forEach(mapelkd=>{
                            let ob_mapelkd={};
                            let arraynosoal = mapelkd.no_soal;
                            let arrayObjeknosoal = mapelkd.no_soal_banksoal;
                            let key_tagihan = mapelkd.key_tagihan;
                            let kodemapel = mapelkd.mapel;
                            let kodemapel_teks = mapelkd.mapelteks;
                            let nilai_kbm = '';
                            let nilai_tagihan = '';

                            //buat nilai tagihan;
                            //cek dulu apa objeknya punya key == key_tagihan atau tidak;
                            let cek_tabtagihan_has_key_tagihan = Object.keys(tabtagihan_CurrentSiswa).filter(s=>s == key_tagihan);
                            if(cek_tabtagihan_has_key_tagihan.length>0){
                                nilai_tagihan = tabtagihan_CurrentSiswa[key_tagihan];
                            }

                            //buat nilai kbm
                            // diambil dari arraySoal KBM dan tabRespon;
                            // buat array nilai dari objek_kbm_siswa_ini dengan cara maping arrayObjectnosoal;
                            let arraynilaikbm_dariarrayobjek = [];
                            let nosoalAwalArrayObjek = arrayObjeknosoal[0].nosoal;
                            arrayObjeknosoal.forEach(arO=>{
                                let nilai = ''
                                if(arO.datasoal.bentuksoalspesifik=='Menjodohkan'){
                                    nilai = Number(objek_kbm_siswa_ini['SKOR_'+nosoalAwalArrayObjek]);

                                }else{
                                    nilai = Number(objek_kbm_siswa_ini['SKOR_'+arO.nosoal]);
                                }
                                arraynilaikbm_dariarrayobjek.push(nilai);
                            });

                            let reducing = arraynilaikbm_dariarrayobjek.reduce((a,b)=>a+b);
                            let na = (reducing/arraynilaikbm_dariarrayobjek.length);
                            let fna = (na*100).toFixed(2);
                            nilai_kbm = fna;
                            
                            ob_mapelkd.key_tagihan      = key_tagihan;
                            ob_mapelkd.kodemapel        = kodemapel;
                            ob_mapelkd.kd               = mapelkd.kd;
                            ob_mapelkd.jenistagihan = mapelkd.jenistagihan;
                            ob_mapelkd.objek_kbm        = n;
                            ob_mapelkd.propertikurikulum = mapelkd
                            ob_mapelkd.kodemapel_teks   = kodemapel_teks;
                            ob_mapelkd.nilai_kbm        = nilai_kbm;
                            ob_mapelkd.nilai_tagihan    = nilai_tagihan;
                            ob_mapelkd.array_nilaikbm   = arraynilaikbm_dariarrayobjek;
                            ob_mapelkd.array_nosoal_di_kbm = arraynosoal;
                            datapermapelkd.push(ob_mapelkd);

                        })
                        
                        //isikan objek;
                        obj_perkbm.idkbm = n.idbaris;
                        obj_perkbm.judulkbm = n.idmapel;
                        obj_perkbm.mapel_kd = mapel_kd;
                        // obj_perkbm.respon_datasiswa_di_kbm_ini= nilai_kbm_siswa_ini;//array;
                        

                        obj_perkbm.hasRespon = nilai_kbm_siswa_ini.length>0;
                        obj_perkbm.obj_datasiswa_di_kbm_ini= objek_kbm_siswa_ini;//array;
                        obj_perkbm.datanilai = datapermapelkd;

                        data.push(obj_perkbm);  
                    });
                    result.dataFromKBM = data;
                    return result;
                })
                .addProperty('kbm_ustertulis',(item)=>{
                    let jenistagihan = 'ustertulis';
                    let data = [];
                    if(item.jenjang != 6 && isSemesterGenap) return [];
                    let oArray =this.ormKBM.data.filter(s=>s.jenistagihan == jenistagihan);
                    let dataTabTaghan = this.service.data[jenistagihan+'_'+this.jenjang]; //array
                    let dataTabTaghan_blangko = this.service.data['blangko_'+jenistagihan+'_'+this.jenjang]; //objek
                    let dataTabResponKbm_blangko = this.service.data['blangko_respon_'+this.jenjang];
                    
                    //filter data tabtagihan sesaui namasiswa ini;
                    let filter_tabtagihan_CurrentSiswa = dataTabTaghan.filter(s=>s.tokensiswa == item.id);
                    let tabtagihan_CurrentSiswa = dataTabTaghan_blangko; //objek tagihan
                    if(filter_tabtagihan_CurrentSiswa.length>0){
                        tabtagihan_CurrentSiswa = filter_tabtagihan_CurrentSiswa[filter_tabtagihan_CurrentSiswa.length-1];
                    }

                    
                    

                    let result = {};
                    result.datakbm_datamateri = oArray;
                    // result.blangko_datakbm_datamateri = dataTabTaghan_blangko;
                    result.blangko_tagihan = dataTabTaghan_blangko;
                    result.datatab_tagihan = dataTabTaghan;
                    result.has_tabtagihan = filter_tabtagihan_CurrentSiswa.length>0;
                    result.objek_tabtagihan_CurrentSiswa = tabtagihan_CurrentSiswa;
                    oArray.forEach(n=>{
                        //properti kbm-nya:
                        let obj_perkbm = {};
                        let mapel_kd = n.objek_mapelkd;
                        

                        
                        let nilai_kbm_siswa_ini = n.api_respon.filter(s=> s.tokensiswa == item.id);
                        let objek_kbm_siswa_ini = dataTabResponKbm_blangko;
                        if(nilai_kbm_siswa_ini.length>0){
                            objek_kbm_siswa_ini = nilai_kbm_siswa_ini[nilai_kbm_siswa_ini.length-1];
                        }

                        //data per mapel kd;
                        let datapermapelkd = [];
                        mapel_kd.forEach(mapelkd=>{
                            let ob_mapelkd={};
                            let arraynosoal = mapelkd.no_soal;
                            let arrayObjeknosoal = mapelkd.no_soal_banksoal;
                            let key_tagihan = mapelkd.key_tagihan;
                            let kodemapel = mapelkd.mapel;
                            let kodemapel_teks = mapelkd.mapelteks;
                            let nilai_kbm = '';
                            let nilai_tagihan = '';

                            //buat nilai tagihan;
                            //cek dulu apa objeknya punya key == key_tagihan atau tidak;
                            let cek_tabtagihan_has_key_tagihan = Object.keys(tabtagihan_CurrentSiswa).filter(s=>s == key_tagihan);
                            if(cek_tabtagihan_has_key_tagihan.length>0){
                                nilai_tagihan = tabtagihan_CurrentSiswa[key_tagihan];
                            }

                            //buat nilai kbm
                            // diambil dari arraySoal KBM dan tabRespon;
                            // buat array nilai dari objek_kbm_siswa_ini dengan cara maping arrayObjectnosoal;
                            let arraynilaikbm_dariarrayobjek = [];
                            let nosoalAwalArrayObjek = arrayObjeknosoal[0].nosoal;
                            arrayObjeknosoal.forEach(arO=>{
                                let nilai = ''
                                if(arO.datasoal.bentuksoalspesifik=='Menjodohkan'){
                                    nilai = Number(objek_kbm_siswa_ini['SKOR_'+nosoalAwalArrayObjek]);

                                }else{
                                    nilai = Number(objek_kbm_siswa_ini['SKOR_'+arO.nosoal]);
                                }
                                arraynilaikbm_dariarrayobjek.push(nilai);
                            });

                            let reducing = arraynilaikbm_dariarrayobjek.reduce((a,b)=>a+b);
                            let na = (reducing/arraynilaikbm_dariarrayobjek.length);
                            let fna = (na*100).toFixed(2);
                            nilai_kbm = fna;
                            
                            ob_mapelkd.key_tagihan      = key_tagihan;
                            ob_mapelkd.kd               = mapelkd.kd;
                            ob_mapelkd.kodemapel        = kodemapel;
                            ob_mapelkd.kodemapel_teks   = kodemapel_teks;
                            ob_mapelkd.jenistagihan = mapelkd.jenistagihan;
                            ob_mapelkd.objek_kbm        = n;
                            ob_mapelkd.propertikurikulum = mapelkd
                            ob_mapelkd.nilai_kbm        = nilai_kbm;
                            ob_mapelkd.nilai_tagihan    = nilai_tagihan;
                            ob_mapelkd.array_nilaikbm   = arraynilaikbm_dariarrayobjek;
                            ob_mapelkd.array_nosoal_di_kbm = arraynosoal;
                            datapermapelkd.push(ob_mapelkd);

                        })
                        
                        //isikan objek;
                        obj_perkbm.idkbm = n.idbaris;
                        obj_perkbm.judulkbm = n.idmapel;
                        obj_perkbm.mapel_kd = mapel_kd;
                        // obj_perkbm.respon_datasiswa_di_kbm_ini= nilai_kbm_siswa_ini;//array;

                        obj_perkbm.hasRespon = nilai_kbm_siswa_ini.length>0;
                        obj_perkbm.obj_datasiswa_di_kbm_ini= objek_kbm_siswa_ini;//array;
                        obj_perkbm.datanilai = datapermapelkd;

                        data.push(obj_perkbm);  
                    });
                    result.dataFromKBM = data;
                    return result;
                })
                .addProperty('kbm_uspraktek',(item)=>{
                    let jenistagihan = 'uspraktek';
                    let data = [];
                    if(item.jenjang != 6 && isSemesterGenap) return data;
                    let oArray =this.ormKBM.data.filter(s=>s.jenistagihan == jenistagihan);
                    let dataTabTaghan = this.service.data[jenistagihan+'_'+this.jenjang]; //array
                    let dataTabTaghan_blangko = this.service.data['blangko_'+jenistagihan+'_'+this.jenjang]; //objek
                    let dataTabResponKbm_blangko = this.service.data['blangko_respon_'+this.jenjang];
                    
                    //filter data tabtagihan sesaui namasiswa ini;
                    let filter_tabtagihan_CurrentSiswa = dataTabTaghan.filter(s=>s.tokensiswa == item.id);
                    let tabtagihan_CurrentSiswa = dataTabTaghan_blangko; //objek tagihan
                    if(filter_tabtagihan_CurrentSiswa.length>0){
                        tabtagihan_CurrentSiswa = filter_tabtagihan_CurrentSiswa[filter_tabtagihan_CurrentSiswa.length-1];
                    }

                    
                    

                    let result = {};
                    result.datakbm_datamateri = oArray;
                    // result.blangko_datakbm_datamateri = dataTabTaghan_blangko;
                    result.blangko_tagihan = dataTabTaghan_blangko;
                    result.datatab_tagihan = dataTabTaghan;
                    result.has_tabtagihan = filter_tabtagihan_CurrentSiswa.length>0;
                    result.objek_tabtagihan_CurrentSiswa = tabtagihan_CurrentSiswa;
                    oArray.forEach(n=>{
                        //properti kbm-nya:
                        let obj_perkbm = {};
                        let mapel_kd = n.objek_mapelkd;
                        

                        
                        let nilai_kbm_siswa_ini = n.api_respon.filter(s=> s.tokensiswa == item.id);
                        let objek_kbm_siswa_ini = dataTabResponKbm_blangko;
                        if(nilai_kbm_siswa_ini.length>0){
                            objek_kbm_siswa_ini = nilai_kbm_siswa_ini[nilai_kbm_siswa_ini.length-1];
                        }

                        //data per mapel kd;
                        let datapermapelkd = [];
                        mapel_kd.forEach(mapelkd=>{
                            let ob_mapelkd={};
                            let arraynosoal = mapelkd.no_soal;
                            let arrayObjeknosoal = mapelkd.no_soal_banksoal;
                            let key_tagihan = mapelkd.key_tagihan;
                            let kodemapel = mapelkd.mapel;
                            let kodemapel_teks = mapelkd.mapelteks;
                            let nilai_kbm = '';
                            let nilai_tagihan = '';

                            //buat nilai tagihan;
                            //cek dulu apa objeknya punya key == key_tagihan atau tidak;
                            let cek_tabtagihan_has_key_tagihan = Object.keys(tabtagihan_CurrentSiswa).filter(s=>s == key_tagihan);
                            if(cek_tabtagihan_has_key_tagihan.length>0){
                                nilai_tagihan = tabtagihan_CurrentSiswa[key_tagihan];
                            }

                            //buat nilai kbm
                            // diambil dari arraySoal KBM dan tabRespon;
                            // buat array nilai dari objek_kbm_siswa_ini dengan cara maping arrayObjectnosoal;
                            let arraynilaikbm_dariarrayobjek = [];
                            let nosoalAwalArrayObjek = arrayObjeknosoal[0].nosoal;
                            arrayObjeknosoal.forEach(arO=>{
                                let nilai = ''
                                if(arO.datasoal.bentuksoalspesifik=='Menjodohkan'){
                                    nilai = Number(objek_kbm_siswa_ini['SKOR_'+nosoalAwalArrayObjek]);

                                }else{
                                    nilai = Number(objek_kbm_siswa_ini['SKOR_'+arO.nosoal]);
                                }
                                arraynilaikbm_dariarrayobjek.push(nilai);
                            });

                            let reducing = arraynilaikbm_dariarrayobjek.reduce((a,b)=>a+b);
                            let na = (reducing/arraynilaikbm_dariarrayobjek.length);
                            let fna = (na*100).toFixed(2);
                            nilai_kbm = fna;
                            
                            ob_mapelkd.key_tagihan      = key_tagihan;
                            ob_mapelkd.kodemapel        = kodemapel;
                            ob_mapelkd.kodemapel_teks   = kodemapel_teks;
                            ob_mapelkd.kd   = mapelkd.kd;
                            ob_mapelkd.jenistagihan = mapelkd.jenistagihan;
                            ob_mapelkd.objek_kbm        = n;
                            ob_mapelkd.propertikurikulum = mapelkd
                            ob_mapelkd.nilai_kbm        = nilai_kbm;
                            ob_mapelkd.nilai_tagihan    = nilai_tagihan;
                            ob_mapelkd.array_nilaikbm   = arraynilaikbm_dariarrayobjek;
                            ob_mapelkd.array_nosoal_di_kbm = arraynosoal;
                            datapermapelkd.push(ob_mapelkd);

                        })
                        
                        //isikan objek;
                        obj_perkbm.idkbm = n.idbaris;
                        obj_perkbm.judulkbm = n.idmapel;
                        obj_perkbm.mapel_kd = mapel_kd;
                        // obj_perkbm.respon_datasiswa_di_kbm_ini= nilai_kbm_siswa_ini;//array;

                        obj_perkbm.hasRespon = nilai_kbm_siswa_ini.length>0;
                        obj_perkbm.obj_datasiswa_di_kbm_ini= objek_kbm_siswa_ini;//array;
                        obj_perkbm.datanilai = datapermapelkd;

                        data.push(obj_perkbm);  
                    });
                    result.dataFromKBM = data;
                    return result;
                })
                .addProperty('predikatDefault',()=>{
                    return [
                        {
                            min         : 0,
                            max         : 70,
                            predikat    : 'Perlu Bimbingan'
                        },
                        {
                            min         : 70,
                            max         : 80,
                            predikat    : 'Cukup'
                        },
                        {
                            min         : 80,
                            max         : 90,
                            predikat    : 'Baik'
                        },
                        {
                            min         : 90,
                            max         : 100,
                            predikat    : 'Sangat Baik'
                        }
                    ]
                })
                .addProperty('tiapMapel',(item)=>{
                    ///mapel siswa ini;
                    const mapelsiswa = item.obj_mapelCurrentSiswa;
                    let result =[]
                    Object.keys(mapelsiswa).forEach(n=>{
                        let ob={};
                        let kurikum_mapel_ini = [];

                        ob.kodemapel = n;
                        ob.kodemapel_teks = mapelsiswa[n];

                        if(isKurmer){
                            kurikum_mapel_ini = ormKurikulum.filter(s=>s.kodemapel == n);
                        }else{
                            kurikum_mapel_ini = ormKurikulum.filter(s=>s.mapel == n);
                        }
                        


                        //cari sesuai Tab;
                        //PH
                        let dataPH = item.kbm_PH.dataFromKBM;//array
                        let mapelByDataPH = dataPH.filter(s=>s.datanilai.filter(sk=>sk.kodemapel == n).length>0);
                        let only_datanilai = mapelByDataPH.map(dn=>dn.datanilai).flat(1).filter(sdn=>sdn.kodemapel == n);//.flat(1);//.map(nt=>nt.nilai_tagihan);
                        let only_tabtagihan = only_datanilai.map(nt=>Number(nt.nilai_tagihan))
                        let max_onlytabtagihan = Math.max(...only_tabtagihan);
                        let min_onlytabtagihan = Math.min(...only_tabtagihan);
                            if(max_onlytabtagihan>100){
                                max_onlytabtagihan = 100;
                            }
                        let index_max = only_datanilai.findIndex(fi=>fi.nilai_tagihan == max_onlytabtagihan);
                        let index_min = only_datanilai.findIndex(fi=>fi.nilai_tagihan == min_onlytabtagihan);
                        
                        //cek data PH
                        // ob._kurikulum = kurikum_mapel_ini;
                        // ob._PH_refbyPH = mapelByDataPH;
                        ob.PH_arrayObject_datanilai = only_datanilai;
                        // ob._PH_onlyTagihan = only_tabtagihan;
                        // ob._PH_max_onlytabtagihan = max_onlytabtagihan;
                        // ob._PH_min_onlytabtagihan = min_onlytabtagihan;
                        // ob._PH_index_max = index_max;
                        // ob._PH_data_index_max = only_datanilai[index_max];
                        // ob._PH_index_min = index_min;
                        // ob._PH_data_index_min = only_datanilai[index_min];
                        // jika PH tidak pernah dikerjakan, untuk mapel ini data PH-nya kita tentukan;
                        //cari sesuai Tab;
                        //PTS
                        let dataPTS = item.kbm_PTS.dataFromKBM;//array
                        let PTS_mapelByDataPTS = dataPTS.filter(s=>s.datanilai.filter(sk=>sk.kodemapel == n).length>0);
                        let PTS_only_datanilai = PTS_mapelByDataPTS.map(dn=>dn.datanilai).flat(1).filter(sdn=>sdn.kodemapel == n);//.map(nt=>nt.nilai_tagihan);
                        let PTS_only_tabtagihan = PTS_only_datanilai.map(nt=>Number(nt.nilai_tagihan))
                        let PTS_max_onlytabtagihan = Math.max(...PTS_only_tabtagihan);
                        let PTS_min_onlytabtagihan = Math.min(...PTS_only_tabtagihan);
                            if(PTS_max_onlytabtagihan>100){
                                PTS_max_onlytabtagihan = 100;
                            }
                        let PTS_index_max = PTS_only_datanilai.findIndex(fi=>fi.nilai_tagihan == PTS_max_onlytabtagihan);
                        let PTS_index_min = PTS_only_datanilai.findIndex(fi=>fi.nilai_tagihan == PTS_min_onlytabtagihan);
                        
                        //cek data PAS
                        // ob._kurikulum = kurikum_mapel_ini;
                        
                        //PAS
                        let dataPASPAK = [];
                        let PASPAK_mapelByDataPASPAK = [];
                        let PASPAK_only_datanilai = []
                        let PASPAK_only_tabtagihan = []
                        let PASPAK_max_onlytabtagihan = 0
                        let PASPAK_min_onlytabtagihan = 0
                        let PASPAK_index_max = -1;
                        let PASPAK_index_min = -1;
                        
                        let dataPASPAKUS = [];
                        let PASPAKUS_mapelByDataPASPAKUS = [];
                        let PASPAKUS_only_datanilai = []
                        let PASPAKUS_only_tabtagihan = []
                        let PASPAKUS_max_onlytabtagihan = 0
                        let PASPAKUS_min_onlytabtagihan = 0
                        let PASPAKUS_index_max = -1;
                        let PASPAKUS_index_min = -1;
                        
                        let dataPASPAKUSPRAKTEK = [];
                        let PASPAKUSPRAKTEK_mapelByDataPASPAKUSPRAKTEK = [];
                        let PASPAKUSPRAKTEK_only_datanilai = []
                        let PASPAKUSPRAKTEK_only_tabtagihan = []
                        let PASPAKUSPRAKTEK_max_onlytabtagihan = 0
                        let PASPAKUSPRAKTEK_min_onlytabtagihan = 0
                        let PASPAKUSPRAKTEK_index_max = -1;
                        let PASPAKUSPRAKTEK_index_min = -1;
                        

                        if(isSemesterGanjil){
                            dataPASPAK = item.kbm_PAS.dataFromKBM;//array
                            PASPAK_mapelByDataPASPAK = dataPASPAK.filter(s=>s.datanilai.filter(sk=>sk.kodemapel == n).length>0);
                            PASPAK_only_datanilai = PASPAK_mapelByDataPASPAK.map(dn=>dn.datanilai).flat(1).filter(sdn=>sdn.kodemapel == n);//.map(nt=>nt.nilai_tagihan);
                            PASPAK_only_tabtagihan = PASPAK_only_datanilai.map(nt=>Number(nt.nilai_tagihan))
                            PASPAK_max_onlytabtagihan = Math.max(...PASPAK_only_tabtagihan);
                            PASPAK_min_onlytabtagihan = Math.min(...PASPAK_only_tabtagihan);
                                if(PASPAK_max_onlytabtagihan>100){
                                    PASPAK_max_onlytabtagihan = 100;
                                }
                            PASPAK_index_max = PASPAK_only_datanilai.findIndex(fi=>fi.nilai_tagihan == PASPAK_max_onlytabtagihan);
                            PASPAK_index_min = PASPAK_only_datanilai.findIndex(fi=>fi.nilai_tagihan == PASPAK_min_onlytabtagihan);
                            
                        }else{
                            //PAK
                            dataPASPAK = item.kbm_PAK.dataFromKBM;//array
                            PASPAK_mapelByDataPASPAK = dataPASPAK.filter(s=>s.datanilai.filter(sk=>sk.kodemapel == n).length>0);
                            PASPAK_only_datanilai = PASPAK_mapelByDataPASPAK.map(dn=>dn.datanilai).flat(1).filter(sdn=>sdn.kodemapel == n);//.map(nt=>nt.nilai_tagihan);
                            PASPAK_only_tabtagihan = PASPAK_only_datanilai.map(nt=>Number(nt.nilai_tagihan))
                            PASPAK_max_onlytabtagihan = Math.max(...PASPAK_only_tabtagihan);
                            PASPAK_min_onlytabtagihan = Math.min(...PASPAK_only_tabtagihan);
                                if(PASPAK_max_onlytabtagihan>100){
                                    PASPAK_max_onlytabtagihan = 100;
                                }
                            PASPAK_index_max = PASPAK_only_datanilai.findIndex(fi=>fi.nilai_tagihan == PASPAK_max_onlytabtagihan);
                            PASPAK_index_min = PASPAK_only_datanilai.findIndex(fi=>fi.nilai_tagihan == PASPAK_min_onlytabtagihan);
                            
                            if(this.jenjang == 6){
                                
                                //ustertulis
                                dataPASPAKUS = item.kbm_ustertulis.dataFromKBM;//array
                                PASPAKUS_mapelByDataPASPAKUS = dataPASPAKUS.filter(s=>s.datanilai.filter(sk=>sk.kodemapel == n).length>0);
                                PASPAKUS_only_datanilai = PASPAKUS_mapelByDataPASPAKUS.map(dn=>dn.datanilai).flat(1).filter(sdn=>sdn.kodemapel == n);//.map(nt=>nt.nilai_tagihan);
                                PASPAKUS_only_tabtagihan = PASPAKUS_only_datanilai.map(nt=>Number(nt.nilai_tagihan))
                                PASPAKUS_max_onlytabtagihan = Math.max(...PASPAKUS_only_tabtagihan);
                                PASPAKUS_min_onlytabtagihan = Math.min(...PASPAKUS_only_tabtagihan);
                                    if(PASPAKUS_max_onlytabtagihan>100){
                                        PASPAKUS_max_onlytabtagihan = 100;
                                    }
                                PASPAKUS_index_max = PASPAKUS_only_datanilai.findIndex(fi=>fi.nilai_tagihan == PASPAKUS_max_onlytabtagihan);
                                PASPAKUS_index_min = PASPAKUS_only_datanilai.findIndex(fi=>fi.nilai_tagihan == PASPAKUS_min_onlytabtagihan);
                                
                                
                                //PASPAKUSPRAKTEK
                                dataPASPAKUSPRAKTEK = item.kbm_uspraktek.dataFromKBM;//array
                                PASPAKUSPRAKTEK_mapelByDataPASPAKUSPRAKTEK = dataPASPAKUSPRAKTEK.filter(s=>s.datanilai.filter(sk=>sk.kodemapel == n).length>0);
                                PASPAKUSPRAKTEK_only_datanilai = PASPAKUSPRAKTEK_mapelByDataPASPAKUSPRAKTEK.map(dn=>dn.datanilai).flat(1).filter(sdn=>sdn.kodemapel == n);//.map(nt=>nt.nilai_tagihan);
                                PASPAKUSPRAKTEK_only_tabtagihan = PASPAKUSPRAKTEK_only_datanilai.map(nt=>Number(nt.nilai_tagihan))
                                PASPAKUSPRAKTEK_max_onlytabtagihan = Math.max(...PASPAKUSPRAKTEK_only_tabtagihan);
                                PASPAKUSPRAKTEK_min_onlytabtagihan = Math.min(...PASPAKUSPRAKTEK_only_tabtagihan);
                                    if(PASPAKUSPRAKTEK_max_onlytabtagihan>100){
                                        PASPAKUSPRAKTEK_max_onlytabtagihan = 100;
                                    }
                                PASPAKUSPRAKTEK_index_max = PASPAKUSPRAKTEK_only_datanilai.findIndex(fi=>fi.nilai_tagihan == PASPAKUSPRAKTEK_max_onlytabtagihan);
                                PASPAKUSPRAKTEK_index_min = PASPAKUSPRAKTEK_only_datanilai.findIndex(fi=>fi.nilai_tagihan == PASPAKUSPRAKTEK_min_onlytabtagihan);
                            }
                        }
                        
                        
                        //kpraktik
                        //     let datakpraktik = item.kbm_kpraktik.dataFromKBM;//array
                        //     let kpraktik_mapelByDatakpraktik = datakpraktik.filter(s=>s.datanilai.filter(sk=>sk.kodemapel == n).length>0);
                        //     let kpraktik_only_datanilai = kpraktik_mapelByDatakpraktik.map(dn=>dn.datanilai).flat(1).filter(sdn=>sdn.kodemapel == n);//.map(nt=>nt.nilai_tagihan);
                        //     let kpraktik_only_tabtagihan = kpraktik_only_datanilai.map(nt=>Number(nt.nilai_tagihan))
                        //     let kpraktik_max_onlytabtagihan = Math.max(...kpraktik_only_tabtagihan);
                        //     let kpraktik_min_onlytabtagihan = Math.min(...kpraktik_only_tabtagihan);
                        //         if(kpraktik_max_onlytabtagihan>100){
                        //             kpraktik_max_onlytabtagihan = 100;
                        //         }
                        //     let kpraktik_index_max = kpraktik_only_datanilai.findIndex(fi=>fi.nilai_tagihan == kpraktik_max_onlytabtagihan);
                        //     let kpraktik_index_min = kpraktik_only_datanilai.findIndex(fi=>fi.nilai_tagihan == kpraktik_min_onlytabtagihan);
                            
                        
                        
                        // //kproduk
                        // let datakproduk = item.kbm_kproduk.dataFromKBM;//array
                        // let kproduk_mapelByDatakproduk = datakproduk.filter(s=>s.datanilai.filter(sk=>sk.kodemapel == n).length>0);
                        // let kproduk_only_datanilai = kproduk_mapelByDatakproduk.map(dn=>dn.datanilai).flat(1).filter(sdn=>sdn.kodemapel == n);//.map(nt=>nt.nilai_tagihan);
                        // let kproduk_only_tabtagihan = kproduk_only_datanilai.map(nt=>Number(nt.nilai_tagihan))
                        // let kproduk_max_onlytabtagihan = Math.max(...kproduk_only_tabtagihan);
                        // let kproduk_min_onlytabtagihan = Math.min(...kproduk_only_tabtagihan);
                        //     if(kproduk_max_onlytabtagihan>100){
                        //         kproduk_max_onlytabtagihan = 100;
                        //     }
                        // let kproduk_index_max = kproduk_only_datanilai.findIndex(fi=>fi.nilai_tagihan == kproduk_max_onlytabtagihan);
                        // let kproduk_index_min = kproduk_only_datanilai.findIndex(fi=>fi.nilai_tagihan == kproduk_min_onlytabtagihan);
                        
                        
                        //kproyek
                        // let datakproyek = item.kbm_kproyek.dataFromKBM;//array
                        // let kproyek_mapelByDatakproyek = datakproyek.filter(s=>s.datanilai.filter(sk=>sk.kodemapel == n).length>0);
                        // let kproyek_only_datanilai = kproyek_mapelByDatakproyek.map(dn=>dn.datanilai).flat(1).filter(sdn=>sdn.kodemapel == n);//.map(nt=>nt.nilai_tagihan);
                        // let kproyek_only_tabtagihan = kproyek_only_datanilai.map(nt=>Number(nt.nilai_tagihan))
                        // let kproyek_max_onlytabtagihan = Math.max(...kproyek_only_tabtagihan);
                        // let kproyek_min_onlytabtagihan = Math.min(...kproyek_only_tabtagihan);
                        //     if(kproyek_max_onlytabtagihan>100){
                        //         kproyek_max_onlytabtagihan = 100;
                        //     }
                        // let kproyek_index_max = kproyek_only_datanilai.findIndex(fi=>fi.nilai_tagihan == kproyek_max_onlytabtagihan);
                        // let kproyek_index_min = kproyek_only_datanilai.findIndex(fi=>fi.nilai_tagihan == kproyek_min_onlytabtagihan);
                        
                        // ob.PTS_arrayObject_datanilai = PTS_only_datanilai;

                        // ob._PTS_refbyPTS                 = PTS_mapelByDataPTS;
                        // ob._PTS_arrayObject_datanilai    = PTS_only_datanilai;
                        // ob._PTS_onlyTagihan              = PTS_only_tabtagihan;
                        // ob._PTS_max_onlytabtagihan       = PTS_max_onlytabtagihan;
                        // ob._PTS_min_onlytabtagihan       = PTS_min_onlytabtagihan;
                        // ob._PTS_index_max                = PTS_index_max;
                        // ob._PTS_data_index_max           = PTS_only_datanilai[PTS_index_max];
                        // ob._PTS_index_min                = PTS_index_min;
                        // ob._PTS_data_index_min           = PTS_only_datanilai[PTS_index_min];
                        // jika PH tidak pernah dikerjakan, untuk mapel ini data PH-nya kita tentukan;

                        let tipeKebutuhanPH = 0;
                        let uniq_kd = only_datanilai.map(n=>n.kd).filter((x,i,a)=>a.indexOf(x)==i);
                        if(uniq_kd.length == 0){
                            tipeKebutuhanPH = 2;
                        }else if(uniq_kd.length == 1){
                            tipeKebutuhanPH = 1;
                        }
                        
                        ob.tipeKebutuhanPH = tipeKebutuhanPH;
                        
                        if(isKurmer){
                            //untuk kurmer, deskripsii berdasarkan PH;
                            if(tipeKebutuhanPH ==0){
                                let deskripsiMax = item.predikatDefault.filter(s=>s.min < parseFloat(max_onlytabtagihan) && s.max >= parseFloat(max_onlytabtagihan));
                                let deskripsiMaxWanted = (max_onlytabtagihan == 0 ||['Perlu Bimbingan','Cukup'].includes(deskripsiMax[0].predikat))?'Baik':deskripsiMax[0].predikat;
                                let deskripsiMin = item.predikatDefault.filter(s=>s.min < parseFloat(min_onlytabtagihan) && s.max >= parseFloat(min_onlytabtagihan));
                                
                                let deskripsiMinWanted = (min_onlytabtagihan == 0 ||['Perlu Bimbingan',].includes(deskripsiMin[0].predikat))?'Cukup':deskripsiMin[0].predikat;
                                
                                ob._deskripsiMax = deskripsiMax;
                                ob._deskripsiMax_Wanted = deskripsiMaxWanted;
                                ob._deskripsiMax_kd = only_datanilai[index_max].propertikurikulum;
                                ob._deskripsiMin = deskripsiMin;
                                ob._deskirpsiMin_Wanted = deskripsiMinWanted;
                                ob._deskripsiMin_kd = only_datanilai[index_min].propertikurikulum;

                                ob.deskripsi_maks_kd = deskripsiMaxWanted;
                                ob.deskripsi_min_kd = deskripsiMinWanted;
                                ob.deskripsi_maks_kurikulum = only_datanilai[index_max].propertikurikulum;
                                ob.deskripsi_min_kurikulum = only_datanilai[index_min].propertikurikulum;
                                ob.deskripsi_maks_kurikulum_kode = only_datanilai[index_max].propertikurikulum.kd;
                                ob.deskripsi_min_kurikulum_kode = only_datanilai[index_min].propertikurikulum.kd;
                            }else if(tipeKebutuhanPH == 1){
                                let deskripsiMax = item.predikatDefault.filter(s=>s.min < parseFloat(max_onlytabtagihan) && s.max >= parseFloat(max_onlytabtagihan));
                                let deskripsiMaxWanted = (max_onlytabtagihan == 0 ||['Perlu Bimbingan','Cukup'].includes(deskripsiMax[0].predikat))?'Baik':deskripsiMax[0].predikat;
                                
                                //kita butuh satu kd lagi untuk melengkapi deskripsi raport
                                //data diambil selain kdMax;
                                let kdmaks = only_datanilai[index_max].kd;
                                let kdmin = kurikum_mapel_ini.filter(s=> s.idbaris !=kdmaks);

                                ob._deskripsiMax = deskripsiMax;
                                ob._deskripsiMax_Wanted = deskripsiMaxWanted;
                                ob._deskripsiMin_kd = kdmin[0];
                                ob._deskripsiMin_Wanted = 'Cukup';

                                ob.deskripsi_maks_kd = deskripsiMaxWanted;
                                ob.deskripsi_min_kd = 'Cukup';
                                ob.deskripsi_maks_kurikulum = only_datanilai[index_max].propertikurikulum.kd;
                                ob.deskripsi_min_kurikulum = kdmin[0].idbaris;
                                
                            }else{
                                let kdmaks = kurikum_mapel_ini[0]
                                let kdmin = kurikum_mapel_ini[1]
                                ob._deskripsiMin_kd = kdmin
                                ob._deskripsiMax_kd = kdmaks
                                ob._deskripsiMin_Wanted = 'Cukup';
                                ob._deskripsiMax_Wanted = 'Baik';

                                ob.deskripsi_maks_kd = 'Baik';
                                ob.deskripsi_min_kd = 'Cukup';
                                ob.deskripsi_maks_kurikulum = kdmaks;
                                ob.deskripsi_min_kurikulum = kdmin
                            }
                        }else{
                            //collectby_KD;
                            //maping kd
                            let kds =[];
                            let refkds = [];
                            refkds = [...only_datanilai,...PTS_only_datanilai,...PASPAK_only_datanilai];
                            if(item.jenjang == 6 && isSemesterGenap){
                                refkds = [...only_datanilai,...PTS_only_datanilai,...PASPAK_only_datanilai,...PASPAKUS_only_datanilai];
                                
                            }
                            kds = refkds.map(n=>n.kd).filter((x,i,a)=>a.indexOf(x)==i);
                            
                            if(kds.length == 0){
                                tipeKebutuhanPH = 2
                            }else if(kds.length == 1){
                                tipeKebutuhanPH = 1;
                            }else{
                                tipeKebutuhanPH = 0;
                            }

                            

                            let ar_kds = [];
                            let ar_nilaimapel_byKds_hasCollectiioning = [];
                            let nilai_start_maks = 100;
                            let nilai_start_min=0;
                            let objek_kdmaks = null;
                            let objek_kdmin = null;
                            kds.forEach(kd=>{
                                let ob_kd = {};
                                let kd_propertikurikulum = refkds.filter(skd=>skd.kd==kd);

                                ob_kd.kode_kd = kd;
                                ob_kd.kode_kd_keterampilan = kd_propertikurikulum[kd_propertikurikulum.length-1].propertikurikulum.objek_kd[0].kd4;
                                ob_kd.propertikurikulum = kd_propertikurikulum[kd_propertikurikulum.length-1].propertikurikulum.objek_kd[0];
                                
                                let data_PH =refkds.filter(skd=>skd.kd == kd && skd.jenistagihan=='PH');
                                let data_PTS = refkds.filter(skd=>skd.kd == kd && skd.jenistagihan=='PTS');
                                let data_PASPAK = refkds.filter(skd=>skd.kd == kd && skd.jenistagihan=='PAS');
                                if(isSemesterGenap){
                                    data_PASPAK = refkds.filter(skd=>skd.kd == kd && skd.jenistagihan=='PAK');
                                    if(this.jenjang == 6){
                                        data_PASPAK = refkds.filter(skd=>skd.kd == kd && (skd.jenistagihan=='PAK'|| skd.jenistagihan == 'ustertulis'));
                                    }
                                }

                                ob_kd.data_PH = data_PH;
                                ob_kd.data_PTS = data_PTS;
                                
                                if(isSemesterGanjil){
                                    ob_kd.data_PASPAK = refkds.filter(skd=>skd.kd == kd && skd.jenistagihan=='PAS');
                                }else{
                                    ob_kd.data_PASPAK = refkds.filter(skd=>skd.kd == kd && skd.jenistagihan=='PAK');
                                    if(this.jenjang == 6){
                                        ob_kd.data_USTerulis = refkds.filter(skd=>skd.kd == kd && skd.jenistagihan=='ustertulis');
                                    }
                                }
                                
                                //olah nilai kurtilas;
                                //PH, ambil nilai tertingginya;
                                let nilai_ph_kdini = 0;
                                let objek_ph_maks = null;
                                let pembagi = 0;
                                if(data_PH.length>0){
                                    let avoid_null = data_PH.filter(fph=>fph.nilai_tagihan!=="");
                                    if(avoid_null.length>0){
                                        let maping_ph = avoid_null.map(nph=>Number(nph.nilai_tagihan));
                                        let max = Math.max(...maping_ph);
                                        let indeksMax = avoid_null.findIndex(s=> s.jenistagihan == max);
    
                                        objek_ph_maks = data_PH[indeksMax];
                                        nilai_ph_kdini = (max * 2);
                                        pembagi = 2;
                                    }

                                }
                                
                                let nilai_pts_kdini = 0;
                                
                                if(data_PTS.length>0){
                                    let avoid_null = data_PTS.filter(s=> s.tagihan!=="");
                                    if(avoid_null.length>0){
                                        let maping = avoid_null.map(npts=>Number(npts.nilai_tagihan));
                                        let jumlah = maping.reduce((a,b)=>a+b);
                                        let rerata = Number((jumlah/avoid_null.length).toFixed(2));
                                        nilai_pts_kdini = rerata;
                                        pembagi+=1;
                                    }
                                }

                                let nilai_paspak_kdini = 0;
                                if(data_PASPAK.length>0){
                                    let avoid_null = data_PASPAK.filter(s=> s.tagihan!=="");
                                    if(avoid_null.length>0){
                                        let maping = avoid_null.map(npts=>Number(npts.nilai_tagihan));
                                        let jumlah = maping.reduce((a,b)=>a+b);
                                        let rerata = Number((jumlah/avoid_null.length).toFixed(2));
                                        nilai_paspak_kdini = rerata;
                                        pembagi+=1;
                                    }

                                }

                                let jumlah_kd_daritagihan = (nilai_ph_kdini+nilai_pts_kdini+nilai_paspak_kdini);
                                let nilai_kd = 0;
                                if(pembagi>0){
                                    nilai_kd = Number((jumlah_kd_daritagihan/pembagi).toFixed(2));
                                }

                                ob_kd.nilai_kd = nilai_kd;

                                
                            // let nilai_start_maks = 100;
                            // let nilai_start_min=0;
                            // let objek_kdmaks = null;
                            // let objek_kdmin = null;
                                if(nilai_start_maks>nilai_kd){
                                    nilai_start_maks = nilai_kd;
                                    objek_kdmin = kd_propertikurikulum[kd_propertikurikulum.length-1].propertikurikulum.objek_kd[0];
                                }
                                if(nilai_start_min < nilai_kd){
                                    nilai_start_min = nilai_kd;
                                    objek_kdmaks = kd_propertikurikulum[kd_propertikurikulum.length-1].propertikurikulum.objek_kd[0];
                                }
                                ar_nilaimapel_byKds_hasCollectiioning.push(nilai_kd);
                                ar_kds.push(ob_kd);
                            });
                            ob._nilai_array_refrensi_nilai_mapel = ar_nilaimapel_byKds_hasCollectiioning;
                            ob._nilai_mapel = 0;
                            ob.predikat_mapel = this.findPredikatByNilai(0);
                            if(ar_nilaimapel_byKds_hasCollectiioning.length>0){
                                let avoid_null = ar_nilaimapel_byKds_hasCollectiioning.filter(snull => snull!=0);
                                if(avoid_null.length>0){
                                    let reducing = ar_nilaimapel_byKds_hasCollectiioning.reduce((a,b)=>a+b);
                                    let rerata = (reducing/ar_nilaimapel_byKds_hasCollectiioning.length);
                                    ob._nilai_mapel = rerata;
                                    ob.predikat_mapel = this.findPredikatByNilai(rerata);
                                }
                            }


                            ob._nilai_maks = nilai_start_min;
                            ob._nilai_min = nilai_start_maks;
                            ob._nilai_maks_properti_kurikulum = objek_kdmaks;
                            ob._nilai_min_properti_kurikulum = objek_kdmin;
                            
                            ob.tipeKebutuhanPH = tipeKebutuhanPH;
                            ob._kurtilas_uniqueKD = kds ;
                            ob._kurtilas_uniqueKD_data = ar_kds ;
                            ob._need_loaded_semestersebelumnya = ar_kds.length==0 ;
                        }

                        result.push(ob);
                    })
                    return result;
                })


    }
}