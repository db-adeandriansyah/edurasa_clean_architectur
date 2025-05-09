import inputsElements from "../components/input-elements";
import rowCols from "../components/row-cols";

// import { FormatTanggal } from "../../utilities/FormatTanggal";
const cardProfile = (cardHeader='string',cardBody='string2')=>{
    let html=`<div class="card">`;
            html+=`<div class="card-header">${cardHeader}</div>`;
            html+=`<div class="card-body">${cardBody}</div>`;
        html+=`</div>`;
    return html;
}
const kondisiPilihTugasJabatan = (rombel,datakelasampu)=>{
    let checkListRombel = `<span class='text-muted font14'>Mengampu Kelas:</span><br>`;
    let kelasampu = Array.isArray(datakelasampu)?datakelasampu:datakelasampu.replace(/(\s+)/,'').split(',');//.split(',');
    
    Object.entries(rombel).forEach(([k,v])=>{
        v.forEach(r=>{

            checkListRombel +=inputsElements.formInputCheckbox('idkelasampu_'+r,r,r,true,'kelasampu',kelasampu.includes(r)?' checked ':'');
        })
    })
    return checkListRombel;
}
const formulirGuru = (data,profil, rombel,fn)=>{
    let kondisiJabatanPTK='';
    let tugasjabatan=[]
    let checkListRombel = ''
    let radioRombel='';
    let kelasampu = Array.isArray(data.kelasampu)?data.kelasampu:data.kelasampu.replace(/(\s+)/,'').split(',');//.split(',');
    
    Object.entries(rombel).forEach(([k,v])=>{
        v.forEach(r=>{
            tugasjabatan.push({value:r,label:'Wali Kelas '+r});

            checkListRombel +=inputsElements.formInputCheckbox('idkelasampu_'+r,r,r,true,'kelasampu',kelasampu.includes(r)?' checked ':'');
            radioRombel+=inputsElements.formInputRadio('idkelasampu_'+r,r,r,true,'kelasampu',kelasampu.includes(r)?' checked ':'');
        })
    })
    if(['Kepala Sekolah','Staff'].includes(data.gurukelas_gmp)){
        kondisiJabatanPTK='';
    }else if(data.gurukelas_gmp == 'Guru Kelas'){
        kondisiJabatanPTK='';//radioRombel;
    }else{
        kondisiJabatanPTK=checkListRombel;

    }

    let html="";
    html+=`<div class="col-md-9 mb-2">`;
        html+=cardProfile('Sistem Login',
        inputsElements.floatingText('username','Username',data.username," data-akun='username'")+
        inputsElements.formFloatingPassword('username','Password',data.password," data-akun='password'")
        );
    html+=`</div>`;
    html+=`<div class="col-md-3 mb-2">`;
        html+=cardProfile('Poto Profil',`<input type="file" id="fileAvatar" class="d-none" accept="image/*">
        <input type="text" data-akun="idpoto_potoguru" value="${data.idpoto_potoguru}" class="d-none">
        <label for="fileAvatar" class="btn btn-sm py-0 border-3 border-bottom rounded-pill border-start-0 border-top-0 border-end-0 btn-secondary border-warning">Upload <i class="bi-camera"></i></lable>
        ` )
        
    html+=`</div>`;
    html+=`<div class="col-md-12 mb-2">`;
        html+=cardProfile('Identitas Pribadi', 
            inputsElements.floatingText('namaguru','Nama Guru',data.guru_namalengkap,' data-akun="guru_namalengkap" data-profil="namalengkap"',false)
            
            +rowCols.rowCols2(
                inputsElements.floatingText('tempatlahir','Tempat Lahir',profil.tempatlahir,' data-profil="tempatlahir"',false)
                ,
                inputsElements.floatingDate('ttl_tgl','Tanggal Lahir',fn(profil.tanggallahir).valueInputDate(),' data-profil="tanggallahir"')
                )
            +rowCols.rows('mb-2',
                rowCols.cols('col-md-4',
                    inputsElements.floatingSelect('gender','Gender',[{value:'',label:'Belum Memilih'},{value:'L',label:'Laki-laki'},{value:'P',label:'Perempuan'}],profil.jk," data-profil='jk'")
                )
                +rowCols.cols('col-md-4',
                    inputsElements.floatingSelect('agama','Agama',[
                            {
                                'value':'','label':'Belum Memilih'
                            },
                            {
                                'value':'ISLAM','label':'ISLAM'
                            },
                            {
                                'value':'KRISTEN','label':'KRISTEN'
                            },
                            {
                                'value':'KATHOLIK','label':'KATHOLIK'
                            },
                            {
                                'value':'HINDU','label':'HINDU'
                            },
                            {
                                'value':'BUDHA','label':'BUDHA'
                            },
                            {
                                'value':'KHONGHUCU','label':'KHONGHUCU'
                            },
                            
                            
                    ],profil.agama," data-profil='agama'")
                )
                +rowCols.cols('col-md-4',
                    inputsElements.floatingSelect('statuskawin','Status Perkawinan',[{value:'',label:'Belum Memilih'},{value:'K',label:'Kawin'},{value:'TK',label:'Belum Kawin'}],profil.statuskawin," data-profil='statuskawin'")
                )
            )
            
        );
    html+=`</div>`;
    html+=`<div class="col-md-12 mb-2">`;
        html+=cardProfile('Data Kepegawaian',
            rowCols.rows('mb-2',
                
                rowCols.cols('col-md-4',
                    inputsElements.floatingSelect('statuspegawai','Status Pegawai',[
                        {value:'',label:'Belum Memilih'},
                        {value:'PNS',label:'PNS'},
                        {value:'PPK',label:'PPPK'},
                        {value:'HNR APBD',label:'Honorer APBD'},
                        {value:'HNR APBN',label:'Honorer APBN'}
                    ],profil.pnsnonpns," data-profil='pnsnonpns'")
                )
                +rowCols.cols('col-md-4 mb-2',inputsElements.floatingSelect('jenistendik','Jenis Tendik',[
                        {value:'',label:'Belum Memilih'},
                        {value:'Kepala Sekolah',label:'Kepala Sekolah'},
                        {value:'Guru',label:'Pendidik'},
                        {value:'Tenaga Kependidikan',label:'Tenaga Kependidikan'},
                        
                    ],profil.tendik,' data-profil="tendik"')
                )
                +rowCols.cols('col-md-4 mb-2',
                    inputsElements.floatingSelect('jabatan','Jabatan',[
                        {value:'',label:'Belum Memilih'},
                        {value:'Kepala Sekolah',label:'Kepala Sekolah'},
                        {value:'Guru Kelas',label:'Guru Kelas'},
                        {value:'Guru Mapel',label:'Guru Mapel'},
                        {value:'Staff',label:'Staff'},
                    ],data.gurukelas_gmp,' data-profil="jabatan" data-akun="gurukelas_gmp"')
                )
                
                
            )
            +rowCols.rowCols2(
                inputsElements.floatingText('nip','NIP',data.guru_nip,' data-profil="nip" data-akun="guru_nip"',false)
                ,
                inputsElements.floatingText('nuptk','NUPTK',profil.nuptk,' data-profil="nuptk"',false)
                )
            +rowCols.rows('mb-2',
                    rowCols.cols('col-md-6 mb-2',
                        inputsElements.floatingDate('tmt_pegawai','TMT diangkat Pegawai',fn(profil.tmtpns).valueInputDate(),' data-profil="tmtpns" data-event-tanggal="body-tmtpns"')
                    )
                    
                    +rowCols.cols('col-md-6 mb-2',cardProfile('Masa Kerja Pegawai',`<div id="body-tmtpns" class="text-center">`+
                    fn(profil.tmtpns).umur().tahun +' tahun, '+fn(profil.tmtpns).umur().bulan+' bulan.</div>'
                    )
                        
                    )
                    +rowCols.cols('col-md-4 mb-2',
                            inputsElements.floatingSelect('golonganruang','Golongan Ruang(ASN)',[
                                {value:'',label:'Honorer'},
                                {value:'III/A',label:'III/A'},
                                {value:'III/B',label:'III/B'},
                                {value:'III/C',label:'III/C'},
                                {value:'III/D',label:'III/D'},
                                {value:'IV/A',label:'IV/A'},
                                {value:'IV/B',label:'IV/B'},
                                {value:'IV/C',label:'IV/C'},
                                {value:'IV/D',label:'IV/D'},
                                {value:'IX',label:'IX'},

                                
                                ],profil.golonganruang,' data-profil="golonganruang"')
                        )
                    +rowCols.cols('col-md-4 mb-3',
                        inputsElements.floatingDate('tmt_pangkat','Tanggal Pangkat',fn(profil.tanggalpangkat).valueInputDate(), ' data-profil="tanggalpangkat" data-event-tanggal="body-tmtpangkat"')
                    )
                    +rowCols.cols('col-md-4 mb-2',cardProfile('Masa Kerja Pangkat',`<div id="body-tmtpangkat" class="text-center font10">`+
                    fn(profil.tanggalpangkat).umur().tahun +' tahun, '+fn(profil.tanggalpangkat).umur().bulan+' bulan.</div>'))
                        
                    

                )
                
            
        )
    html+=`</div>`;
    
    html+=`<div class="col-md-12 mb-2">`;
        html+=cardProfile('Kenaikan Gaji Berkala',
            rowCols.rows('mb-2 justify-content-center',
                rowCols.cols('col-md-4 mb-2', 
                    inputsElements.floatingDate('tglkgb','TMT KGB YAD',fn(profil.kgb).valueInputDate(),' data-profil="kgb"')
                )
                +rowCols.cols('col-md-4 mb-2 bored', 
                    cardProfile('<span class="font12">Usulan KGB Berikutnya</span>','')
                )
            )
        )
    html+=`</div>`;

    html+=`<div class="col-md-12 mb-2">`;
        html+=cardProfile('Kepegawaian di Sekolah ini',
                rowCols.rows('mb-2',
                    rowCols.cols('col-md-4 mb-2',
                        inputsElements.floatingSelect('Tugas','Tugas',[
                                {value:'Kepala Sekolah',label:'Kepala Sekolah'},
                                {value:'PAI',label:'Mapel PAI'},
                                {value:'PKRIS',label:'Mapel Pend Kristen'},
                                {value:'PKATO',label:'Mapel Pend Katholik'},
                                {value:'PJOK',label:'Mapel PJOK'},
                                {value:'BSUND',label:'Mapel B. Sunda'},
                                {value:'Operator Sekolah',label:'Operator Sekolah'},
                                {value:'TU',label:'TU'},
                                {value:'Penjaga Sekolah',label:'Penjaga Sekolah'}, ...tugasjabatan
                                ],
                            data.kelas,' data-profil="tugasjabatan" data-akun="kelas"')
                    )
                    
                    +rowCols.cols('col-md-4',
                        inputsElements.floatingDate('tmt_sekolah','TMT Sekolah',fn(new Date(profil.tmtdisekolah)).valueInputDate(),' data-profil="tmtdisekolah" data-event-tanggal="body-tmtdisekolah"')
                    )
                    +rowCols.cols('col-md-4 mb-2',cardProfile('Masa Kerja Sekolah','<div id="body-tmtdisekolah" class="text-center font10">'+fn(new Date(profil.tmtdisekolah)).umur().tahun +' tahun, '+fn(new Date(profil.tmtdisekolah)).umur().bulan+' bulan.</div>'))
                    +rowCols.cols('col-md-3',
                        inputsElements.floatingNumber('jam','Jumlah Jam',profil.jammengajar,' data-profil="jammengajar"',1,100)
                    )
                    +rowCols.cols('col-md-9 mb-2 border kondisipilihkelasampu',kondisiJabatanPTK!==""?"<span class='text-muted font14'>Mengampu Kelas:</span><br>"+ kondisiJabatanPTK:"")
                    
                )
            )
    html+=`</div>`;
    html+=`<div class="col-md-12 mb-2">`;
    let thLulus = profil.tahunlulus;
    if(profil.tahunlulus.toString().length ==4){
        
        thLulus = new Date(profil.tahunlulus,1,1);
    }
    html+=cardProfile('Riwayat Pendidikan Terakhir',
        rowCols.rows('mb-2',
            rowCols.cols('col-md-8',
                inputsElements.floatingSelect('ijazahterakhir','Ijazah Terakhir',[
                    {value:'',label:'Tidak Sekolah'},
                    {value:'SMA',label:'SMA Sederajat'},
                    {value:'D1',label:'D1'},
                    {value:'D2',label:'D2'},
                    {value:'D3',label:'D3'},
                    {value:'S1',label:'S1'},
                    {value:'S2',label:'S2'},
                    {value:'S3',label:'S3'},
                ],profil.ijazah,' data-profil:"ijazah"')
            )
            +rowCols.cols('col-md-4',
                inputsElements.floatingDate('tglIjazah','Tanggal/Tahun Ijazah',fn(thLulus).valueInputDate(),' data-profil="tahunlulus"')
            )
            +rowCols.cols('col-md-4',
                inputsElements.floatingSelect('jenisjurusan','Jenis Jurusan',[
                    {value:'',label:'Belum Memilih'},
                    {value:'Kependidikan',label:'Kependidikan'},
                    {value:'Nonkependidikan',label:'Nonkependidikan'},
                    {value:'Kepend.',label:'Kepend (bentuk singkat)'},
                    {value:'Non',label:'Non (bentuk singkat)'},
                ],profil.kependidikan,' data-profil="kependidikan" ')
            )
            +rowCols.cols('col-md-8',
                inputsElements.floatingText('jurusan    ','Jurusan',profil.jurusan,' data-profil="jurusan" ',false)
            )
        )

    )
    html+=`</div>`;
    html+=`<div class="col-md-12 my-3 bg-light-subtle p-2 text-center">`;
        html+=`<button id="btnSaveProfil" class="btn btn-sm border-5 border-bottom border-start-0 border-top-0 border-end-0 border-warning katulistiwa rounded-pill"><i class="bi bi-save"></i> Simpan Perubahan</button>`;
    html+=`</div>`;

    return html;
}
const formulirSiswa = (data)=>{
    let html = ""
    return html;
}
const profileViews = {
    'formulirGuru':formulirGuru,
    'formulirSiswa':formulirSiswa,
    'kondisiPilihTugasJabatan':kondisiPilihTugasJabatan
}
export default profileViews;