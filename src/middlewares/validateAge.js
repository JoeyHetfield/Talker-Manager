const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } else if (!Number.isInteger(Number(age)) || age < 18) {
  res.status(400).json({ message: 'O campo age deve ser um número inteiro igual ou maior que 18' });
  } else {
    next();
  }
};

module.exports = validateAge;
