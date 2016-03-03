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

alert(getNthFibonacci(8));

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
