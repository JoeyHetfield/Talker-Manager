const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: 'Token não encontrado' });
  } else if (typeof token !== 'string' || token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  } else next();
};

module.exports = validateToken;