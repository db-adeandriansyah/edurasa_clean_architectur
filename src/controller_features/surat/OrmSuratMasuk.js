import { CollectionsEdu } from "../../models/CollectionsEdu";
import { FormatTanggal } from "../../utilities/FormatTanggal";

export default class OrmSuratMasuk{
    #SuratMasuk;
    #orm;
    
    constructor(dbSuratMasuk,canUploadFileSurat,user){
        this.#SuratMasuk = dbSuratMasuk;
        this.canUploadFileSurat = canUploadFileSurat;
        this.user=user
        this.#orm = []
        this.init();
    }
    get dbSuratMasuk(){
        return this.#orm.data;
    }
    settingSort(tipeSort = 'asc',key='idbaris'){
        // this.#orm.sortByProperty('idbaris','desc');
        // /.sortByProperty('idbaris','desc')
       
        this.#orm = this.#orm.sortByProperty(key,tipeSort)
        
    }
    init(){
        this.#orm = new CollectionsEdu(this.#SuratMasuk.slice())
        .setProperty('tglsurat',(item)=>new FormatTanggal(item).valueInputDate())
        .setProperty('tglditerima',(item)=>new FormatTanggal(item).valueInputDate())
        .addProperty('tglditerima_input',(item)=>new FormatTanggal(item.tglditerima).valueInputDate())
        .addProperty('tglsurat_input',(item)=>new FormatTanggal(item.tglsurat).valueInputDate())
        .addProperty('string_tglsurat',(item)=>item==""?"":new Date(item.tglsurat).toLocaleString('id-ID',{'dateStyle':'full'}))
        .addProperty('string_tglditerima',(item)=>item==""?"":new Date(item.tglditerima).toLocaleString('id-ID',{'dateStyle':'full'}))
        .addProperty('aksi',(item)=>{
            let html="";
            let file =  item.idfile
            if(file !== ''){
                let link = `https://drive.google.com/file/d/${file}/view?usp=drivesdk`;
                html+=`<button class="btn btn-sm btn-success" onclick="window.open('${link}','', 'width=720,height=600')"><i class="bi-eye"></i> File</button>`;
            }
            
            return html;
        }).addProperty('aksi2',(item)=>{
            let html="";
            
            if(this.canUploadFileSurat(item.user)){
                html+=`<button data-show="edit_suratmasuk" data-idsuratkeluar="${item.idbaris}" class="btn btn-sm btn-info border-3 border-success rounded-pill border-bottom border-start-0 border-top-0 border-end-0"><i class="bi-pencil"></i></button>`;
                html+=`<button data-show="hapus_suratmasuk" data-idsuratkeluar="${item.idbaris}"  class="btn btn-sm btn-danger border-3 border-dark rounded-pill border-bottom border-start-0 border-top-0 border-end-0"><i class="bi-trash"></i></button>`;
            }
            return html;
        });
        
        return this;
        
    }

}