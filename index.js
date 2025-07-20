require('dotenv').config();
//const config = require('config');
const mongoose = require('mongoose');
const express = require("express");
const genres = require("./routes/genres");
const home = require("./routes/home");
const customers = require("./routes/customers");
const users = require("./routes/users");
const auths = require("./routes/auths");
const app = express();

const jwtPrivateKey = process.env.vidly_jwtPrivateKey;

if (!jwtPrivateKey){
  console.log('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}


mongoose.connect(process.env.vidly_db)
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.log('Could not connect to MongoDB...', err.message))

app.use(express.json()); 
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/users", users);
app.use("/api/auths", auths);
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
