import { previewBentukSoal, previewKunciJawaban, previewSoalPilihanGanda } from "../banksoal/viewBankSoal";

export default class PaginationAvailableSoal{
    constructor(currentItemSoal, ormbanksoal){
        this.data = currentItemSoal;
        this.ormbanksoal = ormbanksoal;
        

    }
    runtime(fn){
        this.callback = fn;
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
        
        if(document.querySelector('input[name="btnradiotampilanopsi"]:checked')){
            document.querySelector('input[name="btnradiotampilanopsi"]:checked').dispatchEvent(new Event('change'))
        }else{
            this.callback(selectedItemSoal);
        };

        return this;
    }
    
    listenerSelecting(){
        const data = this.data;
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
                bodyPreviewJawaban.innerHTML = previewKunciJawaban(data.banksoal[tag]);
        
                editsoalini.classList.remove('d-none');
        
                this.btnEventReplace(data.banksoal[tag]);
            }

        }else{
            span.innerHTML = `${tag+1} dari ${data.banksoal.length}`;
            bodyPreview.innerHTML = previewBentukSoal(data.banksoal[tag]);
            bodyPreviewJawaban.innerHTML = previewKunciJawaban(data.banksoal[tag]);
    
            editsoalini.classList.remove('d-none');
    
            this.btnEventReplace(data.banksoal[tag]);
        }
       

        awal.onclick = ()=>{
            tag = 0;
            span.innerHTML = `${tag+1} dari ${data.banksoal.length}`;
            bodyPreview.innerHTML = previewBentukSoal(data.banksoal[tag]);
            bodyPreviewJawaban.innerHTML = previewKunciJawaban(data.banksoal[tag]);
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
            bodyPreviewJawaban.innerHTML = previewKunciJawaban(data.banksoal[tag]);
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
            bodyPreviewJawaban.innerHTML = previewKunciJawaban(data.banksoal[tag]);
            editsoalini.classList.remove('d-none');
            this.btnEventReplace(data.banksoal[tag]);
        }
        akhir.onclick = ()=>{
            tag = data.banksoal.length -1;
            span.innerHTML = `${tag+1} dari ${data.banksoal.length}`;
            bodyPreview.innerHTML = previewBentukSoal(data.banksoal[tag]);
            bodyPreviewJawaban.innerHTML = previewKunciJawaban(data.banksoal[tag]);
            editsoalini.classList.remove('d-none');
            this.btnEventReplace(data.banksoal[tag]);
        }

        // return this;
    }
}