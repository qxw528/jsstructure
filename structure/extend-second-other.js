/**
 * Created by qiusir on 5/11/17.
 */
function clone(object) {
    function F() {

    }
    F.prototype = object;
    return new F();
}

var Person = {
    name: 'default name',
    getName:function () {
        return this.name;
    }
};

var Reader = clone(Person);
Reader.books = [];
Reader.getBooks = function () {
    return this.books;
};
Reader.pushBooks = function (book) {
    this.books.push(book);
};
Reader.toStr = function () {
    var string = "";
    for (var i=0,len=this.books.length;i<len;i++){
        string += this.books[i] + ";";
    }
    string += this.name;
};
Reader.name = 'John smith';
Reader.pushBooks("hero");
alert(Reader.toStr());