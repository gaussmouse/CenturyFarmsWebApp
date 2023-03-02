'use strict';

import mongoose from 'mongoose';

const farmCurrentSchema = mongoose.Schema({
    farmCurrentID: Number,
    currentAcreage: Number,
    acreageFarmedToday: Number,
    gensOnFarm: Number,
    cropID: String,
    livestockID: String
})

const FarmCurrent = mongoose.model('FarmCurrent', farmCurrentSchema);

export default FarmCurrent;