## JavaScript 概念部分
#### 七个去伪存真的 JavaScript 面试题
1、创建JavaScript对象的两种方法是什么？方法1：
```javascript
var myCar=new Object();
myCar.make = "Ford";
myCar.model = "Mustang";
myCar.year = "1969"
```
方法2：
```javascript
var myHonda = {color: "red", wheels:4, engine: {cylinders: 4, size: 2.2}};
```
2、如何创建数组？方法1：
```javascript
var arr = new Array(arrayLength);
var arr = Array(arrayLength);
```
方法2：
```javascript
var arr = [];
```
3、什么是变量提升(Bariable Hoisting)?<br>
变量提升指的是，无论是哪里的变量在一个范围内声明的，那么JavaScript引擎会将这个声明移到范围的顶部。如：
```javascript
function foo(){
// 此处省略若干代码
var a = "abc";
}
```
实际上会这样运行代码
```javascript
function foo(){
var a;
// 此处省略若干代码
a = "abc";
}
```
4、全局变量有什么风险，以及如何保护代码不受干扰？<br>
全局变量的危险之处在于其他人可以创建相同名称的变量，覆盖正在使用的变量。方法1：创建一个包含其他所有变量的全局变量：
```javascript
var applicationName = {};
```
当需要创建一个全局变量的时候，将其附加到对象上即可。
```javascript
applicationName.myVariable = "abc";
```
方法2：将所有的代码封装到一个自动执行的函数中，所有声明的变量都声明在该函数的范围内。
```javascript
(function(){
var a = "abc";
})();
```
5、如何通过JavaScript对象中的成员变量迭代？
```javascript
for(var prop in obj){
// bonus points for hasOwnProperty
if(obj.hasOwnProperty(prop)){
// do something here
}
}
```
6、什么是闭包(Closure)? <br>
    闭包在很多语言都具备特性，闭包主要涉及到几个js的其它特性:作用域链，垃圾(内存)回收机制，函数嵌套等等。
在理解闭包之前，最好先理解一下作用域链的含义。简单来说，作用域链就是函数在定义的时候创建的，用于寻找使用到的变量的一个索引。它内部的规则是，把函数自身的本地变量放在最前面，把自身的父级函数中的变量放在其次，把再高一级函数中的变量放在更最后，以此类推直至全局对象为止。当函数中需要查询一个变量的值的时候，js解释器会去作用域链查找，从最前面的本地变量中先找，如果没有找到对应的变量，则到下一级的链上找，一旦找到了变量，则不再继续，如果找到最后也没找到需要的变量，则解释器返回undefined。
    了解了作用域链，我们再来看看js的内存回收机制，一般来说，一个函数在执行的时候，会给其中定义的变量划分内存空间保存，以备后面的语句使用，等到函数执行完毕返回了，这些变量就被认为没用了，对应的空间就被回收了。下次再执行此函数的时候，所有的变量又回到最初的状态，重新赋值使用。但是如果这个函数内部又嵌套了另一个函数，而这个函数是有可能在外部被调用到的。并且这个内部函数又使用了外部函数的某些变量的话，这种垃圾回收机制就会出现问题。如果外部函数返回后，又直接调用了内部函数，那么内部函数将无法读取到他所需的外部函数中变量的值了。所以js解释器在遇到函数定义的时候，会自动把函数和他可能使用的变量(包括本地变量和父级和祖先级函数的变量(自由变量))一起保存起来。也就是构建了一个闭包，这些变量将不会被内存回收期所回收，只有当内部的函数不可能被调用以后(例如被删除了，或者没有了指针)，才会销毁这个闭包，而没有任何一个闭包引用的变量才会被下一次内存回收启动时所回收。
    也就是说，有了闭包，嵌套的函数结构才可以运作，这也是符合我们的预期的。
    然后，闭包也有一些特性，却往往让程序员觉得很难理解。看看下面一段代码：
    代码1：
