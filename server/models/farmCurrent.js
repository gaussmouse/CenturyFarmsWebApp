'use strict';

const mongoose = require("mongoose");

const farmCurrentSchema = mongoose.Schema({
    farmCurrentID: Number,
    currentAcreage: Number,
    acreageFarmedToday: Number,
    gensOnFarm: Number,
    cropID: String,
    livestockID: String
})

const FarmCurrent = mongoose.model('FarmCurrent', farmCurrentSchema);

module.exports = FarmCurrent;