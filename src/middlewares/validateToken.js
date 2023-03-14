const validateToken = (req, res, next) => {
  const token = req.headers;
  if (!token) {
    res.status(401).json({ message: 'Token não encontrado' });
  } else if (token.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  } else next();
};

module.exports = validateToken;