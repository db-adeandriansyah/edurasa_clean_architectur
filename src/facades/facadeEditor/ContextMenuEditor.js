export default class ContextMenuEditor{
    
    constructor(service, idIframe,barloading,UrlImg){
        this.service = service;
        this.idIframe = idIframe;
        this.imageLoading = barloading
        this.UrlImg = UrlImg;
        this._contextMenu = null;//HTMLElements
        this._wraperTabel = null;//HTMLELements
        
        this.resspon =null;//(data)=>data;
        this.request = {};
    }
    set contextMenu(x){
        this._contextMenu = x;
    }
    get contextMenu(){
        return this._contextMenu;
    }
    set wraperTabel(x){
        this._wraperTabel = x;
    }
    get wraperTabel(){
        return this._wraperTabel;
    }
    get div(){
        return document.getElementById(this.idIframe);
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
                    // let param = src.replace(/^.*,/, '');
                    
                    // let tipe = src.match(/^.*(?=;)/)[0];
                    // let params = {
                    //     action:'uploadFile',
                    //     folder:'GAMBAR MATERI SOAL',
                    //     subfolder:'Gambar Paste',
                    //     // namafile:namafileinput.replace(/[^\w\s.-]/g, "_"),
                    //     "namafile":'upload_paste_'+new Date().getTime(),//+'.'+ekstnsi,
                    //     "base64":param,//.replace(/^.*,/, '');
                    //     "mimeType":tipe,//dataURL.match(/^.*(?=;)/)[0],//
                    // }
                    el.src = this.imageLoading;
                    const respon =  await this.service.uploadGambarFromBase64(src,this.service.api_uloadgambar);
                    
                    
                    let newurl = new this.UrlImg(respon.idfile).urlImg; ;//`https://lh3.googleusercontent.com/d/${respon.data.idfile}`;
                    el.src = newurl;
                    el.alt = "Gambar Upload";
                    // this.iframeDom.body.focus();
                });
    }
}