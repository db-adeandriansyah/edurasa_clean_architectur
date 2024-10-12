import { durasiMenit } from "../../utilities/FormatTanggal";
import Orm from "./Orm"

export default class OrmKbmSiswa extends Orm{
    constructor(edu,img){
        super(edu,img);
        this.siswa = {};
    }
    currentSiswa (d){
        this.siswa = d;
        return this;
    }
    init(){
        const kelas = this.siswa.jenjang;
        const {FormatTanggal} = this.devedency;
        this.result = new this.CollectionsEdu(this.mainArray)
                    .customFilter((item)=>item.idtoken==kelas && item.arraykelas.split(',').includes(this.siswa.nama_rombel))
                    .addProperty('float_startDate',(item)=>parseInt(new FormatTanggal(item.idtgl).stringYYYYMMDD()))
                    .addProperty('float_endDate',(item)=>parseInt(new FormatTanggal(item.idtglend).stringYYYYMMDD()))
                    .addProperty('float_currentDate',()=>parseInt(new FormatTanggal(new Date()).stringYYYYMMDD()))
                    .addProperty('isToday',(item)=> item.float_startDate <= item.float_currentDate && item.float_endDate >= item.float_currentDate )
                    
                    
                    
                    
        return this;
    }
    statusPengerjaan(){
        const {FormatTanggal} = this.devedency;
        this.result.addProperty('statusDetikIni',(item)=>{
            let startKbm = new Date(item.idtgl);
                let endtKbm = new Date(item.idtglend);
                let now = new Date();
                let status = ""
                if(startKbm.getTime() <= now.getTime() && endtKbm.getTime() >= now.getTime()){
                    status = 'now'
                }else if(startKbm.getTime() >= now.getTime() && endtKbm.getTime() >= now.getTime()){
                    status = durasiMenit(new Date(),new Date(startKbm));
                }else if(startKbm.getTime() <= now.getTime() && endtKbm.getTime() <= now.getTime()){
                    if(item.datanilai.length>0){
                        status="Ananda sudah mengerjakan";
                    }else{
                        status="Ananda melewatkan Materi ini"
                    }
                };
                return status;
        })
        return this;
    }
    kbmHariIni(){
        return this.result.simpleFilter({isToday:true}).sortByProperty('idtgl','asc').data
        // return this.result.customFilter((item)=>{
        //     let startKbm = new Date(item.idtgl);
        //     let endtKbm = new Date(item.idtglend);
        //     let now = new Date();
        //     return startKbm.getTime() <= now.getTime() && endtKbm.getTime() >= now.getTime();
        // }).data;
    }
}