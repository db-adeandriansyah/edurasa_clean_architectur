export class myArray{
    constructor(array=[]){
        this.array = array;
    }
    static arrayBulan(bulanAwal, bulanAkhir){
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
    uniqueArray(){
        return this.array.filter((x,i,a)=>a.indexOf(x)==i);
    }
    static filterDataByDate(targetDate,data) {
        const filteredData = data.filter(item => {
        const startDate = new Date(item.start_tgl).getTime();
        const endDate = new Date(item.end_tgl).getTime();
        const target = new Date(targetDate).getTime();
    
        return target >= startDate && target <= endDate;
        });
      
        return filteredData;
    }
    static uniqueArrayObject(arr, keyProps) {
        const kvArray = arr.map(entry => {
        const key = keyProps.map(k => entry[k]).join('|');
            return [key, entry];
        });
        
        const map = new Map(kvArray);
        return Array.from(map.values());
    }
    filterDataByBetweenDate(startDate, endDate) {
        const filteredData = this.array.filter(item => {
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
    arrayObjectFromArrayMultidimensi(){
        const header = this.array[0];
        let result = [];
        for(let i = 1 ; i < this.array.length ; i++){
            let arr = this.array[i];
            let obj = {};
            header.forEach((t,index)=>{
                obj[t] = arr[index];
            })
            result.push(obj);
        }
        return result;
    }
    koleksiMapelKD(){
        let tahap1 = this.array.map(n=> n.mapel);
        let uniktahap1 = tahap1.filter((x,i,a)=>a.indexOf(x)==i);
        let nArray = [];
        uniktahap1.forEach(mapel=>{
            let kd3 = this.array.filter(m=>m.mapel == mapel && m.indikatorkd3 !=="");
            let obj = {};
            obj.mapel = mapel;
            obj.kd3= kd3.map(k=> k.kd3);
            obj.tekKd3=kd3.map(k=>k.indikatorkd3);
            obj.tekKd4=kd3.map(k=>k.indikatorkd4);
            obj.teksKd3=kd3.map(k=>k.kd3+'. '+k.indikatorkd3);
            obj.kd4= kd3.map(k=> k.kd4);
            obj.teksKd4=kd3.map(k=>k.kd4+'. '+k.indikatorkd4);
            obj.kkm = kd3.length==0?0:kd3[0].kkm;//[0].kkm;
            nArray.push(obj);
        })
        return nArray;

    }
    koleksiElemenCPATP(){
        let tahap1 = this.array.map(n=> n.mapel);
        let uniktahap1 = tahap1.filter((x,i,a)=>a.indexOf(x)==i);
        let nArray = [];
        uniktahap1.forEach(mapel=>{
            let kd3 = this.array.filter(m=>m.mapel == mapel);
            let obj = {};
            obj.mapel = mapel;

            obj.kd3= kd3.map(k=> k.kd3);
            obj.tekKd3=kd3.map(k=>k.indikatorkd3);
            obj.teksKd3=kd3.map(k=>k.kd3+'. '+k.indikatorkd3);
            // obj.tekKd4=kd3.map(k=>k.indikatorkd4);
            // obj.kd4= kd3.map(k=> k.kd4);
            // obj.teksKd4=kd3.map(k=>k.kd4+'. '+k.indikatorkd4);
            // obj.kkm = kd3.length==0?0:kd3[0].kkm;//[0].kkm;
            nArray.push(obj);
        });
        return nArray;

    }
    koleksiKDbyParam(keyUniq, keyArray){
        let tahap1 = this.array.map(n=> n[keyUniq]);
        let uniktahap1 = tahap1.filter((x,i,a)=>a.indexOf(x)==i);
        let nArray = [];
        uniktahap1.forEach(mapel=>{
            let findKey = this.array.filter(m=>m[keyUniq] == mapel);
            let obj = {};
            obj.mapel = mapel;
            obj.kd= findKey.map(k=> k[keyArray]);
            nArray.push(obj);
        })
        return nArray;

    }
    selectProperties(properties) {
        const newData = this.array.map((item) => {
          return properties.reduce((selectedItem, prop) => {
            selectedItem[prop] = item[prop];
            return selectedItem;
            }, {});
        });
        return newData;
    }
}