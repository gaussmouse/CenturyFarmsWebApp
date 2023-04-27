'use strict';

import express from 'express';
import FuturePercipitation from '../models/futurePercipitation.js';
const router = express.Router();

//Get all percipitation data
router.get(`/`, async (req, res) => {
    const percipitationList = await FuturePercipitation.find();
    res.send(percipitationList);
})

//Get percipitation data for one farm
router.get(`/id/:id`, async (req, res) => {
    let percipitation = await FuturePercipitation.find().where('farmID').equals(req.params.id);
    res.send(percipitation);
})

export default router;