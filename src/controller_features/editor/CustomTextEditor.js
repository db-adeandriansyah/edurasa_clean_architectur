
function debounce(fn, delay = 250) {
    let timer;
    return function(...args) {
        if (timer) {
        clearTimeout(timer);
        }
        timer = setTimeout(() => {
        fn(...args);
        timer = null;
        }, delay);
    };
};

function $(selector, context = document) {
    return context.querySelector(selector);
};

function $all(selector, context = document) {
    return context.querySelectorAll(selector);
};
function stringToDom(string){
    const template= document.createElement('template');
    template.innerHTML = string;
    return template.content;
}
const createElement = (tagName, attributes = {}, ...children) => {
    const node = document.createElement(tagName);

    if (attributes) {
        Object.keys(attributes).forEach(key => {
        if (key === "className") {
            const classes = attributes[key].split(" ");
            classes.forEach(x => node.classList.add(x));
        } else if (/^data-/.test(key)) {
            const dataProp = key
            .slice(5) // removes `data-`
            .split("-")
            .map(
                (str, i) =>
                i === 0
                    ? str
                    : str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
            )
            .join("");
            node.dataset[dataProp] = attributes[key];
        } else {
            node.setAttribute(key, attributes[key]);
        }
    });
    }

    children.forEach(child => {
        if (typeof child === "undefined" || child === null) {
        return;
        }
        if (typeof child === "string") {
        node.appendChild(document.createTextNode(child));
        } else {
        node.appendChild(child);
        }
    });

    return node;
};


