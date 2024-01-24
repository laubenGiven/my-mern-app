// /backend/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    // Determine the status code if not already set
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
  
    res.json({
      message: err.message,
      // Stack trace should not be returned in production
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
  };
  
  export default errorHandler;