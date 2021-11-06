module.exports = (req, res) => {
  let username = '';
  let password = '';
  const data = req.flash('data')[0];

  if (typeof data != 'undefined') {
    username = data.username;
    password = data.password;
  }
  const errors = req.flash('validationErrors');

  res.render('register', {
    errors: errors,
    username: username,
    password: password,
  });
};
