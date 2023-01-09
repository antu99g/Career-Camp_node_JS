const express = require('express');
const app = express();
const port = 8000;

// Configuring environment variables
require("dotenv").config();

const db = require('./config/mongoose');

const expressLayouts = require('express-ejs-layouts');

// Dependencies used for authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');


// Rendering static files
app.use(express.static('./assets'));


// Fetching form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Layouts
app.use(expressLayouts);


// Extract styles and scripts from sub-pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// Setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// Creating session
app.use(
   session({
      name: "CareerCamp",
      secret: process.env.SESSION_SECRET || "randomSecret",
      saveUninitialized: false,
      resave: false,
      cookie: {
         maxAge: 1000 * 60 * 60 * 24,
      },
      store: MongoStore.create(
         {
            mongoUrl: "mongodb://localhost/career_camp-db",
            autoRemove: "disabled",
         },
         function (err) {
            console.log(err || "connect mongodb setup ok");
         }
      ),
   })
);

// Initialize passport js
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/', require('./routes/index'));



app.listen(process.env.PORT || port, (err) => {
   if (err) {
      console.log(`Error in running the server: ${err}`);
   }
   console.log(`Server is running on port: ${port}`);
});