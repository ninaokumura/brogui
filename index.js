const express = require('express');
const expressSession = require('express-session');
const flash = require('connect-flash');
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
const logoutController = require('./controllers/logout');
const deletePostController = require('./controllers/deletePost');
const validateMiddleware = require('./middleware/validationMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const app = new express();

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }
} else {
  console.log(process.env);
}

const uri = `mongodb+srv://nina:${process.env.MONGODB_PASSWORD}@cluster0.u5zz8.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
});

global.loggedIn = null;

app.use('*', (req, res, next) => {
  // console.log({ loggedIn: global.loggedIn });
  loggedIn = Boolean(req.session?.userId);

  next();
});

app.set('view engine', 'ejs');
app.use(flash());
app.use(fileUpload());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);

// const customMiddleWare = (req, res, next) => {
//   console.log('Custom middle ware called');
//   next();
// };
// app.use(customMiddleWare);
app.use('/posts/store', validateMiddleware);

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

app.get('/', homeController);

app.get('/post/:id', getPostController);

app.get('/auth/logout', logoutController);

// Create new post

app.get('/posts/new', authMiddleware, newPostController);

app.post('/posts/store', authMiddleware, storePostController);

app.post('/posts/:id/delete', authMiddleware, deletePostController);

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

app.use((req, res) => res.render('notfound'));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
