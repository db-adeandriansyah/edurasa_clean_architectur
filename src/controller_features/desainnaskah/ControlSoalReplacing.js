/**
 * Class yang bertugas menghandle event radio pada modal setelah user mengeklik sel area desain naskah
*/
export default class ControlSoalReplacing{
    constructor(dataklik, ormbanksoal){
        this.dataklik = dataklik;
        this.ormbanksoal = ormbanksoal;
        this.listenerSelecting = null;
        this.result = {};
        this.praeditor = {};
        this.callbackeditor = null;
    }
    handle(){
        let radios = document.querySelectorAll('[data-desainmodal]');
        radios.forEach(radio=>{
            radio.onchange = (e)=>{
                if(radio.checked){
                    let key = radio.getAttribute('data-desainmodal');
                    let arrayIdHasReplaced = this.dataklik.allIdSoal;
                    if(this.dataklik.idsoal){
                        arrayIdHasReplaced = this.dataklik.allIdSoal.filter(s=>s!=this.dataklik.idsoal)
                    }
                    
                    this.avalaibledbsoal = this.ormbanksoal.simpleFilter({'kd':e.target.value,'bentuksoalspesifik':this.dataklik.bentuksoal,'hapus':''})
                                            .customFilter((item)=>!arrayIdHasReplaced.map(n=>parseInt(n)).includes(parseInt(item.idbaris)));
                    this.result.idsoal = this.dataklik.idsoal;  
                    this.result.banksoal = this.avalaibledbsoal.data;
                    
                    this.result.indexIdsoal = this.avalaibledbsoal.data.findIndex(id=>id.idbaris== this.dataklik.idsoal);
                    this.result[key]=e.target.value;
                    if(key == 'kd'){
                        // this.result.kd = e.target.value;
                        let twins = document.querySelector('#selectedPropertiKDbaru_'+e.target.value);
                        let twins1 = document.querySelector('#selectedPropertiKD_'+e.target.value);
                        if(!twins.checked){
                            twins.checked = true;
                        }
                        if(!twins1.checked){
                            twins1.checked = true;
                        }
                        console.log(e.target.value,document.querySelector('#selectedPropertiKDbaru_'+e.target.value))
                    }else{
                        // this.result.mode = e.target.value;
                    }
                    
                    this.listenerSelecting(this.result);
                    
                }
            }
        })
        return this;
    }
    runtime(callback){
        this.listenerSelecting = callback;
        return this;
    }
   
    /**
     * @info: meregistrasikan event pertama kali
     */
    execute(){
        let radios = document.querySelectorAll('[data-desainmodal]');
        let radio = null;
        
        // this.Modal = modal;

        if(this.dataklik.idsoal){
            let findkd = this.ormbanksoal.simpleFilter({'idbaris':this.dataklik.idsoal}).data;
            let kd = findkd[0].kd;
            radio = document.querySelector('#selectedPropertiKD_'+kd);
            radio.checked = true;
        }else{
            radio = radios[0];
            radio.checked = true;

        }
        radios.forEach(n=>{
            if(n.checked){
                let key = n.getAttribute('data-desainmodal');
                this.result[key] = n.value;
            }
        })
        radio.dispatchEvent(new Event('change'));
    }
}