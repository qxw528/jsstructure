/**
 * Created by qiusir on 6/28/17.
 */
function AbstractJqueryAjaxRequest(url,params,ajaxCallback) {
    this.url = url;
    this.params = params;
    this.ajaxCallback = ajaxCallback;
    this.httpType = 'GET';
    this.dataType = 'json';
}

/*AbstractJqueryAjaxRequest.prototype.initConfig = function () {
    this.httpType = 'GET';
    this.dataType = 'json';
    return this;
}*/

AbstractJqueryAjaxRequest.prototype.setPostHttpType = function () {
    this.httpType = 'POST';
    return this;
}


AbstractJqueryAjaxRequest.prototype.setDataType = function (dataType) {
    this.dataType = dataType;
    return this;
}


AbstractJqueryAjaxRequest.prototype.ajaxRequest = function () {
    var ajaxUrl = this.url;
    var ajaxParams = this.params;
    var successAjaxCallback = this.ajaxCallback;
    var ajaxHttpType = this.httpType;
    var ajaxDataType = this.dataType;
    $.ajax({
        url:ajaxUrl,
        data:ajaxParams,
        method:ajaxHttpType,
        dataType:ajaxDataType,
        success:successAjaxCallback
    });
}

function extend(subClass,superClass) {
    var F = function () {

    };
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;

    subClass.superclass = superClass.prototype;
    if (superClass.prototype.constructor == Object.prototype.constructor) {
        subClass.prototype.constructor = superClass;
    }
}


function OrderAjaxRequest(url,params,ajaxCallback) {
    OrderAjaxRequest.superclass.constructor.call(url,params,ajaxCallback);
}

extend(OrderAjaxRequest,AbstractJqueryAjaxRequest);

function addUser(data) {
    alert(data.userId);
}

var orderAjaxRequest = new OrderAjaxRequest('https://jsonplaceholder.typicode.com/posts/1',{},addUser);







