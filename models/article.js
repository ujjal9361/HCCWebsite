const mongoose = require("mongoose");
const slugify = require("slugify");
const { JSDOM } = require("jsdom");
const createDomPurifier = require("dompurify");
const { marked } = require("marked");

const window = new JSDOM("").window;
const domPurifier = createDomPurifier(window);
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  markdown: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  eventDate: {
    type: String,
    required: true,
  },
  purifiedHtml: {
    type: String,
    required: true,
  },
  publisherId:{
    type:String,
    required:true
  }
});
//Before any CRUD operation(validation),
//For example in case of saving of a new Article, the function runs before the Article is saved
//But after the values for its properties are set
//In case if editing the Article, same will happen
articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  //When saving or updating our article, we want to convert the markdown(be it modified or same)
  //to actual purified HTML that we can render in our ejs page
  if (this.markdown) {
    this.purifiedHtml = domPurifier.sanitize(marked(this.markdown));
  }
  next();
});
module.exports = mongoose.model("Article", articleSchema);
