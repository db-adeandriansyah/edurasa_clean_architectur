export default class SoalDomain{
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
        return [ 
                    "idbaris",
                    "jenjang",
                    "rombel",
                    "kodemapel",
                    "kd",
                    "tekskd",
                    "ruanglingkup",
                    "levelkognitif",
                    "materi",
                    "indikatorsoal",
                    "oleh",
                    "bentuksoal",
                    "ilustrasi",
                    "pertanyaan",
                    "tampilanpg",
                    "headerpg",
                    "kuncijawaban",
                    "refrensi",
                    "penskoran",
                    "opsiA",
                    "opsiB",
                    "opsiC",
                    "opsiD",
                    "tekskodemapel",
                    "hapus",
                    "idguru",
                    "bentuksoalspesifik",
                    "kurikulum",
                    "cp",
                    "menjodohkan_kanan",
                    "menjodohkan_kiri",
                    "menjodohkan_jawaban",
                    "tekslevelkognitif",
                    "tekskuncijawaban",
                    "taksonomibloom",
                    "elemen",
                    "tp",
                    "atp",
                    "arraypgkomplek",
                    "jumlahsoalmenjodohkan"
                ];
    }
}