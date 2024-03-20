import { tabelDom } from "../../entries/vendor";
import { contenModalTambahKaldik } from "../../views/kaldik/viewKaldik";

function stringToDom(string){
    const template= document.createElement('template');
    template.innerHTML = string;
    return template.content;
}
export const htmlTabelSettingKaldik = (data)=>{
    const btnTambah = `<button class="btn bg-transparent border-danger rounded-pill" data-id="tambahkaldik" data-aksi="tambah" data-bs-toggle="tooltip" data-bs-title="Tambah Keterangan kalender">➕</button>`
        
    let konfig = {
        tableAtribut:{
            id:'table_kalender',
            class:'w3-table-all toExcel table-sm font10',
        },
        db:data,
        atributeColumn:{
            'auto':{class:'text-center align-middle'},
            'mulai':{class:'text-center align-middle'},
            'akhir':{class:'text-center align-middle'},
            'durasi':{class:'text-center align-middle'},
            'teks_libur':{class:'text-center align-middle'},
            'teks_he':{class:'text-center align-middle'},
            'teks_heb':{class:'text-center align-middle'},
            'html_contohwarna':{class:'text-center align-middle'},
            'aksi':{class:'text-center align-middle'},
            'aksi':{class:'print-hide text-center'},
            
        },
        headers:[
            {
                columns:
                    [
                        {label:'No Urut', atribute:{rowspan:2}},
                        {label:'Keterangan', atribute:{rowspan:2}},
                        {label:'Tanggal', atribute:{colspan:3}},
                        {label:'Libur, Hari Efektif, Hari Efektif Belajar', atribute:{colspan:3}},
                        {label:'Warna', atribute:{rowspan:2}},
                        {label:'Aksi<br/>'+btnTambah,atribute:{rowspan:2,class:'print-hide text-center'}}
                    ]
            },
            {
                columns:
                    [
                        {label:'Mulai'},
                        {label:'Akhir'},
                        {label:'Durasi'},
                        {label:'Libur'},
                        {label:'Hari Efektif'},
                        {label:'Hari Efektif Belajar'},
                    ]
            }
        ],
        body:data.length>0?[
            'auto',
            'keterangan',
            'mulai',
            'akhir',
            'durasi',
            'teks_libur',
            'teks_he',
            'teks_heb',
            'html_contohwarna',
            'aksi'
            
        ]:[]

    };
    return new tabelDom(konfig).init();
}

export const htmlFormulirIsianKaldik = (data)=>{
    const {bulan,tahun} =data
    return contenModalTambahKaldik(bulan,tahun)
}
export const nameToHex=(name)=> {
    const tempElement = document.createElement("div");
    tempElement.style.color = name;
    document.body.appendChild(tempElement);
    const computedColor = getComputedStyle(tempElement).color;
    document.body.removeChild(tempElement);

    // Mengambil nilai HEX dari nilai RGB
    const rgbMatch = computedColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (rgbMatch) {
        const hex = "#" + parseInt(rgbMatch[1]).toString(16).padStart(2, "0") +
                parseInt(rgbMatch[2]).toString(16).padStart(2, "0") +
                parseInt(rgbMatch[3]).toString(16).padStart(2, "0");
        return hex;
    }

    // Mengembalikan nilai warna konvensional jika tidak dapat dikonversi
    return name;
}

