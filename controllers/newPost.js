module.exports = (req, res) => {
  let title = '';
  let body = '';
  const data = req.flash('data')[0];

  if (typeof data != 'undefined') {
    title = data.title;
    body = data.body;
  }

  const errors = req.flash('validationErrors');

  if (req.session.userId) {
    return res.render('create', {
      createPost: true,
      errors,
      title,
      body,
    });
  }
  res.redirect('/auth/login');
};
