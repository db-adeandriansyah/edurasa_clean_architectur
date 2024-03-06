import { Modal } from "bootstrap";
import { CollectionsEdu,FormatTanggal, bodyModeScroll} from "../../entries/vendor";

export class ModalConfig extends Modal{
    constructor(idModal,ops,control={}){
        super(idModal,ops)
        this.modal = document.querySelector(idModal);
        this.createView = bodyModeScroll;
        this.control = control;
        this.service = null;
        this.callBind={};
        this.body = this.modal.querySelector(".modal-body");
        this.judul = this.modal.querySelector(".judulmodal");
        this.footerModal = this.modal.querySelector(".modal-footer");
        this.headerModal = this.modal.querySelector(".modal-header");
        this.widthDom = this.modal.querySelector(".widthmodal");
        this.buton = this.modal.querySelector('.button-footer');
        this.closeButon1 = this.modal.querySelector('#btnCloseModal')
        this.closeButon2 = this.modal.querySelector('#btnCloseModal2')
        this.orientation = 'portrait';
    }
    disabledClose(namemodal='modal1'){
        if(namemodal == 'modal1'){
            this.closeButon1.setAttribute('disabled',true);
        }else{
            this.closeButon2.setAttribute('disabled',true);
        }
    }
    enabledClose(namemodal='modal1'){
        if(namemodal == 'modal1'){
            this.closeButon1.removeAttribute('disabled');
        }else{
            this.closeButon2.removeAttribute('disabled');
        }
    }
    configService(service){
        this.service = service;
    }
    init(judulModal='Judul Modal',bodyModal="Ini Body Modal",buttonTitle="Selanjutnya",hiddenfooter=true){
        this.judul.innerHTML = judulModal;
        this.body.innerHTML = bodyModal;
        this.buton.innerHTML = buttonTitle;
        // footerModal.innerHTML = footer;
        // this.footerModal.classList.add('justify-content-end');
        if(hiddenfooter){
            this.footerModal.classList.add('d-none')
        }else{
            this.footerModal.classList.remove('d-none')

        }
        // return this;
    }
    hiddenFooter(hiddenfooter = true){
        if(hiddenfooter){
            this.footerModal.classList.add('d-none')
        }else{
            this.footerModal.classList.remove('d-none')

        }
    }
    bodyScorallabel(scrollable=false){
        if(scrollable){
            if(!this.widthDom.classList.contains('modal-dialog-scrollable')){
                this.widthDom.classList.add('modal-dialog-scrollable');
            };
            if(!this.body.classList.contains('pt-0')){
                this.body.classList.add('pt-0');
            } 
        }else{
            this.widthDom.classList.remove('modal-dialog-scrollable');
            if(this.body.classList.contains('pt-0')){
                this.body.classList.remove('pt-0');
            }
        }
    }
    settingHeder(html){
        this.judul.innerHTML = html;
    }
    
    showHideFooter(showFooter=true){
        if(showFooter){
            this.footerModal.classList.remove('d-none')
        }else{
            this.footerModal.classList.add('d-none')
        }
    }
    
    showBody(html){
        this.body.innerHTML = this.createView.build(html);
    }
    
