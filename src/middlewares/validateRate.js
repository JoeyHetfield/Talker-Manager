const validateRate = (req, res, next) => {
 const { rate } = req.body.talk;
if (!rate) {
  res.status(400).json({ message: 'O campo "rate" é obrigatório' });
} else if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
  res.status(400).json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
} else next();
};

module.exports = validateRate;
