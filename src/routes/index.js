const express = require('express');
const mainRouter = express.Router();

const welcomeRouter = require('../routes/welcome');
const peopleRouter = require('../routes/people')
const registerRouter = require('../routes/register');
const verificationRouter = require('../routes/verification');

const uploadImage  = require('../helpers/upload');

mainRouter.use('/', welcomeRouter);
mainRouter.use('/register', registerRouter);
mainRouter.use('/people', uploadImage, peopleRouter)
mainRouter.use('/verification', verificationRouter);

module.exports = mainRouter;