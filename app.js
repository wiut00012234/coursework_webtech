const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorPage = require('./controllers/error');
let port = process.env.PORT || 3000;
const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

const studentRoute = require('./routes/student');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(studentRoute);
app.use(errorPage.getErrorPage);


mongoose
  .connect('mongodb+srv://00012234:programmer@cluster0.3w9a8.mongodb.net/Students')
  .then(result => {
    app.listen(port);
    console.log('Connected to the database');
  })
  .catch(err => {
    console.log(err);
});

