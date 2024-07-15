import { Request, Response } from "express";
import connectDb from "../lib/connectDb";

const postBatteryLevel = async (req: Request, res: Response) => {
    const body = req.body as { level: number, _id: string };
    const models = await connectDb();
    
    try {
        if (models) {
            const { Device } = models;
            const device = await Device.findById(body._id);
            if (device) {
                device.batteryLevel = body.level;
                await device.save();
                return res.status(200).send({
                    message: 'Success',
                    device
                });
            } else {
                return res.status(404).send({
                    message: 'Not found',
                    error: 'Device not found'
                });
            }
        } else {
            return res.status(500).send({
                message: 'An error occurred',
                error: 'Could not connect to the database'
            });
        }
    } catch (e: any) {
        if (e instanceof TypeError) {
            return res.status(400).send({
                message: 'Bad request',
                error: e.message
            });
        }
        return res.status(500).send({
            message: 'An error occurred',
            error: e.message
        });
    }
}

export default postBatteryLevel;