const { body } = require("express-validator");

exports.registerValidation = () => {
    return [
        body("username")
            .notEmpty().withMessage("Username cannot be empty!")
            .isLength({ min: 3, max: 20 }).withMessage("Username must be at least 3 characters and at most 20!"),

        body("password")
            .notEmpty().withMessage("Password cannot be empty!")
            .isLength({ min: 6, max: 15 }).withMessage("Password must be at least 6 characters and at most 15 characters!")
            .matches(/^\S*$/).withMessage("Password must not contain spaces!")
            .matches(/^[^-]*$/).withMessage("Password must not contain hyphens!"),
    ];
};