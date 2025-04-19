const axios = require('axios');
module.exports.autosuggest=async (req,res)=>{
    const input=req.query.pickup;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Make
    console.log(input);
    // console.log(apiKey);
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return res.status(200).json({ predictions: response.data.predictions });
        } else {
            throw new Error('Unable to fetch suggestions');
        }
        // console.log(response.data.predictions[1].description);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    // res.json({
    //     prediction:response.data.predictions,
    // });
}