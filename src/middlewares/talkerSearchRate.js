const talkerSearchRate = (req, res, next) => {
  const { rate } = req.query;
  if (!Number.isInteger(rate)) {
   res.status(400).json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  } else {
    req.query = rate;
    next();
    }
};

module.exports = talkerSearchRate;