import { canvasEditor, previewSoalWithProperty, tabelResultCanvasEditor } from "../controller_features/banksoal/viewBankSoal";
import { CanvasFabricEditor } from "../controller_features/editor/CavasFabricEditor";
import { FormulirBankSoal } from "../controller_features/editor/FormulirBankSoal";
import controlbanksoal from "../views/banksoal/controlBankSoal";
import Facades from "./Facades";
import FormulirSoalEditor from "./facadeEditor/FormulirSoalEditor";
import PgKompleksEditor from "./facadeEditor/PgKompleksEditor";
import TextEditorSoal from "./facadeEditor/TextEditorSoal";

export default class BankSoalFacades extends Facades{
    constructor(service, Auth,domain,needData,urlImg){
        super(service, Auth,domain);
        this.praDesain = needData;
        this.needData = needData;
        this.UrlImg = urlImg;
        this.workplace = document.getElementById('printarea');
        this.textEditor=null
    }
    registerEventToolBar(q){
        const elemenPraDesain = document.querySelectorAll(`[${q}]`);
        const needData = this.needData;
        elemenPraDesain.forEach(element=>{
            let key= element.getAttribute(q);
            if(element.type=='radio' && element.checked){
                this.praDesain[key] = element.value;
                if(key == 'bentuksoal'){
                    this.praDesain['editor'] = element.getAttribute('data-editorinput');
                }

            }else if(element.type=='select-one'){
                this.praDesain[key] = element.value;
                this.praDesain['tekskodemapel']=this.praDesain.koleksimapel[element.value];
                this.praDesain['lingkupmateri']=this.praDesain.ormkurikulum.filter(s=>s.kodemapel == element.value)[0].ruanglingkup;
            };

            element.onchange = (e)=>{
                this.praDesain[key] = element.value;

                if(key == 'kodemapel'){
                    let divwrap = document.getElementById('resultefekpilihmapel');
                    let html = controlbanksoal.menuPilihPropertiKurikulum(needData.shortKurikulum,needData.kurikulum.simpleFilter({'kodemapel':e.target.value}).data)
                    divwrap.innerHTML = html;
                    this.praDesain['tekskodemapel']=this.praDesain.koleksimapel[e.target.value];
                    this.praDesain['lingkupmateri']=this.praDesain.ormkurikulum.filter(s=>s.kodemapel == e.target.value)[0].ruanglingkup;;
                    this.registerEventToolBar(q);   
                }
                if(key == 'bentuksoal'){
                    this.praDesain['editor'] = e.target.getAttribute('data-editorinput');
                }
                this.displayInputCreateItemSoal();

            }

        });
        
        this.displayInputCreateItemSoal();
    }

    displayInputCreateItemSoal(){
        const pradesain = this.praDesain;
        console.log('pradesain displayInputCreateItemSoal', pradesain);
        let divMode = document.getElementById('modecanvas');
        
        if(pradesain.mode =='bycopast' && pradesain.editor == 'editor'){
            this.workplace.innerHTML = controlbanksoal.templateCreatePerItemBankSoal();
            this.createTextEditor(pradesain);
            divMode.classList.remove('d-none');
        }else if(pradesain.mode =='formulir' && pradesain.editor == 'editor'){
            this.workplace.innerHTML = controlbanksoal.templateCreatePerItemBankSoal();
            divMode.classList.remove('d-none');
            // let te = new FormulirBankSoal(pradesain,this.service);
            let te = new FormulirSoalEditor(pradesain,this.service,'divTextEditor',this.user.barloading,this.UrlImg);
            te.imageLoading = this.user.barloading;
            te.createForm();
            te.addRespons(this.respontekseditor.bind(this));
            te.init()
            
        }else if(pradesain.mode =='bycopast' && pradesain.editor == 'canvas'){
            this.workplace.innerHTML = controlbanksoal.templateCreatePerItemBankSoal();
            divMode.classList.add('d-none');
            this.createCanvas(pradesain);
        }else if(pradesain.editor == 'editorpgkompleks'){
            this.workplace.innerHTML = controlbanksoal.templateCreatePerItemBankSoal();
            divMode.classList.add('d-none');
            // let editorPgKompleks = new PgKompleksEditor(pradesain,'#divTextEditor',this.user.barloading,this.UrlImg,controlbanksoal,'editorcustom');
            let editorPgKompleks = new PgKompleksEditor(pradesain,this.service,'divTextEditor',this.user.barloading,this.UrlImg,controlbanksoal);
            editorPgKompleks.addRespons(this.responPgKompleks.bind(this));
            editorPgKompleks.init();
        }else{
            divMode.classList.remove('d-none');
            this.workplace.innerHTML = "";//controlbanksoal.templateCreatePerItemBankSoal();

        }
    }
    createCanvas(pradesain){
        let lingkupmateri = this.service.data.lingkupmateri.filter(s=> s.kodemapel == pradesain.kodemapel);
        
        document.getElementById('divTextEditor').innerHTML = canvasEditor();
        document.getElementById('realtimeInputTextEditor').innerHTML = tabelResultCanvasEditor(lingkupmateri);

        let desainCanvas = new CanvasFabricEditor(this.service,pradesain);
        
        desainCanvas.initialization();

        this.respontekseditor(desainCanvas.data.bind(desainCanvas));
    }

