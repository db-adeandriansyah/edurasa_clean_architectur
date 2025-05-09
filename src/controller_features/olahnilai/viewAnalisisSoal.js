
const htmlAnalisiSoal = (datasoal, dataRespon, dbsiswa,identitas)=>{
    let html="";
    /**--------- koleksi bentuksoal */;
    let arrBentuksoal = [...new Set(datasoal.map(n=>n.bentuksoal))];
    
    html=`<div id="printareaanalisis">`
        html+=`<h2 class="text-center fw-bold text-uppercase">Analisis Nilai Soal</h2>`;
        html+=`<table class="table table-sm table-borderless font14 lh-1">`;
            html+=`<tbody>`;
                html+=`<tr>`;
                    html+=`<td>Identitas Naskah</td><td style="width:5px">:</td><td>${identitas.idmapel}</td>`;
                    html+=`<td>Jenis Tagihan</td><td style="width:5px">:</td><td>${identitas.jenistagihan}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>Kurikulum</td><td style="width:5px">:</td><td>${identitas.kurikulum}</td>`;
                    html+=`<td>Dilaksanakan Pada Tgl</td><td style="width:5px">:</td><td>${identitas.tglpelaksanaan}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>Kelas</td><td style="width:5px">:</td><td>${identitas.kelas}</td>`;
                    html+=`<td>Penganalis</td><td style="width:5px">:</td><td>${identitas.namaguru.namaUser}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>Muatan Pelajaran</td><td style="width:5px">:</td><td>${identitas.muatanpelajaran}</td>`;
                    html+=`<td>Kompetensi yang Diukur</td><td style="width:5px">:</td><td>${identitas.ukurankompetensi}</td>`;
                html+=`</tr>`;
            html+=`</tbody>`;
        html+=`</table>`;
        html+=`<div class="mt-2 table-responsive">`;
        html+=`<table class="w3-table-all font10" id="tableanalisis">`;
        html+=`<thead>`;
            html+=`<tr>`;
                html+=`<th rowspan="3">No</th>`;
                html+=`<th rowspan="3">Nama Siswa</th>`;
                html+=`<th colspan="${datasoal.length}">Bentuk dan Nomor Soal pada Naskah</th>`;
                html+=`<th rowspan="3">Ketuntasan</th>`;
            html+=`</tr>`;
            html+=`<tr>`
            arrBentuksoal.forEach(b=>{
                let count = datasoal.filter(s=> s.bentuksoal == b);
                html+=`<th colspan="${count.length}">${b}</th>`;
            })
            
                html+=`</tr>`
            html+=`<tr>`;
                datasoal.forEach(n=>{
                    html+=`<th>${n.nobybentuk}</th>`
                });

            html+=`</tr>`;
        html+=`</thead>`;
        html+=`<tbody>`;

            dbsiswa.forEach((s,i)=>{
                let skor = dataRespon.filter(t=> t.tokensiswa == s.id  && t.matericode == identitas.matericode);
                // let kkm = identitas.kkm.filter(s=>s.kodemapel == identitas.matericode);
                let h = 0;
                
                html+=`<tr>`;
                    html+=`<td class="text-center">${(i+1)}</td>`;
                    html+=`<td class="text-nowrap">${s.pd_nama}</td>`;
                    if(skor.length>0){
                        datasoal.forEach(k=>{
                            // let kkm = identitas.kkm.filter(s=>s.kodemapel == k.propSoal.mapel)[0];
                            if(skor[skor.length-1]['SKOR_'+k.nosoal]>=1){
                                h++;
                                html+=`<td class="text-bg-success">${skor[skor.length-1]['SKOR_'+k.nosoal]}</td>`;
                            }else if(skor[skor.length-1]['SKOR_'+k.nosoal]<1 && skor[skor.length-1]['SKOR_'+k.nosoal]>0){
                                h+=parseFloat(skor[skor.length-1]['SKOR_'+k.nosoal])
                                html+=`<td class="text-bg-warning">${skor[skor.length-1]['SKOR_'+k.nosoal]}</td>`;
                            }else{
                                html+=`<td class="text-bg-danger">${skor[skor.length-1]['SKOR_'+k.nosoal]}</td>`;

                            }
                        })

                    }else{
                        datasoal.forEach(k=>{
                            html+=`<td></td>`;
                        })
                    }
                    if(skor.length>0){
                        let persen = ((h/datasoal.length)*100).toFixed(2);

                        // html+= `<td class="${((h/datasoal.length)*100)>=72?'text-start':'text-end text-danger'}">${persen}%</td>`;
                        html+= `<td class="text-center">${persen}%</td>`;
                    }else{
                        html+= `<td></td>`;
                    }
                html+=`</tr>`;
            })
        html+=`</tbody>`;
        html+=`</table>`;
        html+=`</div>`;
        html+=`<div class="row mt-3">`;
            html+=`<div class="col-sm-6 text-center" contenteditable="true">`;
                html+=`Mengetahui,<br>Kepala ${identitas.namaguru.namaSekolah}<br><br><br><br><br>`;
                html+=`<b><u>${identitas.namaguru.namaKepsek}</u></b><br>`;
                html+=`${identitas.namaguru.nipKepsek}`;
            html+=`</div>`;
            html+=`<div class="col-sm-6 text-center" contenteditable="true">`;
                html+=`Depok, ${new Date().toLocaleString('id-ID',{'dateStyle':'long'})}<br>${identitas.namaguru.jabatanUser} ${identitas.namaguru.tugasUser}<br><br><br><br><br>`;
                html+=`<b><u>${identitas.namaguru.namaUser}</u></b><br>`;
                html+=`${identitas.namaguru.nipUser}`;
            html+=`</div>`;
        html+=`</div>`;
    html+=`</div>`;
    html+=`<div class="fixed-bottom text-center">
                <button class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" id="btncetaknaskah" title="Cetak"><i class="bi-printer"></i></button>
                <button class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" id="btncetakword" title="Simpan ke Ms. Word"><i class="bi-file-word"></i></button>
                <button class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" id="btncetakpdf" title="Simpan ke pdf"><i class="bi-file-pdf"></i></button>
                <button class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" id="btnkembali" title="Ke Rekap Analisis"><i class="bi-arrow-return-right"></i></button>
            </div>`;
    return html;
}

