export default class CreateLJK{
    constructor(kbm,siswa,proseeskerjaan){
        this.naskah = kbm;
        this.datasoal = kbm.datasoal
        this.siswa = siswa;
        /** @return Date */
        this._waktumulai=null;
        this._waktuakhir=null;
        this.proseskerjaan = proseeskerjaan;
    }
    set waktumulai(n){
        this._waktumulai = new Date(n);
    }
    set waktuakhir(n){
        this._waktuakhir = new Date(n);
    }
    propertiKd(){
        let obParsing = JSON.parse(this.naskah.kuncikd);
        let keyParsing = Object.keys(obParsing).map(n=>n.split('_').join(' = '));
        return keyParsing;
    }
    get dataIdentitas(){
        
        return {
            kbmid: this.naskah.idbaris,
            nama: this.siswa.pd_nama,
            idsiswa:this.siswa.id,
            kelas: this.siswa.nama_rombel,
            namamateri:this.naskah.idmapel,
            jenistagihan:this.naskah.jenistagihan,
            pelaksanaan:new Date(this.naskah.idtgl).toLocaleString('id-ID',{timeStyle:"long",dateStyle:'full'}),
            waktumulai:new Date(this._waktumulai).toLocaleString('id-ID',{timeStyle:"long",dateStyle:'full'}),
            waktuakhir:new Date(this._waktuakhir).toLocaleString('id-ID',{timeStyle:"long",dateStyle:'full'}),
            kduji : this.propertiKd().join('<br>')

        }
    }
}