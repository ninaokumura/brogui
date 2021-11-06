module.exports = (req, res) => {
  // get post id from req.params.id
  // get userId from req.session.userId
  // get post from db using BlogPost.findById
  // check if resulting blogPost's userId matches the session userId
  // if false set a error message and redirect
  // if true use BlogPost.delete to delete the post
};
