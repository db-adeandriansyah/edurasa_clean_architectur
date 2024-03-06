
import UserRepositories from "../repositories/UserRepositories";
import { CollectionsEdu } from "../models/CollectionsEdu";

export default class UserService extends UserRepositories{
    constructor(App){
        super(App)
    }
    
    async SiswaLogin(token){
        
        if(this.hasLocal('app')){
            let conf = confirm('Anda sudah login dengan akun lain, Apakah Anda ingin melanjutkan?');
            if(conf){
                this.clearLocalAll();
            }else{
                return;
            }
        }
        let data = null;
        let result = false;
        if(tokensiswa.length == 10){
            data = await this.loginSiswaByNISN(token);
        }else{
            data = await this.loginSiswaByToken(token);
        }
        
        if(data.ijinkan=='ok'){
            this.writeLocal('app',JSON.stringify(Object.assign({},this.app,data)));
            result = true;
        }
        
        return result;
    }
    
    async dataCarousel(){
        return await this.ptk()
    }
    
    async ptk(){
        this.callWithProses();
        const dataGuru = await this.callDataCarousel();
        this.stopProgressBar();
        const persons = new CollectionsEdu(dataGuru.result).customFilter((item)=>item.aktif == 'aktif').selectProperties(['guru_namalengkap','gurukelas_gmp','kelas','idpoto_potoguru','guru_nip','id','no_wa_user']).addProperty('typeUser',(item)=>{
            let result = item.gurukelas_gmp;
            if(item.gurukelas_gmp=='Staff'){
                result = item.kelas
            }
            return result;
        });
        const ptk = persons.data;
        this.writeLocal('ptk',JSON.stringify(ptk));
        return ptk;
    }
    
    async allSiswa(){
        const dataSiswa = await this.callSiswa()
        // this.stopProgressBar();
        window.localStorage.setItem('dbSiswa',JSON.stringify(dataSiswa.datasiswa));
    }



}