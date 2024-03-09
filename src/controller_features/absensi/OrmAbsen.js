// import UrlImg from "../../controllers/UrlImg";
import { CollectionsEdu } from "../../models/CollectionsEdu";
import { FormatTanggal } from "../../utilities/FormatTanggal";

export default class OrmAbsen{
    constructor(absen,siswa,ormkaldik,UrlImg){
        this.absen = absen;//new CollectionsEdu(absen);//collection
        this.siswa = new CollectionsEdu(siswa); //collection
        this.ormkaldik = ormkaldik;
        this.UrlImg = UrlImg;
        this.rombel = '1A';
        this.jenjang = 1;
        this.curr_collectionAbsenJenjang = null;
        this.currentDataIndexAbsenByJenjang = -1;
    }

    settingKelas(rombel){
        this.rombel = rombel;
        this.jenjang = parseInt(rombel);
        
        let currentDataAbsenByJenjang = this.absen.filter(s=> s.jenjang == this.jenjang);
        
        this.curr_collectionAbsenJenjang  = new CollectionsEdu(currentDataAbsenByJenjang[0].data)
                                            .addProperty('idfileimg',(item)=>{
                                                    return new this.UrlImg(item.fileContent).urlImg
                                            });
        
        this.currentDataIndexAbsenByJenjang = this.absen.findIndex(s=> s.jenjang == this.jenjang);

        return this;
    }

    dataAbsenPerBulan(bulan, tagsabtu){
        let data = [];
        let kaldikbulanini = this.ormkaldik.dataTanggalan(bulan,tagsabtu);
        this.currentRombel.forEach(siswa => {
            let obj={};
            obj.tokensiswa = siswa.id;
            obj.namasiswa = siswa.pd_nama;
            let arKaldik = [];
            let arIds = [];
            kaldikbulanini.forEach(n=>{
                let strkey = siswa.id  +'_'+n.keytgl;
                let kehadiransiswa = this.curr_collectionAbsenJenjang.simpleFilter({'id':n.keytgl,'tokensiswa':siswa.id}).data;
                let objekkehadiran = {};
                objekkehadiran.id = strkey;
                objekkehadiran.data = kehadiransiswa;
                
                arKaldik.push(Object.assign({},objekkehadiran,n));
                arIds.push(objekkehadiran);

            });
            // obj.datakaldik = arKaldik;
            // obj.querysiswa =arIds
            obj.data = arKaldik;
            data.push(obj);
        });
        return {dataabsen:data,datakalender:kaldikbulanini};
    }

    get currentRombel(){
        return this.siswa.simpleFilter({'nama_rombel':this.rombel,'aktif':'aktif'}).data
    }
    
    get kodehariini(){
        return new FormatTanggal(new Date()).idStringAbsen();
    }
    
    get tesSiswarombel(){
        return this.siswa.siswaRombel;
    }

    get currentRombelHariIni(){
        
        return this.curr_collectionAbsenJenjang.simpleFilter({'kelas':this.rombel,id:this.kodehariini}).data ;//this.siswa.simpleFilter({'nama_rombel':this.rombel,'aktif':'aktif'}).data;
    }

}