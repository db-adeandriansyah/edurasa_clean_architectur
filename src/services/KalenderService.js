export default class KalenderService{
    #db;
    constructor(repo){
        this.repo = repo;
        this.#db = [];
    }
    
    get data(){
        return this.#db;
    };

    async hasDb(){
        // if(this.repo.hasLocal('kaldik')){
        //     this.#db = this.repo.LocalJson('kaldik');
        // }else{
        // }
        await this.callDb();
    }

    async callDbWithLoading(){
        this.repo.callWithProses();
        const db = await this.repo.callDb();
        this.repo.stopProgressBar();
        this.#db = db.data;
    }
    
    async callDb(){
        const db = await this.repo.callDb();
        this.repo.writeLocal('kaldik',JSON.stringify(db.data));
        this.#db = db.data;
        return this;
    }
    
    async addKalender(param){
        this.repo.callWithProses();
        const db = await this.repo.addKalender(param);
        this.#db = db.data;
        this.repo.stopProgressBar();
        return this;
    }
    
    async editKalender(param){
        this.repo.callWithProses();
        const db = await this.repo.editKalender(param);
        this.#db = db.data;
        this.repo.stopProgressBar();
        return this;
    }
    
}