'use strict';

import mongoose from 'mongoose';

const farmPastSchema = mongoose.Schema({
    farmPastID: String,
    yearPropertyAcquisition: String,
    originalAcreage: String,
    cropID: String,
    livestockID: String
})

const FarmPast = mongoose.model('FarmPast', farmPastSchema);

export default FarmPast;