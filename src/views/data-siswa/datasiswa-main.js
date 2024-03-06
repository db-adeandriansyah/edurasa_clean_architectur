import buttonEdu from "../components/buttons";
import inputsElements from "../components/input-elements";
import rowCols from "../components/row-cols";
import { cardMenu } from "../sidebar/cardSidebar";

const tambahSiswaView = (kondisi,isadmin=false)=>{
    let html = "";
    html+=`<h3 class="text-center">Tambah Siswa</h3>`;
    html+=`<div class="alert alert-danger font12">Sebelum Anda menambahkan data siswa, sebaiknya Anda pastikan data yang akan Anda tambahkan sudah pernah diinput atau belum dengan mengeceknya di fitur <b>cari siswa</b>. Hal ini untuk menghindari data ganda dan juga ketertautan arsip database siswa yang bersangkutan.</div>`;
    html+=`Silakan Pilih mode penambahan siswa Anda:`
    html+=`<div class="d-flex justify-content-evenly align-items-center border rounded mt-3 py-5">`;
    if(isadmin){
        html+=buttonEdu.secondary(` data-aksi="tambahsiswa" data-rombel="custom"`,'Tambah Siswa');

    }else{
        html+=buttonEdu.primary(` data-aksi="tambahsiswa" data-rombel="${kondisi}"`,'Tambah Siswa Kelas '+kondisi);
        html+=buttonEdu.secondary(` data-aksi="tambahsiswa" data-rombel="custom"`,'Tambah Siswa Kelas lain');

    }
    html+=`</div>`;
    return html;
}

