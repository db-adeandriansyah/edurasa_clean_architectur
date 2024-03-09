export default class AbsensiService{
    #db;
    #dbImutable;
    constructor(repo,kaldik){
        this.repo = repo;
        this.kalenderService = kaldik;
        this.arrayAbsen = [];
        this.#db={};
        this.#dbImutable={};
        
    }
    
    get data(){
        return this.#db;
    }
    cekArrayAbsen(jenjang){
        let res = false
        if(this.arrayAbsen.length == 0){
            res = false
        }else{
            res = this.arrayAbsen.filter(s=>s.jenjang == jenjang).length>0;
        }
        return res;
    }
    
    async callKalender(){
        await this.kalenderService.hasDb();
        this.copysRespon('kalender',this.kalenderService.data);
    }
    
    async ensureLoadedRepo(){
        if(this.repo.hasLocal('dbSiswa')){
    
            if(window.localStorage.getItem('dbSiswa')!=='undefined'){
                let datasiswa = JSON.parse(window.localStorage.getItem('dbSiswa'));
                this.copysRespon('allsiswa',datasiswa);
            }else{
                let response = await this.repo.callSiswa();
                window.localStorage.setItem('dbSiswa',JSON.stringify(response.data));
                // this.#dbsiswa = response.data;
                this.copysRespon('allsiswa',response.data);
            }
            
        }else{
            
            let response = await this.repo.callSiswa();
            window.localStorage.setItem('dbSiswa',JSON.stringify(response.data));
            // this.#dbsiswa = response.data;
            this.copysRespon('allsiswa',response.data);
        }
        await this.callKalender();
    
    }

    async dataAbsen(rombel){
        let jenjang = parseInt(rombel);
        let data = this.arrayAbsen;
        if(!this.cekArrayAbsen(jenjang)){
            this.repo.callWithProses();
            
            let called = await this.repo.callTabAbsen(jenjang);
            let calldata = {};
            calldata.jenjang = jenjang;
            calldata.data=called.data;
            
            this.arrayAbsen.push(calldata);
            
            data = this.arrayAbsen;
            
            this.repo.stopProgressBar()
        }
        this.#db['dataAbsen']=data;
    }
    
    async updateAbsen(rombel){
        let jenjang = parseInt(rombel);
        let data = this.arrayAbsen;
        if(this.cekArrayAbsen(jenjang)){
            let cekIndekCurrentJenjang = this.arrayAbsen.findIndex(s=>s.jenjang == jenjang);
            this.repo.callWithProses();
            
            
            let called = await this.repo.callTabAbsen(jenjang);
            let calldata = {};
            calldata.jenjang = jenjang;
            calldata.data=called.data;
            
            this.arrayAbsen.splice(cekIndekCurrentJenjang,1,calldata);
            
            data = this.arrayAbsen;
            
            this.repo.stopProgressBar()
        }
        this.#db['dataAbsen']=data;
    }

    copysRespon(key,arrayRespon){
        let copy = [];
        arrayRespon.forEach(ob => {
            let objectCopy = Object.assign({},ob);
            copy.push(objectCopy)
        });
        this.#db[key] = copy;
        this.#dbImutable[key]=arrayRespon;
    };

    get dbMutable(){
        return this.#db;
    }

    get dbImutable(){
        return this.#dbImutable;
    }

    isExist(key){
        return this.#db.hasOwnProperty(key);
    }
    
    readDbNeedEscapeExist(arrayKeyDb){
        let arCall = [];
        [...arrayKeyDb].filter(s=>{
            if(this.isExist(s)){
                arCall.push(s)
            }
        });
        return arCall;
    }

    async callSingleDbKalender(){
        this.repo.callWithProses();
        const kaldik = await this.repo.callSingleDbKalender();
        this.copysRespon(kaldik.info.namaTab, kaldik.data);
        this.repo.stopProgressBar();
    }


}