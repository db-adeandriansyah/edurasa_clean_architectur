export class FormatTanggal extends Date{
    /**
     * 
     * @returns Senin, 21 Maret 2021
     */
    formatFull(){
        return this.toLocaleString('id-ID',{'dateStyle':'full'});
    }
    /**
     * 
     * @returns 21/03/21
     */
    formatShort(){
        return this.toLocaleString('id-ID',{'dateStyle':'short'});
    }
    /** Return */
    timeFull(){
        return this.toLocaleString('id-ID',{'timeStyle':'full'});
    }
    
    /** Return */
    timeShort(){
        return this.toLocaleString('id-ID',{'timeStyle':'short'});
    }
    
    /** Return */
    timeMedium(){
        return this.toLocaleString('id-ID',{'timeStyle':'medium'});
    }
    /** Return */
    timeLong(){
        return this.toLocaleString('id-ID',{'timeStyle':'long'});
    }
    valueInputDate(){
        let y = this.getFullYear();
        let m = String(this.getMonth()+1).padStart(2,'0');
        let d = String(this.getDate()).padStart(2,'0');
        return `${y}-${m}-${d}`
    }
    stringForDateTimeLocal(){
        let yyyy = this.getFullYear();
        // let mmmm =this.getMonth() + 1;
        let MM = String(this.getMonth()+1).padStart(2,'0');;//addZero(mmmm);
        let dd = String(this.getDate()).padStart(2,'0');//addZero(n.getDate());
        let hh = String(this.getHours()).padStart(2,'0');//addZero(n.getHours());
        let mm = String(this.getMinutes()).padStart(2,'0');//addZero(n.getMinutes())
        let ss = String(this.getSeconds()).padStart(2,'0');//addZero(n.getSeconds())
        let teks = yyyy + "-" + MM + "-" + dd + "T" + hh + ":" + mm + ":" + ss
        return teks
    }
    /**
     * 
     * @returns 21 Mar 2021
     */
    formatMedium(){
        return this.toLocaleString('id-ID',{'dateStyle':'medium'});
    }
    
    formatLong(){
        return this.toLocaleString('id-ID',{'dateStyle':'long'});

    }

    /**
     * 
     * @returns Maret
     */
    MMMM(){
        return this.toLocaleString('id-ID',{'month':'long'});
    }
    
    /**
     * 
     * @returns Maret--> Mar
     */
    MM(){
        return this.toLocaleString('id-ID',{'month':'short'});
    }
    

    /**
     * 
     * @returns 2023 --> 23
     */
    YY(){
        return this.toLocaleString('id-ID',{'year':'2-digit'});
    }
    /**
     * 
     * @returns 2023 --> 23
     */
    YYYY(){
        return this.toLocaleString('id-ID',{'year':'numeric'});
    }
    
    /**
     * 
     * @returns 21 Maret 2021
     */
    formatLong(){
        return this.toLocaleString('id-ID',{'dateStyle':'long'});
    }
    isDate(){
        return this instanceof Date && !isNaN(this);
    }
    indexBulanSemester2(){
        return [0,1,2,3,4,5]
    }
    indexBulanSemester1(){
        return [6,7,8,9,10,11]
    }
    semesterSekarang(){
        if(this.indexBulanSemester1.includes(this.getMonth())){
            return 1;
        }else{
            return 2;
        }
    }
    get semesterSekarang(){
        if(this.indexBulanSemester1().includes(this.getMonth())){
            return 1;
        }else{
            return 2;
        }
    }
    DaysInMonth(Y, M) {
        return new Date(Y, M, 0).getDate();
    }
    lastTgl(){
        let y= this.YYYY();
        let m = this.getMonth()+1;
        return new Date(y,m,0).getDate()
    }
    firstTgl(){
        let y = this.YYYY();
        let m = this.getMonth();
        return new Date(y,m,1);
    }
    datediff(date1, date2) {
        var y1 = date1.getFullYear(), m1 = date1.getMonth(), d1 = date1.getDate(),
            y2 = date2.getFullYear(), m2 = date2.getMonth(), d2 = date2.getDate();

        if (d1 < d2) {
            m1--;
            d1 += this.DaysInMonth(y2, m2);
        }
        if (m1 < m2) {
            y1--;
            m1 += 12;
        }
        return [y1 - y2, m1 - m2, d1 - d2];
    }

    umur() {
        
        let patokan = new Date();
        var curday = patokan.getDate();
        var curmon = patokan.getMonth();
        var curyear = patokan.getFullYear();
        let objret = {};
        if(this.isDate()){
            
            var calday = this.getDate();
            var calmon = this.getMonth();
            var calyear = this.getFullYear();
            var curd = new Date(curyear, curmon, curday);
            var cald = new Date(calyear, calmon, calday);
            var dife = this.datediff(curd, cald);
            objret.tahun = dife[0];
            objret.bulan = dife[1];
            objret.hari = dife[2];
        }else{
            objret.tahun = 0
            objret.bulan = 0
            objret.hari = 0
        }
        return objret;
    }
    
    countDaysInMonth(){
        let firstDay = "";
    }
    stringYYYYMMDD(){
        let y = this.getFullYear();
        let m = String(this.getMonth()+1).toString().padStart(2,'0');
        let d = String(this.getDate()).toString().padStart(2,'0')
        return `${y}${m}${d}`;
    }
    static arrayBulan (bulanAwal, bulanAkhir){
        const startDate = new Date(bulanAwal);
        const endDate = new Date(bulanAkhir);
        
        const monthArray = [];
        
        let currentDate = startDate;
        
        while (currentDate <= endDate) {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            
            monthArray.push(`${year}-${month.toString().padStart(2, '0')}-01`);
            
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
        return monthArray;
    }
    idStringAbsen(){
        // let tgl = new Date();
        // let dtgl = this.getDate();
        // let mtgl = tgl.getMonth() + 1;
        // let nol = addZero(mtgl);
        // let ytg = tgl.getFullYear();

        // let idHariini = dtgl + "" + nol + "" + ytg;
        let d = this.getDate();
        let m = (this.getMonth()+1).toString().padStart(2,'0');
        let y = this.getFullYear();
        return d+""+m+""+y;
    }
    
    idStringAbsenBulan(){
        // let tgl = new Date();
        // let dtgl = this.getDate();
        // let mtgl = tgl.getMonth() + 1;
        // let nol = addZero(mtgl);
        // let ytg = tgl.getFullYear();

        // let idHariini = dtgl + "" + nol + "" + ytg;
        let d = this.getDate();
        let m = this.getMonth()+1;
        let y = this.getFullYear();
        return y+'-'+m+'-'+d
    }
    getRemainingTime(targetDate) {
        const now = new Date();
        const timeDifference = targetDate.getTime() - now.getTime();

        if (timeDifference <= 0) {
            return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            };
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return {
            days,
            hours,
            minutes,
            seconds,
        };
    }

    startCountdown(targetDate, callback) {
        const updateTimer = () => {
            const remainingTime = this.getRemainingTime(targetDate);

            if (remainingTime.days === 0 && remainingTime.hours === 0 && remainingTime.minutes === 0 && remainingTime.seconds === 0) {
            clearInterval(interval);
            }

            callback(remainingTime);
        };

        const interval = setInterval(updateTimer, 1000);
        updateTimer();
    }
    static durasi(tanggalAwal, tanggalAkhir){
        
            const awal = new Date(tanggalAwal).getTime();
            const akhir = new Date(tanggalAkhir).getTime();
            
            const satuHari = 1000 * 60 ; // Satu menit
            const selisihWaktu = akhir - awal;
            
            const durasiHari = Math.ceil(selisihWaktu / satuHari)+1; // Menggunakan Math.ceil untuk memastikan pembulatan ke atas
            
            return durasiHari;
        
    }
}
export const durasiMenit=(tanggalAwal, tanggalAkhir)=>{
        
    const awal = new Date(tanggalAwal).getTime();
    const akhir = new Date(tanggalAkhir).getTime();
    
    const satuHari = 1000 * 60 ; // Satu menit
    const selisihWaktu = akhir - awal;
    
    const durasiHari = Math.ceil(selisihWaktu / satuHari); // Menggunakan Math.ceil untuk memastikan pembulatan ke atas
    
    return durasiHari;

}
/**
 * penggunaan countDown dari script Chat GPT:
// Contoh penggunaan CountdownTimer
---------------------------------------------------------------------
const targetDate = new Date('2023-12-31T23:59:59'); // Tanggal target countdown
const countdown = new CountdownTimer();

==============================================================
---------- jika targetDate benar-benar valid -----------------
countdown.startCountdown(targetDate, (remainingTime) => {
    console.log(`Sisa waktu: ${remainingTime.days} hari, ${remainingTime.hours} jam, ${remainingTime.minutes} menit, ${remainingTime.seconds} detik`);
});
-------------------------------------------------------------

==============================================================
---------- handler jika targetDate tidak dapat diprediksi kevalidannya------------
if (targetDate && targetDate instanceof Date && !isNaN(targetDate.getTime())) {
  // Jalankan countdown dengan targetDate yang valid
    countdown.startCountdown(targetDate, (remainingTime) => {
    console.log(`Sisa waktu: ${remainingTime.days} hari, ${remainingTime.hours} jam, ${remainingTime.minutes} menit, ${remainingTime.seconds} detik`);
    });
} else {
    console.log("Tanggal target tidak valid. Countdown tidak dapat dimulai.");
}
-----------------------------------------------------------------
 */

export const DaysInMonth = (Y, M) =>{
    return new Date(Y, M, 0).getDate();
};
function filterDataByDate(targetDate,data) {
    const filteredData = data.filter(item => {
    const startDate = new Date(item.start_tgl).getTime();
    const endDate = new Date(item.end_tgl).getTime();
    const target = new Date(targetDate).getTime();

    return target >= startDate && target <= endDate;
    });
  
    return filteredData;
}
function filterDataByBetweenDate(startDate, endDate, data) {
    const filteredData = data.filter(item => {
        const itemStartDate = new Date(item.start_tgl).getTime();
        const itemEndDate = new Date(item.end_tgl).getTime();
        const startTimestamp = new Date(startDate).getTime();
        const endTimestamp = new Date(endDate).getTime();
    
        return (startTimestamp >= itemStartDate && startTimestamp <= itemEndDate) ||
            (endTimestamp >= itemStartDate && endTimestamp <= itemEndDate) ||
            (itemStartDate >= startTimestamp && itemStartDate <= endTimestamp) ||
            (itemEndDate >= startTimestamp && itemEndDate <= endTimestamp);
    });
    
    return filteredData;
}
export const countDaysInMonth = (strDate, dayIndex,data=[]) =>{
    
    let D = new Date(strDate);
    let d = D.getDate();
    let M = D.getMonth();
    let Y = D.getFullYear();
    let firstDate = new Date(Y, M, 1);
    let hr = firstDate.toLocaleDateString('id-ID',{dateStyle:'full'});
    let firstDay = firstDate.getDay();
    let lastDate  =DaysInMonth(Y,(M+1))
    let shift = (dayIndex - firstDay + 7)% 7;
    
    let occurrences = Math.ceil((lastDate - shift) / 7);// + 1;
    
    let excludedDays = 0;
    let datas = data.filter(s=>(new Date(s.start_tgl).getMonth()==M && new Date(s.start_tgl).getFullYear() == Y) || (new Date(s.end_tgl).getMonth()==M && new Date(s.end_tgl).getFullYear() == Y))
                .sort((a,b)=>new Date(a.start_tgl).getTime() - new Date(b.start_tgl).getTime());
    
    for(const excludeRange of datas){
        let startDate = new Date(excludeRange.start_tgl);
        let endDate = new Date(excludeRange.end_tgl);
        let currentDate = startDate;
        while(currentDate <= endDate){
            if(Array.isArray(dayIndex)){
                if(dayIndex.includes(currentDate.getDay()) && excludeRange.libur){
                    excludedDays++
                }
            }else{
                if(currentDate.getDay()==dayIndex && excludeRange.libur){
                    excludedDays++
                }
            }
                
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
    let changeOccureances = [];
    if(Array.isArray(dayIndex)){
        dayIndex.forEach(el=>{
            let d = (el - firstDay + 7)% 7;
            let e = Math.ceil((lastDate - d) / 7);// + 1;
            changeOccureances.push(e);
        })
        
        occurrences = (changeOccureances.reduce((a,b)=>a+b));
    }
    
    const occurrencesAfterExclusion = occurrences - excludedDays;

    return occurrencesAfterExclusion;
    
}
export const countDaysHebInMonth = (strDate, dayIndex,data=[]) =>{
    
    let D = new Date(strDate);
    let d = D.getDate();
    let M = D.getMonth();
    let Y = D.getFullYear();
    let firstDate = new Date(Y, M, 1);
    let firstDay = firstDate.getDay();
    let lastDate  = DaysInMonth(Y,(M+1));
    let shift = (dayIndex - firstDay + 7)% 7;
    
    let occurrences = Math.ceil((lastDate - shift) / 7);// + 1;
    
    let excludedDays = 0;
    let datas = data.filter(s=>(new Date(s.start_tgl).getMonth()==M && new Date(s.start_tgl).getFullYear() == Y) || (new Date(s.end_tgl).getMonth()==M && new Date(s.end_tgl).getFullYear() == Y))
                .sort((a,b)=>new Date(a.start_tgl).getTime() - new Date(b.start_tgl).getTime());
    
    for(const excludeRange of datas){
        let startDate = new Date(excludeRange.start_tgl);
        let endDate = new Date(excludeRange.end_tgl);
        let currentDate = startDate;
        while(currentDate <= endDate){
            if(Array.isArray(dayIndex)){
                if(dayIndex.includes(currentDate.getDay()) && !excludeRange.heb) {
                    excludedDays++;
                }
            }else{
                if(currentDate.getDay()==dayIndex) {
                    if(!excludeRange.heb){
                        excludedDays++;

                    }
                }
            }
                
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
    let changeOccureances = [];
    if(Array.isArray(dayIndex)){
        dayIndex.forEach(el=>{
            let d = (el - firstDay + 7)% 7;
            let e = Math.ceil((lastDate - d) / 7);// + 1;
            changeOccureances.push(e);
        })
        
        occurrences = (changeOccureances.reduce((a,b)=>a+b));
    }
    
    const occurrencesAfterExclusion = occurrences - excludedDays;

    return occurrencesAfterExclusion;
    
}

export const datediff =(date1, date2) =>{
    var y1 = date1.getFullYear(), m1 = date1.getMonth(), d1 = date1.getDate(),
        y2 = date2.getFullYear(), m2 = date2.getMonth(), d2 = date2.getDate();

    if (d1 < d2) {
        m1--;
        d1 += DaysInMonth(y2, m2);
    };
    if (m1 < m2) {
        y1--;
        m1 += 12;
    }
    return [y1 - y2, m1 - m2, d1 - d2];
};

export const umur = (tgllahir,string="") =>{

    let patokan;
    if(string==""){
        patokan = new Date()
    }else{
        patokan = new Date(string);//new Date("2022-07-01");
    }
    var curday = patokan.getDate();
    var curmon = patokan.getMonth();
    var curyear = patokan.getFullYear();

    var calday = new Date(tgllahir).getDate();
    var calmon = new Date(tgllahir).getMonth();
    var calyear = new Date(tgllahir).getFullYear();
    var curd = new Date(curyear, curmon, curday);
    var cald = new Date(calyear, calmon, calday);
    var dife = datediff(curd, cald);
    let objret = {};
    objret.tahun = dife[0];
    objret.bulan = dife[1];
    objret.hari = dife[2];
    return objret
};

export const durasiHari=(tanggalAwal, tanggalAkhir)=>{
    const awal = new Date(tanggalAwal).getTime();
    const akhir = new Date(tanggalAkhir).getTime();
    
    const satuHari = 1000 * 60 * 60 * 24; // Satu hari dalam milidetik
    const selisihWaktu = akhir - awal;
    
    const durasiHari = Math.ceil(selisihWaktu / satuHari)+1; // Menggunakan Math.ceil untuk memastikan pembulatan ke atas
    
    return durasiHari;
}

export const countsDayIndex = (month=new Date(), dayIndex) =>{
    let D = new Date(month);
    let d = D.getDate();
    let M = D.getMonth();
    let Y = D.getFullYear();
    let firstDate = new Date(Y, M, 1);
    let firstDay = firstDate.getDay();
    let lastDate  =DaysInMonth(Y,(M+1))
    let shift = (dayIndex - firstDay + 7)% 7;
    let occurrences = Math.ceil((lastDate - shift) / 7);
    let changeOccureances = [];
    if(Array.isArray(dayIndex)){
        dayIndex.forEach(el=>{
            let d = (el - firstDay + 7)% 7;
            let e = Math.ceil((lastDate - d) / 7);// + 1;
            changeOccureances.push(e);
        })
        
        occurrences = (changeOccureances.reduce((a,b)=>a+b));
    }
    return occurrences;
}

export const hariEfektif = (month,dayIndex,data=[])=>{
    
    let countDay = countsDayIndex(month, dayIndex);
    let M = new Date(month).getMonth();
    let Y = new Date(month).getFullYear();
    let filtering = data.filter(s=>{
        return (new Date(s.start_tgl).getMonth() == M && new Date(s.start_tgl).getFullYear() == Y) ||
                (new Date(s.end_tgl).getMonth() == M && new Date(s.end_tgl).getFullYear() == Y);
    }).sort((a,b)=>new Date(a.start_tgl).getTime() - new Date(b.start_tgl).getTime());

    let daysAnalis = [];
    for(const excludeRange of filtering){
        let startDate = new Date(excludeRange.start_tgl);
        let endDate = new Date(excludeRange.end_tgl);
        let currentDate = startDate;
        while(currentDate <= endDate){
            if(Array.isArray(dayIndex)){
                if(dayIndex.includes(currentDate.getDay())){
                    let cek = filterDataByDate(new Date(currentDate),filtering);
                    let obj={};
                    obj.tgl = currentDate.getDate();
                    obj.someLibur = cek.map(n=>n.libur).some(n=> n==true);
                    daysAnalis.push(obj);
                }
            }else if(currentDate.getDay()==dayIndex){
                let cek = filterDataByDate(new Date(currentDate),filtering);
                let obj={};
                obj.tgl = currentDate.getDate();
                obj.someLibur = cek.map(n=>n.libur).some(n=> n==true);
                daysAnalis.push(obj);
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
    
    let uniq = daysAnalis.reduce((uniqueArray, currentObj) => (uniqueArray.find(obj => obj.tgl === currentObj.tgl) ? uniqueArray : [...uniqueArray, currentObj]), []);
    let pengurang = uniq.filter(n=> n.someLibur==true).length;;

    return (countDay-pengurang);//{count: countDay, pengurang:pengurang, total:(countDay-pengurang),uniqueFilter:uniq,filter: daysAnalis};
}
export const hariEfektifBelajar = (month,dayIndex,data=[])=>{
    
    let countDay = countsDayIndex(month, dayIndex);
    let M = new Date(month).getMonth();
    let Y = new Date(month).getFullYear();
    let filtering = data.filter(s=>{
        return (new Date(s.start_tgl).getMonth() == M && new Date(s.start_tgl).getFullYear() == Y) ||
                (new Date(s.end_tgl).getMonth() == M && new Date(s.end_tgl).getFullYear() == Y);
    }).sort((a,b)=>new Date(a.start_tgl).getTime() - new Date(b.start_tgl).getTime());

    let daysAnalis = [];
    for(const excludeRange of filtering){
        let startDate = new Date(excludeRange.start_tgl);
        let endDate = new Date(excludeRange.end_tgl);
        let currentDate = startDate;
        while(currentDate <= endDate){
            if(Array.isArray(dayIndex)){
                if(dayIndex.includes(currentDate.getDay())){
                    let cek = filterDataByDate(new Date(currentDate),filtering);
                    let obj={};
                    obj.tgl = currentDate.getDate();
                    obj.someLibur = cek.map(n=>n.libur).some(n=> n==true);
                    obj.someHeb = cek.map(n=>n.heb==""?false:n.heb).some(n=> n==false);
                    obj.heb = excludeRange.heb==""?false:excludeRange.heb;
                    daysAnalis.push(obj);
                }
            }else if(currentDate.getDay()==dayIndex){
                let cek = filterDataByDate(new Date(currentDate),filtering);
                let obj={};
                obj.tgl = currentDate.getDate();
                obj.someLibur = cek.map(n=>n.libur).some(n=> n==true);
                obj.someHeb = cek.map(n=>n.heb==""?false:n.heb).some(n=> n==false);
                obj.heb = excludeRange.heb==""?false:excludeRange.heb;
                daysAnalis.push(obj);
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
    
    let uniq = daysAnalis.reduce((uniqueArray, currentObj) => (uniqueArray.find(obj => obj.tgl === currentObj.tgl) ? uniqueArray : [...uniqueArray, currentObj]), []);
    let pengurang = uniq.filter(n=> n.someLibur==true||n.someHeb  == true).length;;

    // console.log({count: countDay, pengurang:pengurang, total:(countDay-pengurang),uniqueFilter:uniq,filter: daysAnalis});
    return (countDay-pengurang);
}