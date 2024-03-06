function garagaraTainted (src,Tainting, notTainting){
    var tmpCanvas=document.createElement("canvas");
    var tmpCtx=tmpCanvas.getContext("2d");
    // tmpCanvas just tests CORS, so make it 1x1px
    
    //tmpCanvas.width=tmpCanvas.height=1;
    // let imgd = {}
    var img=new Image();
    // set the cross origin flag (and cross our fingers!)
    img.crossOrigin="anonymous";
    img.onload=  function(){
        // add a tainted property to the image 
        // (initialize it to true--is tainted)
        img.tainted=true;
        // imgd.tainted=true;
        // draw the img on the temp canvas
        tmpCtx.drawImage(img,0,0);
        // just in case this onload stops on a CORS error...
        // set a timer to call afterOnLoad shortly
        
           afterOnLoad(img, Tainting, notTainting);
        // you can probably use less than 1000ms
        // try to violate CORS
        var i=tmpCtx.getImageData(1,1,1,1);
        // if we get here, CORS is OK so set tainted=false
        
        // imgd.uri = tmpCanvas.toDataURL("image/png");//.replace("image/png", "image/octet-stream");;
        img.uri = tmpCanvas.toDataURL("image/png");//.replace("image/png", "image/octet-stream");;
        
        img.tainted=false;
        
    };
    img.src=src;
    
    if(img.complete){
        // console.log(img);
        // return (img);
        return img;
    }
}
// function afterOnLoad(imgd, tainting, ga){
function afterOnLoad(imgd){
    let ar = {};
    ar.tainted = imgd.tainted;
    ar.objekok = {}
    if(imgd.tainted){
        ar.src = imgd.src;
    }else{
        ar.src = imgd.src
        var uri = imgd.uri;
        ar.objekok = uri
    }
   return ar;
}
//https://github.com/markswindoll/jQuery-Word-Export/blob/master/jquery.wordexport.js
export const print2WordGlobal = (element, Filename,orientation='portrait')=>{
    
    let staticFormat = {
        mhtml: {
            top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
            head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style type=\"text/css\"><!--\n_styles_\n --></style>\n\ntambah</head>\n",
            body: "<body><div class='Section1'>_body_</div></body>"
        }
    };

    if(orientation == 'landscape'){
        staticFormat.mhtml.body= "<body><div class='Section2'> _body_ </div></body>"
    }
    let options = {
        maxWidth: 624
    };

    let markup = element.cloneNode(true);

    if(markup.querySelector(".sticky-md-bottom")) markup.querySelector(".sticky-md-bottom").remove();
     let allDoms = markup.querySelectorAll(".row");
    for(let i = 0 ; i < allDoms.length ; i++){
        let html = `<table style="width:100%"><tbody><tr>`
        let ch = allDoms[i].children;
        for(let j= 0 ; j <ch.length ; j++){
            html+=`<td style="padding:8px;vertical-align:top;border:0;">${ch[j].innerHTML}</td>`
        }
        html+=`</tr></tbody></table>`
        allDoms[i].innerHTML = html;
    }
    
    // Embed all images using Data URLs
    var images = Array();
    var img = markup.querySelectorAll("img");
    let lg 
    for (var i = 0; i < img.length; i++) {
        // Calculate dimensions of output image
        let lebargambar = img[i].hasAttribute('style')?parseInt(img[i].style.width):img[i].width;
        let w = Math.min(lebargambar, options.maxWidth);
        let h = Math.min(img[i].hasAttribute('style')?parseInt(img[i].style.height):img[i].height,img[i].height);

        // Create canvas for converting image to data URL;
        var canvas = document.createElement("CANVAS");
        canvas.width = w;
        canvas.height = h;
        // Draw image to canvas
        var context = canvas.getContext('2d');
        context.drawImage(img[i], 0, 0, w, h);

        img[i].setAttribute('src',img[i].src);
        img[i].setAttribute('width',w);
        img[i].setAttribute('height',h);

        // let cekuri = garagaraTainted(img[i].src, "Tainting", "notTainting");
        // var uri = cekuri.uri;//canvas.toDataURL("image/png");
        // // Save encoded image to array
        // images[i] = {
        //     type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
        //     encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
        //     location: img[i].getAttribute("src"),
        //     data: uri.substring(uri.indexOf(",") + 1)
        // };
        
    }

    // Prepare bottom of mhtml file with image data
    let mhtmlBottom = "\n";
    for (let i = 0; i < images.length; i++) {
        mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
        mhtmlBottom += "Content-Location: " + images[i].location + "\n";
        mhtmlBottom += "Content-Type: " + images[i].type + "\n";
        mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
        mhtmlBottom += images[i].data + "\n\n";
    }
    mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";

    //TODO: load css from included stylesheet
    let styles = "";
    let linklink = "";
    const allCss =  document.styleSheets;
    for(let i = 0 ; i < allCss.length ; i++){
       
            let lnk = allCss[i].href;
            
            linklink+=`<link href="${lnk}" rel="stylesheet">`
            let styleR = null;
            
            if(lnk.indexOf('cloudflare')==-1 && lnk.indexOf('fonts.googleapis.com')==-1){
                
                let d = allCss[i].cssRules;
                let f = allCss[i].rules;
                styleR = d||f;
                let css = "";
                for(let itm in styleR){
                    
                    if(styleR[itm].cssText != undefined)
                        css += (styleR[itm].cssText)+"\r\n";
                        
                        
                }
                
                styles+=css;//`${css}table{border-collapse:collapse;border-spacing:0;}th,td{padding:4px 5px}body{font-family:'timesNewRoman'}ol{style="margin:0 0 0 -1.5em!important;padding-left:1.3em;"} ol li{padding-left:0.7em!important;mso-pdding-left:0.7cm;mso-margin-bottom:.8em}p{margin-bottom:0!important;line-height:normal}`;
                // styles+=`${css}table{border-collapse:collapse;border-spacing:0;}th,td{padding:4px 5px}body{font-family:'timesNewRoman'}ol{style="margin:0 0 0 -1.5em!important;padding-left:1.3em;"} ol li{padding-left:0.7em!important;mso-pdding-left:0.7cm;mso-margin-bottom:.8em}p{margin-bottom:0!important;line-height:normal}`;

            }
        }
        
    //generate css from document
    styles+=`
    @page Section1 {size:595.45pt 841.7pt; margin:1.27cm 1.27cm 1.27cm 1.27cm;mso-header-margin:1cm;mso-footer-margin:1cm;mso-paper-source:0;}
        div.Section1 {page:Section1;}
        @page Section2 {size:841.7pt 595.45pt;mso-page-orientation:landscape;margin:1.27cm 1.27cm 1.27cm 1.27cm;mso-header-margin:1cm;mso-footer-margin:1cm;mso-paper-source:0;}
        div.Section2 {page:Section2;}

    `;
    // const allCss =  document.styleSheets;
    // for(let i = 0 ; i < allCss.length ; i++){
            
    //         let lnk = allCss[i].href;
            
    //         let styleR = null;
            
    //         if(lnk.indexOf('cloudflare')==-1 && lnk.indexOf('fonts.googleapis.com')==-1){
                
    //             let d = allCss[i].cssRules;
    //             let f = allCss[i].rules;
    //             styleR = d;//||f;
    //             let css = "";
    //             for(let itm in styleR){
                    
    //                 // console.log(styleR[itm].cssText);
    //                 if(styleR[itm].cssText != undefined)
    //                     css += (styleR[itm].cssText)+"\r\n";
                        
                        
    //             }
                
    //             styles+=`${css}\r\n table{border-collapse:collapse;border-spacing:0;}\r\n th,td{padding:4px 5px}\r\nbody{font-family:'timesNewRoman'}`;
    //             // styles+=`${css}\r\n table{border-collapse:collapse;border-spacing:0;}\r\n th,td{padding:4px 5px}\r\nbody{font-family:'timesNewRoman'}`;

    //         }
    //     }
    
    // // Aggregate parts of the file together


    let fileContent = staticFormat.mhtml.top.replace(
        "_html_", 
        staticFormat.mhtml.head.replace("_styles_", styles).replace('tambah',linklink) + 
        staticFormat.mhtml.body.replace("_body_", 
        markup.innerHTML 
        ))
         + mhtmlBottom;
    
    // Create a Blob with the file contents
    let blob = new Blob([fileContent], {
        type: "application/msword;charset=utf-8"
    });
    window.URL = window.URL || window.webkitURL;
    var url = window.URL.createObjectURL(blob);
   
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, Filename); // IE10-11
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = Filename;
        
        //triggering the function
        downloadLink.click();
    }

    document.body.removeChild(downloadLink);
}
function injextHead(head){
    // this.createLinkBootstrap();
    // this.createLinkFA
    let html = "";
    const allCss =  document.styleSheets;
    const linkCont = head.querySelectorAll('link');
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