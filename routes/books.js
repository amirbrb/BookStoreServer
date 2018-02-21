const express = require('express');
const router = express.Router();
const dataService = require('../services/dataService');


router.use(function(req, res, next) {
   next();
});

router.get('/', function(req, res) {
   dataService.getBooks(function(books){
      res.send({
          data: books
      }) 
   });
});

router.get('/:id', function(req, res) {
   var bookId = req.params.id;
   dataService.getBookByISBN(bookId, function(book){
      res.send({
         data: book
      }) 
   });
});

router.put('/', function(req, res) {
   var bookModel = req.body;
   dataService.addBook(bookModel, function(){
      res.send({}) 
   });
});

router.delete('/:id', function(req, res) {
   var bookId = req.params.id;
   dataService.deleteBook(bookId, function(){
      res.send({}) 
   }); 
});

module.exports = router;