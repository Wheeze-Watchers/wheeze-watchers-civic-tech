const Resource = require('../db/models/Resource');
const { isAuthorized } = require('../utils/auth-utils');

exports.createResource = async (req, res) => {
  const { url, user_id } = req.body;

  const post = await Resource.createResource(url, user_id);

  res.send(post);
};

exports.listResources = async (req, res) => {
    const post = await Resource.getAllResource()
    res.send(post)
}

exports.showResource = async (req, res) => {
    const { id } = req.params;
  
    const post = await Resource.findResource(id);
    if (!post) return res.sendStatus(404);
  
    res.send(post);
  };

exports.updateResource = async (req, res) => {
    const { id } = req.params;
    const { url } = req.body;
  
    // if (!isAuthorized(id, req.session)) return res.sendStatus(403);
  
    let updatedResource = {};
  
    if (body) {
      updatedResource = await Resource.updateBody(id, url);
      if (!updatedResource) return res.sendStatus(404);
    }
  
    res.send(updatedResource);
};

exports.deleteResource = async (req, res) => {
    const { id } = req.params;

    const deletedResource = await Resource.deleteResource(id)

    res.send(deletedResource)
}