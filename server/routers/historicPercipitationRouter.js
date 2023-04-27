'use strict';

import express from 'express';
import HistoricPercipitation from '../models/historicPercipitation.js';
const router = express.Router();

//Get all percipitation data
router.get(`/`, async (req, res) => {
    const percipitationList = await HistoricPercipitation.find();
    res.send(percipitationList);
})

//Get percipitation data for one farm
router.get(`/id/:id`, async (req, res) => {
    let percipitation = await HistoricPercipitation.find().where('farmID').equals(req.params.id);
    res.send(percipitation);
})

export default router;