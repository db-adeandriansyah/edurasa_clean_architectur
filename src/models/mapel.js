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
    "BSUND":"Bahasa dan Sastra Sunda"
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
    "BSUND":"Bahasa dan Sastra Sunda"
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
    return mapelKurtilas
}
const mapelkdcp_kurikulum={
    'kurtilas':KodeMapelKurtilas,
    'kurmer':KodeMapelKumer,
    'mapelkurmertinggi':MapelKurmerTinggi,
    'mapelkurmerrendah':MapelKurmerRendah,
    'mapelkurtilastinggi':MapelKurtilasTinggi,
    'mapelkurtilasrendah':MapelKurtilasRendah
};

export default mapelkdcp_kurikulum;
