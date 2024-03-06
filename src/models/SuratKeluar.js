export class SuratKeluar{
    #db;
    #idbaris
    #nosurat
    #id_nosurat
    #tglsurat
    #perihal
    #indekssurat
    #ditujukkankepada
    #idfile
    #status
    #oleh
    #user
    #target_siswa	
    #target_ptk
    #fokusObjek
    /**
     * 
     * @param {*} data array
     * 
     */
    constructor(data){
        this.#db = data;
        this.#fokusObjek = {};
        
        this.targetpersonal;
        this.targetdb;
        this.targetname;
    }

    protectedKey(){
        return [
            'idbaris',
            'nosurat',
            'id_nosurat',
            'tglsurat',
            'perihal',
            'indekssurat',
            'ditujukkankepada',
            'idfile',
            'status',
            'oleh',
            'user',
            'target_siswa',
            'target_ptk',
        ]
    }
    
    /**
     * 
     * @returns Array
     */
    all(){
        const protectedkey = this.protectedKey();
        return this.#db.map(n=>Object.fromEntries(Object.entries(n).filter(([k,v])=>protectedkey.includes(k))));
    }

    /**
     * 
     * @param {*} id 
     * @returns Object;
     */
    findById(id){
        const data = this.#db.filter(s=> s.idbaris == id);
        const protectedkey = this.protectedKey();
        let result = {};
        Object.entries(data[data.length-1]).forEach(([k,v])=>{
            if(protectedkey.includes(k)){
                result[k]= v;
            }
        });
        this.#fokusObjek = result;
        return this;
        
    }

    /**
     * 
     * @param {*} db array
     * @returns array;
     */
    configTargetSiswa(db){
        this.dbsiswa = db;
        return this;
    }
    /**
     * 
     * @param {*} db array
     * @returns array;
     */
    configTargetPtk(db){
        this.dbptk = db;
        return this;
    }

    defineTarget(){
        const indeksurat = this.#fokusObjek.indekssurat;
        switch (indeksurat) {
            case 'Surat Keterangan Aktif':
                this.targetpersonal = 'target_siswa';
                this.targetdb = 'dbsiswa';
                this.targetname = 'siswa';
                break;
            case "Surat Keterangan NISN":
                this.targetpersonal = 'target_siswa';
                this.targetdb = 'dbsiswa';
                this.targetname = 'siswa';
                break;
            case "SPPD":
                this.targetpersonal = 'target_ptk';
                this.targetdb = 'dbptk';
                this.targetname = 'guru';
                break;
            default:
                this.targetpersonal = [];
        }
        
        return this;
    }
    
    get data(){
        return this.#fokusObjek;
    }
    
    get count_datatarget(){
        const datatarget = this.data_target;
        const count_target = datatarget.length;
        const count_ref = this.targetdb?this[this.targetdb].length:0;
        let teks = "<br>Atas nama:";

        if(count_target == 0){
            teks ="";
        }else if(count_target === count_ref){
            teks = "<br>Untuk Semua "+ this.targetname;
        }else if(count_target < count_ref && count_target > 5){
                teks = `<ol>`;
                this.data_target.forEach((n,indeks)=>{
                    if(indeks < 5){
                        if(this.targetname ==='siswa'){
                            teks += `<li>${n.pd_nama}</li>`
                        }else{
                            teks+=`<li>${n.guru_namalengkap}</li>`;
                        }
                    }
                });
                teks+=`<li>... dan ${count_target-5} ${this.targetname} lagi.</li>`;
                teks+= `</ol>`;
        }else if(count_target < count_ref && count_target < 5){
                teks = `<ol>`;
                this.data_target.forEach((n,indeks)=>{
                    if(indeks < 5){
                        if(this.targetname ==='siswa'){
                            teks += `<li>${n.pd_nama}</li>`
                        }else{
                            teks+=`<li>${n.guru_namalengkap}</li>`;
                        }
                    }
                });
                // teks+=`<li>... dan ${count_target-5} ${this.targetname} lagi.</li>`;
                teks+= `</ol>`;
        }
        return teks;
    }
    get data_target(){
        this.defineTarget();
        if(this.targetpersonal.length>0){
            let array =  this.#fokusObjek[this.targetpersonal].split(',').map(n=>parseInt(n));
            return this[this.targetdb].filter(s=>array.includes(parseInt(s.id)));
        }else{
            return [];
        }

    }
    // get data_targetsiswa(){
    //     let array =  this.#fokusObjek.target_siswa.split(',').map(n=>parseInt(n));
    //     return this.dbsiswa.filter(s=>array.includes(parseInt(s.id)));
    // }

    // get data_targetptk(){
    //     let array =  this.#fokusObjek.target_ptk.split(',').map(n=>parseInt(n));
    //     return this.dbptk.filter(s=>array.includes(parseInt(s.id)));
    // }
}