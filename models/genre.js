const mongoose = require('mongoose'); 
const Joi = require('joi');



const Genre = mongoose.model('Gener',new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:5,
        maxLength:50
    }
    }));

    function validateGenre(genre) {
        const schema = Joi.object({
            name: Joi.string().min(3).required()
        });
    
        return schema.validate(genre);
    }

    exports.Genre = Genre;
    exports.validate = validateGenre;