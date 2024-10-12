import Orm from "./Orm";

/**
 * @info instanceOf CollectionsEdu/ ORM dari tab: simpandesainsoal ss: kalender
 * -------------------------------
 * <description>
 * Class ini menghasilkan  data berupa collections dengan tipe CollectionsEdu
 * pada method result getter-nya 
 */
export default class OrmArsipNaskah extends Orm{
    /**
     * @returns CollectionsEdu type
     * @info : koleksi 
     */
    constructor(CollectionsEdu,replacingImage){
        super(CollectionsEdu,replacingImage);
        this.totalSoal = 50;
        this.auth = {};
        
        this.isAdmin = false;
        this.isGuruMapel = false;
    }
    isOwner(auth){
        const isAdmin = auth.typeUser == 'admin';
        const owner = auth.idUser;
        const isGuruMapel = auth.typeUser == 'Guru Mapel';
        this.auth = auth;
        this.isAdmin = isAdmin;
        this.isGuruMapel = isGuruMapel;

        this.result.addProperty('owner',(item)=>!isAdmin?item.idguru == owner:true);
        if(isGuruMapel){
            this.result = this.result.simpleFilter({'mapel':auth.tugasUser});
        }

        return this;
    }
    settingOwnerToSpecificOrm(namaorm){
        this.result.setProperty(namaorm,(item)=>item.addProperty('owner',(itemorm)=>!(this.isAdmin||this.isGuruMapel)?itemorm.arraykelas.trim().split(',').includes(this.auth.tugasUser):true))
        return this;
    }
    relationNoSoal(orm){
        this.result.addProperty('NoSoal_banksoal',(item)=>item.keyNoSoal.filter(s=>item[s]!=="").map(m=>orm.simpleFilter({'idbaris':item[m]}).data[0]))
                    .addProperty('propertikurikulum',(item)=>new this.CollectionsEdu(item.NoSoal_banksoal.map(m=>m.kurikulum).flat(1)).uniqueByProperty('idbaris').data)
                    .addProperty('tanggalnaskah',(item)=>new Date(item.waktu2).toLocaleString('id-ID',{dateStyle:'full'}))
                    .addProperty('kerangka',(item)=>new this.CollectionsEdu(item.NoSoal_banksoal).uniqueByProperty('bentuksoalspesifik').data.map(n=>({'bentuksoal':n.bentuksoalspesifik,jumlahsoal:item.NoSoal_banksoal.filter(s=>s.bentuksoalspesifik == n.bentuksoalspesifik).length,jumlah:item.NoSoal_banksoal.filter(s=>s.bentuksoalspesifik == n.bentuksoalspesifik).length})));
        
        return this;
    }
    init(){
        this.result = new this.CollectionsEdu(this.mainArray)
                    .simpleFilter({idtoken:this.fokusJenjang})
                    .addProperty('namakurikulum',()=>'kurmer')
                    .addProperty('keyNoSoal',()=>[...Array(this.totalSoal)].map((_,i)=>'no_'+(i+1)))
                    .sortByProperty('waktu2','desc');;

        return this;
    }
    // get collections(){ // type CollectionsEdu
    //     let datanaskah = this.banksoal.banksoalservice.data.simpandesainsoal;
    //     let datamateri = this.banksoal.banksoalservice.data.datamateri;
    //     let banksoal = this.banksoal.banksoalservice.data.banksoal;
    //     let kurikulum = this.banksoal.ormKurikulum.data;
    //     let isKurmer = (this.banksoal.shortKurikulum=='kurmer');
    //     let owner  = this.user.idUser;
    //     let isAdmin = this.isAdmin;
        
