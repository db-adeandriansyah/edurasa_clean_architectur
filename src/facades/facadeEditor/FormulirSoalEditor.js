
import viewFormulirBankSoal from "../../controller_features/editor/viewFormulirBankSoal";
import ContextMenuEditor from "./ContextMenuEditor";


export default class FormulirSoalEditor extends ContextMenuEditor{
    // constructor(pradesain,service,divTextEditor,barloading){
    constructor(pradesain,service,divTextEditor,barloading,UrlImg){
        super(service, divTextEditor,barloading,UrlImg);
        this.datadesain = pradesain;
        // this.service = service;
        // this.idIfram = divTextEditor;
        // this.imageLoading=barloading;
        // this.div = document.getElementById('divTextEditor');
        // this.contextMenu = null;
        // this.wraperTabel = null;
        this.btnSave = null;
        this.btnReset = null;
        // this.resspon =null;
        // this.request = {};
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
        this.div.classList.add('position-relative');
        this.div.appendChild(viewFormulirBankSoal.html_table_formulirEdit(this.datadesain, this.lingkupmateri()));
        this.div.appendChild(viewFormulirBankSoal.html_contextmenu_table_formulir());
        this.contextMenu = document.getElementById('contextMenuDivEditorEditing');
        this.wraperTabel = document.getElementById('wrapertabel');
        // this.init();
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
            ///
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
            ///
        })
        
    }
    
    CleanWordFormatting(input) {
        let output = input.replace(/(<[^>]*>)|\t+/gm, ' ');
        //ganti semua breakline
        output = output.replace(/\r?\n|\r/g,'<br>');
        return output;
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
    

}