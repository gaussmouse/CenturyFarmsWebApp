'use strict';

const express = require("express");
const CurrentFarm = require('../models/farmCurrent.js');
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

//Get current farm info by acreage farmed today
router.get(`/currAcreageFarmed/:acreage`, async (req, res) => {
    let acreage = await CurrentFarm.find().where('acreageFarmedToday').equals(req.params.acreage);
    res.send(acreage);
})

//Get current farm info by generations living on farm
router.get(`/gensOnFarm/:gens`, async (req, res) => {
    let farmList = await CurrentFarm.find().where('gensOnFarm').equals(req.params.gens);
    res.send(farmList);
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

module.exports = router;