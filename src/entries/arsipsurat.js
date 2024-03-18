import "../sass/main.scss";
import App from "../apps/Singleton.js";
import { arsipSuratSidebar } from "../controller_menus/arsipSuratSidebar.js";
import { RepositorySurat } from "../repositories/RepositorySurat.js";
import { ServiceSurat } from "../services/ServiceSurat.js";
import { ArsipSuratController } from "../controllers/ArsipSuratController.js";

App.buildSidebarFitur(arsipSuratSidebar,false);
App.createTitle('Arsip Surat-Menyurat','Surat/SPPD');
App.dataPermision({'canEdit':[2,8,14,21]});

const repoSurat = new RepositorySurat();
repoSurat.trial=false;
const serviceSurat = new ServiceSurat(repoSurat);
const controller = new ArsipSuratController(App,serviceSurat);
await controller.ensureLoadedRepo();
controller.exec_fitur(false);

