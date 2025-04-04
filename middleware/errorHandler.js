function errorHandler(err, req, res, next) {
    console.error(err.status);

    res.status(err.status || 500).json({
        message: "Internal server error",
    });
}

module.exports = errorHandler;