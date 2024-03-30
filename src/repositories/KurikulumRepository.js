import { CallHttp } from "./CallHttp";

export default class KurikulumRepository extends CallHttp{
    #istrial;
    
    constructor(){
        super();
        this.initialAppKey(this.currentAppKey);
        
        this.#istrial = false;
    }
    
    set trial(x){
        this.#istrial = x;
    }
    
    get trial(){
        return this.#istrial;
    }
    get ss_materi(){
        return this.appscript['ss_materi']
    }
    get ss_must_call(){
        return this.trial?this.ssTrial:this.ss_materi;
    }
    async callDb(param){
        
        return await this.post(this.crud,param);
        
    }
    async update_elemencp(param){
        let d = { 
            idss:this.ss_must_call,
            tab:'elemencp',
            action:'update',
            'byRow':parseInt(param.idbaris),
            'formData':JSON.stringify(param),
            'autoId':'idbaris',
            // filter:JSON.stringify({'hapus':''})
        }
        return await this.post(this.crud, d);
    }
    
    async tambah_elemencp(param){
        let d = { 
            idss:this.ss_must_call,
            tab:'elemencp',
            action:'create',
            'formData':JSON.stringify(param),
            'autoId':'idbaris',
            // stringFormat:JSON.stringify([])
            // filter:JSON.stringify({'hapus':''})
        }
        return await this.post(this.crud, d);
    }
    
    async update_faseTPATP(param){
        
        let par = {
            idss:this.ss_must_call,
            tab:'faseTPATP',
            action:'update',
            'formData':JSON.stringify(param),
            'autoId':'idbaris',
            byRow:parseInt(param.idbaris),
            stringFormat:JSON.stringify(['kelas'])
        }
        return await this.post(this.crud,par);
    }
    
    async tambah_faseTPATP(param){
        let par = {
            idss:this.ss_must_call,
            tab:'faseTPATP',
            action:'create',
            'formData':JSON.stringify(param),
            'autoId':'idbaris',
            stringFormat:JSON.stringify(['kelas'])
        }
        return await this.post(this.crud,par);
    }
    
    async update_faseA(param){
        let d = { 
            idss:this.ss_must_call,
            tab:'faseA',
            action:'update',
            'byRow':parseInt(param.idbaris),
            'formData':JSON.stringify(param),
            'autoId':'idbaris',
            // filter:JSON.stringify({'hapus':''})
        }
        return await this.post(this.crud, d);
    }
    
    async tambah_faseA(param){
        let d = { 
            idss:this.ss_must_call,
            tab:'faseA',
            action:'create',
            'formData':JSON.stringify(param),
            'autoId':'idbaris',
            // stringFormat:JSON.stringify([])
            // filter:JSON.stringify({'hapus':''})
        }
        return await this.post(this.crud, d);
    }
    
    async update_faseB(param){
        let d = { 
            idss:this.ss_must_call,
            tab:'faseB',
            action:'update',
            'byRow':parseInt(param.idbaris),
            'formData':JSON.stringify(param),
            'autoId':'idbaris',
            // filter:JSON.stringify({'hapus':''})
        }
        return await this.post(this.crud, d);
    }
    
    async tambah_faseB(param){
        let d = { 
            idss:this.ss_must_call,
            tab:'faseB',
            action:'create',
            'formData':JSON.stringify(param),
            'autoId':'idbaris',
            // stringFormat:JSON.stringify([])
            // filter:JSON.stringify({'hapus':''})
        }
        return await this.post(this.crud, d);
    }
    
    async update_faseC(param){
        let d = { 
            idss:this.ss_must_call,
            tab:'faseC',
            action:'update',
            'byRow':parseInt(param.idbaris),
            'formData':JSON.stringify(param),
            'autoId':'idbaris',
            // filter:JSON.stringify({'hapus':''})
        }
        return await this.post(this.crud, d);
    }
    
    async tambah_faseC(param){
        let d = { 
            idss:this.ss_must_call,
            tab:'faseC',
            action:'create',
            'formData':JSON.stringify(param),
            'autoId':'idbaris',
            // stringFormat:JSON.stringify([])
            // filter:JSON.stringify({'hapus':''})
        }
        return await this.post(this.crud, d);
    }
    async update_k1kelas3(param){
        let d = { 
            idss:this.ss_must_call,
            tab:'k1kelas3',
            action:'update',
            'byRow':parseInt(param.idbaris),
            'formData':JSON.stringify(param),
            'autoId':'idbaris',
            stringFormat:JSON.stringify(['kd1'])
            // filter:JSON.stringify({'hapus':''})
        }
        return await this.post(this.crud, d);
    }
    
    async tambah_k1kelas3(param){
        let d = { 
            idss:this.ss_must_call,
            tab:'k1kelas3',
            action:'create',
            'formData':JSON.stringify(param),
            'autoId':'idbaris',
            stringFormat:JSON.stringify(['kd1'])
            
            // stringFormat:JSON.stringify([])
            // filter:JSON.stringify({'hapus':''})
        }
        return await this.post(this.crud, d);
    }
    async update_k2kelas3(param){
        let d = { 
            idss:this.ss_must_call,
            tab:'k2kelas3',
            action:'update',
            'byRow':parseInt(param.idbaris),
            'formData':JSON.stringify(param),
            'autoId':'idbaris',
            stringFormat:JSON.stringify(['kd2'])
            // filter:JSON.stringify({'hapus':''})
        }
        return await this.post(this.crud, d);
    }
    
    async tambah_k2kelas3(param){
        let d = { 
            idss:this.ss_must_call,
            tab:'k2kelas3',
            action:'create',
            'formData':JSON.stringify(param),
            'autoId':'idbaris',
            stringFormat:JSON.stringify(['kd2'])
            
            // stringFormat:JSON.stringify([])
            // filter:JSON.stringify({'hapus':''})
        }
        return await this.post(this.crud, d);
    }
    
    
    
    
}