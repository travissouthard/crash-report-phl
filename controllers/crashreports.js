//=============
// Dependencies
//=============
const express = require("express");
const router = express.Router();
const Reports = require("../models/crashreports.js");
const axios = require("axios");
require('dotenv').config();

//=============
// Date Writer
//=============

const writeDateBetter = (date) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let dateArray = date.split("-");

    let readableDate = months[Number(dateArray[1]) - 1] + " " + dateArray[2] + ", " + dateArray[0];
    return readableDate;
};

//=============
// Data Handler
//=============

// Callback for converting form data to useable data
const convertData = (data) => {
    //Converts any checkbox into a boolean
    const convertBoolean = (property) => {
        if (property == "on") {
            return true;
        } else {
            return false;
        };
    };
    // Convert hitAndRun to true
    data.hitAndRun = convertBoolean(data.hitAndRun);
    // Convert called911 to true
    data.called911 = convertBoolean(data.called911);
    // Convert madeReport to true
    data.madeReport = convertBoolean(data.madeReport);
    // Convert haveLawyer to true
    data.haveLawyer = convertBoolean(data.haveLawyer);
    // Convert madeSuit to true
    data.madeSuit = convertBoolean(data.madeSuit);

    // //Splits the lat and long into an array for mapping
    // data.latLong = data.latLong.split(",");

    // If description is empty, convert to "Undisclosed"
    if (data.description == "") {
        data.description = "Undisclosed"
    }

    // If car, bike, or ped == "on": push into travel mode array
    let mode = [];
    const addMode = (option, string) => {
        if (option == "on") {
            mode.push(string);
        };
    };
    addMode(data.car, "car");
    addMode(data.bike, "bike");
    addMode(data.ped, "ped");
    data.mode = mode;
    // Delete req.body.car, req.body.bike, & req.body.ped
    delete data.car;
    delete data.bike;
    delete data.ped;

    // If madereport == true and reportNumber is empty: reportNumber is "unavailable". If madeReport == false: report number = "doesn't exist"
    if (data.madeReport == true && data.reportNumber == "") {
        data.reportNumber = "Undisclosed";
    } else if (data.madeReport == false) {
        data.reportNumber = "No report";
    };

    // If haveLawyer == true and lawyerName is empty: lawyername is "undisclosed". If haveLawyer == false: lawyerName is "No lawyer"
    if (data.haveLawyer == true && data.lawyerName == "") {
        data.lawyerName = "Undisclosed";
    } else if (data.haveLawyer == false) {
        data.lawyerName = "No lawyer";
    };

    return data;
}

//=============
//   Routes
//=============

//Index
router.get("/", (req, res) => {
    Reports.find({}, (err, allReports) => {
        if (err) {
            res.send(err)
        } else {
            res.render("index.ejs", {
                reports: allReports,
            });
        }
    });
});

//New
router.get("/new" , (req, res) => {
    res.render("new.ejs");
});

//Create
router.post("/", (req, res) => {
    // Convert location to specific coordinates
        // Need API for this
    
    //Convert data with callback
    req.body = convertData(req.body);
    Reports.create(req.body, () => {
        res.redirect("/resources");
    });
});

//Show
router.get("/:id", (req, res) => {
    Reports.findById(req.params.id, (err, report) => {
        res.render("show.ejs", {
            report: report,
            writeDateBetter: writeDateBetter,
        });
    });
});

//Edit
router.get("/:id/edit", (req, res) => {
    Reports.findById(req.params.id, (err, report) => {
        res.render("edit.ejs", {
            report: report,
        });
    });
});

//Update
router.put("/:id", (req, res) => {
    //Convert data with callback
    req.body = convertData(req.body);

    Reports.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, newReport) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/crashreports/" + req.params.id);
        };
    });
});

//Delete
router.delete("/:id", (req, res) => {
    Reports.findByIdAndRemove(req.params.id, (err, report) => {
        res.redirect("/crashreports")
    });
});

module.exports = router;