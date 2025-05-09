export default class VisibilityHandler {
    constructor() {
        this.stateKey = null;
        this.eventKey = null;
        this.keys = {
            hidden: "visibilitychange",
            webkitHidden: "webkitvisibilitychange",
            mozHidden: "mozvisibilitychange",
            msHidden: "msvisibilitychange"
        };
        this.tagPerubahanHidden = 0;

        for (let key in this.keys) {
            if (key in document) {
                this.stateKey = key;
                this.eventKey = this.keys[key];
                break;
            }
        }

        this.init();
    }

    init() {
        document.addEventListener(this.eventKey, () => this.handleVisibilityChange());
        this.handleVisibilityChange(); // Set initial state
    }

    handleVisibilityChange() {
        // document.title = this.isVisible() ? 'e-LAMASO SISWA' : 'Not visible';
        if (this.isVisible() && this.tagPerubahanHidden === 0) {
            
            // Logic when the page becomes visible for the first time
        } else if (this.isVisible() && this.tagPerubahanHidden > 0) {
            alert("Ananda berusaha meninggalkan edurasa, Jawaban yang Ananda isi sebelumnya akan hilang. Hindari membuka tab/aplikasi lain apalagi untuk browsing/googling ya ...");
            window.location.reload();    
            this.tagPerubahanHidden = 0;
            
        } else {
            
            this.tagPerubahanHidden=1;
        }
        
    }

    isVisible() {
        return !document[this.stateKey];
    }
}
