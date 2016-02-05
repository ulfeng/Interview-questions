/*
 * 第一题
 * @param func
 * @param times
 * @param wait
 * @returns {repeatImp1}
*/
function repeat(func, times, wait) {
    // 不用匿名函数是为了方便调试
    function repeatImp1() {
        var handle,
            _arguments = arguments,
            i = 0;
        handle = setInterval(function () {
            i = i + 1;
            // 到达指定次数取消计时器
            if (i === times) {
                clearInterval(handle);
                return;
            }
            func.apply(null, _arguments);
        }, wait);
    }
    return repeatImp1;
}

//测试用例
var repeatFun = repeat(alert, 4, 3000);
repeatFun("hellworld");
