const KodeMapelKumer = {
    "PAI":"Pendidikan Agama Islam dan Budi Pekerti",
    "PKRIS":"Pendidikan Agama Kristen dan Budi Pekerti",
    "PKATO":"Pendidikan Agama Katholik dan Budi Pekerti",
    "PKN":"Pendidikan Pancasila",
    "BINDO":"Bahasa Indonesia",
    "MTK":"Matematika",
    "IPAS":"Ilmu Pengetahuan Alam dan Sosial",
    "RUPA":"Seni Rupa",
    // "TARI":"Seni Tari",
    "PJOK":"Pendidikan Jasmani, Olahraga, dan Kesehatan",
    "BSUND":"Bahasa dan Sastra Sunda",
    "BING"  :"Bahasa Inggris"
}
const KodeMapelKumer12 = {
    "PAI":"Pendidikan Agama Islam dan Budi Pekerti",
    "PKRIS":"Pendidikan Agama Kristen dan Budi Pekerti",
    "PKATO":"Pendidikan Agama Katholik dan Budi Pekerti",
    "PKN":"Pendidikan Pancasila",
    "BINDO":"Bahasa Indonesia",
    "MTK":"Matematika",
    // "IPAS":"Ilmu Pengetahuan Alam dan Sosial",
    "RUPA":"Seni Rupa",
    // "TARI":"Seni Tari",
    "PJOK":"Pendidikan Jasmani, Olahraga, dan Kesehatan",
    "BSUND":"Bahasa dan Sastra Sunda",
    // "BING"  :"Bahasa Inggris"
}
const KodeMapelKumer3 = {
    "PAI":"Pendidikan Agama Islam dan Budi Pekerti",
    "PKRIS":"Pendidikan Agama Kristen dan Budi Pekerti",
    "PKATO":"Pendidikan Agama Katholik dan Budi Pekerti",
    "PKN":"Pendidikan Pancasila",
    "BINDO":"Bahasa Indonesia",
    "MTK":"Matematika",
    "IPAS":"Ilmu Pengetahuan Alam dan Sosial",
    "RUPA":"Seni Rupa",
    // "TARI":"Seni Tari",
    "PJOK":"Pendidikan Jasmani, Olahraga, dan Kesehatan",
    "BSUND":"Bahasa dan Sastra Sunda",
    // "BING"  :"Bahasa Inggris"
}
const KodeMapelKumer46 = {
    "PAI":"Pendidikan Agama Islam dan Budi Pekerti",
    "PKRIS":"Pendidikan Agama Kristen dan Budi Pekerti",
    "PKATO":"Pendidikan Agama Katholik dan Budi Pekerti",
    "PKN":"Pendidikan Pancasila",
    "BINDO":"Bahasa Indonesia",
    "MTK":"Matematika",
    "IPAS":"Ilmu Pengetahuan Alam dan Sosial",
    "RUPA":"Seni Rupa",
    // "TARI":"Seni Tari",
    "PJOK":"Pendidikan Jasmani, Olahraga, dan Kesehatan",
    "BSUND":"Bahasa dan Sastra Sunda",
    "BING"  :"Bahasa Inggris"
}
const KodeMapelKurtilas = {
    "PAI":"Pendidikan Agama Islam dan Budi Pekerti",
    "PKRIS":"Pendidikan Agama Kristen dan Budi Pekerti",
    "PKATO":"Pendidikan Agama Khatolik dan Budi Pekerti",
    "PKN":"Pendidikan Pancasila dan Kewarganegaraan",
    "BINDO":"Bahasa Indonesia",
    "MTK":"Matematika",
    "IPA":"Ilmu Pengetahuan Alam",
    "IPS":"Ilmu Pengetahuan Sosial",
    "SBDP":"Seni Budaya dan Prakarya",
    "PJOK":"Pendidikan Jasmani, Olahraga, dan Kesehatan",
    "BSUND":"Bahasa dan Sastra Sunda",
    "BING"  :"Bahasa Inggris"
}
const MapelKurtilasRendah =()=>{
    let mapelKurtilas = Object.assign({},KodeMapelKurtilas);
    delete mapelKurtilas.IPA;
    delete mapelKurtilas.IPS;
    return mapelKurtilas
}

const MapelKurtilasTinggi =()=>{
    return  Object.assign({},KodeMapelKurtilas);
}
const MapelKurmerTinggi =()=>{
    return Object.assign({},KodeMapelKumer);
    
}
const MapelKurmerRendah =()=>{
    let mapelKurtilas = Object.assign({},KodeMapelKumer);
    delete mapelKurtilas.IPAS;
    
    delete mapelKurtilas.BING;
    return mapelKurtilas
}
const mapelkdcp_kurikulum={
    'kurtilas':KodeMapelKurtilas,
    'kurmer':KodeMapelKumer,
    'mapelkurmertinggi':MapelKurmerTinggi,
    'mapelkurmerrendah':MapelKurmerRendah,
    'mapelkurtilastinggi':MapelKurtilasTinggi,
    'mapelkurtilasrendah':MapelKurtilasRendah,
    '1':KodeMapelKumer12,
    '2':KodeMapelKumer12,
    '3':KodeMapelKumer3,
    '4':KodeMapelKumer46,
    '5':KodeMapelKumer46,
    '6':KodeMapelKumer46,
    'kelas1':KodeMapelKumer12,
    'kelas2':KodeMapelKumer12,
    'kelas3':KodeMapelKumer3,
    'kelas4':KodeMapelKumer46,
    'kelas5':KodeMapelKumer46,
    'kelas6':KodeMapelKumer46,

};

export default mapelkdcp_kurikulum;
