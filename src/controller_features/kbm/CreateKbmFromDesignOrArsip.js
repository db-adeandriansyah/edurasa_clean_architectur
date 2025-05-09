export default class CreateKbmFromDesignOrArsip{
    constructor(kbmFitur,classArsipNaskah, classDesainNaskah){
        this.banksoalFitur = kbmFitur;
        this.ArsipNaskah = classArsipNaskah;//class Intansiaasi
        this.DesainNaskah = classDesainNaskah;
    }
    init(){
        console.log('intansiasi banksoalFitur', this.banksoalFitur);
        console.log('intansiasi ArsipNaskah', this.ArsipNaskah);
        console.log('intansiasi DesainNaskah', this.DesainNaskah);
    }
}