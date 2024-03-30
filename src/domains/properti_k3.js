export default class properti_k3{
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
        return [ "mapel","kd3","indikatorkd3","kd4","indikatorkd4","kkm","cekliskd3","cekliskd4","arraykko","lingkupmateri","materiesensial","lk","kelas","baris","taksonomibloom","semester1","semester2" ];
    }
}