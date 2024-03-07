import { koleksiRombel } from "../../routes/settingApp";
import { umur } from "../../utilities/FormatTanggal";
import inputsElements from "../components/input-elements";
import rowCols from "../components/row-cols";
import { cardMenu } from "../sidebar/cardSidebar";
import kopsuratEdurasa from "./kopsurat";

const replacingImgLama = (htmlString)=>{
    const regex = /https:\/\/drive\.google\.com\/uc\?export=view&amp;id=([\w-]+)/g;

    htmlString = htmlString.replace(regex, function(match, id) {
        return `https://lh3.googleusercontent.com/d/${id}`;
    }
    );
    return htmlString

}
const selectRombel = (rombel='1A')=>{
    let html="";
    let datarombel = Object.values(koleksiRombel).flat(1);
    let datarombelkelas = [];
    datarombel.forEach(n=>{
        let obj = {};
        obj.value = n;
        obj.label = n;
        datarombelkelas.push(obj);
    })
    html+=inputsElements.floatingSelect('suratkeluarpilihrombel','Pilih Kelas', datarombelkelas,rombel,' data-eventchangetarget="rombel" ');

    return html;
}
const tapelByTgl = (t)=>{
    let sekarang = new Date(t);
        let bulan = sekarang.getMonth();
        let semester = bulan>5?1:2;
        let thAwal = semester==1?sekarang.getFullYear():sekarang.getFullYear()-1;
        let thAkhir =semester==1?sekarang.getFullYear()+1:sekarang.getFullYear();
        let tahunAwal = thAwal.toString();
        let tahunAkhir = thAkhir.toString();
        // let currentCode =  't_'+tahunAwal.slice(2,4)+tahunAkhir.slice(2,4)+'_s_'+semester;
        let teksTitle = ' Tapel '+ tahunAwal+'/'+tahunAkhir +' Semester ' + semester;
        let tapel = tahunAwal+'/'+tahunAkhir;
        return {'tapel':tapel,'tapelsemester':teksTitle,'semester':semester}
}
const rekapItemsSuratKeluarByTemplate = (data)=>{
    let html="";
    html+=`<div class="d-flex justify-content-between mb-2">`;
        html+=`Pilih ${data.judulmodal} yang Akan ditampilkan:`;
        if(data.targetpersonal.length>0){
            html+=`<button class="btn btn-sm btn-secondary py-0 px-1 text-center rounded-pill" data-showsuratkeluartemplate="${data.judulmodal} lampiran" data-tipetarget="${data.tipetarget}" data-targetperson="lampiran" data-idsuratkeluar="${data.data.idbaris}">Format Surat Lampiran</button>`;
        }
    html+=`</div>`;
    html+=`<div class="table-responsive">`;
        html+=`<table class="table table-bordered border-dark table-sm">`;
            html+=`<thead>`;
                html+=`<tr class="text-bg-secondary text-center">`;
                    html+=`<th class="text-bg-secondary">No</th>`;
                    html+=`<th class="text-bg-secondary text-uppercase">${data.tipetarget}</th>`;
                    html+=`<th class="text-bg-secondary">${data.tipetarget=='siswa'?'Kelas':'Jabatan'}</th>`;
                    html+=`<th class="text-bg-secondary">Aksi</th>`;
                html+=`</tr>`;
            html+=`</thead>`;
            html+=`<tbody>`;
            if(data.targetpersonal.length>0){
                data.targetpersonal.forEach((sp,index) => {
                    html+=`<tr>`;
                        html+=`<td>${index+1}</td>`;
                        
                        if(data.tipetarget == 'siswa'){
                            html+=`<td>${sp.pd_nama}</td>`;
                            html+=`<td>${sp.nama_rombel}</td>`;
                        }else{
                            html+=`<td>${sp.guru_namalengkap}</td>`;
                            html+=`<td>${sp.gurukelas_gmp}</td>`;
                        }
                        html+=`<td class="text-center"><button class="btn btn-sm btn-primary py-0 px-1 text-center rounded-pill" data-showsuratkeluartemplate="${data.judulmodal}" data-tipetarget="${data.tipetarget}" data-targetperson="${sp.id}" data-idsuratkeluar="${data.data.idbaris}"><i class="bi bi-eye"></i></button></td>`;
                    html+=`</tr>`;
                });
            }else{
                html+=`<tr><td colspan="4" class="text-center">Data Lampiran/target personal surat tidak tersedia<br><br>Mungkin saja surat keluar dengan indeks surat ini tidak dibuat dengan template dari aplikasi ini. Periksa di file yang diunggah untuk menampilkan pratinjau (preview) surat.</td>`;
            }
            
            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;
    return html;

}

const rekapItemsNoSuratSPPD = (data,canAccess)=>{
    let html="";
    
    html+=data.judulmodal;
    html+=`<div class="d-flex justify-content-between mb-2">`;
        html+=`<span>Pilih SPPD yang Akan ditampilkan:</span>`;
        if(canAccess){
            html+=`<button class="btn btn-sm btn-success border-warning border-4 border-top-0 border-start-0 border-end-0 border-bottom py-0 px-1 mx-1 text-center rounded-pill" title="Edit Surat Keluar dan Properti SPPD lainnya" data-showsppd="edit_all" data-idsppd="" data-idsuratkeluar="${data.idbaris}"><i class="bi bi-pencil"></i> Edit Surat Keluar</button>`;
        }
    html+=`</div>`;
    html+=`<div class="table-responsive">`;
        html+=`<table class="table table-bordered border-dark table-sm">`;
            html+=`<thead>`;
                html+=`<tr class="text-bg-secondary text-center">`;
                    html+=`<th class="text-bg-secondary">`;
                        html+=`No`;
                    html+=`</th>`;
                    html+=`<th class="text-bg-secondary">ID SPPD</th>`;
                    html+=`<th class="text-bg-secondary">PTK</th>`;
                    html+=`<th class="text-bg-secondary">Jabatan dalam SPPD</th>`;
                    html+=`<th class="text-bg-secondary">Aksi</th>`;    
                html+=`</tr>`;
            html+=`</thead>`;
            html+=`<tbody>`;
            data.datasppd.forEach((sp,index) => {
                    html+=`<tr>`;
                        html+=`<td class="text-center">${index+1}.</td>`;
                        html+=`<td>${sp.idbaris}</td>`;
                        html+=`<td>${sp.namaptk.guru_namalengkap}</td>`;
                        html+=`<td>${sp.ptk_jabatan}</td>`;
                        html+=`<td class="text-center">`;
                            html+=`<button class="btn btn-sm btn-primary py-0 px-1 mx-1 text-center rounded-pill" title="Lihat SPPD" data-showsppd="show" data-idsppd="${sp.idbaris}" data-idsuratkeluar="${data.idbaris}"><i class="bi bi-eye"></i></button>`;
                            if(canAccess || sp.canEdit){
                                html+=`<button class="btn btn-sm btn-secondary py-0 px-1 mx-1 text-center rounded-pill" title="Edit SPPD" data-showsppd="edit" data-idsppd="${sp.idbaris}" data-idsuratkeluar="${data.idbaris}"><i class="bi bi-pencil"></i></button>`;
                                html+=`<button class="btn btn-sm btn-danger py-0 px-1 mx-1 text-center rounded-pill" title="Hapus SPPD" data-showsppd="hapus" data-idsppd="${sp.idbaris}" data-idsuratkeluar="${data.idbaris}"><i class="bi bi-trash"></i></button>`;
                            }
                        html+=`</td>`;
                    html+=`</tr>`;
                });
            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;
    return html;

}

const rekapItemsSuratKeluar = (data)=>{
    let html="";
    html+=data.judulmodal;
    html+=`Pilih Data ${data.tipesurat} yang akan ditampilkan`
    html+=`<div class="table-responsive">`;
        html+=`<table class="table table-bordered border-dark table-sm">`;
            html+=`<thead>`;
                html+=`<tr class="text-bg-secondary text-center">`;
                    html+=`<th class="text-bg-secondary">`;
                        html+=`No`;
                    html+=`</th>`;
                    html+=`<th class="text-bg-secondary">ID Surat</th>`;
                    html+=`<th class="text-bg-secondary">${data.targetpersonal}</th>`;
                    html+=`<th class="text-bg-secondary">Aksi</th>`;
                html+=`</tr>`;
            html+=`</thead>`;
            html+=`<tbody>`;
            data.data.forEach((sp,index) => {
                    html+=`<tr>`;
                        html+=`<td>${index+1}</td>`;
                        html+=`<td>${sp.idbaris}</td>`;
                        html+=`<td>${sp.namaptk.guru_namalengkap}</td>`;
                        html+=`<td><button class="btn btn-sm btn-primary py-0 px-1 text-center rounded-pill" data-showsppd="${sp.idbaris}" data-idsuratkeluar="${data.idbaris}"><i class="bi bi-eye"></i></button></td>`;
                    html+=`</tr>`;
                });
            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;
    return html;

}

