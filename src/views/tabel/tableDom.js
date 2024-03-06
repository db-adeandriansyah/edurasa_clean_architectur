export class tabelDom{
    constructor(config){
        this.resultTable = null;
        this.config = Object.assign({},config);
    }
    crtTable(atr=null){
        /**
            atr.table = {
                classes:'w3-table-all',
                id:'idtable',
                'style':"width:300px"
            }
         */
    
        this.resultTable = document.createElement('table');
        if(atr){
            Object.entries(atr).forEach(([key,val])=> this.resultTable.setAttribute(key,val))
        }
    }
    crt(param){
        return document.createElement(param);
    }
    crtAtrr(parent, atr){
        if(atr){
            Object.entries(atr).forEach(([key,val])=> {
                parent.setAttribute(key,val)
            })
        }
        
    }
    appendChildTable(komponen){
        this.resultTable.appendChild(komponen)
    }
    init(towrap=true){
        const config = this.config;
        /**
            config={
                tableAtribut: {
                    classes:'w3-table-all',
                    id:'idtable',
                    style:"width:300px"
                }
                headers:[
                    {columns:[
                            {label:'No',atribute:{rowspan:2, class:'bg-warning}},
                            {label:'Nama',atribute:{rowspan:2, class:'bg-info}},
                            {label:'Tempat Tanggal',atribute:{colspan:2, class:'bg-info}},
                        ]
                    },
                    {columns:[
                        {label:'Tempat'},
                        {label:'Tanggal Lahir'},
                        ]
                    }

                ]
            }
         */
        
        //Buat table-nya:
        this.crtTable(config.tableAtribut);

        //buat Thead;
        const thead = this.crt('thead');

        //kelola data Thead dari data config dengan key: headers yang merupakan array;
        config.headers.forEach((headersConfig)=>{
            let row = this.crt('tr');
            headersConfig.columns.forEach((col)=>{
                let th = this.crt('th');
                if(typeof col == 'function'){
                    col()
                }else{
                    this.crtAtrr(th, col.atribute);
                    th.innerHTML= col.label;
                    row.appendChild(th);
                }
            })


            thead.appendChild(row);
        });

        //kelola data Tbody dari data config dengan key: body yang merupakan array-object;

        const tbody = this.crt('tbody');
        
        //tapi cek dulu, apakah berupa array atau function ;
        if(typeof config.body == 'function'){
            tbody.appendChild(config.body());
        }else if(Array.isArray(config.body)){
            if(config.body.length==0){
                let row = this.crt('tr');
                
                //cek jumlah kolom, ambil data dari header baris pertama;
                let colCountFirst = config.headers[0].columns;
                let numberOfColumns = 0
                colCountFirst.forEach(column => {
                    if (column.atribute && column.atribute.colspan) {
                        const colspanValue = parseInt(column.atribute.colspan);
                        if (!isNaN(colspanValue)) {
                            numberOfColumns += colspanValue;
                        }
                    } else {
                        numberOfColumns++;
                    }
                });
                let td = this.crt('td');
                td.setAttribute('colspan', numberOfColumns);
                td.setAttribute('class', "text-center");
                td.innerHTML = "Tidak ada data";
                row.appendChild(td);
                tbody.appendChild(row);
            }else{
                const dbs = config.db.slice();
                let index = 1;
                dbs.forEach((dbA)=>{
                    let db = Object.assign({},dbA);
                    let row = this.crt('tr');
                    config.body.forEach((key)=>{
                        let td = this.crt('td');
                        if(typeof key == 'object'){
                            Object.entries(key).forEach(([k,v])=>{
                                if(typeof v == 'function'){
                                    db[k]=v(db[k])
                                }
                                td.innerHTML = db[k];
                                if(config.atributeColumn && config.atributeColumn[k]){
                                    Object.entries(config.atributeColumn[k]).forEach(([a,v])=>{
                                        td.setAttribute(a,v);
                                    })
                                }
                            })
                        }else{
                            if(key == "auto") {
                                td.innerHTML = index++;
                                td.setAttribute('class','text-center');
                            }else{
                                
                                if(key.indexOf('.')>-1){
                                    let splt = key.split('.');
                                    let dbTemp = db;
                                    splt.forEach(k=> {
                                        dbTemp = dbTemp[k];
                                        console.log(k);
                                    });
                                    td.innerHTML = dbTemp;
                                }else{
                                    td.innerHTML = db[key];
                                }
                            };
                            if(config.atributeColumn && config.atributeColumn[key]){
                                Object.entries(config.atributeColumn[key]).forEach(([k,v])=>{
                                    td.setAttribute(k,v);
                                })
                            }
                        };
                        
                        row.appendChild(td);
                    });
                    tbody.appendChild(row);
                });
            };
        }


        this.appendChildTable(thead);
        this.appendChildTable(tbody);
        if(config.footer){
            const tfoot = this.crt('tfoot');
            if(typeof config.footer == 'function'){
                tfoot.appendChild(config.footer());
                this.appendChildTable(tfoot);
            }else{
                //logika lain
            }
        }
        let divWrap = document.createElement('div');
        divWrap.setAttribute('class','table-responsive scrol-h-custom');
        divWrap.appendChild(this.resultTable);
        return towrap?divWrap.outerHTML:divWrap.innerHTML;
    }
    
}