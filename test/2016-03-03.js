/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-03 14:12:45
 * @version $Id$
 */
/**
 *@desc: fibonacci
 *@param: count {Number}
 *@return: result {Number} 第count个fibonacci值，计数从0开始
  fibonacci数列为：[1, 1, 2, 3, 5, 8, 13, 21, 34 …]
  则getNthFibonacci(0)返回值为1
  则getNthFibonacci(4)返回值为5
 */
function getNthFibonacci(count) {
    if (count < 0) {
        return 0;
    }
    if (count < 1) {
        return 1;
    }
    var first = 1;
    var second = 1;
    var third = 0;
    for (var i = 2; i <= count; i++) {
        third = first + second;
        first = second;
        second = third;
    }
    return third;
}

// alert(getNthFibonacci(8));

function obj(name) {
    if (name) {
        this.name = name;
    }
    return this;
}
obj.prototype.name = "name2";
var a = obj(name);
var b = new obj();

var data = { a: 1, b: 2, c: 3, d: 4 };
Object.keys(data).filter(function(x) {
    return data[x] > 2;
});


// Should equal 15
// sum(1, 2, 3, 4, 5);
// Should equal 0
// sum(5, null, -5);
// Should equal 10
// sum('1.0', false, 1, true, 1, 'A', 1, 'B', 1, 'C', 1, 'D', 1,   'E', 1, 'F', 1, 'G', 1);
// Should equal 0.3, not 0.30000000000000004
// sum(0.1, 0.2);

function sum() {
	var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return Number(sum);
}

alert(sum('1.0', false, 1, true, 1, 'A', 1, 'B', 1, 'C', 1, 'D', 1,   'E', 1, 'F', 1, 'G', 1));
