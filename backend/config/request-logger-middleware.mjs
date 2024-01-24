// File: request-logger-middleware.js
import logger from "./logger.mjs";

const requestLoggerMiddleware = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

export default requestLoggerMiddleware;
