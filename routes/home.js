const express = require('express');
const router = express.Router(); // ✅ use `router`, not `routes`

router.get("/", (req, res) => {
    res.send("Welcome to the Home Page");
});

module.exports = router; // ✅ match the name above
