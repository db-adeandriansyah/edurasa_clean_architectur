export default class MateriKbm{
    
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
        return [ "Time_Stamp","idkelas","idmapel","idtoken","idtgl","basetxt","idmateri","callback","action","idbaris","iddurasi","idaksessiswa","crtToken","idtglend","jumlahpg","jumlahessay","idpendaftar","idSekolah","dibuatoleh","jenistagihan","kuncikd","pembuatpertama","versi","arraykelas","id_desainnaskah","Pilihan Ganda","Isian","Essay","Menjodohkan","null" ];
    }
}