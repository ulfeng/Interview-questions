## 2016 Baidu trainee

##### 1、写出javascript运行结果：alert(‘5’+5);
// 55

##### 2、写出javascript运行结果：for(var i=0; i<10; i++){} alert(i);
// 10

##### 3、Cookie、sessionStorage、localStorage的区别和联系？
1、localStorage用于持久化的本地存储，除非主动删除，否则数据永远不会过期;<br>
2、sessionStorage用于本地存储一个会话(session)中的数据，关闭浏览器窗口，数据<br>
即删除。<br>
3、cookie支持的数据内容小，8K左右；此外Web Storage 拥有API接口更加丰富。

##### 4、JavaScript call()方法和apply()方法的区别？
call()和apply()方法作用相同，动态改变运行上下文，跨作用域调用函数或方法。<br>
call()方法的第二个参数是依次给将要调用的函数或方法传递给参数;<br>
apply()方法的第二个参数是数组或类数组(arguments);
```javascript
foo.call(this,par1,par2,par3);
// 等价于
foo.apply(this,[par1,par2,par3]);
```

#####　5、什么是 "use strict"?使用它的好处和坏处是什么？
参考：”use strict”（严格模式） 是在ECMAScript5中提出来的，是为javascript<br>
定义了一种不同的解析与执行模型。在严格模式下，ECMAScript3中一些不确定的<br>
行为将得到处理，而且对某些不安全操作也会抛出错误。<br>
（参考《javascript高级程序设计》）严格模式分为全局严格模式和局部严格模式。<br>
好处：（1）、消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;<br>
　　 （2）、消除代码运行的一些不安全之处，保证代码运行的安全；<br>
　　 （3）、提高编译器效率，增加运行速度；<br>
　　 （4）、为未来新版本的Javascript做好铺垫。<br>
坏处：在一个全局环境下使用严格模式，会使得非严格模式下的代码merge后可能出现问题。

##### 6、写一段简单的正则表达式，匹配并取出字符串”https://www.baidu.com/s?cl=3”中的域名部分（注：域名部分非固定）
```javascript
// sorry 不会正则
```

##### 7、用原生javascript编写程序：创建一个ul无序列表元素添加到body中，ul下包含5个li元素，每个li元素包含一个text类型元素，text元素内容可自定义。
```javascript
window.onload = function() {
    var ulNode = document.createElement('ul');
    var bodyNode = document.getElementsByTagName('body');
    bodyNode[0].appendChild(ulNode);
    for (var i = 0; i < 5; i++) {
        var liNode = document.createElement('li');
        var liText = document.createTextNode("li: " + i);
        liNode.appendChild(liText);
        ulNode.appendChild(liNode);
    }
}
```

##### 8、假设有一个基础对象叫“动物”，拥有以下属性：腿的数量、是否有尾巴，有另外一个对象叫“猫”，拥有“动物”对象的属性，并增加一个属性为：动物名称，再增加一个方法，返回动物名称+腿的数量+是否有尾巴的描述，请使用javascript原型链继承来创建以上2个对象。
```javascript
function Animal(leg, tail) {
    this.leg = leg;
    this.tail = tail;
}

function Cat(name, leg, tail) {
    Animal.call(this, leg, tail);
    this.name = name;
    this.getInfo = function() {
        return "Animal's name:" + this.name + ",number of leg:" + this.leg + ", has tail:" + Boolean(this.tail);
    };
}

var cat = new Cat('cat', 3, true);
alert(cat.getInfo()); // cat 3 true
```