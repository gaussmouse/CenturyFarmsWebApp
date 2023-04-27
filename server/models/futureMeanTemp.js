'use strict';

import mongoose from 'mongoose';

const futureMeanTempSchema = mongoose.Schema({
    2023: Number,
    2024: Number,
    2025: Number,
    2026: Number,
    2027: Number,
    2028: Number,
    2029: Number,
    2030: Number,
    2031: Number,
    2032: Number,
    2033: Number,
    2034: Number,
    2035: Number,
    2036: Number,
    2037: Number,
    2038: Number,
    2039: Number,
    2040: Number,
    2041: Number,
    2042: Number,
    2043: Number,
    2044: Number,
    2045: Number,
    2046: Number,
    2047: Number,
    2048: Number,
    2049: Number,
    2050: Number,
    farmID: Number
})

const FutureMeanTemp = mongoose.model('FutureMeanTemp', futureMeanTempSchema);

export default FutureMeanTemp;