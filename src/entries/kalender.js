import "../sass/main.scss";
import App from "../apps/Singleton.js";

import { kalenderSidebar } from "../controller_menus/kalenderSidebar.js";
import KalenderRepository from "../repositories/KalenderRepository.js";
import KalenderService from "../services/KalenderService.js";
import KalenderController from "../controllers/KalenderController.js";


App.buildSidebarFitur(kalenderSidebar,false,false);
App.createTitle('Kalender Pendidikan','Kaldik');
App.dataPermision({'canEdit':[2]});

const kaldikRepo = new KalenderRepository();
// kaldikRepo.trial = true;
const kaldikService = new KalenderService(kaldikRepo);
const kaldik = new KalenderController(App, kaldikService);
await kaldik.ensureLoadedRepo();
kaldik.exec_fitur(false);

