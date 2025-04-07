const express = require("express");
const router = express.Router();

router.get("/change-lang/:lang", (req, res) => {
    const lang = req.params.lang;
    res.cookie("locale", lang);

    const referer = req.get("Referer") || '/';
    const safeRedirect = referer.includes("/change-lang/") ? "/" : referer;
    res.redirect(safeRedirect);
});

module.exports = router;