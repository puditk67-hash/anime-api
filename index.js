const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const animeRoutes = require('./routes/animes');

app.use('/api/animes', animeRoutes);

app.get('/', (req, res) => {
  res.send('Anime API is running');
});

module.exports = app;