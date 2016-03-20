## JavaScript

##### JavaScript 数据类型
```html
answer:
    JavaScript 数据类型分为基本类型和对象类型。
    基本类型:String、Number、Boolean、Null、Undefined
    对象类型:object,Array/Date/Function等
```
##### JavaScript 编码规范 [参考地址](https://segmentfault.com/a/1190000002460897#articleHeader4)
```html
 answer:
    1、文件：
        JavaScript 文件使用无 BOM 的 UTF-8 编码。UTF-8 有更广泛的适用性。
        BOM在使用程序或工具处理文件时可能造成不必要的干扰。
    2、结构：
    2.1、缩进
        4个空格做为一个缩进层级，switch下的case和default必须增加一个缩进层级。
    2.2、空格
    2.3、换行
    2.4、语句
        if...else for 不能省略{}
    3、命名
    4、注释
```

##### JavaScript 对象 [参考地址](http://bonsaiden.github.io/JavaScript-Garden/zh/#object.general)
```javascript
JavaScript中所有的变量都可以当作对象，除了两个例外 null 和 undefined 
console.log(false.toString());  // false 
console.log([1, 3, 4].toString());  // 1,3,4

function Foo() {}  
Foo.bar = 1;
console.log(Foo.bar); // 1

一个常见的误解是数字的字面值(literal)不能当作对象使用。这是因为
JavaScript解析器的一个错误，它试图将"点操作符"解析为浮点数字面值的一部分。
console.log(2.toString());  // 出错:SyntaxError
有很多变通的方法可以让数字值看起来像对象。
console.log(2..toString()); // 第二个点号可以正常解析
console.log(2 .toString()); // 注意点号前面的空格
console.log((2).toString());  // 2先被计算


对象作为数据类型
创建一个空对象 {} 
var foo = {}; // 一个空对象

// 一个新对象，拥有一个值为12的自定义属性'test'
var foo = {
    test : 12
}


访问属性
有两种方法可以访问属性，点操作符或者中括号操作符
var foo={name:'kitten'}
foo.name; // kitten
foo['name']; // kitten

var get='name';
foo[get]; // kitten

foo.1234;  // SyntaxError
foo['1234']; // undefined 
两种方法是有效的，但是中括号操作符在下面两种情况下依然有效：
1、动态设置属性
2、属性名不是一个有效的变量名(如属性名中包含空格，或者属性名是JS的关键词)


删除属性
删除属性的唯一方法是使用 delete 操作符；设置属性为 undefined 或者 null 
并不能真正的删除属性，而仅仅是移除了属性和值的关联。
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
可以看出只有 foo 被真正删除了


属性名
var test = {
    'case': 'I am a keyword so I must be notated as a string',
    delete: 'I am a keyword too so me' // 出错：SyntaxError
};
对象的属性名可以使用字符串或者普通字符声明。但是由于 JavaScript 解析器的另一个错误设计，
上面的第二种声明方式在 ECMAScript 5 之前会抛出 SyntaxError 的错误。

这个错误的原因是 delete 是 JavaScript 语言的一个关键词；因此为了在更低版本的 JavaScript 
引擎下也能正常运行， 必须使用字符串字面值声明方式。
```

##### JavaScript 函数声明和表达式
```javascript
函数声明:
function foo(){}
上面的方法会在执行前被解析(hoisted),因此它存在于当前上下位的任意一个地方。
即使在函数定义体的上面被调用也是对的。
foo(); // 正常运行，因为foo在代码运行前已经被创建
function foo(){};


函数赋值表达式：
foo; // undefined
foo(); // 出错
var foo = function(){};
由于 var 定义了一个声明语句，对变量 foo 的解析是在代码运行之前，因此
foo 变量在代码运行时已经被定义过了。
但是由于赋值语句只在运行时执行，因此在相应代码执行之前， foo 的值缺省为 undefined .


命名函数的赋值表达式：
var foo = function bar(){
    bar(); // 正常运行
}
bar(); // 出错：ReferenceError
bar 函数声明外是不可见的，这是因为我们已经把函数赋值给了 foo ;然而在 bar 内部依然可见。
这是由于 JavaScript 的命名处理所致，函数名在函数内部总是可见的。
```

---



---

#### JavaScript 闭包和引用

