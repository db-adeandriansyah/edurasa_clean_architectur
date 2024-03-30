export default class Taksonomibloom{
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
    addItem(key,value){
        this.#param[key] = value;
        return this;
    }
    get data(){
        return this.#result;
    }
    get protected(){
        return [ "idbaris","tipe","nama_taksonomi","kko","levelkognitif","levelkognitif_definisi" ];
    }
}