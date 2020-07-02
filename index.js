const express = require('express'); //npm install express
const cors = require('cors'); //npm i cors
const app = express();
const path = require('path');
const db = require('./props/connection');


var auth = require('./resources/auth');
var client = require('./resources/client');
var movie = require('./resources/movie');
var rent = require('./resources/rent');


db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


app.use(express.json());
app.use(cors());

app.use('/api/auth', auth);
app.use('/api/client', client);
app.use('/api/movie', movie);
app.use('/api/rent', rent);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(5000, () => {
    console.log('Server is running on port 5000...');
});