const tabelSPPDHalaman2 = (data)=>{
    const {sppd,identitas,suratkeluar} = data;
    let html="";
    html=`<table class="table table-bordered border-dark">
            <tbody>
                <tr>
                    <td style="width:50%;height:200px;" class="position-relative p-1">
                        <table class="table table-borderless lh-1">
                            <tbody>
                                <tr>
                                    <td rowspan="2">II.</td>
                                    <td>Tiba di</td>
                                    <td>:</td>
                                    <td>${suratkeluar.ditujukkankepada}</td>
                                </tr>
                                <tr>
                                    <td>Pada Tanggal</td>
                                    <td>:</td>
                                    <td>${new Date(sppd.ptk_starttgl).toLocaleString('id-ID',{dateStyle:'long'})}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="text-start position-absolute bottom-0 ps-2">NIP.         </div>
                    </td>
                    <td style="height:200px;" class="position-relative p-1">
                        <table class="table table-borderless lh-1">
                            <tbody>
                                <tr>
                                    <td>Berangkat dari</td>
                                    <td>:</td>
                                    <td>${suratkeluar.ditujukkankepada}</td>
                                </tr>
                                <tr>
                                    <td>ke</td>
                                    <td>:</td>
                                    <td>${identitas.namasekolah}</td>
                                </tr>
                                <tr>
                                    <td>Pada Tanggal</td>
                                    <td>:</td>
                                    <td>${new Date(sppd.ptk_starttgl).toLocaleString('id-ID',{dateStyle:'long'})}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="position-absolute bottom-0 ps-2">NIP.</div>
                    </td>
                </tr>
                <tr>
                    <td style="height:200px;">
                        III. <table style="display:inline-block;vertical-align: top;">
                                <tbody>
                                    <tr>
                                        <td>Tiba di</td>
                                        <td>:</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Pada Tanggal</td>
                                        <td>:</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                    </td>
                    <td style="height:200px;">
                        <table>
                            <tbody><tr>
                                <td>Berangkat dari</td>
                                <td>:</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>ke</td>
                                <td>:</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Pada Tanggal</td>
                                <td>:</td>
                                <td></td>
                            </tr>
                        </tbody></table>
                    </td>
                    
                </tr>
                <tr>
                    <td style="height:200px;">
                        IV. <table style="display:inline-block;vertical-align: top;">
                                <tbody>
                                    <tr>
                                        <td>Tiba di</td>
                                        <td>:</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Pada Tanggal</td>
                                        <td>:</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                    </td>
                    <td style="height:200px;">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Berangkat dari</td>
                                    <td>:</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>ke</td>
                                    <td>:</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Pada Tanggal</td>
                                    <td>:</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    
                </tr>
                <tr>
                    <td colspan="2">
                        <div class="row">
                            <div class="col-6" style="visibility: hidden;">Mengetahui</div>
                            <div class="col-6">
                                <ol style="list-style-type: upper-roman" start="5">
                                    <li>Tiba kembali di : UPTD SDN ratujaya 1<br>
                                        Pada tanggal : ${new Date(sppd.ptk_starttgl).toLocaleString('id-ID',{dateStyle:'long'})}<br>
                                        Telah diperiksa, dengan keterangan bahwa perjalanan tersebut diatas benar dilakukan atas perintahnya dan semata-mata untuk kepentingan jabatan dalam waktu yang sesingkat-singkatnya.
                                    </li>
                                </ol>
                                Kepala <span class="sppdcreate_ttdnamasekolah">${identitas.namasekolah}</span>
                                <br><br><br><br>
                                <u><b>${sppd.kepsekbytgl.length===0?'-':sppd.kepsekbytgl[0].namaguru}</b></u><br>
                                        ${sppd.kepsekbytgl.length===0?'-':'NIP. '+sppd.kepsekbytgl[0].nip}   
                            </div>
                            <div class="col-12">
                                <ol style="list-style-type: upper-roman" start="6">
                                    <li>CATATAN LAIN-LAIN</li>
                                    <li>PERHATIAN<br>Pejabat yang berwenang menerbitkan SPPD, pegawai yang melakukan perjalanan dinas, para pejabat yang mengesahkan tanggal berangkat/tiba serta Bendaharawan bertanggung jawab berdasarkan peraturan-peraturan Keuangan Negara apabila Negara mendapat rugi akibat kesalahan, kealpaannya.
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>`;
    return html;
}

const suratTugasSPPD = (data)=>{
    const {suratkeluar, sppd,logokotadepok,identitas,logoSekolah}= data;
    let html = "";
    html+= kopsuratEdurasa.versi2(logokotadepok,identitas,logoSekolah);
    html+=`<h3 class="text-center text-uppercase mt-5 mb-0 text-decoration-underline fw-bolder">Surat Tugas</h3>`;
    html+=`<p class="text-center mb-3 pt-0 font12">No. 421.2/${suratkeluar.id_nosurat}-SDN_RATUJAYA 1/${['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'][new Date(sppd.ptk_starttgl).getMonth()]}/${new Date(sppd.ptk_starttgl).getFullYear()}</p>`;
    html+=`<p class="mt-5">Yang bertanda tangan di bawah ini, Kepala ${identitas.namasekolah}, memberikan tugas kepada:</p>`;
    html+=`<table class="table table-borderless ms-3 lh-sm">`;
        html+=`<tbody>`;
            html+=`<tr>`;
                html+=`<td class="p-1 border-0" style="width:150px;">Nama</td>`;
                html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                html+=`<td class="p-1 border-0">${sppd.namaptk.guru_namalengkap}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td class="p-1">NIP</td>`;
                html+=`<td class="p-1">:</td>`;
                html+=`<td class="p-1">${sppd.namaptk.guru_nip}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td class="p-1">Jabatan</td>`;
                html+=`<td class="p-1">:</td>`;
                html+=`<td class="p-1">${sppd.ptk_jabatan}</td>`;
            html+=`</tr>`;
        html+=`</tbody>`;
    html+=`</table>`;
    html+=`<p>Untuk melaksanakan tugas: </p>`;
    html+=`<table class="table table-borderless ms-3 lh-sm">`;
        html+=`<tbody>`;
            html+=`<tr>`;
                html+=`<td class="p-1" style="width:150px;">Kegiatan</td>`;
                html+=`<td class="p-1" style="width:20px">:</td>`;
                html+=`<td class="p-1">${suratkeluar.perihal}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td class="p-1">Tempat</td>`;
                html+=`<td class="p-1">:</td>`;
                html+=`<td class="p-1">${suratkeluar.ditujukkankepada}</td>`;
            html+=`</tr>`;
            html+=`<tr>`;
                html+=`<td class="p-1">Hari/Tanggal</td>`;
                html+=`<td class="p-1">:</td>`;
                html+=`<td class="p-1">${new Date(sppd.ptk_starttgl).toLocaleString('id-ID',{dateStyle:'full'})}</td>`;
            html+=`</tr>`;
        html+=`</tbody>`;
    html+=`</table>`;
    html+=`<p>Demikian Surat Tugas ini dibuat agar dapat dipergunakan sebagaimana mestinya.</p>`;
    html+=`<div class="d-flex justify-content-end mt-5">`;
        html+=`<div class="col-6 text-center">`;
            html+=`Depok, ${new Date(sppd.ptk_starttgl).toLocaleString('id-ID',{dateStyle:'long'})}<br/>`;
            // html+=`<br/><br/><br/><br/><br/>`
            html+=`Kepala <span class="sppdcreate_ttdnamasekolah">${identitas.namasekolah}</span>
            <br><br><br><br>
            <u><b>${sppd.kepsekbytgl.length===0?'-':sppd.kepsekbytgl[0].namaguru}</b></u><br>
                    ${sppd.kepsekbytgl.length===0?'-':'NIP. '+sppd.kepsekbytgl[0].nip} `
        html+=`</div>`;
    html+=`</div>`;
    


    return html;
}

const lembarNotulen = (data)=>{
    const {sppd,suratkeluar} = data;
    let html = "";
        html+=`<div class="row">`;
            html+=`<div class="col-2 text-bg-light bg-light px-0">`;
                html+=`<div class="flag bg-primary">Resume Perjalanan Dinas</div>`;
            html+=`</div>`;
            html+=`<div class="col-10">`;
                html+=`<table style="max-width:1000px;margin:2px 5px">
                        <tbody>
                            <tr>
                                <td style="width:5%">Nama</td>
                                <td style="width:5px">:</td>
                                <td class="border-bottom border-dark">${sppd.namaptk.guru_namalengkap}</td>
                            </tr>
                            <tr>
                                <td>Hari/Tanggal</td>
                                <td>:</td>
                                <td class="border-bottom border-dark">${new Date(sppd.ptk_starttgl).toLocaleString('id-ID',{dateStyle:'full'})}</td>
                            </tr>
                            <tr>
                                <td>Tempat</td>
                                <td>:</td>
                                <td class="border-bottom border-dark">${suratkeluar.ditujukkankepada}</td>
                            </tr>
                            <tr>
                                <td>Kegiatan</td>
                                <td>:</td>
                                <td class="border-bottom border-dark">${suratkeluar.perihal}</td>
                            </tr>
                            <tr>
                                <td>Pelaksanaan</td>
                                <td>:</td>
                                <td class="w3-border-bottom"><span class="sppddcreate_input_starttanggal">29 Januari 2024</span></td>
                            </tr>
                        </tbody>
                    </table>`;
            html+=`</div>`;
            html+=`<div class="col-12 bgsekolah">`;
            if(sppd.resume == ''){
                html+=`<table style="border-collapse: collapse;width: 99%;">
                        <tbody><tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                        <tr style="border-bottom: .5pt solid grey;"><td style="height:28px">&nbsp; </td></tr>
                    </tbody></table>`;
                }else{
                    // const regex = /https:\/\/drive\.google\.com\/uc\?export=view&amp;id=/g;
                    // const replacement = 'https://lh3.googleusercontent.com/d/';
                    // sppd.resume = sppd.resume.replaceAll(regex, replacement);
                    
                    html+=replacingImgLama(sppd.resume);
                }
                

            html+=`</div>`;

        html+=`</div>`;
    return html;
}

