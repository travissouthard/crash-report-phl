//=============
// Geocode API
//=============
// const express = require("express");
// require('dotenv').config();

const baseURL = "https://maps.googleapis.com/maps/api/geocode/json?";
const addressQuery = "&address="
const phillyQuery = ",%20Philadelphia,%20PA,%20USA"
const apiKey = "&key=" + "AIzaSyCpNLUMg7s2gBv-4G87MOsof3BjMREvpHs";
let coords = "Not working";

// Calls Google geocode API and returns coordinates for a given address or intersection
const getLocation = (locInput) => {
    $.ajax({
        url: baseURL + addressQuery + locInput + phillyQuery + apiKey,
    }).then((locData) => {
        coords = locData.results[0].geometry.location;
        let coordsArray = [];
        coordsArray.push(coords.lat);
        coordsArray.push(coords.lng);
        $("#latLong").attr("value", coordsArray);
    }, (error) => {
        console.log(error);
    });
};

$(() => {
    // URL escapes the location input to replace spaces with "%20"
    const prepareAddress = (address) => {
        let splitAddress = address.split(" ");
        let readyAddress = splitAddress.join("%20");
        return readyAddress;
    }

    $("#locationForm").on("submit", (event) => {
        //Keeps form from resetting
        event.preventDefault();

        //Prepares address' format for API call
        let address = $("#locationName").val();
        let preparedAddress = prepareAddress(address);
        getLocation(preparedAddress);

        //Adds address to the report form
        $("#location").attr("value", address);

        //Makes the report form visible
        $("#reportForm").css("display", "block");
    });
});