const rowCols2 = (slot="", slot2="")=>`<div class="row my-2">
<div class="col-md-6">${slot}</div>
<div class="col-md-6">${slot2}</div>
</div>`;
const rows =(addClass=null,slot="")=>`<div class="row ${addClass?addClass:''}">${slot}</div>`;
const cols = (clas="col-md-6", slot="")=>`<div class="${clas}">${slot}</div>`;
const rowCols = {
    'rowCols2':rowCols2,
    'rows':rows,
    'cols':cols
}

export default rowCols;