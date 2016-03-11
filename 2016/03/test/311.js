/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-11 14:34:58
 * @version $Id$
 */

var obj = {
    a: 1,
    b: function() {
        return this.a;
    }
};

// var a = 2;
var objb = obj.b;

// alert(obj.b());  // 1
// alert(objb()); // 2
// alert(obj.b.call(window));  // 2

function A() {

}

function B(a) {
    this.a = a;
}

function C(a) {
    if (a) {
        this.a = a;
    }
}

A.prototype.a = 1;
B.prototype.a = 1;
C.prototype.a = 2;

// alert(new A());     // [object Object]
// alert(new B());     // [object Object]
// alert(new C(2).a);  // [object Object]

var a = 1;

function b() {
    var a = 2;

    function c() {
        return a;
    }

    return c;
}

alert(b()());  // 2


