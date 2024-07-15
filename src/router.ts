import { Router } from "express";
import addDevice from "./actions/addDevice";
import getDevices from "./actions/getDevices";

const router = Router();

router.post('/newdevice', addDevice);
router.get('/devices', getDevices);

export default router;