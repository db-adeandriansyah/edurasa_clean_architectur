export default class siswa_entity{
    
    #param;
    #result;
    constructor(data=null){
        this.#param= data;
        this.#result = {};
    }
    formatingDate(date){
        let dd = new Date(date);
        let y = dd.getFullYear();
        let m = String(dd.getMonth()+1).padStart(2,'0');
        let d = String(dd.getDate()).padStart(2,'0');
        return `${y}-${m}-${d}`
    }
    sanitize(){
        this.#result = {};
        
        Object.entries(this.#param).forEach(([k,v])=>{
            if(this.protected.includes(k)){
                if(this.dateFormatKey.includes(k) && v!==""){
                    this.#result[k] = this.formatingDate(v);
                }else{
                    this.#result[k] = v;
                }
            }
        })
        return this;
    }
    addItem(key,value){
        this.#param[key] = value;
        return this;
    }
    get data(){
        return this.#result;
    }
    get protected(){
        return [ "time_stamp","id","jenjang","nama_rombel","nis","nisn","nik","nokk","pd_nama","pd_jk","pd_tl","pd_tanggallahir","pd_agama","pd_namaayah","pd_namaibu","pd_alamat","pd_hp","aktif","dieditoleh","action","usulanperubahandata","dapo_rt","dapo_rw","dapo_dusun","dapo_kelurahan","dapo_kecamatan","dapo_kodepos","dapo_jenistinggal","dapo_alattransportasi","dapo_telepon","dapo_email","dapo_skhun","dapo_penerimakps","dapo_nokps","dapo_tahunlahirayah","dapo_jenjangpendidikanayah","dapo_pekerjaanayah","dapo_penghasilanayah","dapo_nikayah","dapo_tahunlahiribu","dapo_jenjangpendidikanibu","dapo_pekerjaanibu","dapo_penghasilanibu","dapo_nikibu","dapo_namawali","dapo_tahunlahirwali","dapo_jenjangpendidikanwali","dapo_pekerjaanwali","dapo_penghasilanwali","dapo_nikwali","dapo_nopesertaujiannasional","dapo_noseriijazah","dapo_penerimakip","dapo_nomorkip","dapo_namadikip","dapo_nomorkks","dapo_noregistrasiaktalahir","dapo_bank","dapo_nomorrekeningbank","dapo_rekeningatasnama","dapo_layakpip","dapo_alasanlayakpip","dapo_kebutuhankhusus","dapo_sekolahasal","dapo_anakkeberapa","dapo_lintang","dapo_bujur","dapo_beratbadan","dapo_tinggibadan","dapo_lingkarkepala","dapo_jumlahsaudarakandung","dapo_jarakrumahkesekolah","dok_akte","dok_kk","dok_kip","dok_kks","dok_kpspkh","dapo_kota","dapo_provinsi","keluar_tgl","masuk_tgl","smp_ke","pindah_ke","masuk_dari","kelas_keluar","angkatan","riwayat_fisik","riwayat_penyakit","riwayat_tapel","dapo_wni","jumlahsaudaratiri","jumlahsaudaraangkat","bahasaseharihari","golongandarah","hubunganwali","kelas_pindah_ke_kelas","pdb_tgl","keluar_tgl2","namasekolahasaltk","noijazahtk","tanggalijazahtk","alasan_keluar","tahuninduk","tahunindukdate","awal_kelas","dok_kartunisn","dok_raport","dok_piagam","dok_ijazahsd","dok_lainnya","nama_panggilan","koleksi_potoinduk","data_kurikulum" ];
    }
    get dateFormatKey(){
        return  [
            'pd_tanggallahir',
            'dapo_tahunlahirayah',
            'dapo_tahunlahiribu',
            'dapo_tahunlahirwali',
            'masuk_tgl',
            'keluar_tgl',
            'keluar_tgl2',
            'pdb_tgl',
            'tahunindukdate'
        ];
    }
}