'use strict';

import express from 'express';
import FutureMaxTemps from '../models/futureMaxTemp.js';
const router = express.Router();

//Get all max temps
router.get(`/`, async (req, res) => {
    const maxTempList = await FutureMaxTemps.find();
    res.send(maxTempList);
})

//Get max temp data for one farm
router.get(`/id/:id`, async (req, res) => {
    let maxTemp = await FutureMaxTemps.find().where('farmID').equals(req.params.id);
    res.send(maxTemp);
})

export default router;