const Surat_Keterangan_Aktif = (data)=>{
    const {suratkeluar, identitas,logoSekolah,logokotadepok } = data;
    let html = "";
    
    html+=`<div class="min-vh-100 shadow-sm mb-2 p-1  tnr">`;
        html+= kopsuratEdurasa.versi2(logokotadepok,identitas,logoSekolah);
        html+=`<h3 class="text-center text-decoration-underline fw-bolder mb-0 mt-3 text-uppercase">Surat Keterangan Siswa Aktif</h3>`;
        html+=`<h4 class="text-center mb-3 text-capitalize">No. ${suratkeluar.nosurat}</h4>`;
        html+=`<p class="mt-5" style="text-indent: 2em;">Yang bertanda tangan di bawah ini,  </p>`;
        html+=`<div class="overflow-hidden">`;
            html+=`<table class="table table-borderless ms-3 lh-sm">`;
                html+=`<tbody>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0" style="width:200px">Nama Lengkap</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].namaguru}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">NIP</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].nip}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Jabatan</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">Kepala Sekolah</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Asal Sekolah</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${identitas.namasekolah}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Telp./HP/WA</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].akun.no_wa_user}</td>`;
                    html+=`</tr>`;
                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;
        html+=`<p style="text-indent: 2em;">Menerangkan bahwa Peserta Didik berikut:</p>`
        html+=`<div class="overflow-hidden">`;
            html+=`<table class="table table-borderless ms-3 lh-sm">`;
            html+=`<tbody>`;
                if(data.targettipeperson == 'siswa'){
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0" style="width:200px">Nama</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.pd_nama}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Tempat, Tanggal lahir</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.pd_tl}, ${new Date(data.targetperson.pd_tanggallahir).toLocaleString('id-ID',{dateStyle:'long'})}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Nomor Induk Siswa</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.nis}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Nomor Induk Siswa Nasional</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.nisn}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Kelas</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.jenjang} (${data.targetperson.nama_rombel})</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Nama Orang tua</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.pd_namaayah} / ${data.targetperson.pd_namaibu}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Usia Saat ini</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${umur(new Date(data.targetperson.pd_tanggallahir)).tahun} Tahun</td>`;
                    html+=`</tr>`;
                }else{
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0" style="width:150px;">Nama</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.guru_namalengkap}</td>`;
                    html+=`</tr>`;

                }

                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;
        html+=`<p class="mt-2 mb-0" style="text-indent: 2em;">Adalah <b>benar</b> siswa tersebut adalah siswa ${data.identitas.namasekolah} dan tercatat masih aktif sebagai siswa pada tahun pelajaran ${tapelByTgl(suratkeluar.tglsurat).tapel}.</p>`;
        html+=`<p class="mb-0" contenteditable="true" style="text-indent: 2em;">Surat Keterangan ini berlaku sejak mulai tanggal dikeluarkan surat ini hingga satu bulan kedepan.</p>`;
        html+=`<p class="mb-3" style="text-indent: 2em;">Demikian Surat Keterangan ini dibuat, agar dapat dipergunakan sebagaimana mestinya</p>`;
        html+=`<div class="d-flex justify-content-end mt-5">`;
            html+=`<div class="col-6 text-center">`;
            html+=`Depok, ${new Date(data.suratkeluar.tglsurat).toLocaleString('id-ID',{dateStyle:'long'})}<br/>`;
            // html+=`<br/><br/><br/><br/><br/>`
            html+=`Kepala <span class="sppdcreate_ttdnamasekolah">${identitas.namasekolah}</span>
            <br><br><br><br>
            <u><b>${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].namaguru}</b></u><br>
                    ${data.kepsekbytgl.length===0?'-':'NIP. '+data.kepsekbytgl[0].nip} `
            html+=`</div>`;
        html+=`</div>`;
    html+=`</div>`;
    return html;
}
const Surat_Keterangan_Diterima = (data)=>{
    const {suratkeluar, identitas,logoSekolah,logokotadepok } = data;
    let html = "";
    
    html+=`<div class="min-vh-100 shadow-sm mb-2 p-1 tnr">`;
        html+= kopsuratEdurasa.versi2(logokotadepok,identitas,logoSekolah);
        html+=`<h3 class="text-center text-decoration-underline fw-bolder mb-0 mt-5 text-uppercase">SURAT KETERANGAN PESERTA DIDIK PINDAHAN</h3>`;
        html+=`<h4 class="text-center mb-3 text-capitalize">No. ${suratkeluar.nosurat}</h4>`;
        html+=`<p class="mt-5" style="text-indent: 2em;">Yang bertanda tangan di bawah ini,  </p>`;
        html+=`<div class="overflow-hidden">`;
            html+=`<table class="table table-borderless ms-3 lh-sm">`;
                html+=`<tbody>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0" style="width:200px">Nama Lengkap</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].namaguru}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">NIP</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].nip}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Jabatan</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">Kepala Sekolah</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Asal Sekolah</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${identitas.namasekolah}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Telp./HP/WA</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].akun.no_wa_user}</td>`;
                    html+=`</tr>`;
                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;
        html+=`<p style="text-indent: 2em;">Menerangkan telah menerima pindahan siswa berikut:</p>`
        html+=`<div class="overflow-hidden">`;
            html+=`<table class="table table-borderless ms-3 lh-sm">`;
            html+=`<tbody>`;
                
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0" style="width:200px">Nama</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.pd_nama}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Tempat, Tanggal lahir</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.pd_tl}, ${new Date(data.targetperson.pd_tanggallahir).toLocaleString('id-ID',{dateStyle:'long'})}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Nomor Induk Siswa</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.nis}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Nomor Induk Siswa Nasional</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.nisn}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Kelas</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.jenjang} (${data.targetperson.nama_rombel})</td>`;
                    html+=`</tr>`;
                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;
        html+=`<p class="mt-2 mb-0" style="text-indent: 2em;">Sesuai dengan Surat Keterangan Pindah Sekolah yang Bapak/Ibu kirimkan kepada Kami.</p>`;
        html+=`<p class="mb-3" style="text-indent: 2em;">Demikian Surat Keterangan ini dibuat, agar dapat dipergunakan sebagaimana mestinya</p>`;
        html+=`<div class="d-flex justify-content-end mt-5">`;
            html+=`<div class="col-6 text-center">`;
            html+=`Depok, ${new Date(data.suratkeluar.tglsurat).toLocaleString('id-ID',{dateStyle:'long'})}<br/>`;
            // html+=`<br/><br/><br/><br/><br/>`
            html+=`Kepala <span class="sppdcreate_ttdnamasekolah">${identitas.namasekolah}</span>
            <br><br><br><br>
            <u><b>${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].namaguru}</b></u><br>
                    ${data.kepsekbytgl.length===0?'-':'NIP. '+data.kepsekbytgl[0].nip} `
            html+=`</div>`;
        html+=`</div>`;
    html+=`</div>`;
    return html;
}
const Surat_Keterangan_Pindah = (data)=>{
    const {suratkeluar, identitas,logoSekolah,logokotadepok } = data;
    let html = "";
    
    html+=`<div class="min-vh-100 shadow-sm mb-2 p-1 tnr">`;
        html+= kopsuratEdurasa.versi2(logokotadepok,identitas,logoSekolah);
        html+=`<h3 class="text-center text-decoration-underline fw-bolder mb-0 mt-5 text-uppercase">SURAT KETERANGAN PINDAH SEKOLAH</h3>`;
        html+=`<h4 class="text-center mb-3 text-capitalize">No. ${suratkeluar.nosurat}</h4>`;
        html+=`<p class="mt-5" style="text-indent: 2em;">Yang bertanda tangan di bawah ini,  </p>`;
        html+=`<div class="overflow-hidden">`;
            html+=`<table class="table table-borderless ms-3 lh-sm">`;
                html+=`<tbody>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0" style="width:200px">Nama Lengkap</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].namaguru}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">NIP</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].nip}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Jabatan</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">Kepala Sekolah</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Asal Sekolah</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${identitas.namasekolah}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Telp./HP/WA</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].akun.no_wa_user}</td>`;
                    html+=`</tr>`;
                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;
        html+=`<p style="text-indent: 2em;">Menerangkan bahwa:</p>`
        html+=`<div class="overflow-hidden">`;
            html+=`<table class="table table-borderless ms-3 lh-sm">`;
            html+=`<tbody>`;
                
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0" style="width:200px">Nama</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.pd_nama}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Tempat, Tanggal lahir</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.pd_tl}, ${new Date(data.targetperson.pd_tanggallahir).toLocaleString('id-ID',{dateStyle:'long'})}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Nomor Induk Siswa</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.nis}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Nomor Induk Siswa Nasional</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.nisn}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Kelas</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.jenjang} (${data.targetperson.nama_rombel})</td>`;
                    html+=`</tr>`;
                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;
        html+=`<p class="mt-2">Sesuai Surat Permohonan pindah sekolah oleh:</p>`;
        /**start */
        html+=`<div class="overflow-hidden">`;
            html+=`<table class="table table-borderless ms-3 lh-sm">`;
            html+=`<tbody>`;
                
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0" style="width:200px">Nama</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.pd_namaayah}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Pekerjaan</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.dapo_pekerjaanayah}</td>`;
                    html+=`</tr>`;
                    
                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;
        /**end */
        html+=`<p class="mt-2 mb-0" style="text-indent: 2em;">Telah mengajukan pindah ke <span class="border-bottom">${data.targetperson.pindah_ke}</span> dengan alasan <span class="border-bottom">${data.targetperson.alasan_keluar}</span></p>`;
        html+=`<p class="mb-3" style="text-indent: 2em;">Demikian Surat Keterangan ini dibuat, agar dapat dipergunakan sebagaimana mestinya</p>`;
        
        html+=`<div class="d-flex justify-content-end mt-5">`;
            html+=`<div class="col-6 text-center">`;
            html+=`Depok, ${new Date(data.suratkeluar.tglsurat).toLocaleString('id-ID',{dateStyle:'long'})}<br/>`;
            // html+=`<br/><br/><br/><br/><br/>`
            html+=`Kepala <span class="sppdcreate_ttdnamasekolah">${identitas.namasekolah}</span>
            <br><br><br><br>
            <u><b>${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].namaguru}</b></u><br>
                    ${data.kepsekbytgl.length===0?'-':'NIP. '+data.kepsekbytgl[0].nip} `
            html+=`</div>`;
        html+=`</div>`;
    html+=`</div>`;
    return html;
}
const Surat_Keterangan_Pindah_lampiran = (data)=>{
    let html ="";
    html+=`<div class="min-vh-100">`;
    html+=`Format Lampiran tidak tersedia`;
    html+=`</div>`;
    return html;
}
const Surat_Keterangan_Diterima_lampiran = (data)=>{
    let html ="";
    html+=`<div class="min-vh-100">`;
    html+=`Format Lampiran tidak tersedia`;
    html+=`</div>`;
    return html;
}
const Surat_Keterangan_Aktif_lampiran = (data)=>{
    const {suratkeluar, identitas,logoSekolah,logokotadepok,targetpersonlampiran,kepsekbytgl } = data;
    let html = "";
    
    html+=`<div class="min-vh-100 shadow-sm mb-2 p-1  tnr">`;
        html+= kopsuratEdurasa.versi2(logokotadepok,identitas,logoSekolah);
        html+=`<h3 class="text-center text-decoration-underline fw-bolder mb-0 mt-3 text-uppercase">Surat Keterangan Siswa Aktif</h3>`;
        html+=`<h4 class="text-center mb-3 text-capitalize">No. ${suratkeluar.nosurat}</h4>`;
        
        html+=`<p class="mt-5" style="text-indent: 2em;">Yang bertanda tangan di bawah ini,  </p>`;
        html+=`<div class="overflow-hidden">`;
            html+=`<table class="table table-borderless ms-3 lh-sm">`;
                html+=`<tbody>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0" style="width:200px">Nama Lengkap</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].namaguru}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">NIP</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].nip}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Jabatan</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">Kepala Sekolah</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Asal Sekolah</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${identitas.namasekolah}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Telp./HP/WA</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].akun.no_wa_user}</td>`;
                    html+=`</tr>`;
                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;
        html+=`<p style="text-indent: 2em;">Menerangkan bahwa Peserta Didik berikut:</p>`
        html+=`<div class="overflow-hidden table-responsive">`;
            html+=`<table class="table table-borderless ms-3 lh-sm font12">`;
            html+=`<tbody>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0" style="width:200px">Nama</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">terlampir</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Tempat, Tanggal lahir</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">terlampir</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Nomor Induk Siswa</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">terlampir</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Nomor Induk Siswa Nasional</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">terlampir</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Kelas</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">terlampir</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Nama Orang tua</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">terlampir</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Usia Saat ini</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">terlampir</td>`;
                    html+=`</tr>`;
                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;
        html+=`<p class="mt-2 mb-0" style="text-indent: 2em;">Adalah <b>benar</b> siswa tersebut adalah siswa ${data.identitas.namasekolah} dan tercatat masih aktif sebagai siswa pada tahun pelajaran ${tapelByTgl(suratkeluar.tglsurat).tapel}.</p>`;
        html+=`<p class="mb-3" style="text-indent: 2em;">Demikian Surat Keterangan ini dibuat, agar dapat dipergunakan sebagaimana mestinya</p>`;
        html+=`<div class="d-flex justify-content-end mt-3">`;
            html+=`<div class="col-6 text-center">`;
            html+=`Depok, ${new Date(data.suratkeluar.tglsurat).toLocaleString('id-ID',{dateStyle:'long'})}<br/>`;
            // html+=`<br/><br/><br/><br/><br/>`
            html+=`Kepala <span class="sppdcreate_ttdnamasekolah">${identitas.namasekolah}</span>
            <br><br><br><br>
            <u><b>${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].namaguru}</b></u><br>
                    ${data.kepsekbytgl.length===0?'-':'NIP. '+data.kepsekbytgl[0].nip} `
            html+=`</div>`;
        html+=`</div>`;
    html+=`</div>`;
    html+=`<div class="min-vh-100 shadow-sm mb-2 p-1  tnr">`;
        html+=`<table class="table table-sm font12 lh-1 table-borderless">`;
            html+=`<tbody>`;
                html+=`<tr>`;
                    html+=`<td style="width:100px">Lampiran</td>`;
                    html+=`<td style="width:20px">:</td>`;
                    html+=`<td>Data Siswa Surat Keterangan NISN</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>No. Surat</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td>${data.suratkeluar.nosurat}</td>`;
                html+=`</tr>`;
            html+=`</tbody>`;
        html+=`</table>`;
        html+=`<h3 class="text-center mt-5 mb-1 text-uppercase">Data Siswa</h3>`;
        html+=`<table class="w3-table-all lh-1">`;
            html+=`<thead>`;
                html+=`<th>No</th>`;
                html+=`<th>Nama Siswa</th>`;
                html+=`<th>Tempat, Tanggal Lahir</th>`;
                html+=`<th>Nomor Induk Siswa</th>`;
                html+=`<th>NISN</th>`;
                html+=`<th>Kelas</th>`;
                html+=`<th>Orang Tua</th>`;
                html+=`<th>Usia Saat ini</th>`;
            html+=`</thead>`;
            html+=`<tbody>`;
                targetpersonlampiran.forEach((n,index)=>{
                    html+=`<tr>`;
                        html+=`<td class="text-center">${index+1}</td>`;
                        html+=`<td class="text-nowrap">${n.pd_nama}</td>`;
                        html+=`<td class="text-wrap">${n.pd_tl}, ${new Date(n.pd_tanggallahir).toLocaleString('id-ID',{dateStyle:'long'})}</td>`;
                        html+=`<td>${n.nis}</td>`;
                        html+=`<td>${n.nisn}</td>`;
                        html+=`<td>${n.jenjang} (${n.nama_rombel})</td>`;
                        html+=`<td>${n.pd_namaayah}</td>`;
                        html+=`<td>${umur(n.pd_tanggallahir).tahun} Tahun</td>`;
                    html+=`</tr>`;
                })
            html+=`</tbody>`;
        html+=`</table>`;
        html+=`<div class="d-flex justify-content-end mt-5">`;
            html+=`<div class="col-6 text-center">`;
            html+=`Depok, ${new Date(suratkeluar.tglsurat).toLocaleString('id-ID',{dateStyle:'long'})}<br/>`;
            // html+=`<br/><br/><br/><br/><br/>`
            html+=`Kepala <span class="sppdcreate_ttdnamasekolah">${identitas.namasekolah}</span>
            <br><br><br><br>
            <u><b>${kepsekbytgl.length===0?'-':kepsekbytgl[0].namaguru}</b></u><br>
                    ${kepsekbytgl.length===0?'-':'NIP. '+kepsekbytgl[0].nip} `
            html+=`</div>`;
        html+=`</div>`;
    html+=`</div>`;
    return html;
}
const Surat_Keterangan_NISN = (data)=>{
    const {suratkeluar, identitas,logoSekolah,logokotadepok } = data;
    let html = "";
    html+=`<div class="min-vh-100 shadow-sm mb-2 p-1  tnr">`;
        html+= kopsuratEdurasa.versi2(logokotadepok,identitas,logoSekolah);
        html+=`<h3 class="text-center text-decoration-underline fw-bolder mb-0 mt-3 text-uppercase">Surat Keterangan NISN</h3>`;
        html+=`<h4 class="text-center mb-3 text-capitalize">No. ${suratkeluar.nosurat}</h4>`;
        
        html+=`<p class="mt-5" style="text-indent: 2em;">Yang bertanda tangan di bawah ini,  </p>`;
        html+=`<div class="overflow-hidden">`;
            html+=`<table class="table table-borderless ms-3 lh-sm">`;
                html+=`<tbody>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0" style="width:200px">Nama Lengkap</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].namaguru}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">NIP</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].nip}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Jabatan</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">Kepala Sekolah</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Asal Sekolah</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${identitas.namasekolah}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Telp./HP/WA</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].akun.no_wa_user}</td>`;
                    html+=`</tr>`;
                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;
        html+=`<p style="text-indent: 2em;">Menerangkan bahwa Peserta Didik berikut:</p>`
        html+=`<div class="overflow-hidden">`;
            html+=`<table class="table table-borderless ms-3 lh-sm">`;
            html+=`<tbody>`;
                
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Nama</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.pd_nama}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Tempat, Tanggal lahir</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.pd_tl}, ${new Date(data.targetperson.pd_tanggallahir).toLocaleString('id-ID',{dateStyle:'long'})}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Nomor Induk Siswa</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.nis}</td>`;
                    html+=`</tr>`;

                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Kelas</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.jenjang} (${data.targetperson.nama_rombel})</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Nama Orang tua</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.targetperson.pd_namaayah} / ${data.targetperson.pd_namaibu}</td>`;
                    html+=`</tr>`;
                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;
        html+=`<p class="mt-2 mb-0" contentediable="true" spellcheck="false" style="text-indent: 2em;">Adalah <b>benar</b> siswa tersebut adalah siswa ${data.identitas.namasekolah} dan tercatat masih aktif sebagai siswa pada tahun pelajaran ${tapelByTgl(suratkeluar.tglsurat).tapel} dengan Nomor Induk Siswa (NISN) yang terdata di DAPODIK adalah:</p>`;
        html+=`<p class="mb-0 text-center border rounded border-dark p-3 fs-3 fw-bold">${data.targetperson.nisn}</p>`;
        html+=`<p class="mb-3" style="text-indent: 2em;">Demikian Surat Keterangan NISN ini dibuat, agar dapat dipergunakan sebagaimana mestinya</p>`;
        html+=`<div class="d-flex justify-content-end mt-5">`;
            html+=`<div class="col-6 text-center">`;
            html+=`Depok, ${new Date(data.suratkeluar.tglsurat).toLocaleString('id-ID',{dateStyle:'long'})}<br/>`;
            // html+=`<br/><br/><br/><br/><br/>`
            html+=`Kepala <span class="sppdcreate_ttdnamasekolah">${identitas.namasekolah}</span>
            <br><br><br><br>
            <u><b>${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].namaguru}</b></u><br>
                    ${data.kepsekbytgl.length===0?'-':'NIP. '+data.kepsekbytgl[0].nip} `
            html+=`</div>`;
        html+=`</div>`;
    html+=`</div>`;
    
    return html;
}
const Surat_Keterangan_NISN_lampiran = (data)=>{
    const {suratkeluar, identitas,logoSekolah,logokotadepok,targetpersonlampiran,kepsekbytgl } = data;
    let html = "";
    html+=`<div class="min-vh-100 shadow-sm mb-2 p-1  tnr">`;
        html+= kopsuratEdurasa.versi2(logokotadepok,identitas,logoSekolah);
        html+=`<h3 class="text-center text-decoration-underline fw-bolder mb-0 mt-3 text-uppercase">Surat Keterangan NISN</h3>`;
        html+=`<h4 class="text-center mb-3 text-capitalize">No. ${suratkeluar.nosurat}</h4>`;
        
        html+=`<p class="mt-5" style="text-indent: 2em;">Yang bertanda tangan di bawah ini,  </p>`;
        html+=`<div class="overflow-hidden">`;
            html+=`<table class="table table-borderless ms-3 lh-sm">`;
                html+=`<tbody>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0" style="width:200px">Nama Lengkap</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].namaguru}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">NIP</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].nip}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Jabatan</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">Kepala Sekolah</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Asal Sekolah</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${identitas.namasekolah}</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Telp./HP/WA</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].akun.no_wa_user}</td>`;
                    html+=`</tr>`;
                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;
        html+=`<p style="text-indent: 2em;">Menerangkan bahwa Peserta Didik berikut:</p>`
        html+=`<div class="overflow-hidden table-responsive">`;
            html+=`<table class="table table-borderless ms-3 lh-sm">`;
            html+=`<tbody>`;
                
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0" style="width:200px">Nama</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">terlampir</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Tempat, Tanggal lahir</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">terlampir</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Nomor Induk Siswa</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">terlampir</td>`;
                    html+=`</tr>`;

                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Kelas</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">terlampir</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">Nama Orang tua</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">terlampir</td>`;
                    html+=`</tr>`;
                    html+=`<tr>`;
                        html+=`<td class="p-1 border-0">NISN</td>`;
                        html+=`<td class="p-1 border-0" style="width:20px">:</td>`;
                        html+=`<td class="p-1 border-0">terlampir</td>`;
                    html+=`</tr>`;
                html+=`</tbody>`;
            html+=`</table>`;
        html+=`</div>`;
        html+=`<p class="mt-2 mb-0" contentediable="true" spellcheck="false" style="text-indent: 2em;">Adalah <b>benar</b> siswa tersebut adalah siswa ${data.identitas.namasekolah} dan tercatat masih aktif sebagai siswa pada tahun pelajaran ${tapelByTgl(suratkeluar.tglsurat).tapel} dengan Nomor Induk Siswa (NISN) yang terdata di DAPODIK adalah:</p>`;
        html+=`<p class="mb-3" style="text-indent: 2em;">Demikian Surat Keterangan NISN ini dibuat, agar dapat dipergunakan sebagaimana mestinya</p>`;
        html+=`<div class="d-flex justify-content-end mt-5">`;
            html+=`<div class="col-6 text-center">`;
            html+=`Depok, ${new Date(data.suratkeluar.tglsurat).toLocaleString('id-ID',{dateStyle:'long'})}<br/>`;
            // html+=`<br/><br/><br/><br/><br/>`
            html+=`Kepala <span class="sppdcreate_ttdnamasekolah">${identitas.namasekolah}</span>
            <br><br><br><br>
            <u><b>${data.kepsekbytgl.length===0?'-':data.kepsekbytgl[0].namaguru}</b></u><br>
                    ${data.kepsekbytgl.length===0?'-':'NIP. '+data.kepsekbytgl[0].nip} `
            html+=`</div>`;
        html+=`</div>`;
    html+=`</div>`;
    html+=`<div class="min-vh-100 shadow-sm mb-2 p-1  tnr">`;
        html+=`<table class="table table-sm font12 lh-1 table-borderless">`;
            html+=`<tbody>`;
                html+=`<tr>`;
                    html+=`<td style="width:100px">Lampiran</td>`;
                    html+=`<td style="width:20px">:</td>`;
                    html+=`<td>Data Siswa Surat Keterangan NISN</td>`;
                html+=`</tr>`;
                html+=`<tr>`;
                    html+=`<td>No. Surat</td>`;
                    html+=`<td>:</td>`;
                    html+=`<td>${data.suratkeluar.nosurat}</td>`;
                html+=`</tr>`;
            html+=`</tbody>`;
        html+=`</table>`;
        html+=`<h3 class="text-center mt-5 mb-1 text-uppercase">Data Siswa</h3>`;
        html+=`<table class="w3-table-all lh-1">`;
            html+=`<thead>`;
                html+=`<th>No</th>`;
                html+=`<th>Nama Siswa</th>`;
                html+=`<th>Tempat, Tanggal Lahir</th>`;
                html+=`<th>Nomor Induk Siswa</th>`;
                html+=`<th>Kelas</th>`;
                html+=`<th>Orang Tua</th>`;
                html+=`<th>NISN</th>`;
            html+=`</thead>`;
            html+=`<tbody>`;
                targetpersonlampiran.forEach((n,index)=>{
                    html+=`<tr>`;
                        html+=`<td class="text-center">${index+1}</td>`;
                        html+=`<td class="text-nowrap">${n.pd_nama}</td>`;
                        html+=`<td>${n.pd_tl}, ${new Date(n.pd_tanggallahir).toLocaleString('id-ID',{dateStyle:'long'})}</td>`;
                        html+=`<td>${n.nis}</td>`;
                        html+=`<td>${n.jenjang} (${n.nama_rombel})</td>`;
                        html+=`<td>${n.pd_namaayah}</td>`;
                        html+=`<td>${n.nisn}</td>`;
                    html+=`</tr>`;
                })
            html+=`</tbody>`;
        html+=`</table>`;
        html+=`<div class="d-flex justify-content-end mt-5">`;
            html+=`<div class="col-6 text-center">`;
            html+=`Depok, ${new Date(suratkeluar.tglsurat).toLocaleString('id-ID',{dateStyle:'long'})}<br/>`;
            // html+=`<br/><br/><br/><br/><br/>`
            html+=`Kepala <span class="sppdcreate_ttdnamasekolah">${identitas.namasekolah}</span>
            <br><br><br><br>
            <u><b>${kepsekbytgl.length===0?'-':kepsekbytgl[0].namaguru}</b></u><br>
                    ${kepsekbytgl.length===0?'-':'NIP. '+kepsekbytgl[0].nip} `
            html+=`</div>`;
        html+=`</div>`;
    html+=`</div>`;
    return html;
}
const buildPageSppd = (data)=>{
    let html = "";
    const {sppd, suratkeluar, logokotadepok,identitas } = data;

    //halaman1;
    html+=`<div class="min-vh-100 shadow-sm mb-2 p-1  d-flex flex-column justify-content-between tnr">`;
        //kop
        html+=`<div class="row">`;
            html+=`<div class="col-2 d-flex justify-content-center align-items-center">`;
            //logo
                html+=`<img src="${logokotadepok}" alt="logo kota depok" class="img-thumbnail border-0"/>`;
            html+=`</div>`;
            html+=`<div class="col-10">`;
            //teks
                html+=`<h3 class="text-center mb-0 fw-bolder">PEMERINTAH DAERAH KOTA DEPOK</h3>`;
                html+=`<h1 class="text-center mb-0 fw-bolder">DINAS PENDIDIKAN</h1>`;
                html+=`<p class="m-0 text-center">Komplek Balaikota Depok, Gedung Dibaleka II Lantai 4<br>Jalan Margonda Raya Nomor 54 Depok, Jawa Barat<br>Telp./Fax.  021 -  29402287      http://disdik.depok.go.id</p>`;
            html+=`</div>`;
            html+=`<div style="border-top:5px double black"></div>`;
            
            html+=`<div>`;
            html+=`<div class="col-12 mt-1 d-flex justify-content-end">`;
                html+=`<div class="col-4">`;
                    html+=`<table class="table table-borderless lh-1">`;
                        html+=`<tbody>`;
                            html+=`<tr>`;
                                html+=`<td class="p-1">Lampiran</td>`;
                                html+=`<td class="p-1">:</td>`;
                                html+=`<td class="p-1">Ke-1</td>`;
                            html+=`</tr>`;
                            html+=`<tr>`;
                                html+=`<td class="p-1">Kode Nomor</td>`;
                                html+=`<td class="p-1">:</td>`;
                                html+=`<td class="p-1">421.2</td>`;
                            html+=`</tr>`;
                            html+=`<tr>`;
                                html+=`<td class="p-1">Nomor</td>`;
                                html+=`<td class="p-1">:</td>`;
                                html+=`<td class="p-1">${suratkeluar.id_nosurat}</td>`;
                            html+=`</tr>`;
                        html+=`</tbody>`;
                    html+=`</table>`
                html+=`</div>`;
            html+=`</div>`;
        html+=`</div>`;
        
        
            //title
            html+=`<h3 class="text-center text-decoration-underline fw-bolder mb-0 mt-3 text-uppercase">Surat perintah perjalanan dinas</h3>`;
            html+=`<h4 class="text-center mb-3 text-capitalize">(SPPD)</h4>`;
            //konten
            html+=`<table style="margin:15px auto;width:98%;" class="tabelsppd table border-dark">
                        <tbody><tr class="border-top border-5 border-start-0 border-end-0 border-bottom-0 border-dark">
                            <td>1.</td>
                            <td>Pejabat yang memberi perintah</td>
                            <td class="border-dark border-start border-top-0 border-end-0">KEPALA DINAS PENDIDIKAN KOTA DEPOK</td>
                        </tr>
                        <tr>
                            <td>2.</td>
                            <td>Nama Pegawai yang diperintah<br>NIP.</td>
                            <td class="border-dark border-start border-top-0 border-end-0">${sppd.namaptk.guru_namalengkap}<br>${sppd.namaptk.guru_nip}</td>
                        </tr>
                        <tr>
                            <td>3.</td>
                            <td>
                                <ol style="list-style-type:lower-latin">
                                    <li>Pangkat dan Golongan<br>menurut PP No. 6 Tahun 1997</li>
                                    <li>Jabatan</li>
                                    <li>Tingkat Menurut peraturan perjalanan</li>
                                </ol>
                            </td>
                            <td class="border-dark border-start border-top-0 border-end-0">
                                <ol style="list-style-type: none;">
                                    <li class="border-bottom">${sppd.ptk_golongan}<br></li><br>
                                    <li class="border-bottom">${sppd.ptk_jabatan}</li>
                                    <li class="border-bottom">-</li>
                                </ol>
                            </td>
                        </tr>
                        <tr>
                            <td>4.</td>
                            <td>Maksud perjalanan Dinas</td>
                            <td class="border-dark border-start border-top-0 border-end-0">${suratkeluar.perihal}</td>
                        </tr>
                        <tr>
                            <td>5.</td>
                            <td>Alat angkut yang dipergunakan</td>
                            <td class="border-dark border-start border-top-0 border-end-0">-</td>
                        </tr>
                        <tr>
                            <td>6.</td>
                            <td>
                                <ol style="list-style-type:lower-latin">
                                    <li>Tempat Berangkat</li>
                                    <li>Tempat Tujuan</li>
                                </ol>
                            </td>
                            <td class="border-dark border-start border-top-0 border-end-0">
                                <ol style="list-style-type:none">
                                    <li class="border-bottom">${identitas.namasekolah}</li>
                                    <li class="border-bottom">${suratkeluar.ditujukkankepada}</li>
                                </ol>
                            </td>
                        </tr>
                        <tr>
                            <td>7.</td>
                            <td>
                                <ol style="list-style-type: lower-latin;">
                                    <li>Lamanya perjalanan dinas</li>
                                    <li>Tanggal berangkat</li>
                                    <li>Tanggal harus kembali</li>
                                </ol>
                            </td>
                            <td class="border-dark border-start border-top-0 border-end-0">
                                <ol style="list-style-type:none">
                                    <li class="border-bottom">${sppd.ptk_durasisppd} hari</li>
                                    <li class="border-bottom">${new Date(sppd.ptk_starttgl).toLocaleString('id-ID',{dateStyle:'long'})}</li>
                                    <li class="border-bottom">${new Date(sppd.tglend).toLocaleString('id-ID',{dateStyle:'long'})}</li>
                                </ol>
                            </td>
                        </tr>
                        <tr>
                            <td>8.</td>
                            <td>Pengikut</td>
                            <td class="border-dark border-start border-top-0 border-end-0">-</td>
                        </tr>
                        <tr>
                            <td>9.</td>
                            <td>Pembebanan Anggaran
                                <ol style="list-style-type:lower-latin">
                                    <li>Instansi</li>
                                    <li>Mata Anggaran</li>
                                </ol>
                            </td>
                            <td class="border-dark border-start border-top-0 border-end-0"><br>
                                <ol style="list-style-type:none">
                                    <li class="border-bottom">Dinas Pendidikan</li>
                                    <li class="border-bottom">5.2.2.15.02</li>
                                </ol>
                            </td>
                        </tr>
                        <tr>
                            <td>10.</td>
                            <td>Keterangan lain-lain</td>
                            <td class="border-dark border-start border-top-0 border-end-0">Lihat sebelah</td>
                        </tr>
                    </tbody></table>`
        html+=`</div>`;
        // tanda tangan
        html+=`<div class="d-flex justify-content-end">`;
            html+=`<div class="col-6">`;
                html+=`<table style="margin:5px auto">
                <tbody><tr>
                    <td>Dikeluarkan di </td>
                    <td>:</td>
                    <td>Depok</td>
                </tr>
                <tr>
                    <td>Pada Tanggal </td>
                    <td>:</td>
                    <td>${new Date(sppd.ptk_starttgl).toLocaleString('id-ID',{dateStyle:'long'})}</td>
                </tr>
                <tr>
                    <td colspan="3" class="w3-center">
                        Kepala <span class="sppdcreate_ttdnamasekolah">${identitas.namasekolah}</span>
                        <br><br><br><br>
                        <u><b>${sppd.kepsekbytgl.length===0?'-':sppd.kepsekbytgl[0].namaguru}</b></u><br>
                        ${sppd.kepsekbytgl.length===0?'-':'NIP. '+sppd.kepsekbytgl[0].nip}   
                    </td>
                </tr>
            </tbody></table>`
            html+=`</div>`;
        html+=`</div>`;

    html+=`</div>`;
    //halaman2;
    html+=`<div class="min-vh-100 shadow-sm mb-2 p-1 font14 tnr">`;
        html+=`<div class="d-flex justify-content-end mb-2">`;
            html+=`<div class="col-5 pe-1">`;
                html+=`<table class="ms-auto font12">
                        <tbody>
                            <tr valign="top">
                                <td>SPPD No.</td>
                                <td>:</td>
                                <td>421.2/${suratkeluar.id_nosurat}-SDN_RATUJAYA 1/${['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'][new Date(sppd.ptk_starttgl).getMonth()]}/${new Date(sppd.ptk_starttgl).getFullYear()}</td>
                            </tr>
                            <tr valign="top">
                                <td>
                                    Berangkat dari:<br>(tempat kedudukan)
                                </td>
                                <td>:</td>
                                <td>${identitas.namasekolah}</td>
                            </tr>
                            <tr valign="top">
                                <td>
                                    Pada Tanggal
                                </td>
                                <td>:</td>
                                <td>${new Date(sppd.ptk_starttgl).toLocaleString('id-ID',{dateStyle:'long'})}</td>
                            </tr>
                            <tr valign="top">
                                <td>
                                    Ke
                                </td>
                                <td>:</td>
                                <td>${suratkeluar.ditujukkankepada}</td>
                            </tr>
                        </tbody>
                    </table>`;
            html+=`</div>`;
        html+=`</div>`;
        html+=`<div>`
        html+=tabelSPPDHalaman2(data);
        html+=`</div>`
    html+=`</div>`;
    //halaman3;
    html+=`<div class="min-vh-100 shadow-sm p-1 tnr">`;
        html+=suratTugasSPPD(data);
    html+=`</div>`;
    //halaman 4:notula;
    html+=`<div class="min-vh-100 shadow-sm mb-2 p-1 font14 tnr">`;
        html+=lembarNotulen(data);
    html+=`</div>`;

    return html;
}

