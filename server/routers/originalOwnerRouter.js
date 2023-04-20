'use strict';

import express from 'express';
import OriginalOwner from '../models/originalOwner.js';
const router = express.Router();

//Get all original owners
router.get(`/`, async (req, res) => {
    const ownerList = await OriginalOwner.find();
    res.send(ownerList);
})

//Get owner by originalOwnerID
router.get(`/id/:id`, async (req, res) => {
    let originalOwner = await OriginalOwner.find().where('originalOwnerID').equals(req.params.id);
    res.send(originalOwner);
})

//Get original owner by name
router.get(`/name/:name`, async (req, res) => {
    let words = req.params.name.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    words = words.join(" ");

    const ownerList = await OriginalOwner.find();
    const farmMatches = ownerList.filter(element => element.name.includes(words));
    res.send(farmMatches);
})

//Get original owner by origin
router.get(`/origin/:origin`, async (req, res) => {
        let words = req.params.origin.toLowerCase();
    
        const currOwnerList = await OriginalOwner.find();
        const farmMatches = currOwnerList.filter(element => element.origin.toLowerCase().includes(words));
        res.send(farmMatches);
})

export default router;