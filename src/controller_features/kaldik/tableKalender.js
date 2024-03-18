const NamaHariSingkat = [ 'Mg','Sn','Sl','Rb','Km','Jm','Sb']

export class tableKalender {
    constructor(dataKeteranganKalender,format){
        this.data = dataKeteranganKalender;
        this.template = document.createElement('template');
        this.atribute = {};
        this.koleksiBulan = [];
        this.format = format;
    }
    internationalDate(date){
        return new Intl.DateTimeFormat(
            'id-ID',
            { month:'long'}).format(date)
    }
    init(setAtribut){
        const config={
            atributTable:[
                {style:'border-collapse:separate;margin:0 auto;width:100%;font-size:12px;border-bottom:.5pt solid #eee'}
            ],
            indeksTd:[
                {class:'text-danger'},
                null,
                null,
                null,
                null,
                null,
                null,
                // {class:'text-danger'}
            ],
            indeksTh:[
                {style:'color:red;border-bottom:.5pt solid red'},
                {style:'border-bottom:.5pt solid #ddd'},
                {style:'border-bottom:.5pt solid #ddd'},
                {style:'border-bottom:.5pt solid #ddd'},
                {style:'border-bottom:.5pt solid #ddd'},
                {style:'border-bottom:.5pt solid #ddd'},
                {style:'border-bottom:.5pt solid #ddd'},
            ]
        };
        this.atribute = Object.assign({},config,setAtribut);
        return this;
    }

