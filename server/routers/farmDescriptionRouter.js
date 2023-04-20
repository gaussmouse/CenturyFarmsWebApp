'use strict';

import express from 'express';
import FarmDescription from '../models/farmDescription.js';
const router = express.Router();

//Get all farm descriptions
router.get(`/`, async (req, res) => {
    const farmList = await FarmDescription.find();
    res.send(farmList);
})

//Get farm description by farmPastID
router.get(`/farmPastID/:id`, async (req, res) => {
    let farm = await FarmDescription.find().where('farmPastID').equals(req.params.id);
    res.send(farm);
})

//Get farm description by farmCurrentID
router.get(`/farmCurrentID/:id`, async (req, res) => {
    let farm = await FarmDescription.find().where('farmCurrentID').equals(req.params.id);
    res.send(farm);
})

//Get farm description by currentOwnerID
router.get(`/currentOwnerID/:id`, async (req, res) => {
    let farm = await FarmDescription.find().where('currentOwnerID').equals(req.params.id);
    res.send(farm);
})

//Get farm description by originalOwnerID
router.get(`/originalOwnerID/:id`, async (req, res) => {
    let farm = await FarmDescription.find().where('originalOwnerID').equals(req.params.id);
    res.send(farm);
})

//Get farm description by locationID
router.get(`/locationID/:id`, async (req, res) => {
    let farm = await FarmDescription.find().where('locationID').equals(req.params.id);
    res.send(farm);
})

//Get farm description by farm name
router.get(`/name/:name`, async (req, res) => {
    let words = req.params.name.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    words = words.join(" ");

    const farmList = await FarmDescription.find();
    const farmMatches = farmList.filter(element => element.name.includes(words));
    res.send(farmMatches);
})

//Get farm description by award type
router.get(`/award/:name`, async (req, res) => {
    let words = req.params.name.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    words = words.join(" ");

    const farmList = await FarmDescription.find();
    const farmMatches = farmList.filter(element => element.awardType.includes(words));
    res.send(farmMatches);
})

//Get all farms that have been interviewed 
router.get(`/interviewedFarms`, async (req, res) => {
    let farm = await FarmDescription.find().where('interviewed').equals("yes");
    res.send(farm);
})

export default router;