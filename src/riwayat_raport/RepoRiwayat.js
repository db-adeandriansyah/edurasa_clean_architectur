
import RiwayatFacade from './RiwayatFacade';
export default class RepoRiwayat{
    //this.app.key,this.requestKey,this.currentRombel
    constructor(mainRepo,keyCurrent,keyRequestTapel, currentRombel){
        this.repo = mainRepo;
        this.currentKey = keyCurrent, 
        this.targetKey = keyRequestTapel,
        this.currentRombel = currentRombel
    }
    get urlCrud(){
        return this.repo.crud;
    }
    findMakroInduk(){
        return RiwayatFacade.riwayatSetting(this.currentKey, this.targetKey,this.currentRombel);
        
    }

    /**
     * 
     * memanggil dataInduk untuk satu semester saja
     */
    async panggilDbIndukCurrent(){
        const key = this.findMakroInduk();
        const keyTarget = key.target;
        
        const idSs = keyTarget.idss;
        const param = {
                    idss:idSs,
                    tab:'main',
                    action:'read',
                    filter:JSON.stringify({'semester':keyTarget.semester})
                }
                this.repo.callWithProses();
        const data = await this.repo.post(this.urlCrud,param);
        this.repo.stopProgressBar();
        return data;

    }
    async panggilDbInduk(parameter){
        
        this.repo.callWithProses();
        const param = {
            idss:parameter.idss,
            tab:'main',
            action:'read',
            filter:parameter.filter
        }
        const data = await this.repo.post(this.urlCrud,param);
        
        this.repo.stopProgressBar();
        
        return data;

    }
    
    async panggilMultiple(arrayDbs){
        return await this.repo.readMultipleTab(ars,crud=this.crud)
    }
            
    
}