/**
 * Created by qiusir on 16-6-22.
 */
//=====================demo 1=======================
var CreateDiv = function (html) {
    this.html = html;
    this.init();
};

CreateDiv.prototype.init = function () {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
}

var ProxySingletonCreateDiv = (function () {
    var instance;
    return function (html) {
        if(!instance){
            instance = new CreateDiv(html);
        }
        return instance;
    }
})();

var a = new ProcessingInstruction('sven1');
var a = new ProcessingInstruction('sven2');

alert(a === b)

//===================使用闭包封装私有变量====================
var user = (function () {
    var _name = 'sven',_age = 29;
    return{
        getUserInfo:function () {
            return _name +"-"+_age;
        }
    }
})();