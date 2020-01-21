export default function getarrayvalue(original){
    var compressed = [];
    var copy = original.slice(0);

    for (var i = 0; i < original.length; i++){

        var count=0;

        for (var j=0; j < copy.length; j++){
            if (original[i] === copy[j]) {
                count++;
                delete copy[j];
            }
        }

        if (count > 0) {
            var a = new Object();
            a.value = original[i];
            a.count = count;
            compressed.push(a);
        }

    }
    return compressed;
}