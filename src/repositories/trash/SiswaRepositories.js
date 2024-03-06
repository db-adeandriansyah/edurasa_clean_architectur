import { CallHttp } from "./CallHttp";

export default class SiswaRepositories extends CallHttp{
    #dbsiswa=null;
    constructor(entitySiswa=[]){
        super();
        this.initialAppKey();
        this.#dbsiswa = entitySiswa;

    }
    set showAllSiswa(x){
        this.#dbsiswa = x;
    }
    get showAllSiswa(){
        return this.#dbsiswa;
    }
    async callAllSiswa(){
        const url = this.crud;
        const param ={
            'idss':this.appscript['ss_user'],
            'tab':'datasiswa',
            'action':'read'
        }
        return await this.post(url,param);
    }
}