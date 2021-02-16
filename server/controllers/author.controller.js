const {Author} = require('../models/author.model');


module.exports.createAuthor = (request, response) => {
    const { name } = request.body;
    Author.create({
        name,
    })
        .then(author => response.json(author))
        .catch(err => response.status(400).json(err))
};
module.exports.findAllAuthors= (request, response) => {
    Author.find({})
        .then(allAuthors=> response.json(allAuthors))
        .catch(err => response.json(err))
}

module.exports.findOneSingleAuthor = (request, response) => {
    Author.find({_id: request.params.id})
        .then(oneSingleAuthor => response.json({ Author: oneSingleAuthor}))
        .catch(err => response.json({ message: "Something went wrong", error: err}));
};
module.exports.updateAuthor = (request, response) => {
    Author.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedAuthor => response.json(updatedAuthor))
        .catch(error => response.status(400).json(error))
}

// Delete an Author: DELETE
module.exports.deleteAuthor= (request, response) => {
    Author.deleteOne({_id: request.params.id})
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(error => response.json(error))
}