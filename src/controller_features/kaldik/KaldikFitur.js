
import Kalender from "../../domains/Kalender";
import { FormatTanggal } from "../../utilities/FormatTanggal";
import { TableProperties } from "../../utilities/tableProperties";
import { cardKalender, wrapperCardKalender, wrapperKalender } from "../../views/kaldik/viewKaldik";
import { tableKalender } from "./tableKalender";
import { hariEfektif, hariEfektifbelajar, hariEfektifbelajarjam, htmlFormulirIsianKaldik, htmlTabelSettingKaldik, nameToHex } from "./viewKaldik";

export default class KaldikFitur{
    constructor(kaldikservice,ormKaldik, Modal, Modal1,currentUser,tooltipkan){
        this.kaldikservice = kaldikservice;
        this.ormKaldik = ormKaldik;
        this.Modal = Modal;
        this.Modal1 = Modal1;
        this.user = currentUser;
        this.tooltipkan = tooltipkan;
        this.workplace =document.getElementById('printarea');
        this.footerarea =document.getElementById('footerarea');
        this.maincontrol =document.getElementById('maincontrol');
        this.headerPage = '';
        this.relationalFitur = null;
    }
    
    init(){
        this.ormKaldik.init();
        return this;
    }

    addRelationalFitur(fitur){
        this.relationalFitur = fitur;
        return this;
    }
    
    show_tabel_setting(){
        let dataketerangan =  this.ormKaldik.dataKeteranganKaldik();
        
        this.workplace.innerHTML = this.headerPage + htmlTabelSettingKaldik(dataketerangan);
        this.register_event_button_tabel_setting(dataketerangan);

        let tb = new TableProperties(document.querySelector('#table_kalender'));
            tb.freezeColumn([1]);
            tb.addScrollUpDown();
    
        this.tooltipkan();
        
    }
        
    cekboolean(bol){
        if(typeof bol === 'boolean'){
            return bol;
        }else if(typeof bol == 'string'  || bol instanceof String){
            if(bol == 'TRUE' || bol =='true'){
                return true;
            }else{
                return false;
            }
        };
        
    }

