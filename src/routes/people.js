const express = require('express');
const peopleRouter = express.Router();
const peopleController = require('../controllers/people')

peopleRouter.get('/', peopleController.getPeople);
peopleRouter.post('/', peopleController.postPeople);

module.exports = peopleRouter;