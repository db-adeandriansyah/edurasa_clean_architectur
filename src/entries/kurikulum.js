import "../sass/main.scss";
import App from "../apps/Singleton.js";
import { kurikulumSidebar } from "../controller_menus/kurikulumSidebar.js";
import KurikulumController from "../controllers/KurikulumController.js";
import KurikulumRepository from "../repositories/KurikulumRepository.js";
import KurikulumService from "../services/KurikulumService.js";


App.buildSidebarFitur(kurikulumSidebar,false,true);
App.createTitle('Kurikulum','Kurikulum');
App.dataPermision({'canEdit':[2]});

const repo = new KurikulumRepository()
const service = new KurikulumService(repo)
const kurikulum = new KurikulumController(App,service);

await kurikulum.init();

kurikulum.exec_fitur(false);