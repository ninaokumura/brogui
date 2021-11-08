const BlogPost = require('../models/BlogPost');

module.exports = (req, res) => {
  const id = req.params.id;
  BlogPost.findById(id, (err, post) => {
    if (err) {
      console.log(err.message);
      res.redirect(`/post/${id}`);
      return;
    }
    res.render('edit', {
      editPost: true,
      title: post.title,
      id: post.id,
      body: post.body,
      image: post.image,
      errors: [],
    });
  });
};
