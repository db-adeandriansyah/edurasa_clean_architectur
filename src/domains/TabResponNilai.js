export default class TabResponNilai{
    
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
        return [ "Time_Stamp","idkelas","idmapel","crtToken","jenistagihan","kodeunik","namasiswa","nilaikd","html_jawaban","emailguru","tokensiswa","PG_1","PG_2","PG_3","PG_4","PG_5","PG_6","PG_7","PG_8","PG_9","PG_10","PG_11","PG_12","PG_13","PG_14","PG_15","PG_16","PG_17","PG_18","PG_19","PG_20","PG_21","PG_22","PG_23","PG_24","PG_25","PG_26","PG_27","PG_28","PG_29","PG_30","PG_31","PG_32","PG_33","PG_34","PG_35","PG_36","PG_37","PG_38","PG_39","PG_40","PG_41","PG_42","PG_43","PG_44","PG_45","PG_46","PG_47","PG_48","PG_49","PG_50","SKOR_1","SKOR_2","SKOR_3","SKOR_4","SKOR_5","SKOR_6","SKOR_7","SKOR_8","SKOR_9","SKOR_10","SKOR_11","SKOR_12","SKOR_13","SKOR_14","SKOR_15","SKOR_16","SKOR_17","SKOR_18","SKOR_19","SKOR_20","SKOR_21","SKOR_22","SKOR_23","SKOR_24","SKOR_25","SKOR_26","SKOR_27","SKOR_28","SKOR_29","SKOR_30","SKOR_31","SKOR_32","SKOR_33","SKOR_34","SKOR_35","SKOR_36","SKOR_37","SKOR_38","SKOR_39","SKOR_40","SKOR_41","SKOR_42","SKOR_43","SKOR_44","SKOR_45","SKOR_46","SKOR_47","SKOR_48","SKOR_49","SKOR_50","action","idtoken","idsekolah","nilaiPG","idbaris","nilaiEssay","matericode","html_buktifisik","nontext","waktumulai"];
    }
}