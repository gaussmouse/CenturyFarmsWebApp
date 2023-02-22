'use strict';

const mongoose = require("mongoose");

const livestockSchema = mongoose.Schema({
    livestockID: Number,
    name: String,
})

const Livestock = mongoose.model('Livestock', livestockSchema);

module.exports = Livestock;