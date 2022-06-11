const express = require('express');
const routes = express();
const auth = require('./auth/index');
const dashboard = require('./dashboard');
const professor = require('./professor');
const student = require('./student');
const solicitude = require('./solicitude');

routes.get('/', (req, res) => {
  res.send('WELCOME TO API');
});

routes.use('/auth', auth);
routes.use('/dashboard', dashboard);
routes.use('/professor', professor);
routes.use('/student', student);
routes.use('/solicitude', solicitude);

module.exports = routes;
