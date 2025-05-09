import viewAnalisisSoal from "./viewAnalisisSoal";

export default class analisisSoal{
    constructor(kbmFitur){
        this.kbmFitur = kbmFitur;
        this.resource = {}
    }
    user(auth){
        this.Auth  = auth;
        return this;
    }
    show(modal){
        
        const kbm = this.resource;
        let ukuran = Object.keys(JSON.parse(kbm.kuncikd)).map(n=> n.split('_')[0]+' = '+n.split('_')[1]).join('<br>');
        
        let data = {
            'namaguru':this.Auth,
            'idmapel':kbm.idmapel,
            'jenistagihan':kbm.jenistagihan,
            'kurikulum':'Kurikulum Merdeka',
            'tglpelaksanaan':new Date(kbm.idtgl).toLocaleString('id-ID',{dateStyle:'full'}),
            'muatanpelajaran':'',//[...new Set(datasoal.map(n=>namamapel[n.propSoal.mapel]))].join('<br>'),
            'ukurankompetensi':ukuran,
            'matericode':kbm.idbaris,
            'kelas':this.kbmFitur.rombel,//this.kbmFitur.siswa.filter(s=>s.nama_rombel == this.kbmFitur.rombel),
            'kkm':'',//this.database['kkmkktp'].filter(s=>s.jenjang == this.fokusJenjang)
        };
        
        let siswaRombel = this.kbmFitur.siswa.filter(s=>s.nama_rombel == this.kbmFitur.rombel);
        console.log(data);
        console.log(kbm);
        modal.showBodyHtml(viewAnalisisSoal.htmlAnalisiSoal(kbm.obj_desainnaskah[0].banksoal ,kbm.api_respon,siswaRombel,data));
        modal.show();
        return this;
    }
    data(idbariskbm){
        const kbm = this.kbmFitur.ormKBM.data.filter(s=> s.idbaris == idbariskbm)[0];
        
        this.resource = kbm;
        return this;
    }
}