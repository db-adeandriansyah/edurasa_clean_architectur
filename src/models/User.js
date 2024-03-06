export default class User{
    #tokensiswa     ;
    #ptkUserName    ;
    #ptkPassword    ;
    constructor(){
        this.#tokensiswa = '';
        this.#ptkUserName='';
        this.#ptkPassword = '';
    }

    get id(){
        return 
    }
    // async cekSiswaLogin(token){
    //     let data = null;
    //     if(tokensiswa.length == 10){
    //         data = await this.loginSiswaByNISN(token);
    //     }else{
    //         data = await this.loginSiswaByToken(token);
    //     }
    //     return data;
    // }
}
