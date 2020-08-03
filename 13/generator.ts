// generator의 기본형태

// function factory(factoryParameters) {
//   let generatorState = ''; // init
//   return function generator(generatorParameters) {
//     generatorState = 'update State'; // update State
//     return generatorState; // value
//   };
// }


// 예시 1)
// function counter() {
//   let count = 0;
//   return function counter_generator() {
//     count += 1;
//     return count;
//   };
// }

// const gen = counter();

// console.log(gen());
// console.log(gen());
// console.log(gen());


// 예시 2)
function integer(from = 0, to = Number.MAX_VALUE, step = 1) {
  return function () {
    if (from < to) {
      const result = from;
      from += step;
      return result;
    }
  };
}

// 예시 3)
function element(array, gen:(any?: any[]) => any = integer(0, array.length)) {
  return function element_generator(...args) {
    const element_nr = gen(...args);
    if (element_nr !== undefined) {
      return array[element_nr];
    }
  }
}

const my_array = [0, 1, 2];
const nextArrayGeneratorResult = element(my_array);

// console.log(nextArrayGeneratorResult()); // 1
// console.log(nextArrayGeneratorResult()); // 2
// console.log(nextArrayGeneratorResult()); // 3
// console.log(nextArrayGeneratorResult()); // undefined


function property(object, gen = element(Object.keys(object))) {
  return function property_generator(...args)   {
    const key = gen(...args);
    if (key !== undefined) {
      return [key, object[key]];
    }
  }
}

const my_object = { a: 1, b: 2, c: 3 };
const nextObjGeneratorResult = property(my_object);

// console.log(nextObjGeneratorResult()); // [ 'a', 1 ]
// console.log(nextObjGeneratorResult()); // [ 'b', 2 ]
// console.log(nextObjGeneratorResult()); // [ 'c', 3 ]
// console.log(nextObjGeneratorResult()); // undefined


function collect(generator, array) {
  return function collect_generator(...args) {
    const value = generator(...args);
    if (value !== undefined) {
      array.push(value);
    }
    return value;
  };
}

function repeat(generator) {
  if (generator() !== undefined) {
    return repeat(generator);
  }
}

function harvest(generator) {
  const array = [];
  repeat(collect(generator, array));
  return array;
}

function filter(generator, predicate) {
  return function filter_generator(...args) {
    const value = generator(...args);
    if (value !== undefined && !predicate(value)) {
      return filter_generator(...args);
    }
    return value;
  };
}

const my_third_array = harvest(filter(
  integer(0, 42),
  function divisible_by_three(value) {
    return (value % 3) === 0;
  }
));

console.log('harvest filter integer')
console.dir(my_third_array);

function concat(...generators) {
  const next = element(generators);
  let generator = next();
  return function concat_generator(...args) {
    if (generator !== undefined) {
      const value = generator(...args);
      if (value === undefined) {
        generator = next();
        return concat_generator(...args);
      }
      return value;
    }
  }
}

const integers = [ integer(0, 3), integer(10, 13) ];
const concatGen = concat(...integers);

for (let i = 0; i < 7; i++) {
  console.log(concatGen());
}
console.log('--------------------------');


const integers2 = [ integer(0, 3), integer(10, 13) ];
function join(func, ...gens) {
  return function join_generator() {
    return func(...gens.map(function (gen) {
      return gen();
    }));
  }
}

function add(first, second) {
  if (first !== undefined && second !== undefined) {
    return first + second;
  }
}

// const harvested = harvest(join((value) => value, element(your_array)));

// console.log(harvested);
// console.log(joinGen());

// const integers3 = [ integer(0, 3), integer(10, 13) ];
// const harvested = harvest(join(add, ...integers2));

// console.log(harvested);
function map(array, func) {
  return harvest(join(func, element(array, integer(0, array.length))));
}

const your_array = [2, 4, 6];
const test_map = map(your_array, (value) => {
  if (value !== undefined) {  // 제일 중요
    const newValue = value * 3;
    return newValue;
  }
});
console.log(test_map);
/**
 * TODO: 표준 generator를 이용해서 145쪽의 함수들을 구현해보자.
 */