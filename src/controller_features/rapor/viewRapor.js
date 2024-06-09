const tabelDataRapo = (sebaran,mapelNonAgama, data)=>{
    let html ="";
    html+=`<table class="table table-sm table-bordered border-dark font12">`;
        html+=`<thead>`;
            //baris 1
            html+=`<tr>`;
                html+=`<th rowspan="3" style="width:20px" class="text-center align-middle text-bg-secondary">No</th>`;
                html+=`<th rowspan="3" style="width:20px" class="text-center align-middle text-bg-secondary">ID</th>`;
                html+=`<th rowspan="3" class="text-center align-middle text-bg-secondary">Nama Siswa</th>`;
                let kolomMapel = (mapelNonAgama.length+1);
                html+=`<th colspan="${kolomMapel}" class="text-center align-middle text-bg-secondary">Mata Pelajaran</th>`;
                html+=`<th rowspan="3" style="width:30px" class="text-center align-middle text-bg-secondary">Rerata</th>`;
                html+=`<th rowspan="3" style="width:20px" class="text-center align-middle text-bg-secondary">Rangking</th>`;
            html+=`</tr>`;
            //baris 2, data mapelnya;
            html+=`<tr>`;
                html+=`<th class="text-center align-mmiddle text-bg-secondary">Pendidikan Agama</th>`;
                mapelNonAgama.forEach(element => {
                    html+=`<th class="text-center align-mmiddle text-bg-secondary">${element.value}</th>`;
                    
                });
            html+=`<tr>`;
            //baris 3, data KKM mapelnya;
            html+=`<tr>`;
                let properti_mapel = sebaran.filter(s=> s.kodemapel == 'PAI');
                let teksKkm = properti_mapel[0]?'KKM':properti_mapel[0].ket_kkmkktp
                let teksKkm_nilai = properti_mapel[0]??'75';
                html+=`<th class="text-center align-mmiddle text-bg-secondary">${teksKkm} = ${teksKkm_nilai}<th>`;
                mapelNonAgama.forEach(element => {
                    
                    properti_mapel = sebaran.filter(s=> s.kodemapel == element.value);
                    teksKkm = properti_mapel[0]?'KKM':properti_mapel[0].ket_kkmkktp
                    teksKkm_nilai = properti_mapel[0]??'75'
                    
                    html+=`<th class="text-center align-mmiddle text-bg-secondary">${teksKkm} = ${teksKkm_nilai}</th>`;
                    
                });
            html+=`<tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;
        data.forEach((siswa, i_siswa)=>{
            html+=`<tr>`;
                html+=`<td class="text-center">${i_siswa+1}</td>`;
                html+=`<td class="text-center">${siswa.id}</td>`;
                const datarapr = siswa.datarapr;
                let count = 0;
                datarapr.forEach(rapor=>{
                    count+=rapor.raporAsli_nilai;
                    if(['PKRIS','PKATO'].includes(rapor.kodemapel)){
                        hmtl+=`<td class="text-center text-bg-info" title="${rapor.kodemapel}" data-kodemapel="${rapor.kodemapel}">${rapor.raporAsli_nilai}</td>`;
                        
                    }else{
                        hmtl+=`<td class="text-center" title="${rapor.kodemapel}" data-kodemapel="${rapor.kodemapel}">${rapor.raporAsli_nilai}</td>`;
                    }
                });
                let rerata = (count/datarapr.length).toFixed(2)
                html+=`<td class="text-center" data-key="rerata" data-keyvalue="${rerata}">${rerata}</td>`;
                html+=`<td class="text-center" data-key="rangking" data-keyvalue=""></td>`;

            html+=`</tr>`;
        })
        html+=`</tbody>`;
    html+=`</table>`;
    return html;
}
const tabelRekapRapor = (data)=>{
    let html = "";
    html+=`<h3 class="text-center mb-0">Rekapitulasi Raport Sementara</h3>`;
    html+=`<h4 class="text-center mb-0">Kelas ${data.kelas} Semester ${data.semester}</h4>`;
    html+=`<h4 class="text-center mb-3">Tahun Pelajaran ${data.tapel}</h4>`;
    html+=`<div class="table-responsive">`;
        html+=tabelDataRapo(data.mapelNonAgama,data.data);
    html+=`</div>`;
    return html;
}
const viewRaporFiturRapor = {
    'tabelRekapRapor':tabelRekapRapor
}

export default viewRaporFiturRapor;