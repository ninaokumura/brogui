module.exports = (req, res) => {
  res.render('register', {
    errors: flash('validationErrors'),
  });
};
