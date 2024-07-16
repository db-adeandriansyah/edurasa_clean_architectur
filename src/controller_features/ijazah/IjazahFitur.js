export default class IjazahFitur{
    constructor(service,ormSiswa){
        this.service = service;
        this.ormSiswa = ormSiswa;
        
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
    kelas5semester1_k3(rombel){
        //berlaku untuk tapel 2223 semester 1
        return this.service.data['kelas5semester1_newRekapRaport_'+rombel+'_k3_'+rombel]
    }
    kelas5semester1_k4(rombel){
        //berlaku untuk tapel 2223 semester 1
        return this.service.data['kelas5semester1_newRekapRaport_'+rombel+'_k4_'+rombel]
    }
    kelas5semester2_k3(rombel){
        ////berlaku untuk tapel 2223 semester 2
        return this.service.data['kelas5semester2_newRekapRaport_k3_'+rombel]
    }
    kelas5semester2_k4(rombel){
        //berlaku untuk tapel 2223 semester 2
        return this.service.data['kelas5semester2_newRekapRaport_K4_'+rombel]
    }
    kelas6semester1(rombel){
        return this.service.data['kelas6semester1_nilai_raport_'+rombel];
    }
    kelas6semester2(rombel){
        return this.service.data['nilai_raport_'+rombel];
    }
    titleCase(str){
        return str.replace(
            /\w\S*/g,
            function(txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
          );
    }
    init(){
        this.ormSiswa.addProperty('olah_ijazah',(item)=>{
            let sebaranMapel = item.sebaran_mapel;
            // (this.fokusRombel).match(/[A-D]/)
            let abjadrombel = (item.nama_rombel).match(/[A-D]/);
            let result = [];
            sebaranMapel.forEach(mapel=>{
                let ob={};
                let kodemapel = mapel.kodemapel;
                let kodemapel_teks = mapel.kodemapel_teks;
                let tipemapel = mapel.tipemapel;
                let kodemapel_umum = tipemapel=='agama'?'AGAMA':kodemapel;
                let kodemapel_by_siswa = tipemapel=='agama'?item.mapel_agama_kode:kodemapel;

                let kelas5semester1_k3 = this.kelas5semester1_k3('5'+abjadrombel);
                let kelas5semester1_k4 = this.kelas5semester1_k4('5'+abjadrombel);
                let kelas5semester2_k3 = this.kelas5semester2_k3('5'+abjadrombel);
                let kelas5semester2_k4 = this.kelas5semester2_k4('5'+abjadrombel);
                let kelas6semester1     = this.kelas6semester1('6'+abjadrombel);
                let kelas6semester2     = this.kelas6semester2('6'+abjadrombel);
                // ob.kelas5semester1_k3   = kelas5semester1_k3
                // ob.kelas5semester1_k4   = kelas5semester1_k4
                // ob.kelas5semester2_k3   = kelas5semester2_k3
                // ob.kelas5semester2_k4   = kelas5semester2_k4
                // ob.kelas6semester1      = kelas6semester1   
                // ob.kelas6semester2      = kelas6semester2   
                // // kelas 5 semester 1
                let siswa_k5s1_k3           = kelas5semester1_k3.filter(s=>s.namasiswa == item.pd_nama);
                let siswa_k5s1_k3_nilai     = siswa_k5s1_k3.length>0?Number(siswa_k5s1_k3[0][kodemapel_umum]):0;
                let siswa_k5s1_k4           = kelas5semester1_k4.filter(s=>s.namasiswa == item.pd_nama);
                let siswa_k5s1_k4_nilai     = siswa_k5s1_k4.length>0?Number(siswa_k5s1_k4[0][kodemapel_umum]):0;
                let siswa_k5s1_rerata       = Number(((siswa_k5s1_k3_nilai + siswa_k5s1_k4_nilai)/2).toFixed(2));
                //kelas 5 semester 2
                let siswa_k5s2_k3           = kelas5semester2_k3.filter(s=>s.namasiswa == item.pd_nama);
                let siswa_k5s2_k3_nilai     = siswa_k5s2_k3.length>0?Number(siswa_k5s2_k3[0][kodemapel_umum]):0;
                let siswa_k5s2_k4           = kelas5semester2_k4.filter(s=>s.namasiswa == item.pd_nama);
                let siswa_k5s2_k4_nilai     = siswa_k5s2_k4.length>0?Number(siswa_k5s2_k4[0][kodemapel_umum]):0;
                let siswa_k5s2_rerata       = Number(((siswa_k5s2_k3_nilai + siswa_k5s2_k4_nilai)/2).toFixed(2));
                //kelas 6 semester 1
                let siswa_k6s1              = kelas6semester1.filter(s=>s.namasiswa == item.pd_nama);
                let siswa_k6s1_k3_nilai     = siswa_k6s1.length>0?Number(siswa_k6s1[0][kodemapel_by_siswa]):0;
                let siswa_k6s1_k4_nilai     = siswa_k6s1.length>0?Number(siswa_k6s1[0][kodemapel_by_siswa+'_NILAI_KETERAMPILAN']??0):0;
                let siswa_k6s1_rerata       = Number(((siswa_k6s1_k3_nilai + siswa_k6s1_k4_nilai)/2).toFixed(2));
                //kelas 6 semester 2 (current tapel)
                let siswa_k6s2           = kelas6semester2.filter(s=>s.namasiswa == item.pd_nama);
                let siswa_k6s2_k3_nilai     = siswa_k6s2.length>0?Number(siswa_k6s2[0][kodemapel_by_siswa]):0;
                let siswa_k6s2_k4_nilai     = siswa_k6s2.length>0?Number(siswa_k6s2[0][kodemapel_by_siswa+'_NILAI_KETERAMPILAN']??0):0;
                let siswa_k6s2_rerata       = Number(((siswa_k6s2_k3_nilai + siswa_k6s2_k4_nilai)/2).toFixed(2));

                let nilai_ijazah_mapel_ini = Number(((siswa_k5s1_rerata  + siswa_k5s2_rerata  + siswa_k6s1_rerata  +siswa_k6s2_rerata)/4).toFixed(2));




                
                ob.kodemapel_umum = tipemapel=='agama'?'AGAMA':kodemapel;
                ob.kodemapel_umum_teks = tipemapel=='agama'?'Pendidikan Agama dan Budi Pekerti':kodemapel_teks;

                ob.k5s1_k3_nilai  = siswa_k5s1_k3_nilai  ;
                ob.k5s1_k4_nilai  = siswa_k5s1_k4_nilai  ;
                ob.k5s1_rerata    = siswa_k5s1_rerata    ;
                ob.k5s2_k3_nilai  = siswa_k5s2_k3_nilai  ;
                ob.k5s2_k4_nilai  = siswa_k5s2_k4_nilai  ;
                ob.k5s2_rerata    = siswa_k5s2_rerata    ;
                ob.k6s1_k3_nilai  = siswa_k6s1_k3_nilai  ;
                ob.k6s1_k4_nilai  = siswa_k6s1_k4_nilai  ;
                ob.k6s1_rerata    = siswa_k6s1_rerata    ;
                ob.k6s2_k3_nilai  = siswa_k6s2_k3_nilai  ;
                ob.k6s2_k4_nilai  = siswa_k6s2_k4_nilai  ;
                ob.k6s2_rerata    = siswa_k6s2_rerata    ;
                ob.nilai_ijazah   = nilai_ijazah_mapel_ini;

                
                result.push(ob);

            });
            return result;
        })
    }
    
    allInit(collection,mapelnonagama){
        let result = new collection(this.ormSiswa)
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
        .addProperty('olah_ijazah',(item)=>{
            let sebaranMapel = mapelnonagama;
            // (this.fokusRombel).match(/[A-D]/)
            let abjadrombel = (item.nama_rombel).match(/[A-D]/);
            let result = [];
                let ob={};  
                let kodemapel = item.mapel_agama_kode;
                let kodemapel_teks = item.mapel_agama_kode_teks;
                let tipemapel = 'agama';
                let kodemapel_umum = tipemapel=='agama'?'AGAMA':kodemapel;
                let kodemapel_by_siswa = tipemapel=='agama'?item.mapel_agama_kode:kodemapel;

                let kelas5semester1_k3 = this.kelas5semester1_k3('5'+abjadrombel);
                let kelas5semester1_k4 = this.kelas5semester1_k4('5'+abjadrombel);
                let kelas5semester2_k3 = this.kelas5semester2_k3('5'+abjadrombel);
                let kelas5semester2_k4 = this.kelas5semester2_k4('5'+abjadrombel);
                let kelas6semester1     = this.kelas6semester1('6'+abjadrombel);
                let kelas6semester2     = this.kelas6semester2('6'+abjadrombel);
                ob.kelas5semester1_k3   = kelas5semester1_k3
                ob.kelas5semester1_k4   = kelas5semester1_k4
                ob.kelas5semester2_k3   = kelas5semester2_k3
                ob.kelas5semester2_k4   = kelas5semester2_k4
                ob.kelas6semester1      = kelas6semester1   
                ob.kelas6semester2      = kelas6semester2   
                // kelas 5 semester 1
                let siswa_k5s1_k3           = kelas5semester1_k3.filter(s=>s.namasiswa == item.pd_nama);
                let siswa_k5s1_k3_nilai     = siswa_k5s1_k3.length>0?Number(siswa_k5s1_k3[0][kodemapel_umum]):0;
                let siswa_k5s1_k4           = kelas5semester1_k4.filter(s=>s.namasiswa == item.pd_nama);
                let siswa_k5s1_k4_nilai     = siswa_k5s1_k4.length>0?Number(siswa_k5s1_k4[0][kodemapel_umum]):0;
                let siswa_k5s1_rerata       = Number(((siswa_k5s1_k3_nilai + siswa_k5s1_k4_nilai)/2).toFixed(2));
                //kelas 5 semester 2
                let siswa_k5s2_k3           = kelas5semester2_k3.filter(s=>s.namasiswa == item.pd_nama);
                let siswa_k5s2_k3_nilai     = siswa_k5s2_k3.length>0?Number(siswa_k5s2_k3[0][kodemapel_umum]):0;
                let siswa_k5s2_k4           = kelas5semester2_k4.filter(s=>s.namasiswa == item.pd_nama);
                let siswa_k5s2_k4_nilai     = siswa_k5s2_k4.length>0?Number(siswa_k5s2_k4[0][kodemapel_umum]):0;
                let siswa_k5s2_rerata       = Number(((siswa_k5s2_k3_nilai + siswa_k5s2_k4_nilai)/2).toFixed(2));
                //kelas 6 semester 1
                let siswa_k6s1              = kelas6semester1.filter(s=>s.namasiswa == item.pd_nama);
                let siswa_k6s1_k3_nilai     = siswa_k6s1.length>0?Number(siswa_k6s1[0][kodemapel_by_siswa]):0;
                let siswa_k6s1_k4_nilai     = siswa_k6s1.length>0?Number(siswa_k6s1[0][kodemapel_by_siswa+'_NILAI_KETERAMPILAN']??0):0;
                let siswa_k6s1_rerata       = Number(((siswa_k6s1_k3_nilai + siswa_k6s1_k4_nilai)/2).toFixed(2));
                //kelas 6 semester 2 (current tapel)
                let siswa_k6s2           = kelas6semester2.filter(s=>s.namasiswa == item.pd_nama);
                let siswa_k6s2_k3_nilai     = siswa_k6s2.length>0?Number(siswa_k6s2[0][kodemapel_by_siswa]):0;
                let siswa_k6s2_k4_nilai     = siswa_k6s2.length>0?Number(siswa_k6s2[0][kodemapel_by_siswa+'_NILAI_KETERAMPILAN']??0):0;
                let siswa_k6s2_rerata       = Number(((siswa_k6s2_k3_nilai + siswa_k6s2_k4_nilai)/2).toFixed(2));

                let nilai_ijazah_mapel_ini = Number(((siswa_k5s1_rerata  + siswa_k5s2_rerata  + siswa_k6s1_rerata  +siswa_k6s2_rerata)/4).toFixed(2));




                
                ob.kodemapel_umum = tipemapel=='agama'?'AGAMA':kodemapel;
                ob.kodemapel_umum_teks = tipemapel=='agama'?'Pendidikan Agama dan Budi Pekerti':kodemapel_teks;

                ob.k5s1_k3_nilai  = siswa_k5s1_k3_nilai  ;
                ob.k5s1_k4_nilai  = siswa_k5s1_k4_nilai  ;
                ob.k5s1_rerata    = siswa_k5s1_rerata    ;
                ob.k5s2_k3_nilai  = siswa_k5s2_k3_nilai  ;
                ob.k5s2_k4_nilai  = siswa_k5s2_k4_nilai  ;
                ob.k5s2_rerata    = siswa_k5s2_rerata    ;
                ob.k6s1_k3_nilai  = siswa_k6s1_k3_nilai  ;
                ob.k6s1_k4_nilai  = siswa_k6s1_k4_nilai  ;
                ob.k6s1_rerata    = siswa_k6s1_rerata    ;
                ob.k6s2_k3_nilai  = siswa_k6s2_k3_nilai  ;
                ob.k6s2_k4_nilai  = siswa_k6s2_k4_nilai  ;
                ob.k6s2_rerata    = siswa_k6s2_rerata    ;
                ob.nilai_ijazah   = nilai_ijazah_mapel_ini;

                result.push(ob);


            sebaranMapel.forEach(mapel=>{
                let ob={};
                let kodemapel = mapel.value;//mapel.kodemapel;
                let kodemapel_teks = mapel.label;//mapel.kodemapel_teks;
                let tipemapel = 'nonagama';
                let kodemapel_umum = tipemapel=='agama'?'AGAMA':kodemapel;
                let kodemapel_by_siswa = tipemapel=='agama'?item.mapel_agama_kode:kodemapel;

                let kelas5semester1_k3 = this.kelas5semester1_k3('5'+abjadrombel);
                let kelas5semester1_k4 = this.kelas5semester1_k4('5'+abjadrombel);
                let kelas5semester2_k3 = this.kelas5semester2_k3('5'+abjadrombel);
                let kelas5semester2_k4 = this.kelas5semester2_k4('5'+abjadrombel);
                let kelas6semester1     = this.kelas6semester1('6'+abjadrombel);
                let kelas6semester2     = this.kelas6semester2('6'+abjadrombel);
                // ob.kelas5semester1_k3   = kelas5semester1_k3
                // ob.kelas5semester1_k4   = kelas5semester1_k4
                // ob.kelas5semester2_k3   = kelas5semester2_k3
                // ob.kelas5semester2_k4   = kelas5semester2_k4
                // ob.kelas6semester1      = kelas6semester1   
                // ob.kelas6semester2      = kelas6semester2   
                // // kelas 5 semester 1
                let siswa_k5s1_k3           = kelas5semester1_k3.filter(s=>s.namasiswa == item.pd_nama);
                let siswa_k5s1_k3_nilai     = siswa_k5s1_k3.length>0?Number(siswa_k5s1_k3[0][kodemapel_umum]):0;
                let siswa_k5s1_k4           = kelas5semester1_k4.filter(s=>s.namasiswa == item.pd_nama);
                let siswa_k5s1_k4_nilai     = siswa_k5s1_k4.length>0?Number(siswa_k5s1_k4[0][kodemapel_umum]):0;
                let siswa_k5s1_rerata       = Number(((siswa_k5s1_k3_nilai + siswa_k5s1_k4_nilai)/2).toFixed(2));
                //kelas 5 semester 2
                let siswa_k5s2_k3           = kelas5semester2_k3.filter(s=>s.namasiswa == item.pd_nama);
                let siswa_k5s2_k3_nilai     = siswa_k5s2_k3.length>0?Number(siswa_k5s2_k3[0][kodemapel_umum]):0;
                let siswa_k5s2_k4           = kelas5semester2_k4.filter(s=>s.namasiswa == item.pd_nama);
                let siswa_k5s2_k4_nilai     = siswa_k5s2_k4.length>0?Number(siswa_k5s2_k4[0][kodemapel_umum]):0;
                let siswa_k5s2_rerata       = Number(((siswa_k5s2_k3_nilai + siswa_k5s2_k4_nilai)/2).toFixed(2));
                //kelas 6 semester 1
                let siswa_k6s1              = kelas6semester1.filter(s=>s.namasiswa == item.pd_nama);
                let siswa_k6s1_k3_nilai     = siswa_k6s1.length>0?Number(siswa_k6s1[0][kodemapel_by_siswa]):0;
                let siswa_k6s1_k4_nilai     = siswa_k6s1.length>0?Number(siswa_k6s1[0][kodemapel_by_siswa+'_NILAI_KETERAMPILAN']??0):0;
                let siswa_k6s1_rerata       = Number(((siswa_k6s1_k3_nilai + siswa_k6s1_k4_nilai)/2).toFixed(2));
                //kelas 6 semester 2 (current tapel)
                let siswa_k6s2           = kelas6semester2.filter(s=>s.namasiswa == item.pd_nama);
                let siswa_k6s2_k3_nilai     = siswa_k6s2.length>0?Number(siswa_k6s2[0][kodemapel_by_siswa]):0;
                let siswa_k6s2_k4_nilai     = siswa_k6s2.length>0?Number(siswa_k6s2[0][kodemapel_by_siswa+'_NILAI_KETERAMPILAN']??0):0;
                let siswa_k6s2_rerata       = Number(((siswa_k6s2_k3_nilai + siswa_k6s2_k4_nilai)/2).toFixed(2));

                let nilai_ijazah_mapel_ini = Number(((siswa_k5s1_rerata  + siswa_k5s2_rerata  + siswa_k6s1_rerata  +siswa_k6s2_rerata)/4).toFixed(2));




                
                ob.kodemapel_umum = tipemapel=='agama'?'AGAMA':kodemapel;
                ob.kodemapel_umum_teks = tipemapel=='agama'?'Pendidikan Agama dan Budi Pekerti':kodemapel_teks;

                ob.k5s1_k3_nilai  = siswa_k5s1_k3_nilai  ;
                ob.k5s1_k4_nilai  = siswa_k5s1_k4_nilai  ;
                ob.k5s1_rerata    = siswa_k5s1_rerata    ;
                ob.k5s2_k3_nilai  = siswa_k5s2_k3_nilai  ;
                ob.k5s2_k4_nilai  = siswa_k5s2_k4_nilai  ;
                ob.k5s2_rerata    = siswa_k5s2_rerata    ;
                ob.k6s1_k3_nilai  = siswa_k6s1_k3_nilai  ;
                ob.k6s1_k4_nilai  = siswa_k6s1_k4_nilai  ;
                ob.k6s1_rerata    = siswa_k6s1_rerata    ;
                ob.k6s2_k3_nilai  = siswa_k6s2_k3_nilai  ;
                ob.k6s2_k4_nilai  = siswa_k6s2_k4_nilai  ;
                ob.k6s2_rerata    = siswa_k6s2_rerata    ;
                ob.nilai_ijazah   = nilai_ijazah_mapel_ini;

                
                result.push(ob);

            });
            return result;
        })
        .sortByProperty('nama_rombel','asc');
        
        return result.data;
    }
}