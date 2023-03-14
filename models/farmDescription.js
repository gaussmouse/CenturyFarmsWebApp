'use strict';

import mongoose from 'mongoose';

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

export default FarmDescription;