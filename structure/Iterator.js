/**
 * Created by qiusir on 16-6-23.
 */
//==================JQuery 迭代器======================
$.each([1,2,3],function (i,n) {
   console.log('当前下标为：'+i);
    console.log('当前值为：'+n);
});
//=========================外部迭代器============================
var each = function (ary,callback) {
    for(var i=0,l=ary.length;i<l;i++){
        callback.call(ary[i],i,ary[i]);
    }
};
each([1,2,3],function (i,n) {
    alert([i,n]);
});

//============================内部迭代器==========================
var compare = function (ary1,ary2) {
    if(ary1.length != ary2.length){
        return false;
    }
    each(ary1,function (i,n) {
        if(ary1[i] !== n){
            return false;
        }
    });
    return true;
};

compare([1,2,3],[1,2,4]);
//===========================外部迭代器============================
var Iterator = function (obj) {
    var current = 0;
    var next = function () {
        current +=1;
    };
    var isDone = function () {
        return current >= obj.length;
    };
    var getCurrentItem = function () {
        return obj[current];
    };
    var length = function () {
        return obj.length;
    };
    return {
        next:next,
        isDone:isDone,
        getCurrentItem:getCurrentItem
    }
};

var compare = function (iterator1,iterator2) {
    if(iterator1.length !== iterator2.length){
        return false;
    }
    while(!iterator1.isDone() && !iterator2.isDone()){
        if(iterator1.getCurrentItem() !== iterator2.getCurrentItem()){
            return false;
        }
        iterator1.next();
        iterator2.next();
    }
    return true;
};
var iterator1 = Iterator([1,2,3]);
var iterator2 = Iterator([1,2,4]);
compare(iterator1,iterator2);
//====================倒序迭代器=====================
var reverseEach = function (ary,callback) {
    for(var l=ary.length-1;l>=0;l--){
        callback(l,ary[l]);
    }
};
reverseEach([1,2,4],function (i,n) {
    console.log(n);
});