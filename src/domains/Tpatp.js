export default class Tpatp{
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
            "foreignkey_elemencp",
            "foreignkey_tp",
            "atp",
            "kelas",
            "profilpancasila",
            "penjelasan_profil"
        ];
    }
}