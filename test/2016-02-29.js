/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-02-29 10:47:52
 * @version $Id$
 */

// function Counter(start) {
//     var count = start;
//     return {
//         increment: function() {
//             count++;
//         },
//         get: function() {
//             return count;
//         }
//     }
// }

// var foo = Counter(4);
// alert(foo.increment()); // undefined
// alert(foo.get()); // 5

// var foo = new Counter(4);
// foo.hack = function() {
//     count = 1337;
// }

// for (var i = 0; i < 10; i++) {
//     setTimeout(function() {
//         console.log(i);
//     }, 1000);
// }

// for (var i = 0; i < 10; i++) {
//     (function(e) {
//         setTimeout(function() {
//             console.log(e);
//         }, 1000);
//     })(i);
// }

// for (var i = 0; i < 10; i++) {
//     setTimeout((function() {
//         return function() {
//             console.log(e);
//         }
//     })(i), 1000);
// }

// var a=100,
// b=99;
// var s=a+b;
// alert(parseInt(s));

// var n=100;
// function f1(){
//     n=999;
// }
// f1();
// alert(n);

// function a(){
//     var i=0;
//     function b(){
//         alert(i);
//         i++;
//     }
//     return b;
// }
// var c=a();
// c(); // 0
// c(); // 1

function Foo() {
    getName = function() {
        alert(1);
    };
    return this;
}
Foo.getName = function() {
    alert(2);
};
Foo.prototype.getName = function() {
    alert(3);
};
var getName = function() {
    alert(4);
}

function getName() {
    alert(5);
}

// 写出一下的输出
Foo.getName();  // 2
getName();      // 4
Foo().getName() // 1
getName();      // 1

new Foo.getName();  // 2
new Foo().getName();  // 3
new new Foo().getName(); //3
