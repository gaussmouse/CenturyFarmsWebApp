'use strict';

import express from 'express';
import CurrentFarm from '../models/farmCurrent.js';
const router = express.Router();

//Get all current farm info
router.get(`/`, async (req, res) => {
    const currFarmList = await CurrentFarm.find();
    res.send(currFarmList);
})

//Get current farm info by farmCurrentID
router.get(`/id/:id`, async (req, res) => {
    let currFarm = await CurrentFarm.find().where('farmCurrentID').equals(req.params.id);
    res.send(currFarm);
})

//Get current farm info by current acreage
router.get(`/currAcreage/:acreage`, async (req, res) => {
    let acreage = await CurrentFarm.find().where('currentAcreage').equals(req.params.acreage);
    res.send(acreage);
})

//Get current farm info by crop id
router.get(`/currCrops/:cropid`, async (req, res) => {
    let farmList = await CurrentFarm.find();
    const farmMatches = farmList.filter(element => element.cropID.split(";").includes(req.params.cropid));
    res.send(farmMatches);
})

//Get current farm info by livestock id
router.get(`/currLivestock/:livestockid`, async (req, res) => {
    let farmList = await CurrentFarm.find();
    const farmMatches = farmList.filter(element => element.livestockID.split(";").includes(req.params.livestockid));
    res.send(farmMatches);
})

export default router;