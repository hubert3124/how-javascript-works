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
function integer(from, to, step) {
    if (from === void 0) { from = 0; }
    if (to === void 0) { to = Number.MAX_VALUE; }
    if (step === void 0) { step = 1; }
    return function () {
        if (from < to) {
            var result = from;
            from += step;
            return result;
        }
    };
}
// 예시 3)
function element(array, gen) {
    if (gen === void 0) { gen = integer(0, array.length); }
    return function element_generator() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var element_nr = gen.apply(void 0, args);
        if (element_nr !== undefined) {
            return array[element_nr];
        }
    };
}
var my_array = [0, 1, 2];
var nextArrayGeneratorResult = element(my_array);
// console.log(nextArrayGeneratorResult()); // 1
// console.log(nextArrayGeneratorResult()); // 2
// console.log(nextArrayGeneratorResult()); // 3
// console.log(nextArrayGeneratorResult()); // undefined
function property(object, gen) {
    if (gen === void 0) { gen = element(Object.keys(object)); }
    return function property_generator() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var key = gen.apply(void 0, args);
        if (key !== undefined) {
            return [key, object[key]];
        }
    };
}
var my_object = { a: 1, b: 2, c: 3 };
var nextObjGeneratorResult = property(my_object);
// console.log(nextObjGeneratorResult()); // [ 'a', 1 ]
// console.log(nextObjGeneratorResult()); // [ 'b', 2 ]
// console.log(nextObjGeneratorResult()); // [ 'c', 3 ]
// console.log(nextObjGeneratorResult()); // undefined
function collect(generator, array) {
    return function collect_generator() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var value = generator.apply(void 0, args);
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
    var array = [];
    repeat(collect(generator, array));
    return array;
}
function filter(generator, predicate) {
    return function filter_generator() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var value = generator.apply(void 0, args);
        if (value !== undefined && !predicate(value)) {
            return filter_generator.apply(void 0, args);
        }
        return value;
    };
}
var my_third_array = harvest(filter(integer(0, 42), function divisible_by_three(value) {
    return (value % 3) === 0;
}));
console.log('harvest filter integer');
console.dir(my_third_array);
function concat() {
    var generators = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        generators[_i] = arguments[_i];
    }
    var next = element(generators);
    var generator = next();
    return function concat_generator() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (generator !== undefined) {
            var value = generator.apply(void 0, args);
            if (value === undefined) {
                generator = next();
                return concat_generator.apply(void 0, args);
            }
            return value;
        }
    };
}
var integers = [integer(0, 3), integer(10, 13)];
var concatGen = concat.apply(void 0, integers);
for (var i = 0; i < 7; i++) {
    console.log(concatGen());
}
console.log('--------------------------');
var integers2 = [integer(0, 3), integer(10, 13)];
function join(func) {
    var gens = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        gens[_i - 1] = arguments[_i];
    }
    return function join_generator() {
        return func.apply(void 0, gens.map(function (gen) {
            return gen();
        }));
    };
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
var your_array = [2, 4, 6];
var test_map = map(your_array, function (value) {
    if (value !== undefined) { // 제일 중요
        var newValue = value * 3;
        return newValue;
    }
});
console.log(test_map);
/**
 * TODO: 표준 generator를 이용해서 145쪽의 함수들을 구현해보자.
 */ 
