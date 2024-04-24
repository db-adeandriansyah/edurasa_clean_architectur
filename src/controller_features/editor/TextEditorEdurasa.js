// import { createElement, qs, qsAll, stringToDom } from "../../views/components/doms";
import UrlImg from "../../controllers/UrlImg";
import { debounce } from "../../views/components/doms";
import { IframeTextEditor, ToolbarEditor, contextMenu, previewBentukSoal, styleIframe } from "./viewTextEditorEdurasa";

export default class TextEditorEdurasa{
    constructor(praDesain,queryTarget,idiframe='editorcustom'){
        this.praDesain = praDesain;
        this.targetDom = document.querySelector(queryTarget);
        this.idIframe = idiframe;
        this.iframeDom = null;
        this.contextMenu = null;
        this.resspon =null;
        this.request = {};
        this.service = null;
    }
    createIFrmae(){
        const IframeEditor = IframeTextEditor(this.idIframe);
        this.targetDom.style.position = 'relative';
        this.targetDom.appendChild(IframeEditor);

        const iframeHasCreated = document.querySelector('#'+this.idIframe);
        //make sure iframe has position relative for next overlay position contextMenu;
        // iframeHasCreated.style.position = 'relative';
        
        const contextIframe = iframeHasCreated.contentWindow.document;
        this.iframeDom = iframeHasCreated.contentWindow.document;
        
        contextIframe.head.appendChild(styleIframe());
        contextIframe.body.setAttribute('contenteditable', "true");
        // contextIframe.body.setAttribute('style', "border:2px solid #ddd;padding:1rem;margin:0");
        this.injextHead(contextIframe);
        return this;
    }
    
    injextHead(context){
        // this.createLinkBootstrap();
        // this.createLinkFA
        
        const allCss =  document.styleSheets;
        const linkCont = context.head.querySelectorAll('link');
        if(linkCont.length>allCss.length){
            linkCont[0].remove();
        }
        
        for(let i = 0 ; i < allCss.length ; i++){
                let create = document.createElement('link');
                create.href = allCss[i].href;
                create.type ='text/css';
                create.rel = 'stylesheet';
                context.head.appendChild(create);
                
        }
        
    }
    iframeWithToolbar(){
        this.createIFrmae();
        const menus = this.createToolbar();
        const contextMenu = this.createContextMenu();

        this.targetDom.insertBefore(menus,this.targetDom.firstChild);
        this.targetDom.appendChild(contextMenu);
        
        if(this.praDesain.bentuksoal !=='Pilihan Ganda'){
            let datapg = document.querySelectorAll('.opsijawaban');
            datapg.forEach(n=>n.classList.add('d-none'));

        }
        this.iframeDom.oncontextmenu = (e) => {
            e.preventDefault();
            this.showContextMenu(e);
        };
        return this;
    }
    
