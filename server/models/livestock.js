'use strict';

import mongoose from 'mongoose';

const livestockSchema = mongoose.Schema({
    livestockID: Number,
    name: String,
    livestockTypeID: Number
})

const Livestock = mongoose.model('Livestock', livestockSchema);

export default Livestock;