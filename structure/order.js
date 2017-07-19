/**
 * Created by qiusir on 16-6-24.
 */
//========================职责连模式====================
var order500 = function (orderType,pay,stock) {
    if(orderType === 1 && pay === 500){
        console.log('500元定金预购，得到100优惠券');
    }else{
        return 'nextSuccessor';
    }
};

var order200 = function (orderType,pay,stock) {
    if(orderType === 2 && pay === 500){
        console.log('200元定金预购，得到50优惠券');
    }else{
        return 'nextSuccessor';
    }
};

var orderNormal  = function (orderType,pay,stock) {
    if(stock > 0){
        console.log('普通购买，不优惠券');
    }else{
        console.log('手机库存不足');
    }
};

var Chain = function (fn) {
    this.fn = fn;
    this.successor = null;
};

Chain.prototype.setNextSuccossor = function (successor) {
    return this.successor = successor;
};

Chain.prototype.passRequest = function () {
    var ret = this.fn.apply(this,arguments);
    if(ret === 'nextSuccessor'){
        return this.successor && this.successor.passRequest.apply(this.successor,arguments);
    }
};

var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

chainOrder500.setNextSuccossor(chainOrder200);
chainOrder200.setNextSuccossor(chainOrderNormal);

chainOrder500.passRequest(1,500,true);
chainOrder500.passRequest(2,500,true);
chainOrder500.passRequest(3,500,true);
chainOrder500.passRequest(1,0,false);

//======================AOP=========================
Function.prototype.after = function (fn) {
    var self = this;
    return function () {
        var ret = self.apply(this,arguments);
        if(ret === 'nextSuccessor'){
            return fn.apply(this,arguments);
        }
        return ret;
    }
};

var order  =  chainOrder500.after(chainOrder200).after(chainOrderNormal);

order(1,500,true);
order(2,200,true);
order(1,300,false);