// function make_set(array, value = true) {
//   const object = Object.create(null);
//   array.forEach(name => {
//     object[name] = value;
//   });
//   return object;
// }

// const obj = make_set(['a', 'b']);
// console.log(obj);

function curry(func, ...zeroth) {
  return function (...wunth) {
    return func(...zeroth, ...wunth);
  };
}

function makeLog(a, b) {
  console.log(a, b);
}

curry(makeLog, [1, 2, 3])(['a', 'b', 'c']);