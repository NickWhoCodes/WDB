var array = [1,1, 1];

function printReverse(list) {
    for(i=1; i<=list.length; i++) {
        console.log(list[list.length - i]);
    }
}
printReverse(array);

function isUniform(list) {
    var first = array[0];
    for(i=1; i<list.length; i++) {
        if(list[i] !== first) {
            return false;
        }
    }
    return true;
}
isUniform(array);

function sumArray(list) {
    for(i=0; i<list.length; i++) {
        var total = 0;
        total += list[i];
    }
    console.log(total);
}
sumArray(array);
