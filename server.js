if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//Requiring packages
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");

//Requiring middlware defined in another file
const { deSerializeUser } = require("./authMiddlwares");

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

//Session middlewares
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collection: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, //30 days expiry date
    },
  })
);

//Deserializing Users
app.use(deSerializeUser);
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
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening at port ${port}.`);
});
