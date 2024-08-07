const { logHandler } = require('./logger');

const errorHandler = async (error, req, res, next) => {
    // Log the error details
    await logHandler(`${error.name}\t${error.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errorLog.txt');

    // Log the error message to the console
    console.error(error.message);

    // Determine the status code
    const status = res.statusCode || 500;

    // Send JSON response
    res.status(status).json({ message: error.message });
};

module.exports = errorHandler;
