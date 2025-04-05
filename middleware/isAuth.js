const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("<p>You are not authorized.  Go back to Login or Register</p>")
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send("<p>You are not authorized. Go back to Login or Register</p>")
        }

        req.user = decoded;
        next();
    });
}

module.exports = isAuth;