    showBodyHtml(html){
        this.body.innerHTML = html;
    }
    widthOrientation(large=true){
        this.orientation = 'landscape';
        if(large){
            this.orientation = 'landscape';
            if(this.widthDom.classList.contains('modal-lg')){
                this.widthDom.classList.remove('modal-lg');
                this.widthDom.classList.add('modal-xl');
            }
        }else{
            this.orientation = 'portrait'
            if(this.widthDom.classList.contains('modal-xl')){
                this.widthDom.classList.remove('modal-xl');
                this.widthDom.classList.add('modal-lg');
            }
        }
    }
    showBodyPrintable(data){
        // const {html,toggleTo='#modalAuto',title="Edurasa"} = data
        const {html,toggleTo,title} = data
        let res = "";
    
        res+=`<div id="print-area-modal">`;
            res+=html;
        res+=`</div>`;
        res+=`<div class="fixed-bottom text-center mb-3">`;
            //back
            res+=`<button data-bs-target="${toggleTo}" data-bs-toggle="modal" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" id="btnkembali" title="Kembali"><i class="bi-arrow-return-left"></i></button>`;
            //prrint
            res +=`<button id="btncetaknaskah" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Cetak"><i class="bi-printer"></i></button>`;
            //word
            res +=`<button id="btncetakword" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Simpan ke Ms. Word"><i class="bi-file-word"></i></button>`
            //pdf
            res +=`<button id="btncetakpdf" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Simpan ke pdf"><i class="bi-file-pdf"></i></button>`
            //excel
            res +=`<button id="btncetakexcel" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="Simpan ke Ms. Excel"><i class="bi-file-excel"></i></button>`


        res+=`</div>`;

        this.showHideFooter(false);
        
        this.body.innerHTML = res;;
        this.eventModalControl(title);
    }
    showBodyNextStep(html){
        
        let res="";
        res+=`<div id="print-area-modal">`;
            res+=html;
        res+=`</div>`;
        res+=`<div class="sticky-bottom text-end mb-1">`;
                //next
                // res+=`<button data-bs-target="${toggleTo}" data-bs-toggle="modal" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" id="btnkembali" title="Kembali"><i class="bi-arrow-return-right"></i></button>`;
                res+=`<button id="btn-modal-nextstep"  class="btn btn-sm border-bottom border-5 shadow-lg border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="berikutnya"><i class="bi-arrow-return-right"></i>Berikutnya</button>`;
            
        res+=`</div>`;
        this.showHideFooter(false);
        
        this.body.innerHTML = res;
    }

    showBodySaveButton(html){
        
        let res="";
        res+=`<div id="print-area-modal">`;
            res+=html;
        res+=`</div>`;
        res+=`<div class="sticky-bottom text-center mb-1">`;
                //next
                // res+=`<button data-bs-target="${toggleTo}" data-bs-toggle="modal" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" id="btnkembali" title="Kembali"><i class="bi-arrow-return-right"></i></button>`;
                res+=`<button id="btn-modal-savebutton"  class="btn btn-sm border-bottom border-5 shadow-lg border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="berikutnya"><i class="bi-floppy"></i> Simpan</button>`;
            
        res+=`</div>`;
        this.showHideFooter(false);
        
        this.body.innerHTML = res;
    }

    showBodyPreviousStep(html,btnaction){
        let res="";
        res+=`<div id="print-area-modal">`;
            res+=html;
        res+=`</div>`;
        res+=`<div class="sticky-bottom d-flex justify-content-evenly mb-1">`;
                //next
                // res+=`<button data-bs-target="${toggleTo}" data-bs-toggle="modal" class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" id="btnkembali" title="Kembali"><i class="bi-arrow-return-right"></i></button>`;
                res+=`<button id="btn-modal-previousstep"  class="btn btn-sm border-bottom border-5 shadow-lg border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="berikutnya"><i class="bi-arrow-return-left"></i>Kembali</button>`;
                res+=btnaction??`<button id="btn-modal-action"  class="btn btn-sm border-bottom border-5 shadow-lg border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" title="berikutnya"><i class="bi-floppy"></i>Simpan</button>`;
            
        res+=`</div>`;
        this.showHideFooter(false);
        
        this.body.innerHTML = res;
        
    
            
    }
    
