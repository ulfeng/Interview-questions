# 淘宝UED

### JavaScript方面
题目1：小贤是一个可爱的狗(Dog),它的叫声很好听(WOW),每次看到主人的时候就会乖乖叫一声(yelp)。从这段描述可以得到以下对象：<br>
```javascript
function Dog() {
       this.wow = function() {
               alert(’Wow’);
      }
       this.yelp = function() {
              this.wow();
       }
}
```
小芒和小贤一样，原来也是一条可爱的小狗，可是突然有一天疯了(MadDog)，一看到人就会每隔半秒叫一声(wow)地不停叫唤(yelp)。请根据描述，按示例的形式用代码来实现（提示关键字: 继承，原型，setInterval）。<br>
```javascript
function MadDog() {
    this.yelp = function () {
        var slef = this;
        setInterval(function () {
            self.wow();
        }, 500);
    }
}

MadDog.prototype = new Dog();
// for test
var dog = new Dog();
dog.yelp();
var madDog = new MadDog();
madDog.yelp();
```
题目2：请给Array本地对象增加一个原型方法，它的用途是删除数组条目中重复的条目(可能有多个)，返回值是一个包含被删除的重复条目的新数组。
方法1：新建一个数组
```javascript
Array.prototype.distinct = function() {
  var ret = [];
  for (var i = 0; i < this.length; i++) {
  for (var j = i+1; j < this.length;) {
  if (this[i] === this[j]) {
  ret.push(this.splice(j, 1)[0]);
  } else {
  j++;
  }
 }
 }
 return ret;
}
//for test
alert(['a','b','c','d','b','a','e'].distinct());
```
```javascript
Array.prototype.fun1 = function () {
            var res = [this[0]];
            for (var i = 1; i < this.length; i++) {
                var repeat = false;
                for (var j = 0; j < res.length; j++) {
                    if (this[i] == res[j]) {
                        repeat = true;
                        break;
                    }
                }
                if (!repeat) {
                    res.push(this[i]);
                }
            }
            return res;
        }
        var arr = [2, 2, 3, 4, 4, 'e', 'e', 'd'];
        alert(arr.fun1());
    </script>
```
方法2：先排序，后比较
```javascript
  Array.prototype.unique2 = function () {
            this.sort();//先排序
            var res = [this[0]];
            for (var i = 1; i < this.length; i++) {
                if (this[i] !== res[res.length - 1]) {
                    res.push(this[i]);
                }
            }
            return res;
        }
        var arr = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0]
        alert(arr.unique2());
```
方法3：1.创建一个新的数组存放结果
    2.创建一个空对象
    3.for循环时，每次取出一个元素与对象进行对比，如果这个元素不重复，则把它存放到结果数组中，同时把这个元素的内容作为对象的一个属性，并赋值为1，存入到第2步建立的对象中。
    说明：至于如何对比，就是每次从原数组中取出一个元素，然后到对象中去访问这个属性，如果能访问到值，则说明重复。
```javascript
 Array.prototype.unique3 = function () {
            var res = [];
            var json = {};
            for (var i = 0; i < this.length; i++) {
                if (!json[this[i]]) {
                    res.push(this[i]);
                    json[this[i]] = 1;
                }
            }
            return res;
        }

        var arr = [112, 112, 34, '你好', 112, 112, 34, '你好', 'str', 'str1'];
        alert(arr.unique3());
```
###css方面
使用纯CSS实现未知尺寸的图片(但高宽都小于200px)在200px的正方形容器中水平和垂直居中。
```css
.box {
display: table-cell;
vertical-align:middle;
width:200px;
height:200px;
text-align:center;
/* hack for ie */
*display: block;
*font-size: 175px;
/* end */
border: 5px solid red;
}
.box img {
vertical-align:middle;
}
### html方面
在不使用 border 样式的情况下，画出一条一px高的横线，在不同浏览器的Quirksmode和CSSCompat模式下都保持同一效果。
```html
 <div style="height:1px;overflow:hidden;background:#000"></div>
```


