# Tentang Controller

Controller berisikan seluruh file javascript controller. Bayangkan controller itu seperti controller dalam `Laravel`, Di sana, class-class controller akan menyediakan method `index`, `create`, `show`,`store`, `update`, `edit`,`delete/destroy`. Di sini juga sama menerapkan seperti ini.

Hanya saja, aplikasi ini tidak mempunya server, semuanya dilakukan di sisi Client. Oleh karena itu, untuk menampilkan tampilan `view` itu hanya sebatas build dari webpack saja.

## Konsep Clean Architecture
Konsep ini saya dikenalkan oleh [Programmer Zaman Now](https://www.youtube.com/@ProgrammerZamanNow). Bahwa Controller merupakan bagian dari *Design Pattern* MVC dimana pada kenyataanya Controller masih perlu menerapkan __design pattern__ lain. Misalnya, `services` dan `repository`;

### services
Di Controller membutuhkan class yang berasal dari folder services. Class Service menyediakan beberapa method yang mengembalikan nilai (me-return nilai). Di class service sebenarnya menurunkan class `repository` dimana bertugas untuk memanggil "AppScript*.

Di c

## HomeController
Setiap controller biasanya (mungkin juga seharusnya) membutuhkan class Model yang merepresentasikan sebuah data. Misalnya `UserModel`,`rombelModel`, dan lain-lain. 

Untuk model User dimana user disini adalah para pengguna yang menjalankan aplikasi sebenarnya telah diinject melalui __constructor__. Di sana berisi data mengenai *app* yang didalamnya juga terdapat data User.

Oleh karena itu, User di HomeController diambil dari constructor ini. Alasannya, karena tidak ada kebutuhan pengolahan data. (Sebenarnya ini __**bad practice**__)