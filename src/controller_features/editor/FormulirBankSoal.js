import UrlImg from "../../controllers/UrlImg";
import { propertiItemSoal } from "../banksoal/viewBankSoal";
import viewFormulirBankSoal from "./viewFormulirBankSoal";
import { previewBentukSoal } from "./viewTextEditorEdurasa";

export class FormulirBankSoal{
    constructor(pradesain,service){
        this.datadesain = pradesain;
        this.service = service;
        this.div = document.getElementById('divTextEditor');
        this.imageLoading='/lamaso.webp'
        this.contextMenu = null;
        this.wraperTabel = null;

        this.btnSave = null;
        this.btnReset = null;
        this.resspon =null;
        this.request = {};
    }
    lingkupmateri(){
        return this.service.data.lingkupmateri;
    }
    createForm(){
        
        this.div.classList.add('position-relative');
        this.div.appendChild(viewFormulirBankSoal.html_table_formulir(this.datadesain, this.lingkupmateri()));
        this.div.appendChild(viewFormulirBankSoal.html_contextmenu_table_formulir());
        this.contextMenu = document.getElementById('contextMenuDivEditorEditing');
        this.wraperTabel = document.getElementById('wrapertabel');
        // this.init();
    }
    createFormEdit(){
        this.div.innerHTML = "";
        this.div.classList.add('position-relative');
        this.div.appendChild(viewFormulirBankSoal.html_table_formulirEdit(this.datadesain, this.lingkupmateri()));
        this.div.appendChild(viewFormulirBankSoal.html_contextmenu_table_formulir());
        this.contextMenu = document.getElementById('contextMenuDivEditorEditing');
        this.wraperTabel = document.getElementById('wrapertabel');
        // this.init();
    }
    fillItem(soal){
        let inputan = document.querySelectorAll('[data-keyformuliredit]');
        let inputandata = document.querySelector('#previewdata');
        let inputanpreview = document.querySelector('#previewsoaledit');
        
        inputan.forEach(n=>{
                let atr = n.getAttribute('data-keyformuliredit');
                if(n.nodeName == 'td'|| n.nodeName =='TD' ){
                    n.innerHTML = soal[atr];
                }else{
                    n.value = soal[atr];
                }
            });
            
            inputandata.innerHTML = propertiItemSoal(soal);
            inputanpreview.innerHTML = previewBentukSoal(soal,false);
    }

