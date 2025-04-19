const axios = require('axios');

module.exports.getDistance = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(pickup)}&destinations=${encodeURIComponent(destination)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK' && response.data.rows[0].elements[0].status === 'OK') {
            const distanceInKm = response.data.rows[0].elements[0].distance.value / 1000; // in kilometers
            const durationInMinutes = response.data.rows[0].elements[0].duration.value / 60; // in minutes

            return {
                distance: distanceInKm.toFixed(2),
                duration: durationInMinutes.toFixed(2),
            };
        } else {
            throw new Error('Unable to fetch distance and duration');
        }
    } catch (err) {
        console.error(err);
        throw new Error('Internal Server Error');
    }
};
