const express = require('express');
const { verifyToken } = require('../../service/JWT');
const student = express.Router();

student.get('/', verifyToken, (req, res) => {
  res.json({
    message: 'Hey! Controller student',
  });
});

module.exports = student;
