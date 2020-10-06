require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studenRoutes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(authRoutes);
app.use(adminRoutes);
app.use(studentRoutes);


const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log("App is listening on port 8080");
});
