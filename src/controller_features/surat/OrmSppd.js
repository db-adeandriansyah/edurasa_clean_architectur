import { CollectionsEdu } from "../../models/CollectionsEdu";

export default class OrmSppd{
    #orm;
    constructor(arrSppd,tendik,ptkriwayat,user,currentUser){
        this.sppd = arrSppd;
        this.tendik = tendik;
        this.ptkriwayat = ptkriwayat;
        this.user = user;
        this.currentUser = currentUser;
        this.#orm;
        this.init();
    }
    get data(){
        return this.#orm.data;
    }
    init(){
        this.#orm = new CollectionsEdu(this.sppd)
            .addProperty('namaptk',(item)=>this.user.filter(s=>s.id == item.ptk_diperintah)[0])
            .addProperty('tendik',(item)=>this.tendik.filter(s=>s.idguru == item.ptk_diperintah)[0])
            .addProperty('tglend',(item)=>{
                let d = new Date(item.ptk_starttgl);
                d.setDate(d.getDate()+(parseInt(item.ptk_durasisppd)-1));
                return d;
            })
            .addProperty('kepsekbytgl',(item)=>{
                return this.ptkriwayat.filter(d=>{
                        let tglsurat = new Date(item.ptk_starttgl).getTime();
                        let awaltugas = new Date(d.start_at).getTime();
                        let akhirtugas = new Date(d.end_at).getTime();
                        return (d.jenis_ptk === 'kepsek' && awaltugas <= tglsurat && akhirtugas >= tglsurat)
                    })
            })
            .addProperty('canEdit',(item)=>item.ptk_diperintah == this.currentUser.idUser);
    }
    dataPersonForModal(){
        let datamodal = {
            judulmodal:`<h3 class="text-center">Data SPPD No surat ini</h3>`,
            data:data.data,
            idbaris:ormSuratkeluar.idbaris,
            oleh : ormSuratkeluar.user
        }
    }
}