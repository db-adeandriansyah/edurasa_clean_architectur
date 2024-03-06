export const ttd =(kanan, tengah,kiri)=>{
    
    let html = "";
    html+=`<p></p><div class="tandatangan">
    <table class="mt-3 tnr" style="width:100%;">
    <tbody>
    <tr>
        <td style="width:33%;text-align:center;vertical-align:middle;border:0" contenteditable="true" spellcheck="false">
            ${kanan}
        </td>
        <td style="width:33%;text-align:center;vertical-align:middle;border:0" contenteditable="true" spellcheck="false">
            ${tengah}
        </td>
        <td style="width:34%;text-align:center;vertical-align:middle;border:0" contenteditable="true" spellcheck="false">
            ${kiri}
        </td></tr></tbody></table>
    </div>`;
    return html;
}