'use strict';

const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    locationID: Number,
    name: String,
    address: String,
    county: String,
    gpsLocation: String,
    legalDescription: String
})

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;