const {Author} = require('../models/author.model');


module.exports.createAuthor = (request, response) => {
    const { name} = request.body;
    Author.create({
        name
    })
        .then(author => response.json(author))
        .catch(err => response.json({meesage:"somthing went wrong", error:err}));
}

module.exports.findAllAuthors= (request, response) => {
    Author.find({})
        .then(allAuthors=> response.json(allAuthors))
        .catch(err => response.json(err))
}