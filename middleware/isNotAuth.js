const jwt = require("jsonwebtoken");

const isNotAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if (!err) {
                res.redirect("/dashboard");
            } else {
                next();
            }
        });
    } else {
        next();
    }
    } catch (error) {
        console.error(error);
    }
}

module.exports = isNotAuth;