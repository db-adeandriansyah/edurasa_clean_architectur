export default class ValidatorItemSoal{
    constructor(data){
        this.data = data;
        this.arraykoleksiboolean = [];
        this.arrayKeyValid = [];
        this.fokusBentukSoal = [];
    }
    get keyvalid_pg(){
        return [
            'pertanyaan',
            'opsiA',
            'opsiB',
            'opsiC',
            'penskoran',
            'kuncijawaban',
            'indikatorsoal',
            'materi',
            'levelkognitif',
            'ruanglingkup'

        ]
    }
    get keyvalid_pgkompleks(){
        return [
            'pertanyaan',
            'arraypgkomplek',
            'penskoran',
            'kuncijawaban',
            'indikatorsoal',
            'materi',
            'levelkognitif',
            'ruanglingkup'

        ]
    }
    get keyvalid_isianessay(){
        return [
            'pertanyaan',
            'penskoran',
            'indikatorsoal',
            'materi',
            'levelkognitif',
            'ruanglingkup'

        ]
    }
    get keyvalid_menjodohkan(){
        return [
            'pertanyaan',
            'jumlahsoalmenjodohkan',
            'indikatorsoal',
            'materi',
            'levelkognitif',
            'ruanglingkup'

        ]
    }
    get keydata(){
        return Object.keys(this.data);
    }
    get bentuksoal(){
        return this.data.bentuksoal;
    }
    arrayResult(array, koleksiBoolean){
        array.forEach(n=>{
            let cek = this.keydata.includes(n);
            if(cek){
                if(this.data[n]!==""){
                    koleksiBoolean.push(true);
                }else{
                    koleksiBoolean.push(false);

                }
            }else{

                koleksiBoolean.push(false);
            }
        })
        return koleksiBoolean;
    }
    keyInvalid(keyBentukSoal, keyCeking){
        return keyBentukSoal.filter((_,i)=> !keyCeking[i]);
    }
    arrayKeyInvalid(){
        return this.keyInvalid(this.fokusBentukSoal,this.arraykoleksiboolean );
    }
    init(){
        let koleksiBoolean = [];
         if(this.bentuksoal == 'Pilihan Ganda'){
            this.arrayResult(this.keyvalid_pg,koleksiBoolean);
            this.fokusBentukSoal = this.keyvalid_pg;
        }else if(this.bentuksoal ==='Isian'){
            this.arrayResult(this.keyvalid_isianessay,koleksiBoolean);
            this.fokusBentukSoal = this.keyvalid_isianessay;
        }else if(this.bentuksoal === 'Menjodohkan'){
            this.arrayResult(this.keyvalid_menjodohkan,koleksiBoolean);
            this.fokusBentukSoal = this.keyvalid_menjodohkan;
        }else if(this.bentuksoal === 'PG Kompleks'){
            this.arrayResult(this.keyvalid_pgkompleks,koleksiBoolean);
            this.fokusBentukSoal = this.keyvalid_pgkompleks;
        }else if(this.bentuksoal === 'BenarSalah'){

        }
        this.arraykoleksiboolean = koleksiBoolean
    }
    validatingRequest(){
        return this.arraykoleksiboolean.every(n=> n===true);
    }
    async domain(){
        const SoalDomain = await import('../../domains/SoalDomain').then(m=>m.default);
        const datavalid = new SoalDomain(this.data);
        return datavalid.sanitize().data;
        
    }
}