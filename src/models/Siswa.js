export class Siswa{
    #allSiswa;
    constructor(dbsiswa=[]){
        this.#allSiswa = dbsiswa;
    }
    set Siswa(x){
        this.#allSiswa = x;
    }
    get Siswa(){
        return this.#allSiswa;
    }
}