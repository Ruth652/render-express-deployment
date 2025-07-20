const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const {User, validate} = require('../models/user');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();



// Create a new user
router.post("/", async (req, res) => {
    console.log("Request body:", req.body);
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

   let user = await User.findOne({email:req.body.email});
   if (user) return res.status(400).send('User already registered');

   user = new User(
    _.pick(req.body,['name', 'email', 'password'] )
   )
   const salt = await bcrypt.genSalt(10)
   user.password = await bcrypt.hash(user.password, salt);
   await user.save();
  
   const ouput = _.pick(user, ['_id', 'name', 'email'])
   // this two are the same 
/*    const output = {
    id : user.id,
    name: user.name,
    email:user.email
   } */

/*    res.send({
    id:user.id,
    name:user.name,
    email:user.email,

   }) */
  
 const token = user.generateAuthToken();
    res.header('x-auth-token',token).send( _.pick(user, ['_id', 'name', 'email']) );
});


module.exports = router;
