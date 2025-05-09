import BankSoalRequest from "./BankSoalRequest";

export default class ParameterSiswa extends  BankSoalRequest{

    constructor(repo, faseKey){
        super(repo,faseKey);
    }
   
    get api_absensi(){
        return this.createParamTab(this.idssAbsen,'responses','absen_'+this.fokusJenjang)
    }
    get api_nilai(){
        return this.createParamTab(this.idssNilai,'respon','respon_'+this.fokusJenjang)
    }
    dashboard(){
        return [
            ...this.desain_naskah(),
            this.api_datamateri,
            this.api_absensi,
            this.api_kalender,
            this.api_nilai,
        ]
    }
}