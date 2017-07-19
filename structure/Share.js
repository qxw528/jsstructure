/**
 * Created by qiusir on 16-6-23.
 */
//=======================享元模式==========================

var Model = function (sex) {
    this.sex = sex;
};

Model.prototype.taskPhoto = function () {
    console.log('sex='+this.sex+' underwear='+this.underwear);
}

var maleModel = new Model('male'),femaleModel = new Model('female');

for( var i=1;i<=50;i++){
    maleModel.underwear = 'underwear'+i;
    maleModel.taskPhoto();
};

for(var j=1;j<=50;j++){
    femaleModel.underwear = 'underwear'+i;
    femaleModel.taskPhoto();
}
//============================文件上传============================
var id = 0;

window.startUpload = function (uploadType,files) {
    for(var i=0,file;file = files[i++];){
        var uploadObj = new Upload(uploadType,file.fileName,file.fileSize);
        uploadObj.init(id++);
    }
};

var upload = function (uploadType,fileName,fileSize) {
    this.uploadType = uploadType;
    this.fileName = fileName;
    this.fileSize = fileSize;
    this.dom = null;
};

Upload.prototype.init = function (id) {
    var that = this;
    this.id = id;
    this.dom = document.createElement('div');
    this.dom.innerHTML = '<span>文件名称:'+this.fileName+', 文件大小：'+this.fileSize+'</span>'+'<button class="delFile">删除</button>';
    this.dom.querySelector('.delFile').onclick = function () {
        this.delFile();
    }
    document.body.appendChild(this.dom);
};

Uplaod.prototype.delFile = function () {
    if(this.fileSize < 3000){
        return this.dom.parentNode.removeChild(this.dom);
    }
    if(window.confirm('确定要删除该文件吗？'+this.fileName)){
        return this.dom.parentNode.removeChild(this.dom);
    }
};

startUpload('plugin',[{fileName:'1.txt',fileSize:1000},{fileName:'2.html',fileSize:2000},{fileName:'3.txt',fileSize:4000}]);

//==================================享元模式-文件上传==========================
var Upload = function (uploadType) {
    this.uploadType = uploadType;
};

Upload.prototype.delFile = function (id) {
    uploadManager.setExternalState(id,this);

    if(this.fileSize < 3000){
        return this.dom.parentNode.removeChild(this.dom);
    }

    if(window.confirm('确定要删除该文件吗？'+this.fileName)){
        return this.dom.parentNode.removeChild(this.dom);
    }
};

var UploadFactory = (function () {
    var createdFlyWeightObjs = {};

    return {
        create:function (uploadType) {
            if(createdFlyWeightObjs[uploadType]){
                return createdFlyWeightObjs[uploadType];
            }
            return createdFlyWeightObjs[uploadType] = new Upload(uploadType);
        }
    }
});

var uploadManager = (function () {
    var uploadDatebase = {};

    return {
        add:function (id,uploadType,fileName,fileSize) {
            var flyWeightObj = UploadFactory.create(uploadType);

            var dom = document.createElement('div');
            dom.innerHTML = '<span>文件名称:'+this.fileName+', 文件大小：'+this.fileSize+'</span>'+'<button class="delFile">删除</button>';
            dom.querySelector('.delFile').onclick = function () {
                flyWeightObj.delFile(id);
            }
            document.body.appendChild(dom);
            uploadDatebase[id] = {
                fileName:fileName,
                fileSize:fileSize,
                dom:dom
            };
            return flyWeightObj;
        },
        setExternalState:function (id,flyWeightObj) {
            var uploadData = uploadDatebase[id];
            for( var i in uploadData){
                flyWeightObj[i] = uploadData[i];
            }
        }
    }
})();

var id = 0;

window.startUpload = function (uploadType,files) {
    for( var i=0,file;file=files[i++];){
        var uploadObj = uploadManager.add(++id,uploadType,file.fileName,file.fileSize);
    }
}

startUpload('plugin',[{fileName:'1.txt',fileSize:1000},{fileName:'2.html',fileSize:2000},{fileName:'3.txt',fileSize:4000}]);