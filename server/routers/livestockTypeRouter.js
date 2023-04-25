'use strict';

import express from 'express';
import LivestockType from '../models/livestockTypes.js';
const router = express.Router();

//Get all livestock types
router.get(`/`, async (req, res) => {
    const cropList = await LivestockType.find();
    res.send(cropList);
})

//Get livestock type by the id
router.get(`/id/:id`, async (req, res) => {
    let crop = await LivestockType.find().where('livestockTypeID').equals(req.params.id);
    res.send(crop);
})

//Get livestock type by name
router.get(`/name/:name`, async (req, res) => {
    //Allows for lower case queries
    let words = req.params.name.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    words = words.join(" ");
    let livestock = await LivestockType.find().where('livestockType').equals(words);
    res.send(livestock);
})


export default router;