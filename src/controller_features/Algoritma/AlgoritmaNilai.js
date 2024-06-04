export default class AlgoritmaNilai {
    constructor(){

    }
    static calculateByTagihan(obj_mapelkdNaskah,obje_tabrespon,spreadsheet_tabtagihan){
        let ar = [];
        obj_mapelkdNaskah.forEach(n=>{
            let obj = {};
            let nosoal = n.no_soal;//array
            let arrayNilai = nosoal.map(n=>Number(obje_tabrespon['SKOR_'+n]));
            let nilaiReduce = arrayNilai.reduce((a,b)=>a+b);
            let totalsoal = n.no_soal.length;
            let na = Number(((nilaiReduce/totalsoal)*100).toFixed(2));
            let kurikulum = n.objek_kd[0];
            

            obj.kd = n.kd;
            obj.kodemapel = kurikulum.kodemapel;
            obj.kodemapel_teks = kurikulum.kodemapel_teks;
            obj.key_tagihan = n.key_tagihan;
            obj.kd_object = kurikulum;
            obj.jenistagihan = n.jenistagihan;
            obj.nilai_respon = na;
            obj.nilai_tabtagihan = "";
            if(spreadsheet_tabtagihan[n.key_tagihan]){
                obj.nilai_tabtagihan = Number(spreadsheet_tabtagihan[n.key_tagihan]);
            }

            // obj.nilai_tabtagihan2 = spreadsheet_tabtagihan[n.key_tagihan];
            obj.spreadsheet_tabtagihan = spreadsheet_tabtagihan;
            obj.nosoal = nosoal;
            obj.arrayNilai = arrayNilai;
            ar.push(obj);

        })
        return ar;
    }
    static calculateByTagihaFromTabRespon(obj_mapelkdNaskah,obje_tabrespon,realNaskahKbm){
        let ar = [];
        obj_mapelkdNaskah.forEach(n=>{
            let obj = {};
            let nosoal = n.no_soal;//array
            let arrayNilai = nosoal.map(m=>Number(obje_tabrespon['SKOR_'+m]));
            let nilaiReduce = arrayNilai.reduce((a,b)=>a+b);
            let totalsoal = n.no_soal.length;
            let na = Number(((nilaiReduce/totalsoal)*100).toFixed(2));
            let kurikulum = n.objek_kd[0];
            

            obj.kd = n.kd;
            obj.kodemapel = kurikulum.kodemapel;
            obj.kodemapel_teks = kurikulum.kodemapel_teks;
            obj.key_tagihan = n.key_tagihan;
            obj.mapel_kd = n.mapel_kd;
            obj.kd_object = kurikulum;
            obj.jenistagihan = n.jenistagihan;
            obj.nilai_respon = na;//
            obj.namakurikulum = n.kurikulum;
            // obj.nilai_tabtagihan = Number(spreadsheet_tabtagihan[n.key_tagihan]);
            // obj.nilai_tabtagihan2 = spreadsheet_tabtagihan[n.key_tagihan];
            // obj.spreadsheet_tabtagihan = spreadsheet_tabtagihan;
            obj.nosoal = nosoal;
            obj.nosoalbybentuk =nosoal.map(kk=>realNaskahKbm.filter(kkk=>kkk.nosoal == kk)[0]?realNaskahKbm.filter(kkk=>kkk.nosoal == kk)[0].nobybentuk:kk);
            obj.arrayNilai = arrayNilai;
            obj.datasoal = n.no_soal_banksoal.map(m=>Object.assign({},m,{nilai:Number(obje_tabrespon['SKOR_'+m.nosoal]),'nobybentuk':realNaskahKbm.filter(kkk=>kkk.nosoal == m.nosoal)[0]?realNaskahKbm.filter(kkk=>kkk.nosoal == m.nosoal)[0].nobybentuk:m.nosoal}));
            ar.push(obj);

        })
        return ar;
    }
    static calculateByTagihaFromTabTagihan(obj_mapelkdNaskah,spreadsheet_tabtagihan,realNaskahKbm){
        let ar = [];
        obj_mapelkdNaskah.forEach(n=>{
            let obj = {};
            let nosoal = n.no_soal;//array
            // let arrayNilai = nosoal.map(n=>Number(obje_tabrespon['SKOR_'+n]));
            // let nilaiReduce = arrayNilai.reduce((a,b)=>a+b);
            // let totalsoal = n.no_soal.length;
            //let na = Number(((nilaiReduce/totalsoal)*100).toFixed(2));
            let kurikulum = n.objek_kd[0];
            

            obj.kd = n.kd;
            obj.kodemapel = kurikulum.kodemapel;
            obj.kodemapel_teks = kurikulum.kodemapel_teks;
            obj.key_tagihan = n.key_tagihan;
            obj.mapel_kd = n.mapel_kd;
            obj.kd_object = kurikulum;
            obj.jenistagihan = n.jenistagihan;
            obj.namakurikulum = n.kurikulum;
            obj.nilai_tabtagihan = "";
            if(spreadsheet_tabtagihan[n.key_tagihan]){
                obj.nilai_tabtagihan = Number(spreadsheet_tabtagihan[n.key_tagihan]);;//
            }

            // obj.nilai_tabtagihan = Number(spreadsheet_tabtagihan[n.key_tagihan]);
            // obj.spreadsheet_tabtagihan = spreadsheet_tabtagihan;
            obj.nosoal = nosoal;
            obj.nosoalbybentuk = nosoal.map(kk=>realNaskahKbm.filter(kkk=>kkk.nosoal == kk)[0]?realNaskahKbm.filter(kkk=>kkk.nosoal == kk)[0].nobybentuk:kk);
            // obj.arrayNilai = arrayNilai;
            ar.push(obj);

        })
        return ar;
    }
    static createPropertyRaport(refrensi, isKurmer, isGanjil,fn){
        let result = {};
        const {
            dataAllKbm_unique_nilai,
            groupBy_PH_nilai,
            groupBy_PTS_nilai,
            groupBy_PASPAK_nilai,
            propertikurikulummapel,
            predikatMax,
            predikatMin
        } = refrensi;
        // result.test = fn(80)
        result.kkm = propertikurikulummapel[0].kkm;

        if(isKurmer){ //kurmer
            /**
             * 
            // MENENTUKAN PREDIKAT RAPORT SEMENTARA;
            ----------------------------------------
             */
            // periksa dulu, apakah datanilai siswa ini memiliki kd unik di tagihan PH atau tidak;
            if(dataAllKbm_unique_nilai.length==0){
                
                    //gunakan refrensi dataAllKbm_unique_nilai; result.nilai_maks = cariMax;
                
                    result.raporAsli_nilaiMax_number = '';
                    if(isGanjil){
                        result.raporAsli_kdMax_object = propertikurikulummapel[1];
                        result.raporAsli_kdMin_object = propertikurikulummapel[0];
                    }else{
                        result.raporAsli_kdMax_object = propertikurikulummapel[propertikurikulummapel.length-1];
                        result.raporAsli_kdMin_object = propertikurikulummapel[propertikurikulummapel.length-2];
                    }

                    result.raporAsli_kdMax_predikat_string = 'Baik';

                    result.raporAsli_nilaiMin_number = '';
                    result.raporAsli_kdMin_predikat_string = 'Cukup';
                    
            }else if(dataAllKbm_unique_nilai.length == 1){
                let avoid = dataAllKbm_unique_nilai.filter(s=>Boolean(s.nilai));
                
                if(avoid.length == 0){
                    result.raporAsli_nilaiMax_number = '';
                    if(isGanjil){
                        result.raporAsli_kdMax_object = propertikurikulummapel[1];
                        result.raporAsli_kdMin_object = propertikurikulummapel[0];
                    }else{
                        result.raporAsli_kdMax_object = propertikurikulummapel[propertikurikulummapel.length-1];
                        result.raporAsli_kdMin_object = propertikurikulummapel[propertikurikulummapel.length-2];
                    }

                    result.raporAsli_kdMax_predikat_string = 'Baik';

                    result.raporAsli_nilaiMin_number = '';
                    result.raporAsli_kdMin_predikat_string = 'Cukup';
                }else{

                    let onlyNilai = avoid.map(n=>n.nilai);
                    let ubahTipe = onlyNilai.map(n=>Number(n));
                    let cariMax = Math.max(...ubahTipe);
                    let predikat = fn(cariMax).predikat;
                    let cariIndex = onlyNilai.findIndex(s=> s == cariMax);
                    let dataKdMax = avoid[cariIndex];
                    if(predikat == 'Perlu Bimbingan' || predikat == 'Cukup'){
                        predikat = 'Baik';
                    }
                    result.raporAsli_nilaiMax_number = cariMax;
                    result.raporAsli_kdMax_object = dataKdMax.objek_kd[0];
                    result.raporAsli_kdMax_predikat_string = predikat;
    
                    result.raporAsli_nilaiMin_number = '';
                    result.raporAsli_kdMin_object = propertikurikulummapel.filter(s=>s.idbaris != dataKdMax.kd)[0];
                    result.raporAsli_kdMin_predikat_string = 'Cukup';
                }

            }else{
                let avoid = dataAllKbm_unique_nilai.filter(s=>Boolean(s.nilai));
                
                if(avoid.length == 0){
                    result.raporAsli_nilaiMax_number = '';
                    if(isGanjil){
                        result.raporAsli_kdMax_object = propertikurikulummapel[1];
                        result.raporAsli_kdMin_object = propertikurikulummapel[0];
                    }else{
                        result.raporAsli_kdMax_object = propertikurikulummapel[propertikurikulummapel.length-1];
                        result.raporAsli_kdMin_object = propertikurikulummapel[propertikurikulummapel.length-2];
                    }

                    result.raporAsli_kdMax_predikat_string = 'Baik';

                    result.raporAsli_nilaiMin_number = '';
                    result.raporAsli_kdMin_predikat_string = 'Cukup';
                }else{
                    let onlyNilai = avoid.map(n=>n.nilai);
                    let ubahTipe = onlyNilai.map(n=>Number(n));
                    let cariMax = Math.max(...ubahTipe);
                    let cariMin = Math.min(...ubahTipe);
                    let predikat = fn(cariMax).predikat;
                    let predikatMin = fn(cariMin).predikat;
                    let cariIndex = onlyNilai.findIndex(s=> s == cariMax);
                    let cariIndexMin = onlyNilai.findIndex(s=> s == cariMin);
                    // let dataKdMax = dataAllKbm_unique_nilai[cariIndex];
                    // let dataKdMin = dataAllKbm_unique_nilai[cariIndexMin];
                    let dataKdMax = avoid[cariIndex];
                    let dataKdMin = avoid[cariIndexMin];
    
                    if(predikat == 'Perlu Bimbingan' || predikat == 'Cukup'){
                        predikat = 'Baik';
                    }
                    if(predikatMin == 'Perlu Bimbingan'){
                        predikatMin = 'Cukup';
                    }
                    let notDuplicate = true;
    
                    if(dataKdMax.kd == dataKdMin.kd){
                        notDuplicate = false;
                        dataKdMin = propertikurikulummapel.filter((s,i)=>i!== cariIndex)[0];
                    }
                    
                    result.raporAsli_nilaiMaks_number = cariMax;
                    result.raporAsli_kdMax_object = dataKdMax.objek_kd[0];
                    result.raporAsli_kdMax_predikat_string = predikat;
    
                    result.raporAsli_nilaiMin_number = cariMin;
                    if(notDuplicate){
                        result.raporAsli_kdMin_object = dataKdMin.objek_kd[0];
                    }else{
                        result.raporAsli_kdMin_object = dataKdMin;
    
                    }
    
                    result.raporAsli_kdMin_predikat_string = predikatMin

                }

            };

            /**
             * MENENTUKAN NILAII RAPORT
             */

            //uniqPH = 
            let uniqPH=[];
            let kd_uniq_ph = groupBy_PH_nilai.map(n=>n.kd).filter((x,i,a)=>a.indexOf(x)==i);
                kd_uniq_ph.forEach(n=>{
                    let ob_n={};
                    let data = groupBy_PH_nilai.filter(s=> s.kd == n).map(m=>m.nilai!=undefined?Number(m.nilai):0);
                    let total =  data.reduce((a,b)=>a+b);
                    ob_n.kd=n;
                    ob_n.koleksi_nilai = data;
                    ob_n.niai_kd =Number((total/data.length).toFixed(2));
                    uniqPH.push(ob_n);

                });
            let uniqPTS = [];
            let kd_uniq_PTS = groupBy_PTS_nilai.map(n=>n.kd).filter((x,i,a)=>a.indexOf(x)==i);
                kd_uniq_PTS.forEach(n=>{
                    let ob_n={};
                    let data = groupBy_PTS_nilai.filter(s=> s.kd == n).map(m=>m.nilai!=undefined?Number(m.nilai):0);
                    let total =  data.reduce((a,b)=>a+b);
                    ob_n.kd=n;
                    ob_n.koleksi_nilai = data;
                    ob_n.niai_kd =Number((total/data.length).toFixed(2));
                    uniqPTS.push(ob_n);
                });

            let uniqPASPAK = [];
            let kd_uniq_PASPAK = groupBy_PASPAK_nilai.map(n=>n.kd).filter((x,i,a)=>a.indexOf(x)==i);
                kd_uniq_PASPAK.forEach(n=>{
                    let ob_n={};
                    let data = groupBy_PASPAK_nilai.filter(s=> s.kd == n).map(m=>m.nilai!=undefined?Number(m.nilai):0);
                    let total =  data.reduce((a,b)=>a+b);
                    ob_n.kd=n;
                    ob_n.koleksi_nilai = data;
                    ob_n.niai_kd =Number((total/data.length).toFixed(2));
                    uniqPASPAK.push(ob_n);
                });
            result.raporAsli_uniqPH = uniqPH;
            result.raporAsli_uniqPTS = uniqPTS;
            result.raporAsli_uniqPASPAK = uniqPASPAK;

            result.raporAsli_nilaiRapor = 0;
            let mergeNilai = [...uniqPH,...uniqPTS,...uniqPASPAK];
            result._mergeNilai = mergeNilai;
            if(mergeNilai.length>0){
                let onlyNilai = mergeNilai.map(n=>n.niai_kd);
                let total = onlyNilai.reduce((a,b)=>a+b);
                let rerata = Math.round(total/onlyNilai.length);
                result.raporAsli_nilaiRapor_map = onlyNilai;
                result.raporAsli_nilaiRapor = rerata;
            }

            // result.raporAsli_olah = {
            //     'PH':uniqPH,
            //     'PTS':uniqPTS,
            //     'PASPAK':uniqPASPAK,
            //     'kdMax':result.raporAsli_kdMax_object,
            //     ''
            // }


        }else{ // kurtilas
            let uniqKD =[];
            let allkds = dataAllKbm_unique_nilai.map(n=>n.kd);

            if(isGanjil){
                result.raporAsli_kdMax_object = propertikurikulummapel[1];
                result.raporAsli_kdMin_object = propertikurikulummapel[0];
            }else{
                result.raporAsli_kdMax_object = propertikurikulummapel[propertikurikulummapel.length-1];
                result.raporAsli_kdMin_object = propertikurikulummapel[propertikurikulummapel.length-2];
            }
            allkds.forEach(kd=>{
                let pembagi = 0;
                let kd_dataph = {};
                let kd_kbmph_kd_ini = groupBy_PH_nilai.filter(s=>s.kd == kd);
                let kd_kbmpts_kd_ini = groupBy_PTS_nilai.filter(s=> s.kd == kd);
                let kd_kbmpaspak_kd_ini = groupBy_PASPAK_nilai.filter(s=> s.kd == kd);
                let kd_niliMax_kbmph_kd_ini = 0;
                let kd_nilaiRerata_pts = 0;
                let kd_nilaiRerata_paspak = 0;
                
                let maping_ph = [],maping_pts=[],maping_paspak=[];
                if(kd_kbmph_kd_ini.length>0){
                    pembagi+=2;

                    let mapingNilai = kd_kbmph_kd_ini.map(n=>(n.nilai==""||n.nilai ==undefined)?0:Number(n.nilai));
                    let findMax = Math.max(...mapingNilai);
                    kd_niliMax_kbmph_kd_ini = findMax;
                    maping_ph = mapingNilai;
                }
                kd_dataph.mapingNilai_ph = maping_ph;

                if(kd_kbmpts_kd_ini.length>0){
                    pembagi+=1;
                    let mapingNilai = kd_kbmpts_kd_ini.map(n=>(n.nilai==""||n.nilai ==undefined)?0:Number(n.nilai));
                    let total = mapingNilai.reduce((a,b)=>a+b);
                    let rerata = Number((total/mapingNilai.length).toFixed(2));
                    kd_nilaiRerata_pts = rerata;
                    maping_pts = mapingNilai;

                }
                kd_dataph.maingNilai_pts = maping_pts;

                if(kd_kbmpaspak_kd_ini.length>0){
                    pembagi+=1;
                    let mapingNilai = kd_kbmpaspak_kd_ini.map(n=>(n.nilai==""||n.nilai ==undefined)?0:Number(n.nilai));
                    let total = mapingNilai.reduce((a,b)=>a+b);
                    let rerata = Number((total/mapingNilai.length).toFixed(2));
                    kd_nilaiRerata_paspak = rerata;
                    maping_paspak = mapingNilai;

                }
                kd_dataph.mapingNilai_paspak =maping_paspak
                kd_dataph.kode_kd = kd;
                kd_dataph.kode_kd_objek = propertikurikulummapel.filter(s=> s.kd3==kd)[0]
                kd_dataph.dataKbmPh = kd_kbmph_kd_ini;
                kd_dataph.nilaiph = kd_niliMax_kbmph_kd_ini;

                kd_dataph.dataKbmPts = kd_kbmpts_kd_ini;
                kd_dataph.nilaipts = kd_nilaiRerata_pts;

                kd_dataph.dataKbmPaspak = kd_kbmpaspak_kd_ini;
                kd_dataph.nilaipaspak = kd_nilaiRerata_paspak;


                kd_dataph.pembagi = pembagi;
                kd_dataph.nilaiKd = Number(((kd_niliMax_kbmph_kd_ini+kd_nilaiRerata_pts+kd_nilaiRerata_paspak)/pembagi).toFixed(2));
                // kd_dataph.nilaiKd = ((kd_niliMax_kbmph_kd_ini+kd_nilaiRerata_pts+kd_nilaiRerata_paspak)/pembagi);

                uniqKD.push(kd_dataph);
            });

            result.raporAsli_olah = uniqKD;

            //menentukan predikat maks dan min untuk kd tiap mapel;
            // pastikan punya allkds;
            if(allkds.length>0){
                let maping_nilaikd = uniqKD.map(n=>n.nilaiKd);
                let findMax = Math.max(...maping_nilaikd);
                let indexFindMax = uniqKD.filter(s=> s.nilaiKd == findMax);
                let findMin = Math.min(...maping_nilaikd);
                let indexFindMin = uniqKD.filter(s=> s.nilaiKd == findMin);
                
                result._maping_nilaikd = maping_nilaikd;
                result._findMax = findMax;
                result._indexFindMax = indexFindMax;
                result._findMin = findMin;
                result._indexFindMin = indexFindMin;
                result.raporAsli_kdMax_object = indexFindMax[0].kode_kd_objek;
                result.raporAsli_kdMin_object = indexFindMin[0].kode_kd_objek;
                result.raporAsli_kdMax_predikat_string = fn(findMax).predikat
                result.raporAsli_kdMin_predikat_string = fn(findMin).predikat
                if(indexFindMax[0].kode_kd == indexFindMin[0].kode_kd){
                    //define sisa;
                    indexFindMin = uniqKD.filter(s=>s.nilaiKd != findMax);
                    if(indexFindMin.length==0){
                        // indexFindMin = propertikurikulummapel.filter(s=>s.kd != indexFindMax[0].kode_kd)[0];
                        result.raporAsli_kdMin_object = propertikurikulummapel.filter(s=>s.kd != indexFindMax[0].kode_kd)[0];
                    }
                };
                
                //nilai raport;
                let reducing = maping_nilaikd.reduce((a,b)=>a+b);
                let rerata = Math.round(reducing/maping_nilaikd.length);
                let predikatrapor = fn(rerata).predikat;
                result.raporAsli_nilaiRapor = rerata;
                if(predikatrapor == 'Perlu Bimbingan' || predikatrapor == 'Cukup'){
                    predikatrapor = predikatMin;
                }
                result.raporAsli_nilaiRapor_predikat = fn(rerata).predikat;
            }
        }
        return result;
    }
}