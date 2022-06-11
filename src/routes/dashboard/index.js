const express = require('express');
const dashboard = express.Router();

dashboard.get('/', (req, res) => {
  res.json({
    message: 'Hey! Controller Dashboard',
  });
});

module.exports = dashboard;
