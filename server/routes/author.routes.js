const AuthorController = require('../controllers/author.controller');


module.exports = (app) => {
    app.post('/api/createNewAuthor', AuthorController.createAuthor);
    app.get('/api/getAllAuthors', AuthorController.findAllAuthors);
}