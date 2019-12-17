module.exports = (dal) => {
    let express = require('express');
    let router = express.Router();

    router.get('/', (req, res) => {
        dal.getBooks().then(books => res.json(books));
    });

    router.get('/:id', (req, res) => {
        let id = req.params.id;
        dal.getBook(id).then(book => res.json(book));
    });

    router.post('/', (req, res) => {
        let newBook = {
            category : req.body.category,
            books : []
        };
        dal.createBook(newBook).then(newBook => res.json(newBook));
    });

    router.post('/:id/answers', (req, res) => {
        dal.addAnswer(req.params.id, req.body.text).then(updatedBook => res.json(updatedBook));
    });

    /* router.put('/:id/answers/:aid/vote', (req, res) => {
        let id = req.params.id;
        let aid = req.params.aid;
        dal.upvoteAnswer(id, aid).then(updatedQuestion => res.json(updatedQuestion));
    }); */

    return router;
};