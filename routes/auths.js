
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const Joi = require('joi');
const {User} = require('../models/user');
const router = express.Router();



// 
router.post("/", async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

   let user = await User.findOne({email:req.body.email});
   if (!user) return res.status(400).send('Invalid email or password');

 const validpassword = await bcrypt.compare(req.body.password, user.password)
 if(!validpassword) return res.status(400).send('Invalid email or password');

 const token = user.generateAuthToken();
 res.send(token);
});


function validateUser(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),

    });

    return schema.validate(req);
}


module.exports = router;