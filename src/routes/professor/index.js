const express = require('express');
const { verifyToken } = require('../../service/JWT');
const { getAllProfessors } = require('../../service/professor');
const professor = express.Router();

professor.get('/get', verifyToken , async (req, res) => {
  res.json(await getAllProfessors());
});

module.exports = professor;
