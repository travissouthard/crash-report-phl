const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    date: {type: String, required: true},
    location: {type: String, required: true},
    lngLat: {type: String, required: true},
    hitAndRun: {type: Boolean, default: false},
    description: String,
    loctype: String,
    mode: Array, //Car, bike, and/or ped
    injury: String,
    called911: {type: Boolean, default: false},
    policeResponse: String,
    madeReport: {type: Boolean, default: false},
    reportNumber: String,
    haveLawyer: {type: Boolean, default: false},
    lawyerName: String,
    madeSuit: {type: Boolean, default: false}
}, {timestamps: true});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;