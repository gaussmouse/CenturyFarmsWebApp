'use strict';

import mongoose from 'mongoose';

const farmPastSchema = mongoose.Schema({
    farmPastID: Number,
    yearPropertyAcquisition: Number,
    originalAcreage: Number,
    cropID: String,
    livestockID: String
})

const FarmPast = mongoose.model('FarmPast', farmPastSchema);

export default FarmPast;