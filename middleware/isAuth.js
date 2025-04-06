const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;

    if (!token) {
        return res.status(401).render("401");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).render("401");
        }

        req.user = decoded;
        next();
    });
    } catch (error) {
        console.error(error);
    }
}

module.exports = isAuth;