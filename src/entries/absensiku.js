import "../sass/main.scss";

import '../sass/_step-tab.scss';
import '../sass/absensiswa.scss';
import '../sass/_kalender-container.scss';
import App from "../apps/Singleton.js";

App.buildSidebarFitur(absensiSidebar,true);
App.createTitle('Absensi Siswa','Absensi');
App.dataPermision({'canEdit':[]});