const dataSuratKlasifikasiRadio = ()=>{
    let html = "";
    html+=inputsElements.formInputRadio('k_sd','Umum (untuk SD: 421.2)','421.2',false,'klasifikasisurat','data-noklasifikasiinput="radio" checked');
    html+=inputsElements.formInputRadio('k_sd1','Surat Undangan<br/>(005)','005',false,'klasifikasisurat','data-noklasifikasiinput="radio" ');
    html+=inputsElements.formInputRadio('k_sd2','Surat Keputusan<br/>(Adm Tenaga Pengajar: 424.1)','424.1',false,'klasifikasisurat','data-noklasifikasiinput="radio" ');
    html+=inputsElements.formInputRadio('k_sd3','Surat Tugas<br/>(Adm Tenaga Pengajar:424.2)','424.2',false,'klasifikasisurat','data-noklasifikasiinput="radio" ');
    html+=inputsElements.formInputRadio('k_sd4','Surat Perintah Perjalan Dinas<br/>(Adm Tenaga Pengajar: 424.3)','424.3',false,'klasifikasisurat','data-noklasifikasiinput="radio" ')
    html+=inputsElements.formInputRadio('k_sd5','Surat Pengantar<br/>(Adm Tenaga Pengajar: 424.5)','424.5',false,'klasifikasisurat','data-noklasifikasiinput="radio" ')
    html+=inputsElements.formInputRadio('k_sd5a','Surat Perintah Lainnya<br/>(Adm Tenaga Pengajar: 424.4)','424.4',false,'klasifikasisurat','data-noklasifikasiinput="radio" ')
    html+=inputsElements.formInputRadio('k_sd6','Surat Keterangan Umum<br/>(Adm Sekolah: 422)','422',false,'klasifikasisurat','data-noklasifikasiinput="radio" ')
    html+=inputsElements.formInputRadio('k_sd7','Surat Keterangan Siswa<br/>(Adm Sekolah: 422.6)','422.6',false,'klasifikasisurat','data-noklasifikasiinput="radio" ')
    html+=inputsElements.formInputRadio('k_sd8','Surat Keterangan NISN<br/>(Adm Sekolah: 422.7)','422.7',false,'klasifikasisurat','data-noklasifikasiinput="radio" ')
    html+=inputsElements.formInputRadio('k_sd9','Surat Keterangan Diterima<br/>(Adm Sekolah: 422.8)','422.8',false,'klasifikasisurat','data-noklasifikasiinput="radio" ')
    html+=inputsElements.formInputRadio('k_sd10','Surat Keterangan Pindah<br/>(Adm Sekolah: 422.9)','422.9',false,'klasifikasisurat','data-noklasifikasiinput="radio" ')
    html+=inputsElements.formInputRadio('k_sd11','Surat Sarpras<br/>(Adm Sarana Pendidikan: 425)','425',false,'klasifikasisurat','data-noklasifikasiinput="radio" ')
    html+=inputsElements.formInputRadio('k_sd12','Surat Permohonan/Usulan Sarpras<br/>(Adm Sarana Pendidikan:425.3)','425.3',false,'klasifikasisurat','data-noklasifikasiinput="radio" ')
    html+=inputsElements.formInputRadio('k_sd13','Input Manual','input manual',false,'klasifikasisurat','data-noklasifikasiinput="radio" ')
    html+=`<div class="border rounde p-1 font10">`;
    html+=inputsElements.floatingText('k_sd14','Input No. klasifikasi','','data-noklasifikasiinput="input manual" disabled ')
        html+=`Bahan Refrensi: <a class="text-decoration-none" href="http://tajinan-malangkab.desa.id/download/sharedfile/lampiran-permendagri-nomor-78-tahun-2012-tentang-tata-naskah-dinas-3507152007" target="_blank">Contoh Klasifikkasi No. Surat</a>`;
    html+=`</div>`
    return html;
}
const createSurat = (data)=>{
    let html = "";
    let radio = inputsElements.switchForm(
        data.opsipersonal.id,
        data.opsipersonal.label,
        data.opsipersonal.value,
        'border-1 border-dark',
        'createsuratpilihtarget'
        );
        html+=`<div class="row justify-content-center">`;
        if(data.needrefrensi){
            html+=`<div class="col-md-8">`;
            let pesanfilesuratmasuk = `<div id="cekfilesuratmasuk" class="font10 text-center text-danger alert alert-info">Id Surat masuk dapat Anda lihat di menu Surat Masuk sebagai surat Undangan atau dasar pelaksanaan perjalanan dinas.</div>`;
            if(data.suratmasuk.length>0){
                pesanfilesuratmasuk=`<div id="cekfilesuratmasuk" class="font10 text-center alert alert-success text-succes">`;
                    pesanfilesuratmasuk+=`File Surat Refrensi terdeteksi<br>`;
                    pesanfilesuratmasuk+=`<button onclick="window.open('https://drive.google.com/file/d/${data.suratmasuk[0].idfile}/view?usp=drivesdk','', 'width=720,height=600')"" class="btn btn-sm border-4 text-bg-warning border-bottom border-start-0 border-top-0 border-end-0 rounded-pill"><i class="bi-eye"></i> Lihat Surat</button>`;
                pesanfilesuratmasuk +=`</div>`;
            }
                if(data.buttonaddrefrensi){
                    html+=cardMenu(
                        'Dasar Surat Perjalanan (Surat Masuk)',
                        inputsElements.floatingNumber('refrensi_suratmasuk','Id Surat Masuk',data.refrensi_suratmasuk,' data-formulircreate="refrensi_suratmasuk" disabled ')
                            +pesanfilesuratmasuk
                            +inputsElements.floatingText('modal_carisuratmasuk','Cari Surat Masuk','','',false)
                            +`<div class="border shadow-lg mt-2" id="modal_result_carisuratmasuk"></div>`
                            +`<button id="btn-add-suratmasuk" class="btn mt-3 d-block mx-auto btn-sm btn-warning border-danger border-4 border-start-0 border-top-0 border-end-0 rounded-pill border-bottom">input Surat Refrensi (Surat Masuk)</button>`
                        ,
                        false);
                }else{
                    html+=cardMenu(
                        'Dasar Surat Perjalanan (Surat Masuk)',
                        inputsElements.floatingNumber('refrensi_suratmasuk','Id Surat Masuk',data.refrensi_suratmasuk,' data-formulircreate="refrensi_suratmasuk" disabled ')
                            +pesanfilesuratmasuk
                            +inputsElements.floatingText('modal_carisuratmasuk','Cari Surat Masuk','','',false)
                            +`<div class="border shadow-lg mt-2" id="modal_result_carisuratmasuk"></div>`
                            ,
                            false
                        );
                }
            html+=`</div>`;
        }
        if(data.needInfo){
            html+=`<div class="col-md-7"><div id="infopembuatansuratkeluar"></div></div>`
        }
        html+=`<div class="col-md-6">`;
        if(data.createsppd){
            html+=cardMenu('Properti Surat Keluar untuk SPPD',
                    inputsElements.floatingText('id_nosurat','Nomor Surat',data.id_nosurat,'data-formulircreate="id_nosurat"')
                    +
                    inputsElements.floatingTextarea('perihal','Maksud Perjalanan/Kegiatan',data.perihal,' data-formulircreate="perihal" ')
                    +
                    inputsElements.floatingText('indekssurat','Indeks Surat',data.indekssurat,'data-formulircreate="indekssurat" disabled')
                    +
                    cardMenu('Klasifikasi Surat<br/><span class="font10">(Permendagri No.78 Th.2012)</span>', dataSuratKlasifikasiRadio(),true)
                    +
                    inputsElements.floatingText('nosurat','No Surat (otomatis)',data.nosurat,'data-formulircreate="nosurat" disabled ')
                    ,
                    false
                );
            
        }else{
            html+=cardMenu('Properti Surat Keluar',
                    inputsElements.floatingText('id_nosurat','Nomor Surat',data.id_nosurat,'data-formulircreate="id_nosurat"')
                    +
                    inputsElements.floatingDate('tglsurat','Tanggal Surat',data.tglsurat,'data-formulircreate="tglsurat"')
                    +
                    inputsElements.floatingTextarea('perihal','Perihal',data.perihal,' data-formulircreate="perihal" ')
                    +
                    inputsElements.floatingText('indekssurat','Indeks Surat',data.indekssurat,'data-formulircreate="indekssurat" disabled')
                    +
                    `<div class="font10 border p-1 m-1">Indeks Surat yang memiliki template:<br><b>Surat Keterangan Aktif</b><br><b>Surat Keterangan NISN</b></div>`
                    +
                    cardMenu('Klasifikasi Surat<br/><span class="font10">(Permendagri No.78 Th.2012)</span>', dataSuratKlasifikasiRadio(),true)
                    +
                    inputsElements.floatingText('nosurat','No Surat (otomatis)',data.nosurat,'data-formulircreate="nosurat" disabled ')
                ,
                false
            )
        }
        
        html+=`</div>`;
        html+=`<div class="col-md-6">`;
            if(data.createsppd){
                html+=cardMenu('Waktu Pelaksanaan',
                        inputsElements.floatingDate('tglsurat','Tanggal Perjalanan',data.tglsurat,'data-formulircreate="tglsurat"')
                        +
                        inputsElements.floatingNumber('ptk_durasisppd','Lamanya hari',data.jumlahhari,' data-kirim="ptk_durasisppd" ',1,)
                        ,
                        false
                    );
                html+= cardMenu('Tempat Tujuan Perjalanan Dinas',
                        inputsElements.floatingText('tujuansurat','Tempat Tujuan Perjalanan',data.ditujukkankepada,'data-formulircreate="ditujukkankepada"')
                        +`<div class="font12">Isikan tujuan surat suatu instansi atau badan yang membutuhkan surat ini sebagai tujuan surat dibuat.<br><br>Tujuan surat untuk SPPD adalah Tempat SPPD</div>`
                        ,false
                    );
                    let itemPersonal = ""
                    data.arraypersonal.forEach((n, indeks)=>{
                        itemPersonal +=sppdView.formInputCheckbox('personal_'+data.tipetarget+'_'+indeks+new Date().getTime(),n.guru_namalengkap,n.id,false,'checkboxpersonal');
                    })
                html+= cardMenu('PTK yang diperintah' + radio,
                        `<div id="wrapersuratkeluarpilihrombel"></div>`
                        + `<div class="d-flex justify-content-between"> <div id="stage-pilih-personal">`
                        + itemPersonal
                        +`</div>`,
                    false
                );
            }else{
                html+= cardMenu('Tujuan Surat',
                    inputsElements.floatingText('tujuansurat','Tujuan Surat',data.ditujukkankepada,'data-formulircreate="ditujukkankepada"')
                    +`<div class="font12">Isikan tujuan surat suatu instansi atau badan yang membutuhkan surat ini sebagai tujuan surat dibuat.<br><br>Tujuan surat untuk SPPD adalah Tempat SPPD</div>`
                    ,false
                );
                if(data.addTarget){
                    html+= cardMenu('Target Personal Surat '+radio,
                            `<div id="wrapersuratkeluarpilihrombel"></div>`+
                            `<div id="stage-pilih-personal">Untuk Semua ${data.namatarget}<br>Silakan pilih satu/sebagian ${data.namatarget} untuk melihat siapa saja yang akan dibuatkan surat</div>`
                            ,
                            false
                        );
                }
            }
            if(data.addUpload){
                html+=cardMenu('File Surat (opsional)',
                    inputsElements.grupInputFileRotate('upload-dok_file','data-uploaddokumen="idfileSuratKeluar" data-labelname="File Surat"','Upload','frm-idfileSuratKeluar','File Surat',data.idfile,'data-formulircreate="idfile"')
                    +
                    rowCols.rows('mt-2',
                        rowCols.cols('mt-2 col-12 position-relative',`<button class="btn btn-sm btn-primary position-absolute top-0 start-50 translate-middle z-3" id="btn_rotate">Klik Salah Satu Preview</button> <div class="containerIframe"> <iframe id="iframePreviewUpload"></iframe> </div>`)
                    )
                    ,false
                );
            }
        html+=`</div>`;
    html+=`</div>`;
    return html;
}