    arrayBulan(bulanAwal, bulanAkhir){
        const startDate = new Date(bulanAwal);
        const endDate = new Date(bulanAkhir);
        
        const monthArray = [];
        
        let currentDate = startDate;
        
        while (currentDate <= endDate) {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            
            monthArray.push(`${year}-${month.toString().padStart(2, '0')}-01`);
            
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
        this.koleksiBulan = monthArray
        return this;
    }
    row(){
        return document.createElement('tr');
    }
    th(){
        return document.createElement('th');
    }
    td(){
        return document.createElement('td');
    }
    createTable(element) {
        let tabel = document.createElement('table');
        let conf = this.atribute;
        conf.atributTable.forEach((item) => {
            Object.entries(item).forEach(([k, v]) => {
                tabel.setAttribute(k, v);
            });
        });
        let thead = document.createElement('thead');
        let r = this.row();
        [...Array(7)].forEach((_, index) => {
            let t = this.th();
            t.innerHTML = NamaHariSingkat[index];;
            if(conf.indeksTh[index]){
                Object.entries(conf.indeksTh[index]).forEach(([k,v])=>{
                    t.setAttribute(k,v);
                })
            };
            t.classList.add('text-center');
            r.appendChild(t);
        });
        thead.appendChild(r);
        tabel.appendChild(thead);

        let tbody = document.createElement('tbody');
        [...Array(6)].forEach((_,index)=>{
            let b = this.row();
            for(let i = 0; i < 7 ; i++){
                let d = this.td();
                // d.innerHTML = i;
                // b.appendChild(d);
                if(conf.indeksTd[i]){
                    Object.entries(conf.indeksTd[i]).forEach(([k,v])=>{
                        d.setAttribute(k,v);
                    })
                };
                
                d.classList.add('text-center');
                b.appendChild(d);
            }
            tbody.appendChild(b);

        })
        tabel.appendChild(tbody);
        this.template.content.appendChild(tabel);
        element.innerHTML = "";
        element.appendChild(this.template.content);
        return this;
    };
    addKeteranganOnKalender(element,classTable){
        let div = document.createElement('div');
        let prefikId = element.getAttribute('id');
        div.setAttribute('id',prefikId+'_keterangankaldik');
        div.classList.add('font8');
        div.classList.add('border');
        div.classList.add('p-2');

        //list
        this.listKeteranganPerBulan(div,classTable);

        element.appendChild(div);
        return this
    }
    listKeteranganPerBulan(parent,classTable){
        let tabel = document.querySelector('.'+classTable);
        let dateTgl = tabel.getAttribute('data-date');
        let d = new Date(dateTgl);
        let Y = d.getFullYear();
        let Mi = d.getMonth();
        let M = (Mi+1)
        let lastTgl = this.lastTgl(Y,M);
        let awal = new Date(Y,Mi,1);
        let akhir = new Date(Y,Mi,lastTgl);
        let  dataBetween = this.filterDataByBetweenDate(awal,akhir);
        let parentList = document.createElement('ul');
        parentList.classList.add('list-group','list-group-flush');
        dataBetween.forEach(n=>{
            let li = document.createElement('li');
            li.classList.add('list-group-item','p-0');

            let konten = document.createElement('div');
            konten.classList.add('d-flex','justify-content-between');

            let teksketerangan = document.createElement('span');
                teksketerangan.innerHTML = n.keterangan;
            konten.appendChild(teksketerangan);
                teksketerangan = document.createElement('span');
                teksketerangan.innerHTML = n.keterangan_tanggal;
            konten.appendChild(teksketerangan);

            li.appendChild(konten);
            parentList.appendChild(li);

        })
        parent.appendChild(parentList);
    }
    stringTable() {
        let tabel = document.createElement('table');
        let conf = this.atribute;
        conf.atributTable.forEach((item) => {
            Object.entries(item).forEach(([k, v]) => {
                tabel.setAttribute(k, v);
            });
        });
        let thead = document.createElement('thead');
        let r = this.row();
        [...Array(7)].forEach((_, index) => {
            let t = this.th();
            t.innerHTML = NamaHariSingkat[index];
            if(conf.indeksTh[index]){
                Object.entries(conf.indeksTh[index]).forEach(([k,v])=>{
                    t.setAttribute(k,v);
                })
            };
            t.classList.add('text-center');
            r.appendChild(t);
        });
        thead.appendChild(r);
        tabel.appendChild(thead);

        let tbody = document.createElement('tbody');
        [...Array(6)].forEach((_,index)=>{
            let b = this.row();
            for(let i = 0; i < 7 ; i++){
                let d = this.td();
                
                if(conf.indeksTd[i]){
                    Object.entries(conf.indeksTd[i]).forEach(([k,v])=>{
                        d.setAttribute(k,v);
                    })
                };
                
                d.classList.add('text-center');
                b.appendChild(d);
            }
            tbody.appendChild(b);

        })
        tabel.appendChild(tbody);
        this.template.content.appendChild(tabel);
        // return this.template.content.outerHTML;
        return this//.content.appendChild(tabel);
    };
    fillDate(classes){
        let tabel = document.querySelectorAll('.'+classes);
        
        tabel.forEach(tb=>{
            let date = tb.getAttribute('data-date');
            let d = new Date(date);
            let Y = d.getFullYear();
            let Mi = d.getMonth();
            let M = (Mi+1)
            let lastTgl = this.lastTgl(Y,M);
            
            let body = tb.querySelector('tbody');
            let c = 0, r=0;
            for(let i = 0 ; i < lastTgl ; i++){
                let di = new Date(Y,Mi,(i+1));
                c = di.getDay();
                let cell = body.rows[r].cells[c];
                cell.innerHTML = new Date(Y,Mi,(i+1)).getDate();
                cell.setAttribute('data-tglstring',Y+''+M.toString().padStart(2,'0')+''+(i+1).toString().padStart(2,'0'))
                if(c == 6){
                    r++;
                }
                cell.classList.add('border-bottom','rounded');
                let cek = this.filterDataByDate(di);
                if(cek.length>0){
                    if(cek.length ==1){
                        let bg = `background-color:${cek[0]['background-color']};color:${cek[0].color}!important`;
                        cell.setAttribute('style',bg);
                        cell.setAttribute('data-aksi','editCell');
                        cell.setAttribute('data-hasid',cek[0].idbaris);
                    }else{
                        let color = [];
                        let ids = []
                        cek.forEach(it=> {
                            color.push(it['background-color']);
                            ids.push(it.idbaris);
                        });
                        let bg = `background:linear-gradient(-45deg,${color.join(',')});color:white`;
                        cell.setAttribute('style',bg);
                        
                        cell.setAttribute('data-aksi','editCell');
                        cell.setAttribute('data-hasid',ids.join(','));
                    }
                }
            }
        })
    }
    lastTgl(Y,M){
        return new Date(Y, M, 0).getDate();
    }
    filterDataByDate(targetDate) {
        const filteredData = this.data.filter(item => {
        const startDate = new Date(item.start_tgl).getTime();
        const endDate = new Date(item.end_tgl).getTime();
        const target = new Date(targetDate).getTime();
    
        return target >= startDate && target <= endDate;
        });
      
        return filteredData;
    }
    filterDataByBetweenDate(startDate, endDate) {
        const filteredData = this.data.filter(item => {
            const itemStartDate = new Date(item.start_tgl).getTime();
            const itemEndDate = new Date(item.end_tgl).getTime();
            const startTimestamp = new Date(startDate).getTime();
            const endTimestamp = new Date(endDate).getTime();
        
            return (startTimestamp >= itemStartDate && startTimestamp <= itemEndDate) ||
                (endTimestamp >= itemStartDate && endTimestamp <= itemEndDate) ||
                (itemStartDate >= startTimestamp && itemStartDate <= endTimestamp) ||
                (itemEndDate >= startTimestamp && itemEndDate <= endTimestamp);
        });
        
        return filteredData;
    }
    
}