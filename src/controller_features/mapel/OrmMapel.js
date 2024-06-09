import viewOrmMapel from "./viewOrmMapel";
import { TableProperties }  from "../../entries/vendor";
import InfoKbmModal from "../kbm/InfoKbmModal";
import viewOlahNilaiKBM from "../olahnilai/viewOlahNilaiKbm";
import UploadCsv from "../uploadCsv/UploadCsv";
import AlgoritmaNilai from "../Algoritma/AlgoritmaNilai";

export default class OrmMapel{
    constructor(ormKbmFitur,modal,modal1){
        this.kbmFitur = ormKbmFitur;
        this.Modal = modal;
        this.Modal1=modal1;
        this.workplace = document.getElementById('printarea');
        this.labelRealMapel = [];
        this.definisiMapelSiswa = {
            'ISLAM':{
                        kodemapel:'PAI',
                        mapelteks:this.kbmFitur.currentMapelOnClassRoom['PAI']
                    },
            'KRISTEN':{
                        kodemapel:'PKRIS',
                        mapelteks:this.kbmFitur.currentMapelOnClassRoom['PKRIS']
                    },
                    
            'KATHOLIK':{
                        kodemapel:'PKATO',
                        mapelteks:this.kbmFitur.currentMapelOnClassRoom['PKATO']
                    },
                    
            'KATOLIK':{
                        kodemapel:'PKATO',
                        mapelteks:this.kbmFitur.currentMapelOnClassRoom['PKATO']
                    },
            'KHATOLIK':{
                        kodemapel:'PKATO',
                        mapelteks:this.kbmFitur.currentMapelOnClassRoom['PKATO']
                    },
                    
        };
        this.collectionsSiswa = null;
        this.datasebarankd = [];
    }
    get jenjang(){
        return this.kbmFitur.jenjang;
    }
    get rombel(){
        return this.kbmFitur.rombel;
    }
    get isSemesterGanjil(){
        return this.kbmFitur.user.semester == 1;
    }
    get isSemesterGenap(){
        return this.kbmFitur.user.semester == 2;
    }
    get isKurmer(){
        return this.kbmFitur.shortKurikulum =='kurmer';
    }
    get siswaRombel(){
        return this.kbmFitur.siswaRombel.slice();
    }
    get mapelNasional() {// tanpa agama dan mulok
        return Object.fromEntries(Object.entries(this.kbmFitur.currentMapelOnClassRoom).filter(([k,v])=>!['PAI','PKRIS','PKATO','BSUND'].includes(k)));
    }
    get mapelNonAgama() {// tanpa agama dan mulok
        return Object.fromEntries(Object.entries(this.kbmFitur.currentMapelOnClassRoom).filter(([k,v])=>!['PAI','PKRIS','PKATO'].includes(k)));
    }
    get agamaCurrentRombel(){
        let datasiswaCurrentRombel = this.siswaRombel;
        return  new this.kbmFitur.collectionClass(datasiswaCurrentRombel).setProperty('pd_agama',(item)=>item==""?"ISLAM":item).selectProperties(['pd_agama']).uniqueByProperty('pd_agama').data;
        
    }

    get blangkotab_respon(){//objek
        return this.kbmFitur.service.data['blangko_respon_'+this.kbmFitur.jenjang]
    }
    dataTabSs(namaTab){
        return this.kbmFitur.service.data[namaTab];
    }
    blangkotab_tagihan(tabJenisTagihan){//objek
        return this.kbmFitur.service.data['blangko_'+tabJenisTagihan+'_'+this.jenjang];
    }
    get labelOnlyAgamaByCurrentRombel(){
        let agamasiswa = this.agamaCurrentRombel;
        let newLabel = [];
        agamasiswa.forEach(n=>{
            let ob = {};
            ob.label = this.definisiMapelSiswa[n.pd_agama].mapelteks;
            ob.value = this.definisiMapelSiswa[n.pd_agama].kodemapel;
            newLabel.push(ob);
        })
        return newLabel;
    }
    get labelNonAgamaIncludeMulok(){
        let dataLabelMapel = this.kbmFitur.labelingSelectMapel;
        let avoidMapelAgama = dataLabelMapel.filter(s=>!['PAI','PKRIS','PKATO'].includes(s.value));
        return avoidMapelAgama;
    }
    createLabelMapel(){
        // let dataLabelMapel = this.kbmFitur.labelingSelectMapel;
        let avoidMapelAgama = this.labelNonAgamaIncludeMulok;
        // let agamasiswa = this.agamaCurrentRombel;
        let newLabel = this.labelOnlyAgamaByCurrentRombel;
        // agamasiswa.forEach(n=>{
        //     let ob = {};
        //     ob.label = this.definisiMapelSiswa[n.pd_agama].mapelteks;
        //     ob.value = this.definisiMapelSiswa[n.pd_agama].kodemapel;
        //     newLabel.push(ob);
        // })

        this.labelRealMapel  = [...newLabel,...avoidMapelAgama];

        // this.collectionsSiswa = new this.kbmFitur.collectionClass(this.kbmFitur.siswaRombel.slice())
        //                         .setProperty('pd_agama',(item)=>item==""?"ISLAM":item)
        //                         .addProperty('mapel_agama_kode',(item)=>this.definisiMapelSiswa[item.pd_agama].kodemapel)
        //                         .addProperty('mapel_agama_kode_teks',(item)=>this.definisiMapelSiswa[item.pd_agama].mapelteks)
        //                         .selectProperties(['id','pd_nama','pd_agama','mapel_agama_kode','mapel_agama_kode_teks','nama_rombel','jenjang','pd_tanggallahir','pd_tl','nis','nisn']);
        
        return this;


    }
    definisiServiceData(key){
        //key = 'PH', 'PTS', 'PASPAK','KETERAMPILAN'
        
        let objek_tagihan ={};
            objek_tagihan.KETERAMPILAN = [];
            objek_tagihan.PTS = [
                {
                    namaTab         : 'PTS',
                    namaServiceData : 'PTS_'+this.jenjang,
                    namaTagihan     : 'PTS',
                    namaOrm         : 'orm_PTS'
                },
            ];
        if(this.isKurmer){
            objek_tagihan.PH = [
                    {
                        namaTab         : 'PH',
                        namaServiceData : 'PH_'+this.jenjang,
                        namaTagihan     : 'PH',
                        namaOrm         : 'orm_PH'
                    },
                    {
                        namaTab         : 'kpraktik',
                        namaServiceData : 'kpraktik_'+this.jenjang,
                        namaTagihan     : 'kpraktik',
                        namaOrm         : 'orm_kpraktik'
                    },
                    {
                        namaTab         : 'kproduk',
                        namaServiceData : 'kproduk_'+this.jenjang,
                        namaTagihan     : 'kproduk',
                        namaOrm         : 'orm_kproduk'
                    },
                    {
                        namaTab         : 'kproyek',
                        namaServiceData : 'kproyek_'+this.jenjang,
                        namaTagihan     : 'kproyek',
                        namaOrm         : 'orm_kproyek'
                    },
                ];
            
            objek_tagihan.PASPAK = [
                {
                    namaTab         : 'PAS',
                    namaServiceData : 'PAS_'+this.jenjang,
                    namaTagihan     : 'PAS',
                    namaOrm         : 'orm_PASPAK'
                },
            ];
            
            if(this.isSemesterGenap){
                objek_tagihan.PASPAK = [
                    {
                        namaTab         : 'PAK',
                        namaServiceData : 'PAK_'+this.jenjang,
                        namaTagihan     : 'PAK',
                        namaOrm         : 'orm_PASPAK'
                    },
                ];
                if(this.jenjang == 6){
                    objek_tagihan.PASPAK = [
                                                {
                                                    namaTab         : 'PAK',
                                                    namaServiceData : 'PAK_'+this.jenjang,
                                                    namaTagihan     : 'PAK',
                                                    namaOrm         : 'orm_PASPAK'
                                                },
                                                {
                                                    namaTab         : 'ustertulis',
                                                    namaServiceData : 'ustertulis_'+this.jenjang,
                                                    namaTagihan     : 'ustertulis',
                                                    namaOrm         : 'orm_PASPAK'
                                                },
                                            ];
                    objek_tagihan.PH = [
                                            {
                                                namaTab         : 'PH',
                                                namaServiceData : 'PH_'+this.jenjang,
                                                namaTagihan     : 'PH',
                                                namaOrm         : 'orm_PH'
                                            },
                                            {
                                                namaTab         : 'kpraktik',
                                                namaServiceData : 'kpraktik_'+this.jenjang,
                                                namaTagihan     : 'kpraktik',
                                                namaOrm         : 'orm_kpraktik'
                                            },
                                            {
                                                namaTab         : 'kproduk',
                                                namaServiceData : 'kproduk_'+this.jenjang,
                                                namaTagihan     : 'kproduk',
                                                namaOrm         : 'orm_kproduk'
                                            },
                                            {
                                                namaTab         : 'kproyek',
                                                namaServiceData : 'kproyek_'+this.jenjang,
                                                namaTagihan     : 'kproyek',
                                                namaOrm         : 'orm_kproyek'
                                            },
                                            {
                                                namaTab         : 'kproyek',
                                                namaServiceData : 'kproyek_'+this.jenjang,
                                                namaTagihan     : 'kproyek',
                                                namaOrm         : 'orm_kproyek'
                                            },
                                            {
                                                namaTab         : 'uspraktek',
                                                namaServiceData : 'uspraktek_'+this.jenjang,
                                                namaTagihan     : 'uspraktek',
                                                namaOrm         : 'orm_uspraktek'
                                            },
                                        ];

                }
            }
        }else{
            objek_tagihan.PH = [
                                    {
                                        namaTab         : 'PH',
                                        namaServiceData : 'PH_'+this.jenjang,
                                        namaTagihan     : 'PH',
                                        namaOrm         : 'orm_PH'
                                    }
                                ];
            
            objek_tagihan.PASPAK = [
                                        {
                                            namaTab         : 'PAS',
                                            namaServiceData : 'PAS_'+this.jenjang,
                                            namaTagihan     : 'PAS',
                                            namaOrm         : 'orm_PASPAK'
                                        },
                                    ];
            objek_tagihan.KETERAMPILAN =[
                                            {
                                                namaTab         : 'kpraktik',
                                                namaServiceData : 'kpraktik_'+this.jenjang,
                                                namaTagihan     : 'kpraktik',
                                                namaOrm         : 'orm_kpraktik'
                                            },
                                            {
                                                namaTab         : 'kproduk',
                                                namaServiceData : 'kproduk_'+this.jenjang,
                                                namaTagihan     : 'kproduk',
                                                namaOrm         : 'orm_kproduk'
                                            },
                                            {
                                                namaTab         : 'kproyek',
                                                namaServiceData : 'kproyek_'+this.jenjang,
                                                namaTagihan     : 'kproyek',
                                                namaOrm         : 'orm_kproyek'
                                            },
                                        ];
            if(this.isSemesterGenap){
                objek_tagihan.PASPAK = [
                    {
                        namaTab         : 'PAK',
                        namaServiceData : 'PAK_'+this.jenjang,
                        namaTagihan     : 'PAK',
                        namaOrm         : 'orm_PASPAK'
                    },
                ];
                if(this.jenjang == 6){
                    objek_tagihan.PASPAK = [
                        {
                            namaTab         : 'PAK',
                            namaServiceData : 'PAK_'+this.jenjang,
                            namaTagihan     : 'PAK',
                            namaOrm         : 'orm_PASPAK'
                        },
                        {
                            namaTab         : 'ustertulis',
                            namaServiceData : 'ustertulis_'+this.jenjang,
                            namaTagihan     : 'ustertulis',
                            namaOrm         : 'orm_PASPAK'
                        },
                    ];

                }
            }
        }
        return objek_tagihan[key];
    }
    