export default class CustomTextEditor{
    constructor(argumens){
        
        this._settings={

            ...argumens
        };
        this.costumContextMenu = false;
        this.parentSelectorAsal = argumens.parentSelector;
        this.el={
            dom :$(argumens.parentSelector)
        };
        this.inlineAction = ['bold','underline'];
        this.status ={
            parent:null,
            parentInnerHTML:'',
            index:-1,
            type:null,
            text: '',
            innerHTML :'',

        
        }
        this.resultBody = '';
        this.addOnInput = null;
        this.objekSorotan = {};
        this.CallBackObjekSorotan=null;
        this.ControlObjekSorotan=null;
        this.db = [];
        this.taksonomibloom = [];
        this._exportValueHidden = "PG";
        this.upload = null;
        this.modeToolbar = true;
        this.callSimpanItemSoal=null;
        this.cekKKO = "";
    }
    get exportValueHidden(){
        return this._exportValueHidden;
    }
    set exportValueHidden(v){
        this._exportValueHidden = v;
    }
    get settings (){
        return this._settings;
    }
    set settings (x){
        this._settings = x
    }
    createMenu(framing=true){
        const menus = document.createElement('div');
        //text-nowrap d-flex overflow-y-hidden scrol-h-custom
        menus.setAttribute('class','d-flex mt-2 align-items-stretch bg-secondary-subtle print-hide text-nowrap scrol-h-custom overflow-y-hidden rounded-top');
        let doc = framing?'.contentWindow.document.body':'';
        const formCheckHtml = createElement('div',{
                className:'form-check form-switch font10 mx-1',
                },stringToDom(`<input class="form-check-input" type="checkbox" role="switch" id="checkdesainmagicsoal_${this.settings.id}" 
                onchange="(this.checked)?document.getElementById('${this.settings.id}')${doc}.textContent=document.getElementById('${this.settings.id}')${doc}.innerHTML:document.getElementById('${this.settings.id}')${doc}.innerHTML=document.getElementById('${this.settings.id}')${doc}.textContent">
                <label class="form-check-label font10" for="checkdesainmagicsoal_${this.settings.id}">HTML</label>`
            ));

            const wrapFont = document.createElement('div');
            wrapFont.setAttribute('class','p-1');
            wrapFont.setAttribute('style','font-size:10px');
            let selectHuruf = createElement('select',{
                className:'form-select font10 mb-2',
                'data-keycmd':'fontname'
            },stringToDom(`<option value="Arial">Arial</option>
                            <option value="Arial Black">Arial Black</option>
                            <option value="Courier New">Courier New</option>
                            <option value="cursive">Cursiva</option>
                            <option value="monospace">Monospace</option>
                            <option value="TimesNewRoman">Times New Roman</option>
                        `));
            wrapFont.appendChild(selectHuruf)
            let span = document.createElement('span');
            span.setAttribute('class','border p-1 rounded mx-1');
            span.setAttribute("data-keycmd","bold");
            span.setAttribute("data-typehtml","b");
            span.setAttribute("role","button");
            span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-type-bold" viewBox="0 0 16 16"> <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/> </svg>`;
            wrapFont.appendChild(span);
            span = document.createElement('span');
            span.setAttribute('class','border p-1 rounded mx-1');
            span.setAttribute("data-keycmd","underline");
            span.setAttribute("data-typehtml","u");
            span.setAttribute("role","button");
            span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-type-underline" viewBox="0 0 16 16"> <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z"/> </svg>`;
            wrapFont.appendChild(span);

            span = document.createElement('span');
            span.setAttribute('class','border p-1 rounded mx-1');
            span.setAttribute("data-keycmd","italic");
            span.setAttribute("data-typehtml","i");
            span.setAttribute("role","button");
            span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-type-italic" viewBox="0 0 16 16"> <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/> </svg>`;
            wrapFont.appendChild(span);
            
            span = document.createElement('span');
            span.setAttribute('class','border p-1 rounded mx-1');
            span.setAttribute("data-keycmd","superscript");
            span.setAttribute("data-typehtml","sup");
            span.setAttribute("role","button");
            span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-superscript" viewBox="0 0 16 16"> <path d="m4.266 12.496.96-2.853H8.76l.96 2.853H11L7.62 3H6.38L3 12.496h1.266Zm2.748-8.063 1.419 4.23h-2.88l1.426-4.23h.035Zm5.132-1.797v-.075c0-.332.234-.618.619-.618.354 0 .618.256.618.58 0 .362-.271.649-.52.898l-1.788 1.832V6h3.59v-.958h-1.923v-.045l.973-1.04c.415-.438.867-.845.867-1.547 0-.8-.701-1.41-1.787-1.41C11.565 1 11 1.8 11 2.576v.06h1.146Z"/> </svg>`;
            wrapFont.appendChild(span);
            
            span = document.createElement('span');
            span.setAttribute('class','border p-1 rounded mx-1');
            span.setAttribute("data-keycmd","subscript");
            span.setAttribute("data-typehtml","sub");
            span.setAttribute("role","button");
            span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-subscript" viewBox="0 0 16 16"> <path d="m3.266 12.496.96-2.853H7.76l.96 2.853H10L6.62 3H5.38L2 12.496h1.266Zm2.748-8.063 1.419 4.23h-2.88l1.426-4.23h.035Zm6.132 7.203v-.075c0-.332.234-.618.619-.618.354 0 .618.256.618.58 0 .362-.271.649-.52.898l-1.788 1.832V15h3.59v-.958h-1.923v-.045l.973-1.04c.415-.438.867-.845.867-1.547 0-.8-.701-1.41-1.787-1.41-1.23 0-1.795.8-1.795 1.576v.06h1.146Z"/> </svg>`;
            wrapFont.appendChild(span);
            
            span = document.createElement('span');
            span.setAttribute('class','border p-1 rounded mx-1');
            span.setAttribute("data-keycmd","strikeThrough");
            span.setAttribute("data-typehtml","strike");
            span.setAttribute("role","button");
            span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-type-strikethrough" viewBox="0 0 16 16"> <path d="M6.333 5.686c0 .31.083.581.27.814H5.166a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967z"/> </svg>`;
            wrapFont.appendChild(span);

        let bottom=document.createElement('div');
            bottom.setAttribute('style','font-size:8px;font-weight:bold;text-align:center');
            bottom.setAttribute('class','border-bottom mb-1 text-uppercase')
            bottom.innerHTML ='Huruf';
        let grupFont = document.createElement('div');
            grupFont.setAttribute('class','shadow-lg rounded p-1 bg-light m-1');
            grupFont.appendChild(bottom);
            grupFont.appendChild(wrapFont)


        const FontWarna = createElement('div',{
                className:'font8 mx-1'
            },stringToDom(`<label for="hurufcolor_${this.settings.id}" class="form-label font8 text-center">Huruf</label>
            <input type="color"  data-cmd="forecolor" class="form-control form-control-color" id="hurufcolor_${this.settings.id}" value="#563d7c" title="Klik untuk memilih warna huruf">`));
        const LatarWarna = createElement('div',{
                className:'font8 mx-1'
            },stringToDom(`<label for="bgcolor_${this.settings.id}" class="form-label font8 text-center">Background</label>
            <input type="color" data-cmd="hilitecolor" class="form-control form-control-color" id="bgcolor_${this.settings.id}" value="#563d7c" title="Klik untuk memilih warna latar">`));
        
        const grupWarna = createElement('div',{className:'rounded rounded d-flex justify-content-center align-items-center'});
        const ketGrup = createElement('div',{className:'font8 text-center border-bottom mb-1 fw-bold text-uppercase'},'Warna');
        grupWarna.appendChild(FontWarna);
        grupWarna.appendChild(LatarWarna);
        // grupWarna.appendChild(ketGrup);
        let WrapgrupWarna = document.createElement('div');
        WrapgrupWarna.setAttribute('class','shadow-lg rounded p-1 bg-light m-1 ');
        WrapgrupWarna.appendChild(ketGrup);
        WrapgrupWarna.appendChild(grupWarna)

        const grupAlign = createElement('div',{className:'p-0'});
        /**justifyLeft */
        span = createElement('span',{className:'p-0 border mx-1','data-keycmd':'justifyLeft','data-stylealign':'left',"role":"button",title:'Rata Kiri'},stringToDom(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-justify-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/> </svg>`));
        grupAlign.appendChild(span);
        /**justifyRight */
        span = createElement('span',{className:'p-0 border mx-1','data-keycmd':'justifyRight','data-stylealign':'right',"role":"button",title:'Rata Kanan'},stringToDom(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-justify-right" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/> </svg>`));
        grupAlign.appendChild(span);
        
        /**justifyCenter */
        span = createElement('span',{className:'p-0 border mx-1','data-keycmd':'justifyCenter','data-stylealign':'center',"role":"button",title:'Rata Tengah'},stringToDom(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-text-center" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/> </svg>`));
        grupAlign.appendChild(span);
        
        /**justify */
        span = createElement('span',{className:'p-0 border mx-1','data-keycmd':'justifyFull','data-stylealign':'justify',"role":"button",title:'Rata Kanan-kiri'},stringToDom(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-justify" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/> </svg>`));
        grupAlign.appendChild(span);
        span = document.createElement('span');
            span.setAttribute('class','border p-0 mx-1');
            span.setAttribute("data-keycmd","insertOrderedList");
            span.setAttribute("role","button");
            span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-list-ol" viewBox="0 0 12 12"> <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/> <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"/> </svg>`;
        grupAlign.appendChild(span);

            span = document.createElement('span');
            span.setAttribute('class','border p-0 mx-1');
            span.setAttribute("data-keycmd","insertunOrderedList");
            span.setAttribute("role","button");
            span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/> </svg>`;
        grupAlign.appendChild(span);
        
            span = document.createElement('span');
            span.setAttribute('class','border p-0 mx-1');
            span.setAttribute('title','hapus semua format');
            span.setAttribute("data-keycmd","removeFormat");
            span.setAttribute("role","button");
            span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser" viewBox="0 0 16 16"> <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/> </svg>`;
        grupAlign.appendChild(span);
        
        const grupUkuranHeading = createElement('div',{className:'row p-0 mx-1'});
        
        let selectUkuran = createElement('select',{className:'col-md-6 font8 mt-1','data-keycmd':'fontsize'},stringToDom(` <option value="1">Sangat Kecil</option> <option value="2">Agak Kecil</option> <option value="3" selected>Normal</option> <option value="4">Medium</option> <option value="5">Gede</option> <option value="6">Gede Banget</option> <option value="7">Maksimum</option> `));
        let selectHeading = createElement('select',{className:'col-md-6 font8 mt-1','data-keycmd':'formatBlock'},stringToDom(` <option value="h1">Heading 1</option> <option value="h2">Heading 2</option> <option value="h3">Heading 3</option> <option value="h4">Heading 4</option> <option value="h5">Heading 5</option> <option value="h6">Heading 6</option> <option value="p" selected>Paragraf</option> <option value="pre">Precode</option> `));
            grupUkuranHeading.appendChild(selectUkuran);
            grupUkuranHeading.appendChild(selectHeading);
        
        
        const wrapParagraph = createElement('div',{className:'shadow-lg rounded p-1 bg-light m-1'});
        let teks = createElement('div',{className:'text-center border-bottom mb-1 text-uppercase font8 fw-bold'},'Paragraf');
        wrapParagraph.appendChild(teks);
        wrapParagraph.appendChild(grupAlign);
        wrapParagraph.appendChild( grupUkuranHeading);
        

        const wrapInsert = createElement('div',{className:'shadow-lg rounded p-1 bg-light text-center m-1'});
            teks = createElement('div',{className:'text-center border-bottom mb-1 text-uppercase font8 fw-bold'},'Lampiran');
            wrapInsert.appendChild(teks);//createLink
            span = createElement('span',{className:'p-0 border mx-1','data-keycmd':'createLink',"role":"button",title:'hyperlink'},stringToDom(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16"> <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/> <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/> </svg>`));
            wrapInsert.appendChild(span);
            span = createElement('span',{className:'p-0 border mx-1', 'data-aksi':'buattabel', 'data-targettabel':`${this.settings.id}`, "role":"button",title:'Buat Tabel'},stringToDom(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-table" viewBox="0 0 16 16"> <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/> </svg>`));
            wrapInsert.appendChild(span);
            span = createElement('span',{className:'p-0 border mx-1', 'data-aksi':'youtube', "role":"button",title:'Masukkan video Youtube'},stringToDom(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16"> <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/> </svg>`));
            wrapInsert.appendChild(span);
            span = createElement('label',{className:'btn btn-sm mt-2 d-block font10 py-0 border-3 border-bottom rounded-pill border-start-0 border-top-0 border-end-0 btn-secondary border-warning', 'for':`input_${this.settings.id}`, "role":"button",title:'unggah media'},'Unggah Gambar');
            wrapInsert.appendChild(span);
            span = createElement('input',{className:'d-none',type:'file','id':`input_${this.settings.id}`,accept:"image/*"});
            wrapInsert.appendChild(span);
            
        
        const wrapMath = createElement('div',{className:'shadow-lg rounded p-1 bg-light text-center m-1'});
            teks = createElement('div',{className:'text-center border-bottom mb-1 text-uppercase font8 fw-bold'},'Matematika');
            wrapMath.appendChild(teks);//createLink
            span = createElement('div',{className:'p-0 border mx-1 d-inline-flex flex-column align-items-center font10',
                    'data-aksi':'pecahan', 'data-targettabel':`${this.settings.id}`,"role":"button",title:'pecahan'});
                let pembilang = createElement('span',{className:'border-bottom border-dark'},'⬚')
                span.appendChild(pembilang);
                pembilang = createElement('span',{},'⬚');
                span.appendChild(pembilang);
            wrapMath.appendChild(span);
            span = createElement('span',{className:'p-0 border mx-1', 'data-aksi':'akarkuadrat', 'data-targetupload':`${this.settings.id}`, "role":"button",title:'Akar Kuadrat'},'√');
            wrapMath.appendChild(span);
            span = createElement('span',{className:'p-0 border mx-1', 'data-aksi':'akarkubik', 'data-targettabel':`${this.settings.id}`, "role":"button",title:'Akar kubik/akar pangkat tiga'},'∛');
            wrapMath.appendChild(span);
            menus.appendChild(formCheckHtml)
            menus.appendChild(grupFont);
            menus.appendChild(wrapParagraph);
            menus.appendChild(WrapgrupWarna);
            menus.appendChild(wrapMath);
            menus.appendChild(wrapInsert);
            if(this.settings.useFor=='kbm'){
                const wrapTemplate = createElement('div',{className:'shadow-lg rounded p-1 bg-light text-center m-1 d-flex flex-column'});
                teks = createElement('div',{className:'text-center border-bottom mb-1 text-uppercase font8 fw-bold'},'Template Soal');
                wrapTemplate.appendChild(teks);//createLink
                span = createElement('span',{className:'btn btn-sm mt-1 d-block font10 py-0 border-3 border-bottom rounded-pill border-start-0 border-top-0 border-end-0 btn-secondary border-warning', 'data-aksi':'templateabc',  "role":"button",title:'Pilihan Ganda ABC'},'Pilihan Ganda ABC');
                wrapTemplate.appendChild(span);
                span = createElement('span',{className:'btn btn-sm d-block font10 py-0 border-3 border-bottom rounded-pill border-start-0 border-top-0 border-end-0 btn-secondary border-warning', 'data-aksi':'templateabcd',  "role":"button",title:'Pilihan Ganda ABCD'},'Pilihan Ganda ABCD');
                wrapTemplate.appendChild(span);
                span = createElement('span',{className:'btn btn-sm d-block font10 py-0 border-3 border-bottom rounded-pill border-start-0 border-top-0 border-end-0 btn-secondary border-warning', 'data-aksi':'templateisian',  "role":"button",title:'Isian'},'Isian');
                wrapTemplate.appendChild(span);
                menus.appendChild(wrapTemplate);
            

            }

        return menus;
    }
    
    createMenus(){
        const consfigMenus = [
            {
                title:'Huruf',
                settingAttribute:{className:'bg-light rounded shadow-lg font10 col col-md-3 p-1 me-1 d-md-flex flex-nowrap flex-md-wrap'},
                childMenus:[
                    {
                        tag:'div',
                        attr:{className:'border font12 bg-white col-4 col-md-12'},
                        innerHTML:'tes HTML'
                    },
                    {
                        tag:'div',
                        attr:{className:'border font12 col-4 col-md-6'},
                        innerHTML:'tes HTML1'
                    },
                    {
                        tag:'div',
                        attr:{className:'border font12 col-4 col-md-6'},
                        innerHTML:'tes HTML2'
                    }
                ]
            }
            
        ];
        let wrapeermenus = createElement('div',{className:'flex-nowrap d-flex overflow-y-hidden scrol-h-custom shadow-lg'});
        consfigMenus.forEach(ob=>{
            let item = createElement('div',ob.settingAttribute,ob.title);
            ob.childMenus.forEach(n=> {
                let le = createElement(n.tag,n.attr,n.innerHTML);
                item.appendChild(le)}
            )
            wrapeermenus.appendChild(item);
        })
        return wrapeermenus;
    }

    applyMenuInDiv(targetDiv){
        targetDiv.appendChild(this.createMenu());
    }
    resultBodyInnerHTML(values){
        const element = this.settings.elementOutputTypeValue;
        if(element) element.value = values;
    }
    resultBodyObject(values){
        const element = this.settings.variabelSorotan;
        if(element) element = values;
    }
    applyMenuInBefore(){
        let menu = this.createMenu();
        this.el.dom.insertBefore(menu,this.el.dom.firstChild);
        
    }
    createEditorIframe(){
        const editor = createElement("iframe", {
            id: this.settings.id,
            name: this.settings.id,
            className: "rich-editor",
            src: "about:blank",
            target: "_parent",
            style:'width:100%;resize:vertical',
            title: "rich-text-editor",
            
        });
        $(this.settings.parentSelector).appendChild(editor);
            
        return editor;
        // let texteditor = document.createElement('div');
        // texteditor.setAttribute('contenteditable',true);
        // texteditor.setAttribute('spellcheck',false);
        // texteditor.setAttribute('class','border container border-dotted bg-white border-dark');
        // this.dom.appendChild(texteditor);
    }
    createEditor(){
        let texteditor = document.createElement('div');
        // texteditor.setAttribute('contenteditable',true);
        texteditor.setAttribute('spellcheck',false);
        texteditor.setAttribute('id',this.settings.id);
        texteditor.setAttribute('class','border container border-dotted bg-white border-dark');
        this.el.dom.appendChild(texteditor);
        this.el.dom.designMode='on';
    }
    init(ContextMenu=false){
        this.createEditorIframe();
        this.applyMenuInBefore();
        if(ContextMenu) {
            this.costumContextMenu = true;
            this.applyContextMenu();
        };
        this.el={
            ...this.el,
            doc:$(`#${this.settings.id}`).contentWindow.document,
            iframe:$(`#${this.settings.id}`),
            menuContext:$('#menucontext_'+this.settings.id)
        }
        this.el.dom.style.position='relative';
        this.el.doc.head.appendChild(createElement('style', {
                    type: 'text/css'
                }, `body{font-family:arial; font-size:14px;background-color:#fff};
                a{cursor: pointer};

                
                `));
        this.el.doc.body.setAttribute('contenteditable', "true");
        this.el.doc.body.setAttribute('style', "border:2px solid #ddd;padding:1rem;margin:0");
        this.injextHead();
        debounce(this.domActivity());
        debounce(this.btnActivity());
        
        
    }
    initWraper(ContextMenu=false){
        this.createEditorIframe();
        this.applyMenuInBefore();
        this.modeToolbar = false;
        // this.applyMenuInBefore();
        if(ContextMenu) {
            this.costumContextMenu = true;
            this.applyContextMenuNotToolbar();
        };
        this.el={
            ...this.el,
            doc:$(`#${this.settings.id}`).contentWindow.document,
            iframe:$(`#${this.settings.id}`),
            menuContext:$('#menucontext_'+this.settings.id)
        }
        this.el.dom.style.position='relative';
        this.el.doc.head.appendChild(createElement('style', {
                    type: 'text/css'
                }, `body{font-family:arial; font-size:14px;background-color:#fff};
                a{cursor: pointer};

                
                `));
        this.el.doc.body.setAttribute('contenteditable', "true");
        this.el.doc.body.setAttribute('style', "border:2px solid #ddd;padding:1rem;margin:0");
        this.injextHead();
        debounce(this.domActivity());
        debounce(this.btnActivity());
        // $(this.settings.parentSelector)
        
        
    }
    initContextOnly(ContextMenu=false){
        this.createEditorIframe();
        this.modeToolbar = false;
        // this.applyMenuInBefore();
        if(ContextMenu) {
            this.costumContextMenu = true;
            this.applyContextMenuNotToolbar();
        };
        this.el={
            ...this.el,
            doc:$(`#${this.settings.id}`).contentWindow.document,
            iframe:$(`#${this.settings.id}`),
            menuContext:$('#menucontext_'+this.settings.id)
        }
        this.el.dom.style.position='relative';
        this.el.doc.head.appendChild(createElement('style', {
                    type: 'text/css'
                }, `body{font-family:arial; font-size:14px;background-color:#fff};
                a{cursor: pointer};

                
                `));
        this.el.doc.body.setAttribute('contenteditable', "true");
        this.el.doc.body.setAttribute('style', "border:2px solid #ddd;padding:1rem;margin:0");
        this.injextHead();
        debounce(this.domActivity());
        // debounce(this.btnActivity());
        $(this.settings.parentSelector)
        
        
    }
    injextHead(){
        // this.createLinkBootstrap();
        // this.createLinkFA
        
        const allCss =  document.styleSheets;
        const linkCont = this.el.doc.head.querySelectorAll('link');
        if(linkCont.length>allCss.length){
            linkCont[0].remove();
        }
        
        for(let i = 0 ; i < allCss.length ; i++){
                let create = document.createElement('link');
                create.href = allCss[i].href;
                create.type ='text/css';
                create.rel = 'stylesheet';
                this.el.doc.head.appendChild(create);
                
        }
        
    }
    additionalContextMenu(obj){
        
    }
    addDomActivityOnInput(cb){
        this.addOnInput = cb
    }
    domActivity(){
        const dom = this.el.doc;
        const check = $('#checkdesainmagicsoal_' +this.settings.id);
        // const newCb = this.addDomActivityCallback()
        dom.oninput = (e)=>{
            /**============================== */
            this.addOnInput(e);
            /**============================== */
            this.el.iframe.style.height = dom.body.scrollHeight + 'px';
            let cekImgs = $all('.resizer',this.el.doc);
            cekImgs.forEach((img)=>{
                if(img.firstChild){
                    img.firstChild.style.removeProperty('border');
                    if(img.firstChild.style.length ==0) img.firstChild.removeAttribute('style');
                    img.parentNode.insertBefore(img.firstChild,img);
                }
                if(img.className == 'resizer'||img.className == 'resizer-tb') img.remove();
            });

        };
        dom.onmouseup = (e)=>{
            
            this.el.iframe.style.height = dom.body.scrollHeight + 'px';
            let cekImgs = $all('.resizer',this.el.doc);
            cekImgs.forEach((img)=>{
                if(img.firstChild){
                    img.firstChild.style.removeProperty('border');
                    if(img.firstChild.style.length ==0) img.firstChild.removeAttribute('style');
                    img.parentNode.insertBefore(img.firstChild,img);
                }
                if(img.className == 'resizer'||img.className == 'resizer-tb') img.remove();
            })
            if($(`#menucontext_${this.settings.id}`)){
                if(!$(`#menucontext_${this.settings.id}`).classList.contains('d-none')){
                    $(`#menucontext_${this.settings.id}`).classList.add('d-none')
                    let cekDropdown = this.el.menuContext.querySelectorAll('.dropdown-toggle');
                    cekDropdown.forEach(bn=>{
                        if(bn.classList.contains('show')) bn.click();
                    });
                }
            }
            
        };
        dom.onkeyup=(e)=>{
            
            let cekImgs = $all('.resizer',this.el.doc);
            cekImgs.forEach((img)=>{
                if(img.firstChild){
                    img.firstChild.style.removeProperty('border');
                    if(img.firstChild.style.length ==0) img.firstChild.removeAttribute('style');
                    img.parentNode.insertBefore(img.firstChild,img);
                }
                if(img.className == 'resizer'||img.className == 'resizer-tb') img.remove();
            })
            this.resultBody = this.el.doc.body.innerHTML;
            this.resultBodyInnerHTML(this.resultBody);
            this.resultBodyObject(this.resultBody);
        };
        dom.ondblclick = (e)=>{
            if(e.target.nodeName == 'IMG'|| e.target.nodeName == 'img'){
                
                let img = e.target;
                e.target.style.border ='1px dashed #000';
                let div = dom.createElement('div');
                    div.className="resizer";
                    div.style.width= img.offsetWidth+"px";
                    div.style.height=img.offsetHeight+"px";
                    div.style.position ="relative";
                    div.style.display ="inline-block";
                    img.parentNode.insertBefore(div,img);
                    div.appendChild(img);
                let tb = dom.createElement('div');
                    tb.className="resizer-br"
                    tb.style.width= '10px'; 
                    tb.style.height= "10px"; 
                    tb.style.background= "white"; 
                    tb.style.position="absolute"; 
                    tb.style.border= "3px solid #4286f4";
                    tb.style.borderRadius="50%"; 
                    tb.style.right= "-5px"; 
                    tb.style.bottom= "-5px"; 
                    tb.style.cursor= "nwse-resize"; 
                    div.appendChild(tb);
                tb = dom.createElement('div');
                    tb.className="resizer-bl"
                    tb.style.width= '10px'; 
                    tb.style.height= "10px"; 
                    tb.style.background= "white"; 
                    tb.style.position="absolute"; 
                    tb.style.border= "3px solid #4286f4";
                    tb.style.borderRadius="50%"; 
                    tb.style.left= "-5px"; 
                    tb.style.bottom= "-5px"; 
                    tb.style.cursor= "nwse-resize"; 
                    div.appendChild(tb);
                tb = dom.createElement('div');
                    tb.className="resizer-tl"
                    tb.style.width= '10px'; 
                    tb.style.height= "10px"; 
                    tb.style.background= "white"; 
                    tb.style.position="absolute"; 
                    tb.style.border= "3px solid #4286f4";
                    tb.style.borderRadius="50%"; 
                    tb.style.left= "-5px"; 
                    tb.style.top= "-5px"; 
                    tb.style.cursor= "nwse-resize"; 
                    div.appendChild(tb);
                tb = dom.createElement('div');
                    tb.className="resizer-tr"
                    tb.style.width= '10px'; 
                    tb.style.height= "10px"; 
                    tb.style.background= "white"; 
                    tb.style.position="absolute"; 
                    tb.style.border= "3px solid #4286f4";
                    tb.style.borderRadius="50%"; 
                    tb.style.right= "-5px"; 
                    tb.style.top= "-5px"; 
                    tb.style.cursor= "nwse-resize"; 
                    div.appendChild(tb);
                const minimum_size = 20;
                let original_width = 0;
                let original_height = 0;
                let original_x = 0;
                let original_y = 0;
                let original_mouse_x = 0;
                let original_mouse_y = 0;
                
                const element = div;
                dom.onmousedown = (e)=>{
                    // e.preventDefault();
                    original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
                    original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
                    original_x = element.getBoundingClientRect().left;
                    original_y = element.getBoundingClientRect().top;
                    original_mouse_x = e.pageX;
                    original_mouse_y = e.pageY;
                    dom.onmousemove = resize;
                    dom.addEventListener('mouseup',stopResize); ;//onmouseup = stopResize;
                };
                function resize(e){
                    const currentResizer = e.target;//.closest('div');
                    if (currentResizer.classList.contains('resizer-br')) {
                        const width = original_width + (e.pageX - original_mouse_x);
                        const height = original_height + (e.pageY - original_mouse_y)
                        if (width > minimum_size) {
                            element.style.width = width + 'px'
                        }
                        if (height > minimum_size) {
                            element.style.height = height + 'px'
                        }
                        }
                    else if (currentResizer.classList.contains('resizer-bl')) {
                        const height = original_height + (e.pageY - original_mouse_y)
                        const width = original_width - (e.pageX - original_mouse_x)
                        if (height > minimum_size) {
                            element.style.height = height + 'px'
                        }
                        if (width > minimum_size) {
                            element.style.width = width + 'px'
                            element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                        }
                        }
                    else if (currentResizer.classList.contains('resizer-tr')) {
                        const width = original_width + (e.pageX - original_mouse_x)
                        const height = original_height - (e.pageY - original_mouse_y)
                        if (width > minimum_size) {
                            element.style.width = width + 'px'
                        }
                        if (height > minimum_size) {
                            element.style.height = height + 'px'
                            element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                        }
                        }
                    else {
                        const width = original_width - (e.pageX - original_mouse_x)
                        const height = original_height - (e.pageY - original_mouse_y)
                        if (width > minimum_size) {
                            element.style.width = width + 'px';
                            element.style.left = original_x + (e.pageX - original_mouse_x) + 'px';
                        }
                        if (height > minimum_size) {
                            element.style.height = height + 'px'
                            element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                        }
                    }   
                    img.style.width  = element.style.width
                    img.style.height = element.style.height;
                }
                
                function stopResize(e) {
                    dom.removeEventListener('mouseup',stopResize); ;//onmouseup = stopResize;
                    dom.removeEventListener('mousemove',resize); ;//onmouseup = stopResize;
                    dom.onmousemove= null;
                    dom.onmousedown = null;
                    dom.onmouseup();
                }
                
            }
        }
        dom.onpaste = (e)=>{
            const type = e.clipboardData.types;
            if(type.includes('Files')){
                const selection = dom.getSelection();
                let teks = e.clipboardData.getData('text/plain');
                let parser = new DOMParser();
                    let htmldoc = parser.parseFromString(teks,'text/html');
                    let div = document.createDocumentFragment();
                    while (htmldoc.body.childNodes.length > 0){
                        div.appendChild(htmldoc.body.childNodes[0]);
                    }
                    selection.deleteFromDocument();
                    selection.getRangeAt(0).insertNode(div);
                    selection.collapseToEnd()
                
                // this.onmouseup(e);
            }else{

                let teks = e.clipboardData.getData('text/plain');
                const selection = dom.getSelection();
                if(check.checked){
                    teks = this.CleanWordFormatting(teks);
                    selection.deleteFromDocument();
                    selection.getRangeAt(0).insertNode(document.createTextNode(teks));
                    selection.collapseToEnd();
                }else{
                    teks = this.CleanWordFormatting(teks);
                    let parser = new DOMParser();
                    let htmldoc = parser.parseFromString(teks,'text/html');
                    let div = document.createDocumentFragment();
                    while (htmldoc.body.childNodes.length > 0){
                        div.appendChild(htmldoc.body.childNodes[0]);
                    }
                    selection.deleteFromDocument();
                    selection.getRangeAt(0).insertNode(div);
                    selection.collapseToEnd();
                }
                e.preventDefault();
            }
        }
        dom.onselectionchange = (e)=>{
            // //console.log('=============== onselectionchange =================',this.status);
            if(dom.getSelection().anchorNode.nodeName === 'BODY'){
                dom.execCommand("formatBlock", false,'<div>');
                // //console.log('----------jika parentNode ini BODY, seharusnya baris elemen ini dibungkus div');
            
            }
            if(this.getCurrentBlock()) this.status = this.getCurrentBlock();
            
            if(!this.status.parent) return;
            let statusType = this.status.type;
            $all('span[data-typehtml]').forEach(el=>{
                if(el.getAttribute('data-typehtml')== statusType){
                    el.classList.add('active');
                }else{
                    el.classList.remove('active');
                }
            });
            let stringAlign = this.status.styleAlign==''?'left':this.status.styleAlign.toLowerCase();
            $all('span[data-stylealign]').forEach(el=>{
                
                if(el.getAttribute('data-stylealign')==stringAlign){
                    el.classList.add('active');
                }else{
                    el.classList.remove('active');
                }
            });

            if($('[data-keycmd="insertOrderedList"]') && $('[data-keycmd="insertunOrderedList"]')){
                if(this.status.parent != null && this.status.parent.nodeName.toLowerCase() == 'ol'){
                    $('[data-keycmd="insertOrderedList"]').classList.add('active')
                }else{
                    $('[data-keycmd="insertOrderedList"]').classList.remove('active')
                }
                if(this.status.parent != null && this.status.parent.nodeName.toLowerCase() == 'ul'){
                    $('[data-keycmd="insertunOrderedList"]').classList.add('active')
                }else{
                    $('[data-keycmd="insertunOrderedList"]').classList.remove('active')
                }

            }

            if(this.costumContextMenu){
                $all('span[data-aksisoal]').forEach(r=>{
                    r.onclick = () =>{
                        if(!$(`#menucontext_${this.settings.id}`).classList.contains('d-none')){
                            $(`#menucontext_${this.settings.id}`).classList.add('d-none');
                            let cekDropdown = this.el.menuContext.querySelectorAll('.dropdown-toggle');
                                cekDropdown.forEach(bn=>{
                                    if(bn.classList.contains('show')) bn.click();
                                });
                        }
                    }
                })
            }
            // if(this.ControlObjekSorotan){
            //     this.objekSorotan = this.ControlObjekSorotan();
            //     //console.log('-----objek sorotan dicontrol dari class Replace:',this.objekSorotan)
            // }
            // //console.log('----aksi disetiap text editor---',this.objekSorotan);

        };


        if(this.costumContextMenu){
            dom.oncontextmenu = (e) => {
                e.preventDefault();
                if(this.modeToolbar){
                    this.showContextMenu(e);
                }else{
                    this.controlMenuConteks(e);
                }
            };
        }
        
    }
    fnmouseup(set){
        const settings = Object.assign({},set);
        this.settings = Object.assign({},settings);
        
        this.el={
            // ...this.el,
            dom:this.parentSelectorAsal,
            doc:$(`#${settings.id}`).contentWindow.document,
            iframe:$(`#${settings.id}`),
            menuContext:$('#menucontext_'+settings.id)
        }
        // //console.log(this.el)
        const dom = this.el.doc;
        this.el.iframe.style.height = dom.body.scrollHeight + 'px';
            let cekImgs = $all('.resizer',this.el.doc);
            // //console.log(cekImgs.length);
            cekImgs.forEach((img)=>{
                if(img.firstChild){
                    img.firstChild.style.removeProperty('border');
                    if(img.firstChild.style.length ==0) img.firstChild.removeAttribute('style');
                    img.parentNode.insertBefore(img.firstChild,img);
                }
                if(img.className == 'resizer'||img.className == 'resizer-tb') img.remove();
            })
            if(!$(`#menucontext_${settings.id}`).classList.contains('d-none')){
                $(`#menucontext_${settings.id}`).classList.add('d-none')
            }
    }
    showContextMenu(e){
        if($(`#menucontext_${this.settings.id}`).classList.contains('d-none')){
            $(`#menucontext_${this.settings.id}`).classList.remove('d-none');
        }
        
        const elemenYangAkanDiletakkan = this.el.menuContext;
        const boundingBox = elemenYangAkanDiletakkan.getBoundingClientRect();
        const iframe = this.el.iframe;
        let x=0,y=0;
        x = e.clientX - boundingBox.width / 2; // Mengatur posisi x elemen tengah
        y = e.clientY + boundingBox.height / 2; // Mengatur posisi y elemen tengah

        // Periksa apakah elemen akan berada di luar batas-batas iframe
        let iframeWidth = iframe.clientWidth;
        let iframeHeight = iframe.clientHeight+iframe.previousElementSibling.clientHeight;//iframe.clientHeight;

        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;
        }
        if (x + boundingBox.width > iframeWidth) {
            x = iframeWidth - boundingBox.width;
        }
        if (y+boundingBox.height > iframeHeight) {
            y = iframeHeight - boundingBox.height;
            // y = boundingBox.height;
        }
        elemenYangAkanDiletakkan.style.left = x + 'px';
        elemenYangAkanDiletakkan.style.top = y + 'px';
        const refrensiHiden = $(`#${this.settings.selectorControlItemContext}`);
        if(refrensiHiden){
            let v = refrensiHiden.value;
            let list = $all('#menucontext_'+this.settings.id+' .list-group li',elemenYangAkanDiletakkan);
            if(v=="Isian" || v=="Essay"){
                list.forEach(li=>{
                    if(li.classList.contains('opsijawaban')){
                        li.classList.add('d-none');
                    }else{
                        li.classList.remove('d-none');
                    }
                });
            }else{
                list.forEach(li=>{
                    if(li.classList.contains('opsijawaban')){
                        li.classList.remove('d-none');
                    }else{
                        // li.classList.add('d-none');
                    }
                });
            }
        }else{
            let v = this.exportValueHidden
            let list = $all('#menucontext_'+this.settings.id+' .list-group li',elemenYangAkanDiletakkan);
            if(v=="Isian" || v=="Essay"){
                list.forEach(li=>{
                    if(li.classList.contains('opsijawaban')){
                        li.classList.add('d-none');
                    }else{
                        li.classList.remove('d-none');
                    }
                });
            }else{
                list.forEach(li=>{
                    if(li.classList.contains('opsijawaban')){
                        li.classList.remove('d-none');
                    }else{
                        // li.classList.add('d-none');
                    }
                });
            }
        }
    }
    controlMenuConteks(e){
        if($(`#menucontext_${this.settings.id}`).classList.contains('d-none')){
                $(`#menucontext_${this.settings.id}`).classList.remove('d-none');
            }
        
        const elemenYangAkanDiletakkan = this.el.menuContext;
        const boundingBox = elemenYangAkanDiletakkan.getBoundingClientRect();
        const iframe = this.el.iframe;
        let x=0,y=0;
        x = e.clientX - boundingBox.width / 4; // Mengatur posisi x elemen tengah
        y = e.clientY;//- boundingBox.height/2;//2 ;/// 2; // Mengatur posisi y elemen tengah

        // Periksa apakah elemen akan berada di luar batas-batas iframe
        let iframeWidth = iframe.clientWidth;
        let iframeHeight = iframe.clientHeight;//+iframe.previousElementSibling.clientHeight;//iframe.clientHeight;
        let leftMenuContextFormating ='start-100';
        if (x < 0) {
            x = 0;
            
        }
        if (y < 0) {
            y = 0;
            // //console.log('e.clientY y<0 ',y);
        }
        if (x + boundingBox.width *1.5 > iframeWidth) {
            x = iframeWidth - boundingBox.width ;
            leftMenuContextFormating = 'end-100';
        }
        if (y+boundingBox.height > iframeHeight) {
            y = iframeHeight - boundingBox.height;
            // y = boundingBox.height;
            //console.log('y+boundingBox.height > iframeHeight',y);
        }
        // //console.log({
        //     'e.clienX':e.clientX,
        //     'e.clienY':e.clientY,
        //     'bounding-x':boundingBox.x,
        //     'bounding-y':boundingBox.y,
        //     'bounding-width':boundingBox.width,
        //     'bounding-height':boundingBox.height,
        //     'bounding-left':boundingBox.height,
        //     'bounding-bottom':boundingBox.bottom,
        //     'bounding-top':boundingBox.top,
        //     'bounding-right':boundingBox.right,
        //     'bounding':boundingBox,

        // })
        elemenYangAkanDiletakkan.style.left = x + 'px';
        elemenYangAkanDiletakkan.style.top = y + 'px';
        //console.log(y)
        /**jika menu toolbar ditiadakan */
        if(!this.modeToolbar){
            const menuoverlay = document.getElementById("menucontextoverlay_"+this.settings.id);
            if(menuoverlay){
                menuoverlay.classList.remove('start-100','end-100');
                // menuoverlay.classList.remove('start-100','end-100');
                menuoverlay.classList.add(leftMenuContextFormating);
            }

        }
        const posisicontextmatematika = document.getElementById("menucontextoverlaymatematika_"+this.settings.id);
            posisicontextmatematika.classList.remove('start-100','end-100');
            posisicontextmatematika.classList.add(leftMenuContextFormating);
        const submenucontexts = $all('.submenucontext',elemenYangAkanDiletakkan);
        submenucontexts.forEach(el=>{
            el.classList.remove('start-100','end-100');
            el.classList.add(leftMenuContextFormating);
        })
        const refrensiHiden = $(`#${this.settings.selectorControlItemContext}`);
        if(refrensiHiden){
            let v = refrensiHiden.value;
            let list = $all('#menucontext_'+this.settings.id+' .list-group li',elemenYangAkanDiletakkan);
            if(v=="Isian" || v=="Essay"){
                list.forEach(li=>{
                    if(li.classList.contains('opsijawaban')){
                        li.classList.add('d-none');
                    }else{
                        li.classList.remove('d-none');
                    }
                });
            }else{
                list.forEach(li=>{
                    if(li.classList.contains('opsijawaban')){
                        li.classList.remove('d-none');
                    }else{
                        // li.classList.add('d-none');
                    }
                });
            }
        }else{
            let v = this.exportValueHidden
            let list = $all('#menucontext_'+this.settings.id+' .list-group li',elemenYangAkanDiletakkan);
            if(v=="Isian" || v=="Essay"){
                list.forEach(li=>{
                    if(li.classList.contains('opsijawaban')){
                        li.classList.add('d-none');
                    }else{
                        li.classList.remove('d-none');
                    }
                });
            }else{
                list.forEach(li=>{
                    if(li.classList.contains('opsijawaban')){
                        li.classList.remove('d-none');
                    }else{
                        // li.classList.add('d-none');
                    }
                });
            }
        }
        let hasElemenContetxt = $all('[data-aksicontext]');
        hasElemenContetxt.forEach(btn=>{
            btn.onclick = (e)=>{
                
                let aksi = btn.getAttribute('data-aksicontext');
                // //console.log('cek this.objectSorotan sebelum disorot',this.objekSorotan);
                if(this[aksi]){
                    
                    // this[aksi]();
                    if(['insertOrderedList','insertunOrderedList','pecahan','akarkuadrat','akarkubik'].indexOf(aksi)>=0){
                        this[aksi]()
                    }else if(aksi=='levelkognitif'){
                        this.cekKKO =this[aksi]();
                        this.objekSorotan['levelkognitif'] = this.cekKKO.levelkognitif;
                        this.objekSorotan['taksonomibloom'] = this.cekKKO.tipe;
                    }else{
                        this.objekSorotan[aksi] = this[aksi]();
                        if(this.objekSorotan.hasOwnProperty('allpg')){
                            let ada = this.objekSorotan.allpg;
                            ada.forEach(n=>{
                                Object.entries(n).forEach(([k,v])=>{
                                    this.objekSorotan[k]=v;

                                })
                            })
                            delete this.objekSorotan.allpg;
                        }
                    }
                    
                    if(!$(`#menucontext_${this.settings.id}`).classList.contains('d-none')){
                        $(`#menucontext_${this.settings.id}`).classList.add('d-none')
                    }

                }else{
                    //console.log('belum ada '+aksi);
                }
                // //console.log(this.objekSorotan);
                if(this.CallBackObjekSorotan){
                    this.CallBackObjekSorotan(this.objekSorotan,this.db,this.cekKKO);
                }
            }
        });
    }
    controlMenuConteksAsal(e){
        if($(`#menucontext_${this.settings.id}`).classList.contains('d-none')){
                $(`#menucontext_${this.settings.id}`).classList.remove('d-none');
            }
        
        const elemenYangAkanDiletakkan = this.el.menuContext;
        const boundingBox = elemenYangAkanDiletakkan.getBoundingClientRect();
        const iframe = this.el.iframe;
        let x=0,y=0;
        x = e.clientX - boundingBox.width / 2; // Mengatur posisi x elemen tengah
        y = e.clientY + boundingBox.height / 2; // Mengatur posisi y elemen tengah

        // Periksa apakah elemen akan berada di luar batas-batas iframe
        let iframeWidth = iframe.clientWidth;
        let iframeHeight = iframe.clientHeight;//+iframe.previousElementSibling.clientHeight;//iframe.clientHeight;
        let leftMenuContextFormating ='start-100';
        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;
        }
        if (x + boundingBox.width > iframeWidth) {
            x = iframeWidth - boundingBox.width;
            leftMenuContextFormating = 'end-100';
        }
        if (y+boundingBox.height > iframeHeight) {
            y = iframeHeight - boundingBox.height;
            // y = boundingBox.height;
        }

        elemenYangAkanDiletakkan.style.left = x + 'px';
        elemenYangAkanDiletakkan.style.top = y + 'px';
        /**jika menu toolbar ditiadakan */
        if(!this.modeToolbar){
            const menuoverlay = document.getElementById("menucontextoverlay_"+this.settings.id);
            if(menuoverlay){
                menuoverlay.classList.remove('start-100','end-100');
                // menuoverlay.classList.remove('start-100','end-100');
                menuoverlay.classList.add(leftMenuContextFormating);
            }

        }
        const posisicontextmatematika = document.getElementById("menucontextoverlaymatematika_"+this.settings.id);
            posisicontextmatematika.classList.remove('start-100','end-100');
            posisicontextmatematika.classList.add(leftMenuContextFormating);
        
        const refrensiHiden = $(`#${this.settings.selectorControlItemContext}`);
        if(refrensiHiden){
            let v = refrensiHiden.value;
            let list = $all('#menucontext_'+this.settings.id+' .list-group li',elemenYangAkanDiletakkan);
            if(v=="Isian" || v=="Essay"){
                list.forEach(li=>{
                    if(li.classList.contains('opsijawaban')){
                        li.classList.add('d-none');
                    }else{
                        li.classList.remove('d-none');
                    }
                });
            }else{
                list.forEach(li=>{
                    if(li.classList.contains('opsijawaban')){
                        li.classList.remove('d-none');
                    }else{
                        // li.classList.add('d-none');
                    }
                });
            }
        }else{
            let v = this.exportValueHidden
            let list = $all('#menucontext_'+this.settings.id+' .list-group li',elemenYangAkanDiletakkan);
            if(v=="Isian" || v=="Essay"){
                list.forEach(li=>{
                    if(li.classList.contains('opsijawaban')){
                        li.classList.add('d-none');
                    }else{
                        li.classList.remove('d-none');
                    }
                });
            }else{
                list.forEach(li=>{
                    if(li.classList.contains('opsijawaban')){
                        li.classList.remove('d-none');
                    }else{
                        // li.classList.add('d-none');
                    }
                });
            }
        }
        let hasElemenContetxt = $all('[data-aksicontext]');
        hasElemenContetxt.forEach(btn=>{
            btn.onclick = (e)=>{
                
                let aksi = btn.getAttribute('data-aksicontext');
                if(this[aksi]){
                    
                    // this[aksi]();
                    if(['insertOrderedList','insertunOrderedList','pecahan','akarkuadrat','akarkubik'].indexOf(aksi)>=0){
                        this[aksi]();
                    }else{
                            this.objekSorotan[aksi] = this[aksi]();

                            if(this.objekSorotan.hasOwnProperty('allpg')){
                                let ada = this.objekSorotan.allpg;
                                ada.forEach(n=>{
                                    Object.entries(n).forEach(([k,v])=>{
                                        this.objekSorotan[k]=v;

                                    })
                                })
                                delete this.objekSorotan.allpg;
                            }
                            
                        
                        console.log(aksi)
                    }
                    
                    if(!$(`#menucontext_${this.settings.id}`).classList.contains('d-none')){
                        $(`#menucontext_${this.settings.id}`).classList.add('d-none')
                    }

                }else{
                    //console.log('belum ada '+aksi);
                }
                
                if(this.CallBackObjekSorotan){
                    this.CallBackObjekSorotan(this.objekSorotan,this.db);
                }
            }
        });
    }
    btnActivity(){
        const formatHTML = $('#checkdesainmagicsoal_' +this.settings.id);
        // this.el={
        //     ...this.el,
        //     checkHTML:formatHTML.checked
        // }
        // //console.log(formatHTML.checked);
        const dom = this.el.doc;
        // let spanFormat = document.querySelectorAll('[data-keycmd]');
        let spanFormat = $(this.settings.parentSelector).querySelectorAll('[data-keycmd]');
        spanFormat.forEach(span=>{
            let atrib = span.getAttribute('data-keycmd');
            if(span.nodeName.toLowerCase()=='select'){
                span.onchange = (e)=>{
                    if(formatHTML.checked) {
                        alert('Anda dalam moda penginputan format HTML, fitur ini tidak tereksekusi.');
                        e.preventDefault();
                        return;
                    };
                    let val = e.target.value;
                    let keycmd = e.target.getAttribute('data-keycmd');
                    if(keycmd == 'formatBlock'){
                        dom.execCommand(keycmd,false,this.status.elementParent)
                        this.unwrap(this.status.elemenParent,val);
                    
                    }else{
                        dom.execCommand(keycmd,false,val)
                        // dom.execCommand('formatBlock',false,`<div style="font-size:${val *16}px">`);
                        // this.unwrap(this.status.elementParent,`<span style="font-size=${val *16}px"`);

                    }
                   
                }
            }else{
                span.onclick = (e)=>{
                    if(formatHTML.checked) {
                        alert('Anda dalam moda penginputan format HTML, fitur ini tidak tereksekusi.');
                        e.preventDefault();
                        return;
                    };
                    span.classList.toggle('active');
                    if(['insertOrderedList','insertunOrderedList'].includes(atrib)){
                        
                        dom.execCommand(atrib,false,null)
                        const thisparent = this.status.elemenParent;
                        // //console.log(thisparent);
                        this.unwrap(thisparent);
    
                        // const selection = this.el.doc.getSelection();
                        //     if (selection && selection.rangeCount) {
                        //     const container = selection.getRangeAt(0).commonAncestorContainer;
                        //     this.unwrap(container, this.settings.defParagraphSeparator);
                        // }
                        
                    }else if(atrib=='createLink'){
                        // this.mountFormInsertLink();
                        let prom = prompt('masukkan url','https://edurasa.com');
                        dom.execCommand(atrib,false,prom);
                    }else{
                        dom.execCommand(atrib,false,null)
                    }
                }
            }

        });
        let aksis = $all('[data-aksi]');
        aksis.forEach(el=>{
            if(this[el.getAttribute('data-aksi')]){
                el.onclick = () => {
                    if(formatHTML.checked) {
                        alert('Anda dalam moda penginputan format HTML, fitur ini tidak tereksekusi.');
                        e.preventDefault();
                        return;
                    };
                    this[el.getAttribute('data-aksi')]();
                };
            }else{
                el.onclick = () => {
                    if(formatHTML.checked) {
                        alert('Anda dalam moda penginputan format HTML, fitur ini tidak tereksekusi.');
                        e.preventDefault();
                        return;
                    };
                    //console.log(el.getAttribute('data-aksi'), 'tunggu aja nanti')
                }
            }
        });
        $all('input[type="color"').forEach(el=>{
            el.onchange = (e)=>{
                if(formatHTML.checked) {
                    e.preventDefault();
                    return;
                };
                this.el.doc.execCommand(e.target.getAttribute('data-cmd'),false,e.target.value);
                this.el.doc.body.focus();
            };
            
        });
        let hasElemenContetxt = $all('[data-aksicontext]');
        hasElemenContetxt.forEach(btn=>{
            btn.onclick = (e)=>{
                if(formatHTML.checked) {
                    alert('Anda dalam moda penginputan format HTML, fitur ini tidak tereksekusi.');
                    e.preventDefault();
                    return;
                };
                let aksi = btn.getAttribute('data-aksicontext');
                
                if(this[aksi]){
                    
                    // this[aksi]();
                    this.objekSorotan[aksi] = this[aksi]()
                    
                    if(!$(`#menucontext_${this.settings.id}`).classList.contains('d-none')){
                        $(`#menucontext_${this.settings.id}`).classList.add('d-none')
                    }
                    if(this.objekSorotan.hasOwnProperty('allpg')){
                        let ada = this.objekSorotan.allpg;
                        ada.forEach(n=>{
                            Object.entries(n).forEach(([k,v])=>{
                                this.objekSorotan[k]=v;

                            })
                        })
                        delete this.objekSorotan.allpg;
                    }
                }else{
                    //console.log('belum ada '+aksi);
                }
                if(this.CallBackObjekSorotan){
                    this.CallBackObjekSorotan(this.objekSorotan,this.db);
                }
            }
        });
        if($('input[type="file"')){
            this.upload = $('input[type="file"');

        }
    }
    resetObjectSorotan(obj){
        this.objekSorotan =obj;
        console.log(this.objekSorotan);
        // //console.log('resetObjectSorotan dijalankan dari class ReplaceEditItemSoal',obj,this.objekSorotan);
        
        
    }
    pertanyaan(){
        let dom = document.createElement('div');
            const selection = this.el.doc.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    // let cek = selection.getRangeAt(i).anchorNode.parentNode.closest('body>div');//.innerHTML;
                    // //console.log(i,cek.innerHTML);
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    allpg(){
        let dom = document.createElement('div');
            const selection = this.el.doc.getSelection();
                if (!selection.rangeCount) return;
                
                for (let i = 0; i < selection.rangeCount; i++) {
                    // let cek = selection.getRangeAt(i).anchorNode.parentNode.closest('body>div');//.innerHTML;
                    // //console.log(i,cek.innerHTML);
                    dom.append(selection.getRangeAt(i).cloneContents());
                    
                }
        // if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        let opsi = ['A','B','C','D'];
                let p = [];
        dom.childNodes.forEach((n,i)=>{
            let k = 'opsi'+opsi[i];
            p.push({[k]:n.innerHTML.replace(/(^[A-Da-d].)\s/,'')})
        })
        return p;//.innerHTML;
    }
    ilustrasi(){
        let dom = document.createElement('div');
            const selection = this.el.doc.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    // let cek = selection.getRangeAt(i).anchorNode.parentNode.closest('body>div');//.innerHTML;
                    // //console.log(i,cek.innerHTML);
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    headerpg(){
        let dom = document.createElement('div');
            const selection = this.el.doc.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    kuncijawaban(){
        let dom = document.createElement('div');
            const selection = this.el.doc.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        
        return this.filterString(dom.innerHTML);
    }
    filterString(inputString) {
        var regex = /[ABCD]/;
        var match = inputString.match(regex);
        if (match) {
          return match[0];
        } else {
          return ''; // atau nilai default lainnya jika tidak ada karakter yang cocok
        }
    }
    opsiA(){
        let dom = document.createElement('div');
            const selection = this.el.doc.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    // let cek = selection.getRangeAt(i).anchorNode.parentNode.closest('body>div');//.innerHTML;
                    // //console.log(i,cek.innerHTML);
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    opsiB(){
        let dom = document.createElement('div');
            const selection = this.el.doc.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    // let cek = selection.getRangeAt(i).anchorNode.parentNode.closest('body>div');//.innerHTML;
                    // //console.log(i,cek.innerHTML);
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    opsiC(){
        let dom = document.createElement('div');
            const selection = this.el.doc.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    // let cek = selection.getRangeAt(i).anchorNode.parentNode.closest('body>div');//.innerHTML;
                    // //console.log(i,cek.innerHTML);
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    opsiD(){
        let dom = document.createElement('div');
            const selection = this.el.doc.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    // let cek = selection.getRangeAt(i).anchorNode.parentNode.closest('body>div');//.innerHTML;
                    // //console.log(i,cek.innerHTML);
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    penskoran(){
        let dom = document.createElement('div');
            const selection = this.el.doc.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    // let cek = selection.getRangeAt(i).anchorNode.parentNode.closest('body>div');//.innerHTML;
                    // //console.log(i,cek.innerHTML);
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    pembahasan(){
        let dom = document.createElement('div');
            const selection = this.el.doc.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    // let cek = selection.getRangeAt(i).anchorNode.parentNode.closest('body>div');//.innerHTML;
                    // //console.log(i,cek.innerHTML);
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    materi(){
        let dom = document.createElement('div');
            const selection = this.el.doc.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    // let cek = selection.getRangeAt(i).anchorNode.parentNode.closest('body>div');//.innerHTML;
                    // //console.log(i,cek.innerHTML);
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    levelkognitif(){
        let dom = document.createElement('div');
            const selection = this.el.doc.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    // let cek = selection.getRangeAt(i).anchorNode.parentNode.closest('body>div');//.innerHTML;
                    // //console.log(i,cek.innerHTML);
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        //console.log(dom.innerHTML);
        let data = {
            idbaris:'',
            tipe:'',
            nama_taksonomi:'',
            kko:'',
            levelkognitif:''
            
        };
        if(this.taksonomibloom.length>0){
            let cek = this.taksonomibloom.filter(s=> s.kko.toLowerCase() == dom.innerHTML.toLowerCase());
            if(cek.length>0){
                data = cek[0];
            }
        }
        return data;
    }
    indikatorsoal(){
        let dom = document.createElement('div');
            const selection = this.el.doc.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    // let cek = selection.getRangeAt(i).anchorNode.parentNode.closest('body>div');//.innerHTML;
                    // //console.log(i,cek.innerHTML);
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    refrensi(){
        let dom = document.createElement('div');
            const selection = this.el.doc.getSelection();
                if (!selection.rangeCount) return;
                for (let i = 0; i < selection.rangeCount; i++) {
                    // let cek = selection.getRangeAt(i).anchorNode.parentNode.closest('body>div');//.innerHTML;
                    // //console.log(i,cek.innerHTML);
                    dom.append(selection.getRangeAt(i).cloneContents());
                }
        if(dom.childNodes.length>1 && dom.childNodes[0].nodeType !==3) this.unwrap(dom.childNodes[0]);
        return dom.innerHTML;
    }
    youtube(){
        let prom = prompt("Masukkan link youtube","");
        if(!prom){return};
        let reg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        let url = prom.match(reg)
        let html=`<iframe style="resize: both;" src='https://www.youtube.com/embed/${url[1]}'  frameborder='1' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe><br/><br/>`;
        this.el.doc.execCommand("insertHTML",false,html);
    
    }
    buattabel(){
        let promp = prompt("Masukkan jumlah baris, contoh 3 x 4 (3 baris, 4 kolom) tanpa spasi","3x4");
    if(!promp){return }
    let teks = promp.replace(/\s+/g,"");
    let ang = teks.toLowerCase().split("x");
    let brs = parseInt(ang[0]);
    let cols = parseInt(ang[1]);
    let html = `<table style="border-collapse:collapse;border-spacing:0">`
    for(let i = 0 ; i < brs ; i++){
        html +=`<tr>`
        for (let j = 0 ; j <cols; j++){
            html +=`<td style="border:.5pt solid #000;padding:4px 8px;line-height:1em">teks</td>`
        }
        html +=`</tr>`
    }
    html +=`</table>`;
    this.el.doc.execCommand("insertHTML",null, html);
    
    const thisparent = this.status.elemenParent;
    // //console.log(thisparent);
    this.unwrap(thisparent);
    // this.unwrap(this.el.doc.parentElement)
    }
    pecahan(){
        
        const selection = this.el.doc.getSelection();
        if (selection && selection.rangeCount) {

            let cekselect = selection.getRangeAt(0).cloneContents().childNodes;
            
            if(cekselect.length !== 1) {
                alert('Silakan seleksi bagian teks saja, bukan kosong/lebih dari satu baris.') 
                return
            };
            let teks = cekselect[0].data;
            let arr = teks.split('/');
            if(arr.length == 2){
                let img = new Image();
                let sr = `https://chart.apis.google.com/chart?cht=tx&chl=%7B%5Cfrac%20%7B${encodeURIComponent(arr[0])}%7D%20%7B${encodeURIComponent(arr[1])}%7D%7D`;
                img.src = sr;
                img.style.verticalAlign='middle';
                img.alt = `pecahan ${arr[0]} per ${arr[1]}`;    
                    selection.deleteFromDocument();
                    selection.getRangeAt(0).insertNode(img);
            }
        }
    }
    akarkuadrat(){
        const selection = this.el.doc.getSelection();
        if (selection && selection.rangeCount) {
                const container = selection.getRangeAt(0).commonAncestorContainer;
                let cekselect = selection.getRangeAt(0).cloneContents().childNodes;
                    
                if(cekselect.length == 0) {
                    alert('Tidak ada angka/teks yang dipilih untuk dijadikan format matematika.') 
                    return
                };
                // let teks = cekselect[0].data;
                let teks = "";
                cekselect.forEach(el => {
                    
                    if(el.nodeName=='SUP'){
                        let d = el.innerHTML;
                        teks += `^{${d}}`;
                    }else if(el.nodeName == '#text'){
                        let d = el.data;
                        d = d.replace(/²/g,'^{2}');
                        d = d.replace(/³/g,'^{3}');
                        // d = d.replace(/\s+/g,'\:');
                        teks +=d;
                    }
                })
                let img = new Image();
                let sr = `https://chart.apis.google.com/chart?cht=tx&chl=%7B%5Csqrt%20%7B${encodeURIComponent(teks)}%7D`;
                    img.src = sr;
                    img.style.verticalAlign='middle';
                    img.alt = `akar kuadrat ${teks}`;
                selection.deleteFromDocument();
                selection.getRangeAt(0).insertNode(img);
                selection.collapseToEnd();
            }
    }
    CleanWordFormatting(input) {
        let output = input.replace(/(<[^>]*>)|\t+/gm, ' ');
        //ganti semua breakline
        output = output.replace(/\r?\n|\r/g,'<br>');
        return output;
    }
    akarkubik(){
        const selection = this.el.doc.getSelection();
        if (selection && selection.rangeCount) {
                const container = selection.getRangeAt(0).commonAncestorContainer;
                // this.unwrap(container, this.settings.defParagraphSeparator);
            
                let cekselect = selection.getRangeAt(0).cloneContents().childNodes;
                
                if(cekselect.length == 0) {
                    alert('Tidak ada angka/teks yang dipilih untuk dijadikan format matematika.') 
                    return
                };
                // let teks = cekselect[0].data;
                let teks = "";
                cekselect.forEach(el => {
                    
                    if(el.nodeName=='SUP'){
                        let d = el.innerHTML;
                        teks += `^{${d}}`;
                    }else if(el.nodeName == '#text'){
                        let d = el.data;
                        d = d.replace(/²/g,'^{2}');
                        d = d.replace(/³/g,'^{3}');
                        // d = d.replace(/\s+/g,'\:');
                        teks +=d;
                    }
                })
                let img = new Image();
                let sr = `https://chart.apis.google.com/chart?cht=tx&chl=%7B%5Csqrt%5B3%5D%20%7B${encodeURIComponent(teks)}%7D`;
                    img.src = sr;
                    img.style.verticalAlign='middle';
                    img.alt = `akar kuadrat ${teks}`;
                selection.deleteFromDocument();
                selection.getRangeAt(0).insertNode(img);
                selection.collapseToEnd();
            }
    }
    insertunOrderedList(){
        const dom = this.el.doc;
        dom.execCommand('insertunOrderedList',false,null)
        const thisparent = this.status.elemenParent;
        this.unwrap(thisparent);
    }
    insertOrderedList(){
        const dom = this.el.doc;
        dom.execCommand('insertOrderedList',false,null)
        const thisparent = this.status.elemenParent;
        this.unwrap(thisparent);
    }
    unwrap(container, newChildType = null) {
        const parent = container.parentNode;
        if(parent){
            
            while (container.firstChild) {
                if (newChildType) {
                    container.replaceChild(
                        createElement(newChildType, null, container.firstChild.textContent),
                        container.firstChild
                    );
                }
                parent.insertBefore(container.firstChild, container);
            }
            parent.removeChild(container);
        }else{
            this.el.doc.execCommand('formatBlock',false,'<div>')
        }
        
        // this.displayHTML();
    }
    getCurrentBlock(){
        const select = this.el.doc.getSelection();
        const ancestor = select.getRangeAt(0).commonAncestorContainer;
        const parentnya = select.anchorNode;
        const selection = parentnya.parentNode;
        const type = selection.nodeName.toLowerCase();
        if (type === "body" || type === "html") return;
        const children = this.el.doc.body.childNodes;
        const index = [...children].indexOf(selection);
        const currentBlock = {
            indexParent:[...children].indexOf(this.el.doc.getSelection().anchorNode.parentNode.closest('body>div')),
            elemenParent:this.el.doc.getSelection().anchorNode.parentNode.closest('body>div')||this.el.doc.getSelection().anchorNode.parentNode.closest(type),
            parent:selection.parentElement,
            styleAlign:selection.style.textAlign,
            index:index,
            type:type,
            text: selection.textContent,
            innerHTML :selection.innerHTML,
            // parentInnerHTML:parentnya.parentNode.closest('div').innerHTML,
            // parentOuterHTML:parentnya.parentNode.closest('div').outerHTML,
        };
        // //console.log(currentBlock);
        return currentBlock;
    }
    getCurrentBlockAsal() {
        const selection = this.el.doc.getSelection().anchorNode.parentNode;
        const type = selection.nodeName.toLowerCase();
        if (type === "body" || type === "html") return;
        const children = this.el.doc.body.childNodes;
        let index = 0;
        for (let i = 0; i < children.length; i++) {
            if (children[i] == selection) {
            index = i;
            break;
            }
        }
        const currentBlock = {
            index,
            type,
            text: selection.textContent
        };
        // //console.log(currentBlock);
        return currentBlock;
    }
    applyContextMenu(){
        const klikKanan = this.createContextMenu();
        this.el.dom.appendChild(klikKanan);
    }
    applyContextMenuNotToolbar(){
        const klikKanan = this.createContextMenuNotToolbar();
        this.el.dom.appendChild(klikKanan);
    }
    createContextMenuNotToolbar(){
        /** jenisToolbar: 
         * true: toolbar ditampilkan (default), 
         * false:toolbar disembunyikan, contextMenu include Toolbar
         */
        let jenisToolbar = this.modeToolbar;
        let userFor = this.settings.useFor;
        const contexMenus = createElement('div',{className:'position-absolute rounded d-none bg-info-subtle',id:'menucontext_'+this.settings.id,style:'width:180px;z-index:99999'});
        const contexMenu =createElement('ul',{className:'list-group'});
        
        const matematikaContextMenu = `<li class="list-group-item position-relative  bg-secondary-subtle font10 py-1 border-bottom border-white" onpointerover="this.querySelector('ul').classList.remove('d-none')" onpointerleave="this.querySelector('ul').classList.add('d-none')"> <span>Matematika</span> 
        <ul id="menucontextoverlaymatematika_${this.settings.id}" class="list-group position-absolute start-100 top-0 d-none w-100 font10 d-none"> 
            <li  data-aksicontext="pecahan" data-targettabel="testEditor1" role="button"  class="bg-secondary-subtle list-group-item d-flex font12 justify-content-between align-items-center border-bottom border-white"> <span>Pecahan</span> <div class="p-0 mx-1 d-inline-flex flex-column align-items-center font10" title="pecahan"><span class="border-bottom border-dark">⬚</span><span>⬚</span></div> </li> 
            <li  data-aksicontext="akarkuadrat" role="button"  class="bg-secondary-subtle list-group-item d-flex font12 justify-content-between border-bottom border-white"> <span>Akar Kuadrat</span> <span class="p-0 mx-1" title="Akar Kuadrat">√</span> </li> 
            <li  data-aksicontext="akarkubik" role="button"  class="bg-secondary-subtle list-group-item d-flex font12 justify-content-between border-bottom border-white"> <span>Akar Kubik</span> <span class="p-0 mx-1" title="Buat Tabel">∛</span> </li> 
        </ul> </li>`;
        const formating =`<li class="list-group-item position-relative font10 bg-secondary-subtle py-1 border-bottom border-white" onpointerover="this.querySelector('ul').classList.remove('d-none')" onpointerleave="this.querySelector('ul').classList.add('d-none')">
                    <span>Formating</span>
                    <ul class="list-group position-absolute font10 top-0 start-100 d-none w-100 submenucontext">
                        <li class="list-group-item d-flex justify-content-between py-1 border-bottom border-white bg-secondary-subtle" data-aksicontext="insertOrderedList"  ><div>Numbering</div><div>🔢</div></li>
                        <li class="list-group-item d-flex justify-content-between py-1 border-bottom border-white bg-secondary-subtle" data-aksicontext="insertunOrderedList"><div>Bulleting</div><div>⏺</div></li>
                    </ul>
                </li>
                `;
        let convertKBM=`<li class="list-group-item position-relative bg-secondary-subtle" onpointerover="this.querySelector('ul').classList.remove('d-none')" onpointerleave="this.querySelector('ul').classList.add('d-none')"><span>Konversi</span>
                    <ul class="list-group position-absolute w-100 start-100 top-0 font-10 d-none submenucontext">
                        <li class="list-group-item">Konversi ABC</li>
                        <li class="list-group-item">Konversi ABCD</li>
                    </ul>
                </li>`;
        let sorotTampilanSoal = `<li class="list-group-item position-relative font10 bg-secondary-subtle py-1 border-bottom border-white" onpointerover="this.querySelector('ul').classList.remove('d-none')" onpointerleave="this.querySelector('ul').classList.add('d-none')">
                                <span>Tampilan Soal</span>
                                <ul class="list-group position-absolute w-100 start-100 top-0 font10 d-none submenucontext">
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle d-flex justify-content-between" data-aksicontext="ilustrasi" role="button"><span>Ilustrasi</span></li>
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle d-flex justify-content-between" data-aksicontext="pertanyaan" role="button"><span>Pertanyaan</span></li>
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle d-flex justify-content-between" data-aksicontext="allpg" role="button"><span>Deteksi PG</span></li>
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle d-flex justify-content-between font10 opsijawaban"><div>Opsi Jawaban</div>
                                        <div class="dropdown">
                                            <button class="btn btn-light dropdown-toggle p-0 show" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            </button>
                                                <ul class="dropdown-menu bg-secondary-subtle dropdown-menu-end" data-popper-placement="bottom-end">
                                                    <li class="border-bottom border-white mx-1 font10" data-aksicontext="headerpg" role="button">Header Opsi</li>
                                                    <li class="border-bottom border-white mx-1 font10 d-flex justify-content-between" data-aksicontext="opsiA" role="button"><span>Opsi A</span></li>
                                                    <li class="border-bottom border-white mx-1 font10 d-flex justify-content-between" data-aksicontext="opsiB" role="button"><span>Opsi B</span></li>
                                                    <li class="border-bottom border-white mx-1 font10 d-flex justify-content-between" data-aksicontext="opsiC" role="button"><span>Opsi C</span></li>
                                                    <li class="border-bottom border-white mx-1 font10 d-flex justify-content-between" data-aksicontext="opsiD" role="button"><span>Opsi D</span></li>
                                                    <li class="border-bottom border-white mx-1 font10" data-aksicontext="kuncijawaban" role="button">Kunci Jawaban PG</li>
                                                </ul>
                                        </div>
                                    </li>
                                </ul>
                            </li>`;

        let sorotProperti = `<li class="list-group-item position-relative font10 bg-secondary-subtle py-1 border-bottom border-white" onpointerover="this.querySelector('ul').classList.remove('d-none')" onpointerleave="this.querySelector('ul').classList.add('d-none')">
                                <span>Properti Soal</span>
                                <ul class="list-group position-absolute w-100 start-100 bottom-0 font10 d-none submenucontext">
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle" data-aksicontext="indikatorsoal" role="button">Indikator Soal</li>
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle" data-aksicontext="materi" role="button">Materi Pokok</li>
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle" data-aksicontext="penskoran" role="button">Pembahasan/penskoran</li>
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle" data-aksicontext="refrensi" role="button">Refrensi</li>
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle" data-aksicontext="levelkognitif" role="button">Level Kognitif (Cek KKO)</li>
                                </ul>
                            </li>`;

        if(jenisToolbar){
            contexMenu.appendChild(stringToDom(matematikaContextMenu));
            if(userFor == 'kbm'){
                
            contexMenu.appendChild(stringToDom(convertKBM));
        }else if(userFor == 'banksoal'){
                contexMenu.appendChild(stringToDom(sorotTampilanSoal));
                contexMenu.appendChild(stringToDom(sorotProperti));

            }
        }else{
            contexMenu.appendChild(stringToDom(formating));
            contexMenu.appendChild(stringToDom(matematikaContextMenu));
            if(userFor == 'kbm'){

                contexMenu.appendChild(stringToDom(convertKBM));
            }else if(userFor == 'banksoal'){
                contexMenu.appendChild(stringToDom(sorotTampilanSoal));
                contexMenu.appendChild(stringToDom(sorotProperti));
            }
        }
        contexMenus.appendChild(contexMenu)
        return contexMenus;
    }
    createContextMenu(){
        let bluePrintCM = [];
        let formating = []
        if(!this.modeToolbar){
            formating = [
                {title:'Formating'     ,'data-aksi':'formating',suboverlay:[
                    {title:['Numbering','🔢'],  "data-keycmd":"insertunOrderedList"},
                    {title:['Bulleting','⏺'],  "data-keycmd":"insertOrderedList"},
                ]},
            ]
        }
        if(this.settings.useFor == 'banksoal'){
            bluePrintCM = [ 
                { 'data-aksicontext':'indikatorsoal',   title:'Indikator Soal',   tag:'indikatorsoal' },
                { 'data-aksicontext':'ilustrasi',   title:'Ilustrasi',   tag:'ilustrasi' },
                { 'data-aksicontext':'pertanyaan',  title:'Pertanyaan',  tag:'pertanyaan' },
                { 'data-aksicontext':'allpg',  title:'Deteksi PG',  tag:'deteksipg' },
                { title:'Opsi Jawaban',tag:'opsijawaban', submenu:[
                    { 'data-aksicontext':'headerpg',       title:'Header Opsi' },
                    { 'data-aksicontext':'opsiA',       title:'Opsi A' },
                    { 'data-aksicontext':'opsiB',       title:'Opsi B' },
                    { 'data-aksicontext':'opsiC',       title:'Opsi C' },
                    { 'data-aksicontext':'opsiD',       title:'Opsi D' },
                    { 'data-aksicontext':'kuncijawaban',    title:'Kunci Jawaban PG' },
                ] },
                { 'data-aksicontext':'penskoran',  tag:'penskoran',    title:'Pembahasan' },
                { 'data-aksicontext':'refrensi',   tag:'refrensi',     title:'Refrensi' }
            ]
        }else if(this.settings.useFor == 'kbm'){
            bluePrintCM = [ 
                {title:'convert sebagai PG ABC'     ,'data-aksi':'convertabc'},
                {title:'convert sebagai PG ABCD'    ,'data-aksi':'convertabcd'},
                {title:'convert sebagai Isian'      ,'data-aksi':'convertisian'},
                {title:'buat template PG'           ,'data-aksi':'templatePG'},
                {title:'buat template Isian'        ,'data-aksi':'templatIsian'}
            ]
        }
        const contexMenu = createElement('div',{className:'position-absolute rounded d-none bg-info-subtle',id:'menucontext_'+this.settings.id,style:'width:180px;z-index:99999'});
        let menuTanpaToolbar = "";
        if(!this.modeToolbar){
            formating.forEach(el=>{
                menuTanpaToolbar = `<li class="list-group-item position-relative font10"  onpointerover="document.getElementById('menucontextoverlay_${this.settings.id}').classList.remove('d-none')" onpointerleave="document.getElementById('menucontextoverlay_${this.settings.id}').classList.add('d-none')">`;
                    menuTanpaToolbar+=`<span>${el.title}</span>`;
                    menuTanpaToolbar+=`<ul class="list-group position-absolute start-100 top-0 d-none w-100" id="menucontextoverlay_${this.settings.id}">`
                    el.suboverlay.forEach(d=>{
                        menuTanpaToolbar+=`<li class="list-group-item d-flex justify-content-between"><div>${d.title[0]}</div><div>${d.title[1]}</div></li>`;
                    })
                    menuTanpaToolbar+=`</ul>`;
                menuTanpaToolbar+=`</li>`
            })
        }
        const matematikaContextMenu = `
        <li class="list-group-item position-relative font10" onpointerover="this.querySelector('ul').classList.remove('d-none')" onpointerleave="this.querySelector('ul').classList.add('d-none')">
            <span>Matematika</span>
            <ul id="menucontextoverlaymatematika_${this.settings.id}" class="list-group position-absolute start-100 top-0 d-none w-100 font10 d-none">
                    <li class=" bg-secondary-subtle list-group-item d-flex font12 justify-content-between align-items-center border-bottom border-white mx-1">
                        <span>Pecahan</span>
                        <div class="p-0 mx-1 d-inline-flex flex-column align-items-center font10" data-aksicontext="pecahan" data-targettabel="testEditor1" role="button" title="pecahan"><span class="border-bottom border-dark">⬚</span><span>⬚</span></div>
                    </li>
                    <li class=" bg-secondary-subtle list-group-item d-flex font12 justify-content-between border-bottom border-white mx-1">
                        <span>Akar Kuadrat</span>
                        <span class="p-0 mx-1" data-aksicontext="akarkuadrat" role="button" title="Akar Kuadrat">√</span>
                    </li>
                    <li class=" bg-secondary-subtle list-group-item d-flex font12 justify-content-between border-bottom border-white mx-1">
                        <span>Akar Kubik</span>
                        <span class="p-0 mx-1" data-aksicontext="akarkubik" role="button" title="Buat Tabel">∛</span>
                    </li>
                </ul>
            
        </li>`
        const menuSetIlustrasi =createElement('ul',{className:'list-group'},stringToDom(menuTanpaToolbar+matematikaContextMenu));
            //<li class="list-group-item font12"><span data-aksisoal="tambahan">Another action</span></li>
            bluePrintCM.forEach(item=>{
                    if(item.hasOwnProperty('submenu')){
                        const li = createElement('li',{className:'list-group-item d-flex justify-content-between font10 '+item.tag})
                        let span = createElement('span',{},item.title);
                        li.appendChild(span)
                        const drdown = createElement('div',{className:'dropdown'});
                        const btnToggle = createElement('button',{className:'btn btn-light dropdown-toggle p-0', type:"button",'data-bs-toggle':"dropdown", 'aria-expanded':false});
                        drdown.appendChild(btnToggle);
                        const drdownmenu = createElement('ul',{className:'dropdown-menu bg-secondary-subtle dropdown-menu-end'})
                        item.submenu.forEach(sb=>{
                            drdownmenu.appendChild(createElement('li',{className:'border-bottom border-white mx-1 font10','data-aksicontext':sb['data-aksicontext'],role:'button'},sb.title));
                        })
                        drdown.appendChild(drdownmenu);
                        li.appendChild(drdown);
                        menuSetIlustrasi.appendChild(li);
                    }else{
                        menuSetIlustrasi.appendChild(createElement('li',{className:'list-group-item font10 '+item.tag,'data-aksicontext':item['data-aksicontext'],role:'button'},createElement('span',{},item.title)));
                    }
                


            })
            
            contexMenu.appendChild(menuSetIlustrasi);
        return contexMenu;
    }
    addDatabase(db){
        this.db = db;
    }
    addTaksonomiBloom(db){
        this.taksonomibloom = db;
    }
    addCallBackObjekSorotan(cb){
        // //console.log('this.addCallBack didaftarkan')
        this.CallBackObjekSorotan = cb;
    }
    addControlObjekSorotan(param){
        this.ControlObjekSorotan = param
    }
    callSimpanItemSoal(datatest){
        //console.log(datatest);
        return datatest()
    }
    addcallSimpanItemSoal(datatest){
        //console.log(typeof datatest);
        this.callSimpanItemSoal = datatest
    }

}
