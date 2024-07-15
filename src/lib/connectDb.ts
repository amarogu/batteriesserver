import { connection, connect } from "mongoose";
import { Device } from "./Models/Device";

export default async function connectDb() {
    try {
        if (connection.readyState !== 1) {
            await connect(process.env.DB_URI as string);
        }

        return {
            Device
        }
    } catch {
        return null;
    }
}