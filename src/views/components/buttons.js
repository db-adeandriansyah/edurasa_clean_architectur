function btn(classes,atr,label){
    return `<button class="btn btn-sm py-0 ${classes}" ${atr}>${label}</button>`;
};

function btnPrimary (atr="", label='Label'){
    return btn('border-3 border-top-0 border-start-0 accord-bg border-end-0 border-warning border-bottom rounded-pill',atr,label);
};
function btnSecondary (atr="",label="label"){
    return btn('border-3 border-top-0 border-start-0 mini border-end-0 border-warning border-bottom rounded-pill',atr,label);
}
const buttonEdu = {
    'primary':btnPrimary,
    'secondary':btnSecondary
};
export default buttonEdu;