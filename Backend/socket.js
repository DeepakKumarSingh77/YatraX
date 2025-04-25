const socket = require('socket.io');
const captainModel  = require('./models/captain.model');

let io;

function intializeSocket(server) {
    io = socket(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("New client connected", socket.id);

        // Event for location update
        socket.on('locationUpdate', async (data) => {
            console.log("Location update received", data);
            try {
                const updatedCaptain = await captainModel.findOneAndUpdate(
                    { _id: data.captainId },
                    {
                        $set: {
                            'location.ltd': data.lat,
                            'location.lng': data.lng,
                            'socketId': socket.id,
                        }
                    },
                    { new: true } // Return the updated document
                );

                if (!updatedCaptain) {
                    console.log("Captain not found!");
                } else {
                    console.log("Captain location updated:", updatedCaptain);
                }
            } catch (error) {
                console.error("Error updating captain location:", error);
            }
        });

        socket.on('findDrivers', async (data) => {
            // console.log("Find drivers event received", data);
            try {
                // Implement logic to find drivers within 2km radius
                const driversInRadius = await captainModel.find({
                    'location.ltd': { $gt: data.lat - 0.02, $lt: data.lat + 0.02 }, // Roughly 2km range
                    'location.lng': { $gt: data.lng - 0.02, $lt: data.lng + 0.02 }  // Roughly 2km range
                });

                // console.log("Drivers in radius", driversInRadius);

                // Emit the driversInRadius event back to the client
                socket.emit('driversInRadius', driversInRadius);
            } catch (error) {
                console.error("Error finding drivers:", error);
            }
        });

        socket.on('confirm-ride', ({ driverSocketId, userInfo }) => {
            io.to(driverSocketId).emit('ride-request', {
              from: userInfo,
              message: 'You have a new ride request!',
            });
          });

        // Event when the client disconnects
        socket.on('disconnect', () => {
            console.log("Client disconnected", socket.id);
        });
    });
}

module.exports = { intializeSocket };
