/**
 * Created by qiusir on 5/11/17.
 */
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
function Person(name) {
    this.name = name;
}

Person.prototype.getName  = function () {
    return this.name;
}

function Author(name,books) {
    Author.superclass.constructor.call(this.name);
    this.books =  books;
}

extend(Author,Person);

Author.prototype.getBooks = function () {
    return this.books;
};

var author  = new Author('wild','hero');
alert(author.getName()+","+author.getBooks());
