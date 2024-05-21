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
        
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    async simpanItemSoalEdit(body){
        this.repo.callWithProses();
        let n = await this.repo.simpanItemSoal(body,'update');
        
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    async simpanImage(par){
        this.repo.callWithProses();
        const res = await this.repo.saveImage(par);
        this.repo.stopProgressBar();
        return res;
    }

    /**
     * 
     * @param {*} par // argumen untuk diisi di spreadsheet
     * {data}
     * @param {*} media //argumen yang berisi html dan jenjang
     * example:
     * data ={
     *  html:string,
     * jenjang:number
     * }
     * @param {*} obchange // argumen array-object yang digunakan untuk mengubah/replace
     * {'html_identitas':'fileUrl', 'html_soal':'idfile'}
     * 
     */
    async simpanDesanNaskah(par,media){
        this.repo.callWithProses();
        let n = await this.repo.simpanDesanNaskah(par,media)
        console.log('test simpanDesainNaskah',n);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    async simpanDataMateriKbm(par,media){
        this.repo.callWithProses();
        let n = await this.repo.simpanDataMateriKbm(par,media)
        console.log('test simpanDesainMateriKBM',n);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    async showTextHTML(idmateri){
        this.repo.callWithProses();
        let paramUI = '?action=readTxt&idmateri='+idmateri;
        let n = await this.repo.showTextHTML(paramUI);
        this.repo.stopProgressBar();
        return n
    }
    async hapusSimpananDesainNaskah(param){
        this.repo.callWithProses();
        let n = await this.repo.hapusSimpananDesainNaskah(param);
        console.log('hapus',n);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    async simpanEditMateriKbm(param){
        this.repo.callWithProses();
        let n = await this.repo.simpanEditMateriKbm(param);
        
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
}