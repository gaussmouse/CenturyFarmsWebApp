'use strict';

import mongoose from 'mongoose';

const originalOwnerSchema = mongoose.Schema({
    originalOwnerID: Number,
    name: String,
    origin: String,
})

const OriginalOwner = mongoose.model('OriginalOwner', originalOwnerSchema);

export default OriginalOwner;