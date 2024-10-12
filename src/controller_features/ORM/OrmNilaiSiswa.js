import Orm from "./Orm"

export default class OrmNilaiSiswa extends Orm{
    constructor(edu,img){
        super(edu,img);
        this.siswa = {};
    }
    currentSiswa (d){
        this.siswa = d;
        return this;
    }
    init(){
        
        this.result = new this.CollectionsEdu(this.mainArray)
        .simpleFilter({tokensiswa:this.siswa.id});
        
        return this;
    }
}