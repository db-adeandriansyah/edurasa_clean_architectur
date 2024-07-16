import ImageResizer from "../../utilities/ImageResizer";
import UrlImg from "../../controllers/UrlImg";


export class CanvasFabricEditor{
    constructor(service,pradesain){
        this.banksoalservice =service;
        this.praDesain = pradesain;
        this.request = {}
    }
    async init(){
        const fabric = await import('fabric').then(({fabric})=>fabric);
        let elemenCanvas = document.getElementById('canvaseditor');
        let fCanvas = new fabric.Canvas(elemenCanvas,{
            backgroundColor:"rgba(255,255,255,255)",
            transparentCorners: false,
            cornerColor: 'blue',
            

        });
        fCanvas.setWidth(760);
        fCanvas.setHeight(920);
        let tekskd = '';
        let orm = [];
        if(this.praDesain.namakurikulum == 'kurmer'){
            orm = this.praDesain.ormkurikulum.filter(s=> s.idbaris == this.praDesain.kd)[0];
            tekskd = orm.atp;
            
            
            this.request.elemen = orm.elemen;
            this.request.tp = orm.tp;
            this.request.atp = orm.atp;
        }else{
            orm = this.praDesain.ormkurikulum.filter(s=> (s.kd3 == this.praDesain.kd || s.kd4 ==this.praDesain.kd) && s.mapel == this.praDesain.kodemapel)[0];
            tekskd = orm.kd3+' '+orm.indikatorkd3;
        }
        this.request.bentuksoal=this.praDesain.bentuksoal;
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

        const btns = document.querySelectorAll('[data-canvasControl]');
        const btnsC = document.querySelectorAll('[data-canvasCopyPaste]');
        const inputFile = document.getElementById('uploadCanvas');
        const simpanSoal = document.getElementById('simpanItemSoal');
        const btnReset = document.getElementById('resetItemSoal');
        
        const selesaiDesainCanvas = document.getElementById('selesaiDesainCanvas');
        btns.forEach(btn=>{
            btn.onclick = (e)=>{
                let v = e.target.getAttribute('data-canvasControl');
                let obj = null;
                if(v == 'addText'){
                    let msgt = prompt('Ketikkan teks','');
                    if(msgt!=""){
                        obj = new fabric.IText(msgt,{top:10,left:100});
                    }
                }else if(v == 'flipX'){
                    if(!fCanvas.getActiveObject()) return;
                    fCanvas.getActiveObject().toggle('flipX')
                    fCanvas.renderAll();
                }else if(v == 'flipY'){
                    if(!fCanvas.getActiveObject()) return;
                    fCanvas.getActiveObject().toggle('flipY');
                    // fCanvas.renderAll();
                }else if(v == 'sendToBack'){
                    if(!fCanvas.getActiveObject()) return;
                    fCanvas.sendToBack(fCanvas.getActiveObject());
                    
                }else if(v == 'sendToFront'){
                    if(!fCanvas.getActiveObject()) return;
                    fCanvas.bringToFront(fCanvas.getActiveObject());
                    
                }else if(v == 'removeObject'){
                    if(!fCanvas.getActiveObject()) return;
                    fCanvas.remove(fCanvas.getActiveObject());
                }else if(v == 'bulletCanvas'){
                    
                    var rect = new fabric.Rect({
                        left: 100,
                        top: 50,
                        fill: '#ffffff',
                        width: 8,
                        height: 8,
                        strokeWidth: 1,
                        stroke: "#000000",
                        rx: 10,
                        ry: 10,
                        angle: 45,
                        scaleX: 3,
                        scaleY: 3,
                        hasControls: true
                    });
                    fCanvas.add(rect);
                    // new this.fabric.Image.fromURL('https://lh3.googleusercontent.com/d/1ARkx2BM67iHCbUwGpFwwR8rWnjGy1wN6', function(oImg) {
                    //             // scale image down, and flip it, before adding it onto canvas
                    //             oImg.scale(0.5);//.set('flipX', true);
                    //             fCanvas.add(oImg);
                    //         });
                }
                if(obj){
                    fCanvas.add(obj);
                }
                fCanvas.renderAll();
                fCanvas.forEachObject((objs)=>{
                    objs.set({
                        cornerStrokeColor: 'red',
                        borderColor: 'red',
                        cornerSize: 12,
                        // padding: 10,
                        cornerStyle: 'circle',
                        borderDashArray: [3, 3]
                    });
                });
            }
        });

        let _clipboard = fabric.util.object;
        btnsC.forEach(btn=>{
            btn.onclick = ()=>{

                let v = btn.getAttribute('data-canvasCopyPaste');
    
                if(v=='copy'){
                    // fCanvas.getActiveObject().clone(function(cloned) {
                    //     _clipboard = cloned;
                    // });
                    fCanvas.getActiveObject().clone(function(cloned) {
                        _clipboard = cloned;
                    });
                    // _clipboard = .clone(fCanvas.getActiveObject());
                }else if(v=='paste'){
                    _clipboard.clone(function(clonedObj) {
                        fCanvas.discardActiveObject();
                        clonedObj.set({
                            left: clonedObj.left + 10,
                            top: clonedObj.top + 10,
                            evented: true,
                        });
                        if (clonedObj.type === 'activeSelection') {
                            // active selection needs a reference to the canvas.
                            clonedObj.canvas = fCanvas;
                            clonedObj.forEachObject(function(objs) {
                                fCanvas.add(objs);
                            });
                            // this should solve the unselectability
                            clonedObj.setCoords();
                        } else {
                            fCanvas.add(clonedObj);
                        }
                        _clipboard.top += 10;
                        _clipboard.left += 10;
                        fCanvas.setActiveObject(clonedObj);
                        fCanvas.requestRenderAll();
                    });
                }
            }
        })
        inputFile.onchange = (e)=>{
            let file = e.target.files[0];
            let imgResize = new ImageResizer(150,Infinity,false);
            // let namafileinput = 'gambar_soal'+new Date().getTime();
            if(file){
                imgResize.resizeImageToDataURL(file, async (mimeType, dataURL)=>{
                    let src = dataURL;//"https://lh3.googleusercontent.com/d/"+respon.data.idfile;
                    new fabric.Image.fromURL(src, function(oImg) {
                            oImg.scale(0.5);//.set('flipX', true);
                            fCanvas.add(oImg);
                        });
                })
            }
        }
        
        selesaiDesainCanvas.onclick=async(e)=>{
            fCanvas.discardActiveObject().requestRenderAll();
            const data = await this.uploadCanvasToPng(fCanvas);
            
            document.querySelector('[data-soalcanvas="pertanyaan"]').innerHTML = `<img src="${data}" class="img-fluid">`;
            
        }
        simpanSoal.onclick = async() =>{
            let domdata = document.querySelectorAll('[data-soalcanvas]');
            domdata.forEach(n=>{
                let value = n.value;
                if(n.nodeName =='TD'|| n.nodeName =='td'){
                    value = n.innerHTML;
                }
                let key = n.getAttribute('data-soalcanvas');
                this.request[key]=value;
            })
            if(this.validasiSoal(this.request)){
                await this.banksoalservice.simpanItemSoal(this.request);
            }else{
                alert('Belum siap dipublikasikan, pastikan semua terisi.');
            }

        }
    }
    data(){
        let domdata = document.querySelectorAll('[data-soalcanvas]');
        console.log(domdata);
            domdata.forEach(n=>{
                let value = n.value;
                if(n.nodeName =='TD'|| n.nodeName =='td'){
                    value = n.innerHTML;
                }
                let key = n.getAttribute('data-soalcanvas');
                this.request[key]=value;
            })      
        return this.request;
    }
    async initialization(){
        const fabric = await import('fabric').then(({fabric})=>fabric);
        let elemenCanvas = document.getElementById('canvaseditor');
        let fCanvas = new fabric.Canvas(elemenCanvas,{
            backgroundColor:"rgba(255,255,255,255)",
            transparentCorners: false,
            cornerColor: 'blue',
            

        });
        fCanvas.setWidth(760);
        fCanvas.setHeight(920);
        let tekskd = '';
        let orm = [];
        if(this.praDesain.namakurikulum == 'kurmer'){
            orm = this.praDesain.ormkurikulum.filter(s=> s.idbaris == this.praDesain.kd)[0];
            tekskd = orm.atp;
            
            
            this.request.elemen = orm.elemen;
            this.request.tp = orm.tp;
            this.request.atp = orm.atp;
        }else{
            orm = this.praDesain.ormkurikulum.filter(s=> (s.kd3 == this.praDesain.kd || s.kd4 ==this.praDesain.kd) && s.mapel == this.praDesain.kodemapel)[0];
            tekskd = orm.kd3+' '+orm.indikatorkd3;
        }
        this.request.bentuksoal=this.praDesain.bentuksoal;
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

        const btns = document.querySelectorAll('[data-canvasControl]');
        const btnsC = document.querySelectorAll('[data-canvasCopyPaste]');
        const inputFile = document.getElementById('uploadCanvas');
        const simpanSoal = document.getElementById('simpanItemSoal');
        const btnReset = document.getElementById('resetItemSoal');
        
        const selesaiDesainCanvas = document.getElementById('selesaiDesainCanvas');
        btns.forEach(btn=>{
            btn.onclick = (e)=>{
                let v = e.target.getAttribute('data-canvasControl');
                let obj = null;
                if(v == 'addText'){
                    let msgt = prompt('Ketikkan teks','');
                    if(msgt!=""){
                        obj = new fabric.IText(msgt,{top:10,left:100});
                    }
                }else if(v == 'flipX'){
                    if(!fCanvas.getActiveObject()) return;
                    fCanvas.getActiveObject().toggle('flipX')
                    fCanvas.renderAll();
                }else if(v == 'flipY'){
                    if(!fCanvas.getActiveObject()) return;
                    fCanvas.getActiveObject().toggle('flipY');
                    // fCanvas.renderAll();
                }else if(v == 'sendToBack'){
                    if(!fCanvas.getActiveObject()) return;
                    fCanvas.sendToBack(fCanvas.getActiveObject());
                    
                }else if(v == 'sendToFront'){
                    if(!fCanvas.getActiveObject()) return;
                    fCanvas.bringToFront(fCanvas.getActiveObject());
                    
                }else if(v == 'removeObject'){
                    if(!fCanvas.getActiveObject()) return;
                    fCanvas.remove(fCanvas.getActiveObject());
                }else if(v == 'bulletCanvas'){
                    
                    var rect = new fabric.Rect({
                        left: 100,
                        top: 50,
                        fill: '#ffffff',
                        width: 8,
                        height: 8,
                        strokeWidth: 1,
                        stroke: "#000000",
                        rx: 10,
                        ry: 10,
                        angle: 45,
                        scaleX: 3,
                        scaleY: 3,
                        hasControls: true
                    });
                    fCanvas.add(rect);
                    // new this.fabric.Image.fromURL('https://lh3.googleusercontent.com/d/1ARkx2BM67iHCbUwGpFwwR8rWnjGy1wN6', function(oImg) {
                    //             // scale image down, and flip it, before adding it onto canvas
                    //             oImg.scale(0.5);//.set('flipX', true);
                    //             fCanvas.add(oImg);
                    //         });
                }
                if(obj){
                    fCanvas.add(obj);
                }
                fCanvas.renderAll();
                fCanvas.forEachObject((objs)=>{
                    objs.set({
                        cornerStrokeColor: 'red',
                        borderColor: 'red',
                        cornerSize: 12,
                        // padding: 10,
                        cornerStyle: 'circle',
                        borderDashArray: [3, 3]
                    });
                });
            }
        });

        let _clipboard = fabric.util.object;
        btnsC.forEach(btn=>{
            btn.onclick = ()=>{

                let v = btn.getAttribute('data-canvasCopyPaste');
    
                if(v=='copy'){
                    // fCanvas.getActiveObject().clone(function(cloned) {
                    //     _clipboard = cloned;
                    // });
                    fCanvas.getActiveObject().clone(function(cloned) {
                        _clipboard = cloned;
                    });
                    // _clipboard = .clone(fCanvas.getActiveObject());
                }else if(v=='paste'){
                    _clipboard.clone(function(clonedObj) {
                        fCanvas.discardActiveObject();
                        clonedObj.set({
                            left: clonedObj.left + 10,
                            top: clonedObj.top + 10,
                            evented: true,
                        });
                        if (clonedObj.type === 'activeSelection') {
                            // active selection needs a reference to the canvas.
                            clonedObj.canvas = fCanvas;
                            clonedObj.forEachObject(function(objs) {
                                fCanvas.add(objs);
                            });
                            // this should solve the unselectability
                            clonedObj.setCoords();
                        } else {
                            fCanvas.add(clonedObj);
                        }
                        _clipboard.top += 10;
                        _clipboard.left += 10;
                        fCanvas.setActiveObject(clonedObj);
                        fCanvas.requestRenderAll();
                    });
                }
            }
        })
        inputFile.onchange = (e)=>{
            let file = e.target.files[0];
            let imgResize = new ImageResizer(150,Infinity,false);
            // let namafileinput = 'gambar_soal'+new Date().getTime();
            if(file){
                imgResize.resizeImageToDataURL(file, async (mimeType, dataURL)=>{
                    let src = dataURL;//"https://lh3.googleusercontent.com/d/"+respon.data.idfile;
                    new fabric.Image.fromURL(src, function(oImg) {
                            oImg.scale(0.5);//.set('flipX', true);
                            fCanvas.add(oImg);
                        });
                })
            }
        }
        
        selesaiDesainCanvas.onclick=async(e)=>{
            fCanvas.discardActiveObject().requestRenderAll();
            const data = await this.uploadCanvasToPngNew(fCanvas);
            
            document.querySelector('[data-soalcanvas="pertanyaan"]').innerHTML = `<img src="${data}" class="img-fluid">`;
            
        }
    }
    
