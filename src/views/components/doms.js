
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

function qs(selector, context = document) {
    return context.querySelector(selector);
};

function qsAll(selector, context = document) {
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
export {debounce,qs,qsAll,stringToDom,createElement};