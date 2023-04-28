'use strict';

import mongoose from 'mongoose';

/*
const livestockSchema = mongoose.Schema({
    id: Number,
    name: String,
    livestockTypeID: Number
})
*/
const livestockSchema = mongoose.Schema({
    id:{
        type: Number
    },
    name: {
        type: String
    },
    livestockTypeID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Livestock'
    }
})

const Livestock = mongoose.model('Livestock', livestockSchema);

export default Livestock;