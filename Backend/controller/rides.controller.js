const ridesService=require('../services/rides.service');

module.exports.getfare = async (req, res) => {
    console.log(req.body);
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