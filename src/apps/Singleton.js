
import Route from "../routes/Route";

const App = new Route();

App.initializeUser();
App.registerUrlPermission('/', ['guest','Guru Kelas','Guru Mapel','siswa','admin','Staff','Kepala Sekolah'] );
App.registerUrlPermission('/login', ['guest','admin'] );
App.registerUrlPermission('/dashboard', ['Guru Kelas','Guru Mapel','admin','siswa','Staff','Kepala Sekolah'] );
App.registerUrlPermission('/data-siswa', ['Guru Kelas','Guru Mapel','Kepala Sekolah','admin','Staff'] );
App.registerUrlPermission('/arsip-surat', ['Guru Kelas','Guru Mapel','Kepala Sekolah','admin','Staff'] );
App.registerUrlPermission('/absensi', ['Guru Kelas','Guru Mapel','Kepala Sekolah','admin','Staff'] );
App.init();

export {App as default}