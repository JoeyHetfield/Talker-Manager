const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;

  if (!talk) {
    res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  } else if (!watchedAt || !rate) {
    res.status(400).json({ message: 'Os campos watchedAt e rate são obrigatórios' });
  } else next();  
};

module.exports = validateTalk;