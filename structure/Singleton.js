/**
 * Created by qiusir on 16-6-22.
 */
//=====================demo 1=======================
var Singleton = function (name) {
    this.name = name;
    this.instance = null;
}

Singleton.prototype.getName = function () {
    return this.name;
}

Singleton.getInstance = function (name) {
    if(!this.instance){
        this.instance = new Singleton(name);
    }
    return this.instance;
}

var a = Singleton.getInstance('sven1');
var b = Singleton.getInstance('sven2');

alert(a === b)

//==================demo 2  透明的单例模式=============================
var Singleton = function (name) {
    this.name = name;
}

Singleton.prototype.getName = function () {
    return this.name;
}

Singleton.getInstance = (function () {
    var instance = null;
    return function (name) {
        if(!instance){
            instance = new Singleton(name)
        }
        return instance;
    }
})();

var a = Singleton.getInstance('sven1');
var b = Singleton.getInstance('sven2');

alert(a === b)

//==================demo 3  透明的单例模式=============================
var CreateDiv = (function () {
    var instance;
    var CreateDiv = function (html) {
        if(instance){
            return instance;
        }
        this.html = html;
        this.init();
        return instance = this;
    };
    CreateDiv.prototype.init = function () {
        var div = document.createElement('div');
        div.innerHTML = this.html;
        document.body.appendChild(div);
    };
    return CreateDiv;
})();

var a = new CreateDiv('sven1');
var b = new CreateDiv('sven2');

alert(a === b)

//==================demo 4  惰性的单例模式=============================

var CreateIframe = (function () {
    var iframe;
    return function () {
        if(!iframe){
            iframe = document.createElement("iframe");
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
        }
        return iframe;
    }
})();

var getSingle = function (fn) {
    var result;
    return function () {
        return result || (result = fn.apply(this,arguments));
    }
};

var createLoginLayer = function () {
    var div = document.createElement('div');
    div.innerHTML = '我是登录浮窗';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
};

var createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').onClick  = function () {
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display = 'block';
};
