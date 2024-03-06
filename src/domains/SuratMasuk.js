export default class SuratMasuk{
    #param;
    #result;
    constructor(data={}){
        this.#param = data;
        this.#result={};
    }
    addItem(key,value){
        this.#result[key] = value;
    }
    get data(){
        return this.#result;
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
    get protected(){
        return [
            'idbaris',
            'tglditerima',
            'nosurat',
            'asalsurat',
            'tglsurat',
            'perihal',
            'indekssurat',
            'ditujukkankepada',
            'idfile',
            'status',
            'oleh',
            'user'
        ];
    }


}