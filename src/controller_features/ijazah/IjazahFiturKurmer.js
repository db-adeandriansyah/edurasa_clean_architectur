export default class IjazahFiturKurmer{

    constructor(orm,siswa){
        this.orm = orm;
        this.service = orm.kbmFitur.banksoalservice;
        this.allsiswa = siswa;
        this.classEdu = this.orm.kbmFitur.collectionClass;
        this.collectionSiswa = null;
        this.definisiMapelSiswa = {
            'ISLAM':{
                        kodemapel:'PAI',
                        mapelteks:'Pendidikan Agama Islam dan Budi Pekerti'
                    },
            'KRISTEN':{
                        kodemapel:'PKRIS',
                        mapelteks:'Pendidikan Agama Kristen dan Budi Pekerti'
                    },
                    
            'KATHOLIK':{
                        kodemapel:'PKATO',
                        mapelteks:'Pendidikan Agama Katholik dan Budi Pekerti'
                    },
                    
            'KATOLIK':{
                        kodemapel:'PKATO',
                        mapelteks:'Pendidikan Agama Katholik dan Budi Pekerti'
                    },
            'KHATOLIK':{
                        kodemapel:'PKATO',
                        mapelteks:'Pendidikan Agama Katholik dan Budi Pekerti'
                    },
                    
        };
    }
    createRefrensi(){
        let arKol = [];
        let currentTapel = 2425;
        [6,5].forEach(item=>{
            let t_ = 't_' +currentTapel+'_s_';
            [1,2].forEach(semester=>{
                let kode = t_ + semester;
                let findApi = this.service.repo.otherMacro(kode);
                ['A','B','C'].forEach(abjad=>{
                    let prefix = 'db_raport_kelas_'+item+abjad+'_semester_'+semester
                    let ob = {
                        'tabdb':prefix,
                        'kelas':item,
                        'hasCalled':this.service.data.hasOwnProperty(prefix),
                        'kode' :kode,
                        'tab' : 'nilai_raport_' +item+abjad,
                        'idss' : findApi['ss_nilai_'+item],
                        'findApi':findApi,
                        'semester':semester
                    };
                    arKol.push(ob);
                });
            });
            currentTapel -= 101;
            
        });
        return arKol;
    }
    async onlyCallNeeded(){
        const paramRefrensi = this.createRefrensi();
        const onlyDoesntCalled = paramRefrensi.filter(s=>!s.hasCalled);
        if(onlyDoesntCalled.length>0){
            //semester 1
            if(onlyDoesntCalled.filter(s=>s.semester==1).length>0){
                await this.service.callPropertiMultipleWithPrefik(onlyDoesntCalled.filter(s=>s.semester==1));
            }
            if(onlyDoesntCalled.filter(s=>s.semester==2).length>0){
            //semester 2
            await this.service.callPropertiMultipleWithPrefik(onlyDoesntCalled.filter(s=>s.semester==2));
            }
        }
        

    };
    titleCase(str){
        return str.replace(
            /\w\S*/g,
            function(txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
          );
    }
    async init(){
        await this.onlyCallNeeded();
        const mapel = this.orm.labelNonAgamaIncludeMulok.filter(s=>s.value!=='BING');
        //ormSiswa;
        console.log(mapel);
        this.collectionSiswa = new this.classEdu(this.allsiswa)
                            .simpleFilter({'jenjang':6})
                            .setProperty('pd_agama',(item)=>item==""?"ISLAM":item)
                            .addProperty('ortu_di_ijazah',(item)=>item.pd_namaayah)
                            .addProperty('tempat_tanggal_lahir',(item)=>{
                                let text = '';
                                text +=this.titleCase(item.pd_tl);
                                text +=`, `
                                text += item.pd_tanggallahir==""?"":new Date(item.pd_tanggallahir).toLocaleString('id-ID',{dateStyle:'long'})
                                return text;
                            })
                            .addProperty('mapel_agama_kode',(item)=>this.definisiMapelSiswa[item.pd_agama].kodemapel)
                            .addProperty('mapel_agama_kode_teks',(item)=>this.definisiMapelSiswa[item.pd_agama].mapelteks)
                            .addProperty('olah_ijazah',item=>{
                                let result = [];
                                let koleksiNilai = [];
                                
                                let abjadrombel = (item.nama_rombel).match(/[A-D]/);
                                const db = this.service.data;
                                const nAgama_k5_s1 = db['db_raport_kelas_5'+abjadrombel+'_semester_1'].find(s=>s.id==item.id)?.[item.mapel_agama_kode];
                                const nAgama_k5_s2 = db['db_raport_kelas_5'+abjadrombel+'_semester_2'].find(s=>s.id==item.id)?.[item.mapel_agama_kode];
                                const nAgama_k6_s1 = db['db_raport_kelas_6'+abjadrombel+'_semester_1'].find(s=>s.id==item.id)?.[item.mapel_agama_kode];
                                const nAgama_k6_s2 = db['db_raport_kelas_6'+abjadrombel+'_semester_2'].find(s=>s.id==item.id)?.[item.mapel_agama_kode];
                                const arrayAgama = [nAgama_k5_s1,nAgama_k5_s2,nAgama_k6_s1,nAgama_k6_s2];
                                const nIjazahAgama = (arrayAgama.map(n=>n?Number(n):0).reduce((a,b)=>a+b)/arrayAgama.length).toFixed(2);

                                //agama
                                let obAgama = {
                                    'mapel':'Pendidikan Agama dan Budi Pekerti',
                                    'mapel_kategori':'Agama',
                                    'mapel_kode':item.mapel_agama_kode,
                                    'mapel_kode_teks':item.mapel_agama_kode_teks,
                                    'n_k5_s1':nAgama_k5_s1,
                                    'n_k5_s2':nAgama_k5_s2,
                                    'n_k6_s1':nAgama_k6_s1,
                                    'n_k6_s2':nAgama_k6_s2,
                                    'n_array':arrayAgama,
                                    'n_rerata':nIjazahAgama
                                }
                                result.push(obAgama);
                                mapel.forEach(m=>{
                                    let curr_n_k5_s1 = db['db_raport_kelas_5'+abjadrombel+'_semester_1'].find(s=>s.id == item.id)?.[m.value];
                                    let curr_n_k5_s2 = db['db_raport_kelas_5'+abjadrombel+'_semester_2'].find(s=>s.id == item.id)?.[m.value];
                                    let curr_n_k6_s1 = db['db_raport_kelas_6'+abjadrombel+'_semester_1'].find(s=>s.id == item.id)?.[m.value];
                                    let curr_n_k6_s2 = db['db_raport_kelas_6'+abjadrombel+'_semester_2'].find(s=>s.id == item.id)?.[m.value];
                                    let arrCurr = [curr_n_k5_s1,curr_n_k5_s2,curr_n_k6_s1,curr_n_k6_s2];
                                    let nIjazah = (arrCurr.map(n=>n!==""?Number(n):0).reduce((a,b)=>a+b)/arrCurr.length).toFixed(2);
                                    let ob = {
                                    'mapel':m.label,
                                    'mapel_kategori':m.value=='BSUND'?'Mulok':'Nasional',
                                    'mapel_kode':m.value,
                                    'mapel_kode_teks':m.label,
                                    'n_k5_s1':curr_n_k5_s1,
                                    'n_k5_s2':curr_n_k5_s2,
                                    'n_k6_s1':curr_n_k6_s1,
                                    'n_k6_s2':curr_n_k6_s2,
                                    'n_array':arrCurr,
                                    'n_rerata':nIjazah,
                                    }
                                    result.push(ob);

                                })
                                return result;
                            })
                            ;
        //mapelagama
        

    }

    


    
}