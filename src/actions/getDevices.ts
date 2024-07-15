import { Request, Response } from "express";
import connectDb from "../lib/connectDb";

const getDevices = async (req: Request, res: Response) => {
    const models = await connectDb();
    
    try {
        if (models) {
            const { Device } = models;
            const devices = await Device.find();
            return res.status(200).send({
                message: 'Success',
                devices
            });
        } else {
            return res.status(500).send({
                message: 'An error occurred',
                error: 'Could not connect to the database'
            });
        }
    } catch (e: any) {
        return res.status(500).send({
            message: 'An error occurred',
            error: e.message
        });
    }
}

export default getDevices;