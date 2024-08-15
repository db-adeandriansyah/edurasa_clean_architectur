export default class ToolbarCreateItemSoal{
    #result;
    constructor(mapel,ormPropertiKurikulum){
        this.mapel = mapel;
        this.propertisoal = ormPropertiKurikulum;
    }
    get responses(){
        return this.#result;
    }
    get test(){
        return 'test Toolbar'
    }
}