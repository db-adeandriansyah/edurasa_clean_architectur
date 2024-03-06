export default class MenuSidebar{
    #user;
    #menu;
    constructor(userLocal){
        this.#user = userLocal;
        this.#menu = []
    };
    init(){

    }
    *addMenu(key,value){
        yield{[key]:value}
    }
    getMenuField(){
        return [...this.addMenu()];
    }

    set main(x){
        this.#menu = x;
    }
    get main(){
        return this.#menu
    }
    get tipeUser(){
        return this.#user.typeUser;
    }
    
    radioKelasAmpu(name='kelasampu') // Object;
    {
        let kelasampu = this.#user.kelasAmpu;
        let obj = {};
        let arraykelas = [];
        obj.title = 'Kelas yang Diampu';
        let arraykelasampu = kelasampu.replace(/\s+/,'').split(',');

            for(let i = 0; i < arraykelasampu.length ; i++){
                let obkelas = {
                value:'kelas_'+arraykelasampu[i],
                text:'Kelas '+arraykelasampu[i],
                name:name
                }
                arraykelas.push(obkelas)
            };
        obj.menu = arraykelas;
        return obj;
    }

}