const menuCari = (rombel={},agama=[],pekerjaan=[])=>{
    let html = "";
    let opsiJenjang = "";
    let opsiRombel = "";
    let opsiAgamma = "";
    let opsiPekerjaan ="";

    Object.keys(rombel).forEach(j=>{
        opsiJenjang  +=`<option value="${j}">${j}</option>`;
    });

    Object.values(rombel).forEach(k=>{
        k.forEach(r =>{
            opsiRombel  +=`<option value="${r}">${r}</option>`;

        });
    
        
    });

    agama.forEach(s=>{
        opsiAgamma+=`<option value="${s.value}">${s.label}</option>`;
    });

    pekerjaan.forEach(k=>{
        opsiPekerjaan+=`<option value="${k.value}">${k.label}</option>`;
    });

    html+=`<div class="my-2 border-5 border-warning border-top-0  border-start-0 border-end-0 border-bottom accord-bg rounded container">`;
    html+=`<h3 class="text-center">Kriteria Pencarian</h3>`;
        html+=rowCols.rows('my-2',
            rowCols.cols('col-md-4', inputsElements.grupInput( `<div class="input-group-text"> <input class="form-check-input me-2" id="SearchStatus" type="checkbox" data-control="aktif"> <label for="SearchStatus"> Status</label> </div> <select class="form-select " data-refcontrol="aktif" id="refcontrol_aktif" disabled="true"> <option value="aktif">Aktif</option> <option value="non-aktif">Tidak Aktif</option> <option value="lulus">Lulus</option> <option value="pindah">Pindah</option> <option value="">Tidak diisi</option> </select> <div class="input-group-text"> <div class="input-group"> <input type="checkbox" class="form-check me-2" id="otherStatus" data-refcontrol="aktif" disabled="true"> <label for="otherStatus"> kecuali</label> </div> </div>` ) )
            +
            rowCols.cols('col-md-4', inputsElements.grupInput( `<div class="input-group-text"> <input class="form-check-input me-2" id="SearchJenjang" type="checkbox" data-control="jenjang"> <label for="SearchJenjang"> Jenjang</label> </div> <select class="form-select " data-refcontrol="jenjang" id="refcontrol_jenjang" disabled="true">` + opsiJenjang +`</select> <div class="input-group-text"> <div class="input-group"> <input type="checkbox" class="form-check me-2" id="otherJenjang" data-refcontrol="jenjang" disabled="true"> <label for="otherJenjang"> kecuali</label> </div> </div>` ) )
            +
            rowCols.cols('col-md-4', inputsElements.grupInput( `<div class="input-group-text"> <input class="form-check-input me-2" id="SearchNamaRombel" type="checkbox" data-control="nama_rombel"> <label for="SearchNamaRombel"> Kelas</label> </div> <select class="form-select " data-refcontrol="nama_rombel" id="refcontrol_nama_rombel" disabled="true">` +opsiRombel +`</select> <div class="input-group-text"> <div class="input-group"> <input type="checkbox" class="form-check me-2" id="otherNamaRombel" data-refcontrol="nama_rombel" disabled="true"> <label for="otherNamaRombel"> kecuali</label> </div> </div>` ) )
            +
            rowCols.cols('col-md-4', inputsElements.grupInput( `<div class="input-group-text"> <input class="form-check-input me-2" id="SearchAgama" type="checkbox" data-control="pd_agama"> <label for="SearchAgama"> Agama</label> </div> <select class="form-select " data-refcontrol="pd_agama" id="refcontrol_pd_agama" disabled="true">` +opsiAgamma +`</select> <div class="input-group-text"> <div class="input-group"> <input type="checkbox" class="form-check me-2" id="otherAgama" data-refcontrol="pd_agama" disabled="true"> <label for="otherAgama"> kecuali</label> </div> </div>` ) )
            +
            rowCols.cols('col-md-4', inputsElements.grupInput( `<div class="input-group-text"> <input class="form-check-input me-2" id="SearchGender" type="checkbox" data-control="pd_jk"> <label for="SearchGender"> Gender</label> </div> <select class="form-select" data-refcontrol="pd_jk" id="refcontrol_pd_jk" disabled="true"> <option value="">Belum Memilih</option> <option value="L">Laki-laki</option> <option value="P">Perempuan</option> </select> <div class="input-group-text"> <div class="input-group"> <input type="checkbox" class="form-check me-2" id="otherGender" data-refcontrol="pd_jk" disabled="true"> <label for="otherGender"> kecuali</label> </div> </div>` ) )
            +
            rowCols.cols('col-md-4', inputsElements.grupInput( `<div class="input-group-text"> <input class="form-check-input me-2" id="SearchNis" type="checkbox" data-control="nis"> <label for="SearchNis"> NIS</label> </div> <input type="text" class="form-control form-control-sm" data-refcontrol="nis" id="refcontrol_nis" disabled="true"> ` ) )
            +
            rowCols.cols('col-md-8', inputsElements.grupInput( `<div class="input-group-text"> <input class="form-check-input me-2" id="SearchPdNama" type="checkbox" data-control="pd_nama"> <label for="SearchPdNama"> Nama</label> </div> <input type="text" class="form-control form-control-sm" data-refcontrol="pd_nama" id="refcontrol_pd_nama" oninput="this.value = this.value.toUpperCase();" disabled="true"> ` ) )
            +
            rowCols.cols('col-md-4', inputsElements.grupInput( `<div class="input-group-text"> <input class="form-check-input me-2" id="SearchUmur" type="checkbox" data-control="umur"> <label for="SearchUmur"> Umur</label> </div> <input type="number" class="form-control form-control-sm" data-refcontrol="umur" id="refcontrol_umur" disabled="true"> <div class="input-group-text"> <div class="input-group"> <input type="checkbox" class="form-check me-2" id="otherUmur" data-refcontrol="umur" disabled="true"> <label for="otherUmur"> kecuali</label> </div> </div>` ) )
            +
            rowCols.cols('col-md-4', inputsElements.grupInput( `<div class="input-group-text" data-bs-toggle="tooltip" data-bs-title="Pilih kriteria anak yatim, piatu, atau yatim piatu"> <input class="form-check-input me-2" id="SearchYatim" type="checkbox" data-control="yatim"> <label for="SearchYatim"> Yatim</label> </div> <select class="form-select " data-refcontrol="yatim" id="refcontrol_yatim" disabled="true"> <option value="">Bukan</option> <option value="yatim">Yatim</option> <option value="piatu">Piatu</option> <option value="yatim/piatu">Yatim Piatu</option> </select> <div class="input-group-text"> <div class="input-group"> <input type="checkbox" class="form-check me-2" id="otherYatim" data-refcontrol="yatim" disabled="true"> <label for="otherYatim"> kecuali</label> </div> </div>` ) )
            
            +
            rowCols.cols('col-12 border rounded blur py-1 ms-1 me-2', `Header Kolom <small>(Kolom tabel yang ingin Anda tampilkan)</small><br>` +rowCols.rows('border pt-1 font10', rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerID" type="checkbox" data-header="id"> <label for="headerID" class="font12"> ID/Token</label> </div>` ) 
            +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerNamaJenjang" type="checkbox" data-header="jenjang"> <label for="headerNamaJenjang" class="font12"> Jenjang</label> </div>` ) 
            +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerNamaRombel" type="checkbox" data-header="nama_rombel"> <label for="headerNamaRombel" class="font12"> Rombel</label> </div>` ) 
            +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerAktif" type="checkbox" data-header="aktif"> <label for="headerAktif" class="font12"> Status</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerNis" type="checkbox" data-header="nis"> <label for="headerNis" class="font12"> NIS</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerNisn" type="checkbox" data-header="nisn"> <label for="headerNisn" class="font12"> NISN</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerNik" type="checkbox" data-header="nik"> <label for="headerNik" class="font12"> NIK</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerNokk" type="checkbox" data-header="nokk"> <label for="headerNokk" class="font12"> No. KK</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerPdNama" type="checkbox" data-header="pd_nama"> <label for="headerPdNama" class="font12""> Nama siswa</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerPdJk" type="checkbox" data-header="pd_jk"> <label for="headerPdJk" class="font12"> Gender</label> </div>` ) 
            +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerPdAgama" type="checkbox" data-header="pd_agama"> <label for="headerPdAgama" class="font12"> Agama</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerPdTl" type="checkbox" data-header="pd_tl"> <label for="headerPdTl" class="font12"> Tempat Lahir</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerPdTanggallahir" type="checkbox" data-header="pd_tanggallahir"> <label for="headerPdTanggallahir" class="font12"> Tanggal Lahir</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerUmur" type="checkbox" data-header="umur"> <label for="headerUmur" class="font12"> Umur</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerAyah" type="checkbox" data-header="pd_namaayah"> <label for="headerAyah" class="font12"> Ayah</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerIbu" type="checkbox" data-header="pd_namaibu"> <label for="headerIbu" class="font12"> Ibu</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerAlamat_lengkap" type="checkbox" data-header="pd_alamat"> <label for="headerAlamat_lengkap" class="font12"> Alamat</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerYatim" type="checkbox" data-header="yatim"> <label for="headerYatim" class="font12"> Yatim</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerMasukTgl" type="checkbox" data-header="masuk_tgl"> <label for="headerMasukTgl" class="font12"> Tgl Masuk</label> </div>` ) 
            +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerKeluarTgl" type="checkbox" data-header="keluar_tgl"> <label for="headerKeluarTgl" class="font12"> Tgl Keluar</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerDapoSekolahAsal" type="checkbox" data-header="dapo_sekolahasal"> <label for="headerDapoSekolahAsal" class="font12"> Pindahan Dari</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerPindahKe" type="checkbox" data-header="pindah_ke"> <label for="headerPindahKe" class="font12"> Pindah Ke</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerAwalKelas" type="checkbox" data-header="awal_kelas"> <label for="headerAwalKelas" class="font12"> Diterima di Kelas</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerKelasKeluar" type="checkbox" data-header="kelas_keluar"> <label for="headerKelasKeluar" class="font12"> Keluar di kelas</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerSmpKe" type="checkbox" data-header="smp_ke"> <label for="headerSmpKe" class="font12"> Melanjutkan SMP</label> </div>` ) +rowCols.cols('col', `<div class="input-group-text mb-1"> <input class="form-check-input me-2" id="headerEdit" type="checkbox" data-header="edit"> <label for="headerEdit" class="font12"> Tombol Edit</label> </div>` ) +rowCols.cols('col', inputsElements.grupInput( `<div class="input-group-text" data-bs-toggle="tooltip" data-bs-title="Tambahkan kolom kosong sebanyak angka yang Anda isikan"> <input class="form-check-input me-2" id="iDaddKolom" type="checkbox" data-header="addKolom"> <label for="iDaddKolom"> +Kolom</label> </div> <input type="number" class="form-control form-control-sm" value="1" min="1" id="inputaddKolom"> ` ) ) 
            +rowCols.cols('col-8', `<div class="border border-warning shadow-lg p-1 text-center rounded">Urutkan Data berdasarkan: <div class="btn-group btn-group-sm"> <input type="radio" class="btn-check" name="sorter" id="statistik1" value="id" autocomplete="off" checked="true"> <label class="btn btn-outline-danger" for="statistik1">ID</label> <input type="radio" class="btn-check" name="sorter" id="statistik2" value="pd_nama" autocomplete="off"> <label class="btn btn-outline-danger text-nowrap" for="statistik2">Nama Siswa</label> <input type="radio" class="btn-check" name="sorter" id="statistik3" value="nis" autocomplete="off"> <label class="btn btn-outline-danger" for="statistik3">NIS</label> <input type="radio" class="btn-check" name="sorter" id="statistik4" value="nama_rombel" autocomplete="off"> <label class="btn btn-outline-danger" for="statistik4">Kelas</label> </div> </div>` ) ) )
            +
            rowCols.cols('col-md-12 text-center blur m-1 border rouded', `<button class="btn mini border-bottom border-5 border-top-0 border-start-0 border-end-0 border-warning rounded-pill py-0 px-3" id="btnsearch">Terapkan</button>` )
        )
    html+=`</div>`;
    return html;
}

const menuMutasiMasuk = (awalanInduk,p='Pilih rentang tahun untuk melihat data siswa yang masuk/terdaftar sebagai siswa.')=>{
    let arr = []
    awalanInduk.forEach(obj=>{
        arr.push({value:obj.awalanInduk,label:obj.awalanInduk})
    })
    let b = inputsElements.floatingSelect('tapelmutasimasuk','Pilih Tapel',arr,'');
    return `<div class="rounded blur p-3 m-2 text-center">
        <h3 class="text-center mb-0">Silakan Pilih Tahun Pelajaran</h3>
        <p class="mt-0 p-0 mb-3">${p}</p>
        <div class="col-md-5 mx-auto">${b}</div>
    </div>`;
}

const onlySelectSorter = ()=>`<div class="border border-warning shadow-lg p-1 text-center rounded">Urutkan Data berdasarkan: <div class="btn-group btn-group-sm"> <input type="radio" class="btn-check" name="sorter" id="sorterById" value="id" autocomplete="off"> <label class="btn btn-outline-danger" for="sorterById">ID</label> <input type="radio" class="btn-check" name="sorter" id="sorterByPdNama" value="pd_nama" autocomplete="off" checked="true"> <label class="btn btn-outline-danger text-nowrap" for="sorterByPdNama">Nama Siswa</label> <input type="radio" class="btn-check" name="sorter" id="sorterByNis" value="nis" autocomplete="off"> <label class="btn btn-outline-danger" for="sorterByNis">NIS</label> <input type="radio" class="btn-check" name="sorter" id="sorterByNamaRombel" value="nama_rombel" autocomplete="off"> <label class="btn btn-outline-danger" for="sorterByNamaRombel">Kelas</label> </div> </div>`;

const koleksiBulan = (judul,arr, p,idSelectPilihBulan,tglValue) =>{
    let b = inputsElements.floatingSelect(idSelectPilihBulan,judul,arr,tglValue);
    return `<div class="rounded blur p-3 m-2 text-center"> <h3 class="text-center mb-0">${judul}</h3> <p class="mt-0 p-0 mb-3">${p}</p> <div class="col-md-5 mx-auto">${b}</div> </div>`; 
};

const judulLaporanMutasi = (data)=>{
    return rowCols.rowCols2( `<table style="border-collapse:collapse;margin:0 15px;width:100%;border:0"> <tbody> <tr> <td>Kelas</td> <td style="width:5px">:</td> <td style="padding:0 5px">${data.nama_rombel}</td> </tr> <tr> <td>Bulan</td> <td style="width:5px">:</td> <td style="padding:0 5px">${data.bulan}</td> </tr> </tbody> </table>` , `<table style="border-collapse:collapse;margin:0 15px;width:100%"> <tbody> <tr> <td>Tahun Pelajaran</td> <td style="width:5px">:</td> <td style="padding:0 5px">${data.tapel}</td> </tr> <tr> <td>Semester</td> <td style="width:5px">:</td> <td style="padding:0 5px">${data.semester}</td> </tr> </tbody> </table>` );
}

const kontenLaporanMutasi = (identitas, tableMasuk, tableKeluar, tableRekap)=>{
    let html = "";
    //judul:
    html+=`<h3 class="text-center border-bottom border-dark mb-3 pt-4 pb-3 text-uppercase fw-bolder">DAFTAR MUTASI SISWA</h3>`;
    html+=judulLaporanMutasi(identitas);
    html+=rowCols.rows('mt-3', 
                rowCols.cols('col-6',tableMasuk)
                +
                rowCols.cols('col-6',tableKeluar)
        );
    html+=rowCols.rows( 'mt-2 justify-content-center' ,
            rowCols.cols('col-7 border',tableRekap)
        )
    return html;
}
//<button class="btn btn-sm border-4 border-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-pill btn-warning m-1" id="btnshow-suratketeranganaktif" data-create="${data.value}" data-targetsurat="${data.target}">Surat Keluar ${data.text}</button>
const controlSuratKeterangan = (data)=>`<div class="row pt-3 justify-content-center">
    <div class="col-md-8 rounded shadow-lg p5 text-center">
        <h3 class="text-center">Menu Surat Menyurat</h3>
        <button class="btn btn-sm border-4 border-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-pill btn-primary m-1" id="btnshow-suratkeluar">Daftar Surat Keluar</button>
        
        <button class="btn btn-sm border-4 border-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-pill btn-success m-1" id="btncreate_suratketerangan" data-create="${data.value}" data-targetsurat="${data.target}">Buat ${data.text}</button>
    </div>
</div>`;
const controlMenuSPPD = (data)=>`<div class="row pt-3 justify-content-center">
    <div class="col-md-8 rounded shadow-lg p5 text-center">
        <h3 class="text-center">Menu SPPD</h3>
        <button class="btn btn-sm border-4 border-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-pill btn-success m-1" id="btncreate_suratketerangan" data-create="${data.value}" data-targetsurat="${data.target}">Buat ${data.text}</button>
    </div>
</div>`;
const dataSiswaViews={
    'tambahsiswa' :tambahSiswaView,
    'menucari':menuCari,
    'menumutasi':menuMutasiMasuk,
    'sorter':onlySelectSorter,
    'koleksiBulan':koleksiBulan,
    'kontenLaporanMutasi':kontenLaporanMutasi,
    'identitasLaporanMutasi':judulLaporanMutasi,
    'controlSuratKeterangan':controlSuratKeterangan,
    'controlMenuSPPD':controlMenuSPPD
}
export {dataSiswaViews};