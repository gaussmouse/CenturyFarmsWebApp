'use strict';

import express from 'express';
import Location from '../models/location.js';
const router = express.Router();

//Get all locations
router.get(`/`, async (req, res) => {
    const locationList = await Location.find();
    res.send(locationList);
})

//Get location by ID
router.get(`/id/:id`, async (req, res) => {
    let location = await Location.find().where('locationID').equals(req.params.id);
    res.send(location);
})

//Get location by county
router.get(`/county/:county`, async (req, res) => {
    let words = req.params.county.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    words = words.join(" ");

    let location = await Location.find().where('county').equals(words);
    res.send(location);
})

//Get location by address
router.get(`/address/:address`, async (req, res) => {
        let words = req.params.address.toLowerCase();
    
        const locationList = await Location.find();
        const farmMatches = locationList.filter(element => element.address.toLowerCase().includes(words));
        res.send(farmMatches);
})

//Get location by gps location
router.get(`/gpsLocation/:gps`, async (req, res) => {
    let words = req.params.gps.toLowerCase();

    const locationList = await Location.find();
    const farmMatches = locationList.filter(element => element.gpsLocation.toLowerCase().includes(words));
    res.send(farmMatches);
})

//Get location by legal description
router.get(`/legalDesc/:legal`, async (req, res) => {
    let words = req.params.legal.toLowerCase();

    const locationList = await Location.find();
    const farmMatches = locationList.filter(element => element.legalDescription.toLowerCase().includes(words));
    res.send(farmMatches);
})

export default router;