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

// // var foo = Counter(4);
// // alert(foo.increment()); // undefined
// // alert(foo.get()); // 5

// var foo = new Counter(4);
// foo.hack = function() {
//     count = 1337;
// }

for (var i = 0; i < 10; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}

for (var i = 0; i < 10; i++) {
    (function(e) {
        setTimeout(function() {
            console.log(e);
        }, 1000);
    })(i);
}

for (var i = 0; i < 10; i++) {
    setTimeout((function() {
        return function() {
            console.log(e);
        }
    })(i), 1000);
}