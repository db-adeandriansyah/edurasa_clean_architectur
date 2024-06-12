export default class Facades{
    #_rombel;
    #_jenjang
    constructor(App,Service,database){
        this.App = App;
        this.Service = Service;
        this.database = database; //sebuah objek database;
        this.#_jenjang = 1;
        this.#_jenjang = '1A'
    }
    cekIfDatabaseExist(key){
        return this.database.hasOwnProperty(key);
    }
    set jenjang(x){
        this.#_jenjang = x;
    }
    get jenjang(){
        return this.#_jenjang;
    }
    
    set rombel(x){
        this.#_rombel = x;
    }
    get rombel(){
        return this.#_rombel;
    }
    

}