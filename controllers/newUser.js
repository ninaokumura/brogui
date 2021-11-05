const flash = require('connect-flash');
module.exports = (req, res) => {
  console.log('new user');
  let username = '';
  let password = '';
  const data = req.flash('data')[0];

  if (typeof data != 'undefined') {
    username = data.username;
    password = data.password;
  }
  const errors = flash('validationErrors');

  res.render('register', {
    errors: Array.isArray(errors) ? errors : [],
    username: username,
    password: password,
  });
};
