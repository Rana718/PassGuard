import { Router } from "express";


const router = Router();

router.post('/login', (req, res) => {
    res.json({ message: 'hello from Users' });
})


router.post('/register', (req, res) => {
    res.json({ message: 'hello from Users' });
})

export default router;