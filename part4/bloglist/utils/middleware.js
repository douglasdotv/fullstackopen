const logger = require('./logger')

const requestLogger = (request, _response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, _request, response, _next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  response.status(500).json({ error: 'An unexpected error occurred' })
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
