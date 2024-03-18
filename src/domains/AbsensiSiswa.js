export default class AbsensiSiswa{
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
        return ["Time_Stamp",
                "id",
                "name",
                "kelas",
                "kehadiran",
                "fileContent",
                "resume",
                "action",
                "idbaris",
                "tokensiswa",
            ];
    }
    

}