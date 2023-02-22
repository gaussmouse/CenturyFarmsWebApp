'use strict';

const mongoose = require("mongoose");

const farmDescriptionSchema = mongoose.Schema({
    farmPastID: Number,
    farmCurrentID: Number,
    currentOwnerID: Number,
    originalOwnerID: Number,
    locationID: Number,
    name: String,
    awardType: String,
    yearOfAward: Number
})

const FarmDescription = mongoose.model('FarmDescription', farmDescriptionSchema);

module.exports = FarmDescription;