    register_event_button_tabel_setting(data){
        const btns = document.querySelectorAll('[data-aksi]');
        
        btns.forEach(btn=>{
            btn.onclick = async(e)=>{
                let atr = btn.getAttribute('data-aksi');
                let dataId = btn.getAttribute('data-id');
                let dataketerangan = data.filter(s=>s.idbaris == dataId);
                let titleKalender = {
                    bulan:new Intl.DateTimeFormat(
                        'id-ID',
                        { month:'long'}).format(new Date()),
                    tahun:new Date().getFullYear()
                };
                
                if(atr == 'hapus'){
                    let conf = confirm('Anda yakin ingin menghapus kalender ini?');
                    
                    if(!conf) return;
                    let datasiap = new Kalender(dataketerangan[0]).sanitize().data;
                    datasiap.idbaris = dataketerangan[0].idbaris;
                    datasiap.hapus = 'hapus';
                    datasiap.aksi = 'hapus';
                    let cek = await this.kaldikservice.editKalender(datasiap)
                    
                    this.ormKaldik = this.ormKaldik.reInstansiance(cek.data);
                    
                    if(this.relationalFitur){
                        this.relationalFitur.ormKaldik = this.ormKaldik.init();
                    }
                    dataketerangan =  this.ormKaldik.dataKeteranganKaldik();
                    this.show_tabel_setting();
                    return;

                }
                if(dataketerangan.length>0){
                    titleKalender = {
                        bulan:new Intl.DateTimeFormat(
                            'id-ID',
                            { month:'long'}).format(new Date(dataketerangan[0].start_tgl)),
                        tahun:new Date(dataketerangan[0].end_tgl).getFullYear()
                    };
                }
                // let view = contenModalTambahKaldik()
                let view = htmlFormulirIsianKaldik(titleKalender)
                this.Modal.settingHeder(atr.toUpperCase());
                // this.Modal.showBodyHtml(view);
                // this.Modal.showHideFooter(false);
                this.Modal.showBodySaveButton(view);
                this.Modal.show();
                this.event_formulirKeteranganKalender(dataketerangan);
                this.event_element_formulirKeteranganKalender(dataketerangan,'Modal');
                
            }
        })
    }
    event_formulirKeteranganKalender(dataketerangan){
        let doms = document.getElementById('previewkalendereditable');
        if(dataketerangan.length>0){
            doms.innerHTML = "";
            
            let tb = this.createSingleKalender(dataketerangan[0].start_tgl,dataketerangan[0].end_tgl,dataketerangan[0].valueinput_strt_tgl);//
            
            tb.createTable(doms);
            tb.fillDate('tabelkalender');
            tb.addKeteranganOnKalender(doms,'tabelkalender');
            
            let dataisian = document.querySelectorAll('[data-api]');
            
            dataisian.forEach(n=>{
                let atr = n.getAttribute('data-api');
                if(n.type == 'date'){
                    n.value = new FormatTanggal(dataketerangan[0][atr]).valueInputDate();
                }else if(n.type =='checkbox'){
                    if(dataketerangan[0][atr]){
                        n.checked = true;
                    }
                }else if(n.type =='radio'){
                    if(this.cekboolean(n.value) == dataketerangan[0][atr]){
                        n.checked = true;
                    };
                }else if(n.type == 'color'){
                    if(dataketerangan[0][atr].indexOf('#')>-1){
                        n.value = dataketerangan[0][atr];
                    }else{
                        n.value = nameToHex(dataketerangan[0][atr]);
                    }
                }else{
                    n.value = dataketerangan[0][atr];
                }
            });
            this.event_element_markedCell(dataketerangan[0].idbaris);
        }else{
            let tb = this.createSingleKalender(new Date(),new Date(),new Date());//
            tb.createTable(doms);
            // doms.innerHTML = tb.stringTable().template.content.innerHTML;
            tb.fillDate('tabelkalender');
            tb.addKeteranganOnKalender(doms,'tabelkalender');
        }
    }
    event_element_formulirKeteranganKalender(dataketerangan,modal){
        const eventLiburTidak = document.querySelectorAll('[name="liburtidak"]');
        const eventEditTanggal = document.querySelectorAll('[data-api]');
        const btnSave = document.getElementById('btn-modal-savebutton');
        const EventEditing = [...Array.from(eventEditTanggal).filter(s=>['start_tgl','end_tgl','background-color','color'].includes(s.dataset.api))];
        
        eventLiburTidak.forEach(n=>{
            n.onchange = ()=>{
                if(n.checked){
                    let chkbox = document.querySelectorAll('[name="tidaklibur"]');
                    
                    if(!this.cekboolean(n.value)){
                        chkbox.forEach(nn=>{
                            let atrckbx = nn.getAttribute('data-api')
                            if(nn.hasAttribute('disabled')){
                                nn.removeAttribute('disabled');
                            }
                            if(dataketerangan.length>0){
                                nn.checked = this.cekboolean(dataketerangan[0][atrckbx])
                            }
                        });
                    }else{
                        chkbox.forEach(nn=>{
                            nn.setAttribute('disabled',true);
                            nn.checked = false;
                        });
                    }
                    
                }
            }
        });

        EventEditing.forEach(n=>{
            n.onchange = (e)=>{
                let atr = n.getAttribute('data-api');
                let ob = {};
                
                EventEditing.forEach(m=>{
                    let matr = m.getAttribute('data-api');
                    ob[matr] = m.value;
                });
                
                let doms = document.getElementById('previewkalendereditable');
                let header = document.querySelector('.title-header');
                let span = `<span>${new FormatTanggal(ob.start_tgl).MMMM()}</span><span>${new FormatTanggal(ob.start_tgl).YYYY()}</span>`;
                header.innerHTML = span;
                let tb = this.createSingleKalender(new Date(ob.start_tgl),new Date(ob.start_tgl),new Date(ob.start_tgl));//
                    tb.createTable(doms);
                    // doms.innerHTML = tb.stringTable().template.content.innerHTML;
                    tb.fillDate('tabelkalender');
                    tb.addKeteranganOnKalender(doms,'tabelkalender');
                this.show_event_kalender_modal(ob,dataketerangan)

            }
        });
        
        btnSave.onclick = async ()=>{
            let elementData = document.querySelectorAll('[data-api]');
            
            let obj = {};
            elementData.forEach(n=>{
                let atr = n.getAttribute('data-api');
                if(n.type == 'radio'){
                    if(n.checked){
                        obj[atr] = this.cekboolean(n.value)
                    }
                }else if(n.type == 'date'){
                    obj[atr] = new FormatTanggal(n.value).valueInputDate();
                }else if(n.type == 'checkbox'){
                    if(n.checked){
                        obj[atr] = true;
                    }else{
                        obj[atr] = false;
                    }
                }else{
                    obj[atr] = n.value
                }
            });
            
            let datasiap = new Kalender(obj).sanitize().data;
            
            this[modal].toggle();
            
            if(dataketerangan.length==0){
                datasiap.time_stamp = new FormatTanggal(new Date()).stringForDateTimeLocal();
                let cek = await this.kaldikservice.addKalender(datasiap);
                
                this.ormKaldik = this.ormKaldik.reInstansiance(this.kaldikservice.data);
                if(this.relationalFitur){
                    this.relationalFitur.ormKaldik = this.ormKaldik.init();
                }

            }else{
                datasiap.time_stamp = new FormatTanggal(new Date()).stringForDateTimeLocal();
                datasiap.idbaris = dataketerangan[0].idbaris;
                let cek = await this.kaldikservice.editKalender(datasiap)
                this.ormKaldik = this.ormKaldik.reInstansiance(this.kaldikservice.data);
                if(this.relationalFitur){
                    this.relationalFitur.ormKaldik = this.ormKaldik.init();
                }
            }
            dataketerangan = this.ormKaldik.dataKeteranganKaldik();
            this.show_tabel_setting();
        }
    }
    show_event_kalender_modal(objekChanged,currentEditable){
        const keterangankalender = this.ormKaldik.dataKeteranganKaldik();
        let tabel = document.getElementById('tabelpreviewModal');
        let qtabel = tabel.querySelectorAll('[data-tglstring]');
        let idKeteranganKaldik = 0;
        
        if(currentEditable.length>0){
            idKeteranganKaldik = currentEditable[0].idbaris;
        }
        let awal_tgl = parseInt(new FormatTanggal(objekChanged.start_tgl).stringYYYYMMDD());//objekChanged.start_tgl.toString().replaceAll('-','');
        let akhir_tgl = parseInt(new FormatTanggal(objekChanged.end_tgl).stringYYYYMMDD());//objekChanged.end_tgl.toString().replaceAll('-','');
        
        qtabel.forEach(n=>{
            let atr = n.getAttribute('data-tglstring');
            let inAtr = parseInt(atr);

            n.classList.remove('border-4');
            n.classList.remove('border-warning');
            let hasId = n.hasAttribute('data-hasid');
            let arrayIds = [];
            let arBgBefore  = [],arClBefore=[];
                
            if(hasId){  
                arrayIds = n.getAttribute('data-hasid').split(',').map(n=>parseInt(n));
                arrayIds.filter(s=>s!==idKeteranganKaldik).forEach(d=>{
                    let dDb = keterangankalender.filter(s=> s.idbaris == d)[0];
                    arBgBefore.push(dDb['background-color']);
                    arClBefore.push(dDb['color']);
                })
                
            }
            
            if(awal_tgl<=inAtr && akhir_tgl>=inAtr){
            
                n.classList.add('border-4')
                n.classList.add('border-warning')
                
                let hasId = n.hasAttribute('data-hasid');
                let arrayIds = [];
                let arBg  = [objekChanged['background-color']],arCl=[objekChanged['color']];
                
                if(hasId){  
                    arrayIds = n.getAttribute('data-hasid').split(',').map(n=>parseInt(n));
                    arrayIds.filter(s=>s!==idKeteranganKaldik).forEach(d=>{
                        let dDb = keterangankalender.filter(s=> s.idbaris == d)[0];
                        arBg.push(dDb['background-color']);
                        arCl.push(dDb['color']);
                    })
                    
                }
                
                if(arBg.length>0){
                    let teksstyle = "";

                    if(arBg.length == 1){
                        teksstyle = `background-color:${arBg[0]};color:${arCl[0]}!important`
                    }else{
                        teksstyle = `background:linear-gradient(-45deg,${arBg.join(',')});color:white`
                    }

                    n.setAttribute('style',teksstyle)
                }
            }else{

                if(arBgBefore.length>0){
                    let teksstyle = "";
                    
                    if(arBgBefore.length == 1){
                        teksstyle = `background-color:${arBgBefore[0]};color:${arClBefore[0]}!important`
                    }else{
                        teksstyle = `background:linear-gradient(-45deg,${arBgBefore.join(',')});color:white`
                    }

                    n.setAttribute('style',teksstyle)

                }else{
                    n.removeAttribute('style');
                }
            }
        })
    }

