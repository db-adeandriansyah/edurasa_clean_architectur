import { images } from "../assets/assetFunction";
//tag: ['siswa','ptk','','kepsek']
const koleksiMenuNavigasi = [
    {title:'Dashboard',             tag:['Guru Kelas','Kepala Sekolah','admin','Guru Mapel','siswa','ptk','Staff','Penjaga Sekolah','Operator Sekolah','kepsek'],         tersedia:'',                                                icon:'<i class="bi bi-columns-gap"></i>',               target:'/dashboard',                background:images['edurasa.png']},
    {title:'Data Siswa',            tag:['Guru Kelas','admin','Guru Mapel','ptk','Operator Sekolah','Kepala Sekolah'],         tersedia:'<span class="text-muted py-2">tersedia</span>',   icon:'<i class="bi bi-people-fill"></i>',               target:'/data-siswa',               background:images['data-siswa.webp']},
    {title:'Absensi Siswa',         tag:['Guru Kelas','admin','Guru Mapel','ptk','Kepala Sekolah'],         tersedia:'<span class="text-muted py-2">tersedia</span>',   icon:'<i class="bi bi-file-person-fill"></i>',          target:'/absensi',                  background:images['absensi-siswa.webp']},
    {title:'KBM',                   tag:['Guru Kelas','admin','Guru Mapel','ptk','Kepala Sekolah',],         tersedia:'<span class="text-muted py-2">tersedia</span>',   icon:'<i class="bi bi-book"></i>',                      target:'/kbm',                      background:images['kbm.webp']},
    {title:'Raport',                tag:['Guru Kelas','admin','Guru Mapel','ptk','Kepala Sekolah',],         tersedia:'<span class="text-muted py-2">tersedia</span>',   icon:'<i class="bi bi-mortarboard-fill"></i>',          target:'/rapor',                    background:images['raport.webp']},
    {title:'Bank Soal',             tag:['Guru Kelas','admin','Guru Mapel','ptk',],         tersedia:'<span class="text-muted py-2">tersedia</span>',   icon:'<i class="bi bi-question-octagon-fill"></i>',     target:'/banksoal',                 background:images['banksoal.webp']},
    {title:'Kurikulum',             tag:['Guru Kelas','admin','Guru Mapel','ptk','Kepala Sekolah',],         tersedia:'<span class="text-muted py-2">tersedia</span>',   icon:'<i class="bi bi-journal-bookmark-fill"></i>',     target:'/kurikulum',                background:images['kurikulum.webp']},
    {title:'Kalender',              tag:['Guru Kelas','admin','Guru Mapel','ptk','Kepala Sekolah','Penjaga Sekolah','Operator Sekolah',],         tersedia:'<span class="text-muted py-2">tersedia</span>',   icon:'<i class="bi bi-calendar-event"></i>',            target:'/kalender',                 background:images['kalender-pendidikan.webp']},
    {title:'Program Pembelajaran',  tag:['Guru Kelas','admin','Guru Mapel','ptk','Kepala Sekolah',],         tersedia:'<span class="text-muted py-2">tersedia</span>',   icon:'<i class="bi bi-newspaper"></i>',                 target:'/program_pembelajaran',     background:images['program-pembelajaran.webp']},
    {title:'RPP/Modul Ajar',        tag:['Guru Kelas','admin','Guru Mapel','ptk','Kepala Sekolah',],         tersedia:'',                                                icon:'<i class="bi bi-journal-medical"></i>',           target:'/',                         background:images['rpp.webp']},
    {title:'Arsip Surat',           tag:['Guru Kelas','admin','Guru Mapel','ptk','Operator Sekolah','Kepala Sekolah'],         tersedia:'<span class="text-muted py-2">tersedia</span>',                       icon:'<i class="bi bi-envelope"></i>',                  target:'/arsip-surat',              background:images['data_lemari.png']},
    {title:'Remedial',              tag:['Guru Kelas','admin','Guru Mapel','ptk',],         tersedia:'',                                                icon:'<i class="bi bi-easel2"></i>',                    target:'/',                         background:images['remedial-pengayaan.webp']},
    {title:'Pelajar Pancasila',     tag:['Guru Kelas','admin','Guru Mapel','ptk','Kepala Sekolah',],         tersedia:'',                                                icon:'<i class="bi bi-moon-stars-fill"></i>',           target:'/',                         background:images['pelajar-pancasila.webp']},
    {title:'Program Literasi',      tag:['Guru Kelas','admin','Guru Mapel','ptk','Kepala Sekolah',],         tersedia:'',                                                icon:'<i class="bi bi-pencil-fill"></i>',               target:'/',                         background:images['literasi.webp']},
    {title:'Supervisi',             tag:['Guru Kelas','admin','Guru Mapel','ptk','Kepala Sekolah',],         tersedia:'',                                                icon:'<i class="bi bi-eyeglasses"></i>',                target:'/',                         background:images['supervisi.webp']},
    {title:'Kehadiran Guru',        tag:['Guru Kelas','admin','Guru Mapel','Kepala Sekolah','ptk','Penjaga Sekolah','Operator Sekolah'],         tersedia:'',                                                icon:'<i class="bi bi-person-vcard-fill"></i>',         target:'/',                         background:images['PTK.webp']},//'https://versibaru.edurasa.com/img/lg_kehadiran_2a.png'},
    {title:'Pengembangan Diri',     tag:['Guru Kelas','admin','Guru Mapel','ptk','Kepala Sekolah',],         tersedia:'',                                                icon:'<i class="bi bi-bar-chart-steps"></i>',           target:'/',                         background:images['pengembangan-diri.webp']},
    {title:'Tabungan',              tag:['Guru Kelas','admin','Guru Mapel','ptk',],         tersedia:'<span class="text-muted py-2">tersedia</span>',   icon:'<i class="bi bi-wallet-fill"></i>',               target:'/tabungan',                 background:images['tabungan.webp']},
    {title:'Arsip',                 tag:['Guru Kelas','admin','Guru Mapel','ptk','Kepala Sekolah',],         tersedia:'<span class="text-muted py-2">tersedia</span>',   icon:'<i class="bi bi-folder2-open"></i>',              target:'/arsip',                    background:images['arsip.png']},
    {title:'Galeri',                tag:['Guru Kelas','admin','Guru Mapel','ptk','Penjaga Sekolah','Kepala Sekolah','Operator Sekolah'],         tersedia:'',                                                icon:'<i class="bi bi-flower1"></i>',                   target:'/',                         background:images['galeri.webp']},
];

const menubar = (tag)=> koleksiMenuNavigasi.filter(s=> s.tag.indexOf(tag)>-1) ;
export {menubar}