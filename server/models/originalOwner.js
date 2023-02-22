'use strict';

const mongoose = require("mongoose");

const originalOwnerSchema = mongoose.Schema({
    originalOwnerID: Number,
    name: String,
    origin: String,
    ethnicOrigin: String,
})

const OriginalOwner = mongoose.model('OriginalOwner', originalOwnerSchema);

module.exports = originalOwner;