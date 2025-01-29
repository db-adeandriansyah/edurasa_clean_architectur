const kurmerMapel = {
    PA:'Pendidikan Agama dan Budi Pekerti',
    PKN:'Pendidikan Pancasila',
    BINDO:'Bahasa Indonesia',
    MTK:'Matematika',
    IPAS:'Ilmu Pengetahuan Alam dan Sosial',
    RUPA:'Seni Rupa',
    PJOK:'Pendidikan Jasmani, Olahraga, dan Kesehatan',
    BSUND:'Bahasa dan Sastra Sunda',
    BING:'Bahasa Inggris'
};
const kurtilasMapel = {
    PA:'Pendidikan Agama dan Budi Pekerti',
    PKN:'Pendidikan Kewarganegaraan',
    BINDO:'Bahasa Indonesia',
    MTK:'Matematika',
    IPAS:'Ilmu Pengetahuan Alam dan Sosial',
    SBDP:'Seni Budaya dan Prakarya',
    PJOK:'Pendidikan Jasmani, Olahraga, dan Kesehatan',
    BSUND:'Bahasa dan Sastra Sunda',
    BING:'Bahasa Inggris'
};
const namaFase = (jenjang) =>{
    let result = "";
    let data ={
        '1':'FASE A',
        '2':'FASE A',
        '3':'FASE B',
        '4':'FASE B',
        '5':'FASE C',
        '6':'FASE C',
    }
    return data[jenjang];
}
const definisiMapel = (key,kurikulum)=>{
    let result = "";
    if(kurikulum==='kurmer'){
        result = kurmerMapel[key];
    }else{
        result = kurtilasMapel[key];
    }
    return result;
}
const definisiMapelAgama = (agama,kurikulum)=>{
    let result = "";
    let isJebod = kurikulum ==='k2006';
    if(agama === 'ISLAM'){
        result = 'Pendidikan Agama Islam' + (isJebod?'':' dan Budi Pekerti')
    }else if(agama === 'KRISTEN'){
        result = 'Pendidikan Agama Kristen' +(isJebod?'':' dan Budi Pekerti')
    }else if(agama === 'KATHOLIK'){
        result = 'Pendidikan Agama Katolik' +(isJebod?'':' dan Budi Pekerti')
    }else{
        result = 'Pendidikan Agama'
    }
    return result;
}
const rekapRaportRiwayat = (data,target,dataNotFound,siswaSaatIni_notFound_diTapelTarget)=>{
    const targetRiwayat = target.target;
    const mapel = targetRiwayat.mapel;
    const kurikulum = targetRiwayat.kurikulum
    const guru = data.find(s=>s.rombel===targetRiwayat.rombel);
    let html ="";
    
    html+=`<h2 class="text-center mb-0">Rekapitulasi Nilai Raport Kelas ${targetRiwayat.rombel}</h2>`;
    html+=`<h3 class="text-center mb-3">Tahun Pelajaran ${targetRiwayat.tapel} Semester ${targetRiwayat.semester}</h3>`;
    
    if(data.length===0){
        html+=`<div class="fs-2 text-center text-danger fw-bold">Tidak ditemukan</div>`;
    }else{
        html+=`<div class="overflow-x-auto">`;
            html+=`<table class="table table-sm toExcel table-bordered tnr font12 border-black">`;
                html+=`<thead>`;
                    html+=`<tr>`;
                        html+=`<th class="text-center bg-secondary-subtle align-middle" rowspan="2">No</th>`
                        html+=`<th class="text-center bg-secondary-subtle align-middle" rowspan="2">Nama Siswa</th>`;
                        html+=`<th class="text-center bg-secondary-subtle" colspan="${mapel.length}">Mata Pelajaran </th>`;
                        
                    html+=`</tr>`;
                    html+=`<tr>`;
                        mapel.forEach(item=>{
                            html+=`<th class="text-center bg-secondary-subtle">${item}</th>`;
                        })
                    html+=`</tr>`;
                html+=`</thead>`;
                html+=`<tbody>`;
                    data.filter(s=>s.rombel===targetRiwayat.rombel).forEach((item,index)=>{
                        html+=`<tr>`;
                            html+=`<td class="text-center">${index+1}</td>`;
                            html+=`<td class="text-nowrap">${item.nama}</td>`;
                            mapel.forEach(mp=>{
                                html+=`<td class="text-center">${item[mp]}</td>`;
                            })
                            

                        html+=`</tr>`;
                    });
                    if(dataNotFound.length>0){
                        dataNotFound.forEach((item,index)=>{
                            html+=`<tr>`;
                                html+=`<td class="text-center bg-danger-subtle">${data.length+(index+1)}</td>`;
                                html+=`<td data-idbaris="${item.idbaris}" data-idss="${targetRiwayat.idss}" class="text-nowrap bg-danger-subtle">${item.nama}</td>`;
                                mapel.forEach(mp=>{
                                    html+=`<td class="text-center bg-danger-subtle">${item[mp]}</td>`;
                                })
    
                            html+=`</tr>`;
                        });
                    }
                html+=`</tbody>`;
            html+=`</table>`;
            html+=`<p class="mb-0">Keterangan</p>`;
            html+=`<ul class="font10">`;
                    html+=`<li>Kurikulum yang berlaku pada tapel ini: ${targetRiwayat.kurikulum}</li>`
                    mapel.forEach(item=>{
                        html+=`<li>${item} : ${definisiMapel(item,kurikulum)}</li>`;
                    })
                    if(dataNotFound.length>0){
                        html+=`<li>Baris berwarna pada tabel menunjukkan data siswa yang telah mutasi/tidak naik kelas untuk keadaan saat ini dan terdata di rekapitulasi nilai pada tapel ${targetRiwayat.tapel} semester ${targetRiwayat.semester}`;
                            html+=`<ol>`;
                                dataNotFound.forEach(item=>{
                                    if(item.profil.aktif ==='aktif'){
                                        html+=`<li>${item.profil.pd_nama}, Kelas Saat ini: ${item.profil.nama_rombel} (Tapel ${target.current.tapel} semester ${target.current.semester})</li>`

                                    }else{
                                        html+=`<li>${item.profil.pd_nama}, keluar tanggal: ${item.profil.keluar_tgl!==""?new Date(item.profil.keluar_tgl).toLocaleString('id-ID',{dateStyle:'long'}):""}</li>`

                                    }
                                })
                            html+=`</ol>`;
                        html+=`</li>`
                    }
                    if(data.filter(s=>s.rombel!==targetRiwayat.rombel).length>0){
                        html+=`<li>Siswa Tidak naik kelas di Tapel ini:`
                            html+=`<ol>`;
                            data.filter(s=>s.rombel!==targetRiwayat.rombel).forEach(item=>{
                                html+=`<li>${item.nama} (Nilai Rekap ada di kelas ${item.rombel} tapel ${targetRiwayat.tapel} semester ${targetRiwayat.semester})</li>`;
                            })
                            html+=`</ol>`;
                        html+=`</li>`;
                    }
                    if(siswaSaatIni_notFound_diTapelTarget.length>0){
                        html+=`<li>Siswa Belum Terdaftar di Tapel/Semester ini:`
                            html+=`<ol>`;
                            siswaSaatIni_notFound_diTapelTarget.forEach(item=>{
                                html+=`<li>${item.pd_nama} masuk tanggal ${new Date(item.masuk_tgl).toLocaleString('id-ID',{dateStyle:'long'})}</li>`;
                            })
                            html+=`</ol>`;
                        html+=`</li>`;
                    }
            html+=`<ul>`
            html+=`<table class="table table-sm table-borderless mt-4">`;
                html+=`<tbody>`;
                    html+=`<tr>`
                        html+=`<td class="text-center text-nowrap">`;
                            html+= `Mengetahui, <br>Kepela UPTD SDN Ratujaya 1`
                            html+=`<br/><br/><br/><br/><br/>`
                            html+= `<u><b>${guru.kepsek}</b></u><br/>`;
                            html+=`NIP. ${guru.kepsek_nip}`
                        html+=`</td>`;
                        html+=`<td class="w-50"> </td>`
                        html+=`<td class="text-center text-nowrap">`;
                            html+= `Depok, ${new Date(guru.TITIMANGSA_RAPORT).toLocaleString('id-ID',{dateStyle:'long'})}<br/>`
                            html+=`Guru Kelas ${targetRiwayat.rombel}`
                            html+=`<br/><br/><br/><br/><br/>`
                            html+= `<u><b>${guru.walikelas}</b></u><br/>`;
                            html+=`${guru.walikelas_nip==""?"-":`NIP. ${guru.walikelas_nip}`}`
                        html+=`</td>`;
                    html+=`</tr>`
                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;

    }
    return html;
};

