const express = require('express')
const verificationRouter = express.Router();

verificationRouter.get('/', (req, res) => {
    res.render('verification');
});

module.exports = verificationRouter