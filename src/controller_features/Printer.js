export class PrintCetak{
    constructor(){
        this.iframep = document.querySelector('#iframeprint');
        this.windDom = this.iframep.contentDocument || this.iframep.contentWindow.document;
        // this.windDom = document.querySelector('#iframeprint').contentDocument || document.querySelector('#iframeprint').contentWindow.document;
        this.head = this.windDom.head;
        this.body = this.windDom.body;

        // while (this.head.hasChildNodes()) {
        //     this.head.removeChild(this.head.firstChild);
        // }
        this.injextHead();
        this.iframep.focus();
        

    }
    injextHead(){
        // this.createLinkBootstrap();
        // this.createLinkFA
        
        const allCss =  document.styleSheets;
        const linkCont = this.head.querySelectorAll('link');
        if(linkCont.length>allCss.length){
            linkCont[0].remove();
        }
        
        for(let i = 0 ; i < allCss.length ; i++){
                let create = document.createElement('link');
                create.href = allCss[i].href;
                create.type ='text/css';
                create.rel = 'stylesheet';
                this.windDom.head.appendChild(create);
                
        }
        
    }
}