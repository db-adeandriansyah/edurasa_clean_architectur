export class SuratMasuk{
    #db;
    
    constructor(data){
        this.#db = data;
    }
    init(){
        const {

        } = data;
        
    }
    get data(){
        return this.#db;
    }
    findByValue(query){
        return this.#db.filter(m=>Object.entries(m).filter(([k,v])=>v.toString().toLowerCase().indexOf(query.toLowerCase())>-1).length!==0);
    }
    findById(id){
        return this.#db.filter(s=>s.idbaris == id);
    }
}