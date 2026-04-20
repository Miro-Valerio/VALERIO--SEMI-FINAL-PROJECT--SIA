const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   HOME ROUTE
========================= */
app.get('/', (req, res) => {
  res.send('🎮 Game Character API is running!');
});

/* =========================
   DATASET
========================= */
let characters = [];

/* =========================
   GET ALL CHARACTERS
========================= */
app.get('/characters', (req, res) => {
  res.status(200).json(characters);
});

/* =========================
   GET CHARACTER BY ID
========================= */
app.get('/characters/:id', (req, res) => {
  const character = characters.find((c) => c.id == req.params.id);

  if (!character) {
    return res.status(404).json({ message: 'Character not found' });
  }

  res.status(200).json(character);
});

/* =========================
   ADD CHARACTER
========================= */
app.post('/characters', (req, res) => {
  const { name, game, role, ability, powerLevel } = req.body;

  if (!name || !game || !role || !ability || !powerLevel) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const newCharacter = {
    id: characters.length + 1,
    name,
    game,
    role,
    ability,
    powerLevel,
  };

  characters.push(newCharacter);

  res.status(201).json(newCharacter);
});

/* =========================
   UPDATE CHARACTER
========================= */
app.put('/characters/:id', (req, res) => {
  const character = characters.find((c) => c.id == req.params.id);
  np;
  if (!character) {
    return res.status(404).json({ message: 'Character not found' });
  }

  const { name, game, role, ability, powerLevel } = req.body;

  if (!name || !game || !role || !ability || !powerLevel) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  character.name = name;
  character.game = game;
  character.role = role;
  character.ability = ability;
  character.powerLevel = powerLevel;

  res.status(200).json(character);
});

/* =========================
   DELETE CHARACTER
========================= */
app.delete('/characters/:id', (req, res) => {
  const index = characters.findIndex((c) => c.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Character not found' });
  }

  characters.splice(index, 1);

  res.status(200).json({ message: 'Character deleted successfully' });
});

/* =========================
   FILTER BY GAME
========================= */
app.get('/characters/game/:game', (req, res) => {
  const result = characters.filter(
    (c) => c.game.toLowerCase() === req.params.game.toLowerCase()
  );

  res.status(200).json(result);
});

/* =========================
   FILTER BY ROLE
========================= */
app.get('/characters/role/:role', (req, res) => {
  const result = characters.filter(
    (c) => c.role.toLowerCase() === req.params.role.toLowerCase()
  );

  res.status(200).json(result);
});

/* =========================
   SEARCH BY NAME
========================= */
app.get('/search', (req, res) => {
  const name = req.query.name?.toLowerCase();

  const result = characters.filter((c) => c.name.toLowerCase().includes(name));

  res.status(200).json(result);
});

/* =========================
   COUNT CHARACTERS
========================= */
app.get('/count', (req, res) => {
  res.status(200).json({
    totalCharacters: characters.length,
  });
});

/* =========================
   RANDOM CHARACTER
========================= */
app.get('/random', (req, res) => {
  if (characters.length === 0) {
    return res.status(404).json({ message: 'No characters available' });
  }

  const random = characters[Math.floor(Math.random() * characters.length)];
  res.status(200).json(random);
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