```javascript
var result=[];
function foo(){
    var i = 0;
    for(;i<3;i=i+1){
        result[i]=function(){
            alert(i);
        }
    }
};
foo();
result[0]();   // 3
result[1]();   // 3
result[2]();   // 3:
```
这段代码中，程序员希望foo函数中的变量i被内部循环的函数使用，并且能分别获得他们的索引，而实际上，只能获得该变量最后保留的值，也就是说，闭包中所记录的自由变量，只是对这个变量的一个引用，而非变量的值，当这个变量被改变了，闭包里获取的变量值，也会被改变。
解决方法之一，是让内部函数在循环创建的时候立即执行，并且捕捉到当前的索引值，然后记录在自己的一个本地变量中。然后利用返回函数的方法，重写内部函数，让下一次调用的时候，返回本地变量的值，改进后的代码：
```javascript
var result=[];
var i=0;
for(;i<3;i=i+1){
    result[i]=(function(j){
        return function(){
            alert(j);
        };
    })(i);
};
foo();
result[0];   // 0
result[1];   // 1
result[2];   // 2
```
    这里用到了另外两个技术，立即调用的匿名函数和返回函数。<br><br>
    代码2：
```javascript
window.onload = function () {
    var result = f1();
    result(); // 999
    nAdd();
    result(); // 1000
}
function f1() {
    var n = 999;
    nAdd = function () {
        n += 1;
    }
    function f2() {
        alert(n);
    }

    return f2;
}
```
    代码3：
```javascript
var name = "The Window";
var object = {
    name: "My Object",

    getNameFunc: function () {
        return function () {
            return this.name;
        };
    }
};
alert(object.getNameFunc()()); // The Window
```
    代码4：
```javascript
var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function () {
        var that = this;
        return function () {
            return that.name;
        };
    }
}
alert(object.getNameFunc()());   // My Object
```

7、JavaScript 单元测试

##### JavaScript typeof 返回的数据类型
```javascript
// typeof 返回类型有5种，number boolean object function undefined
        document.write("typeof(1):" + typeof (1) + "<br>");     // number
        document.write("typeof(NaN)" + typeof (NaN) + "<br>");   // number
        document.write("typeof(Number.MIN_VALUE)" + typeof (Number.MIN_VALUE) + "<br>");   // number
        document.write("typeof(123)" + typeof (123) + "<br>");   // number
        document.write("typeof(true)" + typeof (true) + "<br>");  // boolean
        document.write("typeof(window)" + typeof (window) + "<br>");  // object
        document.write("typeof(document)" + typeof (document) + "<br>"); //object
        document.write("typeof(null)" + typeof (null) + "<br>");   // object
        document.write("typeof(eval)" + typeof (eval) + "<br>");   // function
        document.write("typeof(Date)" + typeof (Date) + "<br>");   // function
        document.write("typeof(sss)" + typeof (sss) + "<br>");     // undefined
        document.write("typeof(undefined)" + typeof (undefined) + "<br>");   // undefined
```

####你需要知道的25个JavaScript面试题 [原文地址](http://www.toptal.com/javascript/interview-questions) （备注：需要翻墙）



1.What is a potential pitfall with using "typeof bar === 'object'" to determine if "bar" is an object? How can this pitfall be avoided?(使用"typeof bar === 'object'" 判断 bar是object的潜在危险，如何避免)
```javascript
// null also considered an object
var bar = null;
console.log(typeof bar === "object");  // logs true

// 判断是否为对象时，先判断 bar 是否为 null,即可避免
console.log((bar !== null) && (typeof bar === "object")); 

// There are two other things worth nothing:
// First, the above solution will return "false" if "bar" is a function. If you wanted to also return "true" for functions, you could amend the above solution to be:
console.log((bar !== null) && ((typeof bar === "object") || (typeof bar === "function")));

// Second, the above solution will return "true" if "bar" is an array. If you want to also false for arrays, you could amend the above solution to be:
console.log((bar !== null) && (typeof bar === "object"));  // true
console.log((bar !== null) && (typeof bar === "object") && (toString.call(bar) !== "[object Array]")); // false

// jquery
console.log((bar !== null) && (typeof bar === "object") && (!$.isArray(bar)));
```















































    
    
    
    
    
    
    
    
    
    
    
