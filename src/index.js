const express = require('express');
const path = require('path');
const { readFile, writeFile } = require('./utils/index');
const generateToken = require('./middlewares/generateToken');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const validateToken = require('./middlewares/validateToken');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const { validateTalk, validateWatchedAt, validateRate } = require('./middlewares/validateTalk');

const app = express();
app.use(express.json());
const talkerPath = path.resolve(__dirname, './talker.json');

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', validateEmail, validatePassword, generateToken, async (req, res) => {
  const { token } = req;
  return res.status(200).json({ token });
});

app.get('/talker', async (req, res) => {
  try {
    const data = await readFile(talkerPath);
    if (data.length === 0) {
      res.status(200).json([]);
    } else res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/talker/:id', async (req, res) => {
  const data = await readFile(talkerPath);
  const dataOne = data.find((talker) => talker.id === Number(req.params.id));
  if (!dataOne) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(dataOne);
});

app.post('/talker', validateToken, validateName, validateAge, validateTalk, 
validateWatchedAt, validateRate, async (req, res) => {
  try {
    const { name, age, talk, watchedAt, rate } = req.body;
    const data = await readFile(talkerPath);

    const newTalker = {
      name,
      age,
      id: data.length + 1, 
      talk,
      watchedAt,
      rate,
    };
    data.push(newTalker);
    await writeFile(talkerPath, data);
    res.status(201).json(newTalker);
  } catch (error) {
    console.error(error);
  }
});

app.put('/talker/:id', validateToken, validateName, validateAge, validateTalk, 
validateWatchedAt, validateRate, async (req, res) => {
  try { 
    const { id } = req.params;
    const { name, age, talk, watchedAt, rate } = req.body;
    const data = await readFile(talkerPath);
    const updateTalker = data.find((talker) => talker.id === Number(id));
    if (!updateTalker) {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    updateTalker.name = name;
    updateTalker.age = age;
    updateTalker.talk = talk;
    updateTalker.watchedAt = watchedAt;
    updateTalker.rate = rate;
    await writeFile(talkerPath, data);
    res.status(200).json(updateTalker);
  } catch (error) {
    console.error(error);
  }
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const data = await readFile(talkerPath);
  const deleteTalker = data.filter((talker) => talker.id !== Number(id));
  const updatatedTalker = JSON.stringify(deleteTalker);
  await writeFile(talkerPath, updatatedTalker);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
