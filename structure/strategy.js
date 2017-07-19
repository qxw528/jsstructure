/**
 * Created by qiusir on 16-6-22.
 */
var performanceS = (function () {
    var preformaceS = function () {
    };
    preformaceS.prototype.calculate = function (salary) {
        return salary * 3;
    };
    return preformaceS;
})();

var preformanceA = (function () {
    var preformaceA = function () {

    }
    preformaceA.prototype.calculate = function (salary) {
        return salary * 4;
    }
    return preformaceA;
})();

var preformanceB = (function () {
    var preformaceB = function () {

    }
    preformaceB.prototype.calculate = function (salary) {
        return salary * 5;
    }
    return preformaceB;
})();

var Bonus = (function () {
    var salary,stategy;
    Bonus = function (salay,stategy) {
        salary = salay;
        strategy = stategy;
    };
    Bonus.prototype.getBonus = function () {
        return strategy.calculate(salary);
    };
    return Bonus;
})();

var ps = new performanceS();
var bonus = new Bonus(5,ps);
alert(bonus.getBonus());

/*var Bonus = function () {
    this.salary = null;
    this.strategy = null;
};

Bonus.prototype.setSalary = function (salary) {
    this.salary = salary;
};

Bonus.prototype.getBonus = function () {
    return this.strategy.calculate(this.salary);
};*/

//====================demo 2=============================
var strategies = {
    "S":function (salary) {
      return salary * 4;
    },
    "A":function (salary) {
        return salary * 3;
    },
    "B":function (salary) {
        return salary * 2;
    }
};
var calculateBonus = function (level,salary) {
    return strategies[level](salary);
};

console.log(calculateBonus('S',20000));
console.log(calculateBonus('A',30000));

//=====================demo 2 表单验证=======================
var strategies = {
    isNotEmpty:function (value,errorMsg) {
      if(value == ''){
          return errorMsg;
      }
    },
    minLength:function (value,length,errorMsg) {
        if(value.length < length){
            return errorMsg;
        }
    },
    isMobile:function (value,errorMsg) {
        if(!/(^1[3|5|8][0-9]{9}$)/.test(value)){
            return errorMsg;
        }
    }
};

var Validator = function () {
    this.cache = [];
};

Validator.prototype.add = function (dom,rules) {
    var self = this;
    for(var i=0,rule;rule = rules[i++];){
        (function (rule) {
            var strategyAry = rule.strategy.split(':');
            var errorMsg = rule.errorMsg;

            self.cache.push(function () {
                var strategy = strategyAry.shift();
                strategyAry.unshift(dom.value);
                strategyAry.push(errorMsg);
                return strategies[strategy].apply(dom,strategyAry);
            })
        })(rule)
    }
};

Validator.prototype.start = function () {
    for( var i=0,validatorFunc;validatorFunc = this.cache[i++];){
        var errorMsg = validatorFunc();
        if(errorMsg){
            return errorMsg;
        }
    }
};

var registerForm = document.getElementById('registerForm');
var validatorFunc = function () {
    var validator = new Validator();
    validator.add(registerForm.userName,[{
        strategy:'isNotEmpty',
        errorMsg:'用户名不能为空'
    },{
        strategy:'minLength:6',
        errorMsg:'用户名长度不能小于6位'
    }]);
    validator.add(registerForm.password,[{
        strategy:'minLength:6',
        errorMsg:'用户名长度不能小于6位'
    }]);
    validator.add(registerForm.phoneNumber,[{
        strategy:'isMobile',
        errorMsg:'手机号码格式不正确'
    }]);

    var errorMsg = validator.start();
    return errorMsg;
};

registerForm.onsubmit = function () {
    var errorMsg = validatorFunc();
    if(errorMsg){
        alert(errorMsg);
        return false;
    }
}