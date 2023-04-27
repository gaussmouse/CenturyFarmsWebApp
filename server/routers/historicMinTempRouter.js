'use strict';

import express from 'express';
import HistoricMinTemps from '../models/historicMinTemp.js';
const router = express.Router();

//Get all Min temps
router.get(`/`, async (req, res) => {
    const minTempList = await HistoricMinTemps.find();
    res.send(minTempList);
})

//Get Min temp data for one farm
router.get(`/id/:id`, async (req, res) => {
    let minTemp = await HistoricMinTemps.find().where('farmID').equals(req.params.id);
    res.send(minTemp);
})

export default router;