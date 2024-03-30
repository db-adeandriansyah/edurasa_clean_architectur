import KurikulumFitur from "../controller_features/kurikulum/KurikulumFitur";
import { menuPropertiMapel } from "../views/kurikulum/controlKurikulum";
import Fitur from "./Fitur";


export default class KurikulumController extends Fitur{
    #judulHalaman;
    constructor(app,kurikulumService){
        super(app);
        this.kurikulumService = kurikulumService;
        this.kurikulumFitur = null;
        this.controlRombel(false);
        this.#judulHalaman;
        
    }
    
    settingHeaderPage(){
        let lastTitle = `<h4 class="text-center mb-3">Semester ${this.setApp.semester} Tahun Pelajaran ${this.setApp.tapel}</h4>`;
        this.#judulHalaman = '';
        
        for(let i = 0 ; i < arguments.length-1; i++){
            this.#judulHalaman +=`<h3 class="text-center mb-0">${arguments[i]}</h3>`;
        }
        
        if(arguments[arguments.length-1]==true){
            this.#judulHalaman+= lastTitle;
        }
        // return this.#judulHalaman;
    }
    async init(){
        
        this.kurikulumFitur = this.makeInstance(KurikulumFitur,[this.kurikulumService,this.Auth]);
        await this.kurikulumFitur.firstCall();
        // this.kurikulumFitur.settingJenjang(this.fokusJenjang);
        // console.log(this.fokusJenjang);
        // console.log(this.kurikulumFitur);
        // console.log(this.kurikulumFitur.shortKurikulum);
    }
    async item_kurikulum(){
        this.settingHeaderPage('Kalender Pendidikan',this.Auth.namaSekolah,'Tahun Pelajaran ' + this.Auth.tapel,false);
        this.kurikulumFitur.headerPage = this.#judulHalaman;
        
        this.kurikulumFitur.settingJenjang(this.fokusJenjang)
        
        let data = {
            judul:this.kurikulumFitur.longKurikulum,
            arraySelect:this.kurikulumFitur.labelingSelectMapel,
            deskripsi:'Jenjang kelas ini menerapkan '+this.kurikulumFitur.longKurikulum,
            properti:this.kurikulumFitur.labelingPropertiKurikulum,
            ValuePertama:this.Auth.typeUser=='Guru Mapel'?this.Auth.jabatanUser:''
        }
        this.maincontrol.innerHTML = menuPropertiMapel(data);
        
        // await this.kurikulumFitur.settingOrm();
        this.kurikulumFitur.fitur_item_kurikulum();
        // console.log(this.fokusJenjang, typeof this.fokusJenjang);
        // console.log(this.kurikulumFitur.ormKurikulum.db);
        

    }

}