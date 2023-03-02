'use strict';

import express from 'express';
import FarmPast from '../models/farmPast.js';
const router = express.Router();

//Get all current farm info
router.get(`/`, async (req, res) => {
    const farmPastList = await FarmPast.find();
    res.send(farmPastList);
})

//Get current farm info by farmCurrentID
router.get(`/id/:id`, async (req, res) => {
    let pastFarm = await FarmPast.find().where('farmPastID').equals(req.params.id);
    res.send(pastFarm);
})

//Get current farm info by current acreage
router.get(`/originalAcreage/:acreage`, async (req, res) => {
    let acreage = await FarmPast.find().where('originalAcreage').equals(req.params.acreage);
    res.send(acreage);
})

//Get current farm info by generations living on farm
router.get(`/propAcq/:year`, async (req, res) => {
    let farmList = await FarmPast.find().where('yearPropertyAcquisition').equals(req.params.year);
    res.send(farmList);
})

//Get current farm info by crop id
router.get(`/originalCrops/:cropid`, async (req, res) => {
    let farmList = await FarmPast.find();
    const farmMatches = farmList.filter(element => element.cropID.split(";").includes(req.params.cropid));
    res.send(farmMatches);
})

//Get current farm info by livestock id
router.get(`/originalLivestock/:livestockid`, async (req, res) => {
    let farmList = await FarmPast.find();
    const farmMatches = farmList.filter(element => element.livestockID.split(";").includes(req.params.livestockid));
    res.send(farmMatches);
})

export default router;