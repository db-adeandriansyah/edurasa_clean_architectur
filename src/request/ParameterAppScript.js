export default class ParameterAppScript{
    #jenjang;
    constructor(repo,faseKey){
        this.repo = repo;
        this.#jenjang = 1;
        this.faseKey= faseKey
    }

    set fokusJenjang (x){
        this.#jenjang = x;
    }

    get fokusJenjang(){
        return this.#jenjang;
    }

    get namaFase(){
        return this.faseKey[this.#jenjang];
    }

    /**
     * boolean
     */
    get isTrial(){
        return this.repo.trial
    }

    //spradsheet KALENDER, include;
    // banksoal
    // kalender
    // suratmasuk/suratkeluar
    // sppd

    /**
     * string
     * id spreadsheet Kalender;
     */
    get idssKalender(){
        return this.isTrial?this.repo.ssTrial:this.repo.appscript.ss_kalender;
    }

    // spreadsheet Materi, terdiri dari tab;
    // - kkmkktp
    // - faseTPATP
    // - dll.

    /**
     * string
     */
    get idssMateri(){
        return this.isTrial?this.repo.ssTrial:this.repo.appscript.ss_materi;
    }

    get idssNilai(){
        return this.isTrial?this.repo.ssTrial:this.repo.appscript['ss_nilai_'+this.#jenjang];
    }
    get idssAbsen(){
        return this.isTrial?this.repo.ssTrial:this.repo.appscript['ss_absen_'+this.#jenjang];
    }

    get api_taksonomibloom(){
        return this.createParamTab(this.idssMateri,'taksonomibloom','taksonomibloom')
    }
    get api_kkmkktp(){
        return this.createParamTab(this.idssMateri,'kkmkktp','kkmkktp')
    }
    get api_lingkupmateri(){
        return this.createParamTab(this.idssMateri,'lingkupmateri','lingkupmateri')
    }
    get api_faseTPATP(){
        return this.createParamTab(this.idssMateri,'faseTPATP','faseTPATP')
    }
    get api_elemencp(){
        return this.createParamTab(this.idssMateri,'elemencp','elemencp')
    }
    get api_kdOrTp(){
        return this.createParamTab(this.idssMateri,this.namaFase,this.namaFase)
        // if(this.shortKurikulum == 'kurmer'){
        //     return this.createParamTab(this.idssMateri,this.namaFase,this.namaFase)
        // }else{
        //     return this.createParamTab(this.idssMateri,'kelas'+this.#jenjang,'kelas'+this.#jenjang);
        // }
    }
    //Fungsi Untuk membuat parameter
    createParamTab(idss,tabServer,tabDb){
        return {
            'idss'  : idss,
            'tab'   : tabServer,
            'tabdb' : tabDb
        }
    }
}