const mongoose = require('mongoose');

const AuSchema = new mongoose.Schema({
    name:  {type:String,
        required:[true, "Name is required"],
        minlength:[3, "Name must be at least 3 characters long"]
},
}, { timestamps: true });
module.exports.Author = mongoose.model('Author', AuSchema);
