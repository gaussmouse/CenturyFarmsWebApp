'use strict';

import express from 'express';
import FutureMinTemps from '../models/futureMinTemp.js';
const router = express.Router();

//Get all Min temps
router.get(`/`, async (req, res) => {
    const minTempList = await FutureMinTemps.find();
    res.send(minTempList);
})

//Get Min temp data for one farm
router.get(`/id/:id`, async (req, res) => {
    let minTemp = await FutureMinTemps.find().where('farmID').equals(req.params.id);
    res.send(minTemp);
})

export default router;