    initEdit(){
        let k = document.querySelectorAll('[data-keyformuliredit]');
        let tekskd = '';
        let orm = [];
        if(this.datadesain.namakurikulum == 'kurmer'){
            orm = this.datadesain.ormkurikulum.filter(s=> s.idbaris == this.datadesain.kd)[0];
            console.log('ormInitEdit datadesain',this.datadesain)
            console.log('ormInitEdit', orm)
            tekskd = orm.atp;
            
            this.request.elemen = orm.elemen;
            this.request.tp = orm.tp;
            this.request.atp = orm.atp;
        }else{
            if(this.datadesain.mode == 'modal'){
                orm = this.datadesain.ormkurikulum.filter(s=> s.baris == this.datadesain.kd)[0];
            }else{
                orm = this.datadesain.ormkurikulum.filter(s=> (s.kd3 == this.datadesain.kd || s.kd4 ==this.datadesain.kd) && s.mapel == this.datadesain.kodemapel)[0];
            }

            tekskd = orm.kd3+' '+orm.indikatorkd3;
        }
        this.request.bentuksoalspesifik=this.datadesain.bentuksoal;
        this.request.tekskd = tekskd ;
        this.request.kurikulum = this.datadesain.namakurikulum ;
        this.request.kodemapel = this.datadesain.kodemapel;
        this.request.tekskodemapel = this.datadesain.tekskodemapel;
        this.request.jenjang = this.datadesain.jenjang;
        this.request.oleh = this.datadesain.oleh;
        this.request.idguru = this.datadesain.idguru;
        this.request.kd= this.datadesain.kd;
        if(this.datadesain.bentuksoal=='Pilihan Ganda'){
            this.request.tampilanpg = 'BIASA';
        }

        this.request.bentuksoal = this.datadesain.bentuksoal =='Essay'?'Isian':this.datadesain.bentuksoal;
        
        k.forEach(n=>{
            n.oninput = (e)=>{
                let key = n.getAttribute('data-keyformuliredit');
                this.replacingDataSrcToUrl(e);
                if(e.target.nodeName == 'TD'){
                    this.request = Object.assign(this.request,{[key]:e.target.innerHTML})
                }else{
                    this.request = Object.assign(this.request,{[key]:e.target.value})

                } 
                this.resspon(this.request);
                this.contextMenu.style.display="none";
            }
            
            n.oncontextmenu = (e)=>{
                e.preventDefault();
                
                const selection = window.getSelection() ;//? window.getSelection() : document.selection;;
                if (selection && selection.rangeCount) {
                    
                    let selectAsal = selection;
                    let asal = selection.getRangeAt(0);
                    let cekselect = selection.getRangeAt(0).cloneContents().childNodes;
                    selectAsal.deleteFromDocument();
                    
                    if(cekselect.length != 1 || cekselect.length == 0) {
                        alert('Silakan seleksi bagian teks saja, bukan kosong/lebih dari satu baris.') 
                        
                        return
                    };
                    this.showonContextMenu(e);
                    let teks = cekselect;//[0].data;
                    
                    let btnscontext = document.querySelectorAll('[data-divEditor]');
                    btnscontext.forEach(el=>{
                        el.onclick = ()=>{
                            let d = el.getAttribute('data-divEditor');
                            if(this[d]){
                                this[d](teks,asal);
                            }else{
                                asal.insertNode(document.createTextNode(teks[0].data));
                            }
                            this.contextMenu.style.display="none";
                        }
                    })
                }
            }

            
        })
        
    }
    init(){
        let k = document.querySelectorAll('[data-keyformulir]');
        let tekskd = '';
        let orm = [];
        if(this.datadesain.namakurikulum == 'kurmer'){
            orm = this.datadesain.ormkurikulum.filter(s=> s.idbaris == this.datadesain.kd)[0];
            tekskd = orm.atp;
            
            this.request.elemen = orm.elemen;
            this.request.tp = orm.tp;
            this.request.atp = orm.atp;
        }else{
            if(this.datadesain.mode == 'modal'){
                orm = this.datadesain.ormkurikulum.filter(s=> s.baris == this.datadesain.kd)[0];
            }else{
                orm = this.datadesain.ormkurikulum.filter(s=> (s.kd3 == this.datadesain.kd || s.kd4 ==this.datadesain.kd) && s.mapel == this.datadesain.kodemapel)[0];
            }

            tekskd = orm.kd3+' '+orm.indikatorkd3;
        }
        this.request.bentuksoalspesifik=this.datadesain.bentuksoal;
        this.request.tekskd = tekskd ;
        this.request.kurikulum = this.datadesain.namakurikulum ;
        this.request.kodemapel = this.datadesain.kodemapel;
        this.request.tekskodemapel = this.datadesain.tekskodemapel;
        this.request.jenjang = this.datadesain.jenjang;
        this.request.oleh = this.datadesain.oleh;
        this.request.idguru = this.datadesain.idguru;
        this.request.kd= this.datadesain.kd;
        if(this.datadesain.bentuksoal=='Pilihan Ganda'){
            this.request.tampilanpg = 'BIASA';
        }

        this.request.bentuksoal = this.datadesain.bentuksoal =='Essay'?'Isian':this.datadesain.bentuksoal;
        
        k.forEach(n=>{
            n.oninput = (e)=>{
                let key = n.getAttribute('data-keyformulir');
                this.replacingDataSrcToUrl(e);
                if(e.target.nodeName == 'TD'){
                    this.request = Object.assign(this.request,{[key]:e.target.innerHTML})
                }else{
                    this.request = Object.assign(this.request,{[key]:e.target.value})

                } 
                this.resspon(this.request);
                this.contextMenu.style.display="none";
            }
            
            n.oncontextmenu = (e)=>{
                e.preventDefault();
                
                const selection = window.getSelection() ;//? window.getSelection() : document.selection;;
                if (selection && selection.rangeCount) {
                    
                    let selectAsal = selection;
                    let asal = selection.getRangeAt(0);
                    let cekselect = selection.getRangeAt(0).cloneContents().childNodes;
                    selectAsal.deleteFromDocument();
                    
                    if(cekselect.length != 1 || cekselect.length == 0) {
                        alert('Silakan seleksi bagian teks saja, bukan kosong/lebih dari satu baris.') 
                        
                        return
                    };
                    this.showonContextMenu(e);
                    let teks = cekselect;//[0].data;
                    
                    let btnscontext = document.querySelectorAll('[data-divEditor]');
                    btnscontext.forEach(el=>{
                        el.onclick = ()=>{
                            let d = el.getAttribute('data-divEditor');
                            if(this[d]){
                                this[d](teks,asal);
                            }else{
                                asal.insertNode(document.createTextNode(teks[0].data));
                            }
                            this.contextMenu.style.display="none";
                        }
                    })
                }
            }

            
        })
        
    }
    regButtonSave(querySelector){
        let btn = document.querySelector(querySelector);
        this.btnSave = btn;
    }
    retButtonReset(querySelector){
        let btn = document.querySelector(querySelector);
        this.btnReset = btn;
    }
    addRespons(callback){
        this.resspon = callback;
    }
    showonContextMenu(e){
        // let divStatical = this.staticDiv.getBoundingClientRect();
        // let divWraper = this.divElemen.getBoundingClientRect();
        let divStatical = this.div.getBoundingClientRect();
        let divWraper = this.wraperTabel.getBoundingClientRect();
        // posisi contextmenu;
        let coord={
            'clientX':e.clientX,
            'left':e.offsetLeft,
            'clientY':e.clientY,
            'offsetX':e.offsetX, 
            'offsetY':e.offsetY,
        }
        this.contextMenu.style.display="block";
        this.contextMenu.style.left = (coord.clientX-divWraper.left+this.contextMenu.offsetWidth)+10+'px';
        this.contextMenu.style.top = (coord.clientY - divStatical.top) -(this.contextMenu.offsetWidth/2)+'px';
        
    }
    pecahan(cekteks,asal){
        
        let teks = cekteks[0].data

        let arr = teks.split('/');
        if(arr.length == 2){
            let img = new Image();
            let sr = `https://chart.apis.google.com/chart?cht=tx&chl=%7B%5Cfrac%20%7B${encodeURIComponent(arr[0])}%7D%20%7B${encodeURIComponent(arr[1])}%7D%7D`;
            
            img.src =  new UrlImg(sr).convertUrlToLatexLatest()
            img.style.verticalAlign='middle';
            img.alt = `pecahan ${arr[0]}/${arr[1]}`;
            asal.insertNode(img);
            
        }else{
            asal.insertNode(document.createTextNode(teks));
        }
        
    }
    