export const hariEfektif = (data,sabtu)=>{
    let header = [];
    let body = [];
    
    if(!sabtu){
        header = [
            {label:'Senin'},
            {label:'Selasa'},
            {label:'Rabu'},
            {label:'Kamis'},
            {label:'Jumat'},
            {label:'Sabtu'},
        ];
        body = [
            'bulan_tahun',
            'senin',
            'selasa',
            'rabu',
            'kamis',
            'jumat',
            'sabtu',
            'jumlah'
        ];
    }else{

        header = [
            {label:'Senin'},
            {label:'Selasa'},
            {label:'Rabu'},
            {label:'Kamis'},
            {label:'Jumat'},
        ];
        body = [
            'bulan_tahun',
            'senin',
            'selasa',
            'rabu',
            'kamis',
            'jumat',
            'jumlahTanpaSabtu'
        ]
    }
    
    let konfig = {
        tableAtribut:{
            id:'table_rekap_hari-efektif',
            class:'w3-table-all toExcel table-sm mt-5 font10',
        },
        db:data,
        atributeColumn:{
            'senin':{class:'text-center align-middle'},
            'selasa':{class:'text-center align-middle'},
            'rabu':{class:'text-center align-middle'},
            'kamis':{class:'text-center align-middle'},
            'jumat':{class:'text-center align-middle'},
            'sabtu':{class:'text-center align-middle'},
            'jumlah':{class:'text-center align-middle'},
            'jumlahTanpaSabtu':{class:'text-center align-middle'},
            
            
        },
        headers:[
            {
                columns:
                    [
                        
                        {label:'Bulan', atribute:{rowspan:2}},
                        {label:'Jumlah Hari', atribute:{colspan:header.length}},
                        {label:'Jumlah', atribute:{rowspan:2}},
                        
                    ]
            },
            {
                columns:header
            }
        ],
        body:body,
        footer:()=>{
            let tr = '';
            tr+=`<tr>`;
                tr+=`<th>Total</th>`;
                tr+=`<th>${data.map(n=>n.senin).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                tr+=`<th>${data.map(n=>n.selasa).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                tr+=`<th>${data.map(n=>n.rabu).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                tr+=`<th>${data.map(n=>n.kamis).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                tr+=`<th>${data.map(n=>n.jumat).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                if(!sabtu){
                    tr+=`<th>${data.map(n=>n.sabtu).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                    tr+=`<th>${data.map(n=>n.jumlah).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                }else{
                    // tr+=`<th>${data.map(n=>n.sabtu).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                    tr+=`<th>${data.map(n=>n.jumlahTanpaSabtu).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                }

            tr+=`</tr>`;
            return stringToDom(tr);
        }
    };
    return new tabelDom(konfig).init();
}
export const hariEfektifbelajar = (data,sabtu)=>{
    let header = [];
    let body = [];
    
    if(!sabtu){
        header = [
            {label:'Senin'},
            {label:'Selasa'},
            {label:'Rabu'},
            {label:'Kamis'},
            {label:'Jumat'},
            {label:'Sabtu'},
        ];
        body = [
            'bulan_tahun',
            'senin_heb',
            'selasa_heb',
            'rabu_heb',
            'kamis_heb',
            'jumat_heb',
            'sabtu_heb',
            'jumlah_heb'
        ];
    }else{

        header = [
            {label:'Senin'},
            {label:'Selasa'},
            {label:'Rabu'},
            {label:'Kamis'},
            {label:'Jumat'},
        ];
        body = [
            'bulan_tahun',
            'senin_heb',
            'selasa_heb',
            'rabu_heb',
            'kamis_heb',
            'jumat_heb',
            'jumlahTanpaSabtu_heb'
        ]
    }
    
    let konfig = {
        tableAtribut:{
            id:'table_rekap_hari-efektif',
            class:'w3-table-all toExcel table-sm mt-5 font10',
        },
        db:data,
        atributeColumn:{
            'senin_heb':{class:'text-center align-middle'},
            'selasa_heb':{class:'text-center align-middle'},
            'rabu_heb':{class:'text-center align-middle'},
            'kamis_heb':{class:'text-center align-middle'},
            'jumat_heb':{class:'text-center align-middle'},
            'sabtu_heb':{class:'text-center align-middle'},
            'jumlah_heb':{class:'text-center align-middle'},
            'jumlahTanpaSabtu_heb':{class:'text-center align-middle'},
            
            
        },
        headers:[
            {
                columns:
                    [
                        
                        {label:'Bulan', atribute:{rowspan:2}},
                        {label:'Jumlah Hari', atribute:{colspan:header.length}},
                        {label:'Jumlah', atribute:{rowspan:2}},
                        
                    ]
            },
            {
                columns:header
            }
        ],
        body:body,
        footer:()=>{
            let tr = '';
            tr+=`<tr>`;
                tr+=`<th>Total</th>`;
                tr+=`<th>${data.map(n=>n.senin_heb).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                tr+=`<th>${data.map(n=>n.selasa_heb).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                tr+=`<th>${data.map(n=>n.rabu_heb).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                tr+=`<th>${data.map(n=>n.kamis_heb).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                tr+=`<th>${data.map(n=>n.jumat_heb).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                if(!sabtu){
                    tr+=`<th>${data.map(n=>n.sabtu_heb).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                    tr+=`<th>${data.map(n=>n.jumlah_heb).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                }else{
                    // tr+=`<th>${data.map(n=>n.sabtu).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                    tr+=`<th>${data.map(n=>n.jumlahTanpaSabtu_heb).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                }

            tr+=`</tr>`;
            return stringToDom(tr);
        }
    };
    return new tabelDom(konfig).init();
}
export const hariEfektifbelajarjam = (data,sabtu)=>{
    let header = [];
    let body = [];
    
    if(!sabtu){
        header = [
            {label:'Senin'},
            {label:'Selasa'},
            {label:'Rabu'},
            {label:'Kamis'},
            {label:'Jumat'},
            {label:'Sabtu'},
        ];
        body = [
            'bulan_tahun',
            'senin_jeb',
            'selasa_jeb',
            'rabu_jeb',
            'kamis_jeb',
            'jumat_jeb',
            'sabtu_jeb',
            'jumlah_jeb'
        ];
    }else{

        header = [
            {label:'Senin'},
            {label:'Selasa'},
            {label:'Rabu'},
            {label:'Kamis'},
            {label:'Jumat'},
        ];
        body = [
            'bulan_tahun',
            'senin_jeb',
            'selasa_jeb',
            'rabu_jeb',
            'kamis_jeb',
            'jumat_jeb',
            'jumlahTanpaSabtu_jeb'
        ]
    }
    
    let konfig = {
        tableAtribut:{
            id:'table_rekap_hari-efektif',
            class:'w3-table-all toExcel table-sm mt-5 font10',
        },
        db:data,
        atributeColumn:{
            'senin_jeb':{class:'text-center align-middle'},
            'selasa_jeb':{class:'text-center align-middle'},
            'rabu_jeb':{class:'text-center align-middle'},
            'kamis_jeb':{class:'text-center align-middle'},
            'jumat_jeb':{class:'text-center align-middle'},
            'sabtu_jeb':{class:'text-center align-middle'},
            'jumlah_jeb':{class:'text-center align-middle'},
            'jumlahTanpaSabtu_jeb':{class:'text-center align-middle'},
            
            
        },
        headers:[
            {
                columns:
                    [
                        
                        {label:'Bulan', atribute:{rowspan:2}},
                        {label:'Jumlah Jam dalam hari (1 hari @ 7 JP)', atribute:{colspan:header.length}},
                        {label:'Jumlah', atribute:{rowspan:2}},
                        
                    ]
            },
            {
                columns:header
            }
        ],
        body:body,
        footer:()=>{
            let tr = '';
            tr+=`<tr>`;
                tr+=`<th>Total</th>`;
                tr+=`<th>${data.map(n=>n.senin_jeb).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                tr+=`<th>${data.map(n=>n.selasa_jeb).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                tr+=`<th>${data.map(n=>n.rabu_jeb).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                tr+=`<th>${data.map(n=>n.kamis_jeb).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                tr+=`<th>${data.map(n=>n.jumat_jeb).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                if(!sabtu){
                    tr+=`<th>${data.map(n=>n.sabtu_jeb).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                    tr+=`<th>${data.map(n=>n.jumlah_jeb).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                }else{
                    // tr+=`<th>${data.map(n=>n.sabtu).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                    tr+=`<th>${data.map(n=>n.jumlahTanpaSabtu_jeb).reduce((a,b)=>parseInt(a)+parseInt(b))}</th>`;
                }

            tr+=`</tr>`;
            return stringToDom(tr);
        }
    };
    return new tabelDom(konfig).init();
}