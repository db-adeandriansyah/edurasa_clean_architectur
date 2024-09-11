import { previewBentukSoal, previewBentukSoalJawaban, previewSoalPilihanGanda, replaceSoalToSel } from "../banksoal/viewBankSoal";


export default class SelectorBankSoal{
    constructor(dataklik,ormBanksoal){
        this.dataklik = dataklik;
        this.ormbanksoal = ormBanksoal;
        this.avalaibledbsoal = [];
        this.result = {datasoal:[],idsoal:false,indexIdsoal:-1}
        this.callback = null;
        this.Modal = null;
    }
    listenerKD(){
        let radios = document.querySelectorAll('input[name="selectedPropertiKD"]');
        radios.forEach(radio=>{
            radio.onchange = (e)=>{
                if(radio.checked){
                    let arrayIdHasReplaced = this.dataklik.allIdSoal;
                    if(this.dataklik.idsoal){
                        arrayIdHasReplaced = this.dataklik.allIdSoal.filter(s=>s!=this.dataklik.idsoal)
                    }
                    
                    this.avalaibledbsoal = this.ormbanksoal.simpleFilter({'kd':e.target.value,'bentuksoalspesifik':this.dataklik.bentuksoal,'hapus':''})
                                            .customFilter((item)=>!arrayIdHasReplaced.map(n=>parseInt(n)).includes(parseInt(item.idbaris)));
                    this.result.idsoal = this.dataklik.idsoal;  
                    this.result.banksoal = this.avalaibledbsoal.data;
                    
                    this.result.indexIdsoal = this.avalaibledbsoal.data.findIndex(id=>id.idbaris== this.dataklik.idsoal);
                    this.result.kd = e.target.value;
                    
                    document.querySelector('#selectedPropertiKDbaru_'+e.target.value).checked = true;
                    document.querySelector('#selectedPropertiKDbaru_'+e.target.value).dispatchEvent(new Event('change'));
                    this.listenerSelecting(this.result);
                    
                }
            }
        })
        return this;
    }
    editor(editor){
        this.execEditor = editor;
        return this;

    }
    btnEventReplace(selectedItemSoal){
        const btnReplace = document.getElementById('terapkan_replace');
        const btnWithout = document.getElementById('terapkan_replacewithout');
        const tampilanopsi = document.querySelectorAll('input[name="btnradiotampilanopsi"]');
        
        selectedItemSoal.tampilanpg = 'vertical';
        
        if(selectedItemSoal  && selectedItemSoal.ilustrasi == ''){
            if(!btnWithout.classList.contains('d-none')){
                btnWithout.classList.add('d-none');
            }
        }else{
            btnWithout.classList.remove('d-none');
        }
        
        btnReplace.classList.remove('d-none');
        
        tampilanopsi.forEach(n=>{
            n.onchange = (e)=>{
                const bodyPreview = document.getElementById('previewItemSoalPagination');
                
                selectedItemSoal.tampilanpg = e.target.getAttribute('id');
                bodyPreview.innerHTML = previewSoalPilihanGanda(selectedItemSoal,false,selectedItemSoal.tampilanpg);
                this.callback(selectedItemSoal);
            }
        });
        this.callback(selectedItemSoal);
        if(document.querySelector('input[name="btnradiotampilanopsi"]:checked')){
            document.querySelector('input[name="btnradiotampilanopsi"]:checked').dispatchEvent(new Event('change'))
        };
    }
    
