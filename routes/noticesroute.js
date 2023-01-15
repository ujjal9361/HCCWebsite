const router = require("express").Router();
const Article = require("../models/article");

//To get the notices page
router.get("/", (req, res) => {
  console.log("Accessed the events page");
  Article.find({}, (err, articleArray) => {
    if (err) {
      console.log("Error with getting the articles Array");
      console.log(err);
    } else {
      res.status(200);
      res.render("events/events", {
        articles: articleArray,
        RenderingURL: req.originalUrl,
      });
    }
  });
});

//To get the form to create a new article or notice
router.get("/new", (req, res) => {
  res.render("events/new", { RenderingURL: req.originalUrl });
});

//To handle the information sent by user while submitting the form
router.post("/new", async (req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
    eventDate: req.body.eventDate,
  });
  let article = await newArticle.save();
  res.redirect(`/notices/${article.slug}`);
});

//When an user cliks into Read More in the articles page
router.get("/:slug", (req, res) => {
  Article.findOne({ slug: req.params.slug }, (err, article) => {
    if (err) {
      console.log("Error in the router for individual article");
      console.log(err);
    } else {
      res.render("events/notice", {
        article: article,
        RenderingURL: req.originalUrl,
      });
    }
  });
});

//when an user click delete button for a single article
router.delete("/:id", (req, res) => {
  Article.findOneAndDelete({ _id: req.params.id }, (err) => {
    if (err) {
      console.log("Error in route for deleting an article");
      console.log(err);
    } else {
      res.redirect("/notices");
    }
  });
});

//When an user clicks edit button for an article,(The editing interface)
router.get("/edit/:id", (req, res) => {
  Article.findOne({ _id: req.params.id }, (err, article) => {
    if (err) {
      console.log("Error in route for editing an article");
      console.log(err);
    } else {
      res.render("events/edit", {
        article: article,
        RenderingURL: req.originalUrl,
      });
    }
  });
});

//When user clicks save after editing the article in /notices/edit/<_id>
router.put("/edit/:id", (req, res) => {
  Article.findOne({ _id: req.params.id }, async (err, article) => {
    if (err) {
      console.log("Error in route for editing an article");
      console.log(err);
    } else {
      article.title = req.body.title;
      article.description = req.body.description;
      article.markdown = req.body.markdown;
      article.eventDate = req.body.eventDate;

      let savedArticle = await article.save();
      res.redirect("/notices/" + savedArticle.slug);
    }
  });
});
module.exports = router;
