const express = require('express');
const resourceControllers = require('../controllers/resourceControllers');

const resourceRouter = express.Router();

resourceRouter.get('/resource', resourceControllers.listResources);
resourceRouter.get('/resource/:id', resourceControllers.showResource);
resourceRouter.post('/resource', resourceControllers.createResource);
resourceRouter.patch('/resource/:id', resourceControllers.updateResource);
resourceRouter.delete('/resource/:id', resourceControllers.deleteResource);

module.exports = resourceRouter;
