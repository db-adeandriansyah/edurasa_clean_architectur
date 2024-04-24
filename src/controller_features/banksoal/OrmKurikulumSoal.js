import { CollectionsEdu } from "../../models/CollectionsEdu";

export default class OrmKurikulumSoal{
    #setingkurikul;
    #data;
    constructor(dataService,jenjangAktif,koleksimapel,jenjangArray=[]){
        this.dataService = dataService;
        this.jenjang = jenjangAktif;
        this.koleksimapel = koleksimapel;
        this.jenjangArray = jenjangArray;
        this.#setingkurikul='kurmer';
        this.#data=[];
    }
    get abjadFase(){
        return {
            "1":"A",
            "2":"A",
            "3":"B",
            "4":"B",
            "5":"C",
            "6":"C",
          }
    }
    settingKurikulum(x){
        this.#setingkurikul = x;
        return this;
    }
    get db(){
        return this.#data.data;
    }
    get collection(){
        return this.#data;

    }
    init(){
        this.#data = this['properti_'+this.#setingkurikul]();
        return this;
    }
    properti_kurmer(){
        // return new CollectionsEdu(this.dataService.data['fase'+this.abjadFase[this.jenjang]]);
        let tp = this.dataService.data['fase'+this.abjadFase[this.jenjang]];
        let cp = this.dataService.data.elemencp;
        let kkmkktp = this.dataService.data.kkmkktp;
        let koleksimapel = this.koleksimapel;
        return new CollectionsEdu(this.dataService.data['faseTPATP'])
                .customFilter((item)=>{
                    return item.kelas.toString().indexOf(this.jenjang)>-1;
                })
                .addProperty('tp',(item)=>tp.filter(s=> s.idbaris == item.foreignkey_tp)[0].tp)
                .addProperty('elemen',(item)=>cp.filter(s=> s.idbaris == item.foreignkey_elemencp)[0].elemen)
                .addProperty('cp_utama',(item)=>cp.filter(s=> s.idbaris == item.foreignkey_elemencp)[0].cp_utama)
                .addProperty('kodemapel',(item)=>cp.filter(s=> s.idbaris == item.foreignkey_elemencp)[0].kodemapel)
                .addProperty('kodemapel_teks',(item)=>koleksimapel[item.kodemapel])
                .addProperty('kkm',(item)=>kkmkktp.filter(s=> s.kodemapel == item.kodemapel && s.jenjang == this.jenjang)[0].kkm)
                .addProperty('pengayaan',(item)=>kkmkktp.filter(s=> s.kodemapel == item.kodemapel && s.jenjang == this.jenjang)[0].pengayaan)
    }
    properti_kurtilas(){
        
        let kkmkktp = this.dataService.data.kkmkktp;
        let jenjang = this.jenjang;
        return new CollectionsEdu(this.dataService.data['kelas'+this.jenjang])
        .exceptFilter({'indikatorkd3':''})
        .addProperty('kodemapel',(item)=>item.mapel)
        .addProperty('kkm',(item)=>kkmkktp.filter(s=> s.kodemapel == item.mapel && s.jenjang == jenjang)[0].kkm)
        .addProperty('pengayaan',(item)=>kkmkktp.filter(s=> s.kodemapel == item.mapel && s.jenjang == jenjang)[0].pengayaan)


    }
}