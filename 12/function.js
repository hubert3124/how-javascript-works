// function make_set(array, value = true) {
//   const object = Object.create(null);
//   array.forEach(name => {
//     object[name] = value;
//   });
//   return object;
// }
// const obj = make_set(['a', 'b']);
// console.log(obj);
function curry(func) {
    var zeroth = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        zeroth[_i - 1] = arguments[_i];
    }
    return function () {
        var wunth = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            wunth[_i] = arguments[_i];
        }
        return func.apply(void 0, zeroth.concat(wunth));
    };
}
function makeLog(a, b) {
    console.log(a, b);
}
curry(makeLog, [1, 2, 3])(['a', 'b', 'c']);
