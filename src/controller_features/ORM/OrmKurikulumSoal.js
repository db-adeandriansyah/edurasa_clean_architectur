export default class OrmKurikulumSoal{
    #fokusJenjang;
    
    constructor(classCollectionsEdu, data,faseKey,jenjang=1){
        this.data = data;
        this.faseKey = faseKey;
        this.#fokusJenjang = jenjang; //default;
        this.classCollectionsEdu = classCollectionsEdu;
    }
    
    set jenjang (x){
        this.#fokusJenjang = x;
    }
    get jenjang(){
        return this.#fokusJenjang;
    }

    get dataFase(){
        return this.data[this.faseKey];
    }

    get taksonomibloom(){
        return this.data.taksonomibloom;
    }
    get elemencp(){
        return this.data.elemencp;
    }
    get kkmkktp(){
        return this.data.kkmkktp;
    }
    get koleksimapel(){
        return this.data.koleksimapel;
    }
    get lingkupmateri(){
        return this.data.lingkupmateri
    }
    get faseTPATP(){
        return this.data.faseTPATP
    }

    /**
     * @returns CollectionsEdu type
     * @info : koleksi 
     */
    get collections(){ // type CollectionsEdu
        // return new CollectionsEdu(this.dataService.data['fase'+this.abjadFase[this.jenjang]]);
        let tp              = this.dataFase;
        let cp              = this.elemencp;
        let kkmkktp         = this.kkmkktp;
        let koleksimapel    = this.koleksimapel;
        let ruanglingkup    = this.lingkupmateri
        return new this.classCollectionsEdu(this.faseTPATP)
                .customFilter((item)=>{
                    return item.kelas.toString().indexOf(this.jenjang.toString())>-1;
                })
                .addProperty('namaFase',this.faseKey)
                .addProperty('tp',(item)=>tp.filter(s=> s.idbaris == item.foreignkey_tp).length>0?tp.filter(s=> s.idbaris == item.foreignkey_tp)[0].tp:'faseTPATP/id_tp bermasalah di baris='+item.idbaris)
                .addProperty('elemen',(item)=>cp.filter(s=> s.idbaris == item.foreignkey_elemencp).length>0?cp.filter(s=> s.idbaris == item.foreignkey_elemencp)[0].elemen:'faseTPATP/id_elemencp bermasalah di baris='+item.idbaris)
                .addProperty('cp_utama',(item)=>cp.filter(s=> s.idbaris == item.foreignkey_elemencp).length>0?cp.filter(s=> s.idbaris == item.foreignkey_elemencp)[0].cp_utama:'faseTPATP/id_elemencp bermasalah di baris='+item.idbaris)
                .addProperty('kodemapel',(item)=>cp.filter(s=> s.idbaris == item.foreignkey_elemencp).length>0?cp.filter(s=> s.idbaris == item.foreignkey_elemencp)[0].kodemapel:'faseTPATP/id_elemencp bermasalah di baris='+item.idbaris)
                .addProperty('kodemapel_teks',(item)=>koleksimapel[item.kodemapel])
                .addProperty('lingkupmateri',(item)=>ruanglingkup.filter(s=> s.kodemapel == item.kodemapel))
                .addProperty('ruanglingkup',(item)=>ruanglingkup.filter(s=> s.kodemapel == item.kodemapel))
                .addProperty('kkm',(item)=>kkmkktp.filter(s=> s.kodemapel == item.kodemapel && s.jenjang == this.jenjang).length>0?kkmkktp.filter(s=> s.kodemapel == item.kodemapel && s.jenjang == this.jenjang)[0].kkm:72)
                .addProperty('pengayaan',(item)=>kkmkktp.filter(s=> s.kodemapel == item.kodemapel && s.jenjang == this.jenjang).length>0?kkmkktp.filter(s=> s.kodemapel == item.kodemapel && s.jenjang == this.jenjang)[0].pengayaan:90)
                
    }
}