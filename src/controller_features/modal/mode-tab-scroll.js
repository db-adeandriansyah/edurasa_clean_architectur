import { FormatTanggal } from "../../utilities/FormatTanggal";
import inputsElements from "../../views/components/input-elements";
import rowCols from "../../views/components/row-cols";
import { cardMenu } from "../../views/sidebar/cardSidebar";

/**
 * Tambahan Config dari file JS; configKontentModal
 */
const htmlModalEdit=(db,arLabel,FormatTanggal)=>{
    let html = ""
    let isi = db.keluar_tgl!=''?new FormatTanggal(db.keluar_tgl).valueInputDate():'';
    let ke = db.pindah_ke;
    let alasan = db.alasan_keluar;
    
    if(db.aktif=='lulus'){
        html =inputsElements.floatingText('frm-dapo_noseriijazah','No Seri Ijasah','','data-updatedbsiswa="dapo_noseriijazah"');
        html+=inputsElements.floatingDate('frm-keluar_tgl','Tanggal Lulus',isi,'data-updatedbsiswa="keluar_tgl"');
        html+=inputsElements.floatingNumber('frm-angkatan','Angkatan',db.angkatan,'data-updatedbsiswa="angkatan"');
        
    }else if(db.aktif == 'pindah'){
        html =inputsElements.floatingDate('frm-keluar_tgl','Tanggal Pindah',isi,'data-updatedbsiswa="keluar_tgl"');
        html+=inputsElements.floatingText('frm-pindah_ke','Pindah Ke',ke,'data-updatedbsiswa="pindah_ke"',true);
        html+=inputsElements.floatingText('frm-kelas_keluar','Kelas yang ditinggalkan',db.kelas_keluar,'data-updatedbsiswa="kelas_keluar"');
        html+=inputsElements.floatingText('frm-alasan_keluar','Alasan Keluar',alasan,'data-updatedbsiswa="alasan_keluar"');
    }else{

    }

    return [
        {   title_tab:'Konfirmasi',
            id:"tab_konfirmasi",
            body_html: rowCols.rowCols2(
                    inputsElements.floatingText('frm-jenjang','Jenjang Rombel',db.jenjang, 'disabled data-updatedbsiswa="jenjang"') + `<div class="row my-3 justify-content-center"><div class="col" id="warning-usulan"></div> </div>`
                    ,
                    inputsElements.floatingText('form-nama_rombel','Nama Kelas',db.nama_rombel,'data-updatedbsiswa="nama_rombel"',true) +`<small class="text-muted">Untuk Mengubah Kelas/rombel, Anda disarankan mengetikan dengan format angka+namarombel. Pastikan antar guru kelas yang bersangkutan mengetahui perubahan yang telah Anda edit ketika mengubah kelas</small>`
                )
        },
        {   title_tab:'Status',
            id:"tab_status",
            body_html:rowCols.rowCols2(
                    inputsElements.floatingSelect('frm-status','Status',[
                        {value:'',label:'Belum Memilih'},
                        {value:'aktif',label:'Aktif'},
                        {value:'non-aktif',label:'Nonaktif'},
                        {value:'lulus',label:'Lulus'},
                        {value:'pindah',label:'Pindah/Mutasi'},
                    ],db.aktif,'data-updatedbsiswa="aktif"') + 
                    inputsElements.floatingDate('frm-masuk_tgl','Tanggal diterima',new FormatTanggal(db.masuk_tgl).valueInputDate(),'data-updatedbsiswa="masuk_tgl"')
                    +
                    inputsElements.floatingText('frm-namasekolahasaltk','Pernah bersekolah TK di',db.namasekolahasaltk,'data-updatedbsiswa="namasekolahasaltk"')+
                    cardMenu('Pindahan dari SD lain',inputsElements.floatingText('frm-dapo_sekolahasal','Pindahan dari(murid pindahan sd lain)',db.dapo_sekolahasal,'data-updatedbsiswa="dapo_sekolahasal"',false)+
                    inputsElements.floatingText('frm-awal_kelas','Diterima di kelas',db.awal_kelas,'data-updatedbsiswa="awal_kelas"'))
                ,
                
                `<div id="kolomtambahan">${html}</div>`
            )
        },
        {   title_tab:'Identitas',
            id:"tab_identitas",
            body_html:rowCols.rowCols2(
                inputsElements.floatingText('frm-pd_nama','Nama Siswa',db.pd_nama,'data-updatedbsiswa="pd_nama"',true)+
                inputsElements.floatingSelect('frm-pd_jk','Jenis Kelamin',arLabel.gender,db.pd_jk,'data-updatedbsiswa="pd_jk"')+
                inputsElements.floatingSelect('frm-pd_agama','Agama',arLabel.agama,db.pd_agama,'data-updatedbsiswa="pd_agama"')+
                inputsElements.floatingSelect('frm-dapo_kebutuhankhusus','Berkebutuhan Khusus?',arLabel.abk,db.dapo_kebutuhankhusus,'data-updatedbsiswa="dapo_kebutuhankhusus"')
                ,
                inputsElements.floatingText('frm-pd_tl','Tempat Lahir',db.pd_tl,'data-updatedbsiswa="pd_tl"',true)
                +inputsElements.floatingDate('frm-pd_tanggallahir','Tanggal Lahir (MM/DD/YYYY)',new FormatTanggal(db.pd_tanggallahir).valueInputDate(),'data-updatedbsiswa="pd_tanggallahir"')
                +inputsElements.floatingNumber('frm-dapo_anakkeberapa','Anak Ke-',db.dapo_anakkeberapa,' data-updatedbsiswa="dapo_anakkeberapa"')
                +inputsElements.floatingNumber('frm-dapo_jumlahsaudarakandung','Jumlah Saudara Kandung',db.dapo_jumlahsaudarakandung,' data-updatedbsiswa="dapo_jumlahsaudarakandung"')
                )
        },
        {   title_tab:'Penomoran',
            id:"tab_penomoran",
            body_html:rowCols.rowCols2(
                    inputsElements.floatingText('frm-id','ID',db.id,' disabled data-updatedbsiswa="id"')+
                    cardMenu("Nomor Induk",
                        inputsElements.floatingText('frm-nis','NIS (Nomor Induk Sekolah)',db.nis,'data-updatedbsiswa="nis"')
                        +
                        inputsElements.floatingText('frm-nisn','NISN',db.nisn,'data-updatedbsiswa="nisn"')
                        ,false
                    )
                ,
                cardMenu("Dokumen Keluarga",
                    inputsElements.floatingText('frm-nik','NIK (Nomor Induk Kependudukan)',db.nik,'data-updatedbsiswa="nik"')
                    +
                    inputsElements.floatingText(
                        'frm-nokk','No KK(Kartu Keluarga)',db.nokk,'data-updatedbsiswa="nokk"')
                    +
                    inputsElements.floatingText(
                        'frm-dapo_noregistrasiaktalahir','No. Registrasi Akte Kelahiran',db.dapo_noregistrasiaktalahir,'data-updatedbsiswa="dapo_noregistrasiaktalahir"')
                    ,false
                )
            )
        },
        {   title_tab:"Alamat",
            id:"tab_alamat",
            body_html:rowCols.rowCols2(
                inputsElements.floatingSelect('frm-dapo_jenistinggal','Jenis Tinggal',arLabel.jenis_tinggal,db.dapo_jenistinggal,'data-updatedbsiswa="dapo_jenistinggal"'),
                inputsElements.floatingSelect('frm-dapo_alattransportasi','Moda Transportasi',arLabel.moda_transportasi,db.dapo_alattransportasi,'data-updatedbsiswa="dapo_alattransportasi"')
            )
            +rowCols.rowCols2(
                inputsElements.floatingText('frm-pd_alamat','Alamat Jalan',db.pd_alamat,'data-updatedbsiswa="pd_alamat"',true),
                inputsElements.floatingText('frm-dapo_dusun','Alamat Dusun',db.dapo_dusun,'data-updatedbsiswa="dapo_dusun"',true)
            )
            +rowCols.rowCols2(
                inputsElements.floatingText('frm-dapo_kelurahan','Kelurahan/Desa',db.dapo_kelurahan,'data-updatedbsiswa="dapo_kelurahan"',true)
                ,
                rowCols.rows(null,
                    rowCols.cols('col-4', inputsElements.floatingText('frm-dapo_rt','RT',db.dapo_rt,'data-updatedbsiswa="dapo_rt"'))
                    +rowCols.cols('col-4',inputsElements.floatingText('frm-dapo_rw','RW',db.dapo_rw,'data-updatedbsiswa="dapo_rw"'))
                    +rowCols.cols('col-4',inputsElements.floatingText('frm-dapo_kodepos','KODE POS',db.dapo_kodepos,'data-updatedbsiswa="dapo_kodepos"'))
                    )
            )
            +rowCols.rows(null,
                rowCols.cols('col-4', inputsElements.floatingText('frm-dapo_kecamatan','Kecamatan',db.dapo_kecamatan,'data-updatedbsiswa="dapo_kecamatan"',true))
                +rowCols.cols('col-4',inputsElements.floatingText('frm-dapo_kota','Kota/kabupaten',db.dapo_kota,'data-updatedbsiswa="dapo_kota"',true))
                +rowCols.cols('col-4',inputsElements.floatingText('frm-dapo_provinsi','Provinsi',db.dapo_provinsi,'data-updatedbsiswa="dapo_provinsi"',true))
                )
        },
        { title_tab:"Orang Tua",
            id:"tab_orangtua",
            body_html:rowCols.rowCols2(
                cardMenu('Ayah',
                inputsElements.floatingText('frm-pd_namaayah','Nama Ayah',db.pd_namaayah,'data-updatedbsiswa="pd_namaayah"',true)
                +inputsElements.floatingDate('frm-dapo_tahunlahirayah','Tanggal Lahir (MM/DD/YYYY)',new FormatTanggal(db.dapo_tahunlahirayah).valueInputDate(),'data-updatedbsiswa="dapo_tahunlahirayah"')
                +inputsElements.floatingText('frm-dapo_nikayah','NIK',db.dapo_nikayah,'data-updatedbsiswa="dapo_nikayah"')
                +inputsElements.floatingSelect('frm-dapo_jenjangpendidikanayah','Pendidikan Terakhir',arLabel.pendidikan,db.dapo_jenjangpendidikanayah,'data-updatedbsiswa="dapo_jenjangpendidikanayah"')
                +inputsElements.floatingSelect('frm-dapo_pekerjaanayah','Pekerjaan',arLabel.pekerjaan,db.dapo_pekerjaanayah,'data-updatedbsiswa="dapo_pekerjaanayah"')
                ,false)
                ,
                cardMenu('Ibu',
                inputsElements.floatingText('frm-pd_namaibu','Nama Ibu',db.pd_namaibu,'data-updatedbsiswa="pd_namaibu"',true)
                +inputsElements.floatingDate('frm-dapo_tahunlahiribu','Tanggal Lahir (MM/DD/YYYY)',new FormatTanggal(db.dapo_tahunlahiribu).valueInputDate(),'data-updatedbsiswa="dapo_tahunlahiribu"')
                +inputsElements.floatingText('frm-dapo_nikayah','NIK',db.dapo_nikibu,'data-updatedbsiswa="dapo_nikibu"')
                +inputsElements.floatingSelect('frm-dapo_jenjangpendidikanibu','Pendidikan Terakhir',arLabel.pendidikan,db.dapo_jenjangpendidikanibu,'data-updatedbsiswa="dapo_jenjangpendidikanibu"')
                +inputsElements.floatingSelect('frm-dapo_pekerjaanibu','Pekerjaan',arLabel.pekerjaan,db.dapo_pekerjaanibu,'data-updatedbsiswa="dapo_pekerjaanibu"')
                ,false)
            )
        },
        { title_tab:"Upload",
            id:"tab_upload",
            body_html:rowCols.rowCols2(
                inputsElements.grupInputFileRotate('upload-dok_akte','data-uploaddokumen="dok_akte" data-labelname="Akte Kelahiran"','Upload','frm-dok_akte','Akte Kelahiran',db.dok_akte,'data-updatedbsiswa="dok_akte"')
                +inputsElements.grupInputFileRotate('upload-dok_kk','data-uploaddokumen="dok_kk" data-labelname="Kartu Keluarga"','Upload','frm-dok_kk','Kartu Keluarga',db.dok_kk,'data-updatedbsiswa="dok_kk"')
                ,
                inputsElements.grupInputFileRotate('upload-dok_kip','data-uploaddokumen="dok_kip" data-labelname="KIP"','Upload','frm-dok_kip','KIP',db.dok_kip,'data-updatedbsiswa="dok_kip"')
                +inputsElements.grupInputFileRotate('upload-dok_kpspkh','data-uploaddokumen="dok_kpspkh" data-labelname="KPS atau PKH"','Upload','frm-dok_kpspkh','KPS/PKH',db.dok_kpspkh,'data-updatedbsiswa="dok_kpspkh"')
            )+
            rowCols.rows('mt-2',
                rowCols.cols('mt-2 col-12 position-relative',`<button class="btn btn-sm btn-primary position-absolute top-0 start-50 translate-middle z-3" id="btn_rotate">Klik Salah Satu Preview</button>
                <div class="containerIframe">
                    <iframe id="iframePreviewUpload"></iframe>
                </div>`)
            )
        }
    ]
};
const htmlModalTambah=(rombel="1A",arLabel)=>{
    let html = "";

    return [
        {   title_tab:'Konfirmasi',
            id:"tab_konfirmasi",
            body_html: rowCols.rowCols2(
                    inputsElements.floatingText('frm-jenjang','Jenjang Rombel',rombel==""?"":parseInt(rombel), 'disabled data-updatedbsiswa="jenjang"') + `<div class="row my-3 justify-content-center"><div class="col" id="warning-usulan"></div> </div>`
                    ,
                    inputsElements.floatingText('form-nama_rombel','Nama Kelas',rombel,' data-updatedbsiswa="nama_rombel"',true) +`<small class="text-muted">Untuk Mengubah Kelas/rombel, Anda disarankan mengetikan dengan format angka+namarombel. Pastikan antar guru kelas yang bersangkutan mengetahui perubahan yang telah Anda edit ketika mengubah kelas</small>`
                )
        },
        {   title_tab:'Status',
            id:"tab_status",
            body_html:rowCols.rowCols2(
                    inputsElements.floatingSelect('frm-status','Status',[
                        {value:'',label:'Belum Memilih'},
                        {value:'aktif',label:'Aktif'},
                        {value:'non-aktif',label:'Nonaktif'},
                        {value:'lulus',label:'Lulus'},
                        {value:'pindah',label:'Pindah/Mutasi'},
                    ],'aktif','data-updatedbsiswa="aktif"') + 
                    inputsElements.floatingDate('frm-masuk_tgl','Tanggal diterima',"",'data-updatedbsiswa="masuk_tgl"')
                    +
                    inputsElements.floatingText('frm-namasekolahasaltk','Pernah bersekolah TK di',"",'data-updatedbsiswa="namasekolahasaltk"')+
                    cardMenu('Pindahan dari SD lain',inputsElements.floatingText('frm-dapo_sekolahasal','Pindahan dari(murid pindahan sd lain)','','data-updatedbsiswa="dapo_sekolahasal"',false)+
                    inputsElements.floatingText('frm-awal_kelas','Diterima di kelas',rombel,'data-updatedbsiswa="awal_kelas"'))
                ,
                
                `<div id="kolomtambahan">${html}</div>`
            )
        },
        {   title_tab:'Identitas',
            id:"tab_identitas",
            body_html:rowCols.rowCols2(
                inputsElements.floatingText('frm-pd_nama','Nama Siswa','','data-updatedbsiswa="pd_nama"',true)+
                inputsElements.floatingSelect('frm-pd_jk','Jenis Kelamin',arLabel.gender,'','data-updatedbsiswa="pd_jk"')+
                inputsElements.floatingSelect('frm-pd_agama','Agama',arLabel.agama,'','data-updatedbsiswa="pd_agama"')+
                inputsElements.floatingSelect('frm-dapo_kebutuhankhusus','Berkebutuhan Khusus?',arLabel.abk,'','data-updatedbsiswa="dapo_kebutuhankhusus"')
                ,
                inputsElements.floatingText('frm-pd_tl','Tempat Lahir','','data-updatedbsiswa="pd_tl"',true)
                +inputsElements.floatingDate('frm-pd_tanggallahir','Tanggal Lahir (MM/DD/YYYY)','','data-updatedbsiswa="pd_tanggallahir"')
                +inputsElements.floatingNumber('frm-dapo_anakkeberapa','Anak Ke-','',' data-updatedbsiswa="dapo_anakkeberapa"')
                +inputsElements.floatingNumber('frm-dapo_jumlahsaudarakandung','Jumlah Saudara Kandung','',' data-updatedbsiswa="dapo_jumlahsaudarakandung"')
                )
        },
        {   title_tab:'Penomoran',
            id:"tab_penomoran",
            body_html:rowCols.rowCols2(
                    // inputsElements.floatingText('frm-id','ID','',' disabled data-updatedbsiswa="id"')+
                    cardMenu("Nomor Induk",
                        inputsElements.floatingText('frm-nis','NIS (Nomor Induk Sekolah)','','data-updatedbsiswa="nis"')
                        +
                        inputsElements.floatingText('frm-nisn','NISN','','data-updatedbsiswa="nisn"')
                    ,false)
                ,
                cardMenu("Dokumen Keluarga",
                    inputsElements.floatingText('frm-nik','NIK (Nomor Induk Kependudukan)','','data-updatedbsiswa="nik"')
                    +
                    inputsElements.floatingText(
                        'frm-nokk','No KK(Kartu Keluarga)','','data-updatedbsiswa="nokk"')
                    +
                    inputsElements.floatingText(
                        'frm-dapo_noregistrasiaktalahir','No. Registrasi Akte Kelahiran','','data-updatedbsiswa="dapo_noregistrasiaktalahir"')
                    ,false
                    )
            )
        },
        {   title_tab:"Alamat",
            id:"tab_alamat",
            body_html:rowCols.rowCols2(
                inputsElements.floatingSelect('frm-dapo_jenistinggal','Jenis Tinggal',arLabel.jenis_tinggal,'','data-updatedbsiswa="dapo_jenistinggal"'),
                inputsElements.floatingSelect('frm-dapo_alattransportasi','Moda Transportasi',arLabel.moda_transportasi,'','data-updatedbsiswa="dapo_alattransportasi"')
            )
            +rowCols.rowCols2(
                inputsElements.floatingText('frm-pd_alamat','Alamat Jalan','','data-updatedbsiswa="pd_alamat"',true),
                inputsElements.floatingText('frm-dapo_dusun','Alamat Dusun','','data-updatedbsiswa="dapo_dusun"',true)
            )
            +rowCols.rowCols2(
                inputsElements.floatingText('frm-dapo_kelurahan','Kelurahan/Desa','','data-updatedbsiswa="dapo_kelurahan"',true)
                ,
                rowCols.rows(null,
                    rowCols.cols('col-4', inputsElements.floatingText('frm-dapo_rt','RT','','data-updatedbsiswa="dapo_rt"'))
                    +rowCols.cols('col-4',inputsElements.floatingText('frm-dapo_rw','RW','','data-updatedbsiswa="dapo_rw"'))
                    +rowCols.cols('col-4',inputsElements.floatingText('frm-dapo_kodepos','KODE POS','','data-updatedbsiswa="dapo_kodepos"'))
                    )
            )
            +rowCols.rows(null,
                rowCols.cols('col-4', inputsElements.floatingText('frm-dapo_kecamatan','Kecamatan','','data-updatedbsiswa="dapo_kecamatan"',true))
                +rowCols.cols('col-4',inputsElements.floatingText('frm-dapo_kota','Kota/kabupaten','','data-updatedbsiswa="dapo_kota"',true))
                +rowCols.cols('col-4',inputsElements.floatingText('frm-dapo_provindi','Provinsi','','data-updatedbsiswa="dapo_provinsi"',true))
                )
        },
        { title_tab:"Orang Tua",
            id:"tab_orangtua",
            body_html:rowCols.rowCols2(
                cardMenu('Ayah',
                inputsElements.floatingText('frm-pd_namaayah','Nama Ayah','','data-updatedbsiswa="pd_namaayah"',true)
                +inputsElements.floatingDate('frm-dapo_tahunlahirayah','Tanggal Lahir (MM/DD/YYYY)','','data-updatedbsiswa="dapo_tahunlahirayah"')
                +inputsElements.floatingText('frm-dapo_nikayah','NIK','','data-updatedbsiswa="dapo_nikayah"')
                +inputsElements.floatingSelect('frm-dapo_jenjangpendidikanayah','Pendidikan Terakhir',arLabel.pendidikan,'','data-updatedbsiswa="dapo_jenjangpendidikanayah"')
                +inputsElements.floatingSelect('frm-dapo_pekerjaanayah','Pekerjaan',arLabel.pekerjaan,'','data-updatedbsiswa="dapo_pekerjaanayah"')
                ,false)
                ,
                cardMenu('Ibu',
                inputsElements.floatingText('frm-pd_namaibu','Nama Ibu','','data-updatedbsiswa="pd_namaibu"',true)
                +inputsElements.floatingDate('frm-dapo_tahunlahiribu','Tanggal Lahir (MM/DD/YYYY)','','data-updatedbsiswa="dapo_tahunlahiribu"')
                +inputsElements.floatingText('frm-dapo_nikayah','NIK','','data-updatedbsiswa="dapo_nikibu"')
                +inputsElements.floatingSelect('frm-dapo_jenjangpendidikanibu','Pendidikan Terakhir',arLabel.pendidikan,'','data-updatedbsiswa="dapo_jenjangpendidikanibu"')
                +inputsElements.floatingSelect('frm-dapo_pekerjaanibu','Pekerjaan',arLabel.pekerjaan,'','data-updatedbsiswa="dapo_pekerjaanibu"')
                ,false)
            )
        },
        { title_tab:"Upload",
            id:"tab_upload",
            body_html:rowCols.rowCols2(
                inputsElements.grupInputFileRotate('upload-dok_akte','data-uploaddokumen="dok_akte" data-labelname="Akte Kelahiran"','Upload','frm-dok_akte','Akte Kelahiran','','data-updatedbsiswa="dok_akte"')
                +inputsElements.grupInputFileRotate('upload-dok_kk','data-uploaddokumen="dok_kk" data-labelname="Kartu Keluarga"','Upload','frm-dok_kk','Kartu Keluarga','','data-updatedbsiswa="dok_kk"')
                ,
                inputsElements.grupInputFileRotate('upload-dok_kip','data-uploaddokumen="dok_kip" data-labelname="KIP"','Upload','frm-dok_kip','KIP','','data-updatedbsiswa="dok_kip"')
                +inputsElements.grupInputFileRotate('upload-dok_kpspkh','data-uploaddokumen="dok_kpspkh" data-labelname="KPS atau PKH"','Upload','frm-dok_kpspkh','KPS/PKH','','data-updatedbsiswa="dok_kpspkh"')
            )
            +
            rowCols.rows('mt-2',
            rowCols.cols('mt-2 col-12 position-relative',`<button class="btn btn-sm btn-primary position-absolute top-0 start-50 translate-middle z-3" id="btn_rotate">Klik Salah Satu Preview</button>
                <div class="containerIframe">
                    <iframe id="iframePreviewUpload"></iframe>
                </div>`)
            )
        }
    ]
};