** 引言 **
闭包是 JavaScript 的一个重要特性，意味着当前作用域总是能够访问外部作用域的变量。<br>
因为函数是 JavaScript 中唯一拥有自身作用域的结构，因此闭包的创建依赖于函数。
```javascript
function Counter(start) {
    var count =start;
    return{
    	increment:function(){
    		count++;
    	},
    	get:function(){
    		return count;
    	}
    }
}

var foo = Counter(4);
foo.increment(); // undefined
foo.get(); // 5
```
Counter()函数返回两个闭包,函数increment和函数get.这两个函数都维持对外部作<br>
用域Counter()的引用,因此总是可以访问此作用域内定义的变量 count 。<br>

** 为什么不可以在外部访问私有变量 **
JavaScript 中不可以对作用域进行引用或赋值,因此没有办法在外部访问count()变量,<br>
唯一的途径就是通过那两个闭包。
```javascript
var foo = new Counter(4);
foo.hack = function() {
    count = 1337;
}
```
上面的代码不会改变定义在 Counter() 中的变量 count 的值，因为 foo.hack 没有定义<br>
在那个作用域中，可能会改变全局变量 count 的值。

** 循环中的闭包 **
一个常见的错误出现在循环中使用闭包，假如我们要在每次循环中调用循环序号。
```javascript
for (var i = 0; i < 10; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
```
上面的代码不会输出数字 0 到 9,而是会输出数字 10 十次。<br>
当 console.log 被调用的时候，匿名函数保持对外部变量的引用，此时 for 循环已经结束，<br>
i 的值被修改成了 10.<br>
为了得到想要的结果，需要在每次循环中创建变量  i 的拷贝。

** 避免引用错误 **
为了正确的获得循环序号，最好使用匿名包裹器(自执行匿名函数)。
```javascript
for (var i = 0; i < 10; i++) {
    (function(e) {
        setTimeout(function() {
            console.log(e);
        }, 1000);
    })(i);
}
```
外部的匿名函数会立即执行，并把 i 作为它的参数，此时函数内 e 变量就拥有了 i  <br>
的一个拷贝。<br>
当传递给 setTimeout 的匿名函数执行时，它就拥有了对 e 的引用，而这个值是不会<br>
被循环改变的。<br>
有另一个方法完成同样的工作；那就是从匿名包装器中返回一个函数。这和上面的代码<br>
效果一样。
```javascript
for (var i = 0; i < 10; i++) {
    setTimeout((function() {
        return function() {
            console.log(e);
        }
    })(i), 1000);
}
```

--






















   
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
2.What will the code below output to the console and why?
```javascript
(function () {
            var a = b = 3;
        })();
        console.log("a defined? " + (typeof a !== "undefined"));
        console.log("b defined? " + (typeof b !== "undefined"));
```
        The answer:
```javascript
        console.log("a defined? " + (typeof a !== "undefined"));  // false
        console.log("b defined? " + (typeof b !== "undefined"));  // true
        // In fact, var a = b = 3: is actually shorthand for:
        // b = 3;
        // var a = b;
        // b ends up being a global variable
```

3.What will the code below output to the console and why?
```javascript
        var myObject = {
            foo: "bar",
            func: function () {
                var self = this;
                console.log("outer func: this.foo = " + this.foo);
                console.log("outer func: self.foo= " + self.foo);
                (function () {
                    console.log("inner func: this.foo = " + this.foo);
                    console.log("inner func: this.foo = " + self.foo);
                }());
            }
        }
        myObject.func();
```
The answer:
```javascript
// The above code will output the following to the console
        // outer func: this.foo = bar
        // outer func: self.foo = bar 
        // inner func: this.foo = undefined
        // inner func: self.foo = bar
        // In the outer function, both "this" and "self" refer to "myobject"
        // In the inner function, "this" no longer refers to "myobject","self" refer to "myobject"
```

4.What is the significance of, and reason for, wrapping the entire content of a JavaScript source
file in a function block?
The answer:
This is an increasingly common practice, employed by many popular JavaScript libraries (jQuery, Node.js, etc.).
This technique creates a closure around the entire contents of the file which, perhaps most importantly, 
creates a private namespace and thereby helps avoid potential name clashes between different JavaScript modules and libraries.
(单独的命名空间，避免命名冲突)。

