'use strict';

import express from 'express';
import CurrentOwner from '../models/currentOwner.js';
const router = express.Router();

router.get(`/`, async (req, res) => {
    const ownerList = await CurrentOwner.find();
    res.send(ownerList);
})

//Get crop by currentOwnerID
router.get(`/id/:id`, async (req, res) => {
    let currentOwner = await CurrentOwner.find().where('currentOwnerID').equals(req.params.id);
    res.send(currentOwner);
})

//Get current owner by name
router.get(`/name/:name`, async (req, res) => {
    let words = req.params.name.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    words = words.join(" ");

    const ownerList = await CurrentOwner.find();
    const farmMatches = ownerList.filter(element => element.name.includes(words));
    res.send(farmMatches);
})

//Get current owner by relationship to original owner
router.get(`/relationship/:relationship`, async (req, res) => {
    let lower = req.params.relationship.toLowerCase();
    const ownerList = await CurrentOwner.find();
    const farmMatches = ownerList.filter(element => element.relationshipToOriginalOwners.toLowerCase().includes(lower));  
    res.send(farmMatches);
})

export default router;