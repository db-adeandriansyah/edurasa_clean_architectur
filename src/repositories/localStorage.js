export default class LocStrg  {
    // constructor(key='',val=''){
    //     this.key = key;
    //     this.val = val;
    // }
    constructor(){
        
    }
    writeLocal (key,val){
        window.localStorage.setItem(key, window.btoa(val));
    }
    clearLocal(key){
        window.localStorage.removeItem(key);
    } 
    clearLocalAll(){
        window.localStorage.clear();
    }
    //getValueInLocalByName:
    LocalJson(nama){
        return JSON.parse(window.atob(window.localStorage.getItem(nama)));
    } 
    getValInLocal(namelocal,key){
        return this.LocalJson(namelocal)[key];
    
    }
    hasLocal(key){
        return window.localStorage.hasOwnProperty(key);
            
    }
}
