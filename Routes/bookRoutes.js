var express = require('express');

var routes = function (Book) {

	var bookRouter = express.Router();

	bookRouter.route('/')
	.post(function (req, res) {
		var book = new Book(req.body);

		console.log('Saving book: ', book);
		book.save();
		res.status(201).send(book);

	})
	.get(function (req, res) {

		var query = {};

		// sanatize user input, if the query is a valid query [by genre in this ex], then set the query to that
		if(req.query.genre) {
			query.genre = req.query.genre;
		}

		Book.find(query, function (err, books) {
			if(err)
				res.status(500).send(err);
			else
				res.json(books);
		});
		// var responseJson = {hello: 'This is my API'};
		// res.json(responseJson);
	});

	bookRouter.route('/Books/:bookId')
	.get(function (req, res) {

		Book.findById(req.params.bookId, function (err, book) {
			if(err)
				res.status(500).send(err);
			else
				res.json(book);
		});
		// var responseJson = {hello: 'This is my API'};
		// res.json(responseJson);
	});

	return bookRouter;

};

module.exports = routes;