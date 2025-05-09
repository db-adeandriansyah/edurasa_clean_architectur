import Orm from './Orm'

export default class OrmKalender extends Orm{
    constructor(CollectionsEdu,replacingImage){
        super(CollectionsEdu,replacingImage);
    }
    init(){
        const {FormatTanggal} = this.devedency;
        this.result = new this.CollectionsEdu(this.mainArray)
                        .simpleFilter({'hapus':'','aksi':''})
                        .addProperty('float_startDate',(item)=>parseInt(new FormatTanggal(item.start_tgl).stringYYYYMMDD()))
                        .addProperty('float_endDate',(item)=>parseInt(new FormatTanggal(item.end_tgl).stringYYYYMMDD()))
                        .addProperty('float_currentDate',()=>parseInt(new FormatTanggal(new Date()).stringYYYYMMDD()))
                        .addProperty('isToday',(item)=> item.float_startDate <= item.float_currentDate && item.float_endDate >= item.float_currentDate )
                        // .addProperty('isTodayLibur',(item)=> item.isToday?item.libur:false )
        return this;
    }
    get currentDateDataKalender(){
        return this.result.simpleFilter({isToday:true}).data;
    }
    get currentLibur(){
        return this.result.simpleFilter({'isToday':true}).data.some(n=>n.libur==true);
    }
}