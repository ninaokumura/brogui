const BlogPost = require('../models/BlogPost.js');
const path = require('path');

function updatePost(postProperties, req, res) {
  return BlogPost.updateOne(
    { id: postProperties.id },
    postProperties,
    (error, post) => {
      if (error) {
        req.flash(
          'validationErrors',
          Object.keys(error.errors).map(key => error.errors[key].message)
        );
        req.flash('data', req.body);
        return res.redirect('/posts/new');
      }
      res.redirect('/');
    }
  );
}

module.exports = async (req, res) => {
  const id = req.params.id;

  if (req.files?.image) {
    const image = req.files.image;

    image.mv(
      path.resolve(__dirname, '..', 'public/img', image.name),
      async error => {
        await updatePost(
          {
            ...req.body,
            image: '/img/' + image.name,
            userid: req.session.userId,
            id,
          },
          req,
          res
        );
      }
    );
  } else {
    await updatePost(
      {
        ...req.body,
        userid: req.session.userId,
        id,
      },
      req,
      res
    );
  }
};
