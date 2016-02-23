/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-02-23 09:57:13
 * @version $Id$
 */

//原型链
function Foo() {
    this.value = 42;
}

Foo.prototype = function() {
    method: function() {}
}

function Bar() {}

Bar.prototype = new Foo();
Bar.prototype.foo='Hello World';

Bar.prototype.constructor=Bar;

var test=new Bar();


function foo() {
    this.add = function(x, y) {
        return x + y;
    }
}

foo.prototype.add = function(x, y) {
    return x + y + 10;
}

Object.prototype.substract = function(x, y) {
    return x - y;
}

var f = new foo();
alert(f.add(1,3));// 4
alert(f.substract(2,1)); 1

 // hasOwnProperty 
Object.prototype.bar=1;
var foo={
	goo:undefined
};
alert(foo.bar); // 	1

alert('bar' in foo); // true

alert(foo.hasOwnProperty('bar')); // false
alert(foo.hasOwnProperty('goo')); // true

var foo={
	hasOwnProperty:function(){
		return false;
	},
	bar:'Here be dragons'
};
alert(foo.hasOwnProperty('bar'));  // false
alert({}.hasOwnProperty.call(foo,'bar'));  // true

Object.prototype.bar=1;
var foo={moo:2};
for(var i in foo){
	console.log(i);
} // bar moo

for(var i in foo){
	if(foo.hasOwnProperty(i)){
		console.log(i);
	}
}
