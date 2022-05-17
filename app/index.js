const express = require('express');
const mongoose = require('mongoose');
require('./schemas');
require('dotenv').config();

const routes = require('./routes');
const app = express();
const server = require('http').Server(app);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () =>
  console.log('Connected to the Database')
);
server.listen(process.env.NODE_PORT, async () =>
  console.log(`Server is running on port ${process.env.NODE_PORT}`)
);

app.use(express.json());
app.use('', routes);
