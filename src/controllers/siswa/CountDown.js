export default class CountDown{
    constructor(endDate, elementId) {
        this.countDownDate = new Date(endDate).getTime();
        this.elementId = elementId;
        this.interval = null;
        this.warningTime = null; // waktu peringatan dalam milidetik
      }
    
      start() {
        this.interval = setInterval(() => this.update(), 1000);
      }
    
      settingWarning(minutes) {
        this.warningTime = minutes * 60 * 1000; // konversi menit ke milidetik
        return this;
      }
      runtime(func){
        this.function = func;
        this.function(0)
        return this;
      }
      update() {
        const now = new Date().getTime();
        const distance = this.countDownDate - now;
    
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
        const element = this.elementId;//document.getElementById(this.elementId);
        element.innerHTML = `${hours} jam ${minutes} menit ${seconds} detik`;
        
        // Peringatan sebelum habis
        if (this.warningTime && distance <= this.warningTime && distance > 0) {
          // element.innerHTML += ` - Kurang dari ${this.warningTime / (60 * 1000)} menit lagi!`;
          this.function(1)
        }
    
        if (distance < 0) {
          clearInterval(this.interval);
          element.innerHTML = "Waktu Habis";
          this.function(2)
        }
      }
    }
