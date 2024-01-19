export class Controller{
    #db;
    constructor(){
        this.#db = null;
    }
    isExist(tab){
        return this.db.hasOwnProperty(tab);
    }
    set db(x){
        this.#db = x;
    }
    get db(){
        return this.#db;
    }
    //kadang, kita perlu memanggil db yang perlu diupdate atau tidak;
    
}