import inputsElements from "../components/input-elements";
import { cardMenu } from "../sidebar/cardSidebar";

export const filteringSuratKeluarByTahun = (data,withCreate=false,title='Surat Default') =>{
    let datatahun = data.map(n=>new Date(n.tglsurat).getFullYear()).filter((x,i,a)=>a.indexOf(x)==i);
    let datatahunLabel = [{
        label:'Pilih tahun',
        value:''
    }];
    datatahun.forEach(element => {
        let obj = {};
        obj.label = element;
        obj.value = element;
        datatahunLabel.push(obj);
    });
    
    let html = "";
    html+=`<div class="row my-2 justify-content-center">`;
        html+=`<div class="col-md-4">`;
            html+=cardMenu('Filter By Tahun',
                inputsElements.floatingSelect('selectControlSuratKeluarTapel','Pilih Tahun',datatahunLabel, datatahunLabel[0].value)
            ,false);
        html+=`</div>`;
        if(withCreate){
            html+=`<div class="col-md-4">`;
                html+=cardMenu('Buat Surat',
                    `<div class="d-flex justify-content-center align-items-center"><button id="btn_new_surat" class="btn btn-sm btn-success border-danger border-bottom border-4 rounded-pill border-start-0 border-end-0 border-top-0">Tambah ${title}</button></div>`
                ,false);
            html+=`</div>`;

        }
    html+=`</div>`;
    return html;
}