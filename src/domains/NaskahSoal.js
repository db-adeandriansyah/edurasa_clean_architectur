export default class NaskahSoal{
    #param;
    #result;
    constructor(data=null){
        this.#param= data;
        this.#result = {};
    }
    sanitize(){
        this.#result = {};
        
        Object.entries(this.#param).forEach(([k,v])=>{
            if(this.protected.includes(k)){
                this.#result[k] = v;
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
        return [ "idbaris","idguru","namaguru","jenjang","rombel","juduldesain","mapel","html_identitas","html_soal","tanggal","waktu","no_1","no_2","no_3","no_4","no_5","no_6","no_7","no_8","no_9","no_10","no_11","no_12","no_13","no_14","no_15","no_16","no_17","no_18","no_19","no_20","no_21","no_22","no_23","no_24","no_25","no_26","no_27","no_28","no_29","no_30","no_31","no_32","no_33","no_34","no_35","no_36","no_37","no_38","no_39","no_40","no_41","no_42","no_43","no_44","no_45","no_46","no_47","no_48","no_49","no_50","waktu2","waktu2_end","versiedurasa","dipublikasikan_tanggal","hapus","ujiansekolah","kurikulum","kop",];
    }
}