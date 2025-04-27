const socket = require('socket.io');
const captainModel  = require('./models/captain.model');
const rideModel = require('./models/ride.model');
const userModel = require('./models/user.model');

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
            // console.log("Location update received", data);
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

        socket.on('updateSocketId', async (data) => {
            console.log("updateId received", data);
            try {
                if(data.usertype==='user'){
                    const updatedUser = await  userModel.findById(data.id);
                    // console.log(updatedUser);
                    // console.log(socket.id);
                    updatedUser.socketId = socket.id;
                    // console.log(updatedUser);
                    await updatedUser.save();
                }else{
                     const updateCaptain = await captainModel.findById(data.id);
                     updateCaptain.socketId= socket.id;
                     await updateCaptain.save();
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
            console.log("Ride request received", driverSocketId, userInfo);
            io.to(driverSocketId).emit('ride-request', {
              from: userInfo,
              message: 'You have a new ride request!',
            });
          });
        
        socket.on('acceptRide', async ({ rideId, captainId }) => {
            // console.log("Ride accepted", rideId, captainId);
            const ride = await rideModel.findById(rideId);
            // console.log("Ride found", ride);
            const userId= ride.user;
            // console.log("User found", userId);
            const usersocketId= await userModel.findById(userId).select('socketId');
            // console.log("User socket found", usersocketId);
            io.to(usersocketId.socketId).emit('rideAccepted', { capId:captainId,rideid:ride._id});
            // socket.to()
        });

        socket.on('startJourney', async ({ rideId, captainId }) => {
            // console.log("Ride accepted", rideId, captainId);
            const ride = await rideModel.findById(rideId);
            // console.log("Ride found", ride);
            const userId= ride.user;
            // console.log("User found", userId);
            const usersocketId= await userModel.findById(userId).select('socketId');
            // console.log("User socket found", usersocketId);
            io.to(usersocketId.socketId).emit('rideStarted', {data:true});
            // socket.to()
        });

        // Event when the client disconnects
        socket.on('disconnect', () => {
            console.log("Client disconnected", socket.id);
        });
    });
}

module.exports = { intializeSocket };
