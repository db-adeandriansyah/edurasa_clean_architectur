import Observer from "./Observer";

export default class DcBankSoal extends Observer{
    constructor(service,faseKey,JenisKurikulum,collections,ormKurikulumSoal){
        super(service,faseKey,JenisKurikulum);
        this.collections = collections;
        this.ormKurikulumSoal = ormKurikulumSoal;
        this.ormKurikulum=null;
    }
    get taksonomibloom (){
        return this.service.data['taksonomibloom']
    }
    get paramUploadGambar(){
        return {
            folder      : 'GAMBAR ITEM SOAL',
            subfolder   : 'gambar paste'
        }
    }
    async needData(methodController){
        let apiNeeded = this[methodController]();
        let apiMustCall = apiNeeded.filter(s=> !this.cekServerExist(s.tabdb));
        
        if(apiMustCall.length>0){
            await this.service.readMultipleTab(apiMustCall);
        }
        
        this.ormKurikulum = new this.ormKurikulumSoal(this.service,this.jenjang,this.currentMapelOnClassRoom)
                            .settingKurikulum(this.shortKurikulum)
                            .init()
                            .collection;
        
    }
    api_kurikulum(){
        let ar = [
            this.api_taksonomibloom,
            this.api_kkmkktp,
            this.api_lingkupmateri,
            this.api_kdOrTp
        ];
        if(this.shortKurikulum == 'kurmer'){
            ar.push(this.api_elemencp);
            ar.push(this.api_faseTPATP);
        }
        return ar;
    }
    api_gambarTextEditor(subfolder=false){
        let api = {};
        api =  {
                    folder      : 'GAMBAR ITEM SOAL',
                    namafile    : '',
                    mimeType    : ''
                };
        if(subfolder){
            api.subfolder = 'Gambar Menjodohkan';
        }
    }
    item_soal(){
        return this.api_kurikulum();
    }
    desain_naskah(){
        return [...this.api_kurikulum(), this.api_banksoal, this.api_desainnaskah]
    }
}