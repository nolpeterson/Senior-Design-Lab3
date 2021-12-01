export function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
        console.log(results[2])
    if (!results) return null;
    if (!results[2]) return '';
    if (results[2].includes("?")){
        results[2] = results[2].substring(0, results[2].indexOf('?'))
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}