# Repositories
Dalam konsep __Clean Architecture__, Repositories adalah layer yang bertugas untuk memfasilitasi fungsi-fungsi yang berhubungan dengan pemanggilan atau pengiriman data ke database. Menurut PZN (Programmer Zaman Now), repositories adalah file-file yang berisi perintah-perintah ke SQL.

Dari sumber lain menyebutkan Repositories merupakan bagian dari **Interface Adapter** dimamna ia bertugas menghubungkan dengan sumber daya di luar aplikasi. Database adalah bagian luar dari aplikasi yang dihubungkan ke aplikasi kita. Sehingga, Repositories bagian dari Adapter. Begitu kira-kira pemahaman saya mengenai Repositories ini.

# Repostories di Edurasa
Kita akan mengikuti konsep dari PZN dimana repositori adalah file-file yang berhubungan dengan fungsi-fungsi yang berkaitan dengan pemanggilan atau pengiriman data ke "database". Dalam hal ini, "database" adalah **AppScript**.