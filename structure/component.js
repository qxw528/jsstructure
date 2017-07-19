/**
 * Created by qiusir on 16-6-23.
 */

var Folder = function (name) {
    this.name = name;
    this.files = [];
};

Folder.prototype.add = function (file) {
    this.files.push(file);
};

Folder.prototype.scan = function () {
    console.log('开始扫描文件夹:'+this.name);
    for(var i=0,file,files = this.files;file = files[i++];){
        file.scan();
    }
};
//==================File================================
var File = function (name) {
    this.name = name;
};

File.prototype.add = function () {
    throw new Error('文件下面不能再添加文件');
};

File.prototype.scan = function () {
    console.log('开始扫描文件：'+this.name);
};

var folder = new Folder('学习资料');
var folder1 = new Folder('Javascript');
var folder2 = new Folder('jQuery');

var file = new File('Javascript设计模式与开发实践');
var file1 = new File('精通jQuery');
var file2 = new File('重构与模式');