    akarkubik(cekselect, asal){
        let teks = "";
        cekselect.forEach(el => {
            
            if(el.nodeName=='SUP'){
                let d = el.innerHTML;
                teks += `^{${d}}`;
            }else if(el.nodeName == '#text'){
                let d = el.data;
                d = d.replace(/²/g,'^{2}');
                d = d.replace(/³/g,'^{3}');
                // d = d.replace(/\s+/g,'\:');
                teks +=d;
            }
        })
        let img = new Image();
        let sr = `https://chart.apis.google.com/chart?cht=tx&chl=%7B%5Csqrt%5B3%5D%20%7B${encodeURIComponent(teks)}%7D`;
            img.src =  new UrlImg(sr).convertUrlToLatexLatest();
            img.style.verticalAlign='middle';
            img.alt = `akar kubik ${teks}`;
        // selection.deleteFromDocument();
        asal.insertNode(img);
        // selection.collapseToEnd();
    
}
    akarkuadrat(cekselect, asal){

            // let teks = cekselect[0].data;
            let teks = "";
            cekselect.forEach(el => {
                
                if(el.nodeName=='SUP'){
                    let d = el.innerHTML;
                    teks += `^{${d}}`;
                }else if(el.nodeName == '#text'){
                    let d = el.data;
                    d = d.replace(/²/g,'^{2}');
                    d = d.replace(/³/g,'^{3}');
                    // d = d.replace(/\s+/g,'\:');
                    teks +=d;
                }
            })
            let img = new Image();
            let sr = `https://chart.apis.google.com/chart?cht=tx&chl=%7B%5Csqrt%20%7B${encodeURIComponent(teks)}%7D`;
            img.src =  new UrlImg(sr).convertUrlToLatexLatest()
                img.style.verticalAlign='middle';
                img.alt = `akar kuadrat ${teks}`;
            // selection.deleteFromDocument();
            asal.insertNode(img);
            // selection.collapseToEnd();
        
    }
    cekLK(cekselect,asal){
        let teks = cekselect[0].data;

        asal.insertNode(document.createTextNode(teks));
        let taksonomibloom = this.service.data['taksonomibloom'].filter(s=> s.kko == teks);

        if(taksonomibloom.length==0 ){
            alert('Takonomi Bloom tidak ditemukan')
            if(document.querySelector('[data-keyformulir="levelkognitif"]')){
                document.querySelector('[data-keyformulir="levelkognitif"]').value ="";
            }
        }else{
            if(document.querySelector('[data-keyformulir="levelkognitif"]')){
                document.querySelector('[data-keyformulir="levelkognitif"]').value = taksonomibloom[0].levelkognitif;
                document.querySelector('[data-keyformulir="levelkognitif"]').dispatchEvent(new Event('change'));
                
                this.request = Object.assign(this.request,{'levelkognitif':taksonomibloom[0].levelkognitif});
                this.resspon(this.request);
            }
        }
    }
        
    replacingDataSrcToUrl(e){
        let inputTeks = e.target.innerHTML;
            if(inputTeks.indexOf('data:image')==-1) return;
            let imgs = e.target.querySelectorAll('img');
                imgs.forEach(async el=>{
                    let src = el.getAttribute('src');
                    if(src.indexOf('data:image')==-1) return;
                    let param = src.replace(/^.*,/, '');
                    
                    let tipe = src.match(/^.*(?=;)/)[0];
                    let params = {
                        action:'uploadFile',
                        folder:'GAMBAR MATERI SOAL',
                        subfolder:'Gambar Paste',
                        // namafile:namafileinput.replace(/[^\w\s.-]/g, "_"),
                        "namafile":'upload_paste_'+new Date().getTime(),//+'.'+ekstnsi,
                        "base64":param,//.replace(/^.*,/, '');
                        "mimeType":tipe,//dataURL.match(/^.*(?=;)/)[0],//
                    }
                    el.src = this.imageLoading;
                    const respon =  await this.service.simpanImage(params);
                    
                    
                    let newurl = new UrlImg(respon.idfile).urlImg; ;//`https://lh3.googleusercontent.com/d/${respon.data.idfile}`;
                    el.src = newurl;
                    el.alt = "Gambar Upload";
                    // this.iframeDom.body.focus();
                });
    }

}