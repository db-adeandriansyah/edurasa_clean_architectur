export default class UrlImg{
    #id;
    #url;
    constructor(x){;;
        this.#url= x
        this.#id = `https://lh3.googleusercontent.com/d/`;
    }
    get urlImg(){
        return this.#id+this.#url;
    }
}