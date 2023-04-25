'use strict';

import mongoose from 'mongoose';

const livestockTypeSchema = mongoose.Schema({    
    livestockTypeID: Number,
    livestockType: String
})

const LivestockType = mongoose.model('LivestockType', livestockTypeSchema);

export default LivestockType;