const boleanHtmlRefrensiSuratMasuk = (data)=>{
    let pesanfilesuratmasuk = `<div id="cekfilesuratmasuk" class="font10 text-center text-danger alert alert-info">Id Surat masuk dapat Anda lihat di menu Surat Masuk sebagai surat Undangan atau dasar pelaksanaan perjalanan dinas.</div>`;
            if(data.suratmasuk.length>0){
                pesanfilesuratmasuk=`<div id="cekfilesuratmasuk" class="font10 text-center alert-info text-succes">`;
                    pesanfilesuratmasuk+=`File Surat Refrensi terdeteksi<br>`;
                    pesanfilesuratmasuk+=`<button onclick="window.open('https://drive.google.com/file/d/${data.suratmasuk[0].idfile}/view?usp=drivesdk','', 'width=720,height=600')"" class="btn btn-sm border-4 text-bg-warning border-bottom border-start-0 border-top-0 border-end-0 rounded-pill"><i class="bi-eye"></i> Lihat Surat</button>`;
                pesanfilesuratmasuk +=`</div>`;
            }
    return pesanfilesuratmasuk;
}

const createSppd = (data)=>{
    let html="";
    html+=`<div class="row">`;
        html+=`<div class="col-md-6">`;
            html+=cardMenu('Maksud Perjalanan Dinas',
                inputsElements.floatingText('ptk_maksudsppd','Maksud Perjalanan Dinas',data.ptk_maksudsppd,' data-kirim="ptk_maksudsppd" ',false)
                +`<div class="mt-0 text-danger font10  pt-1 px-2">Maksud Perjalanan Dinas = Perihal dalam Surat Keluar</div>`
            ,false);
            html+=cardMenu('Tempat Perjalanan Dinas',
                inputsElements.floatingText('ptk_tempatsppd','Tempat Tujuan',data.ptk_tempatsppd,' data-kirim="ptk_tempatsppd" ',false)
                +`<div class="mt-0 text-danger font10 pt-1 px-2">Tujuan Perjalanan Dinas = Tujuan Surat dalam Surat Keluar</div>`
            ,false);
        html+=`</div>`;
        html+=`<div class="col-md-6">`;
            html+=cardMenu('Waktu Perjalanan Dinas',
                inputsElements.floatingDate('ptk_starttgl','Tanggal Mulai',data.ptk_starttgl,' data-kirim="ptk_starttgl" ')
                +inputsElements.floatingNumber('ptk_durasisppd','Lamanya hari',data.ptk_durasisppd,' data-kirim="ptk_durasisppd" ',1,)
            ,false);
            
        html+=`</div>`;
        html+=`<div class="col-md-12">`;
            html+=cardMenu('PTK yang ditugaskan',
                `<table class="table table-sm font10">
                    <thead>
                        <tr>
                            <th>PTK</th>
                            <th>NIP</th>
                            <th>Golongan/ruang</th>
                            <th>Jabatan di sekolah</th>
                            <th>Jabatan sesuai SPPD</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${data.namaptk.guru_namalengkap}</td>
                            <td>${data.namaptk.guru_nip}</td>
                            <td>${data.tendik.golonganruang}</td>
                            <td>${data.namaptk.gurukelas_gmp}</td>
                            <td class="p-0">${inputsElements.floatingText('idtest','Jabatan di SPPD',data.ptk_jabatan,' data-kirim="ptk_jabatan" ')}</td>
                        </tr>
                    </tbody>
                </table>`
            ,false);
            // html+=cardMenu('Pengikut',
            // 'test'
            // ,false);
        html+=`</div>`;
    html+=`</div>`;
    return html;
}

