import ViewArsipNaskah from "./ViewArsipNaskah";

export default class ArsipNaskahController{
    #jenjang;
    #hapus
    constructor(arsipnaskah){
        /** ormArsipNaskah / orm tab Simpandesainsoal */
        this.arsipnaskah = arsipnaskah;
        this.#hapus = '';
        this.instansiasi = null;
    }
    selectJenjang(jenjang){
        this.#jenjang = jenjang;
        return this;

    }
    showHapus(bolean){
        if(bolean){
            this.#hapus = 'hapus';
        }else{
            this.#hapus = "";
        }
        return this;
    }
    renderTable(dom=document.getElementById('printarea')){
        const data = this.arsipnaskah.simpleFilter({'jenjang':this.#jenjang,'hapus':this.#hapus}).data; 
        let html = ViewArsipNaskah.tableArsipNaskah(data);

        
        dom.innerHTML = html;
        this.init();
        return this;
    }
    instansiasiClass(instansiasi){
        this.instansiasi =instansiasi;
        return this;
    }
    eventKlik(){
        const btns = document.querySelectorAll('[data-aksibytabelnaskah]');
        btns.forEach(btn=>{
            btn.onclick = ()=>{
                let namaMethod = btn.getAttribute('data-aksibytabelnaskah') ;
                let iddesainnaskah = btn.dataset['shownaskah'];
                let hasIdKbmElemen = btn.dataset['shownaskahkbm']??false;
                let objDesainNaskah = this.arsipnaskah.simpleFilter({'idbaris':iddesainnaskah}).data[0];
                let arrayKbm = objDesainNaskah.materi.simpleFilter({'idbaris':hasIdKbmElemen}).data;
                
                let test = { aksi                   : namaMethod,
                                idsimpandesainsoal  : btn.dataset['shownaskah']??false,
                                idkbm               : btn.dataset['shownaskahkbm']??false,
                                desainnaskahsoal    : objDesainNaskah,
                                arrayKbm            : arrayKbm
                            };
                this.callback(test);
            }
        })
    }
    init(){
        
        const {tooltip} = this.instansiasi;
        tooltip();
        this.eventKlik();
    }
    runtime(cb){
        this.callback = cb;
        return this;
    }
}