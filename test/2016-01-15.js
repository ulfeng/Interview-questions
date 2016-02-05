// What will the code below output to the console and why?
var arr1="john".split();  // ["j","o","h","n"]
var arr2=arr1.reverse();  // ["n","h","o","j"]
var arr3="jones".split(); // ["j","o","n","e","s"]
// Array.push() 在末尾添加一个或多个元素，并返回长度 
arr.push(arr3);  // 9

// slice() 方法从已有的数组中返回选定的元素
console.log("array 1: length="+arr1.length+" last="+arr1.slice(-1));