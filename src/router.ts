import { Router } from "express";
import postBatteryLevel from "./actions/postBatteryLevel";
import addDevice from "./actions/addDevice";
import getDevices from "./actions/getDevices";

const router = Router();

router.post('/newbatteryreport', postBatteryLevel);
router.post('/newdevice', addDevice);
router.get('/devices', getDevices);

export default router;