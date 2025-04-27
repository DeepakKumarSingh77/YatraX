const { validationResult } = require('express-validator');
const { validate } = require('../models/captain.model');
const ridesService=require('../services/rides.service');
const mapService=require('../services/map.service');

module.exports.getfare = async (req, res) => {
    // console.log(req.body);
    // const pickup = req.query.pickup;
    const { pickup, destination } = req.query; 
 
    ridesService.getFare(pickup, destination)
        .then((fare) => {
            res.status(200).json({ fare });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
    // const fare = await calculateFare(pickup, destination);
    // res.status(200).json({ fare });
}

module.exports.createride = async (req, res) => {
    const errors=validationResult(req);
    console.log(req.body);
    if(errors.length>0){
        return res.status(400).json({errors});
    }
    const { userId, pickup, destination, vehicleType } = req.body;
    try{
        const ride=await ridesService.createRide({
            user: userId,
            pickup,
            destination,
            vehicleType
        });
        // const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        // const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);
        // const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
        res.status(201).json({ ride });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}

module.exports.getRideById = async (req, res) => {
    const { id } = req.params;
    try {
        const ride = await ridesService.getRideById(id);
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }
        res.status(200).json({ ride });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