const checkBoxTargetPersonal = (data,addclass=false)=>{
    let itemPersonal = "";
    if(data.tipetarget == 'target_siswa'){
        data.arraypersonal.forEach((n, indeks)=>{
            itemPersonal +=inputsElements.formInputCheckbox('personal_'+data.tipetarget+'_'+indeks+'_'+new Date().getTime(), n.pd_nama +`${addclass?` (Kelas ${n.nama_rombel})`:''}`,n.id,false,'checkboxpersonal',addclass?' checked ':'');
        })
    }else{
        data.arraypersonal.forEach((n, indeks)=>{
            itemPersonal +=inputsElements.formInputCheckbox('personal_'+data.tipetarget+'_'+indeks+new Date().getTime(),n.guru_namalengkap,n.id,false,'checkboxpersonal');
        })
    }
    return itemPersonal;
}

const controlBuatSuratMsuk = (data)=>{

}

const viewFormulirSuratMasuk = (data)=>{
    let html = "";
    html+=`<div class="row">`;
        html+=`<div class="col-md-6">`;
            html+=cardMenu('Properti Asal Surat',
                inputsElements.floatingDate('tglditerima','Tanggal Diterima',data.tglditerima_input,' data-kirimsuratmasuk="tglditerima" ')
                +
                inputsElements.floatingText('asalsurat','Asal Surat',data.asalsurat,' data-kirimsuratmasuk="asalsurat" ',false)
                +
                inputsElements.floatingText('perihalsuratmasuk','Perihal',data.perihal,' data-kirimsuratmasuk="perihal" ',false)
                +
                inputsElements.floatingText('status','Status',data.status,' data-kirimsuratmasuk="status" disabled',false)
                +
                inputsElements.floatingText('oleh','Anda Sebagai Pembuat',data.oleh,' data-kirimsuratmasuk="oleh" disabled',false)
            ,false)
        html+=`</div>`;
        html+=`<div class="col-md-6">`;
            html+=cardMenu('Properti Surat',
                inputsElements.floatingText('nosuratmasuk','No Surat',data.nosurat,' data-kirimsuratmasuk="nosurat" ',false)
                +
                inputsElements.floatingDate('tglsuratsuratmasuk','Tanggal Surat',data.tglsurat_input,' data-kirimsuratmasuk="tglsurat" ')
                +
                inputsElements.floatingText('ditujukkankepadasuratmasuk','Ditujukan Kepada',data.ditujukkankepada,' data-kirimsuratmasuk="ditujukkankepada" ',false)
                +
                inputsElements.floatingText('indekssuratsuratmasuk','Indek Surat',data.indekssurat,' data-kirimsuratmasuk="indekssurat" ',false)
                +`<div class="font10 text-danger border p-1">Indeks Surat berikut memiliki template otomatis:<br><b>SPPD</b> Untuk SPPD<br></div>`
            ,false)
        html+=`</div>`;
        html+=`<div class="col-md-12">`;
            html+=cardMenu('File Surat',
                    inputsElements.grupInputFileRotate('upload-dok_files','data-uploaddokumen="idfile" data-labelname="File Surat"','Upload','frm-idfile','File Surat',data.idfile,'data-kirimsuratmasuk="idfile"')
                    +
                    rowCols.rows('mt-2',
                        rowCols.cols('mt-2 col-12 position-relative',`<button class="btn btn-sm btn-primary position-absolute top-0 start-50 translate-middle z-3" id="btn_rotate">Klik Salah Satu Preview</button> <div class="containerIframe"> <iframe id="iframePreviewUpload"></iframe> </div>`)
                    )
                    ,false
                );
        html+=`</div>`;
    html+=`</div>`;
    return html;
}