    //     return new CollectionsEdu(datanaskah)
    //         .simpleFilter({'jenjang':this.jenjang})
    //         .exceptFilter({'hapus':'hapus'})
    //         .addProperty('datamateri',(item)=>{
    //             return datamateri.filter(s=>s.id_desainnaskah == item.idbaris && s.idtoken == this.jenjang);
    //         })
    //         .addProperty('propertikurikulum',(item)=>{
    //             let ar = []
    //             for(let i = 0 ; i < 50; i++){
    //                 let key = 'no_'+(i+1);
    //                 let val = item[key];
    //                 if(val!==''){
    //                     let soal = banksoal.filter(s=>s.idbaris == val);
    //                     // ar.push({[key]:soal})
    //                     if(soal[0]){
    //                         if(isKurmer){
    //                             let kurikulumitemsoal = kurikulum.filter(s=> s.idbaris == soal[0].kd);

    //                             if(kurikulumitemsoal.length>0){
    //                                 ar.push(kurikulumitemsoal[0]);
    //                             }

    //                         }else{
    //                             let kurikulumitemsoal = kurikulum.filter(s=> s.kd3 == soal[0].kd && s.mapel == soal[0].kodemapel);
                                
    //                             if(kurikulumitemsoal.length>0){
    //                                 ar.push(kurikulumitemsoal[0]);
    //                             }

    //                         }
    //                     };
    //                 }
    //             }
    //             // return ar;
    //             let finalResult = [];
    //             if(isKurmer){
    //                 finalResult = new CollectionsEdu(ar).uniqueByProperty('idbaris').data;
    //             }else{
    //                 finalResult = new CollectionsEdu(ar).uniqueByProperty('baris').data;
    //             }
    //             return finalResult;
    //         })
    //         .addProperty('tanggalnaskah',(item)=>{
    //             return new FormatTanggal(item.waktu2).formatFull();
    //         })
    //         .addProperty('owner',(item)=>{
    //             return !isAdmin?item.idguru==owner:true;
    //         })
    //         .addProperty('banksoal',(item)=>{
    //             let ar = [];
    //             for(let i = 0 ; i < 50; i++){
    //                 let key = 'no_'+(i+1);
    //                 let val = item[key];
    //                 if(val!==''){
    //                     let obj = {};
    //                     let soal = banksoal.filter(s=>s.idbaris == val);
    //                     if(soal.length>0){
    //                         obj.datasoal=soal[0];
    //                         obj.bentuksoalspesifik = soal[0].bentuksoalspesifik;
    //                         ar.push(obj)
    //                     }
    //                 }
    //             }
    //             return ar
    //         })
    //         .addProperty('namakurikulum',(item)=>{
    //             return item.kurikulum
    //         })
    //         .addProperty('kerangka',(item)=>{
    //             let itembanksoal = item.banksoal;
    //             let uniq = new CollectionsEdu(itembanksoal).uniqueByProperty('bentuksoalspesifik').selectProperties(['bentuksoalspesifik']).data;
    //             let result = [];
    //             uniq.forEach(n=>{
    //                 let ob = {};
    //                 ob.bentuksoal = n.bentuksoalspesifik;
    //                 ob.jumlah = itembanksoal.filter(s=>s.bentuksoalspesifik == n.bentuksoalspesifik).length;
    //                 result.push(ob);
    //             })
    //             return result;
    //         })
    //         .sortByProperty('waktu2','desc');
            
    //         let totallkey_nosoal = Object.keys(this.banksoal.banksoalservice.data.simpandesainsoal[0]).length - 20;
    //         let apibanksoal = this.banksoal.banksoalservice.data.banksoal;
    //         let apiblanko = this.banksoal.banksoalservice.data.blangko_banksoal;
    //         for(let i = 0 ; i < totallkey_nosoal ; i++){
    //             let keybanksoal = 'banksoal_'+(i+1);
    //             data.addProperty(keybanksoal,(item)=>{
    //                 if(item['no_'+(i+1)]!==""){
    //                     let filter_api =  apibanksoal.filter(s=>s.idbaris == item['no_'+(i+1)])
    //                     if(filter_api.length>0){
    //                         return filter_api[0];
    //                     }else{
    //                         return apiblanko;
    //                     }
    //                 }
    //                 return "";
    //             })
    //         }
            
             
    // }
}