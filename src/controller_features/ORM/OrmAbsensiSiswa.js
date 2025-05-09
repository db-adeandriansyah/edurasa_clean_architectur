import Orm from "./Orm"

export default class OrmAbsensiSiswa extends Orm{
    constructor(edu,img){
        super(edu,img);
        this.siswa = {};
    }
    currentSiswa (d){
        this.siswa = d;
        return this;
    }
    init(){
        // const {UrlImg} = this.devedency;
        this.result = new this.CollectionsEdu(this.mainArray)
                .simpleFilter({tokensiswa:this.siswa.id})
                .addProperty('urlImg',(item)=>new this.replacingImage(item.fileContent).urlImg);
        return this;
    }
    
    get absensiToday(){
        const {FormatTanggal} = this.devedency;
        return this.result.simpleFilter({id:new FormatTanggal(new Date()).idStringAbsen()}).lastData??false;
    }
}