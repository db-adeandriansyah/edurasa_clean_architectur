import { app } from '../apps/App';
import App from "../apps/Singleton.js";
import { ProfileController } from '../controllers/ProfileController';
// import { ProfileController } from '../apps/controllers/ProfileController';
import '../sass/main.scss';
// const app = await import('../apps/App').then(({app})=>app);
// const profileAct = new ProfileController(app.keyApp(),app.argumenNavigation());
const profileAct = new ProfileController(App.keyApp(),app.argumenNavigation());
profileAct.initProfile();