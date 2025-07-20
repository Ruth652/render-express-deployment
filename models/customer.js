const Joi = require('joi');
const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    isGold: {
        type:Boolean,
        default:false
    },
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    phone: {
        type:String,
        minLength:5,
        maxLength:50,
        required:true
    }
});

const Customer = mongoose.model('Customer', customerSchema);



function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().required()
    });
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;