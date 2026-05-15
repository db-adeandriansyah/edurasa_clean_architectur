
import { MakroInduk } from "./MakroInduk";
export default class RiwayatFacade{
    static riwayatSetting(currentKey, requestKey,currentRombel){
        const currentJenjang  = parseInt(currentRombel);
        const splitingCurrentTapel = currentKey.split('_')[1];
        const splitingRequestTapel = requestKey.split('_')[1];
        const splitingCurrentSemester = currentKey.split('_')[3];
        const splitingRequestSemester = requestKey.split('_')[3];
        const selisihTapel = parseInt(splitingCurrentTapel - splitingRequestTapel);
        const selisihTapelSatuan= (selisihTapel/101);
        const targetRombel = selisihTapel?currentJenjang-selisihTapelSatuan:currentJenjang;
        const targetSemester = splitingRequestSemester;
        const currentSemester = splitingCurrentSemester;
        const currentKodeTapel = splitingCurrentTapel;
        const targetKodeTapel = splitingRequestTapel;
        console.log('riwayat setting',{
            currentJenjang,
            targetRombel,
            selisihTapel,
            selisihTapelSatuan,
            splitingCurrentTapel,
            splitingRequestTapel
        });
        const abjad = currentRombel.match(/[A-D]/g)[0];
        const indukMakro = MakroInduk.find(item=>item.tapel == splitingRequestTapel);
        const kurikulumTarget = indukMakro['kelas_'+targetRombel+'_kurikulum'];
        const idSs = indukMakro.idss;
        const koleksiMapel = indukMakro['kelas_'+targetRombel+'_mapel'];
            
        const tapel           ='20'+ targetKodeTapel.slice(0,2)+'/20'+ targetKodeTapel.slice(2,4);
        const tapelCurrent    ='20'+ currentKodeTapel.slice(0,2)+'/20'+ currentKodeTapel.slice(2,4);
        const kelas = targetRombel;
        const kelasExist = targetRombel>0;
        const namaRombel = kelasExist?kelas + abjad:currentJenjang+abjad;
        let result = {};
            result.kodeTapelTarget  = splitingRequestTapel;
            
            result.current = {
                rombel:currentRombel,
                tapel:tapelCurrent,
                semester:currentSemester,
                kode_tapel:currentKodeTapel

            }
            result.target ={
                rombel:namaRombel,
                jenjang :kelas,
                tapel:tapel,
                semester:targetSemester,
                kurikulum:kurikulumTarget,
                kode_tapel:targetKodeTapel,
                idss : idSs,
                mapel: koleksiMapel,
                mapelsiswa:(kelas)=>indukMakro['kelas_'+kelas+'_mapel']
            }
            result.next = kelasExist
            return result
            
    }
}