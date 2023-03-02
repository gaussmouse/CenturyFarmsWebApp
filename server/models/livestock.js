'use strict';

import mongoose from 'mongoose';

const livestockSchema = mongoose.Schema({
    livestockID: Number,
    name: String,
})

const Livestock = mongoose.model('Livestock', livestockSchema);

export default Livestock;