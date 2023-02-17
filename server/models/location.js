import mongoose from 'mongoose';

const locationSchema = mongoose.Schema({
    locationID: Number,
    name: String,
    address: String,
    county: String,
    gpsLocation: String,
    legalDescription: String
})

const Location = mongoose.model('Location', locationSchema);

export default Location;