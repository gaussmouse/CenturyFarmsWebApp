'use strict';

import mongoose from 'mongoose';

const cropTypeSchema = mongoose.Schema({
    cropTypeID: Number,
    type: String
})

const CropType = mongoose.model('CropType', cropTypeSchema);

export default CropType;