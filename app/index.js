const express = require('express');
const mongoose = require('mongoose');
require('./schemas');
require('dotenv').config();

const app = express();
const cors = require('cors');
app.use(cors());
const server = require('http').Server(app);
const routes = require('./routes');
const { errorHandler, handle404 } = require(`./middlewares/errorHandler`);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () =>
  console.log('Connected to the Database')
);
server.listen(process.env.NODE_PORT, async () =>
  console.log(`Server is running on port ${process.env.NODE_PORT}`)
);

app.use(express.json());
app.use('', routes);
app.use(errorHandler);
app.use(handle404);
