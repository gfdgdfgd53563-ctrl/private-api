const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const state = {};

app.get('/state/:token', (req, res) => {
  res.json(state[req.params.token] || { autoFarm: false, method: 'Nearest' });
});

app.post('/set/:token', (req, res) => {
  state[req.params.token] = { ...state[req.params.token], ...req.body };
  res.json({ ok: true, state: state[req.params.token] });
});

app.post('/stats/:token', (req, res) => {
  state[req.params.token] = { ...state[req.params.token], stats: req.body };
  res.json({ ok: true });
});

app.get('/', (req, res) => res.send('candy api ok'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('listening on ' + PORT));