module.exports = (dal) => {
    let express = require('express');
    let router = express.Router();

    router.get('/', (req, res) => {
        dal.getCategories().then(categories => res.json(categories));
    });

    router.get('/:id', (req, res) => {
        let id = req.params.id;
        dal.getCategory(id).then(Category => res.json(Category));
    });

    // Create a new category and makes and empty array for future books to be stored in
    router.post('/', (req, res) => {
        let newCategory = {
            category : req.body.category,
            books : []
        };
        dal.createCategory(newCategory).then(newCategory => res.json(newCategory));
    });

    ///Post a new book for a specific category id
    router.post("/:id/books", (request, response) => {
        // need the id of category, and some text from the request body.
        dal.createBook(request.params.id, request.body).then(updatedBook => response.json(updatedBook));

    });

    // Deletes category 
    router.post('/delte-category', (req, res) => {
        let categoryDelete = req.body.id;
        dal.deleteCategory(categoryDelete).then(categoryDelete => res.json(categoryDelete));
    });

    return router;
};
