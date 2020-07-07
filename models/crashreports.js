const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    date: {type: Date, required: true},
    location: {type: Array, required: true},
    hitAndRun: Boolean,
    description: String,
    loctype: String,
    mode: Array, //Car, bike, and/or ped
    injury: String,
    called911: Boolean,
    policeResponse: String,
    madeReport: Boolean,
    reportNumber: String,
    haveLawyer: Boolean,
    lawyerName: String,
    madeSuit: Boolean
}, {timestamps: true});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;