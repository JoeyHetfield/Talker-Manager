const validateWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const formatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!watchedAt) {
    res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  } else if (!formatDate.test(watchedAt)) {
    res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa" ' });
  } else next();
};

module.exports = validateWatchedAt;