import { createElement, stringToDom } from "../../views/components/doms";
import { previewSoalPilihanGanda } from "../banksoal/viewBankSoal";
function IframeTextEditor(idIframe){
    return createElement("iframe", {
        id: idIframe,
        name: idIframe,
        className: "rich-editor",
        src: "about:blank",
        target: "_parent",
        style:'width:100%;resize:vertical',
        title: "rich-text-editor",
        
    });
}
function ToolbarEditor(idIframe){
    const formCheckHtml = createElement('div',{
        
            className:'form-check form-switch font10 mx-1',
            },stringToDom(`<input class="form-check-input" type="checkbox" role="switch" id="checkdesainmagicsoal_${idIframe}" 
            onchange="(this.checked)?document.getElementById('${idIframe}').contentWindow.document.body.textContent=document.getElementById('${idIframe}').contentWindow.document.body.innerHTML:document.getElementById('${idIframe}').contentWindow.document.body.innerHTML=document.getElementById('${idIframe}').contentWindow.document.body.textContent">
            <label class="form-check-label font10" for="checkdesainmagicsoal_${idIframe}">HTML</label>`
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
        },stringToDom(`<label for="hurufcolor_${idIframe}" class="form-label font8 text-center">Huruf</label>
        <input type="color"  data-cmd="forecolor" class="form-control form-control-color" id="hurufcolor_${idIframe}" value="#563d7c" title="Klik untuk memilih warna huruf">`));
    const LatarWarna = createElement('div',{
            className:'font8 mx-1'
        },stringToDom(`<label for="bgcolor_${idIframe}" class="form-label font8 text-center">Background</label>
        <input type="color" data-cmd="hilitecolor" class="form-control form-control-color" id="bgcolor_${idIframe}" value="#563d7c" title="Klik untuk memilih warna latar">`));
    
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
        span = createElement('span',{className:'p-0 border mx-1', 'data-aksi':'buattabel', 'data-targettabel':`${idIframe}`, "role":"button",title:'Buat Tabel'},stringToDom(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-table" viewBox="0 0 16 16"> <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/> </svg>`));
        wrapInsert.appendChild(span);
        span = createElement('span',{className:'p-0 border mx-1', 'data-aksi':'youtube', "role":"button",title:'Masukkan video Youtube'},stringToDom(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16"> <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/> </svg>`));
        wrapInsert.appendChild(span);
        span = createElement('label',{className:'btn btn-sm mt-2 d-block font10 py-0 border-3 border-bottom rounded-pill border-start-0 border-top-0 border-end-0 btn-secondary border-warning', 'for':`input_${idIframe}`, "role":"button",title:'unggah media'},'Unggah Gambar');
        wrapInsert.appendChild(span);
        span = createElement('input',{className:'d-none',type:'file','id':`input_${idIframe}`,accept:"image/*"});
        wrapInsert.appendChild(span);
        
    
    const wrapMath = createElement('div',{className:'shadow-lg rounded p-1 bg-light text-center m-1'});
        teks = createElement('div',{className:'text-center border-bottom mb-1 text-uppercase font8 fw-bold'},'Matematika');
        wrapMath.appendChild(teks);//createLink
        span = createElement('div',{className:'p-0 border mx-1 d-inline-flex flex-column align-items-center font10',
                'data-aksi':'pecahan', 'data-targettabel':`${idIframe}`,"role":"button",title:'pecahan'});
            let pembilang = createElement('span',{className:'border-bottom border-dark'},'⬚')
            span.appendChild(pembilang);
            pembilang = createElement('span',{},'⬚');
            span.appendChild(pembilang);
        wrapMath.appendChild(span);
        span = createElement('span',{className:'p-0 border mx-1', 'data-aksi':'akarkuadrat', 'data-targetupload':`${idIframe}`, "role":"button",title:'Akar Kuadrat'},'√');
        wrapMath.appendChild(span);
        span = createElement('span',{className:'p-0 border mx-1', 'data-aksi':'akarkubik', 'data-targettabel':`${idIframe}`, "role":"button",title:'Akar kubik/akar pangkat tiga'},'∛');
        wrapMath.appendChild(span);
        const menus = createElement('div',{className:'d-flex mt-2 align-items-stretch bg-secondary-subtle print-hide text-nowrap scrol-h-custom overflow-y-hidden rounded-top'},
            formCheckHtml,
            grupFont,
            wrapParagraph,
            WrapgrupWarna,
            WrapgrupWarna,
            wrapInsert
        )
        // menus.appendChild(formCheckHtml)
        // menus.appendChild(grupFont);
        // menus.appendChild(wrapParagraph);
        // menus.appendChild(WrapgrupWarna);
        // menus.appendChild(WrapgrupWarna);
        // menus.appendChild(wrapInsert);
        return menus;
}
function styleIframe(){
    return createElement('style', { type: 'text/css' }, `body{font-family:arial; font-size:14px;background-color:#fff;border:2px solid #ddd;padding:1rem;margin:0;}; a{cursor: pointer}; `);
}
function contextMenu(idIframe,data){
        const matematikaContextMenu = `<li class="list-group-item position-relative  bg-secondary-subtle font10 py-1 border-bottom border-white" onpointerover="this.querySelector('ul').classList.remove('d-none')" onpointerleave="this.querySelector('ul').classList.add('d-none')"> <span>Matematika</span> 
        <ul id="menucontextoverlaymatematika_${idIframe}" class="list-group position-absolute start-100 top-0 d-none w-100 font10 d-none"> 
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
        let convertKBM=`<li class="list-group-item position-relative bg-secondary-subtle font10 py-1 border-bottom border-white opsijawaban" onpointerover="this.querySelector('ul').classList.remove('d-none')" onpointerleave="this.querySelector('ul').classList.add('d-none')"><span>Konversi</span>
                    <ul class="list-group position-absolute w-100 start-100 top-0 font-10 d-none submenucontext">
                        <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle" role="button" data-aksicontext="convertABC">Konversi ABC</li>
                        <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle" role="button" data-aksicontext="convertABCD">Konversi ABCD</li>
                    </ul>
                </li>`;
        let sorotTampilanSoal = `<li class="list-group-item position-relative font10 bg-secondary-subtle py-1 border-bottom border-white" onpointerover="this.querySelector('ul').classList.remove('d-none')" onpointerleave="this.querySelector('ul').classList.add('d-none')">
                                <span>Tampilan Soal</span>
                                <ul class="list-group position-absolute w-100 start-100 top-0 font10 d-none submenucontext">
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle d-flex justify-content-between" data-aksicontext="ilustrasi" role="button"><span>Ilustrasi</span></li>
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle d-flex justify-content-between" data-aksicontext="pertanyaan" role="button"><span>Pertanyaan</span></li>
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle d-flex justify-content-between opsijawaban"data-aksicontext="allpg" role="button"><span>Deteksi PG</span></li>
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle d-flex justify-content-between font10 opsijawaban">
                                        <div class="dropdown">
                                            <button class="btn btn-light dropdown-toggle p-0 show" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            </button>
                                                <ul class="dropdown-menu bg-secondary-subtle dropdown-menu-end" data-popper-placement="bottom-end">
                                                    <li class="border-bottom border-white mx-1 font10" data-aksicontext="headerpg" role="button">Header Opsi</li>
                                                    <li class="border-bottom border-white mx-1 font10 d-flex justify-content-between" data-aksicontext="opsiA" role="button"><span>Opsi A</span></li>
                                                    <li class="border-bottom border-white mx-1 font10 d-flex justify-content-between" data-aksicontext="opsiB" role="button"><span>Opsi B</span></li>
                                                    <li class="border-bottom border-white mx-1 font10 d-flex justify-content-between" data-aksicontext="opsiC" role="button"><span>Opsi C</span></li>
                                                    <li class="border-bottom border-white mx-1 font10 d-flex justify-content-between" data-aksicontext="opsiD" role="button"><span>Opsi D</span></li>
                                                    
                                                </ul>
                                        </div>
                                        <div>Opsi Jawaban</div>
                                    </li>
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle d-flex justify-content-between font10 opsijawaban">
                                        <div class="dropdown">
                                            <button class="btn btn-light dropdown-toggle p-0 show" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            </button>
                                                <ul class="dropdown-menu bg-secondary-subtle dropdown-menu-end" data-popper-placement="bottom-end">
                                                    <li class="border-bottom border-white mx-1 font10 d-flex justify-content-between" data-aksicontext="kuncijawabanAbjad" role="button">A</li>
                                                    <li class="border-bottom border-white mx-1 font10 d-flex justify-content-between" data-aksicontext="kuncijawabanAbjad" role="button">B</li>
                                                    <li class="border-bottom border-white mx-1 font10 d-flex justify-content-between" data-aksicontext="kuncijawabanAbjad" role="button">C</li>
                                                    <li class="border-bottom border-white mx-1 font10 d-flex justify-content-between" data-aksicontext="kuncijawabanAbjad" role="button">D</li>
                                                    
                                                </ul>
                                        </div>
                                        <div>Kunci Jawaban PG</div>
                                    </li>
                                </ul>
                            </li>`;
        let listlingkupmateri ="";
        data.forEach(n=>{
            listlingkupmateri+=`<li class="border-bottom border-white mx-1 font10 d-flex justify-content-between" data-aksicontext="lingkupmateri" role="button">${n.lingkupmateri}</li>`;
        })
        let sorotProperti = `<li class="list-group-item position-relative font10 bg-secondary-subtle py-1 border-bottom border-white" onpointerover="this.querySelector('ul').classList.remove('d-none')" onpointerleave="this.querySelector('ul').classList.add('d-none')">
                                <span>Properti Soal</span>
                                <ul class="list-group position-absolute w-100 start-100 bottom-0 font10 d-none submenucontext">
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle" data-aksicontext="indikatorsoal" role="button">Indikator Soal</li>
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle" data-aksicontext="materi" role="button">Materi Pokok</li>
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle" data-aksicontext="penskoran" role="button">Pembahasan/penskoran</li>
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle" data-aksicontext="refrensi" role="button">Refrensi</li>
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle" data-aksicontext="levelkognitif" role="button">Level Kognitif (Cek KKO)</li>
                                    <li class="list-group-item py-1 border-bottom border-white bg-secondary-subtle d-flex justify-content-between font10" role="button">
                                        <div class="dropdown">
                                            <button class="btn btn-light dropdown-toggle p-0 show" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            </button>
                                            <ul class="dropdown-menu bg-secondary-subtle dropdown-menu-end" data-popper-placement="bottom-end">
                                            ${listlingkupmateri}
                                            </ul>
                                        </div>
                                    Lingkup Materi
                                    </li>
                                </ul>
                            </li>`;

        // contexMenu.appendChild(stringToDom(sorotTampilanSoal));
        // contexMenu.appendChild(stringToDom(sorotProperti));
        const contexMenu =createElement('ul',{className:'list-group'},stringToDom(formating),stringToDom(matematikaContextMenu),stringToDom(convertKBM),stringToDom(sorotTampilanSoal),stringToDom(sorotProperti));
        const contexMenus = createElement('div',{className:'position-absolute d-none rounded bg-info-subtle',id:'menucontext_'+idIframe,style:'width:180px;z-index:99999'},contexMenu);
        
        // contexMenus.appendChild(contexMenu)
        return contexMenus;
    
}
function previewSoalPilihanGganda(data){
    return previewSoalPilihanGanda(data);
}
const previewBentukSoal = (data)=>{
    if(data.bentuksoalspesifik =='Pilihan Ganda'){
        return previewSoalPilihanGganda(data);
    }
    return 'Belum ada Data'
}
export {IframeTextEditor,ToolbarEditor,styleIframe,contextMenu,previewSoalPilihanGganda,previewBentukSoal};