const viewResultCariSuratmasuk = (data,mustChecked=false)=>{
    let html="";
    html+=`<ol class="list-group list-group-flush">`;
        if(data.length == 0){
            html+=`<li class="list-group-item">Tidak Ditemukan</li>`
        }else{
            data.forEach(n=>{
                html+=`<li class="list-group-item d-flex justify-content-between align-items-start font10">`;
                    html+=`<div class="me-1">`;
                    
                    if(n.perihal!==""){
                        html+=`<b>${n.perihal}</b><br>`;
                    }
                
                    html+=`Dari/Asal Surat: ${n.asalsurat}`;
                    html+=`<hr>`;

                    html+=`</div>`;
                    
                    if(n.idfile!==""){
                        html+=`<button class="btn btn-sm btn-success me-1" onclick="window.open('https://drive.google.com/file/d/${n.idfile}/view?usp=drivesdk','', 'width=720,height=600')" title="lihat surat"><i class="bi-eye"></i> Lihat</button>`;
                    }
                    
                    html+=inputsElements.formInputRadio('nsuratmasuk_'+n.idbaris,'Pilih',n.idbaris,true,'pilih_hasil_cari_suramasuk',` data-resulcaritidfile="${n.idfile??''}" ${mustChecked?' checked ':''}`);
                html+=`</li>`;
            });
        }
    html+=`</ol>`;
    return html;
}
const viewBuatSuratMasukInModal = (data)=>{
    let html="";
        html+=`<div class="row mb-4 border shadow-lg">`;
            
        html+=`</div>`;
    return html;
}
const formInputCheckbox =(id,label,value,inline,name, atribute)=>{
    return inputsElements.formInputCheckbox(id,label,value,inline,name, atribute)
}
const floatingSelect = (id,label,arr,selectedvalue,atr)=>{
    return inputsElements.floatingSelect(id,label,arr,selectedvalue,atr)
}
const viewModalSuratTemplate = (data,autorization)=>{
    const {judulmodal,suratkeluar,datasiswa,template} =data
    let html="";
    
    html+=`<div class="d-flex justify-content-between mb-2">`;
        html+=`Pilih ${judulmodal} yang Akan ditampilkan:`;
        if(datasiswa.length>0){
            html+=`<button class="btn btn-sm btn-secondary py-0 px-1 text-center rounded-pill" data-showsuratkeluartemplate="${template} lampiran" data-tipetarget="show" data-targetperson="lampiran" data-idsuratkeluar="${suratkeluar.idbaris}">Format Surat Lampiran</button>`;
        }
        if(autorization){
            html+=`<button class="btn btn-sm btn-success py-0 px-1 text-center rounded-pill" data-showsuratkeluartemplate="${template}" data-tipetarget="show_edit" data-targetperson="edit_lampiran" data-idsuratkeluar="${suratkeluar.idbaris}"><i class="bi bi-pencil"></i></button>`;
        }
                                
    html+=`</div>`;
    html+=`<div class="table-responsive">`;
        html+=`<table class="table table-bordered border-dark table-sm">`;
            html+=`<thead>`;
                html+=`<tr class="text-bg-secondary text-center">`;
                    html+=`<th class="text-bg-secondary">No</th>`;
                    html+=`<th class="text-bg-secondary text-uppercase">${judulmodal}</th>`;
                    html+=`<th class="text-bg-secondary">Kelas</th>`;
                    html+=`<th class="text-bg-secondary">Aksi</th>`;
                html+=`</tr>`;
            html+=`</thead>`;
            html+=`<tbody>`;
            if(datasiswa.length>0){
                datasiswa.forEach((sp,index) => {
                    html+=`<tr>`;
                    html+=`<td class="text-center">${index+1}.</td>`;
                    html+=`<td>${sp.pd_nama}</td>`;
                    html+=`<td class="text-center">${sp.nama_rombel}</td>`;
                    html+=`<td class="text-center">`;
                    html+=`<button class="btn btn-sm btn-primary py-0 px-1 text-center rounded-pill" data-showsuratkeluartemplate="${template}" data-tipetarget="show_id" data-targetperson="${sp.id}" data-idsuratkeluar="${suratkeluar.idbaris}"><i class="bi bi-eye"></i></button>`;
                    html+=`</td>`;
                    html+=`</tr>`;
                });
            }else{
                html+=`<tr><td colspan="4" class="text-center">Data Lampiran/target personal surat tidak tersedia<br><br>Mungkin saja surat keluar dengan indeks surat ini tidak dibuat dengan template dari aplikasi ini. Periksa di file yang diunggah untuk menampilkan pratinjau (preview) surat.</td>`;
            }

            html+=`</tbody>`;
        html+=`</table>`;
    html+=`</div>`;
    return html;
}

