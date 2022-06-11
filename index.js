const express = require('express');
require('dotenv').config();
const cors = require('cors');

const requestApp = express();
const port = process.env.PORT || 2000;

const routes = require('./src/routes/routes');
const path = require('path');

const corsOption = {
  origin: process.env.CORS_URL || 'http://localhost:3000',
};



requestApp.use(cors(corsOption));

requestApp.use(express.json());

requestApp.use(express.urlencoded({ extended: true }));

requestApp.use('/api', routes);
requestApp.use("/" , express.static(path.join(__dirname, 'public')))
requestApp.get("*", async (req, res) =>{
  res.sendFile(path.join(__dirname, 'public/index.html'))
})


requestApp.listen(port, () => console.log(`Started app on port ${port}`));
