const express = require('express');
const { verifyToken } = require('../../service/JWT');
const {
  create,
  solicitudeAllByIdProfessor,
  solicitudeById,
  solicitudeByIdStudent,
  update,
} = require('../../service/solicitude');

const solicitude = express.Router();

solicitude.post('/save', verifyToken, async (req, res) => {
  await create(req.body, res);
});

solicitude.get('/search/:id', verifyToken, async (req, res) => {
  res.json(await solicitudeById(req.params.id));
});
solicitude.get('/search/student/:id', verifyToken, async (req, res) => {
  await solicitudeByIdStudent(req.params.id, res);
});
solicitude.get('/search/professor/:id', verifyToken, async (req, res) => {
  await solicitudeAllByIdProfessor(req.params.id, res);
});

solicitude.put('/update/:id', verifyToken, async (req, res) => {
  const id = req.params.id;
  res.json(await update({ ...req.body, id }));
});

module.exports = solicitude;
