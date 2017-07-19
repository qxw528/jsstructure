/**
 * Created by qiusir on 16-6-24.
 */
//==========================装饰者模式=====================
var plane = {
    fire:function () {
        console.log('发射普通子弹');
    }
};

var missileDecorator = function () {
    console.log('发射导弹');
};

var atomDecroator = function () {
    console.log('发射原子弹');
};

var fire1 = plane.fire;

plane.fire = function () {
    fire1();
    missileDecorator();
};

var fire2 = plane.fire;

plane.fire = function () {
    fire2();
    atomDecroator();
};

plane.fire();

//=======================AOP=============================
Function.prototype.before = function (fn) {
    var _self = this;  //保存原函数的引用
    return function () { //返回包含了原函数和新函数的“代理”函数
        fn.apply(this,arguments); //执行新函数，且保证this不被劫持，新函数接受的参数
                                    //也会原封不动地传入原函数，新函数在原函数之前执行
        return _self.apply(this,arguments); //执行原函数并返回原函数的执行结果
                                            //并且保证this不被劫持
    }
};

Function.prototype.after = function (fn) {
    var _self = this;
    return function () {
        var ret = _self.apply(this,arguments);
        fn.apply(this,arguments);
        return ret;
    }
};

var ajax = function (type,url,param) {
    console.log(param);
};

var getToken = function () {
    return 'Token';
};

ajax = ajax.before(function (type,url,param) {
   param.Token = getToken();
});

ajax('get','http://xxx.com/userinfo',{name:'sven'});

//===============================表单验证============================
Function.prototype.before = function (fn) {
    var _self = this;
    return function () {
        if( fn.apply(this,arguments) === false){ //fn返回false的情况直接return,不再执行后面的原函数
            return;
        }
        return _self.apply(this,arguments);
    }
};

var validate = function () {
    if( username.value === ''){
        return false;
    }
    if(password.value === ''){
        return false;
    }
    return true;
};

var forSubmit = function () {
    var param = {
        username:username.value,
        password:password.value
    }
    ajax('http://xxx.com/login',param);
};

formSubmit = formSubmit.before(validate);

submitBtn.onclick = function () {
    forSubmit();
};