    event_element_markedCell(fokusId){
        const eventMarkedCells = document.querySelectorAll('[data-hasid]');
        
        eventMarkedCells.forEach(cel=>{
            let atr = cel.getAttribute('data-hasid').split(',').map(n=>parseInt(n));
        
            if(atr.includes(parseInt(fokusId))){
                cel.classList.add('border-4')
                cel.classList.add('border-warning');
            }
        })
    }
    createSingleKalender(start_tgl,end_tgl,valueinput_strt_tgl){
        let ta = new Date(start_tgl);
        let dd = valueinput_strt_tgl; //format 2024-04-11
        let takh = new Date(end_tgl);
        let tgLastTakh = new Date(takh.getFullYear(),takh.getMonth()+1,0).getDate();
        
        return new tableKalender(this.ormKaldik.dataKeteranganKaldik())
                .arrayBulan(new Date(ta.getFullYear(),ta.getMonth(),1),new Date(takh.getFullYear(),takh.getMonth(),tgLastTakh))
                .init(
                    {atributTable:[
                        {style:'border-collapse:separate;margin:0 auto;width:100%;font-size:12px;border-bottom:.5pt solid #eee'},
                        {id:'tabelpreviewModal'},
                        {class:'tabelkalender'},
                        {'data-date':dd},
                    ],}
                );
                // .stringTable();
    }

