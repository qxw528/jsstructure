/**
 * Created by qiusir on 16-6-24.
 */
//========================适配器==========================
var googleMap = {
    show:function () {
        console.log('开始渲染谷歌地图');
    }
};

var baiduMap = {
    show:function () {
        console.log('开始渲染百度地图');
    }
};

var renderMap = function (map) {
    if( map.show instanceof Function){
        map.show();
    }
};

renderMap(googleMap);
renderMap(baiduMap);

//=======================adapter===========================
var googleMap = {
    show:function () {
        console.log('开始渲染谷歌地图');
    }
};

var baiduMap = {
    display:function () {
        console.log('开始渲染百度地图');
    }
}

var baiduMapAdapter = {
    show:function () {
        return baiduMap.display();
    }
};

var renderMap = function (map) {
    if( map.show instanceof Function){
        map.show();
    }
};

renderMap(googleMap);
renderMap(baiduMapAdapter);

//=================================================================

var getGuangdongCity = function () {
    var guangdongCity = [
        {
            name:'shenzhen',
            id:11
        },{
            name:'guangzhou',
            id:12
        }
    ];
    return guangdongCity;
};

var render = function (fn) {
    console.log('开始渲染广东省地图');
    console.log(JSON.stringify(fn));
};

var guangdongCity = {
    shenzhen:11,
    guangzhou:12,
    zhuhai:13
};

var addressAdapter = function (oldAddressfn) {
    var address = {},
        oldAddress = oldAddressfn();
    for(var i=0,c;c=oldAddress[i++];){
        address[c.name] = c.id;
    }

    return function () {
        return address;
    }
};

render(addressAdapter(getGuangdongCity()));