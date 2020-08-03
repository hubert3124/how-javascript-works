const list = [1, 2, 3, 4, 5, 6];

// filter
function forFilter(list: any[], predicate: (...params) => boolean ) {
  const filteredList = [];
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) {
      filteredList.push(list[i]);
    }
  } 
  return filteredList;
}

const forFilterResult = forFilter(list, (a) => a % 2 === 0);
console.log('forFilter test');
console.log(forFilterResult);

// iterator
function myEach(list: any[], iter: (...params) => void) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }
  return list;
}

function myFilter(list: any[], predicate: (...params) => boolean) {
  const filteredList = [];
  myEach(list, (value) => {
    if (predicate(value)) {
      filteredList.push(value);
    }
  });
  return filteredList;
}

const myFilterResult = myFilter(list, (a) => a % 2 === 0);
console.log('myfilter test');
console.log(myFilterResult);

function myMap(list: any[], mapper: (...params) => any) {
  let newList = [];
  myEach(list, (value) => newList.push(mapper(value)));
  return newList;
}

const myMapResult = myMap(list, (a) => a*2);
console.log('myMap test');
console.log(myMapResult);
