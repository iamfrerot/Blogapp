require("dotenv").config();
const express = require('express');
const expressLayout = require("express-ejs-layouts");
const methodOverride = require('method-override');
const cookierParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const connectDB = require('./server/config/db');
const session = require("express-session");
const app = express();
const PORT = 3000 || process.env.PORT;


//  Connetct to DB
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookierParser());
app.use(session({
 secret: process.env.SESSION_SECRET,
 resave: false,
 saveUninitialized: true,
 store: MongoStore.create({
  mongoUrl: process.env.MONGO_URI
 }),
 // Cookie:{maxAge:new Date(Date.now() + (360000))}

}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// Templating engine

app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

app.listen(PORT, () => {
 console.log(`App listening on port ${PORT}`);
});