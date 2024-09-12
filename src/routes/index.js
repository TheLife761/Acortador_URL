import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('index.html');
});

router.get('/planes', (req, res) => {
  res.sendFile('pricing.html',);
});

export default router;