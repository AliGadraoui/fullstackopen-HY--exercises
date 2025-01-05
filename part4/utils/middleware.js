const jwt = require('jsonwebtoken');
const User = require('../models/user');

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization');
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request.token = auth.substring(7);
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (decodedToken.id) {
      request.user = await User.findById(decodedToken.id);
    }
  }
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') return response.status(400).send({ error: 'Malformatted ID' });
  if (error.name === 'ValidationError') return response.status(400).json({ error: error.message });
  if (error.name === 'JsonWebTokenError') return response.status(401).json({ error: 'Invalid token' });
  next(error);
};

module.exports = { tokenExtractor, userExtractor, unknownEndpoint, errorHandler };
