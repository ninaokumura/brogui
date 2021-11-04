const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
  const blogposts = await BlogPost.find({});

  res.render('index', {
    blogposts,
    loggedIn: Boolean(req.session?.userId),
  });
};
