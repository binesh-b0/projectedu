require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(authRoutes);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log("App is listening on port 8080");
});
