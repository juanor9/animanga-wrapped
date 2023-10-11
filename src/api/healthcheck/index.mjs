import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Your server is running.' });
});

export default router;
