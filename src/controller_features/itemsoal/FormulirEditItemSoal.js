import { previewBentukSoal, propertiItemSoal } from "../banksoal/viewBankSoal";
import viewFormulirBankSoal from "../editor/viewFormulirBankSoal";

export default class FormulirEditItemSoal{
    constructor(currentItemSoal)
    {
        this.itemsoal = currentItemSoal;

        //add class or instance of class
        this.service = null;
        this.UrlImg = null;
        this.imageLoading = ''

        //elemen
        this.workplace = document.getElementById('editsoaleditorwraper');
        this.contextMenu = null;
        this.wraperTabel = null;
        this.elemenForm = null;
        this.elemenProperty = null;
        this.elemenPreview = null;

        //respon/output
        this.request = {};
        this.resspon = null;
        this.callback = null;

    }
    addService(service){
        this.service = service;
        
        return this;
    }
    addUrlImg(d){
        this.UrlImg = d;
        return this;
    }
    addLoading(x){
        this.imageLoading = x;
        return this;
    }
    addDataDesain(x){
        this.datadesain = x;
        return this
    }
    buildForm(){
        
        this.datadesain.kodemapel = this.itemsoal.kodemapel;
        this.workplace.innerHTML = "";
        this.workplace.classList.add('position-relative');
        this.workplace.appendChild(viewFormulirBankSoal.html_table_formulirEdit(this.datadesain, this.service.data.lingkupmateri));
        this.workplace.appendChild(viewFormulirBankSoal.html_contextmenu_table_formulir());

        //define elemen
        this.contextMenu = document.getElementById('contextMenuDivEditorEditing');
        this.wraperTabel = document.getElementById('wrapertabel');
        this.elemenForm = document.querySelectorAll('[data-keyformuliredit]');
        this.elemenProperty = document.querySelector('#previewdata');
        this.elemenPreview = document.querySelector('#previewsoaledit');
        return this;
    }
    fillItem(){
        const soal = this.itemsoal;
        // let inputan = document.querySelectorAll('[data-keyformuliredit]');
        // let inputandata = document.querySelector('#previewdata');
        // let inputanpreview = document.querySelector('#previewsoaledit');
        
        this.elemenForm.forEach(n=>{
                let atr = n.getAttribute('data-keyformuliredit');
                if(n.nodeName == 'td'|| n.nodeName =='TD' ){
                    n.innerHTML = soal[atr];
                }else{
                    n.value = soal[atr];
                }
            });
            
        this.elemenProperty.innerHTML = propertiItemSoal(soal);
        this.elemenPreview.innerHTML = previewBentukSoal(soal,false);
        return this;
    }
    init(){

        
        this.request = Object.assign({},this.request, this.itemsoal);
        this.elemenForm.forEach(n=>{
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
                this.elemenProperty.innerHTML = propertiItemSoal(this.request);
                this.elemenPreview.innerHTML = previewBentukSoal(this.request,false);
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
                                this.elemenProperty.innerHTML = propertiItemSoal(this.request);
                                this.elemenPreview.innerHTML = previewBentukSoal(this.request,false);

                            }else{
                                asal.insertNode(document.createTextNode(teks[0].data));
                            }
                            this.contextMenu.style.display="none";
                        }
                    })
                }
            }
            
            n.onkeyup = n.onmouseup = (e)=>{
                let cekImgs = n.querySelectorAll('.resizer');
                cekImgs.forEach((img)=>{
                    if(img.firstChild){
                        img.firstChild.style.removeProperty('border');
                        if(img.firstChild.style.length ==0) img.firstChild.removeAttribute('style');
                        img.parentNode.insertBefore(img.firstChild,img);
                    }
                    if(img.className == 'resizer'||img.className == 'resizer-tb') img.remove();
                })
            }
            n.ondblclick = (e)=>{
                if(e.target.nodeName == 'IMG'|| e.target.nodeName == 'img'){
                    
                    let img = e.target;
                    e.target.style.border ='1px dashed #000';
                    let div = document.createElement('div');
                        div.className="resizer";
                        div.style.width= img.offsetWidth+"px";
                        div.style.height=img.offsetHeight+"px";
                        div.style.position ="relative";
                        div.style.display ="inline-block";
                        img.parentNode.insertBefore(div,img);
                        div.appendChild(img);
                    let tb = document.createElement('div');;
                        tb.className="resizer-br"
                        tb.style.width= '10px'; 
                        tb.style.height= "10px"; 
                        tb.style.background= "white"; 
                        tb.style.position="absolute"; 
                        tb.style.border= "3px solid #4286f4";
                        tb.style.borderRadius="50%"; 
                        tb.style.right= "-5px"; 
                        tb.style.bottom= "-5px"; 
                        tb.style.cursor= "nwse-resize"; 
                        div.appendChild(tb);
                    tb = document.createElement('div');;
                        tb.className="resizer-bl"
                        tb.style.width= '10px'; 
                        tb.style.height= "10px"; 
                        tb.style.background= "white"; 
                        tb.style.position="absolute"; 
                        tb.style.border= "3px solid #4286f4";
                        tb.style.borderRadius="50%"; 
                        tb.style.left= "-5px"; 
                        tb.style.bottom= "-5px"; 
                        tb.style.cursor= "nwse-resize"; 
                        div.appendChild(tb);
                    tb = document.createElement('div');;
                        tb.className="resizer-tl"
                        tb.style.width= '10px'; 
                        tb.style.height= "10px"; 
                        tb.style.background= "white"; 
                        tb.style.position="absolute"; 
                        tb.style.border= "3px solid #4286f4";
                        tb.style.borderRadius="50%"; 
                        tb.style.left= "-5px"; 
                        tb.style.top= "-5px"; 
                        tb.style.cursor= "nwse-resize"; 
                        div.appendChild(tb);
                    tb = document.createElement('div');;
                        tb.className="resizer-tr"
                        tb.style.width= '10px'; 
                        tb.style.height= "10px"; 
                        tb.style.background= "white"; 
                        tb.style.position="absolute"; 
                        tb.style.border= "3px solid #4286f4";
                        tb.style.borderRadius="50%"; 
                        tb.style.right= "-5px"; 
                        tb.style.top= "-5px"; 
                        tb.style.cursor= "nwse-resize"; 
                        div.appendChild(tb);
                    const minimum_size = 20;
                    let original_width = 0;
                    let original_height = 0;
                    let original_x = 0;
                    let original_y = 0;
                    let original_mouse_x = 0;
                    let original_mouse_y = 0;
                    
                    const element = div;
                    n.onmousedown = (e)=>{
                        // e.preventDefault();
                        original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
                        original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
                        original_x = element.getBoundingClientRect().left;
                        original_y = element.getBoundingClientRect().top;
                        original_mouse_x = e.pageX;
                        original_mouse_y = e.pageY;
                        n.onmousemove = resize;
                        n.addEventListener('mouseup',stopResize); ;//onmouseup = stopResize;
                    };
                    function resize(e){
                        const currentResizer = e.target;//.closest('div');
                        if (currentResizer.classList.contains('resizer-br')) {
                            const width = original_width + (e.pageX - original_mouse_x);
                            const height = original_height + (e.pageY - original_mouse_y)
                            if (width > minimum_size) {
                                element.style.width = width + 'px'
                            }
                            if (height > minimum_size) {
                                element.style.height = height + 'px'
                            }
                            }
                        else if (currentResizer.classList.contains('resizer-bl')) {
                            const height = original_height + (e.pageY - original_mouse_y)
                            const width = original_width - (e.pageX - original_mouse_x)
                            if (height > minimum_size) {
                                element.style.height = height + 'px'
                            }
                            if (width > minimum_size) {
                                element.style.width = width + 'px'
                                element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                            }
                            }
                        else if (currentResizer.classList.contains('resizer-tr')) {
                            const width = original_width + (e.pageX - original_mouse_x)
                            const height = original_height - (e.pageY - original_mouse_y)
                            if (width > minimum_size) {
                                element.style.width = width + 'px'
                            }
                            if (height > minimum_size) {
                                element.style.height = height + 'px'
                                element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                            }
                            }
                        else {
                            const width = original_width - (e.pageX - original_mouse_x)
                            const height = original_height - (e.pageY - original_mouse_y)
                            if (width > minimum_size) {
                                element.style.width = width + 'px';
                                element.style.left = original_x + (e.pageX - original_mouse_x) + 'px';
                            }
                            if (height > minimum_size) {
                                element.style.height = height + 'px'
                                element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                            }
                        }   
                        img.style.width  = element.style.width
                        img.style.height = element.style.height;
                    }
                    
                    function stopResize(e) {
                        n.removeEventListener('mouseup',stopResize); ;//onmouseup = stopResize;
                        n.removeEventListener('mousemove',resize); ;//onmouseup = stopResize;
                        n.onmousemove= null;
                        n.onmousedown = null;
                        n.onmouseup();
                    }
                    
                }
            }
            n.onpaste = (e)=>{
                
                const type = e.clipboardData.types;
                if(type.includes('Files')){
                    const selection = document.getSelection();
                    let teks = e.clipboardData.getData('text/plain');
                    let parser = new DOMParser();
                        let htmldoc = parser.parseFromString(teks,'text/html');
                        let div = document.createDocumentFragment();
                        while (htmldoc.body.childNodes.length > 0){
                            div.appendChild(htmldoc.body.childNodes[0]);
                        }
                        selection.deleteFromDocument();
                        selection.getRangeAt(0).insertNode(div);
                        selection.collapseToEnd()
                    
                    // this.onmouseup(e);
                }else{
                    
                    let teks = e.clipboardData.getData('text/plain');
                    const selection = document.getSelection();
                    // if(check.checked){
                    //     teks = this.CleanWordFormatting(teks);
                    //     selection.deleteFromDocument();
                    //     selection.getRangeAt(0).insertNode(document.createTextNode(teks));
                    //     selection.collapseToEnd();
                    // }else{
                    // }
                    teks = this.CleanWordFormatting(teks);
                    let parser = new DOMParser();
                    let htmldoc = parser.parseFromString(teks,'text/html');
                    let div = document.createDocumentFragment();
                    while (htmldoc.body.childNodes.length > 0){
                        div.appendChild(htmldoc.body.childNodes[0]);
                    }
                    selection.deleteFromDocument();
                    selection.getRangeAt(0).insertNode(div);
                    selection.collapseToEnd();
                    e.preventDefault();
                }
            }

            
        })
        return this;
    }
    runtime(fn){
        this.resspon = fn;
    }
    CleanWordFormatting(input) {
        let output = input.replace(/(<[^>]*>)|\t+/gm, ' ');
        //ganti semua breakline
        output = output.replace(/\r?\n|\r/g,'<br>');
        return output;
    }
    showonContextMenu(e){
        // let divStatical = this.staticDiv.getBoundingClientRect();
        // let divWraper = this.divElemen.getBoundingClientRect();
        let divStatical = this.workplace.getBoundingClientRect();
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
            
            img.src =  new this.UrlImg(sr).convertUrlToLatexLatest()
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
            img.src =  new this.UrlImg(sr).convertUrlToLatexLatest();
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
            img.src =  new this.UrlImg(sr).convertUrlToLatexLatest()
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
                    el.src = this.imageLoading;
                    const respon =  await this.service.uploadGambarFromBase64(src,this.service.api_uloadgambar);
                    
                    
                    let newurl = new this.UrlImg(respon.idfile).urlImg; ;//`https://lh3.googleusercontent.com/d/${respon.data.idfile}`;
                    el.src = newurl;
                    el.alt = "Gambar Upload";
                    // this.iframeDom.body.focus();
                });
    }

}