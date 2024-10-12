export default class AkunSiswaServices{
    #db;
    #checkExist;
    constructor(repo){
        this.repo = repo;
        this.#db = {};
        this.#checkExist=false;
    }
    
    get data(){
        return this.#db;
    };

    isExist(key){
        return this.#db.hasOwnProperty(key);
    }
    avoidExist(bol){
        this.#checkExist = bol;
        
        return this;
    }

    async allSiswa(){
        let hasLocal = window.localStorage.hasOwnProperty('dbSiswa');
        if(hasLocal){
            let datlocale = window.localStorage.getItem('dbSiswa');
            
            if(!datlocale || datlocale == undefined){
                const dataSiswa = await this.repo.callSiswa();
                window.localStorage.setItem('dbSiswa',JSON.stringify(dataSiswa.data));
                
            }
        }else{
            const dataSiswa = await this.repo.callSiswa();

            window.localStorage.setItem('dbSiswa',JSON.stringify(dataSiswa.data));
        }
    }
    async callPropertiMultiple(arrayTabParam){
        const arrayTab = (this.#checkExist)?arrayTabParam.filter(s=>!this.isExist(s.tabdb)):arrayTabParam;
        if(arrayTab.length == 0) return;
        this.repo.callWithProses();

        const respon = await this.repo.readMultipleTab(arrayTab);
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
    async showTextHTML(idmateri){
        this.repo.callWithProses();
        let paramUI = '?action=readTxt&idmateri='+idmateri;
        let n = await this.repo.showTextHTML(paramUI);
        this.repo.stopProgressBar();
        return n
    }
    async siswaAbsen(param,body){
        const asParam = Object.assign({},{
            action:'create',
            formData:JSON.stringify(body),
            autoId:'idbaris'
        },param)
        this.repo.callWithProses();
        console.log('body', body, 'pram',asParam)
        let cek = await this.repo.post(this.repo.crud, asParam);
        console.log(param,cek);
        this.#db = Object.assign(this.#db, {[param.tabdb]:cek.data,['blangko_'+param.tabdb]:cek.info.objKosong});
        this.repo.stopProgressBar();
        return cek
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
}