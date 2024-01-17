export class Controller{
    constructor(){
        this.db = null;
    }
    isExist(tab){
        return this.db.hasOwnProperty(tab);
    }
    
}