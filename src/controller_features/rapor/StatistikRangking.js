export class StatistikRangking {
    constructor(dbsiswa){
        this.dbsiswa = dbsiswa;

        //tipe sumberGenerate 
        this._tipesumber = 'tabel';
        // tabel atau arrayJson (algoritma atau data server)
        this._sumberGenerate = null; 

        // refrensi untuk membuat rerata, berupa array yang berisi item index atau item key;
        this._refrensiIndexKeyRerata = [];

        // hasilfinal rerata ditampung di sini;
        this._resultArray = []; 

        // arraynilai sumber rerata;
        this._resourceRerata = [];

        // arraynilai sumber rangking;
        this._resourceRangking = [];

        this._sortRankingCopy = [];


        // kolom rerata jika tidak perlu mengkalkulasi nilai rerata;
        this._indexColoumnRerata = -1; //

    }
    set sortRankingCopy(x){
        this._sortRankingCopy = x;
    }
    get sortRankingCopy(){
        return this._sortRankingCopy;
    }
    set resourceRangking(x){
        this._resourceRangking = x;
    }
    get resourceRangking(){
        return this._resourceRangking;
    }
    set indexColoumnRerata(x){
        this._indexColoumnRerata = x;
    }
    get indexColoumnRerata(){
        return this._indexColoumnRerata;
    }
    set resourceRerata(x){
        this._resourceRerata = x;
    }
    get resourceRerata(){
        return this._resourceRerata;
    }
    set refrensiIndexKeyRerata(x){
        this._refrensiIndexKeyRerata = x;
    }
    get refrensiIndexKeyRerata(){
        return this._refrensiIndexKeyRerata;
    }
    set tipesumber(x){
        this._tipesumber = x;
    }
    get tipesumber(){
        return this._tipesumber;
    }
    
    set resultArray(x){
        this._resultArray = x;
    }
    get resultArray (){
        return this._resultArray;
    }

    set sumberGenerate(x){
        this._sumberGenerate = x;
    }
    get sumberGenerate(){
        return this._sumberGenerate;
    }
    FromTable(elementable){
        this.tipesumber = 'tabel';
        this.sumberGenerate = elementable;
        return this;
    }
    fromIndexRerata(x){
        this.refrensiIndexKeyRerata = x;
        return this;
    }
    calculateRerata(){
        let loop_array = [];
        let loop_object = []
        if(this.tipesumber == 'tabel'){
            if(this.sumberGenerate){
                //elemen body;
                let tbody = this.sumberGenerate.querySelector('tbody');
                // cek apakeh refrensi berupa array/objek;
                let refrensiindek = [];
                if(Array.isArray(this.refrensiIndexKeyRerata)){
                    refrensiindek = this.refrensiIndexKeyRerata
                }else{
                    refrensiindek = Object.values(this.refrensiIndexKeyRerata);
                }
                
                for(let i = 0 ; i < tbody.rows.length; i++){
                    let row = tbody.rows[i];
                    let arr_row = [];
                    let objek_row = {};
                    objek_row.nourut_by_tabel = i;
                    let count=0
                    for(let j = 0 ; j < row.cells.length ; j++){
                        if(refrensiindek.includes(j)){
                            let nilai = 0;
                            let hasChild = row.cells[j].firstElementChild;
                            if(hasChild){
                                nilai = hasChild.value==""?0:parseFloat(hasChild.value);
                            }else{
                                nilai = row.cells[j].innerHTML==""?0:parseFloat(row.cells[j].innerHTML);
                            }
                            
                            arr_row.push(nilai);
                            count+=nilai;
                        }
                    };
                    loop_array.push(arr_row);

                    objek_row.nilai_total = count;
                    objek_row.mapel_total = refrensiindek.length;
                    objek_row.rerata = (count/refrensiindek.length).toFixed(2);
                    loop_object.push(objek_row);
                }
            }
        }
        this.resourceRerata = loop_array;
        this.resourceRangking = loop_object;
        return this;
    }
    calculateRangking(){
        this.sortRankingCopy = this.resourceRangking.slice();
        this.sortRankingCopy.sort((a,b)=>b.nilai_total - a.nilai_total);
        return this;
    }
    fillRerataInIndexColoumn(indexKolom){
        if(this.sumberGenerate){
            let tbody = this.sumberGenerate.querySelector('tbody');
            this.resourceRerata.forEach((array, index_array)=>{
                //let total;
                let total = array.reduce((a,b)=>a+b);
                let rerata = (total/array.length).toFixed(2);
                tbody.rows[index_array].cells[indexKolom].innerHTML = rerata;
            })
        }
    }
    fillRangkinInIndexColoumn(indexKolom){
        if(this.sumberGenerate){
            let tbody = this.sumberGenerate.querySelector('tbody');
            this.sortRankingCopy.forEach((obj, i_obj)=>{
                let rowAsal = obj.nourut_by_tabel;
                tbody.rows[rowAsal].cells[indexKolom].innerHTML = (i_obj+1);
            })
        }
    }
    init(){

    }


}