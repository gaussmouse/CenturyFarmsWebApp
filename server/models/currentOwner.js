'use strict';

import mongoose from 'mongoose';

const currentOwnerSchema = mongoose.Schema({
    currentOwnerID: Number,
    name: String,
    relationshipToOriginalOwners: String,
})

const CurrentOwner = mongoose.model('CurrentOwner', currentOwnerSchema);

export default CurrentOwner;