const Post = require('../db/models/Post');
const { isAuthorized } = require('../utils/auth-utils');

exports.createPost = async (req, res) => {
  const { title, body, user_id } = req.body;

  const post = await Post.createPost(title, body, user_id);

  res.send(post);
};

exports.listPosts = async (req, res) => {
    const post = await Post.getAllPost()
    res.send(post)
}

exports.showPost = async (req, res) => {
    const { id } = req.params;
  
    const post = await Post.findPost(id);
    if (!post) return res.sendStatus(404);
  
    res.send(post);
  };

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { body, title } = req.body;
  
    // if (!isAuthorized(id, req.session)) return res.sendStatus(403);
  
    let updatedPost = {};
  
    if (body) {
      updatedPost = await Post.updateBody(id, body);
      if (!updatedPost) return res.sendStatus(404);
    }
  
    if (title) {
      updatedPost = await Post.updateTitle(id, title);
      if (!updatedPost) return res.sendStatus(404);
    }
  
    res.send(updatedPost);
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;

    const deletedPost = await Post.deletePost(id)

    res.send(deletedPost)
}