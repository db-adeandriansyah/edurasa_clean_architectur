import OrmBankSoal from "../../controller_features/ORM/OrmBankSoal";
import OrmKalender from "../../controller_features/ORM/OrmKalender";
import OrmKurikulumSoal from "../../controller_features/ORM/OrmKurikulumSoal";
import mapelkdcp_kurikulum from "../../models/mapel";
import ViewDashboardSiswa from "./ViewDashboardSiswa";
import VisibilityHandler from "./VisibilityHandler";



export default class DashboardSiswa{
    constructor(app,param,service){
        this.app = app;
        this.param = param;
        this.service = service;
        this.currentSiswa = {};
    }
    paramMapelCurrentJenjang (jenjang){
        let tinggiRendah = jenjang>3?'tinggi':'rendah';;
        return 'mapelkurmer'+ tinggiRendah;;
    }
    async init(classes){
        const idSiswa = this.app.UserApp.idUser;
        
        await this.service.allSiswa();
        
        const datasiswa = this.app.LocalJsonNonEncoded('dbSiswa');
        
        this.currentSiswa = datasiswa.filter(s=> s.id == idSiswa)[0];

        const param = this.param.dashboard();
        
        await this.service.avoidExist(true).callPropertiMultiple(param);
        
        this.service.data.koleksimapel = mapelkdcp_kurikulum[this.paramMapelCurrentJenjang(jenjang)]();
        
        const jenjang = this.currentSiswa.jenjang;
        const {kalender,datamateri} = this.service.data;
        const {CollectionsEdu, OrmAbsensiSiswa, OrmKbmSiswa, ormNilaiSiswa,FormatTanggal,UrlImg,Modal,dom} = classes;
        const logosekolahid  = this.app.UserApp.logoSekolah;
        const apiabsen = this.service.data['absen_'+jenjang];
        const apinilai = this.service.data['respon_'+jenjang];
        const absen = new OrmAbsensiSiswa(CollectionsEdu,UrlImg)
            .currentSiswa(this.currentSiswa)
            .parent(apiabsen)
            .devedencyClass({
                    FormatTanggal:FormatTanggal,
                })
            .init();

        const ormNilai= new ormNilaiSiswa(CollectionsEdu,UrlImg)
            .currentSiswa(this.currentSiswa)
            .parent(apinilai)
            .init();
            

        const ormDataMateri = new OrmKbmSiswa(CollectionsEdu,UrlImg)
            .currentSiswa(this.currentSiswa)
            .parent(datamateri)
            .devedencyClass({ 
                FormatTanggal:FormatTanggal 
                })
            .init()
            .withOrm('datanilai',ormNilai.collections,'idbaris','matericode')
            .statusPengerjaan();

            const ormKurikulum              = new OrmKurikulumSoal(CollectionsEdu ,this.service.data, this.param.faseKey[jenjang],jenjang);
            
            /** Orm Bank Soal */
            const ormBankSoal = new OrmBankSoal(CollectionsEdu, UrlImg.replacingImg)
                                    .parent(this.service.data.banksoal)
                                    .init();
            ormBankSoal.withOrm('kurikulum',ormKurikulum.collections,'kd','idbaris');

        const ormKalender = new OrmKalender(CollectionsEdu,UrlImg).parent(kalender).devedencyClass({
            FormatTanggal:FormatTanggal
        }).init();

        const ModalInit = new Modal('#modalAuto',{'backdrop':'static','keyboard':false});
        
        new ViewDashboardSiswa(this.service,this.currentSiswa)
            .Orm({
                ormAbsen:absen,
                ormKalender:ormKalender,
                ormDataMateri:ormDataMateri,
                ormBankSoal:ormBankSoal,
                Modal:ModalInit,
                logosekolah:logosekolahid,
                barloading: this.app.UserApp.barloading,
                FormatTanggal :FormatTanggal,
                param:this.param.api_absensi,
                paramnilai:this.param.api_nilai,
                faseKey:this.param.faseKey
            })
            .renderView(dom)
            .init(this.init.bind(this));
        return this;

    }
    renderTo(elemen){
        elemen.classList.remove('d-none');
        return this;
    }
}