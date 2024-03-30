import UrlImg from "./UrlImg";
export class Controller{
    #db;
    #User;
    #app;
    #methodActive;
    #rombelActive;
    #mapelActive;
    
    constructor(App){
        this.#db = {};
        this.#app = App;
        this.#User = App.UserApp;
        this.#methodActive='';
        this.#rombelActive ='';
        this.#mapelActive ='';
        
        this.menus = document.querySelectorAll('input[name=menusidebar]');
        this.workplace =document.getElementById('printarea');
        this.footerarea =document.getElementById('footerarea');
        this.maincontrol =document.getElementById('maincontrol');
        this.dev = {};
    }
    set fokusRombel(x){
        this.#rombelActive = x;
    }
    get fokusRombel(){
        return this.#rombelActive;
    }
    get fokusJenjang(){
        return parseInt(this.#rombelActive);
    }
    set fokusMenu(x){
        this.#methodActive = x;
    }
    get fokusMenu(){
        return this.#methodActive;
    }
    get App(){
        return this.#app;
    }
    urlImg(x){
        return new UrlImg(x);
    }
    get isAdmin(){
        return this.#User.typeUser === 'admin';
    }
    get setApp(){
        return this.#User;
    }
    get Auth(){
        return this.#User;
    }
    get UserType(){
        return this.#User.typeUser;
    }

    isExist(tab){
        return this.#db.hasOwnProperty(tab);
    }
    

    set database(x){
        this.#db = x;
    }
    get database(){
        return this.#db;
    }
    
    makeInstance(devClass,param=[]){
        if(param.length==0){
            return new devClass();
        }else{
            return new devClass(...param);
        }
    }
    
    bindControl(devClass,param=[]){
        let instansiasi = this.makeInstance(devClass,param);
        
        this.dev[instansiasi.constructor.name] = instansiasi
        
    }
}