    // createMultipleKalender(start_tgl,end_tgl,valueinput_strt_tgl){
    createMultipleKalender(start_tgl,end_tgl,indeks){
        let ta = new Date(start_tgl);
        let dd = start_tgl;//valueinput_strt_tgl; //format 2024-04-11
        let takh = new Date(end_tgl);
        let tgLastTakh = new Date(takh.getFullYear(),takh.getMonth()+1,0).getDate();
        
        return new tableKalender(this.ormKaldik.dataKeteranganKaldik())
                .arrayBulan(new Date(ta.getFullYear(),ta.getMonth(),1),new Date(takh.getFullYear(),takh.getMonth(),tgLastTakh))
                .init(
                    {atributTable:[
                        {style:'border-collapse:separate;margin:0 auto;width:100%;font-size:12px;border-bottom:.5pt solid #eee'},
                        {id:'tabelkalenderbulanan'+indeks},
                        {class:'tabelkalender'+indeks},
                        {'data-date':dd},
                    ],}
                );
                // .stringTable();
    }

    show_kalender_pendidikan(thAwal){
        let bulanAkhir = new Date(thAwal);
        
        bulanAkhir.setMonth(thAwal.getMonth()+5);

        let current = thAwal;
        let html = '';
        let indeks = 0;

        while(current <= bulanAkhir){
            let formatDate = new FormatTanggal(current).idStringKaldik();
            let bulan = this.ormKaldik.internationalDate(current)
            let tahun = current.getFullYear();

            html += wrapperCardKalender(cardKalender(bulan,tahun,`<div id="cardKalender${indeks}"></div>`,{card:'mb-0',header:'bg-info-subtle justify-content-between title-header font14',body:`body-card-kalender border rounded-bottom`,bodyAttr:`data-refdate="${formatDate}"`}));
            current.setMonth(current.getMonth() + 1);
            indeks++;
        }
        
        this.workplace.innerHTML = this.headerPage + wrapperKalender(html);

        let domse = document.querySelectorAll('[data-refdate]');
        domse.forEach((card,indeks)=>{
            let atr = card.getAttribute('data-refdate');
            let tb = this.createMultipleKalender(new Date(atr),new Date(atr),indeks);
                tb.createTable(card);
                    tb.fillDate('tabelkalender'+indeks);
                    tb.addKeteranganOnKalender(card,'tabelkalender'+indeks);
        });
    }
    show_kalender_pendidikanTahun(thAwal){
        let bulanAkhir = new Date(thAwal);
        bulanAkhir.setMonth(thAwal.getMonth()+11);

        let current = thAwal;
        let html = '';
        let indeks = 0;
        while(current <= bulanAkhir){
            let formatDate = new FormatTanggal(current).idStringKaldik();
            let bulan = this.ormKaldik.internationalDate(current)
            let tahun = current.getFullYear();
            let bg = 'bg-info-subtle';
            if(indeks>5){
                bg = 'bg-danger-subtle';
            }

            html += wrapperCardKalender(cardKalender(bulan,tahun,`<div id="cardKalender${indeks}"></div>`,{card:'mb-0',header:bg +' justify-content-between title-header font14',body:`body-card-kalender border rounded-bottom`,bodyAttr:`data-refdate="${formatDate}"`}));
            current.setMonth(current.getMonth() + 1);
            indeks++;
        }
        this.workplace.innerHTML = this.headerPage + wrapperKalender(html);

        let domse = document.querySelectorAll('[data-refdate]');
        domse.forEach((card,indeks)=>{
            let atr = card.getAttribute('data-refdate');
            let tb = this.createMultipleKalender(new Date(atr),new Date(atr),indeks);
                tb.createTable(card);
                    tb.fillDate('tabelkalender'+indeks);
                    tb.addKeteranganOnKalender(card,'tabelkalender'+indeks);
        });
    }
    show_hari_efektif(thAwal){
        let sabtu = document.getElementById('switchsabtu');

        sabtu.onchange = (e)=>{
            
            let data = this.ormKaldik.dataHariEfektifPerSemester(thAwal,e.target.checked);
            this.workplace.innerHTML = this.headerPage + hariEfektif(data,e.target.checked);
        }
        
        sabtu.dispatchEvent(new Event('change'));
        
        
    }
    
    show_hari_efektif_belajar(thAwal){
        let sabtu = document.getElementById('switchsabtu');

        sabtu.onchange = (e)=>{
            
            let data = this.ormKaldik.dataHariEfektifPerSemester(thAwal,e.target.checked);
            this.workplace.innerHTML = this.headerPage + hariEfektifbelajar(data,e.target.checked);
        }
        
        sabtu.dispatchEvent(new Event('change'));
        
        
    }
    show_jam_efektif_belajar(thAwal){
        let sabtu = document.getElementById('switchsabtu');

        sabtu.onchange = (e)=>{
            
            let data = this.ormKaldik.dataHariEfektifPerSemester(thAwal,e.target.checked);
            this.workplace.innerHTML = this.headerPage + hariEfektifbelajarjam(data,e.target.checked);
        }
        
        sabtu.dispatchEvent(new Event('change'));
        
        
    }
    
}