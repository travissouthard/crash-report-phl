//___________________
//Dependencies
//___________________
const express = require("express");
const methodOverride  = require("method-override");
const mongoose = require ("mongoose");
const app = express();
const db = mongoose.connection;
const reportsController = require("./controllers/crashreports.js");

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+ 'crashreports';

// Connect to Mongo
mongoose.connect(MONGODB_URI,  {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongosh not running?'));
db.on('connected', () => console.warn('mongo connected to database'));
db.on('disconnected', () => console.error('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static("public"));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride("_method"));// allow POST, PUT and DELETE from a form
app.use("/crashreports/", reportsController);

//___________________
//Routes
//___________________

//For now, redirects to crashreports index
app.get("/", (req, res) => {
    res.redirect("/crashreports");
})

//Resources page
app.get("/resources", (req, res) => {
    res.render("resources.ejs");
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log("Listening on port:", PORT));