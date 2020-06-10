const express = require('express');
const routes = require('./src/routes');
const path = require('path');
const cors = require('cors');
require('./src/database');

const app = express();
app.use(cors())
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));



app.listen(3333);