5.What is the significance, and what are the benefits, of including "use strict" at the 
beginning of a JavaScript source file?<br>
The answer:
    设立“严格模式”的目的，主要有以下几个：
    -消除JavaScript语法的一些不合理、不严谨之处，减少一些怪异模式；
    -消除代码运行的一些不安全之处，保证代码运行的安全；
    -提高编译器效率，增加运行速度；
    -为未来新版本的JavaScript做好铺垫。
    // 进入“严格模式”的标志，是："use strict"
    语法和行为改变：
    -全局变量显式声明..etc..；
    [参考地址](http://blog.csdn.net/airingyuan/article/details/25036297)
    
6.Consider the two functions below. Will they both return the same thing? 
 Why or why not?
```javascript
function foo1() {
            return {
                bar: "hello"
            };
        }

        function foo2() {
            return
            {
                bar: "hello"
            };
        }
        window.onload = function () {
            console.log(foo1());  // bar: "hello"
            console.log(foo2());  // undefined
        }
```
      semicolons(分号) are technically optional in JavaScript 
      
7.What is "NaN"? What is the type? How can you reliably test if a value is 
equal to "NaN"?
```javascript
        // means not a number
        
        // type: number
        // Additionally, "NaN" compared to anything - even itself! - is false:
        window.onload = function () {
            console.log(typeof NaN === "number"); // logs true
            console.log(NaN === NaN); // logs false
        }

        // test if a value is equal to "NaN"
        // 1. isNaN();
        // 2. value !== value  // logs true
```

8.What will the code below output? Explain your answer?
```javascript
        window.onload = function () {
            console.log(0.1 + 0.2);  // 0.30000000000000004
            console.log(0.1 + 0.2 == 0.3); // false
        }
        // 数字在JavaScript中都是浮动精度的处理 
```

9.Discuss possible ways to write a function "isInteger(x)" that determines if "x" is an integer.
```javascript
// With that in mind, the simplest and cleanest pre-ECMAScript-6 solution 
        // (which is also sufficiently robust to return false even if a non-numeric value such as a string or null is passed to the function)
        // would be the following:
        function isInteger(x) {
            return (x^0) === x;
        }

        // the following solution would also work,although not as elegant as the one above:
        function isInteger(x) {
            return Math.round(x) === x;
        }

        // Note that "Math.ceil(x)" Or "Math.floor()" could be used equally well (instead of "Math round()") in
        // the above implementation
        // Or alternatively
        function isInteger(x) {
            return (typeof x === 'number') && (x % 1 === 0);
        }

        // One fairly common incorrect solution is the following:
        function isInteger(x){
            return parseInt(x,10) === x;
        }
        // While this parseInt -based approach will work well for manyvalues of x,once x become quite large,
        // it will fail to work properly.The problem is that parseInt() coerces its first parameter to a string before parseing gigits

        // > String(1000000000000000000000);  '1e+21'
        // > parseInt(1000000000000000000000,10); 1
        // parseInt(1000000000000000000000,10) === 1000000000000000000000;false
```

10.In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?
```javascript
        (function(){
            console.log(1);
            setTimeout(function(){console.log(2)},1000);
            setTimeout(function(){console.log(3)},0);
            console.log(4);
        })();
        // JavaScript 是单线程语言，一些异步事件是在主体事件执行之后才执行的
        // 1,4,3,2
```

11.Write a simple function (less than 80 characters) that returns a boolean indicating whether or not a string is a palindrome.
```javascript
// 判断一个字符串是不是回文
function isPalindrome(str) {
    // replace() 用一些字符串替换另一些字符串，或者替换一个与正则表达式相同的字符串
    // toLowerCase() 把字符串转换为小写
    // /\W/g 全局匹配不可以组成字符串的字符 
    // split(separator,howmany) ,把一个字符串分割成字符串数组
    // separator:字符串或者正则表达式，从该参数指定的地方分割stringObject
    // howmany:指定返回数组的最大长度
    // reverse() 颠倒数组中元素的位置
    // join() 把数组中的元素都放入一个字符串
    str = str.replace(/\W/g, '').toLowerCase();
    return (str == str.split('').reverse().join(''));
}

alert(isPalindrome("rever"));
alert(isPalindrome("$@rever"));
alert(isPalindrome("re$ver"));
alert(isPalindrome("xfsfgds"));
```

12. Write a num method which will work properly when invoked using either syntax below.<br>
 console.log(sum(2,3));  Outputs 5<br>
 console.log(sum(2)(3)); Outputs 5
```javascript
// Method 1
function sum1(x) {
    if (arguments.length == 2) {
        return arguments[0] + arguments[1];
    } else {
        return function(y) {
            return x + y;
        }
    }
}

// alert(sum1(2,3));   outputs 5
// alert(sum1(2)(3));  x=2;y=3 outputs 5

// Method 2
function sum2(x, y) {
    if (y !== undefined) {
        return x + y;
    } else {
        return function(y) {
            return x + y;
        }
    }
}

alert(sum2(2,3));
alert(sum2(2)(3));
```

13.Consider the following code snippet:
```javascript
   for (var i = 0; i < 5; i++){
       var btn = document.createElement('button');
       btn.appendChild(document.createTextNode('Button ' + i));
       btn.addEventListener('click', function(){
           console.log(i);
       })
       document.body.appendChild(btn);
   }
```
(a)What gets logged to the console when the user clicks on "Button 4" and why?<br>
(b)Provide one or more alternate implementations that will work as expected.
```javascript

```

#### jQuery经典面试题及答案精选
##### 1、jQuery的美元符号$有什么作用？
其实美元符号$只是”jQuery”的别名，它是jQuery的选择器，如下代码：
```jquery 
$(document).ready(function(){

});
```
当然你也可以用jQuery来代替$，如下代码：
```jquery
jQuery(document).ready(function(){

});
```
jQuery中就是通过这个美元符号来实现各种灵活的DOM元素选择的，
例如$(“#main”)即选中id为main的元素。<br>
##### 2、body中的onload()函数和jQuery中的document.ready()有什么区别？
onload()和document.ready()的区别有以下两点：<br>
1、我们可以在页面中使用多个document.ready()，但只能使用一次onload()。<br>
2、document.ready()函数在页面DOM元素加载完以后就会被调用，而onload()函数<br>
则要在所有的关联资源（包括图像、音频）加载完毕后才会调用。<br>

##### 3、jQuery中有哪几种类型的选择器？
1、基本选择器：直接根据id、css类名、元素名返回匹配的dom元素。<br>
2、层次选择器：也叫做路径选择器，可以根据路径层次来选择相应的DOM元素。<br>
3、过滤选择器：在前面的基础上过滤相关条件，得到匹配的dom元素。<br>

##### 4、请使用jQuery将页面上的所有元素边框设置为2px宽的虚线？
```jquery
$("*").css("border" , "2px solid dashed");
```

##### 5、当CDN上的jQuery文件不可用时，该怎么办？
为了节省带宽和脚本引用的稳定性，我们会使用CDN上的jQuery文件，<br>
例如google的jquery cdn服务。但是如果这些CDN上的jQuery服务不可用，<br>
我们还可以通过以下代码来切换到本地服务器的jQuery版本：
```javascript
<script type="text/javascript" language="Javascript" src="http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.4.1.min.js "></script>

<script type='text/javascript'>//<![CDATA[

if (typeof jQuery == 'undefined') {

document.write(unescape("%3Cscript src='/Script/jquery-1.4.1.min.js' type='text/javascript' %3E%3C/script%3E"));

}//]]>

</script>
```

##### 6、如何使用jQuery实现点击按钮弹出一个对话框？
```jquery
<script type="text/javascript">
   $(document).ready(function () { 
       $('#Button1').click(function () { 
           alert($('#inputField').attr("value")); 
    }); }); 
</script>
```

##### 7、jQuery中的Delegate()函数有什么作用？
delegate()会在以下两个情况下使用到：<br>
1、如果你有一个父元素，需要给其下的子元素添加事件，
这时你可以使用delegate()了，代码如下：
```jquery
$("ul").delegate("li", "click", function(){
    $(this).hide();
});
```
2、当元素在当前页面中不可用时，可以使用delegate()

##### 8、怎样用jQuery编码和解码URL？
```jquery
encodeURIComponent(url) and decodeURIComponent(url)
```

##### 9、如何用jQuery禁用浏览器的前进后退按钮？
```jquery
<script type="text/javascript" language="javascript">

$(document).ready(function() {

     window.history.forward(1);

     //OR

     window.history.forward(-1);

});

</script>
```




































































    
    
    
    
    
    
    
    
    
    
    
