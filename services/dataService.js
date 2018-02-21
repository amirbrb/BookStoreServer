const MongoClient = require('mongodb').MongoClient;
const ConnectionString = 'mongodb://admin:admin@ds245218.mlab.com:45218/bookstore';
const Guid = require("guid");

var connect = function(db) {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(ConnectionString, (err, db) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(db.db(db.s.options.dbName));
            }
        });
    });
}

module.exports = {
    getBooks: function(next){
        connect().then((db)=> {
            db.collection('books').find().toArray(function(err, items) {
                if (err)
                    throw err;
                else {
                    var arr = [];
                    arr.push.apply(arr, items)
                    next(arr);
                }
            });
        });
    },
    getBookByISBN: function(isbn, next){
        connect().then((db)=> {
            db.collection('books').findOne({
                ISBN: isbn
            }).then(result => {
                next(result);
            })
            .catch(err => {
                throw err;
            });
        });
    },
    deleteBook: function(isbn, next){
        connect().then((db)=> {
            db.collection('books').deleteOne({
                ISBN: isbn
            }).then(result => {
                next(isbn);
            })
            .catch(err => {
                throw err;
            });
        });
    },
    addBook: function(bookModel, next){
        connect().then((db)=> {
            bookModel.ISBN = Guid.create().value;
            db.collection('books').insertOne(bookModel)
            .then(result => {
                next(bookModel);
            })
            .catch(err => {
                throw err;
            });
        });
    }
}