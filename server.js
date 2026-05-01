const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'bde75d1626c7bfe8fc68e72cc310bf9c';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/odds/:sport', async (req, res) => {
  const { sport } = req.params;
  const url = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${API_KEY}&regions=uk,eu&markets=h2h&oddsFormat=decimal`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch odds' });
  }
});

app.listen(PORT, () => console.log(`ArbKit running on port ${PORT}`));
