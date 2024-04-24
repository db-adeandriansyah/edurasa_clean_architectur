export default class BanksoalService{
    #db;
    constructor(repo){
        this.repo = repo;
        this.#db = {};
    }
    
    get data(){
        return this.#db;
    };

    isExist(key){
        return this.#db.hasOwnProperty(key);
    }
    async callPropertiMultiple(arrayTab){
        this.repo.callWithProses();
        const respon = await this.repo.callPropertiMultiple(arrayTab);
        respon.forEach(n=>{
            this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        });
        
        this.repo.stopProgressBar();
    }
    async simpanItemSoal(body){
        this.repo.callWithProses();
        let n = await this.repo.simpanItemSoal(body,'create');
        console.log(n);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
}