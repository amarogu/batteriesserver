import connectDb from "../lib/connectDb";
import { Server, Socket } from "socket.io";

const batteryLevelPosted = async (data: {_id: string, level: number}, io: Server, socket: Socket) => {
    const models = await connectDb();
    
    try {
        if (models) {
            const { Device } = models;
            const device = await Device.findById(data._id);
            if (device) {
                device.batteryLevel = data.level;
                await device.save();
                return socket.broadcast.to('Gustavo\'s Room').emit('battery level updated', {
                    message: 'Success',
                    device
                });
            } else {
                return io.to('Gustavo\'s Room').emit('error', {
                    message: 'Device not found'
                });
            }
        } else {
            return io.to('Gustavo\'s Room').emit('error', {
                message: 'Could not connect to the database'
            });
        }
    } catch (e: any) {
        if (e instanceof TypeError) {
            return io.to('Gustavo\'s Room').emit('error', {
                message: 'Bad request',
                error: e.message
            });
        }
        return io.to('Gustavo\'s Room').emit('error', {
            message: 'An error occurred',
            error: e.message
        });
    }
}

export default batteryLevelPosted;