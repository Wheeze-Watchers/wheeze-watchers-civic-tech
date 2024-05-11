const express = require('express');
const postControllers = require('../controllers/postControllers');

const postRouter = express.Router();

postRouter.get('/discussion', postControllers.listPosts);
postRouter.get('/discussion/:id', postControllers.showPost);
postRouter.post('/discussion', postControllers.createPost);
postRouter.patch('/discussion/:id', postControllers.updatePost);
postRouter.delete('/discussion/:id', postControllers.deletePost);

module.exports = postRouter;
