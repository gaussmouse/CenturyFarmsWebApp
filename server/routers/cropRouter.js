'use strict';

const express = require("express");
const Crop = require("../models/crop.js");
const router = express.Router();


//Get all crops
router.get(`/`, async (req, res) => {
    const cropList = await Crop.find();
    res.send(cropList);
})

//Get crop by cropID
router.get(`/id/:id`, async (req, res) => {
    let crop = await Crop.find().where('cropID').equals(req.params.id);
    res.send(crop);
})

//Get crop by name
router.get(`/name/:name`, async (req, res) => {
    //Allows for lower case queries
    let words = req.params.name.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    words = words.join(" ");
    let crop = await Crop.find().where('name').equals(words);
    res.send(crop);
})

module.exports = router;