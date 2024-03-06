export default class SuratKeluar{
    #param;
    #result;
    constructor(data=null){
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
    get data(){
        return this.#result;
    }
    get protected(){
        return [
            'idbaris',
            'nosurat',
            'id_nosurat',
            'tglsurat',
            'perihal',
            'indekssurat',
            'ditujukkankepada',
            'idfile',
            'status',
            'oleh',
            'user',
            'target_siswa',
            'target_ptk',
            'refrensi_suratmasuk'
        ];
    }
    

    
}