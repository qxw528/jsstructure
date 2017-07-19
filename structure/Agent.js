/**
 * Created by qiusir on 16-6-22.
 */
//==========================demo 1=====================
var Flower = function () {

};

var xiaoming = {
    sendFlower:function (target) {
        target.receiverFlower(flower);
    }
};

var B = {
    receiverFlower:function (flower) {
        A.receiverFlower(flower);
    }
};

var A = {
    receiverFlower:function (flower) {
        console.log(' 收到花'+flower);
    }
};

xiaoming.sendFlower(B);

//==========================demo 2======================
var Flower = function () {

};

var xiaoming = {
    sendFlower:function (target) {
        target.receiverFlower(flower);
    }
};

var B = {
    receiverFlower:function (flower) {
        A.listenGoodMood(function () {
            A.receiverFlower(flower);
        });
    }
};

var A = {
    receiverFlower:function (flower) {
        console.log('收到花'+flower);
    },
    listenGoodMood:function (fn) {
        setTimeout(function () {
            fn();
        },1000);
    }
};

xiaoming.sendFlower(B);

//=======================图片预加载=====================
var myImage = (function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);

    return function (src) {
        imgNode.src = src;
    }
})();

var proxyImage = (function () {
    var img = new Image();

    img.onload = function () {
        myImage(this.src);
    }

    return function (src) {
        myImage('http://127.0.0.1/images/loading.gif');
        img.src = src;
    }
})();

proxyImage('http://imgcache.qq.com/music/kjddd.jpg');

//===========================================================

var synchronousFile = function (id) {
    console.log('开始同步文件，id为'+id);
};

var proxySynchronousFile = (function () {
    var cache = [],timer;
    return function (id) {
        cache.push(id);
        if(timer){
            return;
        }
        timer = setTimeout(function () {
            synchronousFile(cache.join(','));
            clearTimeout(timer);
            timer = null;
            cache.length = 0;
        },2000);
    }
})();

var checkbox = document.getElementsByTagName('input');
for(var i=0,c;c=checkbox[i++];){
    c.onclick = function () {
        if(this.checked === true){
            proxySynchronousFile(this.id);
        }
    }
};

//=======================缓存代理=======================
var mult = function () {
    console.log('开始计算乘积');
    var a = 1;
    for(var i=0,l=arguments.length;i<l;i++){
        a = a * arguments[i];
    }
    return a;
};

var proxyMult = (function () {
    var cache = {};
    return function () {
        var args = Array.prototype.join.call(arguments,',');
        if(args in cache){
            return cache[args];
        }
        return cache[args] = mult.apply(this.arguments);
    }
})();
//====================计算乘积=====================
var mult = function () {
    var a = 1;
    for( var i=0,l=arguments.length;i<l;i++){
        a = a * arguments[i];
    }
    return a;
};
//======================计算加和========================
var plus = function () {
    var a =  0;
    for(var i=0,l=arguments.length;i<l;i++){
        a = a + arguments[i];
    }
    return a;
};

//=================创建缓存代理的工厂==================================
var createProxyFactory = function (fn) {
    var cache = {};
    return function () {
        var args = Array.prototype.join.call(arguments,',');
        if(args in cache){
            return cache[args];
        }
        return cache[args] = fn.apply(this,arguments);
    }
};

var proxyMult = createProxyFactory(mult),
proxyPlus = createProxyFactory(plus);

alert(proxyMult(1,2,3,4));
alert(proxyMult(1,2,3,4));
alert(proxyPlus(1,2,3,4));
alert(proxyPlus(1,2,3,4));