const html_raport_riwayat = (dataPertama,currentSiswa)=>{
    let html = "";
    html+=`<div id="area_rapor" class="tnr table-responsive">`;
        if(!dataPertama){
            html+=`<h2 class="text-center">Raport Tidak ditemukan</h2>`;
        }else{
            html+=dataPertama.rombel;
            html+=`<br/>`;
            html+=dataPertama.nama;
            html+=`<br/>`
            html+=dataPertama.kurikulum;
        }
    html+=`</div>`;
    html+=`<div id="area_kontrol" class="sticky-md-bottom text-center accord-bg print-hide rounded shadow-lg py-2 mt-5">`;
        html+=`<div class="row justify-content-center">`;
            html+=`<div class="col-6">`;
                html+=`<div class="input-group input-group-sm">`;
                    html+=`<button class="btn btn-sm btn-outline-primary" type="button" id="btnLeft">↤</button>`;
                        html+=`<select class="form-select form-select-sm" id="selectTargetSiswa">`;
                            currentSiswa.forEach((db,i_db)=>{
                                html+=`<option value="${db.id}">${db.pd_nama}</option>`;
                            })
                        html+=`</select>`;
                    html+=`<button class="btn btn-sm btn-outline-primary" type="button" id="btnRight">↦</button>`
                html+=`</div>`;
                html+=`<button class="btn btn-sm btn-success" id="btnPrintKelulusan">Print</button>`
            html+=`</div>`;
        html+=`</div>`;
    html+=`</div>`;
    return html;
}
const kontenRaportKurmer = (data,riwayat)=>{
    let html = "";
    html+=`<table class="toExcel font14 tnr" style="line-height:1;border-collapse:collapse;border-spacing:0;width:99.5%">`;
            html+=`<thead>`;
                html+=`<tr>`;
                    html+=`<th>&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th>&nbsp;</th>`;
                html+=`</tr>`;
            html+=`</thead>`;
            html+=`<tbody>`;
                html+=`<tr><td colspan="36" class="fw-bolder text-center" style="font-size:16px!important">RAPOR DAN PROFIL PESERTA DIDIK</td></tr>`;
                html+=`<tr><td colspan="36"><br/><br/><br/></td></tr>`;
                // html+=`<tr><td colspan="24"><br/></td></tr>`;
                html+=`<tr>`;
                    html+=`<td></td>`;
                    html+=`<td colspan="6">Nama Siswa</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="18">${data.nama}</td>`
                    html+=`<td colspan="5">Kelas</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="4">${data.rombel}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td></td>`;
                    html+=`<td colspan="6">No. Induk/NISN</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="18"><span>${data.profil.nis}</span>/<span>${data.profil.nisn}</span></td>`;
                    html+=`<td colspan="5">Fase</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="4">${namaFase(parseInt(data.rombel).toString())}</td>`;
                
                html+=`</tr>`;

                html+=`<tr>`;
                    html+=`<td></td>`;
                    html+=`<td colspan="6">Nama Sekolah</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="18">UPTD SDN Ratujaya 1</td>`;
                    html+=`<td colspan="5">Semester</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="4">${data.semester}</td>`;
                    
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td></td>`;
                    html+=`<td colspan="6">Alamat</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="18">Jl. SMP Ratujaya No 41, RT/RW 05/03, Kel. Ratujaya Kec. Cipayung</td>`;
                    html+=`<td colspan="5">Tahun Pelajaran</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="4" data-propertikelas="tapel">${riwayat.target.tapel}</td>`;
                    
                html+=`</tr>`;
                html+=`<tr><td colspan="36" style="border-bottom:2px double black"><br/></td></tr>`;
                html+=`<tr><td colspan="36"><br/></td></tr>`;
                
    /** Kurmer */            
                    //header
                    html+=`<tr><td colspan="36" class="fw-bold">A. Nilai dan Capaian Kompetensi</td></tr>`;
                    html+=`<tr>`
                        html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="2">No.</td>`;
                        html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="12">Mata Pelajaran</td>`;
                        html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="3">Nilai Akhir</td>`;
                        html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="19">Capaian Pembelajaran</td>`;
                    html+=`</tr>`;
                    /// mapel agama;
                    html+=`<tr><td colspan="36" class="border p-1 border-dark bg-secondary-subtle">A. Muatan Nasional</td></tr>`;

                    html+=`<tr>`;
                        html+=`<td rowspan="2" class="border p-1 text-center border-dark" colspan="2">1.</td>`;
                        html+=`<td class="border p-1 border-dark" colspan="34">Pendidikan Agama dan Budi Pekerti</td>`;
                    html+=`</tr>`;
                    
                    html+=`<tr>`
                        html+=`<td class="border p-1 border-dark" colspan="12" data-firstsiswa="pd_agama" data-keyrapor="agama" data-nilairapor="mapel_agama_kode_teks">`;
                            html+=definisiMapelAgama(data.agama,data.kurikulum); 
                        html+=`</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3">${data.PA?Math.round(data.PA):''}</td>`;
                        html+=`<td class="border p-1 border-dark"  id="AGAMA_deskripsi_maks" colspan="19">${data.PA_deskripsi}</td>`;
                    html+=`</tr>`;
                    //mapel selain agama dan mulok
                    riwayat.target.mapelsiswa(parseInt(data.rombel)).filter(s=>!['PA','BSUND','BING'].includes(s)).forEach((kodemapel,indek)=>{
                        html+=`<tr>`
                            html+=`<td class="border p-1 text-center border-dark" colspan="2">${(indek+2)}.</td>`;
                            html+=`<td  class="border p-1 border-dark" colspan="12">`;
                                html+=definisiMapel(kodemapel,data.kurikulum)
                            html+=`</td>`;
                            html+=`<td class="border p-1 text-center border-dark" colspan="3">${data[kodemapel]?Math.round(data[kodemapel]):''}</td>`;
                            html+=`<td class="border p-1 border-dark" colspan="19">${data[kodemapel+'_deskripsi']}</td>`;
                        html+=`</tr>`;
                    })
                    html+=`<tr><td colspan="36" class="border p-1 border-dark bg-secondary-subtle">B. Muatan Lokal</td></tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">${(riwayat.target.mapelsiswa(parseInt(data.rombel)).filter(s=>!['BSUND','BING'].includes(s)).length+1)}.</td>`;
                        html+=`<td class="border p-1 border-dark" colspan="34">Muatan Lokal Wajib</td>`;
                    html+=`</tr>`;
                    //bsund
                    html+=`<tr>`
                        html+=`<td class="border p-1 text-end border-dark" colspan="2">a.</td>`;
                        html+=`<td  class="border p-1 border-dark" colspan="12">`;
                            html+=definisiMapel('BSUND',data.kurikulum);
                        html+=`</td>`;
                        html+=`<td  class="border p-1 text-center border-dark" colspan="3" >${data.BSUND?Math.round(data.BSUND):''}</td>`;
                        html+=`<td class="border p-1 border-dark" data-nilairapor="BSUND_P_DESKRIPSI" colspan="19">${data.BSUND_deskripsi}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">${(riwayat.target.mapelsiswa(parseInt(data.rombel)).filter(s=>!['BSUND','BING'].includes(s)).length+2)}.</td>`;
                        html+=`<td class="border p-1 border-dark" colspan="34">Muatan Lokal Pilihan</td>`;
                    html+=`</tr>`;
                    //mulok pilihan
                    html+=`<tr>`    
                        html+=`<td class="border p-1 text-end border-dark" colspan="2">b.</td>`;
                        html+=`<td  class="border p-1 border-dark" colspan="12">`;
                            html+=definisiMapel(riwayat.target.mapelsiswa(parseInt(data.rombel)).find(s=>s==='BING')??"",data.kurikulum)??"";
                        html+=`</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3"  data-nilairapor="BING">${data.BING?Math.round(data.BING):''}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" data-nilairapor="BING_P_DESKRIPSI" colspan="19">${data.BING_deskripsi}</td>`;
                    html+=`</tr>`;
                    /** B. Ekstrakurikuler */
                                    
                    html+=`<tr><td colspan="36"><br/></td></tr>`;
                    html+=`<tr><td colspan="36" class="fw-bold">B. Ekstrakurikuler</td></tr>`;
                    //ekskul1
                    html+=`<tr>`
                        html+=`<td colspan="2"  class="border p-1 text-center border-dark bg-secondary-subtle">No.</td>`;
                        html+=`<td colspan="12" class="border p-1 text-center border-dark bg-secondary-subtle">Kegiatan Ekstrakurikuler</td>`;
                        html+=`<td colspan="3"  class="border p-1 text-center border-dark bg-secondary-subtle">Nilai</td>`;
                        html+=`<td colspan="15" class="border p-1 text-center border-dark bg-secondary-subtle">Keterangan</td>`;
                        html+=`<td colspan="4"></td>`;
                    html+=`</tr>`
                    html+=`<tr>`
                        html+=`<td colspan="2"  class="border p-1 text-center border-dark">1.</td>`;
                        html+=`<td colspan="12" class="border p-1 border-dark">${data.EKSKUL_1_NAMA}</td>`;
                        html+=`<td colspan="3"  class="border p-1 border-dark">${data.EKSKUL_1_NILAI}</td>`;
                        html+=`<td colspan="15" class="border p-1 border-dark">${data.EKSKUL_1_KETERANGAN}</td>`;
                        html+=`<td colspan="4"></td>`;
                    html+=`</tr>`
                    html+=`<tr>`
                        html+=`<td colspan="2"  class="border p-1 text-center border-dark">2.</td>`;
                        html+=`<td colspan="12" class="border p-1 border-dark">${data.EKSKUL_2_NAMA}</td>`;
                        html+=`<td colspan="3"  class="border p-1 border-dark">${data.EKSKUL_2_NILAI}</td>`;
                        html+=`<td colspan="15" class="border p-1 border-dark">${data.EKSKUL_2_KETERANGAN}</td>`;
                        html+=`<td colspan="4"></td>`;
                    html+=`</tr>`;
                    
                    /** C. Tinggi dan Berat Badan */
                    
                    html+=`<tr><td colspan="36"><br/></td></tr>`;
                    html+=`<tr><td colspan="36" class="fw-bold">C. Perkembangan Fisik (Tinggi dan Berat Badan)</td></tr>`;
                    html+=`<tr>`
                        html+=`<td rowspan="2" colspan="2"  class="border p-1 text-center border-dark bg-secondary-subtle">No.</td>`;
                        html+=`<td rowspan="2" colspan="7" class="border p-1 text-center border-dark bg-secondary-subtle">Aspek yang diukur</td>`;
                        html+=`<td colspan="4"  class="border p-1 text-center border-dark bg-secondary-subtle">Semester</td>`;
                        html+=`<td colspan="23"></td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark bg-secondary-subtle">1</td>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark bg-secondary-subtle">2</td>`;
                        html+=`<td colspan="23"></td>`;
                    html+=`</tr>`;

                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">1.</td>`;
                        html+=`<td colspan="7" class="border p-1 border-dark">Tinggi Badan (cm)</td>`;
                        html+=`<td colspan="2" class="border p-1 border-dark">${data.TINGGIBADAN_SEMESTER_1}</td>`;
                        html+=`<td colspan="2" class="border p-1 border-dark">${data.TINGGIBADAN_SEMESTER_2}</td>`;
                        html+=`<td colspan="23"></td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">2.</td>`;
                        html+=`<td colspan="7" class="border p-1 border-dark">Berat Badan (kg)</td>`;
                        html+=`<td colspan="2" class="border p-1 border-dark">${data.BERATBADAN_SEMESTER_1}</td>`;
                        html+=`<td colspan="2" class="border p-1 border-dark">${data.BERATBADAN_SEMESTER_2}</td>`;
                        html+=`<td colspan="23"></td>`;
                    html+=`</tr>`;
                    /** D. Kondisi Kesehatan*/
                    
                    html+=`<tr><td colspan="36" class="fw-bold"><br/></td></tr>`;
                    html+=`<tr><td colspan="36" class="fw-bold">D. Perkembangan Kondisi Kesehatan</td></tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark bg-secondary-subtle">No.</td>`
                        html+=`<td colspan="7" class="border p-1 text-center border-dark bg-secondary-subtle">Aspek Fisik</td>`
                        html+=`<td colspan="23" class="border p-1 text-center border-dark bg-secondary-subtle">Keterangan</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2"  class="border p-1 text-center border-dark">1.</td>`
                        html+=`<td colspan="7"  class="border p-1 border-dark">Penglihatan</td>`
                        html+=`<td colspan="23" class="border p-1 border-dark">${data.PENGLIHATAN}</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">2.</td>`
                        html+=`<td colspan="7" class="border p-1 border-dark">Pendengaran</td>`
                        html+=`<td colspan="23" class="border p-1 border-dark">${data.PENDENGARAN}</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">3.</td>`
                        html+=`<td colspan="7" class="border p-1 border-dark">Gigi</td>`
                        html+=`<td colspan="23" class="border p-1 border-dark">${data.GIGI}</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">4.</td>`
                        html+=`<td colspan="7" class="border p-1 border-dark">Penyakit Lainnya</td>`
                        html+=`<td colspan="23" class="border p-1 border-dark">${data.KESEHATANLAIN}</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`;

                    //Prestasi

                    html+=`<tr><td colspan="36" class="fw-bold"><br/></td></tr>`;
                    html+=`<tr><td colspan="36" class="fw-bold">E. Prestasi</td></tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark bg-secondary-subtle">No.</td>`
                        html+=`<td colspan="7" class="border p-1 text-center border-dark bg-secondary-subtle">Prestasi</td>`
                        html+=`<td colspan="23" class="border p-1 text-center border-dark bg-secondary-subtle">Keterangan</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2"  class="border p-1 text-center border-dark">1.</td>`
                        html+=`<td colspan="7"  class="border p-1 border-dark">${data.PRESTASI_1_NAMA}</td>`
                        html+=`<td colspan="23" class="border p-1 border-dark">${data.PRESTASI_1_KETERANGAN}</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">2.</td>`
                        html+=`<td colspan="7"  class="border p-1 border-dark">${data.PRESTASI_2_NAMA}</td>`
                        html+=`<td colspan="23" class="border p-1 border-dark">${data.PRESTASI_2_KETERANGAN}</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">3.</td>`
                        html+=`<td colspan="7"  class="border p-1 border-dark">${data.PRESTASI_3_NAMA}</td>`
                        html+=`<td colspan="23" class="border p-1 border-dark">${data.PRESTASI_3_KETERANGAN}</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`;
                    
                    html+=`<tr><td colspan="36" class="fw-bold"><br/></td></tr>`;
                    html+=`<tr><td colspan="36" class="fw-bold">F. Saran-saran</td></tr>`;
                    html+=`<tr>`
                        html+=`<td></td>`
                        html+=`<td  style="min-height:300px" colspan="31" class="border p-1 border-dark text-center">${data.SARAN}</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`
                    
                    html+=`<tr><td colspan="36" class="fw-bold"><br/></td></tr>`;
                    html+=`<tr><td colspan="36" class="fw-bold">G. Kehadiran<br/></td></tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="6" class="border-start border-top border-bottom-0 border-end-0 p-1 border-dark">Sakit</td>`;
                        html+=`<td class="border-start-0 border-top border-bottom-0 border-end-0 p-1 border-dark">:</td>`
                        html+=`<td colspan="3" class="border-start-0 border-top border-bottom-0 border-end p-1 border-dark" data-nilairapor="sakit">${data.Sakit}</td>`;
                        html+=`<td colspan="24"></td>`
                    html+=`<tr>`;
                    html+=`<tr>`;
                        // html+=`<td colspan="3"></td>`
                        html+=`<td colspan="6" class="border-start border-top-0 border-bottom-0 border-end-0 p-1 border-dark">Ijin</td>`;
                        html+=`<td class="border-start-0 border-top-0 border-bottom-0 border-end-0 p-1 border-dark">:</td>`
                        html+=`<td colspan="3" class="border-start-0 border-top-0 border-bottom-0 border-end p-1 border-dark" data-nilairapor="ijin">${data.Ijin}</td>`;
                        html+=`<td colspan="24"></td>`
                    html+=`<tr>`;
                    html+=`<tr>`;
                        // html+=`<td colspan="3"></td>`
                        html+=`<td colspan="6" class="border-start border-top-0 border-bottom border-end-0 p-1 border-dark">Tanpa Keterangan</td>`;
                        html+=`<td class="border-start-0 border-top-0 border-bottom border-end-0 p-1 border-dark">:</td>`
                        html+=`<td colspan="3" class="border-start-0 border-top-0 border-bottom border-end p-1 border-dark" data-nilairapor="alpa">${data.Alpa}</td>`;
                        html+=`<td colspan="24"></td>`
                    html+=`<tr>`;
                            if(data.semester == 2){
                            html+=`<tr><td colspan="36"><br/><br/><br/></td></tr>`;
                            html+=`<tr><td colspan="3"></td>`;
                                html+=`<td colspan="30" class="fw-bold">`;
                                    html+=`Berdasarkan pencapaian kompetensi selama menempuh pembelajaran, peserta didik atas nama:`
                                    html+=`<h4 class="text-center fw-bold">${data.nama}</h4>`;
                                    html+=`dengan ini dinyatakan:`
                                    if(parseInt(data.rombel) === 6){
                                        html+=`<h3 class="text-center fw-bold"><span>${data.kenaikankelas}</span></h3>`;

                                    }else{
                                        html+=`<h3 class="text-center fw-bold"><span>${data.kenaikankelas}</span> <span data-nilairapor="NAIKTINGGAL_KELAS_DI">${data.kekelas}</span></h3>`;

                                    }
                                
                                html+=`</td>`;
                            html+=`<td colspan="3"></td></tr>`;
                            
                            html+=`<tr><td colspan="36" class="fw-bold"><br/><br/><br/><br/></td></tr>`;
                            html+=`<tr>`;
                                html+=`<td colspan="12" class="text-center p-1">Mengetahui,<br/>Orang tua/Wali<br><br><br><br><br><br>_______________</td>`;
                                html+=`<td colspan="12" class="text-center p-1">`;
                                html+=`</td>`;
                                html+=`<td colspan="12" class="text-center p-1 align-top">`;
                                html+=`Depok, <span>${new Date(data.TITIMANGSA_RAPORT).toLocaleString('id-ID',{dateStyle:'long'})}</span><br>`;
                                html+=`Guru Kelas ${data.rombel}`;
                                html+=`<br><br><br><br><br><br>`;
                                html+=`<u><b>${data.walikelas}</b></u><br>`;
                                html+=`<span>${data.walikelas_nip==""?"":`NIP. ${data.walikelas_nip}`}</span>`;
                                html+=`</td>`;
                            html+=`</tr>`
                            // html+=`<tr><td colspan="36" class="fw-bold"><br/><br/><br/><br/></td></tr>`;
                            html+=`<tr>`;
                                html+=`<td colspan="12"></td>`
                                html+=`<td colspan="12" class="align-top text-center">`;
                                    
                                html+=`Mengetahui,<br>`;
                                html+=`Kepala UPTD SDN Ratujaya 1`;

                                html+=`<br><br><br><br><br>`;
                                html+=`<u><b>${data.kepsek}</b></u><br>`;
                                html+=`<span>NIP. ${data.kepsek_nip}</span>`
                                html+=`</td>`;
                                html+=`<td colspan="12"></td>`
                            html+=`<tr>`;

                    }else{
                            html+=`<tr><td colspan="36" class="fw-bold"><br/><br/></td></tr>`;
                            html+=`<tr>`;
                                html+=`<td colspan="18" class="text-center p-1">Mengetahui,<br>Orang tua/Wali<br><br><br><br><br>_______________</td>`;
                                html+=`<td colspan="18" class="text-center p-1">`;
                                html+=`Depok, <span>${new Date(data.TITIMANGSA_RAPORT).toLocaleString('id-ID',{dateStyle:'long'})}</span><br>`;
                                html+=`Guru Kelas ${data.rombel}`;
                                html+=`<br><br><br><br><br><br>`;
                                html+=`<u><b>${data.walikelas}</b></u><br>`;
                                html+=`<span>${data.walikelas_nip==""?"":`NIP. ${data.walikelas_nip}`}</span>`;
                                html+=`</td>`;
                            html+=`</tr>`
                    }
        html+=`</tbody>`;
        html+=`</table>`;
    return html;
}
const kontenRaportKurtilas = (data,riwayat)=>{
    let html = "";
    html+=`<table class="toExcel font14 tnr" style="line-height:1;border-collapse:collapse;border-spacing:0;width:99.5%">`;
            html+=`<thead>`;
                html+=`<tr>`;
                    html+=`<th>&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th>&nbsp;</th>`;
                html+=`</tr>`;
            html+=`</thead>`;
            html+=`<tbody>`;
                html+=`<tr><td colspan="36" class="fw-bolder text-center" style="font-size:16px!important">RAPOR DAN PROFIL PESERTA DIDIK</td></tr>`;
                html+=`<tr><td colspan="36"><br/><br/><br/></td></tr>`;
                // html+=`<tr><td colspan="24"><br/></td></tr>`;
                html+=`<tr>`;
                    html+=`<td></td>`;
                    html+=`<td colspan="6">Nama Siswa</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="18">${data.nama}</td>`
                    html+=`<td colspan="5">Kelas</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="4">${data.rombel}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td></td>`;
                    html+=`<td colspan="6">No. Induk/NISN</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="18"><span>${data.profil.nis}</span>/<span>${data.profil.nisn}</span></td>`;
                    html+=`<td colspan="5">Semester</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="4" data-propertikelas="semester">${data.semester}</td>`;
                
                html+=`</tr>`;

                html+=`<tr>`;
                    html+=`<td></td>`;
                    html+=`<td colspan="6">Nama Sekolah</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="18">UPTD SDN Ratujaya 1</td>`;
                    html+=`<td colspan="5">Tahun Pelajaran</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="4">${riwayat.target.tapel}</td>`;
                    
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td></td>`;
                    html+=`<td colspan="6">Alamat</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="18">Jl. SMP Ratujaya No 41, RT/RW 05/03, Kel. Ratujaya Kec. Cipayung</td>`;
                    
                    html+=`<td colspan="5"></td>`;
                    html+=`<td></td>`;
                    html+=`<td colspan="4"></td>`;
                html+=`</tr>`;
                html+=`<tr><td colspan="36" style="border-bottom:2px double black"><br/></td></tr>`;
                html+=`<tr><td colspan="36"><br/></td></tr>`;
                //raport
                html+=`<tr><td colspan="36" class="fw-bold">A. Sikap</td></tr>`;
                html+=`<tr><td></td><td colspan="35">1. Spiritual</td></tr>`;
                html+=`<tr>`;
                    html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="4">Predikat</td>`;
                    html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="32">Deskripsi</td>`;
                html+=`<tr>`;
                html+=`<tr>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="4">${data.K1_predikat}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="32" style="min-height:100px">${data.K1_deskripsi}</td>`;
                html+=`<tr>`;

                html+=`<tr><td></td><td colspan="35">2. Sosial</td></tr>`;
                html+=`<tr>`;
                    html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="4">Predikat</td>`;
                    html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="32">Deskripsi</td>`;
                html+=`<tr>`;
                html+=`<tr>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="4">${data.K2_predikat}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="32" style="min-height:100px">${data.K2_deskripsi}</td>`;
                html+=`<tr>`;
                
                html+=`<tr><td colspan="36" class="fw-bold"><br/></td></tr>`;
                html+=`<tr><td colspan="36" class="fw-bold">B. Pengetahuan Dan Keterampilan</td></tr>`;
                html+=`<tr>`
                    html+=`<td rowspan="2" class="border p-1 text-center border-dark bg-secondary-subtle" colspan="2">No.</td>`;
                    html+=`<td rowspan="2" class="border p-1 text-center border-dark bg-secondary-subtle" colspan="8">Mata Pelajaran</td>`;
                    html+=`<td rowspan="2" class="border p-1 text-center border-dark bg-secondary-subtle" colspan="2">KKM</td>`;
                    html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="12">Kompetensi Pengetahuan</td>`;
                    html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="12">Kompetensi Keterampilan</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    
                    html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="2">Nilai</td>`
                    html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="2">Predikat</td>`
                    html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="8">Deskripsi</td>`
                
                    html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="2">Nilai</td>`
                    html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="2">Predikat</td>`
                    html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="8">Deskripsi</td>`
                html+=`</tr>`;
                /// mapel agama;
                    html+=`<tr><td colspan="36" class="border p-1 border-dark bg-secondary-subtle">A. Muatan Nasional</td></tr>`;
                    html+=`<tr>`;
                        html+=`<td rowspan="2" class="border p-1 text-center border-dark" colspan="2">1.</td>`;
                        html+=`<td class="border p-1 border-dark" colspan="34">Pendidikan Agama dan Budi Pekerti</td>`;
                    html+=`</tr>`;
                    
                    html+=`<tr>`
                        html+=`<td class="border p-1 border-dark" colspan="8" data-firstsiswa="pd_agama" data-keyrapor="agama" data-nilairapor="mapel_agama_kode_teks">`;
                            html+=definisiMapelAgama(data.agama, data.kurikulum);
                        html+=`</td>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">${data.PA_kkm}</td>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">${data.PA}</td>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">${data.PA_predikat}</td>`;
                        html+=`<td class="border p-1 border-dark font10" colspan="8">${data.PA_deskripsi}</td>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">${data.PA_K}</td>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">${data.PA_K_predikat}</td>`;
                        html+=`<td class="border p-1 border-dark font10" colspan="8">${data.PA_K_deskripsi}</td>`;
                    html+=`</tr>`;
                    riwayat.target.mapelsiswa(parseInt(data.rombel)).filter(s=>!['PA','BSUND','BING'].includes(s)).forEach((mp,indek)=>{
                        
                            html+=`<tr>`
                            html+=`<td  colspan="2" class="border p-1 text-center border-dark">${(indek+2)}.</td>`;
                                html+=`<td class="border p-1 border-dark" colspan="8">`;
                                    html+=definisiMapel(mp, data.kurikulum);
                                html+=`</td>`;
                                html+=`<td colspan="2" class="border p-1 text-center border-dark">${data[mp+'_kkm']}</td>`;
                                html+=`<td colspan="2" class="border p-1 text-center border-dark">${data[mp]}</td>`;
                                html+=`<td colspan="2" class="border p-1 text-center border-dark">${data[mp+'_predikat']}</td>`;
                                html+=`<td class="border p-1 border-dark font10" colspan="8">${data[mp+'_deskripsi']}</td>`;
                                html+=`<td colspan="2" class="border p-1 text-center border-dark">${data[mp+'_K']}</td>`;
                                html+=`<td colspan="2" class="border p-1 text-center border-dark">${data[mp+'_K_predikat']}</td>`;
                                html+=`<td class="border p-1 border-dark font10" colspan="8">${data[mp+'_K_deskripsi']}</td>`;
                            html+=`</tr>`;
                    })

                    html+=`<tr><td colspan="36" class="border p-1 border-dark bg-secondary-subtle">B. Muatan Lokal</td></tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">${(riwayat.target.mapelsiswa(parseInt(data.rombel)).filter(s=>!['BSUND','BING'].includes(s)).length+1)}.</td>`;
                        html+=`<td class="border p-1 border-dark" colspan="34">Muatan Lokal Wajib</td>`;
                    html+=`</tr>`;

                    html+=`<tr>`
                        html+=`<td class="border p-1 text-center border-dark text-end" colspan="2">a.</td>`;
                        html+=`<td class="border p-1 border-dark" colspan="8">`;
                            html+=definisiMapel('BSUND',data.kurikulum)
                        html+=`</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="2">${data.BSUND_kkm}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="2" data-nilairapor="BSUND">${data.BSUND}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="2" data-nilairapor="BSUND_P_PREDIKAT">${data.BSUND_predikat}</td>`;
                        html+=`<td class="border p-1 border-dark font10" data-nilairapor="BSUND_P_DESKRIPSI" colspan="8">${data.BSUND_deskripsi}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="2" data-nilairapor="BSUND_NILAI_KETERAMPILAN">${data.BSUND_K}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="2" data-nilairapor="BSUND_K_PREDIKAT">${data.BSUND_K_predikat}</td>`;
                        html+=`<td class="border p-1 border-dark font10" data-nilairapor="BSUND_K_DESKRIPSI" colspan="8">${data.BSUND_K_deskripsi}</td>`;
                    html+=`</tr>`;
                    
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">${(riwayat.target.mapelsiswa(parseInt(data.rombel)).filter(s=>!['BSUND','BING'].includes(s)).length+2)}.</td>`;
                        html+=`<td class="border p-1 border-dark" colspan="34">Muatan Lokal Pilihan</td>`;
                    html+=`</tr>`;

                    html+=`<tr>`
                        html+=`<td class="border p-1 text-center border-dark text-end" colspan="2">b.</td>`;
                        html+=`<td class="border p-1 border-dark" colspan="8">`;
                        html+=definisiMapel(riwayat.target.mapelsiswa(parseInt(data.rombel)).find(s=>s==='BING')??"",data.kurikulum)??"";
                        html+=`</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="2">${data.BING_kkm}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="2">${data.BING}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="2">${data.BING_predikat}</td>`;
                        html+=`<td class="border p-1 border-dark font8" colspan="8">${data.BING_deskripsi}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="2">${data.BING_K}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="2">${data.BING_K_predikat}</td>`;
                        html+=`<td class="border p-1 border-dark font8" colspan="8">${data.BING_K_deskripsi}</td>`;
                    html+=`</tr>`;

                    html+=`<tr><td colspan="36"><br/></td></tr>`;
                    html+=`<tr><td colspan="36" class="fw-bold">B. Ekstrakurikuler</td></tr>`;
                    //ekskul1
                    html+=`<tr>`
                        html+=`<td colspan="2"  class="border p-1 text-center border-dark bg-secondary-subtle">No.</td>`;
                        html+=`<td colspan="12" class="border p-1 text-center border-dark bg-secondary-subtle">Kegiatan Ekstrakurikuler</td>`;
                        html+=`<td colspan="3"  class="border p-1 text-center border-dark bg-secondary-subtle">Nilai</td>`;
                        html+=`<td colspan="15" class="border p-1 text-center border-dark bg-secondary-subtle">Keterangan</td>`;
                        html+=`<td colspan="4"></td>`;
                    html+=`</tr>`
                    html+=`<tr>`
                        html+=`<td colspan="2"  class="border p-1 text-center border-dark">1.</td>`;
                        html+=`<td colspan="12" class="border p-1 border-dark">${data.EKSKUL_1_NAMA}</td>`;
                        html+=`<td colspan="3"  class="border p-1 border-dark">${data.EKSKUL_1_NILAI}</td>`;
                        html+=`<td colspan="15" class="border p-1 border-dark">${data.EKSKUL_1_KETERANGAN}</td>`;
                        html+=`<td colspan="4"></td>`;
                    html+=`</tr>`
                    html+=`<tr>`
                        html+=`<td colspan="2"  class="border p-1 text-center border-dark">2.</td>`;
                        html+=`<td colspan="12" class="border p-1 border-dark">${data.EKSKUL_2_NAMA}</td>`;
                        html+=`<td colspan="3"  class="border p-1 border-dark">${data.EKSKUL_2_NILAI}</td>`;
                        html+=`<td colspan="15" class="border p-1 border-dark">${data.EKSKUL_2_KETERANGAN}</td>`;
                        html+=`<td colspan="4"></td>`;
                    html+=`</tr>`;
                    
                    /** C. Tinggi dan Berat Badan */
                    
                    html+=`<tr><td colspan="36"><br/></td></tr>`;
                    html+=`<tr><td colspan="36" class="fw-bold">C. Perkembangan Fisik (Tinggi dan Berat Badan)</td></tr>`;
                    html+=`<tr>`
                        html+=`<td rowspan="2" colspan="2"  class="border p-1 text-center border-dark bg-secondary-subtle">No.</td>`;
                        html+=`<td rowspan="2" colspan="7" class="border p-1 text-center border-dark bg-secondary-subtle">Aspek yang diukur</td>`;
                        html+=`<td colspan="4"  class="border p-1 text-center border-dark bg-secondary-subtle">Semester</td>`;
                        html+=`<td colspan="23"></td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark bg-secondary-subtle">1</td>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark bg-secondary-subtle">2</td>`;
                        html+=`<td colspan="23"></td>`;
                    html+=`</tr>`;

                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">1.</td>`;
                        html+=`<td colspan="7" class="border p-1 border-dark">Tinggi Badan (cm)</td>`;
                        html+=`<td colspan="2" class="border p-1 border-dark">${data.TINGGIBADAN_SEMESTER_1}</td>`;
                        html+=`<td colspan="2" class="border p-1 border-dark">${data.TINGGIBADAN_SEMESTER_2}</td>`;
                        html+=`<td colspan="23"></td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">2.</td>`;
                        html+=`<td colspan="7" class="border p-1 border-dark">Berat Badan (kg)</td>`;
                        html+=`<td colspan="2" class="border p-1 border-dark">${data.BERATBADAN_SEMESTER_1}</td>`;
                        html+=`<td colspan="2" class="border p-1 border-dark">${data.BERATBADAN_SEMESTER_2}</td>`;
                        html+=`<td colspan="23"></td>`;
                    html+=`</tr>`;
                    /** D. Kondisi Kesehatan*/
                    
                    html+=`<tr><td colspan="36" class="fw-bold"><br/></td></tr>`;
                    html+=`<tr><td colspan="36" class="fw-bold">D. Perkembangan Kondisi Kesehatan</td></tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark bg-secondary-subtle">No.</td>`
                        html+=`<td colspan="7" class="border p-1 text-center border-dark bg-secondary-subtle">Aspek Fisik</td>`
                        html+=`<td colspan="23" class="border p-1 text-center border-dark bg-secondary-subtle">Keterangan</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2"  class="border p-1 text-center border-dark">1.</td>`
                        html+=`<td colspan="7"  class="border p-1 border-dark">Penglihatan</td>`
                        html+=`<td colspan="23" class="border p-1 border-dark">${data.PENGLIHATAN}</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">2.</td>`
                        html+=`<td colspan="7" class="border p-1 border-dark">Pendengaran</td>`
                        html+=`<td colspan="23" class="border p-1 border-dark">${data.PENDENGARAN}</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">3.</td>`
                        html+=`<td colspan="7" class="border p-1 border-dark">Gigi</td>`
                        html+=`<td colspan="23" class="border p-1 border-dark">${data.GIGI}</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">4.</td>`
                        html+=`<td colspan="7" class="border p-1 border-dark">Penyakit Lainnya</td>`
                        html+=`<td colspan="23" class="border p-1 border-dark">${data.KESEHATANLAIN}</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`;

                    //Prestasi

                    html+=`<tr><td colspan="36" class="fw-bold"><br/></td></tr>`;
                    html+=`<tr><td colspan="36" class="fw-bold">E. Prestasi</td></tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark bg-secondary-subtle">No.</td>`
                        html+=`<td colspan="7" class="border p-1 text-center border-dark bg-secondary-subtle">Prestasi</td>`
                        html+=`<td colspan="23" class="border p-1 text-center border-dark bg-secondary-subtle">Keterangan</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2"  class="border p-1 text-center border-dark">1.</td>`
                        html+=`<td colspan="7"  class="border p-1 border-dark">${data.PRESTASI_1_NAMA}</td>`
                        html+=`<td colspan="23" class="border p-1 border-dark">${data.PRESTASI_1_KETERANGAN}</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">2.</td>`
                        html+=`<td colspan="7"  class="border p-1 border-dark">${data.PRESTASI_2_NAMA}</td>`
                        html+=`<td colspan="23" class="border p-1 border-dark">${data.PRESTASI_2_KETERANGAN}</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="2" class="border p-1 text-center border-dark">3.</td>`
                        html+=`<td colspan="7"  class="border p-1 border-dark">${data.PRESTASI_3_NAMA}</td>`
                        html+=`<td colspan="23" class="border p-1 border-dark">${data.PRESTASI_3_KETERANGAN}</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`;
                    
                    html+=`<tr><td colspan="36" class="fw-bold"><br/></td></tr>`;
                    html+=`<tr><td colspan="36" class="fw-bold">F. Saran-saran</td></tr>`;
                    html+=`<tr>`
                        html+=`<td></td>`
                        html+=`<td  style="min-height:300px" colspan="31" class="border p-1 border-dark text-center">${data.SARAN}</td>`
                        html+=`<td colspan="4"></td>`
                    html+=`</tr>`
                    
                    html+=`<tr><td colspan="36" class="fw-bold"><br/></td></tr>`;
                    html+=`<tr><td colspan="36" class="fw-bold">G. Kehadiran<br/></td></tr>`;
                    html+=`<tr>`;
                        html+=`<td colspan="6" class="border-start border-top border-bottom-0 border-end-0 p-1 border-dark">Sakit</td>`;
                        html+=`<td class="border-start-0 border-top border-bottom-0 border-end-0 p-1 border-dark">:</td>`
                        html+=`<td colspan="3" class="border-start-0 border-top border-bottom-0 border-end p-1 border-dark" data-nilairapor="sakit">${data.Sakit}</td>`;
                        html+=`<td colspan="24"></td>`
                    html+=`<tr>`;
                    html+=`<tr>`;
                        // html+=`<td colspan="3"></td>`
                        html+=`<td colspan="6" class="border-start border-top-0 border-bottom-0 border-end-0 p-1 border-dark">Ijin</td>`;
                        html+=`<td class="border-start-0 border-top-0 border-bottom-0 border-end-0 p-1 border-dark">:</td>`
                        html+=`<td colspan="3" class="border-start-0 border-top-0 border-bottom-0 border-end p-1 border-dark" data-nilairapor="ijin">${data.Ijin}</td>`;
                        html+=`<td colspan="24"></td>`
                    html+=`<tr>`;
                    html+=`<tr>`;
                        // html+=`<td colspan="3"></td>`
                        html+=`<td colspan="6" class="border-start border-top-0 border-bottom border-end-0 p-1 border-dark">Tanpa Keterangan</td>`;
                        html+=`<td class="border-start-0 border-top-0 border-bottom border-end-0 p-1 border-dark">:</td>`
                        html+=`<td colspan="3" class="border-start-0 border-top-0 border-bottom border-end p-1 border-dark" data-nilairapor="alpa">${data.Alpa}</td>`;
                        html+=`<td colspan="24"></td>`
                    html+=`<tr>`;
                            if(data.semester == 2){
                            html+=`<tr><td colspan="36"><br/><br/><br/></td></tr>`;
                            html+=`<tr><td colspan="3"></td>`;
                                html+=`<td colspan="30" class="fw-bold">`;
                                    html+=`Berdasarkan pencapaian kompetensi selama menempuh pembelajaran, peserta didik atas nama:`
                                    html+=`<h4 class="text-center fw-bold">${data.nama}</h4>`;
                                    html+=`dengan ini dinyatakan:`
                                    if(parseInt(data.rombel) === 6){
                                        html+=`<h3 class="text-center fw-bold"><span>${data.kenaikankelas}</span></h3>`;

                                    }else{
                                        html+=`<h3 class="text-center fw-bold"><span>${data.kenaikankelas}</span> <span data-nilairapor="NAIKTINGGAL_KELAS_DI">${data.kekelas}</span></h3>`;

                                    }
                                
                                html+=`</td>`;
                            html+=`<td colspan="3"></td></tr>`;
                            
                            html+=`<tr><td colspan="36" class="fw-bold"><br/><br/><br/><br/></td></tr>`;
                            html+=`<tr>`;
                                html+=`<td colspan="12" class="text-center p-1 align-bottom">________________</td>`;
                                html+=`<td colspan="12" class="text-center p-1">`;
                                html+=`</td>`;
                                html+=`<td colspan="12" class="text-center p-1 align-top">`;
                                html+=`Depok, <span>${new Date(data.TITIMANGSA_RAPORT).toLocaleString('id-ID',{dateStyle:'long'})}</span><br>`;
                                html+=`Guru Kelas ${data.rombel}`;
                                html+=`<br><br><br><br><br><br>`;
                                html+=`<u><b>${data.walikelas}</b></u><br>`;
                                html+=`<span>${data.walikelas_nip==""?"":`NIP. ${data.walikelas_nip}`}</span>`;
                                html+=`</td>`;
                            html+=`</tr>`
                            // html+=`<tr><td colspan="36" class="fw-bold"><br/><br/><br/><br/></td></tr>`;
                            html+=`<tr>`;
                                html+=`<td colspan="12"></td>`
                                html+=`<td colspan="12" class="align-top text-center">`;
                                    
                                html+=`Mengetahui,<br>`;
                                html+=`Kepala UPTD SDN Ratujaya 1`;

                                html+=`<br><br><br><br><br>`;
                                html+=`<u><b>${data.kepsek}</b></u><br>`;
                                html+=`<span>NIP. ${data.kepsek_nip}</span>`
                                html+=`</td>`;
                                html+=`<td colspan="12"></td>`
                            html+=`<tr>`;

                    }else{
                            html+=`<tr><td colspan="36" class="fw-bold"><br/><br/></td></tr>`;
                            html+=`<tr>`;
                                html+=`<td colspan="18" class="text-center p-1">Mengetahui,<br>Orang tua/Wali<br><br><br><br><br>_______________</td>`;
                                html+=`<td colspan="18" class="text-center p-1">`;
                                html+=`Depok, <span>${new Date(data.TITIMANGSA_RAPORT).toLocaleString('id-ID',{dateStyle:'long'})}</span><br>`;
                                html+=`Guru Kelas ${data.rombel}`;
                                html+=`<br><br><br><br><br><br>`;
                                html+=`<u><b>${data.walikelas}</b></u><br>`;
                                html+=`<span>${data.walikelas_nip==""?"":`NIP. ${data.walikelas_nip}`}</span>`;
                                html+=`</td>`;
                            html+=`</tr>`
                    }
        html+=`</tbody>`;
        html+=`</table>`;
    return html;
}
const kontenIndukKurmer = (data,riwayat,data2)=>{
    let html = "";
    html+=`<table class="toExcel font12 tnr" style="line-height:1;border-collapse:collapse;border-spacing:0;width:100%">`;
            html+=`<thead>`;
                html+=`<tr>`;
                    html+=`<th>&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;//kolom2
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th>&nbsp;</th>`; 
                html+=`</tr>`;
                
            html+=`</thead>`; 
            html+=`<tbody>`; 
                html+=`<tr><td colspan="72" class="fw-bolder text-center" style="font-size:16px!important">LAPORAN HASIL PENCAPAIAN KOMPETENSI PESERTA DIDIK</td></tr>`;
                html+=`<tr><td colspan="72"><br/><br/></tr>`;
                
                //kolom identitas:
                html+=`<tr>`;
                    html+=`<td colspan="10">Nama Siswa</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="19">${data.nama}</td>`;
                    html+=`<td colspan="10">No. Induk</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="14">${data.profil.nis}</td>`;
                    html+=`<td colspan="5">NISN</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="14">${data.profil.nisn}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="10">Kelas/Fase</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="19">${parseInt(data.rombel)} (${data.rombel}) / ${namaFase(parseInt(data.rombel))}</td>`;
                    html+=`<td colspan="10">Tahun Pelajaran</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="14">${riwayat.target.tapel}</td>`;
                    html+=`<td colspan="5"> Kurikulum</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="14">${data.kurikulum.toUpperCase()}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="72" style="border-top:2px double black"><br></td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="72" class="fw-bold">A. Nilai dan Capaian Kompetensi</td>`
                html+=`</tr>`;
                html+=`<tr class="fw-bold">`;
                    html+=`<td rowspan="2" class="border p-1 text-center border-dark bg-secondary-subtle" colspan="2">No.</td><td rowspan="2" class="border p-1 text-center border-dark bg-secondary-subtle" colspan="16">Mata Pelajaran</td>`;
                    html+=`<td colspan="27" class="border p-1 text-center border-dark bg-secondary-subtle">Semester Ganjil</td> <td colspan="27" class="border p-1 text-center border-dark bg-secondary-subtle">Semester Genap</td> </tr> <tr class="fw-bold"> <td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="3">Nilai Akhir</td><td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="24">Capaian Pembelajaran</td>`
                    html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="3">Nilai Akhir</td><td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="24">Capaian Pembelajaran</td>`
                html+=`</tr>`;
                html+=`<tr><td colspan="72" class="border p-1 border-dark bg-secondary-subtle fw-bold">A. Muatan Nasional</td></tr>`;
                html+=`<tr>`;
                    html+=`<td class="border p-1 border-dark" rowspan="2" colspan="2">1.</td>`;
                    html+=`<td class="border p-1 border-dark" colspan="70">Pendidikan Agama</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td class="border p-1 border-dark" colspan="16">${definisiMapelAgama(data.agama,data.kurikulum)}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data.PA?Math.round(data.PA):""}</td>`;
                    html+=`<td class="border p-1 text-center border-dark font8" colspan="24">${data.PA_deskripsi}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.PA?Math.round(data2?.PA):""}</td>`;
                    html+=`<td class="border p-1 text-center border-dark font8" colspan="24">${data2?.PA_deskripsi||""}</td>`;
                html+=`</tr>`;
                riwayat.target.mapelsiswa(parseInt(data.rombel)).filter(s=>!['PA','BSUND','BING'].includes(s)).forEach((kodemapel,indek)=>{
                    html+=`<tr>`;
                        html+=`<td class="border p-1 border-dark" colspan="2">${indek+2}.</td>`;
                        html+=`<td class="border p-1 border-dark" colspan="16">${definisiMapel(kodemapel,data.kurikulum)}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3">${data[kodemapel]?Math.round(data[kodemapel]):""}</td>`;
                        html+=`<td class="border p-1 text-center border-dark font8" colspan="24">${data[kodemapel+'_deskripsi']}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.[kodemapel]?Math.round(data2?.[kodemapel]):""}</td>`;
                        html+=`<td class="border p-1 text-center border-dark font8" colspan="24">${data2?.[kodemapel+'_deskripsi']||""}</td>`;
                    html+=`</tr>`;
                });
                html+=`<tr><td colspan="72" class="border p-1 border-dark bg-secondary-subtle fw-bold">B. Muatan Lokal</td></tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">${(riwayat.target.mapelsiswa(parseInt(data.rombel)).filter(s=>!['BSUND','BING'].includes(s)).length+1)}.</td>`;
                    html+=`<td class="border p-1 border-dark" colspan="70">Muatan Lokal Wajib</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td class="border p-1 text-end border-dark" colspan="2">a.</td>`;
                    html+=`<td class="border p-1 border-dark" colspan="16">${definisiMapel('BSUND',data.kurikulum)}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data.BSUND?Math.round(data.BSUND):''}</td>`;
                    html+=`<td class="border p-1 text-center border-dark font8" colspan="24">${data.BSUND_deskripsi}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.BSUND?Math.round(data2?.BSUND):""}</td>`;
                    html+=`<td class="border p-1 text-center border-dark font8" colspan="24">${data2?.BSUND_deskripsi||""}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">${(riwayat.target.mapelsiswa(parseInt(data.rombel)).filter(s=>!['BSUND','BING'].includes(s)).length+2)}.</td>`;
                    html+=`<td class="border p-1 border-dark" colspan="70">Muatan Lokal Pilihan</td>`;
                html+=`</tr>`;
                //mulok pilihan
                html+=`<tr>`    
                    html+=`<td class="border p-1 text-end border-dark" colspan="2">b.</td>`;
                    html+=`<td  class="border p-1 border-dark" colspan="16">`;
                        html+=definisiMapel(riwayat.target.mapelsiswa(parseInt(data.rombel)).find(s=>s==='BING')??"",data.kurikulum)??"";
                    html+=`</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data.BING?Math.round(parseInt(data.BING)):""}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="24">${data.BING_deskripsi}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.BING?Math.round(data2?.BING):""}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="24">${data2?.BING_deskripsi||""}</td>`;
                html+=`</tr>`;
                html+=`<tr><td colspan="72" class="fw-bold">B. Ekstrakurikuler</td></tr>`;
                html+=`<tr>`;
                    html+=`<td rowspan="2" colspan="2" class="border p-1 text-center border-dark bg-dark-subtle">No</td>`;
                    html+=`<td colspan="35" class="border p-1 text-center border-dark bg-dark-subtle text-center">Semester Ganjil</td>`;
                    html+=`<td colspan="35" class="border p-1 text-center border-dark bg-dark-subtle text-center">Semester Genap</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="16" class="border p-1 text-center border-dark bg-dark-subtle">Kegiatan Eksrakurikuler</td>`;
                    html+=`<td colspan="3" class="border p-1 text-center border-dark bg-dark-subtle">Nilai</td>`;
                    html+=`<td colspan="16" class="border p-1 text-center border-dark bg-dark-subtle">Keterangan</td>`;
                    html+=`<td colspan="16" class="border p-1 text-center border-dark bg-dark-subtle">Kegiatan Eksrakurikuler</td>`;
                    html+=`<td colspan="3" class="border p-1 text-center border-dark bg-dark-subtle">Nilai</td>`;
                    html+=`<td colspan="16" class="border p-1 text-center border-dark bg-dark-subtle">Keterangan</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">1.</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data.EKSKUL_1_NAMA}</td>`;
                    html+=`<td colspan="3" class="border p-1 border-dark">${data.EKSKUL_1_NILAI}</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data.EKSKUL_1_KETERANGAN}</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data2?.EKSKUL_1_NAMA||""}</td>`;
                    html+=`<td colspan="3" class="border p-1 border-dark">${data2?.EKSKUL_1_NILAI||""}</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data2?.EKSKUL_1_KETERANGAN||""}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">2.</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data.EKSKUL_2_NAMA}</td>`;
                    html+=`<td colspan="3" class="border p-1 border-dark">${data.EKSKUL_2_NILAI}</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data.EKSKUL_2_KETERANGAN}</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data2?.EKSKUL_2_NAMA||""}</td>`;
                    html+=`<td colspan="3" class="border p-1 border-dark">${data2?.EKSKUL_2_NILAI||""}</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data2?.EKSKUL_2_KETERANGAN||""}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 border-dark">3.</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark"></td>`;
                    html+=`<td colspan="3" class="border p-1 border-dark"></td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark"></td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark"></td>`;
                    html+=`<td colspan="3" class="border p-1 border-dark"></td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark"></td>`;
                html+=`</tr>`;
                html+=`<tr><td colspan="72" class="fw-bold">C. Prestasi</td></tr>`;
                html+=`<tr>`;
                    html+=`<td rowspan="2" colspan="2" class="border p-1 text-center border-dark bg-dark-subtle">No</td>`;
                    html+=`<td colspan="35" class="border p-1 text-center border-dark bg-dark-subtle">Semester Ganjil</td>`;
                    html+=`<td colspan="35" class="border p-1 text-center border-dark bg-dark-subtle">Semester Genap</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="16" class="border p-1 text-center border-dark bg-dark-subtle">Prestasi</td>`;
                    html+=`<td colspan="19" class="border p-1 text-center border-dark bg-dark-subtle">Keterangan</td>`;
                    html+=`<td colspan="16" class="border p-1 text-center border-dark bg-dark-subtle">Prestasi</td>`;
                    html+=`<td colspan="19" class="border p-1 text-center border-dark bg-dark-subtle">Keterangan</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">1.</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data.PRESTASI_1_NAMA}</td>`;
                    html+=`<td colspan="19" class="border p-1 border-dark">${data.PRESTASI_1_KETERANGAN}</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data2?.PRESTASI_1_NAMA||""}</td>`;
                    html+=`<td colspan="19" class="border p-1 border-dark">${data2?.PRESTASI_1_KETERANGAN||""}</td>`;
                    html+=`</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">2.</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data.PRESTASI_2_NAMA}</td>`;
                    html+=`<td colspan="19" class="border p-1 border-dark">${data.PRESTASI_2_KETERANGAN}</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data2?.PRESTASI_2_NAMA||""}</td>`;
                    html+=`<td colspan="19" class="border p-1 border-dark">${data2?.PRESTASI_2_KETERANGAN||""}</td>`;
                    html+=`</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">3.</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data.PRESTASI_3_NAMA}</td>`;
                    html+=`<td colspan="19" class="border p-1 border-dark">${data.PRESTASI_3_KETERANGAN}</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data2?.PRESTASI_3_NAMA||""}</td>`;
                    html+=`<td colspan="19" class="border p-1 border-dark">${data2?.PRESTASI_3_KETERANGAN||""}</td>`;
                    html+=`</td>`;
                html+=`</tr>`;
                html+=`<tr><td colspan="72" class="fw-bold">D. Lainnya</td></tr>`;
                html+=`<tr class="bg-dark-subtle">`;
                    html+=`<td colspan="14" class="border p-1 border-dark"></td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">Semester Ganjil</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">Semester Genap</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td rowspan="3" colspan="10" class="bg-dark-subtle border p-1 border-dark">Absensi</td>`;
                    html+=`<td colspan="4" class="border p-1 border-dark">Sakit</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark text-center">${data.Sakit} hari</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark text-center">${data2?.Sakit||""} hari</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="4" class="border p-1 border-dark">Ijin</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark text-center">${data.Ijin} hari</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark text-center">${data2?.Ijin||""} hari</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="4" class="border p-1 border-dark">Alpa</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark text-center">${data.Alpa} hari</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark text-center">${data2?.Alpa||""} hari</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td rowspan="2" colspan="10" class="bg-dark-subtle border p-1 border-dark">Wali Kelas</td>`;
                    html+=`<td colspan="4" class="border p-1 border-dark">Nama</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${data.walikelas}</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${data2?.walikelas||""}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="4" class="border p-1 border-dark">NIP</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${data.walikelas_nip}</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${data2?.walikelas_nip||""}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td rowspan="2" colspan="10" class="bg-dark-subtle border p-1 border-dark">Kepala Sekolah</td>`;
                    html+=`<td colspan="4" class="border p-1 border-dark">Nama</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${data.kepsek}</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${data2?.kepsek||""}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="4" class="border p-1 border-dark">NIP</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${data.kepsek_nip}</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${data2?.kepsek_nip||""}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="14" class="bg-dark-subtle border p-1 border-dark">Titimangsa Rapor</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${new Date(data.TITIMANGSA_RAPORT).toLocaleString('id-ID',{dateStyle:'long'})}</td>`;
                    let titimangsa = data2?.TITIMANGSA_RAPORT||false;
                    html+=`<td colspan="29" class="border p-1 border-dark">${titimangsa?new Date(titimangsa).toLocaleString('id-ID',{dateStyle:'long'}):''}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td rowspan="2" colspan="14" class="bg-dark-subtle border p-1 border-dark">Penetapan Keputusan Akhir Kelas</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">Berdasarkan pencapaian kompetensi pada semester 1 dan 2, peserta didik ditetapakan:</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${data2?.kenaikankelas||""} ${parseInt(data.rombel)!==6?(data2?.kekelas||""):""} </td>`;
                html+=`</tr>`;
                    

            html+=`</tbody>`;
        html+=`</table>`;
    return html;
}
const kontenIndukKurtilas = (data,riwayat,data2)=>{
    let html = "";
    html+=`<table class="toExcel font12 tnr" style="line-height:1;border-collapse:collapse;border-spacing:0;width:100%">`;
            html+=`<thead>`;
                html+=`<tr>`;
                    html+=`<th>&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;//kolom2
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th style="width:22px">&nbsp;</th>`;
                    html+=`<th>&nbsp;</th>`; 
                html+=`</tr>`;
                
            html+=`</thead>`; 
            html+=`<tbody>`; 
                html+=`<tr><td colspan="72" class="fw-bolder text-center" style="font-size:16px!important">LAPORAN HASIL PENCAPAIAN KOMPETENSI PESERTA DIDIK</td></tr>`;
                html+=`<tr><td colspan="72"><br/><br/></tr>`;
                
                //kolom identitas:
                html+=`<tr>`;
                    html+=`<td colspan="10">Nama Siswa</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="19">${data.nama}</td>`;
                    html+=`<td colspan="10">No. Induk</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="14">${data.profil.nis}</td>`;
                    html+=`<td colspan="5">NISN</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="14">${data.profil.nisn}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="10">Kelas</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="19">${parseInt(data.rombel)} (${data.rombel})</td>`;
                    html+=`<td colspan="10">Tahun Pelajaran</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="14">${riwayat.target.tapel}</td>`;
                    html+=`<td colspan="5"> Kurikulum</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td colspan="14">${data.kurikulum.toUpperCase()}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="72" style="border-top:2px double black"><br></td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="72" class="fw-bold">A. Aspek Spiritual dan Sosial</td>`
                html+=`</tr>`;
                html+=`<tr class="fw-bold">`;
                    html+=`<td rowspan="2" class="border p-1 text-center border-dark bg-secondary-subtle" colspan="2">No.</td><td rowspan="2" class="border p-1 text-center border-dark bg-secondary-subtle" colspan="16">Aspek</td>`;
                    html+=`<td colspan="27" class="border p-1 text-center border-dark bg-secondary-subtle">Semester Ganjil</td> <td colspan="27" class="border p-1 text-center border-dark bg-secondary-subtle">Semester Genap</td> </tr> <tr class="fw-bold"> <td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="3">Predikat</td><td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="24">Deskripsi</td>`
                    html+=`<td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="3">Predikat</td><td class="border p-1 text-center border-dark bg-secondary-subtle" colspan="24">Deskripsi</td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">1.</td>`;
                    html+=`<td colspan="16" class="border p-1 text-center border-dark">Spiritual</td>`;
                    html+=`<td colspan="3" class="border p-1 text-center border-dark">${data.K1_predikat}</td>`;
                    html+=`<td colspan="24" class="border p-1 text-center border-dark">${data.K1_deskripsi}</td>`;
                    html+=`<td colspan="3" class="border p-1 text-center border-dark">${data2?.K1_predikat||""}</td>`;
                    html+=`<td colspan="24" class="border p-1 text-center border-dark">${data2?.K1_deskripsi||""}</td>`;
                html+=`</tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">2.</td>`;
                    html+=`<td colspan="16" class="border p-1 text-center border-dark">Sosial</td>`;
                    html+=`<td colspan="3" class="border p-1 text-center border-dark">${data.K2_predikat}</td>`;
                    html+=`<td colspan="24" class="border p-1 text-center border-dark">${data.K2_deskripsi}</td>`;
                    html+=`<td colspan="3" class="border p-1 text-center border-dark">${data2?.K2_predikat||""}</td>`;
                    html+=`<td colspan="24" class="border p-1 text-center border-dark">${data2?.K2_deskripsi||""}</td>`;
                html+=`</tr>`;
                
                html+=`<tr>`;
                    html+=`<td colspan="72" class="fw-bold">A. Pengetahuan dan Keterampilan</td>`
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td rowspan="3" colspan="2" class="border p-1 text-center border-dark bg-dark-subtle">No</td>`;
                    html+=`<td rowspan="3" colspan="8" class="border p-1 text-center border-dark bg-dark-subtle">Mata Pelajaran</td>`;
                    html+=`<td rowspan="3" colspan="2" class="border p-1 text-center border-dark bg-dark-subtle">KKM</td>`;
                    html+=`<td colspan="30" class="border p-1 text-center border-dark bg-dark-subtle">Semester Ganjil</td>`;
                    html+=`<td colspan="30" class="border p-1 text-center border-dark bg-dark-subtle">Semester Genap</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="15" class="border p-1 text-center border-dark bg-dark-subtle">Pengetahuan</td>`;
                    html+=`<td colspan="15" class="border p-1 text-center border-dark bg-dark-subtle">Keterampilan</td>`;
                    html+=`<td colspan="15" class="border p-1 text-center border-dark bg-dark-subtle">Pengetahuan</td>`;
                    html+=`<td colspan="15" class="border p-1 text-center border-dark bg-dark-subtle">Keterampilan</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="3" class="border p-1 text-center border-dark bg-dark-subtle">Nilai</td>`;
                    html+=`<td colspan="3" class="border p-1 text-center border-dark bg-dark-subtle">Predikat</td>`;
                    html+=`<td colspan="9" class="border p-1 text-center border-dark bg-dark-subtle">Predikat</td>`;
                    html+=`<td colspan="3" class="border p-1 text-center border-dark bg-dark-subtle">Nilai</td>`;
                    html+=`<td colspan="3" class="border p-1 text-center border-dark bg-dark-subtle">Predikat</td>`;
                    html+=`<td colspan="9" class="border p-1 text-center border-dark bg-dark-subtle">Deskripsi</td>`;
                    html+=`<td colspan="3" class="border p-1 text-center border-dark bg-dark-subtle">Nilai</td>`;
                    html+=`<td colspan="3" class="border p-1 text-center border-dark bg-dark-subtle">Predikat</td>`;
                    html+=`<td colspan="9" class="border p-1 text-center border-dark bg-dark-subtle">Deskripsi</td>`;
                    html+=`<td colspan="3" class="border p-1 text-center border-dark bg-dark-subtle">Nilai</td>`;
                    html+=`<td colspan="3" class="border p-1 text-center border-dark bg-dark-subtle">Predikat</td>`;
                    html+=`<td colspan="9" class="border p-1 text-center border-dark bg-dark-subtle">Deskripsi</td>`;
                html+=`</tr>`;
                html+=`<tr><td colspan="72" class="border p-1 border-dark bg-secondary-subtle fw-bold">A. Muatan Nasional</td></tr>`;
                html+=`<tr>`;
                    html+=`<td class="border p-1 border-dark" rowspan="2" colspan="2">1.</td>`;
                    html+=`<td class="border p-1 border-dark" colspan="70">Pendidikan Agama</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td class="border p-1 border-dark" colspan="8">${definisiMapelAgama(data.agama,data.kurikulum)}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="2">${data.PA_kkm}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data.PA?Math.round(data.PA):""}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data.PA_predikat}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="9" style="font-size:6px !important">${data.PA_deskripsi}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data.PA_K?Math.round(data.PA_K):""}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data.PA_K_predikat}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="9" style="font-size:6px !important">${data.PA_K_deskripsi}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.PA?Math.round(data2?.PA):""}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.PA_predikat}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="9" style="font-size:6px !important">${data2?.PA_deskripsi}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.PA_K?Math.round(data2?.PA_K):""}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.PA_K_predikat}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="9" style="font-size:6px !important">${data2?.PA_K_deskripsi}</td>`;
                html+=`</tr>`;

                
                
                riwayat.target.mapelsiswa(parseInt(data.rombel)).filter(s=>!['PA','BSUND','BING'].includes(s)).forEach((kodemapel,indek)=>{
                    html+=`<tr>`;
                        html+=`<td class="border p-1 border-dark" colspan="2">${indek+2}.</td>`;
                        html+=`<td class="border p-1 border-dark" colspan="8">${definisiMapel(kodemapel,data.kurikulum)}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="2">${data[kodemapel+'_kkm']}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3">${data[kodemapel]?Math.round(data[kodemapel]):""}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3">${data[kodemapel+'_predikat']}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="9" style="font-size:6px !important">${data[kodemapel+'_deskripsi']}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3">${data[kodemapel+'_K']?Math.round(data[kodemapel+'_K']):""}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3">${data[kodemapel+'_K_predikat']}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="9" style="font-size:6px !important">${data[kodemapel+'_K_deskripsi']}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.[kodemapel]?Math.round(data2?.[kodemapel]):""}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.[kodemapel+'_predikat']}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="9" style="font-size:6px !important">${data2?.[kodemapel+'_deskripsi']}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.[kodemapel+'_K']?Math.round(data2?.[kodemapel+'_K']):""}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.[kodemapel+'_K_predikat']}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="9" style="font-size:6px !important">${data2?.[kodemapel+'_K_deskripsi']}</td>`;
                    html+=`</tr>`;
                });
                html+=`<tr><td colspan="72" class="border p-1 border-dark bg-secondary-subtle fw-bold">B. Muatan Lokal</td></tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">${(riwayat.target.mapelsiswa(parseInt(data.rombel)).filter(s=>!['BSUND','BING'].includes(s)).length+1)}.</td>`;
                    html+=`<td class="border p-1 border-dark" colspan="70">Muatan Lokal Wajib</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td class="border p-1 text-end border-dark" colspan="2">a.</td>`;
                    html+=`<td class="border p-1 border-dark" colspan="8">${definisiMapel('BSUND',data.kurikulum)}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="2">${data.BSUND_kkm}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data.BSUND?Math.round(data.BSUND):''}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data.BSUND_predikat}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="9" style="font-size:6px !important">${data.BSUND_deskripsi}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data.BSUND_K?Math.round(data.BSUND_K):''}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data.BSUND_K_predikat}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="9" style="font-size:6px !important">${data.BSUND_K_deskripsi}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.BSUND?Math.round(data?.BSUND):''}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.BSUND_predikat}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="9" style="font-size:6px !important">${data2?.BSUND_deskripsi}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.BSUND_K?Math.round(data?.BSUND_K):''}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.BSUND_K_predikat}</td>`;
                    html+=`<td class="border p-1 text-center border-dark" colspan="9" style="font-size:6px !important">${data2?.BSUND_K_deskripsi}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">${(riwayat.target.mapelsiswa(parseInt(data.rombel)).filter(s=>!['BSUND','BING'].includes(s)).length+2)}.</td>`;
                    html+=`<td class="border p-1 border-dark" colspan="70">Muatan Lokal Pilihan</td>`;
                html+=`</tr>`;
                //mulok pilihan
                html+=`<tr>`    
                    html+=`<td class="border p-1 text-end border-dark" colspan="2">b.</td>`;
                    html+=`<td  class="border p-1 border-dark" colspan="8">`;
                        html+=definisiMapel(riwayat.target.mapelsiswa(parseInt(data.rombel)).find(s=>s==='BING')??"",data.kurikulum)??"";
                        html+=`<td class="border p-1 text-center border-dark" colspan="2">${data.BING_kkm}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3">${data.BING?Math.round(data.BING):''}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3">${data.BING_predikat}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="9" style="font-size:6px !important">${data.BING_deskripsi}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3">${data.BING_K?Math.round(data.BING_K):''}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3">${data.BING_K_predikat}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="9" style="font-size:6px !important">${data.BING_K_deskripsi}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.BING?Math.round(data?.BING):''}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.BING_predikat}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="9" style="font-size:6px !important">${data2?.BING_deskripsi}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.BING_K?Math.round(data?.BING_K):''}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="3">${data2?.BING_K_predikat}</td>`;
                        html+=`<td class="border p-1 text-center border-dark" colspan="9" style="font-size:6px !important">${data2?.BING_K_deskripsi}</td>`;
                html+=`</tr>`;
                html+=`<tr><td colspan="72" class="fw-bold">B. Ekstrakurikuler</td></tr>`;
                html+=`<tr>`;
                    html+=`<td rowspan="2" colspan="2" class="border p-1 text-center border-dark bg-dark-subtle">No</td>`;
                    html+=`<td colspan="35" class="border p-1 text-center border-dark bg-dark-subtle text-center">Semester Ganjil</td>`;
                    html+=`<td colspan="35" class="border p-1 text-center border-dark bg-dark-subtle text-center">Semester Genap</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="16" class="border p-1 text-center border-dark bg-dark-subtle">Kegiatan Eksrakurikuler</td>`;
                    html+=`<td colspan="3" class="border p-1 text-center border-dark bg-dark-subtle">Nilai</td>`;
                    html+=`<td colspan="16" class="border p-1 text-center border-dark bg-dark-subtle">Keterangan</td>`;
                    html+=`<td colspan="16" class="border p-1 text-center border-dark bg-dark-subtle">Kegiatan Eksrakurikuler</td>`;
                    html+=`<td colspan="3" class="border p-1 text-center border-dark bg-dark-subtle">Nilai</td>`;
                    html+=`<td colspan="16" class="border p-1 text-center border-dark bg-dark-subtle">Keterangan</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">1.</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data.EKSKUL_1_NAMA}</td>`;
                    html+=`<td colspan="3" class="border p-1 border-dark">${data.EKSKUL_1_NILAI}</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data.EKSKUL_1_KETERANGAN}</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data2?.EKSKUL_1_NAMA||""}</td>`;
                    html+=`<td colspan="3" class="border p-1 border-dark">${data2?.EKSKUL_1_NILAI||""}</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data2?.EKSKUL_1_KETERANGAN||""}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">2.</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data.EKSKUL_2_NAMA}</td>`;
                    html+=`<td colspan="3" class="border p-1 border-dark">${data.EKSKUL_2_NILAI}</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data.EKSKUL_2_KETERANGAN}</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data2?.EKSKUL_2_NAMA||""}</td>`;
                    html+=`<td colspan="3" class="border p-1 border-dark">${data2?.EKSKUL_2_NILAI||""}</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data2?.EKSKUL_2_KETERANGAN||""}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 border-dark">3.</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark"></td>`;
                    html+=`<td colspan="3" class="border p-1 border-dark"></td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark"></td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark"></td>`;
                    html+=`<td colspan="3" class="border p-1 border-dark"></td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark"></td>`;
                html+=`</tr>`;
                html+=`<tr><td colspan="72" class="fw-bold">C. Prestasi</td></tr>`;
                html+=`<tr>`;
                    html+=`<td rowspan="2" colspan="2" class="border p-1 text-center border-dark bg-dark-subtle">No</td>`;
                    html+=`<td colspan="35" class="border p-1 text-center border-dark bg-dark-subtle">Semester Ganjil</td>`;
                    html+=`<td colspan="35" class="border p-1 text-center border-dark bg-dark-subtle">Semester Genap</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="16" class="border p-1 text-center border-dark bg-dark-subtle">Prestasi</td>`;
                    html+=`<td colspan="19" class="border p-1 text-center border-dark bg-dark-subtle">Keterangan</td>`;
                    html+=`<td colspan="16" class="border p-1 text-center border-dark bg-dark-subtle">Prestasi</td>`;
                    html+=`<td colspan="19" class="border p-1 text-center border-dark bg-dark-subtle">Keterangan</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">1.</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data.PRESTASI_1_NAMA}</td>`;
                    html+=`<td colspan="19" class="border p-1 border-dark">${data.PRESTASI_1_KETERANGAN}</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data2?.PRESTASI_1_NAMA||""}</td>`;
                    html+=`<td colspan="19" class="border p-1 border-dark">${data2?.PRESTASI_1_KETERANGAN||""}</td>`;
                    html+=`</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">2.</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data.PRESTASI_2_NAMA}</td>`;
                    html+=`<td colspan="19" class="border p-1 border-dark">${data.PRESTASI_2_KETERANGAN}</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data2?.PRESTASI_2_NAMA||""}</td>`;
                    html+=`<td colspan="19" class="border p-1 border-dark">${data2?.PRESTASI_2_KETERANGAN||""}</td>`;
                    html+=`</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="2" class="border p-1 text-center border-dark">3.</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data.PRESTASI_3_NAMA}</td>`;
                    html+=`<td colspan="19" class="border p-1 border-dark">${data.PRESTASI_3_KETERANGAN}</td>`;
                    html+=`<td colspan="16" class="border p-1 border-dark">${data2?.PRESTASI_3_NAMA||""}</td>`;
                    html+=`<td colspan="19" class="border p-1 border-dark">${data2?.PRESTASI_3_KETERANGAN||""}</td>`;
                    html+=`</td>`;
                html+=`</tr>`;
                html+=`<tr><td colspan="72" class="fw-bold">D. Lainnya</td></tr>`;
                html+=`<tr class="bg-dark-subtle">`;
                    html+=`<td colspan="14" class="border p-1 border-dark"></td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">Semester Ganjil</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">Semester Genap</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td rowspan="3" colspan="10" class="bg-dark-subtle border p-1 border-dark">Absensi</td>`;
                    html+=`<td colspan="4" class="border p-1 border-dark">Sakit</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark text-center">${data.Sakit} hari</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark text-center">${data2?.Sakit||""} hari</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="4" class="border p-1 border-dark">Ijin</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark text-center">${data.Ijin} hari</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark text-center">${data2?.Ijin||""} hari</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="4" class="border p-1 border-dark">Alpa</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark text-center">${data.Alpa} hari</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark text-center">${data2?.Alpa||""} hari</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td rowspan="2" colspan="10" class="bg-dark-subtle border p-1 border-dark">Wali Kelas</td>`;
                    html+=`<td colspan="4" class="border p-1 border-dark">Nama</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${data.walikelas}</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${data2?.walikelas||""}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="4" class="border p-1 border-dark">NIP</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${data.walikelas_nip}</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${data2?.walikelas_nip||""}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td rowspan="2" colspan="10" class="bg-dark-subtle border p-1 border-dark">Kepala Sekolah</td>`;
                    html+=`<td colspan="4" class="border p-1 border-dark">Nama</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${data.kepsek}</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${data2?.kepsek||""}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="4" class="border p-1 border-dark">NIP</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${data.kepsek_nip}</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${data2?.kepsek_nip||""}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td colspan="14" class="bg-dark-subtle border p-1 border-dark">Titimangsa Rapor</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${new Date(data.TITIMANGSA_RAPORT).toLocaleString('id-ID',{dateStyle:'long'})}</td>`;
                    let titimangsa = data2?.TITIMANGSA_RAPORT||false;
                    html+=`<td colspan="29" class="border p-1 border-dark">${titimangsa?new Date(titimangsa).toLocaleString('id-ID',{dateStyle:'long'}):''}</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td rowspan="2" colspan="14" class="bg-dark-subtle border p-1 border-dark">Penetapan Keputusan Akhir Kelas</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">Berdasarkan pencapaian kompetensi pada semester 1 dan 2, peserta didik ditetapakan:</td>`;
                    html+=`<td colspan="29" class="border p-1 border-dark">${data2?.kenaikankelas||""} ${parseInt(data.rombel)!==6?(data2?.kekelas||""):""} </td>`;
                html+=`</tr>`;
                    

            html+=`</tbody>`;
        html+=`</table>`;
    return html;
}
const viewRiwayat = {};
viewRiwayat.rekapRaportRiwayat = rekapRaportRiwayat;
viewRiwayat.html_raport_riwayat = html_raport_riwayat;
viewRiwayat.kontenRaportkurmer = kontenRaportKurmer;
viewRiwayat.kontenRaportkurtilas = kontenRaportKurtilas;
viewRiwayat.kontenIndukkurmer = kontenIndukKurmer;
viewRiwayat.kontenIndukkurtilas = kontenIndukKurtilas;
export default viewRiwayat;