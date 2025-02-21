import { Router } from "express";


const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'hello from Password' });
})

export default router;