    showContextMenu(e){
        const domContext = document.querySelector(`#menucontext_${this.idIframe}`);
        this.contextMenu = document.querySelector(`#menucontext_${this.idIframe}`);
        if(domContext.classList.contains('d-none')){
            domContext.classList.remove('d-none');
        }
        
        const elemenYangAkanDiletakkan = domContext;
        const boundingBox = elemenYangAkanDiletakkan.getBoundingClientRect();
        const iframe =this.targetDom.querySelector('#'+this.idIframe);
        let x=0,y=0;
        x = e.clientX - boundingBox.width / 4; // Mengatur posisi x elemen tengah
        y = e.clientY;//- boundingBox.height/2;//2 ;/// 2; // Mengatur posisi y elemen tengah

        // Periksa apakah elemen akan berada di luar batas-batas iframe
        let iframeWidth = iframe.clientWidth;
        let iframeHeight = iframe.clientHeight;//+iframe.previousElementSibling.clientHeight;//iframe.clientHeight;
        let leftMenuContextFormating ='start-100';
        if (x < 0) {
            x = 0;
            
        }
        if (y < 0) {
            y = 0;
            
        }
        if (x + boundingBox.width *1.5 > iframeWidth) {
            x = iframeWidth - boundingBox.width ;
            leftMenuContextFormating = 'end-100';
        }
        if (y+boundingBox.height > iframeHeight) {
            y = iframeHeight - boundingBox.height;
        }
        
        elemenYangAkanDiletakkan.style.left = x + 'px';
        elemenYangAkanDiletakkan.style.top = y + 'px';
        
        
        
        const menuoverlay = document.getElementById("menucontextoverlay_"+this.idIframe);
        if(menuoverlay){
            menuoverlay.classList.remove('start-100','end-100');
            menuoverlay.classList.add(leftMenuContextFormating);
        }
        const posisicontextmatematika = document.getElementById("menucontextoverlaymatematika_"+this.idIframe);
            posisicontextmatematika.classList.remove('start-100','end-100');
            posisicontextmatematika.classList.add(leftMenuContextFormating);
        const submenucontexts = document.querySelectorAll('.submenucontext',elemenYangAkanDiletakkan);
        submenucontexts.forEach(el=>{
            el.classList.remove('start-100','end-100');
            el.classList.add(leftMenuContextFormating);
        })
        
    }
    createToolbar(){
        return ToolbarEditor(this.idIframe);
    }
    createContextMenu(){
        const data = this.service.data.lingkupmateri.filter(s=> s.kodemapel == this.praDesain.kodemapel);
        
        return contextMenu(this.idIframe,data)
    }
    domActivity(){
        const formatHTML = document.querySelector('#checkdesainmagicsoal_' +this.idIframe);
        const dom = this.iframeDom;
        const spanFormat = this.targetDom.querySelectorAll('[data-keycmd]');
        const domContext = document.querySelector(`#menucontext_${this.idIframe}`);
        dom.oninput = (e)=>{
            if(!domContext.classList.contains('d-none')){
                domContext.classList.add('d-none');
            }
            
            document.querySelector('#'+this.idIframe).style.height = dom.body.scrollHeight + 'px';
            
            this.resspon(this.request);
        }
        dom.onkeyup = dom.onmouseup = (e)=>{
            if(!domContext.classList.contains('d-none')){
                domContext.classList.add('d-none');
            }
            if(this.getCurrentBlock()){
                //paretn
                
                let parent = this.getCurrentBlock().parent.nodeName.toLowerCase();
                if(parent!='body'){
                    let spanactiveParent = document.querySelector(`[data-typehtml="${this.getCurrentBlock().parent.nodeName.toLowerCase()}"]`);
                    let spanactive = document.querySelector(`[data-typehtml="${this.getCurrentBlock().elemenParent.nodeName.toLowerCase()}"]`);
                    
                    if (spanactiveParent) spanactiveParent.classList.add('active');
                    if(spanactive) spanactive.classList.add('active');
                }else{
                    
                    spanFormat.forEach(n=>n.classList.remove('active'));
                    let spanactive = document.querySelector(`[data-typehtml="${this.getCurrentBlock().elemenParent.nodeName.toLowerCase()}"]`);
                    if(spanactive) spanactive.classList.add('active');
                }
            }else{
                spanFormat.forEach(n=>n.classList.remove('active'));
            }
        }
    }
    btnActivity(){
        const formatHTML = document.querySelector('#checkdesainmagicsoal_' +this.idIframe);
        const dom = this.iframeDom;
        const spanFormat = this.targetDom.querySelectorAll('[data-keycmd]');
        
        
        spanFormat.forEach(span=>{
            let atrib = span.getAttribute('data-keycmd');
            if(span.nodeName.toLowerCase()=='select'){
                span.onchange = (e)=>{
                    if(formatHTML.checked) {
                        alert('Anda dalam moda penginputan format HTML, fitur ini tidak tereksekusi.');
                        e.preventDefault();
                        return;
                    };
                    let val = e.target.value;
                    let keycmd = e.target.getAttribute('data-keycmd');
                    if(keycmd == 'formatBlock'){
                        dom.execCommand(keycmd,false,this.status.elementParent)
                        this.unwrap(this.status.elemenParent,val);
                    
                    }else{
                        dom.execCommand(keycmd,false,val);
                    }
                }
            }else{
                span.onclick = (e)=>{
                    if(formatHTML.checked) {
                        alert('Anda dalam moda penginputan format HTML, fitur ini tidak tereksekusi.');

                        e.preventDefault();
                        
                        return;
                    };

                    span.classList.toggle('active');

                    if(['insertOrderedList','insertunOrderedList'].includes(atrib)){
                        dom.execCommand(atrib,false,null)
                        const thisparent = this.status.elemenParent;
                        this.unwrap(thisparent);
                    }else if(atrib=='createLink'){
                        let prom = prompt('masukkan url','https://edurasa.com');
                        dom.execCommand(atrib,false,prom);
                    }else{
                        if(['justifyCenter','justifyRight','justifyLeft','justifyFull'].includes(atrib)){
                            spanFormat.forEach(b=>b.classList.remove('active'));
                            span.classList.add('active');
                        }
                        
                        dom.execCommand(atrib,false,null);
                        dom.body.focus();
                    }
                }
            }
        });

        let aksis = document.querySelectorAll('[data-aksi]');

        aksis.forEach(el=>{
            if(this[el.getAttribute('data-aksi')]){
                el.onclick = () => {
                    if(formatHTML.checked) {
                        alert('Anda dalam moda penginputan format HTML, fitur ini tidak tereksekusi.');
                        e.preventDefault();
                        return;
                    };
                    this[el.getAttribute('data-aksi')]();
                };
            }else{
                el.onclick = () => {
                    if(formatHTML.checked) {
                        alert('Anda dalam moda penginputan format HTML, fitur ini tidak tereksekusi.');
                        e.preventDefault();
                        return;
                    };
                    console.log(el.getAttribute('data-aksi'), 'tunggu aja nanti')
                }
            }
        });

        document.querySelectorAll('input[type="color"').forEach(el=>{
            el.onchange = (e)=>{
                if(formatHTML.checked) {
                    e.preventDefault();
                    return;
                };
                this.iframeDom.execCommand(e.target.getAttribute('data-cmd'),false,e.target.value);
                this.iframeDom.body.focus();
            };
            
        });
        let hasElemenContetxt = document.querySelectorAll('[data-aksicontext]');
        hasElemenContetxt.forEach(btn=>{
            btn.onclick = (e)=>{
                if(formatHTML.checked) {
                    alert('Anda dalam moda penginputan format HTML, fitur ini tidak tereksekusi.');
                    e.preventDefault();
                    return;
                };
                let atr = btn.getAttribute('data-aksicontext');
                
                if(this[atr]){
                    let data = this[atr](e);
                    
                    if(data!==undefined){
                            if(atr == 'kuncijawabanAbjad'){
                                this.request = Object.assign(this.request,{kuncijawaban:data});

                            }else if(atr == 'lingkupmateri'){
                                this.request = Object.assign(this.request,{ruanglingkup:data});

                            }else if(atr == 'allpg'){
                                this.request = Object.assign(this.request,data);
                            }else if(atr == 'convertABC'){
                                this.request = Object.assign(this.request,data);
                            }else if(atr == 'convertABCD'){
                                this.request = Object.assign(this.request,data);
                            }else if(atr == 'levelkognitif'){
                                const {levelkognitif, tipe} = data;
                                this.request = Object.assign(this.request,{levelkognitif:levelkognitif,'taksonomibloom':tipe});

                            }else{
                                this.request = Object.assign(this.request,{[atr]:data});

                            }
                            this.resspon(this.request);
                        }

                    this.contextMenu.classList.add('d-none');
                }
            }
        });
    }
    lingkupmateri(e){
        return e.target.innerHTML;
    }
    kuncijawabanAbjad(e){
        return e.target.innerHTML;
    }
    init(){
        this.iframeWithToolbar();
        // ,'orm':praDesain.ormKurikulum
        let tekskd = '';
        let orm = [];
        if(this.praDesain.namakurikulum == 'kurmer'){
            orm = this.praDesain.ormkurikulum.filter(s=> s.idbaris == this.praDesain.kd)[0];
            tekskd = orm.atp;
        }else{
            orm = this.praDesain.ormkurikulum.filter(s=> (s.kd3 == this.praDesain.kd || s.kd4 ==this.praDesain.kd) && s.mapel == this.praDesain.kodemapel)[0];
            tekskd = orm.kd3+' '+orm.indikatorkd3;
        }
        this.request.bentuksoalspesifik=this.praDesain.bentuksoal;
        this.request.tekskd = tekskd ;
        this.request.kurikulum = this.praDesain.namakurikulum ;
        this.request.kodemapel = this.praDesain.kodemapel;
        this.request.tekskodemapel = this.praDesain.tekskodemapel;
        this.request.jenjang = this.praDesain.jenjang;
        this.request.oleh = this.praDesain.oleh;
        this.request.idguru = this.praDesain.idguru;
        this.request.kd= this.praDesain.kd;
        if(this.praDesain.bentuksoal=='Pilihan Ganda'){
            this.request.tampilanpg = 'BIASA';
        }

        this.request.bentuksoal = this.praDesain.bentuksoal =='Essay'?'Isian':this.praDesain.bentuksoal;
        console.log('praDesain',this.praDesain);
        debounce(this.btnActivity());
        debounce(this.domActivity());
        
        
        return this;
    }
    addService(service){
        this.service = service;
        return this;
    }
    addRespons(callback){
        this.resspon = callback;
        return this;
    }
    getCurrentBlock(){
        const select = this.iframeDom.getSelection();
        const ancestor = select.getRangeAt(0).commonAncestorContainer;
        const parentnya = select.anchorNode;
        const selection = parentnya.parentNode;
        const type = selection.nodeName.toLowerCase();
        if (type === "body" || type === "html") return ;//{ancestor:ancestor};
        const children = this.iframeDom.body.childNodes;
        const index = [...children].indexOf(selection);
        const currentBlock = {
            ancestor:ancestor,
            indexParent:[...children].indexOf(this.iframeDom.getSelection().anchorNode.parentNode.closest('body>div')),
            elemenParent:this.iframeDom.getSelection().anchorNode.parentNode.closest('body>div')||this.iframeDom.getSelection().anchorNode.parentNode.closest(type),
            parent:selection.parentElement,
            styleAlign:selection.style.textAlign,
            index:index,
            type:type,
            text: selection.textContent,
            innerHTML :selection.innerHTML,
            // parentInnerHTML:parentnya.parentNode.closest('div').innerHTML,
            // parentOuterHTML:parentnya.parentNode.closest('div').outerHTML,
        };
        
        return currentBlock;
    }
    unwrap(container, newChildType = null) {
        const parent = container.parentNode;
        if(parent){
            
            while (container.firstChild) {
                if (newChildType) {
                    container.replaceChild(
                        createElement(newChildType, null, container.firstChild.textContent),
                        container.firstChild
                    );
                }
                parent.insertBefore(container.firstChild, container);
            }
            parent.removeChild(container);
        }else{
            this.iframeDom.execCommand('formatBlock',false,'<div>')
        }
        
        // this.displayHTML();
    }
    previewBentukSoal(data){
        return Object.assign({},data,previewBentukSoal(data))
    }
    pertanyaan(){
        let dom = document.createElement('div');
            const selection = this.iframeDom.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML
        
    }
    
