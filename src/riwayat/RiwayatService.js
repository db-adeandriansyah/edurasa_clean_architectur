import RiwayatModel from "./RiwayatModel";

export default class RiwayatService extends RiwayatModel{
    
    constructor( repo,kodeTapel ){
        super();
        this.repo = repo;
        this.kode_tapel = kodeTapel;
        this.data = {};
    }
    
    addDataService(key,data){
        this.data[key] = data;
    }
    get apply_kurikulum(){
        return this.statusKurikulum(this.kode_tapel)
    }
    async dataRaport(rombel){
        

        const api =  await this.repo.dataRapor(rombel);
        
        return {
            rombel: rombel,
            srcTab: api.info.namaTab,
            kurikulum: this.apply_kurikulum['kelas_'+parseInt(rombel)],
            data: api.data,
            jsonApi: this.repo.makro
        }
    }
    init(rombel){
        console.log('attribute dan method pada repo', this.repo)
        console.log('riwayat kurikulum', this.apply_kurikulum);
        console.log('kelas ini',parseInt(rombel), rombel,'menerapkan kurikulum', this.apply_kurikulum['kelas_'+parseInt(rombel)] );
    }
    //

}