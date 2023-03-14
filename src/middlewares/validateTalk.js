const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  } else if (talk.rate === undefined) {
    res.status(400).json({ message: 'O campo "rate" é obrigatório' });
} else if (!talk.watchedAt) {
  res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
} else next();
};

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
   res.status(400).json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
 } else next();
 };

const validateWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const formatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!formatDate.test(watchedAt)) {
    res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } else next();
};

module.exports = { validateTalk, validateRate, validateWatchedAt };