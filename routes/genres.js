const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const {Genre, validate} = require('../models/genre');
const router = express.Router();

// Get all genres
router.get("/", async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

// Get a genre by ID
router.get("/:id", async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("Genre with the given ID was not found.");
    res.send(genre);
});

// Create a new genre
router.post("/",auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
   let genre = new Genre({name:req.body.name});
    
    genre = await genre.save();
    res.send(genre);
});

// Update an existing genre
router.put("/:id",async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {
       name:req.body.name 
    }, {new:true})
    if (!genre) return res.status(404).send("Genre with the given ID was not found.");

    res.send(genre);
});

// Delete a genre
router.delete("/:id",[auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id)
    
    if (!genre) return res.status(404).send("Genre with the given ID was not found.");

    res.send(genre);
});

// Validation function


module.exports = router;
