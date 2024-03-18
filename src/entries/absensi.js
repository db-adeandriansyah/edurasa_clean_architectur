import "../sass/main.scss";

import '../sass/_step-tab.scss';
import '../sass/absensiswa.scss';
import '../sass/_kalender-container.scss';
import App from "../apps/Singleton.js";
import { absensiSidebar } from "../controller_menus/absensiSidebar.js";
import AbsensiRepository from "../repositories/AbsensiRepository.js";
import AbsensiService from "../services/AbsensiService.js";
import AbsensiController from "../controllers/AbsensiController.js";
import KalenderRepository from "../repositories/KalenderRepository.js";
import KalenderService from "../services/KalenderService.js";
// import { RepositorySurat } from "../repositories/RepositorySurat.js";
// import { ServiceSurat } from "../services/ServiceSurat.js";
// import { ArsipSuratController } from "../controllers/ArsipSuratController.js";

App.buildSidebarFitur(absensiSidebar,true);
App.createTitle('Absensi Siswa','Absensi');
App.dataPermision({'canEdit':[]});

const kaldikRepo = new KalenderRepository();
// kaldikRepo.trial = true;
const kaldikService = new KalenderService(kaldikRepo);

const repo = new AbsensiRepository();
// repo.trial = true;
const service = new AbsensiService(repo,kaldikService);
await service.ensureLoadedRepo();

const controller = new AbsensiController(App,service);
// await controller.ensureLoadedRepo();
controller.init();
controller.exec_fitur();