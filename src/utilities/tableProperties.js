export class TableProperties{
    constructor(elemenTable){
        this.table = elemenTable;
        // this.width = elemenTable.offsetWidth;
        this.updateWidth();
        this.id = elemenTable.getAttribute('id');
    }
    updateWidth() {
        this.width = this.table.getBoundingClientRect().width;
    }
    get elementTbody(){
        return this.table.querySelector('tbody');
    }
    get elementThead(){
        return this.table.querySelector('thead');
    }
    get rowsInTbody(){
        return this.elementTbody.rows;
    }
    get rowsInThead(){
        return this.elementThead.rows;
    }
    get hasThead(){
        return this.table.querySelectorAll('thead').length > 0;
    }
    get hasTfoot(){
        return this.table.querySelectorAll('tfoot').length > 0;
    }
    get wrapperTable(){
        return this.table.parentElement;
    }
    get theadHasMergeAttribute(){
        let res = false;
        let cek= this.table.querySelectorAll('thead');
        cek.forEach(element => {
            if(element.hasAttribute('colspan')) res = true;
            if(element.hasAttribute('rowspan')) res = true;
        });
        return res;
    }
    get prevSiblingElement(){
        return this.wrapperTable.previousElementSibling;;
    }
    freezeColumn(arrColumn = [], headerColumns = []) {
        this.freezeCellsInTbody(arrColumn);
        this.freezeCellsInThead(headerColumns);
        this.wrapperTable.classList.add('scrol-h-custom');
    }
    freezeCellsInTbody(arrColumn) {
        const rowsInTbody = this.rowsInTbody;

        for (let i = 0; i < rowsInTbody.length; i++) {
            const cells = rowsInTbody[i].cells;
            this.applyFreezeStyling(cells, arrColumn);
        }
    }

    freezeCellsInThead(cellsToFreeze) {
        //cellsToFreeze; [[2,0],[2,3], ..., [2, 4]]
        if (this.hasThead) {
            const theadRows = this.rowsInThead;
            cellsToFreeze.forEach(([rowIndex, colIndex]) => {
                const theadRow = theadRows[rowIndex];
                if (theadRow) {
                    this.applyFreezeStyling(theadRows[rowIndex].cells, [colIndex]);
                }
            });
        }
    }

    applyFreezeStyling(cells, columns) {
        let cumulativeLeft = 0;
        columns.forEach((colIndex) => {
            const cell = cells[colIndex];
            
            cell.classList.add('text-nowrap');
            cell.style.position = 'sticky';
            cell.style.position = '-webkit-sticky';
            cell.style.left = `${cumulativeLeft}px`; // Set posisi sesuai dengan kumulatif
            cell.style.boxShadow = '-.5px 0 #000 inset';
            cell.style.backgroundColor = 'inherit';
    
            cumulativeLeft += cell.offsetWidth; // Menambahkan lebar sel ke posisi kumulatif
        });
    }

    applyFreezeStylingTop() {
        this.elementThead.setAttribute('style','position:sticky;position:-webkit-sticky;top:0');
    }

    addScrollHeader(ismodal=false){
        if(this.hasThead){
            if(ismodal){
                this.wrapperTable.setAttribute('style','overflow-x:auto;max-height:90vh;top:3rem');
            }else{
                this.wrapperTable.setAttribute('style','height:80vh;top:5rem;');
                
            }
            
            let th = this.table.querySelector('thead');
            th.setAttribute('class','sticky-top');
            // th.setAttribute('style','top:2.5rem');
            
        }
    }
    addScrollUpDown(inModal=false){
        let wrapTable = this.wrapperTable;
        let existWrap = document.getElementById('wrapScroll');
        // if(existWrap){
        //     existWrap.remove();
        // }
        let shadowScrol = document.createElement('div');
            shadowScrol.setAttribute('id','wrapScroll');
            shadowScrol.setAttribute('class','sticky-top z-3 scrol-h-custom');
            if(inModal){
                // shadowScrol.setAttribute('style','overflow-x:auto;top:0;z-index:9999');
                shadowScrol.setAttribute('style','overflow-x:auto;top:0;z-index:9999;cursor:move');
            }else{
                shadowScrol.setAttribute('style','overflow-x:auto;top:2.7rem;z-index:9999;cursor:move');
            }
        let contentScroll = document.createElement('div');
            contentScroll.setAttribute('style','width:10px;height:5px;display:none;');
            contentScroll.setAttribute('id','contentScroll');
            shadowScrol.appendChild(contentScroll);
        
            /**insert shadowScroll before wrappTable */
        wrapTable.before(shadowScrol);
        wrapTable.classList.add('scrol-h-custom');
        let divShadowScrol = document.getElementById('wrapScroll');
        
        shadowScrol.childNodes[0].setAttribute('style','width:'+(this.width)+'px;height:5px');
            
        wrapTable.onscroll = ()=>{
            divShadowScrol.scrollLeft = this.wrapperTable.scrollLeft;
            if(this.width ==0){
                shadowScrol.childNodes[0].setAttribute('style','width:'+this.wrapperTable.lastElementChild.offsetWidth+'px;height:5px');
            }
        }
        
        divShadowScrol.onscroll = ()=>{
            this.wrapperTable.scrollLeft = divShadowScrol.scrollLeft; 
        }
    }

    static propertiesByClick(dom){
        
            let targetClick = dom;
            let domsMustCells = dom;
            // e.target.closest('td');
            if(dom.closest('td >*')){
                domsMustCells = dom.closest('td');//.parentElement;
            }
            if(dom.closest('th >*')){
                domsMustCells = dom.closest('th');//.parentElement;
            }
            return {
                'target': targetClick,
                'targetNode': targetClick.nodeName,
                'cells':domsMustCells,
                'rows':domsMustCells.parentElement,
                'section':domsMustCells.parentElement.parentElement,
                'headers':domsMustCells.headers,
                'table':domsMustCells.parentElement.parentElement.parentElement,

            }
        
    }
    rankings(arr) {
        const sorted = [...arr].sort((a, b) => b - a);
        return arr.map((x) => sorted.indexOf(x) + 1);
    };
    static RangkingTabel(table, refrenceIndex, targetIndex){
        let tabel = table;
        let tbody = tabel.querySelector('tbody');
        let arrRefrences=[];
        
        [...tbody.rows].forEach(row=>{
            let t = row.cells[refrenceIndex];
            let v = 0;
            if(t.hasChildNodes()){
                let fNode = t.firstChild.nodeName;
                if(fNode == "INPUT"){
                    v = t.firstChild.value
                }else{
                    v = Number(t.innerHTML);
                }

            }else{
                v = Number(t.innerHTML);
            }
            
            arrRefrences.push(v)
        });
        
        let rangk = this.rankings(arrRefrences);
        
        [...tbody.rows].forEach((row,indeks)=>{
            let t = row.cells[targetIndex];
            if(t.hasChildNodes()){
                let fNode = t.firstChild.nodeName;
                if(fNode == "INPUT"){
                    t.firstChild.value =rangk[indeks];
                }else{
                    t.innerHTML = rangk[indeks];
                }
            }else{
                t.innerHTML = rangk[indeks];
            }
        });
    }
    static SumTable(table,refrenceColumnIndex, targetIndex){
        let tabel = table;
        let tbody  = table.querySelector('tbody');

        [...tbody.rows].forEach(row=>{
            let cells = row.cells;
            let count = [];
            [...cells].forEach((cell,index)=>{
                if(refrenceColumnIndex.includes(index)){
                    if(cell.hasChildNodes()){
                        let nodeName = cell.firstChild.nodeName;
                        if(nodeName == "INPUT"){
                            count.push(cell.firstChild.value);
                        }else{
                            count.push(Number(cell.innerHTML));
                        }
                    }else{
                        count.push(Number(cell.innerHTML));
                    }
                }
            });
            cells[targetIndex].innerHTML = count.map(m=>Number(m)).reduce((a,b)=>a+b,0);
        })
    }
}