const sppdView={
    'buildPageSppd':buildPageSppd,
    'rekapItemsNoSuratSPPD':rekapItemsNoSuratSPPD,
    'createSurat':createSurat,
    'checkBoxTargetPersonal':checkBoxTargetPersonal,
    'rekapItemsSuratKeluarByTemplate':rekapItemsSuratKeluarByTemplate,
    'Surat_Keterangan_Aktif':Surat_Keterangan_Aktif,
    'Surat_Keterangan_NISN':Surat_Keterangan_NISN,
    'Surat_Keterangan_NISN_lampiran':Surat_Keterangan_NISN_lampiran,
    'Surat_Keterangan_Aktif_lampiran':Surat_Keterangan_Aktif_lampiran,
    'createSppd':createSppd,
    'selectRombel':selectRombel,
    'viewBuatSuratMasukInModal':viewBuatSuratMasukInModal,
    'viewResultCariSuratmasuk':viewResultCariSuratmasuk,
    'viewFormulirSuratMasuk':viewFormulirSuratMasuk,
    'formInputCheckbox':formInputCheckbox,
    'floatingSelect':floatingSelect,
    'viewModalSuratTemplate':viewModalSuratTemplate,
    'Surat_Keterangan_Diterima':Surat_Keterangan_Diterima,
    'Surat_Keterangan_Diterima_lampiran':Surat_Keterangan_Diterima_lampiran,
    'Surat_Keterangan_Pindah':Surat_Keterangan_Pindah,
    'Surat_Keterangan_Pindah_lampiran':Surat_Keterangan_Pindah_lampiran
}

export default sppdView;