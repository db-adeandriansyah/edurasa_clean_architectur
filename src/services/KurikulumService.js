export default class KurikulumService{
    #db;
    constructor(repo){
        this.repo = repo;
        this.#db = {};
    }
    get data(){
        return this.#db;
    }
    
    async callDb(keyProperti){
        let ar=[];
        let ars = [
            {
                'idss': this.repo.ss_must_call,
                'tab':keyProperti,
            },
            {
                'idss': this.repo.ss_must_call,
                'tab':'faseTPATP',
            },{
                'idss': this.repo.ss_must_call,
                'tab':'elemencp',
            },
            {
                'idss': this.repo.ss_must_call,
                'tab':'taksonomibloom',
            },{
                'idss':this.repo.appscript['ss_kalender'],
                'tab':'banksoal'
            }

        ];
        
        ['faseTPATP','taksonomibloom','elemencp','banksoal'].forEach(s=> {
            if(this.#db.hasOwnProperty(s)){
                let ind = ars.findIndex(t=> t.tab == s);
                ars.splice(ind,1);
            }
        });
        
        ar = ars;
        
        let e_param = {
            'action':'readMultipleTab',
            'source':JSON.stringify(ar),
            
        };
        
        this.repo.callWithProses();

        const dataDB = await this.repo.callDb(e_param);
        
        dataDB.forEach(n=>{
            this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        });
        
        this.repo.stopProgressBar();
        
    }
    

    async update_elemencp(data){
        this.repo.callWithProses();
        const n= await this.repo.update_elemencp(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    async hapus_elemencp(data){
        data.fase = "";
        data.kodemapel = "";
        this.repo.callWithProses();
        const n= await this.repo.update_elemencp(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    async tambah_elemencp(data){
        this.repo.callWithProses();
        const n= await this.repo.tambah_elemencp(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    async update_faseA(data){
        this.repo.callWithProses();
        const n= await this.repo.update_faseA(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    async hapus_faseA(data){
        // data.foreignkey_elemencp = "";
        data.tp = "";
        this.repo.callWithProses();
        const n= await this.repo.update_faseA(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    async tambah_faseA(data){
        this.repo.callWithProses();
        const n= await this.repo.tambah_faseA(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    async update_faseB(data){
        this.repo.callWithProses();
        const n= await this.repo.update_faseB(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    async hapus_faseB(data){
        // data.foreignkey_elemencp = "";
        data.tp = "";
        this.repo.callWithProses();
        const n= await this.repo.update_faseB(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    async tambah_faseB(data){
        this.repo.callWithProses();
        const n= await this.repo.tambah_faseB(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    async update_faseC(data){
        
        this.repo.callWithProses();
        const n= await this.repo.update_faseC(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    async hapus_faseC(data){
        // data.foreignkey_elemencp = "";
        data.tp = "";
        this.repo.callWithProses();
        const n= await this.repo.update_faseC(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    async tambah_faseC(data){
        this.repo.callWithProses();
        const n= await this.repo.tambah_faseC(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    
    async update_faseTPATP(data){
        
        this.repo.callWithProses();
        const n= await this.repo.update_faseTPATP(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    async hapus_faseTPATP(data){
        // data.foreignkey_elemencp = "";
        // data.foreignkey_tp = "";
        data.kelas= "";
        data.atp= "";
        this.repo.callWithProses();
        const n= await this.repo.update_faseTPATP(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    async tambah_faseTPATP(data){
        this.repo.callWithProses();
        const n= await this.repo.tambah_faseTPATP(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    //k1kelas3
    
    async update_k1kelas3(data){
        
        this.repo.callWithProses();
        const n= await this.repo.update_k1kelas3(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    async hapus_k1kelas3(data){
        // data.foreignkey_elemencp = "";
        // data.foreignkey_tp = "";
        data.indikatorkd1= "";
        this.repo.callWithProses();
        const n= await this.repo.update_k1kelas3(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    async tambah_k1kelas3(data){
        this.repo.callWithProses();
        const n= await this.repo.tambah_k1kelas3(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    //k2kelas3
    
    async update_k2kelas3(data){
        
        this.repo.callWithProses();
        const n= await this.repo.update_k2kelas3(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    async hapus_k2kelas3(data){
        // data.foreignkey_elemencp = "";
        // data.foreignkey_tp = "";
        data.indikatorkd1= "";
        this.repo.callWithProses();
        const n= await this.repo.update_k2kelas3(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
    async tambah_k2kelas3(data){
        this.repo.callWithProses();
        const n= await this.repo.tambah_k2kelas3(data);
        this.#db = Object.assign(this.#db, {[n.info.namaTab]:n.data,['blangko_'+n.info.namaTab]:n.info.objKosong});
        
        this.repo.stopProgressBar();
    }
}