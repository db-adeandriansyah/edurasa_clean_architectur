// import { Dropdown } from "bootstrap";
// const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
// [...dropdownElementList].map(dropdownToggleEl => {
//     new Dropdown(dropdownToggleEl);
    
// });

export { PrintCetak }                   from "../controller_features/Printer";
export { EdaToExcel }                   from "../controller_features/excel";
export { print2WordGlobal }             from "../controller_features/htmlWord";
export {CollectionsEdu}                 from "../models/CollectionsEdu";
export { FormatTanggal,umur }           from "../utilities/FormatTanggal";
export {DataKelas}                      from "../controller_features/data-siswa/DataKelas.js";
export {dataSiswaViews}                 from "../views/data-siswa/datasiswa-main.js";
export { tabelDom }                     from "../views/tabel/tableDom.js";
export {ModalConfig}                    from "../controller_features/modal/ModalConfig.js";
export {bodyModeScroll}                 from "../controller_features/modal/mode-tab-scroll.js";
export {TableProperties}                from "../utilities/tableProperties.js";
export {myArray}                        from "../utilities/myArray.js";
export { DataMutasi }                   from "../controller_features/data-siswa/DataMutasi.js";
