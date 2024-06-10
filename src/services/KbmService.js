

export default class KbmService{
    #db;
    #activeJenjang;
    constructor(repo){
        this.repo = repo;
        this.#db = {};
        this.#activeJenjang = 1;
    }
    
    get data(){
        return this.#db;
    };
    get jenjang(){
        return this.#activeJenjang;
    }
    set jenjang(x){
        this.#activeJenjang = x;
    }
    get spreadsheet_nilai(){
        return this.repo.ss_nilai_jenjang(this.jenjang);
    }
    ss_nilai_namatab(namatab){
        return this.repo.ss_nilai_namatab(namatab,this.jenjang);
    }

    async ensureLoadedRepo(){
        if(this.repo.hasLocal('dbSiswa')){
    
            if(window.localStorage.getItem('dbSiswa')=='undefined'){
                let response = await this.repo.callSiswa();
                window.localStorage.setItem('dbSiswa',JSON.stringify(response.data));
            }
            
        }else{
            
            let response = await this.repo.callSiswa();
            window.localStorage.setItem('dbSiswa',JSON.stringify(response.data));
        }
        
    
    }
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
    async callPropertiMultipleWithPrefik(arrayTab){
        this.repo.callWithProses();

        const respon = await this.repo.callPropertiMultiple(arrayTab);
        respon.forEach(n=>{
            let tabrespon = n.info.namaTab;
            let cek = arrayTab.filter(s=> s.tab == tabrespon)[0];
            
            if(cek.tab == tabrespon && cek.tabdb == tabrespon){
                this.#db = Object.assign(this.#db, {[tabrespon]:n.data,['blangko_'+tabrespon]:n.info.objKosong});
            }else{
                this.#db = Object.assign(this.#db, {[cek.tabdb]:n.data,['blangko_'+cek.tabdb]:n.info.objKosong});
            }
        });
        
        this.repo.stopProgressBar();
    }
    async kirimSingleNilaiLJK(tabrespons,tabtagihan,mediaHTML,kode_tambahEdit,arrayTab){
        this.repo.callWithProses();

        // const respon = await this.repo.callPropertiMultiple(arrayTab);
        const respon  = await this.repo.kirimSingleNilaiLJK(tabrespons,tabtagihan,mediaHTML,kode_tambahEdit);
        const data = respon.data;
        data.forEach(n=>{
            let tabrespon = n.info.namaTab;
            let cek = arrayTab.filter(s=> s.tab == tabrespon)[0];
            
            if(cek.tab == tabrespon && cek.tabdb == tabrespon){
                this.#db = Object.assign(this.#db, {[tabrespon]:n.data,['blangko_'+tabrespon]:n.info.objKosong});
            }else{
                this.#db = Object.assign(this.#db, {[cek.tabdb]:n.data,['blangko_'+cek.tabdb]:n.info.objKosong});
            }

        })
        
        
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
    async editLJKTabRespon(body,arrayTab){
        this.repo.callWithProses();
        let n = await this.repo.editLJKTabRespon(body,'update');
        
        // this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        let tabrespon = n.info.namaTab;
            let cek = arrayTab.filter(s=> s.tab == tabrespon)[0];
            
            if(cek.tab == tabrespon && cek.tabdb == tabrespon){
                this.#db = Object.assign(this.#db, {[tabrespon]:n.data,['blangko_'+tabrespon]:n.info.objKosong});
            }else{
                this.#db = Object.assign(this.#db, {[cek.tabdb]:n.data,['blangko_'+cek.tabdb]:n.info.objKosong});
            }
        this.repo.stopProgressBar();
    }
    async kirimImportKoreksian(body,kelas,tab,arrayTab){
        this.repo.callWithProses();
        let n = await this.repo.kirimDataMasalImportKoreksian(body,kelas,tab);
        
        // this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        let tabrespon = n.info.namaTab;
            let cek = arrayTab.filter(s=> s.tab == tabrespon)[0];
            
            if(cek.tab == tabrespon && cek.tabdb == tabrespon){
                this.#db = Object.assign(this.#db, {[tabrespon]:n.data,['blangko_'+tabrespon]:n.info.objKosong});
            }else{
                this.#db = Object.assign(this.#db, {[cek.tabdb]:n.data,['blangko_'+cek.tabdb]:n.info.objKosong});
            }
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
        
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    async simpanDataMateriKbm(par,media){
        this.repo.callWithProses();
        let n = await this.repo.simpanDataMateriKbm(par,media)
        
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

        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    async simpanEditMateriKbm(param){
        this.repo.callWithProses();
        let n = await this.repo.simpanEditMateriKbm(param);
        
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }

    async nilaiRaporOtherMacro(crud,param,prefix=''){
        
        this.repo.callWithProses();
        let n = await this.repo.postOtherMacro(crud,param);
        
        this.#db = Object.assign(this.#db, {[prefix+n.info.namaTab]:n.data,[prefix+'blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    async callMultipleOtherMacro(crud,param,prefix=''){
        
        this.repo.callWithProses();
        let respon = await this.repo.callPropertiMultipleOtherCrud(crud,param);
        respon.forEach(n=>{
            this.#db = Object.assign(this.#db, {[prefix+n.info.namaTab]:n.data,[prefix+'blangko_'+n.info.namaTab]:n.info.objKosong});

        })
        
        this.repo.stopProgressBar();
    }
    async saveNilaiRaporMasal (data,kelas,tab,refHeader){
        
        this.repo.callWithProses();
        let n = await this.repo.saveNilaiRaporMasal (data,kelas,tab,refHeader)
        
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
    async cu_deskripsi_predikat (data,jenjang){
        this.repo.callWithProses();
        let n = await this.repo.createOrUpdate_deskripsi_predikat (data,jenjang);
        
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        this.repo.stopProgressBar();
    }
}
