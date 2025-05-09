import { previewBentukSoal, previewKunciJawaban, previewSoalPilihanGanda, propertiItemSoal, replaceSoalToSel } from "../banksoal/viewBankSoal";

export default class EventReplaceSoal{
    constructor(dom,banksoal,pradesain,Modal,fnCallUpdate){
        this.domTarget = dom;
        this.banksoalservice = banksoal;
        this.pradesain = pradesain;
        this.Modal = Modal;
        this.fnCallUpdate = fnCallUpdate;
        this.documentContext = Modal.body;
        this.availabelSoal = [];
        this.resspon = null;
        this.req = {};
    }
    get dataAvalaibleSoal(){
        return this.availabelSoal;
    }
    set dataAvalaibleSoal(d){
        this.availabelSoal = d;
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
    //
    cekSoaldiSel(){
        let id;
        let soalapi = this.banksoalservice.banksoalservice.data.banksoal;
        let jenjang = this.banksoalservice.jenjang;
        let kodemapel = this.pradesain.mapel;
        let namakurikulum = this.pradesain.namakurikulum!=='kurmer'?'kurtilas':'kurmer';
        let dbsoalpradesain = [];
        if(namakurikulum == 'kurmer'){
            dbsoalpradesain=soalapi.filter(s=> s.jenjang == jenjang && s.kodemapel == kodemapel && s.bentuksoalspesifik == this.bentuksoalbysel)
        }else{
            if(kodemapel.indexOf('Tema ')>-1){
                let ar =[]
                if(jenjang>3){
                    ar = ['PKN','BINDO','IPA','IPS','SBDP'];
                }else{
                    ar = ['PKN','BINDO','MTK','SBDP','PJOK'];
                }
                dbsoalpradesain=soalapi.filter(s=> s.jenjang == jenjang &&  ar.includes(s.kodemapel) && s.bentuksoalspesifik == this.bentuksoalbysel)
            }else{

                dbsoalpradesain=soalapi.filter(s=> s.jenjang == jenjang && s.kodemapel == kodemapel && s.bentuksoalspesifik == this.bentuksoalbysel)
            }
            
        };
        
        let array = [];
        
        let execptIds = this.arrayIdBankSoalHasReplaced();
        if(this.hasContent){
            id = this.idHasContent;
            execptIds = execptIds.filter(s=> s!=id);
            array = dbsoalpradesain.filter(s=> !execptIds.includes(s.idbaris));
        }else{
            array = dbsoalpradesain.filter(s=> !execptIds.includes(s.idbaris));

        }
        return {array:array,id:id};
    };
    eventRadioKd(){
        let koleksisoal = this.cekSoaldiSel().array;
        let id = this.cekSoaldiSel().id;
        
        let radios = this.documentContext.querySelectorAll('input[name="selectedPropertiKD"]');
        
        // let cekdom = this.documentContext.querySelector(`input#selectedPropertiKD_${id}`);
        

        radios.forEach(n=>{
            n.onchange = (e)=>{
                if(n.checked){
                    if(this.pradesain.namakurikulum == 'kurmer'){
                        this.dataAvalaibleSoal = koleksisoal.filter(s=> s.kd == e.target.value);
                    }else{
                        let propkd = this.pradesain.propertikd.filter(s=> s.baris == e.target.value)
                        let kd = propkd[0].kd3;
                        let kodemapel = propkd[0].kodemapel;
                        this.dataAvalaibleSoal = koleksisoal.filter(s=> s.kd == kd && s.kodemapel==kodemapel);

                    }
                    this.eventPreviewSoal()
                }
            }
        });
        
        
        if(id){
            let currentSoal = koleksisoal.filter(s=>s.idbaris == id)[0];
            let currentKd = currentSoal.kd;
            let currentMapel = currentSoal.kodemapel;
            let kd = null;
            
            if(this.pradesain.namakurikulum == 'kurmer'){
                kd = currentKd;//this.pradesain.propertikd.filter(s=>s.kd == currentKd && s.kodemapel == currentMapel )[0].idbaris;
            }else{

                kd = this.pradesain.propertikd.filter(s=>s.kd3 == currentKd && s.mapel == currentMapel )[0].baris;
            }
            let domserarch = document.getElementById('selectedPropertiKD_'+kd);
            let arrayDom = Array.from(radios);
            let index = arrayDom.indexOf(domserarch);
            
            radios[index].checked = true;
            radios[index].dispatchEvent(new Event('change'));
        }else{
            radios[0].dispatchEvent(new Event('change'));

        }

    }
    init(){
        
        this.eventRadioKd();
        
    }
    eventPreviewSoal(){
        
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
        if(this.dataAvalaibleSoal.length == 0){
            bodyPreview.innerHTML = 'Tida ada data';
            bodyPreviewJawaban.innerHTML = 'Tida ada data';
            
            span.innerHTML = 0;
            document.getElementById('terapkan_replace').classList.add('d-none');
            document.getElementById('terapkan_replacewithout').classList.add('d-none');
            document.getElementById('editsoalini').classList.add('d-none');
        
            return;
        }
        span.innerHTML = `1 dari `+ this.dataAvalaibleSoal.length;
        awal.onclick = ()=>{
            tag = 0;
            bodyPreview.innerHTML = this.htmlPreviewSoal(this.dataAvalaibleSoal[tag]);
            bodyPreviewJawaban.innerHTML = this.htmlPreviewSoalJawaban(this.dataAvalaibleSoal[tag]);
            span.innerHTML = `${tag+1} dari ${this.dataAvalaibleSoal.length}`;
            this.btnEventReplace(this.dataAvalaibleSoal[tag]);
            // span.innerHTML = `${tag+1} dari ${this.dataAvalaibleSoal.length}`;
            document.getElementById('editsoalini').classList.remove('d-none');
            this.editCurrentSoal(this.dataAvalaibleSoal[tag]);
        };

        let id = this.cekSoaldiSel().id;
        
        if(id){
            tag = this.dataAvalaibleSoal.findIndex(s=>s.idbaris == id);
            
            bodyPreview.innerHTML = this.htmlPreviewSoal(this.dataAvalaibleSoal[tag]);
            bodyPreviewJawaban.innerHTML = this.htmlPreviewSoalJawaban(this.dataAvalaibleSoal[tag]);
            span.innerHTML = `${tag+1} dari ${this.dataAvalaibleSoal.length}`;
            this.btnEventReplace(this.dataAvalaibleSoal[tag]);
            document.getElementById('editsoalini').classList.remove('d-none');
            this.editCurrentSoal(this.dataAvalaibleSoal[tag]);
        }else{
            awal.dispatchEvent(new Event('click'));
        }

        next.onclick = ()=>{
            tag++;
            if(tag>this.dataAvalaibleSoal.length-1){
                tag = this.dataAvalaibleSoal.length-1;
            };
            
            bodyPreview.innerHTML = this.htmlPreviewSoal(this.dataAvalaibleSoal[tag]);
            bodyPreviewJawaban.innerHTML = this.htmlPreviewSoalJawaban(this.dataAvalaibleSoal[tag]);
            span.innerHTML = `${tag+1} dari ${this.dataAvalaibleSoal.length}`;
            document.getElementById('editsoalini').classList.remove('d-none');
            this.btnEventReplace(this.dataAvalaibleSoal[tag]);
            this.editCurrentSoal(this.dataAvalaibleSoal[tag]);
        }
        
        prev.onclick = ()=>{
            tag--;
            if(tag<0){
                tag = 0;
            };
        
            bodyPreview.innerHTML = this.htmlPreviewSoal(this.dataAvalaibleSoal[tag]);
            bodyPreviewJawaban.innerHTML = this.htmlPreviewSoalJawaban(this.dataAvalaibleSoal[tag]);
            span.innerHTML = `${tag+1} dari ${this.dataAvalaibleSoal.length}`;
            document.getElementById('editsoalini').classList.remove('d-none');
            this.btnEventReplace(this.dataAvalaibleSoal[tag]);
            this.editCurrentSoal(this.dataAvalaibleSoal[tag]);
        };
        
        akhir.onclick = ()=>{
            tag = this.dataAvalaibleSoal.length - 1;
            bodyPreview.innerHTML = this.htmlPreviewSoal(this.dataAvalaibleSoal[tag]);
            bodyPreviewJawaban.innerHTML = this.htmlPreviewSoalJawaban(this.dataAvalaibleSoal[tag]);
            span.innerHTML = `${tag+1} dari ${this.dataAvalaibleSoal.length}`;
            document.getElementById('editsoalini').classList.remove('d-none');
            this.btnEventReplace(this.dataAvalaibleSoal[tag]);
            this.editCurrentSoal(this.dataAvalaibleSoal[tag]);
        };
        
        cari.oninput = (e)=>{
            if(e.target.value !==''){
                let soalfilter = this.dataAvalaibleSoal.filter(m=>Object.entries(m).filter(([k,v])=>v.toString().toLowerCase().indexOf(cari.value.toLowerCase())>-1).length!==0)
                this.eventPreviewSoalCari(soalfilter)
            }else{
                this.eventPreviewSoal();
            }
        }
    }
    
    eventPreviewSoalCari(soalfilter){
        const span= document.querySelector('.mbs_infohalaman');
        const awal = document.querySelector('.mbs_awal');
        const akhir = document.querySelector('.mbs_akhir');
        const next = document.querySelector('.mbs_next');
        const prev = document.querySelector('.mbs_prev');
        const bodyPreview = document.getElementById('previewItemSoalPagination');
        const bodyPreviewJawaban = document.getElementById('propertiItemSoalPaginationJawaban');
        let tag = 0;
        if(soalfilter.length == 0){
            bodyPreview.innerHTML = 'Tida ada data';
            bodyPreviewJawaban.innerHTML = 'Tida ada data';
            
            span.innerHTML = 0;
            document.getElementById('terapkan_replace').classList.add('d-none');
            document.getElementById('terapkan_replacewithout').classList.add('d-none');
            document.getElementById('editsoalini').classList.add('d-none');
        
            return;
        }
        awal.onclick = ()=>{
            tag = 0;
            bodyPreview.innerHTML = this.htmlPreviewSoal(soalfilter[tag]);
            bodyPreviewJawaban.innerHTML = this.htmlPreviewSoalJawaban(soalfilter[tag]);
            span.innerHTML = `${tag+1} dari ${soalfilter.length}`;
            document.getElementById('editsoalini').classList.remove('d-none');
            this.btnEventReplace(soalfilter[tag]);
            this.editCurrentSoal(soalfilter[tag]);
        };

        awal.dispatchEvent(new Event('click'));

        next.onclick = ()=>{
            tag++;

            if(tag>soalfilter.length){
                tag = soalfilter.length-1;
            };

            bodyPreview.innerHTML = this.htmlPreviewSoal(soalfilter[tag]);
            bodyPreviewJawaban.innerHTML = this.htmlPreviewSoalJawaban(soalfilter[tag]);
            span.innerHTML = `${tag+1} dari ${soalfilter.length}`;
            document.getElementById('editsoalini').classList.remove('d-none');
            this.btnEventReplace(soalfilter[tag]);
            this.editCurrentSoal(soalfilter[tag]);
        }

        prev.onclick = ()=>{
            tag--;
            if(tag<0){
                tag = 0;
            };
            
            bodyPreview.innerHTML = this.htmlPreviewSoal(soalfilter[tag]);
            bodyPreviewJawaban.innerHTML = this.htmlPreviewSoalJawaban(soalfilter[tag]);
            span.innerHTML = `${tag+1} dari ${soalfilter.length}`;
            document.getElementById('editsoalini').classList.remove('d-none');
            this.btnEventReplace(soalfilter[tag]);
            this.editCurrentSoal(soalfilter[tag]);
        };
        
        akhir.onclick = ()=>{
            tag = soalfilter.length - 1;
            bodyPreview.innerHTML = this.htmlPreviewSoal(soalfilter[tag]);
            bodyPreviewJawaban.innerHTML = this.htmlPreviewSoalJawaban(soalfilter[tag]);
            span.innerHTML = `${tag+1} dari ${soalfilter.length}`;
            document.getElementById('editsoalini').classList.remove('d-none');
            this.btnEventReplace(soalfilter[tag]);
            this.editCurrentSoal(soalfilter[tag]);
        };
    }
    
    htmlPreviewSoal(soal){
        let html ="";
    
        if(soal){
            html+=previewBentukSoal(soal,false);
        };
    
        return html;
    }
    
    htmlPreviewSoalJawaban(soal){
        let html ="";
        if(soal){
            html+=previewKunciJawaban(soal);
        };
    
        return html;
    }
    
    btnEventReplace(selectedItemSoal){
        // if(!selectedItemSoal)return ;
        const btnReplace = document.getElementById('terapkan_replace');
        const btnWithout = document.getElementById('terapkan_replacewithout');
        
        const tampilanopsi = this.documentContext.querySelectorAll('input[name="btnradiotampilanopsi"]');
        let tampilanpg = 'vertical';
        
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
                
                tampilanpg = e.target.getAttribute('id');
                
                bodyPreview.innerHTML = previewSoalPilihanGanda(selectedItemSoal,false,tampilanpg);
            }
        });
    
        let datareplace = {
            setilustrasi:false,
            tampilanpg:tampilanpg
        }
    
        btnReplace.onclick = ()=>{
            datareplace.setilustrasi = true;
            datareplace.tampilanpg  = tampilanpg;
            datareplace.nosoal = this.cekNoUrutNaskah;
            
            this.domTarget.innerHTML = replaceSoalToSel(selectedItemSoal,datareplace);
            this.domTarget.setAttribute('data-simpanannaskahguru',selectedItemSoal.idbaris);
            this.domTarget.setAttribute('data-ilustrasi',true);
    
            if(selectedItemSoal.bentuksoalspesifik == 'Pilihan Ganda'){
                this.domTarget.setAttribute('class','calcnosoal');
                this.domTarget.setAttribute('data-tampilanpg',tampilanpg);
            }else if(selectedItemSoal.bentuksoalspesifik == 'Isian'){
                this.domTarget.setAttribute('class','soalessay');
                this.domTarget.setAttribute('id','essay'+this.cekNoUrutNaskah);
            }else if(selectedItemSoal.bentuksoalspesifik == 'Essay'){
                this.domTarget.setAttribute('class','soalessay');
                this.domTarget.setAttribute('id','essay'+this.cekNoUrutNaskah);
            }else if(selectedItemSoal.bentuksoalspesifik == 'Menjodohkan'){
                this.domTarget.setAttribute('data-banyakjodoh',selectedItemSoal.jumlahsoalmenjodohkan);

            }

            if(this.pradesain.petunjuknilai){
                this.fnCallUpdate(this)
            }

            this.Modal.hide();
        }
        btnWithout.onclick = ()=>{
            this.domTarget.innerHTML = replaceSoalToSel(selectedItemSoal,datareplace);
            
            datareplace.setilustrasi = false;
            datareplace.tampilanpg   = tampilanpg;
            datareplace.nosoal = this.cekNoUrutNaskah;

            this.domTarget.innerHTML = replaceSoalToSel(selectedItemSoal,datareplace);
            this.domTarget.setAttribute('data-simpanannaskahguru',selectedItemSoal.idbaris);
            this.domTarget.setAttribute('data-ilustrasi',false);
    
            if(selectedItemSoal.bentuksoalspesifik == 'Pilihan Ganda'){
                this.domTarget.setAttribute('class','calcnosoal');
                this.domTarget.setAttribute('data-tampilanpg',tampilanpg);
            }else if(selectedItemSoal.bentuksoalspesifik == 'Isian'){
                this.domTarget.setAttribute('class','soalessay');
                this.domTarget.setAttribute('id','essay'+this.cekNoUrutNaskah);
            }else if(selectedItemSoal.bentuksoalspesifik == 'Essay'){
                this.domTarget.setAttribute('class','soalessay');
                this.domTarget.setAttribute('id','essay'+this.cekNoUrutNaskah);
            }else if(selectedItemSoal.bentuksoalspesifik == 'Menjodohkan'){
                this.domTarget.setAttribute('data-banyakjodoh',selectedItemSoal.jumlahsoalmenjodohkan);

            }
            if(this.pradesain.petunjuknilai){
                this.fnCallUpdate(this)
            }

            this.Modal.hide();
        }
    }
    instansiasiEditor(ob){
        this.editorlain = obj;
    }
    editCurrentSoal(soal){
        //pindahkan tab;
        let inputan = this.documentContext.querySelectorAll('[data-keyformulir]');
        let inputandata = this.documentContext.querySelector('#previewdata');
        let inputanpreview = this.documentContext.querySelector('#previewsoaledit');
        
        inputandata.innerHTML = "";
        inputanpreview.innerHTML = "";
        inputan.forEach(n=>{
                if(n.nodeName == 'td'|| n.nodeName =='TD' ){
                    n.innerHTML = ''
                }else{
                    n.value = ''
                }
        });
        
        this.documentContext.querySelector('#terapkan_replaceedit').classList.add('d-none');
        this.documentContext.querySelector('#editsoalini').onclick = ()=>{
            //klik untuk membuka tab
            this.documentContext.querySelector('#tabmodal_menu4').click();
            // tampilkan tombol simpan
            this.documentContext.querySelector('#terapkan_replaceedit').classList.remove('d-none');
            
            let inputan = this.documentContext.querySelectorAll('[data-keyformulir]');
            
            inputan.forEach(n=>{
                let atr = n.getAttribute('data-keyformulir');
                if(n.nodeName == 'td'|| n.nodeName =='TD' ){
                    n.innerHTML = soal[atr];
                }else{
                    n.value = soal[atr];
                }
                
            });
            inputandata.innerHTML = propertiItemSoal(soal);
            inputanpreview.innerHTML = previewBentukSoal(soal,false);
        }
    }

}