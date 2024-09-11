export default class Orm{
    constructor(CollectionsEdu,replacingImage){
        /**@class */
        this.CollectionsEdu=CollectionsEdu;
        
        /**@method */
        this.replacingImage = replacingImage;

        /**@type Array */
        this.mainArray = [];

        this.result = null;
    }
    get collections(){
        return this.result;
    }
    /**
     * return Array
     */
    get data(){
        return this.result.data;
    }
    parent(data=[]){
        this.mainArray = data;
        return this;
    }
    findById(id){
        return this.result.simpleFilter({'idbaris':id}).data;
        
    }
    findProperty(namakey){
        return this.data[0][namakey]??'Not Found';
        
    }
    /**
     * 
     * @param {*} name = Nama relational
     * @param {*} orm =  orm 
     * @param {*} keyMain = primaryKey this/ormBankSol;
     * @param {*} keyOrm = primaryKey Orm
     * @returns this/OrmBankSoal one to one/one to Many/Array
     * 
     */
    withOrm(name,orm,keyMain, keyOrm){
        
        this.result.addProperty(name,(item)=>orm.simpleFilter({[keyOrm]:item[keyMain]}).data);
        return this;
    }

    /**
     * 
     * @param {*} name 
     * @param {*} orm 
     * @param {*} param2 : <Array Object>[{keyOrm:keyMain,keyOrm1:keyMain1,...keyOrmKeymain}]
     * @returns 
     */
    withOrmSpecificQuery(name,orm,keyMainKeyOrm){
        this.result.addProperty(name,(item)=>orm.customFilter((itemOrm) => {
                    for (const key in keyMainKeyOrm) {
                        if (itemOrm[key] != item[keyMainKeyOrm[key]]) {
                            return false;
                        }
                        return true;
                    }
                    // return true;
                }
            )
        );
        return this;
    }
    // init(){
    //     this.result = new this.CollectionsEdu(this.mainArray)
    //                     .setProperty('ilustrasi',(item)=>this.replacingImage(item))
    //                     .setProperty('pertanyaan',(item)=>this.replacingImage(item))
    //                     .setProperty('opsiA',(item)=>this.replacingImage(item))
    //                     .setProperty('opsiB',(item)=>this.replacingImage(item))
    //                     .setProperty('opsiC',(item)=>this.replacingImage(item))
    //                     .setProperty('opsiD',(item)=>this.replacingImage(item))
    //                     .setProperty('penskoran',(item)=>this.replacingImage(item));
    //     return this;
    // }
    get type(){
        return this.result instanceof this.CollectionsEdu;
    }
    

}