export function importAll(r) {
    return r.keys().reduce((acc, next) => {
        acc[next.replace("./", "")] = r(next);
        return acc;
        }, {});
}

export const images = importAll(require.context('../img/bg', false, /\.(png|jpe?g|svg|webp)$/));
