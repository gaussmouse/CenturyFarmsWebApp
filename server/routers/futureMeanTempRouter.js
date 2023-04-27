'use strict';

import express from 'express';
import FutureMeanTemps from '../models/futureMeanTemp.js';
const router = express.Router();

//Get all max temps
router.get(`/`, async (req, res) => {
    const meanTempList = await FutureMeanTemps.find();
    res.send(meanTempList);
})

//Get max temp data for one farm
router.get(`/id/:id`, async (req, res) => {
    let meanTemp = await FutureMeanTemps.find().where('farmID').equals(req.params.id);
    res.send(meanTemp);
})

export default router;