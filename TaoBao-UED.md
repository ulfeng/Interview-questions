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
```javascript
```
