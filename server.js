//Requiring packages
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const methodOverride = require("method-override");

//Configuring mongoose
mongoose.set("strictQuery", "false");
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Connected to the database");
});

//Importing models
const Article = require("./models/article");

//Initializing app variable
const app = express();
app.set("view engine", "ejs");

//Boilerplate Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

//Importing routers
const rootRouter = require("./routes/root.js");
const noticesRouter = require("./routes/noticesroute");
const coursesRouter = require("./routes/coursesroute");
const teachersRouter = require("./routes/teachersroute");
const adminRouter = require("./routes/adminroute");

//Using those Routers
app.use("/", rootRouter);
app.use("/notices", noticesRouter);
app.use("/courses", coursesRouter);
app.use("/teachers", teachersRouter);
app.use("/admin", adminRouter);

//Listening at a port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at port ${port}.`);
});
