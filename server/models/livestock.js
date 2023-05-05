'use strict';

import mongoose from 'mongoose';

const livestockSchema = mongoose.Schema({
    id:{
        type: Number
    },
    name:{
        type: String
    },
    livestockTypeID:{
        type: Number,
        ref: 'Livestock'
    }
})

const Livestock = mongoose.model('Livestock', livestockSchema);

export default Livestock;