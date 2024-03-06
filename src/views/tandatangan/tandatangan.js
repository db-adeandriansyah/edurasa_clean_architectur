const selTtdKepsek = (sekolah,nama, nip)=>`<td style="width:33%;text-align:center;vertical-align:middle;border:0" contenteditable="true" spellcheck="false">Mengetahui,<br>Kepala ${sekolah}<br><br><br><br><u><b>${nama}</b></u><br>${nip}</td>`;
const selTtdTengah =`<td style="width:33%;text-align:center;vertical-align:middle;border:0" contenteditable="true" spellcheck="false"></td>`;
const selTtdGuru = (subtitle, nama, nip, stringDate)=>`<td style="width:34%;text-align:center;vertical-align:middle;border:0" contenteditable="true" spellcheck="false">Depok, ${stringDate}<br>${subtitle}<br><br><br><br><u><b>${nama}</b></u><br>${nip}</td>`;
const selOrtu = `<td style="width:33%;text-align:center;vertical-align:middle;border:0" contenteditable="true" spellcheck="false">Orang Tua/Wali<br><br><br><br><br>_______________</td>`;
const tandatanganTable = (data,kondisi,tanggal,subtitle)=>{
    let html=`<table class="mt-3 tnr" style="width:100%;"><tbody><tr>`;
    if(kondisi=="guru"){
        html+=selTtdTengah
        html+=selTtdTengah
        html+=selTtdGuru(subtitle, data.nama_guru, data.nip_guru, tanggal);
    }else if(kondisi == "kepsek"){
        html+=selTtdTengah;
        html+=selTtdTengah;
        html+=selTtdGuru(subtitle,data.nama_kepsek, data.nip_kepsek, tanggal);
    }else if(kondisi == "kepsekguru"){
        html+=selTtdKepsek(data.nama_sekolah,data.nama_kepsek,data.nip_kepsek);
        html+=selTtdTengah;
        html+=selTtdGuru(subtitle, data.nama_guru, data.nip_guru, tanggal);

    }else if(kondisi == "ortukepsekguru"){
        html+=selTtdKepsek(data.nama_sekolah,data.nama_kepsek,data.nip_kepsek);
        html+=selOrtu;
        html+=selTtdGuru(subtitle, data.nama_guru, data.nip_guru, tanggal);
    }else{
        html+=""
    }
    html+=`</tr></tbody></table>`;
    return html;
}

export default tandatanganTable;