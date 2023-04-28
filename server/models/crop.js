'use strict';

import mongoose from 'mongoose';

/*
const cropSchema = mongoose.Schema({
    cropID: Number,
    name: String,
    type: String
})
*/
const cropSchema = mongoose.Schema({
    cropID: {
        type: Number
    },
    name: {
        type: String
    },
    type: {
        type: String
    }
})

const Crop = mongoose.model('Crop', cropSchema);

export default Crop;