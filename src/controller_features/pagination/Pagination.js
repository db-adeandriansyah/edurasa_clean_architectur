import { TableProperties } from "../../entries/vendor";

export default class Pagination{
    constructor(data){
        this.data = data;
        this.dataPerPage = [];
        this.view = null;
        this.workplace = null;
    }
    init(option){
        const settingDefault = {
            showPerPage:5,
            viewFunction:this.viewDefault,
            workplace:document.getElementById('printarea'),
            title:'<h2 class="text-center">Pagination Show Case</h2>',
            overflowingColumn:[]
        };
        const objekDefault = Object.assign({},settingDefault,option);
        this.judul = objekDefault.title;
        this.showPerPage = objekDefault.showPerPage;
        this.workplace = objekDefault.workplace;
        this.view = objekDefault.viewFunction;
        this.isOverFlowing = objekDefault.overflowingColumn.length>0;
        this.indexFreezeColumn = objekDefault.overflowingColumn;
        this.createDataPerPage();
        return this;
    }
    createDataPerPage(){
        let countDataControl = 0
        if(this.data.length>0){
            //bagi dulu ada berapa data perhalaman;
            let dataHasDevided = parseInt(this.data.length / this.showPerPage);
            // kadang ada sisanya, jadi harus ditambahkan satu control untuk menambahkan control page;
            let sisa = this.data.length % this.showPerPage;
            countDataControl =sisa>0?dataHasDevided+1: dataHasDevided;
            let startIndex =0;
            let lastIndex = this.showPerPage;
            this.dataPerPage = [];
            [...Array(countDataControl)].forEach((_,i)=>{
                let indexCurrentPage = this.createArrayIndex(startIndex,lastIndex);
                let ob = {
                    page:i,
                    data:this.data.filter((s,index)=>indexCurrentPage.includes(index))
                };
                this.dataPerPage.push(ob);
                startIndex+= parseInt(this.showPerPage);
                if(i === countDataControl-1){
                    lastIndex = sisa;// this.data.length - 1;
                }else{
                    lastIndex = this.showPerPage * (i+2);

                }
            })

        }
        return this;
    }
    createArrayIndex(start,end){
        let ar = [];
        let i=start;
        do{
            ar.push(i);
            i++;
        }while(i<end);

        return ar;
    
    }
    buildHtml(){
        const vData = this.view(0,this.dataPerPage[0].data,[]);
        const vUpControl =this.viewControl();
        const vDownControl = this.viewControl();
        let html ="";
        html+=`<div id="printpagination">`;
            html+=this.judul;
            html+=`<div class="d-flex flex-column">`;
                html+=`<div class="d-flex justify-content-end border-bottom print-hide control-pagination">`;
                    html+=vUpControl;
                html+=`</div>`;
                html+=`<div class="table-responsive scrol-h-custom tnr" id="showdatapagination">`;
                    html+= vData;
                html+=`</div>`;
                html+=`<div class="d-flex justify-content-end border-top print-hide control-pagination">`;
                    html+=vDownControl;
                html+=`</div>`;
            html+=`</div>`;
        html+=`</div>`;
        this.workplace.innerHTML = html;
        this.addScrolling();
        this.listenerPagination();
    }
    listenerPagination(){
        const controls = document.querySelectorAll('[data-control-pagination]');
        const wrapDiv=document.getElementById('showdatapagination');
        const countpage=document.getElementById('countpage');
        controls.forEach(btn=>{
            btn.onclick = (e)=>{
                const dataset = e.target.dataset;
                wrapDiv.innerHTML = this.view(dataset.controlPagination,this.dataPerPage[dataset.controlPagination].data,this.dataPerPage[dataset.controlPagination-1]?.data||[]);
                this.addScrolling();
                //hapus bg tiap controlls;
                controls.forEach(el=>el.classList.remove('bg-info-subtle'));
                //hanya control inii yang aktif;
                document.querySelectorAll(`[data-control-pagination="${dataset.controlPagination}"]`).forEach(ct=>ct.classList.add('bg-info-subtle'));
            }
        });
        countpage.onchange = (e)=>{
            let v = e.target.value;
            if(v!==""){
                
                this.showPerPage =v;
                

                this.createDataPerPage().buildHtml();
            }
        }
    }
    addScrolling(){
        if(this.isOverFlowing){
            // const existWraper = document.getElementById('wrapScroll');
            // if(existWraper) existWraper.remove();
            const element_table = document.querySelector('#showdatapagination').querySelector('table');
            const tp = new TableProperties(element_table);
            tp.freezeColumn(this.indexFreezeColumn);
            tp.addScrollUpDown(false);
        }
    }
    viewControl(){
        const data = this.dataPerPage.map(n=>n.page);
        const last = data[data.length-1];
        let html="";
            html+=`<ul class="list-inline font10">`;
            if(data.length===0){
                html+=`<li>Not Found</li>`;
            }else if(data.length === 1){
                html+=`<li class="list-inline-item px-1">per Data : <input type="number" id="countpage" value="${this.showPerPage}" class=" border rounded p-1" style="width:40px"/>/ Total: ${this.data.length}</li>`
                
                data.forEach((page,indek)=>{
                    html+=`<li class="list-inline-item border rounded px-1 ${indek===0?'bg-info-subtle':''}" data-control-pagination="${page}"  role="button">${page+1}</li>`;
                });
            }else{
                html+=`<li class="list-inline-item px-1">per Data:<input type="number" id="countpage" value="${this.showPerPage}" class=" border rounded p-1" style="width:40px"/>/ Total: ${this.data.length}</li>`
                html+=`<li class="list-inline-item border rounded px-1" data-control-pagination="0" role="button">Awal</li>`;
                data.forEach((page,indek)=>{
                    html+=`<li class="list-inline-item border rounded px-1 ${indek===0?'bg-info-subtle':''}" data-control-pagination="${page}"  role="button">${page+1}</li>`;
                });
                html+=`<li class="list-inline-item border rounded px-1" data-control-pagination="${last}"  role="button">Akhir</li>`;
            }
            html+=`</ul>`;
        return html;
    }
    viewDefault(indek){
        const data = this.dataPerPage[indek]?.data||[];
        const startdata = this.dataPerPage[indek-1]?.data||[];
        let startNum = ((indek) * startdata.length )+1;
        let html ="";
        html+=`<ul class="list-unstyled">`;
        data.forEach((item,i)=>{
            html+=`<li>${startNum} = item index ${i} indek data ${indek} nourut ${startNum}</li>`;
            startNum++;
        });
        html+=`</ul>`;
        return html;
    }
}