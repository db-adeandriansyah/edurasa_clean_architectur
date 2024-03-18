import { tabelDom } from "../../entries/vendor";
import { contenModalTambahKaldik } from "../../views/kaldik/viewKaldik";

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
    return new tabelDom(konfig).init()
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