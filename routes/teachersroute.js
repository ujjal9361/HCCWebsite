const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("teachers/teachers", { RenderingURL: req.originalUrl });
});

module.exports = router;
