const { validationResult } = require('express-validator');
const { validate } = require('../models/captain.model');
const ridesService=require('../services/rides.service');

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
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);
        ride.otp = ""
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
        captainsInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            });
        });
        res.status(201).json({ ride });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}