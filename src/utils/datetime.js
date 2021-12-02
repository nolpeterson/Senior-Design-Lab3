export function createDatetime(seconds) {
    var t = new Date(Date.UTC(1970, 0, 1));
    t.setUTCSeconds(seconds);
    return t.toLocaleString();
}

export function createDateRange(seconds, length) {
    var t = new Date(Date.UTC(1970, 0, 1));
    t.setUTCSeconds(seconds);
    var t2 = new Date(Date.UTC(1970, 0, 1));
    t2.setUTCSeconds(seconds + length * 60);
    return t.toLocaleString() + " - " + t2.toLocaleString();
}

export function createUpdatedDateRange(first, second) {
    var t = new Date(Date.UTC(1970, 0, 1));
    t.setUTCSeconds(first);
    var t2 = new Date(Date.UTC(1970, 0, 1));
    t2.setUTCSeconds(second);
    return t.toLocaleString() + " - " + t2.toLocaleString();
}