import { Request, Response } from "express";
import connectDb from "../lib/connectDb";

const addDevice = async (req: Request, res: Response) => {
    const body = req.body as { name: string, batteryLevel: number };
    const models = await connectDb();
    
    try {
        if (models) {
            const { Device } = models;
            const device = new Device({
                name: body.name,
                batteryLevel: body.batteryLevel
            });
            await device.save();
            return res.status(200).send({
                message: 'Success',
                device
            });
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

export default addDevice;