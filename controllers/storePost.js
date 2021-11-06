const BlogPost = require('../models/BlogPost.js');
const path = require('path');

function createPost(postProperties, req, res) {
  return BlogPost.create(postProperties, (error, post) => {
    if (error) {
      req.flash(
        'validationErrors',
        Object.keys(error.errors).map(key => error.errors[key].message)
      );
      req.flash('data', req.body);
      return res.redirect('/posts/new');
    }
    res.redirect('/');
  });
}

module.exports = async (req, res) => {
  if (req.files?.image) {
    const image = req.files.image;

    image.mv(
      path.resolve(__dirname, '..', 'public/img', image.name),
      async error => {
        await createPost(
          {
            ...req.body,
            image: '/img/' + image.name,
            userid: req.session.userId,
          },
          req,
          res
        );
      }
    );
  } else {
    await createPost(
      {
        ...req.body,
        userid: req.session.userId,
      },
      req,
      res
    );
  }
};