    createNilaiMapelonCurrentSiswaRombel(tipe='PH'){
        let datakey = this.definisiServiceData(tipe);
        let OrmKbm = this.kbmFitur.ormKBM.data;
        let api = this.kbmFitur.service.data;
        datakey.forEach(dataservice=>{
            this.collectionsSiswa.addProperty(dataservice.namaOrm,(item)=>{
                //data tabtgihan dari api;
                let dataApiTagihan = api[dataservice.namaServiceData].filter(s=>s.tokensiswa == item.id);
                let obNilaiTagihan = this.blangkotab_tagihan(dataservice.namaTagihan);
                if(dataApiTagihan.length>0){
                    obNilaiTagihan = dataApiTagihan[0];
                }
                let dataKbmByJenisTagihan = OrmKbm.filter(s=>s.jenistagihan == dataservice.namaTagihan).map(mapApiRespon=>mapApiRespon.api_respon)
                                            .flat(1)
                                            .filter(responApi=>responApi.tokensiswa == item.id)
                                            .map(bs=>Object.assign({},{
                                                        'kbm'               : OrmKbm.filter(sf=>sf.idbaris == bs.matericode)[0],
                                                        'properti_mapelkd'  : OrmKbm.filter(sf=>sf.idbaris == bs.matericode)[0].objek_mapelkd,
                                                        'datarespon'        : bs,
                                                        'nilai_tagihan'     : OrmKbm.filter(sf=>sf.idbaris == bs.matericode)[0].objek_mapelkd.flat(2).map(sfn=>Object.assign({},sfn,{'nilai_tagihan':obNilaiTagihan[sfn.key_tagihan]}))}));
                return {
                    dataTagihan :dataApiTagihan,
                    dataKbm : dataKbmByJenisTagihan
                }
            })
            // this.collectionsSiswa.addProperty(dataservice.namaOrm,(item)=>{
            //     let jenistagihan = dataservice.namaTagihan;
                
            //     let data = [];
            //     let oArray = OrmKbm.filter(s=>s.jenistagihan == jenistagihan);
            //     let dataTabTaghan = api[dataservice.namaServiceData]; //array
            //     let dataTabTaghan_blangko = this.blangkotab_tagihan(jenistagihan) ;//this.service.data['blangko_'+jenistagihan+'_'+this.jenjang]; //objek
            //     let dataTabResponKbm_blangko = this.blangkotab_respon;
                
            //     //filter data tabtagihan sesaui namasiswa ini;
            //     let filter_tabtagihan_CurrentSiswa = dataTabTaghan.filter(s=>s.tokensiswa == item.id);
            //     let tabtagihan_CurrentSiswa = dataTabTaghan_blangko; //objek tagihan
            //     if(filter_tabtagihan_CurrentSiswa.length>0){
            //         tabtagihan_CurrentSiswa = filter_tabtagihan_CurrentSiswa[filter_tabtagihan_CurrentSiswa.length-1];
            //     }

            //     let result = {};

            //     result.datakbm_datamateri = oArray;
            //     // result.blangko_datakbm_datamateri = dataTabTaghan_blangko;
            //     result.blangko_respon = dataTabResponKbm_blangko;
            //     result.blangko_tagihan = dataTabTaghan_blangko;
            //     result.datatab_tagihan = dataTabTaghan;
            //     result.has_tabtagihan = filter_tabtagihan_CurrentSiswa.length>0;
            //     result.objek_tabtagihan_CurrentSiswa = tabtagihan_CurrentSiswa;
            //     // oArray.forEach(n=>{
            //     //     //properti kbm-nya:
            //     //     let obj_perkbm = {};
            //     //     let mapel_kd = n.objek_mapelkd;
                    

                    
            //     //     let nilai_kbm_siswa_ini = n.api_respon.filter(s=> s.tokensiswa == item.id);
            //     //     let objek_kbm_siswa_ini = dataTabResponKbm_blangko;
            //     //     if(nilai_kbm_siswa_ini.length>0){
            //     //         objek_kbm_siswa_ini = nilai_kbm_siswa_ini[nilai_kbm_siswa_ini.length-1];
            //     //     }

            //     //     //data per mapel kd;
            //     //     let datapermapelkd = [];
            //     //     mapel_kd.forEach(mapelkd=>{
            //     //         let ob_mapelkd={};
            //     //         let arraynosoal = mapelkd.no_soal;
            //     //         let arrayObjeknosoal = mapelkd.no_soal_banksoal;
            //     //         let key_tagihan = mapelkd.key_tagihan;
            //     //         let kodemapel = mapelkd.mapel;
            //     //         let kodemapel_teks = mapelkd.mapelteks;
            //     //         let nilai_kbm = '';
            //     //         let nilai_tagihan = '';

            //     //         //buat nilai tagihan;
            //     //         //cek dulu apa objeknya punya key == key_tagihan atau tidak;
            //     //         let cek_tabtagihan_has_key_tagihan = Object.keys(tabtagihan_CurrentSiswa).filter(s=>s == key_tagihan);
            //     //         if(cek_tabtagihan_has_key_tagihan.length>0){
            //     //             nilai_tagihan = tabtagihan_CurrentSiswa[key_tagihan];
            //     //         }

            //     //         //buat nilai kbm
            //     //         // diambil dari arraySoal KBM dan tabRespon;
            //     //         // buat array nilai dari objek_kbm_siswa_ini dengan cara maping arrayObjectnosoal;
            //     //         let arraynilaikbm_dariarrayobjek = [];
            //     //         let nosoalAwalArrayObjek = arrayObjeknosoal[0].nosoal;
            //     //         arrayObjeknosoal.forEach(arO=>{
            //     //             let nilai = ''
            //     //             if(arO.datasoal.bentuksoalspesifik=='Menjodohkan'){
            //     //                 nilai = Number(objek_kbm_siswa_ini['SKOR_'+nosoalAwalArrayObjek]);

            //     //             }else{
            //     //                 nilai = Number(objek_kbm_siswa_ini['SKOR_'+arO.nosoal]);
            //     //             }
            //     //             arraynilaikbm_dariarrayobjek.push(nilai);
            //     //         });

            //     //         let reducing = arraynilaikbm_dariarrayobjek.reduce((a,b)=>a+b);
            //     //         let na = (reducing/arraynilaikbm_dariarrayobjek.length);
            //     //         let fna = (na*100).toFixed(2);
                        
            //     //         nilai_kbm = fna;

            //     //         ob_mapelkd.key_tagihan      = key_tagihan;
            //     //         ob_mapelkd.kd               = mapelkd.kd;
            //     //         ob_mapelkd.jenistagihan     = mapelkd.jenistagihan;
            //     //         ob_mapelkd.propertikurikulum = mapelkd
            //     //         ob_mapelkd.objek_kbm        = n;
            //     //         ob_mapelkd.kodemapel        = kodemapel;
            //     //         ob_mapelkd.kodemapel_teks   = kodemapel_teks;
            //     //         ob_mapelkd.nilai_kbm        = nilai_kbm;
            //     //         ob_mapelkd.nilai_tagihan    = nilai_tagihan;
            //     //         ob_mapelkd.array_nilaikbm   = arraynilaikbm_dariarrayobjek;
            //     //         ob_mapelkd.array_nosoal_di_kbm = arraynosoal;
            //     //         datapermapelkd.push(ob_mapelkd);

            //     //     })
                    
            //     //     //isikan objek;
            //     //     obj_perkbm.idkbm = n.idbaris;
            //     //     obj_perkbm.judulkbm = n.idmapel;
            //     //     obj_perkbm.mapel_kd = mapel_kd;
            //     //     // obj_perkbm.respon_datasiswa_di_kbm_ini= nilai_kbm_siswa_ini;//array;

            //     //     obj_perkbm.hasRespon = nilai_kbm_siswa_ini.length>0;
            //     //     obj_perkbm.obj_datasiswa_di_kbm_ini= objek_kbm_siswa_ini;//array;
            //     //     obj_perkbm.datanilai = datapermapelkd;

            //     //     data.push(obj_perkbm);  
            //     // });
            //     result.dataFromKBM = data;
            //     return result;
            // });
        })
        return this;
    }
    async dataKbm(){
        await this.kbmFitur.callApiNeeded()
        
        let tagihanNeeded = [...this.definisiServiceData('PH'),...this.definisiServiceData('PTS'),...this.definisiServiceData('PASPAK')];
        let onlyServiceData = tagihanNeeded.map(n=>({'dataService':n.namaServiceData,'namaOrm':n.namaOrm,'namaTagihan':n.namaTagihan}));
        let dataTabTagihanNeeded = onlyServiceData.map(n=>Object.assign({},n,{[n.namaOrm]:this.dataTabSs(n.dataService).filter(s=>s.idkelas == this.rombel),'header_blangko':Object.keys(this.dataTabSs('blangko_'+n.dataService)).filter(keblangko=>!['namasiswa','idkelas','jenistagihan','tokensiswa'].includes(keblangko))}));
        let datamateri = this.dataTabSs('datamateri').filter(s=>s.arraykelas.indexOf(this.rombel)>-1 && s.idtoken == this.jenjang);//
        let datamateri_kuncikd = datamateri.map(n=> Object.keys(JSON.parse(n.kuncikd))).flat(1).map(mn=>({'kodemapel':mn.split('_')[0],'kd':mn.split('_')[1]}));
        let sebaranKd = [];
        //koleksimapelagama;
        this.labelOnlyAgamaByCurrentRombel.forEach(n=>{
            let ob_n = {};
            let dataTabTagihanPH = dataTabTagihanNeeded.filter(s=>s.namaOrm=='orm_PH');
            let dataTabTagihanPTS = dataTabTagihanNeeded.filter(s=>s.namaOrm=='orm_PTS');
            let dataTabTagihanPASPAK = dataTabTagihanNeeded.filter(s=>s.namaOrm=='orm_PASPAK');

            ob_n.kelompokMapel = 'agama';
            ob_n.kodemapel = n.value;
            ob_n.kodemapel_teks = n.label;
            ob_n.sebarankd = datamateri_kuncikd.filter(s=>s.kodemapel == n.value);
            // ob_n.dataTabTagihanPH = dataTabTagihanPH;
            // ob_n.dataTabTagihanPTS = dataTabTagihanPTS;
            // ob_n.dataTabTagihanPASPAK = dataTabTagihanPASPAK;
            ob_n.sebarankdUnique = this.kbmFitur.collectionClass(datamateri_kuncikd.filter(s=>s.kodemapel == n.value)).uniqueByProperties(['kodemapel','kd'])
                                        .addProperty('datatab_PH',(item)=>{
                                            let result = [];
                                            dataTabTagihanPH.forEach(n_tab=>{
                                                let arrayHeader = n_tab.header_blangko;
                                                let namaOrm = n_tab.namaOrm;
                                                let dataOrm = n_tab[namaOrm];//array

                                                arrayHeader.forEach(ar_ntab=>{
                                                    let spliting_key = ar_ntab.split('_');
                                                    let ob_ar_ntab= {};
                                                    
                                                    ob_ar_ntab.key_tagihan = ar_ntab;
                                                    ob_ar_ntab.dataNilaiTab = dataOrm.map(n=>({'tokensiswa':n.tokensiswa,'nilai':n[ar_ntab]}))
                                                    ob_ar_ntab.idkbm = spliting_key[0];
                                                    ob_ar_ntab.crtToken = spliting_key[2];
                                                    ob_ar_ntab.jenistagihan = spliting_key[1];
                                                    ob_ar_ntab.kodemapel = spliting_key[3];
                                                    ob_ar_ntab.kd = spliting_key[4];
                                                
                                                    if(spliting_key[1]==n_tab.namaTagihan && spliting_key[3]==item.kodemapel && spliting_key[4]==item.kd){
                                                        result.push(ob_ar_ntab);
                                                    }
                                                    
                                                })   
                                            })

                                            return result;
                                        })
                                        .addProperty('datatab_PTS',(item)=>{
                                            let result = [];
                                            dataTabTagihanPTS.forEach(n_tab=>{
                                                let arrayHeader = n_tab.header_blangko;
                                                let namaOrm = n_tab.namaOrm;
                                                let dataOrm = n_tab[namaOrm];//array;

                                                arrayHeader.forEach(ar_ntab=>{
                                                    let spliting_key = ar_ntab.split('_');
                                                    let ob_ar_ntab= {};
                                                    
                                                    ob_ar_ntab.key_tagihan = ar_ntab;
                                                    ob_ar_ntab.dataNilaiTab = dataOrm.map(n=>({'tokensiswa':n.tokensiswa,'nilai':n[ar_ntab]}))
                                                    ob_ar_ntab.idkbm = spliting_key[0];
                                                    ob_ar_ntab.crtToken = spliting_key[2];
                                                    ob_ar_ntab.jenistagihan = spliting_key[1];
                                                    ob_ar_ntab.kodemapel = spliting_key[3];
                                                    ob_ar_ntab.kd = spliting_key[4];
                                                    
                                                    if(spliting_key[1]==n_tab.namaTagihan && spliting_key[3]==item.kodemapel && spliting_key[4]==item.kd){
                                                        result.push(ob_ar_ntab);
    
                                                    }
                                                })  
                                            })

                                            return result;
                                        })
                                        .addProperty('datatab_PASPAK',(item)=>{
                                            let result = [];
                                            dataTabTagihanPASPAK.forEach(n_tab=>{
                                                let arrayHeader = n_tab.header_blangko;
                                                let namaOrm = n_tab.namaOrm;
                                                let dataOrm = n_tab[namaOrm];//array
                                                arrayHeader.forEach(ar_ntab=>{
                                                    let spliting_key = ar_ntab.split('_');
                                                    let ob_ar_ntab= {};
                                                    ob_ar_ntab.key_tagihan = ar_ntab;
                                                    ob_ar_ntab.dataNilaiTab = dataOrm.map(n=>({'tokensiswa':n.tokensiswa,'nilai':n[ar_ntab]}))
                                                    
                                                    ob_ar_ntab.idkbm = spliting_key[0];
                                                    ob_ar_ntab.crtToken = spliting_key[2];
                                                    ob_ar_ntab.jenistagihan = spliting_key[1];
                                                    ob_ar_ntab.kodemapel = spliting_key[3];
                                                    ob_ar_ntab.kd = spliting_key[4];
                                                    if(spliting_key[1]==n_tab.namaTagihan && spliting_key[3]==item.kodemapel && spliting_key[4]==item.kd){
                                                        result.push(ob_ar_ntab);
    
                                                    }
                                                })  
                                            })

                                            return result;
                                        }).data;
            sebaranKd.push(ob_n);
        });
        //koleksimapenonlagama;
        this.labelNonAgamaIncludeMulok.forEach(n=>{
            let ob_n = {};
            
            let dataTabTagihanPH = dataTabTagihanNeeded.filter(s=>s.namaOrm=='orm_PH');
            let dataTabTagihanPTS = dataTabTagihanNeeded.filter(s=>s.namaOrm=='orm_PTS');
            let dataTabTagihanPASPAK = dataTabTagihanNeeded.filter(s=>s.namaOrm=='orm_PASPAK');

            ob_n.kelompokMapel = 'nonagama';
            ob_n.kodemapel = n.value;
            ob_n.kodemapel_teks = n.label;
            ob_n.sebarankd = datamateri_kuncikd.filter(s=>s.kodemapel == n.value);
            // ob_n.dataTabTagihanPH = dataTabTagihanPH;
            // ob_n.dataTabTagihanPTS = dataTabTagihanPTS;
            // ob_n.dataTabTagihanPASPAK = dataTabTagihanPASPAK;
            ob_n.sebarankdUnique = this.kbmFitur.collectionClass(datamateri_kuncikd.filter(s=>s.kodemapel == n.value)).uniqueByProperties(['kodemapel','kd'])
                                    .addProperty('datatab_PH',(item)=>{
                                        let result = [];
                                        dataTabTagihanPH.forEach(n_tab=>{
                                            let arrayHeader = n_tab.header_blangko;
                                            let namaOrm = n_tab.namaOrm;
                                            let dataOrm = n_tab[namaOrm];//array
                                            arrayHeader.forEach(ar_ntab=>{
                                                let spliting_key = ar_ntab.split('_');
                                                let ob_ar_ntab= {};
                                                ob_ar_ntab.key_tagihan = ar_ntab;
                                                ob_ar_ntab.dataNilaiTab = dataOrm.map(n=>({'tokensiswa':n.tokensiswa,'nilai':n[ar_ntab]}))
                                                
                                                ob_ar_ntab.idkbm = spliting_key[0];
                                                ob_ar_ntab.crtToken = spliting_key[2];
                                                ob_ar_ntab.jenistagihan = spliting_key[1];
                                                ob_ar_ntab.kodemapel = spliting_key[3];
                                                ob_ar_ntab.kd = spliting_key[4];
                                                if(spliting_key[1]==n_tab.namaTagihan && spliting_key[3]==item.kodemapel && spliting_key[4]==item.kd){
                                                    result.push(ob_ar_ntab);

                                                }
                                            })   
                                        })

                                        return result;
                                    })
                                    .addProperty('datatab_PTS',(item)=>{
                                        let result = [];
                                        dataTabTagihanPTS.forEach(n_tab=>{
                                            let arrayHeader = n_tab.header_blangko;
                                            let namaOrm = n_tab.namaOrm;
                                            let dataOrm = n_tab[namaOrm];//array;

                                            arrayHeader.forEach(ar_ntab=>{
                                                let spliting_key = ar_ntab.split('_');
                                                let ob_ar_ntab= {};
                                                
                                                ob_ar_ntab.key_tagihan = ar_ntab;
                                                ob_ar_ntab.dataNilaiTab = dataOrm.map(n=>({'tokensiswa':n.tokensiswa,'nilai':n[ar_ntab]}))
                                                ob_ar_ntab.idkbm = spliting_key[0];
                                                ob_ar_ntab.crtToken = spliting_key[2];
                                                ob_ar_ntab.jenistagihan = spliting_key[1];
                                                ob_ar_ntab.kodemapel = spliting_key[3];
                                                ob_ar_ntab.kd = spliting_key[4];
                                                
                                                if(spliting_key[1]==n_tab.namaTagihan && spliting_key[3]==item.kodemapel && spliting_key[4]==item.kd){
                                                    result.push(ob_ar_ntab);

                                                }
                                            })  
                                        })

                                        return result;
                                    })
                                    .addProperty('datatab_PASPAK',(item)=>{
                                        let result = [];
                                        dataTabTagihanPASPAK.forEach(n_tab=>{
                                            let arrayHeader = n_tab.header_blangko;
                                            let namaOrm = n_tab.namaOrm;
                                            let dataOrm = n_tab[namaOrm];//array
                                            arrayHeader.forEach(ar_ntab=>{
                                                let spliting_key = ar_ntab.split('_');
                                                let ob_ar_ntab= {};
                                                ob_ar_ntab.key_tagihan = ar_ntab;
                                                ob_ar_ntab.dataNilaiTab = dataOrm.map(n=>({'tokensiswa':n.tokensiswa,'nilai':n[ar_ntab]}))
                                                
                                                ob_ar_ntab.idkbm = spliting_key[0];
                                                ob_ar_ntab.crtToken = spliting_key[2];
                                                ob_ar_ntab.jenistagihan = spliting_key[1];
                                                ob_ar_ntab.kodemapel = spliting_key[3];
                                                ob_ar_ntab.kd = spliting_key[4];
                                                if(spliting_key[1]==n_tab.namaTagihan && spliting_key[3]==item.kodemapel && spliting_key[4]==item.kd){
                                                    result.push(ob_ar_ntab);

                                                }
                                            })  
                                        })

                                        return result;
                                    })
                                    .data;
            sebaranKd.push(ob_n);
        });
            this.collectionsSiswa.addProperty('dataNilai',(item)=>{
                let result =[]
                sebaranKd.forEach(skd=>{
                    let dataMapelUnique = skd
                    if(skd.kelompokMapel == 'agama'){

                        if(skd.kodemapel == item.mapel_agama_kode){
                            dataMapelUnique = skd
                        }
                    }
                    result.push(dataMapelUnique)
                })
                return result;
        })

    }
    sebaranKd(){
        let datakbm = this.kbmFitur.ormKBM.sortByProperty('idtgl','asc').selectProperties(['objek_mapelkd']).data.map(n=>n.objek_mapelkd).flat(1);
        let koleksimapel = this.labelRealMapel;
        let result = [];
        koleksimapel.forEach(n=>{
            let ob_n = {};
            let dataAllKbm = datakbm.filter(s=>s.mapel == n.value);
            let uniqueMapel = new this.kbmFitur.collectionClass(dataAllKbm.slice()).uniqueByProperties(['mapel','kd']).data;
            
            ob_n.kodemapel = n.value;
            ob_n.tipemapel = ['PAI','PKRIS','PKATO'].includes(n.value)?'agama':'nonagama';
            ob_n.kodemapel_teks = n.label;

            ob_n.dataAllKbm = dataAllKbm;

            if(this.isKurmer){
                ob_n.dataAllKbm_unique = uniqueMapel;
                
            }else{
                ob_n.dataAllKbm_unique = uniqueMapel.filter(s=>!['kpraktik','kproduk','kproyek'].includes(s.jenistagihan));

            }
            
            ob_n.groupBy_PH = datakbm.filter(s=>s.mapel == n.value && s.jenistagihan == 'PH');
            ob_n.groupBy_KETERAMPILAN  = datakbm.filter(s=>s.mapel == n.value && ['kpraktik','kproduk','kproyek'].includes(s.jenistagihan));

            //untuk kurmer, kpraktik-kproduk-kproyek diindikasikan sebagai PH
            if(this.isKurmer){
                ob_n.groupBy_PH = datakbm.filter(s=>s.mapel == n.value && ['PH','kpraktik','kproduk','kproyek'].includes(s.jenistagihan));
            }

            ob_n.groupBy_PTS = datakbm.filter(s=>s.mapel == n.value && s.jenistagihan == 'PTS');

            //untuk semester ganjil PAS, genap = PAK, 
            if(this.isSemesterGanjil){
                ob_n.groupBy_PASPAK = datakbm.filter(s=>s.mapel == n.value && s.jenistagihan == 'PAS');
            }else{
                ob_n.groupBy_PASPAK = datakbm.filter(s=>s.mapel == n.value && s.jenistagihan == 'PAK');

                //untuk kelas 6, ustertulis dianggap sebagai PAK;
                if(this.jenjang == 6){
                    ob_n.groupBy_PASPAK = datakbm.filter(s=>s.mapel == n.value && ['PAK','ustertulis'].includes(s.jenistagihan));
                    ob_n.groupBy_KETERAMPILAN  = datakbm.filter(s=>s.mapel == n.value && ['kpraktik','kproduk','kproyek','uspraktek'].includes(s.jenistagihan));

                }

            }

            //mengecek kebutuhan KD guna melacak/menntukan suatu predikat rapor;
            ob_n.kebutuhankd=0;
            ob_n.predikatMax = 'Baik';
            ob_n.predikatMin = 'Cukup';
            if(uniqueMapel.length == 0){
                ob_n.kebutuhankd=2;
            }else if(uniqueMapel.length == 1){
                ob_n.kebutuhankd=1;

            }


            result.push(ob_n);
        })
        
        
        return result;
    }
    sebaranDariTagihanBlangko(){
        let result = [];
        let sebaran = this.sebaranKd();
        let propertikurikulum = this.kbmFitur.ormKurikulum.data; // sudah dalam bentuk data, bukan orm
        let refrensiApiPredikat = this.dataTabSs('predikat_'+this.jenjang);
        
        this.datasebarankd = sebaran;
        let item ={
            id:''
        }
        sebaran.forEach(s_n=>{

            //jika tipe mapel sebaran ini 'agama', maka cocokkan mapelnya dengan agama siswa
            // if(s_n.tipemapel =='agama'){


            //     if(s_n.kodemapel !== item.mapel_agama_kode){
            //         //kode agama pada 's_n.kodemapel' TIDAK SESAUI dengan agama siswa, proses selanjutnya dihindari
            //         // return false;
            //         return;
            //     }

            //     //kode agama pada 's_n.kodemapel' sesuai dengan agama siswa, maka dilanjut ke proses selanjutnya;
            //     // return true;
            // }
            
            let ob_sn = {};
            ob_sn.propertikurikulummapel = propertikurikulum.filter(s=>s.kodemapel == s_n.kodemapel);
            ob_sn.tokensiswa = item.id;
            ob_sn.kodemapel = s_n.kodemapel;
            ob_sn.kodemapel_teks = s_n.kodemapel_teks;
            ['groupBy_PH','groupBy_PTS','groupBy_PASPAK','dataAllKbm_unique','dataAllKbm','groupBy_KETERAMPILAN'].map(map_sn=>{
                
                let keys_sebaran = map_sn;
                let datasebaran = s_n[keys_sebaran];
                let datanilai = [];
                
                datasebaran.forEach(m_sn=>{
                    //cek nilaitab_{{ jenistagihan }}, kalo ada dipake, kalo ga ada pake blangko;
                    let keyjenistagihan = m_sn.jenistagihan;
                    // let datatab_tagihan = item['nilaitab_'+keyjenistagihan];
                    let objek_tagihan = this.dataTabSs('blangko_'+keyjenistagihan+'_'+this.jenjang);//objek

                    //jika ada, biasanya lebih dari satu (padahal cuman satu);
                    // if(datatab_tagihan.length>0){
                    //     // objek_tagihan = datatab_tagihan[0]
                    // };
                    datanilai.push(Object.assign({},m_sn,{'nilai':objek_tagihan[m_sn.key_tagihan],'tipe nilai':typeof objek_tagihan[m_sn.key_tagihan],'tokensiswa':item.id,'data_objek_tagihan':objek_tagihan}))
                })
                ob_sn[map_sn+'_nilai'] = datanilai;
            })

            // let keys_sebaran = 'groupBy_PH';
            ;
            this.kbmFitur.refrensi_predikatraport = refrensiApiPredikat;//.filter(s=>s.kodemapel == s_n.kodemapel);
            ob_sn.refrensipredikat = this.kbmFitur.refrensi_predikatraport;
            let tet = AlgoritmaNilai.createPropertyRaport(Object.assign({},s_n,ob_sn),this.isKurmer,this.isSemesterGanjil,this.kbmFitur.findPredikatByNilai.bind(this.kbmFitur) );
            //algoritma;
            ob_sn._testing = tet;
            ob_sn.kkm = tet.kkm;
            if(this.isKurmer){
                ob_sn.ket_kkmkktp = 'KKTP';
                ob_sn.raporAsli_olah = {
                    'dataPH':tet.raporAsli_uniqPH,
                    'dataPTS':tet.raporAsli_uniqPTS,
                    'dataPASPAK':tet.raporAsli_uniqPASPAK,
                    'kdMaks_predikat':tet.raporAsli_kdMax_predikat_string,
                    'kdMaks_objek':tet.raporAsli_kdMax_object,
                    'kdMin_predikat':tet.raporAsli_kdMin_predikat_string,
                    'kdMin_objek':tet.raporAsli_kdMin_object,
                    'niai_rapor': tet.raporAsli_nilaiRapor
                    
                }
                ob_sn.predikatMaks = tet.raporAsli_kdMax_predikat_string;
                ob_sn.predikatMaks_objek = tet.raporAsli_kdMax_object;
                ob_sn.predikatMin = tet.raporAsli_kdMin_predikat_string;
                ob_sn.predikatMin_objek = tet.raporAsli_kdMin_object;
                ob_sn.nilaiRapor_asli = tet.raporAsli_nilaiRapor;
            }else{
                ob_sn.ket_kkmkktp = 'KKM'
                ob_sn.raporAsli_olah = tet.raporAsli_olah
                ob_sn.nilaiRapor_asli = tet.raporAsli_nilaiRapor;
                ob_sn.nilaiRapor_asli_predikat = tet.raporAsli_nilaiRapor_predikat;

                ob_sn.predikatMaks = tet.raporAsli_kdMax_predikat_string;
                ob_sn.predikatMaks_objek = tet.raporAsli_kdMax_object;
                ob_sn.predikatMin = tet.raporAsli_kdMin_predikat_string;
                ob_sn.predikatMin_objek = tet.raporAsli_kdMin_object;

                //     
                 
                ob_sn.keterampilan_raporAsli_olah           = tet.raporAsliKeterampilan_olah
                ob_sn.keterampilan_nilaiRapor_asli          = tet.raporAsliKeterampilan_nilaiRapor;
                ob_sn.keterampilan_nilaiRapor_asli_predikat = tet.raporAsliKeterampilan_nilaiRapor_predikat;
                ob_sn.keterampilan_predikatMaks             = tet.raporAsliKeterampilan_kdMax_predikat_string;
                ob_sn.keterampilan_predikatMaks_objek       = tet.raporAsliKeterampilan_kdMax_object;
                ob_sn.keterampilan_predikatMin              = tet.raporAsliKeterampilan_kdMin_predikat_string;
                ob_sn.keterampilan_predikatMin_objek        = tet.raporAsliKeterampilan_kdMin_object;




            }
            
            result.push(Object.assign({},s_n,ob_sn));

        })
        return result;
    }
    init(){
        let sebaran = this.sebaranKd();
        let propertikurikulum = this.kbmFitur.ormKurikulum.data; // sudah dalam bentuk data, bukan orm
        let refrensiApiPredikat = this.dataTabSs('predikat_'+this.jenjang);
        
        this.datasebarankd = sebaran;
        
        this.collectionsSiswa = new this.kbmFitur.collectionClass(this.kbmFitur.siswaRombel.slice())
                                .setProperty('pd_agama',(item)=>item==""?"ISLAM":item)
                                .addProperty('mapel_agama_kode',(item)=>this.definisiMapelSiswa[item.pd_agama].kodemapel)
                                .addProperty('mapel_agama_kode_teks',(item)=>this.definisiMapelSiswa[item.pd_agama].mapelteks)
                                .addProperty('nilaitab_PH',(item)=>this.dataTabSs('PH_'+item.jenjang).filter(s=>s.tokensiswa == item.id))
                                .addProperty('nilaitab_PTS',(item)=>this.dataTabSs('PTS_'+item.jenjang).filter(s=>s.tokensiswa == item.id))
                                .addProperty('nilaitab_PAS',(item)=>this.isSemesterGanjil?this.dataTabSs('PAS_'+item.jenjang).filter(s=>s.tokensiswa == item.id):[])
                                .addProperty('nilaitab_PAK',(item)=>this.isSemesterGenap?this.dataTabSs('PAK_'+item.jenjang).filter(s=>s.tokensiswa == item.id):[])
                                .addProperty('nilaitab_kpraktik',(item)=>this.dataTabSs('kpraktik_'+item.jenjang).filter(s=>s.tokensiswa == item.id))
                                .addProperty('nilaitab_kproduk',(item)=>this.dataTabSs('kproduk_'+item.jenjang).filter(s=>s.tokensiswa == item.id))
                                .addProperty('nilaitab_kproyek',(item)=>this.dataTabSs('kproyek_'+item.jenjang).filter(s=>s.tokensiswa == item.id))
                                .addProperty('nilaitab_ustertulis',(item)=>(item.jenjang == 6 && this.isSemesterGenap)?this.dataTabSs('ustertulis_'+item.jenjang).filter(s=>s.tokensiswa == item.id):[])
                                .addProperty('nilaitab_uspraktek',(item)=>(item.jenjang == 6 && this.isSemesterGenap)?this.dataTabSs('uspraktek_'+item.jenjang).filter(s=>s.tokensiswa == item.id):[])
                                .addProperty('nilaitab_PASPAK',(item)=>this.isSemesterGanjil?this.dataTabSs('PAS_'+item.jenjang).filter(s=>s.tokensiswa == item.id):this.dataTabSs('PAK_'+item.jenjang).filter(s=>s.tokensiswa == item.id))
                                .addProperty('sebaran_mapel',(item)=>{
                                    let result = [];
                                    sebaran.forEach(s_n=>{

                                        //jika tipe mapel sebaran ini 'agama', maka cocokkan mapelnya dengan agama siswa
                                        if(s_n.tipemapel =='agama'){


                                            if(s_n.kodemapel !== item.mapel_agama_kode){
                                                //kode agama pada 's_n.kodemapel' TIDAK SESAUI dengan agama siswa, proses selanjutnya dihindari
                                                // return false;
                                                return;
                                            }

                                            //kode agama pada 's_n.kodemapel' sesuai dengan agama siswa, maka dilanjut ke proses selanjutnya;
                                            // return true;
                                        }
                                        
                                        let ob_sn = {};
                                        ob_sn.propertikurikulummapel = propertikurikulum.filter(s=>s.kodemapel == s_n.kodemapel);
                                        ob_sn.tokensiswa = item.id;
                                        ob_sn.jenjang = item.jenjang;
                                        ob_sn.kodemapel = s_n.kodemapel;
                                        ob_sn.kodemapel_teks = s_n.kodemapel_teks;
                                        ['groupBy_PH','groupBy_PTS','groupBy_PASPAK','dataAllKbm_unique','dataAllKbm','groupBy_KETERAMPILAN'].map(map_sn=>{
                                            
                                            let keys_sebaran = map_sn;
                                            let datasebaran = s_n[keys_sebaran];
                                            let datanilai = [];
                                            
                                            datasebaran.forEach(m_sn=>{
                                                //cek nilaitab_{{ jenistagihan }}, kalo ada dipake, kalo ga ada pake blangko;
                                                let keyjenistagihan = m_sn.jenistagihan;
                                                let datatab_tagihan = item['nilaitab_'+keyjenistagihan];
                                                let objek_tagihan = this.dataTabSs('blangko_'+keyjenistagihan+'_'+this.jenjang);//objek
    
                                                //jika ada, biasanya lebih dari satu (padahal cuman satu);
                                                if(datatab_tagihan.length>0){
                                                    objek_tagihan = datatab_tagihan[datatab_tagihan.length-1]
                                                };
                                                datanilai.push(Object.assign({},m_sn,{'nilai':objek_tagihan[m_sn.key_tagihan],'tipe nilai':typeof objek_tagihan[m_sn.key_tagihan],'tokensiswa':item.id,'data_objek_tagihan':objek_tagihan}))
                                            })
                                            ob_sn[map_sn+'_nilai'] = datanilai;
                                        })

                                        // let keys_sebaran = 'groupBy_PH';
                                        ;
                                        this.kbmFitur.refrensi_predikatraport = refrensiApiPredikat;//.filter(s=>s.kodemapel == s_n.kodemapel);
                                        ob_sn.refrensipredikat = this.kbmFitur.refrensi_predikatraport;
                                        let tet = AlgoritmaNilai.createPropertyRaport(Object.assign({},s_n,ob_sn),this.isKurmer,this.isSemesterGanjil,this.kbmFitur.findPredikatByNilai.bind(this.kbmFitur) );
                                        //algoritma;
                                        ob_sn._testing = tet;
                                        ob_sn.kkm = tet.kkm;
                                        if(this.isKurmer){
                                            ob_sn.ket_kkmkktp = 'KKTP';
                                            ob_sn.raporAsli_olah = {
                                                'dataPH':tet.raporAsli_uniqPH,
                                                'dataPTS':tet.raporAsli_uniqPTS,
                                                'dataPASPAK':tet.raporAsli_uniqPASPAK,
                                                'kdMaks_predikat':tet.raporAsli_kdMax_predikat_string,
                                                'kdMaks_objek':tet.raporAsli_kdMax_object,
                                                'kdMin_predikat':tet.raporAsli_kdMin_predikat_string,
                                                'kdMin_objek':tet.raporAsli_kdMin_object,
                                                'niai_rapor': tet.raporAsli_nilaiRapor
                                                
                                            }
                                            ob_sn.predikatMaks = tet.raporAsli_kdMax_predikat_string;
                                            ob_sn.predikatMaks_objek = tet.raporAsli_kdMax_object;
                                            ob_sn.predikatMin = tet.raporAsli_kdMin_predikat_string;
                                            ob_sn.predikatMin_objek = tet.raporAsli_kdMin_object;
                                            ob_sn.nilaiRapor_asli = tet.raporAsli_nilaiRapor;
                                        }else{
                                            ob_sn.ket_kkmkktp = 'KKM';
                                            ob_sn.raporAsli_olah = tet.raporAsli_olah
                                            ob_sn.nilaiRapor_asli = tet.raporAsli_nilaiRapor;
                                            ob_sn.nilaiRapor_asli_predikat = tet.raporAsli_nilaiRapor_predikat;
                                            ob_sn.predikatMaks = tet.raporAsli_kdMax_predikat_string;
                                            ob_sn.predikatMaks_objek = tet.raporAsli_kdMax_object;
                                            ob_sn.predikatMin = tet.raporAsli_kdMin_predikat_string;
                                            ob_sn.predikatMin_objek = tet.raporAsli_kdMin_object;

                                            ob_sn.keterampilan_raporAsli_olah           = tet.raporAsliKeterampilan_olah
                                            ob_sn.keterampilan_nilaiRapor_asli          = tet.raporAsliKeterampilan_nilaiRapor;
                                            ob_sn.keterampilan_nilaiRapor_asli_predikat = tet.raporAsliKeterampilan_nilaiRapor_predikat;
                                            ob_sn.keterampilan_predikatMaks             = tet.raporAsliKeterampilan_kdMax_predikat_string;
                                            ob_sn.keterampilan_predikatMaks_objek       = tet.raporAsliKeterampilan_kdMax_object;
                                            ob_sn.keterampilan_predikatMin              = tet.raporAsliKeterampilan_kdMin_predikat_string;
                                            ob_sn.keterampilan_predikatMin_objek        = tet.raporAsliKeterampilan_kdMin_object;

                                        }
                                        
                                        result.push(Object.assign({},s_n,ob_sn));

                                    })
                                    return result;
                                })
                                .sortByProperty('pd_nama','asc');
                                // .selectProperties([
                                //                     'id',
                                //                     'pd_nama',
                                //                     'pd_agama',
                                //                     'jenjang',
                                //                     'mapel_agama_kode',
                                //                     'sebaran_mapel',
                                                    
                                //                     // 'nilaitab_PH',
                                //                     // 'nilaitab_PTS',
                                //                     // 'nilaitab_PAS',
                                //                     // 'nilaitab_PAK',
                                //                     // 'nilaitab_kpraktik',
                                //                     // 'nilaitab_kproduk',
                                //                     // 'nilaitab_kproyek',
                                //                     // 'nilaitab_ustertulis',
                                //                     // 'nilaitab_uspraktek',
                                //                 ])
        

        // this.kbmFitur.createOrmPerTagihan();]
        return this;
    }
    keteranganTitlePenilaian(tipesebaran){
        let title = 'Daftar Nilai Sumatif Harian';
        if(this.isKurmer){
            if(tipesebaran == 'groupBy_PTS_nilai'){
                title = 'Daftar Nilai Sumatif Tengah Semester';
            }else if(tipesebaran == 'groupBy_PASPAK_nilai'){
                title = 'Daftar Nilai Akhir Semester';
            }else if(tipesebaran=='raport_sementara'){
                title = 'Daftar Nilai Raport Sementara';
            }
        }else{
            title = 'Daftar Penilaian Harian';
            if(tipesebaran == 'groupBy_PTS_nilai'){
                title = 'Daftar Penilaian Tengah Semester';
            }else if(tipesebaran == 'groupBy_PASPAK_nilai'){
                title = 'Daftar Penilaian Akhir Kelas';
            }else if(tipesebaran=='raport_sementara'){
                title = 'Daftar Nilai Raport Sementara';
            }
            return title;

        }
        return title;
    }
    settingKolomTabelRekap(data){
        let result = [];
        let desain = {};
        if(data.length>0){
            let praResult = {};
            let baris1 = [];
            let baris2 = [];
            let baris3 = [];
            //elemenuniq untuk menentukan berapa banyak sel yang memiliki colspan;
            let elemenuniq = data.map(n=>n.elemen).filter((x,i,a)=>a.indexOf(x)==i);
            elemenuniq.forEach((idcp,i_idcp)=>{
                let baris = {};
                // let kbm_elemenuniq = elemenuniq.map(keyelemen=>data.filter(s=>s.elemen==keyelemen)[0]);
                let kbm_elemenuniq = data.filter(s=> s.elemen == idcp);
                
                // baris.kolom_ke = i_idcp;
                // baris.data = kbm_elemenuniq;
                baris.kode_elemen = idcp;

                //tp uniq;
                let tp_curent_idcp = data.filter(s=> s.elemen == idcp);
                let tp_curent_idcp_uniq = tp_curent_idcp.map(n=> n.tp).filter((x,i,a)=>a.indexOf(x)==i);
                
                baris.tp_uniq = tp_curent_idcp_uniq;
                
                let array_tp_atp = [];
                
                tp_curent_idcp_uniq.forEach((tp,i_tp)=>{
                    let baris2 = {};
                    let kbm_tpuniq = data.filter(s=>s.elemen==idcp && s.tp == tp);
                    let kbm_atp_uniq = data.filter(s=>s.elemen==idcp && s.tp == tp).map(tps=>tps.atp).filter((x,i,a)=>a.indexOf(x)==i);
                    baris2.kode_tp = tp;
                    baris2.data_tp_objek = kbm_tpuniq.map(n=>n.objek_kd[0]);
                    baris2.data_tp_string = kbm_tpuniq.map(n=>n.objek_kd[0].tp);
                    baris2.data_atp_uniq_array = kbm_atp_uniq;
                    baris2.data_kbm =  kbm_tpuniq;//

                    let atp_current_tp = [];
                    kbm_atp_uniq.forEach(atp=>{
                        let ob_kbm_atp = {};
                        let ob_atp_kbm = data.filter(s=>s.elemen==idcp && s.tp == tp && s.atp == atp);
                        ob_kbm_atp.data_kbm_array = ob_atp_kbm;
                        ob_kbm_atp.kode = atp;
                        atp_current_tp.push(ob_kbm_atp)
                    })
                    baris2.data_kbm_peratp = atp_current_tp;

                    array_tp_atp.push(baris2);
                    

                })
                
                baris._data_kbm_elemen_ini = kbm_elemenuniq;
                baris.data_elemen_string = kbm_elemenuniq[0].objek_kd[0].elemen;
                baris.data_elemen_objek = kbm_elemenuniq[0].objek_kd[0];
                baris.tp_atp = array_tp_atp;
                baris.colspan_baris1 = array_tp_atp.map(n=>n.data_kbm.length);
                result.push(baris);
            })

            
            desain.baris1_colspan = result.map(n=>n.colspan_baris1.reduce((a,b)=>parseInt(a)+b));
            desain.baris1_data = result.map(n=>n.data_elemen_string);
            desain.baris1_kode = result.map(n=>n.kode_elemen);
            desain.baris1_objek = result.map(n=>n.data_elemen_objek);

            desain.baris2_colspan = result.map(n=>n.colspan_baris1).flat(1);
            desain.baris2_kode = result.map(n=>n.tp_atp).flat(1).map(m=>m.kode_tp).flat(1);
            desain.baris2_data = result.map(n=>n.tp_atp).flat(1).map(m=>m.data_tp_string).flat(1);
            desain.baris2_objek = result.map(n=>n.tp_atp).flat(1).map(m=>m.data_tp_objek).flat(1);

            desain.baris3_colspan = result.map(n=>n.tp_atp).flat(1).map(m=>m.data_kbm_peratp).flat(1).map(l=>l.data_kbm_array.length)
            desain.baris3_data = result.map(n=>n.tp_atp).flat(1).map(m=>m.data_kbm_peratp).flat(1);//.map(l=>l.data_kbm_array).flat(1);;
            desain.baris3_objek = result.map(n=>n.tp_atp).flat(1).map(m=>m.data_kbm_peratp).flat(1);//.map(l=>l.data_kbm_array).flat(1);;
            
            desain.baris4_data = result.map(n=>n.tp_atp).flat(1).map(m=>m.data_kbm_peratp).flat(1).map(l=>l.data_kbm_array).flat(1);
            desain.baris4_objek = result.map(n=>n.tp_atp).flat(1).map(m=>m.data_kbm_peratp).flat(1).map(l=>l.data_kbm_array).flat(1);
            

        };

        return {result:result,desain:desain};
    }
    settingKolomTabelRekapKurtilas(data){
        let result = [];
        let desain = {};
        if(data.length>0){
            
            let uniq_kd = data.map(n=>n.kd).filter((x,i,a)=>a.indexOf(x)==i);
            
            uniq_kd.forEach(u_kd=>{
                let o_ukd={};
                //dapatkan semua kbm dengan kd ini
                let datamapel_current_ukd = data.filter(s=>s.kd == u_kd);
                o_ukd.kode_kd = u_kd;
                o_ukd.kode_kd_kbm = datamapel_current_ukd;
                o_ukd.kode_kd_objek = datamapel_current_ukd[0].objek_kd[0];
                o_ukd.colspan = datamapel_current_ukd.length;
                result.push(o_ukd);
            })
            desain.baris1_colspan = result.map(m=>m.colspan);
            desain.baris1_data = result.map(m=>m.kode_kd);
            desain.baris1_objek = result.map(m=>m.kode_kd_objek);

            desain.baris2_data =  result.map(m=>m.kode_kd_kbm).flat(1);
            // desain.baris2_data = result.map()
        };

        return {result:result,desain:desain};
    }
    selectingMapel(tipesebaran='groupBy_PH_nilai'){
        let elemenselect = document.querySelector(`[data-pradesain="${tipesebaran}"]`);
        
        elemenselect.onchange = (e)=>{
            this.workplace.innerHTML = e.target.value;
            let tipesebaran_nonnilai = tipesebaran.replace('_nilai','');
            let datasiswa = this.collectionsSiswa.data;
            let sebaranByMapel = this.datasebarankd.filter(s=> s.kodemapel == e.target.value);
            if(['PAI','PKRIS','PKATO'].includes(e.target.value)){
                datasiswa = this.collectionsSiswa.data.filter(s=>s.mapel_agama_kode == e.target.value);
            }
            let identitas = {
                title: this.keteranganTitlePenilaian(tipesebaran),
                mapelteks : sebaranByMapel[0].kodemapel_teks,
                semester :this.kbmFitur.user.semester,
                tapel: this.kbmFitur.user.tapel,
                rombel: this.rombel,
                isKurmer: this.isKurmer,
                jenistagihan:tipesebaran,
                kodemapel:e.target.value
            }
            let desain = this.settingKolomTabelRekap(sebaranByMapel[0][tipesebaran_nonnilai]).desain;
            let koleksi_kurikulum = this.settingKolomTabelRekap(sebaranByMapel[0][tipesebaran_nonnilai]).result
            if(!this.isKurmer){
                desain = this.settingKolomTabelRekapKurtilas(sebaranByMapel[0][tipesebaran_nonnilai]).desain;
                koleksi_kurikulum = this.settingKolomTabelRekapKurtilas(sebaranByMapel[0][tipesebaran_nonnilai]).result
            }
            
            if(this.isKurmer){
                this.workplace.innerHTML = viewOrmMapel.viewRekap(identitas,desain, datasiswa,koleksi_kurikulum);
            }else{
                this.workplace.innerHTML = viewOrmMapel.viewRekapKurtilas(identitas,desain, datasiswa,koleksi_kurikulum);
            }
            this.kbmFitur.tooltipkan();
            this.configButtonsKbm()
            let tb = new TableProperties(document.querySelector('#tabelnilaiasli'));
            tb.freezeColumn([2]);
            tb.addScrollUpDown();
            
        };
        elemenselect.dispatchEvent(new Event('change'));
    }
    selectingMapelRapor(){
        let elemenselect = document.querySelector(`[data-pradesain="rapor_sementara"]`);
        let sebaranDariTagihanBlangko = this.sebaranDariTagihanBlangko();
        
        elemenselect.onchange = (e)=>{
            this.workplace.innerHTML = e.target.value;
            // let tipesebaran_nonnilai = tipesebaran.replace('_nilai','');
            let datasiswa = this.collectionsSiswa.data;
            let sebaranByMapel = this.datasebarankd.filter(s=> s.kodemapel == e.target.value);
            if(['PAI','PKRIS','PKATO'].includes(e.target.value)){
                datasiswa = this.collectionsSiswa.data.filter(s=>s.mapel_agama_kode == e.target.value);
            }
            let identitas = {
                title: 'Nilai Raport Sementara',
                mapelteks : sebaranByMapel[0].kodemapel_teks,
                semester :this.kbmFitur.user.semester,
                tapel: this.kbmFitur.user.tapel,
                rombel: this.rombel,
                isKurmer: this.isKurmer,
                // jenistagihan:tipesebaran,
                kodemapel:e.target.value
            }
            let desain = sebaranDariTagihanBlangko.filter(s=> s.kodemapel == e.target.value)[0];

            this.workplace.innerHTML = viewOrmMapel.viewRekapRaporSementara(identitas,desain.raporAsli_olah,datasiswa);
            let tb = new TableProperties(document.querySelector('#tabelnilaiasli'));
            tb.freezeColumn([2]);
            tb.addScrollUpDown();
            
        };
        elemenselect.dispatchEvent(new Event('change'));
    }
    selectingMapelRaporKeterampilan(){
        let elemenselect = document.querySelector(`[data-pradesain="rapor_sementara"]`);
        let sebaranDariTagihanBlangko = this.sebaranDariTagihanBlangko();
        
        elemenselect.onchange = (e)=>{
            this.workplace.innerHTML = e.target.value;
            // let tipesebaran_nonnilai = tipesebaran.replace('_nilai','');
            let datasiswa = this.collectionsSiswa.data;
            let sebaranByMapel = this.datasebarankd.filter(s=> s.kodemapel == e.target.value);
            if(['PAI','PKRIS','PKATO'].includes(e.target.value)){
                datasiswa = this.collectionsSiswa.data.filter(s=>s.mapel_agama_kode == e.target.value);
            }
            let identitas = {
                title: 'Nilai Raport Sementara Keterampilan',
                mapelteks : sebaranByMapel[0].kodemapel_teks,
                semester :this.kbmFitur.user.semester,
                tapel: this.kbmFitur.user.tapel,
                rombel: this.rombel,
                isKurmer: this.isKurmer,
                // jenistagihan:tipesebaran,
                kodemapel:e.target.value
            }
            let desain = sebaranDariTagihanBlangko.filter(s=> s.kodemapel == e.target.value)[0];
            console.log(desain);

            this.workplace.innerHTML = viewOrmMapel.viewRekapRaporSementaraKeterampilan(identitas,desain.keterampilan_raporAsli_olah,datasiswa);
            let tb = new TableProperties(document.querySelector('#tabelnilaiasli'));
            tb.freezeColumn([2]);
            tb.addScrollUpDown();
            
        };
        elemenselect.dispatchEvent(new Event('change'));
    }
    configButtonsKbm(){
        let btns = document.querySelectorAll('[data-aksi]');
        btns.forEach(btn=>{
            btn.onclick =(e)=>{
                let fn = btn.getAttribute('data-aksi');
                let id = btn.getAttribute('data-id');
                if(this[fn]){
                    this[fn](id)
                }else{
                    console.log('Method belum dibuat/tidak berfungsi, ', fn)
                }
            }
        })
    }
    info(id){
        const data = this.kbmFitur.ormKBM.data.filter(s=> s.idbaris == id)[0];
        //import viewOlahNilaiKBM from "./viewOlahNilaiKbm";
        
        
        new InfoKbmModal(this.kbmFitur,data,this.Modal,this.Modal1,viewOlahNilaiKBM,this.kbmFitur.user).show();

    }
    
