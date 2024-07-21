const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_SECRET;





/// Post /// Registering a user

router.post('/register', async (req, res) => {
 try {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
   const user = await User.create({ username, password: hashedPassword });
   res.status(201).json({ message: `user was Created ${user}` });
  } catch (error) {
   if (error.code === 11000) {
    res.status(409).json({ message: 'User already in use' });
   } else {
    res.status(500).json({ message: "Internal server Error" });
   }
  }
 } catch (error) {
  console.log(error);
 }
});


// Get /// Admin login 

router.get('/admin', async (req, res) => {
 try {
  const locals = {
   title: 'Admin',
   description: 'Admin Page'
  };

  res.render('admin/index', { locals, layout: adminLayout });
 } catch (error) {
  console.log(error);
 }
});


/// Check login middleware

const authMiddleware = (req, res, next) => {
 const token = req.cookies.token;
 if (!token) {
  return res.status(401).json({ message: 'Unautholized' });
 }

 try {
  const decoded = jwt.verify(token, jwtSecret);
  req.userId = decoded.userId;
  next();
 } catch (error) {
  return res.status(401).json({ message: 'Unautholized' });
 }
};


/// Post / Verifying credetials for login btn

router.post('/admin', async (req, res) => {
 try {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
   return res.status(401).json({ message: 'Invalid credentials' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
   return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, jwtSecret);
  res.cookie('token', token, { httpOnly: true });

  res.redirect('/dashboard');
 } catch (error) {
  console.log(error);
 }
});



/// GET // Dashboard if you logged in

router.get('/dashboard', authMiddleware, async (req, res) => {
 try {
  const locals = {
   title: 'Dashboard',
   description: "Welcome To admin page"
  };
  const data = await Post.find();
  res.render('admin/dashboard', { locals, data, layout: adminLayout });
 } catch (error) {

 }

});


/// GET

// Admin create page post 

router.get('/add-post', authMiddleware, async (req, res) => {
 try {
  const locals = {
   title: 'New Blog',
   description: 'Creation of New Blog'
  };
  const data = await Post.find();
  res.render('admin/add-post', { locals, layout: adminLayout });
 } catch (error) {

 }
});

// Post // Adding a post 
router.post('/add-post', authMiddleware, async (req, res) => {
 try {
  try {
   const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
   });
   await Post.create(newPost);
   res.redirect('/dashboard');
  } catch (error) {

  }
  res.redirect('/dashboard');
 } catch (error) {
  console.log(error);
 }
});





//// Admin edit page

router.get('/edit-post/:id', authMiddleware, async (req, res) => {
 try {
  const locals = {
   title: 'Edit Post',
   description: 'Editing Post'
  };
  const data = await Post.findOne({ _id: req.params.id });
  res.render('admin/edit-post', { data, locals, layout: adminLayout });
 } catch (error) {

 }
});


// Admin edit post update 

router.put('/edit-post/:id', authMiddleware, async (req, res) => {
 try {
  await Post.findByIdAndUpdate(req.params.id, {
   title: req.body.title,
   body: req.body.body,
   updatedAt: Date.now()
  });
  // res.redirect(`/edit-post/${req.params.id}`);
  res.redirect('/dashboard');
 } catch (error) {
  console.log(error);
 }
});


// Admin delete button

router.delete('/delete-post/:id', authMiddleware, async (req, res) => {
 try {
  await Post.deleteOne({ _id: req.params.id });
  res.redirect('/dashboard');
 } catch (error) {
  console.log(error);
 }
});


/// Admin Logout button
router.get('/logout', (req, res) => {
 res.clearCookie('token');
 res.redirect('/');
 // setTimeout(() => {
 //  res.redirect('../index')
 // }, 2000);
});

module.exports = router;