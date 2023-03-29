const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("courses/courses", { RenderingURL: req.originalUrl ,req:req});
});

module.exports = router;
