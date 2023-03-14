'use strict';

import express from 'express';
import Livestock from '../models/livestock.js';
const router = express.Router();

//Get all livestock
router.get(`/`, async (req, res) => {
    const livestockList = await Livestock.find();
    res.send(livestockList);
})

//Get livestock by livestockpID
router.get(`/id/:id`, async (req, res) => {
    let livestock = await Livestock.find().where('livestockID').equals(req.params.id);
    res.send(livestock);
})

//Get livestock by name
router.get(`/name/:name`, async (req, res) => {
    let words = req.params.name.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    words = words.join(" ");
    let livestock = await Livestock.find().where('name').equals(words);
    res.send(livestock);
})

export default router;