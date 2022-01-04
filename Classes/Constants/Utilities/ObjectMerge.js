export function mergeObjects(a, b) {
    // console.log("a: " + JSON.stringify(a));
    // console.log("b: " + JSON.stringify(b));
    if (!(typeof a == 'object' || typeof b == 'object')) return (a + b);
    let c = {};
    let aKeys = Object.keys(a);
    // console.log("aKeys: " + aKeys);
    for (let i = 0; i < aKeys.length; i++) {
        let key = aKeys[i];
        if (!b[key]) {
            // console.log("Key: " + key + " in a not in b")
            c[key] = a[key];
            continue;
        }
        // console.log("Key: " + key + " in a and in b");
        c[key] = mergeObjects(a[key], b[key]);
    }
    let bKeys = Object.keys(b);
    for (let i = 0; i < bKeys.length; i++) {
        let key = bKeys[i];
        if (!a[key]) {
            // console.log("Key: " + key + " in b not in a");
            c[key] = b[key];
        }
    }
    // console.log("Returning c == " + JSON.stringify(c));
    return c;
}