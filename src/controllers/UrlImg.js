export default class UrlImg{
    #id;
    #url;
    #latex;
    constructor(x){;;
        this.#url= x
        this.#id = `https://lh3.googleusercontent.com/d/`;
        this.#latex = `https://latex.codecogs.com/png.latex?%5Cdpi%7B0%7D%20%5Cbg_white%20%7B`;
        //https://latex.codecogs.com/png.latex?%5Cdpi%7B0%7D%20%5Cbg_white%20%7B%5Cfrac%20%7B1%7D%20%7B2%7D%7D
    }
    get urlImg(){
        return this.#id+this.#url;
    }
    convertUrlToLatexLatest(){
        return  this.#url.replace('https://chart.apis.google.com/chart?cht=tx&chl=%7B',this.#latex);
    }
}