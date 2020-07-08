const express = require("express");
const router = express.Router();
const Reports = require("../models/crashreports.js")

// Routes

//Index
router.get("/", (req, res) => {
    Reports.find({}, (err, allReports) => {
        res.render("index.ejs", {
            reports: allReports,
        });
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
    // Convert called911 to true
    req.body.called911 = convertBoolean(req.body.called911);
    // Convert madeReport to true
    req.body.madeReport = convertBoolean(req.body.madeReport);
    // Convert haveLawyer to true
    req.body.haveLawyer = convertBoolean(req.body.haveLawyer);
    // Convert madeSuit to true
    req.body.madeSuit = convertBoolean(req.body.madeSuit);

    // If description is empty, convert to "Undisclosed"
    if (req.body.description == "") {
        req.body.description = "Undisclosed"
    }

    // If car, bike, or ped == "on": push into travel mode array
    let mode = [];
    const addMode = (option, string) => {
        if (option == "on") {
            mode.push(string);
        };
    };
    addMode(req.body.car, "car");
    addMode(req.body.bike, "bike");
    addMode(req.body.ped, "ped");
    req.body.mode = mode;
    // Delete req.body.car, req.body.bike, & req.body.ped
    delete req.body.car;
    delete req.body.bike;
    delete req.body.ped;

    // If madereport == true and reportNumber is empty: reportNumber is "unavailable". If madeReport == false: report number = "doesn't exist"
    if (req.body.madeReport == true && req.body.reportNumber == "") {
        req.body.reportNumber = "Undisclosed";
    } else if (req.body.madeReport == false) {
        req.body.reportNumber = "No report";
    };

    // If haveLawyer == true and lawyerName is empty: lawyername is "undisclosed". If haveLawyer == false: lawyerName is "No lawyer"
    if (req.body.haveLawyer == true && req.body.lawyerName == "") {
        req.body.lawyerName = "Undisclosed";
    } else if (req.body.haveLawyer == false) {
        req.body.lawyerName = "No lawyer";
    };

    Reports.create(req.body, () => {
        res.redirect("/crashreports");
    });
});

//Show
router.get("/:id", (req, res) => {
    Reports.findById(req.params.id, (err, report) => {
        res.render("show.ejs", {
            report: report,
        });
    });
});

module.exports = router;