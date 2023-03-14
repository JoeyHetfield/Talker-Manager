const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailCorrect = /\S+@\S+\.\S+/;
  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } else if (!emailCorrect.test(email)) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } else next();
};

module.exports = validateEmail;