import { tabelDom } from "../../entries/vendor";
import htmlAbsen from "../../views/absen/viewAbsen"
import iconhadir from "../../img/hadir.png";
export const htmldenah = (data,kelas,imgguru,absen)=>htmlAbsen.htmlDenahAbsenApi(data,kelas,imgguru,absen,iconhadir);

export const controlAbsenByBulanan = (data)=>{
    let d = new Date();
    let y = d.getFullYear();
    let m = d.getMonth().toString().padStart(2,'0');
    let val = `${y}-${m}-01`
    let objectDefault={
        judul:'Judul',
        arrayBulan:[], 
        deskripsi:'Deskripsi Control',
        idSelectPilihBulan:'idselectbulan',
        tglValuePertama:val,
        modeCheckmark:true
    };
    let mergeObject = Object.assign({},objectDefault,data)
    return htmlAbsen.koleksiBulanAbsen(mergeObject)
}
const stringToDom=(string)=>{
    const template= document.createElement('template');
    template.innerHTML = string;
    return template.content;
}
export const tabelabsenperbulan = (data) =>{
    const {dataabsen,datakalender} = data;
    let mapingHeading = datakalender.map(n=>{
        let obj={};
        obj.label=n.tgl_hari;
        obj.atribute=n.atribute;
        return obj;
    });
    let html = "";
    let konfig = {
        tableAtribut:{
            id:'tabelabsenbulanan',
            class:'w3-table-all toExcel table-sm font10',
        },
        db:dataabsen,
        atributeColumn:{
            'oleh':{class:'print-hide text-center'},
            'refrensi_suratmasuk':{class:'print-hide text-center'},
            'aksi':{class:'print-hide text-center'},
            'aksi2':{class:'print-hide text-center'},
        },
        headers:[
            {
                columns:[
                    {label:'No Urut', atribute:{rowspan:2}},
                    {label:'Nama Siswa',atribute:{rowspan:2}},
                    {label:'Nama Bulan',atribute:{colspan:mapingHeading.length}}
                ]
            },
            {
                columns:[
                    ...mapingHeading
                ]
            }
        ],
        body:()=>{
            let html = ``;
            dataabsen.forEach((db,indeks) => {
                html+=`<tr>`;
                    html+=`<td class="text-center">${(indeks+1)}.</td>`;
                    html+=`<td class="text-nowrap">${db.namasiswa}</td>`;
                    let dataabsen = db.data;
                    dataabsen.forEach(abs=>{
                        let atr = '';
                        Object.entries(abs.atribute).forEach(([k,v])=>{
                            atr +=' ';
                            atr +=k;
                            atr+="='";
                            atr+=v;
                            atr+="'";
                        });
                        
                        html+=`<td${atr}>${abs.id}</td>`;
                    })
                html+=`</tr>`;
            });
            return stringToDom(html);
        }   
    }
    let tabelSurat = new tabelDom(konfig);
    html = tabelSurat.init();
    return html;
}