    showFooter(html){
        this.showHideFooter(true);
        this.footerModal.classList.remove('justify-content-end');
        this.footerModal.classList.add('justify-content-center','flex-column','accord-bg');
        this.footerModal.innerHTML = html;
    }
    resetFooter(mainModal=true){
        this.footerModal.classList.remove('justify-content-center','flex-column','accord-bg');
        let html =`<button class="btn btn-sm py-0 btn-secondary rounded-pill button-footer" data-bs-target="#modalAuto" data-bs-toggle="modal">⇦ Kembali</button>`;
        if(mainModal){
            this.footerModal.classList.remove('justify-content-end');
            this.footerModal.classList.add('justify-content-start');
            this.footerModal.innerHTML = html;
        }else{
            this.footerModal.classList.remove('justify-content-start');
            this.footerModal.classList.add('justify-content-end');
            html=`<button class="btn btn-sm py-0 btn-secondary rounded-pill button-footer" data-bs-target="#modalAuto2" data-bs-toggle="modal" id="modalBackButton">Berikutnya ⇨ </button>`;
            this.footerModal.innerHTML = html;
        }
    }
    validatesiswa(data){
        let datavalidate = {};
        Object.entries(data).forEach(([k,v])=>{
            if(this.service.valuKeySiswa[k]){
                // cek.push(k);
                datavalidate[k] = v
            }else{
                // cekgada.push(k);
            }
        });
        return datavalidate;
    }
    eventModal(){
        let objekDataSiswa = arguments[0];
        // const Modal = this.Modal;
        const selectStatus = document.getElementById('frm-status');
        const divChange = document.getElementById('kolomtambahan');
        const inputRombel = document.getElementById('form-nama_rombel');
        const inputJenjang = document.getElementById('frm-jenjang');
        const uploadBtn = document.querySelectorAll('[data-uploaddokumen]');
        
        selectStatus.onchange= (e)=>{
            let ops = e.target.options;
            let selected = e.target.selectedIndex;
            let val = ops[selected].value;
            let text = ops[selected].text;
            
            if(val == "lulus"){
                divChange.innerHTML = this.createView.modeLulus(objekDataSiswa);
            }else if(val =="pindah"){
                divChange.innerHTML = this.createView.modePindah(objekDataSiswa,FormatTanggal);
            }else{
                divChange.innerHTML = "";
            }
        }

        inputRombel.addEventListener('input',(e)=>inputJenjang.value = isNaN(parseInt(e.target.value))?"":parseInt(e.target.value));
        uploadBtn.forEach(el=>{
            el.onchange = async(e)=>{
                const namaSiswa = document.getElementById('frm-pd_nama').value;
                const namakelas = document.getElementById('form-nama_rombel').value;
                if(namaSiswa==""||namakelas==""){
                    alert('Nama Siswa atau Nama Rombel tidak boleh kosong!');
                    return;
                }

                let files = e.target.files[0];
                let parent = e.target.parentElement;
                let domPreview = parent.querySelector('[data-uripreview]');
                let fokuslabel = e.target.getAttribute('data-labelname');
                let idTarget = e.target.getAttribute('data-uploaddokumen');
                let inputTarget = document.getElementById('frm-'+idTarget);
                
                if(files){
                    let propertiImageController ={
                        subfolder:objekDataSiswa.pd_nama,
                        namafile:idTarget
                    }
                
                    await this.service.saveDokumenPribadiSiswa(files,propertiImageController,(idfile)=>{
                        inputTarget.value = idfile;
                
                        if(!domPreview){
                            this.createView.updateUploadResponse(parent,idfile,'frm-'+idTarget,fokuslabel);
                            this.eventModal(objekDataSiswa);
                        }else{
                            domPreview.setAttribute('data-uriPreview',`https://drive.google.com/file/d/${idfile}/preview`);
                        }
                    });
                }
            }
        });

        const allPreviewUpload = document.querySelectorAll('[data-uriPreview]');
        allPreviewUpload.forEach(el=>{
            el.onclick = (e)=>{
                let keterangan = e.target.getAttribute('data-fokusUri');
                let url = e.target.getAttribute('data-uriPreview');
                let btn = document.getElementById('btn_rotate');
                btn.innerHTML = "Rotate "+ keterangan;
                let iframing = document.getElementById('iframePreviewUpload');
                iframing.src = url;
                iframing.onload = (e)=>{
                    let countr = 0;
                    btn.onclick = ()=>{
                        if(countr == 360){
                            countr = 0;
                        }else{
                            countr +=90;
                        }
                        iframing.setAttribute('style',`transform: rotate(${countr}deg);`);
                    }

                };
            }
        });

        let btnSave =document.getElementById('btnSimpanUpdateDbSiswa');
        btnSave.onclick = async ()=>{
            const allDataChange = document.querySelectorAll('[data-updatedbsiswa]');
            let data ={};
            allDataChange.forEach(el=>{
                let key = el.getAttribute('data-updatedbsiswa');
                data[key] = el.value;
            });
            let cek = [];
            let cekgada = [];
            Object.entries(data).forEach(([k,v])=>{
                if(this.service.valuKeySiswa[k]){
                    cek.push(k);
                }else{
                    cekgada.push(k);
                }
            });
            let dataAsignA = Object.assign({},objekDataSiswa,data);
            let dataAsign = this.validatesiswa(dataAsignA);
            let newData = new CollectionsEdu([dataAsign]).updatePropertyValues(this.service.arLabel.keyTgl,(v)=>v==""?"":new FormatTanggal(v).valueInputDate());
            let response = await this.service.updateSingleDataSiswa(newData.data[0]);
            
            this.service.refreshDbSiswa(response.final);
            this.hide();
            arguments[1]();
            // if(arguments[1].length>0){
            //     // this.callBind = arguments[1][0];
            //     // let parameters = [...arguments[1]].filter((s,index)=> index>0);//seleain
            //     // this.callBind.apply(parameters)
            //     // let fokusmethodEventIni = arguments[1][0];
            //     // let parameters = [...arguments[1]].filter((s,index)=> index>0);//seleain
            //     // this.callBind.apply(fokusmethodEventIni,[parameters]);
            //     // this[fokusmethodEventIni].apply(fokusmethodEventIni,[...parameters]);
            //     // this.apply(fokusmethodEventIni,[...parameters]);
            // }else{
            //     const btn = document.querySelector('#btnsearch');
            //     btn.dispatchEvent(new Event('click'));
            // }
        }
    }
    eventModalAddNew(){
        let objekDataSiswa = arguments[0];
        // const Modal = this.Modal;
        const selectStatus = document.getElementById('frm-status');
        const divChange = document.getElementById('kolomtambahan');
        const inputRombel = document.getElementById('form-nama_rombel');
        const inputJenjang = document.getElementById('frm-jenjang');
        const uploadBtn = document.querySelectorAll('[data-uploaddokumen]');
        
        selectStatus.onchange= (e)=>{
            let ops = e.target.options;
            let selected = e.target.selectedIndex;
            let val = ops[selected].value;
            let text = ops[selected].text;
            
            if(val == "lulus"){
                divChange.innerHTML = this.createView.modeLulus(objekDataSiswa);
            }else if(val =="pindah"){
                divChange.innerHTML = this.createView.modePindah(objekDataSiswa,FormatTanggal);
            }else{
                divChange.innerHTML = "";
            }
        }

        inputRombel.addEventListener('input',(e)=>inputJenjang.value = isNaN(parseInt(e.target.value))?"":parseInt(e.target.value));
        uploadBtn.forEach(el=>{
            el.onchange = async(e)=>{
                const namaSiswa = document.getElementById('frm-pd_nama').value;
                const namakelas = document.getElementById('form-nama_rombel').value;
                if(namaSiswa==""||namakelas==""){
                    alert('Nama Siswa atau Nama Rombel tidak boleh kosong!');
                    return;
                }

                let files = e.target.files[0];
                let parent = e.target.parentElement;
                let domPreview = parent.querySelector('[data-uripreview]');
                let fokuslabel = e.target.getAttribute('data-labelname');
                let idTarget = e.target.getAttribute('data-uploaddokumen');
                let inputTarget = document.getElementById('frm-'+idTarget);
                
                if(files){
                    let propertiImageController ={
                        subfolder:objekDataSiswa.pd_nama,
                        namafile:idTarget
                    }
                
                    await this.service.saveDokumenPribadiSiswa(files,propertiImageController,(idfile)=>{
                        inputTarget.value = idfile;
                
                        if(!domPreview){
                            this.createView.updateUploadResponse(parent,idfile,'frm-'+idTarget,fokuslabel);
                            this.eventModal(objekDataSiswa);
                        }else{
                            domPreview.setAttribute('data-uriPreview',`https://drive.google.com/file/d/${idfile}/preview`);
                        }
                    });
                }
            }
        });

        const allPreviewUpload = document.querySelectorAll('[data-uriPreview]');
        allPreviewUpload.forEach(el=>{
            el.onclick = (e)=>{
                let keterangan = e.target.getAttribute('data-fokusUri');
                let url = e.target.getAttribute('data-uriPreview');
                let btn = document.getElementById('btn_rotate');
                btn.innerHTML = "Rotate "+ keterangan;
                let iframing = document.getElementById('iframePreviewUpload');
                iframing.src = url;
                iframing.onload = (e)=>{
                    let countr = 0;
                    btn.onclick = ()=>{
                        if(countr == 360){
                            countr = 0;
                        }else{
                            countr +=90;
                        }
                        iframing.setAttribute('style',`transform: rotate(${countr}deg);`);
                    }

                };
            }
        });

        let btnSave =document.getElementById('btnSimpanUpdateDbSiswa');
        btnSave.onclick = async ()=>{
            const allDataChange = document.querySelectorAll('[data-updatedbsiswa]');
            let data ={};
            allDataChange.forEach(el=>{
                let key = el.getAttribute('data-updatedbsiswa');
                data[key] = el.value;
            });
            let cek = [];
            let cekgada = [];
            Object.entries(data).forEach(([k,v])=>{
                if(this.service.valuKeySiswa[k]){
                    cek.push(k);
                }else{
                    cekgada.push(k);
                }
            });
            let dataAsignA = Object.assign({},objekDataSiswa,data);
            let dataAsign = this.validatesiswa(dataAsignA);
            let newData = new CollectionsEdu([dataAsign]).updatePropertyValues(this.service.arLabel.keyTgl,(v)=>v==""?"":new FormatTanggal(v).valueInputDate());
            let response = await this.service.addSingleDataSiswa(newData.data[0]);
            
            this.service.refreshDbSiswa(response.data);
            this.hide();
            arguments[0]();
            
        }
    }
    eventModalControl(title){
        const print = document.getElementById("btncetaknaskah");
        const word  = document.getElementById("btncetakword");
        const excel = document.getElementById("btncetakexcel");
        const pdf = document.getElementById("btncetakpdf");
        
        print.onclick = ()=>{
            let dom = document.getElementById('print-area-modal');
            if(this.orientation=='portrait'){
                this.control.printPortraitDom(dom);
            }else{
                this.control.printLandscapeDom(dom);
            }
        }
        
        word.onclick = ()=>{
            let dom = document.getElementById('print-area-modal');
            if(this.orientation=='portrait'){
                this.control.wordPortraitDom(title,dom);
            }else{
                this.control.wordLandscapeDom(title,dom);
            }
        }

        excel.onclick = ()=>{
            let dom = document.getElementById('print-area-modal');
            if(!dom.querySelector('.toExcel')){
                alert ('tidak ada yang bisa diexport ke Ms. Excel');
                return;
            }
            this.control.excelDom(dom,'.toExcel','Export '+title);// parameter(dom,queryTabel,title='Export Excel')
        }

        pdf.onclick = ()=>{
            let dom = document.getElementById('print-area-modal');
            if(this.orientation=='portrait'){
                this.control.pdfPortraitDom(dom,title);
            }else{
                this.control.pdfLandscapeDom(dom,title);
            }
        }

    }


}