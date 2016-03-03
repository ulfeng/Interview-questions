## 2016 Alibaba FE

##### 填写内容让下面代码支持a.name = “name1”; b.name = “name2”;
```javascript
function obj(name){
    // code1
}
obj.code2  = "name2";
var a = obj("name1");
var b = new obj;
```
The answer:
```javascript
function obj(name) {
    if (name) {
        this.name = name;
    }
    return this;
}
obj.prototype.name = "name2";
var a = obj(name);
var b = new obj();

```

##### 输出对象中值大于2的key的数组;
```javascript
var data = { a: 1, b: 2, c: 3, d: 4 };
Object.keys(data).filter(function(x) {
    return data[x]>2; 
});
```

##### 请实现一个fibonacci函数，要求其参数和返回值如下所示：
```javascript
/**
 *@desc: fibonacci
 *@param: count {Number}
 *@return: result {Number} 第count个fibonacci值，计数从0开始
  fibonacci数列为：[1, 1, 2, 3, 5, 8, 13, 21, 34 …]
  则getNthFibonacci(0)返回值为1
  则getNthFibonacci(4)返回值为5
 */
```
The answer
```javascript
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
```

##### 页面布局，左边固定，右边自适应
```javascript
.left{
	width:198px;
	height: 198px;
	border:1px solid #000;
	float:right;
}
.right{
    width:auto;
    height:200px;
    margin-right:200px;
    border:1px solid #000;
}
```
