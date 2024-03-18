export default class Kalender {
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
                "time_stamp",
                "keterangan",
                "start_tgl",
                "end_tgl",
                "oleh",
                "aksi",
                "idbaris",
                "warna",
                "libur_he_heb",
                "he",
                "heb",
                "libur",
                "background-color",
                "color",
                "hapus"
            ];
    }
    
}