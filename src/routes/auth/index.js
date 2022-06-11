const express = require('express');
const auth = express.Router();
const verifyUserCredentials = require('../../service/auth');

auth.post('/:role', async (req, res) => {
  const { email, password } = req.body;
  const credentials = {
    idRole: parseInt(req.params.role),
    email,
    password,
  };
  
  await verifyUserCredentials(credentials, res);
});

module.exports = auth;