const htmlRekapAnalisis = (datasoal, dataRespon, dbsiswa,identitas)=>{
    let html="";
    /**--------- koleksi bentuksoal */;
    const koleksibentuksoal = [...new Set(datasoal.map(n=>n.bentuksoal))];
    const tagihanOtomatis = koleksibentuksoal.filter(s=> ['Pilihan Ganda','PG Kompleks','BenarSalah'].includes(s));
    const tagihanManual = koleksibentuksoal.filter(s=> !['Pilihan Ganda','PG Kompleks','BenarSalah'].includes(s));
    
    html=`<div id="printareaanalisis" class="table-responsive">`
        html+=`<h2 class="text-center fw-bold text-uppercase">Analisis Butir Soal</h2>`;
        html+=`<table class="table table-sm table-borderless font14 lh-1">`;
            html+=`<tbody>`;
                html+=`<tr>`;
                    html+=`<td>Identitas Naskah</td><td style="width:5px">:</td><td>${identitas.idmapel}</td>`;
                    html+=`<td>Jenis Tagihan</td><td style="width:5px">:</td><td>${identitas.jenistagihan}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>Kurikulum</td><td style="width:5px">:</td><td>${identitas.kurikulum}</td>`;
                    html+=`<td>Dilaksanakan Pada Tgl</td><td style="width:5px">:</td><td>${identitas.tglpelaksanaan}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>Kelas</td><td style="width:5px">:</td><td>${identitas.kelas}</td>`;
                    html+=`<td>Penganalis</td><td style="width:5px">:</td><td>${identitas.namaguru.namaUser}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>Muatan Pelajaran</td><td style="width:5px">:</td><td>${identitas.muatanpelajaran}</td>`;
                    html+=`<td>Kompetensi yang Diukur</td><td style="width:5px">:</td><td>${identitas.ukurankompetensi}</td>`;
                html+=`</tr>`;
            html+=`</tbody>`;
        html+=`</table>`;

        html+=`<div class="mt-2 table-responsive">`;
        tagihanOtomatis.forEach((to,i)=>{
            let toItem = datasoal.filter(a=>a.bentuksoal == to);
            html+=`<h5 class="mt-3">Bentuk Soal ${to}</h5>`;
            html+=`<table class="font12" style="border-collapse:collapse;border-spacing:0;border:.5pt solid black">`;
                html+=`<thead>`;
                    html+=`<tr>`;
                        html+=`<th style="border:.5pt solid #000;align-text:center;vertical-align:middle;padding:8px 16px;background-color:#dcdcdc">No. Urut</th>`;
                        html+=`<th style="border:.5pt solid #000;align-text:center;vertical-align:middle;padding:8px 16px;background-color:#dcdcdc">No. Soal</th>`;
                        html+=`<th style="border:.5pt solid #000;align-text:center;vertical-align:middle;padding:8px 16px;background-color:#dcdcdc">Jumlah Siswa Menjawab Benar</th>`;
                        html+=`<th style="border:.5pt solid #000;align-text:center;vertical-align:middle;padding:8px 16px;background-color:#dcdcdc">Jumlah Peserta Test</th>`;
                        html+=`<th style="border:.5pt solid #000;align-text:center;vertical-align:middle;padding:8px 16px;background-color:#dcdcdc">Tingkat Kesukaran</th>`;
                    html+=`</tr>`;
                html+=`</thead>`;
                html+=`<tbody>`;
                toItem.forEach((c,ii)=>{
                    let skorC = dataRespon.filter(s=>s['SKOR_'+c.nosoal]==1);
                    let persen = ((skorC.length/dataRespon.length)*100);
                    html+=`<tr>`;
                        html+=`<td style="border:.5pt solid #000;text-align:center;vertical-align:top;padding:8px 16px">${(ii+1)}</td>`;
                        html+=`<td style="border:.5pt solid #000;text-align:center;vertical-align:top;padding:8px 16px">${c.nosoal}</td>`;
                        html+=`<td style="border:.5pt solid #000;text-align:center;vertical-align:top;padding:8px 16px">${skorC.length}</td>`;
                        html+=`<td style="border:.5pt solid #000;text-align:center;vertical-align:top;padding:8px 16px">${dataRespon.length} Siswa</td>`;
                        if(persen<=30){

                            html+=`<td style="border:.5pt solid #000;text-align:center;vertical-align:top;padding:8px 16px;background-color:red;color:yellow">Sukar</td>`;
                        }else if(persen>30 && persen<=70){
                            html+=`<td style="border:.5pt solid #000;text-align:center;vertical-align:top;padding:8px 16px;background-color:yellow;color:black"">Sedang</td>`;

                        }else{
                            html+=`<td style="border:.5pt solid #000;text-align:center;vertical-align:top;padding:8px 16px;background-color:green;color:yellow"">Mudah</td>`;

                        }
                    html+=`</tr>`;
                })
                html+=`</tbody>`;
            html+=`</table>`;
        });
        tagihanManual.forEach((to,i)=>{
            let toItem = datasoal.filter(a=>a.bentuksoal == to);
            html+=`<h5 class="mt-3">Bentuk Soal ${to}</h5>`;
            html+=`<table class="font12" style="border-collapse:collapse;border-spacing:0;border:.5pt solid black">`;
                html+=`<thead>`;
                    html+=`<tr>`;
                        html+=`<th style="border:.5pt solid #000;align-text:center;vertical-align:middle;padding:8px 16px;background-color:#dcdcdc">No. Urut</th>`;
                        html+=`<th style="border:.5pt solid #000;align-text:center;vertical-align:middle;padding:8px 16px;background-color:#dcdcdc">No. Soal</th>`;
                        html+=`<th style="border:.5pt solid #000;align-text:center;vertical-align:middle;padding:8px 16px;background-color:#dcdcdc">Rata-rata Skor</th>`;
                        html+=`<th style="border:.5pt solid #000;align-text:center;vertical-align:middle;padding:8px 16px;background-color:#dcdcdc">Jumlah Peserta Test</th>`;
                        html+=`<th style="border:.5pt solid #000;align-text:center;vertical-align:middle;padding:8px 16px;background-color:#dcdcdc">Tingkat Kesukaran</th>`;
                    html+=`</tr>`;
                html+=`</thead>`;
                html+=`<tbody>`;
                toItem.forEach((c,ii)=>{
                    let skorC = dataRespon.filter(s=>s['SKOR_'+c.nosoal]!=="").map(n=>parseFloat(n['SKOR_'+c.nosoal]));
                    
                    let persen = 0;
                    let rerata = 0;
                    let sum=0;
                    let rumus = 0
                    if(skorC.length>0){
                        // sum = skorC.reduce((a,b)=>parseFloat(a)+parseFloat(b));
                        sum = skorC.reduce((a,b)=>a+b);
                        rerata = (sum/dataRespon.length);
                        persen = (rerata*100);
                        rumus = (rerata/toItem.length);

                    }
                    
                    html+=`<tr>`;
                        html+=`<td style="border:.5pt solid #000;text-align:center;vertical-align:top;padding:8px 16px">${(ii+1)}</td>`;
                        html+=`<td style="border:.5pt solid #000;text-align:center;vertical-align:top;padding:8px 16px">${c.nosoal}</td>`;
                        html+=`<td style="border:.5pt solid #000;text-align:center;vertical-align:top;padding:8px 16px">${persen.toFixed(2)}</td>`;
                        html+=`<td style="border:.5pt solid #000;text-align:center;vertical-align:top;padding:8px 16px">${dataRespon.length} Siswa</td>`;
                        if(persen<=30){

                            html+=`<td style="border:.5pt solid #000;text-align:center;vertical-align:top;padding:8px 16px;background-color:red;color:yellow">Sukar</td>`;
                        }else if(persen>30 && persen<=70){
                            html+=`<td style="border:.5pt solid #000;text-align:center;vertical-align:top;padding:8px 16px;background-color:yellow;color:black"">Sedang</td>`;

                        }else{
                            html+=`<td style="border:.5pt solid #000;text-align:center;vertical-align:top;padding:8px 16px;background-color:green;color:yellow"">Mudah</td>`;

                        }
                    html+=`</tr>`;
                })
                html+=`</tbody>`;
            html+=`</table>`;

        })
        html+=`</div>`;

        html+=`<div class="row mt-3">`;
            html+=`<div class="col-sm-6 text-center" contenteditable="true">`;
                html+=`Mengetahui,<br>Kepala ${identitas.namaguru.namaSekolah}<br><br><br><br><br>`;
                html+=`<b><u>${identitas.namaguru.namaKepsek}</u></b><br>`;
                html+=`${identitas.namaguru.nipKepsek}`;
            html+=`</div>`;
            html+=`<div class="col-sm-6 text-center" contenteditable="true">`;
                html+=`Depok, ${new Date().toLocaleString('id-ID',{'dateStyle':'long'})}<br>${identitas.namaguru.jabatanUser} ${identitas.namaguru.tugasUser}<br><br><br><br><br>`;
                html+=`<b><u>${identitas.namaguru.namaUser}</u></b><br>`;
                html+=`${identitas.namaguru.nipUser}`;
            html+=`</div>`;
        html+=`</div>`;
    html+=`</div>`;
    html+=`<div class="fixed-bottom text-center">
                <button class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" id="btnkembali2" title="Ke Rekap Analisis"><i class="bi-arrow-return-left"></i></button>
                <button class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" id="btncetaknaskah2" title="Cetak"><i class="bi-printer"></i></button>
                <button class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" id="btncetakword2" title="Simpan ke Ms. Word"><i class="bi-file-word"></i></button>
                <button class="btn btn-sm border-bottom border-5 border-primary border-top-0 border-start-0 border-end-0 neon-lite-top rounded-pill rounded py-0" id="btncetakpdf2" title="Simpan ke pdf"><i class="bi-file-pdf"></i></button>
            </div>`;
    return html;
}

const viewAnalisisSoal = {
    htmlAnalisiSoal:htmlAnalisiSoal,
    htmlRekapAnalisis:htmlRekapAnalisis
}
export default viewAnalisisSoal;