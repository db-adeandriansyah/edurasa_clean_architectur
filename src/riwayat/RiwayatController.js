import RiwayatRepo from "./RiwayatRepo";
import RiwayatService from "./RiwayatService";

export default class RiwayatController{
    //atribute;
    /**
     * current = saat ini di tapel dan semester yagn sedang berlangsung;
     * target = kondisi dimana tapel, semester, kelas berada dalam tapel yang diinginkan(requestTapel);
     */
    #targetRombel;
    #targetSemester;
    #selisihTapel;
    #currentSemester 
    #currentKodeTapel;
    #targetKodeTapel;
    #repo;
    #service;
    /**
     * 
     * @param {*} Makro 
     * @param {*} currentRombel 
     * 
     */
        constructor(repo,currentRombel,app,targetKey){
        this.repo = repo
        this.jsonMakro = repo.jsonMacro();
        this.abjad = currentRombel.match(/[A-D]/g)[0];
        this.currentJenjang = parseInt(currentRombel);
        this.riwayatApiTapel = app.key;
        this.currentKey = app.key;
        this.requestKey = targetKey;
    }
    get requestRombel(){
        return this.#targetRombel;
    }
    get selisih(){
        return this.#selisihTapel;
    }
    async init(currentSiswa){
        const splitingCurrentTapel = this.currentKey.split('_')[1];
        const splitingRequestTapel = this.requestKey.split('_')[1];
        const splitingCurrentSemester = this.currentKey.split('_')[3];
        const splitingRequestSemester = this.requestKey.split('_')[3];
        const selisihTapel = parseInt(splitingCurrentTapel - splitingRequestTapel);
        // console.log('currentSiswa', currentSiswa)
        this.#selisihTapel= (selisihTapel/101);
        console.log(this.#selisihTapel, this.#selisihTapel >0)
        this.#targetRombel = selisihTapel?this.currentJenjang-this.#selisihTapel:this.currentJenjang;
        this.#targetSemester = splitingRequestSemester;
        this.#currentSemester = splitingCurrentSemester;
        this.#currentKodeTapel = splitingCurrentTapel;
        this.#targetKodeTapel = splitingRequestTapel;

        
        let tapel           ='20'+ this.#targetKodeTapel.slice(0,2)+'/20'+ this.#targetKodeTapel.slice(2,4);
        let kelas = this.#targetRombel;
        let kelasExist = this.#targetRombel>0;
        let namaRombel = kelas + this.abjad;
        
        if(kelasExist){
            console.log('tapel target = ', tapel,', semester = ', this.#targetSemester, ', kelas =', kelas + this.abjad);
            
            const repo = new RiwayatRepo(this.jsonMakro[this.requestKey], kelas).init();
            
            this.#service = new RiwayatService(repo,this.#targetKodeTapel);
            this.#service.init(namaRombel);
            this.repo.callWithProses();
            const data = await this.#service.dataRaport(namaRombel);
            console.log('api:',data);
            this.repo.stopProgressBar()
            
        }else{
            console.log('tidak punya data kelas')
        }
        return this;
    }
    defineKelas(){
        //selisih == 0, berarti masih dalam satu masa tapel;
        // jika currentSemester 1, maka yang diambil
        // console.log('jsonMacro',this.jsonMakro,'\r\n','currentKey',this.currentKey,'\r\n','requestKey',this.requestKey,'\r\n','selisih', this.#selisihTapel);
        // console.log('semester Target', this.#targetSemester);
        // console.log('rombel Target', this.#targetRombel);
        // console.log('currentRombel Target', this.currentJenjang);
        // console.log('current semester', this.#currentSemester);
        
        // jenjang karena tahun mundur;
        // data yang ingin ditampilkana dalah data 
        // let tapelSekarang   ='20'+ this.#currentKodeTapel.slice(0,2)+'/20'+ this.#currentKodeTapel.slice(2,4);
        

        
        return this;
    }
    responMakro(){

    }
    
}