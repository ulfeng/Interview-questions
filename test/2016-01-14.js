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

// alert(isPalindrome("rever"));  true
// alert(isPalindrome("$@rever")); true
// alert(isPalindrome("re$ver"));  true
// alert(isPalindrome("xfsfgds"));  false

// Write a num method which will work properly when invoked using either syntax below.
// console.log(sum(2,3));  Outputs 5
// console.log(sum(2)(3)); Outputs 5

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

// alert(sum2(2,3));
// alert(sum2(2)(3));

// Consider the following code snippet:
// 1.What gets logged to the console when the user clicks on "Button 4" and why?
// 2.Provide one or more alternate implementations that will work as expected.
function getBtn(){
	for(var i=0;i<5;i++){
		var btn=document.createElement('button');
		btn.appendChild(document.createTextNode('Button '+i));
		btn.addEventListener('click',function(){
			alert(i);
		});

		// document.body 需要放在<body>后面，不然会报错
		document.body.appendChild(btn);
	}
}

// getBtn();

// function getBtn1(){
// 	for(var i=0;i<5;i++){
// 		var btn=document.createElement('button');
// 		btn.appendChild(document.createTextNode('Button '+i));
// 		btn.addEventListener('click',(function(i){
//             alert(i);
// 		})(i));
// 		document.body.appendChild(btn);
// 	}
// }

// getBtn1();

function getBtn2(){
    for(var i=0;i<5;i++){
        var btn=document.createElement('button');
        btn.appendChild(document.createTextNode('Button ')+i);
        (function(i){
            btn.addEventListener('click',function(){alert(i);})
        })(i);
    }
}

getBtn2();

// Or, wo could replace the for loop with a call to the array object's 
// native  forEach method
function getBtn3(){
    ['a','b','c','d','e'].forEach(function(value,i){
        var btn=document.createElement('button');
        btn.appendChild(document.createTextNode('Button '+i));
        btn.addEventListener('click',function(){
            alert(i);
        });
        document.body.appendChild(btn);
    })
}

getBtn3();




