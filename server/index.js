require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.json());

app.use(authRoutes);


const server = app.listen(8080, () => {
  console.log("App is listening on port 8080");
});