const modeLulus = (data)=>{
    let isi = data?new FormatTanggal(data.keluar_tgl).valueInputDate():'';
    let angkatan = data?data.angkatan:'';
    let smpke = data?data.smp_ke:'';
    
    let html =inputsElements.floatingText('frm-dapo_noseriijazah','No Seri Ijasah','','data-updatedbsiswa="dapo_noseriijazah"');
        html+=inputsElements.floatingDate('frm-keluar_tgl','Tanggal Lulus',isi,'data-updatedbsiswa="keluar_tgl"');
        html+=inputsElements.floatingNumber('frm-angkatan','Angkatan',angkatan,'data-updatedbsiswa="angkatan"');
        html+=inputsElements.floatingText('frm-smp_ke','Melanjutkan SMP di',smpke,'data-updatedbsiswa="smp_ke"');
        return html;
}
const modePindah = (data=null,FormatTanggal)=>{
    let isi = data?new FormatTanggal(data.keluar_tgl).valueInputDate():'';
    let ke = data?data.pindah_ke:'';
    let alasan = data?data.alasan_keluar:'';
    let html =inputsElements.floatingDate('frm-keluar_tgl','Tanggal Pindah',isi,'data-updatedbsiswa="keluar_tgl"');
                    html+=inputsElements.floatingText('frm-pindah_ke','Pindah Ke',ke,'data-updatedbsiswa="pindah_ke"',true);
                    html+=inputsElements.floatingText('frm-kelas_keluar','Kelas yang ditinggalkan','','data-updatedbsiswa="kelas_keluar"');
                    html+=inputsElements.floatingText('frm-alasan_keluar','Alasan Keluar',alasan,'data-updatedbsiswa="alasan_keluar"');
                    return html;
}

