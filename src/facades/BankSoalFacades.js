import Facades from "./Facades";

export default class BankSoalFacades extends Facades{
    constructor(App,Service,database){
        super(App,Service,database);
    }
    itemSoal(){
        let needData = ['banksoal'];
        let needCallService = needData.filter(s=> !this.cekIfDatabaseExist(s));
        return needCallService;
    }
}