    pecahan(){
        
        const selection = this.iframeDom.getSelection();
        if (selection && selection.rangeCount) {

            let cekselect = selection.getRangeAt(0).cloneContents().childNodes;
            
            if(cekselect.length !== 1) {
                alert('Silakan seleksi bagian teks saja, bukan kosong/lebih dari satu baris.') 
                return
            };
            let teks = cekselect[0].data;
            let arr = teks.split('/');
            if(arr.length == 2){
                let img = new Image();
                let sr = `https://chart.apis.google.com/chart?cht=tx&chl=%7B%5Cfrac%20%7B${encodeURIComponent(arr[0])}%7D%20%7B${encodeURIComponent(arr[1])}%7D%7D`;
                // sr = new UrlImg(sr).convertUrlToLatexLatest()
                img.src =  new UrlImg(sr).convertUrlToLatexLatest()
                img.style.verticalAlign='middle';
                img.alt = `pecahan ${arr[0]} per ${arr[1]}`;    
                    selection.deleteFromDocument();
                    selection.getRangeAt(0).insertNode(img);
            }
        }
    }
    
    allpg(){
        let dom = document.createElement('div');
            const selection = this.iframeDom.getSelection();
                if (!selection.rangeCount) return;
                
                for (let i = 0; i < selection.rangeCount; i++) {
                    
                    dom.append(selection.getRangeAt(i).cloneContents());
                    
                }
        // if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        let opsi = ['A','B','C','D'];
        let p = [];
        let q = {};
        dom.childNodes.forEach((n,i)=>{
            let k = 'opsi'+opsi[i];
            if(n.nodeType == 3){

                p.push({[k]:n.data.replace(/(^[A-Da-d].)\s/,'')});
                q[k]=n.data.replace(/(^[A-Da-d].)\s/,'');
            }else{
                p.push({[k]:n.innerHTML.replace(/(^[A-Da-d].)\s/,'')})
                q[k]=n.innerHTML.replace(/(^[A-Da-d].)\s/,'');
            }
        })
        // return p;//.innerHTML;
        return q;//.innerHTML;
    }
    ilustrasi(){
        let dom = document.createElement('div');
            const selection = this.iframeDom.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    headerpg(){
        let dom = document.createElement('div');
            const selection = this.iframeDom.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    kuncijawaban(){
        let dom = document.createElement('div');
            const selection = this.iframeDom.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        
        return this.filterString(dom.innerHTML);
    }
    filterString(inputString) {
        var regex = /[ABCD]/;
        var match = inputString.match(regex);
        if (match) {
            return match[0];
        } else {
          return ''; // atau nilai default lainnya jika tidak ada karakter yang cocok
        }
      }
    opsiA(){
        let dom = document.createElement('div');
            const selection = this.iframeDom.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    opsiB(){
        let dom = document.createElement('div');
            const selection = this.iframeDom.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    opsiC(){
        let dom = document.createElement('div');
            const selection = this.iframeDom.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    opsiD(){
        let dom = document.createElement('div');
            const selection = this.iframeDom.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    penskoran(){
        let dom = document.createElement('div');
            const selection = this.iframeDom.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    pembahasan(){
        let dom = document.createElement('div');
            const selection = this.iframeDom.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    materi(){
        let dom = document.createElement('div');
            const selection = this.iframeDom.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    levelkognitif(){
        let dom = document.createElement('div');
            const selection = this.iframeDom.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        //console.log(dom.innerHTML);
        let data = {
            idbaris:'',
            tipe:'',
            nama_taksonomi:'',
            kko:'',
            levelkognitif:''
            
        };
        if(this.service.data.taksonomibloom.length>0){
            let cek = this.service.data.taksonomibloom.filter(s=> s.kko.toLowerCase() == dom.innerHTML.toLowerCase());
            if(cek.length>0){
                data = cek[0];
            }
        }
        return data;
    }
    indikatorsoal(){
        let dom = document.createElement('div');
            const selection = this.iframeDom.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    refrensi(){
        let dom = document.createElement('div');
            const selection = this.iframeDom.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    youtube(){
        let prom = prompt("Masukkan link youtube","");
        if(!prom){return};
        let reg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        let url = prom.match(reg)
        let html=`<iframe style="resize: both;" src='https://www.youtube.com/embed/${url[1]}'  frameborder='1' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe><br/><br/>`;
        this.iframeDom.execCommand("insertHTML",false,html);
    
    }
    buattabel(){
        let promp = prompt("Masukkan jumlah baris, contoh 3 x 4 (3 baris, 4 kolom) tanpa spasi","3x4");
    if(!promp){return }
    let teks = promp.replace(/\s+/g,"");
    let ang = teks.toLowerCase().split("x");
    let brs = parseInt(ang[0]);
    let cols = parseInt(ang[1]);
    let html = `<table style="border-collapse:collapse;border-spacing:0">`
    for(let i = 0 ; i < brs ; i++){
        html +=`<tr>`
        for (let j = 0 ; j <cols; j++){
            html +=`<td style="border:.5pt solid #000;padding:4px 8px;line-height:1em">teks</td>`
        }
        html +=`</tr>`
    }
    html +=`</table>`;
    this.iframeDom.execCommand("insertHTML",null, html);
    
    const thisparent = this.status.elemenParent;
    
    this.unwrap(thisparent);
    
    }

    akarkuadrat(){
        const selection = this.iframeDom.getSelection();
        if (selection && selection.rangeCount) {
                const container = selection.getRangeAt(0).commonAncestorContainer;
                let cekselect = selection.getRangeAt(0).cloneContents().childNodes;
                    
                if(cekselect.length == 0) {
                    alert('Tidak ada angka/teks yang dipilih untuk dijadikan format matematika.') 
                    return
                };
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
                    img.src = sr;
                    img.style.verticalAlign='middle';
                    img.alt = `akar kuadrat ${teks}`;
                selection.deleteFromDocument();
                selection.getRangeAt(0).insertNode(img);
                selection.collapseToEnd();
            }
    }
    CleanWordFormatting(input) {
        let output = input.replace(/(<[^>]*>)|\t+/gm, ' ');
        //ganti semua breakline
        output = output.replace(/\r?\n|\r/g,'<br>');
        return output;
    }
    akarkubik(){
        const selection = this.iframeDom.getSelection();
        if (selection && selection.rangeCount) {
                const container = selection.getRangeAt(0).commonAncestorContainer;
                // this.unwrap(container, this.settings.defParagraphSeparator);
            
                let cekselect = selection.getRangeAt(0).cloneContents().childNodes;
                
                if(cekselect.length == 0) {
                    alert('Tidak ada angka/teks yang dipilih untuk dijadikan format matematika.') 
                    return
                };
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
                let sr = `https://chart.apis.google.com/chart?cht=tx&chl=%7B%5Csqrt%5B3%5D%20%7B${encodeURIComponent(teks)}%7D`;
                    img.src = sr;
                    img.style.verticalAlign='middle';
                    img.alt = `akar kuadrat ${teks}`;
                selection.deleteFromDocument();
                selection.getRangeAt(0).insertNode(img);
                selection.collapseToEnd();
            }
    }
    convertABC(){
        
        let dom = document.createElement('div');
            const selection = this.iframeDom.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        
        let obj = {};
        let eOpsi = ['pertanyaan','opsiA','opsiB','opsiC']
        let indexOpsi = 0;
        let regex = /(^[A-Da-d].)\s/;
        let k = "";
        dom.childNodes.forEach((n,i)=>{
            if(n.nodeType == 3){
                // ob[eOpsi[indexOpsi]] = n.data;
                k = n.data;
            }else{
                if(regex.test(n.innerHTML)){
                    indexOpsi++;
                    k = n.innerHTML.replace(/(^[A-Da-d].)\s/,"");
                }else{
                    k+=n.outerHTML
                }
                // ob[eOpsi[indexOpsi]] = k;
                if(eOpsi[indexOpsi]){
                    obj[eOpsi[indexOpsi]] = k;
                }
                
            }
            // p.push(ob)
            
        })
        // obj.push = p;
        return obj;
    }
    convertABCD(){
        
        let dom = document.createElement('div');
            const selection = this.iframeDom.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        
        let obj = {};
        let eOpsi = ['pertanyaan','opsiA','opsiB','opsiC','opsiD']
        let indexOpsi = 0;
        let regex = /(^[A-Da-d].)\s/;
        let k = "";
        dom.childNodes.forEach((n,i)=>{
            if(n.nodeType == 3){
                // ob[eOpsi[indexOpsi]] = n.data;
                k = n.data;
            }else{
                if(regex.test(n.innerHTML)){
                    indexOpsi++;
                    k = n.innerHTML.replace(/(^[A-Da-d].)\s/,"");
                }else{
                    k+=n.outerHTML
                }
                
                if(eOpsi[indexOpsi]){
                    obj[eOpsi[indexOpsi]] = k;
                }
                
            }
            // p.push(ob)
            
        })
        // obj.push = p;
        return obj;
    }
                    
                    // dom.append(selection.getRangeAt(i).cloneContents());
                
}