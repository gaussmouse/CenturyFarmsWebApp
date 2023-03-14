'use strict';

import mongoose from 'mongoose';

const cropSchema = mongoose.Schema({
    cropID: Number,
    name: String,
})

const Crop = mongoose.model('Crop', cropSchema);

export default Crop;