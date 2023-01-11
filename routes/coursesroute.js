const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("courses/courses", { RenderingURL: req.originalUrl });
});

module.exports = router;
