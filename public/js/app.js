// const { base } = require("../../models/crashreports");

//=============
// Geocode API
//=============

const baseURL = "https://maps.googleapis.com/maps/api/geocode/json?";
const addressQuery = "&address="
const phillyQuery = ",%20Philadelphia,%20PA,%20USA"
const apiKey = "&key=AIzaSyB3glUz1bV7g_FWGfa4sxyrprdvKGd3G9A";
let coords = null;

// URL escapes the location input to 

const getLocation = (locInput) => {
    $.ajax({
        url: baseURL + addressQuery + locInput + phillyQuery + apiKey,
    }).then((locData) => {
        coords = locData.results[0].geometry.location;
        console.log("Coords is now " + coords.lat + " and " + coords.lng)
    }, (error) => {
        console.log(error);
    });
};

$(() => {
    getLocation("20th%20and%20Snyder");

    $("#locationForm").on("submit", (event) => {
        event.preventDefault();
        console.log("Submitted the location");
        console.log($("#locationName").val())
    })
})


// module.exports = {};