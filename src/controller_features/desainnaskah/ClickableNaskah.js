import { TableProperties } from "../../utilities/tableProperties";

export default class ClickableNaskah{
    constructor(){
        this.domTarget = null;
    }

    get sel(){
        return this.domTarget;
    }
    set sel(x){
        this.domTarget = x;
    }
    get bentuksoalbysel(){
        return this.domTarget.getAttribute('data-bentuksoal');
    }
    get hasContent(){
        return this.domTarget.hasAttribute('data-simpanannaskahguru');
    }
    get idHasContent(){
        return parseInt(this.domTarget.getAttribute('data-simpanannaskahguru'));
    }
    get cekNoUrutByGrup(){
        return this.domTarget.getAttribute('data-nobybentuk');
    }
    get cekNoUrutNaskah(){
        return this.domTarget.getAttribute('data-nosoal');
    }
    arrayIdBankSoalHasReplaced(){
        let allElement = document.querySelectorAll('[data-simpanannaskahguru]');
        let arr = [];
        allElement.forEach(id=>{
            let ids = id.getAttribute('data-simpanannaskahguru');
            // arr.push(ids.toString());
            arr.push(parseInt(ids));
        });
        return arr;
    }
    init(){
        const tabel = document.getElementById('tabelkontendesainnaskah_dariserver');
        
        if(tabel){
            tabel.onclick = (e)=>{
                let dataklik = TableProperties.propertiesByClick(e.target);
                
                this.sel = dataklik.cells;

                let data = {
                    bentuksoal      : this.bentuksoalbysel,
                    idsoal          : this.hasContent?this.idHasContent:false,
                    allIdSoal       : this.arrayIdBankSoalHasReplaced(),
                    nourut_grup     : this.cekNoUrutByGrup,
                    nourut_naskah   : this.cekNoUrutNaskah,
                    current_sel     : this.domTarget
                }
                this.callback(data);
            }
        }
        return this;
    }
    /**
     * 
     * @param {*} {function} callback
     * @return {
     * bentuksoal      : this.bentuksoalbysel,
     * idsoal          : this.hasContent?this.idHasContent:false,
     * allIdSoal       : this.arrayIdBankSoalHasReplaced(),
     * nourut_grup     : this.cekNoUrutByGrup,
     * nourut_naskah   : this.cekNoUrutNaskah,
     * current_sel     : this.domTarget
     * }
     */
    runtime(fn){
        this.callback = fn;
    }
}