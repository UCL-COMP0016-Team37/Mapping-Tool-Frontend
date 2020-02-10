export default function getArrayValue(original) {
    let compressed = [];
    let copy = original.slice(0);

    for (var i = 0; i < original.length; i++){

        var count=0;

        for (var j=0; j < copy.length; j++){
            if (original[i] === copy[j]) {
                count++;
                delete copy[j];
            }
        }

        if (count > 0) {
            let a = {};
            a.value = original[i];
            a.count = count;
            compressed.push(a);
        }
    }
    return compressed;
}