const i18n = (req, res, next) => {
    res.locals.t = req.__;
    res.locals.currentLang = req.getLocale();
    next();
};

module.exports = i18n;