var list = [1, 2, 3, 4, 5, 6];
// filter
function forFilter(list, predicate) {
    var filteredList = [];
    for (var i = 0; i < list.length; i++) {
        if (predicate(list[i])) {
            filteredList.push(list[i]);
        }
    }
    return filteredList;
}
var forFilterResult = forFilter(list, function (a) { return a % 2 === 0; });
console.log('forFilter test');
console.log(forFilterResult);
// iterator
function myEach(list, iter) {
    for (var i = 0; i < list.length; i++) {
        iter(list[i]);
    }
    return list;
}
function myFilter(list, predicate) {
    var filteredList = [];
    myEach(list, function (value) {
        if (predicate(value)) {
            filteredList.push(value);
        }
    });
    return filteredList;
}
var myFilterResult = myFilter(list, function (a) { return a % 2 === 0; });
console.log('myfilter test');
console.log(myFilterResult);
function myMap(list, mapper) {
    var newList = [];
    myEach(list, function (value) { return newList.push(mapper(value)); });
    return newList;
}
var myMapResult = myMap(list, function (a) { return a * 2; });
console.log('myMap test');
console.log(myMapResult);
