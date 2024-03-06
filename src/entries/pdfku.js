let html2pdf;

// import html2pdf from "html2pdf.js/src";

import("html2pdf.js/src").then(module => {
    html2pdf = module.default;
});
export {html2pdf};
// export {html2pdf as default} from "html2pdf.js/src";