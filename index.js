const express = require('express');
const expressSession = require('express-session');
// const path = require('path');
const ejs = require('ejs');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const BlogPost = require('./models/BlogPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPosts');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const newPostController = require('./controllers/newPost');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const validateMiddleware = require('./middleware/validationMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const app = new express();

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
});

global.loggedIn = null;

app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;

  next();
});

app.set('view engine', 'ejs');
app.use(fileUpload());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);

const customMiddleWare = (req, res, next) => {
  console.log('Custom middle ware called');
  next();
};
app.use('/posts/store', validateMiddleware);
app.use(customMiddleWare);

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

app.get('/', homeController);

app.get('/post/:id', getPostController);

// Create new post

app.get('/posts/new', authMiddleware, newPostController);

app.post('/posts/store', authMiddleware, storePostController);

app.post(
  '/users/register',
  redirectIfAuthenticatedMiddleware,
  storeUserController
);

app.post(
  '/users/login',
  redirectIfAuthenticatedMiddleware,
  loginUserController
);

app.listen(4000, () => {
  console.log('App listening on port 4000');
});
