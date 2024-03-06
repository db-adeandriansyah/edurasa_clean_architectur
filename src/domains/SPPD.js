export default class Sppd{
    #param;
    #result;
    constructor(data={}){
        this.#param= data;
        this.#result = {};
    }
    sanitize(){
        this.#result = {};
        
        Object.entries(this.#param).forEach(([k,v])=>{
            if(this.protected.includes(k)){
                this.#result[k] = v;
            }
        })
        return this;
    }
    addItem(key,value){
        this.#param[key] = value;
    }
    get data(){
        return this.#result;
    }
    get protected(){
        return [
            'idbaris',
            'ptk_diperintah',
            'ptk_golongan',
            'ptk_jabatan',
            'ptk_maksudsppd',
            'ptk_tempatsppd',
            'ptk_starttgl',
            'ptk_durasisppd',
            'ptk_nosppd',
            'resume',
            'arsip_nosppd',
            'versiupload',
            'refrensi_suratkeluar',
            'hapus'
        ];
    }
}