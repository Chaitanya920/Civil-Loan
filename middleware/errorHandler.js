const winston = require('winston');

const log = winston.createLogger({
  level: 'error', 
  format: winston.format.combine(
    winston.format.timestamp(), 
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), 
    new winston.transports.File({ filename: 'error.log' }), 
  ],
});

const errHandler = (err, req, res, next) => {
  const status = err.status || 500; 
  const msg = err.message || 'Internal Server Error';

  log.error(`[${req.method}] ${req.url} - ${msg}`);

  res.status(status).json({
    success: false,
    error: {
      status,
      message: msg,
    },
  });
};

module.exports = errHandler;
