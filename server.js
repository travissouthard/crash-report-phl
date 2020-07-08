//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;

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
mongoose.connect(MONGODB_URI,  {useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
    res.render('new.ejs');
});

app.post("/crashreports", (req, res) => {
    // Convert location to specific coordinates
        // Need API for this
    
    //Converts any checkbox into a boolean
    const convertBoolean = (property) => {
        if (property == "on") {
            return true;
        } else {
            return false;
        };
    };

    // Convert hitAndRun to true
    req.body.hitAndRun = convertBoolean(req.body.hitAndRun);
    // If description is empty, convert to "not given"
    // If car, bike, or ped == "on": push into mode array
    let mode = [];
    const addMode = (option) => {
        if (option == "on") {
            mode.push(option);
        };
    };
    addMode(req.body.car);
    addMode(req.body.bike);
    addMode(req.body.ped);
    req.body.mode = mode;
    // Delete req.body.car, req.body.bike, & req.body.ped
    delete req.body.car;
    delete req.body.bike;
    delete req.body.ped;

    // Convert called911 to true
    req.body.called911 = convertBoolean(req.body.called911);

    // Convert madeReport to true
    req.body.madeReport = convertBoolean(req.body.madeReport);

    // If madereport == true and reportNumber is empty: reportNumber is "unavailable". If madeReport == false: report number = "doesn't exist"

    // Convert haveLawyer to true
    req.body.haveLawyer = convertBoolean(req.body.haveLawyer);

    // If haveLawyer == true and lawyerName is empty: lawyername is "undisclosed". If haveLawyer == false: lawyerName is "No lawyer"

    // Convert madeSuit to true
    req.body.madeSuit = convertBoolean(req.body.madeSuit);
    res.send(req.body);
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));