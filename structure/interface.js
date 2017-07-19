/**
 * Created by qiusir on 5/11/17.
 */
var Interface = function(name, methods) {
    if (arguments.length != 2) {
        throw new Error("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");
    }

    this.name = name;
    this.methods = [];

    for (var i = 0, len = methods.length; i < len; i++) {
        if (typeof methods[i] !== 'string') {
            throw new Error("Interface constructor expects method names to be " + "passed in as a string.");
        }

        this.methods.push(methods[i]);
    }
};

// Static class method.
Interface.ensureImplements = function(object) {
    if (arguments.length < 2) {
        throw new Error("Function Interface.ensureImplements called with " + arguments.length + "arguments, but expected at least 2.");
    }

    for (var i = 1, len = arguments.length; i < len; i++) {
        var interface = arguments[i];

        if (interface.constructor !== Interface) {
            throw new Error("Function Interface.ensureImplements expects arguments" + "two and above to be instances of Interface.");
        }

        for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
            var method = interface.methods[j];

            if (!object[method] || typeof object[method] !== 'function') {
                throw new Error("Function Interface.ensureImplements: object " + "does not implement the " + interface.name + " interface. Method " + method + " was not found.");
            }
        }
    }
};

function PenDynamicMap() {

}
PenDynamicMap.prototype.centerOnPoint = function (num1,num2) {
    this.pointX = num1;
    this.pointY = num2;
};
PenDynamicMap.prototype.zoom = function (zm) {
    this.zoomLayer = zm;
};
PenDynamicMap.prototype.draw = function () {
    return "pointX:" + this.pointX + ";pointY:" + this.pointY + ";zoomLayer:"+this.zoomLayer;
};

var DynamicMapInterface = new Interface('DynamicMapInterface',['centerOnPoint','zoom','draw']);


var DynamicMapRunner = function (mapInstance) {
    Interface.ensureImplements(mapInstance,DynamicMapInterface);
    mapInstance.centerOnPoint(12,34);
    mapInstance.zoom(5);
    mapInstance.draw();
};
var penDynamicMap = new PenDynamicMap();
DynamicMapRunner(penDynamicMap);