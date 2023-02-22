'use strict';

const mongoose = require("mongoose");

const currentOwnerSchema = mongoose.Schema({
    currentOwnerID: Number,
    name: String,
    relationshipToOriginalOwners: String,
})

const CurrentOwner = mongoose.model('CurrentOwner', currentOwnerSchema);

module.exports = CurrentOwner;