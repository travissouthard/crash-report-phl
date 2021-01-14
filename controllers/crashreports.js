//=============
// Dependencies
//=============
const express = require("express");
const router = express.Router();
const Reports = require("../models/crashreports.js");
const axios = require("axios");
require('dotenv').config();

//=============
// Bonus Data
//=============

const blankReport = {
    id: "",
    date: "",
    location: "",
    lngLat: "-75.163597,39.952394",
    hitAndRun: false,
    description: "",
    loctype: "",
    mode: [],
    injury: "",
    called911: false,
    policeResponse: "",
    madeReport: false,
    reportNumber: "",
    haveLawyer: false,
    lawyerName: "",
    madeSuit: false
};

const writeDateBetter = (date) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let dateArray = date.split("-");

    let readableDate = months[Number(dateArray[1]) - 1] + " " + dateArray[2] + ", " + dateArray[0];
    return readableDate;
};

//=============
// Data Handler
//=============

const convertBoolean = (property) => {
    return property == "on";
};

let checkUndisclosed = (string, boolean=true) => {
    if (boolean == true && string == "") {
        return "Undisclosed";
    } else if (boolean == false) {
        return "None";
    } else {
        return string;
    };
}

const convertData = (data) => {
    data.hitAndRun = convertBoolean(data.hitAndRun);
    data.called911 = convertBoolean(data.called911);
    data.madeReport = convertBoolean(data.madeReport);
    data.haveLawyer = convertBoolean(data.haveLawyer);
    data.madeSuit = convertBoolean(data.madeSuit);
    data.description = checkUndisclosed(data.description)
    data.reportNumber = checkUndisclosed(data.reportNumber, data.madeReport)
    data.lawyerName = checkUndisclosed(data.lawyerName, data.haveLawyer)

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

    delete data.car;
    delete data.bike;
    delete data.ped;

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
                writeDateBetter: writeDateBetter
            });
        }
    });
});

//New
router.get("/new", (req, res) => {
    res.render("report.ejs", {
        report: blankReport,
        action: "New"
    });
});

//Create
router.post("/", (req, res) => {
    req.body = convertData(req.body);
    Reports.create(req.body, (err, report) => {
        if (err) {
            console.error(err)
        } else {
            res.redirect("/resources");
        }
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
        res.render("report.ejs", {
            report: report,
            action: "Edit"
        });
    });
});

//Update
router.put("/:id", (req, res) => {
    //Convert data with callback
    req.body = convertData(req.body);
    Reports.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, newReport) => {
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