    createTextEditor(pradesain){
        this.textEditor = new TextEditorSoal(pradesain,'#divTextEditor',this.user.barloading,this.UrlImg,'editorcustom')
        .addService(this.service)
        .addRespons(this.respontekseditor.bind(this))
        .init();
    }

    validasiSoal(data){
        let bol = true ;
            
        if(data.bentuksoal === 'Pilihan Ganda'){
            let cek = Object.entries(data).filter(([k,v])=>['indikatorsoal','pertanyaan','opsiA','opsiB','opsiC','materi','levelkognitif','ruanglingkup','kuncijawaban','penskoran'].includes(k) && v!=="");
            if(cek.length!==10){
                bol = false;
            }
            // bol=cek
        }else if(data.bentuksoal === 'Menjodohkan'){
            let cek = Object.entries(data).filter(([k,v])=>['indikatorsoal','pertanyaan','materi','levelkognitif','ruanglingkup','jumlahsoalmenjodohkan'].includes(k) && v!=="");
            if(cek.length!==6){
                bol = false;
            }
            // bol=cek
        }else{
            let cek = Object.entries(data).filter(([k,v])=>['indikatorsoal','pertanyaan','materi','levelkognitif','ruanglingkup','penskoran'].includes(k)&& v!=="");
            
            if(cek.length!==6){
                bol = false;
            }
            
        }
        
        return bol; 
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
        console.log('data respon teksEditor', data)
        this.markerContext(data);
        
        let simpan = document.getElementById('simpanItemSoal');
        let reset = document.getElementById('resetItemSoal')
        
        simpan.onclick = async ()=>{
            if (typeof dataFunction === 'function') {
                data = dataFunction();
            }
            
            let domain = new this.domain(data).sanitize().data;
            let paramAwal = this.needData.paramTabBanksoal;
            let validasiSoal = this.validasiSoal(domain);
            
            if(validasiSoal){
                let conf = confirm('Anda yakin?');
                
                if(!conf) return;

                await this.service.simpanItemSoal(domain,paramAwal);
                
                Object.keys(data).filter(s=>['ilustrasi','pertanyaan','penskoran','opsiA','opsiB','opsiC','opsiD','ruanglingkup','kuncijawaban','levelkognitif','materi','refrensi'].includes(s)).forEach(k=>{
                    data[k]="";
                });
                
                this.markerContext(data);
            }else{
                alert('Ada yang belum terisi, periksa!')
            }
        }
        reset.onclick = ()=>{
            Object.keys(data).filter(s=>['ilustrasi','pertanyaan','penskoran','opsiA','opsiB','opsiC','opsiD','ruanglingkup','kuncijawaban','levelkognitif','materi','refrensi'].includes(s)).forEach(k=>{
                    data[k]="";
            });
            this.markerContext(data);
        }
    }
    responPgKompleks(data){
        console.log('repon pg Kompleks',data);
        let teksInptu = document.getElementById('sorotUpdate_tampilansoal');
        
        if(teksInptu){
            teksInptu.innerHTML = previewSoalWithProperty(data);
        }
    }
}