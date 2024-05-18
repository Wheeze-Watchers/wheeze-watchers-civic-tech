const express = require('express');
const resourceControllers = require('../controllers/resourceControllers');

const resourceRouter = express.Router();

resourceRouter.get('/', resourceControllers.listResources);
resourceRouter.get('/:id', resourceControllers.showResource);
resourceRouter.post('/', resourceControllers.createResource);
resourceRouter.patch('/:id', resourceControllers.updateResource);
resourceRouter.delete('/:id', resourceControllers.deleteResource);

module.exports = resourceRouter;