const sampel = [
    {   
        title_tab:'Title 1',
        id:"idsampel1",
        body_html:``
    },
    {   
        title_tab:'Title 2',
        id:"idsampel2",
        body_html:"Konten 2"
    },{   
        title_tab:'Title 3',
        id:"idsampel3",
        body_html:"Konten 3"
    },{   
        title_tab:'Title 4',
        id:"idsampel4",
        body_html:"Konten 4"
    },{   
        title_tab:'Title 5',
        id:"idsampel5",
        body_html:"Konten 5"
    },{   
        title_tab:'Title 6',
        id:"idsampel6",
        body_html:"Konten 6"
    },{   
        title_tab:'Title 7',
        id:"idsampel7",
        body_html:"Konten 7"
    },{   
        title_tab:'Title 8',
        id:"idsampel8",
        body_html:"Konten 8"
    },{   
        title_tab:'Title 9',
        id:"idsampel9",
        body_html:"Konten 9"
    },{   
        title_tab:'Title 10',
        id:"idsampel10",
        body_html:"Konten 10"
    },{   
        title_tab:'Title 11',
        id:"idsampel11",
        body_html:"Konten 11"
    },{   
        title_tab:'Title 12',
        id:"idsampel12",
        body_html:"Konten 12"
    },{   
        title_tab:'Title 132',
        id:"idsampel132",
        body_html:"Konten 132"
    },{   
        title_tab:'Title 142',
        id:"idsampel142",
        body_html:"Konten 142"
    },{   
        title_tab:'Title 142',
        id:"idsampel142",
        body_html:"Konten 142"
    },{   
        title_tab:'Title 152',
        id:"idsampel152",
        body_html:"Konten 152"
    },{   
        title_tab:'Title 162',
        id:"idsampel162",
        body_html:"Konten 162"
    },{   
        title_tab:'Title 172',
        id:"idsampel172",
        body_html:"Konten 172"
    },
]
const headermode =  (sampel)=>{
  let html = "";
  let body = ""
  for(let i = 0 ; i < sampel.length; i++){
    html+=`<button class="nav-link ${i==0?'active':''} text-nowrap" id="${sampel[i].id}" data-bs-toggle="tab" data-bs-target="#${sampel[i].id}_tab" type="button" role="tab" aria-controls="${sampel[i].id}_tab" aria-selected="false" tabindex="-1">${sampel[i].title_tab}</button>`;
    body+=`<div class="tab-pane ${i==0?'active show':''} fade" id="${sampel[i].id}_tab"  role="tabpanel" aria-labelledby="${sampel[i].id}_tab" tabindex="0">${sampel[i].body_html}</div>`;
  }
return {header:`<div class="nav nav-tabs nav-sm overflow-y-hidden pt-2 pb-0 px-2 scrol-modal-tab flex-nowrap" >${html}</div>`,tabkonten:body}
}
const build = (x)=>{
    if(x==undefined) x = sampel;
    let data = headermode(x);

return `<div class="modehead neon-lite-transisi scrolled rounded-top sticky-top">${data.header}</div>
<div class="tab-content">${data.tabkonten}
</div>
`    
}
const updateUploadResponse = (targetdom,idfile,idInput,labelInput)=>{
    // let html = "";
    //     html+=`<button class="input-group-text" data-uriPreview='https://drive.google.com/file/d/${idfile}/preview' data-fokusUri="${labelInput}">Preview</button>`;
    //     html+=`<button class="input-group-text" onclick="document.getElementById('${idInput}').value = ''">Hapus</button>`
    // return html;
    let btn = document.createElement('button');
        btn.setAttribute('class','input-group-text');
        btn.setAttribute('data-uriPreview',`https://drive.google.com/file/d/${idfile}/preview`);
        btn.setAttribute('data-fokusUri',`${labelInput}`);
        btn.innerHTML = "Preview";
        targetdom.appendChild(btn);

        btn = document.createElement('button');
        btn.setAttribute('class','input-group-text');
        btn.setAttribute('onclick',`document.getElementById('${idInput}').value = '';this.previousElementSibling.remove();this.remove()`);
        btn.innerHTML = "Hapus";
        targetdom.appendChild(btn);
}
const bodyModeScroll ={
    "modalEditSiswa":htmlModalEdit,
    "modalTambahSiswa":htmlModalTambah,
    'modeLulus':modeLulus,
    'build':build,
    'modePindah':modePindah,
    'updateUploadResponse':updateUploadResponse
}
export { bodyModeScroll, modePindah, modeLulus, htmlModalEdit, htmlModalTambah}