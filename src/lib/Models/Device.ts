import { model, Model, models, Schema } from "mongoose";
import { IDevice } from "../Interfaces";

const deviceSchema = new Schema<IDevice>({
    name: {
        type: String,
        required: true
    },
    batteryLevel: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export const Device = models.Device as Model<IDevice> || model<IDevice>('Device', deviceSchema);