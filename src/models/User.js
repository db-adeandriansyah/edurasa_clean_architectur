import { UserRepositoriServices } from "../services/UserRepositoriServices";

export class User extends UserRepositoriServices {
    #ptk;
    #siswa;
    constructor(){
        super();
    }
    get siswa (){
        return this.#siswa;
    }
    set siswa (x){
        return this.#siswa;
    }
    
}