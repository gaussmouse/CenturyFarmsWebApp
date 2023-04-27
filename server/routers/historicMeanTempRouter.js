'use strict';

import express from 'express';
import HistoricMeanTemp from '../models/historicMeanTemp.js';
const router = express.Router();

//Get all max temps
router.get(`/`, async (req, res) => {
    const meanTempList = await HistoricMeanTemp.find();
    res.send(meanTempList);
})

//Get max temp data for one farm
router.get(`/id/:id`, async (req, res) => {
    let meanTemp = await HistoricMeanTemp.find().where('farmID').equals(req.params.id);
    res.send(meanTemp);
})

export default router;