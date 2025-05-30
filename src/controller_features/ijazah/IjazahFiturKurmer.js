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
        //TAMBAHAN API_IJAZAH;
        let prefix = 'db_server_ijazah_6';
        let kode = 't_' +currentTapel+'_s_2';
        let findApi = this.service.repo.otherMacro(kode);
        let oblulusan = {
            'tabdb':prefix,
            'kelas':6,
            'hasCalled':this.service.data.hasOwnProperty(prefix),
            'kode' :kode,
            'tab' : 'nilai_ijazah_6',
            'idss' : findApi['ss_nilai_6'],
            'findApi':findApi,
            'semester':2
        };
        arKol.push(oblulusan);
        [6,5,4].forEach(item=>{
            let t_ = 't_' +currentTapel+'_s_';
            [1,2].forEach(semester=>{
                let kode = t_ + semester;
                let findApi = this.service.repo.otherMacro(kode);
                ['A','B','C'].forEach(abjad=>{
                    let prefix = 'db_raport_kelas_'+item+abjad+'_semester_'+semester;
                    let tabkelas4 = semester ==2?'raportkumer_'+item+abjad:'newRekapRaport_kurmer_'+item+abjad;
                    let ob = {
                        'tabdb':prefix,
                        'kelas':item,
                        'hasCalled':this.service.data.hasOwnProperty(prefix),
                        'kode' :kode,
                        'tab' : item==4?tabkelas4:'nilai_raport_' +item+abjad,
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
        console.log(paramRefrensi);
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
    async shouldCallNeeded(){
        const paramRefrensi = this.createRefrensi();
        console.log(paramRefrensi);
        const onlyDoesntCalled = paramRefrensi;
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
        console.log(this.service.data);
        const mapel = this.orm.labelNonAgamaIncludeMulok;//.filter(s=>s.value!=='BING');
        //ormSiswa;
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
                                    'title':'Agama',
                                    'mapel_kode':item.mapel_agama_kode,
                                    'mapel_kode_teks':item.mapel_agama_kode_teks,
                                    'n_k5_s1':nAgama_k5_s1,
                                    'n_k5_s2':nAgama_k5_s2,
                                    'n_k6_s1':nAgama_k6_s1,
                                    'n_k6_s2':nAgama_k6_s2,
                                    'n_array':arrayAgama,
                                    'n_rerata':nIjazahAgama
                                }
                                koleksiNilai.push(nIjazahAgama);
                                result.push(obAgama);
                                mapel.forEach(m=>{
                                    let curr_n_k5_s1 = db['db_raport_kelas_5'+abjadrombel+'_semester_1'].find(s=>s.id == item.id)?.[m.value];
                                    let curr_n_k5_s2 = db['db_raport_kelas_5'+abjadrombel+'_semester_2'].find(s=>s.id == item.id)?.[m.value];
                                    let curr_n_k6_s1 = db['db_raport_kelas_6'+abjadrombel+'_semester_1'].find(s=>s.id == item.id)?.[m.value];
                                    let curr_n_k6_s2 = db['db_raport_kelas_6'+abjadrombel+'_semester_2'].find(s=>s.id == item.id)?.[m.value];
                                    let arrCurr = [curr_n_k5_s1,curr_n_k5_s2,curr_n_k6_s1,curr_n_k6_s2];
                                    let cegahKosong = arrCurr.map(n=>n?Number(n):false).filter(s=>s!==false);
                                    
                                    let nIjazah = (cegahKosong.reduce((a,b)=>a+b)/cegahKosong.length).toFixed(2);
                                    let ob = {
                                    'mapel':m.label,
                                    'mapel_kategori':(m.value=='BSUND'||m.value=='BING')?'Mulok':'Nasional',
                                    'mapel_kode':m.value,
                                    'title':m.value,
                                    'mapel_kode_teks':m.label,
                                    'n_k5_s1':curr_n_k5_s1??"",
                                    'n_k5_s2':curr_n_k5_s2??"",
                                    'n_k6_s1':curr_n_k6_s1??"",
                                    'n_k6_s2':curr_n_k6_s2??"",
                                    'n_array':arrCurr,
                                    'n_rerata':nIjazah,
                                    }
                                    koleksiNilai.push(nIjazah);
                                    result.push(ob);

                                });
                                return result;
                            })
                            .addProperty('nilai_akhir_ijazah',item=>{
                                let datanilai = item.olah_ijazah.map(n=>Number(n.n_rerata));
                                let totalnilai = datanilai.reduce((a,b)=>a+b);
                                let nilaiakhir = (totalnilai/datanilai.length).toFixed(2);
                                let ob = {
                                    'array':datanilai,
                                    'total' :totalnilai,
                                    'nilai' :nilaiakhir
                                }
                                return ob;

                            })
                            .addProperty('nilai_5_semester',item=>{
                                 let result = [];
                                let koleksiNilai = [];
                                
                                let abjadrombel = (item.nama_rombel).match(/[A-D]/);
                                const db = this.service.data;
                                const nAgama_k4_s1 = db['db_raport_kelas_4'+abjadrombel+'_semester_1'].find(s=>s.id==item.id)?.[item.mapel_agama_kode];
                                const nAgama_k4_s2 = db['db_raport_kelas_4'+abjadrombel+'_semester_2'].find(s=>s.id==item.id)?.[item.mapel_agama_kode];
                                const nAgama_k5_s1 = db['db_raport_kelas_5'+abjadrombel+'_semester_1'].find(s=>s.id==item.id)?.[item.mapel_agama_kode];
                                const nAgama_k5_s2 = db['db_raport_kelas_5'+abjadrombel+'_semester_2'].find(s=>s.id==item.id)?.[item.mapel_agama_kode];
                                const nAgama_k6_s1 = db['db_raport_kelas_6'+abjadrombel+'_semester_1'].find(s=>s.id==item.id)?.[item.mapel_agama_kode];
                                
                                const arrayAgama = [nAgama_k4_s1,nAgama_k4_s2,nAgama_k5_s1,nAgama_k5_s2,nAgama_k6_s1];
                                let cegahKosongAgama = arrayAgama.map(n=>n?Number(n):false).filter(s=>s!==false);
                                    
                                let nIjazahAgama = (cegahKosongAgama.reduce((a,b)=>a+b)/cegahKosongAgama.length).toFixed(2);
                                    
                                //agama
                                let obAgama = {
                                    'mapel':'Pendidikan Agama dan Budi Pekerti',
                                    'mapel_kategori':'Agama',
                                    'title':'Agama',
                                    'mapel_kode':item.mapel_agama_kode,
                                    'mapel_kode_teks':item.mapel_agama_kode_teks,
                                    'n_k4_s1':nAgama_k4_s1??"",
                                    'n_k4_s2':nAgama_k4_s2??"",
                                    'n_k5_s1':nAgama_k5_s1??"",
                                    'n_k5_s2':nAgama_k5_s2??"",
                                    'n_k6_s1':nAgama_k6_s1??"",
                                    'n_array':arrayAgama,
                                    'n_rerata':nIjazahAgama
                                }
                                
                                result.push(obAgama);
                                mapel.filter(s=>['PKN','BINDO','MTK','IPAS'].includes(s.value)).forEach(m=>{
                                    let curr_n_k4_s1 = db['db_raport_kelas_4'+abjadrombel+'_semester_1'].find(s=>s.id == item.id)?.[m.value];
                                    let curr_n_k4_s2 = db['db_raport_kelas_4'+abjadrombel+'_semester_2'].find(s=>s.id == item.id)?.[m.value];
                                    let curr_n_k5_s1 = db['db_raport_kelas_5'+abjadrombel+'_semester_1'].find(s=>s.id == item.id)?.[m.value];
                                    let curr_n_k5_s2 = db['db_raport_kelas_5'+abjadrombel+'_semester_2'].find(s=>s.id == item.id)?.[m.value];
                                    let curr_n_k6_s1 = db['db_raport_kelas_6'+abjadrombel+'_semester_1'].find(s=>s.id == item.id)?.[m.value];
                                    // let curr_n_k6_s2 = db['db_raport_kelas_6'+abjadrombel+'_semester_2'].find(s=>s.id == item.id)?.[m.value];
                                    let arrCurr = [curr_n_k4_s1,curr_n_k4_s2,curr_n_k5_s1,curr_n_k5_s2,curr_n_k6_s1];
                                    let cegahKosong = arrCurr.map(n=>n?Number(n):false).filter(s=>s!==false);
                                    
                                    let nIjazah = (cegahKosong.reduce((a,b)=>a+b)/cegahKosong.length).toFixed(2);
                                    let ob = {
                                    'mapel':m.label,
                                    'mapel_kategori':(m.value=='BSUND'||m.value=='BING')?'Mulok':'Nasional',
                                    'mapel_kode':m.value,
                                    'title':m.value,
                                    'mapel_kode_teks':m.label,
                                    'n_k4_s1':curr_n_k4_s1??"",
                                    'n_k4_s2':curr_n_k4_s2??"",
                                    'n_k5_s1':curr_n_k5_s1??"",
                                    'n_k5_s2':curr_n_k5_s2??"",
                                    'n_k6_s1':curr_n_k6_s1??"",
                                    
                                    'n_array':arrCurr,
                                    'n_rerata':nIjazah,
                                    }
                                    
                                    result.push(ob);

                                });
                                return result;
                            })
                            .addProperty('rerata_akhir_5_semester',item=>{
                                let datanilai = item.nilai_5_semester.map(n=>Number(n.n_rerata));
                                let totalnilai = datanilai.reduce((a,b)=>a+b);
                                let nilaiakhir = (totalnilai/datanilai.length).toFixed(2);
                                let ob = {
                                    'array':datanilai,
                                    'total' :totalnilai,
                                    'nilai' :nilaiakhir
                                }
                                return ob;
                            })
                            .addProperty('is_pindahan',item=>{
                                let pindahan = false;
                                //pindahan jika NIS='1920_01_001;
                                if(item.nis.slice(4,6)!=='01'){
                                    pindahan = {
                                        'pindahan' : true,
                                        'nis':item.nis,
                                        'masuk_tgl' : item.masuk_tgl,
                                        'sekolah_asal': item.dapo_sekolahasal

                                    }
                                }
                                return pindahan;
                            })
                            .addProperty('no_ijazah',item=>{
                                let db = this.service.data;
                                let no_ijazah = db?.['db_server_ijazah_6'].find(s=>s.id == item.id);
                                return no_ijazah?.no_ijazah ??'';
                            })
                            .addProperty('tanggal_kelulusan',item=>{
                                let db = this.service.data;
                                let no_ijazah = db['db_server_ijazah_6'].find(s=>s.id == item.id);
                                return no_ijazah.tanggal_kelulusan ??'';
                            }).addProperty('no_surat',item=>{
                                let db = this.service.data;
                                let no_ijazah = db['db_server_ijazah_6'].find(s=>s.id == item.id);
                                return no_ijazah.no_surat ??'';
                            })
                            ;
        //mapelagama
        

    }
    bodyParamNilaiIjazah(tgl){
        let arr = this.collectionSiswa.simpleFilter({'jenjang':6}).data;
        let mapel = arr[0].olah_ijazah.map(n=>n.title);
        let arHeader = ['id','pd_nama','nis','nisn','tanggal_kelulusan', ...mapel,'no_ijazah','rerataijazah'];
        let arrKontent = [];
        arr.forEach(item=>{
            let data = {};
            arHeader.forEach(db=>{
                if(db=='tanggal_kelulusan'){
                data[db] = new Date(tgl);
                }else if(db =='rerataijazah'){

                    data[db] = item.nilai_akhir_ijazah.nilai??"";
                }else{
                    data[db] = item[db]??"";
                }
            })
            
            arrKontent.push(data);
        })
        return arrKontent;
    }
    async forceInit(){
        await this.shouldCallNeeded();
        await this.init();
    }

    


    
}