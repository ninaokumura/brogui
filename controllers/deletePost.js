const BlogPost = require('../models/BlogPost');
module.exports = (req, res) => {
  // get post id from req.params.id
  const id = req.params.id;
  // get userId from req.session.userId
  const userId = req.session.userId;
  // get post from db using BlogPost.findById
  BlogPost.findByIdAndDelete(id, (err, post) => {
    if (err) {
      console.log(err.message);
      // set error message before redirecting
      res.redirect(`/post/${id}`);
      return;
    }
    res.redirect('/');
  });
  // check if resulting blogPost's userId matches the session userId

  // if false set a error message and redirect
  // if true use BlogPost.delete to delete the post
};