    validasiSoal(data){
        let bol = true ;
        let cek = Object.entries(data).filter(([k,v])=>['indikatorsoal','pertanyaan','materi','levelkognitif','ruanglingkup','jumlahsoalmenjodohkan'].includes(k) && v!=="");
        
        if(cek.length!==6){
            bol = false;
        }
            
            return bol;
    }
    async uploadCanvasToPng(canvas){
        let srcCanvas = canvas.toDataURL('png')
        /**
         * let param = src.replace(/^.*,/, '');
                let tipe = src.match(/^.*(?=;)/)[0];
         */
        let params = {
            action:'uploadFile',
            folder:'GAMBAR MENJODOHKAN',
            // subfolder:,
            // namafile:namafileinput.replace(/[^\w\s.-]/g, "_"),
            "namafile":'gambarmenjodohkan'+new Date().getTime()+'.png',
            "base64":srcCanvas.replace(/^.*,/, ''),//.replace(/^.*,/, '');
            "mimeType":srcCanvas.match(/^.*(?=;)/)[0],//dataURL.match(/^.*(?=;)/)[0],//
        }

        const respon = await this.banksoalservice.simpanImage(params);
        
        let src = new UrlImg(respon.idfile).urlImg;//"https://lh3.googleusercontent.com/d/"+respon.data.idfile;
        return src;
    }
    async uploadCanvasToPngNew(canvas){
        let srcCanvas = canvas.toDataURL('png')
        /**
         * let param = src.replace(/^.*,/, '');
                let tipe = src.match(/^.*(?=;)/)[0];
         */
        // let params = {
        //     action:'uploadFile',
        //     folder:'GAMBAR MENJODOHKAN',
        //     // subfolder:,
        //     // namafile:namafileinput.replace(/[^\w\s.-]/g, "_"),
        //     "namafile":'gambarmenjodohkan'+new Date().getTime()+'.png',
        //     "base64":srcCanvas.replace(/^.*,/, ''),//.replace(/^.*,/, '');
        //     "mimeType":srcCanvas.match(/^.*(?=;)/)[0],//dataURL.match(/^.*(?=;)/)[0],//
        // }
        let params = Object.assign({},this.praDesain.paramUploadGambar,{ subfolder: "GAMBAR MENJODOHKAN" });

        const respon = await this.banksoalservice.uploadGambarFromBase64(srcCanvas,params);
        
        let src = new UrlImg(respon.idfile).urlImg;//"https://lh3.googleusercontent.com/d/"+respon.data.idfile;
        return src;
    }
}