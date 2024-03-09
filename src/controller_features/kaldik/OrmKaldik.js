import { CollectionsEdu } from "../../models/CollectionsEdu";
import { FormatTanggal } from "../../utilities/FormatTanggal";

export default class OrmKaldik{
    constructor(dbkaldik){
        this.kaldik = new CollectionsEdu(dbkaldik); // array objek data tab kalender;
        this.namahari = [ 'Mg','Sn','Sl','Rb','Km','Jm','Sb']
    }
    init(){
        this.kaldik.addProperty('isLibur',(item)=>item.tgl)
    }

    cekboolean(bol){
        if(typeof bol === 'boolean'){
            return bol;
        }else if(typeof bol == 'string'  || bol instanceof String){
            if(bol == 'TRUE' || bol =='true'){
                return true;
            }else{
                return false;
            }
        };
        
    }

    dataTanggalan(namabulan,tagSabtu=false){ // '2024-01-01'
        let date = new Date(namabulan);
        let m = date.getMonth();
        let y = date.getFullYear();
        let countDayInMonth = new FormatTanggal(namabulan).lastTgl();
        let data = [];
        [...Array(countDayInMonth)].forEach((_,index)=>{
            let d = new Date(y,m,(index+1));
            let hari = d.getDay();

            let obj = {};

            obj.tgl_hari = `${(index+1)}<br>${this.namahari[hari]}`;
            obj.tgl = new FormatTanggal(d).valueInputDate();
            obj.keytgl = new FormatTanggal(d).idStringAbsen();
            obj.atribute = {class:'text-capitalize'};
            let tagHe=true, tagHeb=true, tagLibur = false;
            if(hari == 0 ||(hari == 6 && tagSabtu)){
                obj.atribute={class:'text-bg-danger text-capitalize'};
                tagHe=false;
                tagHeb = false;
                tagLibur = true;
            }
            obj.title = false;
            let cek = this.kaldik.data.filter((item)=>{
                    const startDate = new Date(item.start_tgl).getTime();
                    const endDate = new Date(item.end_tgl).getTime();
                    const target = d.getTime();
                    return target >= startDate && target <= endDate;
            });
            if(cek.length>0){
                if(cek.length ==1){
                    let bg = `background-color:${cek[0]['background-color']};color:${cek[0].color}!important`;
                    obj.atribute={'style':bg};
                    obj.title = cek[0].keterangan;
                    tagHe = this.cekboolean(cek[0].he);
                    tagHeb = this.cekboolean(cek[0].heb);
                    tagLibur = this.cekboolean(cek[0].libur);
                    
                }else{
                    let color = [];
                    let title = [];
                    let arHe = [], arHeb=[], arLibur=[];
                    cek.forEach(it=> {
                        color.push(it['background-color']);
                        title.push(it.keterangan);
                        arHe.push(this.cekboolean(it.he))
                        arHeb.push(this.cekboolean(it.heb))
                        arLibur.push(this.cekboolean(it.libur))
                    });
                    obj.arHe = arHe;
                    obj.arHeb = arHeb;
                    obj.arLibur = arLibur;
                    obj.title = title.join(', ');
                    tagHe = arLibur.some(n=>n===true)?false:true;
                    tagHeb = arLibur.some(n=>n===true)?false:true;
                    tagLibur = arLibur.some(n=>n===true);
                    let bg = `background:linear-gradient(-45deg,${color.join(',')});color:red`;
                    obj.atribute={'style':bg};
                }
            }
            obj.he = tagHe;
            obj.heb = tagHeb;
            obj.libur = tagLibur;
            data.push(obj);
        });
        return data;
    }
}