'use strict';

const mongoose = require("mongoose");

const cropSchema = mongoose.Schema({
    cropID: Number,
    name: String,
})

const Crop = mongoose.model('Crop', cropSchema);

module.exports = Crop;