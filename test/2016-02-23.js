/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-02-23 09:57:13
 * @version $Id$
 */

//原型链
// function Foo() {
//     this.value = 42;
// }

// Foo.prototype = function() {
//     method: function() {}
// }

// function Bar() {}

// Bar.prototype = new Foo();
// Bar.prototype.foo='Hello World';

// Bar.prototype.constructor=Bar;

// var test=new Bar();


// function foo() {
//     this.add = function(x, y) {
//         return x + y;
//     }
// }

// foo.prototype.add = function(x, y) {
//     return x + y + 10;
// }

// Object.prototype.substract = function(x, y) {
//     return x - y;
// }

// var f = new foo();
// alert(f.add(1,3));// 4
// alert(f.substract(2,1)); 1

//  // hasOwnProperty 
// Object.prototype.bar=1;
// var foo={
// 	goo:undefined
// };
// alert(foo.bar); // 	1

// alert('bar' in foo); // true

// alert(foo.hasOwnProperty('bar')); // false
// alert(foo.hasOwnProperty('goo')); // true

// var foo={
// 	hasOwnProperty:function(){
// 		return false;
// 	},
// 	bar:'Here be dragons'
// };
// alert(foo.hasOwnProperty('bar'));  // false
// alert({}.hasOwnProperty.call(foo,'bar'));  // true

// Object.prototype.bar=1;
// var foo={moo:2};
// for(var i in foo){
// 	console.log(i);
// } // bar moo

// for(var i in foo){
// 	if(foo.hasOwnProperty(i)){
// 		console.log(i);
// 	}
// }


// 对象
// console.log(false.toString());  // false 
// console.log([1, 3, 4].toString());  // 1,3,4

// function Foo() {}  
// Foo.bar = 1;
// console.log(Foo.bar); // 1

//console.log(2.toString());  // 出错:SyntaxError

// console.log(2..toString());
// console.log(2 .toString());
// console.log((2).toString());

// var foo={name:'kitten'}
// console.log(foo.name); // kitten
// console.log(foo['name']); // kitten

// var get='name';
// console.log(foo[get]); // kitten

// console.log(foo.1234);  // SyntaxError
// console.log(foo['1234']); // undefined 

var obj={
	bar:3,
	baz:4,
	foo:2
};
obj.bar=undefined;
obj.baz=null;
delete obj.foo;

for(var i in obj){
	if(obj.hasOwnProperty(i)){
		console.log(i);
	} // bar baz
}












