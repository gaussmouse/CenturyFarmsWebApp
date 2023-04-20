'use strict';

import express from 'express';
import CropType from '../models/cropTypes.js';
const router = express.Router();

//Get all crops types
router.get(`/`, async (req, res) => {
    const cropList = await CropType.find();
    res.send(cropList);
})

//Get crop type by the id
router.get(`/id/:id`, async (req, res) => {
    let crop = await CropType.find().where('cropTypeID').equals(req.params.id);
    res.send(crop);
})

//Get crop type by name
router.get(`/name/:name`, async (req, res) => {
    //Allows for lower case queries
    let words = req.params.name.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    words = words.join(" ");
    let crop = await CropType.find().where('type').equals(words);
    res.send(crop);
})


export default router;