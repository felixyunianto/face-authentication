const express = require('express');
const welcomeRouter = express.Router();

welcomeRouter.get('/', (req, res) => {
    res.render("index")
})

module.exports = welcomeRouter
