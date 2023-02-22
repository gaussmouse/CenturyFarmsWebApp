'use strict';

const mongoose = require("mongoose");

const farmPastSchema = mongoose.Schema({
    farmPastID: Number,
    yearPropertyAcquisition: Number,
    originalAcreage: Number,
    cropID: String,
    livestockID: String
})

const FarmPast = mongoose.model('FarmPast', farmPastSchema);

module.exports = FarmPast;