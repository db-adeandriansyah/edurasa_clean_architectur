import "../sass/main.scss";
import App from "../apps/Singleton.js";
import { bukuindukSidebar } from "../controller_menus/bukuindukSidebar.js";
import BukuIndukRepository from "../repositories/BukuIndukRepository.js";
import BukuIndukService from "../services/BukuIndukService.js";
import BukuIndukController from "../controllers/BukuIndukController.js";
import siswa_entity from "../domains/SiswaEntity.js";
import DokumenTambahan from "../domains/DokumenTambahan.js";

// import { raporSidebar } from "../controller_menus/raporijazahSidebar.js";
// import BanksoalRepository from "../repositories/BanksoalRepository.js";
// import KbmService from "../services/KbmService.js";
// import RaporIjazahController from "../controllers/RaporIjazahController.js";

App.buildSidebarFitur(bukuindukSidebar(),false,false);
App.createTitle('Buku Induk','Buku Induk');
App.dataPermision({'canEdit':[2]});

const indukRepo = new BukuIndukRepository(siswa_entity,DokumenTambahan);
const indukService = new BukuIndukService(indukRepo);
const indukController = new BukuIndukController(App,indukService);
await indukController.init();
indukController.exec_fitur(false);


// const banksoalRepo = new BanksoalRepository();
// // banksoalRepo.trial = true;

// const kbmServ = new KbmService(banksoalRepo);

// await kbmServ.ensureLoadedRepo();

// const controller = new RaporIjazahController(App,kbmServ);
// controller.exec_fitur(true);
