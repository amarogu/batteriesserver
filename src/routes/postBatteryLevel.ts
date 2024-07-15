import { Router } from "express";

const router = Router();

router.post('/battery', (req, res) => {
    const { level } = req.body as { level: number };
    
    
});