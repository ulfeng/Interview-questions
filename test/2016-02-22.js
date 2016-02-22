/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-02-22 10:40:31
 * @version $Id$
 */

// var decimalDigits = 2,
//     tax = 5;

// function add(x, y) {
//     return x + y;
// }

// function subtract(x, y) {
//     return x - y;
// }

// var Calculator = function(decimalDigits, tax) {
//     this.decimalDigits = decimalDigits;
//     this.tax = tax;
// }

// Calculator.prototype = {
//     add: function(x, y) {
//         return x + y;
//     },
//     subtract: function(x, y) {
//         return x - y;
//     }
// };
// var caluc=new Calculator();
// alert(caluc.add(1,5));

// Calculator.prototype = function() {}();
// var Calculator = function(decimalDigits, tax) {
//     this.decimalDigits = decimalDigits;
//     this.tax = tax;
// }
// Calculator.prototype = function() {
//     add = function(x, y) {
//             return x + y;
//         },
//         subtract = function(x, y) {
//             return x - y;
//         }
//     return {
//         add: add,
//         subtract: subtract
//     }
// }();
// alert((new Calculator()).add(1,4));

var BaseCalculator = function() {
    this.decimalDigits = 2;
};

// 使用原型给BaseCalculator扩展两个对象方法
BaseCalculator.prototype.add = function(x, y) {
    return x + y;
}
BaseCalculator.prototype.subtract = function(x, y) {
    return x - y;
};

var Calculator = function() {
    this.tax = 5;
};


// 可以访问到属性值
 Calculator.prototype=new BaseCalculator();
// 不可访问到属性值
// Calculator.prototype = BaseCalculator.prototype;
Calculator.prototype.add=function(x,y){
	return x+y+this.tax;
}
var caluc = new Calculator();
alert(caluc.add(1, 2));


