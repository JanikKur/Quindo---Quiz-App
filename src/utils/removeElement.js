export function remove(arr, elem) {
    const idx = arr.indexOf(elem);
    if(idx > -1) {
        arr.splice(idx, 1);
    }
    return arr;
}