    async uploadnilai(id){
        const data = this.kbmFitur.ormKBM.data.filter(s=> s.idbaris == id)[0];
        
        let koreksian = new UploadCsv(this.kbmFitur,data,this.Modal, this.Modal1,this.user,this.init.bind(this));
            koreksian.createOrm().show();
            

        
    }
    
    editpublikasi(id){
        
        const data = this.kbmFitur.ormKBM.data.filter(s=> s.idbaris == id)[0];
        //import viewOlahNilaiKBM from "./viewOlahNilaiKbm";
        
        
        new InfoKbmModal(this.kbmFitur,data,this.Modal,this.Modal1,viewOlahNilaiKBM,this.user,this.init.bind(this)).showSettingPublikasi();
    }
    ormSiswaOnlyRaporAsli(){
        this.collectionsSiswa.addProperty('dataRapor',(item)=>{
            let datamapel = item.sebaran_mapel; //
            let result = [];
            datamapel.forEach(n=>{
                let ob_n={};
                if(n.tipemapel == 'agama'){
                    ob_n.kodemapel_umum= 'PA';
                }else{
                    ob_n.kodemapel_umum= n.kodemapel;
                }
                ob_n.kodemapel                          = n.kodemapel;
                ob_n.propertikurikulummapel             = n.propertikurikulummapel;
                ob_n.kodemapel_teks                     = n.kodemapel_teks;
                ob_n.kkmkktp_nilai                      = n.kkm;

                ob_n.raporAsli_nilai                    = n.nilaiRapor_asli??0;
                ob_n.raporAsli_nilai_predikat           = this.kbmFitur.findPredikatByNilai(n.nilaiRapor_asli)?this.kbmFitur.findPredikatByNilai(n.nilaiRapor_asli).predikat:'Cukup';
                ob_n.raporAsli_predikatMaks             = n.predikatMaks;
                ob_n.raporAsli_predikatMaks_objek       = n.predikatMaks_objek;
                ob_n.raporAsli_predikatMin              = n.predikatMin;
                ob_n.raporAsli_predikatMin_objek        = n.predikatMin_objek;
                //
                /**
                 * ob_sn.keterampilan_raporAsli_olah           
                    ob_sn.keterampilan_nilaiRapor_asli          
                    ob_sn.keterampilan_nilaiRapor_asli_predikat 
                    ob_sn.keterampilan_predikatMaks             
                    ob_sn.keterampilan_predikatMaks_objek       
                    ob_sn.keterampilan_predikatMin              
                    ob_sn.keterampilan_predikatMin_objek        
                 */
                ob_n.keterampilan_raporAsli_nilai                    = n.keterampilan_nilaiRapor_asli??0;
                ob_n.keterampilan_raporAsli_nilai_predikat           = n.keterampilan_nilaiRapor_asli_predikat;//'//this.kbmFitur.findPredikatByNilai(n.keterampilan_nilaiRapor_asli)?this.kbmFitur.findPredikatByNilai(n.keterampilan_nilaiRapor_asli).predikat:'Cukup';
                ob_n.keterampilan_raporAsli_predikatMaks             = n.keterampilan_predikatMaks;
                ob_n.keterampilan_raporAsli_predikatMaks_objek       = n.keterampilan_predikatMaks_objek;
                ob_n.keterampilan_raporAsli_predikatMin              = n.keterampilan_predikatMin;
                ob_n.keterampilan_raporAsli_predikatMin_objek        = n.keterampilan_predikatMin_objek;
                
                result.push(ob_n);
            })
            return result;
        });
        // this.collectionsSiswa.selectProperties(['id','pd_nama','sebaran_mapel','dataRapor']);
    }
    createDeskripsiRapor(data){
        let html = "";
        const {objek_maks,objek_min,predikat_maks,predikat_min} = data;
        if(this.isKurmer){
            html+='Ananda sudah ';
            html+= predikat_maks;
            html+=' dalam '
            html+= objek_maks.atp;
            html+= '<hr class="my-0">'
            
            html+='Ananda masih ';
            html+= predikat_min;
            html+=' dalam '
            html+= objek_min.atp;
        }else{
            html+='Ananda sudah ';
            html+= predikat_maks;
            html+=' dalam '
            html+= objek_maks.indikatorkd3;
            html+= ', dan Ananda ';
            html+= predikat_min;
            html+=' dalam '
            html+= objek_min.indikatorkd3;
        }
        return html;
    }
    createDeskripsiRaporKeterampilan(data){
        let html = "";
        const {objek_maks,objek_min,predikat_maks,predikat_min} = data;
       
            html+='Ananda sudah ';
            html+= predikat_maks??'Baik';
            html+=' dalam '
            html+= objek_maks.indikatorkd4;
            html+= ', dan Ananda ';
            html+= predikat_min??'Cukup';
            html+=' dalam '
            html+= objek_min.indikatorkd4;
        
        return html;
    }
    withNilaiRaporSiap(){
        
        let raportSiap = this.kbmFitur.service.data['nilai_raport_'+this.rombel];
        this.collectionsSiswa.addProperty('dataRapor_Siap',(item)=>{
            let result = [];
            let dataRapor = item.dataRapor;
            let isRaporSiap = raportSiap.length>0;
            dataRapor.forEach(data=>{
                let ob_data = {};
                ob_data.hasData = isRaporSiap;
                ob_data.raporSiap_nilai = data.raporAsli_nilai;
                ob_data.propertikurikulum = data.propertikurikulummapel;
                ob_data.kodemapel = data.kodemapel;
                if(isRaporSiap){
                    let datasiap = raportSiap.filter(s=>s.id== item.id);
                    if(datasiap.length>0){
                        let objek_datasiap = datasiap[0];
                        
                        
                        ob_data.kkmkktp_nilai = data.kkmkktp_nilai
                        ob_data[data.kodemapel]                     = objek_datasiap[data.kodemapel]                   //??data.raporAsli_nilai;
                        ob_data[data.kodemapel+'_P_PREDIKAT']       = objek_datasiap[data.kodemapel+'_P_PREDIKAT']     ??data.raporAsli_nilai_predikat;
                        ob_data[data.kodemapel+'_P_DESKRIPSI']      = objek_datasiap[data.kodemapel+'_P_DESKRIPSI']    ??this.createDeskripsiRapor( { objek_maks      : data.raporAsli_predikatMaks_objek, objek_min       : data.raporAsli_predikatMin_objek, predikat_maks   : data.raporAsli_predikatMaks, predikat_min    : data.raporAsli_predikatMin, });
                        ob_data['kdmaks_'+data.kodemapel]           = objek_datasiap['kdmaks_'+data.kodemapel]         ??data.raporAsli_predikatMaks_objek;
                        ob_data['kdmin_'+data.kodemapel]            = objek_datasiap['kdmin_'+data.kodemapel]          ??data.raporAsli_predikatMin_objek;
                        ob_data['predikat_kdmaks_'+data.kodemapel]  = objek_datasiap['predikat_kdmaks_'+data.kodemapel]??data.raporAsli_predikatMaks;
                        ob_data['predikat_kdmin_'+data.kodemapel]   = objek_datasiap['predikat_kdmin_'+data.kodemapel] ??data.raporAsli_predikatMin;
                        /**
                         * ob_n.keterampilan_raporAsli_nilai            
                            ob_n.keterampilan_raporAsli_nilai_predikat   
                            ob_n.keterampilan_raporAsli_predikatMaks     
                            ob_n.keterampilan_raporAsli_predikatMaks_obje
                            ob_n.keterampilan_raporAsli_predikatMin      
                            ob_n.keterampilan_raporAsli_predikatMin_objek        
                         */
                        ob_data[data.kodemapel+'_NILAI_KETERAMPILAN']       = objek_datasiap[data.kodemapel+'_NILAI_KETERAMPILAN']                                      ??data.keterampilan_raporAsli_nilai;
                        ob_data[data.kodemapel+'_K_PREDIKAT']       = objek_datasiap[data.kodemapel+'_K_PREDIKAT']                                      ??data.keterampilan_raporAsli_nilai_predikat;
                        ob_data[data.kodemapel+'_K_DESKRIPSI']      = objek_datasiap[data.kodemapel+'_K_DESKRIPSI']                                     ??this.createDeskripsiRaporKeterampilan( { objek_maks      : data.keterampilan_raporAsli_predikatMaks_objek, objek_min       : data.keterampilan_raporAsli_predikatMin_objek, predikat_maks   : data.ketrampilan_raporAsli_predikatMaks, predikat_min    : data.keterampilan_raporAsli_predikatMin, });
                        ob_data['kdmaks_'+data.kodemapel+'_KETERAMPILAN']           = objek_datasiap['kdmaks_'+data.kodemapel+'_KETERAMPILAN']          ??data.keterampilan_raporAsli_predikatMaks_objek;
                        ob_data['kdmin_'+data.kodemapel+'_KETERAMPILAN']            = objek_datasiap['kdmin_'+data.kodemapel+'_KETERAMPILAN']           ??data.keterampilan_raporAsli_predikatMin_objek;
                        ob_data['predikat_kdmaks_'+data.kodemapel+'_KETERAMPILAN']  = objek_datasiap['predikat_kdmaks_'+data.kodemapel+'_KETERAMPILAN'] ??data.keterampilan_raporAsli_predikatMaks;
                        ob_data['predikat_kdmin_'+data.kodemapel+'_KETERAMPILAN']   = objek_datasiap['predikat_kdmin_'+data.kodemapel+'_KETERAMPILAN']  ??data.keterampilan_raporAsli_predikatMin;
                    }else{
                        ob_data.kkmkktp = this.isKurmer?'KKTP':'KKKM'   ;
                        //ob_n.kkmkktp_nilai                      = n.kkm;
                        ob_data.kkmkktp_nilai = data.kkmkktp_nilai
                        ob_data[data.kodemapel]                 = data.raporAsli_nilai;
                        ob_data[data.kodemapel+'_P_PREDIKAT']   = data.raporAsli_nilai_predikat;
                        ob_data[data.kodemapel+'_P_DESKRIPSI']   = this.createDeskripsiRapor( { objek_maks      : data.raporAsli_predikatMaks_objek, objek_min       : data.raporAsli_predikatMin_objek, predikat_maks   : data.raporAsli_predikatMaks, predikat_min    : data.raporAsli_predikatMin, });
                        ob_data['kdmaks_'+data.kodemapel]               = data.raporAsli_predikatMaks_objek;
                        ob_data['kdmin_'+data.kodemapel]                = data.raporAsli_predikatMin_objek;
                        ob_data['predikat_kdmaks_'+data.kodemapel]      = data.raporAsli_predikatMaks;
                        ob_data['predikat_kdmin_'+data.kodemapel]       = data.raporAsli_predikatMin;

                        
                        ob_data[data.kodemapel+'_NILAI_KETERAMPILAN']       =data.keterampilan_raporAsli_nilai;
                        ob_data[data.kodemapel+'_K_PREDIKAT']       = data.keterampilan_raporAsli_nilai_predikat;
                        ob_data[data.kodemapel+'_K_DESKRIPSI']      = this.createDeskripsiRaporKeterampilan( { objek_maks      : data.keterampilan_raporAsli_predikatMaks_objek, objek_min       : data.keterampilan_raporAsli_predikatMin_objek, predikat_maks   : data.keterampilan_raporAsli_predikatMaks, predikat_min    : data.keterampilan_raporAsli_predikatMin, });
                        ob_data['kdmaks_'+data.kodemapel+'_KETERAMPILAN']           = data.keterampilan_raporAsli_predikatMaks_objek;
                        ob_data['kdmin_'+data.kodemapel+'_KETERAMPILAN']            = data.keterampilan_raporAsli_predikatMin_objek;
                        ob_data['predikat_kdmaks_'+data.kodemapel+'_KETERAMPILAN']  = data.keterampilan_raporAsli_predikatMaks;
                        ob_data['predikat_kdmin_'+data.kodemapel+'_KETERAMPILAN']   = data.keterampilan_raporAsli_predikatMin;
                    
                    }
                }else{
                    ob_data.kkmkktp_nilai = data.kkmkktp_nilai
                    ob_data[data.kodemapel]                         = data.raporAsli_nilai;
                    ob_data[data.kodemapel+'_P_PREDIKAT']           = (data.raporAsli_nilai_predikat=="Perlu Bimbingan")?"Cukup":data.raporAsli_nilai_predikat;
                    ob_data[data.kodemapel+'_P_DESKRIPSI']          = this.createDeskripsiRapor( { objek_maks      : data.raporAsli_predikatMaks_objek, objek_min       : data.raporAsli_predikatMin_objek, predikat_maks   : data.raporAsli_predikatMaks, predikat_min    : data.raporAsli_predikatMin, });
                    ob_data['kdmaks_'+data.kodemapel]               = data.raporAsli_predikatMaks_objek;
                    ob_data['kdmin_'+data.kodemapel]                = data.raporAsli_predikatMin_objek;
                    ob_data['predikat_kdmaks_'+data.kodemapel]      = data.raporAsli_predikatMaks;
                    ob_data['predikat_kdmin_'+data.kodemapel]       = data.raporAsli_predikatMin;
                    
                    ob_data[data.kodemapel+'_K_DESKRIPSI']          = this.createDeskripsiRaporKeterampilan( { objek_maks      : data.keterampilan_raporAsli_predikatMaks_objek, objek_min       : data.keterampilan_raporAsli_predikatMin_objek, predikat_maks   : data.keterampilan_raporAsli_predikatMaks, predikat_min    : data.keterampilan_raporAsli_predikatMin, });
                    ob_data[data.kodemapel+'_NILAI_KETERAMPILAN']         = data.keterampilan_raporAsli_nilai               
                    ob_data[data.kodemapel+'_K_PREDIKAT']        = data.keterampilan_raporAsli_nilai_predikat      
                    ob_data['kdmaks_'+data.kodemapel+'_KETERAMPILAN']             = data.keterampilan_raporAsli_predikatMaks_objek  
                    ob_data['kdmin_'+data.kodemapel+'_KETERAMPILAN']              = data.keterampilan_raporAsli_predikatMin_objek   
                    ob_data['predikat_kdmaks_'+data.kodemapel+'_KETERAMPILAN']    = data.keterampilan_raporAsli_predikatMaks        
                    ob_data['predikat_kdmin_'+data.kodemapel+'_KETERAMPILAN']     =  data.keterampilan_raporAsli_predikatMin         

                }

                result.push(ob_data);
            })
            return result;
        })
    }
    withNilaiSebelumnya(namatab,namamundur){
        let raportSiap = this.kbmFitur.service.data[namatab];
        
        this.collectionsSiswa.addProperty('dataRapor_Siap_Plus_Sebelumnya',(item)=>{
            let result = [];
            let dataRapor = item.dataRapor_Siap;
            let isRaporSiap = raportSiap.length>0;
            dataRapor.forEach(data=>{
                let ob_data = {};
                ob_data['hasData'          + namamundur]   = isRaporSiap;
                // ob_data[raporSiap_nilai  + namamundur]   = data.raporSiap_nilai;// = data.raporAsli_nilai;
                // ob_data[propertikurikulum+ namamundur]   = data.propertikurikulum   ;//= data.propertikurikulummapel;
                ob_data['kodemapel'        + namamundur]   = data.kodemapel ;//= data.kodemapel;
                if(isRaporSiap){
                    let datasiap = raportSiap.filter(s=>s.id== item.id);
                    if(datasiap.length>0){
                        let objek_datasiap = datasiap[0];
                        
                        ob_data.kkmkktp_nilai = data.kkmkktp_nilai
                        ob_data[data.kodemapel+namamundur]                     = objek_datasiap[data.kodemapel]                   
                        ob_data[data.kodemapel+'_NILAI_KETERAMPILAN'+namamundur]       = objek_datasiap[data.kodemapel+'_NILAI_KETERAMPILAN']     
                        ob_data[data.kodemapel+'_P_PREDIKAT'+namamundur]       = objek_datasiap[data.kodemapel+'_P_PREDIKAT']     
                        ob_data[data.kodemapel+'_P_DESKRIPSI'+namamundur]      = objek_datasiap[data.kodemapel+'_P_DESKRIPSI']    
                        ob_data['kdmaks_'+data.kodemapel+namamundur]           = objek_datasiap['kdmaks_'+data.kodemapel]         
                        ob_data['kdmin_'+data.kodemapel+namamundur]            = objek_datasiap['kdmin_'+data.kodemapel]          
                        ob_data['predikat_kdmaks_'+data.kodemapel+namamundur]  = objek_datasiap['predikat_kdmaks_'+data.kodemapel]
                        ob_data['predikat_kdmin_'+data.kodemapel+namamundur]   = objek_datasiap['predikat_kdmin_'+data.kodemapel] 
                    }else{
                        ob_data.kkmkktp = this.isKurmer?'KKTP':'KKKM'   ;
                        //ob_n.kkmkktp_nilai                      = n.kkm;
                        ob_data.kkmkktp_nilai = data.kkmkktp_nilai
                        ob_data[data.kodemapel+namamundur]                 = data.raporAsli_nilai;
                        ob_data[data.kodemapel+'_NILAI_KETERAMPILAN'+namamundur]   = data.keterampilan_raporAsli_nilai;
                        ob_data[data.kodemapel+'_P_PREDIKAT'+namamundur]   = data.raporAsli_nilai_predikat;
                        ob_data[data.kodemapel+'_P_DESKRIPSI'+namamundur]   = this.createDeskripsiRapor( { objek_maks      : data.raporAsli_predikatMaks_objek, objek_min       : data.raporAsli_predikatMin_objek, predikat_maks   : data.raporAsli_predikatMaks, predikat_min    : data.raporAsli_predikatMin, });
                        ob_data['kdmaks_'+data.kodemapel+namamundur]               = data.raporAsli_predikatMaks_objek;
                        ob_data['kdmin_'+data.kodemapel+namamundur]                = data.raporAsli_predikatMin_objek;
                        ob_data['predikat_kdmaks_'+data.kodemapel+namamundur]      = data.raporAsli_predikatMaks;
                        ob_data['predikat_kdmin_'+data.kodemapel+namamundur]       = data.raporAsli_predikatMin;
                    }
                }else{
                    ob_data.kkmkktp_nilai = data.kkmkktp_nilai
                    ob_data[data.kodemapel+namamundur]                   = data[data.kodemapel]                         ;//= data.raporAsli_nilai;
                    ob_data[data.kodemapel+'_NILAI_KETERAMPILAN'+namamundur]     = data[data.kodemapel+'_NILAI_KETERAMPILAN']           ;//= data.raporAsli_nilai_predikat;
                    ob_data[data.kodemapel+'_P_PREDIKAT'+namamundur]     = data[data.kodemapel+'_P_PREDIKAT']           ;//= data.raporAsli_nilai_predikat;
                    ob_data[data.kodemapel+'_P_DESKRIPSI'+namamundur]    = data[data.kodemapel+'_P_DESKRIPSI']          ;//= this.createDeskripsiRapor( { objek_maks      : data.raporAsli_predikatMaks_objek, objek_min       : data.raporAsli_predikatMin_objek, predikat_maks   : data.raporAsli_predikatMaks, predikat_min    : data.raporAsli_predikatMin, });
                    ob_data['kdmaks_'+data.kodemapel+namamundur]         = data['kdmaks_'+data.kodemapel]               ;//= data.raporAsli_predikatMaks_objek;
                    ob_data['kdmin_'+data.kodemapel+namamundur]          = data['kdmin_'+data.kodemapel]                ;//= data.raporAsli_predikatMin_objek;
                    ob_data['predikat_kdmaks_'+data.kodemapel+namamundur]= data['predikat_kdmaks_'+data.kodemapel]      ;//= data.raporAsli_predikatMaks;
                    ob_data['predikat_kdmin_'+data.kodemapel+namamundur] = data['predikat_kdmin_'+data.kodemapel]       ;//= data.raporAsli_predikatMin;


                }

                result.push(Object.assign({},data,ob_data));
            })
            return result;
        })
    }
}