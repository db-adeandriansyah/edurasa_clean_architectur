/** Menggunakan mode Clean Architecture
 * - di folder ini, Class-classnya dianggap sebagai Entity
 * - Setiap Class, propertinya dibuat private
 * - Selalu menggunakan Getter dan Setter
 */
class User{
    // //tunggal
    // #siswa;
    // #gurukelas;
    // #gurumapel;
    // #ops;
    // #staff;
    // #kepsek;
    // //jamak
    // #siswaRombel;
    // #ptk;
    #currentUser;
    constructor(){
        // this.#siswa         = '' ;
        // this.#gurukelas     = '' ;
        // this.#gurumapel     = '' ;
        // this.#ops           = '' ;
        // this.#staff         = '' ;
        // this.#kepsek        = '' ;
        // this.#siswaRombel   = [] ;
        // this.#ptk           = [] ;
        this.#currentUser   = '' ;
    }
    


}

export {User as default};