export default class Dashboard{
    constructor(app,userService){
        this.app = app;
        this.userService = userService;
        this.headerCheck();
        this.mustHaveApp()
    }
    
    async mustHaveApp(){
        
        if(!this.app.hasLocal('ptk')){
            this.userService.ptk();
        }
        
        let hasLocal = window.localStorage.hasOwnProperty('dbSiswa');
        
        if(hasLocal){
            let datlocale = window.localStorage.getItem('dbSiswa');
            if(!datlocale || datlocale == undefined){
                const dataSiswa =  await this.userService.callSiswa();
                if(this.app.UserApp.typeUser == 'siswa'){
                    window.localStorage.setItem('dbSiswa',JSON.stringify(dataSiswa.data.filter(s=>s.id == this.app.UserApp.idUser)));
                }else{
                    window.localStorage.setItem('dbSiswa',JSON.stringify(dataSiswa.data));
                }
            }
        }else{
            const dataSiswa =  await this.userService.callSiswa();
            if(this.app.UserApp.typeUser == 'siswa'){
                window.localStorage.setItem('dbSiswa',JSON.stringify(dataSiswa.data.filter(s=>s.id == this.app.UserApp.idUser)));
            }else{
                window.localStorage.setItem('dbSiswa',JSON.stringify(dataSiswa.data));
            }
        }
    }
    async headerCheck(){
        let dom = this.app.TopHeader(this.app.UserApp).dashboardMenu();;
        document.getElementById('datamenuuser').innerHTML = dom;
        if(this.userService.authType == 'siswa'){
            const DashboardSiswaRepository = await import('../repositories/DashboardSiswaRepository.js').then(m=>m.default);
            const ParameterSiswa = await import('../request/ParameterSiswa.js').then(m=>m.default);
            const DashboardSiswa = await import('./siswa/DashbordSiswa.js').then(m=>m.default);
            const AkunSiswaServices = await import('../services/AkunSiswaServices.js').then(m=>m.default);
            const CollectionsEdu = await import('../models/CollectionsEdu.js').then(m=>m.CollectionsEdu);
            const FormatTanggal = await import('../utilities/FormatTanggal.js').then(m=>m.FormatTanggal);
            const UrlImg = await import ('../controllers/UrlImg.js').then(m=>m.default);
            const OrmAbsensiSiswa = await import('../controller_features/ORM/OrmAbsensiSiswa.js').then(m=>m.default);
            const OrmKbmSiswa = await import('../controller_features/ORM/OrmKbmSiswa.js').then(m=>m.default);
            const OrmNilaiSiswa = await import('../controller_features/ORM/OrmNilaiSiswa.js').then(m=>m.default);
            const ModalConfig = await import('../controller_features/modal/ModalConfig.js').then(m=>m.ModalConfig);
            const instRepo = new DashboardSiswaRepository();
            // instRepo.trial = true;
            const rombel = this.app.UserApp.tugasUser;
            const jenjangSiswa = parseInt(rombel);
            const fase = this.app.faseKey;//[jenjangSiswa];
            const instParamRepo = new ParameterSiswa(instRepo,fase);
            const services = new AkunSiswaServices(instRepo);

            instParamRepo.fokusJenjang = jenjangSiswa;
            
            
            await new DashboardSiswa(this.app, instParamRepo,services)
                .init({
                    CollectionsEdu:CollectionsEdu,
                    FormatTanggal : FormatTanggal,
                    UrlImg:UrlImg,
                    OrmAbsensiSiswa:OrmAbsensiSiswa,
                    OrmKbmSiswa: OrmKbmSiswa,
                    ormNilaiSiswa:OrmNilaiSiswa,
                    Modal:ModalConfig,
                    dom:document.getElementById('infosiswa')
                });
            
        }
        
    }
}