    listenerSelecting(data){
        const span= document.querySelector('.mbs_infohalaman');
        const awal = document.querySelector('.mbs_awal');
        const akhir = document.querySelector('.mbs_akhir');
        const next = document.querySelector('.mbs_next');
        const prev = document.querySelector('.mbs_prev');
        const cari = document.querySelector('.mbs_valuecari');
        const editsoalini = document.querySelector('#editsoalini');
        const bodyPreview = document.getElementById('previewItemSoalPagination');
        const bodyPreviewJawaban = document.getElementById('propertiItemSoalPaginationJawaban');
        let tag = 0;

        if(data.indexIdsoal>-1){
            tag = data.indexIdsoal;
        }
        
        if(data.banksoal.length==0){
            span.innerHTML = '0';
            bodyPreview.innerHTML = 'Tidak ada bank soal';
            bodyPreviewJawaban.innerHTML = '';
            document.getElementById('terapkan_replace').classList.add('d-none');
            document.getElementById('terapkan_replacewithout').classList.add('d-none');
            editsoalini.classList.add('d-none');
            awal.onclick = null;
            next.onclick = null;
            prev.onclick = null;
            akhir.onclick = null;
            return;
        }
        
        //jika soal dihapus ditengah jalan!
        if(Boolean(data.idsoal)){
            let ceksoal = this.ormbanksoal.simpleFilter({'idbaris':data.idsoal,'kd':data.kd}).data;
            if(ceksoal.length && ceksoal[ceksoal.length-1].hapus == 'hapus'){
                span.innerHTML = `???? dari ${data.banksoal.length}`
                bodyPreview.innerHTML = 'Soal ini dihapus/terhapus! Silakan pilih soal lain yang tersedia.';
                bodyPreviewJawaban.innerHTML = '';
                document.getElementById('terapkan_replace').classList.add('d-none');
                document.getElementById('terapkan_replacewithout').classList.add('d-none');
                editsoalini.classList.add('d-none');
                
            }else{
                span.innerHTML = `${tag+1} dari ${data.banksoal.length}`;
                bodyPreview.innerHTML = previewBentukSoal(data.banksoal[tag]);
                bodyPreviewJawaban.innerHTML = previewBentukSoalJawaban(data.banksoal[tag]);
        
                editsoalini.classList.remove('d-none');
        
                this.btnEventReplace(data.banksoal[tag]);
            }

        }else{
            span.innerHTML = `${tag+1} dari ${data.banksoal.length}`;
            bodyPreview.innerHTML = previewBentukSoal(data.banksoal[tag]);
            bodyPreviewJawaban.innerHTML = previewBentukSoalJawaban(data.banksoal[tag]);
    
            editsoalini.classList.remove('d-none');
    
            this.btnEventReplace(data.banksoal[tag]);
        }
       

        awal.onclick = ()=>{
            tag = 0;
            span.innerHTML = `${tag+1} dari ${data.banksoal.length}`;
            bodyPreview.innerHTML = previewBentukSoal(data.banksoal[tag]);
            bodyPreviewJawaban.innerHTML = previewBentukSoalJawaban(data.banksoal[tag]);
            editsoalini.classList.remove('d-none');
            this.btnEventReplace(data.banksoal[tag]);
        };

        next.onclick = ()=>{
            tag++;
            if(tag>data.banksoal.length-1){
                tag = data.banksoal.length-1;
            }
            span.innerHTML = `${tag+1} dari ${data.banksoal.length}`;
            bodyPreview.innerHTML = previewBentukSoal(data.banksoal[tag]);
            bodyPreviewJawaban.innerHTML = previewBentukSoalJawaban(data.banksoal[tag]);
            editsoalini.classList.remove('d-none');
            this.btnEventReplace(data.banksoal[tag]);
        };
        prev.onclick = ()=>{
            tag--;
            if(tag<0){
                tag = 0
            }
            span.innerHTML = `${tag+1} dari ${data.banksoal.length}`;
            bodyPreview.innerHTML = previewBentukSoal(data.banksoal[tag]);
            bodyPreviewJawaban.innerHTML = previewBentukSoalJawaban(data.banksoal[tag]);
            editsoalini.classList.remove('d-none');
            this.btnEventReplace(data.banksoal[tag]);
        }
        akhir.onclick = ()=>{
            tag = data.banksoal.length -1;
            span.innerHTML = `${tag+1} dari ${data.banksoal.length}`;
            bodyPreview.innerHTML = previewBentukSoal(data.banksoal[tag]);
            bodyPreviewJawaban.innerHTML = previewBentukSoalJawaban(data.banksoal[tag]);
            editsoalini.classList.remove('d-none');
            this.btnEventReplace(data.banksoal[tag]);
        }

    }
    
    runtime(fn){
        this.callback = fn;
        return this;
    }
    execute(){
        let radios = document.querySelectorAll('input[name="selectedPropertiKD"]');
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
        radio.dispatchEvent(new Event('change'));
        this.execEditor.executeModal.bind(this)
    }
    
}