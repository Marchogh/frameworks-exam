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

    router.post('/', (req, res) => {
        let newCategory = {
            category : req.body.category,
            books : []
        };
        dal.createCategory(newCategory).then(newCategory => res.json(newCategory));
    });

    return router;
};