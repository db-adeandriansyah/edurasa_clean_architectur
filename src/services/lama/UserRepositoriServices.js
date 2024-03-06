import { CallServices } from "./CallServices";

export class UserRepositoriServices extends CallServices{
    constructor(){
        super();
        
    }
    async SiswaAktif(){
        this.datasiswa();
        let param = {
            'idss':this.fokusSs,
            'tab':this.fokusTab,
            'filter':JSON.stringify({'aktif':'aktif'}),
            'action':'read'
        };
        return await this.post(this.crud, param);
    }
}