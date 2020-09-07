require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const authRoutes = require('./routes/authRoutes');

const upload = multer();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array()); 
app.use(express.static('public'));

app.use(authRoutes);


const server = app.listen(8080, () => {
  console.log("App is listening on port 8080");
});
