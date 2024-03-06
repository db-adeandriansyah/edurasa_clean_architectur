import "../sass/main.scss";
import App from "../apps/Singleton.js";
import { HomeController } from "../controllers/HomeController.js";

import UserService from "../services/UserRepoServices.js";

const Users = new UserService(App.UserApp)
const Home = new HomeController(App);
Home.index(Users);

// Home.loginSiswwa(async(e)=> {
//         e.preventDefault();
//         const token = document.getElementById('tokensiswa').value;
//         const authenticated = await Users.SiswaLogin(token);
//         console.log(authenticated)
//         if(authenticated){
//             // App.redirectToDashboard();
//         }
//         Home.warning_loginsiswa.innerHTML = `<div class="alert alert-danger mt-2 alert-dismissible fade show" role="alert" style="font-size:10px">Token Siswa Tidak dikenal<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
//     }
// );
