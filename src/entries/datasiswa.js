import "../sass/main.scss";
import App from "../apps/Singleton.js";
import DataSiswaController from "../controllers/DataSiswaController.js";
import dataSiswaSidebar from "../controller_menus/dataSiswaSidebar.js";
import SiswaRepoService from "../services/SiswaRepoServices.js";
import { DataKelas,dataSiswaViews, tabelDom,ModalConfig,TableProperties, myArray,DataMutasi } from "./vendor.js";
import { RepositorySurat } from "../repositories/RepositorySurat.js";
import { ServiceSurat } from "../services/ServiceSurat.js";
// import { ControlSuratFeatures } from "../controller_features/surat/ControlSuratFeatures.js";

App.buildSidebarFitur(dataSiswaSidebar)
App.createTitle('Database Siswa','Kesiswaan')
App.dataPermision({'canEdit':[21]});

const SiswaService = new SiswaRepoService(App.UserApp);
await SiswaService.ensureLoadeRepo();
const repoSurat = new RepositorySurat();
repoSurat.trial=false;
const serviceSurat = new ServiceSurat(repoSurat);
const datasiswa = new DataSiswaController(App,SiswaService);

datasiswa.fitur({
    'DataKelas'         : DataKelas,
    'view'              : dataSiswaViews,
    'tabel'             : tabelDom,
    'modal'             : ModalConfig,
    // 'bodyModal'         : bodyModeScroll,
    'TableProperties'   : TableProperties,
    'myArray'           : myArray,
    'DataMutasi'        : DataMutasi,
    'serviceSurat'      : serviceSurat,
    // 'ControlSuratFeatures':ControlSuratFeatures
    // 'StatistikDbSiswa'  :StatistikDbSiswa


});
datasiswa.exec_fitur() 


