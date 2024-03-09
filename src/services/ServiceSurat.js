export class ServiceSurat{
    #db;
    constructor(repo){
        this.repo = repo;
        this.#db={};
        
    }
    get dbPtk(){
        return this.#db['user'];

    }
    get dbSppd(){
        return this.#db['sppd'];

    }
    get dbTendik(){
        return this.#db['tendik'];
    }
    get dbSuratKeluar(){
        return this.#db['suratkeluar'];
    }
    get dbSuratMasuk(){
        return this.#db['suratmasuk'];
    }
    *yieldDatabase(){
        yield {'suratmasuk':this.#db.suratmasuk};
        yield {'suratkeluar':this.#db.suratkeluar};
        yield {'tendik':this.#db.tendik};
        yield {'sppd':this.#db.sppd};
        yield {'user':this.#db.user};
    }
    get database(){
        return [...this.yieldDatabase()];
    }
    isExist(key){
        return this.#db.hasOwnProperty(key);
    }
    
    async callDbAllSurat(){
        this.repo.callWithProses();
        
        let respon=await this.repo.readDbAll();
        
        respon.forEach(db => {
            this.#db[db.info.namaTab]=db.data;
        });
        
        this.repo.stopProgressBar();
    }

    async callSuratKeluar(){
        
        if(!this.isExist('suratkeluar')){
            this.repo.callWithProses();
            
            let respon=await this.repo.readSuratKeluar();
            
            respon.forEach(db => {
                this.#db[db.info.namaTab]=db.data;
            });
            
            this.repo.stopProgressBar();
        }
    }
    
    async callSuratMasuk(){
        if(!this.isExist('suratmasuk')){
            this.repo.callWithProses();
            
            let respon=await this.repo.readSuratMasuk();
            this.#db[respon.info.namaTab]=respon.data;
            this.repo.stopProgressBar();
        }
    }

    async saveSuratKeluar(param){
        this.repo.callWithProses();
        let respon=await this.repo.saveSuratKeluar(param);
        
        this.#db[respon.info.namaTab]=respon.data;
        this.repo.stopProgressBar();
    }

    async saveSuratMasuk(param){
        this.repo.callWithProses();
        let respon=await this.repo.saveSuratMasuk(param);
        
        this.#db[respon.info.namaTab]=respon.data;
        
        this.repo.stopProgressBar();
    }

    async updateSuratKeluar(param){
        this.repo.callWithProses();
        let respon=await this.repo.updateSuratKeluar(param.idbaris, param);
        
        this.#db[respon.info.namaTab]=respon.data;
        this.repo.stopProgressBar();
    }
    async updateSuratMasuk(param){
        this.repo.callWithProses();
        let respon=await this.repo.updateSuratMasuk(param.idbaris, param);
        
        this.#db[respon.info.namaTab]=respon.data;
        this.repo.stopProgressBar();
    }
    
    async updateSppd(param){
        this.repo.callWithProses();
        let respon=await this.repo.updateSppd(param.idbaris, param);
        
        this.#db[respon.info.namaTab]=respon.data;
        
        this.repo.stopProgressBar();
    }
    
    async createOrUpdateMultipleSppd(param){
        this.repo.callWithProses();
        
        let respon = await this.repo.createOrUpdateMultipleSppd(param);
        
        this.#db[respon.info.namaTab]=respon.data;
        this.repo.stopProgressBar();
    }

    saveDokumenSurat(files,propertiImageController,callback,options={}){
        let propertiImage = Object.assign({
            folder:'Administrasi Surat'
        },propertiImageController);
        this.repo.uploadGambar(files,propertiImage,callback,options={})
    }
}