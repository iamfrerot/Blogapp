const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Routes

// GET / HOME
router.get('/', async (req, res) => {
  try {
    const locals = {
      title: 'Blog App',
      description: 'Simple blog created with Node js , express and mongodb'
    };
    let perPage = 2;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }]).skip(perPage * page - perPage).limit(perPage).exec();

    const count = await Post.find().count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', {
      locals: locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    console.log(error);
  }
});

// Get / Post :id

router.get('/post/:id', async (req, res) => {
  try {
    const locals = {
      title: 'Nodejs Blog',
      description: 'Simple blog created with Node js , express and mongodb'
    };

    const slug = req.params.id;
    const data = await Post.findById({ _id: slug });
    res.render('post', { locals, data });
  } catch (error) {
    console.log(error);
  }
});


// POST // Post search term

router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: 'Search',
      description: 'Simple blog created with Node js , express and mongodb'
    };

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, '');

    const data = await Post.find({
      $or: [{ title: { $regex: new RegExp(searchNoSpecialChar, 'i') } }, { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }]
    });

    res.render('search', { locals, data });
  } catch (error) {
    console.log(error);
  }
});

router.get('/about', (req, res) => {
  res.render('about');
});
module.exports = router;