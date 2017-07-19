/**
 * Created by qiusir on 16-6-23.
 */
//=====================发布-订阅模式============================
var salesOffices = {};
salesOffices.clientList = {};
salesOffices.listen = function (fn) {
    this.clientList.push(fn);
};
salesOffices.trigger = function () {
    for(var i=0,fn;fn=this.clientList[i++];){
        fn.apply(this,arguments);
    }
};

salesOffices.listen(function (price,squareMeter) {
    console.log('小红de价格='+price);
    console.log('小红de面积='+squareMeter);
});
salesOffices.listen(function (price,squareMeter) {
    console.log('小林de价格='+price);
    console.log('小林de面积='+squareMeter);
});

salesOffices.trigger(200000,88);
salesOffices.trigger(3000000,110);
//==============================优化后===========================
var saleOffices = {};
saleOffices.clientList = {};
saleOffices.listen = function (key,fn) {
    if(!this.clientList[key]){
        this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
};
saleOffices.trigger = function () {
  var key = Array.prototype.shift.call(arguments),
      fns = this.clientList[key];
    if( !fns || fns.length === 0){
        return false;
    }
    for(var i=0,fn;fn=fns[i++];){
        fn.apply(this,arguments);
    }
};
saleOffices.listen('squareMeter88',function (price) {
    console.log('小红de价格='+price);
});
saleOffices.listen('squareMeter110',function (price) {
    console.log('小林de价格='+price);
});
saleOffices.trigger('squareMeter88',2000000);
saleOffices.trigger('squareMeter110',3000000);
//============================event===================================
var event = {
    clientList:[],
    listen:function (key,fn) {
        if(!this.clientList[key]){
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn);
    },
    trigger:function () {
        var key = Array.prototype.shift.call(arguments),fns=this.clientList[key];
        if(!fns || fns.length === 0){
            return false;
        }
        for(var i=0,fn;fn=fns[i++];){
            fn.apply(this,arguments);
        }
    },
    remove:function (key,fn) {
        var fns = this.clientList[key];
        if(!fns){
            return false;
        }
        if(!fn){
            fns && (fns.length =0);
        }else{
            for(var l=fns.length-1;l>=0;l--){
                var _fn = fns[l];
                if(_fn === fn){
                    fns.splice(l,1);
                }
            }
        }
    }
};

var installEvent = function (obj) {
    for( var i in event){
        obj[i] = event[i];
    }
};

var saleOffices = {};
installEvent(saleOffices);

saleOffices.listen('squareMeter88',function (price) {
    console.log('小红de价格='+price);
});
saleOffices.listen('squareMeter110',function (price) {
    console.log('小林de价格='+price);
});
saleOffices.trigger('squareMeter88',2000000);
saleOffices.trigger('squareMeter110',3000000);
saleOffices.remove('squareMeter88',200000000);
saleOffices.trigger('squareMeter88',2200000);
//=======================全局事件的命名冲突======================
var Event = function () {
    var global = this,Event,_default = 'default';
    Event = function () {
        var _listen,
            _trigger,
            _remove,
            _slice = Array.prototype.slice,
            _shift = Array.prototype.shift,
            _unshift = Array.prototype.unshift,
            namespaceCache = {},
            _create,
            find,
            each=function (ary,fn) {
                var ret;
                for(var i=0,l=ary.length;i<l;i++){
                    var n = ary[i];
                    ref = fn.call(n,i,n);
                }
                return ref;
            };
        _listen = function (key,fn,cache) {
            if( !cache[key]){
                cache[key] = [];
            }
            cache[key].push(fn);
        };

        _remove = function (key,cache,fn) {
            if(cache[key]){
                if(fn){
                    for(var i=cache[key].length-1;i>=0;i--){
                        if(cache[key][i] === fn){
                            cache[key].splice(i,1);
                        }
                    }
                }
            }

        };

        _trigger =  function () {
            var cache = _shift.call(arguments),
                key = _shift.call(arguments),
                args = arguments,
                _self = this,
                ret,
                stack = cache[key];
            if(!stack || !stack.length){
                return;
            }
            return each(stack,function () {
                return this.apply(_self,args);
            });
        };

        _create = function (namespace) {
            var namespace = namespace || _default;
            var cache = {},
                offlineStack = [],
                ret = {
                    listen:function (key,fn,last) {
                        _listen(key,fn,cache);
                        if(offlineStack === null){
                            return;
                        }
                        if(last === 'last'){
                            offlineStack.length && offlineStack.pop()();
                        }else{
                            each(offlineStack,function () {
                                this();
                            });
                        }
                        offlineStack = null;
                    },
                    one:function (key,fn,last) {
                        _remove(key,cache,fn);
                    },
                    trigger:function () {
                        var fn,
                            args,
                            _self = this;
                        _unshift.call(arguments,cache)
                        args = arguments;
                        fn = function () {
                            return _trigger.apply(_self,args);
                        };
                        if(offlineStack){
                            return offlineStack.push(fn);
                        }
                        return fn();
                    }
                };
                return namespace?
                    ( namespaceCache[namespace]?namespaceCache[namespace]:namespaceCache[namespace] = ret):ret;
        };
        return {
            create:_create,
            one:function (key,fn,last) {
                var event = this.create();
                event.one(key,fn,last);
            },
            remove:function (key,fn) {
                var event = this.create();
                event.remove(key,fn);
            },
            listen:function (key,fn,last) {
                var event = this.create();
                event.listen(key,fn,last);
            },
            trigger:function () {
                var event = this.create();
                event.trigger.apply(this,arguments);
            }
        };
    }();
    return Event;
}();