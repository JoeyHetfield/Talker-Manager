const express = require('express');
const { readFile } = require('./utils/index');
const generateToken = require('./middlewares/generateToken');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  try {
    const data = await readFile('./src/talker.json');
    if (data.length === 0) {
      res.status(200).json([]);
    } else res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/talker/:id', async (req, res) => {
  const data = await readFile('./src/talker.json');
  const dataOne = data.find((talker) => talker.id === Number(req.params.id));
  if (!dataOne) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(dataOne);
});

app.post('/login', generateToken, async (req, res) => {
  const { token } = req;
  return res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
