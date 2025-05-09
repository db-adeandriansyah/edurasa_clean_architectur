export default class RiwayatRepo{
    //atribute
    #ss_nilai;
    #crud

    constructor(
        makro,
        jenjang
    ){
        this.makro = makro;
        this.jenjang = jenjang;
    }

    init(){
        const idcrud = this.makro['exec_crud'];
        this.#crud = `https://script.google.com/macros/s/${idcrud}/exec`; 
        this.#ss_nilai = this.makro['ss_nilai_'+this.jenjang];
        return this;
    }
    paramFormData(param){
        let fd = new FormData();
            Object.entries(param).forEach(([k,v])=>{
                fd.append(k,v);
            });
        return fd;
    }
    async post(param){
        // if(!this.csrf()) return;
        try{
            const parameter = this.paramFormData(param);
            const f = await fetch(this.#crud,{body:parameter,method:'post'});
            
            const t = await f.json();
            return t;
        }catch(er){
            if(document.getElementById('printarea')){
                document.getElementById('printarea').innerHTML = "ERROR, PERIKSA KONEKSI INTERNETNYA! <br>Massage Server: <br>"+er;
            }else{
                document.getElementById('infosiswa').innerHTML = "ERROR, PERIKSA KONEKSI INTERNETNYA! <br>Massage Server: <br>"+er;

            }
            return er;
        }
        
    }
    async readData(idss, namatab,filter={}){
        let p = {
            'idss':idss,
            'tab':namatab,
            'action':'read'
        }
        if(Object.keys(filter).lenth) p.assign({},filter);
        return await this.post(p);
    }
    async dataRapor(rombel){
        let prefik = this.makro['prefix_nilai'];
        let namaTab = prefik+rombel;
        
        let p = {
            'idss':this.#ss_nilai,
            'tab':namaTab,
            'action':'read'
        }
        return await this.post(p)
    }



}