const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
  const userId = req.session?.userId;

  const blogposts = userId
    ? await BlogPost.where('userid').equals(userId).populate('userid')
    : await BlogPost.find({}).populate('userid');

  res.render('index', {
    blogposts,
    loggedIn: Boolean(req.session?.userId),
  });
};
