import Orm from "./Orm";

/**
 * @info instanceOf CollectionsEdu/ ORM dari tab: Bank Soal
 * -------------------------------
 * <description>
 * Class ini menghasilkan  data berupa collections dengan tipe CollectionsEdu
 * pada method result getter-nya 
 */
export default class OrmBankSoal extends Orm{
    constructor(CollectionsEdu,replacingImage){
        super(CollectionsEdu,replacingImage)
    }
   
    init(){
        this.result = new this.CollectionsEdu(this.mainArray)
                        .setProperty('ilustrasi',(item)=>this.replacingImage(item))
                        .setProperty('pertanyaan',(item)=>this.replacingImage(item))
                        .setProperty('opsiA',(item)=>this.replacingImage(item))
                        .setProperty('opsiB',(item)=>this.replacingImage(item))
                        .setProperty('opsiC',(item)=>this.replacingImage(item))
                        .setProperty('opsiD',(item)=>this.replacingImage(item))
                        .setProperty('penskoran',(item)=>this.replacingImage(item));
        return this;
    }
    
    
}