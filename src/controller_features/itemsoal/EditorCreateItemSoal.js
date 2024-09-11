import FormulirSoalEditor from "../../facades/facadeEditor/FormulirSoalEditor";
import PgKompleksEditor from "../../facades/facadeEditor/PgKompleksEditor";
import TextEditorSoal from "../../facades/facadeEditor/TextEditorSoal";
import { canvasEditor, previewBentukSoal, previewSoalWithProperty, propertiItemSoal, tabelResultCanvasEditor } from "../banksoal/viewBankSoal";
import { CanvasFabricEditor } from "../editor/CavasFabricEditor";



/**
 * Class yang bertugas menyediakan editor (tekseditor, formulir, canvas) berdasarkan paramater yang diberikan
 */
export default class EditorCreateItemSoal{ //BuilderPattern
    #praDesain;
    #queryTarget;
    #load;
    #user;
    #UrlImg;
    #idiframe;
    #workplace;
    #controlBankSoal;
    #service;
    constructor(){
        this.callback = null;
        this.response = {};
    }

    workplace(x){
        this.#workplace = x;
        return this;
    }
    praDesain(x){
        this.#praDesain = x;
        return this;
    }
    
    queryTarget(x){
        this.#queryTarget = x;
        return this;

    };
    load(x){
        this.#load= x;
        return this;
    }
    urlImg(x){
        this.#UrlImg = x;
        return this;
    }
    idiframe(x){
        this.#idiframe =x;
        return this;
    }
    view(x){
        this.#controlBankSoal = x;
        return this;
    }
    auth(x){
        this.#user = x;
        return this;
    }
    service(x){
        this.#service = x;
        return this;
    }
    build(){
        
        const pradesain = this.#praDesain;
        const controlbanksoal = this.#controlBankSoal;
        const workplace = this.#workplace;
        if(pradesain.mode =='bycopast' && pradesain.editor == 'editor'){
            workplace.innerHTML = controlbanksoal.templateCreatePerItemBankSoal();

            new TextEditorSoal(pradesain,'#divTextEditor',this.#user.barloading,this.#UrlImg,'editorcustom')
                .addService(this.#service)
                .addRespons(this.respontekseditor.bind(this))
                .init();
        }else if(pradesain.mode =='formulir' && pradesain.editor == 'editor'){
            workplace.innerHTML = controlbanksoal.templateCreatePerItemBankSoal();
            
            let te = new FormulirSoalEditor(pradesain,this.#service,'divTextEditor',this.#user.barloading,this.#UrlImg);
            te.imageLoading = this.#user.barloading;
            te.createForm();
            te.addRespons(this.respontekseditor.bind(this));
            te.init()
            
        // }else if(pradesain.mode =='formulir' && pradesain.editor == 'modal'){
            
        //     workplace.innerHTML = ''
        //     let areaedit = new FormulirBankSoal(pradesain,this.#service);
        //     areaedit.div = document.getElementById('editsoaleditorwraper');
        //     areaedit.imageLoading = this.#user.barloading;
        //     areaedit.createFormEdit();
        //     areaedit.addRespons(this.respontekseditorEdit.bind(this));
        //     areaedit.initEdit()
            
        }else if(pradesain.mode =='bycopast' && pradesain.editor == 'canvas'){
            workplace.innerHTML = controlbanksoal.templateCreatePerItemBankSoal();
            let lingkupmateri = this.#service.data.lingkupmateri.filter(s=> s.kodemapel == pradesain.kodemapel);
        
            document.getElementById('divTextEditor').innerHTML = canvasEditor();
            document.getElementById('realtimeInputTextEditor').innerHTML = tabelResultCanvasEditor(lingkupmateri);
    
            let desainCanvas = new CanvasFabricEditor(this.#service,pradesain);
            desainCanvas.addRespons(this.respontekseditor.bind(this))
            desainCanvas.eventCanvas();
        }else if(pradesain.editor == 'editorpgkompleks'){
            
            workplace.innerHTML =controlbanksoal.templateCreatePerItemBankSoal();
            
            let editorPgKompleks = new PgKompleksEditor(pradesain,this.#service,'divTextEditor',this.#user.barloading,this.#UrlImg,controlbanksoal);
            editorPgKompleks.addRespons(this.respontekseditor.bind(this));
            editorPgKompleks.init();
        }else{
            workplace.innerHTML = '';
        }
       
        return this;
    }
    markerContext(data){
        Object.entries(data).forEach(([k,v])=>{
            if(k=='kuncijawaban'){
                let cariDoms = document.querySelectorAll(`[data-aksicontext="${k}Abjad"]`);
                cariDoms.forEach(cariDom=>{
                    if(v == cariDom.innerHTML){
                        cariDom.classList.add('bg-info-subtle')
                        cariDom.parentElement.parentElement.parentElement.classList.remove('bg-secondary-subtle');
                        cariDom.parentElement.parentElement.parentElement.classList.add('bg-info-subtle')
                    }else if(v==""){
                        cariDom.classList.remove('bg-info-subtle');
                        cariDom.classList.add('bg-secondary-subtle');
                        cariDom.parentElement.parentElement.parentElement.classList.add('bg-secondary-subtle')
                        cariDom.parentElement.parentElement.parentElement.classList.remove('bg-info-subtle')
                    }else{
                        cariDom.classList.remove('bg-info-subtle');
                    }
                })
            }else if(k=='ruanglingkup'){
                let cariDoms = document.querySelectorAll(`[data-aksicontext="lingkupmateri"]`);
                cariDoms.forEach(cariDom=>{
                    if(v == cariDom.innerHTML){
                        cariDom.classList.add('bg-info-subtle')
                        cariDom.parentElement.parentElement.parentElement.classList.remove('bg-info-subtle')
                        cariDom.parentElement.parentElement.parentElement.classList.add('bg-info-subtle')
                    }else if(v==""){
                        cariDom.classList.remove('bg-info-subtle')
                        cariDom.classList.add('bg-secondary-subtle')
                        cariDom.parentElement.parentElement.parentElement.classList.add('bg-secondary-subtle')
                        cariDom.parentElement.parentElement.parentElement.classList.remove('bg-info-subtle')
                    }else{
                        cariDom.classList.remove('bg-info-subtle')
                        
                    }
                })
            }else{
                let cariDoms = document.querySelectorAll(`[data-aksicontext="${k}"]`);
                cariDoms.forEach(cariDom=>{
                    
                    if(cariDom){
                        if(v!==""){
                            if(cariDom.classList.contains('bg-secondary-subtle')){
                                cariDom.classList.remove('bg-secondary-subtle')
                                cariDom.classList.add('bg-info-subtle')
                            }else{
                                if(['opsiA','opsiB','opsiC','opsiD'].includes(k)){
                                    cariDom.classList.add('bg-info-subtle');
                                    cariDom.classList.remove('bg-secondary-subtle');
                                    cariDom.parentElement.parentElement.parentElement.classList.remove('bg-secondary-subtle')
                                    cariDom.parentElement.parentElement.parentElement.classList.add('bg-info-subtle')
                                    
                                }
                            }
        
                        }else{
                            
                            if(cariDom.classList.contains('bg-info-subtle')){
                                cariDom.classList.remove('bg-info-subtle')
                                cariDom.classList.add('bg-secondary-subtle')
                            }else{
                                if(['opsiA','opsiB','opsiC','opsiD'].includes(k)){
                                    cariDom.parentElement.parentElement.parentElement.classList.add('bg-secondary-subtle')
                                    cariDom.parentElement.parentElement.parentElement.classList.remove('bg-info-subtle')
                                    
                                }
                            }
                        }
                    }
                });
            }
        })
    }
    respontekseditor(dataFunction){
        let data = dataFunction;

        if (typeof dataFunction === 'function') {
            data = dataFunction();
        }
        
        let teksInptu = document.getElementById('sorotUpdate_tampilansoal');
        
        if(teksInptu){
            teksInptu.innerHTML = previewSoalWithProperty(data);
        }
        console.log('respon teks editor baru',data)
        this.markerContext(data);
        data.reset = ()=>{
            data.pertanyaan="";
            data.penskoran="";
            data.kuncijawaban="";
            data.opsiA="";
            data.opsiB="";
            data.opsiC="";
            data.kuncijawaban = "";
            data.ilustrasi = "";
            
            this.respontekseditor(data);
            
            
        }
        this.callback(data);
    }
    respontekseditorEdit(dataFunction){
        let data = dataFunction;

        if (typeof dataFunction === 'function') {
            data = dataFunction();
        }
        let inputandata = document.querySelector('#previewdata');
        let inputanpreview = document.querySelector('#previewsoaledit');
        inputandata.innerHTML = propertiItemSoal(data);
        inputanpreview.innerHTML = previewBentukSoal(data,false);
        console.log('respon teks editor edit',data)
        this.markerContext(data);
        data.reset = ()=>{
            data.pertanyaan="";
            data.penskoran="";
            data.kuncijawaban="";
            data.opsiA="";
            data.opsiB="";
            data.opsiC="";
            data.kuncijawaban = "";
            data.ilustrasi = "";
            
            this.respontekseditorEdit(data);
            
        }
        
        this.callback(data);
    }
    static fillEmptySoalEdit(targetDom){
        let inputan = targetDom.querySelectorAll('[data-keyformuliredit]');
        let inputandata = targetDom.querySelector('#previewdata');
        let inputanpreview = targetDom.querySelector('#previewsoaledit');
        
        inputan.forEach(n=>{
                
                if(n.nodeName == 'td'|| n.nodeName =='TD' ){
                    n.innerHTML = ""
                }else{
                    n.value = ""
                }
            });
            
            inputandata.innerHTML = "";
            inputanpreview.innerHTML = "";
            return this;
    }
    static fillItemSoalToEdit(soal,targetDom){
        //pindahkan tab;
        let inputan = targetDom.querySelectorAll('[data-keyformuliredit]');
        let inputandata = targetDom.querySelector('#previewdata');
        let inputanpreview = targetDom.querySelector('#previewsoaledit');
        
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
            return this;
    }
    runtime(callback){
        this.callback = callback
    }
}