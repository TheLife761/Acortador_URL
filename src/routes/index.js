const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/planes', (req, res) => {
  res.render('plans');
});

module.exports = router;