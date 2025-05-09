import { data } from 'autoprefixer';

export  default class ValidatorKbmDatamateri{
    constructor(){
        this.entiti = {};
        
    }
    paramaterClass(x){
        this.entiti = x;
        return this;
    }
    async domain(){
        const dataMateri =  await import('../../domains/MateriKbm').then(m=>m.default);
        const materi = new dataMateri(this.entiti);
        return materi.sanitize().data;

    }
}